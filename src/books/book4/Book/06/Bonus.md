---
layout: layout.njk
title: موارد اضافی
---
# فصل ششم: موارد اضافی 

در این فصل، چند موضوع تکمیلی درباره **برنامه‌نویسی Task** بررسی می‌شود.

---

### گزارش پیشرفت (Progress Reporting) 

حتماً دیده‌اید هنگام **به‌روزرسانی سیستم‌عامل** یا **نصب نسخه جدید Visual Studio** روی یک کامپیوتر، وضعیت پیشرفت کار نمایش داده می‌شود. حالا بیایید ببینیم آیا می‌توانید با استفاده از **برنامه‌نویسی Task** یک برنامه با ویژگی مشابه بسازید؟

---

### درک نیاز (Understanding the Need) 

فرض کنید در حال پردازش تعداد زیادی **رکورد (Record)** مختلف هستید. برای شبیه‌سازی شرایط واقعی، تصور کنید که **زمان پردازش هر رکورد متفاوت است**. از آن‌جایی که این عملیات ممکن است **زمان‌بر** باشد، نمی‌خواهید **رشته اصلی (Main Thread)** مسدود شود. در عوض تصمیم می‌گیرید این کار را از طریق یک **Task پس‌زمینه** انجام دهید.

---

### نمایش اولیه (Demonstration 1) 

با این حال، اگر هنگام پردازش این رکوردها **وضعیت پیشرفت را نمایش ندهید**، کاربر ممکن است **سردرگم شود**. برای ساده‌تر کردن موضوع، بیایید یک نمونه آزمایشی ببینیم که فقط با **۵ رکورد** کار می‌کند:

```csharp
using static System.Console;

WriteLine("The main thread is initiating a task to process some records.");
var recordProcessingTask = Task.Run(ProcessRecords);

WriteLine("The main thread is doing other work now.");
recordProcessingTask.Wait();

static void ProcessRecords()
{
    WriteLine($"Starts processing the records...");
    for (int i = 1; i <= 5; i++)
    {
        // Varying the delay
        Thread.Sleep(i * 500);
    }
    WriteLine("All the records are processed.");
}
```

---

### خروجی (Output) 

نمونه‌ای از خروجی که جای تعجبی ندارد به این صورت است:

```
The main thread is initiating a task to process some records.
The main thread is doing other work now.
Starts processing the records...
All the records are processed.
```

---

### تحلیل (Analysis) 

همان‌طور که مشاهده می‌کنید، خط **"All the records are processed."** بعد از **مدتی قابل توجه** نمایش داده می‌شود. از دید کاربر این رفتار **گیج‌کننده** است؛ چون بعد از دیدن جمله **"Starts processing the records..."** نمی‌دانید در پس‌زمینه چه اتفاقی در حال رخ دادن است.

اینجاست که متوجه می‌شوید **گزارش پیشرفت (Progress Reporting)** می‌تواند در چنین شرایطی بسیار مفید باشد، به‌ویژه هنگام اجرای **یک Task طولانی‌مدت**.

---

### چگونه پیشرفت را گزارش کنیم؟

این موضوع کاملاً به شما بستگی دارد. به‌عنوان مثال:

* می‌توانید به‌سادگی چاپ کنید که **کدام رکورد در حال پردازش است**.
* یا می‌توانید پیشرفت را به‌صورت **درصدی** نمایش دهید، مثل:

```
completed processing: 60%
```

در مثال بعدی، می‌خواهم یک **نمونه عملی** با استفاده از **ساختارهای داخلی برای گزارش پیشرفت** به شما نشان دهم. بیایید بحث را شروع کنیم.

---

### رابط IProgress و کلاس Progress<T> 

یک رابط (**Interface**) به نام **IProgress** در فضای نام **System** وجود دارد. این رابط یک متد به نام **Report** دارد که می‌تواند به شما کمک کند پیشرفت را نمایش دهید. نمای این رابط در Visual Studio به شکل زیر است:

