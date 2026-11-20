---
layout: layout.njk
title: "۱۰۳.۴ استفاده از خط لوله‌ها، ورودی و خروجی‌ها"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 15
chapterSection: "موضوع ۱۰۳: دستورات گنو و یونیکس"
permalink: /books/book13/Book/15/1034-use-streams-pipes-and-redirects/index.html
---
{% raw %}
# ۱۰۳.۴ استفاده از خط لوله‌ها، ورودی و خروجی‌ها

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> جریان‌های استاندارد stdin (0)، stdout (1)، stderr (2)، خط لوله |، دستور tee و xargs.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/PeUhwMoSCko" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۴

داوطلبان باید بتوانند جریان‌ها را تغییر مسیر (Redirect) دهند و آن‌ها را برای پردازش کارآمد داده‌های متنی به یکدیگر متصل کنند. این وظایف شامل تغییر مسیر ورودی استاندارد، خروجی استاندارد و خطای استاندارد، لوله کردن (Pipe) خروجی یک دستور به ورودی دستور دیگر، استفاده از خروجی یک دستور به عنوان آرگومان‌های دستور دیگر، و ارسال هم‌زمان خروجی هم به `stdout` و هم به یک فایل است.

### اهداف آموزشی

* تغییر مسیر ورودی استاندارد (`stdin`)، خروجی استاندارد (`stdout`) و خطای استاندارد (`stderr`)
* لوله کردن خروجی یک دستور به ورودی دستور دیگر
* استفاده از خروجی یک دستور به عنوان آرگومان برای دستور دیگر
* ارسال خروجی به صورت هم‌زمان هم به `stdout` و هم به یک فایل

### فهرست بخشی از فایل‌ها، اصطلاحات و ابزارهای کاربردی

<div dir="ltr">

* `tee`
* `xargs`

</div>

این قابلیت‌ها به ما کمک می‌کنند ورودی و خروجی دستورات را کنترل کنیم و کارهایی مثل ذخیره خروجی یک دستور در فایل، گرفتن ورودی یک دستور از خروجی دستور دیگر، یا جدا کردن خروجی عادی از خطاها را انجام دهیم. قبلاً هم در بخش‌های پیشین از آن‌ها استفاده کرده‌ایم، اما بیایید بیشتر یاد بگیریم و درکمان را از این مفاهیم عمیق‌تر کنیم.

## تغییر مسیر ورودی و خروجی استاندارد (Redirecting Standard I/O)

در سیستم‌های لینوکسی، بیشتر پوسته‌ها برای ورودی و خروجی از جریان‌ها (Streams) استفاده می‌کنند. این جریان‌ها می‌توانند از سمت (و به سمت) چیزهای مختلفی مثل صفحه‌کلید، دستگاه‌های بلوکی (هارددیسک، فلش USB و...)، فایل‌ها و غیره باشند.

ما ۳ جریان استاندارد مختلف داریم:

<ol start="0">
<li><b>STDIN</b> جریان ورودی استاندارد است که ورودی را برای یک دستور فراهم می‌کند.</li>
<li><b>STDOUT</b> جریان خروجی استاندارد است که شامل خروجی عادی یک دستور می‌شود.</li>
<li><b>STDERR</b> جریان خطای استاندارد است که شامل خروجی خطاهای یک دستور می‌شود.</li>
</ol>

> **نکته:** شماره‌گذاری `0`، `1` و `2` به ترتیب نشان‌دهنده ***STDIN***، ***STDOUT*** و ***STDERR*** است. برای مثال، اگر بخواهید خطای استاندارد را تغییر مسیر دهید، می‌توانید از `2>` استفاده کنید تا `STDERR` به مقصد جدید هدایت شود.

عملگرهای تغییر مسیر دیگری که می‌توانید استفاده کنید عبارت‌اند از:

| عملگر | کاربرد |
| :--- | :--- |
| `>` | تغییر مسیر `STDOUT` به یک فایل؛ در صورت وجود فایل، آن را بازنویسی می‌کند |
| `>>` | تغییر مسیر `STDOUT` به یک فایل؛ در صورت وجود فایل، به انتهای آن اضافه (Append) می‌کند |
| `2>` | تغییر مسیر `STDERR` به یک فایل؛ در صورت وجود فایل، آن را بازنویسی می‌کند |
| `2>>` | تغییر مسیر `STDERR` به یک فایل؛ در صورت وجود فایل، به انتهای آن اضافه می‌کند |
| `&>` | تغییر مسیر هم‌زمان `STDOUT` و `STDERR`؛ در صورت وجود فایل، بازنویسی می‌کند |
| `&>>` | تغییر مسیر هم‌زمان `STDOUT` و `STDERR`؛ در صورت وجود فایل، به انتها اضافه می‌کند |
| `<` | تغییر مسیر `STDIN` از یک فایل (خواندن ورودی از فایل) |
| `<>` | تغییر مسیر `STDIN` از فایل و ارسال `STDOUT` به همان فایل |

چند مثال:

```text
$ ls
bob	jack	jadi	linus	sara who_uses_what.txt
$ ls x*
ls: x*: No such file or directory
$ ls j*
jack	jadi
$ ls j* x* > output 2> errors
$ cat output
jack
jadi
$ cat errors
ls: x*: No such file or directory
$ cat who_uses_what.txt
jadi, fedora
linux, fedora
bob, ubuntu
jack, arch
sara, fedora
$ tr ' ', '' < who_uses_what.txt
tr: empty string2
$ cat who
$ tr ',', '|' < who_uses_what.txt
jadi| fedora
linux| fedora
bob| ubuntu
jack| arch
sara| fedora
```

همچنین می‌توانید از `&1`، `&2` و `&0` برای اشاره به **مقصدِ** `STDOUT`، `STDERR` و `STDIN` استفاده کنید. در این حالت `ls > file1 2>&1` یعنی *خروجی را به `file1` هدایت کن و `stderr` را هم به همان جایی بفرست که `stdout` می‌رود (یعنی `file1`)*.

> **هشدار:** مراقب ترتیب باشید! دستور `ls 2>&1 > file1` به این معناست که *ابتدا `stderr` را به مکان فعلی `stdout` (یعنی ترمینال) بفرست و سپس `stdout` را به `file1` تغییر بده*!

#### فرستادن به هیچ‌کجا (`/dev/null`)

در لینوکس، دستگاه **`/dev/null`** مثل یک سیاه‌چاله عمل می‌کند. می‌توانید هر چیزی را به آنجا بفرستید و بدون هیچ باری روی سیستم، ناپدید می‌شود. بنابراین بسیار عادی است که بنویسید:

```text
$ ls j* x* > file1
ls: x*: No such file or directory
$ ls j* x* > file1 2>/dev/null
$ cat file1
jack
jadi
```

#### Here-Documents

بسیاری از پوسته‌ها قابلیتی به نام here-documents (یا به اختصار here-docs) به عنوان روشی برای دادن ورودی دارند. از `<<` همراه با یک `WORD` استفاده می‌کنید و هر چه تایپ کنید به عنوان `stdin` در نظر گرفته می‌شود تا زمانی که در یک خط جداگانه فقط همان `WORD` را بنویسید.

```text
$ tr ' ' '.' << END_OF_DATA
> this is a line
> and then this
>
> we'll still type
> and,
> done!
> END_OF_DATA
this.is.a.line
and.then.this

we'll.still.type
and,
done!
```

> **نکته:** Here-Documentها وقتی دارید اسکریپت می‌نویسید و کارهای خودکار انجام می‌دهید، بسیار مفیدند.

### خط لوله‌ها (Pipes)

با خط لوله (`|`) می‌توانید `STDOUT`، `STDIN` و `STDERR` را بین چند دستور و همگی در یک خط فرمان به هم متصل کنید. وقتی می‌نویسید `command1 | command2`، دستور `command1` اجرا می‌شود و `STDOUT` آن به عنوان `STDIN` به دستور `command2` فرستاده می‌شود.

