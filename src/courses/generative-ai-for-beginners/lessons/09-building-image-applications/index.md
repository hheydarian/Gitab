---
layout: layout.njk
title: "جلسه ۰۹: ساخت برنامه‌های تولید و ویرایش تصویر | دوره هوش مصنوعی مولد"
description: "کار با مدل پیشرفته DALL-E 3 برای خلق آثار بصری بر پایه دستورات متنی، کنترل کیفیت، وضوح، سبک و مهندسی پرامپت بصری."
permalink: /courses/generative-ai-for-beginners/lessons/09-building-image-applications/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۹</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">ساخت برنامه‌های تولید و ویرایش تصویر</h1>
    <div class="lesson-en-title" dir="ltr">Building Image Generation Applications</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> کار با مدل پیشرفته DALL-E 3 برای خلق آثار بصری بر پایه دستورات متنی، کنترل کیفیت، وضوح، سبک و مهندسی پرامپت بصری.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>آشنایی با نحوه عملکرد مدل‌های انتشار تصویر (Diffusion Models)</li><li>فراخوانی API تصویرسازی DALL-E 3 با پایتون و نود‌جی‌اس</li><li>تنظیم ابعاد تصویر (۱۰۲۴x۱۰۲۴، مربعی و افقی) و پارامتر کیفیت (hd vs standard)</li><li>تکنیک‌های پرامپت‌نویسی بصری: زاویه دوربین، نورپردازی و سبک هنری</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🎨 خلق تصاویر دیجیتال با مدل‌های نوین انتشار

مدل‌های زبانی تصویرساز مانند **DALL-E 3** بر پایه شبکه‌های انتشار (**Diffusion Models**) کار می‌کنند. آن‌ها با شروع از یک تصویر پر از نویز برفکی تصادفی، طی چند ده مرحله نویز را پاک کرده و تصویر مورد نظر شما را شکل می‌دهند.

---

## 🐍 پیاده‌سازی تولید تصویر در پایتون

```python
response = client.images.generate(
    model="dall-e-3",
    prompt="یک فضانورد در حال مطالعه کتاب لینوکس و زندگی در ایستگاه فضایی، نورپردازی سینمایی، کیفیت بالا، سبک سایبرپانک",
    size="1024x1024",
    quality="standard",
    n=1
)

image_url = response.data[0].url
print("آدرس تصویر تولید شده:", image_url)
```

---

## 💡 نکات طلایی پرامپت‌نویسی تصویر
- **جزئیات سبک:** به جای «تصویر یک شهر»، بنویسید: «نمای هوایی از یک شهر سایبرپانک در شب با باران ملایم و بازتاب نور نئون در آسفالت».
- **عدم استفاده از واژه‌های کلیشه‌ای:** کلماتی مانند «photorealistic» یا «hyper-detailed» تاثیر چندانی ندارند؛ به جای آن متریال، نوع لنز دوربین (مثلاً 50mm f/1.8) و شرایط نوری را توصیف کنید.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/08-building-search-applications/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: ساخت برنامه‌های جستجوی هوشمند و معنایی</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/10-building-low-code-ai-applications/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: ساخت برنامه‌های هوش مصنوعی با ابزارهای کم‌کد ←</span>
    </a>
    </div>
  </nav>
</div>
