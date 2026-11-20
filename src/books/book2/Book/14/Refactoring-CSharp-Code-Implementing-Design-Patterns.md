---
layout: layout.njk
title: بازنگری کد C# – پیاده‌سازی الگوهای طراحی
---
# فصل چهاردهم:  بازنگری کد C# – پیاده‌سازی الگوهای طراحی 

نیمی از نبرد در برنامه‌نویسی **کد تمیز** در پیاده‌سازی و استفاده صحیح از **الگوهای طراحی** نهفته است. خود **الگوهای طراحی** نیز می‌توانند به **Code Smell** تبدیل شوند. یک **الگوی طراحی** زمانی به **Code Smell** تبدیل می‌شود که برای چیزی که به‌سادگی قابل پیاده‌سازی است، بیش از حد مهندسی شود.

شما پیش‌تر استفاده از **الگوهای طراحی** را در نوشتن کد تمیز و بازنگری **Code Smell**ها در فصل‌های قبلی این کتاب مشاهده کرده‌اید. به‌طور مشخص، ما **الگوی Adapter**، **Decorator** و **Proxy** را پیاده‌سازی کردیم. این الگوها به روشی درست پیاده‌سازی شدند تا وظیفه موردنظر را انجام دهند. آن‌ها ساده نگه داشته شدند و مطمئناً کد را پیچیده نکردند. بنابراین، وقتی برای هدف مناسب خود استفاده شوند، **الگوهای طراحی** واقعاً در حذف **Code Smell**ها مفید هستند و کد شما را تمیز، شفاف و قابل نگهداری می‌کنند. 

در این فصل، به **الگوهای طراحی Gang of Four (GoF)** در سه دسته **Creational (ایجادشی)**، **Structural (ساختاری)** و **Behavioral (رفتاری)** می‌پردازیم. **الگوهای طراحی** قوانین سخت و ثابتی ندارند و لازم نیست پیاده‌سازی آن‌ها را بیش از حد سختگیرانه دنبال کنید. اما داشتن نمونه‌های کد می‌تواند به شما کمک کند تا از **دانش نظری** به **مهارت عملی لازم برای پیاده‌سازی و استفاده صحیح از الگوها** برسید. 

در این فصل، مباحث زیر را پوشش خواهیم داد:

1. پیاده‌سازی **الگوهای طراحی Creational**
2. پیاده‌سازی **الگوهای طراحی Structural**
3. مرور کلی **الگوهای طراحی Behavioral**

---

#### مهارت‌هایی که در پایان این فصل کسب خواهید کرد

* توانایی **درک، توصیف و برنامه‌نویسی** انواع **الگوهای طراحی Creational**
* توانایی **درک، توصیف و برنامه‌نویسی** انواع **الگوهای طراحی Structural**
* درک کلی از **الگوهای طراحی Behavioral**

ما مرور خود بر **الگوهای طراحی GoF** را با بررسی **الگوهای Creational** آغاز می‌کنیم. 

---

### پیش‌نیازهای فنی 

* **Visual Studio 2019**
* یک پروژه **Console Application با .NET Framework در Visual Studio 2019**
* سورس کامل این فصل: [GitHub CH14\_DesignPatterns](https://github.com/PacktPublishing/Clean-Code-in-C-/tree/master/CH14/CH14_DesignPatterns)

---

### پیاده‌سازی الگوهای Creational 

از دید برنامه‌نویس، وقتی **ایجاد اشیاء (Object Creation)** انجام می‌دهیم، از **الگوهای طراحی Creational** استفاده می‌کنیم. انتخاب الگو بستگی به **وظیفه موردنظر** دارد. پنج **الگوی طراحی Creational** وجود دارد:

1. **Singleton**: این الگو تضمین می‌کند که تنها **یک نمونه (Instance)** از یک کلاس در سطح برنامه وجود داشته باشد.
2. **Factory Method**: از این الگو برای ایجاد اشیاء بدون استفاده مستقیم از کلاس آن‌ها استفاده می‌شود.
3. **Abstract Factory**: بدون مشخص کردن کلاس‌های مشخص، گروه‌هایی از اشیاء مرتبط یا وابسته توسط **Abstract Factory** ایجاد می‌شوند.
4. **Prototype**: نوع نمونه اولیه (Prototype) را مشخص کرده و سپس کپی‌هایی از آن ایجاد می‌کند.
5. **Builder**: ساخت شیء را از نمایش آن جدا می‌کند.

حال، پیاده‌سازی هر یک از این الگوها را آغاز می‌کنیم، ابتدا با **الگوی Singleton**. 

---

### پیاده‌سازی الگوی Singleton 

**الگوی Singleton** تنها اجازه می‌دهد که **یک نمونه از کلاس** وجود داشته باشد و دسترسی **سراسری** به آن امکان‌پذیر باشد. این الگو زمانی استفاده می‌شود که تمام عملیات در یک سیستم باید توسط **دقیقاً یک شیء** هماهنگ شوند:

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-1.jpeg)
</div>

شرکت‌کننده در این الگو **Singleton** است — کلاسی که مسئول مدیریت **نمونه (Instance)** خودش است و تضمین می‌کند که تنها یک نمونه از آن در کل سیستم اجرا شود.

حال قصد داریم **الگوی Singleton** را پیاده‌سازی کنیم:

---

1. یک پوشه با نام **Singleton** در پوشه **CreationalDesignPatterns** ایجاد کنید.
2. سپس یک کلاس با نام **Singleton** اضافه کنید:

```csharp
public class Singleton {
    private static Singleton _instance;
    protected Singleton() { }
    public static Singleton Instance() {
        return _instance ?? (_instance = new Singleton());
    }
}
```

کلاس **Singleton** یک نسخه **استاتیک** از نمونه خودش را نگه می‌دارد. شما نمی‌توانید این کلاس را مستقیماً نمونه‌سازی کنید، زیرا **سازنده (Constructor)** آن به‌صورت **protected** تعریف شده است.

متد **Instance()** استاتیک است و بررسی می‌کند که آیا یک نمونه از کلاس **Singleton** وجود دارد یا خیر.

* اگر وجود داشت، همان نمونه برگردانده می‌شود.
* اگر وجود نداشت، نمونه ایجاد شده و سپس بازگردانده می‌شود.

حالا کدی برای فراخوانی آن اضافه می‌کنیم:

```csharp
var instance1 = Singleton.Instance();
var instance2 = Singleton.Instance();
if (instance1.Equals(instance2))
    Console.WriteLine("Instance 1 and instance 2 are the same instance of Singleton.");
```

---

3. ما دو نمونه از کلاس **Singleton** اعلام کرده‌ایم و سپس آن‌ها را مقایسه می‌کنیم تا ببینیم آیا همان نمونه هستند یا خیر. خروجی آن را می‌توانید در تصویر زیر مشاهده کنید: 

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-2.jpeg)
</div>

همان‌طور که مشاهده می‌کنید، ما یک کلاس عملیاتی داریم که **الگوی Singleton** را پیاده‌سازی می‌کند. 

گام بعدی، پیاده‌سازی **الگوی Factory Method** است.

---

