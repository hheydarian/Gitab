---
layout: layout.njk
title: "جلسه ۱۵: بازیابی اطلاعات افزوده (RAG) و پایگاه‌های برداری | دوره هوش مصنوعی مولد"
description: "معماری قدرتمند RAG برای اتصال اسناد شخصی و سازمانی به مدل‌های زبانی، قطعه‌بندی اسناد (Chunking) و ذخیره در دیتابیس‌های برداری."
permalink: /courses/generative-ai-for-beginners/lessons/15-rag-and-vector-databases/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۱۵</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">بازیابی اطلاعات افزوده (RAG) و پایگاه‌های برداری</h1>
    <div class="lesson-en-title" dir="ltr">Retrieval Augmented Generation (RAG) and Vector Databases</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> معماری قدرتمند RAG برای اتصال اسناد شخصی و سازمانی به مدل‌های زبانی، قطعه‌بندی اسناد (Chunking) و ذخیره در دیتابیس‌های برداری.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>مفهوم بنیادین RAG: ترکیب بازیابی اطلاعات با توان تولید متن مدل</li><li>استراتژی‌های خردکردن اسناد طولانی (Chunking Strategies)</li><li>آشنایی با دیتابیس‌های برداری نظیر Azure AI Search، Chroma و Pinecone</li><li>پیاده‌سازی یک پایگاه دانش خصوصی با جستجوی برداری</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 📚 معماری RAG چیست و چرا معجزه می‌کند؟

مدل‌های زبانی دو محدودیت بزرگ دارند:
1. تاریخ انقضای دانش دارند (اطلاعات پس از تاریخ آموزش را نمی‌دانند).
2. اسناد محرمانه، فایل‌های PDF سازمانی یا اطلاعات داخلی شرکت شما را نخوانده‌اند!

آیا باید مدل را از اول آموزش دهیم؟ قطعاً خیر؛ هزینه آن میلیون‌ها دلار است! راه‌حل استاندارد جهانی **RAG (Retrieval-Augmented Generation)** است.

<div class="course-img-frame" style="text-align: center; margin: 28px 0;">
  <img src="{{ '/courses/generative-ai-for-beginners/assets/15-rag-and-vector-databases/images/rag-indexing.png' | url }}" alt="معماری RAG" style="max-width: 100%; border-radius: 12px; border: 1px solid var(--g-border-dim);" loading="lazy">
</div>

---

## 🔄 مراحل کار سیستم RAG:

1. **فاز آماده‌سازی (Indexing):**
   - اسناد PDF، ورد یا کدهای شما به بخش‌های کوچک (مثلاً قطعات ۵۰۰ کلمه‌ای به نام **Chunk**) تقسیم می‌شوند.
   - برای هر قطعه، یک بردار امبدینگ ساخته شده و در **پایگاه داده برداری (Vector Database)** ذخیره می‌شود.
2. **فاز پرسش و بازیابی (Retrieval):**
   - کاربر سوالی می‌پرسد. سوال او به بردار تبدیل می‌شود.
   - دیتابیس برداری، ۳ قطعه از اسناد شما را که بیشترین شباهت معنایی به سوال دارند پیدا می‌کند.
3. **فاز پاسخ‌دهی (Generation):**
   - قطعات بازیابی‌شده به همراه سوال کاربر به مدل زبانی داده می‌شوند: «با استفاده از متون زیر، به سوال کاربر پاسخ دقیق بده.»
   - مدل پاسخی کاملاً مستند و دقیق تولید می‌کند!

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/14-the-generative-ai-application-lifecycle/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: چرخه حیات توسعه و عملیات هوش مصنوعی (LLMOps)</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/16-open-source-models/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: کار با مدل‌های زبانی متن‌باز (Open Source Models) ←</span>
    </a>
    </div>
  </nav>
</div>
