---
layout: layout.njk
title: "۱۰۳.۳ مدیریت مقدماتی فایل‌ها و شاخه‌ها"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 14
chapterSection: "موضوع ۱۰۳: دستورات گنو و یونیکس"
permalink: /books/book13/Book/14/1033-perform-basic-file-management/index.html
---
{% raw %}
# ۱۰۳.۳ مدیریت مقدماتی فایل‌ها و شاخه‌ها

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> دستورات cp، mv، rm، mkdir، tar، gzip، bzip2، xz و مدیریت آرشیوها.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/lTnkGg9o6u0" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۴

داوطلبان باید بتوانند از دستورات پایه لینوکس برای مدیریت فایل‌ها و دایرکتوری‌ها استفاده کنند.

### اهداف آموزشی

* کپی، جابه‌جایی و حذف فایل‌ها و دایرکتوری‌ها به صورت تکی
* کپی کردن چند فایل و دایرکتوری به صورت بازگشتی (Recursive)
* حذف فایل‌ها و دایرکتوری‌ها به صورت بازگشتی
* استفاده از الگوهای ساده و پیشرفته وایلدکارد (Wildcard) در دستورات
* استفاده از `find` برای پیدا کردن و اعمال عملیات روی فایل‌ها بر اساس نوع، اندازه یا زمان
* کاربرد دستورات `tar`، `cpio` و `dd`

### فهرست بخشی از فایل‌ها، اصطلاحات و ابزارهای کاربردی

<div dir="ltr">

- `cp`
- `find`
- `mkdir`
- `mv`
- `ls`
- `rm`
- `rmdir`
- `touch`
- `tar`
- `cpio`
- `dd`
- `file`
- `gzip`
- `gunzip`
- `bzip2`
- `bunzip2`
- `xz`
- `unxz`
- file globbing

</div>

### کاراکترهای جایگزین (Wildcards) و File Globbing

قابلیت File globbing در شل به شما اجازه می‌دهد چیزهایی مثل این‌ها را بیان کنید:
- همه فایل‌ها
- هر چیزی که با `A` شروع می‌شود
- تمام فایل‌هایی که نام ۳ حرفی دارند و به `A`، `B` یا `C` ختم می‌شوند
- و غیره...

برای این کار لازم است با این کاراکترها آشنا باشید:

* `*` به معنای **هر رشته‌ای** (با هر طولی، حتی خالی)
* `?` به معنای هر تک کاراکتر
* `[ABC]` منطبق با `A`، `B` یا `C`
* `[a-k]` منطبق با `a`، `b`، `c`، ... تا `k` (هم حروف کوچک و هم حروف بزرگ)
* `[0-9a-z]` منطبق با همه ارقام و حروف
* `[!x]` به معنای هر چیزی غیر از `x`

با دانستن این‌ها می‌توانید الگوهای خودتان را بسازید. برای مثال:

| دستور | معنا |
| :--- | :--- |
| `rm *` | حذف تمام فایل‌های داخل این دایرکتوری |
| `ls A*B` | نمایش تمام فایل‌هایی که با `A` شروع و به `B` ختم می‌شوند |
| `cp ???.* /tmp` | کپی کردن تمام فایل‌هایی که نام ۳ کاراکتری، سپس یک نقطه و بعد هر چیز دیگری (حتی هیچ‌چیز) دارند به `/tmp` |
| `rmdir [a-z]*` | حذف تمام دایرکتوری‌های خالی که با یک حرف شروع می‌شوند |

### دستورات عمومی

#### فهرست‌گیری با `ls`

