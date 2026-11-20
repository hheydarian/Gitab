---
layout: layout.njk
title: ادامه و Task های تو در تو 
---
# فصل سوم: ادامه و Taskهای تو در تو 

این فصل مروری بر Task Continuations، Taskهای تو در تو (Nested Tasks) و موضوعات مرتبط ارائه می‌دهد.

شما خواهید آموخت چگونه می‌توان کارها را پس از اتمام یک Task ادامه داد و چگونه Taskها می‌توانند داخل یکدیگر اجرا شوند تا ساختار برنامه منظم و بهینه باقی بماند.

## وظایف ادامه‌دهنده (Continuation Tasks) 

فرض کنید دو وظیفه داریم به نام Task A و Task B. اگر بخواهید اجرای Task B را تنها بعد از Task A شروع کنید، احتمالاً می‌خواهید از callbackها استفاده کنید. اما TPL این کار را بسیار ساده می‌کند. این قابلیت از طریق یک **وظیفه ادامه‌دهنده (continuation task)** فراهم می‌شود که چیزی جز یک **وظیفه غیرهمزمان (asynchronous task)** نیست. ایده همان است: وقتی یک **وظیفه پیشین (antecedent task)** به پایان رسید، وظیفه بعدی که می‌خواهید ادامه دهید، فراخوانی می‌شود. در مثال ما، Task A همان **وظیفه پیشین** و Task B همان **وظیفه ادامه‌دهنده** است.

اجازه دهید ویژگی‌های مهم یک **وظیفه ادامه‌دهنده** را خلاصه کنم:
• یک **وظیفه ادامه‌دهنده** توسط یک وظیفه دیگر فراخوانی می‌شود. می‌تواند زمانی شروع شود که وظیفه قبلی (یعنی **وظیفه پیشین**) کامل شده باشد. این یعنی ادامه‌ها چیزی جز **زنجیره‌سازی وظایف** نیستند.
• با استفاده از این مفهوم، می‌توانید **داده‌ها (و حتی استثناها)** را از یک وظیفه پیشین به وظیفه ادامه‌دهنده منتقل کنید.
• اگر یک وظیفه غیرهمزمان داده‌ای برگرداند، می‌توانید از وظیفه ادامه‌دهنده برای **دریافت و/یا پردازش آن داده‌ها بدون مسدود کردن نخ اصلی** استفاده کنید. این ویژگی، **انعطاف‌پذیری بالای وظایف ادامه‌دهنده** را نشان می‌دهد.
• ادامه‌ها می‌توانند به یک یا چند **وظیفه پیشین** متصل شوند.
• می‌توانید یک یا چند **وظیفه ادامه‌دهنده** را فراخوانی کنید.
• می‌توانید **کنترل وظیفه ادامه‌دهنده** را در دست بگیرید. برای مثال، اگر سه وظیفه به نام‌های Task A، Task B و Task C وجود داشته باشد، می‌توانید تصمیم بگیرید که Task C تنها بعد از اتمام هر دو Task A و Task B ادامه یابد. یا می‌توانید تعیین کنید که Task C لازم نیست منتظر هر دو باشد و به محض اتمام هر کدام، ادامه یابد.
• همچنین می‌توانید یک **وظیفه ادامه‌دهنده را لغو (cancel)** کنید. این ویژگی اغلب در شرایط اضطراری یا زمانی که با یک باگ مکرر در اجرای برنامه مواجه می‌شوید، مفید است.

---

### ادامه ساده (Simple Continuation) 

فرض کنید فردی به نام Jack می‌خواهد دوستانش را به یک **مهمانی شام** دعوت کند. در سطح بالا، فعالیت کلی را می‌توان به دو وظیفه تقسیم کرد:
• دعوت از دوستان
• سفارش غذا

فرض کنیم Jack ابتدا دوستانش را از طریق تلفن دعوت می‌کند. پس از اتمام دعوت، او می‌داند چند نفر قرار است در مهمانی شرکت کنند. بر اساس این اطلاعات، حالا غذا را سفارش می‌دهد. همان‌طور که می‌بینید، **دعوت از دوستان** همان **وظیفه پیشین** و **سفارش غذا** همان **وظیفه ادامه‌دهنده** است.

بیایید برنامه‌ای بنویسیم تا این سناریو را شبیه‌سازی کند.

برای **وظیفه ادامه‌دهنده**، شما استفاده از متد `ContinueWith` را مشاهده خواهید کرد. این متد یک **وظیفه ادامه‌دهنده** ایجاد می‌کند که زمانی اجرا می‌شود که **وظیفه هدف** کامل شده باشد. این متد چندین **بارگذاری اضافی (overload)** دارد. در این مثال، من ساده‌ترین نسخه‌ی `ContinueWith` را استفاده کرده‌ام که یک **Action<Task>** به عنوان پارامتر می‌پذیرد. به همین دلیل شما کد زیر را مشاهده می‌کنید:

```csharp
var orderTask = inviteTask.ContinueWith(previousTask =>
{
    WriteLine(previousTask.Result);
    // شبیه‌سازی یک تأخیر برای تقلید از یک موقعیت واقعی
    Thread.Sleep(1000);
    WriteLine("Food is ordered now.");
}
);
```

همان‌طور که می‌بینید، یک توقف یک ثانیه‌ای داخل `orderTask` گذاشته شده است. اگرچه این کار لازم نبود، اما این خط کد برای شبیه‌سازی **تأخیر بین وظیفه دعوت از دوستان و سفارش غذا** نگه داشته شده است.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-1.jpeg)
</div>

نکته مهم 

برای اینکه خروجی کامل برنامه را نشان دهم، در این مثال از متد `ReadLine` استفاده کرده‌ام تا از پایان زودهنگام برنامه کنسول جلوگیری شود. همین نکته زمانی که من از `ReadKey` یا `ReadLine` در مثال‌های دیگر این کتاب استفاده می‌کنم نیز صدق می‌کند.

---

### نمایش 1 (Demonstration 1) 

در اینجا نمایش کامل برنامه آمده است:

```csharp
using static System.Console;

WriteLine("The host is planning a party.");

var inviteTask = Task.Run(() => "Invitation is done.");

var orderTask = inviteTask.ContinueWith(previousTask =>
{
    WriteLine(previousTask.Result);
    // شبیه‌سازی تأخیر برای تقلید از یک موقعیت واقعی
    Thread.Sleep(1000);
    WriteLine("Food is ordered now.");
});

WriteLine("The host is decorating the house.");

ReadLine();
```

#### خروجی (Output) 

نمونه خروجی برای شما به این شکل خواهد بود:

```
The host is planning a party.
The host is decorating the house.
Invitation is done.
Food is ordered now.
```

---

### تحلیل (Analysis) 

خروجی بالا ویژگی‌های زیر را تأیید می‌کند:
• **نخ اصلی (main thread)** در هنگام اجرای **وظیفه ادامه‌دهنده** مسدود نشده بود. به همین دلیل خط `"The host is decorating the house."` قبل از خط `"Invitation is done."` نمایش داده شد.
• می‌توان دید که **وظیفه ادامه‌دهنده** بعد از اتمام **وظیفه پیشین** آغاز شد و همچنین **داده‌های برگشتی از وظیفه والد/پیشین** را به درستی پردازش کرد.
• در این مثال، زمانی که وظیفه ادامه‌دهنده خط `WriteLine(previousTask.Result);` را پردازش کرد، غیرمسدود کننده بود. چرا؟ زیرا وظیفه قبلی از قبل کامل شده بود و نتیجه آن فوراً در دسترس بود.

---

### ادامه‌های شرطی (Conditional Continuations) 

نمایش 1 یک نمونه ساده از **وظیفه ادامه‌دهنده** را نشان داد. با این حال، شما می‌توانید کنترل بیشتری بر فرآیند ادامه داشته باشید. بیایید این مفهوم را با برخی **مطالعات موردی (case studies)** بررسی کنیم.

#### مطالعه موردی 1 (Case Study 1) 

حتی پس از دعوت مهمان‌ها، ممکن است میزبان به دلایلی ناگزیر مجبور شود **تاریخ مهمانی را تغییر دهد**. در این حالت، به جای سفارش غذا، فرض کنیم میزبان **به مهمان اطلاع می‌دهد** و تاریخ مهمانی را جابه‌جا می‌کند. آیا می‌توانید برنامه‌ای بنویسید که این وضعیت را شبیه‌سازی کند؟

قطعاً می‌توانید. اما اجازه دهید **تکنیکی با استفاده از enumeration به نام `TaskContinuationOptions`** به شما نشان دهم که این وضعیت را مدیریت می‌کند. تصویر زیر (Figure 3-1) از Visual Studio **اعضای مختلف `TaskContinuationOptions`** را نشان می‌دهد:

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-2.jpeg)
</div>

نکته مهم 

بحث در مورد همه‌ی اعضای `TaskContinuationOptions` باعث حجیم شدن بی‌مورد کتاب می‌شود. اگر علاقه‌مند هستید، می‌توانید با باز کردن آن‌ها در Visual Studio یا از لینک آنلاین زیر اطلاعات بیشتری کسب کنید:
[TaskContinuationOptions – Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcontinuationoptions?view=net-8.0)
با این حال، فکر می‌کنم با دیدن نام این اعضا نیز می‌توانید **تصوری کلی از عملکرد آن‌ها** به دست آورید.

---

چون مثال ما با یک **وضعیت استثنایی (exceptional situation)** سروکار دارد، قصد دارم از گزینه‌های `NotOnFaulted` و `OnlyOnFaulted` استفاده کنم. شما می‌توانید به‌طور ایمن فرض کنید که گزینه‌ی `NotOnFaulted` برای وضعیت **عادی** و گزینه‌ی دیگر برای وضعیت **استثنایی** استفاده خواهد شد.

