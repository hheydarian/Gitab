---
layout: layout.njk
title: "۱۱۰.۳ امن‌سازی و حفاظت از داده‌ها با رمزنگاری"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 46
chapterSection: "موضوع ۱۱۰: امنیت سیستم"
permalink: /books/book13/Book/46/1103-securing-data-with-encryption/index.html
---
{% raw %}
# ۱۱۰.۳ امن‌سازی و حفاظت از داده‌ها با رمزنگاری

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> رمزنگاری متقارن و نامتقارن، تولید کلیدهای SSH با ssh-keygen، انتقال کلید با ssh-copy-id و امضا و رمزنگاری فایل‌ها با GnuPG.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/ElbC0EtZc4c?si=PemOqHr6s7V53wwS" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۴_

داوطلب باید بتواند از تکنیک‌های کلید عمومی (Public Key) برای امن‌سازی داده‌ها و ارتباطات استفاده کند.

### حوزه‌های دانش کلیدی

* انجام پیکربندی پایه و استفاده از کلاینت OpenSSH 2.
* درک نقش کلیدهای میزبان (Host Keys) در سرور OpenSSH 2.
* انجام پیکربندی پایه، استفاده و ابطال کلیدها (Revocation) در GnuPG.
* استفاده از GPG برای رمزنگاری، رمزگشایی، امضا و اعتبارسنجی فایل‌ها.
* درک تونل‌های پورت SSH (شامل تونل‌های X11).

### اصطلاحات و ابزارها

* `ssh`
* `ssh-keygen`
* `ssh-agent`
* `ssh-add`
* `~/.ssh/id_rsa` و `id_rsa.pub`
* `~/.ssh/id_dsa` و `id_dsa.pub`
* `~/.ssh/id_ecdsa` و `id_ecdsa.pub`
* `~/.ssh/id_ed25519` و `id_ed25519.pub`
* `/etc/ssh/ssh_host_rsa_key` و `ssh_host_rsa_key.pub`
* `/etc/ssh/ssh_host_dsa_key` و `ssh_host_dsa_key.pub`
<div dir="ltr">

* `/etc/ssh/ssh_host_ecdsa_key` و `ssh_host_ecdsa_key.pub`
* `/etc/ssh/ssh_host_ed25519_key` و `ssh_host_ed25519_key.pub`
* `~/.ssh/authorized_keys`
* `ssh_known_hosts`
* `gpg`
* `gpg-agent`
* `~/.gnupg/`

</div>

## جفت‌کلیدها (Key Pairs)

در رمزنگاری سنتی از کلیدهای متقارن (Symmetric Keys) استفاده می‌شد: هر دو طرف یک رمز مشترک داشتند. داده‌ها با آن رمز، رمزنگاری می‌شدند و سپس با همان رمز، رمزگشایی می‌شدند. اما در سال ۱۹۷۶ ایده جدیدی مطرح شد: چه می‌شود اگر ۲ کلید بسازیم (بگذارید اسمش را بگذاریم **کلید خصوصی (Private Key)** و **کلید عمومی (Public Key)**) طوری که فقط کسانی که کلید عمومی را دارند بتوانند چیزی را باز کنند که با کلید خصوصی رمز شده (یا برعکس، هر کس با کلید عمومی پیام را رمز کند فقط دارنده کلید خصوصی بتواند آن را باز کند)؟ دانشمندان این ایده را به واقعیت تبدیل کردند و امروزه بیشتر رمزنگاری‌های ما از طریق همین **جفت‌کلیدها** انجام می‌شود. هنگام ساخت یک جفت‌کلید، با استفاده از یک الگوریتم کامپیوتری دو کلید تولید می‌کنیم طوری که هر پیامی با یکی از آن‌ها رمزنگاری شود، فقط با دیگری باز می‌شود. به این‌ها کلید عمومی و کلید خصوصی می‌گویند. شما کلید عمومی را برای دوستانتان می‌فرستید یا حتی به‌صورت عمومی روی اینترنت منتشر می‌کنید و اگر کسی بخواهد برایتان یک پیام رمزنگاری‌شده بفرستد، آن را با کلید عمومی شما رمز کرده و به هر شکلی برایتان می‌فرستد (یا پیام کدشده را روی اینترنت منتشر می‌کند) و فقط و فقط شما می‌توانید آن را باز کنید، چون فقط شما کلید خصوصی را دارید!