### پیاده‌سازی الگوی Factory Method 

الگوی **Factory Method** اشیایی ایجاد می‌کند که به زیرکلاس‌های خود اجازه می‌دهد منطق ایجاد اشیای مخصوص به خودشان را پیاده‌سازی کنند.

از این الگو استفاده کنید وقتی که می‌خواهید **ایجاد اشیاء در یک مکان متمرکز** انجام شود و نیاز دارید **گروهی مشخص از اشیای مرتبط** را تولید کنید.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-3.jpeg)
</div>

شرکت‌کنندگان در این پروژه به شرح زیر هستند:

* **Product**: محصول انتزاعی که توسط **Factory Method** ایجاد می‌شود
* **ConcreteProduct**: محصولی که از **Product** ارث‌بری می‌کند
* **Creator**: کلاس انتزاعی با یک **Factory Method** انتزاعی
* **ConcreteCreator**: از **Creator** ارث‌بری می‌کند و **Factory Method** را پیاده‌سازی می‌کند

---

### پیاده‌سازی الگوی Factory Method 

1⃣ ابتدا یک پوشه به نام **FactoryMethod** به پوشه **CreationalDesignPatterns** اضافه کنید.

2⃣ کلاس **Product** را اضافه کنید:

```csharp
public abstract class Product {}
```

این کلاس محصولات ایجاد شده توسط **Factory Method** را تعریف می‌کند.

3⃣ کلاس **ConcreteProduct** را اضافه کنید:

```csharp
public class ConcreteProduct : Product {}
```

این کلاس از **Product** ارث‌بری می‌کند.

4⃣ کلاس **Creator** را اضافه کنید:

```csharp
public abstract class Creator {
    public abstract Product FactoryMethod();
}
```

کلاس **Creator** توسط کلاس **ConcreteCreator** ارث‌بری خواهد شد تا متد **FactoryMethod()** را پیاده‌سازی کند.

5⃣ کلاس **ConcreteCreator** را اضافه کنید:

```csharp
public class ConcreteCreator : Creator {
    public override Product FactoryMethod() {
        return new ConcreteProduct();
    }
}
```

کلاس **ConcreteCreator** از **Creator** ارث‌بری می‌کند و **FactoryMethod()** را بازنویسی می‌کند. این متد یک نمونه جدید از **ConcreteProduct** ایجاد و بازمی‌گرداند.

---

### استفاده از Factory Method

```csharp
var creator = new ConcreteCreator();
var product = creator.FactoryMethod();
Console.WriteLine($"Product Type: {product.GetType().Name}");
```

در این مثال:

* یک نمونه از **ConcreteCreator** ایجاد کردیم
* سپس متد **FactoryMethod()** را فراخوانی کردیم تا محصول جدیدی بسازیم
* نام محصول ایجاد شده توسط **Factory Method** در **Console** نمایش داده شد 

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-4.jpeg)
</div>

حال که با نحوه پیاده‌سازی **Factory Method** آشنا شدیم، به سراغ پیاده‌سازی **Abstract Factory** می‌رویم.

---

### پیاده‌سازی الگوی Abstract Factory 

الگوی **Abstract Factory** برای ایجاد گروهی از اشیاء مرتبط یا وابسته (که به آن‌ها **خانواده‌ها** گفته می‌شود) بدون مشخص کردن کلاس‌های مشخص آن‌ها استفاده می‌شود.

این الگو به شما امکان می‌دهد تا گروه‌های مختلفی از اشیاء را با هم مدیریت کنید، بدون آنکه وابسته به جزئیات کلاس‌های مشخص باشید.

ادامه خواهیم داد تا نحوه تعریف و پیاده‌سازی این الگو در C# را مرحله به مرحله توضیح دهیم.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-5.jpeg)
</div>

شرکت‌کنندگان در این الگو به شرح زیر هستند:

* **AbstractFactory**: کارخانه انتزاعی که توسط **ConcreteFactory** پیاده‌سازی می‌شود
* **ConcreteFactory**: کارخانه مشخص که محصولات مشخص را ایجاد می‌کند
* **AbstractProduct**: محصول انتزاعی که محصولات مشخص از آن ارث‌بری می‌کنند
* **Product**: محصولی که از **AbstractProduct** ارث می‌برد و توسط کارخانه مشخص ایجاد می‌شود

---

### پیاده‌سازی الگوی Abstract Factory 

۱. یک پوشه به نام **CreationalDesignPatterns** به پروژه اضافه کنید.
۲. داخل پوشه **CreationalDesignPatterns**، پوشه‌ای به نام **AbstractFactory** بسازید.
۳. در پوشه **AbstractFactory**، کلاس **AbstractFactory** را اضافه کنید:

```csharp
public abstract class AbstractFactory {
    public abstract AbstractProductA CreateProductA();
    public abstract AbstractProductB CreateProductB();
}
```

کلاس **AbstractFactory** شامل دو متد انتزاعی برای ایجاد محصولات انتزاعی است.

۴. کلاس **AbstractProductA** را اضافه کنید:

```csharp
public abstract class AbstractProductA {
    public abstract void Operation(AbstractProductB productB);
}
```

کلاس **AbstractProductA** یک متد انتزاعی دارد که عملیات روی **AbstractProductB** انجام می‌دهد.

۵. کلاس **AbstractProductB** را اضافه کنید:

```csharp
public abstract class AbstractProductB {
    public abstract void Operation(AbstractProductA productA);
}
```

کلاس **AbstractProductB** نیز یک متد انتزاعی دارد که عملیات روی **AbstractProductA** انجام می‌دهد.

۶. کلاس **ProductA** را اضافه کنید:

```csharp
public class ProductA : AbstractProductA {
    public override void Operation(AbstractProductB productB) {
        Console.WriteLine("ProductA.Operation(ProductB)");
    }
}
```

**ProductA** از **AbstractProductA** ارث‌بری می‌کند و متد **Operation()** را بازنویسی می‌کند تا با **AbstractProductB** تعامل داشته باشد. در این مثال، متد پیام خود را در کنسول چاپ می‌کند.

۷. به همان صورت، کلاس **ProductB** را اضافه کنید:

```csharp
public class ProductB : AbstractProductB {
    public override void Operation(AbstractProductA productA) {
        Console.WriteLine("ProductB.Operation(ProductA)");
    }
}
```

**ProductB** از **AbstractProductB** ارث‌بری می‌کند و متد **Operation()** را بازنویسی می‌کند تا با **AbstractProductA** تعامل داشته باشد.

۸. کلاس **ConcreteFactory** را اضافه کنید:

```csharp
public class ConcreteProduct : AbstractFactory {
    public override AbstractProductA CreateProductA() {
        return new ProductA();
    }
    public override AbstractProductB CreateProductB() {
        return new ProductB();
    }
}
```

**ConcreteFactory** از **AbstractFactory** ارث‌بری می‌کند و دو متد ایجاد محصول را بازنویسی می‌کند. هر متد، یک کلاس مشخص را بازمی‌گرداند.

۹. کلاس **Client** را اضافه کنید:

```csharp
public class Client
{
    private readonly AbstractProductA _abstractProductA;
    private readonly AbstractProductB _abstractProductB;

    public Client(AbstractFactory factory) {
        _abstractProductA = factory.CreateProductA();
        _abstractProductB = factory.CreateProductB();
    }

    public void Run() {
        _abstractProductA.Operation(_abstractProductB);
        _abstractProductB.Operation(_abstractProductA);
    }
}
```

کلاس **Client** دو محصول انتزاعی را اعلام می‌کند. سازنده آن، یک شیء **AbstractFactory** می‌گیرد و محصولات انتزاعی را با محصولات مشخصی که توسط کارخانه ساخته می‌شوند، مقداردهی می‌کند.
متد **Run()** عملیات **Operation()** را روی هر دو محصول اجرا می‌کند.

۱۰. اجرای نمونه کد:

```csharp
AbstractFactory factory = new ConcreteProduct();
Client client = new Client(factory);
client.Run();
```

با اجرای کد، خروجی مشابه زیر در کنسول نمایش داده خواهد شد.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-6.jpeg)
</div>

یک پیاده‌سازی مرجع خوب از **Abstract Factory**، کلاس انتزاعی **DbProviderFactory** در **ADO.NET 2.0** است. مقاله‌ای با عنوان **Abstract Factory Design Pattern in ADO.NET 2.0** نوشته **Moses Soliman** در وب‌سایت **C# Corner** توضیح خوبی درباره پیاده‌سازی **DbProviderFactory** و الگوی طراحی **Abstract Factory** ارائه می‌دهد. لینک مقاله:
[https://www.c-sharpcorner.com/article/abstract-factory-design-pattern-in-ado-net-2-0/](https://www.c-sharpcorner.com/article/abstract-factory-design-pattern-in-ado-net-2-0/)

ما اکنون با موفقیت الگوی طراحی **Abstract Factory** را پیاده‌سازی کردیم. حالا به سراغ پیاده‌سازی **Prototype Pattern** می‌رویم.

---

### پیاده‌سازی الگوی Prototype 

الگوی طراحی **Prototype** برای ایجاد یک نمونه از پروتوتایپ و سپس تولید اشیاء جدید با کلون کردن آن پروتوتایپ استفاده می‌شود.
از این الگو زمانی استفاده کنید که هزینه ایجاد اشیاء به صورت مستقیم بالا باشد. با استفاده از این الگو، می‌توانید شیء را کش (Cache) کنید و در صورت نیاز، یک کلون از آن برگردانید.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-7.jpeg)
</div>

شرکت‌کنندگان در **الگوی طراحی Prototype** به شرح زیر هستند:

* **Prototype**: یک کلاس انتزاعی که متدی برای کلون کردن خود ارائه می‌دهد
* **ConcretePrototype**: از **Prototype** ارث‌بری می‌کند و متد **Clone()** را بازنویسی می‌کند تا یک کپی سطحی (Memberwise Clone) از پروتوتایپ ایجاد شود
* **Client**: درخواست کلون‌های جدید از پروتوتایپ را می‌دهد

---

### پیاده‌سازی الگوی Prototype 

1. یک پوشه با نام **Prototype** به پوشه **CreationalDesignPatterns** اضافه کنید و سپس کلاس **Prototype** را اضافه کنید:

```csharp
public abstract class Prototype {
    public string Id { get; private set; }
    public Prototype(string id) {
        Id = id;
    }
    public abstract Prototype Clone();
}
```

کلاس **Prototype** باید ارث‌بری شود. سازنده‌ی آن یک رشته شناسایی‌کننده می‌گیرد که در سطح کلاس ذخیره می‌شود. متد **Clone()** ارائه شده که توسط کلاس‌های فرزند بازنویسی خواهد شد.

2. حالا کلاس **ConcretePrototype** را اضافه کنید:

```csharp
public class ConcretePrototype : Prototype {
    public ConcretePrototype(string id) : base(id) { }
    public override Prototype Clone() {
        return (Prototype) this.MemberwiseClone();
    }
}
```

کلاس **ConcretePrototype** از **Prototype** ارث‌بری می‌کند. سازنده‌ی آن یک رشته شناسایی‌کننده می‌گیرد و آن را به سازنده‌ی کلاس پایه ارسال می‌کند. سپس متد **Clone()** را بازنویسی می‌کند تا یک کپی سطحی از شیء فعلی ایجاد کرده و کلون را به نوع **Prototype** تبدیل و برگرداند.

3. نمونه‌ کدی که نشان‌دهنده‌ی استفاده از الگوی **Prototype** است:

```csharp
var prototype = new ConcretePrototype("Clone 1");
var clone = (ConcretePrototype)prototype.Clone();
Console.WriteLine($"Clone Id: {clone.Id}");
```

کد ما یک نمونه جدید از **ConcretePrototype** با شناسه `"Clone 1"` ایجاد می‌کند، سپس پروتوتایپ را کلون کرده و آن را به نوع **ConcretePrototype** تبدیل می‌کند. در نهایت، شناسه‌ی کلون را در کنسول چاپ می‌کنیم. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-8.jpeg)
</div>

همان‌طور که می‌بینیم، کلون دارای همان شناسه‌ای است که پروتوتایپ از آن کلون گرفته شده است. 

برای مطالعه‌ی یک مثال واقعی و جامع، می‌توانید به مقاله‌ای با عنوان **Prototype Design Pattern with Real-World Scenario** نوشته‌ی Akshay Patel در سایت **C# Corner** مراجعه کنید. لینک مقاله:
https\://www\.c-sharpcorner.com/UploadFile/db2972/prototype-design-pattern-with-real-worldscenario624/

---

### پیاده‌سازی الگوی Builder 

الگوی **Builder** ساخت شیء را از نمایش آن جدا می‌کند. به این ترتیب، می‌توانید از یک روش ساخت برای ایجاد نمایش‌های مختلف از همان شیء استفاده کنید.

از این الگو زمانی استفاده کنید که یک **شیء پیچیده** دارید که باید به صورت مرحله‌ای ساخته و به هم متصل شود:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-9.jpeg)
</div>

شرکت‌کنندگان در الگوی **Builder** به شرح زیر هستند: 

* **Director**: کلاسی که یک Builder را از طریق سازنده‌اش دریافت می‌کند و سپس هر یک از متدهای ساخت را روی شیء Builder فراخوانی می‌کند.
* **Builder**: یک کلاس انتزاعی که متدهای انتزاعی ساخت و یک متد انتزاعی برای بازگرداندن شیء ساخته‌شده را ارائه می‌دهد.
* **ConcreteBuilder**: یک کلاس واقعی که از کلاس Builder ارث‌بری می‌کند، متدهای ساخت را بازنویسی می‌کند تا شیء را واقعاً بسازد و متد نتیجه را بازنویسی می‌کند تا شیء کاملاً ساخته‌شده را بازگرداند.

---

### پیاده‌سازی الگوی Builder 

1⃣ ابتدا یک پوشه با نام **Builder** به پوشه‌ی **CreationalDesignPatterns** اضافه کنید. سپس کلاس **Product** را ایجاد کنید:

```csharp
public class Product {
    private List<string> _parts;
    public Product() {
        _parts = new List<string>();
    }
    public void Add(string part) {
        _parts.Add(part);
    }
    public void PrintPartsList() {
        var sb = new StringBuilder();
        sb.AppendLine("Parts Listing:");
        foreach (var part in _parts)
            sb.AppendLine($"- {part}");
        Console.WriteLine(sb.ToString());
    }
}
```

کلاس **Product** یک لیست از اجزاء نگهداری می‌کند. این اجزاء رشته هستند. لیست در سازنده مقداردهی اولیه می‌شود. اجزاء توسط متد `Add()` اضافه می‌شوند و وقتی شیء کاملاً ساخته شد، متد `PrintPartsList()` لیست اجزاء را در کنسول چاپ می‌کند.

---

2⃣ سپس کلاس **Builder** را اضافه کنید:

```csharp
public abstract class Builder
{
    public abstract void BuildSection1();
    public abstract void BuildSection2();
    public abstract Product GetProduct();
}
```

کلاس **Builder** توسط کلاس‌های Concrete ارث‌بری می‌شود و متدهای انتزاعی آن بازنویسی می‌شوند تا شیء ساخته شده و بازگردانده شود.

---

3⃣ حالا کلاس **ConcreteBuilder** را اضافه کنید:

```csharp
public class ConcreteBuilder : Builder {
    private Product _product;
    public ConcreteBuilder() {
        _product = new Product();
    }
    public override void BuildSection1() {
        _product.Add("Section 1");
    }
    public override void BuildSection2() {
        _product.Add("Section 2");
    }
    public override Product GetProduct() {
        return _product;
    }
}
```

کلاس **ConcreteBuilder** از **Builder** ارث‌بری می‌کند. این کلاس نمونه‌ی شیء در حال ساخت را ذخیره می‌کند. متدهای ساخت بازنویسی شده و اجزاء به محصول اضافه می‌شوند. محصول از طریق `GetProduct()` به کلاینت بازگردانده می‌شود.

---

4⃣ سپس کلاس **Director** را اضافه کنید:

```csharp
public class Director
{
    public void Build(Builder builder)
    {
        builder.BuildSection1();
        builder.BuildSection2();
    }
}
```

کلاس **Director** یک کلاس واقعی است که شیء Builder را از طریق متد `Build()` دریافت می‌کند و متدهای ساخت را روی آن فراخوانی می‌کند.

---

5⃣ حالا کد نهایی برای نمایش اجرای الگوی Builder:

```csharp
var director = new Director();
var builder = new ConcreteBuilder();
director.Build(builder);
var product = builder.GetProduct();
product.PrintPartsList();
```

ابتدا یک **Director** و یک **Builder** ایجاد می‌کنیم. سپس **Director** محصول را می‌سازد. محصول به متغیر `product` اختصاص داده می‌شود و لیست اجزاء آن در کنسول چاپ می‌شود. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-10.jpeg)
</div>

همه چیز طبق انتظار کار می‌کند. 

در **.NET Framework**، کلاس **System.Text.StringBuilder** یک مثال واقعی از **الگوی طراحی Builder** در دنیای واقعی است. استفاده از الحاق رشته با عملگر جمع (+) وقتی که پنج خط یا بیشتر رشته بخواهید الحاق کنید، کندتر از استفاده از کلاس **StringBuilder** است. اگر کمتر از پنج خط رشته داشته باشید، عملگر + سریع‌تر است، اما وقتی بیش از پنج خط وجود دارد، **StringBuilder** عملکرد بهتری دارد.

علت این است که هر بار که با عملگر + یک رشته می‌سازید، رشته‌ی جدیدی ایجاد می‌شود زیرا رشته‌ها در حافظه (heap) **immutable** هستند. اما **StringBuilder** فضای بافر در حافظه تخصیص می‌دهد و سپس کاراکترها به آن نوشته می‌شوند. برای تعداد کمی خط، عملگر + سریع‌تر است به دلیل سربار ایجاد بافر هنگام استفاده از StringBuilder. اما وقتی بیش از پنج خط دارید، تفاوت عملکرد با StringBuilder محسوس است.

در پروژه‌های داده‌محور بزرگ که ممکن است صدها هزار یا میلیون‌ها الحاق رشته رخ دهد، استراتژی انتخابی شما برای الحاق رشته می‌تواند بسیار سریع یا کند عمل کند.

بیایید یک مثال ساده بسازیم. یک کلاس به نام **StringConcatenation** ایجاد کنید و کد زیر را اضافه کنید:

```csharp
private static DateTime _startTime;
private static long _durationPlus;
private static long _durationSb;
```

* `_startTime` زمان شروع اجرای متد را نگه می‌دارد.
* `_durationPlus` مدت زمان اجرای متد با عملگر + را بر حسب تعداد **ticks** ذخیره می‌کند.
* `_durationSb` مدت زمان عملیات الحاق با **StringBuilder** را بر حسب ticks نگه می‌دارد.

سپس متد `UsingThePlusOperator()` را اضافه کنید:

```csharp
public static void UsingThePlusOperator()
{
    _startTime = DateTime.Now;
    var text = string.Empty;
    for (var x = 1; x <= 10000; x++)
    {
        text += $"Line: {x}, I must not be a lazy programmer, and should continually develop myself!\n";
    }
    _durationPlus = (DateTime.Now - _startTime).Ticks;
    Console.WriteLine($"Duration (Ticks) Using Plus Operator: {_durationPlus}");
}
```

این متد زمان لازم برای الحاق ۱۰،۰۰۰ رشته با عملگر + را محاسبه می‌کند و تعداد **ticks** مصرف‌شده را ذخیره می‌کند.

حالا متد `UsingTheStringBuilder()` را اضافه کنید:

```csharp
public static void UsingTheStringBuilder()
{
    _startTime = DateTime.Now;
    var sb = new StringBuilder();
    for (var x = 1; x <= 10000; x++)
    {
        sb.AppendLine($"Line: {x}, I must not be a lazy programmer, and should continually develop myself!");
    }
    _durationSb = (DateTime.Now - _startTime).Ticks;
    Console.WriteLine($"Duration (Ticks) Using StringBuilder: {_durationSb}");
}
```

این متد همان متد قبلی است، با این تفاوت که الحاق رشته با کلاس **StringBuilder** انجام می‌شود.

---

حالا متد `PrintTimeDifference()` را اضافه کنید:

```csharp
public static void PrintTimeDifference()
{
    var difference = _durationPlus - _durationSb;
    Console.WriteLine($"That's a time difference of {difference} ticks.");
    Console.WriteLine($"{difference} ticks = {TimeSpan.FromTicks(difference)} seconds.\n\n");
}
```

این متد تفاوت زمان را با کم کردن تعداد ticks **StringBuilder** از تعداد ticks عملگر + محاسبه می‌کند و ابتدا تعداد ticks و سپس معادل آن بر حسب ثانیه را در کنسول چاپ می‌کند.

---

برای آزمایش کد و مشاهده تفاوت زمان، دستورات زیر را اجرا کنید:

