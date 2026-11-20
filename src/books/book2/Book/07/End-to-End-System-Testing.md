---
layout: layout.njk
title: End-to-End
---

# فصل هفتم:  تست سیستم End-to-End

**تست سیستم End-to-End (E2E)** به معنی **تست خودکار کل سیستم به‌صورت کامل و یکپارچه** است. ‍ وقتی شما به‌عنوان برنامه‌نویس کدی می‌نویسید، **تست‌های واحد (Unit Tests)** برای بخش کوچکی از برنامه‌تان انجام می‌دهید. اما این تنها **بخشی کوچک از تصویر بزرگ‌تر سیستم** است. بنابراین در این فصل به موضوعات زیر می‌پردازیم:

* انجام **تست‌های E2E**
* کدنویسی و تست **کارخانه‌ها (Factories)**
* کدنویسی و تست **تزریق وابستگی (Dependency Injection)**
* **تست ماژولارسازی (Modularization)**

در پایان این فصل شما مهارت‌های زیر را به دست خواهید آورد:

1. توانایی تعریف **تست E2E**
2. توانایی انجام **تست E2E**
3. توانایی توضیح اینکه **کارخانه‌ها** چه هستند و چطور استفاده می‌شوند
4. توانایی درک اینکه **تزریق وابستگی** چیست و چگونه از آن استفاده کنیم
5. توانایی درک اینکه **ماژولارسازی** چیست و چطور از آن بهره ببریم

---

### تست E2E چیست؟

فرض کنید پروژه‌تان را تمام کرده‌اید و تمام **تست‌های واحد** شما با موفقیت عبور کرده‌اند.  اما پروژه شما بخشی از یک **سیستم بزرگ‌تر** است. این سیستم بزرگ‌تر نیاز به تست دارد تا مطمئن شویم **کد شما و کدهای دیگر بخش‌ها** که با آن در ارتباط هستند، **به‌درستی با هم کار می‌کنند**.

گاهی **کدی که به‌صورت مجزا تست شده است**، هنگام **ادغام در یک سیستم بزرگ‌تر** دچار مشکل می‌شود. همچنین، اضافه شدن کدهای جدید می‌تواند باعث **خرابی سیستم‌های موجود** شود. به همین دلیل، انجام **تست E2E** که به آن **تست یکپارچه (Integration Testing)** نیز گفته می‌شود، بسیار مهم است.

---

### تست یکپارچه (Integration Testing)

**تست یکپارچه** وظیفه دارد **کل جریان برنامه را از ابتدا تا انتها** بررسی کند. این نوع تست معمولاً از **مرحله جمع‌آوری نیازمندی‌ها** آغاز می‌شود:

1. ابتدا **نیازمندی‌های سیستم را جمع‌آوری و مستندسازی** می‌کنید.
2. سپس **طراحی تمام کامپوننت‌ها** را انجام می‌دهید و **تست‌های هر زیرسیستم** را مشخص می‌کنید.
3. بعد، **تست‌های E2E برای کل سیستم** را طراحی می‌کنید.
4. در ادامه، بر اساس نیازمندی‌ها، **کدنویسی** می‌کنید و **تست‌های واحد خودتان را پیاده‌سازی** می‌کنید.
5. پس از کامل شدن کد و موفقیت در تست‌ها، کد در **محیط تست** به کل سیستم **ادغام** می‌شود و **تست‌های E2E اجرا می‌شوند**.

معمولاً **تست‌های E2E به‌صورت دستی** انجام می‌شوند، اما هرجا امکان‌پذیر باشد، می‌توان آنها را **خودکارسازی (Automation)** کرد.

شکل زیر سیستمی را نشان می‌دهد که از **دو زیرسیستم همراه با ماژول‌ها و یک پایگاه داده** تشکیل شده است. در **تست E2E**، تمام این ماژول‌ها به‌صورت **دستی، خودکار، یا ترکیبی از هر دو روش** تست خواهند شد. 

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-1.jpeg)
</div>

### تمرکز اصلی در تست‌های E2E

ورودی‌ها و خروجی‌های هر سیستم، **اصلی‌ترین بخش‌هایی هستند که در تست‌ها باید بررسی شوند**.  شما باید از خودتان بپرسید:
**آیا اطلاعات صحیح به هر سیستم وارد و از آن خارج می‌شوند؟**

علاوه بر این، هنگام ساخت تست‌های **E2E** باید به **۳ موضوع کلیدی** توجه کنید:

1. **چه قابلیت‌هایی برای کاربر وجود خواهد داشت** و هر قابلیت چه مراحلی را انجام می‌دهد؟
2. **چه شرایطی برای هر قابلیت و هر مرحله از آن وجود خواهد داشت؟**
3. **چه سناریوهای مختلفی وجود دارند که باید برای آنها کیس‌های تست طراحی کنیم؟**

---

هر **زیرسیستم** دارای یک یا چند **ویژگی (Feature)** است که ارائه می‌کند. هر ویژگی شامل چندین **عمل (Action)** است که باید به ترتیب مشخصی اجرا شوند. این عملیات **ورودی‌هایی دریافت می‌کنند و خروجی‌هایی تولید می‌کنند**. همچنین، **ارتباطاتی بین ویژگی‌ها و قابلیت‌ها وجود دارد** که باید آنها را شناسایی کنید. پس از این مرحله، باید مشخص کنید که هر قابلیت **قابلیت استفاده مجدد دارد یا مستقل است**.

---

### مثال: سیستم آزمون آنلاین 

بیایید یک سناریوی ساده را در نظر بگیریم: **یک سیستم آزمون آنلاین**.
در این سیستم:

* **معلم‌ها** و **دانش‌آموزها** وارد سیستم می‌شوند (**Login**).
* اگر **معلم** وارد شود، به **کنسول مدیریت (Admin Console)** هدایت می‌شود.
* اگر **دانش‌آموز** وارد شود، به **منوی آزمون‌ها (Test Menu)** منتقل می‌شود تا یک یا چند آزمون انجام دهد.

در این مثال، در واقع **۳ زیرسیستم** داریم:

1. **سیستم ورود (Login System)**
2. **سیستم مدیریت (Admin System)**
3. **سیستم آزمون (Test System)**

---

در این سیستم **دو جریان اجرایی (Flow)** وجود دارد:

* **جریان مدیریت (Admin Flow)**
* **جریان آزمون (Test Flow)**

برای هر جریان باید **شرایط و کیس‌های تست** تعریف شوند.

