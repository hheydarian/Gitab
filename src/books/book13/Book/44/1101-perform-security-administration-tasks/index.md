---
layout: layout.njk
title: "۱۱۰.۱ مدیریت امنیت و دسترسی‌های ریشه‌ای"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 44
chapterSection: "موضوع ۱۱۰: امنیت سیستم"
permalink: /books/book13/Book/44/1101-perform-security-administration-tasks/index.html
---
{% raw %}
# ۱۱۰.۱ مدیریت امنیت و دسترسی‌های ریشه‌ای

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> کار با su، پیکربندی فایل /etc/sudoers با visudo، محدودسازی منابع با /etc/security/limits.conf و نظارت بر نشست‌ها با who و last.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/rNxitwVtRvo" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۳_

داوطلبان باید بدانند چگونه پیکربندی سیستم را بررسی کنند تا امنیت میزبان مطابق با سیاست‌های امنیتی محلی تضمین شود.

### حوزه‌های دانش کلیدی

* ممیزی (Audit) سیستم برای پیدا کردن فایل‌هایی که بیت `suid` یا `sgid` آن‌ها فعال شده است.
* تنظیم یا تغییر رمز عبور کاربران و اطلاعات مربوط به عمر رمز عبور (Password Aging).
* توانایی استفاده از `nmap` و `netstat` برای کشف پورت‌های باز روی یک سیستم.
* اعمال محدودیت روی ورود کاربران (Logins)، پردازش‌ها و مصرف حافظه.
* تشخیص اینکه کدام کاربران به سیستم وارد شده‌اند یا هم‌اکنون لاگین هستند.
* پیکربندی و استفاده پایه از `sudo`.

### اصطلاحات و ابزارها

<div dir="ltr">

* `find`
* `passwd`
* `fuser`
* `lsof`
* `nmap`
* `chage`
* `netstat`
* `sudo`
* `/etc/sudoers`
* `su`
* `usermod`
* `ulimit`
* `who`، `w`، `last`

</div>

## کاربران (Users)

### مقایسه `sudo` و `su`

تقریباً در همه فصل‌ها از `sudo` و `su` استفاده کرده‌ایم و حالا وقتش رسیده نگاه دقیق‌تری به آن‌ها بیندازیم! دستور `su` شما را به یک حساب کاربری دیگر منتقل می‌کند؛ یعنی هویت کاربر را جایگزین می‌کند (Substitute User Identity). بعد از اینکه با موفقیت به حساب جدید `su` کردید، یک خط فرمان (Prompt) جدید با کاربر تازه دریافت می‌کنید:

```text
jadi@funlife ~$ whoami
jadi
jadi@funlife ~$ su -
Password:
root@funlife:~# whoami
root
root@funlife:~# su jadi -
jadi@funlife /root$ whoami
jadi
jadi@funlife /root$ exit
exit
root@funlife:~# whoami
root
root@funlife:~# exit
logout
jadi@funlife ~$ whoami
jadi
jadi@funlife ~$
```

توجه کنید که هنگام اجرای `su` باید **رمز عبور کاربر root** را وارد کنید تا تبدیل به `root` شوید؛ یا رمز عبور هر کاربر دیگری را وارد کنید تا به آن کاربر تبدیل شوید!

در مقابل، دستور `sudo` رمز عبور **خودتان** را می‌پرسد و دستوری را که به آن داده‌اید با دسترسی‌های `root` اجرا می‌کند. پس `sudo ls` دستور `ls` را پس از پرسیدن **رمز خودتان** با دسترسی ریشه اجرا می‌کند. بدیهی است که برای اجرای `sudo` باید _حق دسترسی سودو_ داشته باشید. این موضوع در فایل `/etc/sudoers` تعریف می‌شود:

```text
$ sudo cat /etc/sudoers
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults    env_reset
Defaults    mail_badpass
Defaults    secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo    ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
```

به این ۲ خط مهم دقت کنید:

- اینکه `root` چطور مجوز اجرای همه دستورات را می‌گیرد:

  ```text
  root    ALL=(ALL:ALL) ALL
  ```
- و اینکه گروه‌های `sudo` و `admin` چطور مجوز اجرای دستورات را به‌عنوان `root` می‌گیرند:

  ```text
  # Members of the admin group may gain root privileges
  %admin ALL=(ALL) ALL

  # Allow members of group sudo to execute any command
  %sudo    ALL=(ALL:ALL) ALL
  ```

  عبارت `ALL:ALL` یعنی این کاربران می‌توانند با هویت هر کاربر و هر گروهی دستورات را اجرا کنند. آخرین `ALL` هم به `sudo` می‌گوید که این کاربران/گروه‌ها می‌توانند **همه** دستورات را اجرا کنند. می‌توانیم در بخش آخر مثلاً `/bin/ping` بگذاریم تا به `sudo` بگوییم این کاربر فقط اجازه دارد `ping` را با دسترسی `root` اجرا کند، مثل زیر:

  ```text
  username ALL=(ALL) /bin/ping
  ```

> **نکته:** فایل `/etc/sudoers` بسیار مهم است و خراب کردن آن مشکلات بزرگی ایجاد می‌کند. برای جلوگیری از اضافه کردن خطوط نامفهوم و دارای خطای نحوی در این فایل، باید به‌جای `vi /etc/sudoers` از دستور `visudo` استفاده کنید. این ابزار ویرایش‌های شما را بررسی می‌کند تا مطمئن شود دستور `sudo` می‌تواند آن‌ها را بخواند و بفهمد.

حالا می‌دانیم `sudo su -` یعنی چه. دستور `sudo` به سیستم می‌گوید دستور `su -` را با دسترسی `root` اجرا کند. اگر دسترسی سودو داشته باشید، رمز خودتان را می‌پرسد و `su -` را به‌عنوان `root` اجرا می‌کند. دستور `su` کاربر شما را به `root` تغییر می‌دهد و سوئیچ `-` متغیرهای محیطی کاربر `root` را بارگذاری می‌کند. به این ترتیب می‌توانید با رمز عبور خودتان و از طریق اجرای `su` همراه با `sudo` به کاربر `root` تبدیل شوید.

### بررسی کاربران در سیستم

اگر لازم است بررسی کنید چه کسانی روی سیستم شما هستند (و تا حدی چه کار می‌کنند) می‌توانید از این دستورات استفاده کنید:

```text
$  w
 22:03:37 up 3 days,  5:33, 13 users,  load average: 1.48, 1.12, 1.19
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
jadi     tty7     :0               Wed16    3days  2:30m  1.96s /sbin/upstart --user
jadi     pts/18   :0               Wed16    3:04m  1:02   1:02  /usr/bin/python manage.py runserver 0.0.0.0:8000
jadi     pts/19   :0               Wed16    1:11m  0.35s  0.35s /bin/bash
root     tty2                      Wed16    3days  0.07s  0.03s -bash
jadi     pts/21   :0               08:41   45:37   0.06s  0.06s /bin/bash
jadi     pts/23   :0               Thu11   46:49   0.25s  0.23s ssh startups
jadi     pts/21   funlife          Fri22   45:37   0.06s  0.06s /bin/bash
jadi     pts/25   :0               10:17   31:37   0.07s  5.81s /usr/bin/python /usr/bin/x-terminal-emulator
jadi     pts/26   :0               21:39    0.00s  0.07s  0.00s w
jadi     pts/27   :0               21:55    8:09   0.01s  0.01s /bin/bash
```

برای هر کاربر لاگین‌شده یک سطر وجود دارد (هر پنجره شل یک لاگین جداگانه حساب می‌شود).

یکی دیگر از دستورات کاربردی `who` است. بیایید بررسی‌اش کنیم:

