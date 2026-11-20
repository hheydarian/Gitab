---
layout: layout.njk
title: "۱۰۶.۱ نصب و پیکربندی سیستم پنجره‌ای X11"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 30
chapterSection: "موضوع ۱۰۶: رابط‌های کاربری و دسکتاپ"
permalink: /books/book13/Book/30/1061-install-and-configure-x11/index.html
---
{% raw %}
# ۱۰۶.۱ نصب و پیکربندی سیستم پنجره‌ای X11

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> معماری کلاینت-سرور در Xorg، فایل xorg.conf، ماژول‌های کارت گرافیک و متغیر DISPLAY.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/JqiT4rsTvUo" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت (Weight): ۲_

داوطلبان باید توانایی نصب و پیکربندی سیستم پنجره‌ای `X11` را داشته باشند.

### حوزه‌های دانش کلیدی

* درک معماری `X11`
* آشنایی و درک پایه از فایل پیکربندی سیستم پنجره‌ای X
* بازنویسی بخش‌های خاصی از پیکربندی `Xorg` (مانند چیدمان صفحه‌کلید)
* شناخت اجزای محیط‌های دسکتاپ، از جمله مدیرهای نمایش (Display Managers) و مدیرهای پنجره (Window Managers)
* مدیریت دسترسی به سرور X و نمایش برنامه‌های گرافیکی روی سرورهای X راه‌دور
* آشنایی با `Wayland`

### اصطلاحات و ابزارها

<div dir="ltr">

* `/etc/X11/xorg.conf`
* `/etc/X11/xorg.conf.d/`
* `~/.xsession-errors`
* `xhost`
* `xauth`
* `DISPLAY`
* `X`

</div>

## مقدمه

خیلی از آدم‌ها ترجیح می‌دهند از طریق یک رابط کاربری گرافیکی (یا به اختصار **GUI**) با سیستم خودشان کار کنند و بین فایل‌ها و برنامه‌ها بچرخند. یک سیستم‌عامل مبتنی بر GUI آیکون‌ها، ماوس، پنجره‌ها و پوشه‌ها را در اختیار کاربر می‌گذارد؛ استعاره‌ای از همان «میز کار» یا دسکتاپ روزمره خودمان. اما این اتفاق چطور می‌افتد؟ مثل خیلی چیزهای دیگر در دنیای یونیکس، اینجا هم همه‌چیز از طریق لایه‌هایی از برنامه‌ها انجام می‌شود که هر کدام یک کار مشخص را به بهترین شکل ممکن انجام می‌دهند. تصویر زیر یک نمای کلی و تقریبی از این پشته (Stack) را نشان می‌دهد:

<div class="book-img-frame" style="text-align: center; margin: 24px 0;"><img src="/Gitab/books/book13/assets/gui_stack.png" alt="پشته رابط گرافیکی لینوکس (Linux GUI stack)" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--g-border-dim);" loading="lazy"></div>

در پایین‌ترین سطح، سخت‌افزار (مثلاً مانیتور شما) قرار دارد و روی آن هسته لینوکس (Kernel) و درایورهایش نشسته‌اند. بالای سر آن‌ها نرم‌افزاری به نام **سرور نمایش (Display Server)** یا **مدیر نمایش (Display Manager)** قرار می‌گیرد. این برنامه می‌تواند از سیستم‌عامل (کرنل) بخواهد کارهایی را که مدیر دسکتاپ درخواست کرده انجام دهد. به زبان ساده‌تر، سرور نمایش درخواست‌های رابط کاربری را دریافت می‌کند (حتی از طریق شبکه!) و آن‌ها را به زبانی ترجمه می‌کند که کرنل و درایورهایش متوجه شوند.

در این بخش تمرکز ما روی **X** است که یکی از دو سرور نمایش اصلی در لینوکس محسوب می‌شود، و در انتها هم نگاهی کوتاه به رقیب مدرن‌تر آن یعنی **Wayland** می‌اندازیم.

## سیستم پنجره‌ای X

**X Window System** یک سیستم پنجره‌ای شفاف در برابر شبکه (Network-transparent) است که روی طیف گسترده‌ای از ماشین‌های محاسباتی و گرافیکی اجرا می‌شود؛ از جمله روی اکثر توزیع‌های گنو/لینوکس هر وقت که به رابط گرافیکی نیاز داشته باشند. تاریخچه آن کمی طولانی است؛ همه‌چیز با پروژه *XFree86* شروع شد و بعد سازمان *X.Org* سرور X خودش را راه‌اندازی کرد که امروزه آن را با نام **X11** می‌شناسیم.

