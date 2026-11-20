---
layout: layout.njk
title: Exception Handling
---
# فصل چهارم: مدیریت استثناها (Exception Handling) 

تعجبی ندارد که وظایف (tasks) ممکن است با **استثناها (exceptions)** مواجه شوند. همچنین درست است که **وظایف مختلف ممکن است استثناهای متفاوتی** ایجاد کنند. در یک محیط **چندنخی (multithreaded)**، مدیریت این استثناها هم می‌تواند **پیچیده و چالش‌برانگیز** باشد.

برنامه شما باید به آن‌ها به‌طور **ملایم و کنترل‌شده** پاسخ دهد تا از **کرش‌های ناخواسته** جلوگیری کرده و **پایداری** خود را حفظ کند. به همین دلیل، **مدیریت استثناها برای ساخت برنامه‌های قابل اعتماد و مقاوم ضروری است**. این فصل بر روی این موضوع تمرکز دارد.

---

### درک چالش 

از آنجا که شما در حال مطالعه مفاهیم پیشرفته برنامه‌نویسی هستید، فرض می‌کنم با **مبانی استثناها و نحوه مدیریت آن‌ها در برنامه‌های C#** آشنا هستید. بنابراین، در این کتاب به **مباحث پایه‌ای پرداخته نمی‌شود**. تمرکز ما بر روی **سناریوهای استثنایی احتمالی** است که هنگام برنامه‌نویسی وظیفه‌ای در محیط چندنخی ممکن است رخ دهد.

---

### برنامه‌ای که استثنا را نشان نمی‌دهد 

اگر علائم واضح باشند، پزشک می‌تواند **مشکل بیمار را به راحتی تشخیص دهد**. اما مشکلات **مشاهده‌نشده** به سختی شناسایی می‌شوند.

همین موضوع در برنامه‌نویسی نیز صادق است: **یک استثنای مشاهده‌نشده می‌تواند مشکلات زیادی ایجاد کند**.

برای مثال، برنامه زیر را در نظر بگیرید که **نخ اصلی (main thread)** یک وظیفه ایجاد می‌کند که **استثنایی ایجاد می‌کند، اما در خروجی نمایش داده نمی‌شود**.

 توجه: بسته به تنظیمات **Visual Studio** شما، ممکن است خطی که استثنا ایجاد می‌کند، **هایلایت شود**. با این حال، اگر ادامه اجرای برنامه را با **F5 یا دکمه Continue** انجام دهید، هیچ اطلاعاتی درباره این استثنا در خروجی مشاهده نخواهید کرد.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/04/Table%204-1.jpeg)
</div>

اگر شما کاربر **Visual Studio** هستید و برنامه‌هایی می‌نویسید که با **چندین درخواست لغو (cancellation)** سر و کار دارند، لازم است نکته زیر از مایکروسافت را به یاد داشته باشید (منبع: [Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/standard/threading/how-to-listen-for-multiple-cancellation-requests)):

> زمانی که گزینه **“Just My Code”** فعال است، در برخی موارد Visual Studio روی خطی که **استثنا ایجاد می‌کند** متوقف می‌شود و پیغام خطایی نمایش می‌دهد که می‌گوید:
> “exception not handled by user code.”
> این خطا **ضرری ندارد** و می‌توانید با فشردن **F5** ادامه دهید.
> برای جلوگیری از توقف Visual Studio روی اولین خطا، کافی است گزینه **“Just My Code”** را از مسیر **Tools → Options → Debugging → General** غیرفعال کنید.

---

### مثال عملی ۱ 

بیایید برنامه زیر را اجرا کنیم:

```csharp
using static System.Console;

WriteLine("The main thread starts executing.");

try
{
    var validateUserTask = Task.Run(() =>
        throw new UnauthorizedAccessException("Unauthorized user.")
    );
}
catch (Exception e)
{
    WriteLine($"Caught error: {e.Message}");
}

WriteLine("End of the program.");
```

#### خروجی

با اجرای این برنامه، خروجی زیر مشاهده می‌شود:

