---
layout: layout.njk
title: "۱۰۸.۴ مدیریت چاپگرها و صف چاپ (CUPS)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 39
chapterSection: "موضوع ۱۰۸: سرویس‌های اساسی سیستم"
permalink: /books/book13/Book/39/1084-manage-printers-and-printing/index.html
---
{% raw %}
# ۱۰۸.۴ مدیریت چاپگرها و صف چاپ (CUPS)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> سرویس چاپ CUPS، پورت وب ۶۳۱، دستورات lp، lpr، lpq، lprm و فایل‌های PPD.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/8I9J0gsLe-U" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۲_

داوطلبان باید بتوانند صف‌های چاپ (Print Queues) و کارهای چاپ کاربران (Print Jobs) را با استفاده از CUPS و رابط سازگاری LPD مدیریت کنند.

### حوزه‌های کلیدی دانش

* پیکربندی پایه CUPS (برای چاپگرهای محلی و تحت شبکه)
* مدیریت صف‌های چاپ کاربران
* عیب‌یابی مشکلات عمومی چاپ
* افزودن و حذف کارهای چاپ در صف‌های چاپگرهای پیکربندی‌شده

### اصطلاحات و ابزارها

* فایل‌های پیکربندی، ابزارها و برنامه‌های جانبی CUPS
* `/etc/cups/`
* رابط سنتی LPD (`lpr`، `lprm`، `lpq`)

## سیستم چاپ CUPS

بیشتر توزیع‌های لینوکس برای چاپ از بسته `CUPS` استفاده می‌کنند. ممکن است لازم باشد آن را از طریق مدیر بسته خودتان نصب کرده و سرویسش را با استفاده از `systemd` یا سیستم `init` رایج در توزیع خود راه‌اندازی کنید:

```bash
$ sudo apt install cups
[sudo] password for jadi:
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  acl avahi-daemon colord colord-data cups-browsed cups-client cups-common cups-core-drivers
  cups-daemon cups-filters cups-filters-core-drivers cups-ipp-utils cups-ppdc
  cups-server-common fonts-droid-fallback fonts-noto-mono fonts-urw-base35 ghostscript
  ipp-usb libavahi-core7 libavahi-glib1 libcolorhug2 libcupsfilters1 libdaemon0 libexif12
  libfontembed1 libgphoto2-6 libgphoto2-l10n libgphoto2-port12 libgs-common libgs10
  libgs10-common libgusb2 libidn12 libieee1284-3 libijs-0.35 libjbig2dec0 libjson-glib-1.0-0
  libjson-glib-1.0-common liblouis-data liblouis20 liblouisutdml-bin liblouisutdml-data
  liblouisutdml9 libltdl7 libnss-mdns libpaper-utils libpaper1 libpoppler-cpp0v5
  libpoppler-glib8 libpoppler126 libqpdf29 libsane-common libsane1 libsnmp-base libsnmp40
  lynx lynx-common mailcap poppler-data poppler-utils sane-airscan sane-utils update-inetd
  usb.ids
Suggested packages:
  avahi-autoipd colord-sensor-argyll cups-bsd cups-pdf foomatic-db-compressed-ppds
  | foomatic-db smbclient antiword docx2txt imagemagick fonts-noto fonts-freefont-otf
  | fonts-freefont-ttf fonts-texgyre gphoto2 ooo2dbk rtf2xml avahi-autoipd | zeroconf hplip
  snmp-mibs-downloader fonts-japanese-mincho | fonts-ipafont-mincho fonts-arphic-ukai
  fonts-arphic-uming fonts-nanum unpaper
The following NEW packages will be installed:
  acl avahi-daemon colord colord-data cups cups-browsed cups-client cups-common
  cups-core-drivers cups-daemon cups-filters cups-filters-core-drivers cups-ipp-utils
  cups-ppdc cups-server-common fonts-droid-fallback fonts-noto-mono fonts-urw-base35
  ghostscript ipp-usb libavahi-core7 libavahi-glib1 libcolorhug2 libcupsfilters1 libdaemon0
  libexif12 libfontembed1 libgphoto2-6 libgphoto2-l10n libgphoto2-port12 libgs-common
  libgs10 libgs10-common libgusb2 libidn12 libieee1284-3 libijs-0.35 libjbig2dec0
  libjson-glib-1.0-0 libjson-glib-1.0-common liblouis-data liblouis20 liblouisutdml-bin
  liblouisutdml-data liblouisutdml9 libltdl7 libnss-mdns libpaper-utils libpaper1
  libpoppler-cpp0v5 libpoppler-glib8 libpoppler126 libqpdf29 libsane-common libsane1
  libsnmp-base libsnmp40 lynx lynx-common mailcap poppler-data poppler-utils sane-airscan
  sane-utils update-inetd usb.ids
0 upgraded, 66 newly installed, 0 to remove and 7 not upgraded.
Need to get 40.7 MB of archives.
After this operation, 163 MB of additional disk space will be used.
Do you want to continue? [Y/n]
...
...
```

