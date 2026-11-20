---
layout: layout.njk
title: "۱۰۴.۱ ساخت پارتیشن‌ها و فایل‌سیستم‌ها"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 20
chapterSection: "موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها"
permalink: /books/book13/Book/20/1041-create-partitions-and-filesystems/index.html
---
{% raw %}
# ۱۰۴.۱ ساخت پارتیشن‌ها و فایل‌سیستم‌ها

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> ابزارهای fdisk، gdisk، parted، و ایجاد انواع فایل‌سیستم با mkfs.ext4، mkfs.xfs و mkswap.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/xSQdIIMGG2g" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۲

داوطلبان باید بتوانند پارتیشن‌های دیسک را پیکربندی کرده و سپس روی رسانه‌هایی مانند هارد دیسک، فایل‌سیستم ایجاد کنند. این موضوع شامل مدیریت پارتیشن‌های swap نیز می‌شود.

### اهداف و دستورات کلیدی

* مدیریت جدول‌های پارتیشن MBR و GPT
* استفاده از دستورهای مختلف `mkfs` برای ایجاد فایل‌سیستم‌های گوناگون از جمله:
  * `ext2` / `ext3` / `ext4`
  * `XFS`
  * `VFAT`
  * `exFAT`
* شناخت اولیه ویژگی‌های `Btrfs`، از جمله فایل‌سیستم‌های چنددیسکی، فشرده‌سازی و زیرحجم‌ها (Subvolumes)

فهرست ابزارهای مرتبط:

<div dir="ltr">

* `fdisk`
* `gdisk`
* `parted`
* `mkfs`
* `mkswap`

</div>

### دستگاه‌های بلوکی (Block devices)

یک دستگاه بلوکی (Block device) رسانه ذخیره‌سازی انبوه و غیرفراری است که اطلاعات آن را می‌توان به هر ترتیبی (تصادفی) خواند و نوشت؛ مانند هارد دیسک‌ها، حافظه‌های USB، فلاپی‌دیسک‌ها و درایوهای CD-ROM. ما این دستگاه‌ها را به بلوک‌هایی با اندازه ثابت **فرمت** می‌کنیم.

با دستور `lsblk` می‌توانیم همه دستگاه‌های بلوکی را بررسی کنیم. همچنین در خروجی لیست بلند دستور `ls` (با سوییچ `-l`)، دستگاه‌های بلوکی در ستون اول با حرف `b` نمایش داده می‌شوند:

```text
jadi@debianamd:~$ ls /dev/ -l | grep "^b"
brw-rw----  1 root disk      8,   0 Feb  3  2023 sda
brw-rw----  1 root disk      8,  16 Feb  3  2023 sdb
brw-rw----  1 root disk      8,  17 Feb  3  2023 sdb1
brw-rw----  1 root disk      8,  18 Feb  3  2023 sdb2
brw-rw----  1 root disk      8,  19 Feb  3  2023 sdb3
brw-rw----+ 1 root cdrom    11,   0 Feb  3  2023 sr0
```

می‌توان روی یک دستگاه بلوکی **پارتیشن‌ها (Partitions)** ساخت و حتی یک دیسک را به چند بخش تقسیم کرد تا مثل چند دیسک مجزا از آن استفاده شود. سیستم‌های قدیمی‌تر با بوت‌لودر BIOS از روش **Master Boot Record (MBR)** برای پارتیشن‌بندی استفاده می‌کنند و سیستم‌های جدیدتر UEFI از فرمت **GUID Partition Table (GPT)** بهره می‌برند.

سیستم‌های لینوکسی از `udev` استفاده می‌کنند تا دستگاه‌های بلوکی و پارتیشن‌هایشان را به شکل `/dev/sdb1` (دیسک دوم `b` و پارتیشن اول `1`) به دایرکتوری `/dev` اضافه کنند.

### ویرایش جدول‌های پارتیشن

#### ابزار fdisk

`fdisk` دستور اصلی برای مشاهده، تغییر و ساخت پارتیشن‌ها روی سیستم‌های MBR است (نسخه‌های جدید آن از GPT هم پشتیبانی می‌کنند). سوییچ `-l` فهرست پارتیشن‌ها را نمایش می‌دهد:

```text
# fdisk -l /dev/sdb
Disk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 11D48091-5AA7-422A-85F7-A23F476CDFD7

Device        Start      End  Sectors  Size Type
/dev/sdb1      2048  1050623  1048576  512M EFI System
/dev/sdb2   1050624 39942143 38891520 18.5G Linux filesystem
/dev/sdb3  39942144 41940991  1998848  976M Linux swap
```