ما از همین سناریوی ساده‌ی **سیستم ورود به آزمون آنلاین** به‌عنوان **نمونه‌ی E2E** استفاده خواهیم کرد. البته در دنیای واقعی، تست‌های E2E بسیار **پیچیده‌تر و گسترده‌تر** از آنچه در این فصل بررسی می‌کنیم هستند.

هدف این فصل این است که **ذهنتان را با مفهوم تست‌های E2E آشنا کنیم و بهترین روش‌های پیاده‌سازی آن را نشان دهیم**. به همین دلیل همه‌چیز را **تا جای ممکن ساده نگه می‌داریم** تا پیچیدگی باعث از بین رفتن اصل مطلب نشود.

---

### هدف این بخش

هدف ما این است که **۳ اپلیکیشن کنسولی** بسازیم که کل سیستم را تشکیل دهند:

* **ماژول ورود (Login Module)**
* **ماژول مدیریت (Admin Module)**
* **ماژول آزمون (Test Module)**

سپس، بعد از ساخت این ماژول‌ها، آنها را به‌صورت **دستی تست خواهیم کرد**.

**شکل بعدی** نحوه تعامل این سیستم‌ها با هم را نشان می‌دهد. ما از **ماژول ورود (Login)** شروع خواهیم کرد.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-2.jpeg)
</div>

### ماژول ورود (Login Module – زیرسیستم ورود)

اولین بخش سیستم ما نیاز دارد که **معلم‌ها و دانش‌آموزها با استفاده از یک نام کاربری و گذرواژه وارد سیستم شوند**. 
**لیست وظایف این بخش به شکل زیر است:**

1. وارد کردن **نام کاربری**
2. وارد کردن **گذرواژه**
3. فشردن گزینه **Cancel** (برای ریست کردن نام کاربری و گذرواژه)
4. فشردن گزینه **OK**
5. اگر **نام کاربری نامعتبر باشد**، باید یک پیام خطا در صفحه ورود نمایش داده شود.
6. اگر **کاربر معتبر باشد**، آنگاه موارد زیر اجرا می‌شوند:

   * اگر کاربر **معلم** باشد، **کنسول مدیریت (Admin Console)** بارگذاری می‌شود.
   * اگر کاربر **دانش‌آموز** باشد، **کنسول آزمون (Test Console)** بارگذاری می‌شود.

---

### ساخت اپلیکیشن کنسولی

بیایید با ساخت یک **اپلیکیشن کنسولی** شروع کنیم و نام آن را **CH07\_Logon** بگذاریم.

