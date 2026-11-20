---
layout: layout.njk
title: "۱۰۵.۳ مدیریت مقدماتی پایگاه داده SQL (سرفصل قدیمی)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 29
chapterSection: "موضوع ۱۰۵: پوسته‌ها و اسکریپت‌ها"
permalink: /books/book13/Book/29/1053-sql-data-management/index.html
---
{% raw %}
# ۱۰۵.۳ مدیریت مقدماتی پایگاه داده SQL (سرفصل قدیمی)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> مرور پرس‌وجوهای ساده SELECT، INSERT و UPDATE در پایگاه‌های داده رابطه‌ای.
</div>



## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

چه شانسی! این بخش از آزمون حذف شده است. اما اگر اصرار دارید، متن قدیمی آن به این شکل بوده است:

## ۱۰۵.۳ مدیریت داده‌ها با SQL

<div class="alert alert-danger" role="alert">
  این فصل هنوز در حال تکمیل است (و از نسخه ۵۰۰ آزمون LPIC حذف شده است). برای آزمون LPIC نسخه ۵۰۰ به آن تکیه نکنید.
</div>

_ضریب اهمیت (Weight): ۲_

داوطلبان باید بتوانند با استفاده از دستورات پایه SQL از پایگاه‌های داده پرس‌وجو (Query) بگیرند و داده‌ها را دستکاری کنند. این هدف شامل اجرای پرس‌وجوهایی با پیوند زدن (Join) دو جدول و/یا زیرپرس‌وجوها (Subselects) نیز می‌شود.

#### حوزه‌های دانش کلیدی

* استفاده از دستورات پایه SQL
* انجام دستکاری‌های مقدماتی داده‌ها

#### اصطلاحات و دستورات کلیدی

<div dir="ltr">

* `insert`
* `update`
* `select`
* `delete`
* `from`
* `where`
* `group by`
* `order by`
* `join`

</div>

### پایگاه‌های داده (Databases)

این بخش درباره زبان SQL است و MySQL یکی از پایگاه‌های داده متعدد SQL محسوب می‌شود. در این درس، یک پایگاه داده (Database) از تعدادی **جدول (Table)** تشکیل شده و هر جدول تعدادی **ردیف (Row)** و **ستون/فیلد (Field)** دارد. بیایید نگاهی بیندازیم. در این درس قرار نیست پایگاه داده _بسازیم_ یا _طراحی_ کنیم. فقط کافی است درک کلی از پایگاه‌های داده (پایگاه‌های داده SQL) داشته باشید و چند دستور را برای کار با آن‌ها (خواندن، پرس‌وجو گرفتن، به‌روزرسانی یا افزودن داده) بلد باشید. پایگاه داده‌ای که در این درس استفاده می‌کنم `lpic` نام دارد و دارای جدول‌هایی برای اطلاعات و دفترچه تلفن است.

### خط فرمان mysql

همانطور که گفتم، قرار نیست خود `mysql` را اینجا یاد بگیریم؛ فقط لازم است روی `SQL` به عنوان یک زبان پرس‌وجو تمرکز کنیم. فقط همین قدر بدانید که `mysql` یک برنامه خط فرمانی است برای اتصال تعاملی به یک `mysql-server`. من به این شکل از آن استفاده می‌کنم:

```text
$ mysql -u root -p
```

که یعنی قرار است با کاربر (`u`) `root` وارد شوم و رمز عبور را هم وارد خواهم کرد. همچنین ممکن بود این‌طور بنویسم:

```text
$ mysql -u root -p mypass lpic
```

تا رمز عبور را در همان خط فرمان بدهم (که به دلایل امنیتی اصلاً ایده خوبی نیست!) و به برنامه `mysql` بگویم همان ابتدا به پایگاه داده `lpic` متصل شود.

#### استفاده از یک پایگاه داده

وقتی به سرور پایگاه داده وصل می‌شوید، باید با دستور `use` انتخاب کنید که قصد دارید دستوراتتان را روی کدام پایگاه داده اجرا کنید. معمولاً یک سرور پایگاه داده (مثلاً MySQL) می‌تواند صدها پایگاه داده مختلف داخل خودش داشته باشد که هر کدام برای یک کاربر یا برنامه است:

```text
jadi@funlife:~$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 17
Server version: 5.6.25-0ubuntu0.15.04.1 (Ubuntu)

Copyright (c) 2000, 2015, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| bad                |
| good               |
| lpic               |
| mysql              |
| performance_schema |
| ugly               |
+--------------------+
7 rows in set (0.00 sec)

mysql> USE LPIC;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> SHOW TABLES;
+----------------+
| Tables_in_lpic |
+----------------+
| info           |
| phonebook      |
+----------------+
2 rows in set (0.00 sec)
```

