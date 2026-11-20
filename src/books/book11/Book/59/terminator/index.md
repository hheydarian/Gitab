---
layout: layout.njk
title: "فصل 59: ابزار terminator (Linux terminator Command)"
---
{% raw %}
# فصل 59: ابزار terminator (Linux terminator Command)

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/terminator/example.png" alt="terminator" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>



### میانبر

مهم ترین دلیل استفاده از
terminator
تقسیم بندی صفحه به قسمت های مختلف هست.

یک صفحه می‌تواند افقی و عمودی جدا شود.
و هر صفحه را می‌توان باز جدا کرد.
و همچنین شما می‌توانید اندازه صفحه ها بر اساس نیاز بزرگتر و یا کوچکتر کنید.

> #### جدا سازی افقی
>
> ```bash
> ctrl+shift+O
> ```
>
> <div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/terminator/hor.png" alt="horizontal split" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

> #### جدا سازی عمودی
>
> ```bash
> ctrl+shift+E
> ```
> <div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/terminator/ver.png" alt="vertical" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>


شما می‌توانید در هر کدام از پنجره ها هر مقدار پنجره جدید افقی یا عمودی دیگر هم اضافه کنید.

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/terminator/ver_hor.png" alt="vertical" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

---

#### جابجایی بین هر صفحه

برای ایکه بین صفحه‌هایی که ساخته‌اید حرکت کنید با از ترکیب کلید
alt
با کلید های جهت دار استفاده کنید.

- alt+Up
رفتن به ترمینال بالایی

- alt+Down
رفتن به ترمینال پایین

- alt+Left
رفتن با ترمینال چپ

- alt+Right
رفتن به ترمینال راست

---

#### تغییر اندازه صفحه

ممکن است شما بخواهید اندازه یکی از صفحه ها را بزرگ تر کنید، چرا که در نیاز به فضای زیاد دارد،
و همچنین اندازه یک صفحه که نیاز به فضای زیادی ندارد را کاهش دهید. برای اینکار از کلید های ترکیبی
ctrl
و
shift
با کلید های جهت دار استفاده کنید.


- افزایش/کاهش اندازه ترمینال به صورت عمودی

```bash
ctrl+shift+Up
```

```bash
ctrl+shift+Down
```

- افزایش/کاهش اندازه ترمینال به صورت افقی

```bash
ctrl+shift+Left
```

```bash
ctrl+shift+Right
```

---

#### بستن یک صفحه

```bash
ctrl+shift+W
```

---

#### زوم کردن

گاهی فقط با یکی از ترمینال ها کار داریم و نیاز داریم که آن صفحه بزرگ تر از بقیه باشد، در این زمان
کافیست که در آن صفحه زوم کنیم و بقیه ترمینال ها را همانطور که هستند باقی بگذاریم.


```bash
ctrl+shift+Z
```

---

#### اسکرول در ترمینال

> در نظر داشته باشید که برای اسکرول باید
> numlock
> را روشن کنید. و از کلید های
> num pad
> استفاده کنید.

- اسکرول به بالا

```bash
ctrl+shift+8
```

- اسکرول به پایین

```bash
ctrl+shift+2
```



---

### نکته ها

> به یاد داشته باشید ترمیناتور یک ابزار گرافیکی است. شما می‌توانید با موس جای ترمینال ها را جابجا کنید
> و یا همچنین بین انها جابجا شوید.

> شاید برخی از کلید ها میانبر ترمیناتور برای شما کار نکند. دلیل آن این است که یک برنامه دیگر
> قبل از اینکه آن میانبر به ترمیناتور برسد، آن میانبر را اجرا می‌کند.
> برای درست کردن این مشکل کامند
> `ibus-setup`
> را وارد کنید، و میانبری را که برنامه های دیگر اشغال کرده‌اند را تغییر دهید.

---

### نویسنده یا نویسندگان

- *[Arya](https://github.com/shabane)* | **m.mohamadshabane@gmail.com**
{% endraw %}