دستور `ls` برای فهرست کردن (*list*) دایرکتوری‌ها و فایل‌ها به کار می‌رود. می‌توانید مسیر مطلق یا نسبی به آن بدهید؛ اگر مسیری ندهید، دایرکتوری جاری (`.`) به عنوان هدف در نظر گرفته می‌شود.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
```

> **نکته:** فیلد اول مشخص می‌کند که آیا این مورد یک فایل (`-`) است یا یک دایرکتوری (`d`).

برخی سوئیچ‌های رایج عبارت‌اند از:

* `-l` برای نمایش طولانی (*long*) با اطلاعات بیشتر برای هر فایل
* `-1` در هر خط فقط یک فایل چاپ می‌کند
* `-t` بر اساس زمان آخرین تغییر مرتب می‌کند
* `-r` ترتیب مرتب‌سازی را برعکس می‌کند (بنابراین `-tr` زمان را معکوس مرتب می‌کند تا فایل‌های جدیدتر پایین‌تر باشند)

> **نکته:** می‌توانید سوئیچ‌ها را با هم ترکیب کنید. یک ترکیب معروف `-ltrh` است (جزئیات کامل + حجم خوانا برای انسان + ترتیب زمانی معکوس).

### کپی (`cp`)، جابه‌جایی (`mv`) و حذف (`rm`)

#### دستور `cp`

این دستور فایل‌ها را از یک مکان/نام به مکان/نام دیگری *کپی* می‌کند. اگر مقصد یک دایرکتوری باشد، تمام مبدأها به داخل آن کپی می‌شوند.

```bash
cp source destination
```

یک سوئیچ رایج `-r` (یا `-R`) است که کپی را به صورت بازگشتی (دایرکتوری‌ها و تمام محتویاتشان) انجام می‌دهد. پس برای کپی کردن دایرکتوری `A` به `/tmp/` می‌توانید دستور `cp -r A /tmp/` را بزنید.

#### دستور `mv`

فایل‌ها یا دایرکتوری‌ها را *جابه‌جا* یا *تغییر نام* می‌دهد. رفتارش شبیه دستور `cp` است. اگر فایلی را روی همان فایل‌سیستم جابه‌جا کنید، شماره **inode** آن تغییر نمی‌کند.

به طور کلی:

* اگر مقصد یک دایرکتوری موجود باشد، تمام مبدأها به داخل آن منتقل می‌شوند.
* اگر دایرکتوری مقصد وجود نداشته باشد، مبدأ باید فقط یک دایرکتوری باشد تا به نام دایرکتوری مقصد تغییر نام یابد.
* اگر مقصد یک فایل باشد، مبدأ باید فقط یک فایل باشد تا تغییر نام انجام شود.

این‌ها شاید شبیه «فرمول» به نظر برسند، ولی کاملاً منطقی و بدیهی هستند!

#### دستور `rm`

**فایل‌ها** را حذف می‌کند. می‌توانید این کار را با سوئیچ `-r` به صورت بازگشتی انجام دهید یا حتی با سوئیچ `-f` (مخفف force) از پرسیدن تأییدیه جلوگیری کنید. بنابراین `rm -rf /` به معنای *حذف همه‌چیز از روی کل فایل‌سیستم* است!

**نکات مهم:**

در حالت عادی، دستور `cp` روی یک کپی موجود بازنویسی می‌کند (اگر فایل مقصد قابل نوشتن باشد). از طرف دیگر، `mv` در صورتی که مقصد وجود داشته باشد فایل را جابه‌جا یا تغییر نام نمی‌دهد، هرچند این موضوع به شدت به تنظیمات سیستم شما بستگی دارد. اما در همه حالات، می‌توانید با سوئیچ `-f` بر این محدودیت غلبه کنید.

* `-f` (`--force`) باعث می‌شود `cp` تلاش کند مقصد را بازنویسی کند.
* `-i` (`--interactive`) پیش از حذف یا بازنویسی سؤال بله/خیر (Y/N) می‌پرسد.
* `-b` (`--backup`) از فایل‌هایی که بازنویسی می‌شوند نسخه پشتیبان می‌گیرد.
* `-p` ویژگی‌ها و مشخصات فایل را *حفظ* می‌کند.

### ساختن (`mkdir`) و حذف کردن (`rmdir`) دایرکتوری‌ها

دستور `mkdir` دایرکتوری می‌سازد.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ mkdir new_dir
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 04:44 note_to_self
drwxrwxr-x 2 jadi jadi 4.0K Aug 14 04:57 new_dir
```

