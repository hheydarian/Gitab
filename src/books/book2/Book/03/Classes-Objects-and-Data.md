---
layout: layout.njk
title: کلاس‌ها، اشیاء و ساختارهای داده‌ای
---
# فصل سوم:  کلاس‌ها، اشیاء و ساختارهای داده‌ای 

در این فصل، به **سازمان‌دهی، قالب‌بندی و کامنت‌گذاری کلاس‌ها** می‌پردازیم. همچنین یاد می‌گیریم چگونه **اشیاء و ساختارهای داده‌ای تمیز در C#** بنویسیم که **قانون دمتر (Law of Demeter)** را رعایت کنند. علاوه بر این، با **اشیاء و ساختارهای داده‌ای غیرقابل تغییر (Immutable)** و **اینترفیس‌ها و کلاس‌هایی که مجموعه‌های غیرقابل تغییر را در فضای نام `System.Collections.Immutable` تعریف می‌کنند** آشنا می‌شویم.

موضوعات اصلی این فصل عبارت‌اند از:

* سازمان‌دهی کلاس‌ها 
* کامنت‌گذاری برای تولید مستندات 
* Cohesion و Coupling 
* قانون دمتر (Law of Demeter) 
* اشیاء و ساختارهای داده‌ای غیرقابل تغییر 

---

### مهارت‌هایی که در این فصل می‌آموزید 

با پیشرفت در این فصل، مهارت‌های زیر را خواهید آموخت:

* **سازمان‌دهی مؤثر کلاس‌ها با استفاده از Namespace‌ها**.
* **کوچک و معنادار کردن کلاس‌ها** با پیروی از اصل **مسئولیت واحد (Single Responsibility)**.
* **نوشتن مستندات خوب برای توسعه‌دهندگان** با ارائه کامنت‌هایی که ابزارهای تولید مستندات را پشتیبانی کنند.
* **سهولت در تغییر و توسعه برنامه‌ها** به دلیل **Cohesion بالا و Coupling پایین**.
* **پیاده‌سازی قانون دمتر و استفاده از داده‌های غیرقابل تغییر**.

پس بیایید ابتدا ببینیم چگونه می‌توانیم کلاس‌ها را **به‌صورت مؤثر با استفاده از Namespace‌ها سازمان‌دهی کنیم**.

---

### پیش‌نیازهای فنی 

کد این فصل را می‌توانید در GitHub مشاهده کنید:
[Clean Code in C# – Chapter 3](https://github.com/PacktPublishing/Clean-Code-in-C-/tree/master/CH03)

---

### سازمان‌دهی کلاس‌ها 

ویژگی برجسته یک پروژه تمیز، داشتن **کلاس‌های به‌خوبی سازمان‌دهی‌شده** است.

* **پوشه‌ها (Folders)** برای گروه‌بندی کلاس‌هایی که به هم مرتبط هستند استفاده می‌شوند.
* کلاس‌های داخل پوشه‌ها باید **در Namespaceهایی قرار گیرند که با نام اسمبلی و ساختار پوشه‌ها مطابقت دارند**.

هر **اینترفیس، کلاس، ساختار (struct) و Enum** باید **فایل منبع جداگانه** در **Namespace صحیح** داشته باشد.

* فایل‌های منبع باید **به‌صورت منطقی در پوشه‌های مناسب گروه‌بندی** شوند.
* Namespaceهای فایل‌ها باید **با نام اسمبلی و ساختار پوشه‌ها مطابقت داشته باشند**.

اسکرین‌شات زیر، ساختار پوشه‌ها و فایل‌های تمیز را نشان می‌دهد:
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-1.jpeg)
  
</div>

### سازمان‌دهی کلاس‌ها و Namespace‌ها 

قرار دادن بیش از یک **اینترفیس، کلاس، struct یا enum** در یک فایل منبع **ایده‌ی خوبی نیست**. دلیل این امر این است که پیدا کردن آیتم‌ها را دشوار می‌کند، حتی اگر IntelliSense در دسترس باشد.

در طراحی **Namespaceها**، بهتر است از **Pascal Casing** استفاده کنید و ترتیب زیر را رعایت کنید:
**نام شرکت → نام محصول → نام فناوری → نام جمع مؤلفه‌ها**
مثال:

```csharp
FakeCompany.Product.Wpf.Feature.Subnamespace {} // مشخص برای محصول، فناوری و ویژگی
```

شروع با **نام شرکت** کمک می‌کند تا از تداخل Namespaceها جلوگیری شود. مثلاً اگر هم Microsoft و هم FakeCompany یک Namespace به نام System داشته باشند، می‌توان با نام شرکت تشخیص داد کدام System مدنظر است.

کدهایی که قابلیت استفاده مجدد در چند پروژه را دارند، بهتر است در **Assemblies جداگانه** قرار گیرند:

```csharp
FakeCompany.Wpf.Feature.Subnamespace {} /* مشخص برای فناوری و ویژگی، قابل استفاده در چند محصول */
```

هنگام استفاده از تست‌ها در کد (مثل **Test-Driven Development (TDD)**)، بهتر است کلاس‌های تست را در **Assemblies جداگانه** نگه دارید. نام Assembly تست باید **نام Assembly اصلی + Tests** باشد:

```csharp
FakeCompany.Core.Feature {} /* بدون وابستگی به فناوری و مشخص برای ویژگی، قابل استفاده در چند محصول */
```

هرگز تست‌های مربوط به Assemblyهای مختلف را در یک Assembly تست قرار ندهید؛ همیشه آن‌ها را جدا نگه دارید.

علاوه بر این، **Namespace و نوع (Type)** نباید نام یکسان داشته باشند، زیرا ممکن است باعث **تداخل کامپایلر** شود. هنگام جمع‌بندی Namespaceها، نیازی به جمع بستن نام شرکت‌ها، محصولات و مخفف‌ها نیست.

**خلاصه قوانین سازمان‌دهی کلاس‌ها:**

