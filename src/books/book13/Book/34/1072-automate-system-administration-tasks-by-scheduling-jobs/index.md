---
layout: layout.njk
title: "۱۰۷.۲ خودکارسازی وظایف با زمان‌بندی (cron و at)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 34
chapterSection: "موضوع ۱۰۷: وظایف مدیریتی"
permalink: /books/book13/Book/34/1072-automate-system-administration-tasks-by-scheduling-jobs/index.html
---
{% raw %}
# ۱۰۷.۲ خودکارسازی وظایف با زمان‌بندی (cron و at)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> قالب پنج ستاره crontab، فایل‌های /etc/cron.*، دستور at برای کارهای یکباره و زمان‌بند systemd timers.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/jIgJ-l_HMgE" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۴_

داوطلبان باید بتوانند از `cron` و تایمرهای `systemd` برای اجرای کارها در بازه‌های زمانی منظم و از دستور `at` برای اجرای کارها در یک زمان مشخص استفاده کنند.

### حوزه‌های دانش کلیدی

* مدیریت کارهای `cron` و `at`
* پیکربندی دسترسی کاربران به سرویس‌های `cron` و `at`
* درک واحدهای تایمر `systemd` (Timer units)

### اصطلاحات و ابزارها

<div dir="ltr">

* `/etc/cron.{d,daily,hourly,monthly,weekly}/`
* `/etc/at.deny`
* `/etc/at.allow`
* `/etc/crontab`
* `/etc/cron.allow`
* `/etc/cron.deny`
* `/var/spool/cron/`
* `crontab`
* `at`
* `atq`
* `atrm`
* `systemctl`
* `systemd-run`

</div>

موقعیت‌های زیادی پیش می‌آید که لازم است دستوراتی را در زمان‌ها یا بازه‌های مشخصی اجرا کنیم. مثلاً شاید بخواهید فرآیند بکاپ‌گیری هر روز صبح ساعت `03:00` اجرا شود، یا لیست فایل‌های ایندکس وب‌تان هر ساعت به‌روزرسانی شود.

در دنیای لینوکس روش‌های مختلفی برای این کار وجود دارد. رایج‌ترین آن‌ها `crontab` برای اجرای وظایف در بازه‌های زمانی منظم، `at` برای اجرای یک دستور در یک زمان مشخص (یک‌باره)، و همچنین ابزارهای ارائه‌شده توسط `systemd` هستند.

### قالب Crontab

ابزار `crontab` با یک فایل پیکربندی کار می‌کند که به آن می‌گوید چه زمانی یک دستور را اجرا کند. مثلاً می‌توانید بگویید «وقتی ساعت `03` و دقیقه `00` است دستورات من را اجرا کن» یا «وقتی شنبه، ساعت `10` و دقیقه `00` است دستوری را اجرا کن» یا «هر وقت دقیقه `00` شد اجرا کن».

هر خط پیکربندی در `crontab` شامل ۶ فیلد است. ۵ فیلد اول یک زمان‌بندی مشخص را تعریف می‌کنند و هر چه بعد از آن می‌آید به عنوان «دستور» اجرا می‌شود:

```text
A    B    C    D    E    command and arguments
```

| فیلد | معنی | مقادیر مجاز |
| :---: | :--- | :--- |
| `A` | دقیقه (minute) | `0-59` |
| `B` | ساعت (hour) | `0-23` |
| `C` | روز ماه (day of month) | `1-31` |
| `D` | ماه (month) | `1-12` (یا نام ماه‌ها، پایین را ببینید) |
| `E` | روز هفته (day of week) | `0-7` (`0` یا `7` یعنی یکشنبه، یا از نام روزها استفاده کنید) |

اگر یک فیلد را با `*` جایگزین کنید، یعنی «هر مقداری» یا «همه». همچنین اگر به جای ۵ فیلد زمان از کلماتی مثل `@reboot` یا `@daily` استفاده کنید، دستور یک بار بعد از ریبوت یا به صورت روزانه اجرا می‌شود. بیایید چند مثال ببینیم:

