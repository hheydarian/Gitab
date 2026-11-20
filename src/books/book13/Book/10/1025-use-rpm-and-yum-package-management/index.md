---
layout: layout.njk
title: "۱۰۲.۵ مدیریت بسته‌ها در ردهت (RPM، YUM و DNF)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 10
chapterSection: "موضوع ۱۰۲: نصب و مدیریت بسته"
permalink: /books/book13/Book/10/1025-use-rpm-and-yum-package-management/index.html
---
{% raw %}
# ۱۰۲.۵ مدیریت بسته‌ها در ردهت (RPM، YUM و DNF)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> نصب و بررسی بسته‌های rpm، مدیریت مخازن و جستجو با yum و dnf.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/qk6qcEAvf4A" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۳

**شرح هدف آزمون:** داوطلبان باید بتوانند مدیریت بسته‌ها را با استفاده از `RPM`، `YUM` و `Zypper` انجام دهند.

## سرفصل‌های کلیدی دانش

* نصب، نصب مجدد، ارتقا و حذف بسته‌ها با استفاده از `RPM`، `YUM` و `Zypper`
* دریافت اطلاعات بسته‌های RPM مانند نسخه، وضعیت، وابستگی‌ها، یکپارچگی (Integrity) و امضاهای دیجیتال (Signatures)
* تشخیص اینکه یک بسته چه فایل‌هایی را ارائه می‌دهد و همچنین پیدا کردن اینکه یک فایل مشخص متعلق به کدام بسته است
* آشنایی با `dnf`

## اصطلاحات و ابزارها

فهرست بخشی از فایل‌ها، اصطلاحات و ابزارهای کاربردی:

* دستور `rpm`
* دستور `rpm2cpio`
* فایل `/etc/yum.conf`
* دایرکتوری `/etc/yum.repos.d/`
* دستور `yum`
* دستور `zypper`

## مقدمه

ابزارهای **RedHat Package Manager (`RPM`)** و **YellowDog Update Manager (`YUM`)** در توزیع‌هایی مثل Fedora، RedHat، RHEL، CentOS، Rocky Linux و ... برای مدیریت بسته‌ها به کار می‌روند. فرمت بسته‌ها `RPM` نام دارد و با ابزار `rpm` مدیریت می‌شود؛ اما اگر بخواهید از مخازن برای نصب، به‌روزرسانی، جستجوی بسته‌ها یا حتی ارتقای کل سیستم استفاده کنید، می‌توانید از دستور `yum` کمک بگیرید. برای درک عمیق‌تر مفهوم مخازن، لطفاً به [بخش قبلی (۱۰۲.۴)](/Gitab/books/book13/Book/09/1024-use-debian-package-management/) مراجعه کنید؛ در اینجا فرض می‌کنیم که با این مفهوم آشنا هستید.

## دستور `yum`

`yum` مدیر بسته مورد استفاده در سیستم‌های مبتنی بر RedHat است. فایل‌های پیکربندی آن در مسیر `/etc/yum.conf` و دایرکتوری `/etc/yum.repos.d/` قرار دارند. در زیر یک نمونه می‌بینید:

```text
# cat /etc/yum.conf
[main]
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=0
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1
gpgcheck=1
plugins=1
installonly_limit=3
```

و در ادامه نمونه‌ای از یک فایل واقعی مخزن (Repo) روی سیستم فدورا را می‌بینید:

```text
# cat /etc/yum.repos.d/fedora.repo
[fedora]
name=Fedora $releasever - $basearch
#baseurl=http://download.example/pub/fedora/linux/releases/$releasever/Everything/$basearch/os/
metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-$releasever&arch=$basearch
enabled=1
countme=1
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

[fedora-debuginfo]
name=Fedora $releasever - $basearch - Debug
#baseurl=http://download.example/pub/fedora/linux/releases/$releasever/Everything/$basearch/debug/tree/
metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-debug-$releasever&arch=$basearch
enabled=0
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

[fedora-source]
name=Fedora $releasever - Source
#baseurl=http://download.example/pub/fedora/linux/releases/$releasever/Everything/source/tree/
metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-source-$releasever&arch=$basearch
enabled=0
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

نحوه استفاده از `yum` به شکل `yum [OPTIONS] [COMMAND] [PACKAGE_NAME]` است.

یکی از مهم‌ترین گزینه‌ها `-y` است که به تمام سوال‌های تایید (بله/خیر) پاسخ *بله* می‌دهد.

در جدول زیر برخی از دستورات مهم `yum` آورده شده است:

| دستور | توضیحات |
| :--- | :--- |
| `update` | متادیتای مخازن را به‌روز کرده و بسته مشخص‌شده یا تمام بسته‌های نصب‌شده را به آخرین نسخه ارتقا می‌دهد |
| `install` | نصب یک بسته |
| `reinstall` | نصب مجدد یک بسته |
| `list` | نمایش فهرست بسته‌ها |
| `info` | نمایش اطلاعات درباره یک بسته |
| `remove` | حذف یک بسته نصب‌شده |
| `search` | جستجو در مخازن برای پیدا کردن بسته‌ها |
| `provides` | بررسی اینکه کدام بسته‌ها یک فایل مشخص را ارائه می‌کنند |
| `upgrade` | ارتقای بسته‌ها و حذف بسته‌های منسوخ‌شده |
| `localinstall` | نصب از روی یک فایل محلی `rpm` (همراه با حل وابستگی از مخازن) |
| `localupdate` | به‌روزرسانی از روی یک فایل محلی `rpm` |
| `check-update` | بررسی مخازن برای یافتن به‌روزرسانی‌های موجود برای بسته‌های نصب‌شده |
| `deplist` | نمایش وابستگی‌های یک بسته |
| `groupinstall` | نصب یک گروه نرم‌افزاری، مثلاً `"KDE Plasma Workspaces"` |
| `history` | نمایش تاریخچه دستورات و عملیات انجام‌شده |

این هم یک نمونه از نصب بسته با `yum`:

```text
# yum install bzr
Last metadata expiration check: 0:00:47 ago on Tue 21 Jun 2022 06:38:00 PM +0430.
Dependencies resolved.
=====================================================================================================================
 Package                                  Architecture       Version                       Repository           Size
=====================================================================================================================
Installing:
 breezy                                   x86_64             3.2.1-3.fc36                  fedora              6.0 M
Installing dependencies:
 libsodium                                x86_64             1.0.18-9.fc36                 fedora              163 k
 python3-bcrypt                           x86_64             3.2.2-1.fc36                  updates              43 k
 python3-certifi                          noarch             2021.10.8-1.fc36              fedora               15 k
 python3-configobj                        noarch             5.0.6-27.fc36                 fedora               63 k
 python3-cryptography                     x86_64             36.0.0-3.fc36                 fedora              1.0 M
 python3-dulwich                          x86_64             0.20.32-1.fc36                fedora              408 k
 python3-httplib2                         noarch             0.20.3-2.fc36                 fedora              122 k
 python3-jeepney                          noarch             0.7.1-2.fc36                  fedora              324 k
 python3-jwt                              noarch             2.4.0-1.fc36                  updates              41 k
 python3-keyring                          noarch             23.6.0-1.fc36                 updates              78 k
 python3-lazr-restfulclient               noarch             0.14.4-2.fc36                 fedora               84 k
 python3-lazr-uri                         noarch             1.0.6-2.fc36                  fedora               33 k
 python3-oauthlib                         noarch             3.0.2-12.fc36                 fedora              169 k
 python3-paramiko                         noarch             2.11.0-1.fc36                 updates             303 k
 python3-patiencediff                     x86_64             0.2.2-4.fc36                  fedora               45 k
 python3-pynacl                           x86_64             1.4.0-5.fc36                  fedora              108 k
 python3-secretstorage                    noarch             3.3.1-4.fc36                  fedora               35 k
 python3-wadllib                          noarch             1.3.6-2.fc36                  fedora               60 k
