---
layout: layout.njk
title: "جلسه ۱۱: یکپارچه‌سازی مدل‌ها با فراخوانی توابع (Function Calling) | دوره هوش مصنوعی مولد"
description: "نحوه تعریف ابزارها و توابع برای مدل‌های زبانی به طوری که مدل بتواند در زمان مناسب تابع را فراخوانی کرده و داده‌های زنده دریافت کند."
permalink: /courses/generative-ai-for-beginners/lessons/11-integrating-with-function-calling/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۱</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">یکپارچه‌سازی مدل‌ها با فراخوانی توابع (Function Calling)</h1>
    <div class="lesson-en-title" dir="ltr">Integrating with function calling</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> نحوه تعریف ابزارها و توابع برای مدل‌های زبانی به طوری که مدل بتواند در زمان مناسب تابع را فراخوانی کرده و داده‌های زنده دریافت کند.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>درک چرایی ناتوانی مدل‌ها در دسترسی به اطلاعات زنده بدون ابزار</li><li>فرمت استاندارد تعریف توابع با JSON Schema</li><li>چرخه دوطرفه: ارسال پرامپت -> تشخیص فراخوانی تابع توسط مدل -> اجرای کد توسط شما -> ارسال نتیجه به مدل</li><li>پیاده‌سازی یک دستیار استعلام آب‌وهوا و قیمت لحظه‌ای ارز</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## ⚡ چگونه به مدل زبانی دست و پا بدهیم؟

مدل‌های زبانی بزرگ تا قبل از ابداع **Function Calling** فقط می‌توانستند حرف بزنند؛ آن‌ها نمی‌توانستند ایمیل بفرستند، ساعت را بخوانند یا قیمت سهام را از دیتابیس استعلام کنند.

با قابلیت فراخوانی توابع، ما فهرستی از توابع پایتون یا جاوااسکریپت خود را به همراه توضیحات ورودی‌ها برای مدل ارسال می‌کنیم. مدل تصمیم می‌گیرد که آیا برای پاسخ به کاربر نیاز به اجرای تابع دارد یا نه؛ اگر نیاز داشت، نام تابع و پارامترهای استخراج‌شده را به صورت JSON به ما پس می‌دهد تا ما تابع را اجرا کنیم!

---

## 🛠️ پیاده‌سازی گام‌به‌گام

```python
import json

# ۱. تعریف تابع محلی
def get_weather(location: str):
    return json.dumps({"location": location, "temperature": "22°C", "condition": "آفتابی"})

# ۲. تعریف ابزار برای مدل
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "دریافت وضعیت زنده آب و هوای یک شهر",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "نام شهر، مثلاً تهران یا شیراز"}
                },
                "required": ["location"]
            }
        }
    }
]

# ۳. ارسال درخواست به همراه ابزارها
messages = [{"role": "user", "content": "هوای امروز تهران چطوره؟"}]
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    tools=tools
)

# مدل متوجه می‌شود باید تابع get_weather را برای شهر تهران اجرا کند!
```

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/10-building-low-code-ai-applications/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: ساخت برنامه‌های هوش مصنوعی با ابزارهای کم‌کد</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/12-designing-ux-for-ai-applications/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: طراحی تجربه کاربری (UX) برای برنامه‌های هوش مصنوعی ←</span>
    </a>
    </div>
  </nav>
</div>
