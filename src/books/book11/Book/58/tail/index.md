---
layout: layout.njk
title: "فصل 58: ابزار tail (Linux tail Command)"
---
{% raw %}
# فصل 58: ابزار tail (Linux tail Command)

### مقدمه
برای نمایش انتهای فایل از دستور tail استفاده می شود، بصورت پیشفرض این دستور 10 خط انتهای فایل را در خروجی استاندارد چاپ می کند. این دستور جز GNU Core Utilities و برای سیستم عامل های متعدد در دسترس می باشد، همچنین tail یکی از دستورات پر کاربرد در مطالعه لاگ های سیستم بوده که با آپشن های متفاوت این امر را تسهیل می کند.



---


### الگوی استفاده

برای بهره بردن از این دستور کافیست از الگوی زیر استفاده کنید.


    $ tail [options] <files>

---


### ساده ترین روش استفاده

همچنین ساده ترین روش برای استفاده از این دستور روش زیر می باشد.


    $ tail <files>

    $ tail /var/log/dpkg.log

    # 2022-04-22 18:59:47 status installed rsyslog:amd64 8.2001.0-1ubuntu1.1
    # 2022-04-22 18:59:47 trigproc man-db:amd64 2.9.1-1 <none>
    # 2022-04-22 18:59:47 status half-configured man-db:amd64 2.9.1-1
    # 2022-04-22 18:59:51 status installed man-db:amd64 2.9.1-1
    # 2022-04-22 18:59:51 trigproc dbus:amd64 1.12.16-2ubuntu2.1 <none>
    # 2022-04-22 18:59:51 status half-configured dbus:amd64 1.12.16-2ubuntu2.1
    # 2022-04-22 18:59:51 status installed dbus:amd64 1.12.16-2ubuntu2.1
    # 2022-04-22 18:59:51 trigproc initramfs-tools:all 0.136ubuntu6.7 <none>
    # 2022-04-22 18:59:51 status half-configured initramfs-tools:all 0.136ubuntu6.7
    # 2022-04-22 19:00:14 status installed initramfs-tools:all 0.136ubuntu6.7

---


### تغییر تعداد خطوط خروجی 
برای تغییر تعداد خطوط چاپ شده در خروجی کافیست از سوییچ های -n یا --lines استفاده کرد، برای نمونه:


    $  tail -n 15 /proc/devices

    #  68 sd
    #  69 sd
    #  70 sd
    #  71 sd
    # 128 sd
    # 129 sd
    # 130 sd
    # 131 sd
    # 132 sd
    # 133 sd
    # 134 sd
    # 135 sd
    # 253 device-mapper
    # 254 mdp
    # 259 blkext

---


### چاپ تعداد بایت خاص
یکی دیگر از قابلیت های کاربردی، چاپ تعداد بایت مشخص در خروجی استاندارد می باشد، به منظور استفاده از این قابلیت از سوییچ -c یا --bytes استفاده می شود.


    $ tail -c 100 /proc/cpuinfo

    # size    : 64
    # cache_alignment : 64
    # address sizes   : 43 bits physical, 48 bits virtual
    # power management:

---


