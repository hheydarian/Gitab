---
layout: layout.njk
title: "۱۰۳.۶ تنظیم اولویت اجرای فرآیندها"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 17
chapterSection: "موضوع ۱۰۳: دستورات گنو و یونیکس"
permalink: /books/book13/Book/17/1036-modify-process-execution-priorities/index.html
---
{% raw %}
# ۱۰۳.۶ تنظیم اولویت اجرای فرآیندها

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> مقیاس اولویت‌بندی پردازنده با nice و renice از مقدار -۲۰ (بالاترین) تا ۱۹ (کمترین).
</div>



## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۲

داوطلبان باید بتوانند اولویت اجرای فرآیندها (Process Execution Priorities) را مدیریت کنند.

### اهداف آموزشی

* شناخت اولویت پیش‌فرض یک کار (Job) که ایجاد می‌شود
* اجرای یک برنامه با اولویت بالاتر یا پایین‌تر از مقدار پیش‌فرض
* تغییر اولویت یک فرآیند در حال اجرا

### فهرست بخشی از فایل‌ها، اصطلاحات و ابزارهای کاربردی

<div dir="ltr">

* `nice`
* `ps`
* `renice`
* `top`

</div>

روی یک ماشین لینوکسی، ممکن است صدها فرآیند به صورت هم‌زمان در حال اجرا باشند و برای گرفتن CPU و RAM بیشتر با هم رقابت کنند. خبر خوب این است که می‌توانید در این رقابت، به برخی از فرآیندها اولویت (یا به اصطلاح *nice-ness* / مهربانی!) بیشتر یا کمتری بدهید. بیایید نگاهی به یک نمونه خروجی `top` بیندازیم:

```text
$ top

Tasks: 169 total,   1 running, 168 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  3.0 sy,  0.0 ni, 97.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   5948.9 total,   4115.2 free,    438.2 used,   1395.5 buff/cache
MiB Swap:    975.0 total,    975.0 free,      0.0 used.   5210.3 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                        
   6496 jadi      20   0   10112   3704   3212 R   6.2   0.1   0:00.01 top                                            
      1 root      20   0  165172  10576   7780 S   0.0   0.2   0:02.80 systemd                                        
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.09 kthreadd                                       
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp                                         
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp                                     
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri                    
      8 root       0 -20       0      0      0 I   0.0   0.0   0:12.71 kworker/0:1H-events_highpri                    
      9 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_percpu_wq                                   
     10 root      20   0       0      0      0 S   0.0   0.0   0:00.00 rcu_tasks_rude_                                
     11 root      20   0       0      0      0 S   0.0   0.0   0:00.00 rcu_tasks_trace
```

ستون **NI** نشان می‌دهد این فرآیند چقدر **nice** (مهربان و خوش‌برخورد) است. هرچه فرآیند مهربان‌تر باشد، سهم کمتری از CPU طلب می‌کند. مقادیر `nice` می‌توانند از `-20` تا `19` باشند. برای درک این مقدار، این‌طور به آن نگاه کنید: فرآیندی با `nice = -20` حسابی عصبانی است و اولویت بیشتری برای CPU و RAM می‌گیرد؛ در حالی که فرآیندی با `nice = 19` بی‌نهایت مهربان است و اجازه می‌دهد فرآیندهای **دیگر** پیش از او از منابع استفاده کنند!

مقدار پیش‌فرض `nice` معمولاً روی `0` تنظیم شده است؛ این را می‌توانید با دستور زیر چک کنید:

```text
$ nice
0
```

می‌توانید میزان nice بودن را با دستور `ps` هم بررسی کنید:

```text
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 15044 15035  0  80   0 -  7453 wait   pts/29   00:00:00 bash
0 S  1000 15052 15044  0  60 -20 -  3976 hrtime pts/29   00:00:00 sleep
0 R  1000 15080 15044  0  80   0 -  4680 -      pts/29   00:00:00 ps
```

### تنظیم میزان `nice`

اگر لازم است سطح nice بودن یک برنامه را هنگام اجرا تغییر دهید، می‌توانید آن را همراه با دستور `nice` و سوئیچ `-n` (مخفف nice) اجرا کنید:

```text
$ nice -n 19 echo "I am running!"
I am running!
$ nice -n -20 echo "I am running!"
nice: cannot set niceness: Permission denied
I am running!
$ sudo nice -n -20 echo "I am running!"
I am running!
```

همان‌طور که در مثال بالا می‌بینید، فقط کاربر `root` می‌تواند اولویت‌های بالا (مقادیر nice کمتر از صفر) را تعیین کند.

> **نکته:** اگر دستوری را با `nice` و بدون ذکر `-n` اجرا کنید، مقدار پیش‌فرض `-n 10` در نظر گرفته می‌شود.

```text
$ nice xeyes &
[1] 15217
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 15044 15035  0  80   0 -  7455 wait   pts/29   00:00:00 bash
0 S  1000 15217 15044  0  90  10 - 12522 poll_s pts/29   00:00:00 xeyes
0 R  1000 15218 15044  0  80   0 -  4680 -      pts/29   00:00:00 ps
```

### تغییر دادن اولویت‌ها (Changing Priorities)

دستور `renice` را می‌توان برای تغییر *مقدار nice* فرآیندهای در حال اجرا (یا فرآیندهای دیگران در صورتی که `root` باشید) استفاده کرد:

```text
$ ps -ef | grep firefox
jadi     13605 11226 30 08:28 ?        00:10:13 /usr/lib/firefox/firefox
jadi     15192 15044  0 09:01 pts/29   00:00:00 grep firefox
$ sudo renice -n -10 13605
13605 (process ID) old priority 5, new priority -10
```

> **نکته:** در محیط دستور `top` هم می‌توانید کلید `r` را بزنید تا اولویت یک فرآیند را تغییر (`renice`) دهید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1036_modify_process_execution_priorities.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