عبارت `CUPS` مخفف **Common Unix Printing System** است و همانطور که می‌بینید، کلی بسته مرتبط هم همراهش نصب می‌شود و تعدادی دیگر را هم پیشنهاد می‌دهد. دلیلش این است که CUPS به اطلاعات زیادی درباره چاپگرهای مختلف نیاز دارد و از ابزارهای متعددی برای چاپ استفاده می‌کند. پس از نصب، باید سرویس آن را استارت کنید:

```bash
$ sudo systemctl start cups.service
$ sudo systemctl status cups.service
● cups.service - CUPS Scheduler
     Loaded: loaded (/lib/systemd/system/cups.service; enabled; preset: enabled)
     Active: active (running) since Sun 2023-07-16 13:50:20 EDT; 27s ago
TriggeredBy: ● cups.path
             ● cups.socket
       Docs: man:cupsd(8)
   Main PID: 2366 (cupsd)
     Status: "Scheduler is running..."
      Tasks: 1 (limit: 4583)
     Memory: 2.8M
        CPU: 400ms
     CGroup: /system.slice/cups.service
             └─2366 /usr/sbin/cupsd -l

Jul 16 13:50:20 debian systemd[1]: Starting cups.service - CUPS Scheduler...
Jul 16 13:50:20 debian systemd[1]: Started cups.service - CUPS Scheduler.
```

برای دسترسی به سرویس‌های CUPS راه‌های مختلفی وجود دارد؛ از جمله یک رابط مبتنی بر وب، برنامه‌های گرافیکی (GUI) در محیط دسکتاپ و همین‌طور ابزارهای خط فرمان. CUPS طوری طراحی شده که ساده باشد و بتواند از چاپگرهای مختلف ساخت شرکت‌های گوناگون پشتیبانی کند.

### فایل‌های پیکربندی

مانند بیشتر برنامه‌های دیگر لینوکس، CUPS فایل‌های پیکربندی خود را در دایرکتوری `/etc` ذخیره می‌کند:

```bash
# ls /etc/cups/
cups-browsed.conf  cups-files.conf  ppd		   raw.convs  snmp.conf  subscriptions.conf
cupsd.conf	   interfaces	    printers.conf  raw.types  ssl	 subscriptions.conf.O
```

فایل پیکربندی اصلی `cupsd.conf` است. نگاهی به آن بیندازید؛ درکش بسیار ساده است. برای مثال خط `Listen localhost:631` به CUPS می‌گوید روی پورت `631` از `localhost` گوش بدهد. این هم یک نمونه از آن:

```text
$ cat /etc/cups/cupsd.conf
#
# Configuration file for the CUPS scheduler.  See "man cupsd.conf" for a
# complete description of this file.
#

# Log general information in error_log - change "warn" to "debug"
# for troubleshooting...
LogLevel warn
PageLogFormat

# Specifies the maximum size of the log files before they are rotated.  The value "0" disables log rotation.
MaxLogSize 0

# Default error policy for printers
ErrorPolicy retry-job

# Only listen for connections from the local machine.
Listen localhost:631
Listen /run/cups/cups.sock

# Show shared printers on the local network.
Browsing Yes
BrowseLocalProtocols dnssd

# Default authentication type, when authentication is required...
DefaultAuthType Basic

# Web interface setting...
WebInterface Yes

# Timeout after cupsd exits if idle (applied only if cupsd runs on-demand - with -l)
IdleExitTimeout 60

# Restrict access to the server...
<Location />
  Order allow,deny
</Location>

# Restrict access to the admin pages...
<Location /admin>
  Order allow,deny
</Location>

# Restrict access to configuration files...
<Location /admin/conf>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Restrict access to log files...
<Location /admin/log>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Set the default printer/job policies...
<Policy default>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default CUPS-Get-Devices>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the authenticated printer/job policies...
<Policy authenticated>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Default
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the kerberized printer/job policies...
<Policy kerberos>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Negotiate
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>
jadi@debian:~$
Broadcast message from root@debian on pts/3 (Sun 2023-07-16 20:54:04 EDT):

The system will power off now!

Connection to 192.168.64.7 closed by remote host.
Connection to 192.168.64.7 closed.
➜  lpic1book ssh jadi@192.168.64.7
jadi@192.168.64.7's password:
Linux debian 6.1.0-9-arm64 #1 SMP Debian 6.1.27-1 (2023-05-08) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
You have no mail.
Last login: Mon Jul 17 08:13:13 2023
jadi@debian:~$ sudo su -
[sudo] password for jadi:
root@debian:~# cd /etc/cups/
root@debian:/etc/cups# ls
cups-browsed.conf  cups-files.conf  ppd		   raw.convs  snmp.conf  subscriptions.conf
cupsd.conf	   interfaces	    printers.conf  raw.types  ssl	 subscriptions.conf.O
root@debian:/etc/cups# cd
root@debian:~# ls /etc/cups/
cups-browsed.conf  cups-files.conf  ppd		   raw.convs  snmp.conf  subscriptions.conf
cupsd.conf	   interfaces	    printers.conf  raw.types  ssl	 subscriptions.conf.O
root@debian:~# cat /etc/cups/cupsd.conf
#
# Configuration file for the CUPS scheduler.  See "man cupsd.conf" for a
# complete description of this file.
#

# Log general information in error_log - change "warn" to "debug"
# for troubleshooting...
LogLevel warn
PageLogFormat

# Specifies the maximum size of the log files before they are rotated.  The value "0" disables log rotation.
MaxLogSize 0

# Default error policy for printers
ErrorPolicy retry-job

# Only listen for connections from the local machine.
Listen localhost:631
Listen /run/cups/cups.sock

# Show shared printers on the local network.
Browsing Yes
BrowseLocalProtocols dnssd

# Default authentication type, when authentication is required...
DefaultAuthType Basic

# Web interface setting...
WebInterface Yes

# Timeout after cupsd exits if idle (applied only if cupsd runs on-demand - with -l)
IdleExitTimeout 60

# Restrict access to the server...
<Location />
  Order allow,deny
</Location>

# Restrict access to the admin pages...
<Location /admin>
  Order allow,deny
</Location>

# Restrict access to configuration files...
<Location /admin/conf>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Restrict access to log files...
<Location /admin/log>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Set the default printer/job policies...
<Policy default>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default CUPS-Get-Devices>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the authenticated printer/job policies...
<Policy authenticated>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Default
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the kerberized printer/job policies...
<Policy kerberos>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Negotiate
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>
```

تمام اطلاعات چاپگرها در فایل `/etc/cups/printers.conf` ذخیره می‌شود. رابط وب یا هر برنامه گرافیکی دیگری در واقع در حال ویرایش همین فایل است:

```text
# cat /etc/cups/printers.conf
# Printer configuration file for CUPS v2.4.2
# Written by cupsd
# DO NOT EDIT THIS FILE WHEN CUPSD IS RUNNING
NextPrinterId 2
<Printer MyPrinter>
PrinterId 1
UUID urn:uuid:cea56d60-93a0-31bf-443b-5a7288e2cd51
Info My Printer
Location other room
MakeModel HP DesignJet 600 pcl, 1.0
DeviceURI http://thatprinter:631/ipp/
State Idle
StateTime 1689596391
ConfigTime 1689596367
Type 8450116
Accepting Yes
Shared Yes
JobSheets none none
QuotaPeriod 0
PageLimit 0
KLimit 0
OpPolicy default
ErrorPolicy retry-job
</Printer>
```

