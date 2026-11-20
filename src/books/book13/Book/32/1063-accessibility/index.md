---
layout: layout.njk
title: "۱۰۶.۳ دسترسی‌پذیری و امکانات معلولین (a11y)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 32
chapterSection: "موضوع ۱۰۶: رابط‌های کاربری و دسکتاپ"
permalink: /books/book13/Book/32/1063-accessibility/index.html
---
{% raw %}
# ۱۰۶.۳ دسترسی‌پذیری و امکانات معلولین (a11y)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> نرم‌افزارهای صفحه‌خوان (Orca)، بزرگ‌نمایی صفحه، صفحه‌کلیدهای مجازی و تم‌های با کنتراست بالا.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/37tZYcg_wpc" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۱_

نشان دادن دانش و آگاهی درباره فناوری‌های دسترسی‌پذیری (Accessibility).

### حوزه‌های دانش کلیدی

* دانش پایه از تنظیمات بصری و تم‌ها
* دانش پایه از فناوری‌های کمکی (Assistive Technology)

### اصطلاحات و ابزارها

* تم‌های دسکتاپ با کنتراست بالا و نوشته‌های درشت (`High Contrast` / `Large Print Desktop Themes`)
* صفحه‌خوان (`Screen Reader`)
* نمایشگر بریل (`Braille Display`)
* ذره‌بین صفحه (`Screen Magnifier`)
* صفحه‌کلید روی صفحه (`On-Screen Keyboard`)
* کلیدهای چسبان و تکرار (`Sticky` / `Repeat keys`)
* کلیدهای آهسته، پرش و تغییر وضعیت (`Slow` / `Bounce` / `Toggle keys`)
* کلیدهای ماوس (`Mouse keys`)
* ژست‌های حرکتی (`Gestures`)
* تشخیص صدا (`Voice recognition`)

## لینوکس برای همه است

بعضی از افراد محدودیت‌ها یا مشکلات جسمی دارند. بعضی‌ها خوب نمی‌بینند، بعضی‌ها اصلاً نمی‌بینند و بعضی‌ها هم نمی‌توانند مثل اغلب آدم‌ها از انگشتانشان استفاده کنند. لینوکس ۳ پاسخ برای این نیازها دارد:

۱. **AccessX** به افرادی که مشکلات حرکتی دارند کمک می‌کند از صفحه‌کلید و ماوس استفاده کنند.
۲. **تنظیمات بصری (Visual Settings)** با بزرگ‌نمایی صفحه و امکاناتی از این دست به افراد کم‌بینا کمک می‌کند.
۳. **فناوری‌های کمکی (Assistive Technologies)** مثل تبدیل متن به گفتار (`TTS`) هستند که محتوای صفحه را برای افراد دارای اختلال بینایی می‌خوانند.

این گزینه‌ها هم در مدیرهای نمایش (صفحه ورود) و هم در دسکتاپ‌های اصلی (مثل GNOME، KDE Plasma، Xfce و...) در دسترس هستند.

در گنوم، این تنظیمات در مسیر `Settings -> Universal Access` قرار دارند. گزینه‌ها دسته‌بندی شده‌اند و شامل موارد زیر هستند:

* **کنتراست بالا (High Contrast)**
* **بزرگ‌نمایی (Zoom)**
* **متن بزرگ (Large text)**
* **صفحه‌خوان (Screen Reader)**
* **صفحه‌کلید مجازی (Screen Keyboard):** نمایش یک صفحه‌کلید روی صفحه نمایش
* **هشدارهای بصری (Visual Alerts):** به جای بوق زدن، صفحه نمایش چشمک می‌زند
* **کلیدهای چسبان (Sticky Keys):** مثلاً کلید `Shift` را بزنید و رها کنید، بعد کلید `a` را بزنید تا حرف بزرگ `A` تایپ شود
* **کلیدهای آهسته (Slow Keys):** تا چند ثانیه نگه داشتن یا فشردن کلید، حرف تکرار نشود یا بلافاصله ثبت نشود
* **کلیدهای پرش (Bounce Keys):** اگر تصادفی یک کلید را خیلی سریع دو بار پشت سر هم بزنید، دومی را قبول نمی‌کند
* **کلیدهای ماوس (Mouse Keys):** کلیدهای جهت‌نما روی بخش عددی صفحه‌کلید (Numpad) نقش ماوس را بازی می‌کنند
* **شبیه‌سازی کلیک راست (Simulate Secondary Click):** با نگه داشتن کلیک چپ انجام می‌شود
* **کلیک با مکث (Hover click):** کلیک کردن فقط با نگه داشتن نشانگر روی یک دکمه

## تبدیل متن به گفتار (TTS)

برنامه‌هایی مثل **Orca** یا **Emacspeak** می‌توانند پنجره‌های محاوره‌ای (Dialog Box) را برایتان بخوانند تا بتوانید فقط با شنیدن تصمیم بگیرید چه جوابی بدهید.

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book13/assets/braille.jpg" alt="یک نمایشگر بریل (Braille Display)" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

در تصویر بالا یک **نمایشگر بریل (Braille Display)** می‌بینید. این دستگاه خروجی متن را به صورت خط بریل برای افراد نابینا یا کم‌بینا نمایش می‌دهد، هرچند در صورت امکان، استفاده از یک سیستم مدرن تبدیل متن به گفتار یا صفحه‌خوان ممکن است کاربردی‌تر و راحت‌تر باشد.

## تشخیص صدا (Voice recognition)

با پیشرفت‌های اخیر در حوزه تشخیص صدا، این فناوری یکی از بهترین روش‌ها برای افرادی است که دارای معلولیت هستند تا بتوانند سیستم‌عامل خودشان را کنترل کنند.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1063_accessibility.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