همانطور که می‌بینید `mysql` خیلی خوش‌برخورد است و جدول‌های دوست‌داشتنی نمایش می‌دهد! به او گفتم `use lpic` و بعد `show tables` و حالا می‌دانم که دو جدول دارم: `info` و `phonebook`.

> **نکته:** مرسوم است که دستورات کلیدی MySQL را با حروف بزرگ (CAPITAL LETTERS) و نام‌ها، مقادیر و بقیه چیزها را با حروف کوچک بنویسند.

### دستور SELECT

کاربرد `SELECT` کاملاً واضح است! از یک جدول داده‌ها را انتخاب می‌کند. وقتی مطمئن نیستیم دنبال چه فیلدی هستیم، می‌توانیم `*` را انتخاب کنیم تا همه فیلدها را بگیریم:

```text
mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

یا اینکه فقط یک فیلد مشخص را بخواهیم:

```text
mysql> SELECT name FROM phonebook;
+--------+
| name   |
+--------+
| jadi   |
| nasrin |
| sina   |
| haale  |
+--------+
3 rows in set (0.00 sec)
```

### شرط WHERE

با استفاده از `WHERE` می‌توانید به پرس‌وجوهای SQL خودتان _شرط_ اضافه کنید. بیایید نگاهی به جدول دیگری که داریم بیندازیم:

```text
mysql> SELECT * FROM info;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| jadi   |    180 |     74 | happy |
| sina   |    175 |     81 | happy |
| nasrin |    174 |     68 | happy |
| mina   |    171 |     59 | sad   |
+--------+--------+--------+-------+
4 rows in set (0.00 sec)
```

اگر بخواهیم فقط دوستان _خوشحال (happy)_ خودمان را ببینیم چه؟

```text
mysql> SELECT * FROM info WHERE mood = 'happy';
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| jadi   |    180 |     74 | happy |
| sina   |    175 |     81 | happy |
| nasrin |    174 |     68 | happy |
+--------+--------+--------+-------+
3 rows in set (0.00 sec)

mysql>
```

نگران _مینا_ نباشید، بعداً او را هم خوشحال می‌کنیم؛ اما فعلاً لازم است دوستانی را ببینیم که هم خوشحالند و هم وزنشان بیشتر از ۸۰ کیلوگرم است:

```text
mysql> SELECT * FROM info WHERE mood = 'happy' AND weight >= 80;
+------+--------+--------+-------+
| name | height | weight | mood  |
+------+--------+--------+-------+
| sina |    175 |     81 | happy |
+------+--------+--------+-------+
3 rows in set (0.00 sec)
```

یا اگر فقط اسمش را لازم داشته باشم:

```text
mysql> SELECT name FROM info WHERE mood = 'happy' AND weight >= 80;
+------+
| name |
+------+
| sina |
+------+
1 row in set (0.00 sec)
```

### مرتب‌سازی با ORDER BY

این دستور زمانی استفاده می‌شود که بخواهید داده‌ها را بر اساس یک فیلد **مرتب (Sort)** کنید. اینجا دارم دفترچه تلفنم را بر اساس نام افراد چک می‌کنم:

```text
mysql> SELECT * FROM phonebook ORDER BY name;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| haale  |                  | 0935secret     |
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

این مرتب‌سازی را می‌توان روی هر فیلدی انجام داد، از جمله اعداد:

```text
mysql> SELECT * FROM info ORDER BY height;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| mina   |    171 |     59 | sad   |
| nasrin |    174 |     68 | happy |
| sina   |    175 |     81 | happy |
| jadi   |    180 |     74 | happy |
+--------+--------+--------+-------+
4 rows in set (0.00 sec)
```

### دسته‌بندی با GROUP BY

این دستور خروجی را _گروه‌بندی (Group)_ می‌کند. متاسفانه در نگاه اول خیلی روشن نیست. بیایید مثال اول را ببینیم:

```text
mysql> SELECT * FROM info GROUP BY mood;
+------+--------+--------+-------+
| name | height | weight | mood  |
+------+--------+--------+-------+
| jadi |    180 |     74 | happy |
| mina |    171 |     59 | sad   |
+------+--------+--------+-------+
2 rows in set (0.00 sec)
```

