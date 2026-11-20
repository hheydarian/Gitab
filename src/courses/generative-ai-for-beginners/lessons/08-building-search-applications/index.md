---
layout: layout.njk
title: "جلسه ۰۸: ساخت برنامه‌های جستجوی هوشمند و معنایی | دوره هوش مصنوعی مولد"
description: "گذر از جستجوی متنی کلمه به کلمه به جستجوی معنایی با استفاده از Embeddings، محاسبه شباهت کسینوسی و کشف متون مفهومی نزدیک."
permalink: /courses/generative-ai-for-beginners/lessons/08-building-search-applications/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۸</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">ساخت برنامه‌های جستجوی هوشمند و معنایی</h1>
    <div class="lesson-en-title" dir="ltr">Building a Search Applications</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> گذر از جستجوی متنی کلمه به کلمه به جستجوی معنایی با استفاده از Embeddings، محاسبه شباهت کسینوسی و کشف متون مفهومی نزدیک.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>تفاوت جستجوی سنتی کلیدواژه‌ای (Keyword Search) با جستجوی معنایی (Semantic Search)</li><li>تولید و درک بردارهای امبدینگ (Text Embeddings)</li><li>محاسبه شباهت کسینوسی (Cosine Similarity) بین عبارات</li><li>پیاده‌سازی یک موتور جستجوی معنایی ساده برای اسناد</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🔍 چرا جستجوی کلیدواژه‌ای دیگر کافی نیست؟

اگر در یک سیستم سنتی عبارت «خودروی برقی» را جستجو کنید اما در متن مقاله کلمه «ماشین الکتریکی تسلا» آمده باشد، سیستم سنتی آن را پیدا نمی‌کند چون کلمات دقیقاً یکسان نیستند. اما **جستجوی معنایی** مفهوم کلمات را می‌فهمد و می‌داند این دو عبارت به یک چیز اشاره دارند!

---

## 📐 بردارها و امبدینگ‌ها (Embeddings)

مدل امبدینگ (مانند `text-embedding-3-small`) متن شما را می‌گیرد و یک بردار شامل ۱۵۳۶ عدد اعشاری تولید می‌کند. این اعداد مختصات معنایی متن در یک فضای چندبُعدی هستند. جملاتی که مفهوم مشابهی دارند، در این فضا به هم نزدیک‌ترند.

```python
import numpy as np

def get_embedding(text: str):
    res = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return res.data[0].embedding

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# مقایسه شباهت معنایی
v1 = get_embedding("روش‌های نگهداری دوچرخه در شهر")
v2 = get_embedding("راهنمای تعمیر زنجیر و پنچرگیری چرخ")
v3 = get_embedding("طرز پخت قورمه سبزی خوشمزه")

print("شباهت دوچرخه و تعمیر:", cosine_similarity(v1, v2)) # نزدیک به ۰.۸۵ (بسیار مشابه)
print("شباهت دوچرخه و آشپزی:", cosine_similarity(v1, v3)) # کمتر از ۰.۲ (ناهمخوان)
```

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/07-building-chat-applications/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: ساخت برنامه‌های گفتگو و چت‌بات‌های هوشمند</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/09-building-image-applications/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: ساخت برنامه‌های تولید و ویرایش تصویر ←</span>
    </a>
    </div>
  </nav>
</div>
