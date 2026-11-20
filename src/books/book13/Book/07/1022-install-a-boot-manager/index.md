---
layout: layout.njk
title: "۱۰۲.۲ نصب و پیکربندی لودر بوت (GRUB)"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 7
chapterSection: "موضوع ۱۰۲: نصب و مدیریت بسته"
permalink: /books/book13/Book/07/1022-install-a-boot-manager/index.html
---
{% raw %}
# ۱۰۲.۲ نصب و پیکربندی لودر بوت (GRUB)

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> آشنایی با تنظیمات GRUB 2 در /etc/default/grub، به‌روزرسانی پیکربندی با update-grub و تعامل در صفحه بوت.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/G_FzcMZYDbg" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

**ضریب اهمیت در آزمون (Weight):** ۲

**شرح هدف آزمون:** داوطلبان باید بتوانند یک مدیر بوت (Boot Manager) را انتخاب، نصب و پیکربندی کنند.

## سرفصل‌های کلیدی دانش

* ارائه مسیرهای بوت جایگزین و گزینه‌های بوت پشتیبان
* نصب و پیکربندی یک لودر بوت مانند GRUB Legacy
* انجام تغییرات پایه پیکربندی در GRUB 2
* تعامل با لودر بوت در زمان بالا آمدن سیستم

فهرست بخشی از فایل‌ها، اصطلاحات و ابزارهای کاربردی:

* فایل‌های `menu.lst`، `grub.cfg` و `grub.conf`
* دستور `grub-install`
* دستور `grub-mkconfig`
* رکورد بوت اصلی (`MBR`)

## مروری بر فرآیند بوت

بیشتر سیستم‌ها از **BIOS** یا **UEFI** استفاده می‌کنند. در سیستم‌های BIOS، دستگاه ابتدا یک آزمایش خودکار به نام **POST** (Power-On Self-Test) انجام می‌دهد و سپس فرآیند بوت را به اولین سکتور یعنی **Master Boot Record (`MBR`)** تحویل می‌دهد که در شیار (Cylinder) ۰، سر (Head) ۰ و سکتور ۱ از اولین دیسک قرار دارد.

فضای `MBR` فقط ۵۱۲ بایت است؛ بنابراین به یک *لودر بوت هوشمند* نیاز داریم تا بتواند مدیرهای بوت بزرگ‌تر و حتی چند سیستم‌عامل مختلف را مدیریت کند. برخی از این لودرهای بوت عبارت‌اند از: `LILO`، `GRUB` و `GRUB2`.

اگر سیستم از **UEFI** استفاده کند، سخت‌افزار مراحل UEFI را دنبال می‌کند. این مراحل با یک فاز امنیتی شروع شده و تا مرحله پایانی ادامه می‌یابد؛ جایی که UEFI به دنبال یک **پارتیشن سیستمی EFI (`ESP`)** می‌گردد که در واقع یک پارتیشن `FAT32` (معمولاً اولین پارتیشن، هرچند به پیاده‌سازی بستگی دارد) حاوی فایل‌های اجرایی PE است و آن‌ها را اجرا می‌کند.

در هر دو حالت، فایل اجرایی پیدا شده لودر بوت را استارت می‌زند. این می‌تواند یک بوت‌لودر کامل در مسیر `/boot/efi/` کامپیوتر شما باشد، یا یک لودر کوچک برای فراخوانی GRUB اصلی روی MBR، یا لودر ویندوز، یا حتی یک زنجیره بارگذاری (**Chainloader**).

> **نکته:** **Chain Loading** زمانی اتفاق می‌افتد که یک لودر بوت، لودر بوت دیگری را بارگذاری می‌کند. این روش معمولاً وقتی استفاده می‌شود که لودر بوت لینوکس بخواهد یک سیستم‌عامل ویندوز را بالا بیاورد.

## آشنایی با GRUB

