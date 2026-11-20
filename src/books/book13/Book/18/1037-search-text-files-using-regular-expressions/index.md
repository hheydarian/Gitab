---
layout: layout.njk
title: "۱۰۳.۷ جستجو با عبارت‌های باقاعده (Regex)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 18
chapterSection: "موضوع ۱۰۳: دستورات گنو و یونیکس"
permalink: /books/book13/Book/18/1037-search-text-files-using-regular-expressions/index.html
---
{% raw %}
# ۱۰۳.۷ جستجو با عبارت‌های باقاعده (Regex)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> الگوهای عبارات منظم، کاراکترهای ویژه ^، $، .، *، کلاس‌های کاراکتری و جستجو با egrep.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/wa1OFZ-Ck-0" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۳

داوطلبان باید بتوانند فایل‌ها و داده‌های متنی را با استفاده از عبارت‌های باقاعده (Regular Expressions) دستکاری کنند. این هدف شامل ساخت عبارت‌های باقاعده ساده با اجزای مختلف و همچنین درک تفاوت بین عبارت‌های باقاعده پایه (Basic) و توسعه‌یافته (Extended) است. علاوه بر این، استفاده از ابزارهای عبارت باقاعده برای جستجو در فایل‌سیستم یا محتوای فایل‌ها را نیز در بر می‌گیرد.

## اهداف و ابزارهای کلیدی

* ساخت عبارت‌های باقاعده ساده با استفاده از نمادهای مختلف
* درک تفاوت بین عبارت‌های باقاعده پایه (Basic) و توسعه‌یافته (Extended)
* درک مفاهیم کاراکترهای ویژه، کلاس‌های کاراکتری (Character Classes)، تکرارگرها (Quantifiers) و لنگرها (Anchors)
* استفاده از ابزارهای عبارت باقاعده برای جستجو در فایل‌سیستم یا محتوای فایل‌ها
* استفاده از عبارت‌های باقاعده برای حذف، تغییر و جایگزینی متن

فهرست ابزارها و صفحات راهنمای مرتبط:

* `grep`
* `egrep`
* `fgrep`
* `sed`
* `regex(7)`

### عبارت باقاعده (Regex)

عبارت باقاعده یا **Regex** (مخفف Regular Expression) یک الگو است که توصیف می‌کند چه چیزی را می‌خواهید در یک متن **تطبیق (Match)** دهید و پیدا کنید. برای مثال، هم `a` و هم `ad` با رشته `jadi` تطبیق دارند. الگوی `d.` یک مثال کمی عمیق‌تر است؛ چون نقطه (`.`) به معنی **هر کاراکتری** است، پس `d.` با دو کاراکتر آخر کلمه `jadi` (یعنی `di`) مطابقت خواهد داشت. در این بخش دستور `grep` (سرواژه generalised regular expression processor) را بررسی می‌کنیم. این ابزار گویش‌ها یا لهجه‌های متفاوتی از regex را پشتیبانی می‌کند؛ به طور خلاصه عبارت‌های باقاعده پایه (Basic) و توسعه‌یافته (Extended).

#### مبانی Regex

**تطبیق ساده (Simple match)**
شما می‌توانید خیلی ساده دقیقاً همان چیزی را که می‌خواهید پیدا شود بنویسید تا regex دنبالش بگردد.

| الگو (Regex) | نمونه‌های منطبق |
| :--- | :--- |
| `a` | **a**fter, min**a**, b**a**nana, j**a**di |
| `na` | **na**rator, mi**na**, **na**nanana batman, so**na**r |

**تکرار (Repeating)**

* کاراکتر **`*`** به معنی تکرار کاراکتر قبلی به تعداد **۰ بار یا بیشتر** است.
* کاراکتر **`+`** به معنی تکرار کاراکتر قبلی به تعداد **۱ بار یا بیشتر** است.
* کاراکتر **`?`** به معنی **۰ یا ۱ بار** تکرار است.
* الگوی **`{n,m}`** یعنی مورد قبلی باید حداقل `n` بار و حداکثر `m` بار تکرار شود.