اگر می‌خواهید درختی از دایرکتوری‌های تودرتو بسازید، می‌توانید از سوئیچ `-p` استفاده کنید تا به `mkdir` بگویید در صورت نیاز، دایرکتوری‌های *والد* (parent) را هم بسازد:

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 04:44 note_to_self
drwxrwxr-x 2 jadi jadi 4.0K Aug 14 04:57 new_dir
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ mkdir -p 1/2/3 
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ tree
.
├── 1
│   └── 2
│       └── 3
├── data.txt
├── info.txt
├── new_dir
├── note_to_self
└── tasks.txt
```

اگر بخواهید دایرکتوری‌ای را حذف کنید، دستور آن `rmdir` است و اینجا هم می‌توانید برای حذف مسیرهای تودرتو از `-p` استفاده کنید:

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ rmdir -p 1/2/3
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ rmdir new_dir
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ tree
.
├── data.txt
├── info.txt
├── note_to_self
└── tasks.txt

0 directories, 4 files
```

> **نکته:** اگر از `rmdir` برای حذف یک دایرکتوری استفاده می‌کنید، آن دایرکتوری **حتماً باید خالی باشد**! به همین دلیل است که خیلی‌ها برای پاک کردن دایرکتوری‌های غیرخالی و هر چه داخلشان هست از `rm -rf directory_name` استفاده می‌کنند.

#### دستور `touch`

دستور `touch` یک فایل خالی می‌سازد (اگر از قبل وجود نداشته باشد) یا تاریخ **آخرین تغییر (Modification)** آن را در صورت وجود داشتن به‌روز می‌کند. زمان پیش‌فرض، *هم‌اکنون* است، اما می‌توانید زمان‌های دیگری را هم مشخص کنید.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ touch new_file
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
-rw-rw-r-- 1 jadi jadi   0 Aug 14 05:08 new_file
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ touch note_to_self
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi   0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi 116 Aug 14 05:08 note_to_self
```

یا می‌توانید زمان مشخصی بدهید. امکان دارد از `-d` استفاده کرده و تاریخ بدهید، یا از `-t` استفاده کرده و برچسب زمانی را در قالب `[[CC]YY]MMDDhhmm[.ss]` وارد کنید:

```text
$ touch -t 200908121510.59 file1
$ touch -d 11am file2
$ touch -d "last fortnight" file3
$ touch -d "yesterday 6am" file4
$ touch -d "2 days ago 12:00" file5
$ touch -d "tomorrow 02:00" file6
$ touch -d "5 Nov" file3
$ ls -ltrh file?
-rw-rw-r-- 1 jadi jadi 0 Aug 12  2009 file1
-rw-rw-r-- 1 jadi jadi 0 Aug 12 12:00 file5
-rw-rw-r-- 1 jadi jadi 0 Aug 13 06:00 file4
-rw-rw-r-- 1 jadi jadi 0 Aug 14  2022 file2
-rw-rw-r-- 1 jadi jadi 0 Aug 15  2022 file6
-rw-rw-r-- 1 jadi jadi 0 Nov  5  2022 file3
```

اوه... و حتی می‌توانید با سوئیچ `-r` (مخفف `--reference`) از زمان یک فایل دیگر برای تنظیم زمان فایل استفاده کنید:

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -l /etc/debian_version
-rw-r--r-- 1 root root 13 Aug 22  2021 /etc/debian_version
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ touch -r /etc/debian_version file1
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi   0 Aug 22  2021 file1
```

#### دستور `file`

برای تشخیص نوع یک فایل باید از دستور `file` استفاده کنید. این دستور به *درون* فایل نگاه می‌کند و نوع آن را تشخیص می‌دهد.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ file file1
file1: empty
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ file note_to_self
note_to_self: ASCII text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ file /bin/bash
/bin/bash: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=33a5554034feb2af38e8c75872058883b2988bc5, for GNU/Linux 3.2.0, stripped
```

> **نکته:** سوئیچ `-i` فرمت MIME فایل را چاپ می‌کند.

#### دستور `dd`

دستور `dd` داده‌ها را از ورودی خود به خروجی‌اش (مثلاً فایل‌ها یا دستگاه‌ها) کپی می‌کند. می‌توانید از آن درست مثل یک دستور کپی استفاده کنید:

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ dd if=note_to_self of=new_file
0+1 records in
0+1 records out
116 bytes copied, 0.00141561 s, 81.9 kB/s
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ cat new_file
I will continue learning... and if I get confused, I'll repeat the last section once more till everything is clear!
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$
```

