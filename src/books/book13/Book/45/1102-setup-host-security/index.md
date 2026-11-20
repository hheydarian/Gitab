---
layout: layout.njk
title: "۱۱۰.۲ برقراری امنیت هاست و سرویس‌های باز"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 45
chapterSection: "موضوع ۱۱۰: امنیت سیستم"
permalink: /books/book13/Book/45/1102-setup-host-security/index.html
---
{% raw %}
# ۱۱۰.۲ برقراری امنیت هاست و سرویس‌های باز

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> بستن پورت‌های غیرضروری، پیکربندی فایروال، امن‌سازی سرور SSH در /etc/ssh/sshd_config (تغییر پورت و غیرفعال کردن ورود پسوردی روت).
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/HoQtVkcSqz8" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۳_

داوطلبان باید بدانند چگونه یک سطح پایه از امنیت را روی میزبان (Host) پیاده‌سازی کنند.

### حوزه‌های دانش کلیدی

- آشنایی با رمزهای عبور Shadow و نحوه کارکرد آن‌ها.
- خاموش کردن سرویس‌های شبکه‌ای که استفاده نمی‌شوند.
- درک نقش TCP Wrapperها.

### اصطلاحات و ابزارها

<div dir="ltr">

- `/etc/nologin`
- `/etc/passwd`
- `/etc/shadow`
- `/etc/xinetd.d/`
- `/etc/xinetd.conf`
- `systemd.socket`
- `/etc/inittab`
- `/etc/init.d/`
- `/etc/hosts.allow`
- `/etc/hosts.deny`

</div>

#### رمزهای عبور در فایل `shadow`

قبلاً درباره `/etc/passwd` صحبت کرده‌ایم. این فایل در گذشته شامل رمز عبور کاربران بود، اما یک مشکل منطقی وجود داشت: اگر یک کاربر قرار باشد بتواند رمز عبور خودش را تغییر دهد (یا برنامه‌ها اطلاعات کاربران را بخوانند)، باید به این فایل دسترسی داشته باشد؛ و در این صورت می‌تواند رمز عبور بقیه افراد را هم ببیند. این موضوع اصلاً جالب نیست، حتی وقتی رمزها هش شده باشند (یعنی با استفاده از یک تابع یک‌طرفه به شکل پیچیده‌تری نمایش داده شده باشند).

```text
$ ls -ltrh /etc/passwd
-rw-r--r-- 1 root root 2.5K Jun  5 19:14 /etc/passwd
```

برای جلوگیری از این مشکل، فایل `/etc/shadow` معرفی شد. در سیستم‌های امروزی، در فایل `/etc/passwd` به جای رمز عبور فقط یک حرف `x` نمایش می‌دهیم و رمز عبور واقعی را در `/etc/shadow` ذخیره می‌کنیم که دسترسی بسیار محدودی دارد:

```text
jadi@funlife ~$ grep jadi /etc/passwd
jadi:x:1000:1000:jadi,,,:/home/jadi:/bin/bash
jadi@funlife ~$ grep jadi /etc/shadow
grep: /etc/shadow: Permission denied
jadi@funlife ~$ sudo grep jadi /etc/shadow
[sudo] password for jadi:
jadi:$6$bp01DBX.$I6dt4pz8GeXJl6asgPeKhSdepf40bgepTz8zwB3HFmN56SdcsxjTETdZAmRt17biwMYOI7SoGFOXssHqeNFgw/:16963:0:99999:7:::
jadi@funlife ~$ sudo ls -ltrh /etc/shadow
-rw-r----- 1 root shadow 1.5K Jun 11 17:36 /etc/shadow
```

#### فایل `/etc/nologin`

فایل `/etc/nologin` خیلی باحال است! اگر آن را بسازید و متنی داخلش بنویسید، محتوای آن به هر کسی که تلاش کند وارد سیستم (Login) شود نمایش داده می‌شود و در عین حال تلاش برای ورود ناموفق خواهد ماند. این فایل برای زمان‌های تعمیر و نگهداری (Maintenance) بسیار کاربردی است. کافی است این فایل را پاک کنید تا کاربران دوباره بتوانند وارد شوند.