دیدیم که در جدولمان فقط دو نوع `mood` داریم: `sad` و `happy`. وقتی همه فیلدها (یعنی `*`) را از این جدول با `GROUP BY mood` انتخاب می‌کنیم، SQL تمام حالت‌ها را بررسی کرده و از هر کدام فقط **یکی** را به ما نشان می‌دهد. از این روش می‌توان شبیه دستور `uniq` که در LPIC 101 یاد گرفتید استفاده کرد:

```text
mysql> SELECT mood FROM info GROUP BY mood;
+-------+
| mood  |
+-------+
| happy |
| sad   |
+-------+
2 rows in set (0.00 sec)
```

که تمام `mood`های موجود در جدول را به شما می‌دهد. در دنیای واقعی این کار به تنهایی خیلی کاربردی نیست و بیشتر مواقع با `count` ترکیب می‌شود. نگاه کنید:

```text
mysql> SELECT count(mood), mood FROM info GROUP BY mood;
+-------------+-------+
| count(mood) | mood  |
+-------------+-------+
|           3 | happy |
|           1 | sad   |
+-------------+-------+
2 rows in set (0.00 sec)
```

که می‌شمارد چند ردیف دارای آن `mood` مشخص هستند. پس من ۳ دوست خوشحال و ۱ دوست ناراحت دارم.

> **نکته:** دستور `count` جزو سرفصل آزمون LPIC 105.3 نیست.

### دستور INSERT

یک دستور واضح دیگر. یک ردیف جدید به جدول اضافه می‌کند. فرض کنید می‌خواهم داده‌هایی به `phonebook` اضافه کنم:

```text
mysql>  INSERT INTO phonebook (name, phone, email) VALUES ('ghasem', '+982112345678', '');
Query OK, 1 row affected (0.01 sec)

mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
| ghasem |                  | +982112345678  |
+--------+------------------+----------------+
5 rows in set (0.00 sec)
```

### دستور DELETE

خودتان می‌دانید! این دستور از یک جدول داده حذف (DELETE) می‌کند. اما خیلی مراقب باشید چه چیزی را پاک می‌کنید... اینجا `WHERE` دوست شماست:

```text
mysql> DELETE FROM phonebook WHERE name = 'ghasem';
Query OK, 1 row affected (0.01 sec)

mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

### دستور UPDATE

آیا گفته بودم که SQL شبیه زبان انگلیسی ساده است؟ حق با من بود، چون الان خودتان می‌دانید `UPDATE` چه کار می‌کند! یک ردیف را به‌روزرسانی (تغییر) می‌دهد و باز هم `WHERE` دوست شماست:

```text
mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  |                  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)

