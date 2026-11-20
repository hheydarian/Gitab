---
layout: layout.njk
title: "۱۰۳.۲ پردازش جریان‌های متنی با فیلترها"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 13
chapterSection: "موضوع ۱۰۳: دستورات گنو و یونیکس"
permalink: /books/book13/Book/13/1032-process-text-streams-using-filters/index.html
---
{% raw %}
# ۱۰۳.۲ پردازش جریان‌های متنی با فیلترها

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> ابزارهای قدرتمند cat، cut، grep، head، tail، sort، uniq، wc، tr و sed.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/2mTH7HbErh8" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۲

داوطلبان باید بتوانند فیلترها را روی جریان‌های متنی اعمال کنند.

### اهداف آموزشی

ارسال فایل‌های متنی و جریان‌های خروجی از میان فیلترهای ابزارهای متنی برای تغییر خروجی با استفاده از دستورات استاندارد یونیکس که در بسته `GNU textutils` یافت می‌شوند.

### فهرست بخشی از فایل‌ها، اصطلاحات و ابزارهای کاربردی

<div dir="ltr">

* `bzcat`
* `cat`
* `cut`
* `head`
* `less`
* `md5sum`
* `nl`
* `od`
* `paste`
* `sed`
* `sha256sum`
* `sha512sum`
* `sort`
* `split`
* `tail`
* `tr`
* `uniq`
* `wc`
* `xzcat`
* `zcat`

</div>

## جریان‌ها (Streams)

در دنیای **یونیکس** بخش بزرگی از داده‌ها به شکل متن (TEXT) هستند؛ از فایل‌های لاگ گرفته تا تنظیمات و داده‌ها و غیره. **فیلتر کردن** این داده‌ها یعنی گرفتن یک جریان ورودی از متن و انجام نوعی تبدیل روی آن پیش از فرستادن به جریان خروجی. در این فضا، یک **جریان (Stream)** چیزی نیست جز *«دنباله‌ای از بایت‌ها که می‌توان آن‌ها را با استفاده از توابع کتابخانه‌ای خواند یا نوشت، به طوری که جزئیات دستگاهِ زیربنایی از دید برنامه پنهان بماند»*.

به زبان ساده، یک جریان متنی ورودیِ متنی از صفحه‌کلید، یک فایل، یک دستگاه شبکه و امثال آن است که می‌توان آن را با ابزارهای متنی دید، تغییر داد، بررسی کرد و غیره.

محیط‌های برنامه‌نویسی و پوسته‌های امروزی (از جمله `bash`) از سه جریان استاندارد ورودی/خروجی استفاده می‌کنند:

* **`stdin`** جریان ورودی استاندارد است که ورودی را به دستورات می‌دهد.
* **`stdout`** جریان خروجی استاندارد است که خروجی دستورات را نمایش می‌دهد.
* **`stderr`** جریان خطای استاندارد است که خروجی خطاهای دستورات را نمایش می‌دهد.

اینجا درباره **`stdin`** و مشاهده یا دستکاری آن با دستورات و ابزارهای مختلف صحبت می‌کنیم. درباره این جریان‌ها و نحوه ترکیب دستورات برای *لوله کردن* (PIPE) ورودی و خروجی دستورات به یکدیگر، در [فصل ۱۰۳.۴](/Gitab/books/book13/Book/15/1034-use-streams-pipes-and-redirects/) بیشتر خواهید دید.

## دستورات مشاهده متن

### دستور `cat`

این دستور به سادگی جریان ورودی‌اش (یا نام فایلی که به آن می‌دهید) را در خروجی چاپ می‌کند؛ همان‌طور که در بخش قبلی دیدید. مثل بیشتر دستورات، اگر ورودی به آن ندهید، داده را از صفحه‌کلید می‌خواند.

```text
jadi@funlife:~/w/lpic/101$ cat > mydata
test
this is the second line
bye
jadi@funlife:~/w/lpic/101$ cat mydata
test
this is the second line
bye
```

> **نکته:** هنگام وارد کردن ورودی از طریق صفحه‌کلید، فشردن `Ctrl+d` جریان را به پایان می‌رساند.

همچنین می‌توانید بیش از یک نام فایل ورودی به آن بدهید:

```text
jadi@funlife:~/w/lpic/101$ cat mydata directory_data
test
this is the second line
bye
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 12
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 62
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 neda
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 jadi
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 you
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:34 amir
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:37 directory_data
```

برخی سوئیچ‌های رایج `cat` عبارت‌اند از: `-n` برای نمایش شماره خطوط، `-s` برای ادغام خطوط خالی پشت سر هم، `-T` برای نمایش کاراکترهای تب، و `-v` برای نمایش کاراکترهای غیرقابل چاپ.

### دستورات `bzcat`، `xzcat`، `zcat` و `gzcat`