> **نکته:** ویژگی فوق‌العاده کلید عمومی/خصوصی این است که داده‌ها بدون ترس از هکرها یا دولت‌ها می‌توانند روی اینترنت منتقل شوند. شما کلید خودتان را برای کل دنیا منتشر می‌کنید، یک نفر آن را برمی‌دارد و از آن برای رمز کردن داده‌ها استفاده کرده و نتیجه را برایتان می‌فرستد. بقیه می‌توانند ببینند که شما «یک سری داده» دریافت می‌کنید، اما نمی‌توانند آن را بخوانند چون کلید خصوصیِ لازم برای رمزگشایی را ندارند.

### کلیدهای SSH

همین فناوری (رمزنگاری کلید عمومی یا رمزنگاری نامتقارن) در بیشتر ارتباطات شبکه هم قابل استفاده است. در واقع خودِ `ssh` بر اساس همین مفهوم کار می‌کند و برای احراز هویت میزبان‌ها و امن‌سازی ترافیک به کار می‌رود:

```text
➜  ~ ssh 192.168.70.2
The authenticity of host '192.168.70.2 (192.168.70.2)' can't be established.
ED25519 key fingerprint is SHA256:4Wp2zz6sgPAhnbqhkNjOd6QDpNQ4jvjX7qAzslPX09U.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? y
Please type 'yes', 'no' or the fingerprint: yes
Warning: Permanently added '192.168.70.2' (ED25519) to the list of known hosts.
jadi@192.168.70.2's password:
Linux debian 6.4.0-2-arm64 #1 SMP Debian 6.4.4-3 (2023-08-08) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
You have no mail.
Last login: Sun Sep 17 04:43:18 2023 from 192.168.70.1
jadi@debian:~$
```

در بالا، سرور اثر انگشت (Fingerprint) کلید ED25519 خود را به ما نشان می‌دهد و از ما می‌خواهد آن را تأیید کنیم. از این به بعد، سیستم ما برای همین کلید روی همین سرور دیگر به ما هشدار نمی‌دهد. **اما** اگر اثر انگشت (و در نتیجه کلید) همان سرور تغییر کند، این موضوع به‌عنوان یک مسئله جدی در نظر گرفته می‌شود:

```text
➜  ~ ssh 192.168.70.2
Host key verification failed.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:4Wp2zz6sgPAhnbqhkNjOd6QDpNQ4jvjX7qAzslPX09U.
Please contact your system administrator.
Add correct host key in /Users/jadi/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/jadi/.ssh/known_hosts:548
Host key for 192.168.70.2 has changed and you have requested strict checking.
```

اگر بخواهید این مشکل را حل کنید — پس از اینکه مطمئن شدید حمله‌ای در کار نیست — باید اطلاعات مربوط به `192.168.70.2` را از فایل `.ssh/known_hosts` پاک کنید. خوشبختانه لازم نیست فایل را مستقیماً ویرایش کنید؛ کافی است از دستور `ssh-keygen` استفاده کنید:

```text
➜  ~ ssh-keygen -R 192.168.70.2
# Host 192.168.70.2 found: line 547
# Host 192.168.70.2 found: line 548
# Host 192.168.70.2 found: line 549
/Users/jadi/.ssh/known_hosts updated.
Original contents retained as /Users/jadi/.ssh/known_hosts.old
```

#### ساخت جفت‌کلیدهای اختصاصی خودتان

به راحتی می‌توانید هر تعداد جفت‌کلید که می‌خواهید بسازید؛ حتی با الگوریتم‌های مختلف (که با سوئیچ `-t` مشخص می‌شوند و شامل `dsa`، `ecdsa`، `ecdsa-sk`، `ed25519`، `ed25519-sk` و `rsa` هستند). انتخاب‌های رایج عبارت‌اند از _rsa_ که پیش‌فرض است و _ecdsa_ که در بیت‌کوین هم استفاده می‌شود!

بیایید یک جفت‌کلید `ecdsa` روی ماشین خودمان بسازیم. می‌توانیم از آن برای ورود به سرورها بدون وارد کردن رمز عبور یا برای امضا و رمزنگاری پیام‌ها استفاده کنیم:

```text
jadi@debian:~$ ssh-keygen -t ecdsa
Generating public/private ecdsa key pair.
Enter file in which to save the key (/home/jadi/.ssh/id_ecdsa):
/home/jadi/.ssh/id_ecdsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/jadi/.ssh/id_ecdsa
Your public key has been saved in /home/jadi/.ssh/id_ecdsa.pub
The key fingerprint is:
SHA256:WvJu5D7ns0a2z0sB6l8ZrCXnAgxSmb2kSwgo/lK0QYA jadi@debian
The key's randomart image is:
+---[ECDSA 256]---+
|.oo.  .+         |
|E .o .o o        |
|o ..+..o ..      |
| . o..oo.. o     |
|  o  ...S . *    |
| . .  .*..o* +   |
|  .   .oooo.=    |
|       .+.==     |
|       oo=+++.   |
+----[SHA256]-----+
```

و چون رایگان است، بیایید یک کلید `rsa` هم بسازیم:

```text
jadi@debian:~$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/jadi/.ssh/id_rsa):
/home/jadi/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/jadi/.ssh/id_rsa
Your public key has been saved in /home/jadi/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:Q67Ob1DOfmF3gG449OfNLHXxE5QEH4B/UzHR8ycAHao jadi@debian
The key's randomart image is:
+---[RSA 3072]----+
|          .oo++*=|
|           oo .+=|
|        . ......+|
|       oo.. ...=o|
|       =E+   ...*|
|      ..=.* o o.o|
|      .o + = * ..|
|     o  o . o +  |
|      oo..   .   |
+----[SHA256]-----+
```

آن _تصویرِ_ بامزه چیزی است که می‌توانید به دوستانتان نشان دهید تا مطمئن شوند از کلید درستی استفاده می‌کنند.

> **نکته:** در بالا برای کلیدها رمز عبور (Passphrase) نگذاشتم. اگر می‌گذاشتم، هر بار که می‌خواستم از آن کلید استفاده کنم باید آن رمز را وارد می‌کردم.

این کلیدها در پوشه `~/.ssh` کاربران ذخیره می‌شوند. همان‌طور که می‌توانید حدس بزنید، کلیدهای سراسری سیستم که برای سرور SSH استفاده می‌شوند در مسیر `/etc/ssh` قرار دارند.

### ورود مبتنی بر کلید / بدون رمز عبور

سرور SSH می‌تواند طوری پیکربندی شود که هویت شما را با استفاده از کلیدهایتان بررسی کند. کافی است کلید عمومی (Public Key) خود را در حساب کاربری روی سرور ذخیره کنید و به سرور بگویید ورودهای مبتنی بر کلید را هم بررسی کند. در این حالت، کلاینت SSH شما کلید خصوصی‌تان را به‌عنوان مدرک اثبات هویت به سرور SSH ارائه می‌دهد و شما می‌توانید بدون وارد کردن رمز عبور وارد حساب کاربری شوید.

ابتدا کلید _عمومی_ خود را کپی کرده و وارد سرور شوید. فایل `~/.ssh/authorized_keys` را باز کنید و کلید خود را به آن اضافه نمایید. همچنین مطمئن شوید که فایل `/etc/ssh/sshd_config` شامل گزینه `PubkeyAuthentication yes` باشد. حالا خارج شوید و در ورود بعدی باید بتوانید بدون رمز عبور وارد شوید! این قابلیت زمانی که سرورهای زیادی را مدیریت می‌کنید یا می‌خواهید کپی کردن با `scp` و کارهای دیگر را خودکار کنید، فوق‌العاده مفید است. از دیدگاه مدیر سیستم هم امن‌تر است، چون اگر بخواهم به یک کاربر جدید اجازه ورود به سیستمم را بدهم، نیازی نیست رمز عبوری را به اشتراک بگذارم یا از طریق کانالی ارسال کنم؛ کافی است **کلید عمومی** آن شخص را بگیرم و به فایل `.ssh/authorized_keys` کاربر اضافه کنم.

آه! و نیازی هم نیست _کپی کردن کلید_ را به‌صورت دستی انجام دهید؛ کافی است از دستور `ssh-copy-id` استفاده کنید:

```text
➜  ~ ssh-copy-id 192.168.70.2
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/jadi/.ssh/id_dsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
jadi@192.168.70.2's password:

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh '192.168.70.2'"
and check to make sure that only the key(s) you wanted were added.
```

#### ابزار `ssh-agent`

دستور `ssh-agent` مثل یک مدیر رمز عبور برای کلیدهای SSH شما عمل می‌کند. این ابزار کلیدهای خصوصی شما را در حافظه نگه می‌دارد و هر وقت لازم باشد آن‌ها را ارائه می‌دهد. برای مثال، اگر روی کلیدتان رمز عبور گذاشته باشید، هر بار که بخواهید از آن کلید استفاده کنید مجبورید رمز را تایپ کنید. برای راحت‌تر کردن این کار با `ssh-agent`، کافی است یک شل را با `ssh-agent` اجرا کنید و همه کلیدهایتان را به این ایجنت اضافه کنید:

```text
jadi@debian:~$ ssh-agent /bin/bash
jadi@debian:~$ ssh-add
Identity added: /home/jadi/.ssh/id_rsa (jadi@debian)
Identity added: /home/jadi/.ssh/id_ecdsa (jadi@debian)
Identity added: /home/jadi/.ssh/id_dsa (/home/jadi/.ssh/id_dsa)
```

حالا ایجنت کلیدهای شما را می‌شناسد و دیگر از شما رمز نمی‌پرسد.

همچنین `ssh-agent` می‌تواند کلیدهای شما را به‌صورت امن در حافظه به سرورهای دیگر _منتقل_ کند (Agent Forwarding). فرض کنید باید به سرور A با SSH وصل شوید و در حالی که روی سرور A هستید، از کلیدتان برای SSH زدن به سرور B (یا انجام یک `git pull` با کلیدهای خصوصی‌تان) استفاده کنید. کلیدها روی سیستم شما هستند و اصلاً امن نیست که آن‌ها را به‌صورت واقعی و فیزیکی روی سرور A کپی کنید. در این حالت می‌توانید `ssh-agent` را اجرا کنید و کلیدهایتان را حتی وقتی روی سرور میانی هستید در اختیار داشته باشید.

#### تونل‌های SSH (`ssh tunnels`)

از `ssh` می‌توان برای _تونل زدن (Tunnelling)_ هم استفاده کرد. این یک مفهوم بسیار جذاب و یک ابزار فوق‌العاده کاربردی در دستان یک نینجای شبکه است! راستش ما همه‌اش برای حل مشکلات پیچیده از آن استفاده می‌کنیم.

همان‌طور که از اسمش پیداست، تونل زدن SSH داده‌ها را بین ماشین‌ها از داخل یک تونل عبور می‌دهد. به این مثال نگاه کنید:

```bash
ssh -L 9000:hckrnews.com:80 root@5.161.197.79
```

اینجا به کامپیوترم می‌گویم با کاربر `root` (که ایده چندان خوبی نیست) به سرور `5.161.197.79` وصل شود؛ **و** یک **تونل محلی (Local Tunnel)** با `-L` از روی دستگاه من به سمت پورت `80` سایت `hckrnews.com` از طریق آن سرور بسازد. حالا اگر **روی دستگاه خودم** به `localhost:9000` وصل شوم، درخواست از طریق سرور `5.161.197.79` به پورت ۸۰ سایت `hckrnews.com` تونل زده می‌شود. می‌توانید با `curl localhost:9000` امتحانش کنید.

چرا این قابلیت مفید است؟ فرض کنید برنامه‌ای روی سرورتان دارید که فقط به درخواست‌های محلی پاسخ می‌دهد (و نه به اینترنت). با استفاده از Local Forwarding می‌توانید یک پورت روی کامپیوتر خودتان را به پورتی که آن برنامه رویش کار می‌کند هدایت کنید و از آن برنامه روی دستگاه خودتان استفاده کنید!

همچنین مفهوم **هدایت راه‌دور (Remote Forwarding)** هم وجود دارد. در این حالت، یک پورت از یک سرور راه‌دور را به سرور دیگری (معمولاً کامپیوتر خودتان) متصل می‌کنید. با استفاده از این روش می‌توانید یک وب‌سرور از روی کامپیوتر خودتان را روی اینترنت در دسترس قرار دهید:

```bash
$ ssh -R 8000:localhost:80 root@5.161.197.79
```

در مثال بالا به SSH می‌گویم یک تونل **راه‌دور (Remote)** بسازد. پس از این، هر درخواستی که روی پورت ۸۰۰۰ سرور `5.161.197.79` بیاید به پورت ۸۰ روی `localhost` (دستگاه من) خواهد رسید!

حتی می‌توانید از ماشین راه‌دور بخواهید روی یک پورت مشخص روی تمام رابط‌های شبکه‌اش گوش بدهد (یعنی به روی شبکه باز شود و نه فقط `localhost`):

```bash
ssh -R 0.0.0.0:8000:localhost:7777 192.168.70.2
```

در بالا به ماشین `192.168.70.2` می‌گویم پورت ۸۰۰۰ را روی **همه** رابط‌های شبکه باز کند و هر چه دریافت کرد به پورت ۷۷۷۷ دستگاه من هدایت کند.

> **نکته:** برای اینکه به کلاینت‌ها اجازه دهید پورت‌های شنونده را به آدرسی غیر از `localhost` متصل (Bind) کنند، باید تنظیم `GatewayPorts clientspecified` در فایل پیکربندی سرور SSH قرار داده شده باشد.

کاربردهای بیشتری هم وجود دارد. برای مثال از سوئیچ `-D` برای یک هدایت پورتِ _پویا_ (`dynamic`) در سطح برنامه استفاده می‌کنید. این قابلیت مثل یک پروکسی یا ضدسانسور کار می‌کند. اگر من این دستور را بزنم:

```bash
ssh -D 1080 192.168.70.2
```

پورت ۱۰۸۰ مثل یک پروکسی **SOCKS** روی دستگاه من کار می‌کند و هر درخواستی که به آن برسد را به ماشین `192.168.70.2` می‌فرستد و پاسخ‌ها را برمی‌گرداند. حالا می‌توانم برنامه‌هایم را طوری تنظیم کنم که از `localhost:1080` به‌عنوان پروکسی SOCKS خودشان استفاده کنند و ماشین `192.168.70.2` اینجا نقش پروکسی را بازی خواهد کرد. این روش وقتی روی سیستم محلی خودتان اینترنت ندارید ولی `192.168.70.2` دارد، بسیار کاربردی است.

##### هدایت گرافیکی X (`X Forwarding`)

آخرین مفهومی که در بخش Forwarding می‌خواهم درباره‌اش صحبت کنم، X Forwarding است. همان‌طور که از [ماژول ۱۰۶](/Gitab/books/book13/Book/30/1061-install-and-configure-x11/) می‌دانید، برنامه‌های گرافیکی لینوکس از X به‌عنوان میزبان گرافیکی خود استفاده می‌کنند. این X هم مثل هر ارتباط شبکه‌ای دیگری می‌تواند روی شبکه هدایت (Forward) شود و حتی سوئیچ مخصوص خودش را در برنامه `ssh` دارد. برای هدایت X کافی است یک `-X` به دستور `ssh` خودتان اضافه کنید. دقت کنید که تنظیم `X11Forwarding yes` باید در فایل `sshd_config` سرور وجود داشته باشد.

برای فعال کردن X11 Forwarding در یک نشست SSH، کافی است `-X` را به `ssh` اضافه کنید:

```bash
ssh -X 192.168.70.2
```

و بعد می‌توانید برنامه‌های گرافیکی (مثلاً برای سرگرمی `xeyes`) را روی ماشین راه‌دور اجرا کنید و خروجی گرافیکی آن را روی سرور X خودتان ببینید!

> **نکته:** اگر روی یک ماشین گنو/لینوکس با سرور X11 نیستید، باید آن را نصب کنید (مثلاً XQuartz روی مک).

این قابلیت وقتی می‌خواهید برنامه‌ای را روی یک سرور پرقدرت اجرا کنید یا از خانه کار کنید در حالی که برنامه‌های گرافیکی‌تان در دفتر کار هستند، بسیار مفید است ;)

## رمزنگاری و امضا با استفاده از `gpg`

