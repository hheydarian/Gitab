---
layout: layout.njk
title: "۱۰۳.۸ ویرایش سریع فایل‌ها با ویرایشگر Vi"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 19
chapterSection: "موضوع ۱۰۳: دستورات گنو و یونیکس"
permalink: /books/book13/Book/19/1038-perform-basic-file-editing-operations-using-vi/index.html
---
{% raw %}
# ۱۰۳.۸ ویرایش سریع فایل‌ها با ویرایشگر Vi

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> حالت‌های Normal، Insert و Command در vi، ذخیره، خروج، جستجو و جایگزینی.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/7S5RaX1OsTE" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۳

داوطلبان باید بتوانند فایل‌های متنی را با استفاده از ویرایشگر `vi` ویرایش کنند. این هدف شامل پیمایش در متن، شناخت حالت‌های (Modes) ویرایشگر `vi`، درج، ویرایش، حذف، کپی و جستجوی متن است. همچنین آشنایی با سایر ویرایشگرهای رایج و تنظیم ویرایشگر پیش‌فرض سیستم را نیز در بر می‌گیرد.

### اهداف و دستورات کلیدی

* پیمایش در یک سند متنی با استفاده از `vi`
* درک و استفاده از حالت‌های مختلف `vi`
* درج، ویرایش، حذف، کپی و پیدا کردن متن در `vi`
* آشنایی با ویرایشگرهای Emacs، nano و vim
* پیکربندی ویرایشگر استاندارد سیستم

فهرست کلیدها، دستورات و متغیرهای مرتبط:

<div dir="ltr">

* `vi`
* `/` و `?`
* `h`, `j`, `k`, `l`
* `i`, `o`, `a`
* `d`, `p`, `y`, `dd`, `yy`
* `ZZ`, `:w!`, `:q!`
* `EDITOR`

</div>

### مقدمه

مثل هر ابزار دیگری، وقتی نوبت به ویرایشگرهای متن می‌رسد طیف گسترده‌ای از انتخاب‌ها پیش رو داریم. یکی از رایج‌ترین و فوق‌العاده قدرتمندترین گزینه‌ها، ویرایشگر `vi` است. این ابزار به صورت پیش‌فرض روی تمام توزیع‌های اصلی لینوکس نصب است و خیالتان راحت خواهد بود که با بلد بودنش می‌توانید در هر محیطی فایل‌هایتان را ویرایش کنید؛ چه روی یک سرور از راه دور از طریق SSH، چه در محیط برنامه‌نویسی روی دسکتاپ، و چه روی یک دستگاه CyberDeck با کیبورد کوچک و مینیمال. تنها نقطه ضعفش شاید شیب یادگیری نسبتاً کُند آن در ابتدا باشد، اما مطمئنم بعد از یک جلسه یک‌ساعته کار با آن، قلقش دستتان می‌آید و راه خودتان را در `vi` پیدا می‌کنید.

یک نسخه ارتقایافته (Improved) از `vi` هم وجود دارد که به آن **VIMproved** یا `vim` می‌گویند. گاهی اوقات روی سیستم خود `vim` را پیدا می‌کنید و گاهی هم دستور `vi` به عنوان یک نام مستعار (Alias) یا لینک به `vim` اشاره می‌کند. بیایید این موضوع را روی سیستم خودمان (اوبونتو ۲۲.۰۴) بررسی کنیم:

```text
jadi@funlife:~$ whatis vi
vi (1)               - Vi IMproved, a programmer's text editor
jadi@funlife:~$ whereis vi
vi: /usr/bin/vi /usr/share/man/man1/vi.1.gz
jadi@funlife:~$ whatis vim
vim (1)              - Vi IMproved, a programmer's text editor
jadi@funlife:~$ whereis vim
vim: /usr/bin/vim /etc/vim /usr/share/vim /usr/share/man/man1/vim.1.gz
jadi@funlife:~$ vi --version
VIM - Vi IMproved 9.0 (2022 Jun 28, compiled Aug 23 2022 20:18:58)
Included patches: 1-242
Modified by team+vim@tracker.debian.org
Compiled by team+vim@tracker.debian.org
Huge version without GUI.  Features included (+) or not (-):
+acl               +file_in_path      +mouse_urxvt       -tag_any_white
+arabic            +find_in_path      +mouse_xterm       -tcl
+autocmd           +float             +multi_byte        +termguicolors
+autochdir         +folding           +multi_lang        +terminal
-autoservername    -footer            -mzscheme          +terminfo
-balloon_eval      +fork()            +netbeans_intg     +termresponse
+balloon_eval_term +gettext           +num64             +textobjects
-browse            -hangul_input      +packages          +textprop
++builtin_terms    +iconv             +path_extra        +timers
+byte_offset       +insert_expand     -perl              +title
+channel           +ipv6              +persistent_undo   -toolbar
+cindent           +job               +popupwin          +user_commands
-clientserver      +jumplist          +postscript        +vartabs
-clipboard         +keymap            +printer           +vertsplit
+cmdline_compl     +lambda            +profile           +vim9script
+cmdline_hist      +langmap           -python            +viminfo
+cmdline_info      +libcall           +python3           +virtualedit
+comments          +linebreak         +quickfix          +visual
+conceal           +lispindent        +reltime           +visualextra
+cryptv            +listcmds          +rightleft         +vreplace
+cscope            +localmap          -ruby              +wildignore
+cursorbind        -lua               +scrollbind        +wildmenu
+cursorshape       +menu              +signs             +windows
+dialog_con        +mksession         +smartindent       +writebackup
+diff              +modify_fname      +sodium            -X11
+digraphs          +mouse             -sound             -xfontset
-dnd               -mouseshape        +spell             -xim
-ebcdic            +mouse_dec         +startuptime       -xpm
+emacs_tags        +mouse_gpm         +statusline        -xsmp
+eval              -mouse_jsbterm     -sun_workshop      -xterm_clipboard
+ex_extra          +mouse_netterm     +syntax            -xterm_save
+extra_search      +mouse_sgr         +tag_binary        
-farsi             -mouse_sysmouse    -tag_old_static    
   system vimrc file: "/etc/vim/vimrc"
     user vimrc file: "$HOME/.vimrc"
 2nd user vimrc file: "~/.vim/vimrc"
      user exrc file: "$HOME/.exrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
  fall-back for $VIM: "/usr/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H -Wdate-time -g -O2 -ffile-prefix-map=/build/vim-Oy69Mt/vim-9.0.0242=. -flto=auto -ffat-lto-objects -flto=auto -ffat-lto-objects -fstack-protector-strong -Wformat -Werror=format-security -DSYS_VIMRC_FILE=\"/etc/vim/vimrc\" -DSYS_GVIMRC_FILE=\"/etc/vim/gvimrc\" -D_REENTRANT -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1 
Linking: gcc -Wl,-Bsymbolic-functions -flto=auto -ffat-lto-objects -flto=auto -Wl,-z,relro -Wl,-z,now -Wl,--as-needed -o vim -lm -ltinfo -lselinux -lsodium -lacl -lattr -lgpm -L/usr/lib/python3.10/config-3.10-x86_64-linux-gnu -lpython3.10 -lcrypt -ldl -lm -lm 
```

برای ویرایش یک فایل با `vi`، کافی است نام فایل را به آن بدهید:

```text
$ vi file.txt
```

### حالت‌های کاری در vi

ویرایشگر `vi` در دو حالت اصلی (و یک حالت دستوری با دونقطه) کار می‌کند:

1. **حالت فرمان (Command / Normal mode):** حالتی است که در آن درون فایل جابه‌جا می‌شوید، جستجو می‌کنید، متن را پاک می‌کنید، کپی و پیست انجام می‌دهید، جایگزینی می‌کنید و به `vi` دستور می‌دهید. بعضی دستورها با `:` شروع می‌شوند و بعضی دیگر فقط با فشردن یک کلید اجرا می‌شوند.
2. **حالت درج (Insert mode):** حالتی است که هر چه تایپ کنید، مستقیماً در محل مکان‌نما (Cursor) درون فایل نوشته می‌شود.

> **نکته:** برای رفتن به حالت فرمان، کلید `ESC` را بزنید. برای برگشتن به حالت درج می‌توانید از کلیدهای مختلفی استفاده کنید که رایج‌ترین آن‌ها فشردن کلید `i` است.

### جابه‌جا کردن مکان‌نما

برای حرکت در یک فایل متنی در حالت فرمان، از این کلیدها استفاده کنید:

| کلید | عملکرد |
| :---: | :--- |
| `h` | یک کاراکتر به چپ (فقط در خط جاری) |
| `j` | یک خط به پایین |
| `k` | یک خط به بالا |
| `l` | یک کاراکتر به راست (فقط در خط جاری) |
| `w` | پرش به ابتدای کلمه بعدی در خط جاری |
| `e` | پرش به انتهای کلمه بعدی در خط جاری |
| `b` | پرش به ابتدای کلمه قبلی در خط جاری |
| `Ctrl-f` | اسکرول یک صفحه به جلو |
| `Ctrl-b` | اسکرول یک صفحه به عقب |

> **نکته:** تایپ کردن یک عدد قبل از بیشتر دستورها باعث می‌شود آن دستور به همان تعداد تکرار شود (مثلاً `6h` مکان‌نما را ۶ کاراکتر به چپ می‌برد).

#### پرش‌های سریع در صفحه و فایل

| کلید | عملکرد |
| :---: | :--- |
| `G` | بدون عدد به انتهای فایل می‌پرد و مثلاً `10G` به خط ۱۰ می‌رود |
| `H` | مثلاً `5H` به پنجمین خط از بالای صفحه نمایش می‌رود |
| `L` | مثلاً `3L` مکان‌نما را به سومین خط مانده به انتهای صفحه نمایش می‌برد |

### ویرایش متن

