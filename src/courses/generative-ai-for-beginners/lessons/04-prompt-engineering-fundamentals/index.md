---
layout: layout.njk
title: "جلسه ۰۴: مبانی و اصول مهندسی پرامپت | دوره هوش مصنوعی مولد"
description: "یادگیری ساختار دقیق یک پرامپت موفق، نقش پیام‌های سیستم، کاربر و دستیار، و تکنیک‌های یادگیری درون کانتکست (Zero-shot و Few-shot)."
permalink: /courses/generative-ai-for-beginners/lessons/04-prompt-engineering-fundamentals/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۴</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">مبانی و اصول مهندسی پرامپت</h1>
    <div class="lesson-en-title" dir="ltr">Prompt Engineering Fundamentals</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> یادگیری ساختار دقیق یک پرامپت موفق، نقش پیام‌های سیستم، کاربر و دستیار، و تکنیک‌های یادگیری درون کانتکست (Zero-shot و Few-shot).
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>چهار جزء اصلی هر پرامپت حرفه‌ای: دستورالعمل، زمینه (Context)، داده ورودی و فرمت خروجی</li><li>نقش پیام سیستم (System Message) در جهت‌دهی به رفتار و لحن مدل</li><li>تفاوت پرامپت‌های Zero-shot و Few-shot و زمان کاربرد هریک</li><li>تنظیم پارامترهای مدل: Temperature، Top-P و سقف توکن‌ها</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## ✍️ مهندسی پرامپت چیست؟

مهندسی پرامپت هنر و دانش **فرموله‌کردن دقیق دستورات** برای هدایت مدل‌های زبانی به سمت تولید باکیفیت‌ترین و دقیق‌ترین پاسخ ممکن است. مدل زبانی ذهن شما را نمی‌خواند؛ هرچه ورودی شفاف‌تر و ساختاریافته‌تر باشد، خروجی درخشان‌تر خواهد بود.

---

## 🧱 چهار بلوک سازنده یک پرامپت حرفه‌ای

1. **دستورالعمل (Instruction):** وظیفه دقیقی که مدل باید انجام دهد (مثلاً: «متن زیر را در ۳ گلوله‌نکته خلاصه کن»).
2. **بستر و زمینه (Context):** نقش مدل و پیش‌زمینه کار (مثلاً: «شما کارشناس ارشد سئو هستید و برای مخاطبان حرفه‌ای می‌نویسید»).
3. **داده‌های ورودی (Input Data):** متنی که باید پردازش یا ترجمه شود.
4. **قالب خروجی (Output Indicator):** شکل ظاهری پاسخ (مثلاً خروجی با ساختار JSON، جدول مارک‌داون یا کد پایتون).

<div class="course-img-frame" style="text-align: center; margin: 28px 0;">
  <img src="{{ '/courses/generative-ai-for-beginners/assets/04-prompt-engineering-fundamentals/images/04-fabrication-oai.png' | url }}" alt="مهندسی پرامپت" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--g-border-dim);" loading="lazy">
</div>

---

## 🎯 تکنیک‌های یادگیری درون کانتکست

### ۱. پرامپت تک‌باره (Zero-Shot)
در این حالت هیچ مثالی به مدل نمی‌دهید و مستقیماً وظیفه را می‌خواهید:
```text
متن زیر را به زبان اسپانیایی ترجمه کن:
"سلام، به دوره هوش مصنوعی خوش آمدید."
```

### ۲. پرامپت چندنمونه‌ای (Few-Shot)
با ارائه چند نمونه جفت‌شده (ورودی و خروجی دلخواه)، به مدل الگوی ذهنی می‌دهید:
```text
ورودی: عالی بود، حتماً پیشنهاد می‌کنم! -> احساس: مثبت
ورودی: اصلاً راضی نبودم و پولم هدر رفت. -> احساس: منفی
ورودی: بد نبود اما بسته‌بندی می‌توانست بهتر باشد. -> احساس: خنثی
ورودی: کیفیت محصول شگفت‌انگیز است. -> احساس: 
```

مدل بلافاصله متوجه ساختار شده و پاسخ می‌دهد: `مثبت`.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/03-using-generative-ai-responsibly/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: استفاده مسئولانه و اخلاقی از هوش مصنوعی</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/05-advanced-prompts/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: تکنیک‌های پیشرفته در طراحی پرامپت ←</span>
    </a>
    </div>
  </nav>
</div>
