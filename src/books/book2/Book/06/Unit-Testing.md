---
layout: layout.njk
title: Unit Testing
---
# فصل ششم: تست واحد (Unit Testing) 

قبلاً به بررسی **مدیریت استثناها (Exception Handling)** پرداختیم، چگونگی پیاده‌سازی صحیح آن و این که چگونه این کار می‌تواند برای **مشتری** و **برنامه‌نویس** هنگام بروز مشکلات مفید باشد. در این فصل، نگاهی می‌اندازیم به اینکه **برنامه‌نویسان چگونه می‌توانند تضمین کیفیت خود (QA)** را پیاده‌سازی کنند تا **کد باکیفیت، مقاوم و کم‌احتمال تولید استثنا در محیط تولید** ارائه دهند.

ابتدا بررسی می‌کنیم **چرا باید کد خودمان را تست کنیم** و یک تست خوب چه ویژگی‌هایی دارد. سپس به **چند ابزار تست** که برای برنامه‌نویسان C# در دسترس است می‌پردازیم. بعد، سه ستون اصلی **تست واحد (Unit Testing)** را مرور می‌کنیم: **Fail، Pass و Refactor**. در نهایت، به **تست‌های واحد اضافی (Redundant Unit Tests)** و دلیل حذف آن‌ها می‌پردازیم.

در این فصل، مباحث زیر پوشش داده می‌شوند:

* درک **دلایل داشتن یک تست خوب** 
* درک **ابزارهای تست** 
* تمرین **متدولوژی TDD – Fail، Pass و Refactor** 
* حذف **تست‌ها، کامنت‌ها و کدهای مرده اضافی** 

تا پایان این فصل، شما مهارت‌های زیر را کسب خواهید کرد:

* توانایی **شرح مزایای داشتن کد خوب** 
* توانایی **شرح مشکلات احتمالی که از عدم تست واحد ایجاد می‌شود** 
* توانایی **نصب و استفاده از MSTest برای نوشتن و اجرای تست‌های واحد** 
* توانایی **نصب و استفاده از NUnit برای نوشتن و اجرای تست‌های واحد** 
* توانایی **نصب و استفاده از Moq برای نوشتن اشیاء جعلی (Mock Objects)** 
* توانایی **نصب و استفاده از SpecFlow برای نوشتن نرم‌افزار مطابق با مشخصات مشتری** 
* توانایی **نوشتن تست‌هایی که ابتدا Fail می‌شوند، سپس Pass شوند و در نهایت هر Refactoring لازم را انجام دهید** 

---

## **نیازمندی‌های فنی **

برای دسترسی به فایل‌های کد این فصل، می‌توانید به این لینک مراجعه کنید:
[https://github.com/PacktPublishing/Clean-Code-in-C-/tree/master/CH06](https://github.com/PacktPublishing/Clean-Code-in-C-/tree/master/CH06) 

### **درک دلایل داشتن یک تست خوب **

به‌عنوان یک برنامه‌نویس، کار روی یک پروژه توسعه جدید که برایتان جذاب است بسیار لذت‌بخش است، مخصوصاً اگر انگیزه بالایی برای انجام آن داشته باشید. اما وقتی ناگهان مجبور می‌شوید برای رفع یک **باگ (Bug)** به پروژه‌ای دیگر بروید، این موضوع می‌تواند بسیار ناامیدکننده باشد. وضعیت بدتر وقتی است که آن کد، **کد خودتان نباشد** و شما درک کامل از پشت صحنه‌ی آن نداشته باشید. و بدتر از همه وقتی است که **کد خودتان باشد** و لحظه‌ای داشته باشید که فکر کنید: «واقعاً داشتم به چه چیزی فکر می‌کردم؟!»

هر چه بیشتر از توسعه جدید کنار گذاشته شوید تا به **نگهداری کد موجود** بپردازید، بیشتر به اهمیت **تست واحد (Unit Testing)** پی می‌برید. با افزایش این درک، به مزایای واقعی **یادگیری متدولوژی‌ها و تکنیک‌های تست مانند TDD و BDD** پی خواهید برد.

---

وقتی مدتی به‌عنوان برنامه‌نویس نگهداری روی کد دیگران کار کرده باشید، با **کد خوب، بد و زشت** مواجه می‌شوید. چنین تجربه‌ای می‌تواند به شما آموزش دهد که چه کارهایی را نباید انجام دهید و چرا، و در نتیجه روش بهتری برای برنامه‌نویسی یاد بگیرید. کدهای بد ممکن است باعث شوند فریاد بزنید: «نه! واقعاً نه!» و کدهای زشت ممکن است چشمتان را بسوزاند و ذهن شما را فلج کند. 

---

وقتی مستقیم با مشتریان در تماس هستید و به آن‌ها **پشتیبانی فنی** می‌دهید، اهمیت تجربه‌ی خوب مشتری را در موفقیت کسب‌وکار می‌بینید. برعکس، تجربه‌ی بد مشتری می‌تواند منجر به مشتریان بسیار ناراضی، عصبانی و حتی پرخاشگر شود و فروش به‌سرعت کاهش یابد، به‌ویژه اگر مشتریان نظر منفی خود را در شبکه‌های اجتماعی و سایت‌های نقد منتشر کنند. 

---

به‌عنوان **تک‌لید (Tech Lead)**، مسئولیت شما انجام **بازبینی کد فنی (Code Review)** است تا اطمینان حاصل شود که کارکنان از **راهنمای کدنویسی و سیاست‌های شرکت** پیروی می‌کنند، باگ‌ها را بررسی و اولویت‌بندی می‌کنید و به **مدیر پروژه** در مدیریت تیم خود کمک می‌کنید. مهارت‌های لازم شامل: **مدیریت پروژه سطح بالا، جمع‌آوری و تحلیل نیازمندی‌ها، طراحی معماری، برنامه‌نویسی پاک (Clean Programming)** و داشتن مهارت‌های ارتباطی خوب است. 

مدیر پروژه معمولاً تنها به **تحویل پروژه به موقع و طبق بودجه** اهمیت می‌دهد و چندان اهمیتی به نحوه‌ی کدنویسی شما نمی‌دهد؛ مهم این است که نرم‌افزار به‌موقع و مطابق با بودجه تحویل داده شود. همچنین کیفیت کد می‌تواند برند شرکت را تقویت یا تخریب کند. 

---

به‌عنوان تک‌لید، شما بین مدیر پروژه و تیم پروژه قرار دارید. در کار روزمره، **جلسات اسکرام (Scrum Meetings)** برگزار می‌کنید و با مشکلات روزمره برخورد می‌کنید: برنامه‌نویسان نیازمند منابع از تحلیل‌گران، تسترها منتظر رفع باگ‌ها، و غیره. سخت‌ترین کار، انجام **بازبینی کد همکاران (Peer Code Review)** و ارائه بازخورد سازنده است که نتیجه مطلوب بدهد بدون اینکه کسی آزرده شود. به همین دلیل **تست واحد و کدنویسی پاک** باید جدی گرفته شود. 

---

به همین دلیل، به‌عنوان تک‌لید، تشویق به **TDD** بسیار مهم است و بهترین راه **الگوبرداری از خودتان** است. حتی برنامه‌نویسان با تجربه ممکن است نسبت به TDD مقاومت داشته باشند، زیرا یادگیری و پیاده‌سازی آن **زمان‌بر** به نظر می‌رسد، مخصوصاً در کدهای پیچیده‌تر. اما اگر می‌خواهید واقعاً مطمئن باشید که پس از نوشتن کد، کیفیت آن تضمین شده و باگ به شما بازنمی‌گردد، **TDD یک روش عالی برای ارتقای مهارت‌های شماست**. 

---

همچنین، میزان اهمیت تست واحد به **حساسیت نرم‌افزار** بستگی دارد. باگ در یک اپلیکیشن ساده یادداشت‌برداری فاجعه‌آمیز نیست، اما در **صنعت دفاع یا سلامت** ممکن است عواقب مرگباری داشته باشد. مثال‌ها: موشک هدایت‌شده به سوی غیرنظامیان، تجهیزات پزشکی که به دلیل باگ باعث مرگ بیمار می‌شود یا نرم‌افزار ایمنی هواپیما که باعث سقوط می‌شود. 

هر چه نرم‌افزار حساس‌تر باشد، **تکنیک‌های تست واحد مانند TDD و BDD** اهمیت بیشتری پیدا می‌کنند. هنگام نوشتن نرم‌افزار، تصور کنید اگر شما مشتری بودید و کد خراب شد، چه پیامدی داشت؟ چگونه بر خانواده، دوستان و همکاران تأثیر می‌گذاشت؟ همچنین پیامدهای **اخلاقی و قانونی** را در نظر بگیرید. ‍‍‍

---

با اینکه گفته می‌شود: "برنامه‌نویس نباید کد خود را تست کند"، این تنها زمانی صحیح است که **کد تمام شده و آماده تست قبل از تولید** باشد. در طول برنامه‌نویسی، برنامه‌نویسان همیشه باید **کد خود را تست کنند**.

تست واحد به شما کمک می‌کند **عادات برنامه‌نویسی پاک** ایجاد کنید: ابتدا تست می‌نویسید، سپس کد کافی برای موفقیت تست اضافه می‌کنید و بعد کد را بازسازی (Refactor) می‌کنید. این چرخه باعث می‌شود کد شما **خواناتر، قابل نگهداری و قابل اعتماد** باشد. 

---

در حین نوشتن کد، تست‌ها باید **Atomic یا تک وظیفه‌ای** باشند؛ یعنی هر تست فقط یک ویژگی را بررسی کند. تست باید **تکرارپذیر، قابل اطمینان و سریع (میلی‌ثانیه‌ای)** باشد. کدهای تست طولانی یا وابسته به دیگر تست‌ها مناسب نیستند. اگر نیاز به یک ثانیه یا بیشتر دارند، باید **Refactor یا استفاده از Mock Objects** در نظر گرفته شود. ⏱

---

چرخه‌ی تست واحد شامل مراحل زیر است:

1. نوشتن **کلاس تست و شبه‌کد (Pseudocode)**
2. نوشتن **متدهای تست که ابتدا Fail می‌شوند**
3. نوشتن کد کافی برای **Pass شدن تست**
4. **Refactor کد** و ادامه به تست بعدی

---

در ادامه، فصل به بررسی **Use Case، Test Design، Test Case و Test Suite** و نحوه تعامل آن‌ها با یکدیگر می‌پردازد:

* **Use Case:** جریان عملیاتی یک عملیات واحد، مانند افزودن رکورد مشتری.
* **Test Design:** شامل یک یا چند **Test Case** برای سناریوهای مختلف Use Case.
* **Test Case:** می‌تواند دستی یا خودکار باشد.
* **Test Suite:** نرم‌افزاری برای کشف، اجرای تست‌ها و گزارش نتایج به کاربر نهایی.

توسعه‌دهندگان باید روی نوشتن و استفاده از **تست واحد خود** تمرکز کنند تا کدهایی که **Fail، Pass و Refactor** می‌شوند، تولید کنند. 

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-1.jpeg)
  