```text
$ cat who_uses_what.txt
jadi, fedora
linux, fedora
bob, ubuntu
jack, arch
sara, fedora
$ cut -f2 -d, who_uses_what.txt | sed -e 's/ //g' | sort  | uniq -c | sort -nr
   3 fedora
   1 ubuntu
   1 arch
```

> **نکته:** اگر نیاز دارید خط لوله خود را با محتوای یک فایل شروع کنید، یا با `cat filename | ...` شروع کنید یا از تغییر مسیر ورودی `<` استفاده نمایید.

خط لوله‌ها یکی از ویژگی‌های فوق‌العاده قدرتمند و شگفت‌انگیز دنیای یونیکس هستند. آن‌ها به شما اجازه می‌دهند با ترکیب ابزارهایی که کارهای کوچک و اتمی انجام می‌دهند، ابزارهای *جدید* بسازید.

### دستور `xargs`

ابزار `xargs` رشته‌هایی را که با فاصله، تب، خط جدید یا پایان فایل از هم جدا شده‌اند از ورودی استاندارد می‌خواند و دستور داده‌شده را با آن رشته‌ها به عنوان آرگومان اجرا می‌کند.

```text
$ ls
bob			file1			jadi			output			who_uses_what.txt
errors			jack			linus			sara
$ ls | xargs echo these are files:
these are files: bob errors file1 jack jadi linus output sara who_uses_what.txt
```

> **نکته:** اگر هیچ دستوری به `xargs` ندهید، دستور پیش‌فرض آن `echo` خواهد بود.

یکی از سوئیچ‌های رایج `-I` است. این سوئیچ زمانی کاربرد دارد که لازم باشد آرگومان‌های `stdin` را در وسط (یا حتی ابتدای) دستور خود قرار دهید. به این شکل از آن استفاده کنید: `xargs -I SOMETHING echo here is SOMETHING end`:

```text
$ cat who_uses_what.txt
jadi, fedora
linus, fedora
bob, ubuntu
jack, arch
sara, fedora
$ cat who_uses_what.txt | xargs -I DATA echo name is DATA is the choice.
name is jadi, fedora is the choice.
name is linus, fedora is the choice.
name is bob, ubuntu is the choice.
name is jack, arch is the choice.
name is sara, fedora is the choice.
```

دو سوئیچ مفید دیگر:
1. `-L 1` ورودی را بر اساس خطوط جدید می‌شکند (در هر اجرا یک خط).
2. `-n 1` به `xargs` می‌گوید پس از دریافت هر ۱ آرگومان، دستور مورد نظر را فراخوانی کند.

### دستور `tee`

مشکل تغییر مسیر (Redirection) این است که نمی‌توانید هم‌زمان پیشرفت کار دستور را در همان ترمینال ببینید. ابزار `tee` این مشکل را حل می‌کند. اگر نیاز دارید خروجی را هم روی صفحه ببینید و هم در یک فایل ذخیره کنید، `tee` دوست شماست. کافی است یک یا چند نام فایل به آن بدهید تا کارش را انجام دهد.

```text
$ ls -1 | tee allfiles myfiles
bob
errors
file1
jack
jadi
linus
output
sara
who_uses_what.txt
$ cat allfiles myfiles
bob
errors
file1
jack
jadi
linus
output
sara
who_uses_what.txt
bob
errors
file1
jack
jadi
linus
output
sara
who_uses_what.txt
```

سوئیچ `-a` در صورتی که فایل‌ها از قبل وجود داشته باشند، خروجی را به انتهای آن‌ها اضافه (Append) می‌کند.

> **نکته:** اگر لازم است ***stderr*** را هم ذخیره کنید، ابتدا آن را به ***stdout*** هدایت کنید (مثلاً `2>&1 | tee ...`).

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1034_use_streams_pipes_and_redirects.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
