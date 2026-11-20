---
layout: layout.njk
title: "۱۰۴.۲ نگهداری و بررسی یکپارچگی فایل‌سیستم‌ها"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 21
chapterSection: "موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها"
permalink: /books/book13/Book/21/1042-maintain-the-integrity-of-filesystems/index.html
---
{% raw %}
# ۱۰۴.۲ نگهداری و بررسی یکپارچگی فایل‌سیستم‌ها

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> بررسی سلامت دیسک با fsck، e2fsck، نظارت بر پارامترها با tune2fs و بررسی فضای مصرفی با df و du.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/qcAZ7vr6W9U" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۲

داوطلبان باید بتوانند یک فایل‌سیستم استاندارد و همچنین داده‌های اضافی مرتبط با فایل‌سیستم‌های ژورنال‌دار (Journaling) را نگهداری و مدیریت کنند.

## اهداف و ابزارهای کلیدی

* بررسی یکپارچگی و سلامت فایل‌سیستم‌ها
* پایش فضای آزاد و تعداد inodeها
* تعمیر مشکلات ساده فایل‌سیستم

فهرست دستورهای مرتبط:

<div dir="ltr">

* `du`
* `df`
* `fsck`
* `e2fsck`
* `mke2fs`
* `tune2fs`
* `xfs_repair`
* `xfs_fsr`
* `xfs_db`

</div>

## دستورهای du و df

در بسیاری از مواقع می‌خواهید بفهمید چقدر فضای خالی روی دیسک باقی مانده، یک دایرکتوری خاص چقدر فضا اشغال کرده، یا چند عدد `inode` باقی مانده است.

