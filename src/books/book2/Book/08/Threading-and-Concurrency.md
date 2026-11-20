---
layout: layout.njk
title: Threading and Concurrency
---
# فصل هشتم:  **Threading و Concurrency**

یک **Process (فرآیند)** در اصل همان برنامه‌ای است که روی یک سیستم‌عامل در حال اجرا است. این فرآیند از چندین **Thread (رشته‌ی اجرایی)** ساخته می‌شود.
**Thread of execution (رشته‌ی اجرایی)** مجموعه‌ای از دستورهاست که توسط یک Process صادر می‌شود.

قابلیت اجرای بیش از یک Thread به‌صورت هم‌زمان، **Multi-Threading (چندریسمانی)** نامیده می‌شود.
در این فصل قرار است به موضوع **Multi-Threading** و **Concurrency (هم‌زمانی)** بپردازیم.

هر Thread برای اجرا، یک مقدار مشخصی زمان دریافت می‌کند و این اجرا توسط **Thread Scheduler (زمان‌بند رشته‌ها)** به صورت چرخشی مدیریت می‌شود. زمان‌بند، با استفاده از تکنیکی به نام **Time Slicing** زمان اجرا را بین Threadها تقسیم می‌کند و هر Thread را در زمان تعیین‌شده برای اجرا به CPU می‌فرستد. 

**Concurrency** یعنی توانایی اجرای بیش از یک Thread دقیقاً در یک لحظه. این موضوع تنها در کامپیوترهایی ممکن است که بیش از یک **Processor Core (هسته پردازنده)** داشته باشند. هرچه تعداد هسته‌ها بیشتر باشد، تعداد بیشتری از Threadها می‌توانند به‌طور هم‌زمان اجرا شوند. 

در طول بررسی **Concurrency** و **Threading** در این فصل، با مشکلاتی مثل **Blocking (انسداد)**، **Deadlock (بن‌بست)** و **Race Condition (شرایط رقابتی)** روبه‌رو می‌شویم. همچنین یاد می‌گیریم چطور با استفاده از اصول **Clean Code** این مشکلات را حل کنیم. 

---

###  مباحثی که در این فصل پوشش داده خواهند شد

1. درک **چرخه حیات Thread**
2. افزودن **پارامتر به Thread**
3. استفاده از **Thread Pool**
4. استفاده از **Mutual Exclusion Object** با Threadهای همگام (Synchronous)
5. کار با Threadهای موازی با استفاده از **Semaphore**
6. محدود کردن تعداد **پردازنده‌ها و Threadها** در **Thread Pool**
7. جلوگیری از **Deadlock**
8. جلوگیری از **Race Condition**
9. درک **Static Constructorها و Methodها**
10. آشنایی با **Mutability (قابلیت تغییرپذیری)**، **Immutability (تغییرناپذیری)** و **Thread Safety**
11. **Synchronized Method Dependencies**
12. استفاده از کلاس **Interlocked** برای تغییر وضعیت‌های ساده
13. توصیه‌های عمومی 

---

###  پس از پایان این فصل شما توانایی‌های زیر را کسب خواهید کرد

* درک و توضیح **چرخه حیات Thread**
* آشنایی با **Foreground Thread** و **Background Thread** و توانایی استفاده از آن‌ها
* مدیریت و کنترل سرعت اجرای Threadها (**Throttle**) و تعیین تعداد پردازنده‌های هم‌زمان با استفاده از **Thread Pool**
* درک اثر **Static Constructorها** و **Methodها** در ارتباط با **Multi-Threading** و **Concurrency**
* در نظر گرفتن تأثیر **Mutability** و **Immutability** بر **Thread Safety**
* درک علت بروز **Race Condition** و روش‌های جلوگیری از آن
* درک علت وقوع **Deadlock** و راه‌های پیشگیری از آن
* توانایی انجام تغییرات ساده در وضعیت‌ها با استفاده از کلاس **Interlocked**

---

###  پیش‌نیاز اجرای کدهای این فصل

برای اجرای کدهای این فصل به یک **.NET Framework Console Application** نیاز دارید.
مگر در مواقعی که به‌طور خاص ذکر شده باشد، تمام کدها درون کلاس **Program** قرار خواهند گرفت. 

###  درک **چرخه‌ی حیات Thread**

در زبان **C#**، هر **Thread** (رشته‌ی اجرایی) دارای یک **چرخه‌ی حیات** مشخص است.
این چرخه، مراحلی را نشان می‌دهد که یک Thread از زمان ایجاد شدن تا پایان کارش طی می‌کند.

چرخه‌ی حیات Thread به صورت زیر است: 

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-1.jpeg)
</div>

وقتی یک **Thread (رشته)** شروع به کار می‌کند، وارد حالت **Running (در حال اجرا)** می‌شود. در این حالت، رشته می‌تواند وارد حالت‌های **Wait (انتظار)**، **Sleep (خواب)**، **Join (پیوستن)**، **Stop (توقف)** یا **Suspended (معلق)** شود. همچنین رشته‌ها می‌توانند **Aborted (متوقف‌شده)** شوند. رشته‌های متوقف‌شده وارد حالت **Stop** می‌شوند. شما می‌توانید با استفاده از متدهای **Suspend()** و **Resume()** یک رشته را به ترتیب معلق کرده و دوباره ادامه دهید.

یک رشته زمانی وارد حالت **Wait** می‌شود که متد **Monitor.Wait(object obj)** فراخوانی شود. سپس این رشته زمانی ادامه پیدا می‌کند که متد **Monitor.Pulse(object obj)** فراخوانی شود.
رشته‌ها با فراخوانی متد **Thread.Sleep(int millisecondsTimeout)** به حالت خواب می‌روند. پس از گذشت زمان مشخص‌شده، رشته دوباره به حالت اجرا بازمی‌گردد.

متد **Thread.Join()** باعث می‌شود یک رشته وارد حالت انتظار شود. رشته‌ای که Join شده است در حالت انتظار باقی می‌ماند تا تمام رشته‌های وابسته به آن اجرا شوند و سپس به حالت اجرا بازمی‌گردد. با این حال، اگر هر یک از رشته‌های وابسته متوقف شوند (**Aborted**)، این رشته هم متوقف شده و وارد حالت **Stop** می‌شود.
رشته‌هایی که کامل اجرا شده‌اند یا متوقف شده‌اند، دیگر قابل شروع مجدد نیستند.

رشته‌ها می‌توانند در **Foreground (پیش‌زمینه)** یا **Background (پس‌زمینه)** اجرا شوند. بیایید با رشته‌های پیش‌زمینه شروع کنیم:

###  رشته‌های پیش‌زمینه (Foreground Threads)

به‌صورت پیش‌فرض، رشته‌ها در پیش‌زمینه اجرا می‌شوند. یک **Process (فرآیند)** زمانی که حداقل یک رشته پیش‌زمینه در حال اجرا باشد، همچنان فعال باقی می‌ماند. حتی اگر متد **Main()** تمام شود اما هنوز یک رشته پیش‌زمینه در حال اجرا باشد، فرآیند برنامه تا پایان کار آن رشته فعال خواهد ماند. ایجاد یک رشته پیش‌زمینه بسیار ساده است، همان‌طور که در کد زیر می‌بینید:

```csharp
var foregroundThread = new Thread(SomeMethodName);
foregroundThread.Start();
```

###  رشته‌های پس‌زمینه (Background Threads)

ایجاد رشته پس‌زمینه مشابه رشته‌های پیش‌زمینه است، با این تفاوت که شما باید به‌صورت صریح مشخص کنید که رشته در پس‌زمینه اجرا شود، همان‌طور که در مثال زیر نشان داده شده است:

```csharp
var backgroundThread = new Thread(SomeMethodName);
backgroundThread.IsBackground = true;
backgroundThread.Start();
```

رشته‌های پس‌زمینه برای انجام کارهای جانبی و حفظ **واکنش‌پذیری رابط کاربری** استفاده می‌شوند. زمانی که فرآیند اصلی پایان یابد، هر رشته پس‌زمینه‌ای که در حال اجرا باشد نیز خاتمه پیدا می‌کند. اما حتی اگر فرآیند اصلی پایان یابد، رشته‌های پیش‌زمینه‌ای که در حال اجرا هستند، تا زمان کامل شدنشان اجرا خواهند شد.

---

###  افزودن پارامتر به رشته‌ها (Adding Thread Parameters)

روش‌هایی که در رشته‌ها اجرا می‌شوند معمولاً پارامتر دارند. بنابراین هنگام اجرای یک متد درون یک رشته، باید بدانیم چگونه پارامترهای آن متد را به رشته ارسال کنیم.

فرض کنید متد زیر را داریم که دو عدد صحیح (**int**) را با هم جمع کرده و نتیجه را برمی‌گرداند:

```csharp
private static int Add(int a, int b)
{
    return a + b;
}
```

همان‌طور که می‌بینید، این متد ساده است. دو پارامتر به نام‌های **a** و **b** دارد. این دو پارامتر باید به رشته ارسال شوند تا متد **Add()** به‌درستی اجرا شود.

در ادامه یک متد نمونه اضافه می‌کنیم که همین کار را انجام می‌دهد:

```csharp
private static void ThreadParametersExample()
{
    int result = 0;
    Thread thread = new Thread(() => { result = Add(1, 2); });
    thread.Start();
    thread.Join();
    Message($"The addition of 1 plus 2 is {result}.");
}
```

در این متد، ابتدا یک متغیر **int** با مقدار اولیه 0 تعریف می‌کنیم. سپس یک رشته جدید ایجاد می‌کنیم که متد **Add()** را با مقادیر **1** و **2** فراخوانی کرده و نتیجه را در متغیر ذخیره می‌کند. رشته را اجرا می‌کنیم و با متد **Join()** منتظر می‌مانیم تا اجرای رشته تمام شود. در نهایت، نتیجه را در پنجره **Console** چاپ می‌کنیم.

برای این کار، متد **Message()** را اضافه می‌کنیم:

```csharp
internal static void Message(string message)
{
    Console.WriteLine(message);
}
```

متد **Message()** یک رشته متنی را دریافت کرده و در پنجره کنسول نمایش می‌دهد. حالا کافی است متد **Main()** را به‌روزرسانی کنیم:

```csharp
static void Main(string[] args)
{
    ThreadParametersExample();
    Message("=== Press any Key to exit ===");
    Console.ReadKey();
}
```

در متد **Main()**، ابتدا متد نمونه خود را فراخوانی می‌کنیم و سپس منتظر می‌مانیم تا کاربر کلیدی را فشار دهد تا برنامه بسته شود. خروجی که باید مشاهده کنید به‌صورت زیر خواهد بود: 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-2.jpeg)
</div>

همان‌طور که مشاهده کردید، اعداد **1** و **2** پارامترهای متدی بودند که به متد جمع ارسال شدند و مقدار **3** خروجی‌ای بود که رشته برگرداند.

---

##  استفاده از **Thread Pool (استخر رشته)**