| الگو (Regex) | نمونه‌های منطبق | توضیح |
| :--- | :--- | :--- |
| `a*b` | `ab`, `aaab`, `aaaaab`, `aaabthis` | تطبیق با صفر یا چند `a` و سپس یک `b` |
| `a*b` | `b`, `sober` | در اینجا هم صفر تا `a` و بعد یک `b` داریم |
| `a+b` | `ab`, `aab`, `aaabenz` | با `sober` یا `b` تطبیق نمی‌کند، چون حتماً باید حداقل یک `a` وجود داشته باشد |
| `a?b` | `ab`, `aab`, `b`, `batman` | در `batman` صفر تا `a` و سپس `b` دیده شده است |

**انتخاب جایگزین (`|`)**

اگر بنویسید `a|b`، با `a` یا `b` تطبیق خواهد کرد.

**کلاس‌های کاراکتری (Character Classes)**

نقطه (**`.`**) یعنی هر کاراکتری. بنابراین **`..`** با هر رشته‌ای که حداقل دو کاراکتر داشته باشد تطبیق می‌کند. همچنین می‌توانید کلاس‌های دلخواه خودتان را با براکت بسازید؛ مثلاً `[abc]` با `a` یا `b` یا `c` تطبیق می‌کند و `[a-z]` هر حرفی از `a` تا `z` را شامل می‌شود.

برای اشاره به ارقام می‌توانید از `\d` نیز استفاده کنید.

> **نکته:** عبارت‌های باقاعده به بزرگی و کوچکی حروف حساس هستند (Case-sensitive).

**بازه‌ها و کلاس‌های نام‌گذاری‌شده (Ranges)**

برای کلاس‌های پرکاربرد میان‌برهایی وجود دارد. کلاس‌های نام‌گذاری‌شده با `[:` شروع شده و با `:]` تمام می‌شوند:

| بازه / کلاس | معنی |
| :--- | :--- |
| `[:alnum:]` | کاراکترهای الفبایی و عددی (حروف و ارقام) |
| `[:blank:]` | کاراکترهای فاصله (Space) و تب (Tab) |
| `[:digit:]` | ارقام ۰ تا ۹ (معادل `0-9`) |
| `[:upper:]` و `[:lower:]` | به ترتیب حروف بزرگ و حروف کوچک |
| `^` (نفی / Negation) | اگر به عنوان اولین کاراکتر بعد از `[` در یک کلاس کاراکتری بیاید، معنی بقیه کاراکترها را معکوس می‌کند (یعنی هر چیزی غیر از آن‌ها) |

> **نکته:** یکی از پرکاربردترین الگوهای regex عبارت `.*` است که با هر کاراکتری به هر طولی (حتی صفر کاراکتر) تطبیق می‌کند.

**تطبیق در موقعیت‌های مشخص (لنگرها)**

* علامت هشتک/کرت (**`^`**) به معنی ابتدای رشته (یا ابتدای خط) است.
* علامت دلار (**`$`**) به معنی انتهای رشته (یا انتهای خط) است.

#### مثال‌های نمونه

* `^a.*` — با هر چیزی که با **a** شروع شود تطبیق می‌کند.
* `^a.*b$` — با هر چیزی که با **a** شروع و به **b** ختم شود تطبیق می‌کند.
* `^a.*\d+.*b$` — با هر چیزی که با **a** شروع شود، در میانه چند رقم داشته باشد و به **b** ختم شود تطبیق می‌کند.
* `^(l|b)oo` — با هر چیزی که با **l** یا **b** شروع شده و بلافاصله بعدش **oo** بیاید تطبیق می‌کند.
* `[f-h]|[A-K]$` — آخرین کاراکتر باید از **f** تا **h** (حروف کوچک) یا **A** تا **K** (حروف بزرگ) باشد.