```csharp
StringConcatenation.UsingThePlusOperator();
StringConcatenation.UsingTheStringBuilder();
StringConcatenation.PrintTimeDifference();
```

پس از اجرای کد، زمان‌ها و تفاوت زمانی بین دو روش الحاق رشته در **کنسول** نمایش داده خواهد شد. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-11.jpeg)
</div>

همان‌طور که در تصویر مشاهده می‌کنید، **StringBuilder** بسیار سریع‌تر است.  وقتی داده‌ها کم باشند، تفاوت چندانی از نظر چشم غیرمسلح مشاهده نمی‌شود، اما وقتی تعداد خطوط داده‌ای که پردازش می‌شوند به‌طور قابل توجهی افزایش یابد، تفاوت به وضوح مشخص خواهد بود.

یک مثال دیگر برای استفاده از **الگوی Builder**، ساخت گزارش‌ها است. اگر به گزارش‌های دسته‌بندی شده (banded reports) فکر کنید، این دسته‌ها در واقع بخش‌هایی هستند که باید از منابع مختلف ساخته شوند. بنابراین می‌توانید بخش اصلی گزارش و هر زیربخش (subreport) را به‌عنوان یک بخش مجزا در نظر بگیرید. گزارش نهایی ترکیبی از این بخش‌ها خواهد بود. بنابراین می‌توانید کدی شبیه به زیر برای ساخت گزارش داشته باشید:

```csharp
var report = new Report();
report.AddHeader();
report.AddLastYearsSalesTotalsForAllRegions();
report.AddLastYearsSalesTotalsByRegion();
report.AddFooter();
report.GenerateOutput();
```

در این مثال، ابتدا یک گزارش جدید ایجاد می‌کنیم. سپس با افزودن **Header** شروع می‌کنیم، بعد مجموع فروش سال گذشته برای همه مناطق را اضافه می‌کنیم، سپس مجموع فروش سال گذشته به تفکیک مناطق و در نهایت **Footer** را اضافه کرده و با تولید خروجی، فرآیند تکمیل می‌شود. 

---

پس تا اینجا، شما:

1. **پیاده‌سازی پیش‌فرض الگوی Builder** را از طریق **نمودار UML** مشاهده کردید.
2. سپس **الحاق رشته‌ها با StringBuilder** را اجرا کردید تا ساخت رشته‌ها به‌صورت کارآمد انجام شود.
3. در نهایت یاد گرفتید که **الگوی Builder** چگونه می‌تواند برای ساخت بخش‌های یک گزارش و تولید خروجی آن مفید باشد. 

---

تا اینجا، پیاده‌سازی **الگوهای طراحی Creational** به پایان رسید. حالا به سراغ **پیاده‌سازی برخی از الگوهای طراحی Structural** می‌رویم.

### پیاده‌سازی الگوهای طراحی Structural 

به‌عنوان برنامه‌نویس، ما از **الگوهای ساختاری (Structural)** برای بهبود ساختار کلی کد استفاده می‌کنیم. وقتی با کدی مواجه می‌شویم که ساختار ندارد و تمیز نیست، می‌توانیم از الگوهای زیر برای بازسازی و تمیز کردن کد استفاده کنیم. هفت الگوی ساختاری وجود دارد:

1. **Adapter:** این الگو برای هماهنگ کردن کلاس‌هایی با **interface ناسازگار** استفاده می‌شود تا بتوانند به‌صورت تمیز با هم کار کنند.
2. **Bridge:** برای **شل کردن وابستگی‌ها** با جدا کردن abstraction از implementation استفاده می‌شود.
3. **Composite:** برای **تجمیع اشیاء** و ارائه روشی یکنواخت برای کار با اشیاء منفرد و ترکیبی استفاده می‌شود.
4. **Decorator:** این الگو امکان افزودن **دینامیک قابلیت جدید** به یک شیء را در حالی که interface حفظ شود، فراهم می‌کند.
5. **Façade:** برای ساده‌سازی **interfaceهای بزرگ و پیچیده** استفاده می‌شود.
6. **Flyweight:** برای **صرفه‌جویی در حافظه** و اشتراک داده‌های مشابه بین اشیاء استفاده می‌شود.
7. **Proxy:** این الگو بین **کلاینت و API** قرار می‌گیرد تا تماس‌ها را میان کلاینت و API رهگیری کند.

---

ما پیش‌تر با الگوهای **Adapter**، **Decorator** و **Proxy** در فصل‌های قبلی آشنا شدیم، بنابراین در این فصل دوباره بررسی نمی‌شوند. حالا پیاده‌سازی **الگوهای ساختاری** را آغاز می‌کنیم و با **Bridge Pattern** شروع خواهیم کرد.

### پیاده‌سازی الگوی Bridge 

الگوی Bridge برای **جدا کردن abstraction از implementation** استفاده می‌شود تا در زمان کامپایل به هم وابسته نباشند. این کار به شما اجازه می‌دهد که **abstraction و implementation** به‌طور مستقل تغییر کنند بدون آن که بر کلاینت تأثیر بگذارد.

از الگوی Bridge استفاده کنید اگر:

* نیاز به **runtime binding** برای implementation دارید،
* یا می‌خواهید یک implementation بین چند شیء به اشتراک گذاشته شود،
* اگر تعدادی کلاس وجود دارند که به دلیل coupling با interface و پیاده‌سازی‌های مختلف ایجاد شده‌اند،
* یا نیاز به **map کردن سلسله‌مراتب کلاس‌های ارتوگونال** وجود دارد.

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-12.jpeg)
</div>

شرکت‌کنندگان در **الگوی طراحی Bridge** به شرح زیر هستند:

* **Abstraction:** یک کلاس انتزاعی که شامل عملیات‌های انتزاعی (abstract operations) است.
* **RefinedAbstraction:** از کلاس Abstraction ارث‌بری می‌کند و متد **Operation()** را بازنویسی می‌کند.
* **Implementor:** یک کلاس انتزاعی با متد انتزاعی **Operation()**
* **ConcreteImplementor:** از کلاس Implementor ارث‌بری می‌کند و متد **Operation()** را بازنویسی می‌کند.

---

### پیاده‌سازی الگوی Bridge 

1. ابتدا یک پوشه به نام **StructuralDesignPatterns** به پروژه اضافه کنید، سپس در آن پوشه یک پوشه دیگر به نام **Bridge** بسازید.
2. کلاس **Implementor** را اضافه کنید:

```csharp
public abstract class Implementor {
    public abstract void Operation();
}
```

کلاس Implementor فقط یک متد انتزاعی به نام **Operation()** دارد.

3. کلاس **Abstraction** را اضافه کنید:

```csharp
public class Abstraction {
    protected Implementor implementor;
    public Implementor Implementor {
        set => implementor = value;
    }
    public virtual void Operation() {
        implementor.Operation();
    }
}
```

کلاس Abstraction یک فیلد **protected** دارد که شیء Implementor را نگه می‌دارد و از طریق property آن تنظیم می‌شود. متد مجازی **Operation()**، متد **Operation()** شیء implementor را فراخوانی می‌کند.

4. کلاس **RefinedAbstraction** را اضافه کنید:

```csharp
public class RefinedAbstraction : Abstraction {
    public override void Operation() {
        implementor.Operation();
    }
}
```

کلاس RefinedAbstraction از Abstraction ارث‌بری می‌کند و متد **Operation()** را بازنویسی کرده تا متد **Operation()** روی implementor اجرا شود.

5. حالا کلاس **ConcreteImplementor** را اضافه کنید:

```csharp
public class ConcreteImplementor : Implementor {
    public override void Operation() {
        Console.WriteLine("Concrete operation executed.");
    }
}
```

کلاس ConcreteImplementor از Implementor ارث‌بری می‌کند و متد **Operation()** را بازنویسی می‌کند تا یک پیام در کنسول چاپ شود.

---

### اجرای مثال الگوی Bridge

```csharp
var abstraction = new RefinedAbstraction();
abstraction.Implementor = new ConcreteImplementor();
abstraction.Operation();
```

ابتدا یک نمونه از **RefinedAbstraction** ایجاد می‌کنیم، سپس implementor آن را به یک نمونه از **ConcreteImplementor** اختصاص می‌دهیم. در نهایت **Operation()** فراخوانی می‌شود.

 خروجی مثال پیاده‌سازی Bridge به شکل زیر خواهد بود:

```
Concrete operation executed.
```

<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-13.jpeg)
</div>

همان‌طور که مشاهده می‌کنید، ما موفق شدیم عملیات **Concrete** را در کلاس **ConcreteImplementor** اجرا کنیم .

الگوی بعدی که بررسی می‌کنیم، **الگوی طراحی Composite** است.

---

### پیاده‌سازی الگوی Composite 

با **الگوی طراحی Composite**، اشیاء به صورت ساختار درختی ترکیب می‌شوند تا سلسله‌مراتب جزء-کل (part-whole hierarchies) را نمایش دهند. این الگو به شما امکان می‌دهد تا اشیاء منفرد و ترکیب‌های آن‌ها را به‌طور یکنواخت مدیریت کنید.

از این الگو زمانی استفاده کنید که:
1⃣ نیاز دارید تفاوت بین اشیاء منفرد و ترکیب‌های اشیاء را نادیده بگیرید.
2⃣ به ساختارهای درختی برای نمایش سلسله‌مراتب نیاز دارید.
3⃣ ساختار سلسله‌مراتبی به عملکردهای عمومی (generic functionality) در سراسر ساختار نیاز دارد.

---

ادامه پیاده‌سازی شامل تعریف شرکت‌کنندگان، کلاس‌های **Component**، **Leaf** و **Composite** خواهد بود که به شما امکان می‌دهد سلسله‌مراتب اشیاء را به‌صورت یکنواخت مدیریت کنید.

اگر بخواهید، می‌توانم همین حالا ادامه ترجمه و پیاده‌سازی کد **Composite** را هم به شما ارائه کنم. آیا ادامه دهم؟
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-14.jpeg)
</div>

شرکت‌کنندگان در **الگوی طراحی Composite** به شرح زیر هستند:

* **Component**: رابط (interface) اشیاء ترکیبی
* **Leaf**: یک برگ در ترکیب که هیچ فرزندی ندارد
* **Composite**: اجزای فرزند را ذخیره می‌کند و عملیات‌ها را انجام می‌دهد
* **Client**: از طریق رابط Component با ترکیب‌ها و برگ‌ها کار می‌کند

---

### پیاده‌سازی الگوی Composite 

1⃣ یک پوشه جدید به نام **Composite** به پوشه **StructuralDesignPatterns** اضافه کنید.
سپس، رابط **IComponent** را اضافه کنید:

```csharp
public interface IComponent {
    void PrintName();
}
```

رابط **IComponent** تنها یک متد دارد که هم برگ‌ها و هم ترکیب‌ها آن را پیاده‌سازی می‌کنند.

2⃣ کلاس **Leaf** را اضافه کنید:

```csharp
public class Leaf : IComponent {
    private readonly string _name;
    public Leaf(string name) {
        _name = name;
    }
    public void PrintName() {
        Console.WriteLine($"Leaf Name: {_name}");
    }
}
```

کلاس **Leaf** رابط **IComponent** را پیاده‌سازی می‌کند. سازنده آن یک نام می‌گیرد و ذخیره می‌کند و متد **PrintName()** نام برگ را در کنسول چاپ می‌کند.

3⃣ کلاس **Composite** را اضافه کنید:

```csharp
public class Composite : IComponent {
    private readonly string _name;
    private readonly List<IComponent> _components;
    public Composite(string name) {
        _name = name;
        _components = new List<IComponent>();
    }
    public void Add(IComponent component) {
        _components.Add(component);
    }
    public void PrintName() {
        Console.WriteLine($"Composite Name: {_name}");
        foreach (var component in _components) {
            component.PrintName();
        }
    }
}
```

کلاس **Composite** نیز **IComponent** را پیاده‌سازی می‌کند، مشابه کلاس برگ. علاوه بر این، **Composite** لیستی از اجزا دارد که با متد **Add()** اضافه می‌شوند. متد **PrintName()** ابتدا نام خود را چاپ می‌کند و سپس نام تمام اجزای موجود در لیست را چاپ می‌کند.

---

### تست پیاده‌سازی Composite

```csharp
var root = new Composite("Classification of Animals");
var invertebrates = new Composite("+ Invertebrates");
var vertebrates = new Composite("+ Vertebrates");
var warmBlooded = new Leaf("-- Warm-Blooded");
var coldBlooded = new Leaf("-- Cold-Blooded");
var withJointedLegs = new Leaf("-- With Jointed-Legs");
var withoutLegs = new Leaf("-- Without Legs");

invertebrates.Add(withJointedLegs);
invertebrates.Add(withoutLegs);
vertebrates.Add(warmBlooded);
vertebrates.Add(coldBlooded);
root.Add(invertebrates);
root.Add(vertebrates);

root.PrintName();
```

همان‌طور که مشاهده می‌کنید:
 ابتدا ترکیب‌ها (**Composite**) ایجاد می‌شوند، سپس برگ‌ها (**Leaf**) ساخته می‌شوند.
 برگ‌ها به ترکیب‌های مناسب اضافه می‌شوند.
 سپس ترکیب‌ها به ریشه (**root composite**) اضافه می‌شوند.
 در نهایت، با فراخوانی **PrintName()** روی ریشه، نام ریشه و تمام اجزا و برگ‌های سلسله‌مراتبی چاپ می‌شوند.

خروجی برنامه مشابه ساختار سلسله‌مراتبی درختی خواهد بود.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-15.jpeg)
</div>

پیاده‌سازی ما از الگوی **Composite** همان‌طور که انتظار داشتیم به درستی کار می‌کند .
الگوی بعدی که پیاده‌سازی خواهیم کرد، **الگوی Façade** است.

---

### پیاده‌سازی الگوی Façade 

الگوی **Façade** به منظور ساده‌تر کردن استفاده از زیرسیستم‌های API طراحی شده است.
از این الگو استفاده کنید تا یک سیستم بزرگ و پیچیده را پشت یک رابط ساده‌تر برای مشتریان خود مخفی کنید.

