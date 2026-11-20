---
layout: layout.njk
title: "فصل 46: ابزار pwd (Linux pwd Command)"
---
{% raw %}
# فصل 46: ابزار pwd (Linux pwd Command)

### مقدمه
با استفاده از ابزار pwd می‌توان نام کامل مسیری که در حال حاضر در آن هستید را پرینت کنید.

> PWD: print working directory


```
$ pwd
# /home/mehdi/Desktop
```

---


### مسیر لاجیکال

با استفاده از گزینه L- یا logical-- می‌توانید مسیر جاری را از env لینوکس پرینت کنید که از مقدار PWD در environment ذخیره می‌شود، می‌خواند.



```
$ pwd -L
# /home/mehdi/Desktop
```

---


### مسیر فیزیکال

با استفاده از گزینه P- یا physical-- می‌توانید مسیر جاری را بدون در درنظر گرفتن هیچ کدوم از symlinksها پرینت کنید.

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">

**💡 نکته:**

این گزینه مقدار پیش‌فرض دستور pwd است.

</div>

```
$ pwd -P
# /home/mehdi/Desktop
```

---


### Author or Authors:

- *[Mehdi](https://github.com/mahdimmr)* | **<mahdi.rezayi76@gmail.com>**
{% endraw %}