> اگر بخواهیم کمی عمیق‌تر شویم: *X Window System* (یا به اختصار *X*) در دهه ۱۹۸۰ سیستم پنجره‌ای پیش‌فرض در اکثر سیستم‌های یونیکس و شبه‌یونیکس بود. سرور *X.Org* پیاده‌سازی آزاد و متن‌باز سرور نمایش X Window System توسط بنیاد X.Org است. امروزه وقتی می‌گوییم *X*، منظورمان کل خانواده پروتکل‌های شبکه‌ای است که مشخص می‌کنند پیام‌ها بین یک کلاینت (برنامه گرافیکی) و سرور نمایش چطور ردوبدل شوند؛ و `X11` یازدهمین نسخه از همین پروتکل است.

### فایل `/etc/X11/xorg.conf`

این فایل در گذشته فایل پیکربندی اصلی برای X بود. این روزها X هنگام بالا آمدن خودش سخت‌افزارها را تشخیص می‌دهد و پیکربندی را انجام می‌دهد و معمولاً نیازی به فایل کانفیگ ندارد. اما اگر بخواهید در فرآیند راه‌اندازی تغییراتی بدهید، می‌توانید با اجرای دستور زیر یک فایل جدید به نام `xorg.conf.new` بسازید:

```bash
Xorg -configure
```

و بعد آن را به مسیر `/etc/X11/xorg.conf` منتقل کنید. این فایل بخش‌های مختلفی دارد. بیایید نگاهی به چند تا از آن‌ها بیندازیم:

```text
Section "Files"
    FontPath    "/usr/share/X11/fonts/misc"
    FontPath    "/usr/share/X11/fonts/100dpi/:unscaled"
    FontPath    "/usr/share/X11/fonts/75dpi/:unscaled"
    FontPath    "/usr/share/X11/fonts/Type1"
    FontPath    "/usr/share/X11/fonts/100dpi"
    FontPath    "/usr/share/X11/fonts/75dpi"
    FontPath    "/var/lib/defoma/x-ttcidfont-conf.d/dirs/TrueType"
EndSection
```

این بخش مربوط به فونت‌ها است. وقتی X-Server اجرا می‌شود به این فایل‌ها نیاز دارد. `FontPath` به X11 می‌گوید فونت‌ها کجا هستند. حتی می‌تواند به IP یک فونت‌سرور (Font Server) اشاره کند که البته این روزها دیگر مرسوم نیست. قدیم‌ترها فونت‌سرورها وظیفه رندر کردن فونت‌ها برای نمایش روی کلاینت‌ها را بر عهده داشتند، اما کامپیوترهای امروزی به اندازه کافی سریع هستند و خودشان فونت‌ها را رندر می‌کنند؛ بنابراین فونت‌سرورها کم‌کم از مد افتاده‌اند!

```text
Section "Module"
    Load    "bitmap"
    Load    "ddc"
    Load    "dri"
    Load    "extmod"
    Load    "freetype"
    Load    "glx"
    Load    "int10"
    Load    "type1"
    Load    "vbe"
    Load    "dbe"
EndSection
```

این‌ها ماژول‌ها هستند. مثلاً `glx` مسئول افکت‌های *گرافیکی سه‌بعدی (3D)* است و ما از X می‌خواهیم آن را همراه بقیه ماژول‌ها بارگذاری کند.

در ادامه بخش دستگاه‌های ورودی (`InputDevice`) را می‌بینیم:

```text
Section "InputDevice"
    Identifier    "Generic Keyboard"
    Driver        "kbd"
    Option        "CoreKeyboard"
    Option        "XkbRules"    "xorg"
    Option        "XkbModel"    "pc105"
    Option        "XkbLayout"    "us"
EndSection

Section "InputDevice"
    Identifier    "Configured Mouse"
    Driver        "mouse"
    Option        "CorePointer"
    Option        "Device"        "/dev/input/mice"
    Option        "Protocol"        "ImPS/2"
    Option        "Emulate3Buttons"    "true"
    Option        "ZAxisMapping"        "4 5"
EndSection

Section "InputDevice"
        Identifier      "Synaptics Touchpad"
        Driver          "synaptics"
        Option          "SendCoreEvents"        "true"
        Option          "Device"                "/dev/psaux"
        Option          "Protocol"              "auto-dev"
        Option          "RightEdge"        "5000"
EndSection
```

