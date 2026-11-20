---
layout: layout.njk
title: ایجاد و اجرای Task
---
# فصل دوم: ایجاد و اجرای Task 

این فصل به شما کمک می‌کند تا در برنامه‌نویسی Task عمیق‌تر شوید.

در این فصل، شما با روش‌های مختلف ایجاد و اجرای Task آشنا خواهید شد.

پس از اجرای یک Task، ممکن است بخواهید نتیجه آن را مشاهده کنید. این یعنی لازم است منتظر تکمیل Task شوید ⏳.

به همین دلیل، این فصل همچنین انواع مختلف مکانیزم‌های انتظار (Waiting Mechanisms) را بررسی می‌کند.

### ایجاد و اجرای یک Task 

شما می‌توانید **Task**‌ها را به روش‌های مختلفی ایجاد و اجرا کنید. فرض کنید کد زیر را داریم:

```csharp
static void DoSomeTask()
{
    // Some code
}
```

با توجه به کد بالا، بیایید رایج‌ترین روش‌های ایجاد و اجرای **Task** را بررسی کنیم:

© **Vaskaran Sarcar 2025**
**V. Sarcar, Task Programming in C# and .NET, Apress Pocket Guides,**
[https://doi.org/10.1007/979-8-8688-1279-8\_2](https://doi.org/10.1007/979-8-8688-1279-8_2)

---

### **فصل ۲ – ایجاد و اجرای Task**

#### **روش ۱:**

متد **Task.Run** روشی پیشنهادی و رایج برای ایجاد و شروع یک **Task** است. این روش به شما کمک می‌کند تا بلافاصله پس از ایجاد، **Task** به‌صورت خودکار اجرا شود. نمونه کد:

```csharp
Task task = Task.Run(DoSomeTask);
```

---

#### **روش ۲:**

برای ایجاد و اجرای خودکار یک **Task** می‌توانید از متد **Task.Factory.StartNew** هم استفاده کنید. این روش به شما امکان می‌دهد گزینه‌های پیشرفته‌تری برای پیکربندی **Task**ها اعمال کنید. نمونه کد:

```csharp
Task task = Task.Factory.StartNew(DoSomeTask);
```

---

#### **روش ۳:**

همچنین می‌توانید از **سازنده Task** استفاده کنید تا یک **Task** بسازید. اما در این حالت باید به‌طور **صریح** آن را با فراخوانی متد **Start** شروع کنید. نمونه کد:

```csharp
Task task = new Task(DoSomeTask);
task.Start();
```

از **C# 9** به بعد، می‌توانید از **target-typed new expressions** استفاده کنید تا کد ساده‌تر شود:

```csharp
Task task = new(DoSomeTask);
task.Start();
```

---

**نکته:**
شما با روش‌هایی آشنا شدید که به‌صورت صریح **Task** ایجاد و اجرا می‌کنند. اما روش‌های دیگری هم وجود دارد. برای مثال:

* می‌توانید **Task**ها را به‌صورت **ضمنی** با استفاده از متد **Parallel.Invoke** ایجاد و اجرا کنید.
* همچنین کلاس **TaskCompletionSource<TResult>** به شما کمک می‌کند **Task**های ویژه و مناسب برای سناریوهای خاص ایجاد کنید.

با این حال، بهتر است این مفاهیم را گام‌به‌گام یاد بگیریم.

---

### **کپسوله کردن کد با استفاده از Lambda Expression** 

شما می‌توانید با ارائه یک **delegate** که کد موردنظر را کپسوله می‌کند، یک **Task** بسازید. این **delegate** می‌تواند به صورت یک **delegate نام‌گذاری‌شده**، یک **متد ناشناس** یا یک **lambda expression** بیان شود.

در اینجا نمونه‌ای از یک **Task** دیگر ارائه شده است که در آن کد لازم را درون یک **lambda expression** قرار داده‌ایم:

```csharp
Task task = Task.Run(
    () =>
    {
    }
);
```

---

### **نمایش ۱** 

بیایید بررسی کنیم که آیا **Task**‌ها به ما کمک می‌کنند **برنامه‌نویسی غیرهمزمان (Asynchronous Programming)** انجام دهیم یا خیر. برای این منظور از نمایش زیر استفاده می‌کنیم:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-1.jpeg)
</div>

### **نکته‌ای برای یادآوری** 

