---
layout: layout.njk
title: "فصل 53: ابزار sed (Linux sed Command)"
---
{% raw %}
# فصل 53: ابزار sed (Linux sed Command)

### مقدمه

ابزار sed که مخفف stream editor است، برای ویرایش و پردازش متن‌ها در ترمینال لینوکس استفاده می‌شود. با sed می‌توانید عملیات‌هایی مثل جستجو، جایگزینی (Find and Replace) و حذف بخش‌هایی از متن را بدون نیاز به باز کردن فایل در ادیتور انجام دهید.



---



### جایگزینی یک کلمه در متن

برای جایگزینی کلمه اول یافت شده در هر خط از دستور زیر استفاده کنید:


```bash
$ sed 's/old/new/' file.txt
```




---



### جایگزینی تمام کلمات در متن

اگر بخواهید تمام کلمات یافت شده در یک خط جایگزین شوند، باید از فلگ `g` (global) استفاده کنید.


```bash
$ sed 's/old/new/g' file.txt
```




---


---



### Author or Authors:

- *[Arya Shabane](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
