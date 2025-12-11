---
layout: layout.njk
title: جمع بندی
---
# جمع بندی

مقاله ای که شما مطالعه کردید، درک من از رویکرد DDD از مطالعه کتاب **Domain Driven Design: Tackling Complexity in the Heart of Software** نوشته **Eric Evans** همچنین مطالعه مقالات مربوط به مباحث DDD در وبسایت های مختلف بود. چیزی که من از مطالعه این منابع یاد گرفتم این بود که DDD واقعا تنها یک روش برای پیاده سازی پروژه نرم افزاری نیست، بلکه، یک نوع نگرش به کسب و کار و تولید نرم افزار برای آن است، بدین معنی که اگر شما این نگرش را در خود ایجاد کنید، متوجه می شوید، الزامی برای استفاده از تمام DDD در پروژه های نرم افزاری وجود ندارد بلکه می توانید فقط بخش هایی از آن را استفاده کنید که نیاز شما را در پروژه برطرف می کند.

من در مطالعات خود یاد گرفتم برای راه اندازی یک نرم افزار با رویکرد DDD در ابتدا نیاز به مطالعه کسب و کار و شناخت آن است. سپس با استفاده از روش هایی که در طراحی استراتژیک معرفی شده است باید اقدام به شناسایی Subdomain ها کرد، سپس با توجه به شرایط کسب و کار، معمار نرم افزار به همراه صاحبان کسب و کار تصمیم می گیرند کدام Subdomain ها توسط تیم توسعه پیاده سازی شود، کدام برونسپاری شود و برای کدام از محصولات آماده استفاده شود. در مرحله بعد برای Subdomain هایی که تصمیم به توسعه آنها توسط تیم توسعه کسب و کار گرفته شده است، شروع به شناسایی Bounded Context های آنها می کنیم. در این مرحله میتوانیم برای شناسایی بهتر مرز بین Subdomain ها و Bounded Context ها از روش هایی مثل Domain Story Telling، Event Storming و Example Mapping استفاده کنیم.

بعد از مدل سازی کسب و کار با استفاده از روش های طراحی استراتژیک نوبت به پیاده سازی به فنی میرسد. باز هم چیزی که من یاد گرفتم این است که به ازای هر Bounded Context یک پروژه داریم که با توجه به لایه بندی هایی که برای پروژه در نظر می گیریم، اجزای Bounded Context را در آن لایه بندی های پیاده سازی می کنیم. هر لایه بندی به اقتضای نیاز های پروژه می تواند از یک تا چند Component داشته باشد و هر Component بخشی از نیاز های Bounded Context را برطرف می کند. نام یکی از این Component ها Domain است که داخل آن Entity ها، Value Object ها، Domain Service ها و قراردادهایی که Domain به آنها برای ارتباط با باقی لایه ها نیاز دارد، قرار می گیرند. و از باقی لایه ها برای خدمت رسانی به Domain یا ارتباط با دنیای بیرون استفاده می شود.

و آخرین نکته ای که می خواهم به آن اشاره کنم: فرآیند شناخت کسب و کار سپس طراحی استراتژیک و سپس پیاده سازی فنی، یک فرآیند خطی نیست، یعنی نقطه شروع دارد ولی، پایان ندارد در عوض یک فرآیند دورانی است که باید در طول عمر پروژه بارها و بارها تکرار شود چرا که در شروع پروژه هر چقدر هم از کسب و کار شناخت داشته باشیم باز هم ناشناخته های زیادی برای ما در کسب و کار وجود خواهد داشت یا در طول عمر کسب و کار نیاز های جدید اضافه می شوند و یا نیاز های قبلی تغییر می کنند. حال فرض کنید دانش جدیدی نسبت به کسب و کار به دست آورده اید یا نیازمندی جدیدی از سمت کسب و کار درخواست داده شده است و یا نیازمندی های قبلی نیاز به تغییر دارند، تمام این موارد باعث تغییر در مدل سازی ای میشود که ما از کسب و کار در طراحی استراتژیک داشته ایم. وقتی مدل سازی قبلی دچار تغییر شود به ناچار باید پیاده سازی فنی هم تغییر کند تا مدل و پیاده سازی همگام با یکدیگر پیش بروند. و این نکته، نکته ای هست که Eric Evans مداوم به آن اشاره کرده است، او بار ها و بار ها در کتاب خود یادآوری می کند چرخه توسعه پروژه باید به گونه ای باشد که افراد تیم به صورت مداوم با یکدیگر در ارتباط باشند تا بتوانند دانش خود از دامنه کسب و کار را عمیق تر کنند، سپس باید مدل قبلی را اصلاح کنند و از طرفی پیاده سازی همیشه باید نمایشی صریح از مدل طراحی شده باشد و بین مدل و پیاده سازی نباید تفاوتی وجود داشته باشد، پس، به محض تغییر در مدل شروع به ریفکتور کد کنید به طوری کد نمایانگر مدل باشد.

