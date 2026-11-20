---
layout: layout.njk
title: "فصل 02: دستگاه‌های حلقه (Loop Device)"
---
{% raw %}
# فصل 02: دستگاه‌های حلقه (Loop Device)

### مقدمه   

درواقع
loop device 
یک فایل است که میتواند مانند فایل سیستم های دیگر ماونت شود.

برای مثال، هارد دیسک لپتاپ من یک ترابایت فضا دارد و من آن را به چهار قست 255 گیگابایتی تقسیم کرده ام.
و تقریبا هر پارتیشن را برای کار خاصی استفاده میکنم، مثلا ویندوز را به روی آن.
یکی از پارتیشن ها نصب میکنم.
loop device
دقیقا مانند یک پارتیشن هارد دیسک است اما با این تفاوت که
loop device
یک فایل به روی پارتیشن شماست!

---

### لیست تمامی loop device ها

برای لیست تمامی دیسک و پارتیشن ها از دستور
`lsblk`
استفاده میکنم، این دستور تمامی
loop device
ها را هم لیست میکند.
اما برای مدیریت و ساختن
loop device
از دستور
*losetup*
استفاده میکنیم.

برای لیست کردن تمامی
loop device
ها از سوییچ 
`a-`
استفاده میکنیم.

```bash
$ losetup -a
```

---

### ساخت و ماونت loop device

برای ساختن یک
loop device
باید اول یک فایل با فضای مورد نیاز بسازیم که بتوانیم آن فایل رو بعنوان یک
block device
استفاده کنیم. برای اینکار از کامند
[dd](/Gitab/books/book11/Book/16/dd/)
استفاده میکنیم.

برای مثال در پوشه
/var/local/
یک فایل یک گیگابایتی به اسم
*looper*
میسازیم

```bash
$ dd if=/dev/random of=/var/local/looper bs=10M count=100 status=progress
```

بعد از این، باید فایل واقعی
loop device
را بسازیم، که با استفاده از کامند
`losetup`
انجام میدهیم

اولین آرگومان این کامند باید مسیر
loop device
باشد و دومین آرگومان هم مسیر فایلی که میخواهیم به آن مپ شود.

```bash
$ sudo losetup /dev/loop0 /var/local/looper
```

<div class="callout callout-warning" style="background: rgba(245, 158, 11, 0.08); border-right: 4px solid #f59e0b; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">

**⚠️ هشدار:**

دقت کنید ممکن است نامی که برای
loop device
انتخاب کردین از قبل موجود باشد.

</div>


بعد از اینکار دستور
`lsblk`
یا
`losetup -a`
را بزنید، میبینید که یک
loop device
به لیست دیسک های شما اضافه شده است.

```bash
$ lsblk
# NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
# loop0    7:0    0  1000M  0 loop 

$ losetup
# /dev/loop0: []: (/var/local/looper/testloop)
```

چز این مرحله، یک مرحله دیگر در پیش است.
شما میتوانید با
loop device
مانند هر بلاک دیوایس دیگری عمل کنید. برای مثال آن را پارتیشن بندی و پارتیشن ها را ماونت کنید
و یا یک فایل سیستم درون آن ایجاد کنید.

برای اینکه برای شما واضح تر شود، من هر دو روش را مینویسم.

- شیوه نخست، ساخت پارتیشن

برای پارتیشن بندی از
[fdsik](/Gitab/books/book11/Book/18/fdisk/)
استفاده میکنیم، و یک پارتیشن با تمام فضای آن میسازیم.
بعد از ساختن پارتیشن، در مسیر
`/dev/`
میتوانیم پارتیشن را مشاهده کنیم.
در مثال ما از نام
*loop0*
برای
loop device 
استفاده کردیم، پس مسیر اولین پارتیشن ما به این صورت خواهد بود
`/dev/loop0p1`.

حال باید برای این پارتیشن یک فایل سیستم بسازیم. از دستور
[mkfs](/Gitab/books/book11/Book/35/mkfs/)
استفاده میکنیم.

```bash
$ mkfs.ntfs /dev/loop0p1 --quick
```

این پارتیشن آماده است و میتوانید آن را ماونت کنید.
به این صورت:

```bash
sudo mount /dev/loop0p1 /mnt
```

- شیوه دوم: ساختن یک فایل سیستم به صورت مستقیم

برای ساختن مستقیم فایل سیستم از دستور
[mkfs](/Gitab/books/book11/Book/35/mkfs/)
اسفاده میکنیم و فایلی که با کامند
dd
ساخته بودیم را به آن میدهیم

```bash
$ sudo mkfs.ext4 /var/local/looper/testloop
```

بعد از اتمام فرایند ساختن فایل سیستم میتوانیم
loop device
آن را از مسیر دیوایس ها
(dev/)
ماونت کنیم.

```bash
$ sudo mount /dev/loop0 /mnt
```

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">

**💡 نکته:**

مسیر مقصد برای ماونت کردن میتواند هر مسیری باشد. در مثال من از مسیر
_mnt/_
استفاده کردم

</div>

---

### جدا کردن loop device از فایل

برای جدا کردن یک
loop device
که به یک فایل مپ شده است از
losetup
و سوییچ
`d-`
استفاده میکنیم و مسیر بلاک دیوایس را به عنوان ورودی به آن میدهیم

```bash
$ sudo losetup -d /dev/loop0
```

<div class="callout callout-warning" style="background: rgba(245, 158, 11, 0.08); border-right: 4px solid #f59e0b; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">

**⚠️ هشدار:**

دقت کنید قبل از جدا کردن
loop device
ماونت نباشد.

</div>

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">

**💡 نکته:**

اگر قصد دارید تا
loop device
را حذف کنید، بعد از
detach
کردن، فایل آن را حذف کنید.

</div>

---

### نویسنده و نویسندگان

- *[arya](https://github.com/shabane)* | **<m.mohamadshabane@gmail.com>**
{% endraw %}
