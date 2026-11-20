---
layout: layout.njk
title: "فصل 17: ابزار df (Linux df Command)"
---
{% raw %}
# فصل 17: ابزار df (Linux df Command)

### مقدمه

ابزار df برای بررسی فضای خالی یا فضای استفاده شده در یک فایل سیستم لینوکس استفاده می‌شود.

ساختار کلی این دستور به شکل زیر است:



```
$ df [option] ... [FILE] ...
```



---

### بررسی تمام فضاهای مانت شده

اگر دستور df بدون هیچ آرگومانی استفاده شود لیستی را از فضاهای موجود در تمام فایل سیستم‌هایی که در حال حاضر مانت شده‌اند، نشان می‌دهد.

باید توجه داشته باشید که این دستور، فایل سیستم‌های مانت نشده را نشان نمی‌دهد.


```
$ df

# Filesystem     1K-blocks      Used Available Use% Mounted on
# tmpfs            1589124      2688   1586436   1% /run
# /dev/nvme0n1p6  60373924  44709612  12571784  79% /
# tmpfs            7945612     41424   7904188   1% /dev/shm
# tmpfs               5120         4      5116   1% /run/lock
# /dev/nvme0n1p8  79407872  52876308  22452156  71% /home
# /dev/nvme0n1p1     98304     33879     64425  35% /boot/efi
# tmpfs            1589120       156   1588964   1% /run/user/1000
# /dev/sda3      958786348 901281808   8727580 100% /media/rahim/makhzan
```


---

### بررسی یک فایل سیستم خاص

وارد کردن نام و آدرس فایل سیستم مانت شده:


```
$ df /dev/sda3

# Filesystem     1K-blocks     Used Available Use% Mounted on
# /dev/sda3      958786348 901281808   8727580 100% /media/rahim/makhzan
```


---

### بررسی یک فایل سیستم حاوی یک فایل

اگر یک فایل به دستور df  داده شود اطلاعات فایل سیستمی را می‌دهد که شامل این فایل خاص باشد. برای این کار کافی است که مسیر فایل را جلوی این دستور اضافه کنید:


```
$ df sample.txt

# Filesystem     1K-blocks     Used Available Use% Mounted on
# /dev/nvme0n1p8  79407872 52873308  22455156  71% /home
```


چون این فایل در دایرکتوری home قرار دارد، نتیجه نمایش داده شده همان نتیجه‌ای است که در مثال اول در ردیف پنجم نتایج، لیست شده بود 

---

### دیدن تمام فایل سیستم ها

**-a, --all**

تمام انواع فایل سیستم‌ها (حتی با سایز صفر) را هم نشان می‌دهد


```
$ df -a

# Filesystem     1K-blocks     Used Available Use% Mounted on
# sysfs                  0         0         0    - /sys
# proc                   0         0         0    - /proc
# udev             7910236         0   7910236   0% /dev
# devpts                 0         0         0    - /dev/pts
# tmpfs            1589124      2692   1586432   1% /run
# /dev/nvme0n1p6  60373924  44717800  12563596  79% /
...
```


---

### تعیین مقیاس نمایش

**-B, --block-size=SIZE**

تمام اندازه‌ها را بر اساس مقیاس مشخص شده در  SIZE نشان می‌دهد:


```
$ df df -B M

# Filesystem     1M-blocks     Used Available Use% Mounted on
# tmpfs              1552M      3M     1550M   1% /run
# /dev/nvme0n1p6    58959M  43670M    12270M  79% /
# tmpfs              7760M     18M     7742M   1% /dev/shm
...
```



آرگومان SIZE یک واحد اختیاری است که اگر به صورت 10K استفاده شود بر اساس ضرایب 1024 است و اگر به صورت KB استفاده شود بر اساس ضرایب 1000 خواهد بود. پیشوندهای باینری ماننند KiB=B هم قابل استفاده هستند.

---

### دیدن مقیاس به صورت ساده شده

**-h, --human-readable**

سایزها را بر اساس  ضرایب 1024 نشان می‌دهد (مانند 1023M)


```
$ df -h

# Filesystem      Size  Used Avail Use% Mounted on
# tmpfs           1.6G  2.7M  1.6G   1% /run
# /dev/nvme0n1p6   58G   43G   12G  79% /
# tmpfs           7.6G   18M  7.6G   1% /dev/shm

```


---

### مقیاس 1000

**-H, --si**

نتایج را بر اساس ضرایب 1000 نشان می‌دهد (مانند 1.1G):


```
$ df -H

# Filesystem      Size  Used Avail Use% Mounted on
# tmpfs           1.7G  2.8M  1.7G   1% /run
# /dev/nvme0n1p6   62G   46G   13G  79% /
# tmpfs           8.2G   22M  8.2G   1% /dev/shm
...
```


---

### نمایش آی نودها

**-i, --inodes**

لیستی از اطلاعات inodeها را به جای اطلاعات بلوک‌ها نمایش  می‌دهد:


```
$ df -i
# Filesystem       Inodes   IUsed    IFree IUse% Mounted on
# tmpfs           1986403    1496  1984907    1% /run
# /dev/nvme0n1p6  3842720 1869070  1973650   49% /
# tmpfs           1986403      68  1986335    1% /dev/shm
...
```


---

### تعیین سایز بلوک

**-k**

مانند آن است که سایز واحد نمایش را به صورت --block-size=1K تعریف کنیم:


```
$ df -k

# Filesystem     1K-blocks      Used Available Use% Mounted on
# tmpfs            1589124      2692   1586432   1% /run
# /dev/nvme0n1p6  60373924  44717860  12563536  79% /
# tmpfs            7945612     21448   7924164   1% /dev/shm
...
```


---

### نمایش فایل سیستم های لوکال

**-l, --local**

لیست ننایج را به فایل سیستم‌های لوکال محدود می‌کند:


```
$ df -l
# Filesystem     1K-blocks      Used Available Use% Mounted on
# tmpfs            1589124      2692   1586432   1% /run
# /dev/nvme0n1p6  60373924  44717864  12563532  79% /
# tmpfs            7945612     18376   7927236   1% /dev/shm
```


---

### نتایج بدون سینک کردن

**--no-sync**

قبل از دریافت اطلاعات سینک را انجام نمی‌دهد (به صورت پیشفرض این گزینه فعال است).

---

### تعیین فیلدهای خروجی

**--output[=FIELD_LIST]**

فرمت خروجی را مشخص می‌کند. اگر مقداری برای آن تعریف نشود تمام فیلدها را نشان می‌دهد:


```
$ df --output=source,avail

# Filesystem        Avail
# tmpfs           1586432
# /dev/nvme0n1p6 12563520
# tmpfs           7927236
```


مقدارهای معتبر برای فیلدها موارد زیر هستند:


```
'source', 'fstype', 'itotal', 'iused', 'iavail', 
'ipcent', 'size', 'used', 'avail', 'pcent' and 'target' 
```


---

### نتایج بر اساس POSIX

**-P,- -portability**

از فرمت POSIX برای نشان دادن نتایج استفاده می‌کند:


```
$ df -P

# Filesystem     1024-blocks      Used Available Capacity Mounted on
# tmpfs              1589124      2692   1586432       1% /run
# /dev/nvme0n1p6    60373924  44717876  12563520      79% /
# tmpfs              7945612     18376   7927236       1% /dev/sh
```


---

### دیدن نتایج به همراه سینک کردن

**--sync**

قبل از گرفتن اطلاعات سینک انجام می‌دهد.

---

### محاسبه مجموع فضاها

**--total**

تمام مقادیر ناچیز را حذف می‌کند و یک مقدار مجموع هم در آخر نتایج محاسبه می‌کند:


```
$ df --total

# Filesystem      1K-blocks      Used Available Use% Mounted on
# tmpfs             1589124      2692   1586432   1% /run
# /dev/nvme0n1p6   60373924  44717880  12563516  79% /
# tmpfs             7945612     18376   7927236   1% /dev/shm
# tmpfs                5120         4      5116   1% /run/lock
# /dev/nvme0n1p8   79407872  52871212  22457252  71% /home
# /dev/nvme0n1p1      98304     33879     64425  35% /boot/efi
# tmpfs             1589120       148   1588972   1% /run/user/1000
# /dev/sda3       958786348 901281812   8727576 100% /media/rahim/makhzan
# total          1109795424 998926003  54920525  95% -
```


---

### نمایش فضاهای یک نوع فایل سیستم

**-t, --type=TYPE**

نتایج را به یک نوع خاص از فایل سیستم محدود می‌کند:


```
$ df -t tmpfs   

# Filesystem     1K-blocks  Used Available Use% Mounted on
# tmpfs            1589124  2692   1586432   1% /run
# tmpfs            7945612 18376   7927236   1% /dev/shm
# tmpfs               5120     4      5116   1% /run/lock
# tmpfs            1589120   148   1588972   1% /run/user/1000
```


---

### نمایش ستون نوع فایل سیستم

**-T, --print-type**

نوع فایل سیستم را نیز نشان می‌دهد:


```
$ df -T

# Filesystem     Type  1K-blocks      Used Available Use% # Mounted on
# tmpfs          tmpfs   1589124      2692   1586432   1% /run
# /dev/nvme0n1p6 ext4   60373924  44717888  12563508  79% /
# tmpfs          tmpfs   7945612     18376   7927236   1% /dev/shm
```


---

### حذف یک فایل سیستم خاص از نتایج

**-x, --exclude-type=TYPE**

یک نوع خاص از فایل سیستم را از نتایج حذف می‌کند:


```
$ df -x tmpfs

# Filesystem     1K-blocks      Used Available Use% Mounted on
# /dev/nvme0n1p6  60373924  44717888  12563508  79% /
# /dev/nvme0n1p8  79407872  52874604  22453860  71% /home
# /dev/nvme0n1p1     98304     33879     64425  35% /boot/efi
```


---

### واحدهای نمایش

دستور
df
به صورت پیشفرض از 
1 K blocks 
برای نمایش واحد استفاده می‌کند.

واحد مورد نظر یا از گزینه 
–block-size
و یا اولین واحد مشخص شده در یکی از متغیرهای محیطی
DF_BLOCK_SIZE, BLOCKSIZE AND BLOCK_SIZE
برداشت شده و استفاده می‌شود.

بلوک سایز به ترتیب یکی از واحدهای زیر را می‌تواند داشته باشد:

**K** as in Kilo, **M**, **G**, **T**, **P**, **E**, **Z**, **Y**

---



Author or Authors:

- *[Rahim](https://github.com/rahimz)* | **<rahim.django.projects@gmail.com>**
{% endraw %}