Installing weak dependencies:
 python3-jwt+crypto                       noarch             2.4.0-1.fc36                  updates             8.9 k
 python3-launchpadlib                     noarch             1.10.15.1-2.fc36              fedora              167 k
 python3-oauthlib+signedtoken             noarch             3.0.2-12.fc36                 fedora              8.5 k
 python3-pyasn1                           noarch             0.4.8-8.fc36                  fedora              134 k

Transaction Summary
=====================================================================================================================
Install  23 Packages

Total download size: 9.4 M
Installed size: 44 M
Is this ok [y/N]: y
Downloading Packages:
(1/23): python3-certifi-2021.10.8-1.fc36.noarch.rpm                                  1.8 kB/s |  15 kB     00:08
(2/23): libsodium-1.0.18-9.fc36.x86_64.rpm                                            15 kB/s | 163 kB     00:10
(3/23): python3-configobj-5.0.6-27.fc36.noarch.rpm                                    10 kB/s |  63 kB     00:06
(4/23): breezy-3.2.1-3.fc36.x86_64.rpm                                               262 kB/s | 6.0 MB     00:23
(5/23): python3-dulwich-0.20.32-1.fc36.x86_64.rpm                                     47 kB/s | 408 kB     00:08
(6/23): python3-cryptography-36.0.0-3.fc36.x86_64.rpm                                 77 kB/s | 1.0 MB     00:13
(7/23): python3-httplib2-0.20.3-2.fc36.noarch.rpm                                    105 kB/s | 122 kB     00:01
(8/23): python3-jeepney-0.7.1-2.fc36.noarch.rpm                                      259 kB/s | 324 kB     00:01
(9/23): python3-launchpadlib-1.10.15.1-2.fc36.noarch.rpm                              74 kB/s | 167 kB     00:02
(10/23): python3-lazr-restfulclient-0.14.4-2.fc36.noarch.rpm                          36 kB/s |  84 kB     00:02
(11/23): python3-lazr-uri-1.0.6-2.fc36.noarch.rpm                                     15 kB/s |  33 kB     00:02
(12/23): python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch.rpm                       4.2 kB/s | 8.5 kB     00:02
(13/23): python3-oauthlib-3.0.2-12.fc36.noarch.rpm                                    58 kB/s | 169 kB     00:02
(14/23): python3-patiencediff-0.2.2-4.fc36.x86_64.rpm                                 15 kB/s |  45 kB     00:02
(15/23): python3-pyasn1-0.4.8-8.fc36.noarch.rpm                                       61 kB/s | 134 kB     00:02
(16/23): python3-pynacl-1.4.0-5.fc36.x86_64.rpm                                       36 kB/s | 108 kB     00:03
(17/23): python3-secretstorage-3.3.1-4.fc36.noarch.rpm                                12 kB/s |  35 kB     00:02
(18/23): python3-wadllib-1.3.6-2.fc36.noarch.rpm                                      24 kB/s |  60 kB     00:02
(19/23): python3-bcrypt-3.2.2-1.fc36.x86_64.rpm                                       16 kB/s |  43 kB     00:02
(20/23): python3-jwt+crypto-2.4.0-1.fc36.noarch.rpm                                  3.2 kB/s | 8.9 kB     00:02
(21/23): python3-jwt-2.4.0-1.fc36.noarch.rpm                                          16 kB/s |  41 kB     00:02
(22/23): python3-keyring-23.6.0-1.fc36.noarch.rpm                                     18 kB/s |  78 kB     00:04
(23/23): python3-paramiko-2.11.0-1.fc36.noarch.rpm                                    38 kB/s | 303 kB     00:08
---------------------------------------------------------------------------------------------------------------------
Total                                                                                177 kB/s | 9.4 MB     00:54
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                             1/1
  Installing       : python3-cryptography-36.0.0-3.fc36.x86_64                                                  1/23
  Installing       : python3-lazr-uri-1.0.6-2.fc36.noarch                                                       2/23
  Installing       : python3-jeepney-0.7.1-2.fc36.noarch                                                        3/23
  Installing       : python3-httplib2-0.20.3-2.fc36.noarch                                                      4/23
  Installing       : python3-secretstorage-3.3.1-4.fc36.noarch                                                  5/23
  Installing       : python3-keyring-23.6.0-1.fc36.noarch                                                       6/23
  Installing       : python3-wadllib-1.3.6-2.fc36.noarch                                                        7/23
  Installing       : python3-jwt-2.4.0-1.fc36.noarch                                                            8/23
  Installing       : python3-jwt+crypto-2.4.0-1.fc36.noarch                                                     9/23
  Installing       : python3-oauthlib-3.0.2-12.fc36.noarch                                                     10/23
  Installing       : python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch                                         11/23
  Installing       : python3-lazr-restfulclient-0.14.4-2.fc36.noarch                                           12/23
  Installing       : python3-launchpadlib-1.10.15.1-2.fc36.noarch                                              13/23
  Installing       : python3-bcrypt-3.2.2-1.fc36.x86_64                                                        14/23
  Installing       : python3-pyasn1-0.4.8-8.fc36.noarch                                                        15/23
  Installing       : python3-patiencediff-0.2.2-4.fc36.x86_64                                                  16/23
  Installing       : python3-configobj-5.0.6-27.fc36.noarch                                                    17/23
  Installing       : python3-certifi-2021.10.8-1.fc36.noarch                                                   18/23
  Installing       : python3-dulwich-0.20.32-1.fc36.x86_64                                                     19/23
  Installing       : libsodium-1.0.18-9.fc36.x86_64                                                            20/23
  Installing       : python3-pynacl-1.4.0-5.fc36.x86_64                                                        21/23
  Installing       : python3-paramiko-2.11.0-1.fc36.noarch                                                     22/23
  Installing       : breezy-3.2.1-3.fc36.x86_64                                                                23/23
  Running scriptlet: breezy-3.2.1-3.fc36.x86_64                                                                23/23
  Verifying        : breezy-3.2.1-3.fc36.x86_64                                                                 1/23
  Verifying        : libsodium-1.0.18-9.fc36.x86_64                                                             2/23
  Verifying        : python3-certifi-2021.10.8-1.fc36.noarch                                                    3/23
  Verifying        : python3-configobj-5.0.6-27.fc36.noarch                                                     4/23
  Verifying        : python3-cryptography-36.0.0-3.fc36.x86_64                                                  5/23
  Verifying        : python3-dulwich-0.20.32-1.fc36.x86_64                                                      6/23
  Verifying        : python3-httplib2-0.20.3-2.fc36.noarch                                                      7/23
  Verifying        : python3-jeepney-0.7.1-2.fc36.noarch                                                        8/23
  Verifying        : python3-launchpadlib-1.10.15.1-2.fc36.noarch                                               9/23
  Verifying        : python3-lazr-restfulclient-0.14.4-2.fc36.noarch                                           10/23
  Verifying        : python3-lazr-uri-1.0.6-2.fc36.noarch                                                      11/23
  Verifying        : python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch                                         12/23
  Verifying        : python3-oauthlib-3.0.2-12.fc36.noarch                                                     13/23
  Verifying        : python3-patiencediff-0.2.2-4.fc36.x86_64                                                  14/23
  Verifying        : python3-pyasn1-0.4.8-8.fc36.noarch                                                        15/23
  Verifying        : python3-pynacl-1.4.0-5.fc36.x86_64                                                        16/23
  Verifying        : python3-secretstorage-3.3.1-4.fc36.noarch                                                 17/23
  Verifying        : python3-wadllib-1.3.6-2.fc36.noarch                                                       18/23
  Verifying        : python3-bcrypt-3.2.2-1.fc36.x86_64                                                        19/23
  Verifying        : python3-jwt+crypto-2.4.0-1.fc36.noarch                                                    20/23
  Verifying        : python3-jwt-2.4.0-1.fc36.noarch                                                           21/23
  Verifying        : python3-keyring-23.6.0-1.fc36.noarch                                                      22/23
  Verifying        : python3-paramiko-2.11.0-1.fc36.noarch                                                     23/23

