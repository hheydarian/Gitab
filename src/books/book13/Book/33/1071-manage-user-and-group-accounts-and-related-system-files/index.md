---
layout: layout.njk
title: "۱۰۷.۱ مدیریت حساب‌های کاربری، گروه‌ها و فایل‌های مربوطه"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 33
chapterSection: "موضوع ۱۰۷: وظایف مدیریتی"
permalink: /books/book13/Book/33/1071-manage-user-and-group-accounts-and-related-system-files/index.html
---
{% raw %}
# ۱۰۷.۱ مدیریت حساب‌های کاربری، گروه‌ها و فایل‌های مربوطه

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> فایل‌های /etc/passwd، /etc/shadow، /etc/group، و دستورات useradd، usermod، userdel، groupadd و passwd.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/xXQ1pw2sAQs" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۵_

داوطلبان باید توانایی افزودن، حذف، تعلیق و تغییر حساب‌های کاربری را داشته باشند.

### حوزه‌های دانش کلیدی

* افزودن، ویرایش و حذف کاربران و گروه‌ها
* مدیریت اطلاعات کاربر و گروه در پایگاه‌های داده رمز عبور و گروه‌ها
* ایجاد و مدیریت حساب‌های ویژه و محدود (Special purpose & limited accounts)

### اصطلاحات و ابزارها

<div dir="ltr">

* `/etc/passwd`
* `/etc/shadow`
* `/etc/group`
* `/etc/skel/`
* `chage`
* `getent`
* `groupadd`
* `groupdel`
* `groupmod`
* `passwd`
* `useradd`
* `userdel`
* `usermod`

</div>

## رمزهای عبور (Passwords)

### تغییر رمز عبور

هر کاربر می‌تواند رمز عبور خودش را با استفاده از دستور `passwd` تغییر دهد:

```text
$ passwd
Changing password for jadi.
(current) UNIX password:
New password:
Retype new password:
passwd: password updated successfully
```

اگر رمز عبور خیلی کوتاه باشد یا خیلی شبیه رمز قبلی باشد، یا حتی یک کلمه ساده از دیکشنری باشد یا برابر با نام کاربری و امثال این‌ها، دستور `passwd` ممکن است از تغییر دادن آن خودداری کند. همچنین دقت کنید که دستور `passwd` اول *رمز عبور فعلی* را می‌پرسد تا مطمئن شود واقعاً خودتان دارید رمزش را عوض می‌کنید.

> کاربر `root` می‌تواند رمز عبور هر کاربری را به هر چیزی (حتی رمزهای ضعیف) و بدون وارد کردن رمز فعلی تغییر دهد:

```text
# passwd jadi
New password:
BAD PASSWORD: it does not contain enough DIFFERENT characters
BAD PASSWORD: is too simple
Retype new password:
passwd: password updated successfully
```

## کاربران و گروه‌ها (Users and groups)

لینوکس یک سیستم چندکاربره (Multi-user) است و مدیریت این کاربران بخشی از وظایف مدیر سیستم محسوب می‌شود. به عنوان اولین قدم، باید بتوانید کاربران را **اضافه**، **حذف** و **ویرایش** کنید.

لینوکس مفهوم **گروه‌ها (Groups)** را هم دارد. می‌توانید گروه‌هایی تعریف کنید، به آن‌ها دسترسی بدهید و کاربران را عضو این گروه‌ها کنید. همان‌طور که قبلاً در دستور `chmod` دیدید، مثلاً می‌توانید مجوز خواندن از `/dev/cdrom` را به گروهی به نام `cdrom` بدهید و بعد هر کسی که لازم دارد از سی‌دی‌رام بخواند را به این گروه اضافه کنید.

لطفاً توجه کنید که هر کاربر می‌تواند عضو گروه‌های زیادی باشد، اما فقط یکی از آن‌ها گروه *اصلی (Primary)* او خواهد بود. در مقابل، هر فایل در آنِ واحد فقط می‌تواند متعلق به یک گروه باشد.

### مدیریت کاربران