یکی دیگر از دایرکتوری‌های مهم پیکربندی، `/etc/cups/ppd/` است. این دایرکتوری شامل فایل‌های **PostScript Printer Description (PPD)** است که به چاپگرهای استفاده‌کننده از آن‌ها کمک می‌کند به‌درستی کار کنند.

برای پیدا کردن لاگ‌های CUPS هم به دایرکتوری `/var/log` سر بزنید:

```bash
# ls /var/log/cups/
access_log  error_log
```

### رابط وب CUPS

برای فعال کردن رابط وب CUPS، باید تنظیم زیر را در فایل `/etc/cups/cupsd.conf` فعال کنید:

```text
WebInterface Yes
```

سپس از طریق پورت **631** به رابط گرافیکی تحت وب دسترسی خواهید داشت. بنابراین کافی است از مرورگر خود آدرس `localhost:631` یا `127.0.0.1:631` (یا آدرس IP سرور روی پورت `631`) را باز کنید.

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book13/assets/cups_we_interface.png" alt="CUPS web interface on port 631" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

در صفحه بالا چند بخش مهم وجود دارد:

| بخش | کاربرد |
|-------|-----|
| `Administration` | افزودن چاپگرها، مدیریت کارهای چاپ و پیکربندی سرور CUPS |
| `Jobs` | بررسی کارهای چاپ فعال، در انتظار و تکمیل‌شده |
| `Printers` | فهرست کردن یا جستجو در چاپگرهای نصب‌شده |

به صورت پیش‌فرض، کاربران سیستم می‌توانند چاپگرها و کارهای در صف را ببینند، اما انجام تغییرات (مثل افزودن چاپگر جدید) به سطح دسترسی بیشتری نیاز دارد. این دسترسی‌ها در بخش پایانی فایل `cupsd.conf` تنظیم می‌شوند. برای مثال، پیکربندی زیر دسترسی `CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Set-Default` را به تمام اعضای گروه `@printer_admin` می‌دهد:

```text
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Set-Default>
    AuthType Default
    Require user @printer_admin
    Order deny,allow
  </Limit>
```

> **نکته:** CUPS بیشتر درایورهای متداول چاپگرها را از پیش نصب‌شده دارد. برای افزودن یک چاپگر، کافی است مدل آن را از منوی کشویی انتخاب کنید.

### ابزارهای سنتی (Legacy Tools)

درست مانند برنامه‌های [MTA](/Gitab/books/book13/Book/38/1083-mail-transfer-agent-mta-basics/)، سیستم چاپ CUPS هم از تمام دستورات خط فرمان قدیمی پشتیبانی می‌کند. این‌ها در اصل دستورات چاپ در دنیای BSD بودند، بنابراین ممکن است لازم باشد بسته `cups-bsd` را نصب کنید تا در محیط CUPS شما کار کنند. جدول زیر دستورات سازگاری چاپ BSD را فهرست می‌کند:

| دستور | کاربرد |
| :--- | :--- |
| `lpr` | چاپ یک فایل |
| `lpq` | نمایش صف چاپ / کارهای چاپ |
| `lprm` | حذف یک فایل از صف چاپگر (`rm` به معنی حذف) |
| `lpc` | برنامه کنترل و عیب‌یابی چاپگر |

#### دستور `lpq`

حرف **q** مخفف **queue** (صف) است. بنابراین `lpq` صف چاپگر را نشان می‌دهد و زمانی استفاده می‌شود که می‌خواهید کارهای در حال چاپ یا در انتظار را ببینید. اگر از سوئیچ `-a` استفاده کنید، `lpq` کارهای **همه** چاپگرها را فهرست می‌کند. همچنین می‌توانید از سوئیچ `-P` برای نمایش کارهای یک چاپگر خاص استفاده نمایید. پس دستور زیر کارهای چاپگری به نام `Apple-Dot-Matrix` را نشان می‌دهد:

```bash
# lpq -PApple-Dot-Matrix
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  unknown 1       unknown                         7168 bytes
1st     unknown 2       unknown                         2048 bytes
```

> **نکته:** بین `-P` و نام چاپگر نباید فاصله‌ای باشد؛ عجیب است؟ بله :D

#### دستور `lpr`

این دستور یک کار چاپ را به چاپگر می‌فرستد. نام چاپگر با سوئیچ `-P` مشخص می‌شود:

```bash
$ lpr -PApple-Dot-Matrix for_print.txt
$ lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    2       Untitled1                       2048 bytes
2nd     jadi    3       for_print.txt                   1024 bytes
```

> **نکته:** اگر هیچ چاپگری مشخص نشود، از چاپگر پیش‌فرض استفاده خواهد شد.

#### دستور `lprm`

عبارت **rm** مخفف **remove** (حذف) است. بنابراین دستور `lprm` کارهای چاپ را از صف حذف می‌کند. طبیعتاً باید **شناسه کار (Job ID)** را به آن بدهید:

```bash
$ lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    2       Untitled1                       2048 bytes
2nd     jadi    3       for_print.txt                   1024 bytes
jadi@funlife:/tmp$ lprm 2
jadi@funlife:/tmp$ lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    3       for_print.txt                   1024 bytes
```

> **نکته:** فقط کاربر `root` می‌تواند کارهای چاپِ سایر کاربران را حذف کند.

اگر لازم شد **همه** کارهای یک چاپگر خاص را حذف کنید، می‌توانید از `-Pprinter_name -` استفاده کنید. بله! فقط یک خط تیره (`-`) بعد از نام چاپگر؛ دقیقاً به همین خاطر است که به آن دستور قدیمی (Legacy) می‌گویند.

> **نکته:** دستور `lprm -` همه کارهای چاپ را حذف می‌کند.

#### دستور `lpc`

حرف **c** مخفف **control** (کنترل) است. بنابراین `lpc` به شما اجازه می‌دهد چاپگرهایتان را کنترل کنید، وضعیتشان را بررسی کنید (از طریق `lpc status`) و عیب‌یابی نمایید:

```bash
$ lpc status
Apple-Dot-Matrix:
    printer is on device 'ipp' speed -1
    queuing is enabled
    printing is enabled
    2 entries
    daemon present
```

در خروجی بالا:

* **`queuing is enabled`** به ما می‌گوید که صف می‌تواند کارهای چاپ جدید را بپذیرد. اگر صف غیرفعال باشد، حتی نمی‌توانید کار جدیدی به چاپگر بفرستید.
* **`printing is enabled`** به این معنی است که چاپگر عملاً قادر به چاپ روی کاغذ است. اگر چاپگر جوهر یا کاغذ تمام کرده باشد یا کاغذ در آن گیر کرده باشد، این وضعیت می‌تواند غیرفعال شود.

اگر با چاپگر خود مشکل دارید یا می‌خواهید جلوی پذیرش کارهای جدید را بگیرید، یا اجازه دهید کارها در صف جمع شوند اما عملاً چاپ نشوند، این چهار دستور به کارتان می‌آیند:

| دستور | کاربرد |
| :--- | :--- |
| `cupsaccept` | به صف چاپگر می‌گوید کارهای جدید را بپذیرد |
| `cupsreject` | به چاپگر می‌گوید هر کار جدیدی را رد کند |
| `cupsenable` | چاپ واقعی / فیزیکی کارها را فعال می‌کند |
| `cupsdisable` | چاپ فیزیکی کارها را غیرفعال می‌کند |

> **نکته:** در همه این موارد باید نام چاپگر را وارد کنید. همچنین می‌توانید با سوئیچ `-r` دلیل آن را هم بنویسید.

```bash
$ cupsdisable Apple-Dot-Matrix -r "need more paper"
$ lpc status
Apple-Dot-Matrix:
    printer is on device 'ipp' speed -1
    queuing is enabled
    printing is disabled
    2 entries
    daemon present
```

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1084_manage_printers_and_printing.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