> **نکته:** ساختار `inode` (یا index node) یک ساختار داده در فایل‌سیستم‌های شبه یونیکسی است که یک شیء فایل‌سیستمی مثل فایل یا دایرکتوری را توصیف می‌کند. هر `inode` ویژگی‌ها و موقعیت بلوک‌های داده آن شیء روی دیسک را ذخیره می‌کند. ویژگی‌های شیء می‌تواند شامل فراداده (زمان آخرین تغییر، دسترسی و ویرایش) و همچنین اطلاعات مالک و سطح دسترسی باشد. یک دایرکتوری در واقع فهرستی از inodeها به همراه نام‌های اختصاص‌داده‌شده به آن‌هاست که شامل ورودی برای خودش، والدش و هر یک از فرزندانش می‌شود. <small>([ویکی‌پدیا](https://en.wikipedia.org/wiki/Inode))</small>

### دستور df

دستور `df` (مخفف **d**isk **f**ree) برای اطلاع از فضای آزاد و فضای مصرف‌شده روی فایل‌سیستم‌ها به کار می‌رود:

```text
jadi@funlife:~$ df -TH
Filesystem        Type      Size  Used Avail Use% Mounted on
/dev/sda2         ext4       23G   15G  7.7G  65% /
none              tmpfs     4.0K     0  4.0K   0% /sys/fs/cgroup
udev              devtmpfs  3.9G  4.0K  3.9G   1% /dev
tmpfs             tmpfs     788M  1.4M  786M   1% /run
none              tmpfs     5.0M  4.0K  5.0M   1% /run/lock
none              tmpfs     3.9G   19M  3.9G   1% /run/shm
none              tmpfs     100M   28K  100M   1% /run/user
/dev/mapper/chome ext4      243G  229G   14G  95% /home/jadi
/dev/sdb1         vfat      3.7G  7.8M  3.6G   1% /media/jadi/BA82-BECD
```

در اینجا سوییچ `-T` به `df` می‌گوید نوع فایل‌سیستم‌ها را هم نمایش دهد و `-H` اعداد را برای انسان خوانا می‌کند (در توان‌های ۱۰۰۰؛ برای توان‌های ۲ یعنی ۱۰۲۴ از `-h` استفاده کنید).

در برخی فایل‌سیستم‌ها (مانند `ext2` تا `ext4`) تعداد ثابتی `inode` داریم، بنابراین ممکن است لازم باشد تعداد inodeهای باقی‌مانده را هم چک کنید. برای این کار از سوییچ `-i` استفاده کنید:

```text
jadi@funlife:~$ df -i
Filesystem          Inodes  IUsed    IFree IUse% Mounted on
/dev/sda2          1531904 458616  1073288   30% /
none               1007533      4  1007529    1% /sys/fs/cgroup
udev               1003703    542  1003161    1% /dev
tmpfs              1007533    644  1006889    1% /run
none               1007533      3  1007530    1% /run/lock
none               1007533    162  1007371    1% /run/shm
none               1007533     33  1007500    1% /run/user
/dev/mapper/chome 16171008 269293 15901715    2% /home/jadi
/dev/sdb1                0      0        0     - /media/jadi/BA82-BECD
```

> **نکته:** فرمت فایل `vfat` اصلاً `inode` ندارد؛ در فایل‌سیستم‌های `vfat` مفهومی به نام مالک فایل یا دسترسی‌های لینوکسی وجود ندارد.

### دستور du

دستور `du` (مخفف **d**isk **u**sage) فضای مصرف‌شده توسط **دایرکتوری‌ها و فایل‌ها** را نمایش می‌دهد. سوییچ‌های پرکاربرد آن عبارت‌اند از:

| سوییچ | کاربرد |
| :---: | :--- |
| `-h` | چاپ حجم‌ها در توان‌های ۱۰۲۴ (مثلاً `1023M`) به صورت خوانا برای انسان |
| `-c` | نمایش جمع کل (Grand total) در انتها |
| `--max-depth 2` | همه چیز را محاسبه می‌کند اما فقط تا عمق ۲ دایرکتوری نمایش می‌دهد |
| `-s` | فقط خلاصه جمع کل را نمایش می‌دهد و دایرکتوری‌ها را یکی‌یکی نشان نمی‌دهد |

```text
jadi@funlife:~/w/lpic$ du
16    ./101
701456    ./done
701464    ./Logo/chert
704588    ./Logo
12    ./data
12    ./100
9432884    .
jadi@funlife:~/w/lpic$ du -c
16    ./101
701456    ./done
701464    ./Logo/chert
704588    ./Logo
12    ./data
12    ./100
9432884    .
9432884    total
jadi@funlife:~/w/lpic$ du -hs
9.0G    .
```

> **نکته:** در بسیاری از مواقع وقتی می‌خواهم ببینم چه چیزی فضای سرورم را پر کرده، دستوری شبیه به `sudo du /home -h --max-depth 1` را اجرا می‌کنم.

## بررسی سلامت فایل‌سیستم‌ها

### دستور fsck

اگر اتفاق بدی برای فایل‌سیستم شما بیفتد (مثلاً برق ناگهانی قطع شود)، با یک فایل‌سیستم خراب‌شده طرف خواهید بود. دستور عمومی برای تعمیر این وضعیت `fsck` است. از نظر فنی، این دستور یک پیش‌رابط (Front-end) برای چندین دستور دیگر است:

```text
jadi@funlife:~$ ls /sbin/*fsck*
/sbin/dosfsck       /sbin/fsck.ext2     /sbin/fsck.fat     /sbin/fsck.vfat
/sbin/e2fsck       /sbin/fsck.ext3     /sbin/fsck.minix
/sbin/fsck       /sbin/fsck.ext4     /sbin/fsck.msdos
/sbin/fsck.cramfs  /sbin/fsck.ext4dev  /sbin/fsck.nfs
```

> **نکته:** برخی از این فایل‌ها در واقع فقط Hard linkهایی به دستور `e2fsck` هستند.

یک سوییچ رایج در زمان بوت، `-A` است که به `fsck` می‌گوید تمام فایل‌سیستم‌های موجود در `/etc/fstab` را به ترتیب مقدار `passno` (ستون ششم آن فایل) بررسی کند (فایل‌سیستم‌هایی که `passno` آن‌ها `0` باشد، هنگام بوت بررسی نمی‌شوند).

```text
root@funlife:~# fsck /dev/sdb
fsck from util-linux 2.25.1
e2fsck 1.42.10 (18-May-2014)
/dev/sdb is in use.
e2fsck: Cannot continue, aborting.


root@funlife:~# umount /dev/sdb
umount: /dev/sdb: not mounted
root@funlife:~# umount /dev/sdb1
root@funlife:~# fsck /dev/sdb
fsck from util-linux 2.25.1
e2fsck 1.42.10 (18-May-2014)
ext2fs_open2: Bad magic number in super-block
fsck.ext2: Superblock invalid, trying backup blocks...
fsck.ext2: Bad magic number in super-block while trying to open /dev/sdb

The superblock could not be read or does not describe a valid ext2/ext3/ext4
filesystem.  If the device is valid and it really contains an ext2/ext3/ext4
filesystem (and not swap or ufs or something else), then the superblock
is corrupt, and you might try running e2fsck with an alternate superblock:
    e2fsck -b 8193 <device>
 or
    e2fsck -b 32768 <device>
```

همچنین می‌توانید فایل‌سیستم‌ها را با UUID (که با دستور `blkid` پیدا می‌کنید) یا با برچسب (Label) بررسی کنید:

```text
root@funlife:~# fsck /dev/sdb
fsck from util-linux 2.25.1
e2fsck 1.42.10 (18-May-2014)
ext2fs_open2: Bad magic number in super-block
fsck.ext2: Superblock invalid, trying backup blocks...
fsck.ext2: Bad magic number in super-block while trying to open /dev/sdb

The superblock could not be read or does not describe a valid ext2/ext3/ext4
filesystem.  If the device is valid and it really contains an ext2/ext3/ext4
filesystem (and not swap or ufs or something else), then the superblock
is corrupt, and you might try running e2fsck with an alternate superblock:
    e2fsck -b 8193 <device>
 or
    e2fsck -b 32768 <device>

root@funlife:~# blkid
/dev/sda1: LABEL="movies"
/dev/sdb1: UUID="BA82-BECD" TYPE="vfat" PARTUUID="381add66-01"
root@funlife:~# fsck LABEL=movies
fsck from util-linux 2.25.1
root@funlife:~# fsck UUID="BA82-BECD"
fsck from util-linux 2.25.1
fsck.fat 3.0.26 (2014-03-07)
/dev/sdb1: 14 files, 1972/945094 clusters
```

از `-N` استفاده کنید تا بدون اجرای واقعی، ببینید چه دستور یا آزمونی قرار است اجرا شود:

```text
root@funlife:~# fsck -N UUID="BA82-BECD"
fsck from util-linux 2.25.1
[/sbin/fsck.vfat (1) -- /dev/sdb1] fsck.vfat /dev/sdb1
```

> **نکته:** برای بررسی یک فایل‌سیستم XFS (در نسخه‌های جدیدتر `xfs_repair -n` هم به کار می‌رود) در قدیم از دستور `xfs_check` استفاده می‌شد.

برخی نسخه‌ها سوییچ `-a` را برای تعمیر خودکار تمام مشکلات یافت‌شده دارند، اما استفاده از آن معمولاً توصیه نمی‌شود.

### دستور e2fsck

دستور `e2fsck` برای بررسی فایل‌سیستم‌های خانواده `ext2`/`ext3`/`ext4` استفاده می‌شود. برای فایل‌سیستم‌های `ext3` و `ext4` که از `journal` استفاده می‌کنند، اگر سیستم به شکل غیرتمیز (Unclean) و بدون خطای سخت‌افزاری خاموش شده باشد، معمولاً پس از بازپخش تراکنش‌های ثبت‌شده در ژورنال، فایل‌سیستم به عنوان «تمیز» (Clean) علامت‌گذاری می‌شود. بنابراین، برای فایل‌سیستم‌های دارای **journaling**، دستور `e2fsck` به صورت عادی ژورنال را بازپخش کرده و خارج می‌شود، مگر اینکه سوپربلاک نشان دهد بررسی‌های بیشتری لازم است.

آرگومان `device` یک دستگاه بلوکی (مثلاً `/dev/sdc1`) یا فایلی شامل فایل‌سیستم است.

توجه داشته باشید که به طور کلی اجرای `e2fsck` روی فایل‌سیستم‌های **مانت‌شده (Mounted)** ایمن نیست. تنها استثنا زمانی است که گزینه `-n` مشخص شده باشد و گزینه‌های `-c`، `-l` یا `-L` داده نشده باشند. با این حال، حتی اگر اجرای آن در این حالت بی‌خطر باشد، نتایج چاپ‌شده توسط `e2fsck` در زمان مانت بودن فایل‌سیستم معتبر نیستند. اگر `e2fsck` پرسید که آیا باید یک فایل‌سیستم مانت‌شده را بررسی کند یا نه، تنها پاسخ درست `no` است؛ فقط متخصصانی که دقیقاً می‌دانند چه می‌کنند ممکن است پاسخ دیگری بدهند.

اگر `e2fsck` در حالت تعاملی اجرا شود (یعنی هیچ‌کدام از گزینه‌های `-y`، `-n` یا `-p` مشخص نشده باشند)، برنامه برای تعمیر هر مشکل یافت‌شده از کاربر سوال می‌پرسد: پاسخ `y` خطا را تعمیر می‌کند، `n` آن را دست‌نخورده می‌گذارد و `a` این مشکل و تمام مشکلات بعدی را خودکار حل می‌کند؛ زدن `Enter` پاسخ پیش‌فرض را انتخاب می‌کند که قبل از علامت سوال چاپ شده است. زدن `Control-C` نیز فوراً به `e2fsck` خاتمه می‌دهد.

### دستور mke2fs

دستور `mke2fs` برای ساخت فایل‌سیستم‌های `ext2`، `ext3` یا `ext4` (معمولاً روی یک پارتیشن دیسک) به کار می‌رود. آرگومان `device` فایل ویژه متناظر با دستگاه است (مثلاً `/dev/hdXX` یا `/dev/sdXX`) و `blocks-count` تعداد بلوک‌های روی دستگاه را مشخص می‌کند که اگر وارد نشود، `mke2fs` به طور خودکار اندازه فایل‌سیستم را تشخیص می‌دهد. اگر این دستور با نام `mkfs.ext3` فراخوانی شود، مثل این است که گزینه `-j` داده شده باشد و یک ژورنال نیز ساخته می‌شود.

مقادیر پیش‌فرض پارامترهای فایل‌سیستم تازه ساخته‌شده، در صورتی که با گزینه‌های خط فرمان بازنویسی نشوند، توسط فایل پیکربندی `/etc/mke2fs.conf` کنترل می‌شوند. برای جزئیات بیشتر صفحه راهنمای `mke2fs.conf(5)` را ببینید.

### دستور tune2fs

این دستور برای تنظیم و بهینه‌سازی فایل‌سیستم‌های خانواده `ext` است. می‌تواند اطلاعات را نمایش دهد و بسیاری از گزینه‌ها را تغییر دهد. گزینه `-l` پیکربندی‌های فعلی را لیست می‌کند:

```text
jadi@funlife:~$ sudo tune2fs -l /dev/sda2
tune2fs 1.42.10 (18-May-2014)
Filesystem volume name:   <none>
Last mounted on:          /
Filesystem UUID:          1651a94e-0b4e-47fb-aca0-f77e05714617
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file uninit_bg dir_nlink extra_isize
Filesystem flags:         signed_directory_hash
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              1531904
Block count:              6123046
Reserved block count:     306152
Free blocks:              2302702
Free inodes:              1073461
First block:              0
Block size:               4096
Fragment size:            4096
Reserved GDT blocks:      1022
Blocks per group:         32768
Fragments per group:      32768
Inodes per group:         8192
Inode blocks per group:   512
Flex block group size:    16
Filesystem created:       Mon Dec  1 10:21:42 2014
Last mount time:          Sat Jan 31 17:21:51 2015
Last write time:          Sat Jan 31 17:21:51 2015
Mount count:              32
Maximum mount count:      -1
Last checked:             Mon Dec  1 10:21:42 2014
Check interval:           0 (<none>)
Lifetime writes:          103 GB
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:              256
Required extra isize:     28
Desired extra isize:      28
Journal inode:            8
First orphan inode:       786620
Default directory hash:   half_md4
Directory Hash Seed:      16c38a41-e709-4e04-b1c2-8a79d71ea7e8
Journal backup:           inode blocks
```

### دستور debugfs

این یک ابزار تعاملی برای دیباگ کردن فایل‌سیستم‌های `ext` است. به صورت پیش‌فرض فایل‌سیستم را در حالت فقط‌خواندنی (Read-only) باز می‌کند مگر اینکه با گزینه `-w` خلاف آن را بگوییم. با این ابزار حتی می‌توان فایل‌ها و دایرکتوری‌های پاک‌شده را بازیابی کرد:

```text
root@funlife:~# debugfs /dev/sda2
debugfs 1.42.10 (18-May-2014)
debugfs:  cd /etc/        <-- cd
debugfs:  pwd            <-- show were am I
[pwd]   INODE: 524289  PATH: /etc
[root]  INODE:      2  PATH: /
debugfs:  stat passwd        <-- show data on one file
Inode: 527187   Type: regular    Mode:  0644   Flags: 0x80000
Generation: 1875144872    Version: 0x00000000:00000001
User:     0   Group:     0   Size: 2145
File ACL: 0    Directory ACL: 0
Links: 1   Blockcount: 8
Fragment:  Address: 0    Number: 0    Size: 0
 ctime: 0x548d4241:a7b196fc -- Sun Dec 14 11:24:41 2014
 atime: 0x54cc635b:6acfc148 -- Sat Jan 31 08:38:43 2015
 mtime: 0x548d4241:a01076f8 -- Sun Dec 14 11:24:41 2014
crtime: 0x548d4241:9f1c52f8 -- Sun Dec 14 11:24:41 2014
Size of extra inode fields: 28
EXTENTS:
(0):2188172
debugfs:  ncheck 527187        <-- node check an inode
Inode    Pathname        
527187    /etc/passwd
debugfs:  q            <-- quit
```

#### سوپربلاک (Superblock)

سیستم‌های یونیکسی برای ذخیره **فراداده فایل‌سیستم (Filesystem metadata)** از سوپربلاک‌ها استفاده می‌کنند. در بیشتر مواقع این بلوک در ابتدای فایل‌سیستم قرار دارد و نسخه‌های پشتیبان آن در بخش‌های دیگر دیسک هم تکرار می‌شوند. سوییچ `-n` در `mke2fs` محل سوپربلاک‌ها را (بدون ساخت فایل‌سیستم واقعی) نمایش می‌دهد:

```text
# mke2fs -n /dev/sda7
mke2fs 1.41.9 (22-Aug-2009)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
7159808 inodes, 28637862 blocks
1431893 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=4294967296
874 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks:
    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
    4096000, 7962624, 11239424, 20480000, 23887872
```

## ابزارهای XFS

> **نکته:** در برخی توزیع‌ها، ابزارهای `xfs` به صورت پیش‌فرض نصب نیستند و ممکن است لازم باشد بسته `xfsprogs` را نصب کنید.

این ابزارها برای فایل‌سیستم‌های XFS همان نقشی را دارند که `tune2fs` و خانواده آن برای ext دارند.

> **نکته:** دستور `xfs_info` باید روی فایل‌سیستم‌های مانت‌شده اجرا شود.

| دستور | کاربرد |
| :---: | :--- |
| `xfs_info` | نمایش اطلاعات فایل‌سیستم XFS |
| `xfs_growfs` | گسترش دادن (افزایش حجم) فایل‌سیستم XFS |
| `xfs_admin` | تغییر پارامترها روی فایل‌سیستم‌های XFS |
| `xfs_repair` | تعمیر مشکلات فایل‌سیستم XFS؛ توجه کنید که فایل‌سیستم تحت تعمیر باید آنمانت (Unmounted) باشد |
| `xfs_db` | بررسی و دیباگ فایل‌سیستم؛ برای بازرسی فایل‌سیستم XFS به کار می‌رود. در شرایط نادر می‌توان از آن برای تغییر یک فایل‌سیستم XFS نیز استفاده کرد، اما این کار معمولاً به `xfs_repair` یا اسکریپت‌هایی مثل `xfs_admin` (که در پس‌زمینه `xfs_db` را اجرا می‌کنند) سپرده می‌شود |
| `xfs_fsr` | بازسازمان‌دهنده (Defragmenter) فایل‌سیستم برای XFS؛ وقتی بدون آرگومان اجرا شود، تمام فایل‌های عادی در همه فایل‌سیستم‌های مانت‌شده را بازچینی می‌کند. در هر نوبت از روی `/etc/mtab` روی فایل‌سیستم‌های XFS عبور کرده و فایل‌هایی که بیشترین تعداد قطعه (Extents) را دارند انتخاب و ۱۰٪ بالایی آن‌ها را یکپارچه‌سازی می‌کند |

### تعمیر کردن (Repairing)

ما از `fsck` برای نمایش وضعیت استفاده کردیم، اما هدف اصلی آن **تعمیر** فایل‌سیستم‌هاست. اگر بررسی زمان بوت مشکلی پیدا کند، سیستم شما را وارد خط فرمان اضطراری می‌کند تا مشکل را برطرف کنید.

در فایل‌سیستم‌های بدون ژورنال (`ext2`)، دستور `fsck` سوالات متعددی درباره تک‌تک بلوک‌ها می‌پرسد و اگر می‌خواهید تعمیر شوند باید `y` بزنید. در فایل‌سیستم‌های ژورنال‌دار (`ext3`، `ext4`، `xfs` و ...) کار `fsck` بسیار کمتر و سریع‌تر است.

> **نکته:** برای فایل‌سیستم‌های `xfs` از دستور `xfs_check` (یا `xfs_repair -n`) استفاده می‌شود.

یک سوییچ بسیار مهم `-n` است که باعث می‌شود این دستورها **هیچ تغییری اعمال نکنند** و فقط گزارش دهند که اگر اجرا می‌شدند قرار بود چه کاری انجام دهند.

## سایر ابزارها

برای آزمون LPIC خوب است با این دستورها هم آشنا باشید:

| فایل‌سیستم | دستور | کاربرد |
| :---: | :---: | :--- |
| `ext` | `tune2fs` | نمایش یا تنظیم پارامترهای `ext2` و `ext3` و حتی تنظیم گزینه‌های ژورنالینگ |
| `ext` | `dumpe2fs` | چاپ اطلاعات سوپربلاک و توصیف‌گر گروه بلوک‌ها برای فایل‌سیستم‌های `ext2` یا `ext3` |
| `ext` | `debugfs` | دیباگر تعاملی فایل‌سیستم برای بررسی یا تغییر وضعیت فایل‌سیستم `ext2` یا `ext3` |
| `reiserfs` | `reiserfstune` | نمایش و تنظیم پارامترها در ReiserFS |
| `reiserfs` | `debugreiserfs` | چاپ اطلاعات سوپربلاک و ساختار فایل‌سیستم برای ReiserFS |
| `XFS` | `xfs_info` | نمایش اطلاعات فایل‌سیستم |
| `XFS` | `xfs_growfs` | افزایش فضای فایل‌سیستم |
| `XFS` | `xfs_admin` | تغییر پارامترهای فایل‌سیستم XFS |
| `XFS` | `xfs_repair` | تعمیر خطاها و مشکلات فایل‌سیستم |
| `XFS` | `xfs_db` | بررسی و دیباگ کردن فایل‌سیستم |

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1042_maintain_the_integrity_of_filesystems.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