* پرچم **Boot** نشان می‌دهد کدام پارتیشن بوت را در سیستم‌های DOS شروع می‌کند و برای LILO و GRUB اهمیتی ندارد.
* **Start** و **End** نشان می‌دهند هر پارتیشن کجای دیسک قرار دارد.
* **Size** حجم هر پارتیشن را نشان می‌دهد.
* **ID** نشان‌دهنده نوع پارتیشن است (`82` برای swap، `83` برای داده‌های لینوکس و غیره؛ در حالت تعاملی با زدن `l` می‌توانید همه آن‌ها را ببینید).

همچنین می‌توانید `fdisk` را به صورت تعاملی اجرا کنید. زدن `m` منوی راهنما را به شما نشان می‌دهد:

```text
~# fdisk /dev/sda

Welcome to fdisk (util-linux 2.36.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xe2dbaded.

Command (m for help): m

Help:

  DOS (MBR)
   a   toggle a bootable flag
   b   edit nested BSD disklabel
   c   toggle the dos compatibility flag

  Generic
   d   delete a partition
   F   list free unpartitioned space
   l   list known partition types
   n   add a new partition
   p   print the partition table
   t   change a partition type
   v   verify the partition table
   i   print information about a partition

  Misc
   m   print this menu
   u   change display/entry units
   x   extra functionality (experts only)

  Script
   I   load disk layout from sfdisk script file
   O   dump disk layout to sfdisk script file

  Save & Exit
   w   write table to disk and exit
   q   quit without saving changes

  Create a new label
   g   create a new empty GPT partition table
   G   create a new empty SGI (IRIX) partition table
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table


Command (m for help):
```

برای بررسی لیست پارتیشن‌های فعلی، دستور `p` (مخفف print) را امتحان کنید:

```text
Command (m for help): p
Disk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 11D48091-5AA7-422A-85F7-A23F476CDFD7

Device        Start      End  Sectors  Size Type
/dev/sdb1      2048  1050623  1048576  512M EFI System
/dev/sdb2   1050624 39942143 38891520 18.5G Linux filesystem
/dev/sdb3  39942144 41940991  1998848  976M Linux swap
```

مفاهیم چیدمان دیسک را باید از [فصل ۱۰۲.۱](/Gitab/books/book13/Book/06/1021-design-hard-disk-layout/) به یاد داشته باشید. پس بیایید با `fdisk` چند پارتیشن بسازیم. من برای ساخت پارتیشن جدید از `n` (مخفف *new*) استفاده می‌کنم:

```text
# fdisk /dev/sda

Welcome to fdisk (util-linux 2.36.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x40bd0f72.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-8388607, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-8388607, default 8388607): +1G

Created a new partition 1 of type 'Linux' and of size 1 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot Start     End Sectors Size Id Type
/dev/sda1        2048 2099199 2097152   1G 83 Linux
```

حالا بیایید یک پارتیشن Extended بسازیم و داخل آن یک پارتیشن لینوکس (`83`) و یک پارتیشن Swap (`82`) اضافه کنیم:

```text
Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): e
Partition number (2-4, default 2):
First sector (2099200-8388607, default 2099200):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2099200-8388607, default 8388607):

Created a new partition 2 of type 'Extended' and of size 3 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended

Command (m for help): n
All space for primary partitions is in use.
Adding logical partition 5
First sector (2101248-8388607, default 2101248):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2101248-8388607, default 8388607):

Created a new partition 5 of type 'Linux' and of size 3 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 8388607 6287360   3G 83 Linux
```

اوه! یادم رفت فضا را برای پارتیشن swap کنار بگذارم. بیایید پارتیشن قبلی را پاک کنیم و دو پارتیشن جدید بسازیم:

```text
Command (m for help): d
Partition number (1,2,5, default 5): 5

Partition 5 has been deleted.

Command (m for help): n
All space for primary partitions is in use.
Adding logical partition 5
First sector (2101248-8388607, default 2101248):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2101248-8388607, default 8388607): +1G

Created a new partition 5 of type 'Linux' and of size 1 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 4198399 2097152   1G 83 Linux

Command (m for help): n
All space for primary partitions is in use.
Adding logical partition 6
First sector (4200448-8388607, default 4200448):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (4200448-8388607, default 8388607):

Created a new partition 6 of type 'Linux' and of size 2 GiB.
```

و حالا باید نوع پارتیشن ۶ را به swap تغییر بدهم:

```text
Command (m for help): t
Partition number (1,2,5,6, default 6): 6
Hex code or alias (type L to list all): L

00 Empty            24 NEC DOS          81 Minix / old Lin  bf Solaris
01 FAT12            27 Hidden NTFS Win  82 Linux swap / So  c1 DRDOS/sec (FAT-
02 XENIX root       39 Plan 9           83 Linux            c4 DRDOS/sec (FAT-
03 XENIX usr        3c PartitionMagic   84 OS/2 hidden or   c6 DRDOS/sec (FAT-
04 FAT16 <32M       40 Venix 80286      85 Linux extended   c7 Syrinx
05 Extended         41 PPC PReP Boot    86 NTFS volume set  da Non-FS data
06 FAT16            42 SFS              87 NTFS volume set  db CP/M / CTOS / .
07 HPFS/NTFS/exFAT  4d QNX4.x           88 Linux plaintext  de Dell Utility
08 AIX              4e QNX4.x 2nd part  8e Linux LVM        df BootIt
09 AIX bootable     4f QNX4.x 3rd part  93 Amoeba           e1 DOS access
0a OS/2 Boot Manag  50 OnTrack DM       94 Amoeba BBT       e3 DOS R/O
0b W95 FAT32        51 OnTrack DM6 Aux  9f BSD/OS           e4 SpeedStor
0c W95 FAT32 (LBA)  52 CP/M             a0 IBM Thinkpad hi  ea Linux extended
0e W95 FAT16 (LBA)  53 OnTrack DM6 Aux  a5 FreeBSD          eb BeOS fs
0f W95 Ext'd (LBA)  54 OnTrackDM6       a6 OpenBSD          ee GPT
10 OPUS             55 EZ-Drive         a7 NeXTSTEP         ef EFI (FAT-12/16/
11 Hidden FAT12     56 Golden Bow       a8 Darwin UFS       f0 Linux/PA-RISC b
12 Compaq diagnost  5c Priam Edisk      a9 NetBSD           f1 SpeedStor
14 Hidden FAT16 <3  61 SpeedStor        ab Darwin boot      f4 SpeedStor
16 Hidden FAT16     63 GNU HURD or Sys  af HFS / HFS+       f2 DOS secondary
17 Hidden HPFS/NTF  64 Novell Netware   b7 BSDI fs          fb VMware VMFS
18 AST SmartSleep   65 Novell Netware   b8 BSDI swap        fc VMware VMKCORE
1b Hidden W95 FAT3  70 DiskSecure Mult  bb Boot Wizard hid  fd Linux raid auto
1c Hidden W95 FAT3  75 PC/IX            bc Acronis FAT32 L  fe LANstep
1e Hidden W95 FAT1  80 Old Minix        be Solaris boot     ff BBT

Aliases:
   linux          - 83
   swap           - 82
   extended       - 05
   uefi           - EF
   raid           - FD
   lvm            - 8E
   linuxex        - 85
Hex code or alias (type L to list all): swap

Changed type of partition 'Linux' to 'Linux swap / Solaris'.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 4198399 2097152   1G 83 Linux
/dev/sda6       4200448 8388607 4188160   2G 82 Linux swap / Solaris
```

عالی و راضی‌کننده! حالا با `v` صحت جدول را بررسی (Verify) و سپس با `w` نتایج را روی دیسک می‌نویسیم:

```text
Command (m for help): v
No errors detected.
Remaining 4094 unallocated 512-byte sectors.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

root@debianamd:~# fdisk -l /dev/sda
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 4198399 2097152   1G 83 Linux
/dev/sda6       4200448 8388607 4188160   2G 82 Linux swap / Solaris
```

#### ابزار gdisk

همانطور که در [فصل ۱۰۲.۱](/Gitab/books/book13/Book/06/1021-design-hard-disk-layout/) دیدیم، روی ماشین‌های GPT از `gdisk` استفاده کردیم. کار با آن تفاوت چندانی با `fdisk` ندارد. بیایید نگاهی به دستورهای اصلی آن بیندازیم:

```text
root@debianamd:~# gdisk /dev/sda
GPT fdisk (gdisk) version 1.0.6  

Warning: Partition table header claims that the size of partition table
entries is 0 bytes, but this program  supports only 128-byte entries.
Adjusting accordingly, but partition table may be garbage.
Warning: Partition table header claims that the size of partition table
entries is 0 bytes, but this program  supports only 128-byte entries.
Adjusting accordingly, but partition table may be garbage.
Partition table scan:
  MBR: MBR only
  BSD: not present
  APM: not present
  GPT: not present


***************************************************************
Found invalid GPT and valid MBR; converting MBR to GPT format
in memory. THIS OPERATION IS POTENTIALLY DESTRUCTIVE! Exit by
typing 'q' if you don't want to convert your MBR partitions
to GPT format!
***************************************************************

Command (? for help): ?
b	back up GPT data to a file
c	change a partition's name
d	delete a partition
i	show detailed information on a partition
l	list known partition types
n	add a new partition
o	create a new empty GUID partition table (GPT)
p	print the partition table
q	quit without saving changes
r	recovery and transformation options (experts only)
s	sort partitions
t	change a partition's type code
v	verify disk
w	write table to disk and exit
x	extra functionality (experts only)
?	print this menu
```