* `if` فایل ورودی (Input File) است.
* `of` فایل خروجی (Output File) است.

اما معمولاً از آن برای خواندن و نوشتن از روی دستگاه‌های بلوکی (Block Devices) استفاده می‌کنند. برای مثال، دستور زیر تمام سکتورهای `/dev/sda` را می‌خواند و در فایلی به نام `backup.dd` می‌نویسد. بعداً می‌توانید با جابه‌جا کردن `if` و `of` و نوشتن از `backup.dd` به دیسک، این نسخه پشتیبان را برگردانید:

```text
# dd if=/dev/sda of=backup.dd bs=4096
```

یا حتی به صورت فشرده:

```text
# dd if=/dev/sda2 | gzip > backup.dd.gzip
```

کاربرد رایج دیگر آن ساخت فایل‌هایی با اندازه مشخص است:

```text
$ dd if=/dev/zero of=1g.bin bs=1G count=1
```

یا حتی *نوشتن* فایل‌های ISO روی یک فلش USB برای داشتن یک فلش زنده قابل بوت (Live Bootable USB):

```text
$ sudo dd if=ubuntu.iso of=/dev/sdc bs=2048
```

> **هشدار:** اینجا دارید مستقیماً روی یک دستگاه بلوکی می‌نویسید. اگر اشتباهی بکنید... دیسکتان را خراب می‌کنید و مجبور به فرمت کردن مجدد آن خواهید شد.

#### دستور `find`

دستور `find` به ما کمک می‌کند فایل‌ها را بر اساس معیارهای مختلف پیدا کنیم. به این نمونه نگاه کنید:

```text
$ find . -iname "[a-j]*"
./howcool.sort
./alldata
./mydir/howcool.sort
./mydir/newDir/insideNew
./howcool
```

* پارامتر اول می‌گوید کجا باید جست‌وجو کنیم (شامل زیرشاخه‌ها هم می‌شود).
* سوئیچ `-name` معیار نام را مشخص می‌کند (اینجا `iname` یعنی جست‌وجو بدون حساسیت به بزرگی و کوچکی حروف؛ `z` با `Z` برابر است).

