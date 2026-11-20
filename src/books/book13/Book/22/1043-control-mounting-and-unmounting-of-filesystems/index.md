---
layout: layout.njk
title: "۱۰۴.۳ کنترل مانت و جداسازی دیسک‌ها (Mount)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 22
chapterSection: "موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها"
permalink: /books/book13/Book/22/1043-control-mounting-and-unmounting-of-filesystems/index.html
---
{% raw %}
# ۱۰۴.۳ کنترل مانت و جداسازی دیسک‌ها (Mount)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> دستورات mount و umount، پیکربندی فایل حیاتی /etc/fstab و استفاده از UUID برای مانت پایدار.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/dod65eKzWtw" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۳

داوطلبان باید بتوانند مانت کردن (سوار کردن) یک فایل‌سیستم را پیکربندی کنند:

* مانت و آنمانت کردن دستی فایل‌سیستم‌ها
* پیکربندی مانت خودکار فایل‌سیستم‌ها در زمان بوت شدن سیستم
* پیکربندی فایل‌سیستم‌های قابل حمل به طوری که کاربران عادی هم بتوانند آن‌ها را مانت کنند
* استفاده از برچسب‌ها (Labels) و UUIDها برای شناسایی و مانت کردن فایل‌سیستم‌ها
* آشنایی با واحدهای مانت systemd (`systemd mount units`)

فهرست فایل‌ها و دستورهای مرتبط:

<div dir="ltr">

* `/etc/fstab`
* `/media/`
* `mount`
* `umount`
* `blkid`
* `lsblk`

</div>

## مانت و آنمانت کردن (Mounting و Unmounting)

وقتی یک پارتیشن فرمت‌شده داریم و می‌خواهیم از آن استفاده کنیم، باید آن را جایی در سلسله‌مراتب دایرکتوری‌های لینوکس **مانت (Mount)** کنیم. بر خلاف ویندوز، درایو جدید به عنوان یک دیسک جداگانه (مثل `D:` یا `E:`) ظاهر نمی‌شود، بلکه مثل یک **زیردایرکتوری مجازی** در جایی از درخت ریشه `/` قرار می‌گیرد.

فرض کنید می‌خواهیم `/dev/sda3` را روی `/media/mydisk` مانت کنیم. دایرکتوری `/media/mydisk` باید از قبل وجود داشته باشد و سپس کافی است اجرا کنیم:

```bash
sudo mount -t ext4 /dev/sda3 /media/mydisk
```

پس از آن، تمام فایل‌ها و پوشه‌های داخل `/dev/sda3` از طریق مسیر `/media/mydisk` در دسترس خواهند بود.

برای دیدن تمام دستگاه‌های مانت‌شده، دستور `mount` را بدون هیچ پارامتری اجرا کنید. برای **آنمانت (Unmount)** کردن یا جدا کردن دیسک هم کافی است دستور `umount` (دقت کنید: `umount` بدون `n` بعد از `u`) را روی نام درایو یا مسیر دایرکتوری اجرا کنید. این دو دستور کاملاً معادل هستند:

```bash
sudo umount /dev/sda3
sudo umount /media/mydisk
```

مانت و آنمانت کردن می‌تواند روی انواع مختلفی از فضاهای ذخیره‌سازی انجام شود؛ مثلاً فضاهای شبکه‌ای NFS، فایل‌های ISO (با گزینه `-o loop`)، حافظه موقت `tmpfs` و غیره.

> **نکته:** دیسک‌های swap نیازی به مانت کردن ندارند. برای فعال و غیرفعال کردن آن‌ها باید از دستورهای `swapon` و `swapoff` استفاده کنید.

```bash
mount -t ext4 /dev/sda1 /media
```

سوییچ `-t` نوع فایل‌سیستم را مشخص می‌کند.

```bash
mount -o remount,ro /dev/sda1
```

سوییچ `-o` گزینه‌های مانت را ارسال می‌کند (مثلاً `ro` برای حالت فقط‌خواندنی / Read-Only).

معمولاً این‌ها به شکل یک دستور یک‌خطی به کار می‌روند:

```bash
mount -t ext4 -o remount,ro /dev/sda1 /media
```

> **نکته:** دایرکتوری‌های `/media` و `/mnt` به طور مرسوم برای مانت کردن فایل‌سیستم‌ها استفاده می‌شوند، هرچند شما می‌توانید از هر دایرکتوری دیگری هم برای این کار استفاده کنید.

### شناسه UUID و برچسب‌ها (Labels)

همانطور که قبلاً دیده‌اید، کار کردن با نام‌های کلاسیک دستگاه‌ها مثل `/dev/vdb1` یک مشکل دارد: ممکن است تغییر کنند! دیسکی که الان `/dev/sdb` است، ممکن است بعد از جدا و وصل کردن دوباره به عنوان `/dev/sdd` شناخته شود. برای حل این مشکل، بهتر است با **UUID** (شناسه یکتای جهانی) کار کنید. آن‌ها را می‌توانید با `lsblk` (گزینه `-O` همه ستون‌های موجود را نشان می‌دهد یا با `-o` ستون دلخواه را مثل زیر مشخص می‌کنید) و `blkid` بررسی کنید:

```text
# lsblk -o +UUID
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS                             UUID
sr0     11:0    1  1.8G  0 rom  /run/media/jadi/Fedora-WS-Live-35_B-1-2 2021-09-22-21-47-34-00
zram0  251:0    0  1.9G  0 disk [SWAP]                                  
vda    252:0    0   20G  0 disk                                         
├─vda1 252:1    0  600M  0 part /boot/efi                               E13A-EF36
├─vda2 252:2    0    1G  0 part /boot                                   19ed96a1-3b36-4202-81bb-349f7adfb8b1
└─vda3 252:3    0 18.4G  0 part /home                                   076766a5-8864-4e35-a632-464b03396f7a
                                /                                       
vdb    252:16   0    2G  0 disk                                         
└─vdb1 252:17   0    2G  0 part /tmp/lkj                                4c1a51e6-47bf-4a34-84a2-87027c91e14a

# blkid
/dev/vdb1: UUID="4c1a51e6-47bf-4a34-84a2-87027c91e14a" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="5415e516-01"
/dev/sr0: BLOCK_SIZE="2048" UUID="2021-09-22-21-47-34-00" LABEL="Fedora-WS-Live-35_B-1-2" TYPE="iso9660"
/dev/zram0: LABEL="zram0" UUID="e459f522-1675-40d2-b318-51d9bd16d7bb" TYPE="swap"
/dev/vda2: UUID="19ed96a1-3b36-4202-81bb-349f7adfb8b1" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="5f4ee154-3ade-4af6-8809-6d90d5827d39"
/dev/vda3: LABEL="fedora_localhost-live" UUID="076766a5-8864-4e35-a632-464b03396f7a" UUID_SUB="a4340a29-6d9b-4c28-a7c8-b4aab5d08893" BLOCK_SIZE="4096" TYPE="btrfs" PARTUUID="a46e64aa-65ef-4a62-9bf8-96fd19aee353"
/dev/vda1: UUID="E13A-EF36" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="a7a2b260-0302-45bc-a4db-42bd2e0ee7f2"

# blkid /dev/vdb1
/dev/vdb1: UUID="4c1a51e6-47bf-4a34-84a2-87027c91e14a" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="5415e516-01"

# mount UUID="4c1a51e6-47bf-4a34-84a2-87027c91e14a" /media/mydisk/
```

### فایل fstab

لینوکس برای مانت خودکار از فایل `/etc/fstab` استفاده می‌کند. این فایل مثل یک جدول است که مشخص می‌کند هر فایل‌سیستم هنگام بوت شدن کجا باید مانت شود. این فایل `/etc/fstab` سیستم فدورای من است:

```text
# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Wed Oct 20 13:16:38 2021
#
# Accessible filesystems, by reference, are maintained under '/dev/disk/'.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run 'systemctl daemon-reload' to update systemd
# units generated from this file.
#
UUID=076766a5-8864-4e35-a632-464b03396f7a /                       btrfs   subvol=root,compress=zstd:1 0 0
UUID=19ed96a1-3b36-4202-81bb-349f7adfb8b1 /boot                   ext4    defaults        1 2
UUID=E13A-EF36          /boot/efi               vfat    umask=0077,shortname=winnt 0 2
UUID=076766a5-8864-4e35-a632-464b03396f7a /home                   btrfs   subvol=home,compress=zstd:1 0 0
```

ستون‌های این فایل به ترتیب عبارت‌اند از:

- **فایل‌سیستم (file system):** برچسب (`LABEL`)، شناسه (`UUID`) یا نام دستگاه (مثلاً `/dev/sda1`)
- **نقطه مانت (mount point):** مسیر دایرکتوری مقصد، یا `swap` / `none` برای پارتیشن swap
- **نوع (type):** می‌تواند `ext4`، `xfs`، `nfs` یا سایر انواع فایل‌سیستم باشد
- **گزینه‌ها (options):** مانند `defaults`، `rw` / `ro`، `noauto`، `user`، `exec` / `noexec`، `noatime`، `umask`
- **بکاپ (dump):** آیا دستور `dump` باید از این پارتیشن پشتیبان بگیرد؟ معمولاً `0` گذاشته می‌شود
- **بررسی سلامت (pass):** مقادیر غیرصفر برای `pass` ترتیب بررسی فایل‌سیستم‌ها با `fsck` در زمان بوت را مشخص می‌کنند (`1` برای ریشه `/`، `2` برای سایرین و `0` یعنی بررسی نشود)

> **نکته:**
> - فایل‌سیستم‌هایی که با گزینه `user` توسط کاربر عادی مانت می‌شوند، به صورت پیش‌فرض `noexec` هستند (فایل‌های اجرایی داخلشان اجرا نمی‌شوند)، مگر اینکه `exec` را **بعد** از `user` ذکر کنید.
> - گزینه `noatime` ثبت زمان آخرین دسترسی (Access time) به فایل‌ها را غیرفعال می‌کند. ثبت نکردن زمان دسترسی می‌تواند سرعت و کارایی دیسک را بهبود دهد.

## واحدهای مانت systemd

هنگام استفاده از `systemd`، فایل پیکربندی واحدی که نام آن به `.mount` ختم می‌شود، اطلاعات مربوط به یک نقطه مانت فایل‌سیستم را که توسط `systemd` کنترل و نظارت می‌شود در خود نگه می‌دارد.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1043_control_mounting_and_unmounting_of_filesystems.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
