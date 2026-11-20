---
layout: layout.njk
title: Exception Handling
---
# فصل پنجم:  مدیریت استثناها (Exception Handling) 

در فصل قبل، ما به توابع نگاه کردیم. با وجود تلاش‌های برنامه‌نویسان برای نوشتن کدهای مقاوم و پایدار، توابع در مقطعی از اجرا **استثناها (exceptions)** ایجاد خواهند کرد. این استثناها می‌توانند دلایل مختلفی داشته باشند، مانند:

* فایل یا پوشه‌ای وجود ندارد
* مقدار **null** یا خالی است
* مکان مورد نظر قابل نوشتن نیست
* دسترسی کاربر محدود شده است

با در نظر گرفتن این مسائل، در این فصل با روش‌های مناسب برای **مدیریت استثناها** آشنا خواهید شد تا کد C# تمیز و قابل اطمینان بنویسید.

---

### موضوعات این فصل

1⃣ بررسی استثناهای **Checked** و **Unchecked**، به‌ویژه در رابطه با **OverflowException**

2⃣ جلوگیری از **NullPointerException**

3⃣ پیاده‌سازی قوانین کسب‌وکار برای انواع خاصی از استثناها (**Business Rule Exceptions**)

4⃣ اطمینان از اینکه استثناها اطلاعات معنادار ارائه دهند

5⃣ ساخت **Custom Exceptions**

6⃣ و در نهایت، بررسی اینکه چرا نباید از استثناها برای کنترل جریان برنامه استفاده کنیم

---

### مهارت‌هایی که پس از این فصل کسب خواهید کرد

* درک تفاوت استثناهای **Checked و Unchecked** و دلیل وجود آن‌ها در C#
* درک **OverflowException** و روش گرفتن آن‌ها در زمان **Compile**
* شناخت **NullPointerException** و نحوه جلوگیری از آن‌ها
* توانایی نوشتن **Custom Exceptions** که اطلاعات معنادار ارائه می‌دهند و به شما و دیگر برنامه‌نویسان کمک می‌کنند مشکلات را به‌سرعت شناسایی و رفع کنید
* درک اینکه چرا نباید از استثناها برای کنترل جریان برنامه استفاده کنید
* توانایی جایگزین کردن استثناهای قوانین کسب‌وکار با دستورات C# و بررسی‌های Boolean برای کنترل جریان برنامه

---

اگر آماده باشی، می‌توانیم فصل را با بخش اول یعنی **استثناهای Checked و Unchecked** شروع کنیم. 

###  استثناهای Checked و Unchecked

در **حالت Unchecked**، اگر یک **Overflow** (سرریز) عددی رخ دهد، نادیده گرفته می‌شود. در این حالت، **بیت‌های با ارزش بالا** که نمی‌توانند به نوع مقصد اختصاص داده شوند، از نتیجه حذف می‌شوند.

به‌طور پیش‌فرض، C# هنگام انجام **عبارات غیرثابت (non-constant)** در زمان اجرا، در **context Unchecked** عمل می‌کند. اما **عبارات ثابت در زمان Compile** همیشه به‌صورت پیش‌فرض **Checked** هستند.

وقتی در **حالت Checked** با سرریز عددی مواجه شویم، یک **OverflowException** ایجاد می‌شود. یکی از دلایلی که از حالت Unchecked استفاده می‌شود، **افزایش عملکرد برنامه** است، زیرا بررسی استثناهای Checked می‌تواند کمی عملکرد روش‌ها را کاهش دهد.

---

####  قاعده کلی

همیشه بهتر است که عملیات عددی خود را در **context Checked** انجام دهید. با این کار، هر گونه Overflow به‌صورت **خطا در زمان Compile** شناسایی می‌شود و می‌توانید قبل از انتشار کد، آن را اصلاح کنید. این بسیار بهتر از این است که کد را منتشر کنید و بعد مجبور شوید خطاهای زمان اجرا برای مشتری را اصلاح کنید.

اجرای کد در **حالت Unchecked** خطرناک است زیرا شما بر اساس **فرضیات** عمل می‌کنید، نه حقایق. این فرضیات ممکن است منجر به ایجاد استثنا در زمان اجرا شوند. استثناهای زمان اجرا باعث کاهش رضایت مشتری و ایجاد مشکلات جدی بعدی می‌شوند که می‌توانند تأثیر منفی بر مشتری داشته باشند.

اجازه دادن به برنامه برای ادامه اجرا پس از تجربه **OverflowException** از نظر کسب‌وکار بسیار خطرناک است. دلیل آن این است که داده‌ها ممکن است به **وضعیت غیرقابل بازگشت و نامعتبر** وارد شوند. اگر این داده‌ها داده‌های حساس مشتری باشند، این موضوع می‌تواند هزینه زیادی برای کسب‌وکار داشته باشد، و قطعاً نمی‌خواهید این بار روی دوش شما باشد.

