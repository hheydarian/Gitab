---
layout: layout.njk
title: پاسخ‌های احتمالی برای تمرین‌ها
---

# پیوست ۲ - پاسخ‌های احتمالی برای تمرین‌ها

> *«ترجیح می‌دهم سوالاتی داشته باشم که نمی‌توان به آن‌ها پاسخ داد، تا پاسخ‌هایی که نمی‌توان آن‌ها را زیر سوال برد.»*
> — ریچارد فاینمن

**پاسخ ۱ (از تمرین ۱)**
از نظر ما، کلاس `Split2` متعامدتر (Orthogonal) است. این کلاس روی وظیفه خودش، یعنی تقسیم خطوط تمرکز می‌کند و جزئیاتی مانند اینکه خطوط از کجا می‌آیند را نادیده می‌گیرد. این کار نه تنها توسعه کد را آسان‌تر می‌کند، بلکه آن را منعطف‌تر نیز می‌سازد. `Split2` می‌تواند خطوط خوانده شده از یک فایل، تولید شده توسط یک روتین دیگر، یا ارسال شده از طریق محیط (Environment) را تقسیم کند.

**پاسخ ۲ (از تمرین ۲)**
بیایید با یک ادعا شروع کنیم: شما می‌توانید تقریباً در هر زبانی کد خوب و متعامد بنویسید. در عین حال، هر زبانی وسوسه‌هایی دارد: ویژگی‌هایی که می‌توانند منجر به افزایش وابستگی (Coupling) و کاهش تعامد شوند.

در زبان‌های شیءگرا (OO)، ویژگی‌هایی مثل ارث‌بری چندگانه، استثناها (Exceptions)، سربارگذاری عملگرها (Operator Overloading)، و بازنویسی متدهای والد (از طریق زیرکلاس‌سازی) فرصت‌های فراوانی را برای افزایش وابستگی به روش‌های غیربدیهی فراهم می‌کنند. همچنین نوعی وابستگی وجود دارد زیرا یک کلاس، کد را به داده متصل می‌کند. این معمولاً چیز خوبی است (وقتی وابستگی خوب است، به آن **انسجام** یا Cohesion می‌گوییم). اما اگر کلاس‌هایتان را به اندازه کافی متمرکز نسازید، می‌تواند منجر به رابط‌های (Interfaces) بسیار زشتی شود.

در زبان‌های تابعی، شما تشویق می‌شوید که توابع کوچک و جدا از همِ (Decoupled) زیادی بنویسید و آن‌ها را به روش‌های مختلف ترکیب کنید تا مشکلتان را حل کنید. در تئوری این خوب به نظر می‌رسد. در عمل هم اغلب همین‌طور است. اما در اینجا هم نوعی وابستگی می‌تواند رخ دهد. این توابع معمولاً داده‌ها را تغییر شکل (Transform) می‌دهند، که یعنی نتیجه یک تابع می‌تواند ورودی تابع دیگری شود. اگر مراقب نباشید، ایجاد تغییر در فرمت داده‌ای که یک تابع تولید می‌کند، می‌تواند منجر به شکست در جایی پایین‌تر در جریانِ تغییر شکل (Transformational stream) شود. زبان‌هایی با سیستم‌های نوع (Type systems) خوب می‌توانند به کاهش این مشکل کمک کنند.

**پاسخ ۳ (از تمرین ۳)**
تکنولوژی پایین (Low-tech) به کمک می‌آید! چند کارتون (نقاشی ساده) با ماژیک روی وایت‌برد بکشید—یک ماشین، یک تلفن و یک خانه. لازم نیست هنرِ عالی باشد؛ طرح‌های آدم‌خطی (Stick-figure) هم خوبند. روی نواحی قابل کلیک، کاغذهای یادداشت (Post-it) بچسبانید که محتویات صفحات مقصد را توضیح می‌دهند. با پیشرفت جلسه، می‌توانید نقاشی‌ها و محل قرارگیری کاغذهای یادداشت را اصلاح کنید.

**پاسخ ۴ (از تمرین ۴)**
چون می‌خواهیم زبان را قابل گسترش کنیم، پارسر (Parser) را **جدول‌محور** (Table driven) می‌سازیم. هر ورودی در جدول شامل حرفِ فرمان، یک پرچم (Flag) برای اینکه بگوید آیا آرگومان لازم است یا نه، و نام روتینی که باید برای مدیریت آن فرمانِ خاص فراخوانی شود، می‌باشد.

```c
// lang/turtle.c
typedef struct {
    char cmd;             /* the command letter */
    int hasArg;           /* does it take an argument */
    void (*func)(int, int); /* routine to call */
} Command;

static Command cmds[] = {
    { 'P', ARG, doSelectPen },
    { 'U', NO_ARG, doPenUp },
    { 'D', NO_ARG, doPenDown },
    { 'N', ARG, doPenDir },
    { 'E', ARG, doPenDir },
    { 'S', ARG, doPenDir },
    { 'W', ARG, doPenDir }
};
```

برنامه اصلی (Main) بسیار ساده است: یک خط را بخوان، فرمان را جستجو کن، اگر لازم بود آرگومان را بگیر، سپس تابعِ هندلر (Handler) را صدا بزن.