</div>

### **درک ابزارهای تست **

در این فصل، ما **تست‌های واحد (Unit Tests)** و **اشیاء جعلی (Mock Objects)** خواهیم نوشت. اما قبل از آن، باید با **ابزارهایی که به‌عنوان برنامه‌نویس C# در دسترس داریم** آشنا شویم.

ابزارهای تستی که در **Visual Studio** بررسی می‌کنیم عبارتند از: **MSTest، NUnit، Moq و SpecFlow**. هر ابزار تست، یک **کنسول اپلیکیشن** و پروژه تست مربوطه را ایجاد می‌کند.

* **NUnit و MSTest** فریم‌ورک‌های تست واحد هستند. NUnit نسبت به MSTest قدیمی‌تر است و **API کامل‌تر و بالغ‌تری** دارد. شخصاً **NUnit را ترجیح می‌دهم**.
* **Moq** با MSTest و NUnit متفاوت است؛ زیرا یک فریم‌ورک تست نیست، بلکه یک **فریم‌ورک Mocking** است. فریم‌ورک Mocking کلاس‌های واقعی پروژه شما را با پیاده‌سازی‌های جعلی (Fake) جایگزین می‌کند تا برای اهداف تست استفاده شود. می‌توان Moq را همراه با MSTest یا NUnit استفاده کرد.
* **SpecFlow** یک فریم‌ورک **BDD** است. ابتدا یک **Feature** در فایل Feature می‌نویسید با زبانی که هم کاربر و هم برنامه‌نویس فنی متوجه می‌شوند. سپس یک **Step File** برای آن Feature تولید می‌شود که شامل متدهایی به‌صورت گام‌های لازم برای پیاده‌سازی Feature است.

تا پایان این فصل، شما خواهید دانست هر ابزار چه کاری انجام می‌دهد و قادر خواهید بود از آن‌ها در پروژه‌های خود استفاده کنید. پس بیایید با **MSTest** شروع کنیم. 

---

### **MSTest **

در این بخش، **فریم‌ورک MSTest را نصب و پیکربندی** خواهیم کرد. یک **کلاس تست** با **متدهای تست** خواهیم نوشت و آن را مقداردهی اولیه (Initialize) می‌کنیم. همچنین **Assembly Setup و Cleanup، Class Cleanup، Method Cleanup** و **Assertions** را انجام می‌دهیم.

برای نصب **MSTest Framework** از **خط فرمان (Command Line)** در Visual Studio، ابتدا باید **Package Manager Console** را از مسیر زیر باز کنید:

**Tools | NuGet Package Manager | Package Manager Console** 

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-2.jpeg)
  
</div>

سپس، سه دستور زیر را اجرا کنید تا **فریم‌ورک MSTest نصب شود**:

```powershell
install-package mstest.testframework
install-package mstest.testadapter
install-package microsoft.net.tests.sdk
```

---

به‌طور جایگزین، می‌توانید یک پروژه جدید اضافه کنید و گزینه **Unit Test Project (.NET Framework)** را از مسیر **Context | Add** در **Solution Explorer** انتخاب کنید. 

در نام‌گذاری پروژه‌های تست، استاندارد پذیرفته‌شده به شکل زیر است:

```
<ProjectName>.Tests
```

این استاندارد کمک می‌کند تا پروژه‌های تست **به‌راحتی با پروژه اصلی مرتبط شوند** و آن‌ها را از پروژه‌ای که تحت تست قرار دارد، متمایز کند. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-3.jpeg)
  
</div>

### **کد پیش‌فرض تست واحد در MSTest **

کدی که در ادامه می‌بینید، **کد پیش‌فرض تست واحد** است که وقتی یک **پروژه MSTest** به **Solution** اضافه می‌کنید، تولید می‌شود. همان‌طور که مشاهده می‌کنید، این کلاس **Namespace** زیر را وارد می‌کند:

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
```

* **\[TestClass]** مشخص می‌کند که این کلاس یک **کلاس تست** برای **MS Test Framework** است.
* **\[TestMethod]** مشخص می‌کند که متد یک **متد تست** است. تمام کلاس‌هایی که این ویژگی را دارند، در **Test Explorer** ظاهر می‌شوند.

> ویژگی‌های **\[TestClass] و \[TestMethod] اجباری هستند**.

نمونه کد پیش‌فرض:

```csharp
namespace CH05_MSTestUnitTesting.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
        }
    }
}
```

---

### **ویژگی‌ها و متدهای اختیاری برای workflow کامل تست**

علاوه بر موارد بالا، می‌توان ویژگی‌های اختیاری زیر را نیز ترکیب کرد:

* `[AssemblyInitialize]`
* `[AssemblyCleanup]`
* `[ClassInitialize]`
* `[ClassCleanup]`
* `[TestInitialize]`
* `[TestCleanup]`

> همان‌طور که از نام آن‌ها پیداست، ویژگی‌های **Initialize** برای انجام مقداردهی اولیه در سطح **Assembly، Class و Method** قبل از اجرای تست‌ها استفاده می‌شوند. ویژگی‌های **Cleanup** نیز بعد از اجرای تست‌ها برای انجام عملیات پاک‌سازی مورد نیاز اجرا می‌شوند.

---

### **متد کمکی برای جدا کردن خروجی تست‌ها**

```csharp
private static void WriteSeparatorLine()
{
    Debug.WriteLine("--------------------------------------------------");
}
```

---

### **مثال‌های Initialize و Cleanup**

#### **AssemblyInitialize**

```csharp
[AssemblyInitialize]
public static void AssemblyInit(TestContext context)
{
    WriteSeparatorLine();
    Debug.WriteLine("Optional: AssemblyInitialize");
    Debug.WriteLine("Executes once before the test run.");
}
```

#### **ClassInitialize**

```csharp
[ClassInitialize]
public static void TestFixtureSetup(TestContext context)
{
    WriteSeparatorLine();
    Console.WriteLine("Optional: ClassInitialize");
    Console.WriteLine("Executes once for the test class.");
}
```

#### **TestInitialize**

```csharp
[TestInitialize]
public void Setup()
{
    WriteSeparatorLine();
    Debug.WriteLine("Optional: TestInitialize");
    Debug.WriteLine("Runs before each test.");
}
```

#### **AssemblyCleanup**

```csharp
[AssemblyCleanup]
public static void AssemblyCleanup()
{
    WriteSeparatorLine();
    Debug.WriteLine("Optional: AssemblyCleanup");
    Debug.WriteLine("Executes once after the test run.");
}
```

#### **ClassCleanup**

```csharp
[ClassCleanup]
public static void TestFixtureTearDown()
{
    WriteSeparatorLine();
    Debug.WriteLine("Optional: ClassCleanup");
    Debug.WriteLine("Runs once after all tests in the class have been executed.");
    Debug.WriteLine("Not guaranteed that it executes instantly after all tests the class have executed.");
}
```

#### **TestCleanup**

```csharp
[TestCleanup]
public void TearDown()
{
    WriteSeparatorLine();
    Debug.WriteLine("Optional: TestCleanup");
    Debug.WriteLine("Runs after each test.");
    Assert.Fail();
}
```

---

پس از قرار دادن این کد، **Solution** را Build کنید. سپس از منوی **Test** گزینه **Test Explorer** را انتخاب کنید. در **Test Explorer** می‌توانید تست‌ها را مشاهده کنید، همان‌طور که در تصویر نشان داده شده، هنوز هیچ تستی اجرا نشده است. 

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-4.jpeg)
  
</div>

پس بیایید تنها تست خود را اجرا کنیم. 

وای نه! تست ما **Fail شد**، همان‌طور که در تصویر زیر مشاهده می‌کنید: 

این همان مرحله‌ای است که **چرخه TDD** آغاز می‌شود: ابتدا تست‌ها Fail می‌شوند، سپس کد کافی نوشته می‌شود تا تست‌ها **Pass** شوند، و در نهایت کد **Refactor** می‌شود. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-5.jpeg)
  
</div>

کد **TestMethod1()** را به شکل زیر به‌روزرسانی کنید و سپس تست را دوباره اجرا کنید:

```csharp
[TestMethod]
public void TestMethod1()
{
    WriteSeparatorLine();
    Debug.WriteLine("Required: TestMethod");
    Debug.WriteLine("A test method to be run by the test runner.");
    Debug.WriteLine("This method will appear in the test list.");
    Assert.IsTrue(true);
}
```

پس از این تغییر، مشاهده خواهید کرد که **تست در Test Explorer با موفقیت Pass شد** ، همان‌طور که در تصویر بعدی نمایش داده شده است.

این نشان‌دهنده مرحله دوم چرخه **TDD** است: نوشتن کدی که تست‌ها را پاس می‌کند. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-6.jpeg)
  
</div>

پس، همان‌طور که از **تصاویر قبلی** مشاهده می‌کنید:

* **تست‌هایی که اجرا نشده‌اند** آبی هستند 
* **تست‌هایی که Fail شده‌اند** قرمز هستند 
* **تست‌هایی که Pass شده‌اند** سبز هستند 

برای مشاهده جزئیات بیشتر، مسیر زیر را دنبال کنید:
**Tools | Options | Debugging | General** و گزینه **Redirect all Output Window text to the Immediate Window** را انتخاب کنید.
سپس به مسیر **Run | Debug All Tests** بروید.

هنگامی که تست‌ها اجرا می‌شوند و خروجی در **Immediate Window** چاپ می‌شود، به‌وضوح می‌توانید **ترتیب اجرای Attributeها** را مشاهده کنید.
تصویر زیر خروجی متدهای تست ما را نشان می‌دهد، که ترتیب و عملکرد هر Attribute مشخص است. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-7.jpeg)
  
</div>

همان‌طور که تاکنون مشاهده کرده‌اید، ما از دو متد **Assert** استفاده کرده‌ایم:

* `Assert.Fail()`
* `Assert.IsTrue(true)` 

کلاس **Assert** بسیار کاربردی است و بنابراین آشنایی با **متدهای موجود در این کلاس برای تست واحد** بسیار مفید است.

متدهای قابل استفاده در کلاس Assert به شرح زیر هستند: 

(در ادامه فصل، هر یک از این متدها با توضیح کاربرد و مثال ارائه می‌شوند تا بتوانید از آن‌ها در **Unit Testing** استفاده کنید.)
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-8.jpeg)
  
</div>

حالا که با **MSTest** آشنا شدیم، زمان آن رسیده که **NUnit** را بررسی کنیم. 

---

### **NUnit**

اگر **NUnit** برای Visual Studio نصب نشده است، آن را از مسیر زیر دانلود و نصب کنید:
**Extensions | Manage Extensions**

سپس یک **NUnit Test Project (.NET Core)** جدید ایجاد کنید.

کد زیر کلاس پیش‌فرضی است که NUnit ایجاد می‌کند، به نام **Tests**:

```csharp
public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void Test1()
    {
        Assert.Pass();
    }
}
```

---

همان‌طور که در متد **Test1** مشاهده می‌کنید، متدهای تست نیز از کلاس **Assert** استفاده می‌کنند، درست مانند **MSTest** برای بررسی Assertions در کد.

کلاس **Assert در NUnit** متدهای مختلفی را در اختیار ما قرار می‌دهد. توجه داشته باشید که متدهایی که با **\[NUnit]** مشخص شده‌اند، اختصاصی **NUnit** هستند و سایر متدها در **MSTest** نیز موجودند. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-9.jpeg)
  
</div>

### **چرخه حیات NUnit **

چرخه حیات **NUnit** به شکل زیر است:

1. **TestFixtureSetup** قبل از اجرای اولین **SetUp** اجرا می‌شود (یک بار).
2. **SetUp** قبل از هر تست اجرا می‌شود.
3. بعد از اجرای هر تست، **TearDown** اجرا می‌شود.
4. در نهایت، **TestFixtureTearDown** بعد از آخرین **TearDown** اجرا می‌شود (یک بار).

حالا کلاس **Tests** را به‌روزرسانی می‌کنیم تا بتوانیم چرخه حیات NUnit را در عمل مشاهده کنیم:

```csharp
using System;
using System.Diagnostics;
using NUnit.Framework;