دلایل اصلی استفاده برنامه‌نویسان از این الگو عبارت‌اند از:

* سیستمی که باید استفاده یا روی آن کار شود، بسیار پیچیده است و فهم آن دشوار است.
* اگر تعداد زیادی کلاس به یکدیگر وابسته باشند.
* یا در مواقعی که برنامه‌نویسان به کد منبع دسترسی ندارند.

این الگو باعث می‌شود تعامل با سیستم ساده‌تر شود و پیچیدگی‌ها از دید کاربر مخفی بماند.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-16.jpeg)
</div>

شرکت‌کنندگان در الگوی **Façade** به شرح زیر هستند:

* **Facade**: رابط ساده‌ای که به‌عنوان واسطه بین مشتری و یک سیستم پیچیده از زیرسیستم‌ها عمل می‌کند.
* **Subsystem Classes**: کلاس‌های زیرسیستم که دسترسی مستقیم مشتری به آن‌ها حذف شده و تنها توسط Facade قابل دسترسی هستند.

---

حالا می‌خواهیم الگوی **Façade** را پیاده‌سازی کنیم:

1⃣ یک پوشه به نام **Facade** داخل **StructuralDesignPatterns** اضافه کنید. سپس کلاس‌های **SubsystemOne** و **SubsystemTwo** را اضافه کنید:

```csharp
public class SubsystemOne {
    public void PrintName() {
        Console.WriteLine("SubsystemOne.PrintName()");
    }
}

public class SubsystemTwo {
    public void PrintName() {
        Console.WriteLine("SubsystemTwo.PrintName()");
    }
}
```

این کلاس‌ها یک متد دارند که نام کلاس و نام متد را در کنسول چاپ می‌کند.

2⃣ حالا کلاس **Facade** را اضافه کنید:

```csharp
public class Facade {
    private SubsystemOne _subsystemOne = new SubsystemOne();
    private SubsystemTwo _subsystemTwo = new SubsystemTwo();

    public void SubsystemOneDoWork() {
        _subsystemOne.PrintName();
    }

    public void SubsystemTwoDoWork() {
        _subsystemTwo.PrintName();
    }
}
```

کلاس **Facade** متغیرهای عضوی برای هر سیستم که از آن آگاهی دارد ایجاد می‌کند و سپس مجموعه‌ای از متدها را فراهم می‌کند تا بخش‌های مختلف هر زیرسیستم را هنگام درخواست اجرا کند.

3⃣ برای آزمایش پیاده‌سازی، کد زیر را اضافه کنید:

```csharp
var facade = new Facade();
facade.SubsystemOneDoWork();
facade.SubsystemTwoDoWork();
```

تنها کافی است یک متغیر **Facade** ایجاد کنید و سپس متدهایی که فراخوانی متدهای زیرسیستم‌ها را انجام می‌دهند، اجرا کنید.
نتیجه خروجی مشابه زیر خواهد بود:
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-17.jpeg)
</div>

وقت آن رسیده که به آخرین الگوی ساختاری خود یعنی **Flyweight** نگاهی بیندازیم. 

---

### پیاده‌سازی الگوی **Flyweight**

الگوی **Flyweight** برای پردازش بهینه تعداد زیادی شیء ریز و جزئی استفاده می‌شود، به‌طوری که تعداد کل اشیاء کاهش پیدا کند.
از این الگو استفاده کنید تا **کارایی سیستم افزایش یابد** و **حجم حافظه مصرفی کاهش پیدا کند**، زیرا تعداد اشیائی که ایجاد می‌کنید کاهش می‌یابد.

---

اگر آماده باشید، می‌توانیم شرکت‌کنندگان این الگو و مراحل پیاده‌سازی آن را مرور کنیم.
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-18.jpeg)
</div>

شرکت‌کنندگان در الگوی طراحی **Flyweight** به شرح زیر هستند: 

* **Flyweight**: یک رابط (Interface) برای Flyweightها فراهم می‌کند تا بتوانند یک **Extrinsic State** دریافت کرده و بر اساس آن عمل کنند.
* **ConcreteFlyweight**: یک شیء قابل اشتراک که فضای ذخیره‌سازی برای **Intrinsic State** را اضافه می‌کند.
* **UnsharedConcreteFlyweight**: زمانی استفاده می‌شود که Flyweightها نیازی به اشتراک‌گذاری ندارند.
* **FlyweightFactory**: اشیاء Flyweight را به‌درستی مدیریت کرده و آن‌ها را به‌صورت اشتراکی فراهم می‌کند.
* **Client**: مراجع Flyweight را نگه‌داری کرده و **Extrinsic State** آن‌ها را محاسبه یا ذخیره می‌کند.

**توضیح حالات:**

* **Extrinsic State** یعنی بخشی از ماهیت اصلی شیء نیست و از خارج شیء تأمین می‌شود.
* **Intrinsic State** یعنی بخشی از وضعیت درونی شیء است و برای شیء ضروری است.

---

### پیاده‌سازی الگوی **Flyweight**

1. ابتدا پوشه‌ای به نام **Flyweight** داخل پوشه **StructuralDesignPatterns** اضافه کنید.
2. کلاس **Flyweight** را اضافه کنید:

```csharp
public abstract class Flyweight {
    public abstract void Operation(string extrinsicState);
}
```

این کلاس انتزاعی است و شامل متدی انتزاعی به نام **Operation()** است که **Extrinsic State** به آن ارسال می‌شود.

3. کلاس **ConcreteFlyweight**:

```csharp
public class ConcreteFlyweight : Flyweight
{
    public override void Operation(string extrinsicState)
    {
        Console.WriteLine($"ConcreteFlyweight: {extrinsicState}");
    }
}
```

این کلاس از **Flyweight** ارث‌بری کرده و متد **Operation()** را بازنویسی می‌کند. این متد نام کلاس و **Extrinsic State** را چاپ می‌کند.

4. کلاس **FlyweightFactory**:

```csharp
public class FlyweightFactory {
    private readonly Hashtable _flyweights = new Hashtable();
    public FlyweightFactory()
    {
        _flyweights.Add("FlyweightOne", new ConcreteFlyweight());
        _flyweights.Add("FlyweightTwo", new ConcreteFlyweight());
        _flyweights.Add("FlyweightThree", new ConcreteFlyweight());
    }
    public Flyweight GetFlyweight(string key) {
        return ((Flyweight)_flyweights[key]);
    }
}
```

در مثال ما، اشیاء Flyweight در یک **Hashtable** ذخیره می‌شوند. سه Flyweight در سازنده ایجاد شده‌اند و متد **GetFlyweight()**، شیء Flyweight مربوط به کلید مشخص شده را برمی‌گرداند.

5. کلاس **Client**:

```csharp
public class Client
{
    private const string ExtrinsicState = "Arbitary state can be anything you require!";
    private readonly FlyweightFactory _flyweightFactory = new FlyweightFactory();
    public void ProcessFlyweights()
    {
        var flyweightOne = _flyweightFactory.GetFlyweight("FlyweightOne");
        flyweightOne.Operation(ExtrinsicState);
        
        var flyweightTwo = _flyweightFactory.GetFlyweight("FlyweightTwo");
        flyweightTwo.Operation(ExtrinsicState);
        
        var flyweightThree = _flyweightFactory.GetFlyweight("FlyweightThree");
        flyweightThree.Operation(ExtrinsicState);
    }
}
```

