---
layout: layout.njk
title: "۱۰۸.۲ ثبت و مدیریت لاگ‌های سیستم"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 37
chapterSection: "موضوع ۱۰۸: سرویس‌های اساسی سیستم"
permalink: /books/book13/Book/37/1082-system-logging/index.html
---
{% raw %}
# ۱۰۸.۲ ثبت و مدیریت لاگ‌های سیستم

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> پیکربندی rsyslog در /etc/rsyslog.conf، چرخش لاگ‌ها با logrotate و کاوش لاگ‌های systemd با journalctl.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/qtHTf6q_UaI" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۴_

داوطلبان باید بتوانند سرویس `rsyslog` را پیکربندی کنند. این هدف آزمون شامل تنظیم دیمن ثبت لاگ برای ارسال خروجی لاگ‌ها به یک سرور مرکزی لاگ یا دریافت لاگ‌ها به عنوان سرور مرکزی هم می‌شود. استفاده از زیرسیستم ژورنال `systemd` نیز در این بخش پوشش داده می‌شود. همچنین آشنایی اجمالی با `syslog` و `syslog-ng` به عنوان سیستم‌های جایگزین ثبت لاگ مد نظر است.

### حوزه‌های کلیدی دانش

* پیکربندی پایه `rsyslog`
* درک مفهوم استاندارد امکانات (Facilities)، اولویت‌ها (Priorities) و کنش‌ها (Actions)
* پرس‌وجو از ژورنال `systemd`
* فیلتر کردن داده‌های ژورنال `systemd` بر اساس معیارهایی مانند تاریخ، سرویس یا اولویت
* پیکربندی ذخیره‌سازی پایدار (Persistent) و اندازه ژورنال `systemd`
* حذف داده‌های قدیمی ژورنال `systemd`
* بازیابی داده‌های ژورنال `systemd` از یک سیستم نجات (Rescue System) یا کپی فایل‌سیستم
* درک تعامل `rsyslog` با `systemd-journald`
* پیکربندی `logrotate`
* آشنایی با `syslog` و `syslog-ng`

### اصطلاحات و ابزارها

<div dir="ltr">

* `/etc/rsyslog.conf`
* `/var/log/`
* `logger`
* `logrotate`
* `/etc/logrotate.conf`
* `/etc/logrotate.d/`
* `journalctl`
* `systemd-cat`
* `/etc/systemd/journald.conf`
* `/var/log/journal/`

</div>

### تاریخچه

لاگ‌ها (گزارش‌های وقایع) بخش بسیار مهمی از فلسفه و طراحی یونیکس هستند. کرنل، سرویس‌ها، برنامه‌ها و بیشتر رویدادها (چه یک کرش ناگهانی و چه یک تلاش برای لاگین) لاگ تولید می‌کنند. این لاگ‌ها را می‌توان بررسی و پایش کرد تا دید دقیقی نسبت به سیستم و وضعیت آن به دست آورد. اگر یک لینوکس‌کار را یک ساعت پای سیستم ویندوز بنشانید، حتماً می‌شنوید که می‌پرسد: «پس لاگ‌ها کجاست؟!»

اگر هر برنامه بخواهد به تنهایی لاگ‌های خودش را مدیریت کند، حداقل با دو مشکل روبرو می‌شویم: ۱) برنامه‌نویسی سخت‌تر می‌شود چون هر کس باید چرخ را از نو اختراع کند (یا کتابخانه وارد کند)، و ۲) برنامه‌نویس‌های مختلف لاگ‌ها را با فرمت‌ها، انواع و در مسیرهای متفاوتی تولید می‌کنند که تحت کنترل نگه داشتن آن‌ها را دشوار می‌کند. برای غلبه بر این موضوع، دنیای یونیکس راه‌حل خودش را داشت: یک سرویس مرکزی ثبت لاگ.