```text
5 0 * * *       $HOME/bin/daily.job >> $HOME/tmp/out 2>&1

# run at 2:15pm on the first of every month -- output mailed to paul
15 14 1 * *     $HOME/bin/monthly

# run at 10 pm on weekdays, annoy Joe
0 22 * * 1-5    mail -s "It's 10pm" joe%Joe,%%Where are your kids?%

23 0-23/2 * * * echo "run 23 minutes after midn, 2am, 4am ..., everyday"
5 4 * * sun     echo "run at 5 after 4 every sunday"

*/5 * * * *    echo "each 5 mintues"

42 8,18 * * 1-5    echo "8:42 and 18:42 and only on weekdays (monday till friday)"

@reboot        echo "runs after the reboot"
```

همان‌طور که در مثال‌های بالا می‌بینید، می‌توان از `/` برای تقسیم کردن بازه زمانی استفاده کرد (پس `*/5` در ستون دقیقه یعنی هر پنج دقیقه یک بار) یا از `,` برای مشخص کردن بیش از یک عدد بهره برد (پس `8,18` یعنی ساعت ۸ و ۱۸).

> وقتی در فیلد اول از `*` استفاده می‌کنید، یعنی دستورتان را **هر دقیقه** اجرا می‌کنید.

> چیزی مثل `42 8 1 1 0` **فقط** زمانی اجرا می‌شود که اول ژانویه یکشنبه باشد! (یا در برخی پیاده‌سازی‌ها بین روز ماه و روز هفته OR برقرار است، اما نکته این ترکیب شرطی بودن است — در کران استاندارد اگر هم روز ماه و هم روز هفته هر دو غیر از `*` باشند، معمولاً هر کدام برقرار شود اجرا می‌شود، پس در امتحان دقت کنید).

وقتی یک `cron` اجرا می‌شود، خروجی آن برای صاحب آن cron ایمیل می‌شود.

### کران‌های مخصوص هر کاربر

کران یک سرویس لینوکسی است. برای دیدن کران‌های خودتان می‌توانید از `crontab -l` (لیست) و برای ویرایش آن‌ها از `crontab -e` (ادیت) استفاده کنید که فایل کران را با یک ویرایشگر مخصوص باز می‌کند و بعد از اتمام کار، آن را اعتبارسنجی کرده و بارگذاری می‌کند.

این فایل‌ها در مسیر `/var/spool/cron/tabs/` یا `/var/spool/crontabs/` ذخیره می‌شوند:

```text
# cat /var/spool/cron/tabs/jadi
# DO NOT EDIT THIS FILE - edit the master and reinstall.
# (/tmp/crontab.khObLu installed on Thu Oct 29 22:04:43 2023)
# (Cronie version 4.2)
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * command to be executed
* * * * * date >> /tmp/date.cron.txt
```

> هیچ‌وقت این فایل‌ها را مستقیماً ویرایش نکنید؛ به جایش از `crontab -e` استفاده کنید.

### کران سراسری سیستم (System-wide cron)

یک فایل به نام `/etc/crontab` وجود دارد. این فایل شبیه فایل کران عادی است که با `crontab -e` باز می‌شود، اما یک فیلد اضافه دارد:

```text
A    B    C    D    E    USER    command and arguments
```

این فایل را باید مستقیماً با یک ویرایشگر متن ادیت کرد و در آن می‌توانیم مشخص کنیم کدام کاربر (`USER`) این دستورات را اجرا کند:

```text
# cat /etc/crontab
SHELL=/bin/sh
PATH=/usr/bin:/usr/sbin:/sbin:/bin:/usr/lib/news/bin
MAILTO=root
#
# check scripts in cron.hourly, cron.daily, cron.weekly, and cron.monthly
#
-*/15 * * * *   root  test -x /usr/lib/cron/run-crons && /usr/lib/cron/run-crons >/dev/null 2>&1
```

> **نکته:** به سه خط اول دقت کنید. این سه خط شلِ اجراکننده دستورات، متغیر `PATH` و همچنین کسی را که ایمیل خروجی‌ها برایش فرستاده می‌شود (`MAILTO`) تنظیم می‌کنند.