Installed:
  breezy-3.2.1-3.fc36.x86_64                                 libsodium-1.0.18-9.fc36.x86_64
  python3-bcrypt-3.2.2-1.fc36.x86_64                         python3-certifi-2021.10.8-1.fc36.noarch
  python3-configobj-5.0.6-27.fc36.noarch                     python3-cryptography-36.0.0-3.fc36.x86_64
  python3-dulwich-0.20.32-1.fc36.x86_64                      python3-httplib2-0.20.3-2.fc36.noarch
  python3-jeepney-0.7.1-2.fc36.noarch                        python3-jwt-2.4.0-1.fc36.noarch
  python3-jwt+crypto-2.4.0-1.fc36.noarch                     python3-keyring-23.6.0-1.fc36.noarch
  python3-launchpadlib-1.10.15.1-2.fc36.noarch               python3-lazr-restfulclient-0.14.4-2.fc36.noarch
  python3-lazr-uri-1.0.6-2.fc36.noarch                       python3-oauthlib-3.0.2-12.fc36.noarch
  python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch          python3-paramiko-2.11.0-1.fc36.noarch
  python3-patiencediff-0.2.2-4.fc36.x86_64                   python3-pyasn1-0.4.8-8.fc36.noarch
  python3-pynacl-1.4.0-5.fc36.x86_64                         python3-secretstorage-3.3.1-4.fc36.noarch
  python3-wadllib-1.3.6-2.fc36.noarch