```csharp
public interface IProgress<in T>
{
    //
    // Summary:
    //     Reports a progress update.
    //
    // Parameters:
    //   value:
    //     The value of the updated progress.
    void Report(T value);
}
```

با استفاده از این رابط، می‌توانید یک **پیاده‌سازی سفارشی** برای گزارش پیشرفت ایجاد کنید.

همچنین یک کلاس داخلی به نام **Progress<T>** وجود دارد که **رابط IProgress** را از قبل پیاده‌سازی کرده است. بنابراین می‌توانید از این کلاس برای رسیدن به هدف خود استفاده کنید.

این کلاس یک **رویداد (Event)** به نام **ProgressChanged** ارائه می‌دهد که می‌تواند با هر به‌روزرسانی پیشرفت از کد ناهمزمان **فعال شود**.

---

### استفاده از Delegate در Progress

یک نکته جالب دیگر این است که این کلاس **Progress** دارای دو **سازنده (Constructor)** است که یکی از آن‌ها به شکل زیر است:

```csharp
public Progress(Action<T> handler);
```

این نکته به شما سرنخی می‌دهد که می‌توانید یک **Delegate** را به عنوان **پارامتر سازنده** کلاس Progress ارسال کنید. این Delegate عملاً نقش یک **Event Handler** را دارد که می‌توانید از آن برای **گزارش پیشرفت** استفاده کنید.

بیایید **کد قبلی را به‌روزرسانی کنیم** تا ببینیم این کار چگونه انجام می‌شود.

ابتدا تابع **ProcessRecords** را تغییر دادم تا بتواند **IProgress<int>** را به عنوان یک **پارامتر** دریافت کند. بیایید نسخه اصلاح‌شده این تابع را ببینیم که تغییرات کلیدی آن **پررنگ** شده است.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-1.jpeg)
</div>

### نکات مهم (POINTS TO NOTE) 

به نکات زیر توجه داشته باشید:

* برای ساده‌سازی، من از **پارامتر int** استفاده کرده‌ام.
  با این حال، شما می‌توانید انواع داده‌های دیگر را نیز انتخاب کنید.
* از آن‌جایی که **۵ رکورد** وجود دارد، بعد از پردازش هر رکورد، **درصد پیشرفت را ۲۰٪ افزایش می‌دهم**.

نمونه کد:

```csharp
static void ProcessRecords(IProgress<int> progress)
{
    WriteLine($"Starts processing the records...");
    int progressPercentage = 0;
    for (int i = 1; i <= 5; i++)
    {
        // Varying the delay
        Thread.Sleep(i * 500);
        progressPercentage += 20;
        progress.Report(progressPercentage);
    }
    WriteLine("All the records are processed.");
}
```

---

### به‌روزرسانی کد فراخوانی (Calling Code) 

برای استفاده از این تابع اصلاح‌شده، نیاز داشتم **کد فراخوانی‌کننده** را هم به‌روزرسانی کنم. بنابراین خط زیر:

```csharp
var recordProcessingTask = Task.Run(ProcessRecords);
```

را با خطوط زیر جایگزین کردم:

```csharp
IProgress<int> reportProgress = new Progress<int>(
    i => WriteLine($"Completed: {i}%")
);

var recordProcessingTask = Task.Run(() => ProcessRecords(reportProgress));
```

می‌بینید که **سازنده Progress<int>** حالا یک **Delegate** می‌پذیرد که داده‌های پیشرفت را به عنوان **پارامتر** دریافت می‌کند. این Delegate هر بار که گزارش پیشرفت ارسال می‌شود، **اجرا خواهد شد**.

---

### نمایش دوم (Demonstration 2) 

بیایید اجرای اصلاح‌شده را ببینیم:

```csharp
using static System.Console;

WriteLine("The main thread is initiating a task to process some records.");
IProgress<int> reportProgress = new Progress<int>(
    i => WriteLine($"Completed: {i}%")
);

var recordProcessingTask = Task.Run(() => ProcessRecords(reportProgress));
WriteLine("The main thread is doing other work now.");
recordProcessingTask.Wait();

// The ProcessRecords function is placed here. It is not shown again to avoid repetition.
```