از **.NET 6** به بعد، ممکن است متوجه وجود **implicit global directives** برای پروژه‌های جدید **C#** شوید. این قابلیت کمک می‌کند بدون نیاز به نوشتن نام کامل یا اضافه کردن دستی دستور **using**، از انواع موجود در این **namespace**ها استفاده کنید.
می‌توانید اطلاعات بیشتر را از لینک زیر مطالعه کنید:
[https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview#implicit-usingdirectives](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/overview#implicit-usingdirectives)

در پروژه‌های **C#** این کتاب، من تنظیمات پیش‌فرض را تغییر نداده‌ام. بنابراین، نام‌های زیر را به‌صورت دستی ذکر نکرده‌ام، چون به‌طور پیش‌فرض موجود هستند:

```
System
System.Collections.Generic
System.IO
System.Linq
System.Net.Http
System.Threading
System.Threading.Tasks
using static System.Console;
```

---

### **نمونه کد** 

```csharp
WriteLine("The main thread starts executing.");
Task.Run(PrintNumbers);
WriteLine($"The main thread is doing some other work...");
// Simulating a delay
Thread.Sleep(10);
WriteLine($"The main thread is completed.");
ReadKey();

static void PrintNumbers()
{
    for (int i = 1; i <= 5; i++)
    {
        Write($" {i}\t");
        // Simulating a delay
        Thread.Sleep(2);
    }
}
```

---

### **خروجی** 

در ادامه، یک خروجی نمونه از این برنامه را که در سیستم من اجرا شده، مشاهده می‌کنید. بدیهی است که ممکن است خروجی در سیستم شما متفاوت باشد. همان‌طور که می‌بینید، **main thread** در حین اجرای **task** چاپ اعداد، **مسدود نشده است**. نتیجه، ترکیبی جالب از خروجی چند **thread/task** است:

```
The main thread starts executing.
The main thread is doing some other work...
1
2
4
5
3
The main thread is completed.
```

---

### **جلسه پرسش و پاسخ (Q\&A Session)** 

**سوال 2.1**
برای ایجاد و اجرای **Task** شما از متدهای **Run**، **Start** و **StartNew** استفاده کردید. چطور تصمیم بگیریم کدام‌یک برای ما مناسب‌تر است؟

**پاسخ:**
اگر تعاریف این متدها را در **Visual Studio** بررسی کنید، جمله زیر را خواهید دید:

> “The Start method starts the System.Threading.Tasks.Task, scheduling it for execution to the specified System.Threading.Tasks.TaskScheduler.”

این متد زمانی مفید است که بخواهید **Task** را بسته به یک شرط خاص، **به‌صورت دستی** اجرا کنید.

متد **Run**، کار مشخص‌شده را در **thread pool** قرار می‌دهد و یک شیء **System.Threading.Tasks.Task** را که نشان‌دهنده همان کار است، برمی‌گرداند. این روش یک جایگزین سبک‌تر نسبت به **StartNew** است و به شما کمک می‌کند تا با مقادیر پیش‌فرض یک **Task** را شروع کنید.

نکته مهم این است که متد **Run** از **task scheduler پیش‌فرض** استفاده می‌کند، صرف‌نظر از اینکه **task scheduler** فعلی چه چیزی باشد. به همین دلیل، **Microsoft** (در لینک [Task-based asynchronous programming](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)) پیشنهادات زیر را ارائه کرده است:

* زمانی که نیازی به کنترل زیاد بر فرآیند ایجاد و زمان‌بندی **Task** ندارید، **Run** بهترین گزینه برای ایجاد و شروع **Task** است.

---

**مایکروسافت همچنین بیان می‌کند** (در همان لینک) که متد **StartNew** در شرایط زیر کاربرد دارد:

* زمانی که **ایجاد و زمان‌بندی Task** نباید از هم جدا باشند و شما به گزینه‌های اضافی برای ایجاد **Task** یا استفاده از یک **scheduler خاص** نیاز دارید.
* زمانی که باید یک **وضعیت اضافی (state)** را به **Task** ارسال کنید که بعداً از طریق ویژگی **Task.AsyncState** قابل بازیابی باشد.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-2.jpeg)
</div>

### **نکته‌ای که باید به خاطر بسپارید** 

برای اینکه یک مثال مشخص داشته باشیم، باید بدانید که به‌زودی درباره **child tasks (یا nested tasks)** یاد خواهید گرفت. در آنجا خواهید دید که با استفاده از گزینه **TaskCreationOptions.AttachedToParent** می‌توانید یک **task فرزند** را به **task والد** متصل کنید (البته اگر **task والد** این کار را مجاز بداند). این گزینه در برخی از **overload**های متد **StartNew** در دسترس است.
اما متد **Run** چنین گزینه‌ای را ارائه نمی‌دهد.

---

### **ارسال و دریافت مقادیر** 

در این بخش بررسی می‌کنیم که چگونه می‌توانید **مقدار(ها)** را به یک **task** ارسال کنید یا یک مقدار محاسبه‌شده را از آن دریافت کنید.

---

### **ارسال مقادیر به داخل Tasks** 

در **نمایش ۱**، متد **PrintNumbers** اعداد را از **۱ تا ۵** چاپ می‌کرد. بیایید این تابع را تغییر دهیم تا بتواند **آرگومان** دریافت کند. در ادامه، نسخه اصلاح‌شده این تابع با تغییرات کلیدی (پررنگ‌شده):

```csharp
static void PrintNumbers(int limit)
{
    for (int i = 1; i <= limit; i++)
    {
        Write($" {i}\t");
        // Simulating a delay
        Thread.Sleep(2);
    }
}
```

---

اگر بخواهید این تابع را در یک **thread** جداگانه اجرا کنید، باید یک آرگومان معتبر (برای پارامتر **limit**) از **thread فراخواننده** ارسال کنید.
بنابراین، خط زیر از **نمایش ۱** را:

```csharp
Task task = Task.Run(PrintNumbers);
```

با خط زیر جایگزین کنید:

```csharp
Task task = Task.Run(() => PrintNumbers(5));
```

---

اکنون اگر برنامه را دوباره اجرا کنید، خروجی مشابهی خواهید دید که در اجرای **نمایش ۱** دیده بودید.

لازم نیست یادآوری کنم که می‌توانید خط قبلی را با خط زیر هم جایگزین کنید:

```csharp
Task task = Task.Factory.StartNew(() => PrintNumbers(5));
```

یا این خطوط:

```csharp
Task task = new(() => PrintNumbers(5));
task.Start();
```

---