```text
$ who
jadi     tty7         2016-06-01 16:30 (:0)
jadi     pts/17       2016-06-01 16:30 (funlife)
jadi     pts/2        2016-06-01 16:32 (:0)
jadi     pts/18       2016-06-01 16:32 (:0)
jadi     pts/19       2016-06-01 16:33 (:0)
root     tty2         2016-06-01 16:36
jadi     pts/21       2016-06-04 08:41 (:0)
jadi     pts/22       2016-06-01 18:37 (funlife)
jadi     pts/23       2016-06-02 11:41 (:0)
jadi     pts/21       2016-06-03 22:22 (funlife)
jadi     pts/25       2016-06-04 10:17 (:0)
jadi     pts/26       2016-06-04 21:39 (:0)
jadi     pts/27       2016-06-04 21:55 (:0)
```

همان‌طور که می‌بینید هر دو دستور به شما می‌گویند کاربر در چه زمانی وارد سیستم شده است، اما افرادی را که خارج شده‌اند (Logout) نشان نمی‌دهند (چون دیگر در سیستم نیستند!). اگر به آن اطلاعات نیاز دارید، از دستور `last` استفاده کنید:

```text
~$ last | head
jadi     pts/27       :0               Sat Jun  4 21:55    gone - no logout
jadi     pts/26       :0               Sat Jun  4 21:39    gone - no logout
jadi     pts/26       :0               Sat Jun  4 18:55 - 19:42  (00:46)
jadi     pts/25       :0               Sat Jun  4 10:17    gone - no logout
jadi     pts/26       :0               Sat Jun  4 09:25 - 09:26  (00:00)
jadi     pts/26       :0               Sat Jun  4 09:25 - 09:25  (00:00)
jadi     pts/25       :0               Sat Jun  4 08:52 - 09:27  (00:35)
jadi     pts/21       :0               Sat Jun  4 08:41    gone - no logout
jadi     pts/21       funlife          Fri Jun  3 22:22 - 08:41  (10:18)
jadi     pts/21       :0               Fri Jun  3 18:44 - 19:47  (01:03)
```

> **نکته:** راهی هم برای بررسی ورودهای ناموفق وجود دارد: `last -f /var/log/btmp`.

### مدیریت رمز عبور (Password Management)

دستور `passwd` برای به‌روزرسانی یا تغییر رمز عبور کاربران استفاده می‌شود:

```text
➜  passwd     
Changing password for jadi.
Current password: 
New password: 
Retype new password: 
passwd: password updated successfully
➜  sudo passwd jadi
New password: 
BAD PASSWORD: The password is shorter than 8 characters
Retype new password: 
passwd: password updated successfully
```

همچنین می‌توانید از این دستور برای بررسی وضعیت یک کاربر استفاده کنید:

```text
➜  ~ passwd -S
jadi P 2023-09-14 0 99999 7 -1
```

این خروجی می‌گوید کاربر من `jadi` است، یک رمز عبور معتبر دارم (`P` که می‌توانست `L` برای قفل‌شده یا `NP` برای بدون رمز باشد)، زمان آخرین تغییر رمز من، حداقل و حداکثر عمر رمز، دوره هشدار قبل از انقضای رمز و تعداد روزهای مجاز برای غیرفعال ماندن رمز من چقدر است. همچنین می‌توان از `passwd` برای قفل کردن کاربر با `--lock` (یا `-l`)، منقضی کردن رمز با `--expire` (یا `-e`) یا باز کردن قفل با `--unlock` (یا `-u`) استفاده کرد.

> **نکته:** همان‌طور که در بخش مدیریت کاربران دیدید، برای تغییر شل کاربر، پوشه خانگی و موارد مشابه باید از دستور `usermod` استفاده کنید.

اما برای بررسی یا تغییر دقیق عمر رمز عبور و تنظیمات کاربران، باید از ابزار `chage` استفاده شود. برای نمایش فهرست اطلاعات، آن را با سوئیچ `-l` اجرا کنید:

```text
➜  ~ chage -l jadi
Last password change					: Sep 14, 2023
Password expires					: never
Password inactive					: never
Account expires						: never
Minimum number of days between password change		: 0
Maximum number of days between password change		: 99999
Number of days of warning before password expires	: 7
```

یا بدون هیچ سوئیچی برای حالت تعاملی:

```text
➜  ~ chage jadi
chage: Permission denied.
➜  ~ sudo chage jadi
Changing the aging information for jadi
Enter the new value, or press ENTER for the default

	Minimum Password Age [0]: 
	Maximum Password Age [99999]: 
	Last Password Change (YYYY-MM-DD) [2023-09-14]: 
	Password Expiration Warning [7]: 3
	Password Inactive [-1]: 
	Account Expiration Date (YYYY-MM-DD) [-1]: 
```

همچنین می‌توانید از سوئیچ‌ها برای تغییر مستقیم مقادیر استفاده کنید؛ مثلاً `-m` برای `--mindays` یا `-M` برای `--maxdays`.

### بیت‌های `suid` و `sgid`

قبلاً درباره `suid` صحبت کرده‌ایم؛ به‌طور خلاصه، وقتی بیت `suid` روی یک فایل اجرایی تنظیم شده باشد، کاربر آن فایل را با سطح دسترسی **مالک فایل** (و نه اجراکننده آن) اجرا می‌کند. به دستور `passwd` نگاه کنید:

```text
➜  ~ type passwd
passwd is /usr/bin/passwd
➜  ~ ls -ltrh /usr/bin/passwd 
-rwsr-xr-x 1 root root 63K Nov 23  2022 /usr/bin/passwd
```

حرف `s` در بخش دسترسی‌ها باعث می‌شود فایل با دسترسی مالک آن (که اینجا `root` است) اجرا شود؛ فرقی نمی‌کند چه کسی آن را اجرا کرده باشد. این ویژگی لازم است، چون دستور `passwd` باید بتواند رمزهای عبور را در فایل `shadow` تغییر دهد، حتی اگر یک کاربر عادی آن را اجرا کند. اما چه اتفاقی می‌افتد اگر کسی `suid` دستور `vi` را تغییر دهد؟ بیایید ببینیم مالک `vi` کیست:

```text
jadi@funlife ~$ type vi
vi is /usr/bin/vi
jadi@funlife ~$ ls -ltrh /usr/bin/vi
lrwxrwxrwx 1 root root 20 Jun  1 12:52 /usr/bin/vi -> /etc/alternatives/vi
```

مالک `vi` کاربر `root` است؛ پس اگر بیت `suid` روی آن ست شود، `vi` همیشه به‌عنوان `root` اجرا خواهد شد! در آن حالت، هر کسی می‌تواند هر فایلی را ویرایش کند! پس اگر یک هکر باشید و به‌طور موقت دسترسی `root` بگیرید، کافی است `vi` را یک جایی (با یک نام غیرمظنون و متفاوت) کپی کنید و به آن دسترسی `suid` بدهید. آن وقت می‌توانید با کاربران عادی آن را اجرا کنید و هر وقت خواستید فایل‌های سیستمی را تغییر دهید! به همین دلیل یک مدیر سیستم باید بتواند در صورت نیاز فایل‌های اجرایی دارای بیت `suid` روی سیستم را بررسی کند:

```bash
$ sudo find / -perm -u+s
```

در اینجا `-perm -u+s` به `find` می‌گوید فایل‌هایی را جست‌وجو کند که روی `user` بیت `suid` دارند. برای اطلاعات بیشتر `man find` را ببینید و دنبال `perm` بگردید.

> **نکته:** همین موضوع برای `sgid` (بیت گروه) هم صدق می‌کند. اگر بیت `sgid` تنظیم شده باشد، فایل با دسترسی گروهِ خود اجرا خواهد شد.

### محدودیت‌های کاربر (User Limits)