> **نکته:** کاربر `root` حتی با وجود فایل `/etc/nologin` همچنان می‌تواند وارد سیستم شود.

همچنین توجه داشته باشید که یک شلِ صوری به نام `nologin` وجود دارد و می‌توانید آن را به‌عنوان شلِ هر کاربری که می‌خواهید از ورودش به سیستم از طریق شل جلوگیری کنید تنظیم نمایید. دقت کنید چنین کاربری همچنان یک حساب فعال دارد و می‌تواند از سرویس‌های دیگر (مثلاً ایمیل یا FTP) استفاده کند، اما نمی‌تواند وارد شل شود:

```bash
sudo usermod -s /sbin/nologin baduser
```

### سوپرسرورها (Super-servers)

یک سوپرسرور (که گاهی به آن Service Dispatcher هم می‌گویند) نوعی دیمن (Daemon) است که عمدتاً روی سیستم‌های شبه‌ونیکسی به دلایل امنیتی و مدیریت منابع اجرا می‌شود. این برنامه روی پورت‌هایی که برایش پیکربندی شده گوش می‌دهد و فقط در زمانی که نیاز باشد سرویس هدف را راه‌اندازی می‌کند تا به درخواست‌ها پاسخ دهد. این کار یک لایه امنیت به ارتباطات شما اضافه می‌کند و همچنین اجازه می‌دهد برخی سرویس‌ها وقتی نیازی به آن‌ها نداریم غیرفعال بمانند. می‌توانید یک سوپرسرور یا سوپردیمن را مثل یک پوشش (Wrapper) در سطح TCP (و UDP یا حتی ICMP) دور سرویس‌های دیگر تصور کنید.

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book13/assets/super-server.png" alt="سوپرسرور" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

امروزه تعداد کمی از سیستم‌های گنو/لینوکس از TCP Wrapperهایی مثل `xinetd` استفاده می‌کنند، اما ممکن است آن را در برخی نصب‌ها یا ردپایی از آن را در مسیر `/etc/xinetd.d` ببینید. در صورت نیاز، این امکان هم وجود دارد که `systemd.socket` را به‌عنوان یک TCP Wrapper برای سرویس‌های دیگر پیکربندی کنید.

این یک نمونه فایل پیکربندی `xinetd` است:

```text
service telnet
{
        disable         = no
        flags           = REUSE
        socket_type     = stream
        wait            = no
        user            = root
        server          = /usr/sbin/in.telnetd
        log_on_failure  += USERID
        no_access       = 10.0.1.0/24
        log_on_success  += PID HOST EXIT
        access_times    = 09:45-16:15
}
```

اگر مقدار `disable` را تغییر دهیم (مثلاً از `yes` به `no`) و `xinetd` را ریستارت کنیم، دیمن `telnet` شروع به کار می‌کند. فایل‌های متعددی برای کنترل تنظیمات مربوط به `xinetd` وجود دارد.

همان‌طور که اشاره شد، امروزه واحدهای `systemd.socket` جایگزین `xinetd` شده‌اند. برخی سرویس‌ها مانند `ssh` و `cups` ممکن است در توزیع شما در کنار واحد Service یک واحد Socket هم داشته باشند. در این حالت کافی است `ssh.service` را متوقف و غیرفعال کنید و به‌جای آن `ssh.socket` را استارت بزنید. حالا `systemd.socket` مثل یک پوشش دور پورت ۲۲ عمل می‌کند و اگر کسی به این سرویس نیاز داشته باشد، سرور SSH را برای پاسخ‌گویی بالا می‌آورد.

#### فایل‌های `/etc/hosts.allow` و `/etc/hosts.deny`

این دو فایل دسترسی از میزبان‌های مشخص را مجاز یا مسدود می‌کنند. منطق کارشان شبیه به `cron.deny` و `cron.allow` است. اگر چیزی مجاز (Allow) شود، بقیه چیزها رد می‌شوند؛ اما اگر چیزی را به `/etc/hosts.deny` اضافه کنید، فقط همان مورد خاص مسدود می‌شود (و هر چیز دیگری مجاز است).