یک **Thread Pool** باعث بهبود عملکرد برنامه می‌شود، چون در هنگام شروع برنامه مجموعه‌ای از رشته‌ها ایجاد می‌کند. هر زمان یک رشته نیاز باشد، یکی از رشته‌های موجود در استخر برای انجام یک کار اختصاص داده می‌شود. پس از انجام آن کار، رشته دوباره به استخر برگردانده شده و قابل استفاده مجدد خواهد بود.

از آنجایی که ایجاد رشته در **.NET** هزینه‌بر است، می‌توان با استفاده از **Thread Pool** عملکرد را بهبود بخشید. هر فرآیند دارای تعداد مشخصی رشته است که براساس منابع سیستم (مثل حافظه و CPU) تعیین می‌شود. البته می‌توان تعداد رشته‌های استفاده‌شده در استخر را کم یا زیاد کرد، اما معمولاً بهتر است این مدیریت را به خود استخر بسپاریم و به‌صورت دستی تنظیمات انجام ندهیم.

روش‌های مختلف برای ایجاد یک **Thread Pool** عبارت‌اند از:

* استفاده از **Task Parallel Library (TPL)** (در **.NET Framework 4.0** و بالاتر)
* استفاده از **ThreadPool.QueueUserWorkItem()**
* استفاده از **Asynchronous Delegates (نماینده‌های ناهمزمان)**
* استفاده از **BackgroundWorker**

> **نکته مهم:** به‌طور کلی، **Thread Pool** معمولاً برای برنامه‌های **Server-side (سمت سرور)** استفاده می‌شود. برای برنامه‌های **Client-side (سمت کاربر)**، بهتر است از رشته‌های **Foreground** و **Background** بسته به نیاز استفاده کنید.

در این کتاب، ما فقط به **TPL** و متد **QueueUserWorkItem()** می‌پردازیم. برای یادگیری روش‌های دیگر می‌توانید به لینک زیر مراجعه کنید:
[http://www.albahari.com/threading/](http://www.albahari.com/threading/)

---

##  کتابخانه **Task Parallel Library (TPL)**

در C#، یک عملیات ناهمزمان توسط یک **Task (وظیفه)** نمایش داده می‌شود. هر **Task** در C# توسط کلاس **Task** در **TPL** نمایش داده می‌شود. همان‌طور که از نامش پیداست، **Task Parallelism** امکان اجرای هم‌زمان چند **Task** را فراهم می‌کند که در بخش‌های بعدی درباره آن یاد می‌گیریم.

اولین متدی که از کلاس **Parallel** بررسی می‌کنیم، متد **Invoke()** است.

---

###  **Parallel.Invoke()**

در اولین مثال، سه متد مختلف را با استفاده از **Parallel.Invoke()** فراخوانی می‌کنیم. سه متد زیر را اضافه کنید:

```csharp
private static void MethodOne()
{
    Message($"MethodOne Executed: Thread Id({Thread.CurrentThread.ManagedThreadId})");
}

private static void MethodTwo()
{
    Message($"MethodTwo Executed: Thread Id({Thread.CurrentThread.ManagedThreadId})");
}

private static void MethodThree()
{
    Message($"MethodThree Executed: Thread Id({Thread.CurrentThread.ManagedThreadId})");
}
```

همان‌طور که می‌بینید، این سه متد تقریباً مشابه هستند و تنها نام‌ها و پیام چاپ‌شده در کنسول متفاوت است که توسط متد **Message()** (که قبلاً نوشتیم) نمایش داده می‌شود.

حالا متد **UsingTaskParallelLibrary()** را اضافه می‌کنیم تا این سه متد را به‌صورت موازی اجرا کنیم:

```csharp
private static void UsingTaskParallelLibrary()
{
    Message($"UsingTaskParallelLibrary Started: Thread Id = ({Thread.CurrentThread.ManagedThreadId})");
    Parallel.Invoke(MethodOne, MethodTwo, MethodThree);
    Message("UsingTaskParallelLibrary Completed.");
}
```

در این متد، ابتدا پیامی در پنجره **Console** چاپ می‌کنیم تا نشان دهد شروع متد آغاز شده است. سپس متدهای **MethodOne**، **MethodTwo** و **MethodThree** را به‌صورت موازی اجرا می‌کنیم. پس از آن، پیامی در **Console** چاپ می‌کنیم تا مشخص شود متد به انتهای اجرای خود رسیده است و سپس منتظر می‌مانیم تا کاربر کلیدی را فشار دهد و در نهایت متد خاتمه پیدا کند.

کد را اجرا کنید و باید خروجی زیر را مشاهده کنید: 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-3.jpeg)
</div>

در تصویر قبلی، مشاهده می‌کنید که **رشته شماره 1** دوباره استفاده شده است. حالا بیایید به سراغ حلقه **Parallel.For()** برویم.

---

##  **Parallel.For()**

در مثال بعدی مربوط به **TPL**، به یک حلقه ساده **Parallel.For()** نگاه می‌کنیم. متد زیر را به کلاس **Program** در یک برنامه **Console** جدید با **.NET Framework** اضافه کنید:

```csharp
private static void Method()
{
    Message($"Method Executed: Thread Id({Thread.CurrentThread.ManagedThreadId})");
}
```

این متد تنها یک رشته متنی را در پنجره **Console** چاپ می‌کند.

حالا متدی ایجاد می‌کنیم که حلقه **Parallel.For()** را اجرا کند:

```csharp
private static void UsingTaskParallelLibraryFor()
{
    Message($"UsingTaskParallelLibraryFor Started: Thread Id = ({Thread.CurrentThread.ManagedThreadId})");
    Parallel.For(0, 1000, X => Method());
    Message("UsingTaskParallelLibraryFor Completed.");
}
```

در این متد، از عدد **0 تا 1000** حلقه می‌زنیم و در هر تکرار، متد **Method()** را فراخوانی می‌کنیم. در طول اجرای این حلقه، خواهید دید که رشته‌ها در فراخوانی‌های مختلف دوباره استفاده می‌شوند، همان‌طور که در تصویر زیر مشخص است: 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-4.jpeg)
</div>

حالا می‌خواهیم به سراغ استفاده از متد **ThreadPool.QueueUserWorkItem()** برویم.

---

##  **ThreadPool.QueueUserWorkItem()**

متد **ThreadPool.QueueUserWorkItem()** یک متد **WaitCallback** را دریافت کرده و آن را برای اجرا در صف قرار می‌دهد.
**WaitCallback** یک **Delegate (نماینده)** است که نشان‌دهنده متدی است که باید توسط یک رشته در **Thread Pool** اجرا شود. وقتی یک رشته آزاد شود، این متد اجرا خواهد شد.

بیایید یک مثال ساده اضافه کنیم. ابتدا متد زیر را تعریف می‌کنیم:

```csharp
private static void WaitCallbackMethod(Object _)
{
    Message("Hello from WaitCallBackMethod!");
}
```

این متد یک پارامتر از نوع **Object** دریافت می‌کند، اما چون از آن استفاده نمی‌کنیم، از متغیر **discard (\_)** استفاده شده است. سپس پیامی در پنجره **Console** چاپ می‌شود.

حالا کد فراخوانی این متد را اضافه می‌کنیم:

```csharp
private static void ThreadPoolQueueUserWorkItem()
{
    ThreadPool.QueueUserWorkItem(WaitCallbackMethod);
    Message("Main thread does some work, then sleeps.");
    Thread.Sleep(1000);
    Message("Main thread exits.");
}
```

همان‌طور که می‌بینید، از کلاس **ThreadPool** برای قرار دادن **WaitCallbackMethod()** در صف **Thread Pool** استفاده کردیم. سپس رشته اصلی (Main thread) کمی کار انجام داده و به خواب می‌رود. در این زمان، یک رشته آزاد از استخر رشته‌ها انتخاب شده و متد **WaitCallbackMethod()** اجرا می‌شود. سپس رشته به استخر برگردانده شده و قابل استفاده مجدد خواهد بود. اجرای برنامه به رشته اصلی بازمی‌گردد و در نهایت برنامه خاتمه پیدا می‌کند.

---

##  استفاده از **Mutex** با رشته‌های همزمان

در بخش بعدی، به سراغ **Mutex (شیء قفل‌کننده)** می‌رویم.

در C#، یک **Mutex** یک شیء قفل‌کننده رشته است که می‌تواند بین چندین فرآیند کار کند. تنها فرآیندی که درخواست یا آزادسازی یک منبع را دارد، می‌تواند **Mutex** را تغییر دهد. زمانی که یک **Mutex** قفل شود، بقیه فرآیندها باید در صف منتظر بمانند. وقتی قفل آزاد شد، بقیه می‌توانند به منبع دسترسی داشته باشند. چندین رشته می‌توانند از یک **Mutex** استفاده کنند، اما فقط به‌صورت **همزمان‌سازی شده (Synchronous)**.

### مزایای استفاده از Mutex

* **Mutex** یک قفل ساده است که قبل از ورود به بخش حساس از کد گرفته می‌شود و هنگام خروج از آن آزاد می‌شود.
* چون در هر لحظه تنها یک رشته وارد بخش حساس می‌شود، داده‌ها در حالت سازگار باقی می‌مانند و **Race Condition (تداخل داده‌ها)** رخ نمی‌دهد.

### معایب استفاده از Mutex

* **Starvation (گرسنگی رشته)**: اگر رشته‌ای قفل را در اختیار داشته باشد و به خواب برود یا متوقف شود، رشته‌های دیگر نمی‌توانند ادامه دهند.
* وقتی یک **Mutex** قفل شده است، فقط همان رشته‌ای که قفل را گرفته می‌تواند آن را آزاد کند. هیچ رشته دیگری نمی‌تواند قفل را بگیرد یا آزاد کند.
* در هر لحظه فقط یک رشته اجازه ورود به بخش حساس را دارد. این موضوع می‌تواند باعث هدر رفت زمان **CPU** شود، زیرا پیاده‌سازی Mutex ممکن است به حالت **Busy Waiting (انتظار فعال)** منجر شود.

---

###  برنامه نمونه برای استفاده از Mutex

ابتدا در بالای کلاس، متغیر زیر را اضافه کنید:

```csharp
private static readonly Mutex _mutex = new Mutex();
```

در اینجا، یک شیء ابتدایی به نام **\_mutex** تعریف کرده‌ایم که برای همگام‌سازی بین فرآیندها استفاده خواهد شد.

حالا متدی برای نمایش همگام‌سازی رشته‌ها با استفاده از Mutex اضافه می‌کنیم:

```csharp
private static void ThreadSynchronisationUsingMutex()
{
    try
    {
        _mutex.WaitOne();
        Message($"Domain Entered By: {Thread.CurrentThread.Name}");
        Thread.Sleep(500);
        Message($"Domain Left By: {Thread.CurrentThread.Name}");
    }
    finally
    {
        _mutex.ReleaseMutex();
    }
}
```

در این متد، رشته جاری تا زمانی که **Wait Handle** (دستگیره انتظار) سیگنال دریافت کند، بلوکه می‌شود. وقتی سیگنال داده شود، رشته بعدی می‌تواند وارد شود. پس از پایان کار، سایر رشته‌ها از حالت انتظار آزاد شده و امکان دسترسی به Mutex را خواهند داشت.