بیایید یک رویکرد جایگزین را بررسی کنیم. در زمان نگارش این کتاب، کلاس **Task** دارای سازنده‌های زیر است (شکل ۲-۱ را ببینید).

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-3.jpeg)
</div>

### **شکل ۲-۱. نمای جزئی از نسخه‌های Overload شده سازنده‌های Task** 

به سازنده زیر که در **شکل ۲-۱** برجسته شده، توجه کنید:

```csharp
public Task(Action<object?> action, object? state);
```

این سازنده به شما این ایده را می‌دهد که می‌توانید یک **آرگومان شیء (object)** به آن ارسال کنید.
بیایید یک تابع جدید به نام **PrintNumbersVersion2** معرفی کنیم که یک **پارامتر از نوع object** می‌گیرد و کار مشابهی انجام می‌دهد:

```csharp
static void PrintNumbersVersion2(object? state)
{
    int limit = Convert.ToInt32(state);
    for (int i = 0; i <= limit; i++)
    {
        Write($" {i}\t");
        // Doing remaining things, if any
        Thread.Sleep(2);
    }
}
```

---

این بار می‌توانید چیزی شبیه به این بنویسید:

```csharp
Task task = new(PrintNumbersVersion2, 5);
task.Start();
```

یا:

```csharp
Task task = Task.Factory.StartNew(PrintNumbersVersion2, 5);
```

اما **متد Run** چنین سازنده‌ای ندارد. بنابراین نمی‌توانید چیزی مانند زیر بنویسید:

```csharp
Task task4 = Task.Run(PrintNumbersVersion2, 5); // Error
```

---

خب، تا اینجا روش‌های مختلف ارسال **state** را دیدید. بیایید آن‌ها را خلاصه کنیم:

```csharp
// Approach-1:
var task1 = Task.Run(() => PrintNumbers(10));

// Approach-2:
var task2 = Task.Factory.StartNew(() => PrintNumbers(10));

// Approach-3:
var task3 = new Task(() => PrintNumbers(10));
task3.Start();

// Approach-4:
var task4 = new Task(PrintNumbersVersion2, 10);
task4.Start();

// Approach-5:
var task5 = Task.Factory.StartNew(PrintNumbersVersion2, 10);
```

---

می‌بینید که در هر روش، من یک مقدار **int** ارسال کرده‌ام. با این حال، در دو مورد آخر، متد هدف (**PrintNumbersVersion2**) انتظار یک **object** داشت.
در نتیجه، این دو روش با مسأله **boxing** و **unboxing** مواجه می‌شوند. در مقابل، این دو روش نسبت به روش‌های ۱، ۲ یا ۳ **خواناتر و مرتب‌تر** هستند.

در نهایت، انتخاب با شماست که کدام روش را ترجیح دهید و چگونه آن را سازمان‌دهی کنید.

---

**نکته:**
برای تجربه این روش‌ها، پروژه **Chapter2\_Demo2A\_PassingValues** را دانلود کنید و آن‌ها را اجرا کنید.

---

### **برگرداندن مقادیر از Taskها** 

وقتی یک **Task** را اجرا می‌کنید، ممکن است نیاز داشته باشید به **مقدار نهایی** آن دسترسی داشته باشید.
در چنین شرایطی باید از **نسخه جنریک کلاس Task** و ویژگی **Result** استفاده کنید.

در اینجا یک نمونه کد:

```csharp
var task = Task<string>.Run(() => "Hello");
var result = task.Result;
WriteLine(result);
```

---

با این حال، **نوع جنریک** می‌تواند به‌طور خودکار **استنتاج (inferred)** شود. در نتیجه، می‌توانید این کد را ساده‌تر هم بنویسید:

```csharp
var task = Task.Run(() => "Hello");
var result = task.Result;
WriteLine(result);
```

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-4.jpeg)
</div>

### **نکته‌ای که باید به خاطر بسپارید** 

در بخش‌های قبلی، من برای **کاهش تایپ** از **var** استفاده کردم. در ادامه یک نمونه کد معادل که **انواع به‌صورت صریح مشخص شده‌اند** را می‌بینید:

```csharp
Task<string> task = Task.Run(() => "Hello");
string result = task.Result;
WriteLine(result);
```

---

### **نمایش ۲** 

بیایید یک برنامه کامل ببینیم که در آن **Taskها ساخته می‌شوند، مقادیری به آن‌ها ارسال می‌شود و در نهایت مقدار محاسبه‌شده بازیابی می‌گردد.**

در نمایش زیر، من یک **Task** ایجاد می‌کنم که دو عدد صحیح (**۱۰** و **۲۰**) را با هم جمع می‌کند. وقتی این **Task** تمام شد، نتیجه محاسبه را بازیابی کرده و در پنجره **کنسول** نمایش می‌دهم. حالا برنامه کامل را ببینیم:

```csharp
using static System.Console;
static int Add(int number1, int number2) => number1 + number2;

WriteLine("Passing and returning values by executing tasks.");
int firstNumber = 10;
int SecondNumber = 20;

var addTask = Task.Run(() => Add(firstNumber, SecondNumber));
var result = addTask.Result;

WriteLine($"{firstNumber}+{SecondNumber}={result}");
WriteLine($"The main thread is completed.");
```

---

### **خروجی** 

```
Passing and returning values by executing tasks.
10+20=30
The main thread is completed.
```

---

### **جلسه پرسش و پاسخ (Q\&A Session)** 