1. از **Pascal Casing** با ترتیب نام شرکت، محصول، فناوری و نام جمع مؤلفه‌ها استفاده کنید.
2. آیتم‌های قابل استفاده مجدد را در **Assemblies جداگانه** قرار دهید.
3. از یکسان بودن نام **Namespace و Type** پرهیز کنید.
4. نام‌های شرکت و محصول و مخفف‌ها را جمع نبندید.

---

### مسئولیت کلاس‌ها 

یک کلاس باید **فقط یک مسئولیت** داشته باشد.

**مسئولیت** کاری است که به کلاس واگذار شده است. در اصول **SOLID**، حرف **S** به **Single Responsibility Principle (SRP)** اشاره دارد. طبق این اصل، یک کلاس باید **فقط بر یک جنبه از ویژگی مورد پیاده‌سازی تمرکز کند** و مسئولیت آن جنبه به‌طور کامل در کلاس محصور شود. بنابراین، هرگز نباید بیش از یک مسئولیت به یک کلاس واگذار شود.

مثال نقض SRP:

```csharp
public class MultipleResponsibilities
{
    public string DecryptString(string text, SecurityAlgorithm algorithm) { /* ... */ }
    public string EncryptString(string text, SecurityAlgorithm algorithm) { /* ... */ }
    public string ReadTextFromFile(string filename) { /* ... */ }
    public string SaveTextToFile(string text, string filename) { /* ... */ }
}
```

در کلاس بالا، **وظایف رمزنگاری** با متدهای `DecryptString` و `EncryptString` و **دسترسی به فایل** با متدهای `ReadTextFromFile` و `SaveTextToFile` ترکیب شده‌اند. این کلاس **اصل SRP را نقض می‌کند**.

---

### تفکیک کلاس‌ها برای رعایت SRP 

کلاس را به دو کلاس جداگانه تقسیم می‌کنیم: یکی برای **رمزنگاری** و دیگری برای **دسترسی به فایل**:

```csharp
namespace FakeCompany.Core.Security
{
    public class Cryptography
    {
        public string DecryptString(string text, SecurityAlgorithm algorithm) { /* ... */ }
        public string EncryptString(string text, SecurityAlgorithm algorithm) { /* ... */ }
    }
}
```

با این کار، **کد رمزنگاری قابل استفاده مجدد** برای رشته‌ها در محصولات و فناوری‌های مختلف می‌شود و کلاس `Cryptography` با **SRP مطابقت دارد**.

پارامتر `SecurityAlgorithm` در کلاس `Cryptography` یک **enum** است و در **فایل منبع جداگانه** قرار دارد تا کد **تمیز، مینیمال و سازمان‌دهی شده** باقی بماند:

```csharp
using System;

namespace FakeCompany.Core.Security
{
    [Flags]
    public enum SecurityAlgorithm
    {
        Aes,
        AesCng,
        MD5,
        SHA5
    }
}
```

---

### کلاس TextFile و رعایت SRP 

کلاس زیر نیز مطابق SRP طراحی شده و **قابل استفاده مجدد** است:

```csharp
namespace FakeCompany.Core.FileSystem
{
    public class TextFile
    {
        public string ReadTextFromFile(string filename) { /* ... */ }
        public string SaveTextToFile(string text, string filename) { /* ... */ }
    }
}
```

این کلاس در Namespace مناسب **core filesystem** قرار دارد و می‌توان آن را در محصولات و فناوری‌های مختلف استفاده کرد.

---

در ادامه، به **کامنت‌گذاری کلاس‌ها** برای کمک به سایر توسعه‌دهندگان می‌پردازیم.

### کامنت‌گذاری برای تولید مستندات 

مستندسازی کد منبع همیشه یک ایده‌ی خوب است، چه پروژه داخلی باشد و چه نرم‌افزاری که قرار است توسط سایر توسعه‌دهندگان استفاده شود. پروژه‌های داخلی به دلیل **تغییرات مداوم توسعه‌دهندگان** و اغلب **مستندسازی ضعیف یا کم** دچار مشکل می‌شوند و این باعث می‌شود توسعه‌دهندگان جدید زمان بیشتری برای یادگیری صرف کنند. بسیاری از APIهای شخص ثالث نیز به دلیل **مستندسازی ضعیف برای توسعه‌دهندگان** موفقیت چندانی پیدا نمی‌کنند و adopters به دلیل ناامیدی از مستندات ناقص، استفاده از APIها را رها می‌کنند.

همیشه بهتر است که **اعلان حق نسخه‌برداری (copyright)** را در بالای هر فایل منبع درج کنید و بر روی **namespaceها، interfaceها، کلاس‌ها، enumها، structها، متدها و propertyها** کامنت‌گذاری داشته باشید.

کامنت‌های copyright باید **در بالای فایل منبع و بالای using statements** قرار گیرند و به صورت یک کامنت چندخطی نوشته شوند که با `/*` شروع و با `*/` پایان می‌یابد:

```csharp
/**************************************************************************
********
* Copyright 2019 PacktPub
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), to
* deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
* sell copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
***************************************************************************/
```

---

### مستندسازی namespace و کلاس‌ها با کامنت XML 

در مثال زیر می‌بینیم که **namespace** و **کلاس** و متدها با کامنت مستندسازی شده‌اند:

```csharp
using System;

/// <summary>
/// The CH3.Core.Security namespace contains fundamental types used
/// for the purpose of implementing application security.
/// </summary>
namespace CH3.Core.Security
{
    /// <summary>
    /// Encrypts and decrypts provided strings based on the selected
    /// algorithm.
    /// </summary>
    public class Cryptography
    {
        /// <summary>
        /// Decrypts a string using the selected algorithm.
        /// </summary>
        /// <param name="text">The string to be decrypted.</param>
        /// <param name="algorithm">The cryptographic algorithm used to decrypt the string.</param>
        /// <returns>Decrypted string</returns>
        public string DecryptString(string text, SecurityAlgorithm algorithm)
        {
            // ...implementation...
            throw new NotImplementedException();
        }

        /// <summary>
        /// Encrypts a string using the selected algorithm.
        /// </summary>
        /// <param name="text">The string to encrypt.</param>
        /// <param name="algorithm">The cryptographic algorithm used to encrypt the string.</param>
        /// <returns>Encrypted string</returns>
        public string EncryptString(string text, SecurityAlgorithm algorithm)
        {
            // ...implementation...
            throw new NotImplementedException();
        }
    }
}
```

