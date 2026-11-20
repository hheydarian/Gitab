---
layout: layout.njk
title: "جلسه ۱۹: مدل‌های زبانی کوچک (Small Language Models - SLM) | دوره هوش مصنوعی مولد"
description: "چرا مدل‌های کوچک آینده هوش مصنوعی در لبه (Edge) هستند؟ بررسی مدل‌های خانواده Phi-3 مایکروسافت و اجرای آن‌ها روی لپ‌تاپ."
permalink: /courses/generative-ai-for-beginners/lessons/19-slm/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۹</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">مدل‌های زبانی کوچک (Small Language Models - SLM)</h1>
    <div class="lesson-en-title" dir="ltr">Introduction to Small Language Models</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> چرا مدل‌های کوچک آینده هوش مصنوعی در لبه (Edge) هستند؟ بررسی مدل‌های خانواده Phi-3 مایکروسافت و اجرای آن‌ها روی لپ‌تاپ.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>آشنایی با فلسفه مدل‌های کوچک زبانی (زیر ۴ میلیارد پارامتر)</li><li>بررسی خانواده مدل‌های Phi-3 مایکروسافت (Phi-3 Mini, Medium, Vision)</li><li>مزایای اقتصادی و امنیتی استقرار مدل در سخت‌افزارهای محلی</li><li>اجرای مدل Phi-3 با شتاب‌دهنده ONNX Runtime</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 📱 چرا مدل‌های کوچک‌تر در حال فتح جهان هستند؟

آیا برای طبقه‌بندی ایمیل‌ها یا استخراج نام شرکت‌ها واقعاً به یک مدل غول‌پیکر ۲۰۰ میلیارد پارامتری نیاز داریم؟ پاسخ منفی است!

مایکروسافت با خانواده مدل‌های **Phi** نشان داد که اگر داده‌های آموزشی باکیفیت و خالص (مشابه کتاب‌های درسی عالی) باشند، یک مدل ۳.۸ میلیارد پارامتری می‌تواند در بسیاری از وظایف تحلیلی و کدنویسی، مدل‌های ده برابر بزرگ‌تر از خود را شکست دهد.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/18-fine-tuning/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: فاین‌تیونینگ و تنظیم دقیق مدل‌های زبانی</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/20-mistral/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: توسعه برنامه‌ها با مدل‌های پرقدرت میسترال (Mistral) ←</span>
    </a>
    </div>
  </nav>
</div>