متد بعدی برای اجرای نمونه Mutex:

```csharp
private static void MutexExample()
{
    for (var i = 1; i <= 10; i++)
    {
        var thread = new Thread(ThreadSynchronisationUsingMutex)
        {
            Name = $"Mutex Example Thread: {i}"
        };
        thread.Start();
    }
}
```

در این متد، 10 رشته ایجاد کرده و آن‌ها را شروع می‌کنیم. هر رشته متد **ThreadSynchronisationUsingMutex()** را اجرا می‌کند.

در نهایت، متد **Main()** را به‌روزرسانی کنید:

```csharp
static void Main(string[] args)
{
    SemaphoreExample();
    Console.ReadKey();
}
```

متد **Main()** نمونه‌ی استفاده از **Mutex** ما را اجرا می‌کند. خروجی باید مشابه تصویر زیر باشد: 

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-5.jpeg)
</div>

مثالی که اجرا کردیم ممکن است هر بار اعداد مختلفی برای رشته‌ها نشان دهد. حتی اگر اعداد مشابه باشند، ممکن است ترتیب نمایش آن‌ها متفاوت باشد.

حالا که با **Mutex** آشنا شدیم، بیایید به **Semaphore (سِمافور)** بپردازیم.

---

##  کار با رشته‌های موازی با استفاده از **Semaphore**

در برنامه‌های چندرشته‌ای (**Multi-threaded Applications**)، یک عدد غیرمنفی به نام **Semaphore** بین رشته‌ها به اشتراک گذاشته می‌شود. این مقدار می‌تواند **۱** یا **۲** باشد که در همگام‌سازی به‌ترتیب به معنی **انتظار (Wait)** و **سیگنال (Signal)** است.
می‌توان یک Semaphore را به تعدادی **Buffer (حافظه موقت)** مرتبط کرد تا فرآیندهای مختلف به‌صورت هم‌زمان روی هرکدام کار کنند.

به‌طور خلاصه، **Semaphore** یک مکانیزم سیگنال‌دهی است که از انواع **Integer** و **Binary** بوده و با عملیات **Wait** و **Signal** قابل تغییر است. اگر منابع آزاد موجود نباشند، فرآیندهایی که نیاز به منبع دارند باید عملیات **Wait** را اجرا کنند تا زمانی که مقدار Semaphore بزرگ‌تر از صفر شود. Semaphore می‌تواند چندین رشته برنامه را مدیریت کند و هر شیء می‌تواند آن را تغییر دهد، منبع بگیرد یا آزاد کند.

### مزایای Semaphore

* چندین رشته می‌توانند به‌طور هم‌زمان به بخش حساس از کد دسترسی داشته باشند.
* Semaphore در سطح هسته (**Kernel**) اجرا می‌شود و وابسته به ماشین نیست.
* بخش حساس کد در برابر چندین فرآیند محافظت می‌شود و برخلاف Mutex، Semaphore زمان پردازشی و منابع را هدر نمی‌دهد.

### معایب Semaphore

* **Priority Inversion (وارونگی اولویت)**: زمانی رخ می‌دهد که یک رشته با اولویت بالا مجبور باشد منتظر آزاد شدن Semaphore توسط یک رشته با اولویت پایین بماند.
* اگر رشته‌های با اولویت متوسط جلوی تکمیل شدن رشته‌های با اولویت پایین را بگیرند، مشکل **Unbounded Priority Inversion** پیش می‌آید که در آن نمی‌توان تأخیر رشته‌های اولویت بالا را پیش‌بینی کرد.
* سیستم‌عامل باید همه عملیات **Wait** و **Signal** را پیگیری کند که پیچیدگی ایجاد می‌کند.
* استفاده از Semaphore قراردادی است و اجباری نیست، اما اگر عملیات **Wait** و **Signal** را در ترتیب درست انجام ندهید، خطر **Deadlock (قفل بن‌بست)** وجود دارد.
* در سیستم‌های بزرگ، ممکن است **Modularity (ماژولار بودن)** کاهش یابد و کد در معرض خطاهای برنامه‌نویسی و نقض قفل‌ها قرار گیرد.

---

###  برنامه نمونه با استفاده از Semaphore

ابتدا یک متغیر Semaphore تعریف می‌کنیم:

```csharp
private static readonly Semaphore _semaphore = new Semaphore(2, 4);
```

پارامتر اول مشخص می‌کند چند درخواست می‌توانند به‌طور هم‌زمان پذیرفته شوند.
پارامتر دوم حداکثر تعداد درخواست‌هایی را که می‌توان هم‌زمان پذیرفت مشخص می‌کند.

حالا متد **StartSemaphore()** را اضافه می‌کنیم:

```csharp
private static void StartSemaphore(object id)
{
    Console.WriteLine($"Object {id} wants semaphore access.");
    try
    {
        _semaphore.WaitOne();
        Console.WriteLine($"Object {id} gained semaphore access.");
        Thread.Sleep(1000);
        Console.WriteLine($"Object {id} has exited semaphore.");
    }
    finally
    {
        _semaphore.Release();
    }
}
```

در این متد، رشته جاری تا زمانی که **Wait Handle** سیگنال دریافت کند بلوکه می‌شود. سپس رشته کار خود را انجام می‌دهد و در پایان Semaphore آزاد می‌شود و مقدارش به حالت قبلی برمی‌گردد.

حالا متد **SemaphoreExample()** را اضافه کنید:

```csharp
private static void SemaphoreExample()
{
    for (int i = 1; i <= 10; i++)
    {
        Thread t = new Thread(StartSemaphore);
        t.Start(i);
    }
}
```

این مثال ۱۰ رشته ایجاد می‌کند که متد **StartSemaphore()** را اجرا می‌کنند.

در نهایت، متد **Main()** را به‌روزرسانی کنید:

```csharp
static void Main(string[] args)
{
    SemaphoreExample();
    Console.ReadKey();
}
```

متد **Main()** متد **SemaphoreExample()** را فراخوانی کرده و سپس منتظر می‌ماند تا کاربر کلیدی را فشار دهد تا برنامه خاتمه پیدا کند. خروجی باید مشابه تصویر زیر باشد: 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-6.jpeg)
</div>

بیایید به نحوه محدود کردن تعداد **پردازنده‌ها و رشته‌ها در Thread Pool** بپردازیم.

---

##  محدود کردن تعداد پردازنده‌ها و رشته‌ها در **Thread Pool**

گاهی اوقات نیاز است که تعداد پردازنده‌ها و رشته‌های مورد استفاده توسط برنامه خود را محدود کنید.

### محدود کردن پردازنده‌ها

برای کاهش تعداد پردازنده‌های مورد استفاده، ابتدا پردازش جاری را دریافت کرده و مقدار **ProcessorAffinity** آن را تنظیم می‌کنیم.
مثلاً فرض کنید یک کامپیوتر چهار هسته‌ای داریم و می‌خواهیم فقط از دو هسته اول استفاده کنیم. مقدار باینری دو هسته اول برابر است با `11` که در حالت عدد صحیح برابر با **3** است.

متدی در یک برنامه جدید **.NET Framework Console** ایجاد می‌کنیم و نام آن را **AssignCores()** می‌گذاریم:

```csharp
private static void AssignCores(int cores)
{
    Process.GetCurrentProcess().ProcessorAffinity = new IntPtr(cores);
}
```

در این متد، یک عدد صحیح به عنوان ورودی می‌دهیم. این عدد توسط **.NET Framework** به مقدار باینری تبدیل می‌شود و پردازنده‌هایی که مقدار ۱ دارند استفاده می‌شوند، در حالی که پردازنده‌هایی که مقدارشان ۰ است، استفاده نخواهند شد.
مثال‌ها:

* `0110 (6)` → استفاده از هسته‌های 2 و 3
* `1100 (3)` → استفاده از هسته‌های 1 و 2
* `0011 (12)` → استفاده از هسته‌های 3 و 4

> اگر نیاز به یادآوری باینری دارید، می‌توانید به [این لینک](https://www.computerhope.com/jargon/b/binary.htm) مراجعه کنید.

---

### تنظیم حداکثر تعداد رشته‌ها

برای تنظیم حداکثر تعداد رشته‌ها، متد **SetMaxThreads()** از کلاس **ThreadPool** را فراخوانی می‌کنیم. این متد دو پارامتر می‌گیرد:

1. حداکثر تعداد **Worker Threads** در Thread Pool
2. حداکثر تعداد **Asynchronous I/O Threads** در Thread Pool

متد زیر را برای تنظیم حداکثر تعداد رشته‌ها اضافه می‌کنیم:

```csharp
private static void SetMaxThreads(int workerThreads, int asyncIoThreads)
{
    ThreadPool.SetMaxThreads(workerThreads, asyncIoThreads);
}
```

همان‌طور که می‌بینید، تنظیم حداکثر تعداد رشته‌ها و پردازنده‌ها بسیار ساده است. در اغلب مواقع نیازی به انجام این کار در برنامه‌ها نیست، مگر اینکه برنامه شما با مشکلات عملکرد مواجه شود. اگر برنامه مشکلی در عملکرد ندارد، بهتر است تعداد رشته‌ها و پردازنده‌ها را تنظیم نکنید.

---

##  جلوگیری از **Deadlocks (قفل بن‌بست)**

یک **Deadlock** زمانی رخ می‌دهد که دو یا چند رشته در حال اجرا هستند و منتظر یکدیگر برای تکمیل هستند. این مشکل در برنامه‌ها باعث **گیر کردن برنامه** می‌شود و برای کاربر نهایی می‌تواند بسیار خطرناک باشد، چرا که ممکن است داده‌ها از بین بروند یا خراب شوند.

### مثال واقعی

فرض کنید یک تراکنش بانکی بزرگ داریم که باید **£1 میلیون** از حساب بانکی یک مشتری برای پرداخت مالیات HMRC برداشت شود.

* پول از حساب کسب‌وکار مشتری برداشت می‌شود
* قبل از اینکه پول به حساب HMRC واریز شود، یک **Deadlock** رخ می‌دهد
* هیچ گزینه بازیابی وجود ندارد و برنامه باید خاتمه یابد و دوباره اجرا شود

نتیجه: حساب بانکی کسب‌وکار **£1 میلیون** کاهش می‌یابد اما مالیات پرداخت نشده است و مشتری هنوز مسئول پرداخت آن است. این مثال اهمیت جلوگیری از رخ دادن **Deadlocks** را نشان می‌دهد.

برای ساده‌تر کردن موضوع، ما با **دو رشته** کار خواهیم کرد، همان‌طور که در نمودار زیر نشان داده شده است:

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-7.jpeg)
</div>

ما رشته‌هایمان را **Thread 1** و **Thread 2** و منابعمان را **Resource 1** و **Resource 2** می‌نامیم.

* **Thread 1** یک **Lock** روی **Resource 1** می‌گیرد.
* **Thread 2** یک **Lock** روی **Resource 2** می‌گیرد.

حالا:

* **Thread 1** نیاز دارد به **Resource 2** دسترسی پیدا کند، اما باید منتظر بماند چون **Thread 2** آن را قفل کرده است.
* **Thread 2** نیاز دارد به **Resource 1** دسترسی پیدا کند، اما باید منتظر بماند چون **Thread 1** آن را قفل کرده است.