این دستورات برای `cat` کردن مستقیم فایل‌های فشرده‌شده با `bz`، `xz`، `Z` و `gz` به کار می‌روند. این ابزارها به شما اجازه می‌دهند محتوای فایل‌های فشرده را بدون نیاز به خارج کردن آن‌ها از حالت فشرده ببینید.

### دستور `less`

یک ابزار قدرتمند برای مشاهده فایل‌های متنی بزرگ است. می‌تواند صفحه‌بندی کند، جست‌وجو انجام دهد و در فایل‌های متنی جابه‌جا شود.

> **نکته:** دستور دیگری به نام `more` هم وجود دارد که بیشتر برای افرادی آشناست که از محیط داس (DOS) می‌آیند و در دنیای لینوکس خیلی رایج نیست. از آن استفاده نکنید. یادتان باشد: `less` از `more` بیشتر و بهتر است! (`less is more than more`).

برخی کلیدهای پرکاربرد در محیط `less` در جدول زیر آمده‌اند:

| دستور | کاربرد |
| :--- | :--- |
| `q` | خروج |
| `/foo` | جست‌وجوی عبارت `foo` |
| `n` | مورد بعدی (در جست‌وجو) |
| `N` | مورد قبلی (در جست‌وجو) |
| `?foo` | جست‌وجوی رو به عقب برای عبارت `foo` |
| `G` | رفتن به انتهای فایل |
| `nG` | رفتن به خط شماره `n` |
| `PageUp`, `PageDown`, `UpArrow`, `DownArrow` | خودتان حدس بزنید! |

### دستور `od`

این دستور محتوای فایل‌ها را *dump* می‌کند (یعنی فایل‌ها را در قالب‌هایی غیر از متن نمایش می‌دهد). رفتار عادی آن OctalDump (نمایش در مبنای ۸) است:

```text
jadi@funlife:~/w/lpic/101$ od mydata
0000000 062564 072163 072012 064550 020163 071551 072040 062550
0000020 071440 061545 067543 062156 066040 067151 005145 074542
0000040 005145
0000042
```

این خروجی برای آدم‌های معمولی خیلی خوانا نیست. بیایید از چند سوئیچ استفاده کنیم:

* **`-t`** مشخص می‌کند خروجی با چه قالبی چاپ شود:
  - `-t a` برای نمایش کاراکترهای نام‌دار
  - `-t c` برای نمایش کاراکترهای Escape شده
  - می‌توانید دو مورد بالا را به صورت خلاصه‌تر به شکل `-a` و `-c` هم بنویسید.
* **`-A`** برای انتخاب نحوه نمایش ستون آدرس (Offset):
  - `-A d` برای ده‌دهی (Decimal)
  - `-A o` برای هشت‌تایی (Octal)
  - `-A x` برای شانزده‌شانزدهی (Hex)
  - `-A n` برای عدم نمایش (None)

> **نکته:** دستور `od` برای پیدا کردن مشکلات فایل‌های متنی بسیار مفید است؛ مثلاً اینکه بفهمید آیا از تب استفاده کرده‌اید یا کاراکتر پایان خط (Line Ending) فایل درست است یا نه.

## انتخاب بخش‌هایی از فایل‌ها

### دستور `split`

فایل‌ها را تکه‌تکه می‌کند. این دستور برای انتقال فایل‌های بسیار بزرگ روی رسانه‌های کوچک‌تر فوق‌العاده کاربردی است (مثلاً تقسیم یک فایل ۳ ترابایتی به بخش‌های ۸ گیگابایتی و انتقال آن‌ها به ماشین دیگر با یک فلش USB).

```text
jadi@funlife:~/w/lpic/101$ cat mydata
hello
this is the second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
jadi@funlife:~/w/lpic/101$ ls
mydata
jadi@funlife:~/w/lpic/101$ split -l 2 mydata
jadi@funlife:~/w/lpic/101$ ls
mydata    xaa  xab  xac  xad  xae
jadi@funlife:~/w/lpic/101$ cat xab
but as you can see we are
still writing
```

* به صورت پیش‌فرض، `split` از نام‌های `xaa`، `xab`، `xac` و ... برای فایل‌های خروجی استفاده می‌کند. می‌توانید با `split -l 2 mydata output` این پیشوند را تغییر دهید تا فایل `mydata` به فایل‌های `outputaa`، `outputab` و ... با ۲ خط در هر فایل تقسیم شود.
* سوئیچ `-l 2` در هر فایل ۲ خط می‌گذارد. می‌توانید از `-b 42` برای تقسیم بر اساس هر ۴۲ بایت، یا حتی از `-n 5` برای اجبار به تولید ۵ فایل خروجی استفاده کنید.
* اگر خروجی عددی (`x00`، `x01` و ...) می‌خواهید، از گزینه `-d` استفاده کنید.