**سوال 2.2**
می‌بینم که در نمایش قبلی، از متد **ReadKey** برای جلوگیری از بسته‌شدن برنامه **Console** استفاده نکردید. این عمدی بود؟

**پاسخ:**
وقتی می‌خواهید از یک **Task** نتیجه بگیرید، باید **صبر کنید** تا آن **Task** اجرای خود را کامل کند. یعنی باید یک عملیات **مسدودکننده (blocking)** انجام دهید.
با استفاده از ویژگی **Result**، من دقیقاً همین کار را کردم: **thread فراخواننده** را مسدود کردم تا **Task فراخوانی‌شده** اجرا و تمام شود.
بنابراین دیگر نیازی به هیچ ساختار **مسدودکننده** اضافی نبود.

**یادداشت نویسنده:**
نمونه‌های **Task** همچنین می‌توانند از متد **Wait** برای اتمام اجرای **Task** استفاده کنند. به‌زودی بحثی درباره **مکانیزم‌های مختلف انتظار (waiting mechanisms)** خواهیم داشت.

---

### **درک مشکل در نمایش ۲** 

توجه کنید که در خروجی قبلی، خط **"The main thread is completed."** در انتهای خروجی ظاهر شد.
اگر برنامه را چندین بار اجرا کنید، همیشه همین نتیجه را مشاهده می‌کنید. دلیلش این است که با فراخوانی ویژگی **Result**، من **main thread** را مجبور کردم تا منتظر اتمام **addTask** بماند.
در نتیجه، نتوانستیم از **مزایای کامل برنامه‌نویسی غیرهمزمان (asynchronous programming)** استفاده کنیم. همین مشکل زمانی که از متد **Wait** هم استفاده کنید رخ می‌دهد.

---

### **جلسه پرسش و پاسخ (Q\&A Session)** 

**سوال 2.3**
متوجه شدم که با استفاده از فراخوانی‌های مسدودکننده مانند:

```csharp
var result = addTask.Result;
```

یا

```csharp
addTask.Wait();
```

شما در واقع کد را **همزمان (synchronous)** می‌کنید. پس چرا برنامه‌ای نشان دادید که از این فراخوانی‌های مسدودکننده استفاده می‌کند؟

**پاسخ:**
می‌خواستم شما از وجود چنین قابلیتی آگاه باشید. علاوه بر این، مواقعی پیش می‌آید که **تا زمانی که نتیجه یک Task به دست نیاید، نمی‌توانید ادامه دهید**. در چنین شرایطی نمی‌توانید از فراخوانی‌های مسدودکننده اجتناب کنید (در **نمایش ۳** به این موضوع اشاره خواهیم کرد).

پس اگر تصمیم به استفاده از این روش‌ها گرفتید، سعی کنید ابتدا سایر کدهایی که می‌توانند **به‌صورت غیرهمزمان اجرا شوند** را اجرا کنید، سپس از این فراخوانی‌ها استفاده نمایید.
اما نگران نباشید! به‌زودی بحثی درباره **فراخوانی‌های غیرمسدودکننده (nonblocking calls)** نیز خواهیم داشت.

---

### **بحث درباره انتظار (Waiting)** ⏳

روش‌های مختلفی برای **منتظر ماندن (waiting)** در سیستم وجود دارد. در این بخش، می‌خواهیم ضرورت **انتظار** را بررسی کنیم و چند روش کاربردی برای پیاده‌سازی این ایده معرفی کنیم.

> **نکته:** برای به دست آوردن نتیجه اجرای یک Task، اگر **thread فراخواننده را مسدود کنید**، از مزایای **برنامه‌نویسی غیرهمزمان** استفاده نکرده‌اید. بنابراین مهم است که برنامه خود را **به‌درستی طراحی کنید**.

---

### **چرا منتظر می‌مانیم؟** 

وقتی یک Task را اجرا می‌کنید، ممکن است بخواهید نتیجه آن را دریافت کنید.
این یعنی باید منتظر بمانید تا Task اجرای خود را کامل کند. نمایش زیر این موضوع را روشن‌تر می‌کند:

---

### **نمایش ۳** 

در برنامه زیر، **thread فراخواننده (main thread)** دو **Task متفاوت** را فراخوانی می‌کند.
بیایید برنامه را اجرا کنیم و برخی از خروجی‌های ممکن را تحلیل کنیم:

```csharp
using static System.Console;

WriteLine("The main thread starts.");

var printLuckyNumberTask = Task.Run(
    () =>
    {
    }
);

WriteLine("Wait for your lucky number...");
// Simulating a delay
Thread.Sleep(1);
WriteLine($"---Your lucky number is: {new Random().Next(1,10)}");

var processOrderTask = Task.Run(
    () =>
    {
    }
);

WriteLine("Processing an order...");
// Simulating a delay
Thread.Sleep(200);
WriteLine($"---Your order is processed.");

WriteLine("The end of main.");
```

---

### **خروجی‌ها** 

در ادامه، چند نمونه خروجی از اجرای این برنامه روی سیستم من آورده شده است:

**خروجی ۱:**

```
The main thread starts.
The end of main.
```

**خروجی ۲:**

```
The main thread starts.
The end of main.
Processing an order...
Wait for your lucky number...
```

---

### **تحلیل** 

این خروجی‌ها نشان‌دهنده ویژگی‌های زیر هستند:

* **thread اصلی (main thread)** قبل از اینکه **printLuckyNumberTask** و **processOrderTask** اجرای خود را به پایان برسانند، تمام شده است.
* هیچ‌یک از خروجی‌ها نشان نمی‌دهند که Taskهای فراخوانی‌شده کارشان را کامل کرده‌اند یا نه.

---

### **چگونه منتظر بمانیم؟** ⏱

می‌دانید که برای مشاهده وضعیت نهایی این Taskها، باید کمی بیشتر صبر کنید.
اما **چگونه باید منتظر بمانیم؟** روش‌های مختلفی وجود دارد که در ادامه با برخی از آن‌ها آشنا می‌شویم.

---

### **استفاده از Sleep** 

شاید ساده‌ترین راه این باشد که **thread اصلی را مسدود کنید** تا Taskهای دیگر تمام شوند.
در ادامه یک نمونه آورده شده است که در آن **thread اصلی را به مدت 1000 میلی‌ثانیه مسدود کرده‌ایم**:

```csharp
// The previous code is the same
Thread.Sleep(1000);
WriteLine("The end of main.");
```

---

> **نکته:** می‌توانید پروژه **Chapter2\_discussiononWaiting** را از وب‌سایت **apress** دانلود کنید تا همه بخش‌های برنامه‌های مطرح‌شده در این قسمت را اجرا و بررسی کنید.

---
این یک خط کد اضافی احتمال مشاهده خروجی‌ای را افزایش می‌دهد که نشان دهد **این دو Task** اجرای خود را قبل از اینکه کنترل از **main thread** خارج شود، به پایان رسانده‌اند. یک خروجی ممکن به صورت زیر است:

```
The main thread starts.
Processing an order...
Wait for your lucky number...---Your lucky number is: 3---Your order is processed.
The end of main.
```

مزیت استفاده از این روش واضح است. می‌بینیم که وقتی **main thread** در حالت **sleep** است، سایر **Task**ها می‌توانند کار خود را انجام دهند. این نشان می‌دهد که در طول **sleep**، **scheduler** می‌تواند سایر Taskها را زمان‌بندی کند.

اما در مقابل، این روش یک مشکل آشکار دارد: ممکن است **thread** را برای مدت زمان اضافی و غیرضروری مسدود کنید. به عنوان مثال، در سیستم من اگر **main thread** را برای ۵۰۰ میلی‌ثانیه یا کمتر مسدود کنم، خروجی مشابهی مشاهده می‌کنم (می‌گویم “مشابه” نه “همان” زیرا عدد تصادفی تولیدشده همیشه متفاوت است که رفتار طبیعی این برنامه است). مشکل این است که چون نمی‌توانیم **زمان دقیق تکمیل Taskها** را پیش‌بینی کنیم، باید آن را برای **زمان مناسبی مسدود کنیم**. بنابراین اگر هر یک از این Taskها به دلیل عوامل دیگر زمان بیشتری برای اتمام نیاز داشته باشند، ممکن است پیام تکمیل Task در خروجی نمایش داده نشود. این یک مشکل واقعی است!

نه می‌خواهیم **انتظار غیرضروری** داشته باشیم و نه می‌خواهیم **هیچ اطلاعات کلیدی** را از دست بدهیم. از این منظر، این روش **غیرکارآمد** است. در واقع، وضعیت می‌تواند بدتر شود اگر روی برنامه‌ای کار کنید که سعی در مسدود کردن **UI** دارد. به همین دلیل، تکیه بر متد **Sleep** همیشه ایده خوبی نیست.

---

### **استفاده از Delay** ⏱

در کد قبلی، بیایید دستور زیر را:

```csharp
Thread.Sleep(1000);
```

در **main thread** با **Task.Delay(1000);** جایگزین کنیم:

```csharp
// The previous code is the same
Task.Delay(1000);
WriteLine("The end of main.");
```

و برنامه را دوباره اجرا کنیم. باز هم، سیستم من خروجی‌های مختلفی نشان می‌دهد، یکی از آن‌ها به صورت زیر است:

```
The main thread starts.
Processing an order...
The end of main.
Wait for your lucky number...
```

این خروجی نشان می‌دهد که **thread فراخواننده** برای اجرای **printLuckyNumberTask** و **processOrderTask** مسدود نشده است. بنابراین، می‌بینید که خط **“The end of main.”** قبل از پردازش سفارش یا نمایش عدد شانس ظاهر شده است.

این به شما نکته‌ای می‌دهد:

* برای **pauseهای همزمان (synchronous pauses)** از **Sleep** استفاده کنید.
* برای **تأخیرهای غیرمسدودکننده (nonblocking delays)** روش **Delay** را ترجیح دهید.
  استفاده از **Delay** به شما کمک می‌کند **UI پاسخگوتر** باشد.

در واقع، **Visual Studio IDE** نیز به شما این نکته را گوشزد می‌کند. توضیح می‌دهم:
وقتی بیشتر درباره **برنامه‌نویسی غیرهمزمان (asynchronous programming)** یاد بگیرید، خواهید فهمید که استفاده از کلیدواژه‌های **async** و **await** کار را ساده می‌کند.
سپس می‌توانید چیزی شبیه زیر بنویسید:

```csharp
await Task.Delay(1000);
```

اما اگر از **await** استفاده نکنید و فقط بنویسید:

```csharp
Task.Delay(1000);
```

پیام هشدار زیر را مشاهده خواهید کرد:

```
CS4014 Because this call is not awaited, execution of the current 
method continues before the call is completed. Consider applying the ‘await’ operator to the result of the call.
```

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-5.jpeg)
</div>