mysql> UPDATE phonebook SET  email='haale@lpic.fake' WHERE name = 'haale';
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM phonebook;
+--------+------------------+----------------+
| name   | email            | phone          |
+--------+------------------+----------------+
| jadi   | jadi@jadi.net    | +9890something |
| nasrin | nasrin@lpic.test | +9898989898    |
| sina   | far@from.here    | +687randomnum  |
| haale  | haale@lpic.fake  | 0935secret     |
+--------+------------------+----------------+
4 rows in set (0.00 sec)
```

### دستور JOIN

دستور `JOIN` می‌تواند پیچیده باشد، اما خوشبختانه ما در آزمون LPIC1-Exam 102 هستیم و لازم نیست خیلی عمیق یادش بگیریم ;) `Join` دو جدول را به هم متصل/ترکیب می‌کند. فقط این را ببینید:

```text
mysql>  SELECT * FROM phonebook JOIN info;
+--------+------------------+----------------+--------+--------+--------+-------+
| name   | email            | phone          | name   | height | weight | mood  |
+--------+------------------+----------------+--------+--------+--------+-------+
| jadi   | jadi@jadi.net    | +9890something | jadi   |    180 |     74 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | jadi   |    180 |     74 | happy |
| sina   | far@from.here    | +687randomnum  | jadi   |    180 |     74 | happy |
| haale  | haale@lpic.fake  | 0935secret     | jadi   |    180 |     74 | happy |
| jadi   | jadi@jadi.net    | +9890something | sina   |    175 |     81 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | sina   |    175 |     81 | happy |
| sina   | far@from.here    | +687randomnum  | sina   |    175 |     81 | happy |
| haale  | haale@lpic.fake  | 0935secret     | sina   |    175 |     81 | happy |
| jadi   | jadi@jadi.net    | +9890something | nasrin |    174 |     68 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | nasrin |    174 |     68 | happy |
| sina   | far@from.here    | +687randomnum  | nasrin |    174 |     68 | happy |
| haale  | haale@lpic.fake  | 0935secret     | nasrin |    174 |     68 | happy |
| jadi   | jadi@jadi.net    | +9890something | mina   |    171 |     59 | sad   |
| nasrin | nasrin@lpic.test | +9898989898    | mina   |    171 |     59 | sad   |
| sina   | far@from.here    | +687randomnum  | mina   |    171 |     59 | sad   |
| haale  | haale@lpic.fake  | 0935secret     | mina   |    171 |     59 | sad   |
+--------+------------------+----------------+--------+--------+--------+-------+
16 rows in set (0.00 sec)
```

تک‌تک ردیف‌های جدول اول (`phonebook`) جلوی تمام ردیف‌های جدول دوم (`info`) کپی شده‌اند. _هنوز_ خیلی کاربردی نیست. زمانی کاربردی می‌شود که یک _فیلد مشترک_ معرفی کنید یا بگویید جدول‌ها را بر اساس یک شرط خاص به هم `JOIN` کند؛ اینجاست که جادو اتفاق می‌افتد:

```text
mysql> SELECT * FROM phonebook JOIN info ON phonebook.name = info.name;
+--------+------------------+----------------+--------+--------+--------+-------+
| name   | email            | phone          | name   | height | weight | mood  |
+--------+------------------+----------------+--------+--------+--------+-------+
| jadi   | jadi@jadi.net    | +9890something | jadi   |    180 |     74 | happy |
| sina   | far@from.here    | +687randomnum  | sina   |    175 |     81 | happy |
| nasrin | nasrin@lpic.test | +9898989898    | nasrin |    174 |     68 | happy |
+--------+------------------+----------------+--------+--------+--------+-------+
3 rows in set (0.00 sec)
```

عالی شد! حالا فهرست دوستانم، حال‌وهوایشان و شماره تلفن‌هایشان را با هم دارم! فرض کنید حوصله‌ام سر رفته و باید به یک دوست باحال زنگ بزنم:

```text
mysql> SELECT phonebook.name, phone, mood FROM phonebook JOIN info ON phonebook.name = info.name WHERE mood = 'happy';
+--------+----------------+-------+
| name   | phone          | mood  |
+--------+----------------+-------+
| jadi   | +9890something | happy |
| sina   | +687randomnum  | happy |
| nasrin | +9898989898    | happy |
+--------+----------------+-------+
3 rows in set (0.00 sec)
```

> **نکته:** هر دو جدول یک فیلد به نام `name` دارند، بنابراین مجبور شدم از `phonebook.name` استفاده کنم تا به SQL بگویم کدام `name` را می‌خواهم نمایش دهد.

طبیعتاً می‌توانیم معیارهای بیشتری هم اضافه کنیم و مثلاً با کسی بیرون برویم که قدش کوتاه‌تر از ۱۷۵ سانتی‌متر است:

```text
mysql> SELECT phonebook.name, phone, mood FROM phonebook JOIN info ON phonebook.name = info.name AND height < 175;
+--------+-------------+-------+
| name   | phone       | mood  |
+--------+-------------+-------+
| nasrin | +9898989898 | happy |
+--------+-------------+-------+
1 row in set (0.00 sec)
```

جالب بود، نه؟ ولی هنوز کارمان تمام نشده. من دوست ندارم دوستان ناراحت داشته باشم و الان یکی دارم؛ بیایید او را هم خوشحال کنیم!

```text
mysql> SELECT * FROM info WHERE mood = 'sad';
+------+--------+--------+------+
| name | height | weight | mood |
+------+--------+--------+------+
| mina |    171 |     59 | sad  |
+------+--------+--------+------+
1 row in set (0.01 sec)

mysql> UPDATE info SET mood = 'happy' WHERE name = 'mina';
Query OK, 0 rows affected (0.02 sec)
Rows matched: 1  Changed: 0  Warnings: 0

mysql> SELECT * FROM info WHERE mood = 'sad';                                   
Empty set (0.00 sec)

mysql> SELECT * FROM info;
+--------+--------+--------+-------+
| name   | height | weight | mood  |
+--------+--------+--------+-------+
| jadi   |    180 |     74 | happy |
| sina   |    175 |     81 | happy |
| nasrin |    174 |     68 | happy |
| mina   |    171 |     59 | happy |
+--------+--------+--------+-------+
4 rows in set (0.00 sec)
```

خیلی راحت بود. دستور آخر از این هم راحت‌تر است:

### دستور `quit`

```text
mysql> quit
Bye
jadi@funlife:~$
```

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1053_sql_data_management.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