> **نکته:** نیاز دارید این فایل‌ها را دوباره به هم بچسبانید؟ با دستور `cat x* > originalfile` آن‌ها را با `cat` ترکیب کنید.

### دستورات `head` و `tail`

ابتدا (`head`) یا انتهای (`tail`) فایل‌های متنی را نشان می‌دهند. به صورت پیش‌فرض ۱۰ خط نمایش می‌دهند، اما می‌توانید با `-n20` یا `-20` تعداد آن را تغییر دهید.

> **نکته:** دستور `tail -f` خطوط جدیدی را که در انتهای فایل نوشته می‌شوند به صورت زنده دنبال می‌کند و نمایش می‌دهد. بسیار کاربردی است.

### دستور `cut`

دستور `cut` یک یا چند ستون را از یک فایل *جدا می‌کند* (برش می‌زند). برای جداسازی فیلدها عالی است:

بیایید *فیلد اول* یک فایل را جدا کنیم.

```text
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ cut -f1 howcool
jadi
sina
rubic
you
```

> **نکته:** جداکننده (Delimiter) پیش‌فرض کاراکتر `TAB` است. برای تغییر آن به کاراکتر `x` از `-dx` و برای تغییر آن به فاصله (Space) از `-d' '` استفاده کنید.

همچنین می‌توان فیلدهای ۱، ۲ و ۳ را با `-f1-3` برش زد، یا فقط کاراکترهای شماره ۴، ۵، ۷ و ۸ از هر خط را با `-c4,5,7,8` استخراج کرد.

## تغییر و اصلاح جریان‌ها

### دستور `nl`

این دستور برای نمایش شماره خطوط به کار می‌رود.

```text
jadi@funlife:~/w/lpic/101$ nl mydata  | head -3
     1    hello
     2    this is the second line
     3    but as you can see we are
```

> **نکته:** دستور `cat -n` هم خطوط را شماره‌گذاری می‌کند.

### دستورات `sort` و `uniq`

دستور `sort` ورودی (یا ورودی‌های) خود را مرتب می‌کند.

```text
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ sort howcool uses
jadi    5
jadi ubuntu
neda mac
rubic    2
rubic windows
sina    6
you     12
```

اگر مرتب‌سازی معکوس می‌خواهید، از سوئیچ `-r` استفاده کنید.

> **نکته:** اگر می‌خواهید *به صورت عددی* مرتب کنید (مثلاً ۹ کوچک‌تر از ۱۹ در نظر گرفته شود)، از `-n` استفاده کنید.

و دستور `uniq` موارد تکراری را از ورودی حذف می‌کند. رفتار عادی آن حذف خطوط تکراری مجاور است، اما می‌توانید رفتارش را تغییر دهید؛ مثلاً سوئیچ `-f1` آن را وادار می‌کند که فیلد اول را بررسی نکند.

```text
jadi@funlife:~/w/lpic/101$ uniq what_i_have.txt
laptop
socks
tshirt
ball
socks
glasses
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt | uniq
ball
glasses
laptop
socks
tshirt
jadi@funlife:~/w/lpic/101$
```

> **نکته:** همان‌طور که می‌بینید، برای اینکه `uniq` درست کار کند، ورودی **باید** از قبل مرتب (Sort) شده باشد.

دستور `uniq` سوئیچ‌های خیلی خوبی هم دارد:

```text
jadi@funlife:~/w/lpic/101$ cat what_i_have.txt
laptop
socks
tshirt
ball
socks
glasses
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt  | uniq -c  #show count of each item
      1 ball
      1 glasses
      1 laptop
      2 socks
      1 tshirt
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt  | uniq -u #show only non-repeated items
ball
glasses
laptop
tshirt
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt  | uniq -d #show only repeated items
socks
```

## دستور `paste`

دستور `paste` خطوط دو یا چند فایل را کنار هم می‌چسباند! این کار را با یک ویرایشگر متنی معمولی نمی‌توانید به راحتی انجام دهید.

```text
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ paste howcool uses
jadi    5    you fedora
sina    6    jadi ubuntu
rubic    2    rubic windows
you     12    neda mac
```

### دستور `tr`

دستور `tr` کاراکترهای موجود در جریان را *ترجمه/جایگزین* (`translate`) می‌کند. مثلاً `tr 'ABC' '123'` در جریان ورودی، `A` را با `1`، `B` را با `2` و `C` را با `3` جایگزین می‌کند. این دستور یک فیلتر خالص است و نام فایل ورودی را به عنوان آرگومان نمی‌پذیرد. در صورت نیاز می‌توانید خروجی `cat` را به آن Pipe کنید (ببینید: [فصل ۱۰۳.۴](/Gitab/books/book13/Book/15/1034-use-streams-pipes-and-redirects/)).