### **بیشتر درباره Sleep و Delay** ⏱

وقتی از متد **Delay** استفاده می‌کنید، می‌توانید آن را به یک **Task** اختصاص دهید و در زمان بعدی با **await** منتظر بمانید:

```csharp
Task task = Task.Delay(1000);
// انجام کارهای دیگر در اینجا
await task;
```

علاوه بر این، متد **Delay** دارای **Overloadهای مختلفی** است و بسیاری از آن‌ها پارامتری به نام **CancellationToken** می‌پذیرند (در فصل بعدی به این موضوع پرداخته می‌شود). با استفاده از این پارامتر، می‌توانید **از قطع ناگهانی thread جلوگیری کرده و آن را به‌صورت مرتب خاتمه دهید**.

---

### **استفاده از ReadKey() یا ReadLine()** ⌨

گاهی اوقات می‌بینید که در برنامه از **ReadKey()، Read() یا ReadLine()** استفاده شده است.
ایده اصلی این روش‌ها **مسدود کردن کنترل اجرای برنامه** تا زمانی است که کاربر ورودی موردنظر را ارائه دهد.
به عنوان مثال، می‌توانید صبر کنید تا **printLuckyNumberTask** و **processOrderTask** اجرای خود را کامل کنند، سپس با فشار دادن یک کلید از کیبورد، خروجی نهایی را دریافت کنید.

نمونه کد:

```csharp
// The previous code is the same
ReadKey();
WriteLine("The end of main");
```

---

### **استفاده از Wait** ⏳

**نمایش ۲** نشان داد که با استفاده از ویژگی **Result** می‌توانید **thread فراخواننده** را تا تکمیل Task مسدود کنید.
با این حال، در همه سناریوها نیازی نیست که **نتیجه اجرای Task** را تحلیل کنید.
در واقع، ممکن است یک Task **مقداری بازنگرداند**.

بیایید یک تکنیک دیگر برای انتظار را بررسی کنیم:

با فراخوانی متد **Wait** روی یک نمونه Task، می‌توانید تا **تکمیل آن Task** صبر کنید.
نمونه‌ای که در آن **Wait** را به صورت جداگانه روی **printLuckyNumberTask** و **processOrderTask** فراخوانی می‌کنیم:

```csharp
// The previous code is the same
printLuckyNumberTask.Wait();
processOrderTask.Wait();
WriteLine("The end of main.");
```

این تغییر باعث می‌شود که **هر دو Task** اجرای خود را کامل کنند.

---

### **استفاده از WaitAll** 

به جای اینکه منتظر تکمیل **Taskهای جداگانه** بمانید، می‌توانید منتظر **گروهی از Taskها** شوید.
در این حالت، از متد **WaitAll** استفاده می‌کنید و **Taskها**یی که می‌خواهید برای آن‌ها منتظر بمانید را به عنوان پارامتر می‌دهید:

```csharp
// The previous code is the same
Task.WaitAll(printLuckyNumberTask, processOrderTask);
WriteLine("The end of main.");
```

این تغییر نیز می‌تواند خروجی‌ای تولید کند که نشان دهد **هر دو Task اجرای خود را کامل کرده‌اند**.

---

### **استفاده از WaitAny** 

فرض کنید چندین Task دارید، اما می‌خواهید منتظر شوید تا **هرکدام از آن‌ها** که زودتر تمام شد، ادامه دهید.
در این حالت از متد **WaitAny** استفاده می‌کنید:

```csharp
// The previous code is the same
Task.WaitAny(printLuckyNumberTask, processOrderTask);
WriteLine("The end of main.");
```

نمونه خروجی:

```
The main thread starts.
Wait for your lucky number...
Processing an order...---Your lucky number is: 2
The end of main.
```

این خروجی نشان می‌دهد که این بار **main thread** منتظر تکمیل **processOrderTask** نمانده است.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-6.jpeg)
</div>

### **نکات مهم** 

این متدها دارای **Overloadهای مختلفی** هستند.
به عنوان مثال، در زمان نگارش این متن، متد **Wait** دارای شش **Overload** متفاوت است.
با استفاده از این نسخه‌های **Overloaded** می‌توانید **حداکثر زمان انتظار**، یک نمونه **CancellationToken** یا هر دو را مشخص کنید تا در حین انتظار آن‌ها را پایش کنید.

---

### **استفاده از WhenAny** 

به خروجی قبلی دوباره نگاه کنید. می‌بینید که خط **“The end of main.”** بعد از تکمیل حداقل یکی از Taskها ظاهر شده است.
اگر برنامه را چندین بار اجرا کنید، هیچگاه این خط **قبل از اتمام حداقل یکی از Taskها** ظاهر نمی‌شود.
علت این است که در حالت **WaitAny**، **thread فراخواننده** تا تکمیل هرکدام از Taskها **مسدود می‌شود**.

جالب است بدانید که متدی دیگر به نام **WhenAny** وجود دارد که **thread فراخواننده را مسدود نمی‌کند**.

نمونه کد جایگزین **WaitAny با WhenAny**:

```csharp
// The previous code is the same
Task.WhenAny(printLuckyNumberTask, processOrderTask);
WriteLine("The end of main.");
```

نمونه خروجی پس از این تغییر:

```
The main thread starts.
The end of main.
Processing an order...
Wait for your lucky number...
```

همان‌طور که مشاهده می‌کنید، در این حالت **main thread مسدود نشده است**.