**Extrinsic State** می‌تواند هر چیزی باشد. در مثال ما، یک رشته استفاده شده است.

6. اجرای نمونه و تست Flyweight:

```csharp
var flyweightClient = new StructuralDesignPatterns.Flyweight.Client();
flyweightClient.ProcessFlyweights();
```

کد یک نمونه از **Client** ایجاد کرده و متد **ProcessFlyweights()** را فراخوانی می‌کند. خروجی مشابه زیر خواهد بود:

---

این پیاده‌سازی نشان می‌دهد که چگونه می‌توان با **Flyweight** تعداد اشیاء ایجاد شده را کاهش داد و حافظه و کارایی را بهینه کرد. 
<div align="center">

![Conventions-UsedThis-Book](../../../assets/image/14/Table%2014-19.jpeg)
</div>

خوب، این بخش پایانی فصل ۱۴ کتاب است و به جمع‌بندی الگوهای طراحی و نکات مهم کدنویسی تمیز می‌پردازد. 

---

### **مروری بر الگوهای رفتاری (Behavioral Design Patterns)**

الگوهای رفتاری مشخص می‌کنند که اشیاء چگونه با هم تعامل دارند و رفتار خود را نشان می‌دهند. مهم‌ترین الگوهای رفتاری عبارتند از:

* **Chain of Responsibility**: پردازش درخواست‌ها به صورت یک خط لوله متوالی از اشیاء.
* **Command**: بسته‌بندی اطلاعات لازم برای اجرای متد در آینده.
* **Interpreter**: تفسیر یک دستور زبان مشخص.
* **Iterator**: دسترسی ترتیبی به عناصر یک مجموعه بدون افشای ساختار داخلی.
* **Mediator**: ارتباط بین اشیاء از طریق یک واسطه.
* **Memento**: ذخیره و بازگرداندن وضعیت یک شیء.
* **Observer**: مشاهده و دریافت اعلان تغییرات وضعیت یک شیء.
* **State**: تغییر رفتار یک شیء با تغییر وضعیت آن.
* **Strategy**: مجموعه‌ای از الگوریتم‌های قابل تعویض.
* **Template Method**: تعریف الگوریتم و مراحل قابل بازنویسی در زیرکلاس‌ها.
* **Visitor**: افزودن عملیات جدید به اشیاء بدون تغییر آن‌ها.

 برای یادگیری کامل این الگوها، کتاب‌های زیر توصیه می‌شوند:

1. *Design Patterns in C#: A Hands-on Guide with Real-World Examples* – Vaskaring Sarcar
2. *Design Patterns in .NET* – Dmitri Nesteruk
3. *Hands-On Design Patterns with C# and .NET Core* – Gaurav Aroraa و Jeffrey Chilberto

---

### **نکات پایانی درباره Clean Code و Refactoring**

* **Brownfield vs Greenfield**:

  * *Brownfield*: نگهداری و گسترش نرم‌افزار موجود.
  * *Greenfield*: توسعه نرم‌افزار جدید از ابتدا، فرصت نوشتن کد تمیز از همان ابتدا.

* قبل از شروع پروژه، برنامه‌ریزی صحیح داشته باشید و ابزارهای لازم برای نوشتن کد تمیز را به کار ببرید.

* **Refactoring**: اگر با کد غیر تمیز مواجه شدید، آن را فوراً بازسازی کنید یا در صورت پیچیدگی زیاد، آن را به عنوان بدهی فنی ثبت کنید.

* **کدنویسی تمیز**:

  * عمق ارث‌بری ≤ 1
  * کاهش حلقه‌ها و استفاده از LINQ
  * کاهش پیچیدگی مسیرهای برنامه
  * کلاس‌ها کوچک و تک‌مسئولیتی
  * متدها ≤ 10 خط و تک‌مسئولیتی
  * استفاده از DRY (Don't Repeat Yourself)
  * مستندسازی کد عمومی، کامنت مختصر و معنادار برای کد مخفی

* **تمرین و توسعه مهارت‌ها**:

  * چالش‌های برنامه‌نویسی بدون کپی/پیست
  * پروفایلینگ و بهینه‌سازی کد
  * پیاده‌سازی TDD و BDD
  * پیروی از اصول KISS، SOLID، YAGNI و DRY

* همیشه سعی کنید کد ساده، قابل خواندن و قابل درک بنویسید. اگر بعد از مدتی دوباره به پروژه برگردید، باید بتوانید کد را سریع درک کنید.

* **هدف نهایی**: کد تمیز و بهینه که نگهداری، توسعه و خواندن آن آسان باشد و مهارت واقعی شما را نشان دهد. 

---

### **جمع‌بندی فصل ۱۴**

1. بررسی و پیاده‌سازی **Creational Patterns** برای حل مسائل واقعی و بهینه‌سازی کد.
2. استفاده از **Structural Patterns** برای بهبود ساختار و روابط بین اشیاء.
3. آشنایی با **Behavioral Patterns** برای بهبود تعامل و ارتباط اشیاء و حفظ عدم وابستگی آن‌ها.
4. آموزش Refactoring برای کدهای موجود و نوشتن **کد تمیز از ابتدا**.

---

### **پرسش‌های پیشنهادی برای تمرین**

1. GoF Patterns چیست و چرا از آن‌ها استفاده می‌کنیم؟
2. Creational Patterns چه کاربردی دارند و نام ببرید.
3. Structural Patterns چه کاربردی دارند و نام ببرید.
4. Behavioral Patterns چه کاربردی دارند و نام ببرید.
5. آیا امکان استفاده بیش از حد از الگوها وجود دارد؟
6. Singleton چیست و چه زمانی استفاده می‌کنیم؟
7. چرا از Factory Methods استفاده می‌کنیم؟
8. چه الگویی برای پنهان‌کردن پیچیدگی سیستم بزرگ کاربرد دارد؟
9. چگونه می‌توان حافظه را بهینه و داده‌های مشترک بین اشیاء را مدیریت کرد؟
10. چه الگویی برای جداکردن Abstraction از Implementation مناسب است؟
11. چگونه می‌توان چند نمایش مختلف از یک شیء پیچیده ایجاد کرد؟
12. اگر یک شیء نیازمند چند مرحله پردازش برای رسیدن به وضعیت مورد نظر باشد، چه الگویی مناسب است و چرا؟

---

### **مطالعه بیشتر**

کتاب‌های توصیه شده برای تمرین بیشتر و ارتقاء مهارت‌ها:

* *Refactoring* – Martin Fowler
* *Refactoring at Scale* – Maude Lemaire
* *Working Effectively with Legacy Code* – Michael Feathers
* *Patterns of Enterprise Application Architecture* – Martin Fowler
* *C#7 and .NET Core 2.0 High Performance* – Ovais Mehboob Ahmed Khan
* و دیگر منابع ذکر شده در متن