همان‌طور که می‌بینید، هر دستگاه یک شناسه (`Identifier`)، یک درایور (`Driver`) و تعدادی گزینه (`Option`) دارد. در بالا یک ماوس، یک صفحه‌کلید و یک تاچ‌پد تعریف کردیم و به هر کدام اسمی دادیم.

```text
Section "Device"
    Identifier    "ATI Technologies, Inc. Radeon Mobility 7500 (M7 LW)"
    Driver        "radeon"
    BusID        "PCI:1:0:0"
    Option        "DynamicClocks"    "on"
    Option        "CRT2HSync"    "30-80"
    Option        "CRT2VRefresh"    "59-75"
      Option        "MetaModes"    "1024x768 800x600 640x480 1024x768+1280x1024"
EndSection
```

این هم یک کارت گرافیک! باز هم شناسه (نام)، درایور و یک سری گزینه (مثل رزولوشن‌های پشتیبانی‌شده، نرخ تازه‌سازی تصویر یا Refresh Rate و...) دارد. این دستگاه به یک صفحه نمایش (`Screen`) و یک مانیتور (`Monitor`) هم نیاز دارد:

> **نکته:** درایور `vesa` به یک درایور با رزولوشن پایین اشاره دارد که تقریباً همیشه کار می‌کند و معمولاً برای عیب‌یابی به کار می‌رود.

```text
Section "Monitor"
    Identifier    "Generic Monitor"
    Option        "DPMS"
EndSection

Section "Screen"
    Identifier    "Screen0"
    Device        "Screen0 ATI Technologies, Inc. Radeon Mobility 7500 (M7 LW)"
    Monitor        "Generic Monitor"
    DefaultDepth    24
    SubSection "Display"
        Depth        1
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        4
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        8
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        15
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        16
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        24
        Modes        "1024x768"
    EndSubSection
EndSection
```

دقت کنید که بخش `Screen` چطور از مانیتوری که قبلاً تعریف کرده‌ایم (با شناسه `"Generic Monitor"`) و کارت گرافیک تعریف‌شده استفاده می‌کند. به عمق رنگ‌های مختلف (مثلاً ۲۴ بیت با رزولوشن `1024x768`) هم توجه کنید.

در نهایت، باید همه بخش‌های بالا را در یک جا به عنوان `ServerLayout` به هم بچسبانیم:

```text
Section "ServerLayout"
    Identifier    "DefaultLayout"
    Screen        "Default Screen"
    InputDevice    "Generic Keyboard"
    InputDevice    "Configured Mouse"
    InputDevice    "Synaptics Touchpad"
EndSection
```

حالا یک چیدمان کامل با یک صفحه نمایش و ۳ دستگاه ورودی داریم :)

> **نکته:** نترسید! داشتن یک درک کلی از ساختار فایل `xorg.conf` برای آزمون کافی است.

### دایرکتوری `/etc/X11/xorg.conf.d/`

اگر فایل `/etc/program.conf` را ویرایش کنید و بعد سیستم را آپدیت کنید، چه اتفاقی می‌افتد؟ آیا سیستم فایل ویرایش‌شده شما را با نسخه جدید توزیع جایگزین می‌کند؟ یا تغییرات نسخه جدید را به خاطر ویرایش‌های محلی شما نادیده می‌گیرد؟ هر دو حالت **بد** است.

برای حل این مشکل، خیلی از برنامه‌ها یک دایرکتوری پیکربندی مثل `/etc/program/program.conf.d/` می‌سازند و از شما می‌خواهند تنظیمات *محلی* خودتان را آنجا بگذارید. این‌طوری فایل اصلی کانفیگ توزیع در `/etc/program/program.conf` دست‌نخورده می‌ماند و تمام تنظیمات شخصی شما به صورت فایل‌های جداگانه داخل `/etc/program/program.conf.d/` قرار می‌گیرند. هم مدیریتش خیلی راحت‌تر است (چون فایل‌های کوچک و اتمیک برای هر تنظیم دارید) و هم تنظیمات محلی به فایل اصلی توزیع دست نمی‌زنند. باحال است، نه؟ بله... دقیقاً همین اتفاق در X11 هم افتاده است. تنظیمات شخصی شما باید داخل `/etc/X11/xorg.conf.d/` بروند و فایل `/etc/X11/xorg.conf` بدون تغییر باقی بماند.

### فایل `~/.xsession-errors`

اگر در حین بالا آمدن یا اجرای X مشکلی پیش بیاید، خطاها در این فایل ثبت می‌شوند. پس اگر در راه‌اندازی رابط گرافیکی به مشکلی برخوردید، این همان فایلی است که باید سراغش بروید تا ببینید چه خطایی رخ داده است.