---

####  مثال بانکی: خطر سرریز Unchecked

کد زیر نشان می‌دهد که چقدر یک Overflow **Unchecked** می‌تواند در دنیای بانکداری مشتری خطرناک باشد:

```csharp
private static void UncheckedBankAccountException()
{
    var currentBalance = int.MaxValue;
    Console.WriteLine($"Current Balance: {currentBalance}");
    currentBalance = unchecked(currentBalance + 1);
    Console.WriteLine($"Current Balance + 1 = {currentBalance}");
    Console.ReadKey();
}
```

تصور کنید چقدر ترسناک است وقتی مشتری می‌بیند با افزودن **£1** به موجودی بانک خود که برابر با **£2,147,483,647** است، موجودی او به **-£2,147,483,648** تبدیل می‌شود! 

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/05/Table%205-1.jpeg)
  
</div>

###  مثال عملی از استثناهای Checked و Unchecked

اکنون وقت آن است که **استثناهای Checked و Unchecked** را با **مثال کد عملی** نشان دهیم.

---

ابتدا یک **Console Application** جدید ایجاد کنید و برخی متغیرها را اعلام کنید:

```csharp
static byte y, z;
```

کد بالا دو متغیر از نوع **byte** اعلام می‌کند که در مثال‌های محاسباتی بعدی استفاده خواهند شد.

---

#### 1⃣ متد CheckedAdd()

این متد یک **OverflowException** ایجاد می‌کند اگر جمع دو عدد منجر به عددی شود که نتواند در یک **byte** ذخیره شود:

```csharp
private static void CheckedAdd()
{
    try
    {
        Console.WriteLine("### Checked Add ###");
        Console.WriteLine($"x = {y} + {z}");
        Console.WriteLine($"x = {checked((byte)(y + z))}");
    }
    catch (OverflowException oex)
    {
        Console.WriteLine($"CheckedAdd: {oex.Message}");
    }
}
```

---

#### 2⃣ متد CheckedMultiplication()

این متد نیز در صورت سرریز هنگام ضرب دو عدد، یک **OverflowException** ایجاد می‌کند:

```csharp
private static void CheckedMultiplication()
{
    try
    {
        Console.WriteLine("### Checked Multiplication ###");
        Console.WriteLine($"x = {y} x {z}");
        Console.WriteLine($"x = {checked((byte)(y * z))}");
    }
    catch (OverflowException oex)
    {
        Console.WriteLine($"CheckedMultiplication: {oex.Message}");
    }
}
```

---

#### 3⃣ متد UncheckedAdd()

این متد هرگونه Overflow را نادیده می‌گیرد و **هیچ استثنایی ایجاد نمی‌شود**. نتیجه نادرست خواهد بود، اما برنامه ادامه می‌یابد:

```csharp
private static void UncheckedAdd()
{
    try
    {
        Console.WriteLine("### Unchecked Add ###");
        Console.WriteLine($"x = {y} + {z}");
        Console.WriteLine($"x = {unchecked((byte)(y + z))}");
    }
    catch (OverflowException oex)
    {
        Console.WriteLine($"CheckedAdd: {oex.Message}");
    }
}
```

---

#### 4⃣ متد UncheckedMultiplication()

این متد نیز هنگام Overflow نتیجه ضرب را نادیده می‌گیرد و **مقدار نادرست در byte ذخیره می‌شود**:

```csharp
private static void UncheckedMultiplication()
{
    try
    {
        Console.WriteLine("### Unchecked Multiplication ###");
        Console.WriteLine($"x = {y} x {z}");
        Console.WriteLine($"x = {unchecked((byte)(y * z))}");
    }
    catch (OverflowException oex)
    {
        Console.WriteLine($"CheckedMultiplication: {oex.Message}");
    }
}
```

---

#### 5⃣ متد Main()

در نهایت، متد Main را به‌گونه‌ای تغییر دهید که متغیرها مقداردهی اولیه شوند و همه متدها اجرا شوند:

```csharp
static void Main(string[] args)
{
    y = byte.MaxValue; // بیشترین مقدار ممکن برای byte
    z = 2;
    CheckedAdd();
    CheckedMultiplication();
    UncheckedAdd();
    UncheckedMultiplication();
    Console.WriteLine("Press any key to exit.");
    Console.ReadLine();
}
```

در این مثال:

* متدهای **CheckedAdd** و **CheckedMultiplication** منجر به **OverflowException** می‌شوند زیرا y بیشترین مقدار برای byte است.
* متدهای **UncheckedAdd** و **UncheckedMultiplication** Overflow را نادیده می‌گیرند و نتیجه اشتباه محاسبه می‌شود، بدون اینکه استثنایی رخ دهد.

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/05/Table%205-2.jpeg)
  
</div>

همان‌طور که مشاهده می‌کنید، وقتی از **checked exceptions** استفاده می‌کنیم، در مواجهه با **OverflowException** استثنا ایجاد می‌شود. اما وقتی از **unchecked exceptions** استفاده می‌کنیم، هیچ استثنایی ایجاد نمی‌شود. 

مشخص است که مشکلات می‌توانند از مقادیر غیرمنتظره به وجود آیند و برخی رفتارهای ناخواسته هنگام استفاده از **unchecked exceptions** ایجاد شوند. بنابراین، قانون کلی هنگام انجام عملیات‌های حسابی این است که همیشه از **checked exceptions** استفاده کنید. 

حالا به سراغ یک استثنای بسیار رایج می‌رویم که برنامه‌نویسان اغلب با آن مواجه می‌شوند، به نام **NullPointerException**.

---

### جلوگیری از **NullPointerExceptions** 

**NullReferenceException** یک استثنای رایج است که اکثر برنامه‌نویسان تجربه کرده‌اند. این استثنا زمانی رخ می‌دهد که سعی شود به یک **property** یا **method** روی یک **null object** دسترسی پیدا شود.

برای جلوگیری از کرش برنامه، معمولاً برنامه‌نویسان از بلوک‌های `try { ... } catch (NullReferenceException nre) { ... }` استفاده می‌کنند.
این بخشی از **برنامه‌نویسی دفاعی (Defensive Programming)** است. اما مشکل این است که اغلب اوقات خطا فقط **لاگ** می‌شود و دوباره پرتاب می‌گردد. علاوه بر این، محاسبات اضافی و بیهوده‌ای انجام می‌شود که قابل اجتناب بود.

راه بسیار بهتر برای مدیریت **ArgumentNullExceptions**، پیاده‌سازی **ArgumentNullValidator** است. پارامترهای یک متد معمولاً منبع یک **null object** هستند. بنابراین منطقی است که قبل از استفاده، پارامترهای متد را بررسی کنیم و اگر نامعتبر بودند، یک **Exception** مناسب پرتاب کنیم. در مورد **ArgumentNullValidator**، این اعتبارسنج را در ابتدای متد قرار می‌دهیم و هر پارامتر را بررسی می‌کنیم. اگر هر پارامتری **null** بود، **NullReferenceException** پرتاب می‌شود. این کار باعث صرفه‌جویی در محاسبات و حذف نیاز به استفاده از بلوک `try...catch` می‌شود.

---

برای روشن شدن موضوع، **ArgumentNullValidator** را پیاده‌سازی می‌کنیم و آن را در یک متد برای بررسی پارامترهای متد استفاده می‌کنیم:

```csharp
public class Person
{
    public string Name { get; }
    public Person(string name)
    {
         Name = name;
    }
}
```

در کد بالا، ما کلاس **Person** را با یک **property** فقط خواندنی به نام **Name** ایجاد کرده‌ایم. این شیء را به متدهای نمونه می‌دهیم تا **NullReferenceException** ایجاد شود.

سپس **Attribute** مربوط به اعتبارسنج را ایجاد می‌کنیم به نام **ValidatedNotNullAttribute**:

```csharp
[AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
internal sealed class ValidatedNotNullAttribute : Attribute { }
```

حالا زمان نوشتن **validator** است:

```csharp
internal static class ArgumentNullValidator
{
    public static void NotNull(string name, [ValidatedNotNull] object value)
    {
        if (value == null)
        {
            throw new ArgumentNullException(name);
        }
    }
}
```

**ArgumentNullValidator** دو آرگومان می‌گیرد:

1. نام شیء
2. خود شیء

شیء بررسی می‌شود که **null** باشد یا نه. اگر **null** باشد، **ArgumentNullException** با نام شیء پرتاب می‌شود.

---

متد نمونه **try/catch** به صورت زیر است. توجه کنید که پیام **log** می‌شود و استثنا پرتاب می‌گردد. اما پارامتر استثنا استفاده نمی‌شود، و در واقع این پارامتر باید حذف شود. چنین مواردی در کدها اغلب دیده می‌شود و غیرضروری است:

```csharp
private void TryCatchExample(Person person)
{
    try
    {
        Console.WriteLine($"Person's Name: {person.Name}");
    }
    catch (NullReferenceException nre)
    {
        Console.WriteLine("Error: The person argument cannot be null.");
        throw;
    }
}
```

---