قبل از اینکه برنامه کامل را ببینید، باید بگویم برای ایجاد یک **وضعیت استثنایی**، از یک منطق ساده (dummy logic) استفاده کرده‌ام. این منطق به این صورت است: **وظیفه پیشین (inviteTask)** یک عدد تولید می‌کند. اگر عدد **زوج** باشد، یک **استثنا (exception)** رخ می‌دهد. در غیر این صورت، پیامی مبنی بر اینکه دعوت انجام شده است، ارسال می‌شود.

---

### نمایش 2 (Demonstration 2) 

بیایید برنامه کامل را ببینیم:

```csharp
using static System.Console;

WriteLine("The host is planning a party.");

var inviteTask = Task.Run(() =>
{
    string msg = "Invitation is done.";
    // منطق ساده برای ایجاد استثنا
    int random = new Random().Next(10);
    if (random % 2 == 0)
    {
        throw new Exception("Some problem occurs.");
    }
    return msg;
});

var orderTask = inviteTask.ContinueWith(previousTask =>
{
    WriteLine(previousTask.Result);
    // شبیه‌سازی تأخیر برای تقلید از یک موقعیت واقعی
    Thread.Sleep(1000);
    WriteLine("Food is ordered now.");
}, TaskContinuationOptions.NotOnFaulted);

var changePartyDateTask = inviteTask.ContinueWith(previousTask =>
{
    WriteLine("Party date is shifted due to some unavoidable circumstances.");
}, TaskContinuationOptions.OnlyOnFaulted);

WriteLine("The host is decorating the house.");

ReadLine();
```

#### خروجی (Output) 

نمونه‌ای از خروجی ممکن بدون استثنا:

```
The host is planning a party.
The host is decorating the house.
Invitation is done.
Food is ordered now.
```

نمونه‌ای از خروجی ممکن وقتی میزبان مجبور شد **تاریخ مهمانی را تغییر دهد**:

```
The host is planning a party.
The host is decorating the house.
Party date is shifted due to some unavoidable circumstances.
```

---

### مطالعه موردی 2 (Case Study 2) 

وظایف ادامه‌دهنده به شما کمک می‌کنند با **وضعیت‌های مختلف** به‌خوبی کنار بیایید. اجازه دهید یک **مطالعه موردی دیگر** را بررسی کنیم. قبلاً گفتیم که **ادامه‌ها می‌توانند به یک یا چند وظیفه پیشین متصل شوند**. بیایید یک مثال ببینیم.

این بار از متد `ContinueWhenAll` استفاده می‌کنم. همانند همیشه، این متد چندین overload دارد. من قصد دارم نسخه‌ای را استفاده کنم که **دو پارامتر می‌پذیرد**:

```csharp
public Task ContinueWhenAll<TAntecedentResult>(
    Task<TAntecedentResult>[] tasks,
    Action<Task<TAntecedentResult>[]> continuationAction
)
{
    // بدنه متد نشان داده نشده است
}
```

پارامتر اول **یک آرایه از وظایف پیشین** می‌پذیرد (این یعنی تمام آن‌ها باید تکمیل شوند تا ادامه آغاز شود) و پارامتر بعدی برای **delegate از نوع Action** است که زمانی اجرا می‌شود که **تمام وظایف موجود در آرایه تکمیل شوند**.

به همین دلیل، شما کد زیر را خواهید دید که نشان می‌دهد **orderTask** و **inviteTask** باید تکمیل شوند تا **وظیفه ادامه‌دهنده (continuation task)** آغاز شود:

```csharp
var arrangeDinnerTask = Task.Factory.ContinueWhenAll(
    [orderTask, inviteTask],
    tasks =>
    {
         WriteLine("Arranging dinner.");
    }
);
```

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-3.jpeg)
</div>

نکته مهم 

شاید توجه کرده باشید که ویژگی **“Collection expressions”** در C# 12 اجازه می‌دهد `arrangeDinnerTask` را به این شکل بنویسیم. اگر از نسخه قدیمی‌تر C# استفاده می‌کنید، لازم است آن را به صورت زیر بنویسید (تغییر مهم با **bold** مشخص شده است):

```csharp
var arrangeDinnerTask = Task.Factory.ContinueWhenAll(
    new[] { orderTask, inviteTask },
    //[orderTask,inviteTask],  // از C#12 به بعد
    tasks =>
    {
    }
);
```

---

### نمایش 3 (Demonstration 3) 

بیایید برنامه کامل را ببینیم:

```csharp
using static System.Console;

var orderTask = Task.Run(() => WriteLine("Food is ordered."));
var inviteTask = Task.Run(() => WriteLine("Invitation is done."));

var arrangeDinnerTask = Task.Factory.ContinueWhenAll(
    //[new[] { orderTask,inviteTask }],
    [orderTask, inviteTask],  // از C#12 به بعد
    tasks =>
    {
        WriteLine("Arranging dinner.");
    }
);

ReadLine();
```

#### خروجی (Output) 

نمونه‌ای از خروجی ممکن وقتی ابتدا غذا سفارش داده می‌شود:

```
Food is ordered.
Invitation is done.
Arranging dinner.
```

نمونه‌ای از خروجی ممکن وقتی ابتدا دعوت‌ها انجام می‌شود:

```
Invitation is done.
Food is ordered.
Arranging dinner.
```

---

### تحلیل (Analysis) 

در هر حالت می‌توان مشاهده کرد که **شام تنها پس از تکمیل وظیفه سفارش غذا و انجام دعوت‌ها** چیده شده است.

---

### مطالعه موردی 3 (Case Study 3) 

بیایید یک مطالعه موردی دیگر را بررسی کنیم که در آن **وظیفه ادامه‌دهنده زمانی اجرا می‌شود که هر یک از وظایف قبلی تکمیل شوند**. در این حالت می‌توانید از متد `ContinueWhenAny` به جای `ContinueWhenAll` استفاده کنید.

به عنوان مثال، نمونه خروجی زیر زمانی به دست آمد که من متد `ContinueWhenAll` را با `ContinueWhenAny` جایگزین کردم:

```
Food is ordered.
Arranging dinner.
Invitation is done.
```

این خروجی نشان می‌دهد که **شام حتی قبل از تکمیل دعوت‌ها چیده شده است**. شما می‌توانید احتمال مشاهده چنین خروجی‌ای را با اضافه کردن یک **دستور sleep در `inviteTask`** افزایش دهید، مانند:

```csharp
var inviteTask = Task.Run(() =>
{
    Thread.Sleep(3000);
    WriteLine("Invitation is done.");
});
```

> **نکته:** شما همچنین می‌توانید پروژه **Chapter3\_Demo3\_CaseStudy3** را دانلود کنید تا این مطالعه موردی را تمرین کنید.

شناسایی یک وظیفه و وضعیت آن 

وقتی در یک محیط **چندنخی (multithreaded)** با چندین وظیفه کار می‌کنید، ضروری است که **وظایف همراه با وضعیت آن‌ها شناسایی شوند**. با استفاده از `Task.CurrentId` می‌توانید **شناسه (ID) وظیفه‌ای که در حال اجراست** را دریافت کنید.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-4.jpeg)
</div>

نکته مهم 

`CurrentId` برای دریافت **شناسه وظیفه‌ای که در حال اجراست** از داخل کدی که وظیفه اجرا می‌کند استفاده می‌شود. با این حال، این یک **ویژگی ایستا (static property)** است و با ویژگی `Id` متفاوت است. ویژگی `Id` **شناسه یک نمونه مشخص از Task** را برمی‌گرداند. تلاش برای دریافت مقدار `CurrentId` از خارج کدی که وظیفه در حال اجراست، **مقدار null** بازمی‌گرداند.

چرخه عمر یک **نمونه Task** از مراحل مختلفی عبور می‌کند. ویژگی `Status` برای بررسی **وضعیت فعلی** استفاده می‌شود. هنگام بررسی، خواهید دید که این ویژگی **نوع enum به نام TaskStatus** را برمی‌گرداند که اعضای زیادی دارد. اجازه دهید یک **تصویر از Visual Studio** برای نمایش آن‌ها ارائه کنم (Figure 3-2).
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-5.jpeg)
</div>

### وضعیت نهایی یک Task و تحلیل آن 

در یک محیط **همزمان (concurrent)** ممکن است زمانی که مقدار وضعیت یک وظیفه را دریافت می‌کنید، وضعیت آن تغییر کرده باشد. اما نکته جالب این است که **زمانی که یک وضعیت به دست آمد، نمی‌تواند به وضعیت قبلی بازگردد**. برای مثال، وقتی یک وظیفه به **وضعیت نهایی (final state)** برسد، نمی‌تواند به وضعیت `Created` بازگردد.

سه وضعیت نهایی ممکن وجود دارد:
• `RanToCompletion`  – نشان می‌دهد وظیفه با موفقیت کامل شده است.
• `Canceled`  – نشان می‌دهد وظیفه لغو شده است، که می‌تواند به دلایلی مثل دخالت کاربر، تایم‌اوت‌ها، یا منطق برنامه رخ دهد.
• `Faulted`  – نشان می‌دهد وظیفه به دلیل یک **استثنای مدیریت‌نشده** کامل شده است.

توضیحات بیشتر درباره استثناها و لغو وظایف در **فصل ۴ و فصل ۵** ارائه خواهد شد.

---

### نمایش 4 (Demonstration 4) 

در برنامه زیر، دو وظیفه داریم:

1. `doSomethingTask` – می‌تواند با موفقیت تکمیل شود یا با یک استثنا مواجه شود.
2. `statusCheckerTask` – یک **وظیفه ادامه‌دهنده** است که وضعیت وظیفه والد را با استفاده از ویژگی `Status` بررسی می‌کند و `TaskStatus` آن را بازمی‌گرداند.