نتیجه این است که هم **Thread 1** و هم **Thread 2** در حالت **Wait** قرار می‌گیرند. از آنجا که هیچ‌یک از رشته‌ها نمی‌توانند ادامه دهند تا دیگری منبعش را آزاد کند، هر دو رشته وارد وضعیت **Deadlock (قفل بن‌بست)** می‌شوند. زمانی که یک برنامه کامپیوتری در حالت **Deadlock** قرار دارد، برنامه گیر می‌کند و مجبور می‌شوید آن را خاتمه دهید.

یک مثال کد برای **Deadlock** بهترین راه برای توضیح این موضوع است. در بخش بعدی، یک مثال عملی از **Deadlock** می‌نویسیم.

---

##  کدنویسی مثال Deadlock

بهترین روش برای فهم این موضوع، یک مثال عملی است. ما دو متد خواهیم نوشت که هر کدام دارای دو **Lock** مختلف هستند. این متدها اشیایی را قفل می‌کنند که متد دیگر به آن نیاز دارد. چون هر رشته منابعی را که رشته دیگر نیاز دارد قفل می‌کند، هر دو رشته وارد حالت **Deadlock** می‌شوند. بعد از اینکه مثال ما کار کرد، آن را اصلاح خواهیم کرد تا از وضعیت Deadlock بازیابی شود و ادامه دهد.

ابتدا یک برنامه جدید **.NET Framework Console** ایجاد کنید و نام آن را **CH08\_Deadlocks** بگذارید. نیاز به دو شیء به عنوان متغیرهای عضو داریم:

```csharp
static object _object1 = new object();
static object _object2 = new object();
```

این اشیاء به عنوان **Lock Objects** استفاده خواهند شد. ما دو رشته خواهیم داشت و هر رشته متد مخصوص به خود را اجرا می‌کند.

---

### متد Thread1Method()

```csharp
private static void Thread1Method()
{
    Console.WriteLine("Thread1Method: Thread1Method Entered.");
    lock (_object1)
    {
        Console.WriteLine("Thread1Method: Entered _object1 lock. Sleeping...");
        Thread.Sleep(1000);
        Console.WriteLine("Thread1Method: Woke from sleep");
        lock (_object2)
        {
            Console.WriteLine("Thread1Method: Entered _object2 lock.");
        }
        Console.WriteLine("Thread1Method: Exited _object2 lock.");
    }
    Console.WriteLine("Thread1Method: Exited _object1 lock.");
}
```

* این متد ابتدا یک **Lock** روی **\_object1** می‌گیرد.
* سپس به مدت ۱ ثانیه **Sleep** می‌کند.
* بعد از بیدار شدن، **Lock** روی **\_object2** می‌گیرد.
* در نهایت هر دو Lock را آزاد کرده و متد خاتمه می‌یابد.

---

### متد Thread2Method()

```csharp
private static void Thread2Method()
{
    Console.WriteLine("Thread2Method: Thread1Method Entered.");
    lock (_object2)
    {
        Console.WriteLine("Thread2Method: Entered _object2 lock. Sleeping...");
        Thread.Sleep(1000);
        Console.WriteLine("Thread2Method: Woke from sleep.");
        lock (_object1)
        {
            Console.WriteLine("Thread2Method: Entered _object1 lock.");
        }
        Console.WriteLine("Thread2Method: Exited _object1 lock.");
    }
    Console.WriteLine("Thread2Method: Exited _object2 lock.");
}
```

* این متد ابتدا یک **Lock** روی **\_object2** می‌گیرد.
* سپس به مدت ۱ ثانیه **Sleep** می‌کند.
* بعد از بیدار شدن، **Lock** روی **\_object1** می‌گیرد.
* در نهایت هر دو Lock را آزاد کرده و متد خاتمه می‌یابد.

---

### متد DeadlockNoRecovery()

```csharp
private static void DeadlockNoRecovery()
{
    Thread thread1 = new Thread((ThreadStart)Thread1Method);
    Thread thread2 = new Thread((ThreadStart)Thread2Method);
    thread1.Start();
    thread2.Start();
    Console.WriteLine("Press any key to exit.");
    Console.ReadKey();
}
```

در این متد:

* دو رشته ایجاد می‌کنیم.
* هر رشته متد متفاوتی را اجرا می‌کند.
* هر دو رشته شروع می‌شوند.
* برنامه تا زمانی که کاربر کلیدی را فشار دهد، متوقف می‌شود.

---

### متد Main()

```csharp
static void Main()
{
    DeadlockNoRecovery();
}
```

---

هنگام اجرای برنامه، باید خروجی مشابه تصویر زیر را مشاهده کنید: 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-8.jpeg)
</div>

همان‌طور که می‌بینید، چون **Thread1** روی **\_object1** قفل دارد، **Thread2** نمی‌تواند آن را قفل کند. همچنین، چون **Thread2** روی **\_object2** قفل دارد، **Thread1** نمی‌تواند آن را قفل کند. بنابراین هر دو رشته وارد **Deadlock** می‌شوند و برنامه گیر می‌کند.

حالا کدی می‌نویسیم که نشان دهد چگونه می‌توان از وقوع این **Deadlock** جلوگیری کرد. ما از متد **Monitor.TryEnter()** استفاده می‌کنیم تا تلاش کنیم در مدت زمان مشخصی **Lock** بگیریم. سپس در صورت موفقیت، با **Monitor.Exit()** قفل را آزاد می‌کنیم.

---

### متد DeadlockWithRecovery()

```csharp
private static void DeadlockWithRecovery()
{
    Thread thread4 = new Thread((ThreadStart)Thread4Method);
    Thread thread5 = new Thread((ThreadStart)Thread5Method);
    thread4.Start();
    thread5.Start();
    Console.WriteLine("Press any key to exit.");
    Console.ReadKey();
}
```

* این متد دو **Foreground Thread** ایجاد می‌کند.
* سپس رشته‌ها را شروع کرده، پیامی روی کنسول چاپ می‌کند و منتظر می‌ماند تا کاربر کلیدی را فشار دهد.

---

### متد Thread4Method()

```csharp
private static void Thread4Method()
{
    Console.WriteLine("Thread4Method: Entered _object1 lock. Sleeping...");
    Thread.Sleep(1000);
    Console.WriteLine("Thread4Method: Woke from sleep");
    
    if (!Monitor.TryEnter(_object1))
    {
        Console.WriteLine("Thread4Method: Failed to lock _object1.");
        return;
    }
    try
    {
        if (!Monitor.TryEnter(_object2))
        {
            Console.WriteLine("Thread4Method: Failed to lock _object2.");
            return;
        }
        try
        {
            Console.WriteLine("Thread4Method: Doing work with _object2.");
        }
        finally
        {
            Monitor.Exit(_object2);
            Console.WriteLine("Thread4Method: Released _object2 lock.");
        }
    }
    finally
    {
        Monitor.Exit(_object1);
        Console.WriteLine("Thread4Method: Released _object1 lock.");
    }
}
```

* این متد ۱ ثانیه **Sleep** می‌کند.
* سپس تلاش می‌کند **Lock** روی **\_object1** بگیرد. اگر موفق نشود، متد باز می‌گردد.
* اگر **\_object1** قفل شود، تلاش می‌کند **Lock** روی **\_object2** بگیرد.
* اگر موفق نشود، متد باز می‌گردد.
* اگر قفل شد، کار لازم روی **\_object2** انجام می‌شود.
* سپس **\_object2** آزاد می‌شود و در نهایت **\_object1** نیز آزاد می‌شود.

---

### متد Thread5Method()

```csharp
private static void Thread5Method()
{
    Console.WriteLine("Thread5Method: Entered _object2 lock. Sleeping...");
    Thread.Sleep(1000);
    Console.WriteLine("Thread5Method: Woke from sleep");
    
    if (!Monitor.TryEnter(_object2))
    {
        Console.WriteLine("Thread5Method: Failed to lock _object2.");
        return;
    }
    try
    {
        if (!Monitor.TryEnter(_object1))
        {
            Console.WriteLine("Thread5Method: Failed to lock _object1.");
            return;
        }
        try
        {
            Console.WriteLine("Thread5Method: Doing work with _object1.");
        }
        finally
        {
            Monitor.Exit(_object1);
            Console.WriteLine("Thread5Method: Released _object1 lock.");
        }
    }
    finally
    {
        Monitor.Exit(_object2);
        Console.WriteLine("Thread5Method: Released _object2 lock.");
    }
}
```

* عملکرد این متد همان Thread4Method است، اما ترتیب قفل گرفتن **\_object1** و **\_object2** برعکس است.

---

### فراخوانی در Main()

```csharp
static void Main()
{
    DeadlockWithRecovery();
}
```

کد را چند بار اجرا کنید. در اکثر موارد، خروجی مشابه تصویر زیر خواهد بود، جایی که همه **Lockها** با موفقیت گرفته شده‌اند. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-9.jpeg)
</div>

سپس، هر کلیدی را فشار دهید تا برنامه خارج شود. اگر برنامه را چند بار اجرا کنید، در نهایت خواهید دید که یک **Lock** شکست می‌خورد. برنامه نتوانست در **Thread5Method()** روی **\_object2** قفل بگیرد. با این حال، اگر کلیدی را فشار دهید، برنامه خارج می‌شود.

همان‌طور که می‌بینید، با استفاده از **Monitor.TryEnter()** می‌توانید تلاش کنید یک شیء را قفل کنید. اما اگر قفل گرفته نشد، می‌توانید اقدام دیگری انجام دهید بدون اینکه برنامه شما گیر کند یا **Hang** شود. 

---

##  پیشگیری از **Race Conditions**

زمانی که چندین رشته از یک منبع مشترک استفاده می‌کنند و خروجی‌های متفاوتی به دلیل زمان‌بندی هر رشته تولید می‌شود، این وضعیت را **Race Condition** می‌نامند.
در این بخش، ما این وضعیت را با یک مثال عملی نشان خواهیم داد.

در مثال ما:

* دو رشته وجود خواهد داشت.
* هر رشته یک متد را فراخوانی می‌کند تا حروف الفبا را چاپ کند.
* یک متد حروف بزرگ (**Uppercase**) و متد دیگر حروف کوچک (**Lowercase**) را چاپ می‌کند.
* از این مثال، خواهید دید که خروجی اشتباه است و هر بار اجرای برنامه خروجی متفاوت خواهد بود.

---

### متد ThreadingRaceCondition()

```csharp
static void ThreadingRaceCondition()
{
    Thread T1 = new Thread(Method1);
    T1.Start();
    Thread T2 = new Thread(Method2);
    T2.Start();
}
```

* این متد دو رشته تولید می‌کند و آنها را شروع می‌کند.
* هر رشته به یک متد اشاره دارد:

  * **Method1()** حروف الفبا را با حروف بزرگ چاپ می‌کند.
  * **Method2()** حروف الفبا را با حروف کوچک چاپ می‌کند.

---

### متد Method1()

