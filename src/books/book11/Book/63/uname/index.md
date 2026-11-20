---
layout: layout.njk
title: "فصل 63: ابزار uname (Linux uname Command)"
---
{% raw %}
# فصل 63: ابزار uname (Linux uname Command)

### مقدمه

ابزار uname برای چاپ اطلاعات پایه درباره سیستم عامل و سخت‌افزار کامپیوتری که در حال کار با آن هستید، استفاده می‌شود. نام این ابزار مخفف Unix Name است.



---



### نمایش اطلاعات کلی سیستم

با استفاده از سوییچ `a-` (مخفف all) می‌توانید تمام اطلاعات از جمله ورژن کرنل، معماری پردازنده و نام هاست را مشاهده کنید:


```bash
$ uname -a
```


خروجی به این شکل خواهد بود:

```text
Linux myserver 5.15.0-78-generic #85-Ubuntu SMP x86_64 x86_64 x86_64 GNU/Linux
```




---



### نمایش نسخه کرنل

اگر فقط نیاز دارید که نسخه کرنل (Kernel) سیستم عامل را بدانید، از سوییچ `r-` (مخفف release) استفاده کنید:


```bash
$ uname -r
```




---


---



### Author or Authors:

- *[Arya Shabane](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