Complete!

```

همچنین می‌توانید از الگوهای عمومی (Wildcards) هم استفاده کنید:

```bash
# yum update 'cal*'
```

> **نکته جالب:** لینوکس فدورا از `dnf` به عنوان مدیر بسته اصلی استفاده می‌کند و دستورات `yum` شما را به معادل‌های `dnf` ترجمه و اجرا می‌کند.

### ابزار `yumdownloader`

این ابزار فایل‌های RPM را بدون نصب کردنشان از مخازن دانلود می‌کند. اگر نیاز دارید تمام وابستگی‌ها هم همراه آن دانلود شوند، از سوئیچ `--resolve` استفاده کنید:

```bash
yumdownloader --resolve bzr
```

## دستور `rpm`

دستور `rpm` می‌تواند عملیات (`ACTION`) مختلفی را روی فایل‌های تکی RPM انجام دهد. نحوه استفاده از آن به شکل `rpm ACTION [OPTION] rpm_file.rpm` است.

یکی از گزینه‌های رایج `-v` برای نمایش خروجی با جزئیات (Verbose) است و عملیات (`ACTION`) پرکاربرد آن عبارت‌اند از:

| فرم کوتاه | فرم بلند | توضیحات |
| :--- | :--- | :--- |
| `-i` | `--install` | نصب یک بسته |
| `-e` | `--erase` | حذف یک بسته |
| `-U` | `--upgrade` | نصب یا ارتقای یک بسته (اگر نصب نباشد نصب می‌کند) |
| `-q` | `--query` | پرس‌وجو و بررسی اینکه آیا بسته نصب است یا خیر |
| `-F` | `--freshen` | به‌روزرسانی بسته، فقط در صورتی که از قبل نصب شده باشد |
| `-V` | `--verify` | بررسی سلامت و یکپارچگی فایل‌های بسته نصب‌شده |
| `-K` | `--checksig` | بررسی یکپارچگی و امضای دیجیتال یک فایل `.rpm` |

لطفاً توجه کنید که هر عملیات ممکن است گزینه‌های اختصاصی خودش را داشته باشد.

### نصب و به‌روزرسانی

در بیشتر مواقع از `-U` استفاده می‌کنیم که بسته را نصب یا در صورت وجود، ارتقا می‌دهد.

* ابزار `rpm` پایگاه داده‌ای برای تشخیص «نصب خودکار وابستگی‌ها» ندارد، بنابراین نمی‌تواند وابستگی‌های نصب‌شده را به صورت خودکار و زنجیره‌ای حذف کند.

اگر یک فایل RPM را به همراه تمام فایل‌های RPM وابسته‌اش در یک پوشه دارید، می‌توانید همه را با دستور `rpm -Uvh *.rpm` نصب کنید. این کار باعث می‌شود `rpm` اگر وابستگی‌ها در فایل‌های دیگر همان پوشه موجود باشند، خطای نبود وابستگی ندهد. در اینجا سوئیچ `-h` پنجاه علامت `#` چاپ می‌کند تا پیشرفت کار را نشان دهد.