namespace CH06_NUnitUnitTesting.Tests
{
    [TestFixture]
    public class Tests : IDisposable
    {
        public TestClass()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Constructor");
        }

        public void Dispose()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Dispose");
        }

        private static void WriteSeparatorLine()
        {
            Debug.WriteLine("--------------------------------------------------");
        }

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            WriteSeparatorLine();
            Debug.WriteLine("OneTimeSetUp");
            Debug.WriteLine("This method is run once before any tests in this class are run.");
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            WriteSeparatorLine();
            Debug.WriteLine("OneTimeTearDown");
            Debug.WriteLine("This method is run once after all tests in this class have been run.");
            Debug.WriteLine("This method runs even when an exception occurs.");
        }

        [SetUp]
        public void Setup()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Setup");
            Debug.WriteLine("This method is run before each test method is run.");
        }

        [TearDown]
        public void Teardown()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Teardown");
            Debug.WriteLine("This method is run after each test method has been run.");
            Debug.WriteLine("This method runs even when an exception occurs.");
        }

        [Test]
        [Order(0)]
        public void Test1()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Test:Test1");
            Debug.WriteLine("Order: 0");
            Assert.Pass("Test 1 passed with flying colours.");
        }

        [Test]
        [Order(1)]
        public void Test2()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Test:Test2");
            Debug.WriteLine("Order: 1");
            Assert.Inconclusive("Test 2 is inconclusive.");
        }

        [Test]
        [Order(2)]
        public void Test3()
        {
            WriteSeparatorLine();
            Debug.WriteLine("Test:Test3");
            Debug.WriteLine("Order: 2");
            Assert.Fail("Test 3 failed dismally.");
        }
    }
}
```

---

* ما **\[TestFixture]** را به کلاس اضافه کرده‌ایم و رابط **IDisposable** را پیاده‌سازی کرده‌ایم.
* متد **WriteSeparatorLine()** برای جدا کردن خروجی دیباگ استفاده می‌شود.
* **\[OneTimeSetUp]** فقط یک بار قبل از تمامی تست‌ها اجرا می‌شود.
* **\[OneTimeTearDown]** بعد از اجرای همه تست‌ها و قبل از Dispose شدن کلاس اجرا می‌شود.
* **\[SetUp]** قبل از هر تست و **\[TearDown]** بعد از هر تست اجرا می‌شوند.

---

### ترتیب اجرای تست‌ها با ویژگی \[Order]

* **Test1**: \[Order(0)] → Pass 
* **Test2**: \[Order(1)] → Inconclusive 
* **Test3**: \[Order(2)] → Fail 

---

وقتی تمام تست‌ها را دیباگ می‌کنید، خروجی **Immediate Window** ترتیب اجرای متدها و چرخه حیات NUnit را نشان خواهد داد. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-10.jpeg)
  
</div>

اکنون شما با **MSTest** و **NUnit** آشنا شده‌اید و چرخه حیات تست هر فریم‌ورک را در عمل دیده‌اید. 
حالا زمان آن رسیده که به **Moq** نگاهی بیندازیم. 

همان‌طور که از جدول متدهای **NUnit** در مقایسه با جدول متدهای **MSTest** مشاهده می‌کنید، **NUnit** امکان تست واحد دقیق‌تر و با عملکرد بهتر نسبت به MSTest را فراهم می‌کند، به همین دلیل بیشتر از MSTest مورد استفاده قرار می‌گیرد. 

---

### **Moq**

یک **Unit Test** باید فقط **متد تحت تست** را بررسی کند.
به نمودار زیر توجه کنید: 

اگر متد تحت تست، متدهای دیگری را صدا بزند—چه در همان کلاس و چه در کلاس‌های دیگر—در این صورت **نه تنها متد تحت تست، بلکه متدهای دیگر نیز مورد تست قرار می‌گیرند**.

این همان جایی است که **Moq** وارد عمل می‌شود و به شما اجازه می‌دهد **متدهای وابسته را به صورت شبیه‌سازی‌شده (Mock) جایگزین کنید** تا فقط متد اصلی تحت تست باقی بماند. 
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-11.jpeg)
  
</div>

### **Moq – استفاده از اشیاء شبیه‌سازی‌شده (Mock Objects) **

یکی از راه‌های حل مشکل تست متدهایی که به متدهای دیگر وابسته‌اند، استفاده از **اشیاء شبیه‌سازی‌شده (mock/fake objects)** است. 

* یک **mock object** فقط **متدی را که می‌خواهید تست کنید** بررسی می‌کند.
* شما می‌توانید رفتار mock را به هر نحوی که می‌خواهید تنظیم کنید.
* اگر خودتان بخواهید mock بسازید، خیلی زود متوجه می‌شوید که کار سخت و زمان‌بری است؛ مخصوصاً در پروژه‌های حساس به زمان و وقتی کد پیچیده می‌شود، ساخت mock پیچیده‌تر خواهد شد.

به همین دلیل معمولاً از **فریم‌ورک‌های Mock** استفاده می‌کنیم. دو نمونه معروف برای **.NET Framework** عبارت‌اند از **Rhino Mocks** و **Moq**. 
در این فصل، فقط با **Moq** کار می‌کنیم چون نسبت به Rhino Mocks ساده‌تر است. 

---

### روند تست با Moq

1. ابتدا **mock object** را ایجاد می‌کنیم.
2. رفتار آن را پیکربندی می‌کنیم.
3. بررسی می‌کنیم که پیکربندی درست کار می‌کند و mock فراخوانی شده است.

> نکته: **Moq فقط اشیاء شبیه‌سازی‌شده تولید می‌کند و خودش کد را تست نمی‌کند**. هنوز به یک **فریم‌ورک تست** مانند **NUnit** نیاز دارید. 

---

### مثال عملی: ترکیب Moq و NUnit

1. یک **Console Application** جدید ایجاد کرده و نام آن را `CH06_Moq` بگذارید.
2. اینترفیس و کلاس‌های زیر را اضافه کنید: **IFoo, Bar, Baz, UnitTests**.
3. از **NuGet Package Manager**، بسته‌های **Moq, NUnit, NUnit3TestAdapter** را نصب کنید.

#### کلاس Bar

```csharp
namespace CH06_Moq
{
    public class Bar
    {
        public virtual Baz Baz { get; set; }
        public virtual bool Submit() { return false; }
    }
}
```

* Bar شامل یک **property مجازی از نوع Baz** و یک **متد مجازی Submit()** است که مقدار `false` برمی‌گرداند.

#### کلاس Baz

```csharp
namespace CH06_Moq
{
    public class Baz
    {
        public virtual string Name { get; set; }
    }
}
```

* Baz فقط یک property مجازی از نوع **string** دارد به نام **Name**.

#### اینترفیس IFoo

```csharp
namespace CH06_Moq
{
    public interface IFoo
    {
        Bar Bar { get; set; }
        string Name { get; set; }
        int Value { get; set; }
        bool DoSomething(string value);
        bool DoSomething(int number, string value);
        string DoSomethingStringy(string value);
        bool TryParse(string value, out string outputValue);
        bool Submit(ref Bar bar);
        int GetCount();
        bool Add(int value);
    }
}
```

* این اینترفیس شامل چندین property و متد است و ارجاعی به کلاس **Bar** دارد، که خود Bar هم ارجاع به Baz دارد.

---

### کلاس UnitTests برای NUnit و Moq

```csharp
using Moq;
using NUnit.Framework;
using System;