ابزار **GRUB** (**GR**and **U**nified **B**ootloader) جایگزین لودر قدیمی‌تر یعنی `LILO` شد. نسخه اول (۱) آن با نام **GRUB Legacy** در سال ۱۹۹۹ شروع شد و نسخه دوم (۲) آن در سال ۲۰۰۵ به عنوان یک بازنویسی کامل از نسخه ۱ آغاز به کار کرد.

گراب یک سیستم منومحور است که در آن می‌توانید انتخاب کنید کدام هسته (Kernel) یا زنجیره بوت (chainloader) اجرا شود. همچنین امکان ویرایش منوها به صورت لحظه‌ای یا دادن دستورات مستقیم از طریق خط فرمان گراب نیز وجود دارد.

### نسخه قدیمی (GRUB Legacy)

معمولاً GRUB نسخه ۱ (در واقع نسخه ۰.۹) در مسیر `/boot/grub` نصب می‌شود. فایل پیکربندی اصلی آن `/boot/grub/menu.lst` است، اما برخی توزیع‌ها (از جمله توزیع‌های مبتنی بر RedHat) آن را به `/boot/grub/grub.conf` لینک می‌کنند.

یک نمونه فایل `menu.lst` / `grub.conf` برای GRUB Legacy شامل دو بخش است. بخش اول تنظیمات سراسری (Global) را در بر می‌گیرد و بخش دوم گزینه‌های مختلف هسته/`initramfs` یا chainloader را تعریف می‌کند.

تنظیمات سراسری عبارت‌اند از:

| تنظیم | توضیحات |
| :--- | :--- |
| `#` | کامنت (توضیح؛ نادیده گرفته می‌شود) |
| `color` | رنگ متن و پس‌زمینه برای گزینه‌های عادی و فعال |
| `default` | تعیین گزینه پیش‌فرض در منوی بوت |
| `fallback` | در صورت شکست گزینه `default`، کدام گزینه اجرا شود |
| `hiddenmenu` | مخفی کردن نمایش منوی گزینه‌ها |
| `splashimage` | نمایش یک تصویر در پس‌زمینه منو |
| `timeout` | مدت زمان انتظار (به ثانیه) پیش از اجرای گزینه پیش‌فرض |
| `password` | امنیت مهم است! قبل از ویرایش یا بوت، این رمز عبور را می‌پرسد |
| `savedefault` | به خاطر سپردن آخرین گزینه‌ای که بوت شده است |

در بخش دوم فایل پیکربندی، این گزینه‌ها را داریم:

| تنظیم | توضیحات |
| :--- | :--- |
| `title` | نام نمایشی هر گزینه در منو را تعریف می‌کند |
| `root` | دیسک و پارتیشنی که دایرکتوری `/boot` در آن قرار دارد؛ به فرم `(hddrive, partition)`، مثلاً `(hd0, 0)` یا `(hd0, msdos0)` |
| `kernel` | نام فایل ایمیج هسته (Kernel) در `/boot` و پارامترهای آن |
| `initrd` | فایل `initramfs` در `/boot` |
| `rootnoverify` | تعریف یک پارتیشن ریشه غیرلینوکسی (بدون تلاش گراب برای مانت کردن آن) |
| `chainloader` | ارجاع به فایل یا سکتوری که به عنوان لودر مرحله ۱ عمل کند (مثلاً برای بوت ویندوز) |

در ادامه یک نمونه واقعی از فایل پیکربندی GRUB Legacy را می‌بینید:

```text
# grub.conf generated by anaconda
#
# Note that you do not have to rerun grub after making changes to this file
# NOTICE:  You do not have a /boot partition.  This means that
#          all kernel and initrd paths are relative to /, eg.
#          root (hd0,5)
#          kernel /boot/vmlinuz-version ro root=/dev/sda6
#          initrd /boot/initrd-version.img
#boot=/dev/sda6
default=1
timeout=10
splashimage=(hd0,5)/boot/grub/splash.xpm.gz
#hiddenmenu
password --md5 $1$RW1VW/$4XGAklxB7/GJk0uO47Srx1
title Upgrade to Fedora 11 (Leonidas)
    kernel /boot/upgrade/vmlinuz preupgrade \
      repo=hd::/var/cache/yum/preupgrade stage2=\
      hd:UUID=8b4c62e7-2022-4288-8995-5eda92cd149b:/boot/upgrade/install.img \
      ks=hd:UUID=8b4c62e7-2022-4288-8995-5eda92cd149b:/boot/upgrade/ks.cfg
    initrd /boot/upgrade/initrd.img
title Fedora (2.6.26.8-57.fc8)
    root (hd0,5)
    kernel /boot/vmlinuz-2.6.26.8-57.fc8 ro root=LABEL=FEDORA8 rhgb quiet
    initrd /boot/initrd-2.6.26.8-57.fc8.img
title Fedora (2.6.26.6-49.fc8)
    root (hd0,5)
    kernel /boot/vmlinuz-2.6.26.6-49.fc8 ro root=LABEL=FEDORA8 rhgb quiet
    initrd /boot/initrd-2.6.26.6-49.fc8.img
title GRUB Menu
    rootnoverify (hd0,1)
    chainloader +1
title Windows
    rootnoverify (hd0,0)
    chainloader +1
```

#### دستورات GRUB Legacy

پس از ساختن تنظیمات، باید گراب را روی MBR یک دیسک نصب کنید. برای این کار می‌توانید از دو قالب مختلف استفاده نمایید:

```bash
# grub-install /dev/fd0
# grub-install '(fd0)'
```

دقیقاً مثل هر مدیر بوت دیگری، می‌توانید گراب را روی CD، فلاپی، MBR (مثل `/dev/sda`، `/dev/sdb` و ...) یا روی یک پارتیشن خاص (مثل `/dev/sdb2`، `/dev/sda6` و ...) نصب کنید. اما اگر آن را جایی غیر از MBR نصب کنید، باید از یک `chainloader` استفاده کنید تا چرخه بوت را به سمت آن هدایت کند.

اگر در حین بالا آمدن سیستم نیاز داشتید چیزی را تغییر دهید یا مجدداً تنظیم کنید، کافی است روی گزینه مورد نظر کلید `e` را بزنید تا وارد محیط ویرایش تعاملی شوید. پس از اتمام ویرایش، کلید **Enter** را بزنید و برای بوت شدن کلید `b` را فشار دهید.

#### تعامل با GRUB Legacy

اگر در منوی گراب کلید `c` را بزنید، وارد *خط فرمان گراب* (*GRUB Command Line* یا *GRUB shell*) می‌شوید. در آنجا می‌توانید دستوراتی مثل `root`، `kernel` و `initrd` را تایپ کرده و سیستم را با دستور `boot` بالا بیاورید، یا با فشردن کلید `Esc` به منوی اصلی برگردید.

### نسخه مدرن (GRUB2)

این پرکاربردترین لودر بوت در سیستم‌های امروزی است. در سیستم‌های BIOS در مسیر `/boot/grub/` یا `/boot/grub2/` نصب می‌شود و در سیستم‌های UEFI در مسیر `/boot/efi/EFI/distro-name/` (مثلاً `/boot/efi/EFI/fedora/`) قرار می‌گیرد. فایل پیکربندی GRUB2 نیز `grub.cfg` نام دارد.

در ادامه یک فایل `grub.cfg` ساده‌شده را می‌بینید:

```text
set default="0"
menuentry "Fedora" { 
  set root=(hd0,1)
  linux /boot/vmlinuz-5.10.0-9-arm64 ro quiet
  initrd /boot/initrd.img-5.10.0-9-arm64
}
menuentry "Windows" {
  chainloader (hd1,msdos2)+1
}
```