در برخی موارد خاص — اگر دقیقاً می‌دانید چه می‌کنید — می‌توانید از `--nodeps` برای نادیده گرفتن بررسی وابستگی‌ها یا حتی از `--force` برای تحمیل نصب/ارتقا با وجود خطاها و هشدارها استفاده کنید.

### پرس‌وجو (Query)

یک پرس‌وجوی معمولی به این شکل است:

```text
[root@fedora tmp]# rpm -q breezy-3.2.1-3.fc36.x86_64.rpm
breezy-3.2.1-3.fc36.x86_64
[root@fedora tmp]# rpm -q breezy
breezy-3.2.1-3.fc36.x86_64
[root@fedora tmp]# rpm -q emacs
package emacs is not installed
```

و می‌توانید از گزینه‌های زیر برای دریافت اطلاعات دقیق‌تر در پرس‌وجو استفاده کنید (مثلاً `rpm -qi` یا `rpm -ql`):

| کوتاه | بلند | توضیحات |
| :--- | :--- | :--- |
| `-c` | `--configfiles` | نمایش فایل‌های پیکربندی متعلق به بسته |
| `-i` | `--info` | نمایش اطلاعات دقیق درباره یک بسته |
| `-a` | `--all` | نمایش فهرست تمام بسته‌های نصب‌شده |
| | `--whatprovides` | نمایش اینکه کدام بسته این فایل یا قابلیت را ارائه می‌کند |
| `-l` | `--list` | نمایش فهرست فایل‌هایی که بسته نصب می‌کند |
| `-R` | `--requires` | نمایش وابستگی‌های یک بسته |
| `-f` | `--file` | پرس‌وجو برای یافتن بسته‌ای که مالک یک فایل مشخص است |

### بررسی صحت (Verify)

می‌توانید بسته‌هایتان را بررسی کنید و ببینید آیا درست و دست‌نخورده باقی مانده‌اند یا نه. برای خروجی با جزئیات می‌توانید از `-Vv` استفاده کنید یا فقط `-V` بزنید تا صرفاً فایل‌های دارای تغییر یا مشکل را ببینید. این خروجی پس از آن است که من فایل `/bin/tmux` را به صورت دستی ویرایش کردم:

```text
[root@fedora tmp]# rpm -V tmux
S.5....T.    /usr/bin/tmux
```

و این بخشی از راهنمای `man rpm` برای بخش `-V` است (معنی حروف خروجی):

```text
    S Size differs
    M Mode differs (includes permissions and file type)
    5 digest (formerly MD5 sum) differs
    D Device major/minor number mismatch
    L readLink(2) path mismatch
    U User ownership differs
    G Group ownership differs
    T mTime differs
    P caPabilities differ
```

* `S`: تفاوت در حجم فایل
* `M`: تفاوت در مجوزها (Mode) یا نوع فایل
* `5`: تفاوت در هش (MD5/Digest) فایل
* `D`: عدم تطابق شماره Major/Minor دستگاه
* `L`: تغییر مسیر پیوند نمادین (`readLink`)
* `U`: تفاوت در مالکیت کاربر (User)
* `G`: تفاوت در مالکیت گروه (Group)
* `T`: تفاوت در زمان آخرین تغییر (`mTime`)
* `P`: تفاوت در قابلیت‌های امنیتی (`Capabilities`)

