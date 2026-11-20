---
layout: layout.njk
title: "جلسه ۰۲: کاوش و مقایسه مدل‌های زبانی گوناگون | دوره هوش مصنوعی مولد"
description: "بررسی انواع مدل‌های متن، کد و چندوجهی، تفاوت مدل‌های بسته و متن‌باز، مقایسه اندازه پارامترها و فرمول بهینه‌سازی هزینه و سرعت استنتاج."
permalink: /courses/generative-ai-for-beginners/lessons/02-exploring-and-comparing-different-llms/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۲</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">کاوش و مقایسه مدل‌های زبانی گوناگون</h1>
    <div class="lesson-en-title" dir="ltr">Exploring and comparing different LLMs</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> بررسی انواع مدل‌های متن، کد و چندوجهی، تفاوت مدل‌های بسته و متن‌باز، مقایسه اندازه پارامترها و فرمول بهینه‌سازی هزینه و سرعت استنتاج.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>دسته‌بندی مدل‌ها به مدل‌های متنی، تولید کد و چندوجهی (Multimodal)</li><li>مقایسه مدل‌های تجاری و اختصاصی (مانند سری GPT و Claude) با مدل‌های باز (مانند Llama و Mistral)</li><li>درک مقیاس پارامترها (از ۷ میلیارد تا ۱.۸ تریلیون پارامتر)</li><li>معیارهای انتخاب مدل: کیفیت خروجی، زمان پاسخ (Latency) و هزینه به ازای هر میلیون توکن</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🧭 دنیای متنوع مدل‌های هوش مصنوعی

امروزه با ده‌ها مدل زبانی گوناگون روبه‌رو هستیم. انتخاب مدل مناسب برای یک پروژه، نیازمند ایجاد تعادل میان **کیفیت خروجی**، **سرعت پاسخ‌دهی** و **هزینه‌های زیرساخت** است.

<div class="course-img-frame" style="text-align: center; margin: 28px 0;">
  <img src="{{ '/courses/generative-ai-for-beginners/assets/02-exploring-and-comparing-different-llms/images/model-types.png' | url }}" alt="دسته‌بندی مدل‌های هوش مصنوعی" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--g-border-dim);" loading="lazy">
</div>

---

## 📊 انواع مدل‌ها بر اساس کارکرد

1. **مدل‌های چندمنظوره متنی (General Text LLMs):**
   - نمونه‌ها: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro
   - مناسب برای: استدلال پیچیده، نویسندگی خلاق، تحلیل داده‌ها و حل مسائل تحلیلی.
2. **مدل‌های تخصصی کدنویسی (Code LLMs):**
   - نمونه‌ها: GitHub Copilot, CodeLlama, DeepSeek Coder
   - بهینه‌سازی‌شده برای نحو زبان‌های برنامه‌نویسی، خطایابی و تست‌نویسی.
3. **مدل‌های چندوجهی (Multimodal Models):**
   - می‌توانند همزمان متن، تصاویر، صدا و ویدئو را دریافت کرده و درک کنند.
4. **مدل‌های کوچک زبانی (Small Language Models - SLM):**
   - نمونه‌ها: Microsoft Phi-3, Gemma 2B
   - بسیار کم‌مصرف و پرسرعت، قابل اجرا روی لپ‌تاپ و حتی گوشی‌های هوشمند.

---

## ⚖️ مدل‌های متن‌باز در برابر مدل‌های اختصاصی (API)

| معیار | مدل‌های ابری تجاری (مانند OpenAI / Azure) | مدل‌های متن‌باز (مانند Llama و Mistral) |
| :--- | :--- | :--- |
| **راه‌اندازی** | بسیار ساده، فقط با دریافت یک API Key | نیازمند سرور، کارت گرافیک (GPU) و مدیریت زیرساخت |
| **حریم خصوصی** | داده‌ها به سرور ارائه‌دهنده ارسال می‌شود | داده‌ها به طور ۱۰۰٪ در سرورهای داخلی شما باقی می‌مانند |
| **هزینه** | پرداخت به ازای هر توکن ورودی و خروجی | هزینه ثابت سرور و برق |
| **شخصی‌سازی** | محدود به پرامپتینگ و فاین‌تیونینگ مدیریت‌شده | کنترل کامل روی وزن‌ها، لایه‌ها و ادغام با کدهای محلی |

---

## 💡 چطور مدل مناسب پروژه را انتخاب کنیم؟

- اگر پروژه نیاز به **استدلال سطح بالا** دارد: از مدل‌های بزرگ ابری (مانند GPT-4o یا Claude 3.5) استفاده کنید.
- اگر نیاز به **پاسخ فوری و هزینه ناچیز** برای کارهای روتین دارید: مدل‌های سبک مانند GPT-4o-mini یا Phi-3 بهترین انتخاب هستند.
- اگر با **داده‌های محرمانه بانکی و پزشکی** کار می‌کنید: استقرار مدل‌های متن‌باز (مانند Llama 3) روی زیرساخت خصوصی ضروری است.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/01-introduction-to-genai/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: مقدمه‌ای بر هوش مصنوعی مولد و سازوکار LLMها</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/03-using-generative-ai-responsibly/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: استفاده مسئولانه و اخلاقی از هوش مصنوعی ←</span>
    </a>
    </div>
  </nav>
</div>
