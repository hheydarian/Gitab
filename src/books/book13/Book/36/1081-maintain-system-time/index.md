---
layout: layout.njk
title: "۱۰۸.۱ تنظیم و هماهنگ‌سازی زمان سیستم"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 36
chapterSection: "موضوع ۱۰۸: سرویس‌های اساسی سیستم"
permalink: /books/book13/Book/36/1081-maintain-system-time/index.html
---
{% raw %}
# ۱۰۸.۱ تنظیم و هماهنگ‌سازی زمان سیستم

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> ساعت سخت‌افزاری (hwclock)، ساعت سیستم، پروتکل NTP، ابزارهای timedatectl و chrony.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/RhH-2I1dBjA" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۳_

داوطلبان باید بتوانند زمان سیستم را به‌درستی نگهداری کرده و ساعت سیستم را از طریق NTP همگام‌سازی (Synchronize) کنند.

### حوزه‌های کلیدی دانش

* تنظیم تاریخ و ساعت سیستم
* تنظیم ساعت سخت‌افزاری روی زمان صحیح به فرمت UTC
* پیکربندی منطقه زمانی (Timezone) صحیح
* پیکربندی پایه NTP با استفاده از `ntpd` و `chrony`
* آشنایی با استفاده از سرویس `pool.ntp.org`
* آشنایی با دستور `ntpq`

### اصطلاحات و ابزارها

<div dir="ltr">

* `/usr/share/zoneinfo/`
* `/etc/timezone`
* `/etc/localtime`
* `/etc/ntp.conf`
* `/etc/chrony.conf`
* `date`
* `hwclock`
* `ntpd`
* `ntpdate`
* `chronyc`
* `pool.ntp.org`

</div>

### کامپیوتر چگونه زمان را نگه می‌دارد؟

درون کامپیوتر شما یک ساعت وجود دارد؛ یک ساعت سخت‌افزاری روی مادربرد! این ساعت باتری مخصوص به خودش را دارد و حتی زمانی که کامپیوتر خاموش است هم زمان را نگه می‌دارد. وقتی سیستم بوت می‌شود، سیستم‌عامل این **زمان سخت‌افزاری (Hardware Time)** را می‌خواند و **زمان سیستم (System Time)** خودش را بر اساس آن تنظیم می‌کند و هر وقت به دانستن زمان نیاز داشته باشد، از همین ساعت سیستم استفاده می‌کند.

ساعت سخت‌افزاری می‌تواند روی زمان محلی (`localtime`؛ همان ساعتی که هر کجا هستید روی ساعت دیواری یا مچی خود می‌بینید) یا روی زمان استاندارد جهانی (`UTC`) تنظیم شده باشد. از دستور `hwclock` می‌توان برای نمایش زمان بر اساس ساعت سخت‌افزاری استفاده کرد. ببینید چطور حتی بعد از این که زمان سیستم را تغییر می‌دهیم، این دستور همچنان زمان را بر اساس ساعت سخت‌افزاری نشان می‌دهد:

```bash
$ date
Fri Jun 23 01:47:22 PM +0330 2023
$ sudo date -s "Jan 22 22:22:22 2022"
Sat Jan 22 10:22:22 PM +0330 2022
$ date
Sat Jan 22 10:22:29 PM +0330 2022
$ sudo hwclock 
2023-06-23 13:47:41.160122+03:30
```

> **نکته:** حتی زمانی که ساعت سخت‌افزاری روی UTC تنظیم شده باشد، دستور `hwclock` تاریخ و ساعت را بر حسب زمان محلی (یعنی پس از اعمال اختلاف منطقه زمانی روی زمان UTC) نمایش می‌دهد.

سیستم‌عامل‌های قدیمی‌تر معمولاً ساعت سخت‌افزاری را به جای UTC روی زمان محلی تنظیم می‌کردند. این کار با دستور زیر قابل انجام است:

```bash
# hwclock --localtime --set --date="01/05/2023 22:04:00"
```