همان‌طور که می‌بینید، این `crontab` پیش‌فرض، کران‌های دیگری را اجرا می‌کند! یعنی کران‌های ساعتی، روزانه، هفتگی و ماهانه. بیایید در بخش بعدی نگاهی به آن‌ها بیندازیم.

### کران‌های ساعتی، روزانه، هفتگی و ماهانه سیستم

ما چند فایل crontab در سطح سیستم داخل دایرکتوری `/etc/cron.d/` هم داریم. آن‌ها دقیقاً شبیه فایل‌های عمومی crontab هستند. برای مثال این فایلی است که برنامه `munin` می‌سازد:

```text
$ cat /etc/cron.d/munin
#
# cron-jobs for munin
#

MAILTO=root

*/5 * * * *     munin if [ -x /usr/bin/munin-cron ]; then /usr/bin/munin-cron; fi
14 10 * * *     munin if [ -x /usr/share/munin/munin-limits ]; then /usr/share/munin/munin-limits --force --contact nagios --contact old-nagios; fi
19:12:37 jadi@ocean:~$ cat /etc/cron.weekly/man-db
```

اما دایرکتوری‌هایی به نام‌های `cron.hourly`، `cron.daily`، `cron.weekly` و `cron.monthly` هم وجود دارند. همان‌طور که از اسمشان پیداست، هر اسکریپت یا فایلی که داخلشان بگذارید، به ترتیب به صورت ساعتی، روزانه، هفتگی و ماهانه اجرا می‌شود. این کار وظایف عمومی مثل پاک‌سازی، بکاپ‌گیری و... را خیلی تمیزتر می‌کند. کافی است اسکریپت خودتان را داخل یکی از این دایرکتوری‌ها کپی کنید (و مجوز اجرا به آن بدهید) تا در این بازه‌ها اجرا شود.

```text
$ sudo tree /etc/cron*
/etc/cron.d
├── munin
├── munin-node
├── php5
└── sendmail
/etc/cron.daily
├── apache2
├── apport
├── apt
├── aptitude
├── bsdmainutils
├── dpkg
├── logrotate
├── man-db
├── mlocate
├── passwd
├── popularity-contest
├── sendmail
├── update-notifier-common
└── upstart
/etc/cron.hourly
/etc/cron.monthly
/etc/crontab [error opening dir]
/etc/cron.weekly
├── apt-xapian-index
├── fstrim
├── man-db
└── update-notifier-common
```

بیایید نگاهی به یکی از فایل‌های داخل این دایرکتوری‌ها بیندازیم:

```bash
$ cat /etc/cron.daily/mlocate
#! /bin/bash

set -e

[ -x /usr/bin/updatedb.mlocate ] || exit 0

if which on_ac_power >/dev/null 2>&1; then
    ON_BATTERY=0
    on_ac_power >/dev/null 2>&1 || ON_BATTERY=$?
    if [ "$ON_BATTERY" -eq 1 ]; then
	exit 0
    fi
fi

# See ionice(1)
if [ -x /usr/bin/ionice ] &&
    /usr/bin/ionice -c3 true 2>/dev/null; then
    IONICE="/usr/bin/ionice -c3"
fi

flock --nonblock /run/mlocate.daily.lock $IONICE /usr/bin/updatedb.mlocate
```

### دستور `at`

گفتیم `crontab` دستورات را در بازه‌های زمانی منظم اجرا می‌کند، اما اگر لازم باشد یک دستور را **فقط یک بار** در زمان مشخصی اجرا کنید چه؟ اینجا `at` دوست شماست.

```text
$ at now + 1 min
warning: commands will be executed using /bin/sh
at> touch /tmp/at
at> <EOT>
job 3 at Thu Oct 29 22:12:00 2015
```

> **نکته:** مثل همیشه، در پایان ورودی کلیدهای `Ctrl+D` را می‌زنیم تا تمام شود (`<EOT>`).

اگر بخواهید ببینید چه کارهایی در صف انتظار هستند می‌توانید از `atq` استفاده کنید و مثلاً با `atrm 4` کار شماره ۴ را حذف کنید:

```text
$ at teatime
warning: commands will be executed using /bin/sh
at> echo "tea time is 4pm"
at> <EOT>
job 4 at Fri Oct 30 16:00:00 2015
jadi@funlife:~$ at tomorrow
warning: commands will be executed using /bin/sh
at> echo "tomorrow this time"
at> <EOT>
job 5 at Fri Oct 30 22:15:00 2015
jadi@funlife:~$ at 17:30
warning: commands will be executed using /bin/sh
at> echo "this is the first 17:30"
at> <EOT>
job 6 at Fri Oct 30 17:30:00 2015
jadi@funlife:~$ atq
5    Fri Oct 30 22:15:00 2015 a jadi
4    Fri Oct 30 16:00:00 2015 a jadi
6    Fri Oct 30 17:30:00 2015 a jadi
jadi@funlife:~$ atrm 4
jadi@funlife:~$ atq
5    Fri Oct 30 22:15:00 2015 a jadi
6    Fri Oct 30 17:30:00 2015 a jadi
```

### مدیریت دسترسی به `cron` و `at`

برای کنترل دسترسی به سیستم کران و `at`، ۴ فایل داریم:

```text
/etc/cron.allow
/etc/cron.deny

/etc/at.allow
/etc/at.deny
```

در اکثر سیستم‌ها هیچ‌کدام از این فایل‌ها از ابتدا وجود ندارند، اما اگر آن‌ها را بسازید، به شکل زیر عمل می‌کنند:

| پسوند فایل | عملکرد |
| :--- | :--- |
| `.allow` | **فقط** کاربرانی که نامشان در این فایل ذکر شده اجازه استفاده از این سرویس را دارند. بقیه کاربران مسدود می‌شوند |
| `.deny` | همه می‌توانند از سرویس استفاده کنند، به جز کاربرانی که نامشان در این فایل آمده است |

## زمان‌بندهای `systemd` و دستور `systemd-run`

امروزه اکثر توزیع‌های گنو/لینوکس از `systemd` استفاده می‌کنند که **تایمرهای (Timers)** مخصوص به خودش را به عنوان جایگزینی برای cron جهت زمان‌بندی کارها دارد. فایل‌های واحد تایمر از پسوند `.timer` استفاده می‌کنند و برای هر کدام از آن‌ها باید یک فایل unit متناظر وجود داشته باشد که سرویسی را که قرار است هنگام فعال شدن تایمر اجرا شود توصیف کند. به طور پیش‌فرض، یک تایمر سرویسی را فعال می‌کند که هم‌نام خودش است (فقط پسوندش فرق دارد).

تایمرها یک بخش `[Timer]` دارند که مشخص می‌کند کارهای زمان‌بندی‌شده چه زمانی اجرا شوند. دو نوع تایمر داریم. یکی **تایمر بلادرنگ (Real-time timer)** است که با گزینه `OnCalendar=` کار می‌کند و خیلی شبیه زمان‌بندهای cron است (بر اساس عبارت‌های تقویمی). ساختار آن به این صورت است:

```text
OnCalendar=DayOfWeek Year-Month-Day Hour:Minute:Second
```

> بخش `DayOfWeek` اختیاری است و می‌توانید از مخفف ۳ حرفی انگلیسی آن (مثلاً `Mon`) استفاده کنید.

کاراکترهای `*`، `/` و `,` در `systemd` دقیقاً مثل `cron` کار می‌کنند، اما در `systemd` می‌توانید از `..` بین دو مقدار هم استفاده کنید تا یک بازه پیوسته را نشان دهید.

مثلاً برای اینکه سرویسی به نام `/etc/systemd/system/myservice.service` در ساعت `02:42` اولین شنبه هر ماه اجرا شود، باید این خطوط پیکربندی را به فایل `/etc/systemd/system/myservice.timer` اضافه کنیم:

```ini
[Unit]
Description=Run the blah blah service

[Timer]
OnCalendar=Sat *-*-1..7 02:42:00
Persistent=true

[Install]
WantedBy=timers.target
```

همچنین می‌توانیم تایمرهای **یکنواخت (Monotonic)** تعریف کنیم. این تایمرها پس از گذشت مدت زمان مشخصی از یک نقطه شروع خاص (مثلاً از زمان بوت شدن ماشین یا فعال شدن خود تایمر) فعال می‌شوند. می‌توانید از میان گزینه‌های زیر انتخاب کنید:

| تنظیم | معنی |
| :--- | :--- |
| `OnActiveSec` | زمان پس از فعال شدن خود unit |
| `OnBootSec` | زمان پس از بوت شدن سیستم |
| `OnStartupSec` | زمان پس از شروع به کار service manager. برای سرویس‌های سیستمی تقریباً معادل `OnActiveSec` است. برای سرویس‌های کاربری استفاده می‌شود که در آن service manager هنگام ورود کاربر استارت می‌خورد |
| `OnUnitActiveSec` | زمان پس از آخرین باری که سرویس متناظر فعال شده است |
| `OnUnitInactiveSec` | زمان پس از آخرین باری که سرویس متناظر غیرفعال شده است |

و در مقابل آن‌ها می‌توانید از واحدهای `usec`، `msec`، `seconds`، `minutes`، `hours`، `days`، `weeks`، `months` و `years` استفاده کنید. مثلاً عبارت زیر:

```ini
[Timer]
OnUnitActiveSec=5minutes 20seconds
```

واحد متناظر را ۵ دقیقه و ۲۰ ثانیه پس از آخرین فعال شدن آن سرویس فعال می‌کند.

دقت کنید که بعد از اضافه کردن هر تایمر، باید آن را فعال (`enable`) و احتمالاً شروع (`start`) کنید:

```bash
# systemctl enable myservice.timer
# systemctl start myservice.timer
```

و فراموش نکنید بعد از هر تغییری یک بار دستور `systemctl daemon-reload` را هم اجرا کنید.

برای بررسی تمام کارهای زمان‌بندی‌شده، دستور `systemctl list-timers` را بزنید. این دستور تمام تایمرهای فعال را نشان می‌دهد. برای دیدن همه آن‌ها (حتی غیرفعال‌ها) از سوییچ `--all` استفاده کنید.

چند میان‌بر (Shortcut) هم برای زمان‌ها وجود دارد که می‌توانید به جای قالب کران از آن‌ها برای تنظیم تایمرها استفاده کنید:

| میان‌بر | زمان اجرا |
| :--- | :--- |
| `hourly` | ابتدای هر ساعت |
| `daily` | روزی یک بار در نیمه‌شب |
| `weekly` | نیمه‌شب دوشنبه‌ها |
| `monthly` | نیمه‌شب اول هر ماه |
| `yearly` | نیمه‌شب اول ژانویه |

این هم یک نمونه از تایمر روی یک نصب جدید فدورا:

```ini
# cat system/timers.target.wants/plocate-updatedb.timer 
[Unit]
Description=Update the plocate database daily

[Timer]
OnCalendar=daily
RandomizedDelaySec=12h
AccuracySec=20min
Persistent=true

[Install]
WantedBy=timers.target
```

اگر بخواهید خروجی تایمرهایتان را چک کنید، می‌توانید از `journalctl` استفاده کنید.

> مثل هر فعالیت دیگر در `systemd`، از سوییچ `--user` استفاده کنید تا تایمر در سطح کاربر خودتان اجرا شود و نه در سطح کل سیستم.

در پایان، باید با دستور `systemd-run` هم آشنا باشید. این دستور می‌تواند یک سرویس یا اسکوپ موقت (Transient) بسازد و دستورات خاصی را درون آن اجرا کند.

بنابراین دستوری مثل:

```bash
systemd-run --on-active="2hours" --unit="helloworld.service"
```

سرویس `helloworld.service` را هر ۲ ساعت اجرا می‌کند، یا این دستور:

```bash
sudo systemd-run --on-active="2hours" /usr/local/bin/helloworld.sh --language=en_US
```

اسکریپت مشخص‌شده را با پارامترهای داده‌شده هر ۲ ساعت اجرا خواهد کرد.

---

از آنجا که این مبحث جدیدتر است و منابع زیادی برایش نیست، برای یادگیری بیشتر به [مستندات SUSE درباره تایمرهای systemd](https://documentation.suse.com/smart/systems-management/html/systemd-working-with-timers/index.html) سر بزنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1072_automate_system_administration_tasks_by_scheduling_jobs.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