```csharp
using static System.Console;

var doSomethingTask = Task.Run(() =>
{
    WriteLine($"The task [id:{Task.CurrentId}] starts...");
    // انجام کار دیگر، در صورت نیاز
    int random = new Random().Next(2);
    WriteLine($"The random number is:{random}");
    // عدد تصادفی 0 باعث ایجاد استثنا می‌شود
    if (random == 0)
    {
        throw new Exception("Got a zero");
    }
    WriteLine($"The task [id:{Task.CurrentId}] has finished.");
});

var statusCheckerTask = doSomethingTask.ContinueWith(previousTask =>
{
    WriteLine($"The task {previousTask.Id}'s status is: {previousTask.Status}");
}, TaskContinuationOptions.AttachedToParent);

ReadKey();
```

#### خروجی (Output) 

نمونه‌ای از خروجی وقتی استثنا رخ داده است:

```
The task [id:8] starts...
The random number is:0
The task 8's status is: Faulted
```

نمونه‌ای از خروجی وقتی استثنا رخ نداده است:

```
The task [id:8] starts...
The random number is:1
The task [id:8] has finished.
The task 8's status is: RanToCompletion
```

---

### تحلیل و مدیریت شاخه‌های مختلف 

در صورت نیاز، می‌توانید برنامه را طوری تغییر دهید که **شاخه‌های جداگانه برای مدیریت سناریوهای مختلف** ایجاد کنید، مشابه نمایش 2. برای مثال، می‌توان `statusCheckerTask` را با دو شاخه زیر جایگزین کرد:

```csharp
var normalHandlerTask = doSomethingTask.ContinueWith(previousTask =>
{
    WriteLine($"The task {previousTask.Id}'s status is: {previousTask.Status}");
}, TaskContinuationOptions.AttachedToParent | TaskContinuationOptions.NotOnFaulted);

var faultHandlerTask = doSomethingTask.ContinueWith(previousTask =>
{
    WriteLine($"The parent task was not completed due to an exception.");
}, TaskContinuationOptions.AttachedToParent | TaskContinuationOptions.OnlyOnFaulted);
```

با اجرای این برنامه، پیام‌ها **بر اساس وضعیت تکمیل وظیفه والد** نمایش داده می‌شوند.

* وقتی استثنا رخ دهد:

```
The task [id:7] starts...
The random number is:0
The parent task was not completed due to an exception.
```

* وقتی استثنا رخ ندهد:

```
The task [id:8] starts...
The random number is:1
The task [id:8] has finished.
The task 8's status is: RanToCompletion
```

---

### پرسش و پاسخ (Q\&A) 

**Q3.1:** در خروجی‌ها، شناسه وظیفه والد 7 یا 8 بود. آیا درست است که وظایف دیگری نیز همزمان اجرا می‌شدند؟

**پاسخ:** بله، این کد در VS2022 با تنظیمات پیش‌فرض **Debug** و فعال بودن **Hot Reload** اجرا شد. اگر همین کد را در **Release configuration** یا با غیرفعال کردن Hot Reload اجرا کنید، شناسه پایین‌تری مانند 1 خواهید دید:

```
The task [id:1] started doing something...
The random number is:0
The task 1's status is: Faulted
```

 برای انتخاب تنظیمات موردنظر: روی **Solution Explorer** راست‌کلیک کنید  **Configuration Manager…**  **Debug یا Release** را برای پروژه انتخاب کنید.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-6.jpeg)
</div>

نکته مهم 

من اغلب برنامه‌هایم را در **حالت Debug** اجرا می‌کنم. بنابراین، برای دیدن **شناسه‌های پایین‌تر وظایف** مانند 1، 2، 3 و… در خروجی، معمولاً آن برنامه‌ها را با **غیرفعال کردن تنظیم “Hot Reload”** اجرا می‌کنم.

**Q3.2 آیا شناسه‌های وظایف یکتا هستند؟**

مایکروسافت این موضوع را تضمین نمی‌کند. در لینک آنلاین زیر ذکر شده است:
[Task.CurrentId – Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.currentid?view=net-9.0)

> توجه داشته باشید که هرچند برخورد شناسه‌ها بسیار نادر است، اما **شناسه‌های وظایف تضمین شده نیستند که یکتا باشند**.

---

### وظایف تو در تو (Nested Tasks) 

وظایف می‌توانند **تو در تو** باشند. یعنی می‌توان یک **وظیفه را در دلیگیت کاربر یک وظیفه دیگر** ایجاد کرد. **وظیفه بیرونی** که وظیفه فرزند در آن ایجاد می‌شود، معمولاً به عنوان **وظیفه والد (parent task)** شناخته می‌شود.

یک **وظیفه فرزند** می‌تواند یکی از انواع زیر باشد:
• **Attached**  – با گزینه `TaskCreationOptions.AttachedToParent` ایجاد می‌شود (در صورتی که والد اجازه اتصال داشته باشد).
• **Detached**  – به طور مستقل اجرا می‌شود.

#### وظیفه فرزند Detached

بیایید بحث خود را با **وظایف فرزند Detached** شروع کنیم.

---

### نمایش 5 (Demonstration 5) 