در کلاس **Program.cs**، کد پیش‌فرض را با کد زیر جایگزین کنید:

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace CH07_Logon
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            DoLogin("Welcome to the test platform");
        }
    }
}
```

متد **DoLogin()** رشته‌ی ارسال‌شده را گرفته و آن را به‌عنوان **عنوان (Title)** استفاده می‌کند. از آنجایی که هنوز وارد سیستم نشده‌ایم، عنوان برابر خواهد بود با:

`Welcome to the test platform`

حالا باید متد **DoLogin()** را اضافه کنیم. کد این متد به شکل زیر است:

```csharp
private static void DoLogin(string message)
{
    Console.WriteLine("----------------------------");
    Console.WriteLine(message);
    Console.WriteLine("----------------------------");
    Console.Write("Enter your username: ");
    var usr = Console.ReadLine();
    Console.Write("Enter your password: ");
    var pwd = ReadPassword();
    ValidateUser(usr, pwd);
}
```

کد بالا **یک پیام دریافت می‌کند و آن را به‌عنوان عنوان در پنجره کنسول نمایش می‌دهد**. سپس از کاربر می‌خواهد **نام کاربری و گذرواژه** خود را وارد کند.
متد **ReadPassword()** تمام ورودی‌های کاربر را می‌خواند و کاراکترها را با **ستاره (\*)** جایگزین می‌کند تا ورودی مخفی شود. در نهایت، نام کاربری و گذرواژه به متد **ValidateUser()** ارسال می‌شوند تا اعتبارسنجی شوند.

---

### افزودن متد ReadPassword()

ابتدا متد زیر را اضافه می‌کنیم:

```csharp
public static string ReadPassword()
{
    return ReadPassword('*');
}
```

این متد ساده است و فقط یک متد Overload دیگر به نام خودش را صدا می‌زند و **کاراکتر ماسک گذرواژه** را ارسال می‌کند. حالا متد Overload را پیاده‌سازی می‌کنیم:

```csharp
public static string ReadPassword(char mask)
{
    const int enter = 13, backspace = 8, controlBackspace = 127;
    int[] filtered = { 0, 27, 9, 10, 32 };
    var pass = new Stack<char>();
    char chr = (char)0;
    while ((chr = Console.ReadKey(true).KeyChar) != enter)
    {
        if (chr == backspace)
        {
            if (pass.Count > 0)
            {
                Console.Write("\b \b");
                pass.Pop();
            }
        }
        else if (chr == controlBackspace)
        {
            while (pass.Count > 0)
            {
                Console.Write("\b \b");
                pass.Pop();
            }
        }
        else if (filtered.Count(x => chr == x) <= 0)
        {
            pass.Push((char)chr);
            Console.Write(mask);
        }
    }
    Console.WriteLine();
    return new string(pass.Reverse().ToArray());
}
```

---

### توضیح متد ReadPassword()

این متد Overload یک **کاراکتر ماسک گذرواژه** دریافت می‌کند. نحوه کار آن:

* هر کلید زده شده را بررسی و در **استک (Stack)** ذخیره می‌کند.
* اگر کلید **Enter** زده شود، حلقه تمام می‌شود.
* اگر کلید **Backspace/Delete** زده شود، آخرین کاراکتر واردشده حذف می‌شود.
* اگر کاراکتر واردشده جزو **کاراکترهای فیلترشده** نباشد، به استک اضافه شده و **کاراکتر ماسک** در صفحه نمایش داده می‌شود.
* در انتها پس از فشردن **Enter**، استک معکوس شده و به رشته تبدیل می‌شود.

---

### افزودن متد ValidateUser()

آخرین متدی که برای این زیرسیستم نیاز داریم:

```csharp
private static void ValidateUser(string usr, string pwd)
{
    if (usr.Equals("admin") && pwd.Equals("letmein"))
    {
        var process = new Process();
        process.StartInfo.FileName =
 @"..\..\..\CH07_Admin\bin\Debug\CH07_Admin.exe";
        process.StartInfo.Arguments = "admin";
        process.Start();
    }
    else if (usr.Equals("student") && pwd.Equals("letmein"))
    {
        var process = new Process();
        process.StartInfo.FileName =
 @"..\..\..\CH07_Test\bin\Debug\CH07_Test.exe";
        process.StartInfo.Arguments = "test";
        process.Start();
    }
    else
    {
        Console.Clear();
        DoLogin("Invalid username or password");
    }
}
```

---

### توضیح متد ValidateUser()

این متد **نام کاربری و گذرواژه** را بررسی می‌کند:

* اگر اطلاعات واردشده با **admin / letmein** مطابقت داشته باشد، **کنسول مدیریت** اجرا می‌شود.
* اگر اطلاعات واردشده با **student / letmein** مطابقت داشته باشد، **کنسول آزمون** اجرا می‌شود.
* در غیر این صورت، **کنسول پاک شده** و پیام خطا نمایش داده می‌شود، سپس دوباره فرآیند ورود آغاز می‌شود.

پس از ورود موفق، **زیرسیستم مربوطه بارگذاری شده و ماژول ورود پایان می‌یابد**. 

### ماژول مدیریت (Admin Module – زیرسیستم مدیریت)

**زیرسیستم مدیریت** جایی است که تمام کارهای مدیریتی سیستم انجام می‌شود. این عملیات شامل موارد زیر است:

* **وارد کردن (Import)** دانش‌آموزان
* **خروجی گرفتن (Export)** از لیست دانش‌آموزان
* **افزودن** دانش‌آموز
* **حذف** دانش‌آموز
* **ویرایش پروفایل** دانش‌آموز
* **اختصاص آزمون‌ها** به دانش‌آموزان
* **تغییر گذرواژه مدیر**
* **پشتیبان‌گیری از داده‌ها**
* **بازیابی داده‌ها**
* **حذف کامل داده‌ها**
* **مشاهده گزارش‌ها**
* **خروجی گرفتن از گزارش‌ها**
* **ذخیره گزارش‌ها**
* **چاپ گزارش‌ها**
* **خروج از سیستم**

البته برای این تمرین، **هیچ‌کدام از این قابلیت‌ها را پیاده‌سازی نمی‌کنیم**. این‌ها را به‌عنوان **تمرین و سرگرمی** به خود شما واگذار می‌کنم. 
آنچه برای ما مهم است، این است که **ماژول مدیریت فقط در صورت ورود موفق (Login)** بارگذاری شود. اگر کسی بدون ورود بخواهد این ماژول را اجرا کند، **پیام خطا نمایش داده می‌شود** و با فشردن یک کلید، کاربر به **ماژول ورود** بازگردانده می‌شود.

ورود موفق زمانی انجام می‌شود که کاربر **به‌عنوان مدیر وارد شود** و برنامه **Admin** با آرگومان **admin** اجرا گردد.

---

### ساخت اپلیکیشن کنسولی CH07\_Admin

در Visual Studio یک **کنسول اپلیکیشن** بسازید و نام آن را **CH07\_Admin** بگذارید. سپس متد **Main()** را به شکل زیر به‌روزرسانی کنید:

```csharp
private static void Main(string[] args)
{
    if ((args.Count() > 0) && (args[0].Equals("admin")))
    {
        DisplayMainScreen();
    }
    else
    {
        DisplayMainScreenError();
    }
}
```

متد **Main()** بررسی می‌کند که:

1. آرگومان‌ها بیشتر از ۰ باشند.
2. اولین آرگومان **admin** باشد.

اگر هر دو شرط برقرار باشد، متد **DisplayMainScreen()** اجرا می‌شود، در غیر این صورت، متد **DisplayMainScreenError()** که پیام خطا نشان می‌دهد فراخوانی خواهد شد.

---

### متد DisplayMainScreen()

```csharp
private static void DisplayMainScreen()
{
    Console.WriteLine("------------------------------------");
    Console.WriteLine("Test Platform Administrator Console");
    Console.WriteLine("------------------------------------");
    Console.WriteLine("Press any key to exit");
    Console.ReadKey();
    Process.Start(@"..\..\..\CH07_Logon\bin\Debug\CH07_Logon.exe");
}
```

این متد بسیار ساده است:

* یک عنوان و پیام نمایش می‌دهد.
* منتظر فشردن کلید از طرف کاربر می‌ماند.
* پس از فشردن کلید، کاربر را به **ماژول ورود** هدایت می‌کند و برنامه خارج می‌شود.

---

### متد DisplayMainScreenError()

```csharp
private static void DisplayMainScreenError()
{
    Console.WriteLine("------------------------------------");
    Console.WriteLine("Test Platform Administrator Console");
    Console.WriteLine("------------------------------------");
    Console.WriteLine("You must login to use the admin module.");
    Console.WriteLine("Press any key to exit");
    Console.ReadKey();
    Process.Start(@"..\..\..\CH07_Logon\bin\Debug\CH07_Logon.exe");
}
```

این متد نشان می‌دهد که ماژول بدون ورود اجرا شده که **مجاز نیست**. پس از نمایش پیام، با فشردن کلید کاربر به **ماژول ورود** برمی‌گردد.

---

### ماژول آزمون (Test Module – زیرسیستم آزمون)

**زیرسیستم آزمون** شامل یک **منو** است که:

* لیست آزمون‌هایی که دانش‌آموز باید انجام دهد را نمایش می‌دهد.
* امکان انتخاب یک آزمون برای شروع را فراهم می‌کند.
* پس از پایان آزمون، **نتایج ذخیره شده** و کاربر به منو بازگردانده می‌شود.
* آزمون انجام‌شده از لیست حذف می‌شود.
* با خروج از این ماژول، کاربر به **ماژول ورود** بازگردانده می‌شود.

در این تمرین نیز پیاده‌سازی کامل این قابلیت‌ها به شما واگذار شده است. مهم‌ترین نکته این است که **ماژول آزمون فقط زمانی اجرا شود که کاربر وارد سیستم شده باشد**. همچنین وقتی کاربر از این ماژول خارج شود، به **ماژول ورود** برگردد.

این ماژول تقریباً مشابه ماژول مدیریت است. برای همین سریع جلو می‌رویم.

---

### به‌روزرسانی متد Main() در ماژول آزمون

```csharp
private static void Main(string[] args)
{
    if ((args.Count() > 0) && (args[0].Equals("test")))
    {
        DisplayMainScreen();
    }
    else
    {
        DisplayMainScreenError();
    }
}
```

---

### متد DisplayMainScreen()

```csharp
private static void DisplayMainScreen()
{
    Console.WriteLine("------------------------------------");
    Console.WriteLine("Test Platform Student Console");
    Console.WriteLine("------------------------------------");
    Console.WriteLine("Press any key to exit");
    Console.ReadKey();
    Process.Start(@"..\..\..\CH07_Logon\bin\Debug\CH07_Logon.exe");
}
```

---

### متد DisplayMainScreenError()

```csharp
private static void DisplayMainScreenError()
{
    Console.WriteLine("------------------------------------");
    Console.WriteLine("Test Platform Student Console");
    Console.WriteLine("------------------------------------");
    Console.WriteLine("You must login to use the student module.");
    Console.WriteLine("Press any key to exit");
    Console.ReadKey();
    Process.Start(@"..\..\..\CH07_Logon\bin\Debug\CH07_Logon.exe");
}
```

این متد نیز مشابه متد ماژول مدیریت است. اگر بدون ورود اجرا شود، پیغام خطا داده و کاربر را به **ماژول ورود** هدایت می‌کند.

---

حالا که هر سه ماژول را نوشتیم (**ورود، مدیریت، آزمون**)، در بخش بعدی به **تست این ماژول‌ها** می‌پردازیم.

### تست کردن سیستم سه‌ماژوله با استفاده از E2E 

در این بخش، قرار است یک تست دستی **End-to-End (E2E)** روی سیستم سه‌ماژوله خود انجام دهیم. هدف این است که ماژول ورود (**Login Module**) را آزمایش کنیم تا مطمئن شویم فقط ورودهای معتبر اجازه دسترسی به ماژول ادمین (**Admin Module**) یا ماژول تست (**Test Module**) را دارند.

* وقتی یک **ادمین معتبر** وارد سیستم می‌شود، باید ماژول ادمین نمایش داده شود و ماژول ورود بسته شود.
* وقتی یک **دانش‌آموز معتبر** وارد سیستم می‌شود، باید ماژول تست نمایش داده شود و ماژول ورود بسته شود.

حالا اگر تلاش کنیم بدون ورود به سیستم، **ماژول ادمین** را اجرا کنیم، باید پیغامی دریافت کنیم که ابتدا باید وارد سیستم شویم. با فشردن هر کلید، ماژول ادمین بسته شده و ماژول ورود اجرا خواهد شد. همین رفتار برای **ماژول تست** نیز باید برقرار باشد؛ یعنی اگر بدون ورود آن را اجرا کنیم، هشداری دریافت می‌کنیم که باید ابتدا وارد سیستم شویم و با فشردن یک کلید، ماژول تست بسته شده و ماژول ورود اجرا می‌شود.

#### حالا مراحل تست دستی را با هم مرور می‌کنیم

**۱.** مطمئن شوید که همه پروژه‌ها ساخته (Build) شده‌اند، سپس **ماژول ورود (Login Module)** را اجرا کنید. باید صفحه‌ای مشابه تصویر زیر را مشاهده کنید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-3.jpeg)
</div>

**۲.** یک **نام کاربری و/یا رمز عبور اشتباه** وارد کنید و کلید **Enter** را فشار دهید. در این صورت، صفحه زیر را مشاهده خواهید کرد:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-4.jpeg)
</div>

**۳.** کلید **Enter** را فشار دهید. در صورت ورود موفق، باید صفحه ماژول مدیر (**admin module**) را مشاهده کنید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-5.jpeg)
</div>

**۴.** هر کلیدی را فشار دهید تا خارج شوید، سپس باید دوباره صفحه ماژول ورود (**login module**) را مشاهده کنید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-6.jpeg)
</div>

**۵.** نام کاربری را **student** و رمز عبور را **letmein** وارد کنید. سپس کلید **Enter** را فشار دهید و باید صفحه ماژول دانش‌آموز (**student module**) نمایش داده شود:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-7.jpeg)
</div>

**۶.** اکنون تلاش کنید **ماژول ادمین (Admin Module)** را بدون ورود به سیستم اجرا کنید، و باید صفحه زیر را مشاهده کنید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-8.jpeg)
</div>

**۷.** حالا تلاش کنید **ماژول تست (Test Module)** را بدون ورود به سیستم اجرا کنید، و باید صفحه زیر را مشاهده کنید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-9.jpeg)
</div>

اکنون ما **تست E2E دستی** سیستم خود که شامل **سه ماژول** است را با موفقیت انجام دادیم . این روش بهترین راه برای بررسی یک سیستم در هنگام **تست E2E** محسوب می‌شود.

تست‌های واحد (**Unit Tests**) شما در این مرحله بسیار مفید خواهند بود و باعث می‌شوند که این مرحله نسبتاً ساده و بدون مشکل طی شود. تا زمانی که به این مرحله برسید، باگ‌ها و خطاهای اصلی باید شناسایی و رفع شده باشند.

اما همان‌طور که همیشه وجود دارد، امکان بروز مشکلات هنوز هست؛ به همین دلیل، **اجرای دستی کل سیستم** ارزش زیادی دارد. با این کار می‌توانید **به‌صورت بصری و تعاملی** بررسی کنید که سیستم همان‌طور که انتظار می‌رود رفتار می‌کند. 

سیستم‌های بزرگ‌تر از **کارخانه‌ها (Factories)** و **تزریق وابستگی (Dependency Injection)** استفاده می‌کنند. در بخش‌های بعدی این فصل، ابتدا به **کارخانه‌ها** و سپس به **تزریق وابستگی** خواهیم پرداخت. 

### کارخانه‌ها (Factories) 

**کارخانه‌ها** با استفاده از **الگوی متد کارخانه (Factory Method Pattern)** پیاده‌سازی می‌شوند. هدف این الگو این است که **ایجاد اشیا (Objects) بدون مشخص کردن کلاس‌های آن‌ها** ممکن شود. این کار از طریق فراخوانی **متد کارخانه (Factory Method)** انجام می‌شود.

هدف اصلی **متد کارخانه**، **ایجاد یک نمونه (Instance) از یک کلاس** است.

---

### موارد استفاده از الگوی متد کارخانه

شما از **الگوی متد کارخانه** در سناریوهای زیر استفاده می‌کنید:

1. وقتی کلاس قادر نیست نوع شیءی که باید ساخته شود را پیش‌بینی کند.
2. وقتی **زیرکلاس (Subclass)** باید نوع شیء را مشخص کند که ساخته شود.
3. وقتی کلاس **کنترل ساخت اشیا** را بر عهده دارد.

---

### نمودار مثال

(در این بخش، یک نمودار برای نشان دادن نحوه تعامل کارخانه و اشیا ارائه می‌شود.)

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-10.jpeg)
</div>

### توضیح و پیاده‌سازی الگوی Factory در پروژه‌های .NET 

همان‌طور که از نمودار قبلی مشاهده می‌کنید، اجزای اصلی به شرح زیر هستند:

* **Factory**: این کلاس **اینترفیس FactoryMethod()** را فراهم می‌کند که یک نوع (Type) را بازمی‌گرداند.
* **ConcreteFactory**: این کلاس متد **FactoryMethod()** را **Override** یا **Implement** می‌کند تا یک نوع مشخص (Concrete Type) بازگردانده شود.
* **ConcreteObject**: این کلاس یا از کلاس پایه **Base Class** ارث‌بری می‌کند یا اینترفیس مربوطه را **Implement** می‌کند.

---

### سناریوی عملی

فرض کنید شما سه مشتری مختلف دارید که هر کدام نیاز به یک **پایگاه داده رابطه‌ای (Relational Database)** متفاوت به‌عنوان منبع داده‌های Backend دارند:

* مشتری اول: **Oracle Database**
* مشتری دوم: **SQL Server**
* مشتری سوم: **MySQL**

در جریان **تست E2E**، شما نیاز دارید که سیستم خود را روی هر یک از این پایگاه‌های داده آزمایش کنید. اما چگونه می‌توان برنامه را **یک بار نوشت و روی هر پایگاه داده اجرا کرد؟** 

اینجاست که **الگوی Factory Method** وارد عمل می‌شود.

* در هنگام نصب یا پیکربندی اولیه برنامه، می‌توان از کاربر خواست که پایگاه داده مورد نظر خود را انتخاب کند.
* این اطلاعات می‌تواند در یک **فایل پیکربندی (Configuration File)** به صورت **رمزنگاری‌شده** ذخیره شود.
* هنگام اجرای برنامه، رشته اتصال پایگاه داده (**Connection String**) خوانده و رمزگشایی می‌شود و سپس به متد کارخانه ارسال می‌شود.
* در نهایت، یک **شیء اتصال مناسب به پایگاه داده** ساخته و بازگردانده می‌شود تا توسط برنامه استفاده شود.

---

### ایجاد پروژه و فایل پیکربندی

یک **Console Application** در Visual Studio بسازید و نام آن را **CH07\_Factories** بگذارید.

در فایل **App.config** کد زیر را قرار دهید:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <startup>
    <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.8" />
  </startup>
  <connectionStrings>
    <clear />
    <add name="SqlServer"
         connectionString="Data Source=SqlInstanceName;Initial Catalog=DbName;Integrated Security=True"
         providerName="System.Data.SqlClient" />
    <add name="Oracle"
         connectionString="Data Source=OracleInstance;User Id=usr;Password=pwd;Integrated Security=no;"
         providerName="System.Data.OracleClient" />
    <add name="MySQL"
         connectionString="Server=MySqlInstance;Database=MySqlDb;Uid=usr;Pwd=pwd;"
         providerName="System.Data.MySqlClient" />
  </connectionStrings>
</configuration>
```