namespace CH06_Moq
{
    [TestFixture]
    public class UnitTests
    {
    }
}
```

---

### متد AssertThrows

```csharp
public bool AssertThrows<TException>(
    Action action,
    Func<TException, bool> exceptionCondition = null
) where TException : Exception
{
    try
    {
        action();
    }
    catch (TException ex)
    {
        if (exceptionCondition != null)
            return exceptionCondition(ex);
        return true;
    }
    catch
    {
        return false;
    }
    return false;
}
```

* این متد بررسی می‌کند که **آیا Exception مشخص شده پرتاب شده است یا نه**. 

---

### مثال‌های عملی با Moq

#### متد DoSomethingReturnsTrue

```csharp
[Test]
public void DoSomethingReturnsTrue()
{
    var mock = new Mock<IFoo>();
    mock.Setup(foo => foo.DoSomething("ping")).Returns(true);
    Assert.IsTrue(mock.Object.DoSomething("ping"));
}
```

* ایجاد یک mock از IFoo
* تنظیم متد DoSomething برای مقدار "ping" که **true** برگرداند
* بررسی اینکه خروجی واقعاً **true** است 

#### متد DoSomethingReturnsFalse

```csharp
[Test]
public void DoSomethingReturnsFalse()
{
    var mock = new Mock<IFoo>();
    mock.Setup(foo => foo.DoSomething("tracert")).Returns(false);
    Assert.IsFalse(mock.Object.DoSomething("tracert"));
}
```

* مشابه مثال قبل، ولی برای مقدار "tracert" خروجی **false** برمی‌گردد 

#### متد OutArguments

```csharp
[Test]
public void OutArguments()
{
    var mock = new Mock<IFoo>();
    var outString = "ack";
    mock.Setup(foo => foo.TryParse("ping", out outString)).Returns(true);
    Assert.AreEqual("ack", outString);
    Assert.IsTrue(mock.Object.TryParse("ping", out outString));
}
```

* تست خروجی از نوع **out parameter** و بررسی مقدار آن

#### متد RefArguments

```csharp
[Test]
public void RefArguments()
{
    var instance = new Bar();
    var mock = new Mock<IFoo>();
    mock.Setup(foo => foo.Submit(ref instance)).Returns(true);
    Assert.AreEqual(true, mock.Object.Submit(ref instance));
}
```

* تست ورودی از نوع **ref** و بررسی مقدار برگشتی

#### متد AccessInvocationArguments

```csharp
[Test]
public void AccessInvocationArguments()
{
    var mock = new Mock<IFoo>();
    mock.Setup(foo => foo.DoSomethingStringy(It.IsAny<string>()))
        .Returns((string s) => s.ToLower());
    Assert.AreEqual("i like oranges!", mock.Object.DoSomethingStringy("I LIKE ORANGES!"));
}
```

* تست متدی که رشته ورودی را به **حروف کوچک** تبدیل می‌کند 

#### متد ThrowingWhenInvokedWithSpecificParameters

```csharp
[Test]
public void ThrowingWhenInvokedWithSpecificParameters()
{
    var mock = new Mock<IFoo>();
    mock.Setup(foo => foo.DoSomething("reset")).Throws<InvalidOperationException>();
    mock.Setup(foo => foo.DoSomething("")).Throws(new ArgumentException("command"));
    Assert.IsTrue(
        AssertThrows<InvalidOperationException>(() => mock.Object.DoSomething("reset"))
    );
    Assert.IsTrue(
        AssertThrows<ArgumentException>(() => mock.Object.DoSomething(""))
    );
    Assert.Throws(
        Is.TypeOf<ArgumentException>()
          .And.Message.EqualTo("command"),
          () => mock.Object.DoSomething("")
    );
}
```

* تنظیم رفتار برای پرتاب **Exception** بر اساس پارامتر ورودی 

---

 تا اینجا شما دیدید که چگونه از **Moq** برای ساخت **mock objects** و تست کد با **NUnit** استفاده می‌کنیم.

فریم‌ورک بعدی که بررسی خواهیم کرد، **SpecFlow** است که یک ابزار **BDD** می‌باشد. 

### **SpecFlow – تست رفتاری کاربرمحور (BDD) **

**SpecFlow** برای پیاده‌سازی **BDD (Behavior Driven Development)** استفاده می‌شود، روشی برای توسعه نرم‌افزار که از **TDD (Test Driven Development)** تکامل یافته است. 

* در BDD، **تست‌ها قبل از نوشتن کد** بر اساس رفتار کاربر طراحی می‌شوند.
* کار با **لیست ویژگی‌ها (Features)** شروع می‌شود؛ این ویژگی‌ها به زبان رسمی و کسب‌وکاری نوشته می‌شوند تا **تمام ذی‌نفعان پروژه** بتوانند آن‌ها را درک کنند. 
* پس از تأیید و تولید ویژگی‌ها، توسعه‌دهندگان **Step Definitions** را برای هر ویژگی ایجاد می‌کنند.
* سپس یک پروژه خارجی برای پیاده‌سازی ویژگی ساخته و به پروژه اصلی ارجاع داده می‌شود.
* Step Definitions برای پیاده‌سازی کد واقعی ویژگی توسعه داده می‌شوند.

 **مزیت این رویکرد:**
به عنوان برنامه‌نویس، مطمئن هستید که دقیقاً آنچه **کسب‌وکار خواسته** را ارائه می‌دهید، نه چیزی که فکر می‌کنید خواسته شده است. این روش می‌تواند **هزینه‌ها و زمان زیادی را صرفه‌جویی کند**. تجربه نشان داده که بسیاری از پروژه‌ها به دلیل **عدم وضوح خواسته‌ها بین تیم‌های کسب‌وکار و برنامه‌نویسی** شکست خورده‌اند.

---

### مثال عملی: پیاده‌سازی یک ماشین‌حساب ساده 

1. یک **Class Library جدید** بسازید و بسته‌های زیر را اضافه کنید:

   * NUnit
   * NUnit3TestAdapter
   * SpecFlow
   * SpecRun.SpecFlow
   * SpecFlow\.NUnit

2. یک **SpecFlow Feature File** جدید با نام `Calculator` بسازید:

```gherkin
Feature: Calculator
  In order to avoid silly mistakes
  As a math idiot
  I want to be told the sum of two numbers

  @mytag
  Scenario: Add two numbers
    Given I have entered 50 into the calculator
    And I have entered 70 into the calculator
    When I press add
    Then the result should be 120 on the screen