**توجه:** برای مشاهده نمونه کامل، پروژه **Chapter6\_Demo2** را دانلود کنید.

---

### خروجی (Output) 

نمونه خروجی:

```
The main thread is initiating a task to process some records.
The main thread is doing other work now.
Starts processing the records...
Completed: 20%
Completed: 40%
Completed: 60%
Completed: 80%
All the records are processed.
Completed: 100%
```

همان‌طور که می‌بینید، برنامه به‌خوبی **وضعیت به‌روزرسانی پیشرفت** را چاپ می‌کند.

---

### ایجاد و اجرای Taskها به‌صورت ضمنی (Creating and Running Tasks Implicitly) 

در سطح بالا، **TPL** (Task Parallel Library) شامل بخش‌های زیر است:

* **ساختارهای موازی‌سازی Taskها (Task parallelism constructs)**
* **کلاس Parallel**

**TPL** از **موازی‌سازی داده‌ها** از طریق کلاس **Parallel** پشتیبانی می‌کند. می‌توانید **نسخه موازی حلقه for** (با استفاده از **Parallel.For**) و **حلقه foreach** (با استفاده از **Parallel.ForEach**) را در این کلاس استفاده کنید.

جزئیات کامل کلاس **Parallel** خارج از محدوده این کتاب است. با این حال، بد نیست بدانید که این کلاس یک متد مفید به نام **Invoke** دارد که به شما کمک می‌کند **چندین Task را به‌صورت هم‌زمان اجرا کنید**.

**یادداشت نویسنده:** از آن‌جایی که بخش اول (**ساختارهای موازی‌سازی Taskها**) قبلاً در این کتاب پوشش داده شده است، در این بخش به آن نمی‌پردازیم.

---

### استفاده از Parallel.Invoke 