```
The main thread starts executing.
End of the program.
```

> **نکته:** خروجی هیچ اطلاعاتی درباره **استثنا** نشان نمی‌دهد. چرا؟
زیرا در این برنامه، **نخ اصلی (main thread)** با استثنا مواجه نشد؛ بلکه این استثنا توسط **validateUserTask** که توسط نخ اصلی ایجاد شده بود، رخ داده است.

چون استثناهای **مشاهده‌نشده (unobserved)** می‌توانند در مراحل بعدی مشکل ایجاد کنند، بهتر است آن‌ها را مشاهده و **مدیریت** کنیم.

---

### معرفی AggregateException 

چطور می‌توان اطلاعات مربوط به استثنا را به دست آورد؟
یک روش واضح، **مدیریت استثنا در داخل همان Task** است. مثال:

```csharp
var validateUserTask = Task.Run(() =>
{
    string msg = string.Empty;
    try
    {
        throw new UnauthorizedAccessException("Unauthorized user.");
    }
    catch (Exception e)
    {
        WriteLine($"Caught error inside the task: {e.Message}");
    }
    return msg;
});
```

اما اگر **Task استثناها را مدیریت نکند**، چگونه می‌توان جزئیات خطا را دریافت کرد؟

---

### مثال عملی ۲ 

در **برنامه‌نویسی مبتنی بر Task**، استثناها **درون شیء Task ذخیره می‌شوند** و **به محض وقوع، پرتاب نمی‌شوند**.

اگر استثنایی در داخل یک Task رخ دهد، درون یک **AggregateException** قرار می‌گیرد که شامل **تمام استثناهایی است که طی اجرای آن Task ایجاد شده‌اند**.
این ویژگی به شما امکان می‌دهد تا استثناها را **به‌صورت جمعی یا جداگانه مدیریت کنید**.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/04/Table%204-2.jpeg)
</div>

 **نکته مهم**

کلاس **AggregateException** به **namespace System** تعلق دارد و از کلاس **Exception** ارث‌بری می‌کند.

AggregateException می‌تواند در هر یک از سناریوهای زیر پرتاب شود:
• وقتی که شما سعی می‌کنید **نتیجه یک Task** را دریافت کنید.
• وقتی که به‌طور صریح متد **Wait** را روی Task فراخوانی می‌کنید.
• وقتی که Task را با **await** اجرا می‌کنید (از آن‌جا که این کتاب به **async/await** نمی‌پردازد، فعلاً آن را بررسی نمی‌کنیم).

اکنون متوجه هستید که در مثال قبلی، اگر یکی از خطوط زیر را داخل **try block** استفاده کنید، می‌توانید استثنا را مشاهده کنید:

```csharp
WriteLine(validateUserTask.Result);
```

یا

```csharp
validateUserTask.Wait();
```

---

### مثال عملی 

در این نمونه، از دستور **validateUserTask.Wait();** داخل try block استفاده شده است (تغییرات با **bold** مشخص شده‌اند):

```csharp
// کد قبلی بدون تغییر
try
{
    var validateUserTask = Task.Run(() =>
        throw new UnauthorizedAccessException("Unauthorized user.")
    );
    validateUserTask.Wait(); // مشاهده استثنا
}
// بقیه کد بدون تغییر
```

#### خروجی

با اجرای مجدد برنامه، خروجی زیر مشاهده می‌شود:

```
The main thread starts executing.
Caught error: One or more errors occurred. (Unauthorized user.)
End of the program.
```

> **نکته:** حالا خطا نمایش داده می‌شود، اما اطلاعات خطا **“Unauthorized user.”** به‌عنوان یک **InnerException** در AggregateException بسته‌بندی شده است.

---

### جلسه پرسش و پاسخ 

**Q4.1** چرا اطلاعات خطا “Unauthorized user.” به‌صورت InnerException نمایش داده شد؟

این برنامه یک **AggregateException** را گرفته است، که برای **تجمیع چندین خطا** در یک شیء استثنای قابل پرتاب استفاده می‌شود. چنین استثنایی در **برنامه‌نویسی مبتنی بر Task** بسیار رایج است.