منابع روی یک ماشین لینوکسی می‌توانند برای کاربران از طریق دستور `ulimit` مدیریت شوند. این قابلیت بخشی از سیستم PAM است. اگر می‌خواهید محدودیت‌های فعلی روی سیستم را ببینید، این دستور را اجرا کنید:

```text
~$ ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 47457
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 47457
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

و می‌توانید آن‌ها را به این شکل تغییر دهید:

```bash
$ ulimit -t 1
```

این کار زمان CPU (یا CPU TIME) هر پردازش را به ۱ ثانیه محدود می‌کند. اگر بیشتر از این مقدار مصرف کنید، پردازش به‌طور خودکار (توسط ماژول PAM) کشته می‌شود. توجه کنید که زمان ساعت دیواری (Wall Clock Time) با زمان پردازنده (CPU Time) متفاوت است. برای اینکه ببینید یک پردازش چقدر زمان CPU مصرف می‌کند، آن را به این صورت اجرا کنید:

```bash
$ time firefox
```

تغییر دادن `ulimit` به این شکلی که انجام دادیم یک کار موقتی است و فقط در همان شلِ مشخص باقی می‌ماند.

برای تغییر محدودیت‌های `ulimit` در سطح کل سیستم، از این فایل استفاده می‌کنیم:

```text
$ cat /etc/security/limits.conf
# /etc/security/limits.conf
#
#Each line describes a limit for a user in the form:
#
#<domain>        <type>  <item>  <value>
#
#Where:
#<domain> can be:
#        - a user name
#        - a group name, with @group syntax
#        - the wildcard *, for default entry
#        - the wildcard %, can be also used with %group syntax,
#                 for maxlogin limit
#        - NOTE: group and wildcard limits are not applied to root.
#          To apply a limit to the root user, <domain> must be
#          the literal username root.
#
#<type> can have the two values:
#        - "soft" for enforcing the soft limits
#        - "hard" for enforcing hard limits
#
#<item> can be one of the following:
#        - core - limits the core file size (KB)
#        - data - max data size (KB)
#        - fsize - maximum filesize (KB)
#        - memlock - max locked-in-memory address space (KB)
#        - nofile - max number of open files
#        - rss - max resident set size (KB)
#        - stack - max stack size (KB)
#        - cpu - max CPU time (MIN)
#        - nproc - max number of processes
#        - as - address space limit (KB)
#        - maxlogins - max number of logins for this user
#        - maxsyslogins - max number of logins on the system
#        - priority - the priority to run user process with
#        - locks - max number of file locks the user can hold
#        - sigpending - max number of pending signals
#        - msgqueue - max memory used by POSIX message queues (bytes)
#        - nice - max nice priority allowed to raise to values: [-20, 19]
#        - rtprio - max realtime priority
#        - chroot - change root to directory (Debian-specific)
#
#<domain>      <type>  <item>         <value>
#

#*               soft    core            0
#root            hard    core            100000
#*               hard    rss             10000
#@student        hard    nproc           20
#@faculty        soft    nproc           20
#@faculty        hard    nproc           50
#ftp             hard    nproc           0
#ftp             -       chroot          /ftp
#@student        -       maxlogins       4

