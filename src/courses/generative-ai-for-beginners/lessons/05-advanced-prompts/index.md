---
layout: layout.njk
title: "جلسه ۰۵: تکنیک‌های پیشرفته در طراحی پرامپت | دوره هوش مصنوعی مولد"
description: "تسلط بر تکنیک‌های زنجیره تفکر (Chain of Thought)، حل مسائل چندمرحله‌ای، تولید خروجی‌های معتبر JSON و الگوی تصمیم‌گیری ReAct."
permalink: /courses/generative-ai-for-beginners/lessons/05-advanced-prompts/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۵</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">تکنیک‌های پیشرفته در طراحی پرامپت</h1>
    <div class="lesson-en-title" dir="ltr">Creating Advanced Prompts</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> تسلط بر تکنیک‌های زنجیره تفکر (Chain of Thought)، حل مسائل چندمرحله‌ای، تولید خروجی‌های معتبر JSON و الگوی تصمیم‌گیری ReAct.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>تکنیک زنجیره تفکر (Chain of Thought - CoT) برای مسائل منطقی و ریاضی</li><li>پرامپت‌های خودهمگام (Self-Consistency) برای بالا بردن ضریب اطمینان</li><li>تولید ساختارهای کاملاً معتبر JSON با پرامپت و حالت JSON Mode</li><li>آشنایی با الگوی استدلال و اقدام (ReAct: Reason + Act)</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🚀 از پرامپت ساده به استدلال منطقی پیشرفته

وقتی از یک مدل زبانی یک مسئله چندمرحله‌ای ریاضی یا منطقی بپرسید، اگر بلافاصله به سمت پاسخ نهایی بپرد، احتمال خطای محاسباتی بسیار بالاست. برای حل این مشکل، تکنیک‌های پیشرفته پرامپتینگ ابداع شده‌اند.

---

## 🔗 زنجیره تفکر (Chain of Thought - CoT)

در تکنیک **زنجیره تفکر**، به مدل آموزش می‌دهیم پیش از اعلام پاسخ نهایی، مراحل حل مسئله را گام‌به‌گام برای خودش و کاربر یادداشت کند. این کار فضای کاری (Scratchpad) مدل را گسترش داده و درصد خطای محاسبات را به شدت کاهش می‌دهد.

**ترفند کلیدی Zero-shot CoT:**
کافی است در انتهای پرامپت خود عبارت جادویی زیر را اضافه کنید:
> «بیا گام‌به‌گام فکر کنیم و راه‌حل را مرحله به مرحله پیش ببریم.»

---

## 📦 تضمین خروجی ساختاریافته (JSON Output)

در برنامه‌نویسی مدرن، متن آزاد برای ما کارایی ندارد؛ ما نیاز به داده‌های ساختاریافته داریم تا بتوانیم آن‌ها را در دیتابیس ذخیره کنیم یا به کلاینت بفرستیم:

```python
response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": "اطلاعات کتاب را فقط و فقط به شکل JSON با کلیدهای title، author و year استخراج کن."},
        {"role": "user", "content": "کتاب لینوکس و زندگی نوشته جادی میرمیرانی در سال ۱۳۹۶ منتشر شد."}
    ]
)

print(response.choices[0].message.content)
```

خروجی دقیقاً یک JSON معتبر خواهد بود:
```json
{
  "title": "لینوکس و زندگی",
  "author": "جادی میرمیرانی",
  "year": "۱۳۹۶"
}
```

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/04-prompt-engineering-fundamentals/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: مبانی و اصول مهندسی پرامپت</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/06-text-generation-apps/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: ساخت برنامه‌های کاربردی تولید و پردازش متن ←</span>
    </a>
    </div>
  </nav>
</div>
