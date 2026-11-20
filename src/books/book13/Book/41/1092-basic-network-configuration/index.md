---
layout: layout.njk
title: "۱۰۹.۲ پیکربندی پایدار و تنظیمات کارت شبکه"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 41
chapterSection: "موضوع ۱۰۹: اصول شبکه"
permalink: /books/book13/Book/41/1092-basic-network-configuration/index.html
---
{% raw %}
# ۱۰۹.۲ پیکربندی پایدار و تنظیمات کارت شبکه

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> ابزارهای ip، ifconfig، فایل‌های /etc/network/interfaces یا NetworkManager (nmcli) و تنظیم Gateway.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/YN8sJuy9df8?si=BEs4RmfvW1zdSUA4" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۴_

داوطلبان باید بتوانند تنظیمات پیکربندی شبکه را روی میزبان‌های کلاینت مشاهده، تغییر و راستی‌آزمایی کنند.

### حوزه‌های کلیدی دانش

* درک پیکربندی پایه میزبان‌های `TCP/IP`
* پیکربندی شبکه اترنت و وای‌فای با استفاده از `NetworkManager`
* آشنایی با `systemd-networkd`

### اصطلاحات و ابزارها

<div dir="ltr">

* `/etc/hostname`
* `/etc/hosts`
* `/etc/nsswitch.conf`
* `/etc/resolv.conf`
* `nmcli`
* `hostnamectl`
* `ifup`
* `ifdown`

</div>

### مقدمه

همانطور که در بخش قبلی دیدیم، هر کامپیوتر، سرور، لپ‌تاپ، گوشی و غیره برای اینکه در شبکه به‌درستی کار کند، باید یک پیکربندی IP (شامل آدرس IP، ماسک شبکه، درگاه پیش‌فرض یا Default Gateway، سرور DNS و...) داشته باشد. این کار را می‌توان به روش‌های مختلفی انجام داد. بعضی دستگاه‌ها مثل لپ‌تاپ‌ها مدام شبکه‌شان را تغییر می‌دهند و باید بتوانند خودشان را با تغییرات هماهنگ کنند. برخی سرورها هم تمام عمرشان در یک مکان (هم از نظر فیزیکی و هم از نظر شبکه‌ای) باقی می‌مانند و باید این تنظیمات را پس از ری‌استارت، قطعی برق، ارتقا و تغییرات سخت‌افزاری به‌صورت پایدار حفظ کنند.

در این بخش می‌بینیم که این کار در سیستم‌های مدرن گنو/لینوکس چگونه انجام می‌شود.

### رابط شبکه (Network Interface)

کارت شبکه یا **NIC** (مخفف `Network Interface Card`) سخت‌افزار فیزیکی شبکه در کامپیوتر شماست. این قطعه می‌تواند تراشه + آنتن داخل موبایل شما یا یک کارت اترنت متصل به کابل شبکه در کامپیوتر شخصی‌تان باشد.

در سیستم‌های قدیمی‌تر، این کارت‌ها نام‌هایی مثل `eth0`، `eth1`، `eth2` و... داشتند که شماره‌های ۰، ۱ و ۲ توسط کرنل و عمدتاً بر اساس ترتیب بارگذاری درایورها تعیین می‌شدند. در ماشین‌های لینوکسی امروزی، رابط‌های شبکه با نام‌هایی مثل `wlan0`، `eno1`، `ens1`، `enp3s2` و مانند آن نام‌گذاری می‌شوند. این نام‌گذاری بر اساس اطلاعات دقیق‌تری مثل بی‌سیم (`wl`) یا اترنت (`en`) بودن، اسلات `PCI` (`ens`) یا باس سخت‌افزاری (`enp`) انجام می‌شود.

دستور `ip` می‌تواند این رابط‌ها را نمایش دهد:

```bash
➜  ~ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: wlp108s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
    link/ether 00:bb:60:97:6b:07 brd ff:ff:ff:ff:ff:ff
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default 
    link/ether 02:42:75:d3:e6:ff brd ff:ff:ff:ff:ff:ff
```

