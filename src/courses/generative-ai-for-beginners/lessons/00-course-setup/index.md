---
layout: layout.njk
title: "جلسه ۰۰: آماده‌سازی محیط توسعه و شروع کار با دوره | دوره هوش مصنوعی مولد"
description: "در این جلسه اولیه، ابزارها و نیازمندی‌های توسعه را گام‌به‌گام آماده می‌کنیم تا بتوانید تمام پروژه‌ها و کدهای پایتون و تایپ‌اسکریپت این دوره را بدون دردسر اجرا کنید."
permalink: /courses/generative-ai-for-beginners/lessons/00-course-setup/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۰</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">آماده‌سازی محیط توسعه و شروع کار با دوره</h1>
    <div class="lesson-en-title" dir="ltr">Getting Started with this course</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> در این جلسه اولیه، ابزارها و نیازمندی‌های توسعه را گام‌به‌گام آماده می‌کنیم تا بتوانید تمام پروژه‌ها و کدهای پایتون و تایپ‌اسکریپت این دوره را بدون دردسر اجرا کنید.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>آشنایی با نحوه اجرای دوره‌ها در گیت‌هاب کداسپیس (GitHub Codespaces)</li><li>تنظیم محیط توسعه محلی با VS Code و پایتون نسخه ۳.۱۰ به بالا</li><li>دریافت کلیدهای دسترسی به مدل‌ها از طریق GitHub Models، Azure OpenAI یا OpenAI</li><li>پیکربندی فایل متغیرهای محیطی (.env) برای امن‌سازی کلیدها</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🌟 خوش‌آمدید! چرا این دوره را انتخاب کرده‌اید؟

دنیای نرم‌افزار در آستانه یکی از بزرگ‌ترین تحولات تاریخ خود قرار دارد. ظهور **مدل‌های زبانی بزرگ (LLMs)** و ابزارهای هوش مصنوعی مولد، شیوه تفکر و برنامه‌نویسی ما را برای همیشه تغییر داده است. اما ساخت یک برنامه هوش مصنوعی موفق فراتر از یک پرامپت ساده در چت‌بات‌هاست؛ شما باید معماری مدل‌ها، مدیریت کانتکست، سیستم‌های بازیابی اطلاعات (RAG)، ساخت ایجنت‌ها و امنیت را به صورت اصولی بشناسید.

این دوره ۲۱ جلسه‌ای، حاصل تجربیات تیم **مدافعان ابری مایکروسافت (Microsoft Cloud Advocates)** است تا شما را از نقطه صفر به یک توسعه‌دهنده مسلط بر هوش مصنوعی مولد تبدیل کند.

---

## 🛠️ روش‌های اجرای پروژه‌ها و کدها

برای اجرای کدهای این دوره دو مسیر در پیش رو دارید:

### روش اول: استفاده رایگان و ابری از GitHub Codespaces (ساده‌ترین روش)
اگر نمی‌خواهید درگیر نصب پایتون، پکیج‌ها و تنظیمات سیستم‌عامل شوید، بهترین گزینه اجرای ابری است:
1. وارد صفحه مخزن دوره در گیت‌هاب شوید.
2. روی دکمه سبز‌رنگ **Code** کلیک کرده و برگه **Codespaces** را انتخاب کنید.
3. با کلیک روی **Create codespace on main**، ظرف چند دقیقه یک محیط کامل VS Code در مرورگر شما باز می‌شود که تمام ابزارها و کتابخانه‌ها از پیش روی آن نصب شده‌اند!

### روش دوم: نصب در سیستم محلی (Local Setup)
اگر ترجیح می‌دهید کدها را روی رایانه خود اجرا کنید:
- **نصب پایتون:** مطمئن شوید پایتون ۳.۱۰ یا جدیدتر نصب است.
- **ایجاد محیط مجازی (Virtual Environment):**
```bash
python -m venv venv
# در ویندوز:
venv\Scripts\activate
# در مک یا لینوکس:
source venv/bin/activate
```
- **نصب کتابخانه‌ها:**
```bash
pip install -r requirements.txt
```

---

## 🔑 تنظیم کلیدهای دسترسی (API Keys)

بسیاری از تمرین‌های دوره نیاز به ارتباط با یک ارائه‌دهنده مدل دارند. شما می‌توانید از سه گزینه استفاده کنید:
1. **GitHub Models:** راهکاری عالی و رایگان برای آزمودن مدل‌های روز بدون نیاز به کارت اعتباری.
2. **Azure OpenAI Service:** مناسب برای پروژه‌های سازمانی و محیط‌های امن شرکتی.
3. **OpenAI API:** دسترسی مستقیم به APIهای رسمی ChatGPT و DALL-E.

پس از دریافت کلید، فایل نمونه `.env.copy` را به نام `.env` ذخیره کرده و مقادیر را در آن قرار دهید:
```env
OPENAI_API_KEY="کلید-شما-در-اینجا"
AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
AZURE_OPENAI_API_KEY="کلید-آژور-شما"
```

> [!TIP]
> هیچ‌گاه فایل `.env` خود را در گیت کامیت نکنید! نام این فایل در `.gitignore` قرار گرفته است تا اطلاعات حساس شما همواره امن بماند.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/01-introduction-to-genai/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: مقدمه‌ای بر هوش مصنوعی مولد و سازوکار LLMها ←</span>
    </a>
    </div>
  </nav>
</div>