دستور بالا ساعت سخت‌افزاری را روی تاریخ و ساعت مشخص‌شده تنظیم می‌کند و به آن می‌گوید که این مقدار زمان محلی است. اگر بخواهید دوباره به زمان UTC برگردید، این دستور را بزنید:

```bash
# hwclock -u -w
```

در اینجا سوئیچ `-w` به `hwclock` می‌گوید زمان سخت‌افزاری را بر اساس زمان فعلی سیستم تنظیم کند و `-u` به آن اطلاع می‌دهد که از UTC استفاده می‌کنیم. همچنین این کار باعث می‌شود در فایل `/etc/adjtime` هم استفاده از UTC برای ساعت سخت‌افزاری ثبت شود.

> **نکته:** اگر زمانی را روی ساعت سخت‌افزاری بدون مشخص کردن UTC یا محلی بودن آن تنظیم کنید، فایل `/etc/adjtime` این موضوع را تعیین می‌کند و اگر این فایل وجود نداشته باشد، به صورت پیش‌فرض از UTC استفاده خواهد شد.

درباره دستورات `timedatectl` و `date` قبلاً در [فصل بومی‌سازی و بین‌المللی‌سازی](/Gitab/books/book13/Book/35/1073-localisation-and-internationalisation/) صحبت کرده‌ایم، بنابراین اینجا دوباره تکرارشان نمی‌کنم.

### مناطق زمانی (Time Zones)

در فصل‌های قبل هم درباره مناطق زمانی صحبت کرده‌ایم، اما به طور خلاصه دو فایل مهم در این زمینه وجود دارد:

فایل `/etc/timezone` یک فایل متنی است که منطقه زمانی شما را نشان می‌دهد. این فایل زمانی استفاده می‌شود که برنامه‌ای بخواهد از منطقه زمانی شما مطلع شود یا آن را نمایش دهد. برای مثال:

```bash
$ cat /etc/timezone 
Asia/Tehran
```

اما فایل `/etc/localtime` یک فایل باینری است که اطلاعات منطقه زمانی شما را برای سیستم (مثلاً برای دستور `date`) توصیف می‌کند:

```bash
$ ls -l /etc/localtime 
lrwxrwxrwx 1 root root 31 Jun 22 11:19 /etc/localtime -> /usr/share/zoneinfo/Asia/Tehran
$ file /usr/share/zoneinfo/Asia/Tehran
/usr/share/zoneinfo/Asia/Tehran: timezone data, version 2, no gmt time flags, no std time flags, no leap seconds, 72 transition times, 8 abbreviation chars
```

در بسیاری از موارد، این فایل یک پیوند نرم (Soft Link) به فایلی در مسیر `/usr/share/zoneinfo/` است تا در صورت به‌روزرسانی سیستم، اطلاعات آن هم به‌روز شود.

### پروتکل زمان شبکه (NTP)

پروتکل **Network Time Protocol (NTP)** یکی از پروتکل‌های محبوب من است! اگر وارد جزئیاتش شوید، می‌بینید که یکی از جذاب‌ترین پروتکل‌های دنیاست. اما خوشبختانه (یا متأسفانه!) برای آزمون LPIC-1 نیازی نیست به اعماق فنی NTP بروید. این پروتکل از سرورهای NTP استفاده می‌کند تا زمان دقیقِ اندازه‌گیری‌شده توسط بهترین ساعت‌های اتمی روی کره زمین را پیدا کند. یکی از معروف‌ترین آدرس‌هایی که برای این کار استفاده می‌شود `pool.ntp.org` است. اگر وب‌سایت آن را چک کنید می‌بینید که این سرویس یک **استخر (Pool)** از سرورهای NTP است و با دادن آدرس `pool.ntp.org` به سرویس NTP خودتان، به یکی از سرورهای متعدد موجود در این مجموعه هدایت می‌شوید.

#### دستور `ntpdate`

