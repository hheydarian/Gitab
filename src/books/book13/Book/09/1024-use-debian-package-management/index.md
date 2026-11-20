---
layout: layout.njk
title: "۱۰۲.۴ مدیریت بسته‌ها در دبیان و اوبونتو (APT و DPKG)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 9
chapterSection: "موضوع ۱۰۲: نصب و مدیریت بسته"
permalink: /books/book13/Book/09/1024-use-debian-package-management/index.html
---
{% raw %}
# ۱۰۲.۴ مدیریت بسته‌ها در دبیان و اوبونتو (APT و DPKG)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> دستورات dpkg، apt-get، apt-cache، تنظیم مخازن در sources.list و رفع مشکلات وابستگی.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/jtwbweigRxo" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۳

**شرح هدف آزمون:** داوطلبان باید بتوانند مدیریت بسته‌ها را با استفاده از ابزارهای مدیریت بسته دبیان انجام دهند.

## سرفصل‌های کلیدی دانش

* نصب، ارتقا و حذف بسته‌های باینری دبیان
* پیدا کردن بسته‌هایی که شامل فایل‌ها یا کتابخانه‌های خاصی هستند (چه نصب شده باشند و چه نباشند)
* به‌دست‌آوردن اطلاعات بسته مثل نسخه، محتوا، وابستگی‌ها، یکپارچگی بسته و وضعیت نصب (صرف‌نظر از اینکه بسته نصب باشد یا نه)
* آشنایی با دستور `apt`

## اصطلاحات و ابزارها

* فایل `/etc/apt/sources.list`
* دستور `dpkg`
* دستور `dpkg-reconfigure`
* دستور `apt-get`
* دستور `apt-cache`

## مفهوم سیستم مدیریت بسته (Package Management System)

بعضی‌ها فکر می‌کنند در گنو/لینوکس مجبوریم تمام نرم‌افزارهای مورد نیازمان را خودمان کامپایل کنیم. این تصور در ۹۹ درصد مواقع درست نیست و در ۲۰ سال گذشته هم هرگز این‌طور نبوده است. در واقع گنو/لینوکس پیش‌درآمد چیزی است که امروزه به آن «اپ استور» (App Store) می‌گوییم. تمام توزیع‌های بزرگ آرشیوهای عظیمی از نرم‌افزارهای ازپیش‌کامپایل‌شده دارند که به آن‌ها **مخازن (Repositories)** می‌گویند، و نوعی نرم‌افزار به نام **مدیر بسته (Package Manager)** دارند که کارهایی مثل جستجو در این مخازن، نصب نرم‌افزار از آن‌ها، پیدا کردن وابستگی‌ها، نصب آن‌ها، حل تداخل‌ها و به‌روزرسانی سیستم و برنامه‌های نصب‌شده را بر عهده می‌گیرد. توزیع‌های مبتنی بر دبیان از فایل‌های `.deb` به عنوان «بسته» (Package) استفاده می‌کنند و ابزارهایی مانند `apt-get`، `dpkg`، `apt` و موارد مشابه را برای مدیریت آن‌ها به کار می‌برند.

بسته‌های دبیان نام‌هایی به شکل `NAME_VERSION-RELEASE_ARCHITECTURE.deb` دارند؛ مثلاً `tmux_3.2a-4build1_amd64.deb`.

## مخازن (Repositories)

اما این بسته از کجا آمده است؟ سیستم‌عامل چطور می‌فهمد برای پیدا کردن این بسته `.deb` کجا را بگردد؟ پاسخ **مخازن (Repositories)** است. هر توزیع مخزن بسته‌های خودش را دارد. این مخزن می‌تواند روی یک دیسک، یک درایو شبکه، مجموعه‌ای از DVDها، یا در رایج‌ترین حالت، یک آدرس اینترنتی باشد.

در سیستم‌های مبتنی بر دبیان، مسیرهای اصلی تنظیم مخازن عبارت‌اند از:

<div dir="ltr">

* `/etc/apt/sources.list`
* `/etc/apt/sources.list.d/`

</div>