برای بررسی، می‌توانید **catch block** را به شکل زیر تغییر دهید:

```csharp
catch (Exception e)
{
    WriteLine($"Caught error: {e.Message}");
    WriteLine($"Exception name: {e.GetType().Name}");
}
```

با اجرای مجدد برنامه، خروجی به صورت زیر خواهد بود:

```
The main thread starts executing.
Caught error: One or more errors occurred. (Unauthorized user.)
Exception name: AggregateException
End of the program.
```

 همان‌طور که مشاهده می‌کنید، برنامه یک **AggregateException** را گرفته است.
مطابق مستندات رسمی مایکروسافت:

> برای بازگرداندن تمام استثناها به نخ فراخوان، زیرساخت Task آن‌ها را در یک نمونه AggregateException بسته‌بندی می‌کند.
> خاصیت **InnerExceptions** این کلاس امکان شمارش و بررسی همه استثناهای اصلی را فراهم می‌کند، تا بتوانید هر کدام را به‌صورت جداگانه مدیریت (یا نادیده) کنید.

بنابراین، همان‌طور که در خروجی قبل مشاهده شد، خطای واقعی **Unauthorized user.** به‌عنوان یک **InnerException** بسته‌بندی شده بود.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/04/Table%204-3.jpeg)
</div>

 **نکته مهم**

از آن‌جا که **AggregateException** به شما امکان می‌دهد چندین خطا یا شکست را در محیط‌های هم‌زمان تجمیع کنید، در **برنامه‌نویسی مبتنی بر Task** بسیار پرکاربرد است. از این پس، من همواره از **AggregateException** داخل بلوک‌های **catch** استفاده خواهم کرد.

---

### استراتژی‌های مدیریت استثناها 

تا این مرحله، فقط یک استثنا را مدیریت کرده‌ایم. بدیهی است که برنامه شما با چندین Task مختلف سروکار خواهد داشت و هرکدام ممکن است استثنای متفاوتی پرتاب کنند. بنابراین، بیایید روی نحوه مدیریت استثناهایی تمرکز کنیم که می‌توانند توسط یک یا چند Task ایجاد شوند.

پیش از شروع، لازم است بدانید که **مدل‌های برنامه‌نویسی مختلف** استراتژی‌های متفاوتی برای مدیریت استثنا دارند.
به عنوان مثال:

* در **Object-Oriented Programming (OOP)** معمولاً از بلوک‌های **try, catch, finally** استفاده می‌کنیم.
* اما در **Functional Programming (FP)** چنین بلوک‌هایی معمولاً وجود ندارند.

در اینجا تمرکز ما روی OOP خواهد بود و استراتژی‌ها را در دو دسته ساده می‌کنیم:
• مدیریت استثناها در یک مکان 
• مدیریت استثناها در چند مکان 

---

### مدیریت استثناها در یک مکان 

بیایید با اولین دسته شروع کنیم، یعنی **چگونگی مدیریت استثناها در یک نقطه واحد**.

#### مثال عملی – Demonstration 3 

این برنامه دو Task مختلف را داخل Thread اصلی ایجاد می‌کند و هر کدام یک استثنا پرتاب می‌کنند. در اینجا با پیمایش **InnerExceptions**، جزئیات خطا نمایش داده می‌شود:

```csharp
using static System.Console;
WriteLine("Exception handling demo.");

try
{
    var validateUserTask = Task.Run(
        () =>
        {
            // کد Task اول
        }
    );
    // سایر کدها، در صورت وجود
    throw new UnauthorizedAccessException("Unauthorized user.");

    var storeDataTask = Task.Run(
        () =>
        {
            // کد Task دوم
        }
    );
    // سایر کدها، در صورت وجود
    throw new InsufficientMemoryException("Insufficient memory.");

    Task.WaitAll(validateUserTask, storeDataTask);
}
catch (AggregateException ae)
{
    foreach (Exception e in ae.InnerExceptions)
    {
        WriteLine($"Caught error: {e.Message}");
    }
}
```