سرراست‌ترین دستور برای تنظیم ساعت سیستم، `ntpdate` است که به شکل زیر استفاده می‌شود:

```bash
$ sudo ntpdate pool.ntp.org
23 Jun 14:49:55 ntpdate[160138]: adjust time server 31.214.170.254 offset +0.020196 sec
```

پس از این کار، باید ساعت سخت‌افزاری را هم با استفاده از دستور `sudo hwclock -w` با زمان همگام‌شده جدید سیستم تنظیم کنیم.

#### سرویس `ntpd`

به جای اینکه هر بار به صورت دستی زمان را تنظیم کنید، می‌توانید از یک سرویس لینوکسی به نام `ntp` استفاده کنید تا زمان سیستم را با کمک سرورهای زمان (که معروف‌ترین آن‌ها `pool.ntp.org` است) همیشه دقیق نگه دارد. بسته `ntp` را نصب و سرویس آن را اجرا کنید:

در دبیان / اوبونتو:

```bash
# apt install ntp
# systemctl start ntp
```

نکته جالب اینجاست که نمی‌توانید از هر دوی این‌ها هم‌زمان استفاده کنید! به این خروجی نگاه کنید:

```bash
root@funlife:~# ntpdate pool.ntp.org
23 Jun 14:49:55 ntpdate[18670]: the NTP socket is in use, exiting
```

همانطور که می‌بینید، الان سرویس `ntp` در حال استفاده از پورت NTP است و به همین خاطر `ntpdate` هنگام اجرا با خطا مواجه می‌شود.

فایل پیکربندی اصلی `ntp` در مسیر `/etc/ntp.conf` قرار دارد:

```text
# cat /etc/ntp.conf
# /etc/ntp.conf, configuration for ntpd; see ntp.conf(5) for help

driftfile /var/lib/ntp/ntp.drift

# Enable this if you want statistics to be logged.
#statsdir /var/log/ntpstats/

statistics loopstats peerstats clockstats
filegen loopstats file loopstats type day enable
filegen peerstats file peerstats type day enable
filegen clockstats file clockstats type day enable


# You do need to talk to an NTP server or two (or three).
#server ntp.your-provider.example

# pool.ntp.org maps to about 1000 low-stratum NTP servers.  Your server will
# pick a different set every time it starts up.  Please consider joining the
# pool: <http://www.pool.ntp.org/join.html>
pool 0.debian.pool.ntp.org iburst
pool 1.debian.pool.ntp.org iburst
pool 2.debian.pool.ntp.org iburst
pool 3.debian.pool.ntp.org iburst


# Access control configuration; see /usr/share/doc/ntp-doc/html/accopt.html for
# details.  The web page <http://support.ntp.org/bin/view/Support/AccessRestrictions>
# might also be helpful.
#
# Note that "restrict" applies to both servers and clients, so a configuration
# that might be intended to block requests from certain clients could also end
# up blocking replies from your own upstream servers.

# By default, exchange time with everybody, but don't allow configuration.
restrict -4 default kod notrap nomodify nopeer noquery limited
restrict -6 default kod notrap nomodify nopeer noquery limited

# Local users may interrogate the ntp server more closely.
restrict 127.0.0.1
restrict ::1

# Needed for adding pool entries
restrict source notrap nomodify noquery

# Clients from this (example!) subnet have unlimited access, but only if
# cryptographically authenticated.
#restrict 192.168.123.0 mask 255.255.255.0 notrust


# If you want to provide time to your local subnet, change the next line.
# (Again, the address is an example only.)
#broadcast 192.168.123.255

# If you want to listen to time broadcasts on your local subnet, de-comment the
# next lines.  Please do this only if you trust everybody on the network!
#disable auth
#broadcastclient
```

در صورت نیاز، می‌توانید سرورهای NTP را در این فایل به سرورهای دلخواه خود تغییر دهید.