لینک آنلاین زیر بیان می‌کند:
[https://learn.microsoft.com/en-us/previousversions/msp-n-p/ff963549(v=pandp.10)?redirectedfrom=MSDN](https://learn.microsoft.com/en-us/previousversions/msp-n-p/ff963549%28v=pandp.10%29?redirectedfrom=MSDN)

> **Parallel.Invoke** ساده‌ترین بیان الگوی Task موازی است. این متد برای هر **Delegate Method** که در آرایه **params** آن قرار دارد، **Taskهای موازی جدید** ایجاد می‌کند. متد **Invoke** زمانی برمی‌گردد که **همه Taskها تمام شده باشند**.

در زمان نگارش این کتاب، دو **بارگذاری (Overload)** برای متد موازی **Invoke** وجود دارد. در اینجا ساده‌ترین آن‌ها را در نظر می‌گیریم که به این صورت است:

```csharp
public static void Invoke(params Action[] actions);
```

می‌دانید که هنگام استفاده از این متد، می‌توانید تعداد متغیری از **Action Instance**ها را به متد **Invoke** ارسال کنید. بیایید **سه نمونه Action** بسازیم و آن‌ها را در برنامه زیر ارسال کنیم.

---

### نمایش سوم (Demonstration 3) 

نمونه کامل برنامه:

```csharp
using static System.Console;

#region Parallel.Invoke
WriteLine("Using Parallel.Invoke method.");

Action greet = new(() => WriteLine($"Task {Task.CurrentId} says: Hello reader!"));
Action printMsg = new(() => WriteLine($"Task {Task.CurrentId} says: This is a beautiful day."));
Action ask = new(() => WriteLine($"Task {Task.CurrentId} says: How are you?"));

Parallel.Invoke(greet, printMsg, ask);
WriteLine("End Parallel.Invoke");
#endregion
```

### خروجی (Output) 

نمونه خروجی اجرای **Parallel.Invoke**:

```
Using Parallel.Invoke method.
Task 3 says: Hello reader!
Task 1 says: This is a beautiful day.
Task 2 says: How are you?
End Parallel.Invoke
```

---

### پیشنهادات تکمیلی (Additional Suggestions) 

قبل از پایان این بخش، چند پیشنهاد برای شما دارم:

* برای کنترل بیشتر بر **اجرای Taskها**، بهتر است آن‌ها را به‌صورت **صریح ایجاد و اجرا کنید**.
* زمانی که این کتاب را به پایان رساندید و دانش بیشتری در مورد **برنامه‌نویسی ناهمزمان** کسب کردید، می‌توانید پست آنلاین زیر را مطالعه کنید که این رویکردها را مقایسه کرده است:
  [https://devblogs.microsoft.com/pfxteam/task-run-vs-task-factory-startnew/](https://devblogs.microsoft.com/pfxteam/task-run-vs-task-factory-startnew/)

هرچند این مقاله مدت‌ها پیش نوشته شده، همچنان مفید است. البته برای درک آن باید با **کلیدواژه‌های async و await** آشنا باشید.

---

### پرسش و پاسخ (Q\&A Session) 

**سوال ۶.۱:**
می‌بینم که **Task ۲** بعد از **Task ۳** در خروجی قبلی تمام شده است. آیا این رفتار طبیعی است؟ همچنین می‌بینم که شما منتظر اتمام Taskها نشدید. آیا این درست است؟

**پاسخ:**
بله. لینک آنلاین زیر بیان می‌کند:
[https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.parallel.invoke?view=net-9.0](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.parallel.invoke?view=net-9.0)

> این متد برای اجرای مجموعه‌ای از عملیات استفاده می‌شود، که ممکن است به‌صورت موازی اجرا شوند. **هیچ تضمینی در مورد ترتیب اجرای عملیات یا موازی بودن آن‌ها وجود ندارد**. این متد قبل از این که تمام عملیات ارائه‌شده تمام شوند (چه به‌طور عادی و چه با خطا)، **برنمی‌گردد**.

---

**سوال ۶.۲:**
به نظر می‌رسد که من می‌توانم **Taskهای جداگانه بسازم** و منتظر بمانم تا اجرای آن‌ها تمام شود، به‌جای استفاده از **Parallel.Invoke**. آیا درست است؟

**پاسخ:**
مشاهده خوبی است. لینک آنلاین زیر نیز این موضوع را تأیید می‌کند:
[https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff963549(v=pandp.10)?redirectedfrom=MSDN](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff963549%28v=pandp.10%29?redirectedfrom=MSDN)

> درونی، **Parallel.Invoke** Taskهای جدید ایجاد کرده و منتظر آن‌ها می‌ماند. این کار را با استفاده از متدهای کلاس **Task** انجام می‌دهد.

اگر به لینک بالا مراجعه کنید، متوجه می‌شوید که می‌توانم برنامه معادل زیر را بنویسم:

```csharp
using static System.Console;

Task greet2 = Task.Factory.StartNew(
    () => WriteLine($"Task {Task.CurrentId} says: Hello reader!")
);

Task printMsg2 = Task.Factory.StartNew(
    () => WriteLine($"Task {Task.CurrentId} says: This is a beautiful day.")
);

Task ask2 = Task.Factory.StartNew(
    () => WriteLine($"Task {Task.CurrentId} says: How are you?")
);

Task.WaitAll(greet2, printMsg2, ask2);
```

**نکته:** زمانی که با تعداد زیادی **Delegate** کار می‌کنید، ایجاد Taskهای جداگانه برای هرکدام و مدیریت آن‌ها **راه‌حل مناسبی نیست**. استفاده از **Parallel.Invoke** باعث راحتی و **کارایی بیشتر** در چنین مواردی می‌شود.

---

**سوال ۶.۳:**
تفاوت **موازی‌سازی داده‌ها (Data Parallelism)** و **موازی‌سازی Taskها (Task Parallelism)** چیست؟

**پاسخ:**
مایکروسافت این تفاوت را به‌خوبی این‌گونه بیان می‌کند:

> **موازی‌سازی داده‌ها** و **موازی‌سازی Taskها** دو انتهای یک طیف هستند.
> در موازی‌سازی داده‌ها، یک عملیات واحد روی **ورودی‌های متعدد** اعمال می‌شود.
> در موازی‌سازی Taskها، از **عملیات مختلف** استفاده می‌شود که هرکدام **ورودی خاص خود را دارند**.

---

### Taskهای پیش‌محاسبه‌شده (Precomputed Tasks) 

یکی از مزایای اصلی انجام عملیات **ناهمزمان (Asynchronous)**، **اجرای سریع‌تر** است. با این حال، برخی از عملیات‌ها حتی با تلاش زیاد شما همچنان **زمان‌بر** هستند. برای مقابله با این مشکل می‌توانید از **مکانیسم کش (Caching)** استفاده کنید. بیایید این موضوع را دقیق‌تر بررسی کنیم.

---

### بدون کش (Without Caching) 

برنامه زیر متدی **زمان‌بر** به نام **TimeConsumingMethod** را اجرا می‌کند. هر بار که این متد را فراخوانی می‌کنید، باید **بیش از ۳ ثانیه منتظر بمانید** تا یک عدد تصادفی تولید شود. حالا برنامه‌ای بنویسیم که این متد را چندین بار فراخوانی کند:

---

### نمایش چهارم (Demonstration 4) 

```csharp
using System.Diagnostics;
using static System.Console;

Stopwatch stopwatch = Stopwatch.StartNew();
WriteLine(Sample.TimeConsumingMethod().Result);
stopwatch.Stop();
WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} milliseconds");

stopwatch.Restart();
// Subsequent calls
WriteLine(Sample.TimeConsumingMethod().Result);
stopwatch.Stop();
WriteLine($"Elapsed time: {stopwatch.ElapsedMilliseconds} milliseconds");

class Sample
{
    static int flagValue = 0;

    public static Task<int> TimeConsumingMethod()
    {
        return Task.Run(
            () =>
            {
                WriteLine("Forming the value...");
                // Simulating a delay before forming the value
                Thread.Sleep(3000);
                flagValue = new Random().Next(0, 100);
                return flagValue;
            }
        );
    }
}
```

### خروجی (Output) 

نمونه خروجی اجرای برنامه:

```
Forming the value...
87
Elapsed time: 3092 milliseconds
Forming the value...
45
Elapsed time: 3017 milliseconds
```

---

### تحلیل (Analysis) 

می‌بینید که هر بار که **متد زمان‌بر** فراخوانی می‌شود، **بیش از ۳ ثانیه** طول می‌کشد تا یک عدد برگرداند.

---

### اعمال مکانیزم کش (Applying Caching Mechanism) 

برای بهبود برنامه می‌توانید از **مکانیزم کش (Cache)** استفاده کنید. ایده به این صورت است:
وقتی مقدار یک‌بار محاسبه شد، آن را در **کش نگه می‌داریم**؛ در نتیجه، بار بعدی که کاربر متد را فراخوانی می‌کند، همان مقدار ذخیره‌شده در کش به او برگردانده می‌شود.

در این زمینه می‌توانید از متد **Task.FromResult** استفاده کنید. این متد به شما کمک می‌کند **یک شیء Task<TResult> آماده** را برگردانید که مقدار موردنظر در ویژگی **Result** آن نگه‌داری شده است.

این روش به‌ویژه زمانی مفید است که یک عملیات **ناهمزمان (Asynchronous)** انجام می‌دهید که **Task<TResult>** برمی‌گرداند، اما نتیجه آن قبلاً در دسترس است.

---

### نمایش پنجم (Demonstration 5) 

بیایید متد زمان‌بر کلاس Sample را به شکل زیر اصلاح کنیم:

```csharp
// There is no other change in the previous code
class Sample
{
    static bool cacheFormed;
    static int flagValue = 0;

    public static Task<int> TimeConsumingMethod()
    {
        return Task.Run(() =>
        {
            if (!cacheFormed)
            {
                WriteLine("First call: forming the value...");
                // Simulating a delay before forming the value
                Thread.Sleep(3000);
                flagValue = new Random().Next(0, 100);
                cacheFormed = true;
            }
            else
            {
                WriteLine("Subsequent call(s): getting the value from the cache.");
                Task.FromResult(flagValue);
            }

            return flagValue;
        });
    }
}
```

---

### خروجی (Output) 

نمونه خروجی:

```
First call: forming the value...
42
Elapsed time: 3026 milliseconds
Subsequent call(s): getting the value from the cache.
42
Elapsed time: 1 milliseconds
```

---

### تحلیل (Analysis) 

می‌بینید که مکانیزم کش باعث شد در فراخوانی‌های بعدی **زمان پاسخ‌دهی به‌طور چشمگیری کاهش پیدا کند**.

---

### پرسش و پاسخ (Q\&A Session) 

**سوال ۶.۴:**
می‌توانید یک نمونه واقعی بگویید که در آن از **Taskهای پیش‌محاسبه‌شده (Precomputed Tasks)** استفاده کنم؟

**پاسخ:**
فرض کنید برنامه‌ای دارید که کاربر یک **URL** وارد می‌کند، سپس برنامه شروع به **دانلود داده‌ها از آن URL** برای پردازش‌های بعدی می‌کند. در این حالت، برای جلوگیری از دانلودهای تکراری، می‌توانید **URL و داده‌های مربوطه را در کش ذخیره کنید**.

---

### استفاده از TaskCompletionSource 

دیدید که **Taskها** می‌توانند به شما کمک کنند تا **کارهای پس‌زمینه** را انجام دهید. همچنین برای **مدیریت آیتم‌های کاری** مثل انجام **کارهای ادامه‌دار (Continuation Works)**، مدیریت **Taskهای فرزند (Child Tasks)** یا **مدیریت خطاها (Exceptions)** مفید هستند.

اما گاهی لازم است **کنترل بیشتری بر Taskها داشته باشید**. در چنین شرایطی، کلاس **TaskCompletionSource<TResult>** می‌تواند بسیار مفید باشد. بیایید استفاده از آن را بررسی کنیم.

کلاس **TaskCompletionSource<TResult>** به شما امکان می‌دهد **یک Task را از هر عملیاتی که قرار است در آینده کامل شود ایجاد کنید**.

مایکروسافت در لینک زیر این کلاس را این‌گونه توضیح داده است:
[https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcompletionsource-1?view=net-8.0](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcompletionsource-1?view=net-8.0)

> نماینده سمت تولیدکننده یک **Task<TResult>** است که به هیچ **Delegate** خاصی متصل نیست و **سمت مصرف‌کننده** از طریق ویژگی **Task** به آن دسترسی دارد.

به بیان ساده‌تر، در پشت‌صحنه، با استفاده از این کلاس، یک **Task وابسته (Slave Task)** دارید که می‌توانید **به‌صورت دستی آن را کامل کنید**. این قابلیت برای کارهای **I/O محور** بسیار ایده‌آل است، چون می‌توانید از **مزایای Taskها** استفاده کنید بدون این‌که **رشته فراخوانی‌کننده را مسدود کنید**.

### نحوه استفاده (How to Use?) 

حالا سؤال این است: **چطور باید از این کلاس استفاده کنیم؟**

اولین قدم این است که **یک نمونه (Instance)** از این کلاس ایجاد کنید.
به‌محض نمونه‌سازی، چند **متد داخلی (Built-in Methods)** در اختیار شما قرار می‌گیرد که می‌توانند نیازهای شما را برآورده کنند.

در تصویر زیر (نمونه اسکرین‌شات از Visual Studio) جزئیات این کلاس نشان داده شده است (شکل **6-1** را ببینید).

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-2.jpeg)
</div>

### از روی این اسکرین‌شات چه متوجه می‌شویم؟

از تصویر مشخص است که **نام متدها یا با “Set” شروع می‌شوند یا با “TrySet”**.

* **گروه اول (Set)** مقدار بازگشتی ندارد (**void**).
* **گروه دوم (TrySet)** مقدار بازگشتی بولی (**bool**) دارد.

نکات مهم درباره این متدها:

* زمانی که هرکدام از این متدها را صدا می‌زنید، **تسک وارد یکی از حالات نهایی (RanToCompletion، Faulted، یا Canceled)** می‌شود.
* متدهای گروه اول (یعنی متدهایی که با **Set** شروع می‌شوند) **باید دقیقاً یک‌بار فراخوانی شوند**؛ در غیر این صورت با **Exception** مواجه می‌شوید. (پاسخ **سوال 6.5** بیشتر توضیح می‌دهد.)

---

### **دمو 6 – TaskCompletionSource در عمل**

برای درک بهتر، این برنامه را بررسی کنید:

* در ابتدای برنامه، یک نمونه از کلاس **TaskCompletionSource<string>** به نام **tcs** ایجاد شده است. در نتیجه می‌توانیم در مراحل بعدی از ویژگی **Task** آن استفاده کنیم.
* کاربر می‌تواند با فشردن کلید **y** جزئیات عملیات پس‌زمینه را دریافت کند. اگر کلید دیگری وارد کند، برنامه بدون نمایش جزئیات پایان می‌یابد.

**کد نمونه:**

```csharp
using static System.Console;

WriteLine($"The TaskCompletionSource demo.");

TaskCompletionSource<string> tcs = new();
Task<string> collectInfoTask = tcs.Task;

// شروع یک تسک پس‌زمینه
var backgroundTask = Task.Run(() =>
{
    // عملیات پس‌زمینه (در این مثال خالی است)
});

WriteLine("Monitoring the activity before setting the result.");

// شبیه‌سازی تاخیر قبل از ست کردن نتیجه
Thread.Sleep(3000);

bool isSuccess = tcs.TrySetResult("Everything went well.");
if (isSuccess)
{
    WriteLine("\nThe result is set successfully.");
}

WriteLine("\nEnter a key (if interested, press 'y' to get the details).");
var input = ReadKey();

if (input.KeyChar == 'y')
{
    WriteLine($"\nReceived: {collectInfoTask.Result}");
}

WriteLine("\nThank you!");
```

---

### **نمونه خروجی‌ها:**

**حالت 1 (کاربر جزئیات را می‌خواهد):**

```
The TaskCompletionSource demo.
Enter a key (if interested, press 'y' to get the details).
Monitoring the activity before setting the result.
y
The result is set successfully.
Received: Everything went well.
Thank you!
```

**حالت 2 (کاربر جزئیات را نمی‌خواهد و مثلاً “n” وارد می‌کند):**

```
The TaskCompletionSource demo.
Enter a key (if interested, press 'y' to get the details).
Monitoring the activity before setting the result.
n
Thank you!
```

---

### **پرسش و پاسخ**

**سوال 6.5 – چرا گفتید متدهای Set را فقط یک‌بار باید فراخوانی کرد؟**

اگر این متدها را بیش از یک‌بار فراخوانی کنید، با Exception مواجه می‌شوید:

```csharp
tcs.SetResult("Everything went well.");
tcs.SetResult("The result is set for the second time."); // Exception!
```

**خروجی خطا:**

```
Unhandled exception. System.AggregateException:
One or more errors occurred.
(An attempt was made to transition a task to a final state when it had already completed.)
```

برای جلوگیری از این مشکل، **TrySetResult** بهتر است چون **true یا false برمی‌گرداند** و Exception نمی‌دهد.

---

**سوال 6.6 – کجا می‌توانم از TaskCompletionSource استفاده کنم؟**

یک سناریوی واقعی: فرض کنید برنامه‌ای رویدادمحور دارید که کاربر باید **اطلاعات کاربری یا Credential** وارد کند.

* اگر اطلاعات درست باشد، برنامه فعالیت کاربر را در پایگاه داده ذخیره می‌کند.
* اگر اطلاعات اشتباه باشد، برنامه **Exception** ایجاد کرده و خطا را نمایش می‌دهد.

در چنین مواردی می‌توانید از **TaskCompletionSource<TResult>** برای کنترل روند کار استفاده کنید.

### خلاصه

این فصل مطالب تکمیلی‌ای را ارائه می‌دهد که می‌تواند در برنامه‌نویسی با **Task** به شما کمک کند. پس از مطالعه این فصل، قادر خواهید بود به پرسش‌های زیر پاسخ دهید:

* **چگونه می‌توان هنگام اجرای یک وظیفه طولانی، میزان پیشرفت را گزارش کرد؟**
* **چگونه می‌توان وظایف را به‌صورت ضمنی (Implicitly) ایجاد کرد؟**
* **چگونه می‌توان از یک وظیفه از پیش محاسبه‌شده (Precomputed Task) بهره برد؟**
* **کلاس `TaskCompletionSource` چگونه می‌تواند به شما در مدیریت یک وظیفه I/O-محور کمک کند؟**

### تمرین‌ها 

دانسته‌های خود را با انجام تمرین‌های زیر بسنجید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-3.jpeg)
</div>