---

### **انتظار برای لغو (Waiting For Cancellation)** 

گاهی اوقات لازم است برای **لغو احتمالی Taskها** آماده باشید.
در چنین شرایطی نیاز به **CancellationToken** دارید.
با توجه به اهمیت و گستردگی این موضوع، در فصل جداگانه‌ای (فصل ۵) به آن پرداخته شده است.

---

### **جلسه پرسش و پاسخ (Q\&A Session)** 

**سوال 2.4**
در بعضی بلاگ‌ها یا مقالات، می‌بینم به جای **Thread.Sleep** از **Thread.SpinWait** استفاده می‌کنند. تفاوت این دو چیست؟

**پاسخ:**
متد **SpinWait** برای پیاده‌سازی **Locks** مفید است اما برای برنامه‌های معمولی کاربرد ندارد.
وقتی از **SpinWait** استفاده می‌کنید، **scheduler** کنترل را به Taskهای دیگر منتقل نمی‌کند، یعنی **از تغییر context جلوگیری می‌شود**.

لینک رسمی: [SpinWait](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread.spinwait?view=net-9.0)

> در موارد نادری که جلوگیری از **context switch** مفید است، مثلاً وقتی تغییر وضعیت قریب‌الوقوع است، در حلقه خود از **SpinWait** استفاده کنید.
> کد **SpinWait** برای جلوگیری از مشکلاتی که در کامپیوترهای چندپردازنده رخ می‌دهد طراحی شده است.
> به عنوان مثال، در کامپیوترهای با چند پردازنده **Intel** که از تکنولوژی **Hyper-Threading** استفاده می‌کنند، **SpinWait** از **starvation پردازنده** در شرایط خاص جلوگیری می‌کند.

---

> **نکته:** کلاس‌های .NET Framework مانند **Monitor** یا **ReaderWriterLock** به صورت داخلی از **SpinWait** استفاده می‌کنند.
> با این حال، به جای استفاده مستقیم از این متد، **Microsoft توصیه می‌کند از کلاس‌های همگام‌سازی داخلی** استفاده کنید.
> همچنین توصیه می‌کنم از این روش استفاده نکنید، زیرا **SpinWait** یک عدد صحیح به عنوان پارامتر می‌پذیرد که تعداد تکرار حلقه CPU را مشخص می‌کند. در نتیجه، **زمان انتظار به سرعت پردازنده وابسته است**.

---

می‌توانید از متد **SpinUntil** نیز استفاده کنید. در زمان نگارش این متن، این متد سه **Overload** دارد:

* `SpinUntil(Func<Boolean>)`
* `SpinUntil(Func<Boolean>, Int32)`
* `SpinUntil(Func<Boolean>, TimeSpan)`

نمونه‌ای از ساده‌ترین نسخه که تا برآورده شدن یک شرط خاص **چرخش می‌کند**:

```csharp
// Previous code is the same. You can see it by downloading
// the Chapter2_DiscussionOnWaiting project
SpinWait.SpinUntil(() =>
    printLuckyNumberTask.Status == TaskStatus.RanToCompletion
);
WriteLine("The end of main.");
```

نمونه خروجی پس از این تغییر:

```
The main thread starts.
Processing an order...
Wait for your lucky number...---Your lucky number is: 8
The end of main.
```

توجه داشته باشید که این بار خروجی نشان می‌دهد **printLuckyNumberTask اجرای خود را کامل کرده است**، اما مشخص نمی‌کند که **processOrderTask** اجرا شده یا خیر، زیرا ما فقط وضعیت **printLuckyNumberTask** را بررسی کردیم.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-7.jpeg)
</div>

### **نکته مهم** 

نتیجه کلیدی این است که **روش‌های مختلفی برای انتظار وجود دارد**.
می‌توانید از روشی استفاده کنید که برای شما **مناسب‌تر و راحت‌تر** است.
من تنها آن دسته از متدها را ذکر کرده‌ام که **کافی باشد برای درک بقیه مطالب این کتاب**.
به یاد داشته باشید که این متدها نیز دارای **نسخه‌های Overloaded مختلفی** هستند.

---

**سوال 2.5**
مثالی بزنید که بخواهید از **WhenAny** یا **WaitAny** استفاده کنید. بین این دو کدام را ترجیح می‌دهید؟

فرض کنید با دو **Task متفاوت** کار می‌کنید و هر Task با یک **URL متفاوت** کار می‌کند.
فرض کنید هر URL می‌تواند به شما کمک کند **سلامت فعلی یک وب‌سایت** را بررسی کنید.
می‌دانید که هر یک از این لینک‌ها برای **بررسی وضعیت وب‌سایت کافی است**.
بنابراین برنامه شما می‌تواند **Taskها را اجرا کند و به محض دریافت داده‌ها ادامه دهد**.
در چنین حالتی می‌توانید از **WhenAny** یا **WaitAny** استفاده کنید.

مگر اینکه دلایل کافی وجود داشته باشد، من در چنین شرایطی **WhenAny** را ترجیح می‌دهم، به دلایل زیر:

* این روش **غیرمسدودکننده (nonblocking)** است.
* مورد قبلی برای جلوگیری از **Deadlock** نیز مهم است.
  برای مثال، فرض کنید با چندین Task سر و کار دارید.
  اگر **main thread** منتظر دریافت اعلان از یک Task دیگر باشد، مثلاً **taskA** یا **taskB**، و هر دو Task به دلایل غیرقابل پیش‌بینی از اجرا باز ایستند، **main thread** نیز مسدود می‌شود.
  در واقع، استفاده از **WaitAny** می‌تواند منجر به **Deadlock** شود.

