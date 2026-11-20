---
layout: layout.njk
title: "فصل 08: ابزار btop (Linux btop Command)"
---
{% raw %}
# فصل 08: ابزار btop (Linux btop Command)

### مقدمه
در حوزه مدیریت و مانیتورینگ پروسه ها ابزار هایی مانند htop, ps و ... وجود دارند. اما اگر به دنبال یک ابزار شیک و منظم هستید حتما btop را امتحان کنید. این ابزار اطلاعات کاملی راجب وضعیت رم ها هارد دیسک ها سی پی یو و .... به شما میدهد. فقط لازم است بدانید که این ابزار به شکل پیشفرض نصب نیست و باید آن را با استفاده از پکیج منیجر خاص توزیع خودتان نصب کنید.


---


### مانیتور کردن وضعیت کامپیوتر
با استفاده از دستور btop به تنهایی میتوانید وضعیت کامپیوتر را به شکل کامل مشاهده کنید. وضعیت رم ها، هارد دیسک ها، سی پی یو، دمای سی پی یو، پروسه ها و وضعیت شبکه برای شما قابل مانیتور کردن میباشد.

<p align="center">
  <img src="/Gitab/books/book11/assets/btop/Monitoring.png" />
</p>



    # View The Computer Status with btop
    $ btop
    

---


### کشتن و بستن یک پروسه
برای بستن یک پروسه باید در ابتدا آن را انتخاب کنید، با کلیدهای جهت نمای بالا و پایین در پروسه ها چرخی بزنید و چنانچه خواستید پروسه خاصی را ببندید از کلید k کیبورد استفاده کنید. بعد از انتخاب کلید k پنجره ای با پیغام برای شما نمایش داده میشود که در صورت تایید شما پروسه بسته خواهد شد. و در غیر اینصورت پروسه باقی خواهد ماند.
لازم به ذکر است بدانید که ابزار به شکل پیشفرض از سیگنال شماره ۹ یا force kill برای بستن پروسه هااستفاده میکند.
<p align="center">
 <img src="/Gitab/books/book11/assets/btop/Killprocess.png">
 </p>



    # step 1
    # up & down in process with up & down Key

    # step 2
    # select the k for kill process

    # step 3
    # Enter the Yes for kill process


---


### نمایش اطلاعات یک پروسه
اگر میخواهید که راجب یک پروسه اطلاعاتی به دست بیاورید از کلید اینتر استفاده کنید. روی پروسه ای که میخواهید راجب آن اطلاعاتی را به دست بیاورید اینتر کنید، بعد از اینتر اطلاعات پروسه به شما نمایش داده میشود.

<p align="center">
 <img src="/Gitab/books/book11/assets/btop/process status.png">
</p>

    
    # Select The (Enter Key) For Show The Process Status

---


### جستجوی پروسه ها
برای جستجوی پروسه ها از کلید F کیبورد استفاده کنید، بعد از انتخاب کلید نام پروسه را وارد کنید، پروسه در صورت فعال بودن به شما نمایش داده میشود همچنین میتوانید با کلیک بر روی آن اطلاعاتی را راجب پروسه مد نظر به دست بیاورید و در صورتی که میخواستید پروسه را از بین ببرید کلید k را فشار دهید تا پروسه به دیار باقی بشتابد.

<p align = "center">
 <img src="/Gitab/books/book11/assets/btop/Search for process.png">
</p>



    # step 1
    # select the F key

    # step 2
    # Type The Process Name



---


### تغییر حالت نمایش وضعیت
برای تغییر سریع حالت نمایش وضعیت از کلید p کیبورد استفاده کنید. هنگام استفاده حالت نمایش وضعیت تغییر خواهد کرد. البته لازم به ذکر است بدانید که در تنظیمات ابزار میتوانید تغییرات بیشتری را در حالت نمایش ایجاد کنید.


<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/btop/Display%20mode%201.png" alt="تصویر کتاب" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>


<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/btop/Display%20mode%202.png" alt="تصویر کتاب" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>


<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/btop/Display%20mode%203.png" alt="تصویر کتاب" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>


<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book11/assets/btop/Display%20mode%204.png" alt="تصویر کتاب" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>



---

### Author or Authors

- *[Amirhosein](https://github.com/amirhoseinsb)* | **<amirhoseinsohrabi.official@gmail.com>**
{% endraw %}