در این نمونه:

* کامنت‌های مستندسازی با `///` شروع می‌شوند و **مستقیماً بالای آیتم مورد نظر** قرار دارند.
* Visual Studio با تایپ سه اسلش `///` به‌صورت خودکار **تگ‌های XML** را بر اساس خط زیر ایجاد می‌کند.
* در مثال بالا، **namespace** و کلاس تنها دارای `<summary>` هستند، اما متدها شامل **summary، توضیح پارامترها و return** نیز هستند.

در ادامه، جدول مربوط به **تگ‌های مختلف XML** که می‌توانید در کامنت‌ها استفاده کنید، ارائه می‌شود.
<div align="center">
  
  ![Conventions-UsedThis-Book](../../../assets/image/03/Table%203-2.jpeg)
  
</div>

### چسبندگی (Cohesion) و وابستگی (Coupling) 

در یک اسمبلی C# با طراحی خوب، کدها به‌درستی **گروه‌بندی می‌شوند**. این حالت به **چسبندگی بالا (High Cohesion)** معروف است. وقتی کدهایی کنار هم قرار می‌گیرند که به هم تعلق ندارند، **چسبندگی پایین (Low Cohesion)** رخ می‌دهد.

همچنین، شما می‌خواهید کلاس‌های مرتبط تا حد امکان مستقل باشند. هرچه یک کلاس بیشتر به کلاس دیگری وابسته باشد، **وابستگی (Coupling) بیشتری** دارد که به آن **وابستگی شدید (Tight Coupling)** گفته می‌شود. هرچه کلاس‌ها مستقل‌تر باشند، **چسبندگی پایین** و **وابستگی کمتر** داریم که به آن **Loose Coupling** می‌گوییم.

در یک کلاس خوب، هدف این است که **چسبندگی بالا و وابستگی کم** داشته باشیم. در ادامه مثال‌هایی از **وابستگی شدید** و سپس **وابستگی کم** ارائه می‌شود.

---

### مثال از وابستگی شدید (Tight Coupling) 

در کد زیر، کلاس `TightCouplingA` **encapsulation** را نقض می‌کند و متغیر `_name` را به‌طور مستقیم در دسترس قرار می‌دهد. این متغیر باید **private** باشد و تنها از طریق **propertyها یا متدهای کلاس** تغییر کند. اگرچه property `Name` متدهای get و set را برای اعتبارسنجی فراهم می‌کند، اما این کار تقریباً بی‌فایده است، زیرا این بررسی‌ها قابل دور زدن هستند:

```csharp
using System.Diagnostics;

namespace CH3.Coupling
{
    public class TightCouplingA
    {
        public string _name;
        public string Name
        {
            get { }
            set { }
        }
    }
}
```

در کد دیگر، کلاس `TightCouplingB` یک نمونه از `TightCouplingA` ایجاد می‌کند و **وابستگی شدید** بین دو کلاس ایجاد می‌کند، زیرا مستقیماً به متغیر `_name` دسترسی دارد و آن را null می‌کند و سپس مقدار آن را چاپ می‌کند:

```csharp
using System.Diagnostics;

namespace CH3.Coupling
{
    public class TightCouplingB
    {
        public TightCouplingB()
        {
            TightCouplingA tca = new TightCouplingA();
            tca._name = null;
            Debug.WriteLine("Name is " + tca._name);
        }
    }
}
```

---

### مثال از وابستگی کم (Loose Coupling) 

در این مثال، دو کلاس داریم: `LooseCouplingA` و `LooseCouplingB`.

* کلاس `LooseCouplingA` یک **فیلد private به نام `_name`** دارد و مقدار آن از طریق یک property عمومی تنظیم می‌شود.
* کلاس `LooseCouplingB` یک نمونه از `LooseCouplingA` ایجاد می‌کند و از طریق property `Name` به مقدار آن دسترسی پیدا می‌کند. از آنجا که فیلد `_name` مستقیماً قابل دسترسی نیست، بررسی‌ها در هنگام get و set اعمال می‌شوند.

کد نمونه `LooseCouplingA`:

```csharp
using System.Diagnostics;

namespace CH3.Coupling
{
    public class LooseCouplingA
    {
        private string _name;
        private readonly string _stringIsEmpty = "String is empty";
        public string Name
        {
            get
            {
                if (_name.Equals(string.Empty))
                    return _stringIsEmpty;
                else
                    return _name;
            }
            set
            {
                if (value.Equals(string.Empty))
                    Debug.WriteLine("Exception: String length must be greater than zero.");
            }
        }
    }
}
```

کد نمونه `LooseCouplingB`:

```csharp
using System.Diagnostics;

namespace CH3.Coupling
{
    public class LooseCouplingB
    {
        public LooseCouplingB()
        {
            LooseCouplingA lca = new LooseCouplingA();
            lca = null;
            Debug.WriteLine($"Name is {lca.Name}");
        }
    }
}
```

در اینجا، `LooseCouplingB` نمی‌تواند مستقیماً به فیلد `_name` دسترسی داشته باشد و بنابراین تغییرات از طریق property انجام می‌شود.

---

با این مثال‌ها، **وابستگی شدید و کم** را فهمیدیم و یاد گرفتیم که چگونه از کدهای با وابستگی زیاد اجتناب کنیم و کدهای با وابستگی کم بنویسیم.