> در اینجا برای ساده‌تر کردن مثال، رشته‌های اتصال **رمزنگاری نشده** هستند، اما در محیط واقعی، حتماً رشته‌های اتصال را **رمزنگاری کنید**. 

---

### پیاده‌سازی کلاس Factory

ابتدا کلاس **Abstract Factory** را ایجاد می‌کنیم:

```csharp
namespace CH07_Factories
{
    public abstract class Factory
    {
        public abstract IDatabaseConnection FactoryMethod();
    }
}
```

سپس اینترفیس **IDatabaseConnection** را تعریف می‌کنیم:

```csharp
namespace CH07_Factories
{
    public interface IDatabaseConnection
    {
        string ConnectionString { get; }
        void OpenConnection();
        void CloseConnection();
    }
}
```

> اینترفیس شامل:
>
> * **ConnectionString** فقط برای خواندن
> * متد **OpenConnection()** برای باز کردن اتصال
> * متد **CloseConnection()** برای بستن اتصال

---

### پیاده‌سازی کلاس‌های اتصال به پایگاه داده

**SQL Server**:

```csharp
public class SqlServerDbConnection : IDatabaseConnection
{
    public string ConnectionString { get; }

    public SqlServerDbConnection(string connectionString)
    {
        ConnectionString = connectionString;
    }

    public void CloseConnection()
    {
        Console.WriteLine("SQL Server Database Connection Closed.");
    }

    public void OpenConnection()
    {
        Console.WriteLine("SQL Server Database Connection Opened.");
    }
}
```

