---
layout: layout.njk
title: "جلسه ۰۳: استفاده مسئولانه و اخلاقی از هوش مصنوعی | دوره هوش مصنوعی مولد"
description: "بررسی اصول شش‌گانه مایکروسافت برای هوش مصنوعی مسئولانه، تکنیک‌های پیشگیری از توهمات مدل، کاهش سوگیری‌ها و مراقبت از حریم خصوصی کاربران."
permalink: /courses/generative-ai-for-beginners/lessons/03-using-generative-ai-responsibly/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۳</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">استفاده مسئولانه و اخلاقی از هوش مصنوعی</h1>
    <div class="lesson-en-title" dir="ltr">Using Generative AI Responsibly</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> بررسی اصول شش‌گانه مایکروسافت برای هوش مصنوعی مسئولانه، تکنیک‌های پیشگیری از توهمات مدل، کاهش سوگیری‌ها و مراقبت از حریم خصوصی کاربران.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>اصول شش‌گانه: عدالت، قابلیت اطمینان، حریم خصوصی، فراگیری، شفافیت و مسئولیت‌پذیری</li><li>شناخت خطای توهم (Hallucination) و راه‌های فنی مهار آن</li><li>جلوگیری از درز داده‌های حساس به مدل‌های عمومی</li><li>طراحی سیستم‌های بازخورد کاربر و نظارت انسانی (Human-in-the-loop)</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🛡️ چرا هوش مصنوعی مسئولانه اهمیت حیاتی دارد؟

قدرت عظیم مدل‌های زبانی با مسئولیت‌های بزرگی همراه است. مدل‌ها می‌توانند با اعتمادبه‌نفس بالا اطلاعات کاملاً ساختگی و نادرست ارائه دهند (**توهم**)، یا تبعیض‌ها و سوگیری‌های موجود در متون اینترنت را بازتولید کنند.

شرکت مایکروسافت چارچوبی متشکل از **شش اصل بنیادین** برای توسعه اخلاقی هوش مصنوعی تدوین کرده است:

<div class="course-img-frame" style="text-align: center; margin: 28px 0;">
  <img src="{{ '/courses/generative-ai-for-beginners/assets/03-using-generative-ai-responsibly/images/RAI-principles.png' | url }}" alt="اصول هوش مصنوعی مسئولانه" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--g-border-dim);" loading="lazy">
</div>

---

## 📌 اصول شش‌گانه مایکروسافت

1. **عدالت و برابری (Fairness):** سیستم نباید به خاطر جنسیت، نژاد، قومیت یا سن، به گروه خاصی آسیب برساند یا فرصت‌ها را از آن‌ها سلب کند.
2. **قابلیت اطمینان و ایمنی (Reliability & Safety):** رفتار نرم‌افزار در شرایط پیش‌بینی‌نشده باید امن بماند و تصمیمات خطرناک نگیرد.
3. **حفظ حریم خصوصی و امنیت (Privacy & Security):** اطلاعات خصوصی و محرمانه کاربران نباید برای آموزش عمومی مدل مصرف شود.
4. **فراگیری و دسترس‌پذیری (Inclusiveness):** تمام افراد جامعه با هر سطح توانایی جسمی باید بتوانند از خدمات استفاده کنند.
5. **شفافیت (Transparency):** کاربر باید بداند که در حال گفتگو با یک هوش مصنوعی است و بداند سیستم چگونه به پاسخ رسیده است.
6. **پاسخ‌گویی و مسئولیت‌پذیری (Accountability):** انسان‌ها همواره مسئول نهایی تصمیمات اتخاذشده توسط هوش مصنوعی هستند.

---

## 🔍 راهکارهای کاهش خطای توهم (Mitigating Hallucinations)

- **استفاده از سیستم RAG:** به جای اتکا به حافظه مدل، اسناد واقعی را در پرامپت قرار دهید تا مدل صرفاً از روی آن اسناد پاسخ دهد.
- **پرامپت شفاف:** به مدل بگویید: «اگر پاسخ دقیق را در متن زیر نیافتی، صراحتاً بگو نمی‌دانم و به هیچ وجه حدس نزن.»
- **کاهش دمای مدل (Temperature):** تنظیم `temperature=0.0` پاسخ‌ها را متمرکز، معین و بدون خیال‌پردازی می‌کند.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/02-exploring-and-comparing-different-llms/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: کاوش و مقایسه مدل‌های زبانی گوناگون</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/04-prompt-engineering-fundamentals/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: مبانی و اصول مهندسی پرامپت ←</span>
    </a>
    </div>
  </nav>
</div>