```csharp
static void Method1()
{
    for (_alphabetCharacter = 'A'; _alphabetCharacter <= 'Z'; _alphabetCharacter++)
    {
        Console.Write(_alphabetCharacter + " ");
    }
}
```

### متد Method2()

```csharp
private static void Method2()
{
    for (_alphabetCharacter = 'a'; _alphabetCharacter <= 'z'; _alphabetCharacter++)
    {
        Console.Write(_alphabetCharacter + " ");
    }
}
```

* هر دو متد به متغیر **\_alphabetCharacter** ارجاع می‌دهند.
* بنابراین، باید این عضو را در بالای کلاس اضافه کنیم:

```csharp
private static char _alphabetCharacter;
```

---

### به‌روزرسانی متد Main()

```csharp
static void Main(string[] args)
{
    Console.WriteLine("\n\nRace Condition:");
    ThreadingRaceCondition();
    Console.WriteLine("\n\nPress any key to exit.");
    Console.ReadKey();
}
```

حالا کد ما آماده است تا **Race Condition** را نشان دهد. اگر برنامه را چندین بار اجرا کنید، خواهید دید که نتایج همان چیزی نیست که انتظار داریم و حتی ممکن است کاراکترهایی خارج از حروف الفبا نیز چاپ شوند. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-10.jpeg)
</div>

دقیقاً همان چیزی نبود که انتظار داشتیم، درست است؟ 

ما می‌خواهیم این مشکل را با استفاده از **TPL** حل کنیم. هدف **Task Parallel Library (TPL)** ساده‌سازی **Parallelism** و **Concurrency** است. با توجه به اینکه اکثر کامپیوترهای امروزی دارای دو یا چند پردازنده هستند، **TPL** به صورت پویا میزان **Concurrency** را مقیاس‌بندی می‌کند تا از تمامی پردازنده‌های موجود به بهینه‌ترین شکل استفاده شود. 

* تقسیم‌بندی کار (**Partitioning of work**)
* زمان‌بندی رشته‌ها در **Thread Pool**
* پشتیبانی از لغو (**Cancellation**)
* مدیریت وضعیت (**State Management**)
  و موارد دیگر نیز توسط **TPL** انجام می‌شوند.
  لینک مستندات رسمی مایکروسافت درباره **TPL** در بخش **Further Reading** این فصل موجود است. 

---

راه حل این مشکل ساده است. ما یک **Task** داریم که ابتدا **Method1()** را اجرا می‌کند. سپس این **Task** ادامه می‌دهد و **Method2()** را اجرا می‌کند. در نهایت با فراخوانی **Wait()** منتظر می‌مانیم تا **Task** کامل شود.

---

### متد ThreadingRaceConditionFixed()

```csharp
static void ThreadingRaceConditionFixed()
{
    Task
        .Run(() => Method1())
        .ContinueWith(task => Method2())
        .Wait();
}
```

* ابتدا **Method1()** اجرا می‌شود.
* پس از اتمام آن، **Method2()** اجرا می‌شود.
* **Wait()** اطمینان می‌دهد که برنامه تا پایان اجرای **Task** صبر کند. 

---

### به‌روزرسانی متد Main()

```csharp
static void Main(string[] args)
{
    //Console.WriteLine("\n\nRace Condition:");
    //ThreadingRaceCondition();
    Console.WriteLine("\n\nRace Condition Fixed:");
    ThreadingRaceConditionFixed();
    Console.WriteLine("\n\nPress any key to exit.");
    Console.ReadKey();
}
```

کد را اجرا کنید. اگر برنامه را چندین بار اجرا کنید، خواهید دید که خروجی همیشه یکسان است، همان‌طور که در تصویر زیر نشان داده شده است. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-11.jpeg)
</div>

تا اینجا، ما دیدیم که **Thread** چیست و چگونه می‌توان از آن‌ها در **Foreground** و **Background** استفاده کرد. همچنین با **Deadlocks** و نحوه حل آن‌ها با **Monitor.TryEnter()** آشنا شدیم. در نهایت، با **Race Conditions** و نحوه حل آن‌ها با استفاده از **TPL** آشنا شدیم. 

حالا، به سراغ **Static Constructors** و **Static Methods** می‌رویم.

---

##  درک **Static Constructors** و **Methods**

اگر چندین کلاس همزمان به یک **Property Instance** دسترسی نیاز داشته باشند، یکی از **Threadها** درخواست اجرای **Static Constructor** (که به آن **Type Initializer** هم گفته می‌شود) می‌دهد.
در حالی که منتظر اجرای **Type Initializer** هستیم، تمام **Threadهای دیگر** قفل می‌شوند. وقتی **Type Initializer** اجرا شد، **Threadهای قفل‌شده** آزاد شده و قادر به دسترسی به **Instance Property** خواهند بود.

* **Static Constructors** **Thread-Safe** هستند، زیرا تضمین می‌شود که فقط یک بار در هر **Application Domain** اجرا شوند.
* آن‌ها قبل از دسترسی به هر **Static Member** و قبل از هر **Class Instantiation** اجرا می‌شوند.
* اگر استثنایی در **Static Constructor** ایجاد و بیرون فرار کند، **TypeInitializationException** تولید می‌شود و باعث می‌شود **CLR** برنامه شما را متوقف کند.

---

### نکات مهم درباره **Static Methods**

* **Static Methods** تنها یک نسخه از متد و داده‌های آن را در سطح **Type** نگه می‌دارند.
* این بدان معناست که همان متد و داده‌های آن بین نمونه‌های مختلف به اشتراک گذاشته می‌شود.
* هر **Thread** در برنامه، **Stack** خود را دارد.
* **Value Types** که به متدهای **Static** پاس داده می‌شوند روی **Stack** رشته فراخواننده ایجاد می‌شوند، بنابراین **Thread-Safe** هستند.
* اگر دو **Thread** همان کد را با همان مقدار فراخوانی کنند، دو نسخه از آن مقدار روی **Stack** هر **Thread** ایجاد می‌شود. بنابراین، **Threads** روی هم اثر نمی‌گذارند.

 اما:

* اگر متد **Static** به **Member Variable** دسترسی داشته باشد، **Thread-Safe** نیست.
* دو **Thread** مختلف همان متد را فراخوانی کرده و به **Member Variable** دسترسی دارند. **Context-Switching** بین **Threadها** رخ می‌دهد و هر **Thread** متغیر را تغییر می‌دهد. این منجر به **Race Conditions** می‌شود.
* اگر **Reference Types** به متد **Static** پاس داده شوند، مشکلات مشابهی رخ می‌دهد و باعث **Race Condition** می‌شود.

 نتیجه:

* هنگام استفاده از **Static Methods** در **Threads**، از دسترسی به **Member Variable** اجتناب کنید و **Reference Types** پاس ندهید.
* **Static Methods** **Thread-Safe** هستند تا زمانی که تنها **Primitive Types** پاس داده شوند و وضعیت تغییر نکند.

---

##  اضافه کردن **Static Constructors** به کد نمونه

یک برنامه جدید **.NET Framework Console** بسازید.
یک کلاس به نام **StaticConstructorTestClass** اضافه کنید و یک متغیر **Read-Only Static String** به نام **\_message** تعریف کنید:

```csharp
public class StaticConstructorTestClass
{
    private readonly static string _message;
}
```

این متغیر توسط متد **Message()** به فراخواننده بازگردانده می‌شود.

### متد Message()

```csharp
public static string Message()
{
    return $"Message: {_message}";
}
```

* این متد پیام ذخیره‌شده در **\_message** را بازمی‌گرداند.

### Constructor

```csharp
static StaticConstructorTestClass()
{
    Console.WriteLine("StaticConstructorTestClass static constructor started.");
    _message = "Hello, World!";
    Thread.Sleep(1000);
    _message = "Goodbye, World!";
    Console.WriteLine("StaticConstructorTestClass static constructor finished.");
}
```

* در **Constructor** یک پیام به کنسول می‌نویسیم.
* سپس **Member Variable** تنظیم می‌شود و **Thread** به مدت ۱ ثانیه خوابیده و دوباره پیام تغییر داده می‌شود.
* در نهایت، پیام دیگری به کنسول چاپ می‌شود.

---

### به‌روزرسانی متد Main()

```csharp
static void Main(string[] args)
{
    var program = new Program();
    program.StaticConstructorExample();
    Thread.CurrentThread.Join();
}
```

* **Main()** کلاس **Program** را نمونه‌سازی می‌کند.
* سپس **StaticConstructorExample()** فراخوانی می‌شود.
* برنامه متوقف شده و نتیجه را مشاهده می‌کنیم، سپس **Threadها** به **Join()** می‌پیوندند.

خروجی را می‌توانید در تصویر زیر مشاهده کنید. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-12.jpeg)
</div>

حالا به سراغ مثال‌هایی از **Static Methods** می‌رویم.

---

##  اضافه کردن **Static Methods** به کد نمونه

اکنون قصد داریم **Static Methods** ایمن برای **Thread** و غیر ایمن را عملی مشاهده کنیم.

یک کلاس جدید به نام **StaticExampleClass** به یک برنامه **.NET Framework Console** اضافه کنید و کد زیر را بنویسید:

```csharp
public static class StaticExampleClass
{
    private static int _x = 1;
    private static int _y = 2;
    private static int _z = 3;
}
```

* در بالای کلاس، سه عدد صحیح تعریف کرده‌ایم: **\_x، \_y و \_z** با مقادیر ۱، ۲ و ۳.
* این متغیرها می‌توانند بین **Threadها** تغییر کنند.

---

### Static Constructor

حالا یک **Static Constructor** اضافه می‌کنیم تا مقادیر این متغیرها را چاپ کند:

```csharp
static StaticExampleClass()
{
    Console.WriteLine($"Constructor: _x={_x}, _y={_y}, _z={_z}");
}
```

* همان‌طور که مشاهده می‌کنید، **Static Constructor** فقط مقادیر متغیرها را در **Console Window** چاپ می‌کند.

---

### Thread-Safe Method

متد اول ما یک متد **Thread-Safe** به نام **ThreadSafeMethod()** است:

```csharp
internal static void ThreadSafeMethod(int x, int y, int z)
{
    Console.WriteLine($"ThreadSafeMethod: x={x}, y={y}, z={z}");
    Console.WriteLine($"ThreadSafeMethod: {x}+{y}+{z}={x+y+z}");
}
```

* این متد **Thread-Safe** است زیرا فقط با پارامترهای **by value** کار می‌کند.
* با متغیرهای **Member** تعامل ندارد و هیچ **by reference value** ندارد.
* بنابراین، صرف نظر از مقادیر ورودی، همیشه نتیجه مورد انتظار را خواهید گرفت.

 یعنی چه یک **Thread** واحد یا حتی میلیون‌ها **Thread** به این متد دسترسی داشته باشند، خروجی هر **Thread** همان چیزی خواهد بود که انتظار دارید، حتی با وجود **Context Switching**.

خروجی این متد را در **Screenshot** بعدی مشاهده می‌کنیم. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-13.jpeg)
</div>