**Oracle Database**:

```csharp
public class OracleDbConnection : IDatabaseConnection
{
    public string ConnectionString { get; }

    public OracleDbConnection(string connectionString)
    {
        ConnectionString = connectionString;
    }

    public void CloseConnection()
    {
        Console.WriteLine("Oracle Database Connection Closed.");
    }

    public void OpenConnection()
    {
        Console.WriteLine("Oracle Database Connection Opened.");
    }
}
```

**MySQL Database**:

```csharp
public class MySqlDbConnection : IDatabaseConnection
{
    public string ConnectionString { get; }

    public MySqlDbConnection(string connectionString)
    {
        ConnectionString = connectionString;
    }

    public void CloseConnection()
    {
        Console.WriteLine("MySQL Database Connection Closed.");
    }

    public void OpenConnection()
    {
        Console.WriteLine("MySQL Database Connection Opened.");
    }
}
```

---

### پیاده‌سازی ConcreteFactory

```csharp
using System.Configuration;

namespace CH07_Factories
{
    public class ConcreteFactory : Factory
    {
        private static ConnectionStringSettings _connectionStringSettings;

        public ConcreteFactory(string connectionStringName)
        {
            _connectionStringSettings = GetDbConnectionSettings(connectionStringName);
        }

        private static ConnectionStringSettings GetDbConnectionSettings(string connectionStringName)
        {
            return ConfigurationManager.ConnectionStrings[connectionStringName];
        }

        public override IDatabaseConnection FactoryMethod()
        {
            var providerName = _connectionStringSettings.ProviderName;
            var connectionString = _connectionStringSettings.ConnectionString;

            switch (providerName)
            {
                case "System.Data.SqlClient":
                    return new SqlServerDbConnection(connectionString);
                case "System.Data.OracleClient":
                    return new OracleDbConnection(connectionString);
                case "System.Data.MySqlClient":
                    return new MySqlDbConnection(connectionString);
                default:
                    return null;
            }
        }
    }
}
```