### چاپ خطوط انتهایی چند فایل بصورت همزمان
برای نمایش 10 خط آخر چندین فایل بصورت همزمان، از الگوی زیر هنگام استفاده می شود.



    $ tail /proc/devices /var/log/dpkg.log
    
    # ==> /proc/devices <==
    # 129 sd
    # 130 sd
    # 131 sd
    # 132 sd
    # 133 sd
    # 134 sd
    # 135 sd
    # 253 device-mapper
    # 254 mdp
    # 259 blkext

    # ==> /var/log/dpkg.log <==
    # 2022-04-22 18:59:47 status installed rsyslog:amd64 8.2001.0-1ubuntu1.1
    # 2022-04-22 18:59:47 trigproc man-db:amd64 2.9.1-1 <none>
    # 2022-04-22 18:59:47 status half-configured man-db:amd64 2.9.1-1
    # 2022-04-22 18:59:51 status installed man-db:amd64 2.9.1-1
    # 2022-04-22 18:59:51 trigproc dbus:amd64 1.12.16-2ubuntu2.1 <none>
    # 2022-04-22 18:59:51 status half-configured dbus:amd64 1.12.16-2ubuntu2.1
    # 2022-04-22 18:59:51 status installed dbus:amd64 1.12.16-2ubuntu2.1
    # 2022-04-22 18:59:51 trigproc initramfs-tools:all 0.136ubuntu6.7 <none>
    # 2022-04-22 18:59:51 status half-configured initramfs-tools:all 0.136ubuntu6.7
    # 2022-04-22 19:00:14 status installed initramfs-tools:all 0.136ubuntu6.7

 

 برای حذف اسم فایل ها در خروجی از سوییچ های
 `-q`
 یا
 `-quiet`
 و
 یا
 `--silent`
 استفاده می شود.

 همچنین به جهت اجبار به چاپ نام فایل در خروجی چند فایل از سوییچ
 `-v`
 یا
 `--verbose`
 استفاده می شود.
 

---



### مشاهده نسخه     
برای مشاهده نسخه پکیج نصب شده روی سیستم عامل از سوییچ
`--version`
استفاده می شود.


    $ tail --version
    # tail (GNU coreutils) 8.30
    # Copyright (C) 2018 Free Software Foundation, Inc.
    # License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
    # This is free software: you are free to change and redistribute it.
    # There is NO WARRANTY, to the extent permitted by law.

    # Written by Paul Rubin, David MacKenzie, Ian Lance Taylor,
    and Jim Meyering.

---


### مشاهده دستور help
برای مشاهده help دستور کافیست از سوییچ --help استفاده کنید، خروجی این سوییچ با man tail متفاوت است.


    $ tail --help
---


### مشاهده فایل بصورت زنده برای مانیتور تغییرات

برای نظارت بصورت مداوم نسبت به تغییرات انتهای فایل از سوییچ
`f-`
استفاده می شود، این سوییچ برای مطالعه لاگ هایی که بصورت پویا در فایلی اقدام به نوشتن می کنند بسیار پر کاربرد می باشد.


    $ tail -f /var/log/apache2/access.log



در برخی موارد ممکن است یک فایل بصورت مکرر حذف شود به جهت مانیتور کردن آن می توان از سوییچ
`F-`
استفاده کرد، عملکرد این سوییچ همانند استفاده ترکیبی از سوییچ
این دو سوییچ می‌باشد

```bash
-f FileName --retry
```




    $ tail -F /var/log/apache2/access.log



برای مواردی که ممکن است فایل حذف شود کافیست از سوییچ --retry استفاده کرد تا به محض در دسترس قرار گرفتن فایل با همان نام مجدد چرخه نظارت به جریان برگردد.



    $ tail --follow=access.log --retry /var/log/apache2/access.log

---


### وابسته کردن حالت نظارت به یک pid

فرض کنید پردازیشی با
pid(شماره پردازش)
1337
درحال اجرا است، این پروسه کاری هایی که انجام می‌دهد را لاگ می‌کند
و شما می‌خواهید هر تغییر در لاگ را به صورت همگام مشاهده کنید. و زمانی که این پردازش
به پایان برسد دیگر لاگ ها نمایش داده نشوند.

شما می توانید برای نظارت از سوییچ
`pid--`
استفاده کنید تا بعد از پایان
PID
مورد نظر دستور
tail
نیز پایان بیابد.



    $ tail -f --pid=1337 /root/task.log

---


### ایجاد وقفه در زمان نظارت

در زمانی که نرخ نوشتن در فایل بالا می باشد شما می توانید با سوییچ
`s-` 
به مدت
N
ثانیه از نمایش آخرین تغییرات جلوگیری کنید.


    
    $ $ tail -f -s 10 /var/log/apache2/access.log

---

### Author or Authors

- *[Milad](https://github.com/MiKDev)* | **<milad_karimiyan@live.com>**
{% endraw %}