#### افزودن کاربر

برای اضافه کردن یک کاربر جدید به سیستم، از دستور `useradd` استفاده می‌کنیم. سوییچ‌های اصلی آن این‌ها هستند:

| سوییچ | معنی |
| :--- | :--- |
| `-d` | تعیین دایرکتوری خانه (`-d /home/user`) |
| `-m` | ساخت دایرکتوری خانه |
| `-s` | تعیین شل (Shell) |
| `-G` | افزودن به گروه‌های فرعی/اضافی |
| `-c` | توضیحات (Comment)؛ معمولاً نام واقعی کاربر. اگر توضیحات فاصله یا کاراکتر خاص دارد، از کوتیشن استفاده کنید |

در بعضی سیستم‌ها `useradd` به طور خودکار دایرکتوری خانه را می‌سازد و در بعضی دیگر خودتان باید سوییچ `-m` را بزنید. عادت خوبی است که همیشه از `-m` استفاده کنید.

وقتی دایرکتوری خانه یک کاربر جدید ساخته می‌شود، سیستم محتویات `/etc/skel` را داخل دایرکتوری خانه او کپی می‌کند. دایرکتوری `/etc/skel` به عنوان الگو (Template) برای خانه کاربران جدید استفاده می‌شود.

> دستور دیگری برای افزودن کاربر `adduser` است. این دستور به شکل تعاملی رمز عبور، دایرکتوری خانه و بقیه موارد را از شما می‌پرسد و کاربر را می‌سازد.

#### ویرایش کاربر

برای ویرایش مشخصات یک کاربر باید از دستور `usermod` استفاده کنید. این دستور از اکثر سوییچ‌های `useradd` پشتیبانی می‌کند. مثلاً می‌توانید شل ورود کاربر _jadi_ را با دستور `usermod -s /bin/csh jadi` تغییر دهید. اما ۳ سوییچ مهم دیگر هم دارد:

| سوییچ | معنی |
| :--- | :--- |
| `-L` | قفل کردن (Lock) این حساب کاربری |
| `-U` | باز کردن قفل (Unlock) حساب کاربری |
| `-aG` | اضافه کردن به گروه‌های بیشتر (مثلاً `usermod -aG wheel jadi`) |

> **نکته:** اگر بنویسید `usermod -G wheel,users jadi`، کاربر `jadi` **فقط** عضو همین دو گروه می‌شود و بقیه گروه‌های قبلی‌اش پاک می‌شوند! به همین دلیل از `-aG newgroup` (به معنی Append to Groups) استفاده می‌کنیم تا گروه جدید را به گروه‌های فعلی `jadi` اضافه کنیم. یعنی `-G` می‌گوید «گروه‌های جادی این‌ها هستند» و `-aG` می‌گوید «جادی را به این گروه‌ها هم اضافه کن».

#### حذف کاربر

اگر بخواهید کاربری را حذف کنید، از `userdel` استفاده می‌کنید. خیلی سرراست است:

```text
userdel jadi
```

اگر سوییچ `-r` را اضافه کنید، دایرکتوری خانه و صندوق ایمیل (Mail Spool) او هم پاک می‌شوند!

### مدیریت گروه‌ها

تقریباً مثل کاربران است؛ دستورات `groupadd`، `groupdel` و `groupmod` را داریم. هر گروه یک *شناسه (ID)* و یک *نام* دارد.

```text
# groupadd -g 1200 newgroup
```

این دستور گروهی به نام _newgroup_ با شناسه `1200` می‌سازد. در صورت نیاز، کاربر `root` می‌تواند شناسه یک گروه را (مثلاً به `2000`) با دستور `groupmod -g 2000 newgroup` تغییر دهد یا با `groupdel newgroup` گروه را حذف کند.

طبیعتاً اگر روت گروهی را که عضو دارد پاک کند، کاربرانش پاک نمی‌شوند! فقط دیگر عضو آن گروه نیستند.

