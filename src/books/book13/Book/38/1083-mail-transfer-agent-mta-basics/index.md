---
layout: layout.njk
title: "۱۰۸.۳ مبانی عامل انتقال ایمیل (MTA)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 38
chapterSection: "موضوع ۱۰۸: سرویس‌های اساسی سیستم"
permalink: /books/book13/Book/38/1083-mail-transfer-agent-mta-basics/index.html
---
{% raw %}
# ۱۰۸.۳ مبانی عامل انتقال ایمیل (MTA)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> کارکرد Postfix و Sendmail، فایل /etc/aliases، اجرای newaliases و فوروارد ایمیل به صندوق‌های محلی.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/0Uh7jUFQAWs" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۳_

داوطلبان باید با برنامه‌های رایج MTA آشنا باشند و بتوانند تنظیمات اولیه فوروارد (Forward) و نام‌های مستعار (Alias) را روی یک میزبان کلاینت انجام دهند. سایر فایل‌های پیکربندی در این هدف پوشش داده نمی‌شوند.

### حوزه‌های کلیدی دانش

* ایجاد نام‌های مستعار ایمیل (E-mail Aliases)
* پیکربندی فوروارد کردن ایمیل (E-mail Forwarding)
* آشنایی با برنامه‌های رایج MTA (`postfix`، `sendmail`، `exim`) (بدون نیاز به پیکربندی پیشرفته)

### اصطلاحات و ابزارها

* `~/.forward`
* دستورات لایه شبیه‌سازی sendmail
<div dir="ltr">

* `newaliases`
* `mail`
* `mailq`
* `postfix`
* `sendmail`
* `exim`

</div>

### برنامه‌های MTA

ایمیل بخش جدایی‌ناپذیری از بسیاری از سیستم‌های گنو/لینوکس و یونیکس است. هر کاربر یک صندوق پستی (Mailbox) دارد و می‌تواند برای سایر کاربران محلی ایمیل ارسال یا دریافت کند. این کار از طریق **MTAها (Mail Transfer Agents)** انجام می‌شود. به عبارت دیگر، MTAها برنامه‌هایی هستند که ایمیل‌ها را در سیستم‌عامل شما مدیریت می‌کنند. آن‌ها می‌توانند ایمیل‌ها را به صورت محلی و همچنین از طریق شبکه دریافت و ارسال کنند. گزینه‌های مختلفی برای MTA وجود دارد. در این بخش مروری سریع بر آن‌ها خواهیم داشت و خواهید دید که چطور می‌توانید برای سایر کاربران (یا روی اینترنت) ایمیل بفرستید و چگونه ایمیل‌های محلی خودتان را چک کنید.

#### `sendmail`

یکی از قدیمی‌ترین گزینه‌های موجود است. بسیار حجیم و بزرگ است، پیکربندی آن تا حدی دشوار است و خیلی هم امنیت‌محور طراحی نشده بود. به همین دلیل، امروزه سیستم‌های کمی از آن به عنوان MTA پیش‌فرض استفاده می‌کنند.

#### `exim`

هدف این برنامه این است که یک ارسال‌کننده ایمیل (Mailer) عمومی و منعطف با امکانات گسترده برای بررسی ایمیل‌های ورودی باشد. این ابزار امکانات بسیار زیادی از جمله ACLها، احراز هویت و بسیاری قابلیت‌های دیگر را در اختیار می‌گذارد.

#### `postfix`

یک جایگزین جدیدتر برای `sendmail` است و از فایل‌های پیکربندی‌ای استفاده می‌کند که درک آن‌ها بسیار ساده است. از دامنه‌های متعدد، رمزنگاری و موارد دیگر پشتیبانی می‌کند. `postfix` همان چیزی است که روی اکثر توزیع‌ها به عنوان MTA پیش‌فرض می‌بینید.

> **نکته:** اکثر توزیع‌های دسکتاپی به صورت پیش‌فرض MTA نصب نمی‌کنند. اگر دوست دارید تمرین کنید، پیشنهاد می‌کنم بسته `postfix` (و همچنین `mailx` یا `bsd-mailx`) را از طریق مدیر بسته خودتان نصب کنید.

### لایه شبیه‌سازی `sendmail`

همانطور که می‌دانید، `sendmail` قدیمی‌ترین MTA زنده است و به همین دلیل، بسیاری از MTAهای دیگر سعی می‌کنند با آن سازگار باشند و یک **لایه شبیه‌سازی `sendmail` (sendmail emulation layer)** دارند تا سازگاری رو به عقب (Backward Compatibility) خود را با `sendmail` حفظ کنند. به همین خاطر است که روی هر توزیعی که باشید، فارغ از اینکه MTA انتخابی شما چیست، می‌توانید دستور `sendmail` یا `mailq` را تایپ کنید و ایمیل‌ها را بررسی نمایید.

### نام‌های مستعار (`aliases`)

در سیستم، نام‌های مستعاری برای ایمیل‌ها وجود دارد که در فایل `/etc/aliases` تعریف می‌شوند:

