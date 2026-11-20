---
layout: layout.njk
title: "۱۰۴.۷ مکان‌یابی فایل‌ها و استاندارد FHS"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 26
chapterSection: "موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها"
permalink: /books/book13/Book/26/1047-find-system-files-and-place-files-in-the-correct-location/index.html
---
{% raw %}
# ۱۰۴.۷ مکان‌یابی فایل‌ها و استاندارد FHS

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> استاندارد ساختار پوشه‌های لینوکس (Filesystem Hierarchy Standard)، جستجو با find، locate، which و whereis.
</div>



## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۲_

داوطلبان باید کاملاً با **استاندارد سلسله‌مراتب فایل‌سیستم (FHS)**، شامل محل قرارگیری معمول فایل‌ها و دسته‌بندی دایرکتوری‌ها آشنا باشند.

### حوزه‌های دانش کلیدی

* درک محل صحیح قرارگیری فایل‌ها بر اساس استاندارد FHS.
* پیدا کردن فایل‌ها و دستورات در یک سیستم لینوکسی.
* شناخت محل و هدف فایل‌ها و دایرکتوری‌های مهم مطابق تعریف FHS.

### دستورات و فایل‌های کلیدی

<div dir="ltr">

* `find`
* `locate`
* `updatedb`
* `whereis`
* `which`
* `type`
* `/etc/updatedb.conf`

</div>

## استاندارد FHS

استاندارد سلسله‌مراتب فایل‌سیستم (**Filesystem Hierarchy Standard** یا به اختصار **FHS**) سندی است که ساختار سلسله‌مراتب فایل‌ها در لینوکس/یونیکس را توصیف می‌کند. دانستن این استاندارد بسیار کاربردی است؛ چون به شما به عنوان مدیر سیستم کمک می‌کند خیلی راحت هر چیزی را که دنبالش هستید پیدا کنید.

| دایرکتوری | کاربرد |
| :---: | :--- |
| `/` | ریشه سلسله‌مراتب اصلی و دایرکتوری ریشه کل فایل‌سیستم |
| `/bin` | فایل‌های باینری دستورات ضروری |
| `/boot` | فایل‌های ایستا (Static) مربوط به بوت‌لودر |
| `/dev` | فایل‌های دستگاه‌ها (Device files) |
| `/etc` | فایل‌های پیکربندی سیستم مختص این میزبان |
| `/lib` | کتابخانه‌های اشتراکی ضروری و ماژول‌های کرنل |
| `/media` | نقطه اتصال (Mount point) برای رسانه‌های جداشدنی (مثل فلش و CD) |
| `/mnt` | نقطه اتصال برای مانت کردن موقت یک فایل‌سیستم |
| `/opt` | بسته‌های نرم‌افزاری و اپلیکیشن‌های جانبی |
| `/sbin` | فایل‌های باینری ضروری برای مدیریت سیستم |
| `/srv` | داده‌های مربوط به سرویس‌هایی که این سیستم ارائه می‌دهد |
| `/tmp` | فایل‌های موقت |
| `/usr` | سلسله‌مراتب ثانویه |
| `/var` | داده‌های متغیر (Variable data) |
| `/home` | دایرکتوری خانگی کاربران (اختیاری) |
| `/lib` | فرمت جایگزین کتابخانه‌های اشتراکی ضروری (اختیاری) |
| `/root` | دایرکتوری خانگی کاربر `root` (اختیاری) |

<br>

دایرکتوری `/usr` سطح دوم سلسله‌مراتب است و شامل داده‌های اشتراک‌پذیر و فقط-خواندنی (Read-only) است. این بخش قابلیت به اشتراک‌گذاری بین سیستم‌ها را دارد، هرچند در عمل امروزه کمتر این کار انجام می‌شود.

فایل‌سیستم `/var` شامل فایل‌های داده‌ی متغیر است؛ از جمله دایرکتوری‌ها و فایل‌های صف (spool)، داده‌های مدیریتی و لاگ‌ها، و فایل‌های گذرا و موقت. برخی بخش‌های `/var` بین سیستم‌های مختلف قابل اشتراک‌گذاری نیستند، اما بخش‌های دیگری مانند `/var/mail`، `/var/cache/man`، `/var/cache/fonts` و `/var/spool/news` می‌توانند به اشتراک گذاشته شوند.

## متغیر PATH

یک نصب معمولی لینوکس فایل‌های بسیار زیادی دارد؛ در سیستم من مثلاً ۷۴۱٬۳۴۱ فایل وجود دارد. پس شل (Shell) چطور یک دستور را پیدا و اجرا می‌کند؟ این کار از طریق متغیری به نام `PATH` انجام می‌شود:

```text
$ echo $PATH
/home/jadi/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games;/home/jadi/bin/
```

و برای کاربر `root`:

```text
# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

همانطور که می‌بینید، این فهرستی از دایرکتوری‌هاست که با دونقطه (`:`) از هم جدا شده‌اند. بدیهی است که می‌توانید `PATH` خود را با دستور `export PATH=$PATH:/usr/new/dir` تغییر دهید یا برای دائمی شدنش آن را در فایل `.bashrc` بگذارید.

## مکان‌یابی فایل‌ها (Locating files)

### دستورات `which`، `type` و `whereis`

دستور `which` اولین جایی که دستور مورد نظر در `PATH` ظاهر شده را نشان می‌دهد. به عبارت دیگر `which mkfs` به شما می‌گوید اگر دستور `mkfs` را بزنید دقیقاً کدام فایل اجرا خواهد شد:

```text
$ which mkfs
/usr/bin/mkfs
jadi@ubuntuserver:~$ which ping
/usr/bin/ping
jadi@ubuntuserver:~$ which -a ping
/usr/bin/ping
/bin/ping
```

> **نکته:** از سوئیچ `-a` برای نمایش تمام موارد موجود در `PATH` استفاده کنید، نه فقط اولین مورد.

اما دستور `cd` کجاست؟

```bash
jadi@ubuntuserver:~$ which cd
jadi@ubuntuserver:~$ type cd
cd is a shell builtin
```

همانطور که می‌بینید `which` چیزی برای `cd` پیدا نکرد، بنابراین با `type` امتحان کردیم تا ببینیم اصلاً این چیه!

```text
$ type type
type is a shell builtin
$ type for
for is a shell keyword
$ type mkfs
mkfs is /sbin/mkfs
$ type chert
bash: type: chert: not found
```

دستور `type` از `which` عمومی‌تر است و _کلمات کلیدی بش (bash keywords)_ و دستورات درونی شل (builtins) را هم می‌شناسد و نمایش می‌دهد.

دستور کاربردی دیگر در این دسته `whereis` است. برخلاف `which`، دستور `whereis` علاوه بر مسیر فایل باینری، صفحات راهنما (man pages) و کدهای منبع برنامه‌ها را هم نشان می‌دهد:

```text
$ whereis mkfs
mkfs: /usr/sbin/mkfs /usr/share/man/man8/mkfs.8.gz
```

> **نکته:** یک دستور `whatis` هم وجود دارد؛ حتماً امتحانش کنید.

### دستور `find`

این دستور را قبلاً در [فصل ۱۰۳.۷](/Gitab/books/book13/Book/18/1037-search-text-files-using-regular-expressions/) دیده‌ایم، اما بیایید چند سوئیچ جدید را بررسی کنیم:

* سوئیچ‌های `-user` و `-group` کاربر و گروه مشخصی را تعیین می‌کنند.
* سوئیچ `-maxdepth` به `find` می‌گوید چقدر در عمق دایرکتوری‌ها پایین برود.

```text
$ find /tmp/ -maxdepth 1 -user jadi | head
/tmp/1
/tmp/2
```

حتی می‌توانید فایل‌هایی که به هیچ کاربر یا گروهی تعلق ندارند را با `-nouser` و `-nogroup` پیدا کنید.

> **نکته:** مانند سایر _آزمون‌ها (tests)_ در `find`، می‌توانید یک `!` درست قبل از هر عبارت بگذارید تا آن را نفی کنید. پس دستور زیر فایل‌هایی را پیدا می‌کند که متعلق به `jadi` **نیستند**: `find . ! -user jadi`

همچنین استفاده از آن برای پیدا کردن فایل‌هایی با رشته‌های خاص در نامشان بسیار رایج است:

```bash
$ sudo find /etc -iname "*vmware*"
/etc/vmware-tools
/etc/vmware-tools/scripts/vmware
```

### دستورات `locate` و `updatedb`

احتمالاً `find` را امتحان کرده‌اید و خوشتان آمده، اما یک ایراد دارد: جستجوی زنده و لحظه‌ای انجام می‌دهد! این کار می‌تواند سیستم شما را کند کند یا فشار زیادی به هارد وارد کند یا در فایل‌سیستم‌های بزرگ خیلی طول بکشد. برای حل این مشکل دستور سریع‌تری وجود دارد:

```bash
$ locate networking
/etc/cloud/cloud.cfg.d/subiquity-disable-cloudinit-networking.cfg
/snap/core20/1408/usr/lib/python3/dist-packages/cloudinit/distros/networking.py
/snap/core20/1408/usr/lib/python3/dist-packages/cloudinit/distros/__pycache__/networking.cpython-38.pyc
/snap/core20/1826/usr/lib/python3/dist-packages/cloudinit/distros/networking.py
/snap/core20/1826/usr/lib/python3/dist-packages/cloudinit/distros/__pycache__/networking.cpython-38.pyc
/usr/lib/python3/dist-packages/cloudinit/distros/networking.py
/usr/lib/python3/dist-packages/cloudinit/distros/__pycache__/networking.cpython-310.pyc
/usr/lib/python3/dist-packages/sos/report/plugins/networking.py
/usr/lib/python3/dist-packages/sos/report/plugins/__pycache__/networking.cpython-310.pyc
```

و خیلی هم سریع است:

```bash
$ time locate kernel / | wc -l
16989

real	0m0.091s
user	0m0.094s
sys	0m0.034s
```

دلیل این سرعت بالا آن است که داده‌هایش را از یک پایگاه داده می‌خواند که با دستور `updatedb` ساخته شده است (بسته آن در دبیان `plocate` نام دارد). معمولاً این دستور به صورت خودکار (با یک cronjob) هر روز اجرا می‌شود. فایل پیکربندی آن `/etc/updatedb.conf` یا `/etc/sysconfig/locate` است:

```bash
$ cat /etc/updatedb.conf
PRUNE_BIND_MOUNTS="yes"
# PRUNENAMES=".git .bzr .hg .svn"
PRUNEPATHS="/tmp /var/spool /media /home/.ecryptfs"
PRUNEFS="NFS nfs nfs4 rpc_pipefs afs binfmt_misc proc smbfs autofs iso9660 ncpfs coda devpts ftpfs devfs mfs shfs sysfs cifs lustre tmpfs usbfs udf fuse.glusterfs fuse.sshfs curlftpfs ecryptfs fusesmb devtmpfs"
```

شما می‌توانید با اجرای دستور `updatedb` با دسترسی `root` این پایگاه داده را به‌روزرسانی کنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1047_find_system_files_and_place_files_in_the_correct_location.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