> در این متد، ابتدا **ConnectionStringSettings** خوانده شده و بسته به **ProviderName**، شیء مناسب ساخته و بازگردانده می‌شود.

---

### نوشتن تست‌های NUnit برای Factory

ابتدا یک **NUnit Test Project** بسازید، به پروژه **CH07\_Factories** رفرنس اضافه کنید و **System.Configuration.ConfigurationManager** را از NuGet نصب کنید.

**تست SQL Server:**

```csharp
[Test]
public void IsSqlServerDbConnection()
{
    var factory = new ConcreteFactory("SqlServer");
    var connection = factory.FactoryMethod();
    Assert.IsInstanceOf<SqlServerDbConnection>(connection);
}
```

**تست Oracle:**

```csharp
[Test]
public void IsOracleDbConnection()
{
    var factory = new ConcreteFactory("Oracle");
    var connection = factory.FactoryMethod();
    Assert.IsInstanceOf<OracleDbConnection>(connection);
}
```

**تست MySQL:**

```csharp
[Test]
public void IsMySqlDbConnection()
{
    var factory = new ConcreteFactory("MySQL");
    var connection = factory.FactoryMethod();
    Assert.IsInstanceOf<MySqlDbConnection>(connection);
}
```

> اگر تست‌ها اجرا نشوند، علت این است که متغیر `_connectionStringSettings` مقداردهی نشده است. با تغییر **Constructor** به شکل زیر مشکل حل می‌شود:

```csharp
public ConcreteFactory(string connectionStringName)
{
    _connectionStringSettings = GetDbConnectionSettings(connectionStringName);
}
```

> همچنین مطمئن شوید NUnit به **App.config** درست دسترسی دارد تا رشته‌های اتصال خوانده شوند.

این کار به شما **اطلاع می‌دهد که NUnit به دنبال تنظیمات رشته‌های اتصال (Connection String)** در کجا است. اگر این فایل وجود نداشته باشد، می‌توانید آن را **به‌صورت دستی ایجاد کرده** و محتوای فایل اصلی **App.config** خود را در آن کپی کنید.

اما مشکل این روش این است که **فایل احتمالاً در Build بعدی حذف خواهد شد**. برای اینکه این تغییر **همیشگی شود**، می‌توانید یک **دستور Post-build Event** به پروژه تست خود اضافه کنید.

---

### مراحل افزودن Post-build Event

1. روی پروژه تست کلیک راست کرده و **Properties** را انتخاب کنید.
2. در تب Properties، گزینه **Build Events** را انتخاب کنید.
3. در بخش **Post-build event command line**، دستور زیر را اضافه کنید:

```cmd
xcopy "$(ProjectDir)App.config" "$(ProjectDir)bin\Debug\netcoreapp3.1\" /Y /I /R
```

---

اسکرین‌شات زیر صفحه **Build Events** در پنجره **Project Properties** را نشان می‌دهد که **Post-build event command line** در آن قرار گرفته است:

<div align="center">
  
![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-11.jpeg)
</div>

 این روش تضمین می‌کند که فایل App.config همیشه به مسیر خروجی (**Output Directory**) کپی شود و NUnit بتواند رشته‌های اتصال را پیدا کند.

این کار باعث می‌شود که **فایل گمشده در پوشه خروجی پروژه تست** ایجاد شود. در سیستم شما، این فایل ممکن است به نام **testhost.x86.dll.config** باشد، همان‌طور که در سیستم من است. 

حالا **Buildها** باید بدون مشکل اجرا شوند.

اگر **نوع بازگشتی (Return Type)** یکی از **Caseها در FactoryMethod()** را تغییر دهید، خواهید دید که **تست شما شکست می‌خورد**، همان‌طور که در اسکرین‌شات زیر نشان داده شده است:

 این رفتار نشان می‌دهد که تست‌های خودکار **درستی عملکرد FactoryMethod** را به‌طور دقیق بررسی می‌کنند و هرگونه تغییر اشتباه به سرعت شناسایی می‌شود.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-12.jpeg)
</div>

کد را به **نوع صحیح بازگردانید** تا تست‌های شما اکنون موفق شوند .

ما اکنون دیدیم که چگونه می‌توان یک سیستم را **به‌صورت دستی E2E تست کرد**، همچنین چگونه از **Factoryها** استفاده کنیم و چگونه می‌توان به‌صورت خودکار بررسی کرد که Factoryها طبق انتظار عمل می‌کنند.

حالا به **Dependency Injection (DI)** می‌پردازیم و نحوه **E2E تست کردن آن** را بررسی می‌کنیم.

---

## Dependency Injection 

**Dependency Injection (DI)** به شما کمک می‌کند کدی **با اتصال ضعیف (loosely coupled)** تولید کنید، با جدا کردن رفتار کد از وابستگی‌های آن. این کار باعث می‌شود کد **خواناتر، قابل تست، توسعه و نگهداری آسان‌تر** شود.
کد خواناتر است زیرا **اصل Single Responsibility** رعایت می‌شود و کد کوچکتر و مدیریت آن آسان‌تر می‌شود. با تکیه بر **انتزاعات (Abstractions)** به جای پیاده‌سازی‌ها، می‌توان کد را راحت‌تر **گسترش داد**.

انواع DI قابل پیاده‌سازی شامل موارد زیر است:
1⃣ Constructor Injection
2⃣ Property/Setter Injection
3⃣ Method Injection

نسخه ساده DI بدون **Container** انجام می‌شود، اما بهترین روش **استفاده از DI Container** است.
به زبان ساده، **DI Container** یک فریم‌ورک ثبت است که وابستگی‌ها را ایجاد کرده و هنگام نیاز آنها را تزریق می‌کند.

---

## نوشتن DI خودمان 

ابتدا **Dependency Container، Interface، سرویس‌ها و Client** را ایجاد می‌کنیم و سپس **تست‌ها** را می‌نویسیم.

> توجه: در اکثر پروژه‌های واقعی، تست‌ها **بعد از نوشتن نرم‌افزار** نوشته می‌شوند، حتی اگر TDD استفاده نشود یا کدهای شخص ثالث بدون تست باشند.