در ادامه، به بررسی **چسبندگی پایین و چسبندگی بالا** خواهیم پرداخت.

### مثال از چسبندگی پایین (Low Cohesion) 

وقتی یک کلاس بیش از یک مسئولیت داشته باشد، به آن **کلاس با چسبندگی پایین** گفته می‌شود. در مثال زیر، کلاس `LowCohesion` چندین مسئولیت دارد:

```csharp
namespace CH3.Cohesion
{
    public class LowCohesion
    {
        public void ConnectToDatasource() { }
        public void ExtractDataFromDataSource() { }
        public void TransformDataForReport() { }
        public void AssignDataAndGenerateReport() { }
        public void PrintReport() { }
        public void CloseConnectionToDataSource() { }
    }
}
```

مشخص است که این کلاس حداقل سه مسئولیت مختلف دارد:

1. اتصال به دیتابیس و قطع اتصال از آن
2. استخراج داده‌ها و آماده‌سازی برای گزارش
3. تولید گزارش و چاپ آن

این ساختار به وضوح **اصل Single Responsibility Principle (SRP)** را نقض می‌کند. بنابراین نیاز است کلاس را به چند کلاس کوچک‌تر تقسیم کنیم که هر کدام یک مسئولیت دارند.

---

### مثال از چسبندگی بالا (High Cohesion) 

در این مثال، کلاس `LowCohesion` به سه کلاس جداگانه تقسیم شده که هر کدام **یک مسئولیت مشخص** دارند: `Connection`، `DataProcessor` و `ReportGenerator`.

#### کلاس Connection

این کلاس تنها متدهای مرتبط با اتصال به دیتابیس را دارد:

```csharp
namespace CH3.Cohesion
{
    public class Connection
    {
        public void ConnectToDatasource() { }
        public void CloseConnectionToDataSource() { }
    }
}
```

نام کلاس `Connection` است و فقط وظیفه اتصال به دیتابیس را بر عهده دارد؛ بنابراین **چسبندگی بالایی دارد**.

---

#### کلاس DataProcessor

این کلاس دو متد برای پردازش داده‌ها دارد: استخراج داده‌ها و آماده‌سازی آن‌ها برای گزارش:

```csharp
namespace CH3.Cohesion
{
    public class DataProcessor
    {
        public void ExtractDataFromDataSource() { }
        public void TransformDataForReport() { }
    }
}
```

این کلاس نیز مثال دیگری از **چسبندگی بالا** است.

---

#### کلاس ReportGenerator

این کلاس تنها متدهای مرتبط با تولید و چاپ گزارش را دارد:

```csharp
namespace CH3.Cohesion
{
    public class ReportGenerator
    {
        public void AssignDataAndGenerateReport() { }
        public void PrintReport() { }
    }
}
```

این کلاس نیز **چسبندگی بالایی** دارد و وظیفه مشخص و محدودی انجام می‌دهد.

---

با بررسی سه کلاس بالا، می‌بینیم که هر کلاس فقط متدهای مرتبط با مسئولیت خودش را دارد و بنابراین **چسبندگی بالایی دارند**.

در ادامه، نوبت به **طراحی کد برای تغییرپذیری (Design for Change)** می‌رسد، جایی که از **Interfaceها به جای کلاس‌ها** استفاده می‌کنیم تا بتوانیم کد را از طریق **Dependency Injection** و **Inversion of Control** به سازنده‌ها و متدها تزریق کنیم.

### طراحی برای تغییر (Design for Change) 

وقتی **برای تغییر طراحی می‌کنیم**، باید تمرکز خود را از *چیست* به *چگونه* تغییر دهیم:

* **چیست (What):** نیازمندی کسب‌وکار. این نیازها غالباً تغییر می‌کنند و نرم‌افزار باید انعطاف‌پذیر باشد تا بتواند به‌موقع و با بودجه مشخص آن‌ها را برآورده کند. کسب‌وکار اهمیتی به چگونگی پیاده‌سازی ندارد، فقط انتظار دارد نیازها به‌طور دقیق و به موقع تحقق یابند.
* **چگونه (How):** تیم‌های نرم‌افزار و زیرساخت به چگونگی پیاده‌سازی نیازها توجه دارند. نرم‌افزار باید طوری طراحی شود که به تغییرات نیازها پاسخ دهد و با تغییرات نسخه‌های نرم‌افزار و رفع باگ‌ها یا افزودن ویژگی‌های جدید، قابل نگهداری باشد.

---

### برنامه‌نویسی مبتنی بر رابط (Interface-Oriented Programming – IOP) 

**IOP** به ما اجازه می‌دهد کدی **چندریختی (polymorphic)** بنویسیم.

* در **OOP**، چندریختی یعنی کلاس‌های مختلف می‌توانند پیاده‌سازی‌های متفاوتی از یک **اینترفیس مشترک** داشته باشند.
* با استفاده از اینترفیس‌ها، نرم‌افزار قابل تغییر و توسعه برای برآوردن نیازهای کسب‌وکار می‌شود.

#### مثال اتصال به دیتابیس با اینترفیس

فرض کنید برنامه‌ای باید به دیتابیس‌های مختلف متصل شود. چطور می‌توان کد دیتابیس را بدون توجه به نوع دیتابیس یکسان نگه داشت؟ پاسخ: استفاده از **اینترفیس**.

ابتدا اینترفیس `IConnection` تعریف می‌شود:

```csharp
public interface IConnection
{
    void Open();
    void Close();
}
```

سپس کلاس‌های اتصال به MongoDB و SQL Server این اینترفیس را پیاده‌سازی می‌کنند:

```csharp
public class MongoDbConnection : IConnection
{
    public void Open() => Console.WriteLine("Opened MongoDB connection.");
    public void Close() => Console.WriteLine("Closed MongoDB connection.");
}

public class SqlServerConnection : IConnection
{
    public void Open() => Console.WriteLine("Opened SQL Server Connection.");
    public void Close() => Console.WriteLine("Closed SQL Server Connection.");
}
```