#### خروجی نمونه

```
Exception handling demo.
Caught error: Unauthorized user.
Caught error: Insufficient memory.
```

این یک روش بسیار رایج برای مدیریت استثناها در **برنامه‌نویسی مبتنی بر Task** است.

---

### روش جایگزین ۱ 

به بلوک **catch** در مثال قبل توجه کنید. در آن از **ae.InnerExceptions** برای نمایش خطاها استفاده شد.
در روش جایگزین، ابتدا **InnerExceptions** را **Flatten** می‌کنیم و سپس استثناها را پیمایش می‌کنیم:

```csharp
catch (AggregateException ae)
{
    // روش جایگزین ۱
    var exceptions = ae.Flatten().InnerExceptions;
    foreach (Exception e in exceptions)
    {
        WriteLine($"Caught error: {e.Message}");
    }
}
```

این روش به شما امکان می‌دهد تا **استثناهای تو در تو** را به صورت یک لیست مسطح بررسی کنید و به راحتی مدیریت نمایید.

### روش جایگزین ۲ 

در کلاس **AggregateException** متدی به نام **Handle** وجود دارد که شکل آن به صورت زیر است:

```csharp
public void Handle(Func<Exception, bool> predicate)
{
    // بدنه متد نمایش داده نشده است
}
```

با استفاده از این متد، می‌توانید یک **Handler** برای هر استثنای موجود در **AggregateException** فراخوانی کنید.
برای مثال، بیایید بلوک **catch** در **Demonstration 3** را به شکل زیر بازنویسی کنیم (روش‌های قبلی داخل کامنت برای مرجع سریع شما باقی مانده‌اند):

```csharp
catch (AggregateException ae)
{
    //// روش اولیه
    //foreach (Exception e in ae.InnerExceptions)
    //{
    //    
    //}

    //// روش جایگزین ۱
    //var exceptions = ae.Flatten().InnerExceptions;
    //foreach (Exception e in exceptions)
    //{
    //    
    //}

    // روش جایگزین ۲
    ae.Handle(e =>
    {
        WriteLine($"Caught error: {e.Message}");
        return true;
    });
}
```

با اجرای این برنامه، خروجی مشابه روش‌های قبلی دریافت خواهد شد.

 **نکته:** در پروژه **Chapter4\_Demo3** تمامی روش‌های مختلف که تاکنون بحث شد موجود است و کدهای جایگزین داخل کامنت برای مقایسه سریع قرار دارند. با دانلود این پروژه می‌توانید این روش‌ها را عملی کنید و تست کنید.

---

### پرسش و پاسخ 

**Q4.2:** من دو استثنا از دو Task مختلف پرتاب کرده‌ام. چگونه می‌توانم آن‌ها را از هم تشخیص دهم؟

 ساده است. می‌توانید **ID** Task یا یک پیام مناسب را در **Source** استثنا قرار دهید.
نمونه برنامه با تغییرات کوچک نسبت به **Demonstration 3**:

```csharp
using static System.Console;
WriteLine("Exception handling demo.");

try
{
    var validateUserTask = Task.Run(
        () =>
        {
            // کد Task اول
        }
    );
    throw new UnauthorizedAccessException("Unauthorized user.")
    { Source = "validateUserTask" };

    var storeDataTask = Task.Run(
        () =>
        {
            // کد Task دوم
        }
    );
    throw new InsufficientMemoryException("Insufficient memory.")
    { Source = "storeDataTask" };

    Task.WaitAll(validateUserTask, storeDataTask);
}
catch (AggregateException ae)
{
    foreach (Exception e in ae.InnerExceptions)
    {
        WriteLine($"The task: {e.Source} raised {e.GetType()}: {e.Message}");
    }
}
```

#### خروجی نمونه

```
Exception handling demo.
The task: validateUserTask raised System.UnauthorizedAccessException: Unauthorized user.
The task: storeDataTask raised System.InsufficientMemoryException: Insufficient memory.
```