---

### Dependency Container

یک **Class Library** جدید با نام **CH07\_DependencyInjection** بسازید و یک کلاس به نام **DependencyContainer** ایجاد کنید:

```csharp
public static readonly IDictionary<Type, Type> Types = new Dictionary<Type, Type>();
public static readonly IDictionary<Type, object> Instances = new Dictionary<Type, object>();

public static void Register<TContract, TImplementation>()
{
    Types[typeof(TContract)] = typeof(TImplementation);
}

public static void Register<TContract, TImplementation>(TImplementation instance)
{
    Instances[typeof(TContract)] = instance;
}
```

* **Types**: نگهدارنده نوع‌ها
* **Instances**: نگهدارنده نمونه‌ها
* **Register**: ثبت نوع‌ها یا نمونه‌ها

سپس برای **Resolve کردن نوع‌ها هنگام اجرا**:

```csharp
public static T Resolve<T>()
{
    return (T)Resolve(typeof(T));
}

public static object Resolve(Type contract)
{
    if (Instances.ContainsKey(contract))
    {
        return Instances[contract];
    }
    else
    {
        Type implementation = Types[contract];
        ConstructorInfo constructor = implementation.GetConstructors()[0];
        ParameterInfo[] constructorParameters = constructor.GetParameters();
        if (constructorParameters.Length == 0)
        {
            return Activator.CreateInstance(implementation);
        }
        List<object> parameters = new List<object>(constructorParameters.Length);
        foreach (ParameterInfo parameterInfo in constructorParameters)
        {
            parameters.Add(Resolve(parameterInfo.ParameterType));
        }
        return constructor.Invoke(parameters.ToArray());
    }
}
```

* اگر نمونه‌ای موجود باشد، بازگردانده می‌شود
* در غیر اینصورت نمونه جدید ساخته می‌شود و وابستگی‌ها با بازگشت فراخوانی می‌شوند

---

### Interface سرویس‌ها

```csharp
public interface IService
{
    string WhoAreYou();
}
```

* **ServiceOne**:

```csharp
public class ServiceOne : IService
{
    public string WhoAreYou()
    {
        return "CH07_DependencyInjection.ServiceOne()";
    }
}
```

* **ServiceTwo**:

```csharp
public class ServiceTwo : IService
{
    public string WhoAreYou()
    {
        return "CH07_DependencyInjection.ServiceTwo()";
    }
}
```

---

### Client برای DI

```csharp
private IService _service;

public Client() { }

public Client(IService service)
{
    _service = service;
}

public IService Service
{
    get { return _service; }
    set { _service = value; }
}

public string GetServiceName(IService service)
{
    return service.WhoAreYou();
}
```

* **Constructor Injection**: از طریق سازنده
* **Property Injection**: از طریق Property
* **Method Injection**: از طریق متد

---

### تست DI 

1⃣ ایجاد **Test Project** با نام **CH07\_DependencyInjection.Tests**
2⃣ Setup:

```csharp
[TestInitialize]
public void Setup()
{
    DependencyContainer.Register<ServiceOne, ServiceOne>();
    DependencyContainer.Register<ServiceTwo, ServiceTwo>();
}
```

3⃣ تست Resolve:

```csharp
[TestMethod]
public void DependencyContainerTestServiceOne()
{
    var serviceOne = DependencyContainer.Resolve<ServiceOne>();
    Assert.IsInstanceOfType(serviceOne, typeof(ServiceOne));
}

[TestMethod]
public void DependencyContainerTestServiceTwo()
{
    var serviceTwo = DependencyContainer.Resolve<ServiceTwo>();
    Assert.IsInstanceOfType(serviceTwo, typeof(ServiceTwo));
}
```

4⃣ تست Constructor Injection:

```csharp
[TestMethod]
public void ConstructorInjectionTestServiceOne()
{
    var serviceOne = DependencyContainer.Resolve<ServiceOne>();
    var client = new Client(serviceOne);
    Assert.IsInstanceOfType(client.Service, typeof(ServiceOne));
}

[TestMethod]
public void ConstructorInjectionTestServiceTwo()
{
    var serviceTwo = DependencyContainer.Resolve<ServiceTwo>();
    var client = new Client(serviceTwo);
    Assert.IsInstanceOfType(client.Service, typeof(ServiceTwo));
}
```

5⃣ تست Property Injection:

```csharp
[TestMethod]
public void PropertyInjectTestServiceOne()
{
    var serviceOne = DependencyContainer.Resolve<ServiceOne>();
    var client = new Client();
    client.Service = serviceOne;
    Assert.IsInstanceOfType(client.Service, typeof(ServiceOne));
}

[TestMethod]
public void PropertyInjectTestServiceTwo()
{
    var serviceTwo = DependencyContainer.Resolve<ServiceTwo>();
    var client = new Client();
    client.Service = serviceTwo;
    Assert.IsInstanceOfType(client.Service, typeof(ServiceTwo));
}
```

6⃣ تست Method Injection:

```csharp
[TestMethod]
public void MethodInjectionTestServiceOne()
{
    var serviceOne = DependencyContainer.Resolve<ServiceOne>();
    var client = new Client();
    Assert.AreEqual(client.GetServiceName(serviceOne), "CH07_DependencyInjection.ServiceOne()");
}

[TestMethod]
public void MethodInjectionTestServiceTwo()
{
    var serviceTwo = DependencyContainer.Resolve<ServiceTwo>();
    var client = new Client();
    Assert.AreEqual(client.GetServiceName(serviceTwo), "CH07_DependencyInjection.ServiceTwo()");
}
```

 با این روش، تمام **انواع تزریق وابستگی (Constructor, Property, Method)** تست و صحت عملکرد آن‌ها تأیید می‌شود.

### مدولار کردن سیستم 

یک سیستم از **یک یا چند ماژول (Module)** تشکیل شده است.
وقتی یک سیستم شامل **دو یا چند ماژول** باشد، باید **تعامل بین آن‌ها** را تست کنید تا مطمئن شوید که همه چیز **طبق انتظار با هم کار می‌کنند**.

بیایید سیستم یک **API** را در نظر بگیریم که در نمودار زیر نشان داده شده است:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/07/Table%207-13.jpeg)
</div>