ابزار قدیمی‌تر برای مدیریت لاگ‌ها `syslog` نام داشت، بعد `syslog-ng` (نسل جدید) آمد و پس از آن `rsyslog` که تا همین چند سال پیش در اکثر توزیع‌ها استفاده می‌شد. `rsyslog` هنوز هم حضور دارد و جزئی از دنیای گنو/لینوکس است. این ابزار می‌تواند لاگ‌ها را از برنامه‌های مختلف (حتی از طریق شبکه) دریافت کند و در مکان‌های گوناگونی (فایل‌های محلی یا روی شبکه و حتی اجرای کنش‌های خاص روی آن‌ها) ذخیره کند. لاگ‌های آن در قالب متنی ذخیره می‌شوند و می‌توانید با هر ابزار دلخواهی مثل `grep`، `less`، `tail`، `zless` (خواندن فایل فشرده با `less` بدون نیاز به باز کردن دستی آن)، `zcat` و غیره مدیریتش کنید.

اما این روزها `systemd` در حال فتح بخش بزرگی از دنیای لینوکس است و لاگ‌ها هم از این قاعده مستثنی نیستند. سرویس ثبت لاگِ systemd به نام `journald` شناخته می‌شود و برای خواندن لاگ‌های آن از دستور `journalctl` استفاده می‌کنیم؛ متأسفانه این لاگ‌ها دیگر به صورت فایل‌های متنی ساده ذخیره نمی‌شوند.

همچنین باید چند ابزار دیگر (مانند `logrotate` برای پاکسازی لاگ‌های قدیمی) را بشناسید و با مهم‌ترین فایل‌های لاگ سیستم در گنو/لینوکس آشنا باشید. پس بیایید شروع کنیم.

> **نکته:** جالب است بدانید لاگ‌ها در لایه‌های عمیق‌تر چطور کار می‌کنند. ماجرا اینجاست: هر برنامه‌ای که بخواهد چیزی را لاگ کند، در نهایت پیام‌هایش را (معمولاً با کمک یک ابزار واسط) به فایل‌های دستگاه `/dev/log` یا `/dev/kmsg` می‌فرستد. ابزار ثبت لاگ (مثلاً `rsyslog`) از این دستگاه‌ها می‌خواند و بر اساس تنظیماتش پیام‌ها را پردازش می‌کند؛ و این‌گونه است که پیام‌ها به لاگ تبدیل می‌شوند!

## دستور `dmesg`

همانطور که گفتم، لینوکس عاشق لاگ است و با کمال میل همه‌چیز را ثبت می‌کند. اما تکلیف فرآیند بوت چیست؟ اگر کرنل بخواهد قبل از آماده شدن دیسک‌ها چیزی را لاگ کند چه اتفاقی می‌افتد؟ این لاگ‌ها توسط کرنل در **بافر حلقه‌ای کرنل (Kernel Ring Buffer)** ذخیره می‌شوند که با استفاده از دستور `dmesg` می‌توانید به آن‌ها دسترسی داشته باشید.

## چرخش لاگ‌ها (Log Rotation)

خب، لاگ‌ها تولید و ذخیره می‌شوند! اما بالاخره کسی باید آن‌ها را پاکسازی کند تا دیسک پر نشود. ابزار `logrotate` این وظیفه را بر عهده دارد. فایل پیکربندی اصلی آن در `/etc/logrotate.conf` قرار دارد:

```text
root@debian:# cat /etc/logrotate.conf
# see "man logrotate" for details

# global options do not affect preceding include directives

# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# use date as a suffix of the rotated file
#dateext

# uncomment this if you want your log files compressed
#compress

# packages drop log rotation information into this directory
include /etc/logrotate.d

# system-specific logs may also be configured here.
```

و سرویس‌های خاص هم تنظیمات چرخش لاگ خودشان را در مسیر `/etc/logrotate.d/` قرار می‌دهند:

```text
root@debian:# cat /etc/logrotate.d/apt
/var/log/apt/term.log {
  rotate 12
  monthly
  compress
  missingok
  notifempty
}

/var/log/apt/history.log {
  rotate 12
  monthly
  compress
  missingok
  notifempty
}
```

معنی برخی از این پارامترها به شرح زیر است:

| پارامتر | معنی |
| :---: | :---: |
| `weekly` | چرخش هفتگی لاگ‌ها |
| `missingok` | اگر برای این هفته لاگی وجود نداشت، خطا نده و مشکلی نیست |
| `rotate 52` | نگهداری ۵۲ فایل لاگ آخر و حذف لاگ‌های قدیمی‌تر |
| `compress` | فشرده‌سازی فایل‌های لاگ چرخانده‌شده |
| `create 0640 www-data adm` | ساخت فایل جدید با این سطح دسترسی و مالکیت |
| `pre` و `post rotate` | اجرای اسکریپت یا دستورات مشخص قبل و بعد از چرخش لاگ |