همانطور که می‌بینید، جدول پارتیشن باید با تنظیمات BIOS یا UEFI سیستم شما سازگار باشد.

#### ابزار parted

`parted` ابزار گنو برای ویرایش پارتیشن‌هاست. مزیت اصلی آن توانایی تغییر اندازه (Resize) پارتیشن‌های تعریف‌شده فعلی است، اما کار با آن نسبت به `fdisk` و `gdisk` کمی قلق‌دارتر است:

```text
# parted
GNU Parted 3.4
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) help
  align-check TYPE N                       check partition N for TYPE(min|opt) alignment
  help [COMMAND]                           print general help, or help on COMMAND
  mklabel,mktable LABEL-TYPE               create a new disklabel (partition table)
  mkpart PART-TYPE [FS-TYPE] START END     make a partition
  name NUMBER NAME                         name partition NUMBER as NAME
  print [devices|free|list,all|NUMBER]     display the partition table, available devices, free space, all found partitions, or a particular partition
  quit                                     exit program
  rescue START END                         rescue a lost partition near START and END
  resizepart NUMBER END                    resize partition NUMBER
  rm NUMBER                                delete partition NUMBER
  select DEVICE                            choose the device to edit
  disk_set FLAG STATE                      change the FLAG on selected device
  disk_toggle [FLAG]                       toggle the state of FLAG on selected device
  set NUMBER FLAG STATE                    change the FLAG on partition NUMBER
  toggle [NUMBER [FLAG]]                   toggle the state of FLAG on partition NUMBER
  unit UNIT                                set the default unit to UNIT
  version                                  display the version number and copyright information of GNU Parted
```

#### یک پیشنهاد؟ از gparted استفاده کنید