همان‌طور که در نمودار قبلی مشاهده می‌کنید، ما یک **کلاینت (Client)** داریم که از طریق یک **API** به یک **ذخیره‌گاه داده (Data Store)** در ابر دسترسی پیدا می‌کند. کلاینت یک درخواست به **سرور HTTP** می‌فرستد. این درخواست ابتدا **احراز هویت (Authentication)** می‌شود. پس از تأیید هویت، درخواست **مجوز دسترسی (Authorization)** برای استفاده از API را دریافت می‌کند. داده‌های ارسال شده توسط کلاینت **deserialize** می‌شوند و سپس به **لایه کسب‌وکار (Business Layer)** منتقل می‌شوند. لایه کسب‌وکار سپس عملیات **خواندن، درج، به‌روزرسانی، یا حذف** را روی ذخیره‌گاه داده انجام می‌دهد. در نهایت، داده‌ها از پایگاه داده از طریق لایه کسب‌وکار، سپس از لایه **Serialization** و نهایتاً به کلاینت بازگردانده می‌شوند. 

همان‌طور که می‌بینید، ما چندین ماژول داریم که با یکدیگر تعامل دارند:

* **Security (احراز هویت و مجوز دسترسی)** که با **Serialization/Deserialization** تعامل دارد.
* **Serialization** که با **لایه کسب‌وکار** تعامل دارد و شامل تمام منطق کسب‌وکار است.
* **لایه کسب‌وکار (Business Logic)** که با **ذخیره‌گاه داده** تعامل دارد.

با نگاه به این سه نکته، می‌توانیم **تست‌های متعددی** برای **اتوماتیک کردن فرآیند E2E** بنویسیم. بسیاری از این تست‌ها در واقع **تست‌های واحد (Unit Tests)** هستند که در مجموعه تست‌های یکپارچه‌سازی ما گنجانده می‌شوند.

می‌توانیم موارد زیر را تست کنیم:

1. ورود صحیح (Correct login) 
2. ورود نادرست (Incorrect login) 
3. دسترسی مجاز (Authorized access) 
4. دسترسی غیرمجاز (Unauthorized access) 
5. سریال‌سازی داده‌ها (Serialization of data) 
6. غیرسریال‌سازی داده‌ها (Deserialization of data) 
7. منطق کسب‌وکار (Business logic) 
8. خواندن از پایگاه داده (Database read) 
9. به‌روزرسانی پایگاه داده (Database update) 
10. درج در پایگاه داده (Database insert) 
11. حذف از پایگاه داده (Database delete) 

همچنین می‌توانیم **تست‌های یکپارچه‌سازی (Integration Tests)** را بنویسیم:

* ارسال درخواست خواندن (Send a read request)
* ارسال درخواست درج (Send an insert request)
* ارسال درخواست ویرایش (Send an edit request)
* ارسال درخواست حذف (Send a delete request)

این چهار تست می‌توانند با **نام‌کاربری و رمز عبور صحیح** و داده‌های درست نوشته شوند و همچنین برای **نام‌کاربری یا رمز عبور اشتباه** و **داده‌های نادرست** نیز نوشته شوند.

بنابراین، می‌توانیم **تست یکپارچه‌سازی** را با استفاده از **تست‌های واحد برای هر ماژول** انجام دهیم و سپس تست‌هایی بنویسیم که **فقط تعامل بین دو ماژول را بررسی کنند**. همچنین می‌توانیم تست‌هایی بنویسیم که یک **عملیات کامل E2E** را اجرا کنند.

اما با وجود اینکه همه این‌ها را با کد تست می‌کنیم، **باید سیستم را به صورت دستی نیز بررسی کنیم** تا مطمئن شویم که همه چیز طبق انتظار عمل می‌کند.

وقتی همه این تست‌ها با موفقیت انجام شد، می‌توانیم با **اطمینان کامل کد را به محیط تولید (Production) منتشر کنیم**. 

---

### جمع‌بندی 

در این فصل ما با **E2E Testing** (که به آن **Integration Testing** نیز گفته می‌شود) آشنا شدیم. دیدیم که می‌توان **تست‌های خودکار** نوشت، اما اهمیت **تست دستی کل برنامه از دید کاربر نهایی** را نیز درک کردیم.

در مورد **Factories**، مثال کاربرد آن را در **اتصال به پایگاه داده** دیدیم. سناریویی را بررسی کردیم که در آن کاربران می‌توانند از **هر پایگاه داده‌ای که می‌خواهند** استفاده کنند. رشته اتصال (Connection String) بارگذاری می‌شود و بر اساس آن، **شیء اتصال به پایگاه داده مناسب ایجاد و بازگردانده می‌شود**. همچنین دیدیم چگونه می‌توان **Factories را برای هر پایگاه داده تست کرد**.

**Dependency Injection (DI)** این امکان را می‌دهد که یک کلاس با چند **پیاده‌سازی مختلف از یک Interface** کار کند. ما یک **Dependency Container** نوشتیم و این Interface را توسط دو کلاس پیاده‌سازی کردیم. سپس این پیاده‌سازی‌ها در Container ثبت و هنگام نیاز فراخوانی شدند. تست‌های واحد برای **Constructor Injection، Property Injection و Method Injection** نوشته شد.

در نهایت، با **مدولار کردن سیستم** آشنا شدیم. یک برنامه ساده ممکن است **تنها یک ماژول** داشته باشد، اما هر چه برنامه پیچیده‌تر شود، تعداد ماژول‌ها بیشتر می‌شود و احتمال بروز خطا افزایش می‌یابد. بنابراین، **تست تعامل بین ماژول‌ها بسیار مهم است**.

**تست‌های واحد** می‌توانند خود ماژول‌ها را بررسی کنند و **تست‌های یکپارچه‌سازی** تعامل بین ماژول‌ها را در یک **سناریوی کامل از ابتدا تا انتها** تست می‌کنند.

---

در فصل بعد، به **بهترین شیوه‌ها در کار با Threading و Concurrency** می‌پردازیم. اما قبل از آن، **سؤال‌هایی برای سنجش دانش شما از این فصل** داریم:

### سوالات 

1. E2E Testing چیست؟
2. یک اصطلاح دیگر برای E2E Testing چیست؟
3. در E2E Testing چه روش‌هایی باید به کار گرفته شوند؟
4. Factory چیست و چرا از آن استفاده می‌کنیم؟
5. DI چیست؟
6. چرا باید از Dependency Container استفاده کنیم؟

### مطالعه بیشتر 

کتاب **Dependency Injection in .NET** توسط Manning، شما را با DI در .NET آشنا می‌کند و سپس شما را با فریمورک‌های مختلف DI راهنمایی می‌کند.