حالا متد نمونه‌ای می‌نویسیم که از **ArgumentNullValidator** استفاده می‌کند، به نام **ArgumentNullValidatorExample**:

```csharp
private void ArgumentNullValidatorExample(Person person)
{
    ArgumentNullValidator.NotNull("Person", person);
    Console.WriteLine($"Person's Name: {person.Name}");
    Console.ReadKey();
}
```

توجه کنید که از نه خط کد شامل آکولادها، به فقط دو خط رسیده‌ایم. همچنین دیگر تلاش نمی‌کنیم تا قبل از اعتبارسنجی، مقدار را استفاده کنیم. تنها کاری که اکنون لازم است، اصلاح **Main method** برای اجرای این متدها است.

هر متد را می‌توان با کامنت کردن یکی از متدها و اجرای برنامه، تست کرد و بهترین کار این است که قدم‌به‌قدم کد را بررسی کنید تا روند کار را مشاهده کنید.

خروجی اجرای متد **TryCatchExample** به شکل زیر خواهد بود:
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/05/Table%205-3.jpeg)
  
</div>

خروجی اجرای متد ArgumentNullValidatorExample به شکل زیر خواهد بود:

<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/05/Table%205-4.jpeg)
  
</div>

همان‌طور که در مثال قبلی مشاهده کردید، وقتی از **ArgumentNullValidatorExample** استفاده می‌کنیم، خطا فقط یک‌بار ثبت می‌شود. اما هنگام استفاده از **TryCatchExample**، خطا دو بار ثبت می‌شود.
بار اول پیام خطا معنی‌دار است، اما بار دوم پیام مبهم و نامفهوم است. با این حال، استثنایی که توسط متد فراخوان **Main** ثبت می‌شود، اصلاً مبهم نیست و کاملاً مفید است، زیرا نشان می‌دهد که مقدار پارامتر **Person** نمی‌تواند **null** باشد. 

این بخش نشان داد که بررسی پارامترها در سازنده‌ها و متدها قبل از استفاده از آن‌ها چقدر ارزشمند است. با استفاده از **Argument Validators**، کد شما کاهش یافته، خواناتر و ایمن‌تر می‌شود. 

---

### استثناهای قانون کسب‌وکار (Business Rule Exceptions) 

استثناهای فنی (Technical Exceptions) ناشی از اشتباهات برنامه‌نویس یا مشکلات محیطی مانند کمبود فضای دیسک هستند. اما **استثناهای قانون کسب‌وکار** متفاوتند. این نوع استثناها برای کنترل جریان برنامه استفاده می‌شوند، در حالی که در واقع استثناها باید **استثنا** باشند و نه خروجی پیش‌بینی‌شده یک متد.

برای مثال، فرض کنید شخصی از **ATM** مبلغ 100 پوند برداشت می‌کند، اما حساب او 0 پوند دارد و امکان برداشت بیش از موجودی (Overdrawn) وجود ندارد. اگر کد از استثنا استفاده کند، متد **Withdraw(100)** اجرا شده، موجودی کم است و **InsufficientFundsException()** پرتاب می‌شود.

ممکن است فکر کنید این روش خوب است چون صریح و قابل شناسایی است، اما واقعیت این است که چنین کاری ایده مناسبی نیست. 

در چنین سناریویی، بهترین روش این است که قبل از انجام تراکنش، **اعتبارسنجی** شود که برداشت امکان‌پذیر است یا خیر. اگر امکان‌پذیر بود، تراکنش انجام شود، وگرنه جریان برنامه به صورت معمول ادامه یافته، تراکنش لغو شده و کاربر مطلع شود بدون اینکه استثنایی پرتاب شود.

این روش باعث می‌شود برنامه **درست و منطقی** و با استفاده از **چک‌های Boolean** جریان برنامه را کنترل کند و تراکنش‌های مجاز و غیرمجاز به‌درستی مدیریت شوند.

---

### پیاده‌سازی دو سناریو

ما دو سناریو را پیاده‌سازی می‌کنیم:

1. **استفاده از Business Rule Exceptions (BREs)**
2. **استفاده از جریان برنامه معمول (Program Flow)**

ابتدا یک برنامه کنسول جدید بسازید و دو فولدر ایجاد کنید:

* `BankAccountUsingExceptions`
* `BankAccountUsingProgramFlow`

سپس متد **Main** را به شکل زیر به‌روزرسانی کنید:

```csharp
private static void Main(string[] args)
{
    var usingBrExceptions = new UsingBusinessRuleExceptions();
    usingBrExceptions.Run();
    
    var usingPflow = new UsingProgramFlow();
    usingPflow.Run();
}
```

