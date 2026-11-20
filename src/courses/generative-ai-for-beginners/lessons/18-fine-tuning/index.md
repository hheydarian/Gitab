---
layout: layout.njk
title: "جلسه ۱۸: فاین‌تیونینگ و تنظیم دقیق مدل‌های زبانی | دوره هوش مصنوعی مولد"
description: "چه زمانی باید از فاین‌تیونینگ استفاده کنیم؟ تکنیک‌های مدرن و سبک LoRA و QLoRA برای تغییر وزن‌های مدل بدون نیاز به ابررایانه‌ها."
permalink: /courses/generative-ai-for-beginners/lessons/18-fine-tuning/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۸</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">فاین‌تیونینگ و تنظیم دقیق مدل‌های زبانی</h1>
    <div class="lesson-en-title" dir="ltr">Fine-Tuning Your LLM</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> چه زمانی باید از فاین‌تیونینگ استفاده کنیم؟ تکنیک‌های مدرن و سبک LoRA و QLoRA برای تغییر وزن‌های مدل بدون نیاز به ابررایانه‌ها.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>مقایسه سه‌گانه: پرامپتینگ، سیستم‌های RAG یا فاین‌تیونینگ؟</li><li>روش‌های بهینه پارامتری (PEFT) به ویژه LoRA (Low-Rank Adaptation)</li><li>آماده‌سازی مجموعه داده آموزشی با فرمت استاندارد JSONL</li><li>اجرای فاین‌تیونینگ با پایتون و Hugging Face</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🎛️ چه زمانی مدل را فاین‌تیون کنیم؟

قاعده طلایی مهندسی نرم‌افزار هوش مصنوعی:
1. **ابتدا با پرامپت مهندسی‌شده شروع کنید.**
2. **اگر نیاز به اسناد و اطلاعات به‌روز دارید، سیستم RAG بسازید.**
3. **فقط زمانی به سراغ فاین‌تیونینگ بروید** که می‌خواهید لحن خاص، قالب خروجی بسیار پیچیده، یا واژگان تخصصی منحصربه‌فردی را به خورد مدل بدهید که با پرامپت حاصل نمی‌شود.

---

## ⚡ تکنیک انقلابی LoRA
در گذشته برای آموزش مجدد یک مدل ۷۰ میلیارد پارامتری به ده‌ها سرور قدرتمند نیاز بود. با تکنیک **LoRA (Low-Rank Adaptation)**، وزن‌های اصلی مدل فریز می‌شوند و تنها درصد ناچیزی ماتریس‌های رابطه‌ای کوچک آموزش می‌بینند. این روش مصرف رم و زمان آموزش را بیش از ۹۰ درصد کاهش می‌دهد.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/17-ai-agents/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: عامل‌های هوشمند خودکار (AI Agents)</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/19-slm/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: مدل‌های زبانی کوچک (Small Language Models - SLM) ←</span>
    </a>
    </div>
  </nav>
</div>