# End of file
```

> **نکته:** محدودیت‌های نرم (Soft Limits) توسط خود کاربر هم قابل تغییر هستند (تا سقف Hard)، اما محدودیت‌های سخت (Hard Limits) مرزهای توقف واقعی‌اند که کاربر عادی نمی‌تواند از آن‌ها فراتر برود.

## پورت‌های باز (Open Ports)

### دستورات `netstat`، `fuser` و `lsof`

در ماژول ۱۰۹.۱ درباره پورت‌ها صحبت کردیم. پورت‌ها مثل پنجره‌ها یا درگاه‌هایی در سیستم ما هستند که برنامه‌ها از آن‌ها برای گوش دادن به دنیای بیرون استفاده می‌کنند. اگر روی کامپیوترم یک وب‌سرور اجرا می‌کنم، باید یک پورت باز داشته باشم تا مردم بتوانند از آن سرور بپرسند «لطفاً فایل `index.html` را به من نشان بده». بسیاری از بدافزارها هم پورت‌هایی باز می‌کنند تا مهاجم بتواند با آن‌ها ارتباط بگیرد. بنابراین مهم است که هر از گاهی سیستم خود را برای پیدا کردن پورت‌های باز بررسی کنید. دستور قدیمی‌تر برای این کار `netstat` است؛ با سوئیچ‌هایی مثل `-na` یا `-ap` یا `-tuna`... مطمئنم به خاطر سپردن **tuna** اگر تا حالا ساندویچ تُن خورده باشید خیلی راحت است!

```text
jadi@funlife ~$ netstat -tuna
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN     
tcp        0      0 127.0.1.1:53            0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:9050          0.0.0.0:*               LISTEN     
tcp       25      0 192.168.59.9:49934      192.168.59.192:139      CLOSE_WAIT
tcp        0      0 127.0.0.1:60228         127.0.0.1:1080          ESTABLISHED
tcp        0      0 192.168.1.35:55324      159.203.148.169:8385    ESTABLISHED
tcp        0      0 127.0.0.1:59590         127.0.0.1:1080          ESTABLISHED
tcp        0      0 127.0.0.1:60212         127.0.0.1:1080          ESTABLISHED
tcp        0      0 192.168.1.35:54220      159.203.148.169:8385    ESTABLISHED
tcp        0      0 127.0.0.1:57186         127.0.0.1:1080          ESTABLISHED
tcp        0      0 192.168.1.35:49574      173.194.122.231:443     ESTABLISHED
tcp        0      0 127.0.0.1:59002         127.0.0.1:1080          ESTABLISHED
udp        0      0 0.0.0.0:54502           0.0.0.0:*                          
udp        0      0 0.0.0.0:5353            0.0.0.0:*                          
udp        0      0 0.0.0.0:5353            0.0.0.0:*                          
```

تمام پورت‌های `LISTEN` سرورها هستند؛ یعنی در حال گوش دادن به اتصالات ورودی جدیدند. اتصالات `ESTABLISHED` ارتباط‌های فعال بین کامپیوتر شما و یک کامپیوتر دیگر هستند. در این جدول‌ها `0.0.0.0` به معنی _هر آدرسی_ یا _هر رابط شبکه‌ای_ است.

ابزارهای مفید دیگر برای همین منظور `ss` (که در فصل ۱۰۹ دیدید) و همچنین `lsof` و `fuser` هستند. درباره `lsof` در بخش‌های قبلی صحبت کرده‌ایم. این دستور فایل‌های باز روی سیستم را نشان می‌دهد و با به خاطر سپردن اینکه _در لینوکس همه‌چیز یا یک فایل است یا یک پردازش_، می‌توانید نتیجه بگیرید که این دستور باید بتواند اتصالات باز را هم نمایش دهد؛ و حق هم دارید:

```text
# lsof -i
COMMAND     PID       USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
privoxy     806    privoxy    4u  IPv4   16130      0t0  TCP funlife:8118 (LISTEN)
cups-brow   903       root    8u  IPv4   17477      0t0  UDP *:ipp
mysqld      971      mysql   19u  IPv4   20875      0t0  TCP funlife:mysql (LISTEN)
tor        1038 debian-tor    6u  IPv4   19155      0t0  TCP funlife:9050 (LISTEN)
dnsmasq    1260     nobody   11u  IPv4 1910037      0t0  UDP *:18666
adb        1278       jadi    5u  IPv4  579541      0t0  TCP funlife:5037 (LISTEN)
chromium-  2891       jadi   88u  IPv4  813611      0t0  TCP 192.168.1.35:45702->do-13.lastpass.com:https (ESTABLISHED)
chromium-  2891       jadi  126u  IPv4 1907389      0t0  TCP 192.168.1.35:50642->ntt-2.lastpass.com:https (ESTABLISHED)
chromium-  2891       jadi  133u  IPv4 1909733      0t0  TCP 192.168.1.35:50644->ntt-2.lastpass.com:https (ESTABLISHED)
chromium-  2891       jadi  268u  IPv4  785289      0t0  TCP 192.168.1.35:60736->lf-in-f188.1e100.net:5228 (ESTABLISHED)
python     4925       jadi    4u  IPv4  658287      0t0  TCP funlife:8000 (LISTEN)
Telegram   4943       jadi   39u  IPv4  773463      0t0  TCP 192.168.1.35:44732->149.154.175.50:https (ESTABLISHED)
dhclient   9984       root    6u  IPv4  787885      0t0  UDP *:bootpc
nginx     11095       root    6u  IPv4   17998      0t0  TCP *:http (LISTEN)
nginx     11099   www-data    7u  IPv6   17999      0t0  TCP *:http (LISTEN)
chrome    14264       jadi  114u  IPv4  788089      0t0  UDP *:mdns
chrome    14264       jadi  126u  IPv4 1872872      0t0  TCP funlife:60370->funlife:socks (ESTABLISHED)
chrome    14264       jadi  138u  IPv4 1908382      0t0  TCP funlife:60408->funlife:socks (ESTABLISHED)
```

فوق‌العاده است! این دستور نام برنامه، شناسه پردازش (PID)، کاربر اجراکننده و آی‌پی مبدأ و مقصد را نشان می‌دهد و می‌گوید آیا اتصال در حالت `LISTEN` است یا `ESTABLISHED`.

اگر می‌خواهید بررسی کنید کدام پردازش از پورت خاصی استفاده می‌کند، می‌توانید خروجی هر یک از دستورات بالا را با `grep` فیلتر کنید یا به‌سادگی از دستور `fuser` (یعنی File User؛ چه کسی از این فایل استفاده می‌کند) کمک بگیرید تا تمام PIDهای مرتبط با آن پورت مشخص را پیدا کنید. یک سوئیچ رایج `-v` است که خروجی را با جزئیات بیشتر (Verbose) نمایش می‌دهد:

```text
➜  bin sudo fuser 22/tcp -v      
                     USER        PID ACCESS COMMAND
