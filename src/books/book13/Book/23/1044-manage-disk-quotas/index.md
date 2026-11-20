---
layout: layout.njk
title: "۱۰۴.۴ سهمیه‌بندی دیسک (Quotas - سرفصل قدیمی)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 23
chapterSection: "موضوع ۱۰۴: دیسک‌ها و فایل‌سیستم‌ها"
permalink: /books/book13/Book/23/1044-manage-disk-quotas/index.html
---
{% raw %}
# ۱۰۴.۴ سهمیه‌بندی دیسک (Quotas - سرفصل قدیمی)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> مرور تاریخی سهمیه‌بندی فضای دیسک برای کاربران و گروه‌ها در نگارش‌های گذشته.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/KJPvfqe-Bls" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

<div class="alert alert-danger" role="alert">
  این فصل در آخرین نگارش آزمون LPIC-1 (نسخه ۵۰۰) حذف شده است و در اینجا صرفاً به عنوان مرجع و برای آشنایی بیشتر نگهداری می‌شود.
</div>

## ۱۰۴.۴ مدیریت سهمیه‌بندی دیسک (Manage disk quotas)

**ضریب اهمیت در آزمون (Weight):** ۱

داوطلبان باید بتوانند سهمیه دیسک (Disk Quotas) را برای کاربران مدیریت کنند.

### اهداف و دستورهای کلیدی

* تنظیم سهمیه دیسک برای یک فایل‌سیستم
* ویرایش، بررسی و تولید گزارش‌های سهمیه کاربران

ابزارهای مرتبط:

<div dir="ltr">

* `quota`
* `edquota`
* `repquota`
* `quotaon`

</div>

### فعال‌سازی سهمیه‌بندی (Enabling quotas)

سهمیه‌بندی یا **Quota** به مدیر سیستم اجازه می‌دهد کنترل کند که هر کاربر یا گروه چقدر می‌تواند از فضای دیسک استفاده کند. نسخه ۲ سیستم سهمیه‌بندی که در LPIC بررسی می‌شود، به هسته (Kernel) ۲.۴ و بالاتر نیاز دارد و بسته نرم‌افزاری آن `quota` نام دارد.

گزینه‌های مربوطه باید به فایل `/etc/fstab` برای پارتیشن مورد نظر اضافه شوند. معروف‌ترین این گزینه‌ها عبارت‌اند از:

| گزینه | معنی |
| :--- | :--- |
| `usrquota` | سهمیه‌بندی برای کاربران |
| `uquota` | معادل `usrquota` |
| `quota` | معادل `usrquota` |
| `grpquota` | سهمیه‌بندی برای گروه‌ها |
| `gquota` | معادل `grpquota` |

بنابراین برای مثال اگر بخواهیم سهمیه‌بندی را روی `sda2` فعال کنیم، باید خط مربوطه در `/etc/fstab` را به این شکل تغییر دهیم:

```text
/dev/sda2  /home  ext4    defaults,usrquota,grpquota          1 2
```

در مرحله بعد باید سهمیه هر کاربر و هر گروه را مشخص کنیم. دو فایل به نام‌های `aquota.user` و `aquota.group` در ریشه آن فایل‌سیستم این کار را انجام می‌دهند. حالا کافی است دستور `quotacheck` را اجرا کنیم.

> **نکته:** دستور `quotacheck` در صورتی که فایل‌های `aquota.user` و `aquota.group` وجود نداشته باشند، آن‌ها را می‌سازد.

```text
# quotacheck -u -a -m -c -v
quotacheck: Your kernel probably supports journaled quota but you are not using it. Consider switching to journaled quota to avoid running quotacheck after an unclean shutdown.
quotacheck: Scanning /dev/sda1 [/boot] done
quotacheck: Old group file name could not been determined. Usage will not be subtracted.
quotacheck: Checked 13 directories and 389 files
# ls /boot/
aquota.user
```

این دستور فایل‌های سهمیه را برای کاربران (`-u`) روی تمام فایل‌سیستم‌ها (`-a`) می‌سازد (`-c`) و روی فایل‌سیستم‌های مانت‌شده هم کار می‌کند (`-m`)، آن هم با نمایش جزئیات کامل (`-v`).

سپس باید بررسی سهمیه را روشن (فعال) کنید:

```text
# quotaon -auv ##all in /etc/fstab, for user quotas and be verbose
/dev/sda1 [/boot]: user quotas turned on
```

### تعیین محدودیت‌ها (Setting limits)

دستور اصلی برای **ویرایش** سهمیه، `edquota` است. این دستور سهمیه کاربر را در تمام فایل‌سیستم‌ها بررسی کرده و آن‌ها را در یک ویرایشگر متن به شما نمایش می‌دهد:

```text
#edquota -u jadi
Disk quotas for user jadi (uid 1000):
  Filesystem                   blocks       soft       hard     inodes     soft     hard
  /dev/sda1                         0          0          0          0        0        0
```

همانطور که می‌بینید، سیستم تعداد بلوک‌های ۱ کیلوبایتی فعلی، تعداد inodeها (تعداد فایل‌ها و دایرکتوری‌ها) و محدودیت‌های نرم (`soft`) و سخت (`hard`) برای هر یک از آن‌ها را نشان می‌دهد. اگر کاربری از محدودیت نرم خود عبور کند، ایمیل‌های هشدار دریافت می‌کند (و مهلت زمانی محدودی یا Grace period دارد). محدودیت سخت مرز واقعی است و کاربر به هیچ وجه نمی‌تواند از آن عبور کند. برای ثبت محدودیت‌های نرم یا سخت، کافی است مقادیر را در فایل تغییر دهید و ذخیره کنید.

> **نکته:** برای به‌روزرسانی این داده‌ها باید دستور `quotacheck` را اجرا کنید.

برای کپی کردن محدودیت‌های یک کاربر برای کاربران دیگر، از سوییچ `-p` استفاده کنید:

```text
# edquota -p jadi newuser neweruser lastuser
```

### گزارش‌های سهمیه (quota reports)

اگر فقط می‌خواهید سهمیه یک کاربر را بررسی کنید، از دستور `quota` استفاده کنید:

```text
# quota  jadi
Disk quotas for user jadi (uid 1000):
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
      /dev/sda1       5    5000       0               2       0       0
```

اگر تعداد کاربران زیاد باشد این روش چندان راحت نیست؛ پس می‌توانید از `repquota` به شکل زیر استفاده کنید:

```text
# repquota -u -a
*** Report for user quotas on device /dev/sda1
Block grace time: 7days; Inode grace time: 7days
                        Block limits                File limits
User            used    soft    hard  grace    used  soft  hard  grace
----------------------------------------------------------------------
root      --  120288       0       0            401     0     0       
jadi      --       5    5000       0              2     0     0
```

### هشدار دادن به کاربران (Warning users)

دستوری برای بررسی سهمیه‌ها و ارسال هشدار به کاربران وجود دارد به نام `warnquota`. ایده خوبی است که گه‌گاهی با استفاده از `crontab` (که در ادامه کتاب با آن آشنا می‌شویم) این دستور را اجرا کنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1044_manage_disk_quotas.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