همان‌طور که می‌بینید، GRUB2 برای پارتیشن‌ها از شماره‌گذاری به سبک لینوکس (شروع از ۱ به جای ۰ در نسخه Legacy) استفاده می‌کند؛ پس اولین پارتیشن روی اولین هارد دیسک به صورت `(hd0,1)`، یا برای پارتیشن‌های DOS به شکل `(hd0,msdos1)` و برای درایوهای GPT به شکل `(hd0,gpt1)` نمایش داده می‌شود.

در جدول زیر برخی از گزینه‌های مهم در `grub.cfg` آمده است:

| گزینه | توضیحات |
| :--- | :--- |
| `menuentry` | یک گزینه جدید در منوی بوت تعریف می‌کند |
| `set root` | پارتیشن ریشه‌ای که دایرکتوری `/boot` در آن قرار دارد را مشخص می‌کند |
| `linux`, `linux16` | مسیر هسته لینوکس را در سیستم‌های BIOS مشخص می‌کند |
| `linuxefi` | مسیر هسته لینوکس را در سیستم‌های UEFI مشخص می‌کند |
| `initrd` | ایمیج `initramfs` را برای سیستم‌های BIOS مشخص می‌کند |
| `initrdefi` | ایمیج `initramfs` را برای سیستم‌های UEFI مشخص می‌کند |

و در ادامه یک نمونه واقعی از فایل `grub.cfg` را می‌بینید:

```text
#
# DO NOT EDIT THIS FILE
#
# It is automatically generated by grub-mkconfig using templates
# from /etc/grub.d and settings from /etc/default/grub
#

### BEGIN /etc/grub.d/00_header ###
if [ -s $prefix/grubenv ]; then
  set have_grubenv=true
  load_env
fi
if [ "${next_entry}" ] ; then
   set default="${next_entry}"
   set next_entry=
   save_env next_entry
   set boot_once=true
else
   set default="0"
fi

if [ x"${feature_menuentry_id}" = xy ]; then
  menuentry_id_option="--id"
else
  menuentry_id_option=""
fi

export menuentry_id_option

if [ "${prev_saved_entry}" ]; then
  set saved_entry="${prev_saved_entry}"
  save_env saved_entry
  set prev_saved_entry=
  save_env prev_saved_entry
  set boot_once=true
fi

function savedefault {
  if [ -z "${boot_once}" ]; then
    saved_entry="${chosen}"
    save_env saved_entry
  fi
}
function load_video {
  if [ x$feature_all_video_module = xy ]; then
    insmod all_video
  else
    insmod efi_gop
    insmod efi_uga
    insmod ieee1275_fb
    insmod vbe
    insmod vga
    insmod video_bochs
    insmod video_cirrus
  fi
}

if [ x$feature_default_font_path = xy ] ; then
   font=unicode
else
insmod part_gpt
insmod ext2
if [ x$feature_platform_search_hint = xy ]; then
  search --no-floppy --fs-uuid --set=root  df2d9e14-f1e9-4b1b-95d4-0167caa2461e
else
  search --no-floppy --fs-uuid --set=root df2d9e14-f1e9-4b1b-95d4-0167caa2461e
fi
    font="/usr/share/grub/unicode.pf2"
fi

if loadfont $font ; then
  set gfxmode=auto
  load_video
  insmod gfxterm
  set locale_dir=$prefix/locale
  set lang=en_US
  insmod gettext
fi
terminal_output gfxterm
if [ "${recordfail}" = 1 ] ; then
  set timeout=30
else
  if [ x$feature_timeout_style = xy ] ; then
    set timeout_style=menu
    set timeout=5
  # Fallback normal timeout code in case the timeout_style feature is
  # unavailable.
  else
    set timeout=5
  fi
fi
### END /etc/grub.d/00_header ###

### BEGIN /etc/grub.d/05_debian_theme ###
insmod part_gpt
insmod ext2
if [ x$feature_platform_search_hint = xy ]; then
  search --no-floppy --fs-uuid --set=root  df2d9e14-f1e9-4b1b-95d4-0167caa2461e
else
  search --no-floppy --fs-uuid --set=root df2d9e14-f1e9-4b1b-95d4-0167caa2461e
fi
insmod png
if background_image /usr/share/desktop-base/homeworld-theme/grub/grub-4x3.png; then
  set color_normal=white/black
  set color_highlight=black/white
else
  set menu_color_normal=cyan/blue
  set menu_color_highlight=white/blue
fi
### END /etc/grub.d/05_debian_theme ###

### BEGIN /etc/grub.d/10_linux ###
function gfxmode {
	set gfxpayload="${1}"
}
set linux_gfx_mode=
export linux_gfx_mode
menuentry 'Debian GNU/Linux' --class debian --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-simple-df2d9e14-f1e9-4b1b-95d4-0167caa2461e' {
	load_video
	insmod gzio
	if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
	insmod part_gpt
	insmod ext2
	if [ x$feature_platform_search_hint = xy ]; then
	  search --no-floppy --fs-uuid --set=root  df2d9e14-f1e9-4b1b-95d4-0167caa2461e
	else
	  search --no-floppy --fs-uuid --set=root df2d9e14-f1e9-4b1b-95d4-0167caa2461e
	fi
	echo	'Loading Linux 5.10.0-9-arm64 ...'
	linux	/boot/vmlinuz-5.10.0-9-arm64 root=UUID=df2d9e14-f1e9-4b1b-95d4-0167caa2461e ro  quiet
	echo	'Loading initial ramdisk ...'
	initrd	/boot/initrd.img-5.10.0-9-arm64
}
submenu 'Advanced options for Debian GNU/Linux' $menuentry_id_option 'gnulinux-advanced-df2d9e14-f1e9-4b1b-95d4-0167caa2461e' {
	menuentry 'Debian GNU/Linux, with Linux 5.10.0-9-arm64' --class debian --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.10.0-9-arm64-advanced-df2d9e14-f1e9-4b1b-95d4-0167caa2461e' {
		load_video
		insmod gzio
		if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
		insmod part_gpt
		insmod ext2
		if [ x$feature_platform_search_hint = xy ]; then
		  search --no-floppy --fs-uuid --set=root  df2d9e14-f1e9-4b1b-95d4-0167caa2461e
		else
		  search --no-floppy --fs-uuid --set=root df2d9e14-f1e9-4b1b-95d4-0167caa2461e
		fi
		echo	'Loading Linux 5.10.0-9-arm64 ...'
		linux	/boot/vmlinuz-5.10.0-9-arm64 root=(hd0,1) ro  quiet
		echo	'Loading initial ramdisk ...'
		initrd	/boot/initrd.img-5.10.0-9-arm64
	}
	menuentry 'Debian GNU/Linux, with Linux 5.10.0-8-arm64 (recovery mode)' --class debian --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-5.10.0-8-arm64-recovery-df2d9e14-f1e9-4b1b-95d4-0167caa2461e' {
		load_video
		insmod gzio
		if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
		insmod part_gpt
		insmod ext2
		if [ x$feature_platform_search_hint = xy ]; then
		  search --no-floppy --fs-uuid --set=root  df2d9e14-f1e9-4b1b-95d4-0167caa2461e
		else
		  search --no-floppy --fs-uuid --set=root df2d9e14-f1e9-4b1b-95d4-0167caa2461e
		fi
		echo	'Loading Linux 5.10.0-8-arm64 ...'
		linux	/boot/vmlinuz-5.10.0-8-arm64 root=UUID=df2d9e14-f1e9-4b1b-95d4-0167caa2461e ro single 
		echo	'Loading initial ramdisk ...'
		initrd	/boot/initrd.img-5.10.0-8-arm64
	}
}

### END /etc/grub.d/10_linux ###

### BEGIN /etc/grub.d/20_linux_xen ###

### END /etc/grub.d/20_linux_xen ###

### BEGIN /etc/grub.d/30_os-prober ###
### END /etc/grub.d/30_os-prober ###

### BEGIN /etc/grub.d/30_uefi-firmware ###
menuentry 'System setup' $menuentry_id_option 'uefi-firmware' {
	fwsetup
}
### END /etc/grub.d/30_uefi-firmware ###

### BEGIN /etc/grub.d/40_custom ###
# This file provides an easy way to add custom menu entries.  Simply type the
# menu entries you want to add after this comment.  Be careful not to change
# the 'exec tail' line above.
### END /etc/grub.d/40_custom ###

### BEGIN /etc/grub.d/41_custom ###
if [ -f  ${config_directory}/custom.cfg ]; then
  source ${config_directory}/custom.cfg
elif [ -z "${config_directory}" -a -f  $prefix/custom.cfg ]; then
  source $prefix/custom.cfg;
fi
### END /etc/grub.d/41_custom ###
```