> در اکثر سیستم‌ها، شناسه کاربر (UID) یا شناسه گروه (GID) کاربران و گروه‌هایی که مدیر سیستم می‌سازد از `1000`، `1001`، `1002` و به بالا شروع می‌شود.

### فایل‌های مربوط به کاربران و گروه‌ها

#### فایل `/etc/passwd`

این فایل شامل اطلاعات تمام کاربران روی سیستم شماست:

```text
tail /etc/passwd
scard:x:491:489:Smart Card Reader:/var/run/pcscd:/usr/sbin/nologin
sshd:x:493:491:SSH daemon:/var/lib/sshd:/bin/false
statd:x:488:65534:NFS statd daemon:/var/lib/nfs:/sbin/nologin
tftp:x:496:493:TFTP account:/srv/tftpboot:/bin/false
lightdm:x:10:14:Light Display Manager:/var/lib/lightdm:/bin/false
wwwrun:x:30:8:WWW daemon apache:/var/lib/wwwrun:/bin/false
jadi:x:1000:100:jadi:/home/jadi:/bin/bash
svn:x:485:482:user for Apache Subversion svnserve:/srv/svn:/sbin/nologin
privoxy:x:484:480:Daemon user for privoxy:/var/lib/privoxy:/bin/false
```

همان‌طور که می‌بینید، قالب هر خط به این شکل است:

```text
username:x:userid:primary group id:Name and comments:home dir:shell
```

همان‌طور که می‌بینید، ستون دوم اینجا به صورت `x` نمایش داده شده است. در روزگار قدیم رمز عبور یا هشِ رمز عبور کاربر در همین فایل قرار داشت، اما امروزه به فایل `/etc/shadow` منتقل شده است.

> **نکته:** فایل `/etc/passwd` باید برای همه کاربران قابل خواندن باشد و همین موضوع آن را به جای بسیار بدی برای نگهداری رمز عبور کاربران تبدیل می‌کند! به همین دلیل به جای رمز عبور یک `x` می‌بینیم که نشان می‌دهد رمزهای اصلی را باید از فایل `/etc/shadow` پیدا کرد.

دقت کنید که *کاربران سیستمی خاص* مثل `lightdm` به عنوان شل خودشان `/bin/false` (یا `/usr/sbin/nologin`) دارند؛ این کار مانع از این می‌شود که واقعاً بتوانند به سیستم لاگین کنند. قدیم‌ها هکرها سعی می‌کردند با این حساب‌ها وارد سیستم شوند.

#### فایل `/etc/shadow`

این فایل حاوی رمز عبورهای هش‌شده (Hashed passwords) کاربران است. ببینید چطور `/etc/passwd` برای همه قابل خواندن است اما `/etc/shadow` فقط برای `root` و اعضای گروه `shadow` خواندنی است:

```text
# ls -ltrh /etc/passwd /etc/shadow
-rw-r--r-- 1 root root   1.9K Oct 28 15:47 /etc/passwd
-rw-r----- 1 root shadow  851 Oct 29 19:06 /etc/shadow
```

حالا داخلش چیست؟

```text
# tail /etc/shadow
scard:!:16369::::::
sshd:!:16369::::::
statd:!:16369::::::
tftp:!:16369::::::
uucp:*:16369::::::
lightdm:*:16369::::::
jadi:$6$enk5I3bv$uSQrRpen7m9xDapYLgwgh3P/71OLZUgj31n8AwzgIM2lA5Hc/BmRVAMC0eswdBGkseuXSvmaz0lsYFtduvuqUo:16737:0:99999:7:::
svn:!:16736::::::
privoxy:!:19473::::::
```

ایول! جادی آنجا یک رمز عبور رمزنگاری‌شده دارد. بعد از آن رمز عبور هم یک سری عدد آمده: **`16737:0:99999:7:::`**. این عددها چه معنی‌ای می‌دهند؟ جدول زیر توضیح می‌دهد:

| فیلد | معنی |
| :--- | :--- |
| `19473` (یا `16737`) | آخرین باری که این رمز عبور تغییر کرده است |
| `0` | کاربر تا `0` روز بعد از هر تغییر، اجازه تغییر دوباره رمز را ندارد (حداقل روز) |
| `99999` | بعد از این تعداد روز، کاربر **باید** رمزش را عوض کند (حداکثر اعتبار) |
| `7` | ...و `7` روز قبل از منقضی شدن رمز، به کاربر هشدار داده می‌شود که رمزش را تغییر دهد |

> **نکته:** این اعداد بر حسب «تعداد روزهای گذشته از اول ژانویه ۱۹۷۰» یا همان زمان Epoch بر حسب روز هستند. مثلاً `16737` یعنی ۱۶۷۳۷ روز بعد از اول ژانویه ۱۹۷۰. عجیب است ولی کاربردی!

اما لازم نیست این عددهای عجیب‌وغریب را دستی تغییر دهیم. در صورت نیاز می‌توانیم از ابزار `chage` برای تغییر این اعداد استفاده کنیم. اگر دستور `chage jadi` را بزنید، سیستم تمام پارامترها را یکی‌یکی از شما می‌پرسد. همچنین می‌شود با سوییچ‌ها، پارامترهای خاصی را مستقیماً از خط فرمان تغییر داد:

| سوییچ | معنی |
| :---: | :--- |
| `-l` | نمایش لیست اطلاعات فعلی |
| `-E` | تنظیم تاریخ انقضا. تاریخ می‌تواند یک عدد، به فرمت `YYYY-MM-DD` یا `-1` باشد که یعنی *هرگز* منقضی نشود |

```text
# chage -l jadi
Last password change                    : Apr 26, 2023
Password expires                    : never
Password inactive                    : never
Account expires                        : never
Minimum number of days between password change        : 0
Maximum number of days between password change        : 99999
Number of days of warning before password expires    : 7
```

> **نکته:** علامت `!` به این معنی است که حساب کاربری قفل شده و کاربر نمی‌تواند با این حساب وارد سیستم شود. در بعضی سیستم‌ها (مثل ردهت) ممکن است `!!` هم ببینید که یعنی این حساب تا حالا اصلاً استفاده نشده است (یا هنوز رمزی برایش تنظیم نشده).

#### فایل `/etc/group`

این فایل شامل گروه‌ها و شناسه‌های آن‌هاست:

```text
# tail /etc/group
avahi:x:486:
kdm:!:485:
mysql:x:484:
winbind:x:483:
at:x:25:
svn:x:482:
vboxusers:x:481:
input:x:1000:jadi,joe
privoxy:x:480:
```

> **نکته:** آن `x` را می‌بینید؟ از نظر تئوری گروه‌ها هم می‌توانند رمز عبور داشته باشند، اما عملاً در هیچ توزیعی استفاده نمی‌شود! فایل رمزهایش هم `/etc/gshadow` است.

### بررسی اطلاعات کاربر

قبلاً دستور `chage -l jadi` را دیدید، اما دستورات بیشتری برای بررسی وضعیت کاربر وجود دارد. یکی از آن‌ها `id` است:

```text
# id jadi
uid=1000(jadi) gid=100(users) groups=1000(input),100(users)
```

راه‌حل دیگر `getent` (مخفف **get entry**) است. این دستور می‌تواند از *پایگاه‌های داده* مهم سیستم برای ورودی‌های خاص پرس‌وجو بگیرد. این پایگاه‌ها شامل `/etc/passwd`، `/etc/hosts`، `/etc/shadow`، `/etc/group` و... هستند:

```text
funlife:~ # getent group tor
tor:x:479:
funlife:~ # getent passwd jadi
jadi:x:1000:100:jadi:/home/jadi:/bin/bash
funlife:~ # getent shadow jadi
jadi:$6$enk5I3bv$uSQrRpen7m9xDapYLgwgh3P/71OLZUgj31n8AwzgIM2lA5Hc/BmRVAMC0eswdBGkseuXSvmaz0lsYFtduvuqUo:16737:0:99999:7:::
```

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1071_manage_user_and_group_accounts_and_related_system_files.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
