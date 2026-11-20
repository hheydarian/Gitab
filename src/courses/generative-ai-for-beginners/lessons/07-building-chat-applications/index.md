---
layout: layout.njk
title: "جلسه ۰۷: ساخت برنامه‌های گفتگو و چت‌بات‌های هوشمند | دوره هوش مصنوعی مولد"
description: "مدیریت تاریخچه گفتگو، پیاده‌سازی حافظه کوتاه‌مدت با پنجره کشویی، طراحی شخصیت و پرسونای چت‌بات و مدیریت سقف توکن‌ها."
permalink: /courses/generative-ai-for-beginners/lessons/07-building-chat-applications/index.html
---

<div class="course-lesson-page">
  <!-- نوار نشانی (Breadcrumbs) با پیوندهای کاملاً معتبر و فعال در الونتی -->
  <nav class="course-breadcrumbs" aria-label="مسیر راهبری">
    <a href="{{ '/courses/' | url }}">دوره‌ها</a>
    <span class="sep">/</span>
    <a href="{{ '/courses/generative-ai-for-beginners/' | url }}">هوش مصنوعی مولد</a>
    <span class="sep">/</span>
    <span class="current">جلسه ۰۷</span>
  </nav>

  <!-- هدر شیک و تمیز جلسه -->
  <header class="course-lesson-header">
    <h1 class="lesson-main-title">ساخت برنامه‌های گفتگو و چت‌بات‌های هوشمند</h1>
    <div class="lesson-en-title" dir="ltr">Building Generative AI-Powered Chat Applications</div>

    <div class="lesson-summary-box">
      <strong>خلاصه جلسه:</strong> مدیریت تاریخچه گفتگو، پیاده‌سازی حافظه کوتاه‌مدت با پنجره کشویی، طراحی شخصیت و پرسونای چت‌بات و مدیریت سقف توکن‌ها.
    </div>
  </header>

  <!-- سرفصل‌های یادگیری -->
  <div class="lesson-objectives-card">
    <h3 class="objectives-title">🎯 در این جلسه چه مواردی را یاد می‌گیرید؟</h3>
    <ul class="objectives-list">
      <li>تفاوت مدل‌های تکمیل متن با مدل‌های گفتگومحور (Chat Completion)</li><li>مدیریت آرایه پیام‌ها (System، User، Assistant)</li><li>استراتژی‌های حفظ حافظه چت: پنجره کشویی و خلاصه‌سازی خودکار</li><li>طراحی رابط کاربری چت با ارسال جریانی توکن‌ها (Streaming)</li>
    </ul>
  </div>

  <!-- متن روان، سلیس و تخصصی درسنامه -->
  <article class="lesson-content-body">

## 💬 کالبدشکافی یک چت‌بات هوشمند

مدل‌های زبانی ذاتا بدون حالت (**Stateless**) هستند؛ یعنی هیچ حافظه‌ای از پیام‌های قبلی شما ندارند! هر بار که پیامی می‌فرستید، این برنامه شماست که باید تاریخچه گفتگوهای پیشین را جمع‌آوری کرده و همراه با پیام جدید برای مدل ارسال کند.

---

## 🗂️ مدیریت تاریخچه گفتگو (Conversation History)

یک آرایه پیام استاندارد شامل سه نقش است:
- `system`: تعریف شخصیت و قوانین چت‌بات.
- `user`: پیام‌هایی که کاربر تایپ می‌کند.
- `assistant`: پاسخ‌هایی که مدل در نوبت‌های قبلی تولید کرده است.

```python
chat_history = [
    {"role": "system", "content": "شما پشتیبان فنی و خوش‌برخورد پلتفرم گیتاب هستید."}
]

def chat_step(user_message: str):
    chat_history.append({"role": "user", "content": user_message})
    
    # ارسال کل تاریخچه به مدل
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=chat_history
    )
    
    assistant_reply = response.choices[0].message.content
    chat_history.append({"role": "assistant", "content": assistant_reply})
    return assistant_reply
```

---

## 🪟 استراتژی پنجره کشویی (Sliding Window Memory)

اگر کاربر ۵۰ پیام رد و بدل کند، حجم توکن‌های تاریخچه از سقف مدل فراتر می‌رود و هزینه سرسام‌آور می‌شود. برای حل این مشکل:
- فقط ۱۰ پیام آخر را در تاریخچه نگه دارید.
- پیام‌های قدیمی‌تر را با یک پرامپت پشت صحنه خلاصه‌سازی کرده و خلاصه آن‌ها را در پیام سیستم قرار دهید.

  </article>

  <!-- نوار ناوبری جلسه قبل و بعد (بدون دکمه وسط بنا به درخواست کاربر) -->
  <nav class="course-lesson-navigation">
    <div class="nav-slot prev">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/06-text-generation-apps/' | url }}" class="btn-lesson-nav prev">
      <span>→ جلسه قبلی: ساخت برنامه‌های کاربردی تولید و پردازش متن</span>
    </a>
    </div>
    <div class="nav-slot next">
      <a href="{{ '/courses/generative-ai-for-beginners/lessons/08-building-search-applications/' | url }}" class="btn-lesson-nav next">
      <span>جلسه بعدی: ساخت برنامه‌های جستجوی هوشمند و معنایی ←</span>
    </a>
    </div>
  </nav>
</div>