### یادآوری 

همان‌طور که قبلاً گفته شد، می‌توانید با خیال راحت فرض کنید که تمام **namespace**‌های لازم برای این قطعه‌کدها در دسترس هستند. این توضیح برای تمامی تمرین‌های این کتاب هم صدق می‌کند.

---

### **تمرین 6.1**

اگر کد زیر را اجرا کنید، می‌توانید خروجی را پیش‌بینی کنید؟

```csharp
using static System.Console;
TaskCompletionSource<int> tcs = new();
int value = 10;
var task1 = Task.Run(() => value++);
task1.Wait();
var task2 = Task.Run(() =>
{
    tcs.SetResult(value * 10);
});
WriteLine($"The final result is: {tcs.Task.Result}");
```

---

### **تمرین 6.2**

می‌توانید خروجی برنامه زیر را پیش‌بینی کنید؟

```csharp
using static System.Console;
var task = Task.Run(() => "Thanks God!");
string msg = string.Concat(task.Result, " What a beautiful day!");
var task2 = Task.FromResult(msg);
WriteLine(task2.Result);
```

---

### **تمرین 6.3**

می‌توانید خروجی برنامه زیر را پیش‌بینی کنید؟

```csharp
using static System.Console;
try
{
    Action greet = new(() => WriteLine($"Hello reader!"));
    Action raiseError = new(
        () => throw new Exception("There is a problem."));
    Parallel.Invoke(greet, raiseError);
}
catch (AggregateException ae)
{
    foreach (Exception ex in ae.InnerExceptions)
    {
        WriteLine(ex.Message);
    }
}
```

