---
layout: layout.njk
title: "جلسه ۱۷: عامل‌های هوشمند خودکار (AI Agents) | دوره هوش مصنوعی مولد"
description: "ورود به پیشرفته‌ترین مرز فناوری: ساخت ایجنت‌های تصمیم‌گیرنده خودکار با قابلیت برنامه‌ریزی، حافظه، استفاده از ابزارها و همکاری تیمی چند ایجنت."
permalink: /courses/generative-ai-for-beginners/lessons/17-ai-agents/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۷</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">عامل‌های هوشمند خودکار (AI Agents)</h1>
    <div class="lesson-en-title" dir="ltr">Introduction to AI Agents</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> ورود به پیشرفته‌ترین مرز فناوری: ساخت ایجنت‌های تصمیم‌گیرنده خودکار با قابلیت برنامه‌ریزی، حافظه، استفاده از ابزارها و همکاری تیمی چند ایجنت.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>تفاوت چت‌بات ساده با یک عامل هوشمند خودکار (Autonomous Agent)</li><li>چهار ستون یک ایجنت: ادراک (Perception)، برنامه‌ریزی (Planning)، حافظه (Memory) و اقدام (Action)</li><li>همکاری چند ایجنت با چارچوب‌های AutoGen و CrewAI</li><li>پیاده‌سازی یک ایجنت پژوهشگر و نویسنده خودکار</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🤖 عامل‌های هوشمند (AI Agents): آینده نرم‌افزار

یک چت‌بات فقط به سوال شما جواب می‌دهد؛ اما یک **عامل هوشمند (Agent)** هدف شما را تحویل می‌گیرد، آن را به خرده‌کارهای منطقی تقسیم می‌کند، از ابزارهای مختلف استفاده می‌کند، نتایج را بازبینی می‌کند و تا زمانی که هدف به نتیجه نرسد دست از کار نمی‌کشد!

---

## 🧩 معماری یک عامل هوشمند
- **برنامه‌ریزی (Planning):** ایجنت فکر می‌کند: «برای نوشتن این مقاله ابتدا باید در گوگل جستجو کنم، سپس منابع را خلاصه کنم و در نهایت پیش‌نویس بنویسم.»
- **حافظه (Memory):** به یاد دارد در مراحل قبلی چه داده‌هایی جمع‌آوری کرده است.
- **ابزارها (Tools):** دسترسی به جستجوی وب، اجرای کد در ترمینال، خواندن فایل‌ها و ارسال ایمیل.

```python
# مفهومی ساده از حلقه تصمیم‌گیری ایجنت (ReAct Loop)
while not task_completed:
    thought = model.think(current_state)
    action = model.decide_tool(thought)
    observation = execute_tool(action)
    current_state.update(thought, action, observation)
```

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/16-open-source-models/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: کار با مدل‌های زبانی متن‌باز (Open Source Models)</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/18-fine-tuning/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: فاین‌تیونینگ و تنظیم دقیق مدل‌های زبانی ←</span>
    </a>
    </div>
  </nav>
</div>
