---
layout: layout.njk
title: "فصل 51: ابزار rsync (Linux rsync Command)"
---
{% raw %}
# فصل 51: ابزار rsync (Linux rsync Command)

### مقدمه

ابزار rsync (Remote Sync) ابزاری بی‌نظیر برای کپی و همگام‌سازی (Synchronize) فایل‌ها و دایرکتوری‌هاست. مهم‌ترین ویژگی rsync این است که فقط تفاوت‌ها (Delta) را کپی می‌کند که باعث می‌شود در انتقال فایل‌های حجیم یا بک‌آپ‌گیری، سرعت بسیار بالایی داشته باشد.



---



### کپی کردن دایرکتوری به صورت محلی

برای کپی کامل یک پوشه به همراه تمام محتویات آن به مسیری دیگر (مشابه cp اما هوشمندتر):


```bash
$ rsync -av /path/to/source/ /path/to/destination/
```

سوییچ `a-` برای آرشیو و کپی بازگشتی (recursive) و `v-` برای نمایش فایل‌های در حال انتقال است.



---



### انتقال فایل به یک سرور دیگر

همچنین می‌توانید فایل‌ها را از طریق شبکه به یک سرور دیگر انتقال دهید (rsync از ssh برای انتقال امن استفاده می‌کند):


```bash
$ rsync -av /local/dir/ user@remote_host:/remote/dir/
```




---


---



### Author or Authors:

- *[Arya Shabane](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
