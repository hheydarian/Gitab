---
layout: layout.njk
title: "آماده‌سازی محیط آزمایشگاهی برای تمرین"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 2
chapterSection: "مقدمه و آمادگی"
permalink: /books/book13/Book/02/0002-prepare-lpic101-102-lab/index.html
---
{% raw %}
# آماده‌سازی محیط آزمایشگاهی برای تمرین

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> روش‌های راه‌اندازی ماشین مجازی لینوکس با VirtualBox یا UTM و نصب دو توزیع مبتنی بر دبیان و مبتنی بر ردهت جهت تسلط بر تمامی سرفصل‌های آزمون.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/dm_1z7dLAuQ" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- چرا آزمون LPIC مستقل از توزیع (Distro Agnostic) است؟
- انتخاب نرم‌افزار مجازی‌سازی مناسب (VirtualBox یا UTM)
- راه‌اندازی دو محیط لینوکسی مجزا: یکی بر پایه Debian (مانند Ubuntu) و دیگری بر پایه RPM (مانند Fedora یا Rocky Linux)

---

## 🛠️ راه‌اندازی لابراتوار تمرین

دیدن ویدئوهای آموزشی یا حتی خواندن چندباره کتاب‌ها هرگز برای تسلط کافی نیست. شما حتماً باید یک سیستم لینوکسی آماده به کار داشته باشید و تمامی مباحث جدیدی را که فرا می‌گیرید، بی‌درنگ در ترمینال آزمایش و تمرین کنید.

همان‌طور که می‌دانید، آزمون LPIC آزمونی **مستقل از توزیع (Distro Agnostic)** است؛ یعنی یک متخصص دارای مدرک LPIC باید بتواند بر روی هر توزیعی از گنو/لینوکس کار کند و دست‌کم بر جریان‌های اصلی مسلط باشد. به همین دلیل پیشنهاد می‌کنم حتماً **دو ماشین لینوکسی** برای تمرین در کنار هم داشته باشید:
1. یک ماشین بر پایه خانواده **دبیان (Debian-based)**؛ مانند **Ubuntu** یا خود **Debian**
2. یک ماشین بر پایه خانواده **رد هت (RPM-based)**؛ مانند **Fedora** یا **Rocky Linux**

### استفاده از ماشین‌های مجازی (Virtual Machines)
ساده‌ترین و امن‌ترین راهکار این است که روی سیستم‌عامل فعلی خود یک ابزار مجازی‌سازی نصب کنید:
* **در ویندوز، لینوکس و مک‌های اینتلی:** نرم‌افزار رایگان و متن‌باز [VirtualBox](https://www.virtualbox.org) را نصب نمایید.
* **در سیستم‌های مک با تراشه‌های سری M (Apple Silicon):** نرم‌افزار عالی و بهینه [UTM](https://mac.getutm.app) را به کار بگیرید.

### انتخاب توزیع‌ها
- برای سیستم دبیانی: نسخه دسکتاپ یا سرور **اوبونتو (Ubuntu 22.04 LTS یا جدیدتر)** یا **دبیان**.
- برای سیستم بر پایه RPM: آخرین نسخه پایدار **فدورا (Fedora)** یا **راکی لینوکس (Rocky Linux)**.

> **نکته:** شماره نسخه دقیق توزیع اهمیت حیاتی ندارد؛ اصل این است که مفاهیم بسته‌بندی (`dpkg`/`apt` در برابر `rpm`/`yum`/`dnf`)، سیستم‌های راه‌اندازی (`systemd`) و خط فرمان را در هر دو اکوسیستم به صورت عملی تجربه و لمس کنید. دست‌به‌کار شوید، محیط آزمایشی خود را برپا کنید و از شکستن و ساختن دوباره آن لذت ببرید!

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 گام بعدی:</strong>
  پس از راه‌اندازی ماشین‌های مجازی، در درس بعد مستقیماً وارد <a href="/Gitab/books/book13/Book/03/1011-determine-and-configure-hardware-settings/">سرفصل ۱۰۱.۱ و مباحث سخت‌افزار</a> خواهیم شد.
</div>
{% endraw %}