> **نکته:** رابط `lo` یک آداپتور شبکه مجازی است که به آن دستگاه **loopback** می‌گویند. این رابط همیشه وجود دارد و به «همین دستگاه یا `127.0.0.1` در اصطلاح IPv4» اشاره می‌کند.

### پیکربندی کارت‌های شبکه (NIC)

در توزیع‌های قدیمی‌تر، از دستور `ifconfig` برای بررسی یا پیکربندی تنظیمات IP روی کارت‌های شبکه استفاده می‌شد. نگاهی بیندازید:

```bash
$ ifconfig
enp0s25: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether f0:de:f1:62:c5:73  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 20  memory 0xd1500000-d1520000  

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1  (Local Loopback)
        RX packets 560719  bytes 339937974 (324.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 560719  bytes 339937974 (324.1 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.35  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::8ea9:82ff:fe7b:8906  prefixlen 64  scopeid 0x20<link>
        ether 8c:a9:82:7b:89:06  txqueuelen 1000  (Ethernet)
        RX packets 2325385  bytes 2629859900 (2.4 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2023796  bytes 510997240 (487.3 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

همچنین می‌توان از `ifconfig` برای تغییر تنظیمات شبکه هم استفاده کرد، اما باید دسترسی `root` داشته باشید:

```bash
$  sudo ifconfig enp0s25 192.168.42.42
password for jadi:
$ ifconfig enp0s25
enp0s25: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 192.168.42.42  netmask 255.255.255.0  broadcast 192.168.42.255
        ether f0:de:f1:62:c5:73  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 20  memory 0xd1500000-d1520000  