---

### **خلاصه فصل** 

این فصل یک مرور سریع از **ایجاد و اجرای Taskها** ارائه داد.
همچنین **مکانیزم‌های مختلف انتظار برای تکمیل Taskها** را شرح داد.

به طور خلاصه، این فصل به سوالات زیر پاسخ داد:

* Task چیست و چگونه می‌توان یک Task ایجاد کرد؟
* چگونه می‌توان **مقدار/مقادیر** را به Task منتقل کرد؟
* چگونه می‌توان **مقداری را از Task بازگرداند**؟
* چگونه می‌توان **مکانیزم انتظار** را در برنامه‌نویسی Task به کار برد؟ 

### **تمرین‌ها** ‍

برای بررسی درک خود، سعی کنید تمرین‌های زیر را انجام دهید:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/02/Table%202-8.jpeg)
</div>

### **نکته مهم** 

همان‌طور که قبلاً گفته شد، برای همه مثال‌های کد، **“Implicit Global usings”** در Visual Studio فعال بود.
به همین دلیل، شما نام **namespace**های زیر را که به صورت پیش‌فرض در دسترس هستند، نمی‌بینید:

* System
* System.Collections.Generic
* System.IO
* System.Linq
* System.Net.Http
* System.Threading
* System.Threading.Tasks

این توضیح برای **تمام تمرین‌های کتاب** نیز صادق است.

---

### **تمرین‌ها** ‍

**E2.1**
اگر کد زیر را اجرا کنید، می‌توانید **خروجی آن را پیش‌بینی کنید؟**

```csharp
using static System.Console;

Task printHelloTask = new(
    () => WriteLine("Hello!")
);

printHelloTask.Wait(1);
WriteLine("End.");
```

**E2.2**
خروجی برنامه زیر را می‌توانید پیش‌بینی کنید؟

```csharp
using static System.Console;

Task welcomeTask = Task.Run(
    () =>
    {
    }
);

Thread.Sleep(5);
WriteLine("Welcome!");
Thread.Sleep(2);
WriteLine("How are you doing?");
```

**E2.3**
خروجی برنامه زیر را می‌توانید پیش‌بینی کنید؟

```csharp
using static System.Console;

var sayHello = (string msg = "Hello, reader!") => msg;
var displayMsgTask = Task.Run(()=>WriteLine(sayHello()));
displayMsgTask.Wait();
WriteLine("Goodbye.");
```

**E2.4**
یک تابع بنویسید که یک عدد را گرفته و **فاکتوریل آن را محاسبه کند**.
این تابع را در یک **thread پس‌زمینه** اجرا کرده و نتیجه را در **کنسول** نمایش دهید.
(نیازی به در نظر گرفتن اعتبارسنجی ورودی یا شرایط استثنایی برای این برنامه نیست.)

**E2.5**
صحیح یا غلط بودن جملات زیر را مشخص کنید:
i) متد **WaitAny** **thread فراخواننده را مسدود می‌کند**، اما متد **WhenAny** این کار را نمی‌کند. \[True]
ii) برای ایجاد **UI پاسخگوتر**، باید **Sleep** را بر **Delay** ترجیح دهید. \[False]

---

### **راه‌حل تمرین‌ها** 

**E2.1**
شما Task را ایجاد کرده‌اید اما آن را **شروع نکرده‌اید**، بنابراین خروجی برنامه:

```
End.
```

---

**E2.2**
برنامه می‌تواند **چندین خروجی مختلف** داشته باشد.
با توجه به اینکه Task منتظر تکمیل اجرای خود نیست، ترتیب نمایش خروجی‌ها ممکن است بسته به سرعت کامپیوتر متفاوت باشد.
نمونه خروجی:

```
How are you doing?
Welcome!
```

می‌توان با اضافه کردن تأخیر بیشتر در **welcomeTask** احتمال پایان زودتر main thread را افزایش داد:

```csharp
using static System.Console;

Task welcomeTask = Task.Run(
    () =>
    {
    }
);

//Thread.Sleep(5);
Thread.Sleep(200);

WriteLine("Welcome!");
Thread.Sleep(2);
WriteLine("How are you doing?");
```

---

**E2.3**
C# 12 اجازه می‌دهد مقادیر پیش‌فرض برای **پارامترهای lambda** تعریف شود.
خروجی این بار پیش‌بینی‌پذیر است، زیرا **main thread** منتظر تکمیل Task است:

```
Hello, reader!
Goodbye.
```

---

**E2.4**
نمونه‌ای برای محاسبه فاکتوریل ۱۰ با استفاده از Task پس‌زمینه:

```csharp
using static System.Console;

WriteLine("The main thread initiates the task.");
var calculateFactorialTask = Task.Run(() => CalculateFactorial(10));

WriteLine("The main thread resumes to do other things.");
WriteLine($"The factorial of 10 is: {calculateFactorialTask.Result}");

static int CalculateFactorial(int number)
{
    int temp = 1;
    for (int i = 2; i <= number; i++)
    {
        temp *= i;
    }
    return temp;
}
```

نمونه خروجی:

```
The main thread initiates the task.
The main thread resumes to do other things.
The factorial of 10 is: 3628800
```

---

**E2.5**
پاسخ‌ها:

i) **True**
ii) **False**