تنظیمات بالا باعث می‌شود برای هر هفته یک فایل فشرده ساخته شود و به جای یک فایل لاگ غول‌پیکر، فقط ۵۲ عدد از آن‌ها نگهداری شود.

ابزار `logrotate` با استفاده از `cron` اجرا می‌شود و کارش را به صورت روزانه بر اساس پیکربندی موجود در `/etc/cron.daily/logrotate` انجام می‌دهد.

## برخی فایل‌های لاگ معروف

به طور کلی لاگ‌ها در مسیر `/var/log` ذخیره می‌شوند. در صورت بروز هرگونه مشکل، اگر نمی‌دانید از کجا شروع کنید، یک روش رایج اجرای دستور `ls -ltrh /var/log/` است تا ببینید آیا برنامه‌ای اخیراً لاگ جدیدی تولید کرده یا نه.

حالا بیایید نگاهی به برخی از معروف‌ترین فایل‌های لاگ بیندازیم:

##### `/var/log/auth.log` (در توزیع‌های مبتنی بر دبیان)

فرآیندهای احراز هویت (Authentication) لاگ‌هایشان را اینجا می‌نویسند؛ مواردی مثل کارهای `cron`، ورودهای ناموفق، اطلاعات `sudo` و غیره.

##### `/var/log/syslog`

یک مکان متمرکز برای اغلب لاگ‌های دریافتی توسط `rsyslogd`، در صورتی که فایل لاگ اختصاصی برایشان در `/etc/rsyslog.conf` تعیین نشده باشد.

##### `/var/log/debug`

اطلاعات دیباگ (اشکال‌زدایی) برنامه‌ها.

##### `/var/log/kern.log`

پیام‌های کرنل.

##### `/var/log/messages`

پیام‌های اطلاع‌رسانی (Informative) از سوی سرویس‌ها. همچنین در بسیاری از سیستم‌ها مکان پیش‌فرض برای لاگ‌های کلاینت‌های راه‌دور است.

##### `/var/run/utmp` و `/var/log/wtmp`

ورودهای (Login) موفق کاربران.

##### `/var/log/btmp`

ورودهای ناموفق. می‌توانید این فایل را چک کنید تا ببینید آیا کسی در حال تلاش برای حدس زدن رمز عبور شما هست یا نه!

##### `/var/log/faillog`

تلاش‌های ناموفق احراز هویت.

##### `/var/log/lastlog`

تاریخ و ساعت آخرین ورودهای کاربران.

##### لاگ سرویس‌ها

سرویس‌های مختلف فایل‌ها یا دایرکتوری‌هایی در `/var/log` می‌سازند و لاگ‌های خودشان را آنجا ثبت می‌کنند. برای مثال ممکن است `/var/log/apache2/` (یا `/var/log/httpd`) برای وب‌سرور آپاچی یا `/var/log/mysql` برای دیتابیس MySQL وجود داشته باشد.

## سرویس `rsyslog`

این ابزار نسل جدیدتر `syslog` است و در بسیاری از محیط‌ها استفاده می‌شود. فایل پیکربندی اصلی آن در `/etc/rsyslog.conf` قرار دارد و علاوه بر آن، تمام فایل‌های داخل دایرکتوری `/etc/rsyslog.d/` را هم می‌خواند. پیکربندی آن از ۳ بخش اصلی تشکیل شده است:

۱. **`MODULES` (ماژول‌ها):** ماژول‌های مورد استفاده؛ مثلاً برای اینکه `rsyslog` بتواند از اتصالات UDP استفاده کند.
۲. **`GLOBAL DIRECTIVES` (دستورالعمل‌های سراسری):** تنظیمات عمومی مانند سطح دسترسی دایرکتوری‌ها و فایل‌ها.
۳. **`RULES` (قوانین):** ترکیبی از **امکانات (Facilities)**، **اولویت‌ها (Priorities)** و **کنش‌ها (Actions)** که به `rsyslog` می‌گوید با هر لاگ چه کار کند.