همان‌طور که در بخش قبل توضیح داده شد، می‌توان از یک جفت‌کلید عمومی و خصوصی برای رمزنگاری یا امضای پیام‌ها استفاده کرد. پیاده‌سازی این روش در ابزار `gpg` انجام شده که روی لینوکس (و سیستم‌های دیگر) برای انجام این کارها قابل استفاده است. ابتدا باید یک کلید بسازید:

```text
jadi@debian:~$ gpg --gen-key
gpg (GnuPG) 2.2.40; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

gpg: directory '/home/jadi/.gnupg' created
gpg: keybox '/home/jadi/.gnupg/pubring.kbx' created
Note: Use "gpg --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: Jadi
Name must be at least 5 characters long
Real name: Jadi M
Email address: jadijadi@gmail.com
You selected this USER-ID:
    "Jadi M <jadijadi@gmail.com>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit?
Change (N)ame, (E)mail, or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: /home/jadi/.gnupg/trustdb.gpg: trustdb created
gpg: directory '/home/jadi/.gnupg/openpgp-revocs.d' created


gpg: revocation certificate stored as '/home/jadi/.gnupg/openpgp-revocs.d/E279681DC09318AB5B23D359C9063DD26365986A.rev'
public and secret key created and signed.

pub   rsa3072 2023-09-17 [SC] [expires: 2025-09-16]
      E279681DC09318AB5B23D359C9063DD26365986A
uid                      Jadi M <jadijadi@gmail.com>
sub   rsa3072 2023-09-17 [E] [expires: 2025-09-16]
```

حالا کلید در مسیر `~/.gnupg` ساخته شده و می‌توانیم کلید عمومی خودمان را با دیگران به اشتراک بگذاریم:

```text
jadi@debian:~$ gpg --list-keys
/home/jadi/.gnupg/pubring.kbx
-----------------------------
pub   rsa3072 2023-09-17 [SC] [expires: 2025-09-16]
      E279681DC09318AB5B23D359C9063DD26365986A
uid           [ultimate] Jadi M <jadijadi@gmail.com>
sub   rsa3072 2023-09-17 [E] [expires: 2025-09-16]

jadi@debian:~$ gpg --export jadi > jadi.pub.key
jadi@debian:~$ file jadi.pub.key
jadi.pub.key: OpenPGP Public Key Version 4, Created Sun Sep 17 12:39:19 2023, RSA (Encrypt or Sign, 3072 bits); User ID; Signature; OpenPGP Certificate
```

> **نکته:** کلید خروجی گرفته‌شده در فرمت باینری است؛ سوئیچ `-a` را اضافه کنید تا به فرمت متنی ASCII (یا Armor) درآید.

حالا باید این کلید را بین دیگران توزیع کنید. می‌توانید آن را جایی آپلود کنید، ایمیل بزنید، در وب‌سایت خود بگذارید یا از مخازن عمومی کلید (Key Servers) برای اشتراک‌گذاری با دیگران استفاده کنید. اگر کسی آن را دریافت کرد، می‌تواند با دستور زیر آن را به مخزن کلیدهای خودش اضافه (Import) کند:

```bash
gpg --import jadi.pub.key
```

اوه! و چه می‌شود اگر احساس کنید کلیدتان لو رفته یا به خطر افتاده است؟! در این حالت باید یک فایل **ابطال (Revoke)** بسازید و با دیگران به اشتراک بگذارید تا به آن‌ها بگویید کلید شما دیگر معتبر نیست:

```bash
gpg --output jadi.revoke.asc --gen-revoke jadijadi@gmail.com
```

این دستور به `gpg` می‌گوید یک فایل ابطال به نام `jadi.revoke.asc` برای هویت `jadijadi@gmail.com` بسازد. اگر `jadijadi@gmail.com` لازم شد کلید عمومی‌اش را باطل کند، باید این فایل را در اینترنت یا سرورهای کلید منتشر کند تا بقیه بفهمند کلید عمومی قبلی دیگر معتبر نیست.

### رمزنگاری و رمزگشایی فایل‌ها

در این مرحله، من یک کلید دارم و دوستانم هم کلید عمومی مرا روی دستگاه خودشان Import کرده‌اند. اگر هر یک از آن‌ها بخواهد یک پیام رمزنگاری‌شده برایم بفرستد، می‌تواند این کار را انجام دهد:

```bash
echo "I Loved your course! I'll tell all my friends about it." > file.txt
gpg --out file.txt.encrypted --recipient jadijadi@gmail.com --encrypt file.txt
```

حالا کافی است این فایل را برایم بفرستند؛ حتی از طریق کانال‌های ناامن، چون با ابزارهای درجه‌یک رمزنگاری شده است. همه می‌توانند این فایل را دانلود کنند، اما **فقط من** می‌توانم آن را رمزگشایی کنم؛ چون فقط من **کلید خصوصی**ِ `jadijadi@gmail.com` را دارم:

```bash
gpg --out out.txt --decrypt file.txt.encrypted
```

> **نکته:** اگر این دوره را دوست داشتید، نیازی به رمزنگاری پیام نیست؛ فقط کافی است سایت [linux1st.com](https://linux1st.com) را در اینترنت به اشتراک بگذارید!

#### امضا و اعتبارسنجی فایل‌ها

در بخش قبل، از `gpg` برای رمزنگاری داده‌ها استفاده کردیم. از کلید عمومی یک نفر برای رمزنگاری و سپس از کلید خصوصی خودمان برای رمزگشایی استفاده می‌کردیم. اما چه می‌شود اگر من در سمت خودم از کلید خصوصی‌ام استفاده کنم و بگذارم دیگران با کلید عمومی من داده را _باز_ کنند؟ به این کار **امضا کردن (Signing)** می‌گویند.

به یاد داشته باشید که فقط من به کلید خصوصی خودم دسترسی دارم. بنابراین اگر آن را روی یک فایل اعمال کنم، همه:

۱. می‌توانند فایل را با استفاده از کلید عمومی من باز کنند.
۲. مطمئن خواهند بود که **من** این فایل را امضا کرده‌ام، چون فقط **من** به کلید خصوصیِ متناظر با آن کلید عمومی که برای باز کردن فایل استفاده کرده‌اند دسترسی دارم.

بیایید یک پیام را امضا کنیم:

```bash
$ echo "I'm Jadi and I'm glad that you reached to the end of your LPIC study" > message-jadi.txt
$ gpg --output message-jadi.sig --sign message-jadi.txt
```

حالا کافی است فایل `message-jadi.sig` را روی اینترنت منتشر کنم یا برای کسی بفرستم. اگر بخواهند مطمئن شوند که واقعاً از طرف من آمده است، کافی است امضای مرا بررسی کنند (البته بعد از Import کردن کلید عمومی من):

```text
jadi@debian:~$ gpg --verify message-jadi.sig
gpg: Signature made Sun 17 Sep 2023 09:26:15 AM EDT
gpg:                using RSA key E279681DC09318AB5B23D359C9063DD26365986A
gpg: Good signature from "Jadi M <jadijadi@gmail.com>" [ultimate]
```

این دستور فقط امضا را بررسی کرد؛ اگر بخواهند پیام را هم رمزگشایی (استخراج) کنند، باید این‌طور عمل کنند:

```text
jadi@debian:~$ gpg --output message.jadi --decrypt message-jadi.sig
gpg: Signature made Sun 17 Sep 2023 09:26:15 AM EDT
gpg:                using RSA key E279681DC09318AB5B23D359C9063DD26365986A
gpg: Good signature from "Jadi M <jadijadi@gmail.com>" [ultimate]
jadi@debian:~$ cat message.jadi
I'm Jadi and I'm glad that you reached to the end of your LPIC study
```

همچنین به گزینه `--clearsign` توجه کنید. این گزینه فایلی با پسوند `.asc` می‌سازد که شامل پیام اصلی و رمزنگاری‌نشده (متن واضح یا Clear Text) در کنار امضا است. به این ترتیب افراد غیرفنی هم می‌توانند پیام را بخوانند و فقط اگر کسی خواست، می‌تواند امضا را با `--verify` اعتبارسنجی کند:

```text
jadi@debian:~$ cat message-jadi.txt
I'm Jadi and I'm glad that you reached to the end of your LPIC study
jadi@debian:~$ gpg --clearsign message-jadi.txt
jadi@debian:~$ ls -ltrh
total 16M
drwxr-xr-x 27 jadi jadi 4.0K Jun 15 09:00 rust-for-linux
drwxr-xr-x  2 jadi jadi 4.0K Jun 15 09:09 Downloads
drwx------  2 jadi jadi 4.0K Jul 17 10:53 BRF
-rw-r--r--  1 jadi jadi    6 Jul 17 10:57 myfile
drwxr-xr-x  5 jadi jadi 4.0K Jul 25 13:34 nltk_data
drwxr-xr-x  4 jadi jadi 4.0K Aug 13 07:29 w
-rw-r--r--  1 jadi jadi  16M Aug 24 01:15 nvim-linux64.tar.gz
drwxr-xr-x  6 jadi jadi 4.0K Aug 24 05:38 nvim-linux64
-rw-r--r--  1 jadi jadi 3.8K Aug 27 15:49 report.xml
-rw-r--r--  1 jadi jadi 1.8K Sep 17 08:50 jadi.pub.key
-rw-r--r--  1 jadi jadi   69 Sep 17 09:26 message-jadi.txt
-rw-r--r--  1 jadi jadi  549 Sep 17 09:26 message-jadi.sig
-rw-r--r--  1 jadi jadi   69 Sep 17 09:27 message.jadi
-rw-r--r--  1 jadi jadi  777 Sep 17 09:28 message-jadi.txt.asc
jadi@debian:~$ cat message-jadi.txt.asc
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

I'm Jadi and I'm glad that you reached to the end of your LPIC study
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCgAdFiEE4nloHcCTGKtbI9NZyQY90mNlmGoFAmUG/xYACgkQyQY90mNl
mGqpXQv/QNv0NlCR+S7HJhxiOZcKXE3RB1sx4jRVrOtMd6ZoXYLb28Zz4xN/Lzh2
sipohDbNttr1ovNZvMMu83bbuSeViY9L7nvjNjKsY50u5V1KnrMJPHRaGV8g/0p2
t5zFJuzSFWXQczIjjXMpoLVH8jK3mJuBOmVFwLuBqUoW8827tCLIdr1DNyHXBW47
fcLK5/bO/ljdwGnAX46d+Prg0TIfMLjPpb7uFXVkRBo+zMtCEVDGObaVHQ3J8t6w
8i2YgMrmA3h9h4Gy/yM9Agb2kPeKl6iToeCfQ0EwTcnPF1TN0KZ1PS8Pr3Jp3LcS
A+p32zj7YTzTeE1uBAb7/BorBqaArX8HtLe15yFkNKhPluXya9GG4/Nsxk33Qpd3
c1KiLK9YhTFy7u+Q6tbTKG+uuGj71wANhkqRP30iMjLcBQ7aAO3ehVSYZFyZ7dbL
SJollwyG1sf4zH0g5SQZOxpjyz874IrlFc7GldDCr5jXZw6H+4NuY2yiVWKAcOcU
Qv23xWL2
=q81y
-----END PGP SIGNATURE-----
jadi@debian:~$ gpg --verify message-jadi.txt.asc
gpg: Signature made Sun 17 Sep 2023 09:28:54 AM EDT
gpg:                using RSA key E279681DC09318AB5B23D359C9063DD26365986A
gpg: Good signature from "Jadi M <jadijadi@gmail.com>" [ultimate]
gpg: WARNING: not a detached signature; file 'message-jadi.txt' was NOT verified!
```

> **نکته:** در اینجا `--clearsign` به `gpg` می‌گوید پیام متن واضح را هم در فایل خروجی قرار دهد. نام فایل خروجی `originalfile.asc` خواهد بود.

و دستور دیگری برای اعتبارسنجی اینکه یک سند به‌درستی امضا شده است یا نه:

```bash
gpg --verify recievedfile
```

#### ابزار `gpg-agent`

دقیقاً مثل `ssh-agent`، ابزار `gpg-agent` هم برنامه‌ای است که مثل یک مدیر رمز عبور برای کلیدهای GPG شما عمل می‌کند. این ابزار کلیدها را در حافظه نگه می‌دارد تا مجبور نباشید در هر بار استفاده، رمز عبور را وارد کنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1103_securing_data_with_encryption.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