اگر پیکربندی را مرور کنید، امکانات جالب دیگری مثل ارائه سرویس NTP به کامپیوترهای دیگر در شبکه را هم می‌بینید، هرچند برای قبولی در آزمون LPIC به این جزئیات نیازی ندارید.

#### دستور `ntpq`

دستور `ntpq` از سرویس NTP پرس‌وجو (Query) می‌گیرد. یکی از سوئیچ‌های معروف آن `-p` (مخفف Print یا Peers) است که استخر سرورهایی را که برای همگام‌سازی ساعت استفاده می‌کنیم، نشان می‌دهد:

```text
 ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
 0.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 1.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 2.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 3.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
+46.209.14.1     192.168.5.2      4 u    7   64    1   58.300  -15.546  14.519
-ntp.tums.ac.ir  195.161.115.4    4 u    4   64    1   30.636    2.485   4.025
*194.225.150.25  194.190.168.1    2 u    5   64    1   31.478   -3.870  95.635
+5.160.24.41     192.168.5.2      4 u    3   64    1   90.000  -28.328  21.643
```

در این خروجی، علامت `*` یعنی NTP از این سرور به عنوان مرجع اصلی استفاده می‌کند، علامت `+` یعنی این یک سرور خوب و قابل قبول است و علامت `-` سروری را نشان می‌دهد که خارج از محدوده استاندارد است و نادیده گرفته می‌شود.

### ابزار `chrony`

یک پیاده‌سازی دیگر و جدیدتر از پروتکل NTP ابزار `chrony` است. در مقایسه با `ntpd`، این ابزار در شرایط دشوارتری مثل اتصال‌های ناپایدار و مقطعی شبکه (مثلاً روی لپ‌تاپ‌ها) و شبکه‌های شلوغ، نتایج بهتری در همگام‌سازی زمان ارائه می‌دهد. `chrony` کلاینت پیش‌فرض NTP در RedHat 8، SUSE 15 و بسیاری از توزیع‌های دیگر است.

در اینجا یک نمونه از فایل `chrony.conf` را می‌بینید:

```text
$ cat /etc/chrony/chrony.conf 
# Welcome to the chrony configuration file. See chrony.conf(5) for more
# information about usable directives.

# Include configuration files found in /etc/chrony/conf.d.
confdir /etc/chrony/conf.d

# This will use (up to):
# - 4 sources from ntp.ubuntu.com which some are ipv6 enabled
# - 2 sources from 2.ubuntu.pool.ntp.org which is ipv6 enabled as well
# - 1 source from [01].ubuntu.pool.ntp.org each (ipv4 only atm)
# This means by default, up to 6 dual-stack and up to 2 additional IPv4-only
# sources will be used.
# At the same time it retains some protection against one of the entries being
# down (compare to just using one of the lines). See (LP: #1754358) for the
# discussion.
#
# About using servers from the NTP Pool Project in general see (LP: #104525).
# Approved by Ubuntu Technical Board on 2011-02-08.
# See http://www.pool.ntp.org/join.html for more information.
pool ntp.ubuntu.com        iburst maxsources 4
pool 0.ubuntu.pool.ntp.org iburst maxsources 1
pool 1.ubuntu.pool.ntp.org iburst maxsources 1
pool 2.ubuntu.pool.ntp.org iburst maxsources 2

# Use time sources from DHCP.
sourcedir /run/chrony-dhcp

# Use NTP sources found in /etc/chrony/sources.d.
sourcedir /etc/chrony/sources.d

# This directive specify the location of the file containing ID/key pairs for
# NTP authentication.
keyfile /etc/chrony/chrony.keys

# This directive specify the file into which chronyd will store the rate
# information.
driftfile /var/lib/chrony/chrony.drift

# Save NTS keys and cookies.
ntsdumpdir /var/lib/chrony

# Uncomment the following line to turn logging on.
#log tracking measurements statistics

# Log files location.
logdir /var/log/chrony

# Stop bad estimates upsetting machine clock.
maxupdateskew 100.0

# This directive enables kernel synchronization (every 11 minutes) of the
# real-time clock. Note that it can’t be used along with the 'rtcfile' directive.
rtcsync

# Step the system clock instead of slewing it if the adjustment is larger than
# one second, but only in the first three clock updates.
makestep 1 3

# Get TAI-UTC offset and leap seconds from the system tz database.
# This directive must be commented out when using time sources serving
# leap-smeared time.
leapsectz right/UTC
```