```text
root@debian:~# cat /etc/rsyslog.conf
# /etc/rsyslog.conf configuration file for rsyslog
#
# For more information install rsyslog-doc and see
# /usr/share/doc/rsyslog-doc/html/configuration/index.html


#################
#### MODULES ####
#################

module(load="imuxsock") # provides support for local system logging
module(load="imklog")   # provides kernel logging support
#module(load="immark")  # provides --MARK-- message capability

# provides UDP syslog reception
#module(load="imudp")
#input(type="imudp" port="514")

# provides TCP syslog reception
#module(load="imtcp")
#input(type="imtcp" port="514")


###########################
#### GLOBAL DIRECTIVES ####
###########################

#
# Set the default permissions for all log files.
#
$FileOwner root
$FileGroup adm
$FileCreateMode 0640
$DirCreateMode 0755
$Umask 0022

#
# Where to place spool and state files
#
$WorkDirectory /var/spool/rsyslog

#
# Include all config files in /etc/rsyslog.d/
#
$IncludeConfig /etc/rsyslog.d/*.conf


###############
#### RULES ####
###############

#
# Log anything besides private authentication messages to a single log file
#
*.*;auth,authpriv.none		-/var/log/syslog

#
# Log commonly used facilities to their own log file
#
auth,authpriv.*			/var/log/auth.log
cron.*				-/var/log/cron.log
kern.*				-/var/log/kern.log
mail.*				-/var/log/mail.log
user.*				-/var/log/user.log

#
# Emergencies are sent to everybody logged in.
#
*.emerg				:omusrmsg:*
```

همانطور که می‌بینید، **facilities** می‌توانند مواردی مانند این‌ها باشند:

<div dir="ltr">

> `kern`, `user`, `mail`, `daemon`, `cron`, `auth`, `ntp`, `security`, `console`, `syslog`, ...

</div>

**priority (اولویت)** هم می‌تواند یکی از موارد زیر باشد:

> `emerg`/`panic`, `alert`, `crit`, `err`/`error`, `warn`/`warning`, `notice`, `info` یا `debug`

در بخش **action (کنش)** می‌توانیم گزینه‌هایی مثل این‌ها داشته باشیم:

| کنش (Action) | نمونه | معنی |
| :---: | :---: | :--- |
| نام فایل | `/usr/log/logins.log` | لاگ را در این فایل می‌نویسد |
| نام کاربری | `jadi` | پیام را روی صفحه نمایش به آن کاربر اطلاع می‌دهد |
| `@ip` | `@192.168.1.100` | این لاگ را به این سرور لاگ می‌فرستد تا آن سرور بر اساس تنظیمات خودش با آن برخورد کند |

بنابراین خطی به شکل زیر، پیام‌های `panic` کرنل را به یک سرور لاگ دوردست می‌فرستد و همه‌چیز در هر سطحی را هم در یک فایل لاگ ثبت می‌کند:

```text
kern.panic      @192.168.1.100
*.*             /var/log/messages
```

اگر یک اولویت خاص را برای ثبت لاگ انتخاب کنید، تمام سطوح **مهم‌تر** از آن هم ثبت خواهند شد! پس اگر بنویسید `cron.notice /var/log/cron/cron.log`، علاوه بر `notice`، لاگ‌های سطوح `emerg/panic`، `alert`، `critical`، `error` و `warning` مربوط به دسته `cron` را هم ذخیره می‌کنید.

سطوح اولویت (بر اساس صفحه راهنمای `syslog(3)` و `logger`):

```text
       This determines the importance of the message.  The levels are, in order of decreasing importance:

       emerg      system is unusable
       alert      action must be taken immediately
       crit       critical conditions
       err        error conditions
       warning    warning conditions
       notice     normal, but significant, condition
       info       informational message
       debug      debug-level message

       panic      deprecated synonym for emerg
       error      deprecated synonym for err
       warn       deprecated synonym for warning
```

> **نکته:** اگر می‌خواهید **فقط** یک سطح خاص را لاگ بگیرید، یک علامت مساوی (`=`) قبل از اولویت قرار دهید؛ مثل `local3.=alert /var/log/user.alert.log`.

نکته مهم این است که باینری مسئول ثبت لاگ‌های دسته `kern` یک دیمن مستقل است. این دیمن `klogd` نام دارد و از همان فایل‌های پیکربندی استفاده می‌کند. چرا؟ تا حتی پس از اینکه همه‌چیز کرش کرد، `klogd` همچنان بتواند کرش‌های کرنل را ثبت کند! ;)