در نهایت می توانید دیاگرام زیر را به عنوان مسیر توسعه به روش DDD در ذهن خود به یاد داشته باشید.

```text
      ┌──────────────────┐
      │  شناخت کسب و کار │
      └─────────┬────────┘
                │
                ▼
┌──────────────────┐       ┌──────────────────┐
│ طراحی استراتژیک  │ ◀─────│  پیاده سازی فنی  │
└──────────────────┘       └──────────────────┘

```

ممنون از اینکه این مقاله را مطالعه کردید.

مهدی کاظمی

منابع
Domain-Driven Design: Tackling Complexity in the Heart of Software

<https://hackolade.com/downloads/DDDM-eBook.pdf>

<https://deviq.com/domain-driven-design/shared-kernel/>

<https://mehmetozkaya.medium.com/shared-kernel-pattern-in-domain-driven-design-ddd-21cba2a9f92a>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/shared-kernel/>

<https://medium.com/@dangeabunea/integrating-bounded-context-for-ddd-beginners-63c21af875fb>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/conformist/>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/anticorruption-layer/>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/separate-ways/>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/open-host-service/>

<https://buildsimple.substack.com/p/strategic-ddd-the-challenging-life>

<http://ddd.fed.wiki.org/open-host-service.html>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/partnership/>

<https://buildsimple.substack.com/p/strategic-ddd-the-art-of-partnership>

<https://ddd-practitioners.com/home/glossary/bounded-context/bounded-context-relationship/>

<https://ddd-practitioners.com/home/glossary/bounded-context/>

<https://github.com/ddd-crew/context-mapping>

<https://www.infoq.com/articles/ddd-contextmapping/>

<https://deviq.com/domain-driven-design/subdomain/>

<https://ddd-practitioners.com/2023/03/07/the-difference-between-domains-subdomains-and-bounded-contexts/>

<https://medium.com/nick-tune-tech-strategy-blog/domains-subdomain-problem-solution-space-in-ddd-clearly-defined-e0b49c7b586c>

<https://medium.com/@lambrych/domain-driven-design-ddd-strategic-design-explained-55e10b7ecc0f>

<https://vaadin.com/blog/ddd-part-1-strategic-domain-driven-design>

<https://deviq.com/domain-driven-design/strategic-design/>

<https://socadk.github.io/design-practice-repository/activities/DPR-StrategicDDD.html>

<https://medium.com/@monge.gaspard.1746/strategic-patterns-of-ddd-domain-driven-design-6e4ae7dbf136>

<https://ddd.academy/strategic-ddd-using-bounded-context-canvas-gien-verschatse/>

<https://opus.ch/ddd-concepts-and-patterns-distillation-of-the-core-domain/>

<https://roluquec.medium.com/building-better-software-the-role-of-domain-storytelling-in-ddd-95091a93d89b>

<https://ddd-practitioners.com/home/glossary/domain-storytelling/>

<https://www.lucidchart.com/blog/ddd-event-storming>

<https://ddd.academy/event-storming-example-mapping/>

<https://www.kranio.io/en/blog/de-bueno-a-excelente-en-ddd-comprender-los-patrones-de-repositorios-en-domain-driven-design---4-10>

<https://www.abrahamberg.com/blog/repository-pattern-in-ddd-bridging-the-domain-and-data-models/>

<https://yottahmd.medium.com/mastering-ddd-repository-design-patterns-in-go-2034486c82b3>

<https://dev.to/axeldlv/domain-driven-design-part-1-strategic-design-30b2>

<https://martinfowler.com/bliki/DomainDrivenDesign.html>

<https://medium.com/ssense-tech/domain-driven-design-effective-domain-modeling-and-its-perks-e4e3e3e0d5ee>

<https://yoan-thirion.medium.com/domain-driven-design-re-distilled-685e75595a60>

<https://www.oreilly.com/library/view/domain-driven-design-distilled/9780134434964/>

<https://medium.com/building-inventa/how-we-used-event-storming-meetings-for-enabling-software-domain-driven-design-401e5d708eb>
