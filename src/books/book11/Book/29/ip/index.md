---
layout: layout.njk
title: "فصل 29: ابزار ip (Linux ip Command)"
---
{% raw %}
# فصل 29: ابزار ip (Linux ip Command)

### مقدمه

ابزار ip دستوری قدرتمند برای پیکربندی و نمایش تنظیمات شبکه در لینوکس است. این ابزار جایگزین مدرن‌تری برای دستور قدیمی `ifconfig` محسوب می‌شود و امکانات بسیار بیشتری در زمینه مسیریابی (Routing) و اینترفیس‌های شبکه دارد.



---



### نمایش آدرس IP سیستم

برای دیدن آدرس IP تمام کارت شبکه‌های سیستم خود از دستور زیر استفاده کنید:


```bash
$ ip addr show
```

یا به صورت خلاصه:

```bash
$ ip a
```




---



### نمایش جدول مسیریابی (Routing)

برای دیدن روت‌ها و Default Gateway سیستم می‌توانید از کامند زیر استفاده کنید:


```bash
$ ip route show
```




---


---



### Author or Authors:

- *[Arya Shabane](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