این دستورها در حالت **Command mode** به شما کمک می‌کنند متن را وارد، ویرایش، جایگزین و حذف کنید:

| کلید | عملکرد |
| :---: | :--- |
| `i` | ورود به حالت درج (Insert mode) در محل فعلی |
| `a` | ورود به حالت درج بعد از موقعیت فعلی مکان‌نما |
| `r` | جایگزین کردن فقط یک کاراکتر |
| `o` | باز کردن یک خط جدید در پایین مکان‌نما و ورود به حالت درج |
| `O` | باز کردن یک خط جدید در بالای مکان‌نما و ورود به حالت درج |
| `c` | پاک کردن تا یک موقعیت مشخص و ورود به حالت درج برای جایگزینی (مثلاً `cw` کلمه فعلی را پاک کرده و وارد حالت درج می‌شود) |
| `d` | حذف (Delete)؛ می‌توانید با `w` ترکیبش کنید (`dw`) تا یک کلمه را پاک کند. مثل `cw` عمل می‌کند اما وارد حالت درج نمی‌شود |
| `dd` | حذف کل خط جاری |
| `x` | حذف کاراکتر زیر مکان‌نما |
| `p` | چسباندن (Paste) آخرین متن حذف‌شده یا کپی‌شده بعد از مکان‌نما |
| `P` | چسباندن آخرین متن حذف‌شده یا کپی‌شده قبل از مکان‌نما |
| `xp` | جای کاراکتر زیر مکان‌نما را با کاراکتر سمت راستش عوض می‌کند |

### جستجو

| کلید | عملکرد |
| :---: | :--- |
| `/` | جستجو به سمت جلو (مثلاً `/happiness` کلمه `happiness` بعدی را پیدا می‌کند) |
| `?` | جستجو به سمت عقب |
| `n` | تکرار جستجوی قبلی (همچنین می‌توانید از `/` و `?` بدون پارامتر هم استفاده کنید) |

> **نکته:** وقتی جستجو به انتهای فایل برسد، دوباره از ابتدای فایل ادامه پیدا می‌کند (Wrap around).

### خروج از vi

همیشه صحنه خنده‌داری است وقتی می‌بینید کسی وارد `vi` شده و نمی‌داند چطور از آن خارج شود! این دستورها را یاد بگیرید تا سوژه خنده نشوید:

| کلید | عملکرد |
| :---: | :--- |
| `:q!` | خروج بدون ذخیره کردن = فرار از مهلکه بعد از خرابکاری |
| `:w!` | نوشتن فایل روی دیسک (چه تغییر کرده باشد چه نه)؛ تلاش برای بازنویسی روی فایل‌های موجود یا فایل‌های فقط‌خواندنی |
| `:w myfile.txt` | ذخیره با یک نام جدید |
| `ZZ` | ذخیره فایل (در صورت تغییر) و خروج |
| `:e!` | بارگذاری مجدد فایل از روی دیسک (نادیده گرفتن تغییرات فعلی) |
| `:!` | اجرای یک دستور شل (Shell) |

وارد کردن دونقطه (`:`) در حالت فرمان، مکان‌نما را به پایین صفحه می‌برد و `vi` منتظر دستور شما می‌ماند. با زدن `ESC` دوباره به حالت فرمان عادی برمی‌گردید.

> **نکته:** علامت تعجب (`!`) در بیشتر دستورها به این معنی است که «می‌دانم دارم چه کار می‌کنم»؛ یعنی اگر دسترسی لازم را داشته باشید روی فایل‌های فقط‌خواندنی هم می‌نویسد و بدون پرسیدن سوال خارج می‌شود.

> **نکته:** می‌توانید دستورها را با هم ترکیب کنید؛ مثلاً `:w` و `:q` را ترکیب کنید و فقط بنویسید `:wq` (ذخیره و خروج).

### راهنما (help)

همیشه می‌توانید با `:help` یا `:help subject` درخواست راهنما کنید. با این کار `vi` یک فایل متنی راهنما را باز می‌کند که می‌توانید مثل هر متن دیگری در آن جستجو و حرکت کنید. برای بستن صفحه راهنما دستور `:q` را بزنید.

## سایر ویرایشگرها

در صورت تمایل می‌توانید از ویرایشگرهای دیگر هم استفاده کنید. یک گزینه ساده و بسیار پرکاربرد `nano` است و گزینه‌های دیگر عبارت‌اند از `micro`، `emacs` (بسیار کامل و پرقدرت) و `neovim` (نسخه به‌روزشده‌ای از vim).

## ویرایشگر پیش‌فرض

ویرایشگر پیش‌فرض در `bash` از طریق متغیر محیطی `EDITOR` تنظیم می‌شود. می‌توانید آن را به این شکل تغییر دهید:

```bash
$ export EDITOR='vim'
```

یا این خط را به فایل `.bashrc` اضافه کنید تا دائمی شود. در فصل‌های بعدی این موضوع را با جزئیات بیشتری بررسی خواهیم کرد.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1038_perform_basic_file_editing_operations_using_vi.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