```

* متن بالا به صورت **خودکار** در فایل `Calculator.feature` اضافه می‌شود و **نقطه شروع یادگیری BDD با SpecFlow** است.

> **نکته:** 
SpecFlow و SpecMap اکنون توسط **Tricentis** خریداری شده‌اند و **همچنان رایگان** خواهند بود، بنابراین زمان خوبی برای یادگیری و استفاده از آن‌ها است.

---

### ایجاد Step Definitions

* پس از داشتن فایل Feature، باید **Step Definitions** ایجاد کنید تا درخواست‌های ویژگی به کد شما متصل شوند.
* روی فایل Feature **راست‌کلیک** کنید و از منوی زمینه گزینه **Generate Step Definitions** را انتخاب کنید.
* یک پنجره دیالوگ برای ایجاد Step Definitions ظاهر می‌شود که مراحل بعدی آموزش BDD را شروع می‌کند.

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-12.jpeg)
  
</div>

### **ایجاد کلاس Step Definitions – CalculatorSteps **

1. **نام کلاس** را `CalculatorSteps` وارد کنید.
2. روی **Generate** کلیک کنید تا Step Definitions ایجاد شود و فایل ذخیره گردد.
3. فایل `CalculatorSteps.cs` را باز کنید. محتوای آن به شکل زیر خواهد بود:

```csharp
using TechTalk.SpecFlow;

namespace CH06_SpecFlow
{
    [Binding]
    public class CalculatorSteps
    {
        [Given(@"I have entered (.*) into the calculator")]
        public void GivenIHaveEnteredIntoTheCalculator(int p0)
        {
            ScenarioContext.Current.Pending();
        }

        [When(@"I press add")]
        public void WhenIPressAdd()
        {
            ScenarioContext.Current.Pending();
        }

