---
layout: layout.njk
title: "۱۰۷.۳ بومی‌سازی و تنظیمات زبان و منطقه (Locale)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 35
chapterSection: "موضوع ۱۰۷: وظایف مدیریتی"
permalink: /books/book13/Book/35/1073-localisation-and-internationalisation/index.html
---
{% raw %}
# ۱۰۷.۳ بومی‌سازی و تنظیمات زبان و منطقه (Locale)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> متغیرهای LC_ALL، LANG، تولید localeها با locale-gen و دستور localectl.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/kqoipsM7AMA" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۳_

داوطلبان باید بتوانند یک سیستم را به زبانی غیر از انگلیسی بومی‌سازی کنند و همچنین درک درستی از این داشته باشند که چرا `LANG=C` هنگام اسکریپت‌نویسی مفید است.

### حوزه‌های دانش کلیدی

* پیکربندی تنظیمات محلی (`locale`) و متغیرهای محیطی مربوطه
* پیکربندی تنظیمات منطقه زمانی (`timezone`) و متغیرهای محیطی مربوطه

### اصطلاحات و ابزارها

<div dir="ltr">

* `/etc/timezone`
* `/etc/localtime`
* `/usr/share/zoneinfo/`
* `LC_*`
* `LC_ALL`
* `LANG`
* `TZ`
* `/usr/bin/locale`
* `tzselect`
* `timedatectl`
* `date`
* `iconv`
* `UTF-8`
* `ISO-8859`
* `ASCII`
* `Unicode`

</div>

### منطقه زمانی (Timezone)

کره زمین بزرگ و گِرد است، بنابراین ***منطقه‌های زمانی (Timezones)*** مختلف و ***زبان‌های*** متفاوتی داریم! حتی صحبت‌هایی درباره منطقه زمانی برای مریخ هست و اگر روزی با موجودات فضایی روبه‌رو شویم، احتمالاً آن‌ها هم زبان‌های خودشان را خواهند داشت.

این تنوع چند تا مسئله به وجود می‌آورد:
۱. شاید ترجیح دهیم لینوکس‌مان را به زبان محلی خودمان داشته باشیم.
۲. باید به لینوکس بگوییم در چه منطقه زمانی هستیم.
۳. برنامه‌ها ممکن است از لینوکس بپرسند ترجیح ما درباره زبان، چیدمان صفحه‌کلید و... چیست.
۴. و حتی اگر خودتان برایتان مهم نباشد، سیستم و ماشین شما باید منطقه زمانی‌تان را بداند تا بتواند کارها را در زمان درست اجرا کند.

در این بخش راه‌حل‌های لینوکس برای حل این مسائل را به شما نشان می‌دهم. اما بیایید ساده شروع کنیم.

روی سیستم‌های لینوکسی می‌توانید از دستورات `date` و `cal` برای چک کردن تاریخ و تقویم استفاده کنید. همچنین می‌توان با قالب‌بندی `+` تاریخ را به شکل دلخواه چاپ کرد:

```bash
[jadi@fedora ~]$ date
Fri Jun  2 02:07:35 PM EDT 2023
[jadi@fedora ~]$ date +'%Y%m%d-%M'
20230602-08
[jadi@fedora ~]$ date +'%Y%m%d-%H%M'
20230602-1408
```

برای گرفتن اطلاعات بیشتر می‌توانید دستور `timedatectl` را امتحان کنید:

```text
[root@fedora ~]# timedatectl
               Local time: Fri 2023-06-02 14:23:34 EDT
           Universal time: Fri 2023-06-02 18:23:34 UTC
                 RTC time: Sat 2023-06-03 02:37:51
                Time zone: America/New_York (EDT, -0400)
System clock synchronized: no
              NTP service: active
          RTC in local TZ: no
```

منطقه زمانی مشخص می‌کند که ساعت شما نسبت به یک زمان مرجع (UTC) چقدر اختلاف دارد. به این ترتیب می‌توانیم بدون توجه به موقعیت جغرافیایی‌مان درباره زمان صحبت کنیم. به عبارت دیگر، من می‌توانم به شما بگویم «تغییرات را ساعت `02:30 UTC` شروع کن» و هر دوی ما می‌دانیم که این زمان به وقت محلی خودمان کی می‌شود (مثلاً وقت من ۱ ساعت جلوتر است پس به ساعت خودم `3:30` شروع می‌کنم).