```c
// lang/turtle.c
while (fgets(buff, sizeof(buff), stdin)) {
    Command *cmd = findCommand(*buff);
    if (cmd) {
        int arg = 0;
        if (cmd->hasArg && !getArg(buff+1, &arg)) {
            fprintf(stderr, "'%c' needs an argument\n", *buff);
            continue;
        }
        cmd->func(*buff, arg);
    }
}
```

تابعی که دنبال یک فرمان می‌گردد، یک جستجوی خطی در جدول انجام می‌دهد و یا ورودی منطبق را برمی‌گرداند یا `NULL`.

```c
// lang/turtle.c
Command *findCommand(int cmd) {
    int i;
    for (i = 0; i < ARRAY_SIZE(cmds); i++) {
        if (cmds[i].cmd == cmd)
            return cmds + i;
    }
    fprintf(stderr, "Unknown command '%c'\n", cmd);
    return 0;
}
```

در نهایت، خواندن آرگومان عددی با استفاده از `sscanf` بسیار ساده است.

```c
// lang/turtle.c
int getArg(const char *buff, int *result) {
    return sscanf(buff, "%d", result) == 1;
}
```

**پاسخ ۵ (از تمرین ۵)**
در واقع، شما قبلاً این مسئله را در تمرین قبلی حل کرده‌اید. جایی که مفسر (Interpreter) را برای زبان خارجی نوشتید، همان مفسر داخلی را در بر خواهد داشت. در مورد کد نمونه ما، این همان توابع `doXxx` هستند.

**پاسخ ۶ (از تمرین ۶)**
با استفاده از فرمت BNF، مشخصات زمان (Time specification) می‌تواند چنین باشد:

```
time  ::= hour ampm | hour : minute ampm | hour : minute
ampm  ::= am | pm
hour  ::= digit | digit digit
minute ::= digit digit
digit ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

یک تعریف بهتر برای ساعت و دقیقه، در نظر می‌گیرد که ساعت فقط می‌تواند از ۰۰ تا ۲۳ باشد، و دقیقه از ۰۰ تا ۵۹:

```
hour   ::= h-tens digit | digit
minute ::= m-tens digit
h-tens ::= 0 | 1
m-tens ::= 0 | 1 | 2 | 3 | 4 | 5
digit  ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

**پاسخ ۷ (از تمرین ۷)**
این هم پارسر که با استفاده از کتابخانه جاوااسکریپت `Pegjs` نوشته شده است:

```javascript
// lang/peg_parser/time_parser.pegjs
time
  = h:hour offset:ampm { return h + offset }
  / h:hour ":" m:minute offset:ampm { return h + m + offset }
  / h:hour ":" m:minute { return h + m }

ampm
  = "am" { return 0 }
  / "pm" { return 12*60 }

hour
  = h:two_hour_digits { return h*60 }
  / h:digit { return h*60 }

minute
  = d1:[0-5] d2:[0-9] { return parseInt(d1+d2, 10); }

digit
  = digit:[0-9] { return parseInt(digit, 10); }

two_hour_digits
  = d1:[01] d2:[0-9] { return parseInt(d1+d2, 10); }
  / d1:[2] d2:[0-3] { return parseInt(d1+d2, 10); }
```

تست‌ها استفاده از آن را نشان می‌دهند:

```javascript
// lang/peg_parser/test_time_parser.js
let test = require('tape');
let time_parser = require('./time_parser.js');

// (توضیحات BNF در اینجا تکرار شده است)

const h = (val) => val*60;
const m = (val) => val;
const am = (val) => val;
const pm = (val) => val + h(12);

let tests = {
    "1am": h(1),
    "1pm": pm(h(1)),
    "2:30": h(2) + m(30),
    "14:30": pm(h(2)) + m(30),
    "2:30pm": pm(h(2)) + m(30),
}

test('time parsing', function (t) {
    for (const string in tests) {
        let result = time_parser.parse(string)
        t.equal(result, tests[string], string);
    }
    t.end()
});
```

**پاسخ ۸ (از تمرین ۸)**
این هم یک راه‌حل ممکن در روبی:

```ruby
# lang/re_parser/time_parser.rb
TIME_RE = %r{ (?
```

این هم ادامه کد و پایانِ پاسخ تمرین ۸:

```ruby
  (?<hour> \d{1,2} )      # Get the hour
  (?:                     # Optional minute part
    :
    (?<minute> \d{2} )
  )?
  \s*                     # Optional whitespace
  (?<ampm> am | pm )?     # Optional am/pm string
}xi

def parse_time(string)
  m = TIME_RE.match(string)
  return nil unless m
  hour = m[:hour].to_i
  minute = (m[:minute] || '0').to_i
  ampm = (m[:ampm] || '').downcase

  hour = hour + 12 if ampm == 'pm' && hour != 12
  hour = 0         if ampm == 'am' && hour == 12

  hour * 60 + minute
end

# Test it
puts parse_time("1am")    # => 60
puts parse_time("2:30")   # => 150
puts parse_time("2:30pm") # => 870
```
