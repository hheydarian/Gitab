---
layout: layout.njk
title: "جلسه ۲۰: توسعه برنامه‌ها با مدل‌های پرقدرت میسترال (Mistral) | دوره هوش مصنوعی مولد"
description: "معماری شگفت‌انگیز ترکیب متخصصان (Mixture of Experts - MoE)، کار با Mistral 7B و Mixtral 8x7B و اتصال به APIهای میسترال."
permalink: /courses/generative-ai-for-beginners/lessons/20-mistral/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۲۰</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">توسعه برنامه‌ها با مدل‌های پرقدرت میسترال (Mistral)</h1>
    <div class="lesson-en-title" dir="ltr">Building with Mistral Models</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> معماری شگفت‌انگیز ترکیب متخصصان (Mixture of Experts - MoE)، کار با Mistral 7B و Mixtral 8x7B و اتصال به APIهای میسترال.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>درک معماری انقلابی Mixture of Experts (MoE)</li><li>تفاوت سرعت و کارایی در Mixtral 8x7B</li><li>استفاده از کتابخانه رسمی mistralai در پایتون</li><li>قابلیت‌های پیشرفته استدلال و کدنویسی با مدل‌های فرانسوی میسترال</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 🌪️ معماری ترکیب متخصصان (Mixture of Experts)

شرکت فرانسوی Mistral AI با معرفی معماری **Mixture of Experts (MoE)** شوک بزرگی به صنعت هوش مصنوعی وارد کرد. در مدل‌های سنتی، برای پردازش هر کلمه، تمام لایه‌ها و نورون‌های شبکه فعال می‌شوند.

اما در مدل MoE مانند **Mixtral 8x7B**:
- مدل از چندین شبکه کوچک متخصص (Experts) تشکیل شده است.
- یک شبکه ناظر برای هر کلمه تنها دو متخصص مرتبط را فعال می‌کند.
- نتیجه: کیفیتی معادل یک مدل عظیم، اما با سرعت و هزینه پردازشی یک مدل کوچک!

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/19-slm/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: مدل‌های زبانی کوچک (Small Language Models - SLM)</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/21-meta/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: توسعه با خانواده مدل‌های متا (Meta Llama) ←</span>
    </a>
    </div>
  </nav>
</div>