```text
jadi@lpicjadi:~$ cat /etc/apt/sources.list
#deb cdrom:[Ubuntu 22.04 LTS _Jammy Jellyfish_ - Beta amd64 (20220329.1)]/ jammy main restricted

# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://us.archive.ubuntu.com/ubuntu/ jammy main restricted
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://us.archive.ubuntu.com/ubuntu/ jammy-updates main restricted
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in the universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://us.archive.ubuntu.com/ubuntu/ jammy universe
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy universe
deb http://us.archive.ubuntu.com/ubuntu/ jammy-updates universe
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free license. Please satisfy yourself as to
## your rights to use the software. Also, please note that the software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://us.archive.ubuntu.com/ubuntu/ jammy multiverse
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy multiverse
deb http://us.archive.ubuntu.com/ubuntu/ jammy-updates multiverse
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://us.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu jammy-security main restricted
# deb-src http://security.ubuntu.com/ubuntu jammy-security main restricted
deb http://security.ubuntu.com/ubuntu jammy-security universe
# deb-src http://security.ubuntu.com/ubuntu jammy-security universe
deb http://security.ubuntu.com/ubuntu jammy-security multiverse
# deb-src http://security.ubuntu.com/ubuntu jammy-security multiverse

# This system was installed using small removable media
# (e.g. netinst, live or single CD). The matching "deb cdrom"
# entries were disabled at the end of the installation process.
# For information about how to configure apt package sources,
# see the sources.list(5) manual.
```

برای به‌روزرسانی اطلاعات مخازن از دستور زیر استفاده می‌کنیم:

```bash
apt-get update
```

این دستور تمام مخازن موجود در فایل‌های پیکربندی را بررسی می‌کند و فهرست اطلاعات مربوط به آخرین نسخه‌های نرم‌افزاری موجود در آن‌ها را به‌روزرسانی می‌کند.

> **نکته:** این کار نرم‌افزارهای شما را **ارتقا (Upgrade)** نمی‌دهد! دستور `update` فقط **اطلاعات مربوط به بسته‌ها (فهرست مخازن) را به‌روز می‌کند، نه خود بسته‌های نصب‌شده را.**

## نصب بسته‌ها

فرض کنید درباره یک تسهیم‌کننده ترمینال فوق‌العاده به نام `tmux` شنیده‌اید و می‌خواهید آن را امتحان کنید:

```text
$ tmux
The program 'tmux' is currently not installed. You can install it by typing:
sudo apt-get install tmux
$ which tmux
$ type tmux
bash: type: tmux: not found
```

پس بیایید نصبش کنیم. اگر بسته مورد نظر در مخازن موجود باشد، کافی است به مدیر بسته بگویید آن را نصب کند:

```bash
apt-get install tmux
```

توجه داشته باشید که:

* دستور `apt-get install` از شما تاییدیه (`Y`) می‌خواهد.
* ابزار `apt-get` به صورت خودکار **وابستگی‌ها (Dependencies)** را حل می‌کند؛ یعنی می‌داند برای نصب این بسته به چه پیش‌نیازهایی احتیاج است و آن‌ها را هم نصب می‌کند.
* بسته‌های دبیان فایل‌هایی با پسوند `.deb` هستند.

اگر فقط می‌خواهید یک شبیه‌سازی / تستِ بدون اعمال تغییر (Dry-run) انجام دهید:

```bash
apt-get install -s tmux
```

و دستور زیر فقط فایل‌های مورد نیاز را در کش دانلود می‌کند، بدون اینکه آن‌ها را نصب کند:

```bash
apt-get install --download-only tmux
```

بسته‌های دانلودشده به عنوان کش در مسیر `/var/cache/apt/archives/` (یا `/var/cache/apt/archive/`) ذخیره می‌شوند.

اگر می‌خواهید فقط یک بسته مشخص را در دایرکتوری فعلی دانلود کنید، می‌توانید بنویسید:

```bash
apt-get download tmux
```

## حذف بسته‌های دبیان

برای حذف یک بسته:

```bash
apt-get remove tmux
```

و اگر می‌خواهید وابستگی‌هایی را که به صورت خودکار نصب شده بودند هم حذف کنید:

```bash
$ apt-get autoremove tmux
```

یا حتی به شکل کلی:

```text
$ apt-get autoremove
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages will be REMOVED:
  linux-image-3.16.0-25-generic linux-image-extra-3.16.0-25-generic
0 upgraded, 0 newly installed, 2 to remove, and 0 not upgraded.
After this operation, 203 MB of disk space will be freed.
Do you want to continue? [Y/n] y
```

تا هر بسته غیرضروری و بلااستفاده‌ای را به صورت خودکار پاک کند.

**نکات:**

* حذف کردن یک بسته با `remove` به صورت خودکار وابستگی‌های آن را حذف نمی‌کند.
* اگر بخواهید یک وابستگی را حذف کنید، سیستم درباره بسته‌های دیگری که همراه آن حذف خواهند شد به شما هشدار می‌دهد.

## جستجو برای بسته‌ها

اگر از مجموعه ابزارهای `apt` استفاده می‌کنید، جستجو از طریق `apt-cache` انجام می‌شود یا می‌توانید از دستور جدیدتر و عمومی `apt` استفاده کنید:

```bash
$ apt-cache search "tiny window"
$ apt search grub2
```

## ارتقای بسته‌ها (Upgrading)

برای به‌روزرسانی یک بسته خاص:

```bash
apt-get install tzdata
```

و برای ارتقای تمام بسته‌های نصب‌شده روی سیستم:

```bash
apt-get upgrade
```

یا برای ارتقا به یک نسخه جدیدتر از توزیع (و حل تغییرات پیچیده وابستگی‌ها):

```bash
apt-get dist-upgrade
```

> **نکته:** مثل بیشتر ابزارهای دیگر لینوکس، می‌توانید تنظیمات پیش‌فرض `apt` را در مسیر `/etc/apt/apt.conf` پیکربندی کنید و برنامه‌ای به نام `apt-config` نیز برای همین منظور وجود دارد.

## پیکربندی مجدد بسته‌ها

بسته‌های دبیان می‌توانند *اقدامات پیکربندی* داشته باشند که بلافاصله پس از نصب بسته اجرا می‌شوند. این کار توسط `debconf` انجام می‌شود. مثلاً بسته `tzdata` پس از نصب درباره تنظیمات منطقه زمانی از شما سوال می‌پرسد. اگر بخواهید بسته‌ای را که از قبل نصب شده **دوباره پیکربندی** کنید، می‌توانید از دستور `dpkg-reconfigure` استفاده نمایید:

```bash
dpkg-reconfigure tzdata
```

## دریافت اطلاعات بسته با `dpkg`

ابزار زیربنایی برای کار مستقیم با فایل‌های `.deb` دستور `dpkg` است. هر زمان بخواهید کارهای دستی روی یک بسته `.deb` انجام دهید، باید سراغ آن بروید. ساختار کلی آن این‌طور است:

```text
dpkg [OPTIONS] ACTION PACKAGE
```

برخی از عملیات پرکاربرد (`ACTION`) عبارت‌اند از:

| سوئیچ | توضیحات |
| :--- | :--- |
| `-c` یا `--contents` | نمایش محتویات درون یک فایل `.deb` |
| `-C` یا `--audit` | جستجوی بسته‌های نصب‌شده خراب یا ناقص و پیشنهاد راه‌حل |
| `--configure` | پیکربندی یک بسته بازشده (یا پیکربندی مجدد) |
| `-i` یا `--install` | نصب یا ارتقای یک بسته `.deb` (وابستگی‌ها را حل و نصب نمی‌کند!) |
| `-I` یا `--info` | نمایش اطلاعات کلی درباره یک فایل بسته `.deb` |
| `-l` یا `--list` | فهرست کردن تمام بسته‌های نصب‌شده روی سیستم |
| `-L` یا `--listfiles` | فهرست کردن تمام فایل‌هایی که مربوط به این بسته هستند |
| `-P` یا `--purge` | حذف کامل بسته به همراه فایل‌های پیکربندی آن |
| `-r` یا `--remove` | حذف بسته، با نگه داشتن فایل‌های پیکربندی |
| `-s` یا `--status` | نمایش وضعیت و جزئیات یک بسته نصب‌شده |
| `-S` یا `--search` | جستجو برای پیدا کردن اینکه یک فایل مشخص متعلق به کدام بسته است |

می‌توانید محتویات یک فایل `.deb` را این‌طور بررسی کنید:

```text
jadi@lpicjadi:/tmp$ dpkg --contents bzr_2.7.0+bzr6622+brz_all.deb
drwxr-xr-x root/root         0 2019-09-19 18:25 ./
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/share/
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/share/doc/
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/share/doc/bzr/
-rw-r--r-- root/root       404 2019-09-19 18:25 ./usr/share/doc/bzr/NEWS.Debian.gz
-rw-r--r-- root/root      1301 2019-09-19 18:25 ./usr/share/doc/bzr/changelog.gz
-rw-r--r-- root/root      1769 2019-09-19 18:25 ./usr/share/doc/bzr/copyright
```

یا یک بسته `.deb` را نصب کنید (بدون وابستگی‌هایش) یا وضعیت آن را ببینید:

```text
$ dpkg -s bzr
Package: bzr
Status: deinstall ok config-files
Priority: optional
Section: vcs
Installed-Size: 102
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 2.6.0+bzr6595-1ubuntu1
Config-Version: 2.6.0+bzr6595-1ubuntu1
Depends: python-bzrlib (<= 2.6.0+bzr6595-1ubuntu1.1~), python-bzrlib (>= 2.6.0+bzr6595-1ubuntu1), python:any
Recommends: python-gpgme
Suggests: bzr-doc, bzrtools, python-bzrlib.tests
Breaks: bzr-pqm (<< 1.4.0~bzr80), bzr-xmloutput (<< 0.8.8+bzr160), python-bzrlib (<< 2.4.0~beta3~)
Conffiles:
 /etc/bash_completion.d/bzr b8d9ca95521a7c5f14860e205a854da2
Description: easy to use distributed version control system
 Bazaar is a distributed version control system designed to be easy to
 use and intuitive, able to adapt to many workflows, reliable, and
 easily extendable.
 .
 Publishing of branches can be done over plain HTTP, that is, no special
 software is needed on the server to host Bazaar branches. Branches can
 be pushed to the server via sftp (which most SSH installations come
 with), FTP, or over a custom and faster protocol if bzr is installed in
 the remote end.
 .
 Merging in Bazaar is easy, as the implementation can avoid many
 spurious conflicts deals well with repeated merges between branches,
 and can handle modifications to renamed files correctly.
 .
 Bazaar is written in Python and has a flexible plugin interface that
 can be used to extend its functionality. Many plugins exist, providing
 useful commands (bzrtools), graphical interfaces (qbzr), or native
 interaction with Subversion branches (bzr-svn).
 .
 Install python-paramiko if you are going to push branches to remote
 hosts with sftp, and python-pycurl if you'd like SSL certificates
 always to be verified.
Homepage: http://bazaar-vcs.org
Original-Maintainer: Debian Bazaar Maintainers <pkg-bazaar-maint@lists.alioth.debian.org>
```

یا حتی یک بسته نصب‌شده را به طور کامل پاکسازی (**purge**) کنید؛ یعنی حذف خود بسته به همراه تمام فایل‌های پیکربندی آن. برای این کار از سوئیچ **`-P`** یا **`--purge`** استفاده کنید.

همچنین سوئیچ **`-L`** فایل‌ها و دایرکتوری‌هایی را که یک بسته نصب کرده است نشان می‌دهد:

```text
$ dpkg -L bzr
/.
/usr
/usr/bin
/usr/bin/jcal
/usr/share
/usr/share/doc
/usr/share/doc/jcal
/usr/share/doc/jcal/README
/usr/share/doc/jcal/copyright
/usr/share/man
/usr/share/man/man1
/usr/share/man/man1/jcal.1.gz
/usr/share/doc/jcal/changelog.Debian.gz
```

و سوئیچ **`-S`** نشان می‌دهد فایل داده شده توسط کدام بسته نصب شده است:

```text
$ dpkg -S /var/lib/mplayer/prefs/mirrors
mplayer: /var/lib/mplayer/prefs/mirrors
```

## گزینه‌های رایج `apt-get`

| گزینه | کاربرد |
| :--- | :--- |
| `autoclean` | فایل‌های بسته‌های بلااستفاده و قدیمی را از کش پاک می‌کند |
| `check` | پایگاه داده بسته‌ها را برای یافتن مشکلات وابستگی بررسی می‌کند |
| `clean` | کش بسته‌های دانلودشده را پاک می‌کند (با `clean` مخزن محلی فایل‌های `.deb` خالی می‌شود تا از نو شروع کنید) |
| `dist-upgrade` | نسخه‌های جدیدتر سیستم‌عامل و تغییرات بزرگ وابستگی را بررسی و ارتقا می‌دهد |
| `install` | بسته‌ها را نصب یا ارتقا می‌دهد |
| `remove` | یک بسته را حذف می‌کند |
| `source` | کد منبع (Source) یک بسته را دانلود می‌کند |
| `update` | اطلاعات مربوط به بسته‌ها را از مخازن به‌روزرسانی می‌کند |
| `upgrade` | تمام بسته‌های نصب‌شده را ارتقا می‌دهد |

> **نکته:** گاهی یک بسته بدون داشتن وابستگی‌های لازم نصب می‌شود (مثلاً با استفاده از `dpkg -i`) یا فرآیند نصب به هر دلیلی نیمه‌کاره قطع می‌شود. در این مواقع دستور `apt-get install -f` بسیار راهگشاست؛ `-f` مخفف `fix broken` (تعمیر بسته‌های شکسته) است.

## گزینه‌های رایج `apt-cache`

| گزینه | کاربرد |
| :--- | :--- |
| `depends` | نمایش وابستگی‌های یک بسته |
| `pkgnames` | نمایش نام تمام بسته‌های موجود در کش سیستم |
| `search` | جستجو در نام و توضیحات بسته‌ها |
| `showpkg` | نمایش اطلاعات عمومی درباره یک بسته |
| `stats` | نمایش آمار کلی درباره مخازن و بسته‌ها |
| `unmet` | نمایش وابستگی‌های برآورده‌نشده برای تمام بسته‌های نصب‌شده یا بسته مشخص‌شده |

## سایر ابزارها

ابزارهای دیگری هم وجود دارند؛ از ابزارهای دارای رابط گرافیکی زیبا گرفته تا ابزارهای متنی و رابط کاربری ترمینالی مثل `aptitude`.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1024_use_debian_package_management.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