یک سوئیچ رایج دیگر `-type` است برای مشخص کردن نوعی که دنبالش هستیم (`f` برای فایل‌های معمولی، `d` برای دایرکتوری‌ها و `l` برای لینک‌های نمادین):

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ find . -type d -iname "[a-j]*"
./directory
./directory/innder_one
```

اگر می‌خواهید بر اساس اندازه فایل جست‌وجو کنید، مطابق جدول زیر عمل کنید:

| دستور | معنا |
| :--- | :--- |
| `-size 100c` | فایل‌هایی که دقیقاً ۱۰۰ بایت/کاراکتر هستند (برای بلوک می‌توانید از `b` هم استفاده کنید) |
| `-size +100k` | فایل‌هایی که بزرگ‌تر از ۱۰۰ کیلوبایت هستند |
| `-size -20M` | فایل‌هایی که کوچک‌تر از ۲۰ مگابایت هستند |
| `-size +2G` | فایل‌هایی که بزرگ‌تر از ۲ گیگابایت هستند |

بنابراین دستور زیر تمام فایل‌هایی را که به `tmp` ختم می‌شوند و اندازه‌شان بین ۱ مگابایت تا ۱۰۰ مگابایت است، در دایرکتوری `/var/` پیدا می‌کند:

```text
find /var -iname '*tmp' -size +1M -size -100M
```

> **نکته:** تمام فایل‌های خالی را می‌توانید با `find . -size 0b` یا `find . -empty` پیدا کنید.

معیار جست‌وجوی مفید دیگر، زمان است. در ادامه برخی از گزینه‌های آن را می‌بینید:

| سوئیچ | معنا | مثال |
| :--- | :--- | :--- |
| `-amin` | دقیقه دسترسی (Access Minutes) | `-amin 40` یعنی «فایل‌هایی که دقیقاً ۴۰ دقیقه پیش دسترسی داشته‌اند»، `-amin +40` بیش از ۴۰ دقیقه پیش، و `-amin -40` کمتر از ۴۰ دقیقه پیش |
| `-cmin` | دقیقه تغییر وضعیت (Status Change Min) | `-cmin +60` فایل‌هایی که وضعیتشان بیش از یک ساعت پیش تغییر کرده |
| `-mmin` | دقیقه ویرایش (Modified Minutes) | `-mmin -60` فایل‌هایی را می‌دهد که در یک ساعت گذشته ویرایش شده‌اند |
| `-atime` | زمان دسترسی بر حسب روز | `-atime +1` یعنی فایل‌هایی که بیش از ۱ روز پیش (یعنی ۲ روز و بیشتر) به آن‌ها دسترسی شده |
| `-ctime` | تغییر وضعیت بر حسب روز | |
| `-mtime` | زمان ویرایش بر حسب روز | |
| `-newer` | جدیدتر از فایل مرجع | `-newer file1` فایل‌هایی را برمی‌گرداند که از `file1` جدیدترند |

> **نکته:** اگر سوئیچ `-daystart` را به `-mtime` یا `-atime` اضافه کنید، به این معناست که می‌خواهیم روزها را بر اساس روز تقویمی (شروع از نیمه‌شب) حساب کنیم.

#### انجام عملیات روی فایل‌های پیداشده

با سوئیچ‌های مختلفی می‌توانیم روی فایل‌های پیداشده دستوری اجرا کنیم یا کاری انجام دهیم:

| سوئیچ | معنا |
| :--- | :--- |
| `-ls` | روی هر فایل دستور `ls -dils` را اجرا می‌کند |
| `-print` | نام کامل فایل‌ها را در هر خط چاپ می‌کند |

اما بهترین راه برای اجرای دستورات روی فایل‌های پیداشده، سوئیچ `-exec` است. می‌توانید با `'{}'` یا `{}` به فایل اشاره کنید و دستور را با `\;` به پایان برسانید.

برای مثال، دستور زیر تمام فایل‌های خالی در این دایرکتوری و زیرشاخه‌هایش را حذف می‌کند:

```bash
find . -empty -exec rm '{}' \;
```

یا این یکی نام تمام فایل‌های `.htm` را به `.html` تغییر می‌دهد:

```bash
find . -name "*.htm" -exec mv '{}' '{}l' \;
```

> **نکته:** از آنجا که حذف فایل‌های پیداشده یک کار بسیار رایج است، سوئیچ مستقیمی هم برایش وجود دارد: `-delete`.

### فشرده‌سازی (Compression)

#### دستورات `gzip` و `gunzip`

خیلی سرراست است؛ یکی فایل را با gzip فشرده می‌کند و دیگری از حالت فشرده خارج می‌نماید (به صورت درجا):

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  171 Aug 14 04:43 tasks.txt.gz
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ gunzip tasks.txt.gz
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
```

* `gzip` زمان فایل را حفظ می‌کند.
* `gzip` فایل فشرده جدید را با همان نام و پسوند `.gz` می‌سازد.
* `gzip` پس از ساخت فایل فشرده، فایل اصلی را حذف می‌کند (برای نگه داشتن فایل ورودی می‌توانید از سوئیچ `-k` استفاده کنید).

#### دستورات `bzip2` و `bunzip2`

`bzip2` یک ابزار فشرده‌سازی دیگر است. دقیقاً مثل `gzip` معروف کار می‌کند، اما با یک الگوریتم فشرده‌سازی متفاوت.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ bzip2 tasks.txt
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls  -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  172 Aug 14 04:43 tasks.txt.bz2
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ bunzip2 tasks.txt.bz2
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls
data.txt  directory  info.txt  new_file  note_to_self  tasks.txt
```

#### دستورات `xz` و `unxz`

این هم یک ابزار فشرده‌سازی/خارج کردن از فشردگی دیگر، درست مثل `gzip` و `bzip2`.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ xz tasks.txt
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 24K
-rw-rw-r-- 1 jadi jadi  224 Aug 14 04:43 tasks.txt.xz
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
-rw-rw-r-- 1 jadi jadi  116 Aug 14 07:51 new_file
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ unxz tasks.txt.xz
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 24K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
-rw-rw-r-- 1 jadi jadi  116 Aug 14 07:51 new_file
```