        [Then(@"the result should be (.*) on the screen")]
        public void ThenTheResultShouldBeOnTheScreen(int p0)
        {
            ScenarioContext.Current.Pending();
        }
    }
}
```

* همان‌طور که می‌بینید، **Step Definitions** ایجاد شده با **عبارات Feature File** مطابقت دارد.
* متدهای `[Given]`، `[When]` و `[Then]` به صورت خودکار ایجاد شده‌اند و در حال حاضر **در حالت Pending** هستند تا بعداً کد واقعی برای آنها نوشته شود. 

> **نکته:** این مطابقت بین Feature و Steps تضمین می‌کند که تست‌های رفتاری دقیقاً همان چیزی را بررسی کنند که در Feature File مشخص شده است.
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/06/Table%206-13.jpeg)
  
</div>

### **پیاده‌سازی Feature در فایل جداگانه – CH06\_SpecFlow\.Implementation **

1. یک **Class Library جدید** ایجاد کنید و نام آن را `CH06_SpecFlow.Implementation` بگذارید.
2. در آن یک فایل جدید به نام `Calculator.cs` اضافه کنید.
3. به پروژه SpecFlow یک **Reference** به این کتابخانه اضافه کنید.
4. در بالای فایل `CalculatorSteps.cs` این خط را اضافه کنید:

```csharp
private Calculator _calculator = new Calculator();
```

---

### **گسترش Step Definitions برای اجرای کد برنامه**

#### 1⃣ افزودن Properties در کلاس Calculator

در بالای کلاس Calculator دو **Property عمومی** اضافه کنید:

```csharp
public int FirstNumber { get; set; }
public int SecondNumber { get; set; }
```

#### 2⃣ به‌روزرسانی متد `[Given]`

در کلاس `CalculatorSteps`، متد `GivenIHaveEnteredIntoTheCalculator()` را به شکل زیر تغییر دهید:

```csharp
[Given(@"I have entered (.*) into the calculator")]
public void GivenIHaveEnteredIntoTheCalculator(int number)
{
    _calculator.FirstNumber = number;
}
```

#### 3⃣ افزودن متد دوم `[Given]`

اگر متد `GivenIHaveAlsoEnteredIntoTheCalculator()` موجود نیست، اضافه کنید:

```csharp
public void GivenIHaveAlsoEnteredIntoTheCalculator(int number)
{
    _calculator.SecondNumber = number;
}
```

---

### **افزودن متغیر نتیجه و متد Add()**

1. در بالای کلاس `CalculatorSteps` و قبل از هر Step، متغیر زیر را اضافه کنید:

```csharp
private int _result;
```

2. در کلاس `Calculator`، متد `Add()` را اضافه کنید:

```csharp
public int Add()
{
    return FirstNumber + SecondNumber;
}
```

---

### **به‌روزرسانی متد `[When]`**

در کلاس `CalculatorSteps` متد `WhenIPressAdd()` را به شکل زیر تغییر دهید:

```csharp
[When(@"I press add")]
public void WhenIPressAdd()
{
    _result = _calculator.Add();
}
```

---

### **به‌روزرسانی متد `[Then]`**

در کلاس `CalculatorSteps` متد `ThenTheResultShouldBeOnTheScreen()` را تغییر دهید:

```csharp
[Then(@"the result should be (.*) on the screen")]
public void ThenTheResultShouldBeOnTheScreen(int expectedResult)
{
    Assert.AreEqual(expectedResult, _result);
}
```

---

 **تست و اجرای پروژه**

* پروژه را **Build** کنید و تست‌ها را اجرا کنید.
* خواهید دید که **تمام تست‌ها با موفقیت گذرانده شدند**.
* فقط کدی نوشته شده که برای پاس شدن Feature لازم بود.

---

 **منابع بیشتر:** برای اطلاعات بیشتر درباره SpecFlow به [SpecFlow Documentation](https://specflow.org/docs/) مراجعه کنید.

در ادامه، پس از معرفی ابزارها، نوبت به **نمونه ساده‌ای از TDD** می‌رسد:

* ابتدا کدی می‌نویسیم که **Fail** می‌شود.
* سپس فقط به‌اندازه لازم برای **Compile شدن تست** کد می‌نویسیم.
* در نهایت، کد را **Refactor** می‌کنیم. 

### **تمرین روش‌شناسی TDD – Fail, Pass و Refactor **

در این بخش، شما خواهید آموخت که چگونه تست‌هایی بنویسید که ابتدا **Fail** شوند. سپس تنها به‌اندازه لازم کد می‌نویسیم تا تست **Pass** شود و در نهایت، در صورت نیاز، **Refactor** انجام می‌دهیم تا کد تمیزتر و قابل استفاده مجدد شود.

---

### **چرا به TDD نیاز داریم؟ **

در بخش قبل، دیدید که چگونه می‌توان با استفاده از **Feature Files** و **Step Files** کدی نوشت که نیاز کسب‌وکار را برآورده کند. اما یک روش دیگر برای تضمین اینکه کد شما **مطابق با نیازهای کسب‌وکار** باشد، استفاده از **TDD** است.

* در TDD ابتدا یک تست می‌نویسید که **Fail** شود.
* سپس تنها کد لازم برای **Pass** کردن تست را می‌نویسید.
* در نهایت، در صورت نیاز، کد را Refactor می‌کنید.

این چرخه تا زمانی که **تمام Features** کدنویسی شوند، تکرار می‌شود.

---

### **نقش TDD در نرم‌افزارهای حیاتی **

برخی نرم‌افزارها نمی‌توانند دارای باگ باشند، مانند:

* سیستم‌های مالی  که سرمایه‌های خصوصی و تجاری را مدیریت می‌کنند.
* تجهیزات پزشکی ، شامل دستگاه‌های حیاتی و اسکن، که نرم‌افزار صحیح برای عملکرد لازم دارند.
* نرم‌افزارهای مدیریت ترافیک و ناوبری .
* سیستم‌های فضایی  و سیستم‌های تسلیحاتی .

در چنین پروژه‌هایی، TDD تضمین می‌کند که کد **مطمئن و قابل اطمینان** نوشته شود.

---

### **مراحل TDD **

1. یک **پروژه جدید** ایجاد کنید (`CH06_FailPassRefactor`).
2. یک کلاس به نام `UnitTests` بسازید و **Pseudocode** زیر را در آن قرار دهید:

```csharp
using NUnit.Framework;

namespace CH06_FailPassRefactor
{
    [TestFixture]
    public class UnitTests
    {
        // The PseudoCode.
        // [1] Call a method to log an exception.
        // [2] Build up the text to log including all inner exceptions.
        // [3] Write the text to a file with a timestamp.
    }
}
```

---

### **نوشتن اولین تست – Fail Test**

```csharp
[Test]
public void LogException()
{
    var logger = new Logger();
    var logFileName = logger.Log(new ArgumentException("Argument cannot be null"));
    Assert.Pass();
}
```

> این تست اجرا نمی‌شود زیرا کلاس **Logger** وجود ندارد.

1. یک کلاس داخلی به نام `Logger` بسازید.
2. سپس تست را اجرا کنید. همچنان Fail خواهد شد زیرا متد `Log()` وجود ندارد.
3. متد `Log()` را اضافه کنید تا تست Pass شود.

---

### **ایجاد Exception با Inner Exception**

```csharp
private Exception GetException()
{
    return new Exception(
        "Exception: Main exception.",
        new Exception(
            "Exception: Inner Exception.",
            new Exception("Exception: Inner Exception Inner Exception")
        )
    );
}
```

---

### **تست وجود فایل لاگ**

```csharp
[Test]
public void CheckFileExists()
{
    var logger = new Logger();
    var logFile = logger.Log(GetException());
    FileAssert.Exists(logFile);
}
```

> در ابتدا این تست Fail خواهد شد.

* در کلاس `Logger` یک **StringBuilder خصوصی** اضافه کنید:

```csharp
private StringBuilder _stringBuilder;
```

* متد `Log()` و متد `SaveLog()` را اضافه کنید تا فایل لاگ ایجاد شود:

```csharp
public string Log(Exception ex)
{
    _stringBuilder = new StringBuilder();
    return SaveLog();
}

private string SaveLog()
{
    var fileName = $"LogFile{DateTime.UtcNow.GetHashCode()}.txt";
    var dir = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
    var file = $"{dir}\\{fileName}";
    return file;
}
```

---

### **تست پیام Exception شامل Inner Exception**

```csharp
[Test]
public void ContainsMessage()
{
    var logger = new Logger();
    var logFile = logger.Log(GetException());
    var msg = File.ReadAllText(logFile);
    Assert.IsTrue(msg.Contains("Exception: Inner Exception Inner Exception"));
}
```

* اکنون باید متدی بسازیم که پیام Exception و Inner Exception‌ها را بسازد:

```csharp
private void BuildExceptionMessage(Exception ex, bool isInnerException)
{
    if (isInnerException)
        _stringBuilder.Append("Inner Exception: ").AppendLine(ex.Message);
    else
        _stringBuilder.Append("Exception: ").AppendLine(ex.Message);

    if (ex.InnerException != null)
        BuildExceptionMessage(ex.InnerException, true);
}
```

* متد `Log()` را به‌روزرسانی کنید:

```csharp
public string Log(Exception ex)
{
    _stringBuilder = new StringBuilder();
    _stringBuilder.AppendLine("--------------------------------------------------------------");
    BuildExceptionMessage(ex, false);
    _stringBuilder.AppendLine("--------------------------------------------------------------");
    return SaveLog();
}
```

---

### **Refactor کد با کلاس Text **

* کلاس جدید `Text` بسازید و پیام Exception و Inner Exception‌ها را مدیریت کنید:

```csharp
public class Text
{
    private StringBuilder _stringBuilder = new StringBuilder();