کد زیر دو نمونه Task به نام‌های **parent** و **child** ایجاد می‌کند. توجه داشته باشید که **وظیفه فرزند داخل وظیفه والد ایجاد شده است**. با این حال، من **وظیفه فرزند را به والد متصل نکردم**. به همین دلیل، خط `TaskCreationOptions.AttachedToParent` در کد زیر **کامنت شده است**.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-7.jpeg)
</div>

نکته مهم 

متد `Task.Factory.StartNew` یک **بارگذاری اضافی (overload)** دارد که **`TaskCreationOptions`** را به عنوان پارامتر می‌پذیرد. این امکان برای متد `Task.Run` وجود ندارد.

---

### مثال Detached Nested Task 

```csharp
using static System.Console;

var parent = Task.Factory.StartNew(() =>
{
    // کار والد
});

WriteLine($"The parent task has started.");

var child = Task.Factory.StartNew(() =>
{
    WriteLine("The child task has started.");
    // ایجاد تأخیر
    Thread.Sleep(1000);
    WriteLine("The child task has finished.");
    // ,TaskCreationOptions.AttachedToParent
});

Thread.Sleep(5);
parent.Wait();

WriteLine($"The parent task has finished now.");
```

#### خروجی نمونه 

```
The parent task has started.
The child task has started.
The parent task has finished now.
```

همان‌طور که مشاهده می‌کنید، خروجی نشان می‌دهد **وظیفه فرزند شروع شده است**، اما نشان نمی‌دهد که **تکمیل شده است یا خیر**. دلیل این است که **وظیفه فرزند بدون گزینه `TaskCreationOptions.AttachedToParent` ایجاد شده** و بنابراین **یک وظیفه Detached** است که به طور مستقل از والد اجرا می‌شود. به همین دلیل وظیفه والد **نیازی ندارد که منتظر تکمیل وظیفه فرزند باشد**.

---

### پرسش و پاسخ (Q\&A) 

**Q3.3:** اگر بخواهم خط `parent.Wait();` را با `Task.WaitAll(parent, child);` جایگزین کنم تا مطمئن شوم وظیفه فرزند هم اجرا شده است، آیا درست است؟

**پاسخ:** خیر. در آن نمونه کد، **وظیفه فرزند در محدوده (scope) وجود ندارد**. بنابراین، کد پیشنهادی شما باعث **خطای زمان کامپایل** می‌شود:

```
CS0103 The name 'child' does not exist in the current context
```

**Q3.4:** آیا استفاده از دستور `Sleep` در نخ اصلی ضروری بود؟

**پاسخ:** نه، ضروری نبود. اما با قرار دادن این دستور، احتمال نمایش خط `"The child task has started."` در خروجی افزایش می‌یابد.

---

### Attached Nested Task 

حالا خط

```csharp
// ,TaskCreationOptions.AttachedToParent
```

را از کامنت خارج کرده و برنامه را دوباره اجرا می‌کنیم. این بار، **وضعیت تکمیل وظیفه فرزند** نیز نمایش داده خواهد شد.

#### خروجی نمونه 

```
The parent task has started.
The child task has started.
The child task has finished.
The parent task has finished now.
```

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-8.jpeg)
</div>

نکات مهم 

می‌توانید یک **وظیفه فرزند (child task)** را به **وظیفه والد (parent task)** متصل کنید، **فقط در صورتی که والد اجازه این کار را بدهد**. در این زمینه، دو نکته مهم از مستندات رسمی ([لینک](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/attached-and-detached-child-tasks)) قابل ذکر است:

1. والدین می‌توانند به طور صریح از اتصال وظایف فرزند جلوگیری کنند، با مشخص کردن گزینه `TaskCreationOptions.DenyChildAttach` در **سازنده کلاس والد** یا در متد `TaskFactory.StartNew`.
2. والدین به طور ضمنی از اتصال وظایف فرزند جلوگیری می‌کنند اگر آن‌ها با استفاده از متد `Task.Run` ایجاد شوند.

---

### پرسش و پاسخ (Q\&A) 

**Q3.5:** در نمایش قبلی (Demonstration 5)، فقط `parent.Wait();` نوشته شده بود. این یعنی شما فقط منتظر تکمیل وظیفه والد هستید و برای وظیفه فرزند چنین نیست. بنابراین هیچ تضمینی وجود ندارد که خروجی نشان دهد وظیفه فرزند تکمیل شده است. آیا این درک صحیح است؟

**پاسخ:** خیر. مایکروسافت معماری را به گونه‌ای طراحی کرده است که اگر رابطه والد–فرزند ایجاد کنید، **منتظر ماندن برای وظیفه والد باعث می‌شود وظیفه فرزند نیز تکمیل شود**.

---

### وادار کردن والد به انتظار برای فرزند ‍‍

می‌توانید **وظیفه والد را وادار کنید تا منتظر تکمیل وظیفه فرزند شود** (حتی اگر یک وظیفه فرزند Detached باشد) با دسترسی به ویژگی `Task<TResult>.Result` وظیفه فرزند.