اکثر توزیع‌ها هنگام نصب از شما درباره منطقه زمانی‌تان می‌پرسند. بعدها هم می‌توانید آن را از طریق رابط گرافیکی در تنظیمات سیستم یا با استفاده از یک رابط متنی (TUI) مثل دستور قدیمی‌تر `tzconfig` یا جدیدتر `tzselect` تغییر دهید:

```text
[jadi@fedora ~]$ tzselect
Please identify a location so that time zone rules can be set correctly.
Please select a continent, ocean, "coord", or "TZ".
1) Africa							     7) Europe
2) Americas							     8) Indian Ocean
3) Antarctica							     9) Pacific Ocean
4) Asia								    10) coord - I want to use geographical coordinates.
5) Atlantic Ocean						    11) TZ - I want to specify the timezone using the Posix TZ format.
6) Australia
#? 5
Please select a country whose clocks agree with yours.
1) Bermuda				       4) Faroe Islands				      7) Spain
2) Cape Verde				       5) Portugal
3) Falkland Islands			       6) South Georgia & the South Sandwich Islands
#? 1

The following information has been given:

	Bermuda

Therefore TZ='Atlantic/Bermuda' will be used.
Selected time is now:	Fri Jun  2 15:15:06 ADT 2023.
Universal Time is now:	Fri Jun  2 18:15:06 UTC 2023.
Is the above information OK?
1) Yes
2) No
#? 1

You can make this change permanent for yourself by appending the line
	TZ='Atlantic/Bermuda'; export TZ
to the file '.profile' in your home directory; then log out and log in again.

Here is that TZ value again, this time on standard output so that you
can use the /usr/bin/tzselect command in shell scripts:
Atlantic/Bermuda
```

وقتی این برنامه تمام می‌شود، به شما پیشنهاد می‌دهد متغیری به نام `TZ` را به شکل زیر تنظیم کنید تا منطقه زمانی *خودتان* (نه کل سیستم) تغییر کند:

```text
TZ='Atlantic/Bermuda'; export TZ
```

یا می‌توانید فقط برای یک بار اجرای دستور، ساعت یک شهر خاص را چک کنید:

```bash
$ env TZ='Asia/Tokyo' date
Sat Jun  3 03:25:40 AM JST 2023
```

### پیکربندی منطقه زمانی

دایرکتوری `/usr/share/zoneinfo/` حاوی تمام اطلاعات مناطق زمانی است. این‌ها فایل‌های باینری هستند. اگر لازم باشد منطقه زمانی کل سیستم را تغییر دهید، باید فایل `/etc/localtime` را به یکی از این فایل‌ها پیوند نمادین (Symbolic Link) بدهید:

```text
# ls -ltrh /etc/localtime
lrwxrwxrwx. 1 root root 38 Apr 26 09:41 /etc/localtime -> ../usr/share/zoneinfo/America/New_York
```

این فایل باید با فایل درست از داخل `/usr/share/zoneinfo/` جایگزین شود. بهتر است به جای کپی کردن خود فایل، یک لینک نمادین (Symlink) بسازید؛ این کار از بروز مشکل در آپدیت‌های بعدی سیستم جلوگیری می‌کند.

### پیکربندی زبان‌ها (Locales)

برای بررسی وضعیت زبان فعلی انتخاب‌شده در سیستم، از دستور `locale` استفاده کنید:

```text
[root@fedora ~]# locale
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

این‌ها متغیرهای محیطی هستند که به سیستم می‌گویند از چه زبان و فرمتی استفاده کند. اینجا من از `LANG=en_US.UTF-8` استفاده می‌کنم که یعنی زبان انگلیسی با گویش آمریکایی و کدگذاری `UTF-8`.

> در ادامه همین فصل درباره `UTF-8` و سایر کدگذاری‌ها صحبت خواهیم کرد.

بقیه متغیرهایی که در خروجی بالا می‌بینید، به سیستم می‌گویند چیزهای مختلف را بر اساس سیستم بومی‌سازی چطور نمایش دهد. مثلاً اگر `LC_TIME` را به `"en_GB.UTF-8"` تغییر دهیم، زمان و تاریخ با قالب بریتانیا چاپ می‌شود.

یک تنظیم بسیار مهم دیگر `LC_ALL` است. از آن می‌توان برای تغییر **همه** تنظیمات به صورت یکجا استفاده کرد. اگر بزنید `export LC_ALL=fa_IR.UTF-8`، تمام تنظیمات بدون هیچ استثنایی به آن تغییر می‌کنند. هر زمان هم بخواهید می‌توانید با `unset LC_ALL` آن را خنثی کنید.

#### متغیر `LANG=C`

تنظیم `LANG=C` در بسیاری از برنامه‌ها و اسکریپت‌ها استفاده می‌شود تا مطمئن شویم سیستم در همه محیط‌ها نتایج یکسان و قابل پیش‌بینی تولید می‌کند. مثلاً برای اینکه مطمئن شویم ترتیب مرتب‌سازی (Sort order) بر اساس ترتیب باینری (ASCII) انجام شود و همه تنظیمات زبانی روی حالت پیش‌فرض (انگلیسی پایه بدون ترجمه) باشند.

#### تغییر یا افزودن Localeها

این مورد جزو سرفصل‌های آزمون LPIC نیست، اما بد نیست بدانید روی سیستم‌های مبتنی بر دبیان می‌توانید با دستور `dpkg-reconfigure locales` لوکال‌های پیش‌فرض خودتان را تغییر دهید، اضافه کنید یا تنظیم کنید.

همچنین این فایل وجود دارد:

```text
[root@fedora ~]# cat /etc/locale.conf
LANG="en_US.UTF-8"
```

و البته می‌توانید تنظیم `LANG` دلخواهتان را به فایل `~/.bash_profile` یا `~/.profile` خودتان هم اضافه کنید.

> روی سیستم‌های دارای `systemd` برای بررسی وضعیت locale از `localectl` و برای تنظیم آن از دستوری مثل `localectl set-locale LANG=en_US.UTF-8` استفاده کنید.

### کدگذاری کاراکترها (Character Encoding)

#### ASCII

کامپیوترها قدیم‌ترها با کدگذاری ۷ بیتی کاراکترها کار می‌کردند. این روش ۱۲۸ کاراکتر در اختیارمان می‌گذاشت که برای اعداد، علائم نگارشی و حروف انگلیسی کافی بود!

#### ISO-8859

تعداد کاراکترهای بیشتری داشت و مجموعه‌های مختلفی برای زبان‌هایی مثل تایلندی، عربی و زبان‌های دیگر ارائه می‌داد، اما همچنان مجموعه کاراکترهای ASCII را هم در خود نگه داشته بود.

#### UTF-8

کدگذاری **Unicode Transformation Format** جدیدترین روش کدگذاری است. این یک کدگذاری واقعاً جهانی است که نه‌تنها برای تمام زبان‌های نوشتاری دنیا کاراکتر دارد، بلکه کاراکترهای باحال و جالبی مثل `¾`، `♠`، `π` و `⚤` را هم شامل می‌شود. این کدگذاری با ASCII سازگاری رو به عقب (Backward compatible) دارد و از واحدهای کُد ۸ بیتی استفاده می‌کند (**نه کدگذاری ۸ بیتی ثابت!**). در اکثر مواقع ایده بسیار خوبی است که از `UTF-8` استفاده کنید تا مطمئن باشید سیستم‌تان عملاً در همه شرایط درست کار می‌کند.

### دستور `iconv`

اگر نیاز داشتید کدگذاری یک متن را به کدگذاری دیگری تبدیل کنید، دستورش `iconv` است. سوییچ `-l` تمام کدگذاری‌های در دسترس را به شما نشان می‌دهد:

```text
iconv -f WINDOWS-1258 -t UTF-8 /tmp/myfile.txt
```

> **نکته:** `-f` مخفف "from" (از) و `-t` مخفف "to" (به) است. به خاطر سپردنش خیلی راحت است.

در سال ۲۰۲۳ و امروزه به ندرت به این دستور نیاز پیدا می‌کنید، اما دانستنش واجب است؛ به خصوص اگر در کشوری غیر از آمریکا زندگی می‌کنید!

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1073_localisation_and_internationalisation.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