* `UsingBusinessRuleExceptions()` سناریویی را نشان می‌دهد که استثناها به عنوان خروجی پیش‌بینی‌شده برای کنترل جریان برنامه استفاده می‌شوند.
* `UsingProgramFlow()` جریان برنامه تمیز و بدون شرایط استثنایی را نشان می‌دهد. 

---

### کلاس حساب جاری (CurrentAccount) 

یک کلاس به نام **CurrentAccount** برای نگهداری اطلاعات حساب ایجاد کنید:

```csharp
internal class CurrentAccount
{
    public long CustomerId { get; }
    public decimal AgreedOverdraft { get; }
    public bool IsAllowedToGoOverdrawn { get; }
    public decimal CurrentBalance { get; }
    public decimal AvailableBalance { get; private set; }
    public int AtmDailyLimit { get; }
    public int AtmWithdrawalAmountToday { get; private set; }
}
```

ویژگی‌های این کلاس فقط از طریق **سازنده** یا درون کلاس قابل مقداردهی هستند.

سازنده کلاس را اضافه کنید که تنها پارامترش **customerId** باشد:

```csharp
public CurrentAccount(long customerId)
{
    CustomerId = customerId;
    AgreedOverdraft = GetAgreedOverdraftLimit();
    IsAllowedToGoOverdrawn = GetIsAllowedToGoOverdrawn();
    CurrentBalance = GetCurrentBalance();
    AvailableBalance = GetAvailableBalance();
    AtmDailyLimit = GetAtmDailyLimit();
    AtmWithdrawalAmountToday = 0;
}
```

---

### پیاده‌سازی متدهای کمکی

* محدودیت برداشت توافق‌شده:

```csharp
private static decimal GetAgreedOverdraftLimit()
{
    return 0;
}
```

* امکان برداشت بیش از موجودی:

```csharp
private static bool GetIsAllowedToGoOverdrawn()
{
    return false;
}
```

* موجودی فعلی حساب:

```csharp
private static decimal GetCurrentBalance()
{
    return 250.00M;
}
```

* موجودی قابل برداشت:

```csharp
private static decimal GetAvailableBalance()
{
    return 173.64M;
}
```

* محدودیت روزانه ATM:

```csharp
private static int GetAtmDailyLimit()
{
    return 250;
}
```

---

در مرحله بعد، کد دو سناریو را پیاده‌سازی خواهیم کرد: یکی با استفاده از **Business Rule Exceptions** و دیگری با جریان برنامه معمول برای مدیریت شرایط مختلف در برنامه. 

### مثال ۱ – مدیریت شرایط با استثناهای قانون کسب‌وکار 

یک کلاس جدید به نام **UsingBusinessRuleExceptions** به پروژه اضافه کنید و متد زیر را در آن بنویسید:

```csharp
public class UsingBusinessRuleExceptions
{
    public void Run()
    {
        ExceedAtmDailyLimit();
        ExceedAvailableBalance();
    }
}
```

متد **Run()** دو متد را فراخوانی می‌کند:
1⃣ **ExceedAtmDailyLimit()**: این متد به صورت عمدی مقدار برداشت روزانه مجاز از ATM را بیش از حد تعیین می‌کند و باعث پرتاب **ExceededAtmDailyLimitException** می‌شود.

```csharp
private void ExceedAtmDailyLimit()
{
    try
    {
        var customerAccount = new CurrentAccount(1);
        customerAccount.Withdraw(300);
        Console.WriteLine("Request accepted. Take cash and card.");
    }
    catch (ExceededAtmDailyLimitException eadlex)
    {
        Console.WriteLine(eadlex.Message);
    }
}
```

2⃣ **ExceedAvailableBalance()**: این متد نیز به صورت عمدی باعث **InsufficientFundsException** می‌شود، زیرا موجودی قابل برداشت کمتر از مقدار درخواست‌شده است:

```csharp
private void ExceedAvailableBalance()
{
    try
    {
        var customerAccount = new CurrentAccount(1);
        customerAccount.Withdraw(180);
        Console.WriteLine("Request accepted. Take cash and card.");
    }
    catch (InsufficientFundsException ifex)
    {
        Console.WriteLine(ifex.Message);
    }
}
```

با این کار، مشاهده می‌کنیم که چگونه می‌توان شرایط مختلف را با استفاده از **Business Rule Exceptions (BREs)** مدیریت کرد. 

---

### مثال ۲ – مدیریت شرایط با جریان برنامه معمول 

یک کلاس به نام **UsingProgramFlow** ایجاد کنید و کد زیر را در آن قرار دهید:

```csharp
public class UsingProgramFlow
{
    private int _requestedAmount;
    private readonly CurrentAccount _currentAccount;

    public UsingProgramFlow()
    {
        _currentAccount = new CurrentAccount(1);
    }
}
```