لطفاً توجه کنید که *فشرده‌سازی* یک فایل متنی خیلی کوچک ممکن است حجم آن را بیشتر کند! این موضوع در فایل‌های کوچک به خاطر هدرها و متادیتاها کاملاً *عادی* است.

> **نکته:** در برخی موارد، دستوراتی مثل `unxz` در واقع فقط فراخوانی دستور `xz --decompress` هستند.

### آرشیو کردن با `tar` و `cpio`

گاهی اوقات لازم داریم از تعداد زیادی فایل، یک فایل آرشیو واحد بسازیم. این عملیات با فشرده‌سازی فرق دارد؛ فایل‌ها را در یک فایل ترکیب می‌کند تا بعداً دوباره استخراج شوند. آرشیو کردن بیشتر در پشتیبان‌گیری، انتقال فایل‌ها به یک مکان جدید (مثلاً از طریق ایمیل) و مواردی از این دست به کار می‌رود و با ابزارهای `cpio` و `tar` انجام می‌شود.

#### دستور `tar`

`tar` (مخفف Tape Archive) رایج‌ترین ابزار آرشیو کردن است. این دستور به صورت خودکار یک فایل آرشیو از یک دایرکتوری و تمام زیرشاخه‌هایش می‌سازد.

سوئیچ‌های رایج آن عبارت‌اند از:

| سوئیچ | معنا |
| :--- | :--- |
| `-cf myarchive.tar` | ساختن فایلی به نام `myarchive.tar` |
| `-xf myarchive.tar` | استخراج فایلی به نام `myarchive.tar` |
| `-z` | فشرده‌سازی آرشیو با `gzip` پس از ساختن آن |
| `-j` | فشرده‌سازی آرشیو با `bzip2` پس از ساختن آن |
| `-v` | پرحرف (Verbose)! جزئیات زیادی از اتفاقاتی که در حال رخ دادن است چاپ می‌کند |
| `-r` | افزودن فایل‌های جدید به انتهای آرشیوی که از قبل موجود است |

> **نکته:** اگر به `tar` مسیرهای مطلق بدهید، به دلایل امنیتی هنگام ساخت آرشیو، اسلش ابتدایی (`/`) را حذف می‌کند. اگر می‌خواهید این رفتار را نادیده بگیرید، از گزینه `-P` استفاده کنید.
>
> دستور `tar` می‌تواند با نوارهای مغناطیسی (Tape) و ذخیره‌سازهای دیگر هم کار کند؛ به همین دلیل از `-f` استفاده می‌کنیم تا به آن بگوییم با یک **فایل** کار داریم.

#### دستور `cpio`

فهرستی از فایل‌ها را می‌گیرد و یک آرشیو (یک فایل واحد) می‌سازد. بعداً می‌توان از این فایل برای استخراج فایل‌های اصلی استفاده کرد.

```text
$ ls | cpio -o > allfilesls.cpio
3090354 blocks
```

* `-o` به `cpio` می‌گوید از روی ورودی‌اش یک خروجی (آرشیو) بسازد.

لطفاً توجه کنید که `cpio` خودبه‌خود به داخل پوشه‌ها سرک نمی‌کشد؛ بنابراین بیشتر اوقات آن را همراه با `find` به کار می‌بریم:

```bash
find . -name "*" | cpio -o > myarchivefind.cpio
```

برای استخراج فایل‌های اصلی:

```bash
mkdir extract
mv myarchivefind.cpio extract
cd extract
cpio -id < myarchivefind.cpio
```

* `-d` پوشه‌های لازم را می‌سازد.
* `-i` برای استخراج (Extract) است.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1033_perform_basic_file_management.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
