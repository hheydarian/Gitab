---
layout: layout.njk
title: "فصل 70: ابزار watch (Linux watch Command)"
---
{% raw %}
# فصل 70: ابزار watch (Linux watch Command)

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/watch/watch.jpg" alt="watch-command-in-linux" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

---



### اجرای یک کامند در بازه زمانی مشخص

همانطور که می‌دانید دستور
`free -h`
مقدار رم اشغال شده را نشان می‌دهد. برای اجرای این دستور در هر ثانیه از سوییچ
`n-`
استفاده می‌کنیم. این سوییچ یک عدد را به عنوان فاصله زمانی از شما می‌گیرد.
به یاد داشته باشید که این عدد به ثانیه است.

> دقت کنید که دستور هایی که به
> watch
> برای اجرا می‌دهید بهتر است در 'کوتیشن' باشند


```bash
$ watch -n 1 'free -h'
```


---

### برجسته کردن تغییرات

در حالت عادی
watch
تغییرات را به شما نشان خواهد داد، اما اگر نیاز داشته باشید که تغییرات را
نسبت به اخرین زمان اجرا برجسته تر کنید، سوییچ
`d-`
به کار شما خواهد آمد.
این سوییچ تنها فقط **تغییرات** خروجی را خروجی را به رنگ دیگری نمایش خواهد داد.


```
$ watch -n 1 'free -h'
```


> <div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/watch/1.jpg" alt="watch" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>
> <div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/watch/2.jpg" alt="watch" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

---

### بیپ!

هر کامندی که اجرا می‌شود کدی را به عنوان کد وضعیت یا
status code
باز می‌گرداند. این کد مشخص کننده، درستی اجرا یا خطا هنگام اجرا است.
اگر کد باز گشتی عددی جز 
<u>0</u>
باشد، نشان دهنده خطا در اجرای ابزار است.
زمانی که
watch
برنامه‌ای را اجرا می‌کند ممکن است آن برنامه با خطایی مواجه شود. برای
اینکه متوجه این خطا بشوید کافیست که از سوییچ
`b-`
استفاده کنید. این سوییچ هر موقع که ابزار عددی جز 
<u>0</u>
بازگرداند، یک صدای
beep
می‌کند.


```
$ watch -b -n 1 'bikhodi'
```


---

### توقف اجرا در زمان خطا

اگر برنامه خطایی داد و شما نیاز داشته باشید که خطار را مشاهده کنید،
در حالت عادی برنامه با وجود خطا هم اجرا خواهد شد، اما برای اینکه زمان
خطا برنامه از اجرا متوقف شود، سوییچ
`e-`


```bash
$ watch -n 1 -e 'ls -lh'
```


---

### توقف در زمان تغییر خروجی

ممکنه نیاز داشته باشید تا زمانی که خروجی شما تغییر کرد
برنامه را از اجرا متوقف کنید، سوییچ
`g-`
این کار را برای شما خواهد کرد.


```bash
$ watch -n 1 -g 'ls'
```




---

### Author or Authors

- *[Arya](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