$
```

اگر بخواهید ماسک شبکه (Netmask) یک رابط را تغییر دهید، دستور `ifconfig eth0 netmask 255.255.0.0` را می‌زنید یا مثل کاری که اغلب ما انجام می‌دادیم، هر دو را در یک دستور وارد می‌کنید:

```bash
# ifconfig eth0 192.168.42.42 netmask 255.255.255.0
```

همچنین می‌توانید رابط‌های شبکه را با تنظیمات از پیش تعریف‌شده **روشن (`up`)** و **خاموش (`down`)** کنید:

```bash
$ sudo ifconfig enp0s25 down
[sudo] password for jadi:
$ ifconfig
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1  (Local Loopback)
        RX packets 562273  bytes 340257228 (324.4 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 562273  bytes 340257228 (324.4 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.35  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::8ea9:82ff:fe7b:8906  prefixlen 64  scopeid 0x20<link>
        ether 8c:a9:82:7b:89:06  txqueuelen 1000  (Ethernet)
        RX packets 2330388  bytes 2634026235 (2.4 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2027352  bytes 511549072 (487.8 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

همانطور که می‌بینید، پایین آوردن (`down`) رابط باعث شد از فهرست رابط‌های فعال حذف شود؛ با استفاده از سوئیچ `-a` می‌توانید به `ifconfig` بگویید **همه** رابط‌ها را، حتی اگر غیرفعال (`down`) باشند، نمایش دهد.

در بسیاری از سیستم‌ها دستورات `ifup` و `ifdown` هم مستقیماً برای بالا و پایین آوردن راحت رابط‌های شبکه وجود دارند. آن‌ها دقیقاً مثل `ifup eth0` کار می‌کنند.

این پیکربندی‌های از پیش تعریف‌شده در ماشین‌های مبتنی بر دبیان در `/etc/network/interfaces` و در توزیع‌های مبتنی بر RPM در مسیر `/etc/sysconfig/network-scripts/` قرار دارند.

این یک نمونه از چنین فایلی در یک توزیع مبتنی بر ردهت است:

```text
$ cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
ONBOOT=yes
TYPE=Ethernet
IPADDR=192.168.1.10
NETMASK=255.255.255.0
DNS1=4.2.2.4
```

در سیستم‌های RPM، درگاه پیش‌فرض (Default Gateway) از طریق فایل زیر پیکربندی می‌شود:

```text
cat /etc/sysconfig/network
NETWORKING=yes
HOSTNAME=lpictest
GATEWAY=192.168.1.1
```

در سیستم‌های مبتنی بر دبیان (از جمله اوبونتو)، فایل پیکربندی اصلی برای رابط‌های شبکه `/etc/network/interfaces` است. همین یک فایل تنظیمات تمام رابط‌ها را در خود دارد. نگاهی بیندازید:

```text
auto lo
iface lo inte loopback

auto eth0
#ifconfig eth0 inet dhcp
iface eth0 inet static
address 192.168.1.10
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 4.2.2.4
```

### دستور `ip`

توزیع‌های جدیدتر عمدتاً از دستور `ip` استفاده می‌کنند. این دستور می‌تواند کارهای زیادی انجام دهد؛ از جمله (و نه محدود به) نمایش و پیکربندی آدرس‌های IP، ماسک‌های شبکه، درگاه‌های پیش‌فرض و قوانین مسیریابی (Routing Rules):

```bash
ip addr add 172.19.1.10/24 dev eth2 # افزودن موقت یک آدرس IP
ip addr show eth2
ip addr del 172.19.1.10/24 dev eth2 # حذف یک آدرس IP
ip link set eth2 up # فعال کردن یک کارت شبکه
ip route show
ip route add default via 192.168.1.1 # افزودن درگاه پیش‌فرض (Default Gateway)
```

لطفاً توجه کنید که دستورات بالا تغییرات **موقتی** ایجاد می‌کنند که پس از راه‌اندازی مجدد سرویس `NetworkManager` (یا ریبوت سیستم) از بین می‌روند. اگر به تغییرات دائمی نیاز دارید، باید این کار را از طریق فایل‌های پیکربندی یا رابط‌های `NetworkManager` انجام دهید.

### سرویس `NetworkManager` و دستور `nmcli`

در سال‌های اخیر، سرویس `NetworkManager` محبوبیت بسیار زیادی پیدا کرده است. این سرویس می‌تواند وضعیت شبکه و پیکربندی‌های مختلف را «پایش» کند و کارت‌های شبکه (به‌ویژه کارت‌های وای‌فای) را بر اساس آن‌ها تنظیم نماید. همین سرویس باعث می‌شود هر وقت لپ‌تاپمان را در محدوده یک وای‌فای شناخته‌شده باز می‌کنیم خودکار وصل شود، اگر بخواهیم به شبکه جدیدی وصل شویم رمز را بپرسد، یا به محض وصل کردن کابل به کارت اترنت، آدرس IP را دریافت و تنظیم کند. این تخصیص IP ممکن است از طریق «تنظیمات ثابت IP» روی دستگاه شما یا از طریق پروتکلی به نام **DHCP** انجام شود. هنگام استفاده از **DHCP** (مخفف `Dynamic Host Configuration Protocol`)، کامپیوتر شما از یک سرور DHCP (مثلاً مودم/روتر وای‌فای خانه) آدرس IP، ماسک شبکه، درگاه پیش‌فرض، DNS و سایر موارد را می‌پرسد و آن‌ها را تنظیم می‌کند.

به صورت پیش‌فرض، دیمن `NetworkManager` شبکه‌هایی را مدیریت می‌کند که در `/etc/network/interfaces` ذکر نشده باشند. این سرویس در پس‌زمینه اجرا می‌شود و کارت‌های شبکه‌ای را که آنجا پیکربندی نشده‌اند کنترل می‌کند. برنامه‌های واسط کاربری مختلفی شامل GUI (رابط گرافیکی)، TUI (رابط متنی؛ دستور `nmtui` را امتحان کنید) یا CLI (رابط خط فرمان) برای کنترل یا پیکربندی دیمن `NetworkManager` وجود دارند. اگر از لینوکس دسکتاپی استفاده می‌کنید، احتمالاً تا الان از یکی از آن‌ها (مثل اپلت NetworkManager) استفاده کرده‌اید یا می‌شناسیدش. اینجا نحوه استفاده از `nmcli` در خط فرمان را به شما نشان می‌دهم.

ما همیشه `nmcli` را با یکی از دستورات مختلفش صدا می‌زنیم؛ این هم فهرست آن‌ها:

| دستور | کاربرد |
| :--- | :--- |
| `general` | وضعیت عمومی و عملیات `NetworkManager` |
| `networking` | کنترل کلی شبکه |
| `radio` | کلیدهای رادیویی (بی‌سیم) `NetworkManager` |
| `connection` | کنترل و مدیریت اتصالات |
| `device` | دستگاه‌های تحت کنترل `NetworkManager` |
| `agent` | عامل دریافت رمز عبور یا `polkit` |
| `monitor` | پایش تغییرات شبکه |

برای مثال، می‌توانیم وضعیت فعلی را با دستور `general` بررسی کنیم:

```bash
➜  ~ nmcli general
STATE      CONNECTIVITY  WIFI-HW  WIFI     WWAN-HW  WWAN    
connected  full          enabled  enabled  missing  enabled
```

یا اگر بخواهید دستگاه‌ها یا فهرست شبکه‌های وای‌فای را ببینید:

```bash
➜  ~ nmcli device          
DEVICE            TYPE      STATE                   CONNECTION          
wlp108s0          wifi      connected               Sharm Bar Sansoor 5 
docker0           bridge    connected (externally)  docker0             
lo                loopback  connected (externally)  lo                  
p2p-dev-wlp108s0  wifi-p2p  disconnected            --                  
➜  ~ nmcli device wifi     
IN-USE  BSSID              SSID                 MODE   CHAN  RATE        SIGNAL  BARS  SECURITY  
        6C:AD:EF:38:13:38  AxLTE                Infra  3     270 Mbit/s  84      ▂▄▆█  WPA2      
        00:E0:4C:93:1D:B8  Lanat Be Sansoorchi  Infra  6     130 Mbit/s  59      ▂▄▆_  WPA2      
*       24:F5:A2:42:DE:CE  Sharm Bar Sansoor 5  Infra  36    540 Mbit/s  47      ▂▄__  WPA2      
        30:A2:20:DD:8B:54  AvinaAmin            Infra  7     270 Mbit/s  29      ▂___  WPA1 WPA2 
        30:85:A9:8C:71:2C  bahram               Infra  11    65 Mbit/s   29      ▂___  WPA2
```

برای اتصال به یک شبکه وای‌فای کافی است این دستور را بزنید:

```bash
nmcli device wifi connect AxLTE password AFunkyPassword 
```

### نام‌های شیک برای کامپیوترها

#### نام میزبان (`hostname`)

به خاطر سپردن آدرس‌های IP برای ربات‌ها ساده است، اما برای انسان‌ها نه! به همین دلیل **hostname** داریم. نام میزبان مثل دفترچه تلفن است که فقط می‌گویید «زنگ بزن به جادی» و سیستم خودش شماره تلفن من را می‌داند. اگر فایل `/etc/hostname` را چک کنید، نام ماشین خودتان را آنجا می‌بینید. البته می‌توانید آن را به صورت موقت (یا دائمی) تغییر دهید. دستور مربوطه `hostnamectl` است:

```bash
[funlap ~]# hostnamectl set-hostname mycoolmachine
[funlap ~]# hostname
mycoolmachine
[funlap ~]# cat /etc/hostname 
mycoolmachine
[funlap ~]# bash
[mycoolmachine ~]# 
```

همچنین می‌توانید با استفاده از سوئیچ `--transient` آن را به صورت _گذرا (Transient)_ یعنی به عنوان یک تغییر موقت تنظیم کنید.

حتی می‌توانید یک نام «زیبا» (`pretty`) هم برای کامپیوترتان تعریف کنید تا سیستم‌های دیگر آن را در رابط‌های کاربری خودشان قشنگ‌تر نمایش دهند:

```bash
[mycoolmachine ~]# hostnamectl --pretty set-hostname "LAN Shared Storage"
[mycoolmachine ~]# hostnamectl status
 Static hostname: mycoolmachine
 Pretty hostname: LAN Shared Storage
       Icon name: computer-convertible
         Chassis: convertible
      Machine ID: 0b126c4b6f4347168140eaa6202ce8be
         Boot ID: 675eff37f42648c6bdea31177596557f
Operating System: Manjaro Linux                   
          Kernel: Linux 6.1.38-1-MANJARO
    Architecture: x86-64
 Hardware Vendor: Dell Inc.
  Hardware Model: Latitude 7390 2-in-1
Firmware Version: 1.30.0
```

#### فایل `/etc/hosts`

این فایل شامل فهرستی از آدرس‌های IP و نام‌های متناظر با آن‌هاست، از جمله نام‌های کامپیوتر خودتان:

```text
[mycoolmachine ~]# head -20 /etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost funlife db
255.255.255.255	broadcasthost
::1             localhost
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##

198.74.56.50 jobs.jadi.net
192.168.1.22 amoledtesting 

67.217.170.72 vps
```

بنابراین وقتی لازم است از طریق نام به ماشینی دسترسی پیدا کنید، سیستم‌عامل شما می‌داند سراغ کدام IP برود.

#### پیکربندی DNS

سرویس **DNS** (مخفف `Domain Name System`) سروری است که نام‌های دامنه خوانا برای انسان (یا به‌طور فنی‌تر، نام‌های دامنه متنی) را به آدرس‌های IP متناظرشان ترجمه می‌کند. باید کامپیوترتان را طوری پیکربندی کنید که از یک DNS استفاده کند تا اگر خواستید به `linux1st.com` سر بزنید (و شاید [حمایت مالی](https://linux1st.com/support) کنید!) بداند باید با کدام IP ارتباط بگیرد.

این تنظیمات در فایل `/etc/resolv.conf` قرار دارند:

```text
nameserver 192.168.1.1
nameserver 4.2.2.4
domain jadi.net
search jadi.net company.com
```

اینجا به کامپیوترم می‌گویم اگر لازم شد آدرسی را به IP ترجمه کند، سراغ سرور DNS داخل شبکه خانگی من (`192.168.1.1`) یا سرور DNS واقع در `4.2.2.4` برود.

تنظیم `domain` یک نام دامنه محلی تعیین می‌کند تا ماشین‌های داخل این دامنه بتوانند از نام کوتاه استفاده کنند (مثلاً `tv` به جای `tv.jadi.net`) و تنظیم `search` هم کار مشابهی انجام می‌دهد و به Resolver می‌گوید اگر قرار است `tv` را ترجمه کند، به دنبال `tv.jadi.net` و `tv.company.com` هم بگردد.

#### فایل `nsswitch.conf`

فایل `/etc/nsswitch.conf` برای پیکربندی این موضوع استفاده می‌شود که سیستم برای پیدا کردن اطلاعاتی مانند نام میزبان‌ها، فایل‌های رمز عبور و فایل‌های گروه از کدام سرویس‌ها و با چه ترتیبی استفاده کند. فایل من این شکلی است:

```text
# cat /etc/nsswitch.conf
# Begin /etc/nsswitch.conf

passwd: files
group: files
shadow: files

publickey: files

hosts: files dns myhostname
networks: files

protocols: files
services: files
ethers: files
rpc: files

netgroup: files

# End /etc/nsswitch.conf
```

بنابراین اگر کسی بخواهد رمز عبوری را چک کند، سیستم سراغ _فایل_ رمز عبور روی سیستم می‌رود. یا اگر بخواهد آدرس IP یک نام میزبان را پیدا کند، پیکربندی من می‌گوید `hosts: files dns myhostname`؛ پس کامپیوتر ابتدا فایل‌ها (`/etc/hosts`) را چک می‌کند و سپس سراغ DNS می‌رود. اگر جای این‌ها را برعکس کنم و این خط را تغییر دهم به:

```text
hosts:      dns files
```

آن‌وقت هر درخواست ترجمه نام (Resolve) ابتدا به سرور DNS فرستاده می‌شود و فایل `/etc/hosts` فقط زمانی استفاده خواهد شد که سرور DNS جواب بدهد «نمی‌شناسم!»

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1092_basic_network_configuration.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