کلاس `Database` اینترفیس `IConnection` را دریافت می‌کند و از طریق آن عملیات باز و بسته کردن اتصال را انجام می‌دهد:

```csharp
public class Database
{
    private readonly IConnection _connection;

    public Database(IConnection connection)
    {
        _connection = connection;
    }

    public void OpenConnection() => _connection.Open();
    public void CloseConnection() => _connection.Close();
}
```

#### استفاده از اینترفیس‌ها در برنامه

```csharp
static void Main(string[] args)
{
    var mongoDb = new MongoDbConnection();
    var sqlServer = new SqlServerConnection();

    var db = new Database(mongoDb);
    db.OpenConnection();
    db.CloseConnection();

    db = new Database(sqlServer);
    db.OpenConnection();
    db.CloseConnection();
}
```

**خروجی کنسول:**

```
Opened MongoDB connection.
Closed MongoDB connection.
Opened SQL Server Connection.
Closed SQL Server Connection.
```

---

### مزایا 

* **قابلیت گسترش:** برای پشتیبانی از دیتابیس‌های جدید، کافیست کلاس‌های جدیدی که `IConnection` را پیاده‌سازی می‌کنند اضافه کنیم.
* **کد تمیز و قابل تست:** استفاده از **Dependency Injection** و **Inversion of Control** باعث می‌شود کلاس‌ها **loosely coupled** و راحت قابل تست باشند.
* **انعطاف‌پذیری:** نرم‌افزار می‌تواند با تغییر نیازها یا نسخه‌ها بدون تغییر کد موجود سازگار شود.

---

 **تزریق وابستگی و وارونگی کنترل (Dependency Injection و Inversion of Control)**

در زبان C#، ما توانایی پاسخگویی به نیازهای تغییرپذیر نرم‌افزار را با استفاده از **Dependency Injection (DI)** و **Inversion of Control (IoC)** داریم. این دو اصطلاح معانی متفاوتی دارند، اما اغلب به‌طور متداول به یک مفهوم به‌کار می‌روند.

با **IoC**، شما یک چارچوب برنامه‌نویسی می‌کنید که وظایف را با فراخوانی ماژول‌ها انجام می‌دهد. یک **IoC container** برای نگهداری ثبت ماژول‌ها استفاده می‌شود. این ماژول‌ها هنگام درخواست کاربر یا درخواست پیکربندی بارگذاری می‌شوند.

**DI** وابستگی‌های داخلی کلاس‌ها را حذف می‌کند. سپس اشیاء وابسته توسط یک فراخوان خارجی **تزریق (injected)** می‌شوند. یک **IoC container** از DI استفاده می‌کند تا اشیاء وابسته را به یک شیء یا متد تزریق کند.

در این فصل، منابع مفیدی ارائه می‌شود که به شما در درک IoC و DI کمک می‌کنند. سپس قادر خواهید بود از این تکنیک‌ها در برنامه‌های خود استفاده کنید.
بیایید ببینیم چگونه می‌توانیم **DI و IoC ساده خودمان را بدون استفاده از چارچوب‌های شخص ثالث** پیاده‌سازی کنیم. 

---

### مثال از **Dependency Injection (DI)**

در این مثال، ما DI ساده خود را پیاده‌سازی می‌کنیم.
یک **interface** به نام `ILogger` داریم که فقط یک متد با یک پارامتر رشته‌ای دارد.
سپس کلاسی به نام `TextFileLogger` می‌سازیم که **ILogger** را پیاده‌سازی می‌کند و رشته را در یک فایل متنی خروجی می‌دهد.
در نهایت، کلاسی به نام `Worker` خواهیم داشت که **constructor injection** و **method injection** را نشان می‌دهد.

---

این **interface** یک متد دارد که برای کلاس‌های پیاده‌ساز به منظور خروجی پیام استفاده می‌شود:

```csharp
namespace CH3.DependencyInjection
{
    public interface ILogger
    {
        void OutputMessage(string message);
    }
}
```

کلاس `TextFileLogger` **ILogger** را پیاده‌سازی می‌کند و پیام را در یک فایل متنی ذخیره می‌کند:

```csharp
using System;

namespace CH3.DependencyInjection
{
    public class TextFileLogger : ILogger
    {
        public void OutputMessage(string message)
        {
            System.IO.File.WriteAllText(FileName(), message);
        }

        private string FileName()
        {
            var timestamp = DateTime.Now.ToFileTimeUtc().ToString();
            var path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            return $"{path}_{timestamp}";
        }
    }
}
```

---

کلاس `Worker` نمونه‌ای از **constructor DI** و **method DI** ارائه می‌دهد. توجه کنید که پارامتر یک **interface** است. بنابراین هر کلاسی که آن interface را پیاده‌سازی کند می‌تواند در زمان اجرا **تزریق شود**:

```csharp
namespace CH3.DependencyInjection
{
    public class Worker
    {
        private ILogger _logger;

        public Worker(ILogger logger)
        {
            _logger = logger;
            _logger.OutputMessage("This constructor has been injected with a logger!");
        }

        public void DoSomeWork(ILogger logger)
        {
            logger.OutputMessage("This method has been injected with a logger!");
        }
    }
}
```

---

متد `DependencyInject` این مثال را اجرا می‌کند تا **DI در عمل** نشان داده شود:

```csharp
private void DependencyInject()
{
    var logger = new TextFileLogger();
    var di = new Worker(logger);
    di.DoSomeWork(logger);
}
```

همان‌طور که در کد می‌بینید، ابتدا یک نمونه جدید از کلاس `TextFileLogger` ساخته می‌شود.
این شیء سپس به **constructor** کلاس `Worker` تزریق می‌شود.
سپس متد `DoSomeWork` فراخوانی شده و همان نمونه `TextFileLogger` به آن ارسال می‌شود.
در این مثال ساده، مشاهده کردیم که چگونه می‌توان **کد را از طریق constructor و متدها به یک کلاس تزریق کرد**.