22/tcp:              root          1 F.... systemd
```

### دستور `nmap`

ابزار `nmap` یکی از ابزارهای محبوب هکرهاست! می‌توانید یک سرور را با `nmap` اسکن کنید تا اطلاعات زیادی درباره آن سرور به دست آورید:

```text
# nmap localhost

Starting Nmap 7.01 ( https://nmap.org ) at 2016-06-04 21:32 IRDT
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000070s latency).
rDNS record for 127.0.0.1: funlife
Not shown: 995 closed ports
PORT     STATE SERVICE
80/tcp   open  http
1080/tcp open  socks
3306/tcp open  mysql
8000/tcp open  http-alt
9050/tcp open  tor-socks

Nmap done: 1 IP address (1 host up) scanned in 1.66 seconds
root@funlife:~#
```

در ساده‌ترین حالت، `nmap` تمام پورت‌های باز از ۱ تا ۱۰۰۰ را بررسی کرده و نتایج را چاپ می‌کند. سوئیچ‌های بسیار زیادی برای یافتن اطلاعات دیگر درباره میزبان‌ها وجود دارد که هر هکری که بخواهد وضعیت یک سرور را بررسی کند از آن‌ها استفاده می‌کند.

یک جست‌وجوی سریع برای [دستورات تک‌خطی nmap](https://duckduckgo.com/?t=h_&q=nmap+oneliners&ia=web) انجام دهید تا ده‌ها دستور و ترفند جالب برایش پیدا کنید. این ابزار آن‌قدر باحال است که وب‌سایت رسمی آن [یک بخش مخصوص حضور nmap در فیلم‌ها](https://nmap.org/movies/) هم دارد!

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1101_perform_security_administration_tasks.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