### دستور `logger`

اگر نیاز دارید خودتان پیامی را به سمت `rsyslog` بفرستید، می‌توانید از ابزار `logger` استفاده کنید:

```bash
root@debian:# logger Testing my lovely tool
root@debian:# logger local1.emerg Nothing emergent for sure
root@debian:# tail -3 /var/log/syslog
2023-06-30T06:05:01.325358-04:00 debian CRON[914]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
2023-06-30T06:13:27.671410-04:00 debian root: Testing my lovely tool
2023-06-30T06:13:45.795158-04:00 debian root: local1.emerg Nothing emergent for sure
```

## سرویس `journald`

در بخش‌های مختلف این دوره با `systemd` آشنا شده‌اید. دیده‌ایم که چگونه بخشی از فرآیند `init` است و چطور سرویس‌ها و تایمرها را مدیریت می‌کند. تمام این فعالیت‌ها (و سایر لاگ‌هایی که به سیستم ژورنالینگ می‌رسند) در فایل‌های باینری ذخیره می‌شوند که با دستور `journalctl` (جزئی از ابزار `systemd-journald`) قابل خواندن هستند.

```bash
root@debian:~# systemctl status systemd-journald
● systemd-journald.service - Journal Service
     Loaded: loaded (/lib/systemd/system/systemd-journald.service; static)
     Active: active (running) since Fri 2023-06-30 05:28:50 EDT; 52min ago
TriggeredBy: ● systemd-journald-dev-log.socket
             ● systemd-journald-audit.socket
             ● systemd-journald.socket
       Docs: man:systemd-journald.service(8)
             man:journald.conf(5)
   Main PID: 261 (systemd-journal)
     Status: "Processing requests..."
      Tasks: 1 (limit: 4583)
     Memory: 17.1M
        CPU: 138ms
     CGroup: /system.slice/systemd-journald.service
             └─261 /lib/systemd/systemd-journald

Jun 30 05:28:50 debian systemd-journald[261]: Journal started
Jun 30 05:28:50 debian systemd-journald[261]: Runtime Journal (/run/log/journal/ec22e43962c64359b9b25cfa650b025b) is 4.9M, max 39.1M,>
Jun 30 05:28:50 debian systemd-journald[261]: Time spent on flushing to /var/log/journal/ec22e43962c64359b9b25cfa650b025b is 23.816ms>
Jun 30 05:28:50 debian systemd-journald[261]: System Journal (/var/log/journal/ec22e43962c64359b9b25cfa650b025b) is 28.2M, max 4.0G, >
Jun 30 05:28:50 debian systemd-journald[261]: Received client request to flush runtime journal.
Notice: journal has been rotated since unit was started, output may be incomplete.
```

و این هم فایل پیکربندی آن است:

```text
root@debian:~# cat /etc/systemd/journald.conf
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it under the
#  terms of the GNU Lesser General Public License as published by the Free
#  Software Foundation; either version 2.1 of the License, or (at your option)
#  any later version.
#
# Entries in this file show the compile time defaults. Local configuration
# should be created by either modifying this file, or by creating "drop-ins" in
# the journald.conf.d/ subdirectory. The latter is generally recommended.
# Defaults can be restored by simply deleting this file and all drop-ins.
#
# Use 'systemd-analyze cat-config systemd/journald.conf' to display the full config.
#
# See journald.conf(5) for details.

[Journal]
#Storage=auto
#Compress=yes
#Seal=yes
#SplitMode=uid
#SyncIntervalSec=5m
#RateLimitIntervalSec=30s
#RateLimitBurst=10000
#SystemMaxUse=
#SystemKeepFree=
#SystemMaxFileSize=
#SystemMaxFiles=100
#RuntimeMaxUse=
#RuntimeKeepFree=
#RuntimeMaxFileSize=
#RuntimeMaxFiles=100
#MaxRetentionSec=
#MaxFileSec=1month
#ForwardToSyslog=yes
#ForwardToKMsg=no
#ForwardToConsole=no
#ForwardToWall=yes
#TTYPath=/dev/console
#MaxLevelStore=debug
#MaxLevelSyslog=debug
#MaxLevelKMsg=notice
#MaxLevelConsole=info
#MaxLevelWall=emerg
#LineMax=48K
#ReadKMsg=yes
#Audit=no
```