**Q4.3:** آیا می‌توانم همین رویکرد را وقتی چندین Task یک استثنا مشابه پرتاب می‌کنند هم استفاده کنم؟

 بله، کاملاً درست است. این روش برای مدیریت همزمان چندین استثنا حتی از یک نوع یکسان نیز کاربرد دارد.

### مدیریت استثناها در چندین مکان 

فرض می‌کنم که تا اینجا با ایده‌ی مدیریت چندین استثنا آشنا شده‌اید. این روش کاملاً پذیرفته‌شده و احتمالاً رایج‌ترین رویکرد است.

در ادامه، روشی را نشان می‌دهم که بخشی از **AggregateException** را در یک مکان مدیریت می‌کنید و بخش باقی‌مانده را به سطح بالاتر منتقل کرده و در آنجا مدیریت می‌کنید. به بیان دیگر، می‌خواهیم اثربخشی متد **Handle** را ببینیم.

ابتدا به قطعه کد زیر توجه کنید (این کد از **Demonstration 4** گرفته شده است). این کد نشان می‌دهد که تنها می‌خواهید **InsufficientMemoryException** را در این مکان مدیریت کنید و بقیه استثناها به سلسله‌مراتب بالاتر منتقل می‌شوند. به همین دلیل **if block** مقدار **true** را بازمی‌گرداند:

```csharp
// Some code before
catch (AggregateException ae)
{
    //  Handling only InsufficientMemoryException, other
    // exceptions will be propagated up to the hierarchy
    ae.Handle(e =>
    {
        if (e is InsufficientMemoryException)
        {
            WriteLine($"Caught error inside InvokeTasks(): {e.Message}");
            return true;
        }
        else
        {
            return false;
        }
    });
}
```

---

### Demonstration 4 

در این برنامه، **Main thread** متد **InvokeTasks** را فراخوانی می‌کند که به نوبه خود سه Task ایجاد و اجرا می‌کند:

* **validateUserTask**
* **storeDataTask**
* **useDllTask** (برای بحث اضافه شده است تا نشان دهد لازم نیست تعداد مساوی Task در هر مکان داشته باشیم)

تمام استثناهای ممکن داخل **InvokeTasks** گرفته می‌شوند، اما تنها **InsufficientMemoryException** مدیریت می‌شود. بنابراین بقیه استثناها به سطح بالاتر منتقل می‌شوند و در **Main thread** مدیریت می‌شوند.

```csharp
using static System.Console;
WriteLine("Exception handling demo.");

try
{
    InvokeTasks();
}
catch (AggregateException ae)
{
    ae.Handle(e =>
    {
        WriteLine($"Caught error inside Main(): {e.Message}");
        return true;
    });
}

static void InvokeTasks()
{
    try
    {
        var validateUserTask = Task.Run(
            () =>
            {
                // Some other code, if any
                throw new UnauthorizedAccessException("Unauthorized user.");
            }
        );

        var storeDataTask = Task.Run(
            () =>
            {
                throw new InsufficientMemoryException("Insufficient memory.");
            }
        );

        var useDllTask = Task.Run(
            () =>
            {
                throw new DllNotFoundException("The required dll is missing!");
            }
        );

        Task.WaitAll(validateUserTask, storeDataTask, useDllTask);
    }
    // catch block داخل InvokeTasks برای جلوگیری از تکرار نمایش داده نشده است
}
```

 **نکته:** برای دیدن کد کامل پروژه می‌توانید از وب‌سایت **Apress** پروژه را دانلود کنید.

---

### خروجی نمونه 

```
Exception handling demo.
Caught error inside InvokeTasks(): Insufficient memory.
Caught error inside Main(): Unauthorized user.
Caught error inside Main(): The required dll is missing!
```

---

### پرسش و پاسخ 

**Q4.4:** می‌دانم که می‌توان استثناها را به روش‌های مختلف مدیریت کرد، اما آیا دستورالعمل کلی برای مدیریت استثناها در محیط‌های همزمان وجود دارد؟

 معمولاً متخصصان پیشنهاد می‌کنند اگر استثناها را داخل Task مدیریت نمی‌کنید، آن‌ها را در نزدیک‌ترین مکان به جایی که **منتظر تکمیل Task** هستید یا **نتیجه Task** را دریافت می‌کنید، مدیریت کنید. این راهنمایی را من هم رعایت می‌کنم.