### دستور grep

دستور `grep` می‌تواند درون فایل‌ها جستجو کند:

```text
$ grep funk words 
Garfunkel
Garfunkel's
funk
funked
funkier
funkiest
funking
funk's
funks
funky
```

پرکاربردترین سوییچ‌های این دستور عبارت‌اند از:

| سوییچ | معنی |
| :--- | :--- |
| `-c` | فقط تعداد خطوط منطبق را نشان می‌دهد |
| `-v` | جستجو را معکوس می‌کند (خطوطی که الگو در آن‌ها **نیست**) |
| `-n` | شماره خط را هم نمایش می‌دهد |
| `-l` | فقط نام فایل‌هایی که الگو در آن‌ها پیدا شده را نمایش می‌دهد |
| `-i` | حساسیت به بزرگی و کوچکی حروف را نادیده می‌گیرد |
| `-r` | تمام فایل‌های درون هر دایرکتوری را به صورت بازگشتی (Recursive) می‌خواند |

بیایید چند مثال عملی ببینیم:

```text
$ grep a *txt
friends.txt:Rosha
friends.txt:Xavier
friends.txt:Krishna
friends.txt:Mary
my_thinkgs.txt:laptop
$ grep z *txt
$ grep z *txt -i 
friends.txt:Zee
$ grep x words -i -c 
2264
$ grep z *txt -i -l
friends.txt
$ grep Z *txt -v
friends.txt:Rosha
friends.txt:Jim
friends.txt:Xavier
friends.txt:Krishna
friends.txt:Mary
my_thinkgs.txt:laptop
my_thinkgs.txt:pillow
my_thinkgs.txt:shorts
my_thinkgs.txt:t-shirt
$ grep Z friends.txt -v
Rosha
Jim
Xavier
Krishna
Mary
$ 
```

به عنوان مثالی دیگر، بیایید تمام فایل‌های داخل `/etc` را برای یافتن آدرس‌های IP جستجو کنیم و پیام‌های خطا (که عمدتاً مربوط به نداشتن دسترسی خواندن برخی فایل‌ها است) را به `/dev/null` بفرستیم:

```text
$ egrep -r "192.168.(1|0)." /etc/ 2> /dev/null
/etc/privoxy/config:#      address 192.168.0.1 on your local private network
/etc/privoxy/config:#      (192.168.0.0) and has another outside connection with a
/etc/privoxy/config:#        listen-address  192.168.0.1:8118
/etc/avahi/hosts:# 192.168.0.1 router.local
/etc/dhcp/dhclient-exit-hooks.d/rfc3442-classless-routes:#   new_rfc3442_classless_static_routes='24 192 168 10 192 168 1 1 8 10 10 17 66 41'
/etc/dhcp/dhclient-exit-hooks.d/rfc3442-classless-routes:#   192.168.10.0/24 via 192.168.1.1
/etc/hosts:192.168.1.22 atiteltestbed
/etc/hosts:192.168.100.244 adpsms
/etc/ppp/options:# ms-dns 192.168.1.1
/etc/ppp/options:# ms-dns 192.168.1.2
/etc/ppp/options:# ms-wins 192.168.1.50
/etc/ppp/options:# ms-wins 192.168.1.51
/etc/ssl/openssl.cnf:# proxy = # set this as far as needed, e.g., http://192.168.1.1:8080
/etc/cups/cups-browsed.conf:# BrowseAllow 192.168.1.12
/etc/cups/cups-browsed.conf:# BrowseAllow 192.168.1.0/24
/etc/cups/cups-browsed.conf:# BrowseAllow 192.168.1.0/255.255.255.0
/etc/cups/cups-browsed.conf:# BrowseDeny 192.168.1.13
/etc/proxychains4.conf:## Exclude connections to 192.168.1.0/24 with port 80
/etc/proxychains4.conf:# localnet 192.168.1.0:80/255.255.255.0
/etc/proxychains4.conf:## Exclude connections to 192.168.100.0/24
/etc/proxychains4.conf:# localnet 192.168.100.0/255.255.255.0
/etc/proxychains4.conf:# localnet 192.168.0.0/255.255.0.0
/etc/proxychains4.conf:#	 	socks4	192.168.1.49	1080
/etc/sane.d/kodakaio.conf:#net 192.168.1.2 0x4041
/etc/sane.d/kodakaio.conf:#net 192.168.1.17 0x4067
/etc/sane.d/epsonds.conf:# net 192.168.1.123
/etc/sane.d/airscan.conf:#"Kyocera MFP Scanner" = http://192.168.1.102:9095/eSCL
/etc/sane.d/airscan.conf:#ip    = 192.168.0.1    ; blacklist by address
/etc/sane.d/airscan.conf:#ip    = 192.168.0.0/24 ; blacklist the whole subnet
/etc/sane.d/dell1600n_net.conf:#named_scanner: 192.168.0.20
/etc/sane.d/epson2.conf:# net 192.168.1.123
/etc/sane.d/magicolor.conf:# net 192.168.0.1
/etc/sane.d/saned.conf:#192.168.0.1
/etc/sane.d/saned.conf:#192.168.0.1/29
/etc/fwupd/redfish.conf:# ex: https://192.168.0.133:443
```