حال که با **Thread-Safe Methods** آشنا شدیم، منطقی است که نگاهی هم به **Non-Thread-Safe Methods** بیندازیم.

 تا اینجا می‌دانید که هر **Static Method** که روی **by reference values** یا **Static Member Variables** عمل کند، **Thread-Safe** نیست.

---

### Non-Thread-Safe Method

در مثال بعدی، متدی با همان سه پارامتر **ThreadSafeMethod()** خواهیم داشت، اما این بار:

* متغیرهای عضو (**Member Variables**) را مقداردهی می‌کنیم،
* پیامی چاپ می‌کنیم،
* برای مدتی **Sleep** می‌کنیم،
* سپس بیدار شده و دوباره مقادیر را چاپ می‌کنیم.

کد **NotThreadSafeMethod()** را به کلاس **StaticExampleClass** اضافه کنید:

```csharp
internal static void NotThreadSafeMethod(int x, int y, int z)
{
    _x = x;
    _y = y;
    _z = z;
    Console.WriteLine(
        $"{Thread.CurrentThread.ManagedThreadId}-NotThreadSafeMethod: _x={_x}, _y={_y}, _z={_z}"
    );
    Thread.Sleep(300);
    Console.WriteLine(
        $"{Thread.CurrentThread.ManagedThreadId}-ThreadSafeMethod: {_x}+{_y}+{_z}={_x + _y + _z}"
    );
}
```

* در این متد، ابتدا **Member Variables** را با مقادیر ورودی مقداردهی می‌کنیم.
* سپس آن مقادیر را در **Console** چاپ می‌کنیم و **300 میلی‌ثانیه** به **Sleep** می‌رویم.
* پس از بیدار شدن، دوباره مقادیر را چاپ می‌کنیم.

---

### بروزرسانی Main Method

در کلاس **Program**، **Main()** را به شکل زیر بروزرسانی کنید:

```csharp
static void Main(string[] args)
{
    var program = new Program();
    program.ThreadUnsafeMethodCall();
    Console.ReadKey();
}
```

* در **Main()**، ابتدا کلاس **Program** نمونه‌سازی می‌شود.
* سپس متد **ThreadUnsafeMethodCall()** فراخوانی می‌شود.
* برنامه تا زمانی که کاربر کلیدی فشار دهد، صبر می‌کند.

---

### ThreadUnsafeMethodCall

حالا **ThreadUnsafeMethodCall()** را به کلاس **Program** اضافه کنید:

```csharp
private void ThreadUnsafeMethodCall()
{
    for (var index = 0; index < 10; index++)
    {
        var thread = new Thread(() =>
        {
            StaticExampleClass.NotThreadSafeMethod(index + 1, index + 2, index + 3);
        });
        thread.Start();
    }
}
```

* این متد **10 Thread** ایجاد می‌کند که هرکدام **NotThreadSafeMethod()** از کلاس **StaticExampleClass** را فراخوانی می‌کنند.
* اگر کد را اجرا کنید، خروجی مشابه **Screenshot** بعدی مشاهده خواهد شد. 

خروجی نشان می‌دهد که مقادیر بین **Threadها** تداخل دارند و به دلیل عدم ایمنی **Thread**، نتایج غیرقابل پیش‌بینی است.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-14.jpeg)
</div>

همان‌طور که می‌بینید، خروجی برنامه آن چیزی نیست که انتظار داشتیم. این به دلیل **آلودگی داده‌ها توسط Threadهای مختلف** رخ می‌دهد. این موضوع ما را به بخش بعدی یعنی **قابلیت تغییر (Mutability)، عدم تغییر (Immutability) و ایمنی Thread** می‌رساند. 

---

## قابلیت تغییر، عدم تغییر و ایمنی Thread

**Mutability** منبع بروز خطا در برنامه‌های چند Threadه است. یک خطای قابل تغییر معمولاً ناشی از اشتراک‌گذاری و به‌روزرسانی مقادیر بین Threadهاست.

برای حذف خطر این نوع خطاها، بهتر است از **Immutable Types** استفاده کنیم.

**Thread Safety** یعنی اجرای امن یک بخش کد توسط چند Thread به‌طور همزمان. وقتی برنامه‌های چند Threadه می‌نویسید، مهم است که کد شما **Thread-Safe** باشد. کد شما Thread-Safe است اگر شرایطی مانند **Race Conditions** و **Deadlocks** و مشکلات ناشی از **Mutability** را حذف کند.

* **Immutable Object**: شیئی که پس از ایجاد قابل تغییر نیست. اگر چنین شیئی بین Threadها به‌درستی همگام‌سازی شود، همه Threadها همان وضعیت معتبر شیء را خواهند دید.
* **Mutable Object**: شیئی که پس از ایجاد قابل تغییر است و داده‌های آن می‌تواند بین Threadها تغییر کند. این می‌تواند باعث **Corruption داده‌ها** شود، حتی اگر برنامه کرش نکند، داده‌ها ممکن است در وضعیت نامعتبر باقی بمانند.

بنابراین، وقتی با چند Thread کار می‌کنید، مهم است که **اشیاء شما Immutable باشند**. در فصل ۳ (Classes, Objects, and Data Structures) روش ایجاد و استفاده از ساختارهای داده غیرقابل تغییر را یاد گرفتیم.

 برای اطمینان از Thread Safety:

* از **Mutable Objects** استفاده نکنید.
* پارامترها را **By Reference** ارسال نکنید.
* **Member Variables** را تغییر ندهید.
* فقط پارامترها را **By Value** ارسال کنید و روی همان‌ها عملیات انجام دهید.

**Immutable Structures** روش ایمن و مناسب برای انتقال داده‌ها بین اشیاء هستند.

---

## نمونه کد برای Mutable و غیر Thread-Safe

برای نمایش **Mutability** در یک برنامه چند Threadه، یک **Console Application** جدید ایجاد کنید. یک کلاس به نام **MutableClass** اضافه کنید:

```csharp
internal class MutableClass
{
    private readonly int[] _intArray;
    public MutableClass(int[] intArray)
    {
        _intArray = intArray;
    }
    public int[] GetIntArray()
    {
        return _intArray;
    }
}
```

* این کلاس یک **Constructor** دارد که یک آرایه عدد صحیح می‌گیرد و به عضو کلاس اختصاص می‌دهد.
* متد **GetIntArray()** همان آرایه را برمی‌گرداند.
* اگرچه کلاس به نظر غیرقابل تغییر می‌آید، اما **آرایه عدد صحیح ورودی mutable است** و GetIntArray() یک **Reference** از آن برمی‌گرداند.

---

### MutableExample Method

در کلاس **Program**، متد **MutableExample()** را اضافه کنید تا نشان دهد آرایه mutable است:

```csharp
private static void MutableExample()
{
    int[] iar = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    var mutableClass = new MutableClass(iar);
    Console.WriteLine($"Initial Array: {iar[0]}, {iar[1]}, {iar[2]}, {iar[3]}, {iar[4]}, {iar[5]}, {iar[6]}, {iar[7]}, {iar[8]}, {iar[9]}");
    for (var x = 0; x < 9; x++)
    {
        var thread = new Thread(() =>
        {
            iar[x] = x + 1;
            var ia = mutableClass.GetIntArray();
            Console.WriteLine($"Array [{x}]: {ia[0]}, {ia[1]}, {ia[2]}, {ia[3]}, {ia[4]}, {ia[5]}, {ia[6]}, {ia[7]}, {ia[8]}, {ia[9]}");
        });
        thread.Start();
    }
}
```

* در این متد، ابتدا یک آرایه عدد صحیح از ۰ تا ۹ ایجاد می‌کنیم.
* سپس یک نمونه از **MutableClass** می‌سازیم و آرایه را به آن پاس می‌دهیم.
* ابتدا محتویات آرایه را چاپ می‌کنیم.
* سپس در یک حلقه ۹ بار، مقدار هر ایندکس را به `x + 1` تغییر می‌دهیم و یک Thread برای چاپ آرایه ایجاد می‌کنیم.

---

### بروزرسانی Main Method

```csharp
static void Main(string[] args)
{
    MutableExample();
    Console.ReadKey();
}
```

* Main() تنها متد **MutableExample()** را فراخوانی می‌کند و سپس منتظر فشردن یک کلید می‌ماند.

با اجرای این برنامه، خروجی مشابه **Screenshot** بعدی نمایش داده خواهد شد و نشان می‌دهد که **چند Thread مقادیر آرایه را همزمان تغییر می‌دهند** و باعث **عدم پیش‌بینی وضعیت نهایی آرایه** می‌شوند. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-15.jpeg)
</div>

همان‌طور که می‌بینید، حتی با اینکه تنها یک نمونه از **MutableClass** ایجاد کردیم قبل از ساخت و اجرای Threadها، تغییر آرایه محلی باعث تغییر آرایه در نمونه MutableClass می‌شود. این ثابت می‌کند که آرایه‌ها **قابل تغییر (Mutable)** هستند و بنابراین **Thread-Safe** نیستند. 

---

## نوشتن کد Immutable و Thread-Safe

در مثال **Immutable**، دوباره یک برنامه **.NET Framework Console Application** ایجاد می‌کنیم و از همان آرایه استفاده می‌کنیم.

یک کلاس به نام **ImmutableStruct** اضافه کنید و کد را به شکل زیر اصلاح کنید:

```csharp
internal struct ImmutableStruct
{
    private ImmutableArray<int> _immutableArray;
    public ImmutableStruct(ImmutableArray<int> immutableArray)
    {
        _immutableArray = immutableArray;
    }
    public int[] GetIntArray()
    {
        return _immutableArray.ToArray<int>();
    }
}
```

* به جای آرایه عدد صحیح معمولی، از **ImmutableArray** استفاده می‌کنیم.
* یک آرایه Immutable به **Constructor** پاس داده شده و به متغیر عضو `_immutableArray` اختصاص می‌یابد.
* متد **GetIntArray()** آرایه Immutable را به صورت آرایه عدد صحیح معمولی برمی‌گرداند.

---

### ImmutableExample Method

در کلاس **Program**، متد **ImmutableExample()** را اضافه کنید:

```csharp
private static void ImmutableExample()
{
    int[] iar = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    var immutableStruct = new ImmutableStruct(iar.ToImmutableArray<int>());
    Console.WriteLine($"Initial Array: {iar[0]}, {iar[1]}, {iar[2]}, {iar[3]}, {iar[4]}, {iar[5]}, {iar[6]}, {iar[7]}, {iar[8]}, {iar[9]}");
    for (var x = 0; x < 9; x++)
    {
        var thread = new Thread(() =>
        {
            iar[x] = x + 1;
            var ia = immutableStruct.GetIntArray();
            Console.WriteLine($"Array [{x}]: {ia[0]}, {ia[1]}, {ia[2]}, {ia[3]}, {ia[4]}, {ia[5]}, {ia[6]}, {ia[7]}, {ia[8]}, {ia[9]}");
        });
        thread.Start();
    }
}
```

