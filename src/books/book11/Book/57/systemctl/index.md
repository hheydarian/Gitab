---
layout: layout.njk
title: "فصل 57: ابزار systemctl (Linux systemctl Command)"
---
{% raw %}
# فصل 57: ابزار systemctl (Linux systemctl Command)

### مقدمه

ابزار systemctl ابزار اصلی برای مدیریت سرویس‌ها در سیستم‌های لینوکسی است که از systemd (مدیر سیستم و سرویس) استفاده می‌کنند. با این ابزار می‌توانید سرویس‌ها را استارت کنید، متوقف کنید، ری‌استارت کنید یا وضعیت آن‌ها را ببینید.



---



### بررسی وضعیت یک سرویس

برای دیدن اینکه یک سرویس (مثلا nginx) در چه وضعیتی است و آیا در حال اجراست یا خیر:


```bash
$ systemctl status nginx
```




---



### شروع و توقف سرویس

برای روشن (start) یا خاموش (stop) کردن سرویس از دستورهای زیر استفاده کنید (معمولا نیاز به دسترسی sudo دارید):


```bash
$ sudo systemctl start nginx
$ sudo systemctl stop nginx
```




---


---



### Author or Authors:

- *[Arya Shabane](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