    public string ExceptionMessage => _stringBuilder.ToString();

    public void BuildExceptionMessage(Exception ex, bool isInnerException)
    {
        if (isInnerException)
            _stringBuilder.Append("Inner Exception: ").AppendLine(ex.Message);
        else
        {
            _stringBuilder.AppendLine("--------------------------------------------------------------");
            _stringBuilder.Append("Exception: ").AppendLine(ex.Message);
        }

        if (ex.InnerException != null)
            BuildExceptionMessage(ex.InnerException, true);
        else
            _stringBuilder.AppendLine("--------------------------------------------------------------");
    }

    public string GetHashedTextFileName(string name, SpecialFolder folder)
    {
        var fileName = $"{name}-{DateTime.UtcNow.GetHashCode()}.txt";
        var dir = Environment.GetFolderPath(folder);
        return $"{dir}\\{fileName}";
    }
}
```

* کلاس `Logger` را به شکل زیر بازنویسی کنید:

```csharp
private Text _text;

public string Log(Exception ex)
{
    BuildMessage(ex);
    return SaveLog();
}

private void BuildMessage(Exception ex)
{
    _text = new Text();
    _text.BuildExceptionMessage(ex, false);
}

private string SaveLog()
{
    var filename = _text.GetHashedTextFileName("Log", Environment.SpecialFolder.MyDocuments);
    File.WriteAllText(filename, _text.ExceptionMessage);
    return filename;
}
```

 **نتیجه:**
تمام تست‌ها اکنون پاس هستند و کد تمیزتر، خواناتر و قابل استفاده مجدد است.

---

در بخش بعد، نگاهی کوتاه به **تست‌های تکراری (Redundant Tests)** خواهیم داشت. 

### **حذف تست‌های تکراری، کامنت‌ها و کد مرده **

همان‌طور که در کتاب اشاره شد، هدف ما نوشتن **کد تمیز** است. با رشد برنامه‌ها و تست‌ها و انجام Refactor، برخی از کدها ممکن است **تکراری یا بلااستفاده** شوند.

* **کد مرده (Dead Code)** به هر کدی گفته می‌شود که تکراری است و هیچ‌گاه اجرا نمی‌شود.
* کد مرده باید بلافاصله حذف شود، زیرا هرچند در کد نهایی اجرا نمی‌شود، اما همچنان بخشی از **کدبیس** است که باید نگهداری شود.
* فایل‌هایی که کد مرده دارند طولانی‌تر و خواندن آن‌ها سخت‌تر است. این موضوع می‌تواند باعث **گیجی برنامه‌نویس** و اتلاف وقت شود، مخصوصاً برای کسانی که تازه به پروژه وارد شده‌اند.

---

### **کامنت‌ها **

* کامنت‌ها در صورتی مفید هستند که **به درستی** نوشته شوند، به‌ویژه برای **مستندسازی API**.
* برخی کامنت‌ها فقط **صدای اضافی** به فایل اضافه می‌کنند و می‌توانند برنامه‌نویس را آزار دهند.
* دیدگاه‌ها درباره کامنت‌ها متفاوت است:

  1. گروهی همه چیز را کامنت می‌کنند.
  2. گروهی هیچ کامنتی نمی‌گذارند، زیرا معتقدند کد باید **مانند یک کتاب خوانده شود**.
  3. گروهی متعادل عمل می‌کنند و فقط زمانی کامنت می‌گذارند که برای درک کد ضروری باشد.

> اگر با کامنت‌هایی مانند:
> `"This generates a random bug every so often. Don't know why. But you're welcome to fix it!"`
> مواجه شدید، باید **هشدار دهید**. برنامه‌نویس باید تا یافتن و رفع باگ، کد را ترک نکند.

* اگر بلوک‌های کامنت‌شده‌ای از کد مشاهده کردید که **تایید شده‌اند**، آن‌ها را حذف کنید. نسخه کنترل (Version Control) امکان بازیابی آن‌ها را فراهم می‌کند.

---

### **خوانایی کد **

* کد باید **مانند یک کتاب خوانده شود**.
* از نوشتن کد **مرموز یا پیچیده فقط برای جلب توجه** خودداری کنید.
* بازگشت به کد خودتان پس از چند هفته ممکن است باعث سردرگمی شود اگر کد پیچیده باشد.

---

### **تست‌های تکراری **

* تست‌های تکراری باید حذف شوند.
* فقط تست‌هایی اجرا شوند که **ضروری هستند**.
* تست‌های کد تکراری **هیچ ارزشی ندارند** و می‌توانند زمان زیادی را هدر دهند.
* در محیط‌های CI/CD که تست‌ها در **کلود** اجرا می‌شوند، تست‌های اضافی و کد مرده **هزینه‌های عملیاتی** ایجاد می‌کنند.

> هرچه خطوط کد کمتری آپلود، بیلد و تست شوند، هزینه کمتری برای شرکت خواهد داشت.

---

### **خلاصه فصل **

1. اهمیت نوشتن **Unit Test** برای تولید کد با کیفیت بررسی شد.

2. مشکلات نظری ناشی از باگ‌ها و تأثیرات آن‌ها مانند خسارت‌های مالی و حتی خطرات جانی بیان شد.

3. ویژگی‌های یک **Unit Test خوب**:

   * Atomic
   * Deterministic
   * Repeatable
   * Fast

4. ابزارهای TDD و BDD بررسی شد:

   * MSTest و NUnit
   * Moq برای تست **Mock Objects**
   * SpecFlow برای نوشتن Feature‌ها به زبان کسب‌وکار

5. مثال عملی TDD با روش **Fail, Pass, Refactor** ارائه شد.

6. ضرورت حذف **کامنت‌های اضافی، تست‌های تکراری و کد مرده** توضیح داده شد.

---

### **سؤالات برای مرور **

1. یک Unit Test خوب چه ویژگی‌هایی دارد؟
2. یک Unit Test خوب چه چیزی نباید باشد؟
3. TDD مخفف چیست؟
4. BDD مخفف چیست؟
5. Unit Test چیست؟
6. Mock Object چیست؟
7. Fake Object چیست؟
8. چند فریمورک Unit Testing نام ببرید.
9. چند فریمورک Mocking نام ببرید.
10. یک فریمورک BDD نام ببرید.
11. چه مواردی باید از فایل‌های کد حذف شوند؟

---

### **مطالعه بیشتر **

* مروری کوتاه بر Unit Testing، شامل **Integration Testing**، **Acceptance Testing** و **شرح وظایف تستر**:
  [softwaretestingfundamentals.com/unit-testing](http://softwaretestingfundamentals.com/unit-testing)

* صفحه اصلی **Rhino Mocks**:
  [hibernatingrhinos.com/oss/rhino-mocks](http://hibernatingrhinos.com/oss/rhino-mocks)