#### دستورات GRUB2

نصب گراب با دستور `grub-install /dev/sda` انجام می‌شود و بعد از تغییر فایل‌های پیکربندی، باید دستور `grub2-mkconfig` یا `grub-mkconfig` را اجرا کنید. این دستور فایل‌های تنظیمات را از `/etc/grub.d/` و `/etc/default/grub` می‌خواند و بر اساس آن‌ها فایل `grub.cfg` را تولید می‌کند. نحوه اجرای آن به این شکل است:

```bash
grub2-mkconfig > /boot/grub2/grub.cfg
```

یا:

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

همچنین دستوری به نام `update-grub` وجود دارد که یک واسط ساده‌تر برای `grub-mkconfig` است و در واقع دستور `grub-mkconfig -o /boot/grub/grub.cfg` را اجرا می‌کند.

> **نکته:** توجه داشته باشید که در برخی توزیع‌های امروزی، به دلایل سازگاری هم دستورات `grub` و هم `grub2` موجود هستند و یکی به دیگری لینک شده است.

#### تعامل با GRUB2

اگر در منوی گراب کلید `c` را بزنید، وارد *خط فرمان گراب* (*GRUB Command Line* یا *GRUB shell*) می‌شوید. در آنجا می‌توانید دستوراتی مثل `root`، `kernel` (یا `linux`) و `initrd` را وارد کرده و سیستم را با `boot` بالا بیاورید، یا با کلید `Esc` به منوی بوت برگردید.

### پارامترهای بوت کرنل (Kernel Boot Parameters)

در تنظیمات بالا دیدید که یک‌سری پارامترها را به این شکل به هسته ارسال کردیم:

```text
        linux   /boot/vmlinuz-5.10.0-9-arm64 root=/dev/sda1 ro  quiet
```

این خط به کرنل می‌گوید در حالت **فقط‌خواندنی (`ro`)** بالا بیاید و لاگ‌های زیادی را در حین بوت نمایش ندهد (`quiet`).

در جدول زیر برخی از پارامترهای پرکاربرد دیگری که می‌توانید استفاده کنید آمده است:

| پارامتر | توضیحات |
| :--- | :--- |
| `console=` | تعیین کنسول خروجی سیستم |
| `debug` | راه‌اندازی سیستم در حالت دیباگ و نمایش جزئیات بیشتر |
| `init=` | اجرای یک برنامه مشخص به جای برنامه پیش‌فرض `init` |
| `initrd=` | استفاده از این فایل `initrd` مشخص |
| `ro` | مانت کردن فایل‌سیستم ریشه به صورت فقط‌خواندنی (Read-only) |
| `rw` | مانت کردن فایل‌سیستم ریشه با دسترسی خواندن و نوشتن (Read-write) |
| `root=` | تعیین این مسیر یا دیسک به عنوان فایل‌سیستم ریشه |
| `selinux` | غیرفعال کردن `selinux` در زمان بوت |
| `single`, `S`, `1`, `Single` | بوت در حالت تک‌کاربره (Single-user) برای عیب‌یابی (مربوط به SysV) |
| `systemd.unit=` | بوت سیستم مستقیماً در این تارگت `systemd` مشخص |

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1022_install_a_boot_manager.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
