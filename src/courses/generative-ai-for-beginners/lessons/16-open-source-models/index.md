---
layout: layout.njk
title: "جلسه ۱۶: کار با مدل‌های زبانی متن‌باز (Open Source Models) | دوره هوش مصنوعی مولد"
description: "اجرای مدل‌های هوش مصنوعی روی سخت‌افزار شخصی، اکوسیستم Hugging Face، کوانتیزاسیون و اجرای سریع مدل‌ها با Ollama."
permalink: /courses/generative-ai-for-beginners/lessons/16-open-source-models/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۶</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">کار با مدل‌های زبانی متن‌باز (Open Source Models)</h1>
    <div class="lesson-en-title" dir="ltr">Introduction to Open Source Models</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> اجرای مدل‌های هوش مصنوعی روی سخت‌افزار شخصی، اکوسیستم Hugging Face، کوانتیزاسیون و اجرای سریع مدل‌ها با Ollama.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>مزایای استقلال، حریم خصوصی و عدم پرداخت هزینه به ازای هر توکن</li><li>کار با کتابخانه محبوب Transformers در اکوسیستم پایتون</li><li>مفهوم فشرده‌سازی و کوانتیزاسیون مدل‌ها (GGUF, 4-bit, 8-bit)</li><li>اجرای محلی مدل‌های روز با ابزار فوق‌العاده Ollama</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🌐 استقلال و آزادی در دنیای هوش مصنوعی متن‌باز

توسعه بر پایه APIهای خارجی شما را وابسته به اینترنت، تحریم‌ها و قیمت‌گذاری دیگران می‌کند. با مدل‌های متن‌باز (Open Weights) مانند **Llama 3**، **Mistral** و **Qwen**، شما مالک ۱۰۰٪ هوش مصنوعی خود هستید.

---

## 🦙 اجرای فوق‌العاده سریع با Ollama

ابزار **Ollama** ساده‌ترین راه برای اجرای مدل‌های متن‌باز روی سیستم‌عامل‌های ویندوز، مک و لینوکس است:

```bash
# دانلود و اجرای مدل لاما ۳ با یک دستور
ollama run llama3
```

سپس از طریق پایتون به آسانی به آن متصل شوید:
```python
import requests

res = requests.post("http://localhost:11434/api/generate", json={
    "model": "llama3",
    "prompt": "سلام! درباره فلسفه گنو لینوکس توضیح بده.",
    "stream": False
})

print(res.json()["response"])
```

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/15-rag-and-vector-databases/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: بازیابی اطلاعات افزوده (RAG) و پایگاه‌های برداری</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/17-ai-agents/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: عامل‌های هوشمند خودکار (AI Agents) ←</span>
    </a>
    </div>
  </nav>
</div>