### پرس‌وجو از محتوای ژورنال

اگر دستور `journalctl` را بدون هیچ سوئیچی اجرا کنید، تمام لاگ‌ها را می‌گیرید... که خیلی زیاد است! بنابراین سوئیچ‌های کاربردی زیر وجود دارند:

| سوئیچ | معنی |
| :---: | :---: |
| `-r` | نمایش معکوس؛ جدیدترین‌ها در بالا |
| `-f` | ادامه نمایش انتهای لاگ به صورت زنده (مشابه `tail -f`) |
| `-e` | نمایش و پرش مستقیم به انتهای لاگ |
| `-n` | نمایش این تعداد خط از انتها (جدیدترین‌ها) |
| `-k` | نمایش پیام‌های کرنل (معادل `dmesg`) |
| `-b` | نمایش لاگ‌های یک بوت خاص؛ `-1` بوت قبلی است و `0` بوت فعلی. با `--list-boots` می‌توانید لیست بوت‌ها را ببینید |
| `-p` | فیلتر بر اساس اولویت خاص؛ مثلاً `-p err` |
| `-u` | فیلتر بر اساس یک یونیت خاص `systemd` |

همچنین می‌توانید از `--since` و `--until` برای نمایش یک بازه زمانی مشخص استفاده کنید. امکان وارد کردن زمان به صورت `YYYY-MM-DD HH:MM:SS` یا استفاده از عباراتی مثل `yesterday`، `today`، `tomorrow`، `now` یا حتی `--since "10 minutes ago"` (یا `--since "-10 minutes"`) وجود دارد.

> **نکته:** اگر تعداد خطوط خیلی زیاد بود، کلید `>` را فشار دهید تا به انتها بپرد (یا `<` را بزنید تا به ابتدا برود).

علاوه بر این می‌توانید نام برنامه را به دستور اضافه کنید تا لاگ‌های همان برنامه را ببینید؛ مثلاً `journalctl /usr/bin/xrdp` یا از فیلدهایی مثل `PRIORITY=` و `_PID=` استفاده کرده و مقدارشان را بدهید.

### دستور `systemd-cat`

این ابزار زمانی به کار می‌رود که بخواهید به صورت دستی لاگ‌ها را به سیستم ژورنالینگ بفرستید. ورودی استاندارد را به ژورنال می‌فرستد یا اگر دستوری به آن بدهید، آن دستور را اجرا کرده و نتیجه را به ژورنال ارسال می‌کند:

```bash
root@debian:~# echo "This is my first test" | systemd-cat
root@debian:~# systemd-cat -p info uptime #sending priority too
root@debian:~# journalctl -n 3
Jun 30 06:31:01 debian systemd[1]: Finished apt-daily.service - Daily apt download activities.
Jun 30 06:34:18 debian cat[1020]: This is my first test
Jun 30 06:34:48 debian uptime[1022]:  06:34:48 up  1:05,  4 users,  load average: 0.00, 0.00, 0.00
```

## مدیریت فضای ذخیره‌سازی

ژورنال‌های `systemd` می‌توانند لاگ‌هایشان را در حافظه رم نگه دارند، روی دیسک بنویسند یا اصلاً تمام لاگ‌ها را دور بریزند. این رفتار توسط تنظیمات فایل `/etc/systemd/journald.conf` تعیین می‌شود، اما رفتار پیش‌فرض به صورت زیر است:

۱. سیستم دایرکتوری `/var/log/journal` را چک می‌کند. اگر این دایرکتوری وجود داشته باشد، لاگ‌ها در دایرکتوری‌ای درون آن ذخیره می‌شوند که نامش بر اساس `/etc/machine-id` تعیین می‌گردد.
۲. اگر `/var/log/journal` وجود نداشته باشد، لاگ‌ها در حافظه رم در مسیر `/run/log/journal` و باز هم در دایرکتوری متناظر با `/etc/machine-id` نگهداری می‌شوند.

اما می‌توانید این رفتار پیش‌فرض را با مقادیر زیر در تنظیمات تغییر دهید:

```text
Storage=volatile     # نگهداری لاگ‌ها در حافظه رم
Storage=persistent   # نگهداری روی دیسک، در صورت نیاز ساخت دایرکتوری‌ها
Storage=auto         # نوشتن روی دیسک تنها در صورتی که دایرکتوری از قبل وجود داشته باشد
Storage=none         # عدم نگهداری لاگ‌ها
```

اگر لاگ‌ها روی دیسک نوشته شوند، متغیرهای زیر مصرف فضا را مدیریت می‌کنند:

| نام متغیر | کاربرد |
| :---: | --- |
| `SystemMaxUse` | حداکثر فضای مجاز مصرفی دیسک، مثلاً `500M`. مقدار پیش‌فرض `10%` است |
| `SystemKeepFree` | حداقل این مقدار فضا را آزاد نگه دار، مثلاً `1G`. پیش‌فرض `15%` است |
| `SystemMaxFileSize` | حداکثر اندازه هر فایل ژورنال به تنهایی. پیش‌فرض `1/8` مقدار `SystemMaxUse` است |
| `SystemMaxFiles` | حداکثر تعداد فایل‌های غیرفعال (آرشیوشده). پیش‌فرض `100` است |

اگر لاگ‌ها را در **حافظه رم** نگه می‌دارید، متغیرهای معادل عبارت‌اند از: `RuntimeMaxUse`، `RuntimeKeepFree`، `RuntimeMaxFileSize` و `RuntimeMaxFiles`.

اگر لازم شد پاکسازی را به صورت دستی انجام دهید (البته با کمک خود ابزارهای `systemd`)، می‌توانید دستور `journalctl` را با این سوئیچ‌ها اجرا کنید:

| سوئیچ | کاربرد |
| :---: | --- |
| `--vacuum-time` | پاک کردن هر چیزی قدیمی‌تر از این زمان؛ مثلاً `--vacuum-time=3months` لاگ‌های قدیمی‌تر از ۳ ماه را پاک می‌کند. می‌توانید از پسوندهای `s` (ثانیه)، `m` (دقیقه)، `h` (ساعت)، `d`/`days` (روز)، `w`/`weeks` (هفته)، `months` (ماه) و `y`/`years` (سال) استفاده کنید |
| `--vacuum-size` | حذف لاگ‌های قدیمی‌تر تا زمانی که حجم کل لاگ‌ها به اندازه مشخص‌شده برسد؛ مثلاً `1G` |
| `--vacuum-files` | فقط به همین تعداد فایل آرشیو را نگه دار |

### بررسی لاگ‌های یک سیستم بازیابی‌شده

اگر یک سیستم کرش‌کرده یا بالا نیامده دارید، همچنان می‌توانید لاگ‌هایش را بررسی کنید؛ به شرطی که فایل‌هایش روی دیسک موجود باشند. همانطور که می‌دانید، فایل‌ها در مسیر `/var/log/journal/{machine-id}` قرار دارند که `machine-id` در فایل `/etc/machine-id` همان سیستم کرش‌کرده است.

می‌توانید بعد از بوت کردن آن سیستم با یک لینوکس زنده (Live Linux) یا مانت کردن هاردش روی یک ماشین دیگر، این فایل‌ها را به یک دایرکتوری منتقل کنید یا همان‌جا بررسی‌شان کنید. سوئیچ `-D` (یا `--directory`) در دستور `journalctl` محل فایل‌های ژورنال را مشخص می‌کند. بنابراین اگر شناسه ماشین کرش‌کرده `ec22e43962c64359b9b25cfa650b025b` باشد و پارتیشن `/var/` آن را در مسیر `/mnt/var/` خودتان مانت کرده باشید، می‌توانید با دستور زیر لاگ‌هایش را بخوانید و ببینید چه اتفاقی افتاده است:

```bash
journalctl -D=/mnt/var/log/journal/ec22e43962c64359b9b25cfa650b025b/
```

همچنین می‌توانید از سوئیچ `--merge` برای ادغام کردن این لاگ‌ها در نمایش با لاگ‌های سیستم خودتان استفاده کنید، یا با `--file` فقط یک فایل ژورنال خاص را بررسی نمایید. در نهایت، اگر مسیر دقیق فایل‌های ژورنال را نمی‌دانید، می‌توانید از `--root /mnt` استفاده کنید تا به `journalctl` بگویید در آن مسیر به دنبال فایل‌های ژورنال بگردد.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1082_system_logging.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
