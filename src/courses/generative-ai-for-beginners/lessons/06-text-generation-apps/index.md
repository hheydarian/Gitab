---
layout: layout.njk
title: "جلسه ۰۶: ساخت برنامه‌های کاربردی تولید و پردازش متن | دوره هوش مصنوعی مولد"
description: "کدنویسی عملی با پایتون و تایپ‌اسکریپت برای استخراج داده، تلخیص مقالات طولانی، ترجمه هوشمند و تولید محتوای بازاریابی."
permalink: /courses/generative-ai-for-beginners/lessons/06-text-generation-apps/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۶</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">ساخت برنامه‌های کاربردی تولید و پردازش متن</h1>
    <div class="lesson-en-title" dir="ltr">Building Text Generation Applications</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> کدنویسی عملی با پایتون و تایپ‌اسکریپت برای استخراج داده، تلخیص مقالات طولانی، ترجمه هوشمند و تولید محتوای بازاریابی.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>پیاده‌سازی نخستین برنامه تولید متن با SDK رسمی OpenAI</li><li>تلخیص هوشمند متون طولانی بدون از دست رفتن مفاهیم کلیدی</li><li>استخراج موجودیت‌های نام‌دار (NER) و کلیدواژه‌ها</li><li>کنترل هزینه‌ها و مدیریت تعداد توکن‌ها در برنامه‌های مقیاس‌پذیر</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 💻 ساخت اولین نرم‌افزار هوش مصنوعی

در این جلسه، دانش تئوری را به کد اجرایی تبدیل می‌کنیم. ما یک برنامه پایتون و تایپ‌اسکریپت می‌نویسیم که می‌تواند متون طولانی را بخواند، نکات کلیدی را استخراج کرده و یک گزارش خلاصه به همراه اقدام‌های پیشنهادی تحویل دهد.

---

## 🐍 پیاده‌سازی با پایتون

```python
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def summarize_article(text: str) -> str:
    prompt = f"""
    لطفاً متن زیر را با دقت بخوان و کارهای زیر را انجام بده:
    ۱. یک خلاصه در سه خط بنویس.
    ۲. سه نکته کلیدی اصلی را به صورت بولت‌پوینت فهرست کن.
    ۳. لحن کلی مقاله را ارزیابی کن.

    متن اصلی:
    {text}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "شما دستیار ارشد تلخیص و تحلیل اسناد تجاری هستید."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    return response.choices[0].message.content

sample_text = "هوش مصنوعی مولد یکی از شاخه‌های یادگیری ماشین است که به خلق داده‌های جدید می‌پردازد..."
print(summarize_article(sample_text))
```

---

## 🟦 پیاده‌سازی با TypeScript / JavaScript

```typescript
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI();

async function extractKeyTopics(content: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Extract technical keywords as a comma-separated list." },
      { role: "user", content: content }
    ],
    temperature: 0.2
  });

  return completion.choices[0].message.content;
}
```

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/05-advanced-prompts/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: تکنیک‌های پیشرفته در طراحی پرامپت</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/07-building-chat-applications/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: ساخت برنامه‌های گفتگو و چت‌بات‌های هوشمند ←</span>
    </a>
    </div>
  </nav>
</div>