---

### نمایش 6 (Demonstration 6) 

در این مثال، برنامه قبلی کمی تغییر کرده است. کد جدید با **bold** مشخص شده و کد قدیمی کامنت شده است:

```csharp
using static System.Console;

var parent = Task.Factory.StartNew(() =>
{
    // کار والد
});

WriteLine($"The parent task has started.");

var child = Task.Factory.StartNew(() =>
{
    WriteLine("The child task has started.");
    // ایجاد تأخیر
    Thread.Sleep(1000);
    // WriteLine("The child task has finished.");
    return "the child task has finished.";
    // , TaskCreationOptions.AttachedToParent
});

// والد اکنون منتظر این وظیفه فرزند Detached است
return child.Result;

// Thread.Sleep(5);
// parent.Wait();
// WriteLine($"The parent task has finished now.");

WriteLine($"The parent task confirms that {parent.Result}");
```

#### خروجی 

```
The parent task has started.
The child task has started.
The parent task confirms that the child task has finished.
```

---

### باز کردن وظایف تو در تو (Unwrapping Nested Tasks) 

در مورد وظایف تو در تو، مثال زیر را در نظر بگیرید:

```csharp
var someTask = Task.Factory.StartNew(
    () => Task.Factory.StartNew(() => 200)
);
```

در این کد، `someTask` از نوع `Task<Task<int>>` است. اگر حالا کد زیر را اجرا کنید:

```csharp
WriteLine(someTask.Result);
```

خروجی به شکل زیر خواهد بود:

```
System.Threading.Tasks.Task`1[System.Int32]
```

از **.NET 4 به بعد**، می‌توانید از یکی از **متدهای Extension به نام `Unwrap`** استفاده کنید تا هر `Task<Task<TResult>>` را به `Task<TResult>` تبدیل کنید (یا `Task<Task>` به `Task`). این وظیفه جدید نماینده **وظیفه داخلی (inner nested task)** خواهد بود و **وضعیت لغو و استثناها** را نیز شامل می‌شود.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-9.jpeg)
</div>

### متد Unwrap 

متد `Unwrap` دو بارگذاری (overload) دارد:

```csharp
public static Task Unwrap(this Task<Task> task);
public static Task<TResult> Unwrap<TResult>(this Task<Task<TResult>> task);
```

همان‌طور که مشاهده می‌کنید، هر دو **متدهای Extension** هستند. زمانی که یک `Task<Task>` (یا `Task<Task<TResult>>`) را unwrap می‌کنید، یک **وظیفه جدید (معمولاً به آن proxy گفته می‌شود)** دریافت می‌کنید.

---

### مثال 

```csharp
var someTask1 = Task.Factory.StartNew(
    () => Task.Factory.StartNew(() => 200)
).Unwrap();

WriteLine($"Received: {someTask1.Result}");
```

#### خروجی 

```
Received: 200
```

جالب است که اگر از متد `Run` استفاده کنید، این کار **به طور خودکار برای شما انجام می‌شود**. مثال معادل:

```csharp
var someTask2 = Task.Run(
    () => Task.Run(() => 200)
);

WriteLine($"Received: {someTask2.Result}");
```

خروجی همین خواهد بود:

```
Received: 200
```

---

### نکته ویژه ⭐

در این کتاب، ما **کلمات کلیدی `async` و `await`** را بررسی نکرده‌ایم. با این حال، می‌توانید از `await` برای **unwrap کردن یک لایه** استفاده کنید. مثال:

```csharp
var someTask3 = Task.Factory.StartNew(
    () => Task.Factory.StartNew(() => 200)
);

WriteLine($"Received: {await someTask3.Result}");
```

این کد نیز کامپایل می‌شود و خروجی مشابه دارد.

> **نکته:** پروژه **Chapter3\_demo\_unwrappingnestedtasks** را دانلود کنید تا این قطعات کد را تمرین کنید. این پروژه در پوشه **Chapter3** قرار دارد.

---

### خلاصه فصل 

این فصل به **ادامه وظایف (task continuations)** و **وظایف تو در تو (nested tasks)** پرداخته است و به طور خلاصه به سوالات زیر پاسخ داده است:

• چگونه می‌توان یک مکانیزم ساده برای **ادامه وظیفه** پیاده‌سازی کرد؟
• چگونه می‌توان شاخه‌های مختلف ایجاد کرد تا از **ادامه شرطی وظیفه** استفاده شود؟
• چگونه می‌توان **وضعیت وظیفه فعلی** را بررسی کرد؟
• چگونه می‌توان یک **وظیفه تو در تو ایجاد، مدیریت و unwrap** کرد؟

### تمرین‌ها 

برای بررسی میزان درک خود، **تمرین‌های زیر را انجام دهید** (برای این تمرین‌ها نیازی به مدیریت استثناها یا لغو وظایف نیست):
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-10.jpeg)
</div>

### یادآوری 

همان‌طور که قبلاً گفته شد، می‌توانید با اطمینان فرض کنید که **تمام namespaceهای لازم** برای این قطعات کد در دسترس هستند. این نکته برای **تمام تمرین‌های این کتاب** نیز صدق می‌کند.

---

## تمرین‌ها و نمونه راه‌حل‌ها 

### E3.1

شروع با **C# 12**، می‌توانیم **Primary Constructor** را به عنوان بخشی از تعریف کلاس مشخص کنیم. مثال:

```csharp
class Employee (string name, int id)
{
    private string _name = name;
    private int _id = id;