* در این متد، ابتدا یک آرایه عدد صحیح ایجاد می‌کنیم و آن را به Constructor **ImmutableStruct** به صورت یک **ImmutableArray** پاس می‌دهیم.
* سپس محتوای آرایه محلی قبل از تغییر چاپ می‌شود.
* بعد از آن، یک حلقه ۹ بار اجرا می‌کنیم و در هر تکرار مقدار ایندکس جاری + ۱ به آرایه محلی اضافه می‌کنیم.
* سپس از طریق متد **GetIntArray()**، یک کپی از آرایه Immutable دریافت کرده و مقادیر آن را چاپ می‌کنیم.
* در نهایت، Thread را اجرا می‌کنیم.

متد **ImmutableExample()** را از **Main()** فراخوانی کرده و برنامه را اجرا کنید. خروجی نشان می‌دهد که **آرایه Immutable هیچ تغییری توسط Threadها نمی‌بیند** و برنامه **Thread-Safe** است. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-16.jpeg)
</div>

همان‌طور که می‌بینید، محتوای آرایه با تغییر آرایه محلی تغییر نمی‌کند. این نسخه از برنامه نشان می‌دهد که برنامه ما **Thread-Safe** است. 

---

## درک مفهوم Thread-Safety 

همان‌طور که در دو بخش قبلی دیدید، هنگام نوشتن کدهای چند نخی باید بسیار مراقب بود. نوشتن کد **Thread-Safe** می‌تواند به‌ویژه در پروژه‌های بزرگ بسیار دشوار باشد. شما باید به‌طور ویژه مراقب موارد زیر باشید:

* کار با **Collections**
* **پاس دادن پارامترها به‌صورت مرجع (by reference)**
* دسترسی به **متغیرهای عضو در کلاس‌های static**

بهترین شیوه‌ها برای برنامه‌های چند نخی:

1. تنها از **Immutable Types** استفاده کنید.
2. به متغیرهای عضو **static** دسترسی پیدا نکنید.
3. اگر کدی وجود دارد که **Thread-Safe نیست**، آن را با **lock، mutex یا semaphore** محافظت کنید.

گرچه شما قبلاً نمونه‌هایی از این کدها را در این فصل دیده‌اید، بیایید یک مرور کوتاه با نمونه کد داشته باشیم.

---

### نمونه نوشتن یک نوع Immutable با `readonly struct`

```csharp
public readonly struct ImmutablePerson
{
    public ImmutablePerson(int id, string firstName, string lastName)
    {
        _id = id;
        _firstName = firstName;
        _lastName = lastName;
    }
    public int Id { get; }
    public string FirstName { get { return _firstName; } }
    public string LastName { get { return _lastName; } }
}
```

* در ساختار **ImmutablePerson**، یک **Constructor عمومی** داریم که یک عدد صحیح برای **ID** و دو رشته برای نام و نام خانوادگی می‌گیرد.
* پارامترهای **id، firstName و lastName** به متغیرهای عضو **Read-Only** اختصاص داده می‌شوند.
* تنها دسترسی به داده‌ها از طریق **Properties فقط خواندنی** انجام می‌شود، بنابراین **امکان تغییر داده‌ها وجود ندارد**.

از آنجایی که داده‌ها پس از ایجاد قابل تغییر نیستند، این ساختار **Thread-Safe** است. یعنی نمی‌توان آن را از طریق Threadهای مختلف تغییر داد. تنها راه تغییر داده‌ها، ایجاد یک **Struct جدید با داده‌های جدید** است.

---

### نکات تکمیلی

* Structها می‌توانند **Mutable** باشند، درست مانند کلاس‌ها.
* اما اگر می‌خواهید داده‌ها تغییر ناپذیر باشند، **Read-Only Structs** گزینه‌ای سبک و مناسب هستند.
* ایجاد و از بین بردن این Structها سریع‌تر از کلاس‌ها است، زیرا روی **Stack** قرار می‌گیرند (مگر اینکه بخشی از کلاسی باشند که روی **Heap** قرار دارد).

---

### Collections Immutable

پیش‌تر دیدیم که **Collections Mutable** هستند. اما یک **Namespace** برای **Immutable Collections** وجود دارد به نام:

**`System.Collections.Immutable`**

جدول زیر برخی از عناصر مهم این Namespace را نشان می‌دهد:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-17.jpeg)
</div>

Namespace **`System.Collections.Immutable`** شامل مجموعه‌ای از **Immutable Collections** است که می‌توانید به‌طور ایمن بین Threadها استفاده کنید. برای جزئیات بیشتر، به لینک زیر مراجعه کنید:
[https://docs.microsoft.com/en-us/dotnet/api/system.collections.immutable?view=netcore-3.1](https://docs.microsoft.com/en-us/dotnet/api/system.collections.immutable?view=netcore-3.1) 

---

### استفاده از Lock در C# 

استفاده از **lock object** در C# بسیار ساده است، همان‌طور که در نمونه کد زیر می‌بینید:

```csharp
public class LockExample
{
    public object _lock = new object();

    public void UnsafeMethod()
    {
        lock(_lock)
        {
            // اجرای کد غیر ایمن
        }
    }
}
```

* ابتدا متغیر عضو `_lock` را ایجاد و نمونه‌سازی می‌کنیم.
* زمانی که می‌خواهیم کدی که **Thread-Safe نیست** را اجرا کنیم، آن را داخل **lock** قرار می‌دهیم و `_lock` را به عنوان **lock object** استفاده می‌کنیم.
* وقتی یک Thread وارد lock می‌شود، تمام Threadهای دیگر تا خروج Thread فعلی از lock، اجازه اجرا ندارند.

یک مشکل احتمالی: **Deadlock**. برای جلوگیری از آن می‌توان از **Mutex** استفاده کرد.

---

### استفاده از Mutex 

ابتدا متغیر Mutex را تعریف کنید:

```csharp
private static readonly Mutex _mutex = new Mutex();
```

سپس کد محافظت‌شده را به این صورت اجرا کنید:

```csharp
try
{
    _mutex.WaitOne();
    // ... انجام کار ...
}
finally
{
    _mutex.ReleaseMutex();
}
```

* **WaitOne()** Thread فعلی را تا زمان دریافت سیگنال متوقف می‌کند.
* پس از دریافت سیگنال، Thread مالک **mutex** می‌شود و می‌تواند به منابع محافظت‌شده دسترسی پیدا کند.
* پس از اتمام کار، با **ReleaseMutex()** Mutex آزاد می‌شود.
* مهم: همیشه ReleaseMutex() را در بلوک **finally** قرار دهید تا در صورت رخ دادن Exception، منابع همچنان آزاد شوند. 

---

### استفاده از Semaphore 

**Semaphore** نیز شبیه Mutex عمل می‌کند، اما تفاوت اصلی این است که **Mutex مکانیزم قفل است** و **Semaphore مکانیزم سیگنال‌دهی**.

مثال تعریف Semaphore:

```csharp
private static readonly Semaphore _semaphore = new Semaphore(2, 4);
```

* پارامتر اول: تعداد درخواست‌های همزمان اولیه که می‌توانند اجازه دسترسی بگیرند.
* پارامتر دوم: حداکثر تعداد درخواست‌های همزمانی که می‌توانند اجازه دسترسی بگیرند.

استفاده در متدها:

```csharp
try
{
    _semaphore.WaitOne();
    // ... انجام کار ...
}
finally
{
    _semaphore.Release();
}
```

* Thread فعلی تا دریافت سیگنال منتظر می‌ماند، سپس کار خود را انجام می‌دهد و در نهایت **Semaphore** آزاد می‌شود.

---

### نکات مهم 

* در این فصل یاد گرفتیم که چگونه با **locks، mutexes و semaphores** از کدهای غیر Thread-Safe محافظت کنیم.
* **Threadهای پس‌زمینه** پس از اتمام پروسه خاتمه می‌یابند، در حالی که **Threadهای پیش‌زمینه** تا پایان اجرا ادامه می‌دهند.
* اگر نیاز دارید کدی **تا پایان اجرا بدون قطع شدن Thread** ادامه پیدا کند، بهتر است از **Foreground Threads** استفاده کنید.

---

### وابستگی‌های متد همزمان (Synchronized Method Dependencies) 

برای همزمان‌سازی کدها:

* از **lock statement** استفاده کنید.
* یا **Namespace** `System.Runtime.CompilerServices` را اضافه کرده و از annotation زیر استفاده کنید:

```csharp
[MethodImpl(MethodImplOptions.Synchronized)]
public static void ThisIsASynchronisedMethod()
{
    Console.WriteLine("Synchronised method called.");
}
```

با property نیز می‌توان همزمان‌سازی انجام داد:

```csharp
private int i;
public int SomeProperty
{
    [MethodImpl(MethodImplOptions.Synchronized)]
    get { return i; }
    [MethodImpl(MethodImplOptions.Synchronized)]
    set { i = value; }
}
```

---

### استفاده از کلاس Interlocked 

در برنامه‌های چند نخی، **خطاها هنگام Context Switching Threadها** رخ می‌دهند، مثلاً وقتی چند Thread متغیر یکسانی را به‌روزرسانی می‌کنند.

کلاس **`System.Threading.Interlocked`** در **mscorlib** برای محافظت در برابر این خطاها استفاده می‌شود.

ویژگی‌ها:

* روش‌ها **Exception** نمی‌اندازند و عملکرد بهتری نسبت به lock دارند.
* برای اعمال تغییرات ساده در وضعیت متغیرها ایده‌آل هستند.

---

### متدهای موجود در Interlocked 

* **CompareExchange**: مقایسه دو متغیر و ذخیره نتیجه در متغیر دیگر
* **Add**: جمع دو متغیر Int32 یا Int64 و ذخیره نتیجه در متغیر اول
* **Decrement**: کاهش مقدار Int32 و Int64 و ذخیره نتیجه
* **Increment**: افزایش مقدار Int32 و Int64 و ذخیره نتیجه
* **Read**: خواندن متغیرهای Int64
* **Exchange**: تبادل مقادیر بین متغیرها
ما اکنون قصد داریم یک برنامه‌ی ساده‌ی کنسول بنویسیم که این روش‌ها را نمایش دهد. 

ابتدا یک برنامه‌ی جدید **.NET Framework Console Application** ایجاد کنید و خطوط زیر را در بالای کلاس **Program** اضافه کنید:

```csharp
private static long _value = long.MaxValue;
private static int _resourceInUse = 0;
```

متغیر `_value` برای نشان دادن به‌روزرسانی متغیرها با استفاده از روش‌های **interlocking** استفاده می‌شود. متغیر `_resourceInUse` برای نشان دادن این است که آیا یک منبع در حال استفاده است یا خیر.

سپس متد **CompareExchangeVariables()** را اضافه کنید:

```csharp
private static void CompareExchangeVariables()
{
    Interlocked.CompareExchange(ref _value, 123, long.MaxValue);
}
```

در متد **CompareExchangeVariables()**، ما متد **CompareExchange()** را فراخوانی می‌کنیم تا `_value` را با `long.MaxValue` مقایسه کند. اگر دو مقدار برابر باشند، `_value` با مقدار `123` جایگزین می‌شود.

حالا متد **AddVariables()** را اضافه می‌کنیم:

```csharp
private static void AddVariables()
{
    Interlocked.Add(ref _value, 321);
}
```

متد **AddVariables()** متد **Add()** را فراخوانی می‌کند تا به متغیر عضو `_value` دسترسی داشته باشد و آن را با مقدار `_value + 321` به‌روزرسانی کند.

سپس متد **DecrementVariable()** را اضافه می‌کنیم:

```csharp
private static void DecrementVariable()
{
    Interlocked.Decrement(ref _value);
}
```

این متد، متد **Decrement()** را فراخوانی می‌کند که مقدار متغیر عضو `_value` را ۱ واحد کاهش می‌دهد.

متد بعدی **IncrementVariable()** است:

```csharp
private static void IncrementVariable()
{
    Interlocked.Increment(ref _value);
}
```

در **IncrementVariable()**، مقدار متغیر عضو `_value` با فراخوانی متد **Increment()** افزایش می‌یابد.

حالا متد **ReadVariable()** را می‌نویسیم:

```csharp
private static long ReadVariable()
{
    // متد Read در سیستم‌های 64 بیتی لازم نیست،
    // چون عملیات خواندن 64 بیتی به‌صورت atomic انجام می‌شود.
    // در سیستم‌های 32 بیتی، عملیات خواندن 64 بیتی atomic نیست
    // مگر اینکه با Read انجام شود.
    return Interlocked.Read(ref _value);
}
```

از آنجایی که عملیات خواندن ۶۴ بیتی atomic است، فراخوانی متد **Interlocked.Read()** در سیستم‌های ۶۴ بیتی ضروری نیست. اما در سیستم‌های ۳۲ بیتی، برای اینکه خواندن ۶۴ بیتی atomic باشد، باید از **Interlocked.Read()** استفاده کنید.

سپس متد **PerformUnsafeCodeSafely()** را اضافه می‌کنیم:

```csharp
private static void PerformUnsafeCodeSafely()
{
    for (int i = 0; i < 5; i++)
    {
        UseResource();
        Thread.Sleep(1000);
    }
}
```

متد **PerformUnsafeCodeSafely()** پنج بار حلقه می‌زند. در هر بار حلقه، متد **UseResource()** فراخوانی می‌شود و سپس نخ برای یک ثانیه به خواب می‌رود.

حالا متد **UseResource()** را اضافه می‌کنیم:

```csharp
static bool UseResource()
{
    if (0 == Interlocked.Exchange(ref _resourceInUse, 1))
    {
        Console.WriteLine($"{Thread.CurrentThread.Name} acquired the lock");
        NonThreadSafeResourceAccess();
        Thread.Sleep(500);
        Console.WriteLine($"{Thread.CurrentThread.Name} exiting lock");
        Interlocked.Exchange(ref _resourceInUse, 0);
        return true;
    }
    else
    {
        Console.WriteLine($"{Thread.CurrentThread.Name} was denied the lock");
        return false;
    }
}
```

متد **UseResource()** جلوگیری می‌کند از اینکه اگر منبع در حال استفاده است، **lock** گرفته شود، همانطور که توسط متغیر `_resourceInUse` مشخص شده است. ابتدا مقدار `_resourceInUse` را با فراخوانی متد **Exchange()** روی ۱ تنظیم می‌کنیم. متد **Exchange()** یک عدد بازمی‌گرداند که با ۰ مقایسه می‌شود. اگر مقدار بازگشتی ۰ باشد، متد در حال استفاده نیست.

اگر متد در حال استفاده باشد، پیامی به کاربر نمایش داده می‌شود که نخ فعلی اجازه‌ی lock ندارد.
اگر متد آزاد باشد، پیامی به کاربر نمایش داده می‌شود که نخ فعلی lock را گرفته است. سپس متد **NonThreadSafeResourceAccess()** فراخوانی می‌شود و نخ برای نیم ثانیه به خواب می‌رود تا شبیه‌سازی کار انجام شود.

پس از بیدار شدن نخ، پیامی نشان می‌دهد که نخ فعلی از lock خارج شده است و سپس lock با فراخوانی **Exchange()** آزاد می‌شود و مقدار `_resourceInUse` به ۰ بازگردانده می‌شود.

متد **NonThreadSafeResourceAccess()** را اضافه کنید:

```csharp
private static void NonThreadSafeResourceAccess()
{
    Console.WriteLine("Non-thread-safe code executed.");
}
```

در **NonThreadSafeResourceAccess()** کد غیر thread-safe در امنیت lock اجرا می‌شود. در مثال ما، فقط پیامی به کاربر نمایش داده می‌شود.

در نهایت، متد **Main()** را به شکل زیر به‌روزرسانی کنید:

```csharp
static void Main(string[] args)
{
    CompareExchangeVariables();
    AddVariables();
    DecrementVariable();
    IncrementVariable();
    ReadVariable();
    PerformUnsafeCodeSafely();
}
```

متد **Main()** متدهایی که روش‌های **Interlocked** را تست می‌کنند، فراخوانی می‌کند. 

اگر کد را اجرا کنید، خروجی مشابه چیزی خواهد بود که انتظار داریم.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/08/Table%208-18.jpeg)
</div>

