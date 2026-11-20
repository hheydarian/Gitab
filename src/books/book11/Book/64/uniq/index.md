---
layout: layout.njk
title: "فصل 64: ابزار uniq (Linux uniq Command)"
---
{% raw %}
# فصل 64: ابزار uniq (Linux uniq Command)

### مقدمه
یکی از ابزارهای سریع و قدرتمند برای مرتب سازی فایل ها . البته لازم به ذکر است گفته شود که کاربرد اصلی این ابزار حذف کردن کلمات تکراری است ! اما شما میتوانید با سوییچ های مختلف ابزار روی فایل خود تغییرات زیادی را اعمال کنید و در نهایت خروجی را به فایل جدید انتقال دهید.



---


### حذف کردن کلمات تکراری
اگر در فایل شما کلمات تکراری زیادی وجود دارد و میخواهید آن ها را حذف کنید. با قرار دادن دستور uniq قبل از محل قرار گیری فایل مشکل کلمات تکراری فایل را از بین ببرید.


    $ cat test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Arya
      Alireza
      Faeze
      Faeze
    
    $ uniq test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Alireza
      Faeze
      
---


### نمایش تعداد تکرار کلمات در فایل
اگر خواستید که بعد از حذف کلمات تکراری تعداد آن ها در ابتدای خط چاپ شود از سوییچ -c استفاده کنید.


    $ cat test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Arya
      Alireza
      Faeze
      Faeze

    $ uniq -c test.txt
    # 1 Amirhosein
      1 Alireza
      1 Jadi
      2 Arya
      1 Alireza
      2 Faeze

---


### نمایش کلمات تکرار شده در فایل
اگر خواستید که فقط کلمات تکرار شده در فایل برای شما به نمایش درآید از سوییچ -d استفاده کنید.
در زمان استفاده از این سوییچ فقط کلمات تکرار شده در فایل برای شما چاپ خواهد شد.


    $ cat test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Arya
      Alireza
      Faeze
      Faeze

    $ uniq -d test.txt
    # Arya
      Faeze

---


### جدا کردن کلمات بر اساس حروف بزرگ
اگر در فایل شما از حروف بزرگ بیشتر استفاده شده است یا به دلیل خاصی میخواهید حروف بزرگ را چاپ کنید از سوییچ -i استفاده کنید.


    $ cat test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Arya
      Alireza
      Faeze
      Faeze

    $ uniq -i test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Alireza
      Faeze
     
---


### مرتب کردن و نمایش تعداد تکرار کلمه با ترکیب ابزار sort
شما میتوانید با ترکیب دو ابزار sort و uniq خروجی بسیار جالبی را مشاهده کنید.
با ترکیب این دو ابزار هم فایل شما مرتب میشود و هم کلمات تکراری حذف میشود و هم تکرار آن ها برای شما چاپ خواهد شد.


    $ cat test.txt
    # Amirhosein
      Alireza
      Jadi
      Arya
      Arya
      Alireza
      Faeze
      Faeze

    $ sort test.txt | uniq -c
    # 2 Alireza
      1 Amirhosein
      2 Arya
      2 Faeze
      1 Jadi

---

### Author or Authors

- *[Amirhosein](https://github.com/amirhoseinsb)* | **<amirhoseinsohrabi.official@gmail.com>**
{% endraw %}