### grep توسعه‌یافته (Extended grep)

از آنجا که regex فوق‌العاده جذاب است و `grep` هم ابزار معرکه‌ای است، افراد زیادی سعی کرده‌اند قابلیت‌هایی به آن اضافه کنند یا نسخه‌های جدیدی بسازند. یکی از آن‌ها **GNU Extended grep** است. این گویش از regex نیاز چندانی به escape کردن کاراکترها (با `\`) ندارد و می‌توانید از آن با سوییچ `-E` در `grep` یا با اجرای دستور `egrep` به جای `grep` معمولی استفاده کنید. برای مثال، `|` در regex توسعه‌یافته به معنی «یا» است؛ پس می‌توانید با `egrep "a|b" words` هر خطی را که دارای `a` یا `b` باشد پیدا کنید.

### grep ثابت (Fixed grep)

اگر نیاز دارید دقیقاً دنبال یک رشته ثابت بگردید (و نمی‌خواهید به عنوان regex تفسیر شود)، از `grep -F` یا `fgrep` استفاده کنید. با این کار، دستور `fgrep this$` به دنبال انتهای خط نمی‌رود و در عوض خود رشته `this$that` را پیدا می‌کند.

### دستور sed

در درس‌های قبلی کاربرد ساده `sed` را دیدیم و حالا یک خبر خوب برایتان دارم: **`sed` هم regex را می‌فهمد!** می‌توانید از سوییچ `-r` (یا `-E`) استفاده کنید تا به `sed` بگویید از عبارت‌های باقاعده پیشرفته استفاده می‌کنیم.

```text
$ sed -r "s/(Z|R|J)/starts with ZRJ/" friends.txt 
starts with ZRJee
starts with ZRJosha
starts with ZRJim
Xavier
Krishna
Mary
```

سوییچ‌های پرکاربرد:

| سوییچ | معنی |
| :--- | :--- |
| `-r` | استفاده از عبارت‌های باقاعده توسعه‌یافته |
| `-n` | جلوگیری از چاپ خروجی پیش‌فرض؛ می‌توانید در انتهای عبارت از `p` استفاده کنید (`/something/p`) تا فقط خطوط مورد نظر چاپ شوند |

```text
sed -rn "s/happy/HAPPY/p" words 
HAPPY
slapHAPPY
unHAPPY
```

هنوز مشتاق یادگیری بیشتر هستید؟ می‌توانید ببینید چطور می‌شود بازی Wordle را هم با همین عبارت‌های باقاعده حل کرد!

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1037_search_text_files_using_regular_expressions.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