ابزار `gparted` یک برنامه گرافیکی برای مدیریت پارتیشن‌های شماست. این ابزار توانایی تغییر اندازه پارتیشن‌ها را دارد و کار با آن فوق‌العاده ساده است. هرچند جزو سرفصل‌های آزمون LPIC نیست، اما بد نیست درباره‌اش بدانید؛ برای روز مبادا! ([gparted.org](https://gparted.org/))

### فرمت کردن پارتیشن‌ها

#### فایل‌سیستم‌ها (Filesystems)

بعد از اینکه دستگاه‌های بلوکی را پارتیشن‌بندی کردید، باید آن‌ها را فرمت کنید تا برای ذخیره فایل‌ها و دایرکتوری‌ها قابل استفاده شوند. فرمت کردن یک فایل‌سیستم، نقشه‌ای می‌سازد که مکان و نام فایل‌ها و دایرکتوری‌ها را نگه می‌دارد و جابه‌جایی فایل‌ها بین پوشه‌ها، حذف یا تغییر نام آن‌ها را ممکن می‌کند؛ آن را مثل فهرست مطالب یک کتاب در نظر بگیرید.

در دنیای لینوکس فایل‌سیستم‌های متعددی وجود دارد، اما پرکاربردترین آن‌ها این‌ها هستند:

| فرمت | توضیحات |
| :---: | :--- |
| `ext2` | دومین فایل‌سیستم توسعه‌یافته که برای رفع کاستی‌های فایل‌سیستم قدیمی Unix/Minix در نسخه‌های اولیه لینوکس ساخته شد و سال‌ها به شکل گسترده مورد استفاده قرار گرفت. در `ext2` قابلیت ژورنالینگ (Journaling) وجود ندارد و تا حد زیادی جای خود را به `ext3` و اخیراً `ext4` داده است. |
| `ext3` | همان `ext2` به اضافه ژورنالینگ؛ حداکثر اندازه فایل ۲ ترابایت و حداکثر اندازه فایل‌سیستم ۱۶ ترابایت است. |
| `ext4` | نسخه فعلی خانواده ext؛ حداکثر اندازه فایل ۱۶ ترابایت و حداکثر اندازه فایل‌سیستم ۱ اگزابایت (معادل ۱۰۰۰×۱۰۰۰ ترابایت) است. |
| `XFS` | دارای ژورنالینگ، کش کردن در رم، عالی برای سیستم‌های دارای منبع تغذیه اضطراری (UPS)؛ حداکثر اندازه فایل و فایل‌سیستم ۸ اگزابایت است. |
| `swap` | زمانی استفاده می‌شود که سیستم به حافظه رم بیشتری نسبت به رم فیزیکی موجود نیاز دارد؛ مثل یک رم کمکی روی دیسک عمل می‌کند. |
| `VFAT` | همان FAT32؛ بدون ژورنالینگ، مناسب برای تبادل داده با ویندوز، اما **دسترسی‌ها (Permissions)** و لینک‌های سمبولیک را نمی‌فهمد. |
| `exFAT` | نسخه توسعه‌یافته FAT؛ نسخه‌ای جدیدتر که عمدتاً برای دستگاه‌های جانبی مانند فلش‌های USB استفاده می‌شود تا روی همه سیستم‌ها کار کند. |
| `btrfs` | یک فایل‌سیستم جدید و پرسرعت؛ حداکثر اندازه فایل و فایل‌سیستم ۱۶ اگزابایت است. ساختار RAID و LVM داخلی، اسنپ‌شات (Snapshot) توکار، تحمل خطا و فشرده‌سازی آنی داده‌ها را دارد. |

#### ایجاد فایل‌سیستم‌ها

می‌توانید پارتیشن‌ها را با دستور `mkfs` (و برای swap با دستور `mkswap`) فرمت کنید. `mkfs` یک پیش‌رابط (Front-end) برای دستورهایی مثل `mkfs.ext3` (برای *ext3*)، `mkfs.ext4` (برای *ext4*) و `mkfs.reiserfs` (برای *ReiserFS*) است. لیست کامل دستورهای نصب‌شده روی سیستم را می‌توانید این‌طور ببینید:

```text
# ls /sbin/mk*
/sbin/mkdosfs  /sbin/mkexfatfs	/sbin/mkfs.bfs	   /sbin/mkfs.exfat  /sbin/mkfs.ext3  /sbin/mkfs.fat	/sbin/mkfs.msdos  /sbin/mkfs.vfat	  /sbin/mkinitramfs   /sbin/mkntfs
/sbin/mke2fs   /sbin/mkfs	/sbin/mkfs.cramfs  /sbin/mkfs.ext2   /sbin/mkfs.ext4  /sbin/mkfs.minix	/sbin/mkfs.ntfs   /sbin/mkhomedir_helper  /sbin/mklost+found  /sbin/mkswap
```

اگر از خود `mkfs` استفاده می‌کنید، سوییچ اصلی برای مشخص کردن فرمت `-t` (یا `--type`) است:

```text
# mkfs -t ext4 /dev/sda1
mke2fs 1.46.2 (28-Feb-2021)
Discarding device blocks: done
Creating filesystem with 262144 4k blocks and 65536 inodes
Filesystem UUID: 63625ecd-857a-419f-a300-12395aaad89f
Superblock backups stored on blocks:
	32768, 98304, 163840, 229376

Allocating group tables: done
Writing inode tables: done
Creating journal (8192 blocks): done
Writing superblocks and filesystem accounting information: done

root@debianamd:~# mkfs.exfat /dev/sda5
mkexfatfs 1.3.0
Creating... done.
Flushing... done.
File system created successfully.
```

اگر نیاز دارید به پارتیشن یک برچسب (Label) اختصاص دهید، باید از گزینه `-L label_name` استفاده کنید. توجه داشته باشید که در سیستم‌های امروزی، معمولاً به جای برچسب از UUID استفاده می‌شود. UUID یک دیسک را می‌توان با دستور زیر مشاهده کرد:

```text
# blkid /dev/sda1
/dev/sda1: UUID="63625ecd-857a-419f-a300-12395aaad89f" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="40bd0f72-01"
```

و به عنوان آخرین کار، بیایید روی `/dev/sda6` یک فضای swap بسازیم:

```text
# mkswap /dev/sda6
Setting up swapspace version 1, size = 2 GiB (2144333824 bytes)
no label, UUID=6a59cf20-8fd6-4d86-b044-89f7bc67993b
```

و سپس آن را فعال می‌کنیم:

```bash
# swapon /dev/sda6
```

در [فصل ۱۰۴.۳](/Gitab/books/book13/Book/22/1043-control-mounting-and-unmounting-of-filesystems/) خواهیم دید که چطور می‌توانیم این فایل‌سیستم‌ها را **مانت (Mount)** و **آنمانت (Unmount)** کنیم.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1041_create_partitions_and_filesystems.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