---

### خلاصه فصل 

این فصل ادامه بحث **Task Programming** بود، اما این بار تمرکز بر **مدیریت استثناها** با مثال‌ها و مطالعه‌های موردی متفاوت بود. در خلاصه، پاسخ این سوالات داده شد:

* AggregateException چیست و چرا در Task Programming مهم است؟
* چگونه می‌توان استثناهای مختلف Task‌ها را نمایش داد؟
* چگونه می‌توان InnerExceptions را **Flatten** کرد؟
* چگونه می‌توان تمام استثناهای ممکن را با هم مدیریت کرد؟
* چگونه می‌توان استثناهای ممکن را در مکان‌های جداگانه مدیریت کرد؟
تمرین‌ها 

برای سنجش درک خود، سعی کنید تمرین‌های زیر را انجام دهید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/04/Table%204-4.jpeg)
</div>

یادآوری 
همان‌طور که پیش‌تر گفته شد، می‌توانید با اطمینان فرض کنید که تمام namespace‌های مورد نیاز برای این قطعات کد در دسترس هستند. این نکته برای همه تمرین‌های این کتاب نیز صدق می‌کند.

---

**تمرین‌های فصل ۴: مدیریت استثناها**

**E4.1**
اگر کد زیر را اجرا کنید، آیا می‌توانید خروجی آن را پیش‌بینی کنید؟

```csharp
using static System.Console;
WriteLine("Exercise 4.1");
try
{
    int b = 0;
    Task<int> value = Task.Run(() => 25 / b);
}
catch (Exception e)
{
    WriteLine($"Caught: {e.GetType()}, Message: {e.Message}");
}
WriteLine("End");
```

---

**E4.2**
اگر کد زیر را اجرا کنید، آیا می‌توانید خروجی آن را پیش‌بینی کنید؟

```csharp
using static System.Console;
WriteLine("Exercise 4.2 and Exercise 4.3");
try
{
    DoSomething();
}
catch (AggregateException ae)
{
    ae.Handle(
        e =>
        {
            WriteLine($"Caught inside main: {e.Message}");
            return true;
        }
    );
}

static void DoSomething()
{
    try
    {
        var task1 = Task.Run(() => throw new InvalidDataException("invalid data"));
        var task2 = Task.Run(() => throw new OutOfMemoryException("insufficient memory"));
        // For Exercise 4.2
        Task.WaitAll(task1, task2);
        // For Exercise 4.3
        // task1.Wait();
        // task2.Wait();
    }
    catch (AggregateException ae)
    {
        ae.Handle(
            e =>
            {
                if (e is InvalidDataException)
                {
                    WriteLine($"The DoSomething method encounters: {e.Message}");
                    return true;
                }
                else
                {
                    return false;
                }
            }
        );
    }
}
```

---

**E4.3**
در برنامه قبلی، خط زیر:

```csharp
Task.WaitAll(task1, task2);
```

را با خطوط زیر جایگزین کنید:

```csharp
task1.Wait();
task2.Wait();
```

آیا می‌توانید خروجی آن را پیش‌بینی کنید؟

---

**E4.4**
اگر کد زیر را اجرا کنید، آیا می‌توانید خروجی آن را پیش‌بینی کنید؟

```csharp
using static System.Console;
WriteLine("Exercise 4.4");
try
{
    int b = 0;
    var task1 = Task.Run(() => throw new InvalidOperationException("invalid operation"));
    var task2 = Task.Run(() => 5/b);
    Task.WaitAny(task1, task2);
    WriteLine("End");
}
catch (AggregateException ae)
{
    ae.Handle(e =>
    {
        if (e is InvalidOperationException || e is DivideByZeroException)
        {
            WriteLine($"Caught error: {e.Message}");
            return true;
        }
        return false;
    });
}
```

---

