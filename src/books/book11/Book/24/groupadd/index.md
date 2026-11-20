---
layout: layout.njk
title: "فصل 24: ابزار groupadd (Linux groupadd Command)"
---
{% raw %}
# فصل 24: ابزار groupadd (Linux groupadd Command)

### مقدمه
با استفاده از ابزار groupadd میتوانید گروه های جدید با دسترسی های متفاوت ایجاد کنید. برای مثال گروهی ایجاد کنید که فقط دسترسی خواندن داشته باشد.




---


### ایجاد گروه جدید
با استفاده از دستور groupadd و نام گروه میتوانید به سادگی گروه خود را ایجاد کنید .
فقط توجه داشته باشید که اگر گروه مورد نظر از قبل وجود داشته باشد شما ارور دریافت خواهید کرد.
برای رفع ارور از سوییچ f- استفاده کنید. در اینصورت اگر گروهی هم اسم گروه شما از قبل وجود داشته باشد مجددا ساخته میشود. هنگام استفاده از این سوییچ دقت کنید.


    # create new group
    $ sudo groupadd groupname

    # create group with -f
    $ sudo groupadd -f groupname 

---


### ایجاد گروه با gid خاص
اگر میخواستید که گروه شما با gid خاصی ساخته شود از از سوییچ g- استفاده کنید.
با استفاده از این سوییچ میتوانید گروه خود را با شناسه گروهی خاصی ایجاد کنید.



    # create group with specific gid
    $ sudo groupadd -g 2222 groupname


---


### ایجاد گروه با پسورد
هر چند این کار در محیط واقعی میتواند مشکلات امنیتی ایجاد کند، زیرا هر شخصی باید پسورد گروه را بداند تا بتواند به گروه بپیوندد. اما به هر حال اگر میخواهید گروهی با پسورد ایجاد کنید از سوییچ p- استفاده کنید.




    # create group with password
    $ sudo groupadd -p password groupname


---


### اضافه کردن حساب های کاربری به گروه
با استفاده از سوییچ aG- میتوانید حساب های کاربری را به گروه یا گروه های خاصی اضافه کنید.



    # add user the group
    $ sudo adduser -aG groupname


---
### Author or Authors

- *[Amirhosein](https://github.com/amirhoseinsb)* | **<amirhoseinsohrabi.official@gmail.com>**
{% endraw %}