```text
$ cat /etc/aliases
#
#  Aliases in this file will NOT be expanded in the header from
#  Mail, but WILL be visible over networks or from /bin/mail.
#
#       >>>>>>>>>>      The program "newaliases" must be run after
#       >> NOTE >>      this file is updated for any changes to
#       >>>>>>>>>>      show through to sendmail.
#

# Basic system aliases -- these MUST be present.
mailer-daemon:  postmaster
postmaster:     root

# General redirections for pseudo accounts.
bin:            root
daemon:         root
adm:            root
lp:             root
sync:           root
shutdown:       root
halt:           root
mail:           root
news:           root
uucp:           root
operator:       root
games:          root
www:            webmaster
webmaster:      root
[ .... ]
```

این فایل به سیستم می‌گوید اگر پیامی برای `news` آمد، باید به `root` تحویل داده شود و اگر ایمیلی برای `www` نوشته شد، باید به `webmaster` (که آن هم به `root` می‌رود) تحویل شود.

در صورت اعمال هرگونه تغییر در این فایل، لازم است دستور `newaliases` را اجرا کنید.

### ارسال ایمیل

از خط فرمان هم می‌توان با استفاده از دستور `mail` ایمیل ارسال کرد:

```text
[jadi@funlife ~]$ mail news
Subject: Email to news user
hahah.. we know where this will go.
this will go to root and then to jadi!

Hi Jadi!

Cc:
[jadi@funlife ~]$ mail
Mail version 8.1.2 01/15/2001.  Type ? for help.
"/var/mail/jadi": 12 messages 12 new
>N  1 root@funlife       Sat Jan 02 08:50   39/1373  apt-listchanges: news for f
 N  2 root@funlife       Sat Jan 02 09:01  165/7438  apt-listchanges: news for f
 N  3 jadi@funlife       Sat Jan 02 19:58   18/640   *** SECURITY information fo
 N  4 jadi@funlife       Sat Jan 02 20:04   18/631   *** SECURITY information fo
 N  5 jadi@funlife       Sun Jan 03 10:15   18/664   *** SECURITY information fo
 N  6 root@funlife       Mon Jan 04 12:42   27/941   Cron <jadi@funlife> /home/j
 N  7 root@funlife       Mon Jan 04 17:11   26/845   apt-listchanges: news for f
 N  8 root@funlife       Tue Jan 05 18:42   27/945   Cron <jadi@funlife> /home/j
 N  9 root@funlife       Wed Jan 06 09:17   46/1788  apt-listchanges: news for f
 N 10 root@funlife       Thu Jan 07 12:42   27/945   Cron <jadi@funlife> /home/j
 N 11 root@funlife       Thu Jan 07 18:42   27/943   Cron <jadi@funlife> /home/j
 N 12 jadi@funlife       Thu Jan  7 19:53   17/478   Email to news user
& 12
Message 12:
From jadi@funlife  Thu Jan  7 19:53:08 2016
X-Original-To: news
To: news@funlife
Subject: Email to news user
Date: Thu,  7 Jan 2016 19:53:08 +0330 (IRST)
From: jadi@funlife (jadi)

hahah.. we know where this will go.
this will go to root and then to jadi!

Hi Jadi!

& d
& q
Held 11 messages in /var/mail/jadi
```

### فورواردهای محلی (`~/.forward`)

دیدیم که با استفاده از `/etc/aliases` می‌توان ایمیل‌ها را فوروارد کرد. اما آن فایل توسط کاربران عادی قابل نوشتن نیست؛ پس یک کاربر عادی مثل `jadi` چه باید بکند؟

هر کاربر می‌تواند یک فایل `.forward` در دایرکتوری خانگی خودش بسازد تا تمام ایمیل‌هایی که برای آن کاربر ارسال می‌شوند به آدرس داخل آن فایل فوروارد شوند.

> **نکته:** حتی می‌توانید یک آدرس ایمیل کامل مثل `jadijadi@gmail.com` را داخل فایل `.forward` خودتان قرار دهید.

همچنین می‌توانید از خط فرمان یا حتی از داخل اسکریپت‌هایتان با دستوری مثل `echo -e "email content" | mail -s "email subject" "example@example.com"` ایمیل ارسال کنید.

### دستور `mailq`

این دستور صف ایمیل (Mail Queue) را فهرست می‌کند. هر ردیف شامل شناسه فایل در صف، حجم پیام، زمان رسیدن، فرستنده و گیرندگانی است که هنوز باید ایمیل به آن‌ها تحویل داده شود. اگر ایمیل در آخرین تلاش تحویل داده نشده باشد، دلیل خطا نیز نمایش داده می‌شود. مدیر سیستم می‌تواند از این دستور برای بررسی وضعیت ایمیل‌هایی که هنوز در صف باقی مانده‌اند استفاده کند:

```text
$ mailq
-Queue ID- --Size-- ----Arrival Time---- -Sender/Recipient-------
AA52C228E6B      468 Thu Jan  7 19:59:41  jadi@funlife
(connect to alt2.gmail-smtp-in.l.google.com[2404:6800:4003:c01::1a]:25: Network is unreachable)
                                         jadijadi@gmail.com

-- 0 Kbytes in 1 Request.
```

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1083_mail_transfer_agent_mta_basics.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