**E4.5**
آیا می‌توانید خروجی برنامه زیر را پیش‌بینی کنید؟

```csharp
using static System.Console;
WriteLine("Exercise 4.5");
var errorTask = Task.Run(() => throw new Exception("unwanted situation"));
var outerTask = Task.Factory.StartNew(() => errorTask);
while (!outerTask.IsCompleted) { Thread.Sleep(10); }
WriteLine($"The status of the outer task is: {outerTask.Status}");
while (!outerTask.Unwrap().IsCompleted) { Thread.Sleep(10); }
WriteLine($"The status of the inner task is: {outerTask.Unwrap().Status}");
```

راه‌حل تمرین‌ها 
در ادامه، نمونه پاسخ تمرین‌های فصل ۴ آورده شده است:

---

**E4.1**
این برنامه خروجی زیر را تولید می‌کند:

```
Exercise 4.1
End
```

 **توضیح نویسنده:** شما استثنا را مشاهده نمی‌کنید چون نخ اصلی (main thread) با آن مواجه نشده؛ استثنا توسط تسکی که این نخ ایجاد کرده بود رخ داده است.

برای مشاهده استثنا، می‌توانید بلوک `try` را به شکل زیر تغییر دهید (تغییرات با **پررنگ** نشان داده شده است):

```csharp
// There is no change in the previous code
try
{
}
int b = 0;
Task<int> value = Task.Run(() => 25 / b);
WriteLine(value.Result);  // تغییر پررنگ
// There is no change in the remaining code as well
```

خروجی برنامه پس از تغییر:

```
Exercise 4.1
Caught: System.AggregateException, Message: One or more errors occurred. (Attempted to divide by zero.)
End
```

 توجه کنید که به جای مشاهده `System.DivideByZeroException`، `System.AggregateException` دیده می‌شود. این نتیجه‌ی مورد انتظار این برنامه است.

---

**E4.2**
خروجی برنامه به شکل زیر است:

```
Exercise 4.2 and Exercise 4.3
The DoSomething method encounters: invalid data
Caught inside main: insufficient memory
```

---

**E4.3**
وقتی از `task1.Wait();` استفاده می‌کنید، `InvalidDataException` رخ می‌دهد و کنترل از بلوک `try` خارج می‌شود. خروجی به شکل زیر خواهد بود:

```
Exercise 4.2 and Exercise 4.3
The DoSomething method encounters: invalid data
```

---

**E4.4**
این برنامه خروجی زیر را تولید می‌کند:

```
Exercise 4.4
End
```

 دلیل عدم مشاهده استثناها در خروجی: وقتی از `WaitAny` استفاده می‌کنید، استثنای تسک‌ها به `AggregateException` منتقل نمی‌شود.

 پیشنهاد مطالعه: بلاگ استیفن کلری در مورد تفاوت `WaitAny` و `WaitAll`
[https://blog.stephencleary.com/2014/10/a-tour-of-task-part-5-wait.html](https://blog.stephencleary.com/2014/10/a-tour-of-task-part-5-wait.html)

خلاصه تفاوت:

* `WaitAny` فقط منتظر اولین تسک تکمیل می‌ماند و استثنا را به `AggregateException` منتقل نمی‌کند.
* باید خطاهای هر تسک را بعد از بازگشت `WaitAny` بررسی کنید.

برای مشاهده جزئیات استثنا در خروجی، بلوک `try` را به شکل زیر تغییر دهید:

```csharp
int b = 0;
var task1 = Task.Run(() => throw new InvalidOperationException("invalid operation"));
var task2 = Task.Run(() => 5 / b);
// Task.WaitAny(task1, task2);
var tasks = new[]{ task1, task2 };
int taskIndex = Task.WaitAny(tasks);
tasks[taskIndex].Wait();
WriteLine("End");
```

خروجی نمونه پس از تغییر:

```
Exercise 4.4
Caught error: invalid operation
```

---

**E4.5**
خروجی برنامه به شکل زیر است:

```
Exercise 4.5
The status of the outer task is: RanToCompletion
The status of the inner task is: Faulted
```