### xhost

این دستور دسترسی به سرور X را کنترل می‌کند. اگر روی یک سرور X باشید و دستور `xhost` را اجرا کنید، وضعیت دسترسی را به شما نشان می‌دهد:

```text
$ xhost
access control enabled, only authorized clients can connect
SI:localuser:jadi
```

همان‌طور که می‌بینید، فقط کلاینت‌های مجاز می‌توانند متصل شوند. برای باز کردن دسترسی برای همه:

```text
jadi@funlife:~$ xhost +
access control disabled, clients can connect from any host
```

و برای بستن دوباره آن:

```text
jadi@funlife:~$ xhost -
access control enabled, only authorized clients can connect
```

یا می‌توانید دسترسی را فقط برای یک IP خاص باز کنید:

```text
jadi@funlife:~$ xhost +192.168.42.85
192.168.42.85 being added to access control list
jadi@funlife:~$ xhost
access control enabled, only authorized clients can connect
INET:192.168.42.85    (no nameserver response within 5 seconds)
SI:localuser:jadi
```

حالا ماشین `192.168.42.85` (کلاینت یا REMOTE) می‌تواند درخواست‌های گرافیکی خودش را به این ماشین بفرستد. کاربردش چیست؟ بخش بعدی را بخوانید (فرض می‌کنیم این ماشین `192.168.42.80` (SERVER) است و ما دسترسی X11 آن را برای `192.168.42.85` (REMOTE) باز کرده‌ایم).

### متغیر `DISPLAY`

این متغیر به برنامه‌های گرافیکی می‌گوید خروجی گرافیکی خودشان را کجا بفرستند. مقدار پیش‌فرض آن این است:

```text
$ echo $DISPLAY
:0
```

بنابراین اگر هر برنامه گرافیکی را روی ماشین خودم اجرا کنم، خروجی آن روی همین ماشین نمایش داده می‌شود.

اما بیایید مقدار آن را به ماشین `192.168.42.80` (SERVER) تغییر دهیم... یادتان هست که همین الان به آن گفتیم این ماشین (REMOTE) اجازه دارد به آن وصل شود:

```text
$ export DISPLAY=192.168.42.80:0
$ xeyes # the eyes will be shown on 192.168.42.80 machine
```

باحال است، نه؟ ولی این روش ممکن است روی سیستم شما کار نکند. در اکثر توزیع‌های امروزی، X به دلایل امنیتی به طور پیش‌فرض به اتصالات از راه دور گوش نمی‌دهد.

> در فصل بعدی می‌بینیم که چطور می‌توانیم به شکل اصولی و امن برنامه‌های گرافیکی را روی سرورهای راه‌دور اجرا کنیم و تصویر گرافیکی آن‌ها را روی سیستم خودمان دریافت کنیم.

### دستور `xauth`

برنامه `xauth` برای ویرایش و نمایش اطلاعات احراز هویت (Authorization) جهت اتصال به سرور X استفاده می‌شود. در بخش [xhost](#xhost) دیدید که چطور می‌توان X را به روی IPهای راه‌دور باز کرد؛ با استفاده از `xauth` می‌توانید همین کار را بر اساس یک «رمز مشترک» (Shared Secret) انجام دهید.

در این روش، `X` یک فایل به نام `.XAuthority` در دایرکتوری خانه شما می‌سازد و هر کس محتوای آن را داشته باشد می‌تواند با X ارتباط برقرار کند.

> اگر `X` شما درست کار نمی‌کند، یکی از راه‌حل‌های اولیه می‌تواند پاک کردن (`rm`) فایل `.XAuthority` و راه‌اندازی مجدد X باشد.

## سرور نمایش Wayland

*X11* خیلی قدیمی شده است و الان فقط با کلی پچ و وصله‌پینه قابل استفاده مانده. به همین دلیل یکی از توسعه‌دهندگان خود X یک سرور نمایش مدرن به نام *Wayland* را شروع کرد. در سال‌های اخیر بسیاری از توزیع‌ها در حال مهاجرت از *X11* پیش‌فرض به *Wayland* هستند و X11 را فقط به عنوان یک گزینه پشتیبان نگه می‌دارند. Wayland بسیار امن‌تر و نگهداری آن خیلی ساده‌تر است و مطمئن باشید طی چند سال آینده بیشتر و بیشتر از آن خواهید شنید.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1061_install_and_configure_x11.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