برای کنترل سرویس `chrony`، یک رابط خط فرمان (CLI) به نام `chronyc` وجود دارد. این ابزار برای پایش عملکرد `chronyd` و تغییر پارامترهای مختلف عملیاتی استفاده می‌شود. اگر مستقیماً یک دستور به `chronyc` بدهید، نتیجه آن را نمایش می‌دهد؛ در غیر این صورت وارد محیط خط فرمان تعاملی آن می‌شوید تا دستورات خود را تایپ کنید. به مثال زیر نگاه کنید:

```bash
$ chronyc tracking
Reference ID    : 0FED61D6 (paris.time.system76.com)
Stratum         : 3
Ref time (UTC)  : Fri Jun 23 12:44:20 2023
System time     : 0.001574947 seconds slow of NTP time
Last offset     : +0.000513619 seconds
RMS offset      : 0.065126784 seconds
Frequency       : 8.705 ppm slow
Residual freq   : +0.278 ppm
Skew            : 14.972 ppm
Root delay      : 0.180896595 seconds
Root dispersion : 0.013603540 seconds
Update interval : 128.6 seconds
Leap status     : Normal
$ chronyc
chrony version 4.2
Copyright (C) 1997-2003, 2007, 2009-2021 Richard P. Curnow and others
chrony comes with ABSOLUTELY NO WARRANTY.  This is free software, and
you are welcome to redistribute it under certain conditions.  See the
GNU General Public License version 2 for details.

chronyc> activity
200 OK
12 sources online
0 sources offline
0 sources doing burst (return to online)
0 sources doing burst (return to offline)
3 sources with unknown address

chronyc> sources
MS Name/IP address         Stratum Poll Reach LastRx Last sample               
===============================================================================
^? prod-ntp-4.ntp4.ps5.cano>     2   7   375    20  +5039us[+5039us] +/-   85ms
^? prod-ntp-5.ntp4.ps5.cano>     2   7   377    83    +12ms[  +15ms] +/-   87ms
^? prod-ntp-3.ntp4.ps5.cano>     2   7   177    22    +13ms[  +17ms] +/-   91ms
^? alphyn.canonical.com          2   7   277    22  +3298us[+6616us] +/-  185ms
^? mail.stumpflee.com            2   7   373    19  +6221us[+6221us] +/-  117ms
^? meetbsd.ir                    2   6   377    27    -23ms[  -20ms] +/-  231ms
^? 188.121.119.122               3   7   377    26    -27ms[  -23ms] +/-  131ms
^+ brazil.time.system76.com      2   7   377    20    -13ms[  -13ms] +/-  190ms
^+ ohio.time.system76.com        2   7   377    21    +23ms[  +23ms] +/-  171ms
^+ oregon.time.system76.com      2   7   377    23    +22ms[  +26ms] +/-  217ms
^* paris.time.system76.com       2   7   377    24  -4880us[-1560us] +/-  109ms
^+ virginia.time.system76.c>     2   7   163    19  +5465us[+5465us] +/-  148ms

chronyc> exit
$ sudo chronyc makestep
200 OK
```

ابزار `chronyc` با استفاده از سوکت‌های TCP یا Unix به سرویس `chrony` متصل می‌شود. بنابراین می‌توانید از `chronyc` محلی برای اتصال به یک `chrony` روی سرور دوردست و اجرای دستورات استفاده کنید، هرچند در آن حالت به دلایل امنیتی عمدتاً به دستورات پایش (Monitoring) محدود خواهید بود.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1081_maintain_system_time.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