حال بیایید به برخی توصیه‌های عمومی بپردازیم. 

### توصیه‌های عمومی 

در این بخش نهایی، برخی از توصیه‌های مایکروسافت برای کار با برنامه‌های **multi-threaded** را بررسی می‌کنیم. این توصیه‌ها شامل موارد زیر هستند:

* از **Thread.Abort** برای خاتمه دادن به سایر threadها اجتناب کنید.
* از **mutex**، **ManualResetEvent**، **AutoResetEvent** و **Monitor** برای همگام‌سازی فعالیت‌ها بین چند thread استفاده کنید.
* هر جا که ممکن است، از **thread pool** برای threadهای کاری استفاده کنید.
* اگر threadهای کاری شما مسدود شدند، از **Monitor.PulseAll** برای اطلاع دادن به همه threadها از تغییر وضعیت thread کاری استفاده کنید.
* از استفاده از **this**، نمونه‌های نوع‌ها (**type instances**) و نمونه‌های رشته‌ای (**string instances**) از جمله رشته‌های literal به‌عنوان **lock objects** اجتناب کنید. استفاده از نوع lockها می‌تواند خطر deadlock ایجاد کند، پس مراقب باشید.
* از بلوک **try/finally** با threadهایی که وارد **monitor** می‌شوند استفاده کنید، تا در بلوک **finally** اطمینان حاصل شود که thread با فراخوانی **Monitor.Exit()** از monitor خارج می‌شود.
* برای منابع مختلف، از threadهای جداگانه استفاده کنید و از اختصاص چند thread به یک منبع اجتناب کنید.
* وظایف **I/O** باید thread مخصوص خود را داشته باشند، زیرا هنگام انجام عملیات I/O مسدود می‌شوند و این اجازه می‌دهد سایر threadها اجرا شوند.
* ورودی کاربر باید thread مخصوص به خود را داشته باشد.
* برای بهبود عملکرد در تغییرات ساده وضعیت، از متدهای کلاس **System.Threading.Interlocked** به جای دستور **lock** استفاده کنید.
* برای کدهایی که استفاده زیادی دارند، از همگام‌سازی اجتناب کنید، زیرا می‌تواند منجر به deadlock و race condition شود.
* داده‌های **static** باید به‌صورت پیش‌فرض **thread-safe** باشند.
* داده‌های **instance** نباید به‌صورت پیش‌فرض **thread-safe** باشند، در غیر این صورت عملکرد کاهش می‌یابد، رقابت بر سر lock افزایش می‌یابد و امکان وقوع race condition و deadlock افزایش می‌یابد.
* از متدهای **static** که state را تغییر می‌دهند اجتناب کنید، زیرا منجر به باگ‌های threading می‌شوند.

---

### جمع‌بندی 

در این فصل، ما بررسی کردیم که **threading** چیست و چگونه از آن استفاده کنیم. ما مشکلات **deadlock** و **race condition** را مشاهده کردیم و دیدیم چگونه می‌توان با استفاده از **lock statement** و کتابخانه **TPL** از این شرایط استثنایی جلوگیری کرد. همچنین به بررسی **thread safety** در **static constructors**، **static methods**، **immutable objects** و **mutable objects** پرداختیم. مشاهده کردیم که استفاده از **immutable objects** راهی امن برای انتقال داده بین threadها است و برخی توصیه‌های عمومی برای کار با threadها مرور شد.

همچنین دیدیم که چگونه امن کردن کد برای threadها می‌تواند مزایای زیادی داشته باشد. 

در فصل بعد، به طراحی **APIs** مؤثر خواهیم پرداخت. اما در حال حاضر می‌توانید دانش خود را با پاسخ دادن به سوالات زیر امتحان کنید و مطالعه خود را با مراجعه به لینک‌های ارائه شده ادامه دهید.

---

### سوالات 

1. **Thread چیست؟**
2. در یک برنامه **single-threaded** چند thread وجود دارد؟
3. چه انواعی از thread وجود دارد؟
4. کدام thread بلافاصله پس از خروج برنامه خاتمه می‌یابد؟
5. کدام thread حتی پس از خروج برنامه تا تکمیل ادامه می‌یابد؟
6. چه کدی باعث می‌شود یک thread به مدت نیم میلی‌ثانیه بخوابد؟
7. چگونه یک thread ایجاد می‌کنید که متدی به نام **Method1** را فراخوانی کند؟
8. چگونه یک thread را به **background thread** تبدیل می‌کنید؟
9. **Deadlock** چیست؟
10. چگونه از یک lock که با **Monitor.TryEnter(objectName)** گرفته شده خارج می‌شوید؟
11. چگونه می‌توان از **deadlock** بازیابی کرد؟
12. **Race condition** چیست؟
13. یک روش برای جلوگیری از **race condition** چیست؟
14. چه چیزی متدهای **static** را ناامن می‌کند؟
15. آیا **static constructors** thread-safe هستند؟
16. چه چیزی مسئول مدیریت گروه‌های thread است؟
17. **Immutable object** چیست؟
18. چرا در برنامه‌های multi-threaded، **immutable objects** نسبت به **mutable objects** ترجیح داده می‌شوند؟

---

### مطالعه‌ی بیشتر 

* [Examples of using mutex and semaphore](https://www.c-sharpcorner.com/blogs/mutex-and-semaphore-inthread)
* [Differences between mutex and semaphore](https://www.guru99.com/mutex-vs-semaphore.html)
* [Official Microsoft documentation on static constructors](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-constructors)
* [Microsoft guidance on managed threading best practices](https://docs.microsoft.com/en-us/dotnet/standard/threading/managedthreading-best-practices)
* [Official Microsoft API documentation for the TPL](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl)
* [Interlocked class in C# threading](https://www.c-sharpcorner.com/UploadFile/1d42da/interlocked-class-inC-Sharp-threading/)
* [Discussion on System.Threading.Interlocked](http://geekswithblogs.net/BlackRabbitCoder/archive/2012/08/23/c.net-little-wonders-interlocked-read-and-exchange.aspx)
* [Free eBook about threading in C#](http://www.albahari.com/threading/)
* [Immutable collections in System.Collections.Immutable](https://docs.microsoft.com/en-us/dotnet/api/system.collections.immutable?view=netcore-3.1)