---

 نکته کلیدی: این کد وابستگی بین `Worker` و `TextFileLogger` را حذف می‌کند.
این باعث می‌شود که به راحتی بتوانیم **TextFileLogger** را با هر نوع لاگر دیگری که **ILogger** را پیاده‌سازی می‌کند جایگزین کنیم.
مثلاً می‌توانستیم از **event viewer logger** یا حتی **database logger** استفاده کنیم.
استفاده از **DI** راهی عالی برای کاهش **coupling** در کد شما است.

---

حال که **DI** را دیدیم، نوبت به بررسی **IoC** می‌رسد و در ادامه به آن خواهیم پرداخت. 

---

 **مثالی از IoC (Inversion of Control)**

در این مثال، قصد داریم **وابستگی‌ها را در یک IoC container ثبت کنیم** و سپس از **DI** برای تزریق وابستگی‌های لازم استفاده کنیم.

در کد زیر، یک **IoC container** داریم. این container وابستگی‌هایی که باید تزریق شوند را در یک **dictionary** ثبت می‌کند و مقادیر را از **metadata پیکربندی** می‌خواند:

```csharp
using System;
using System.Collections.Generic;

namespace CH3.InversionOfControl
{
    public class Container
    {
        public delegate object Creator(Container container);
        private readonly Dictionary<string, object> configuration = new Dictionary<string, object>();
        private readonly Dictionary<Type, Creator> typeToCreator = new Dictionary<Type, Creator>();

        public Dictionary<string, object> Configuration
        {
            get { return configuration; }
        }

        public void Register<T>(Creator creator)
        {
            typeToCreator.Add(typeof(T), creator);
        }

        public T Create<T>()
        {
            return (T)typeToCreator[typeof(T)](this);
        }

        public T GetConfiguration<T>(string name)
        {
            return (T)configuration[name];
        }
    }
}
```

سپس یک **container** می‌سازیم و از آن برای پیکربندی **metadata**، ثبت انواع و ایجاد نمونه‌های وابستگی استفاده می‌کنیم:

```csharp
private void InversionOfControl()
{
    Container container = new Container();
    container.Configuration["message"] = "Hello World!";
    container.Register<ILogger>(delegate
    {
        return new TextFileLogger();
    });
    container.Register<Worker>(delegate
    {
        return new Worker(container.Create<ILogger>());
    });
}
```

---

> **نکته:** با استفاده از این روش، **ایجاد، مدیریت و تزریق وابستگی‌ها به صورت متمرکز** انجام می‌شود و کلاس‌ها دیگر به جزئیات پیاده‌سازی وابستگی‌ها وابسته نیستند.

حالا بیایید به **قانون دمیتر (Law of Demeter)** بپردازیم تا ببینیم چگونه می‌توان دانش یک شیء را محدود به نزدیک‌ترین وابستگی‌ها کرد و از ایجاد **navigation trains** جلوگیری نمود.

---

 **قانون دمیتر (Law of Demeter)**

هدف قانون دمیتر حذف **navigation trains** (شمارش نقاط یا dot counting) و ایجاد **encapsulation خوب** با کد **loosely coupled** است.

یک متد که از یک **navigation train** اطلاع دارد، قانون دمیتر را می‌شکند. به مثال زیر توجه کنید:

```csharp
report.Database.Connection.Open(); // قانون دمیتر نقض شده است
```

هر واحد کد باید دانش محدودی داشته باشد. این دانش باید فقط مربوط به کدی باشد که **به‌طور نزدیک مرتبط** است.

با استفاده از قانون دمیتر، باید **tell و not ask** کنید. یعنی تنها می‌توانید متدهای اشیایی را فراخوانی کنید که یکی از موارد زیر باشند:

* به عنوان **arguments** ارسال شده‌اند
* به صورت **local** ساخته شده‌اند
* **Instance variables**
* **Globals**

پیاده‌سازی قانون دمیتر ممکن است دشوار باشد، اما مزایای **tell به جای ask** ارزشمند است. یکی از این مزایا، **کاهش coupling در کد** است.

در ادامه، ابتدا یک مثال **نادرست که قانون دمیتر را می‌شکند** و سپس یک مثال **صحیح که قانون دمیتر را رعایت می‌کند** را مشاهده خواهیم کرد.

---

 **مثال خوب و بد (chaining) از قانون دمیتر**

در **مثال خوب**، ما یک متغیر نمونه به نام `report` داریم. روی این شیء متد باز کردن اتصال (Open Connection) فراخوانی می‌شود. این کار **قانون دمیتر را نقض نمی‌کند**.

کد زیر، کلاس `Connection` را نشان می‌دهد که یک متد برای باز کردن اتصال دارد:

```csharp
namespace CH3.LawOfDemeter
{
    public class Connection
    {
        public void Open()
        {
            // ... پیاده‌سازی ...
        }
    }
}
```

کلاس `Database` یک شیء `Connection` می‌سازد و اتصال را باز می‌کند:

```csharp
namespace CH3.LawOfDemeter
{
    public class Database
    {
        public Database()
        {
            Connection = new Connection();
        }

        public Connection Connection { get; set; }

        public void OpenConnection()
        {
            Connection.Open();
        }
    }
}
```

در کلاس `Report`، یک شیء `Database` ایجاد می‌کنیم و سپس اتصال به پایگاه داده باز می‌شود:

```csharp
namespace CH3.LawOfDemeter
{
    public class Report
    {
        public Report()
        {
            Database = new Database();
        }

        public Database Database { get; set; }

        public void OpenConnection()
        {
            Database.OpenConnection();
        }
    }
}
```

تا اینجا، ما **کد خوبی داریم که قانون دمیتر را رعایت می‌کند**.

---

اما کد زیر **این قانون را نقض می‌کند**.

در کلاس `Example`، قانون دمیتر شکسته می‌شود زیرا از **method chaining** استفاده شده است، مانند:

```csharp
report.Database.Connection.Open();
```

کد نمونه:

```csharp
namespace CH3.LawOfDemeter
{
    public class Example
    {
        public void BadExample_Chaining()
        {
            var report = new Report();
            report.Database.Connection.Open(); // نقض قانون دمیتر
        }

        public void GoodExample()
        {
            var report = new Report();
            report.OpenConnection(); // رعایت قانون دمیتر
        }
    }
}
```

در این **مثال بد**، ابتدا getter کلاس `Database` روی متغیر نمونه `report` فراخوانی می‌شود که مشکلی ندارد. اما سپس getter `Connection` فراخوانی می‌شود که شیء متفاوتی برمی‌گرداند. نهایتاً متد `Open()` روی آن شیء فراخوانی می‌شود. این **همه مراحل قانون دمیتر را نقض می‌کنند**.

---

 **اشیاء و ساختارهای داده غیرقابل تغییر (Immutable objects and data structures)**

نوع‌های **immutable** معمولاً به عنوان **value types** در نظر گرفته می‌شوند. در value types، وقتی مقدار داده شد، انتظار داریم تغییر نکند. اما می‌توان **اشیاء immutable** و **ساختارهای داده immutable** نیز داشت.

**Immutable types** نوعی هستند که **وضعیت داخلی‌شان پس از مقداردهی اولیه تغییر نمی‌کند**.

رفتار این نوع‌ها باعث **شگفتی یا سردرگمی برنامه‌نویسان نمی‌شود** و بنابراین با **اصل کمترین شگفتی (POLA)** مطابقت دارد. این نوع‌ها پیش‌بینی‌پذیر هستند و برنامه‌نویسان می‌توانند **رفتار آن‌ها را به راحتی تحلیل کنند**.

از آنجا که **immutable types قابل پیش‌بینی و تغییرناپذیر** هستند، برنامه‌نویس با هیچ مشکل غیرمنتظره‌ای مواجه نمی‌شود و نیازی به نگرانی درباره اثرات نامطلوب ناشی از تغییرات آن‌ها نیست.

این ویژگی‌ها باعث می‌شوند که **immutable types برای به اشتراک‌گذاری بین threads ایده‌آل باشند**، زیرا **thread-safe** هستند و نیازی به برنامه‌نویسی دفاعی نیست.

زمانی که یک **نوع immutable** ایجاد می‌کنید و از **اعتبارسنجی اشیاء (object validation)** استفاده می‌کنید، شیء شما **در طول عمرش معتبر باقی می‌ماند**.

 حالا بیایید یک **مثال عملی از یک نوع immutable در C#** ببینیم.
 **مثالی از یک نوع immutable**

اکنون می‌خواهیم یک **شیء immutable** را بررسی کنیم. شیء `Person` در کد زیر دارای سه متغیر عضو **private** است. تنها زمانی که می‌توان این متغیرها را مقداردهی کرد، **در زمان ساخت شیء و داخل constructor** است. پس از آن، برای کل طول عمر شیء، قابل تغییر نیستند. هر متغیر تنها از طریق **properties فقط خواندنی (read-only)** قابل دسترسی است:

```csharp
namespace CH3.ImmutableObjectsAndDataStructures
{
    public class Person
    {
        private readonly int _id;
        private readonly string _firstName;
        private readonly string _lastName;

        public int Id => _id;
        public string FirstName => _firstName;
        public string LastName => _lastName;
        public string FullName => $"{_firstName} {_lastName}";
        public string FullNameReversed => $"{_lastName}, {_firstName}";

        public Person(int id, string firstName, string lastName)
        {
            _id = id;
            _firstName = firstName;
            _lastName = lastName;
        }
    }
}
```

حالا که دیدیم نوشتن **اشیاء و ساختارهای داده immutable** چقدر ساده است، بیایید به **داده‌ها و متدها در اشیاء** بپردازیم.

---

 **اشیاء باید داده‌ها را مخفی و متدها را آشکار کنند**

وضعیت شیء شما در **متغیرهای عضو (member variables)** ذخیره می‌شود. این متغیرها **داده (data)** هستند.

داده نباید به‌صورت مستقیم قابل دسترسی باشد. شما باید تنها **از طریق متدها و properties آشکار، به داده دسترسی بدهید**.

---

### چرا باید داده‌ها را مخفی و متدها را آشکار کنیم؟

مخفی کردن داده‌ها و آشکار کردن متدها در دنیای OOP به عنوان **encapsulation** شناخته می‌شود.

**Encapsulation**، جزئیات داخلی یک کلاس را از جهان بیرون مخفی می‌کند. این کار باعث می‌شود بتوانید **value types** را بدون شکستن پیاده‌سازی‌های موجود تغییر دهید.

داده‌ها می‌توانند **خواندنی/نوشتنی، فقط نوشتنی، یا فقط خواندنی** باشند که انعطاف بیشتری برای دسترسی و استفاده از داده به شما می‌دهد. همچنین می‌توانید ورودی‌ها را اعتبارسنجی کنید و از دریافت مقادیر نامعتبر جلوگیری کنید.

Encapsulation همچنین باعث می‌شود **تست کلاس‌ها راحت‌تر** باشد و کلاس‌ها **قابل استفاده مجدد و قابل توسعه** شوند.

---

### مثال از Encapsulation

کد زیر یک کلاس **encapsulated** را نشان می‌دهد. شیء `Car` **mutable** است. دارای properties است که **داده‌ها را پس از مقداردهی توسط constructor می‌خوانند و می‌نویسند**.

Constructor و **set properties** اعتبارسنجی پارامترها را انجام می‌دهند. اگر مقدار نامعتبر باشد، **یک استثنا (exception) پرتاب می‌شود**، در غیر این صورت مقدار برگردانده شده و داده تنظیم می‌شود:

```csharp
using System;

namespace CH3.Encapsulation
{
    public class Car
    {
        private string _make;
        private string _model;
        private int _year;

        public Car(string make, string model, int year)
        {
            _make = ValidateMake(make);
            _model = ValidateModel(model);
            _year = ValidateYear(year);
        }

        private string ValidateMake(string make)
        {
            if (make.Length >= 3)
                return make;
            throw new ArgumentException("Make must be three characters or more.");
        }

        public string Make
        {
            get { return _make; }
            set { _make = ValidateMake(value); }
        }

        // سایر متدها و properties برای اختصار حذف شده‌اند
    }
}
```

 **مزیت کد بالا:** اگر نیاز به تغییر **اعتبارسنجی داده‌ها** داشته باشید، می‌توانید این کار را بدون **شکستن پیاده‌سازی کلاس** انجام دهید.

 **ساختارهای داده باید داده‌ها را آشکار کنند و متد نداشته باشند**

ساختارها (**struct**) با کلاس‌ها متفاوتند چون از **برابری مقداری (value equality)** به جای **برابری مرجعی (reference equality)** استفاده می‌کنند.
به جز این مورد، تفاوت زیادی بین struct و class وجود ندارد.

یک بحث وجود دارد که آیا در یک **ساختار داده** باید متغیرها عمومی (**public**) باشند یا آن‌ها را پشت **get و set properties** مخفی کنیم. این انتخاب کاملاً به شما بستگی دارد، اما شخصاً همیشه فکر می‌کنم بهتر است حتی در structها هم داده‌ها را مخفی نگه داشته و تنها از طریق **properties و متدها** دسترسی بدهیم.

یک نکته مهم برای داشتن **ساختار داده تمیز و امن** این است که پس از ایجاد struct، نباید اجازه دهید از طریق متدها یا get properties تغییر کند. دلیل این کار این است که تغییرات روی ساختارهای داده موقتی ممکن است از بین بروند و بی‌اثر باشند.

---

### مثال ساده‌ای از ساختار داده

کد زیر یک **ساختار داده ساده** را نشان می‌دهد:

```csharp
namespace CH3.Encapsulation
{
    public struct Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Person(int id, string firstName, string lastName)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
        }
    }
}
```

همان‌طور که می‌بینید، ساختار داده خیلی با کلاس تفاوت ندارد؛ همچنان دارای **constructor و properties** است.

---

###  جمع‌بندی فصل

در این فصل، ما درباره موارد زیر یاد گرفتیم:

1. **سازماندهی namespaceها** در فولدرها و بسته‌ها و اینکه چگونه سازماندهی خوب می‌تواند از مشکلات namespace جلوگیری کند.
2. **کلاس‌ها و مسئولیت‌ها** و دلیل اینکه هر کلاس باید تنها یک مسئولیت داشته باشد.
3. **Cohesion و Coupling** و اهمیت **بالا بودن cohesion و پایین بودن coupling**.
4. **مستندسازی خوب** که نیازمند کامنت‌گذاری صحیح اعضای عمومی (**public members**) در ابزارهای تولید مستندات است و استفاده از **XML comments**.
5. **طراحی برای تغییر** با مثال‌های پایه‌ای **DI و IoC**.
6. **قانون Demeter** و اینکه چگونه باید فقط با دوستان نزدیک صحبت کرد و از زنجیره‌سازی (**chaining**) اجتناب کرد.
7. **اشیاء و ساختارهای داده** و اینکه چه داده‌هایی را باید مخفی کرد و چه داده‌هایی را باید عمومی نگه داشت.

---

در فصل بعدی، به طور مختصر به **برنامه‌نویسی تابعی (functional programming) در C#** می‌پردازیم و یاد می‌گیریم **چگونه متدهای کوچک و تمیز بنویسیم**. همچنین یاد می‌گیریم از داشتن بیش از دو پارامتر در متدها اجتناب کنیم، زیرا متدهای با پارامتر زیاد می‌توانند دست‌وپاگیر شوند. علاوه بر این، **اجتناب از تکرار کد** را نیز بررسی خواهیم کرد، زیرا تکرار کد می‌تواند منبع مشکلات و باگ‌ها باشد: وقتی یک قسمت اصلاح شود، ممکن است نسخه‌های دیگر هنوز در کد باقی بمانند. 
 **سؤالات فصل ۳**

1⃣ چگونه می‌توانیم کلاس‌های خود را در C# سازماندهی کنیم؟
2⃣ یک کلاس باید چند مسئولیت داشته باشد؟
3⃣ چگونه برای تولیدکننده‌های مستندات (**document generators**) روی کد خود کامنت‌گذاری کنیم؟
4⃣ **Cohesion** چه معنایی دارد؟
5⃣ **Coupling** چه معنایی دارد؟
6⃣ آیا **cohesion** باید بالا باشد یا پایین؟
7⃣ آیا **coupling** باید **tight** باشد یا **loose**؟
8⃣ چه مکانیزم‌هایی وجود دارند که به شما کمک می‌کنند برای تغییر طراحی کنید؟
9⃣ **DI** چیست؟
 **IoC** چیست؟
1⃣1⃣ یکی از مزایای استفاده از اشیاء **immutable** چیست؟
1⃣2⃣ اشیاء باید چه چیزهایی را مخفی کنند و چه چیزهایی را آشکار سازند؟
1⃣3⃣ ساختارها (**structures**) باید چه چیزهایی را مخفی کنند و چه چیزهایی را آشکار سازند؟

---

 **مطالعه بیشتر**

* برای جزئیات بیشتر در مورد انواع مختلف **cohesion و coupling** می‌توانید به لینک زیر مراجعه کنید:
  [GeeksforGeeks – Coupling and Cohesion](https://www.geeksforgeeks.org/software-engineering-coupling-and-cohesion/)

* آموزش‌های زیادی در مورد **IoC** در این لینک در دسترس است:
  [TutorialsTeacher – IoC](https://www.tutorialsteacher.com/ioc/) 
