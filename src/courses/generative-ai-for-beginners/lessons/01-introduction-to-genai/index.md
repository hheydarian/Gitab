---
layout: layout.njk
title: "جلسه ۰۱: مقدمه‌ای بر هوش مصنوعی مولد و سازوکار LLMها | دوره هوش مصنوعی مولد"
description: "آشنایی با تاریخچه هوش مصنوعی، تفاوت هوش مصنوعی تفکیک‌گر با مولد، کشف معماری ترنسفورمر، توجه درونی و درک چگونگی پیش‌بینی کلمات توسط مدل‌های زبانی."
permalink: /courses/generative-ai-for-beginners/lessons/01-introduction-to-genai/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۱</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">مقدمه‌ای بر هوش مصنوعی مولد و سازوکار LLMها</h1>
    <div class="lesson-en-title" dir="ltr">Introduction to Generative AI and Large Language Models</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> آشنایی با تاریخچه هوش مصنوعی، تفاوت هوش مصنوعی تفکیک‌گر با مولد، کشف معماری ترنسفورمر، توجه درونی و درک چگونگی پیش‌بینی کلمات توسط مدل‌های زبانی.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>تفاوت بنیادین میان هوش مصنوعی کلاسیک (Discriminative) و هوش مصنوعی مولد (Generative)</li><li>درک چرایی انقلابی بودن مقاله تاریخی «Attention Is All You Need» و تولد ترنسفورمرها</li><li>مفهوم توکن‌سازی (Tokenization) و تبدیل متن به بردارها (Embeddings)</li><li>نحوه پیش‌بینی احتمالاتی توکن بعدی و درک خطرات توهم مدل (Hallucination)</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🧠 هوش مصنوعی مولد دقیقاً چیست؟

برای دهه‌ها، بیشتر سیستم‌های هوش مصنوعی از نوع **تفکیک‌گر (Discriminative AI)** بودند. کار آن‌ها دسته‌بندی و پیش‌بینی بود؛ برای مثال آیا این تصویر گربه است یا سگ؟ آیا این تراکنش بانکی جعلی است یا قانونی؟

اما **هوش مصنوعی مولد (Generative AI)** کار متفاوتی انجام می‌دهد: این سیستم‌ها بر اساس الگوهایی که از میلیاردها صفحه متن، تصویر و کد در طول آموزش آموخته‌اند، **محتوای کاملاً جدید و باکیفیت انسانی** خلق می‌کنند. آن‌ها می‌توانند مقاله بنویسند، کدهای نرم‌افزاری پیچیده تولید کنند، موسیقی بسازند و تصاویر خلاقانه ترسیم کنند.

<div class="course-img-frame" style="text-align: center; margin: 28px 0;">
  <img src="{{ '/courses/generative-ai-for-beginners/assets/01-introduction-to-genai/images/AI-diagram.png' | url }}" alt="نمودار تاریخچه هوش مصنوعی" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--g-border-dim);" loading="lazy">
</div>

---

## ⚡ راز درخشش ترنسفورمرها (Transformers)

تا قبل از سال ۲۰۱۷، شبکه‌های عصبی پردازش زبان (مانند RNN و LSTM) متن را کلمه به کلمه و پشت سر هم می‌خواندند. این روش کند بود و مدل در جملات طولانی ابتدای جمله را از یاد می‌برد.

در سال ۲۰۱۷، پژوهشگران مقاله معروف **«Attention Is All You Need»** را منتشر کردند و معماری **ترنسفورمر (Transformer)** متولد شد. این معماری دو ویژگی طلایی داشت:
1. **پردازش موازی (Parallelization):** تمام کلمات جمله را به طور همزمان پردازش می‌کند، که باعث شد بتوان مدل‌ها را روی خوشه‌های عظیم کارت‌های گرافیک آموزش داد.
2. **مکانیزم توجه به خود (Self-Attention):** مدل در هر لحظه متوجه می‌شود که هر کلمه با کدام کلمات دیگر در جمله ارتباط معنایی دارد؛ مثلاً در جمله «بانک به دلیل سیل تعطیل شد»، مدل متوجه می‌شود منظور از «بانک» مؤسسه مالی است یا ساحل رودخانه.

---

## 🔤 توکن‌ها چگونه کار می‌کنند؟

مدل‌های زبانی حروف یا کلمات را مستقیماً متوجه نمی‌شوند؛ بلکه متن به قطعاتی به نام **توکن (Token)** تقسیم می‌شود. در زبان انگلیسی هر توکن تقریباً معادل سه‌چهارم یک کلمه است. سپس هر توکن به یک بردار ریاضی از اعداد تبدیل می‌شود که به آن **Embedding** می‌گویند.

مدل زبانی در واقع یک ماشین محاسبه احتمال است: با داشتن توکن‌های ورودی، بررسی می‌کند که محتمل‌ترین توکن برای ادامه جمله کدام است و آن را تولید می‌کند.

```python
# مثالی ساده از نحوه ارتباط با مدل زبانی در پایتون
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "شما یک دستیار هوشمند و متخصص یادگیری ماشین هستید."},
        {"role": "user", "content": "مفهوم Attention را در دو جمله به زبان ساده توضیح بده."}
    ]
)

print(response.choices[0].message.content)
```

---

## 📌 جمع‌بندی جلسه
- هوش مصنوعی مولد محتوای تازه تولید می‌کند و متکی بر پیش‌بینی توکن‌های بعدی است.
- ترنسفورمرها با مکانیزم توجه (Attention) انقلاب پردازش زبان طبیعی را رقم زدند.
- مدل‌ها به مفاهیم فکر نمی‌کنند، بلکه احتمالات آماری پیوستگی کلمات را با دقت بالا محاسبه می‌کنند.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/00-course-setup/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: آماده‌سازی محیط توسعه و شروع کار با دوره</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/02-exploring-and-comparing-different-llms/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: کاوش و مقایسه مدل‌های زبانی گوناگون ←</span>
    </a>
    </div>
  </nav>
</div>
