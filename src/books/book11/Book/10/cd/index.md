---
layout: layout.njk
title: "فصل 10: ابزار cd (Linux cd Command)"
---
{% raw %}
# فصل 10: ابزار cd (Linux cd Command)

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/cd/cd.jpg" alt=""cd command usage"" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

### مقدمه

ابزار
cd
یکی از ابزارهای سیستمی است که به شما اجازه می دهد به دایرکتوری خاصی بروید.

واژه
cd
مخفف
change directory
است.

---

### رفتن به یک دایرکتوری

برای رفتن به یک دایرکتوری دستور
cd
را می‌نویسیم و سپس مسیر دایرکتوری را مشخص می‌کنیم

مثال: رفتن به پوشه
*/home/*
با دستور
`cd /home/`

```
$ cd /home/
```


<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/cd/cd_ex1.jpg" alt=""an example for cd"" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

---

### رفتن به دایرکتوری های تو در تو

اگه در پوشه ای قرار دارید که در آن پوشه های دیگری موجود باشند
با مشخص کردن مسیر کامل و زیر شاخه ها وارد آن دایرکتوری خاص شوید.


```
$ cd DIR1/DIR2/DIR3/
```



همچنین در هر دایرکتوری برای بازگشت به دایرکتوری قبلی با دستور

```
$ cd ..
```

رفتن به یک دایرکتوری قبلی را انجام می‌دهیم.

همیشه
**..**
به یک پوشه قبلی اشاره می‌کند.

مثال: رفتن به پوشه

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/cd/cd_ex2.jpg" alt=""an example for cd"" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

---

### نماد ها در دستور cd

وارد شدن به دایرکتوری با استفاده از
`*`


```
mokfi@Maian:~$ cd /etc/v*
mokfi@Maian:/etc/vim$
```


با استفاده از این نماد میتوانید قسمتی از نام دایرکتوری خود را تایپ کرده،
و قسمتی از آن را که نمیدانید یا فراموش کرده اید را این نماد مشخص کنید.

البته باید دقت داشته باشید که اگر چند دایرکتوری وجود داشته باشد که شرایط را دارا باشد،
اولین دایرکتوری مد نظر قرار گرفته میشود.

---

وارد شدن به دایرکتوری با استفاده از
`?`


```
mokfi@Maian:~$ cd /etc/my???
mokfi@Maian:/etc/mysql$
```


تفاوت اصلی این نماد با نماد
`*`
این است که در این نماد به تعدادی که از آن استفاده کرده اید به دنبال کاراکتر می‌گردد.

مثلا اگر نام دایرکتوری از سه کاراکتر تشکیل شده باشد شما مجبور به نوشتن نام ان دایرکتوری نیستید کافیست از علامت ? سه بار متعدد استفاده کنید.

همچنین همانند نماد
`*`
اگر چند دایرکتوری پیدا شود که شرایط مد نظر شما را داشته باشند،
اولین دایرکتوری مد نظر قرار گرفته میشود.

---

نماد دایرکتوری خانه
`~`

این نماد به معنای دایرکتوری خانه کاربر فعلی شما میباشد.

---

### Author or Authors:

- *[MotahharMokfi](https://github.com/motahharm)* | **<motahharmokfi@gmail.com>**
{% endraw %}