---

## **پاسخ تمرین‌ها** 

**تمرین 6.1**
خروجی زیر را مشاهده خواهید کرد:

```
The final result is: 110
```

 **نکته:** دقت کنید که `task1` مقدار اولیه را به **11** تغییر می‌دهد، و سپس `task2` آن را به **11×10=110** تنظیم می‌کند. دستور `Wait` برای حفظ ترتیب اجرا قرار داده شده است.

---

**تمرین 6.2**
خروجی زیر را مشاهده خواهید کرد:

```
Thanks God! What a beautiful day!
```

---

**تمرین 6.3**
خروجی زیر را مشاهده خواهید کرد:

```
Hello reader!
There is a problem.
```

 **یادداشت نویسنده:** این خروجی قابل پیش‌بینی است. چرا؟ چون همیشه پیام خطا **"There is a problem."** بعد از خط **"Hello reader!"** نمایش داده می‌شود.

لینک رسمی برای تأیید این موضوع:
[Parallel.Invoke exceptions – Microsoft Docs](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/ff963549%28v=pandp.10%29?redirectedfrom=MSDN)

متن می‌گوید:

> هر استثنایی که هنگام اجرای `Parallel.Invoke` رخ دهد، **به تعویق می‌افتد** و پس از اتمام تمام وظایف دوباره پرتاب می‌شود. تمام استثناها به‌صورت **inner exception**‌های یک نمونه‌ی **AggregateException** بازگردانده می‌شوند.