همچنین می‌توانید یکپارچگی و امضای یک فایل بسته `.rpm` را قبل از نصب با `-K` بررسی کنید:

```text
# rpm -Kv breezy-3.2.1-3.fc36.x86_64.rpm
breezy-3.2.1-3.fc36.x86_64.rpm:
    Header V4 RSA/SHA256 Signature, key ID 38ab71f4: OK
    Header SHA256 digest: OK
    Header SHA1 digest: OK
    Payload SHA256 digest: OK
    V4 RSA/SHA256 Signature, key ID 38ab71f4: OK
    MD5 digest: OK
```

خروجی بالا نشان می‌دهد که این فایل سالم و معتبر است.

### حذف بسته (Uninstall)

```text
[root@fedora tmp]# rpm -e tmux
error: Failed dependencies:
	tmux is needed by (installed) anaconda-install-env-deps-36.16.5-1.fc36.x86_64
```

* دستور `rpm` بسته را بدون پرسیدن سوال حذف می‌کند!
* دستور `rpm` بسته‌ای را که بسته دیگری به آن نیاز داشته باشد حذف نخواهد کرد.

### استخراج فایل‌های RPM

#### دستور `rpm2cpio`

فرمت **cpio** یک فرمت آرشیو است (دقیقاً مثل `zip` یا `rar` یا `tar`). می‌توانید از دستور `rpm2cpio` برای تبدیل فایل‌های RPM به فرمت `cpio` استفاده کنید و سپس با ابزار `cpio` آن‌ها را استخراج نمایید:

```text
[root@fedora tmp]# rpm2cpio breezy-3.2.1-3.fc36.x86_64.rpm > breezy.cpio
[root@fedora tmp]# cpio -idv < breezy.cpio
./usr/bin/brz
./usr/bin/bzr
./usr/bin/bzr-receive-pack
./usr/bin/bzr-upload-pack
./usr/bin/git-remote-brz
./usr/bin/git-remote-bzr
[...]
```

## دستور `zypper`

توزیع SUSE Linux و همتای آن یعنی openSUSE از موتور `ZYpp` برای مدیریت بسته استفاده می‌کنند. شما می‌توانید از ابزارهای `YaST` یا `Zypper` برای کار با آن استفاده کنید.

این‌ها دستورات اصلی در `zypper` هستند:

| دستور | توضیحات |
| :--- | :--- |
| `help` | راهنمای کلی |
| `install` | نصب یک بسته |
| `info` | نمایش اطلاعات یک بسته |
| `list-updates` | نمایش به‌روزرسانی‌های موجود |
| `lr` | نمایش اطلاعات مخازن (List Repositories) |
| `packages` | فهرست تمام بسته‌های موجود یا بسته‌های یک مخزن خاص |
| `what-provides` | نمایش بسته‌ای که مالک یا ارائه‌دهنده یک فایل است |
| `refresh` | به‌روزرسانی اطلاعات مخازن |
| `remove` | حذف یک بسته از سیستم |
| `search` | جستجو برای یک بسته |
| `update` | بررسی مخازن و به‌روزرسانی بسته‌های نصب‌شده |
| `verify` | بررسی سلامت یک بسته و وابستگی‌های آن |

> **نکته:** در `zypper` می‌توانید دستورات را کوتاه بنویسید؛ پس دستور `zypper se tmux` معادل `search` است و دنبال بسته `tmux` می‌گردد.

## سایر ابزارها

`YUM` و `RPM` مدیران بسته اصلی در فدورا، RHEL و CentOS هستند، اما ابزارهای دیگری هم وجود دارند. همان‌طور که اشاره شد، SUSE از `YaST` استفاده می‌کند و برخی میزکارهای مدرن (مثل KDE و GNOME) از ابزار گرافیکی `PackageKit` بهره می‌برند. همچنین خوب است بدانید که مجموعه ابزارهای `dnf` جایگزین مدرن `yum` است و به صورت پیش‌فرض روی سیستم‌های فدورا و نسخه‌های جدید RHEL نصب شده است.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1025_use_rpm_and_yum_package_management.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
