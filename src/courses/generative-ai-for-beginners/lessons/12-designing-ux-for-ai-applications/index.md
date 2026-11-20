---
layout: layout.njk
title: "جلسه ۱۲: طراحی تجربه کاربری (UX) برای برنامه‌های هوش مصنوعی | دوره هوش مصنوعی مولد"
description: "اصول طراحی رابط‌های تعاملی، نمایش جریانی کلمات (Streaming)، مدیریت انتظار کاربر، نمایش منابع استنادشده و دکمه‌های بازخورد."
permalink: /courses/generative-ai-for-beginners/lessons/12-designing-ux-for-ai-applications/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۲</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">طراحی تجربه کاربری (UX) برای برنامه‌های هوش مصنوعی</h1>
    <div class="lesson-en-title" dir="ltr">Designing UX for AI Applications</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> اصول طراحی رابط‌های تعاملی، نمایش جریانی کلمات (Streaming)، مدیریت انتظار کاربر، نمایش منابع استنادشده و دکمه‌های بازخورد.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>چرا ارسال جریانی توکن‌ها (Streaming) برای کاهش زمان انتظار ذهنی کاربر حیاتی است</li><li>طراحی اسکلت‌های لودینگ (Skeleton Loaders) و نشانگرهای تایپ</li><li>نمایش شفاف منابع و پانویس‌ها برای جلب اعتماد کاربر</li><li>افزودن دکمه‌های کپی، بازتولید (Regenerate) و بازخورد مثبت/منفی</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## ✨ هوش مصنوعی تنها یک الگوریتم نیست؛ یک تجربه انسانی است!

بزرگ‌ترین اشتباه تیم‌های فنی، فرستادن کاربر به یک صفحه خالی با یک اسپینر لودینگ است که ۳ ثانیه می‌چرخد تا پاسخ کامل بیاید! در طراحی تجربه کاربری نرم‌افزارهای هوش مصنوعی مولد، چند اصل کلیدی وجود دارد:

1. **ارسال جریانی (Streaming):** کلمات باید بلافاصله با تولید شدن روی صفحه تایپ شوند. این کار زمان انتظار ادراک‌شده کاربر را از چند ثانیه به چند میلی‌ثانیه کاهش می‌دهد.
2. **شفافیت در محدودیت‌ها:** همیشه به کاربر یادآوری کنید که سیستم ممکن است خطا کند و خروجی‌ها را برای کارهای حساس بازبینی فرمایید.
3. **دکمه‌های اقدام سریع:** بعد از هر پاسخ، دکمه «کپی در کلیپ‌بورد»، «تولید مجدد با لحن رسمی‌تر» و «ثبت فیدبک» قرار دهید.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/11-integrating-with-function-calling/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: یکپارچه‌سازی مدل‌ها با فراخوانی توابع (Function Calling)</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/13-securing-ai-applications/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: امنیت و محافظت از برنامه‌های هوش مصنوعی مولد ←</span>
    </a>
    </div>
  </nav>
</div>