در سازنده کلاس، یک **CurrentAccount** ایجاد شده و شناسه مشتری به آن پاس داده می‌شود.

سپس متد **Run()** را اضافه کنید:

```csharp
public void Run()
{
    _requestedAmount = 300;
    Console.WriteLine($"Request: Withdraw {_requestedAmount}");
    WithdrawMoney();

    _requestedAmount = 180;
    Console.WriteLine($"Request: Withdraw {_requestedAmount}");
    WithdrawMoney();

    _requestedAmount = 20;
    Console.WriteLine($"Request: Withdraw {_requestedAmount}");
    WithdrawMoney();
}
```

متد **Run()** سه بار مقدار **\_requestedAmount** را تعیین می‌کند و هر بار، پیامی در کنسول چاپ می‌شود قبل از فراخوانی متد **WithdrawMoney()**.

---

### بررسی محدودیت‌ها با متدهای Boolean 

* بررسی حد برداشت روزانه ATM:

```csharp
private bool ExceedsDailyLimit()
{
    return (_requestedAmount > _currentAccount.AtmDailyLimit)
        || (_requestedAmount + _currentAccount.AtmWithdrawalAmountToday >
            _currentAccount.AtmDailyLimit);
}
```

* بررسی موجودی قابل برداشت:

```csharp
private bool ExceedsAvailableBalance()
{
    return _requestedAmount > _currentAccount.AvailableBalance;
}
```

---

### متد نهایی WithdrawMoney() 

```csharp
private void WithdrawMoney()
{
    if (ExceedsDailyLimit())
        Console.WriteLine("Cannot exceed ATM Daily Limit. Request denied.");
    else if (ExceedsAvailableBalance())
        Console.WriteLine("Cannot exceed available balance. You have no agreed overdraft facility. Request denied.");
    else
        Console.WriteLine("Request granted. Take card and cash.");
}
```

در این روش، جریان برنامه بدون استفاده از **BREs** مدیریت می‌شود. روش منطقی و خواناتر است، زیرا:

* اگر مقدار درخواست‌شده بیش از حد برداشت روزانه باشد، درخواست رد می‌شود.
* اگر مقدار درخواست‌شده بیش از موجودی قابل برداشت باشد، باز هم رد می‌شود.
* در غیر این صورت، تراکنش با موفقیت انجام می‌شود. 

---

می‌بینید که کنترل جریان برنامه با **منطق موجود** بسیار تمیزتر و درست‌تر است تا اینکه انتظار داشته باشیم **استثناها** پرتاب شوند. استثناها باید تنها برای شرایط **استثنایی و غیرعادی** استفاده شوند.

وقتی استثناها به درستی پرتاب می‌شوند، مهم است که **اطلاعات معنی‌دار** ارائه کنند. پیام‌های خطای مبهم هیچ کمکی نمی‌کنند و می‌توانند استرس غیرضروری برای کاربران یا توسعه‌دهندگان ایجاد کنند. 

در بخش بعدی، به نحوه ارائه **اطلاعات مفید و معنی‌دار** در استثناهای پرتاب‌شده خواهیم پرداخت.

### استثناها باید اطلاعات معنی‌دار ارائه کنند 

خطاهای بحرانی که پیام می‌دهند «هیچ خطایی وجود ندارد» و سپس برنامه را متوقف می‌کنند، اصلاً مفید نیستند. من شخصاً با چنین خطای بحرانی روبرو شده‌ام: خطایی که برنامه را متوقف می‌کند، اما پیام می‌دهد که هیچ خطایی وجود ندارد! 

اگر هیچ خطایی نیست، پس چرا هشدار خطای بحرانی روی صفحه ظاهر شده و چرا نمی‌توانم از برنامه استفاده کنم؟ واضح است که برای پرتاب این استثنا، باید خطای بحرانی واقعی رخ داده باشد، اما **کجا و چرا؟**

این نوع استثناها زمانی آزاردهنده‌تر می‌شوند که در **فریمورک یا کتابخانه‌ای** رخ دهند که شما کنترل آن را ندارید و به سورس‌کد آن دسترسی ندارید. چنین استثناهایی باعث می‌شوند برنامه‌نویسان از سر ناامیدی حرف‌های منفی بزنند. یکی از دلایل اصلی ناامیدی این است که **کد خطا داده، اما هیچ اطلاعات مفیدی برای فهم مشکل یا اقدام اصلاحی ارائه نمی‌کند.**

استثناها باید اطلاعاتی **کاربرپسند و قابل فهم** ارائه دهند، مخصوصاً برای کسانی که از نظر فنی تجربه کمی دارند. در تجربه من در توسعه نرم‌افزارهای آزمون و ارزیابی دیسکلسی، بسیاری از معلمان و تکنسین‌های IT هنگام مواجهه با پیام‌های استثنا، اغلب گیج می‌شدند.

