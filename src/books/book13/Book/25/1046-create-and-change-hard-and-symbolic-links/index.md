---
layout: layout.njk
title: "۱۰۴.۶ ساخت پیوندهای سخت و نمادین (Links)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 25
chapterSection: "موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها"
permalink: /books/book13/Book/25/1046-create-and-change-hard-and-symbolic-links/index.html
---
{% raw %}
# ۱۰۴.۶ ساخت پیوندهای سخت و نمادین (Links)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> تفاوت بنیادین پیوند سخت (Hard Link) با پیوند نرم/نمادین (Symlink) و رفتار Inodeها.
</div>



## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۲_

داوطلبان باید بتوانند پیوندهای سخت (Hard Links) و پیوندهای نمادین (Symbolic Links) را به یک فایل ایجاد و مدیریت کنند.

### حوزه‌های دانش کلیدی

* ایجاد پیوندها (Links).
* شناسایی پیوندهای سخت و/یا نرم (Hard and/or Soft Links).
* مقایسه کپی کردن فایل در برابر پیوند دادن (Linking) فایل‌ها.
* استفاده از پیوندها برای پشتیبانی از وظایف مدیریت سیستم.

### دستورات و اصطلاحات کلیدی

* `ln`
* `unlink`

## پیوندها (Links)

روی یک دستگاه ذخیره‌سازی، فایل یا دایرکتوری روی بلاک‌هایی (Blocks) ذخیره می‌شود و یک ارجاع به آن در جدول تخصیص فایل‌سیستم (مانند FAT، ext و غیره) همراه با اطلاعاتی درباره مالک، مجوزها، زمان آخرین دسترسی، اندازه و موارد مشابه نگهداری می‌گردد. همانطور که قبلاً هم دیدید، با دستور `ls` می‌توانیم این اطلاعات را بررسی کنیم:

```bash
$ ls -i script.sh
785379 script.sh
$ ls -l script.sh
-rwxr--r-t 1 jadi adm 34 Mar  5 13:38 script.sh
$ ls -R
.:
check_tr181_file.php  etc_apparmom.tar  index.html  php_checker  script.sh  test.csv  w

./php_checker:
check_tr181_file.php  index.html  test.csv

./w:
```

اما ساخت پیوند (Link) هم امکان‌پذیر است. یک پیوند به سادگی یک ورودی دایرکتوری (Directory Entry) اضافی برای یک فایل یا دایرکتوری است:

```bash
$ ls -l
total 4
-rwxr-xr-x 1 jadi adm 34 Mar  5 13:38 script.sh
$ ln -s script.sh copy_of_script.sh
$ ls -ltrh
total 4.0K
-rwxr-xr-x 1 jadi adm  34 Mar  5 13:38 script.sh
lrwxrwxrwx 1 jadi jadi  9 Mar  6 11:31 copy_of_script.sh -> script.sh
$ ls -i
785349 copy_of_script.sh  785379 script.sh
```

پیوند یک ورودی دایرکتوری اضافی برای یک فایل یا دایرکتوری است که اجازه می‌دهد یک فایل دو یا چند نام داشته باشد. یک **پیوند سخت (Hard Link)** ورودی دایرکتوری‌ای است که مستقیماً به یک `inode` اشاره می‌کند، در حالی که یک **پیوند نرم یا نمادین (Soft Link یا Symbolic Link)** ورودی دایرکتوری‌ای است که به یک `inode` اشاره می‌کند که نام یک ورودی دایرکتوری دیگر را در خود نگه می‌دارد. سازوکار دقیق ذخیره نام دوم ممکن است به نوع فایل‌سیستم و طول نام بستگی داشته باشد. به پیوندهای نمادین به اختصار `symlink` هم می‌گویند.

پیوندهای نرم (یا `symlink`ها) صرفاً از طریق نام به فایل یا دایرکتوری دیگری اشاره می‌کنند، نه از طریق `inode`. به همین دلیل پیوندهای نرم می‌توانند از مرز فایل‌سیستم‌های مختلف عبور کنند (مثلاً بین دو پارتیشن متفاوت لینک بزنند).

```bash
$ vi new_file
$ ls -ltrh
total 4.0K
-rw------- 1 jadi jadi 9 Mar  6 11:37 new_file
$ ln new_file hard_link
$ ln -s new_file soft_link
$ ls -ltrh
total 8.0K
-rw------- 2 jadi jadi 9 Mar  6 11:37 new_file
-rw------- 2 jadi jadi 9 Mar  6 11:37 hard_link
lrwxrwxrwx 1 jadi jadi 8 Mar  6 11:37 soft_link -> new_file
$ rm new_file
$ ls -ltrh
total 4.0K
-rw------- 1 jadi jadi 9 Mar  6 11:37 hard_link
lrwxrwxrwx 1 jadi jadi 8 Mar  6 11:37 soft_link -> new_file
$ cat hard_link
new file
$ cat soft_link
cat: soft_link: No such file or directory
```

> **نکته:** وقتی یک پیوند نمادین داریم، در فهرست مجوزهای خروجی `ls -l` اولین کاراکتر حرف `l` است.

شما فقط برای فایل‌ها می‌توانید پیوند سخت بسازید، نه برای دایرکتوری‌ها. تنها استثنا، ورودی‌های ویژه درون هر دایرکتوری برای خود دایرکتوری و دایرکتوری والد آن (یعنی `.` و `..`) هستند.

> **نکته:** اگر تلاش کنید پیوند سختی بسازید که از مرز یک فایل‌سیستم عبور کند یا به یک دایرکتوری اشاره داشته باشد، با خطا مواجه خواهید شد.

```bash
$ ln mydir link2dir # ln: mydir: hard link not allowed for director
$ ln -s mydir link2dir # works just fine
```

اگر از مسیرهای نسبی (Relative Paths) استفاده می‌کنید، معمولاً بهتر است دایرکتوری کاری فعلی شما همان دایرکتوری‌ای باشد که پیوند را در آن می‌سازید؛ در غیر این صورت، پیوندی که می‌سازید نسبت به نقطه دیگری از فایل‌سیستم محاسبه شده و ممکن است خراب شود:

```bash
$ ln -s myfile.txt mydir/ #broken link
$ cd mydir 
$ ln -s ../myfile.txt .
```

توصیه می‌شود برای ساخت پیوندها از مسیر کامل و دقیق (Absolute Path) استفاده کنید:

```bash
$ ln -s /tmp/myfile.txt /tmp/Foo/Bar/myfile.txt
$ ls -l /tmp/Foo/Bar/myfile.txt 
lrwxrwxrwx. 1 jadi jadi 9 Mar  6 12:37 /tmp/Foo/Bar/myfile.txt -> /tmp/myfile.txt
```

می‌توانیم پیوندهای نمادین را با دستور `find` پیدا کنیم:

```bash
$ find . -type l
```

از پیوندهای نمادین بسیار زیاد برای ثابت نگه داشتن یک نام مشخص استفاده می‌شود که به یک فایل باینری در حال تغییر اشاره دارد. مثلاً ما همیشه نیاز داریم دستور `python3` را اجرا کنیم، بنابراین آن را به آخرین نسخه پایتون نصب‌شده روی سیستم پیوند می‌دهیم:

```bash
$ which python3
/usr/bin/python3
$ ls -l /usr/bin/python3
lrwxrwxrwx 1 root root 10 Mar 25  2022 /usr/bin/python3 -> python3.10
```

برای حذف پیوندها می‌توانید از دستور `rm` یا `unlink` استفاده کنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1046_create_and_change_hard_and_symbolic_links.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