```text
jadi@funlife:~/w/lpic/101$ cat mydata
hello
this is the second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
jadi@funlife:~/w/lpic/101$ cat mydata | tr 'and' 'AND'
hello
this is the second liNe
but As you cAN see we Are
still writiNg
AND this is gettiNg loNger
.
.
AND loNger
AND loNger!
```

> **نکته:** تمام حرف‌های **`'a'`** با **`'A'`** جایگزین شده‌اند (جایگزینی کاراکتر به کاراکتر است، نه کلمه به کلمه).

### دستور `sed`

`sed` مخفف **s**tream **ed**itor (ویرایشگر جریان) است. بسیار قدرتمند است و کارهایی انجام می‌دهد که دست‌کمی از جادو ندارد! مثل بیشتر ابزارهایی که تا الان دیدیم، `sed` هم می‌تواند به عنوان فیلتر کار کند و هم ورودی را از فایل بگیرد. `sed` ابزار فوق‌العاده‌ای برای جایگزینی متن با استفاده از **عبارات باقاعده (Regular Expressions)** است. اگر می‌خواهید در هر خط از یک جریان فقط اولین وقوع `A` را با `B` جایگزین کنید، دستور `sed 's/A/B/'` را بزنید:

```text
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ sed 's/ubuntu/debian/' uses
you fedora
jadi debian
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$
```

الگو برای تغییر **تمام** وقوع‌های `A` به `B` در یک خط به صورت `sed 's/A/B/g'` است.

کاراکترهای Escape را یادتان هست؟ اینجا هم کار می‌کنند و مثال زیر هر فاصله را در فایل با یک کاراکتر تب جایگزین می‌کند:

```text
jadi@funlife:~/w/lpic/101$ cat mydata
hello
this is the second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
jadi@funlife:~/w/lpic/101$ sed 's/ /\t/g' mydata > mydata.tab
jadi@funlife:~/w/lpic/101$ cat mydata.tab
hello
this    is the second    line
but    as    you    can    see    we    are
still    writing
and    this    is    getting    longer
.
.
and    longer
and    longer!
```

## گرفتن آمار از متن

### دستور `wc`

`wc` مخفف *word count* است. تعداد خطوط، کلمات و بایت‌های موجود در جریان ورودی را می‌شمارد.

```text
jadi@funlife:~/w/lpic/101$ wc mydata
  9  25 121 mydata
```

> **نکته:** استفاده از سوئیچ `-l` برای شمردن تعداد خطوط بسیار رایج است.

### علامت `-`

باید بدانید اگر به جای نام فایل علامت `-` بگذارید، داده‌ها از Pipe (یا ورودی استاندارد صفحه‌کلید) جایگزین آن می‌شوند.

```text
jadi@funlife:~/w/lpic/101$ wc -l mydata | cat mydata - mydata  
hello
this is the second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
9 mydata
hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
```

## درهم‌سازی (Hashing)

تابع هش (Hash Function) تابعی است که می‌تواند داده‌هایی با اندازه دلخواه را به مقادیری با اندازه ثابت نگاشت کند. هش‌های مختلفی وجود دارند و ما برای اهداف گوناگونی از آن‌ها استفاده می‌کنیم. برای مثال، یک سایت ممکن است رمز عبور شما را در پایگاه داده خود هش کند تا امن بماند (و هنگام لاگین، هش رمز واردشده را با هشی که از قبل در دیتابیس دارد مقایسه کند)، یا سایتی ممکن است هش یک فایل را ارائه دهد تا مطمئن شوید فایل درست و بدون تغییر را دانلود کرده‌اید و مواردی از این دست.

الگوریتم‌های هش که در آزمون LPIC-1 پوشش داده می‌شوند عبارت‌اند از:

<div dir="ltr">

- `md5sum`
- `sha256sum`
- `sha512sum`

</div>

می‌توانید هش هر فایل (یا جریان ورودی) را به شکل زیر بررسی کنید:

```text
jadi@ocean:~$ md5sum /tmp/myfile.txt
8183aa57a23658efe7ba7aebe60816bc  /tmp/myfile.txt
jadi@ocean:~$ sha256sum /tmp/myfile.txt
7ddcfda184b55ee06b0c81e0ad136b1aa4a86daeb1078bcaeccc246eb2c8693b  /tmp/myfile.txt
jadi@ocean:~$ sha512sum /tmp/myfile.txt
79e5d789528e5e55fc1bddcb381afd56e896b1b452347a76777fb38d76c9754278700036f35df2a53c4d53d3e3623538a8b9ed155a3fd5275e667bdbf3c0b359  /tmp/myfile.txt
```

همان‌طور که می‌بینید، `sha512sum` هش طولانی‌تری می‌سازد که امن‌تر است.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1032_process_text_streams_using_filters.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