مثالی که بسیاری از کاربران نرم‌افزار با آن سردرگم شدند:
**Error 76: Path not found** 
این یک استثنای قدیمی مایکروسافت است که از زمان Windows 95 وجود داشته و هنوز هم وجود دارد. پیام خطا برای کاربر نهایی کاملاً بی‌فایده است. برای کاربر مفید خواهد بود که بداند **کدام فایل و مسیر پیدا نشده** و چه اقداماتی برای رفع مشکل انجام دهد.

راه‌حل پیشنهادی:
1⃣ بررسی وجود مسیر یا فایل
2⃣ اگر مسیر وجود ندارد یا دسترسی denied است، نمایش دیالوگ save/open فایل
3⃣ ذخیره مسیر انتخاب‌شده توسط کاربر در یک فایل تنظیمات برای استفاده بعدی
4⃣ در اجراهای بعدی همان کد، از مسیر انتخاب‌شده توسط کاربر استفاده شود

اگر همچنان پیام خطا را نگه دارید، حداقل نام فایل یا مسیر گمشده را نشان دهید.

---

### ایجاد استثناهای سفارشی 

فریمورک **Microsoft .NET** تعداد زیادی استثنا دارد که می‌توانید از آن‌ها استفاده کنید، اما گاهی نیاز است یک **استثنای سفارشی** بسازید که اطلاعات دقیق‌تر و کاربرپسندتری ارائه دهد.

برای ایجاد استثنای سفارشی کافی است:

* نام کلاس با **Exception** ختم شود
* از **System.Exception** ارث‌بری کند
* سه سازنده داشته باشد:

```csharp
public class TickerListNotFoundException : Exception
{
    public TickerListNotFoundException() : base() { }

    public TickerListNotFoundException(string message)
        : base(message) { }

    public TickerListNotFoundException(string message, Exception innerException)
        : base(message, innerException) { }
}
```

**TickerListNotFoundException** از کلاس **System.Exception** ارث‌بری می‌کند و سه سازنده اجباری دارد:
1⃣ سازنده پیش‌فرض
2⃣ سازنده‌ای که پیام متنی استثنا را می‌پذیرد
3⃣ سازنده‌ای که پیام متنی و یک استثنای داخلی (**InnerException**) می‌پذیرد

---

### اجرای سازنده‌های استثنای سفارشی 

در متد **Main** سه متد برای آزمایش سازنده‌ها اجرا می‌کنیم:

```csharp
static void Main(string[] args)
{
    ThrowCustomExceptionA();
    ThrowCustomExceptionB();
    ThrowCustomExceptionC();
}
```

* **ThrowCustomExceptionA()**: استفاده از سازنده پیش‌فرض

```csharp
private static void ThrowCustomExceptionA()
{
    try
    {
        Console.WriteLine("throw new TickerListNotFoundException();");
        throw new TickerListNotFoundException();
    }
    catch (Exception tlnfex)
    {
        Console.WriteLine(tlnfex.Message);
    }
}
```

* **ThrowCustomExceptionB()**: استفاده از سازنده با پیام متنی

```csharp
private static void ThrowCustomExceptionB()
{
    try
    {
        Console.WriteLine("throw new TickerListNotFoundException(Message);");
        throw new TickerListNotFoundException("Ticker list not found.");
    }
    catch (Exception tlnfex)
    {
        Console.WriteLine(tlnfex.Message);
    }
}
```

* **ThrowCustomExceptionC()**: استفاده از سازنده با پیام متنی و استثنای داخلی

```csharp
private static void ThrowCustomExceptionC()
{
    try
    {
        Console.WriteLine("throw new TickerListNotFoundException(Message, InnerException);");
        throw new TickerListNotFoundException(
            "Ticker list not found for this exchange.",
            new FileNotFoundException(
                "Ticker list file not found.",
                @"F:\TickerFiles\LSE\AimTickerList.json"
            )
        );
    }
    catch (Exception tlnfex)
    {
        Console.WriteLine($"{tlnfex.Message}\n{tlnfex.InnerException}");
    }
}
```

در این مثال، پیام **معنادار** و استثنای داخلی جزئیات بیشتری درباره فایل پیدا نشده ارائه می‌کند. 

---

### نکات بهترین شیوه در مدیریت استثناها در C# 