    public override string ToString()
    {
        return $"Name:{_name} Id:{_id}";
    }
}

// ایجاد نمونه‌ای از کلاس Employee
Employee emp = new("Bob", 1);
```

فرض کنید دو وظیفه داریم:
1⃣ اولین وظیفه، یک نمونه Employee ایجاد می‌کند.
2⃣ وظیفه دوم، پس از اتمام وظیفه اول اجرا شده و ابتدا بررسی می‌کند که آیا وظیفه اول با موفقیت تکمیل شده است یا خیر، سپس **تاریخ و زمان جاری** را چاپ می‌کند.

#### نمونه برنامه 

```csharp
using static System.Console;

var createEmp = Task.Factory.StartNew(() => { })
    .ContinueWith(task =>
    {
        Employee emp = new("Bob", 1);
        WriteLine($"Created an employee with {emp}");
        WriteLine($"Was the previous task completed? {task.IsCompletedSuccessfully}");
        WriteLine($"Current time:{DateTime.Now}");
    });

createEmp.Wait();

class Employee (string name, int id)
{
    private string _name = name;
    private int _id = id;

    public override string ToString()
    {
        return $"Name: {_name} Id: {_id}";
    }
}
```

#### خروجی نمونه 

```
Created an employee with Name: Bob Id: 1
Was the previous task completed? True
Current time:10/16/2024 9:58:08 AM
```

---

### E3.2

ایجاد یک **وظیفه پس‌زمینه** که یک URL را ping می‌کند (مثلاً `www.google.com`) و سپس ایجاد یک **وظیفه ادامه** که نتیجه را در کنسول نمایش دهد.

#### نمونه برنامه 

```csharp
using static System.Console;
using System.Net.NetworkInformation;

string url = "www.google.com";

WriteLine($"The main thread initiates a task that starts pinging {url}");

var pingTask = Task.Run(() => new Ping().Send(url));

var statusTask = pingTask.ContinueWith(previousTask =>
{
    WriteLine($"Ping Status of {url}: {pingTask.Result.Status}");
});

WriteLine($"The main thread is ready to do other work.");

statusTask.Wait();
```

#### خروجی نمونه 

```
The main thread initiates a task that starts pinging www.google.com
The main thread is ready to do other work.
Ping Status of www.google.com: Success
```

 **نسخه جایگزین بدون متغیر statusTask:**

```csharp
var pingTask = Task.Run(() => new Ping().Send(url))
    .ContinueWith(previousTask => previousTask.Result.Status);

WriteLine($"Ping Status of {url}: {pingTask.Result}");
```

> نکته نویسنده: نخ اصلی در حین اجرای وظیفه پس‌زمینه **مسدود نشده بود** و فقط در پایان برای نمایش خروجی منتظر می‌ماند.

---

### E3.3

پیش‌بینی خروجی برنامه زیر:

```csharp
using static System.Console;

var helloTask = Task.Run(() =>
{
    WriteLine("Hello reader!");
    var aboutTask = Task.Factory.StartNew(() =>
    {
        Task.Delay(1000);
        WriteLine("How are you?");
    }, TaskCreationOptions.AttachedToParent);
});

helloTask.Wait();
```

#### خروجی معمول 

```
Hello reader!
```

 دلیل: برنامه قبل از اتمام aboutTask خاتمه یافته است.

با استفاده از `ReadKey()` یا `ReadLine()` در پایان نخ اصلی، می‌توانید برنامه را تا مشاهده خروجی کامل نگه دارید:

```
Hello reader!
How are you?
```

> نکته: `Task.Run(someAction)` به طور پیش‌فرض **اجازه اتصال وظایف فرزند به والد را نمی‌دهد**، اما `Task.Factory.StartNew` این امکان را فراهم می‌کند.

---

### E3.4

آیا می‌توانید کد زیر را کامپایل کنید؟

```csharp
using static System.Console;

var someTask = Task.Factory.StartNew(() => Task.Run(() => 300)).Unwrap();

WriteLine($"Received: {someTask.Result}");
```

 بله، خروجی:

```
Received: 300
```

---

### E3.5

پیش‌بینی خروجی برنامه زیر:

```csharp
using static System.Console;

var getGift = Task.Factory.StartNew(() => "Sunny wins a book")
    .ContinueWith(previousTask =>
        Task.Run(() => previousTask.Result + " and a laptop.")
    )
    .Unwrap();

WriteLine(getGift.Result);
```

#### خروجی 

```
Sunny wins a book and a laptop.
```