```text
jadi@funlife ~$ cat /etc/hosts.allow
# /etc/hosts.allow: list of hosts that are allowed to access the system.
#                   See the manual pages hosts_access(5) and hosts_options(5).
#
# Example:    ALL: LOCAL @some_netgroup
#             ALL: .foobar.edu EXCEPT terminalserver.foobar.edu
#
# If you're going to protect the portmapper use the name "rpcbind" for the
# daemon name. See rpcbind(8) and rpc.mountd(8) for further information.
#

vsftpd: 10.10.100.
```

سرویس `vsftpd` چطور از وجود این فایل باخبر می‌شود؟ چون در کد منبع خودش از کتابخانه `libwrap` استفاده می‌کند و `libwrap` ابزارهای Wrapper را می‌فهمد. می‌توانید این ادعا را با جست‌وجوی `libwrap` در فهرست کتابخانه‌هایی که `vsftpd` استفاده می‌کند بررسی کنید:

```text
➜  ~ ldd /usr/sbin/vsftpd | grep libwrap
	libwrap.so.0 => /lib/x86_64-linux-gnu/libwrap.so.0 (0x00007fb293921000)
```

در اینجا سرویس `vsftpd` فقط از محدوده `10.10.100.*` مجاز است. همچنین می‌توان از `ALL` به‌عنوان نام سرویس استفاده کرد تا همه سرویس‌ها مجاز یا مسدود شوند.

> **نکته:** پس از تغییر این فایل، `xinetd` باید ریستارت شود.

همان‌طور که اشاره شد، سوپرسرورها دیگر خیلی استفاده نمی‌شوند و بیشتر توزیع‌ها از سرویس‌های مستقل (Standalone) بهره می‌برند.

### حذف سرویس‌های بلااستفاده

بسته به توزیع لینوکسی خود، می‌توانید سرویس‌های در حال اجرا را با دستور `service` یا `systemctl` بررسی کنید. اگر از سیستم راه‌انداز SysV init (عمدتاً در توزیع‌های قدیمی‌تر) استفاده می‌کنید یا ابزارهای سازگاری آن نصب است، به شکل زیر عمل کنید:

```text
~ sudo service --status-all
 [ - ]  alsa-utils
 ....
 [ + ]  ufw
 [ + ]  unattended-upgrades
 [ + ]  uuidd
 [ + ]  vpn-unlimited-daemon
 [ + ]  vsftpd
 [ - ]  whoopsie
 [ - ]  x11-common
```

روی ماشین‌های مبتنی بر RedHat می‌توانید یک سرویس را با این دستور متوقف و غیرفعال کنید:

```bash
sudo chkconfig vsftpd off
```

و روی ماشین‌های مبتنی بر Debian:

```bash
sudo update-rc.d vsftpd remove
```

اگر از `systemd` استفاده می‌کنید، برای بررسی و توقف/غیرفعال‌سازی یک سرویس این‌گونه عمل کنید:

```bash
systemctl list-units --state active --type service
systemctl status
systemctl disable vsftpd.service --now
```

همچنین به یاد داشته باشید که در سیستم‌های قدیمی‌تر، تمام اسکریپت‌های Init را در پوشه‌های `/etc/init.d` و `/etc/rcX.d` داشتیم. یک فایل `/etc/inittab` هم وجود داشت که فایل پیکربندی برای راه‌اندازی سیستم لینوکس با SysV بود و خطوطی در این قالب داشت:

```text
id:runlevel:action:process
```

این خط به سیستم init می‌گفت که روی `process` در یک `runlevel` مشخص چه `action`هایی انجام دهد. برای مثال:

```text
1:2345:respawn:/sbin/mingetty tty1
```

این دستور به init می‌گوید دستور `mingetty tty1` را در سطوح اجرای (Runlevels) `2`، `3`، `4` و `5` اجرا کند (و اگر کشته شد دوباره راه‌اندازیش کند).

و به‌عنوان نکته آخر، این مهم‌ترین خط در فایل `inittab` بود؛ چون به init می‌گفت در سطح اجرای ۳ بالا بیاید:

```text
id:3:initdefault:
```

برای اطلاعات بیشتر درباره `runlevels` لطفاً به [فصل ۱۰۱.۳](/Gitab/books/book13/Book/05/1013-change-runlevels-and-shutdown-or-reboot-system/) مراجعه کنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1102_setup_host_security.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