* از بلوک‌های **try/catch/finally** برای بازیابی خطا یا آزادسازی منابع استفاده کنید.
* شرایط معمول را بدون پرتاب استثنا مدیریت کنید.
* کلاس‌ها را طوری طراحی کنید که امکان جلوگیری از استثنا وجود داشته باشد.
* به جای بازگرداندن کد خطا، استثنا پرتاب کنید.
* از انواع استثنای از پیش تعریف‌شده .NET استفاده کنید.
* نام کلاس‌های استثنا با **Exception** خاتمه یابد.
* سه سازنده در کلاس‌های استثنای سفارشی درج شود.
* داده‌های استثنا در اجرای راه دور نیز قابل دسترسی باشند.
* پیام‌های خطا از نظر دستوری صحیح باشند.
* پیام‌های محلی‌سازی‌شده در هر استثنا درج شود.
* ویژگی‌های اضافی لازم در استثناهای سفارشی ارائه شود.
* مکان پرتاب استثنا طوری باشد که **StackTrace** مفید باشد.
* از متدهای سازنده استثنا استفاده کنید.
* هنگام ناتمام ماندن متدها به دلیل استثنا، وضعیت را بازگردانید.

اکنون زمان آن است که خلاصه‌ای از آنچه درباره **مدیریت استثناها** آموخته‌ایم ارائه دهیم.

### خلاصه 

در این فصل، شما با **استثناهای چک‌شده (checked exceptions)** و **استثناهای چک‌نشده (unchecked exceptions)** آشنا شدید.

* **Checked exceptions** از ورود شرایط overflow حسابی به کد تولید جلوگیری می‌کنند، زیرا این خطاها در **زمان کامپایل** شناسایی می‌شوند.
* **Unchecked exceptions** در زمان کامپایل شناسایی نمی‌شوند و ممکن است وارد کد تولید شوند، که می‌تواند باعث ایجاد باگ‌های سخت برای ردیابی و حتی کرش برنامه شود. 

سپس با **NullPointerException** و نحوه اعتبارسنجی پارامترهای ورودی با استفاده از **Attribute** و **Validator** سفارشی آشنا شدید که در بالای متدها قرار می‌گیرند. این روش به شما اجازه می‌دهد بازخورد معنی‌دار ارائه دهید و برنامه‌های مقاوم‌تری بسازید. 

بعد از آن، استفاده از **BREs (Business Rule Exceptions)** برای کنترل جریان برنامه بررسی شد. دیدید چگونه جریان برنامه با انتظار خروجی استثنایی کنترل می‌شود و سپس نشان داده شد که با استفاده از **چک‌های شرطی (conditional checks)** می‌توان کنترل بهتری بر جریان برنامه داشت، بدون اینکه نیاز به استفاده از استثناها باشد.

بحث بعدی درباره اهمیت ارائه **پیام‌های استثنایی معنی‌دار** بود و اینکه چگونه می‌توان این کار را با نوشتن **استثناهای سفارشی** انجام داد که از کلاس Exception ارث‌بری کرده و سه سازنده ضروری را پیاده‌سازی می‌کنند.

از طریق مثال‌های ارائه‌شده، یاد گرفتید چگونه از استثناهای سفارشی استفاده کنید و چگونه به **دیباگ بهتر و رفع مشکلات سریع‌تر** کمک می‌کنند. 

اکنون زمان آن است که آنچه آموخته‌اید را با پاسخ به چند سؤال تمرین کنید. همچنین منابع پیشنهادی برای مطالعه بیشتر ارائه شده است.

---

### سؤالات 

1⃣ استثنای چک‌شده (checked exception) چیست؟
2⃣ استثنای چک‌نشده (unchecked exception) چیست؟
3⃣ استثنای overflow حسابی (arithmetic overflow exception) چیست؟
4⃣ NullPointerException چیست؟
5⃣ چگونه می‌توان پارامترهای null را اعتبارسنجی کرد تا کیفیت کد بهبود یابد؟
6⃣ BRE مخفف چیست؟
7⃣ آیا استفاده از BREها روش خوبی است یا بد؟ چرا؟
8⃣ جایگزین BREها چیست، آیا خوب است یا بد؟ چرا؟
9⃣ چگونه می‌توان پیام‌های استثنایی معنی‌دار ارائه داد؟
 الزامات نوشتن استثناهای سفارشی چیست؟

---

### منابع پیشنهادی برای مطالعه بیشتر 

* [Documentation رسمی Microsoft برای مدیریت استثناها در .NET](https://docs.microsoft.com/en-us/dotnet/standard/exceptions/)
* [مقاله‌ای درباره دلایل منفی بودن BREها](https://reflectoring.io/business-exceptions/)
* [بهترین شیوه‌های Microsoft برای مدیریت استثناها در C#](https://docs.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions)

این منابع به شما کمک می‌کنند درک عمیق‌تری از مدیریت استثناها و بهترین شیوه‌ها در C# پیدا کنید.
