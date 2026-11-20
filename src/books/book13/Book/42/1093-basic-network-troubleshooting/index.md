---
layout: layout.njk
title: "۱۰۹.۳ خطایابی و عیب‌یابی ارتباطات شبکه"
bookTitle: "راهنمای آزمون LPIC-1 (ورژن ۵۰۰)"
bookId: "book13"
chapterNumber: 42
chapterSection: "موضوع ۱۰۹: اصول شبکه"
permalink: /books/book13/Book/42/1093-basic-network-troubleshooting/index.html
---
{% raw %}
# ۱۰۹.۳ خطایابی و عیب‌یابی ارتباطات شبکه

<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
  <strong>خلاصه هدف آزمون:</strong> ابزارهای تشخیص مسیر ping، traceroute، tracepath، بررسی پورت‌ها و سوکت‌ها با netstat، ss و nc.
</div>

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 24px 0; border: 1px solid var(--g-border-dim);">
  <iframe src="https://www.youtube.com/embed/sAzkN5P2-0E?si=P1r5KgfEvit_BMFW" title="ویدئوی آموزشی جادی برای این سرفصل" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen></iframe>
</div>

## 🎯 اهداف و سرفصل‌های این بخش

در این درسنامه موارد زیر را بررسی و مرور می‌کنیم:
- مفاهیم کلیدی مورد پرسش در آزمون بین‌المللی LPIC-1
- دستورات، فایل‌های پیکربندی و ابزارهای مرتبط در خط فرمان
- نکات پرتکرار آزمون‌های ۱۰۱ و ۱۰۲ همراه با نمونه‌های کاربردی

---

## 📝 متن درسنامه و توضیحات تکمیلی

_ضریب اهمیت در آزمون (Weight): ۴_

داوطلبان باید بتوانند مشکلات شبکه را روی سیستم‌های کلاینت عیب‌یابی و برطرف کنند.

### حوزه‌های دانش کلیدی

* پیکربندی دستی رابط‌های شبکه، شامل مشاهده و تغییر تنظیمات رابط‌های شبکه با استفاده از مجموعه ابزار `iproute2`.
* پیکربندی دستی مسیریابی (Routing)، شامل مشاهده و تغییر جدول‌های مسیریابی و تنظیم مسیر پیش‌فرض (Default Route) با استفاده از `iproute2`.
* عیب‌یابی مشکلات مربوط به پیکربندی شبکه.
* آشنایی با دستورات قدیمی‌تر مجموعه `net-tools`.

### اصطلاحات و ابزارها

<div dir="ltr">

* `ip`
* `hostname`
* `ss`
* `ping`
* `ping6`
* `traceroute`
* `traceroute6`
* `tracepath`
* `tracepath6`
* `netcat`
* `ifconfig`
* `netstat`
* `route`

</div>

### عیب‌یابی مشکلات شبکه

وقتی مشکلی مرتبط با شبکه به شما گزارش می‌شود، باید گام‌های متعددی بردارید تا ریشه اصلی مشکل را پیدا کنید. برای مثال، اگر گزارش می‌گوید «صفحات وب برایم باز نمی‌شود»، باید از ابتدا شروع کنید: بررسی کنید آیا رابط شبکه (Network Interface) آدرس IP دارد یا نه، آیا رابط بالا (Up) است، آیا مسیریابی (Routing) درست کار می‌کند و آیا DNS بدون مشکل عمل می‌کند؟ اگر همه این‌ها درست بود، باید با دستور `ping` رسیدن به یک سرور روی اینترنت را امتحان کنید و اگر همچنان مشکلی دیدید، با `traceroute` بررسی کنید ترافیک شما دقیقاً کجا به مشکل می‌خورد. در این درس، این گام‌های پایه را مرور می‌کنیم.

#### دستورات `ifconfig` و `ip`

همان‌طور که می‌دانید، برای بررسی آدرس IP رابط‌های شبکه می‌توانید از دستورهای `ifconfig` و `ip` استفاده کنید. یک کارت شبکه برای اینکه بتواند کار کند، به یک آدرس IP و زیرشبکه (Netmask) صحیح نیاز دارد. بیایید کامپیوتر خودم را چک کنم تا ببینم آیا آدرس IP دارد یا نه:

```text
[jadi@debian ~]$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: wlp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN group default qlen 1000
    link/ether f0:de:f1:62:c5:73 brd ff:ff:ff:ff:ff:ff
3: enp0s25: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 8c:a9:82:7b:89:06 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.35/24 brd 192.168.1.255 scope global dynamic wlp3s0
       valid_lft 254836sec preferred_lft 254836sec
    inet6 fe80::8ea9:82ff:fe7b:8906/64 scope link
       valid_lft forever preferred_lft forever
[jadi@debian ~]$ 
[jadi@debian ~]$ 
[jadi@debian ~]$ 
[jadi@debian ~]$ ifconfig
enp0s25   Link encap:Ethernet  HWaddr f0:de:f1:62:c5:73  
          inet addr:192.168.1.35  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fe80::8ea9:82ff:fe7b:8906/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:231586 errors:0 dropped:0 overruns:0 frame:0
          TX packets:200220 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:198053888 (198.0 MB)  TX bytes:51583154 (51.5 MB)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:221752 errors:0 dropped:0 overruns:0 frame:0
          TX packets:221752 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:150859909 (150.8 MB)  TX bytes:150859909 (150.8 MB)
```

هر دو دستور نشان می‌دهند که آدرس IP من مشکلی ندارد. این آدرس احتمالاً توسط مودم وای‌فای اختصاص داده شده است و داشتن `192.168.1.35` به‌عنوان IP و `255.255.255.0` به‌عنوان Netmask کاملاً منطقی به نظر می‌رسد.

> **نکته:** با دستور `man ip` می‌توانید راهنمای کامل `ip` را بخوانید، یا برای خواندن راهنمای یک بخش خاص از `man ip-address` (یا هر زیردستور دیگری) استفاده کنید.

#### دستورات `ping` و `ping6`

این ابزار رایج‌ترین وسیله هنگام عیب‌یابی مشکلات شبکه است. دستور `ping` یک بسته ICMP به سمت مقصد می‌فرستد و اگر پاسخی دریافت کند، نه‌تنها این موضوع را به شما اطلاع می‌دهد، بلکه آمار کامل آن را هم نمایش می‌دهد. در ادامه، مسیر پیش‌فرض (Default Route) خودم را چک می‌کنم و سعی می‌کنم آن را پینگ بگیرم. در حالت عادی همیشه باید بتوانید روتر پیش‌فرض خود را پینگ کنید؛ هرچند گاهی مدیران سیستم بسیار وسواسی، ترافیک ICMP را روی شبکه مسدود می‌کنند و با اینکه به شبکه متصل هستید، پاسخی دریافت نمی‌کنید.

```text
jadi@debian:~$ ip route show
default via 192.168.70.1 dev enp0s1
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.70.0/24 dev enp0s1 proto kernel scope link src 192.168.70.2
jadi@debian:~$ ping 192.168.70.1
PING 192.168.70.1 (192.168.70.1) 56(84) bytes of data.
64 bytes from 192.168.70.1: icmp_seq=1 ttl=64 time=1.11 ms
64 bytes from 192.168.70.1: icmp_seq=2 ttl=64 time=0.855 ms
^C
--- 192.168.70.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
rtt min/avg/max/mdev = 0.855/0.984/1.113/0.129 msec
```

من می‌توانم دروازه (Gateway) خودم را پینگ کنم، اما آیا می‌توانم با استفاده از آدرس IP به یک سرور روی اینترنت هم برسم؟ برای پیدا کردن پاسخ، بیایید `4.2.2.4` را پینگ کنیم؛ این یک سرور بسیار شناخته‌شده روی اینترنت است و افراد زیادی برای تست اتصال IP خود از آن استفاده می‌کنند.

```text
[jadi@debian ~]$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=50 time=108 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=50 time=111 ms
64 bytes from 4.2.2.4: icmp_seq=3 ttl=50 time=113 ms
^C
--- 4.2.2.4 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 108.160/111.233/113.717/2.338 ms
```

این هم بدون مشکل کار می‌کند. اما آیا می‌توانم `google.com` را هم پینگ کنم؟

```text
[jadi@debian ~]$ ping google.com
ping: unknown host google.com
```

آها! مشکل را پیدا کردیم. در این حالت، روی دستگاهم آدرس IP درستی دارم، می‌توانم دروازه پیش‌فرض را پینگ کنم و `4.2.2.4` را هم پینگ کنم، اما نمی‌توانم `google.com` را پینگ کنم. پیام خطا `unknown host` است. این یعنی کامپیوتر من نمی‌تواند `google.com` را به آدرس IP آن ترجمه کند؛ پس مشکل از DNS است:

```text
[jadi@debian ~]$ cat /etc/resolv.conf
# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
#     DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
```

تعجبی ندارد که در وب‌گردی مشکل داشتیم! هیچ DNS فعالی روی کامپیوتر من تنظیم نشده، بنابراین هیچ‌کس نمی‌تواند با نام دامنه به سایت‌ها دسترسی پیدا کند. این مشکل باید با اضافه کردن یک سرور DNS به فایل پیکربندی برطرف شود.

#### مشکلات مسیریابی (Routing Problems)

در بعضی شرایط نمی‌توانید به اینترنت (مثلاً `4.2.2.4` یا `8.8.8.8`) برسید، اما می‌توانید دروازه (Gateway) خود را پینگ کنید. به این خروجی نگاه کنید:

```text
[jadi@debian ~]$ ping 8.8.8.8
connect: Network is unreachable
[jadi@debian ~]$ ping 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=254 time=3.03 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=254 time=3.31 ms
^C
--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 3.039/3.174/3.310/0.146 ms
```

اینجا چه خبر است؟ بیایید ببینیم چه سرنخ‌هایی داریم:
۱) به دروازه (Gateway) دسترسی دارم.
۲) وقتی سراغ اینترنت می‌روم، کامپیوترم نمی‌داند چه کار باید بکند.
در این حالت، **دروازه پیش‌فرض (Default Gateway)** تعریف نشده است: کامپیوتر نمی‌داند اگر بسته‌ای خارج از محدوده زیرشبکه (Netmask) خودش باشد، باید چه کار کند. می‌دانید که می‌توانیم دروازه پیش‌فرض را در فایل پیکربندی `/etc/network/interfaces` تنظیم کنیم، اما دستور `route` (یا زیردستور جدیدتر `ip route`) هم وجود دارد که تنظیمات مسیریابی را به‌صورت لحظه‌ای نمایش می‌دهد و تغییر می‌دهد.

> **نکته:** مسیرهایی که با `ip route` (یا `route`) اضافه یا تغییر داده می‌شوند، پس از ریبوت از بین می‌روند! تنظیمات دائمی باید در فایل‌های پیکربندی ثبت شوند.

بیایید وضعیت فعلی مسیریابی را با دستور `ip route` بررسی کنیم:

```text
jadi@debian:~$ ip route show
default via 192.168.70.1 dev enp0s1
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.70.0/24 dev enp0s1 proto kernel scope link src 192.168.70.2

jadi@debian:~$ sudo ip route del default
[sudo] password for jadi:

jadi@debian:~$ ip route show
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.70.0/24 dev enp0s1 proto kernel scope link src 192.168.70.2

jadi@debian:~$ ping 4.2.2.4
ping: connect: Network is unreachable

jadi@debian:~$ ip route add default via 192.168.70.1
RTNETLINK answers: Operation not permitted

jadi@debian:~$ sudo ip route add default via 192.168.70.1

jadi@debian:~$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=55 time=316 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=55 time=434 ms
^C
--- 4.2.2.4 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
rtt min/avg/max/mdev = 316.253/375.282/434.311/59.029 ms
```

بعد از اضافه کردن دروازه پیش‌فرض با دستور `ip route`، توانستیم اینترنت را پینگ کنیم. مهم است بدانید که می‌توانیم مسیرهای بیشتری هم تعریف کنیم و دقیقاً کنترل کنیم بسته‌هایمان بر اساس مقصدشان از کجا بروند.

#### دستورات `tracepath` و `traceroute`

این یک ابزار عیب‌یابی پیشرفته‌تر است. کارش شبیه این است که تمام سرورهای بین شما و مقصدتان را یکی‌یکی پینگ کند تا ببینید بسته‌های شما دقیقاً کجا به مشکل می‌خورند. بیایید بررسی کنیم چطور به مقصد `4.2.2.4` می‌رسیم:

```text
jadi@debian:~$ traceroute 4.2.2.4
traceroute to 4.2.2.4 (4.2.2.4), 30 hops max, 60 byte packets
 1  192.168.70.1 (192.168.70.1)  0.619 ms *  0.673 ms
 2  10.192.0.1 (10.192.0.1)  421.898 ms  728.657 ms  728.617 ms
 3  162.221.202.253 (162.221.202.253)  728.597 ms  728.564 ms  728.552 ms
 4  * * *
 5  207.35.48.241 (207.35.48.241)  728.289 ms  728.265 ms  728.251 ms
 6  agg2-vancouverbg_5-2-0.net.bell.ca (64.230.122.250)  728.344 ms agg1-vancouverbg_5-2-0.net.bell.ca (64.230.122.248)  612.097 ms  922.055 ms
 7  * * *
 8  bx6-seattle_et-0/0/13_ae1.net.bell.ca (64.230.76.157)  921.662 ms  921.635 ms  921.566 ms
 9  ae96.edge6.Seattle1.Level3.net (4.16.2.13)  921.511 ms  921.372 ms  921.317 ms
10  * * ae6.4.edge2.SanJose1.level3.net (4.69.220.185)  920.786 ms
11  d.resolvers.level3.net (4.2.2.4)  601.295 ms  921.003 ms  920.970 ms
```

در گام اول (۱) به روتر خودم می‌رسم. در گام دوم وارد شبکه محلی ISP خودم می‌شوم و سپس به `162...` می‌رسم. همان‌طور که می‌بینید، در بعضی موارد `traceroute` توانسته یک **Reverse DNS Lookup** انجام دهد و نام میزبان (Hostname) آی‌پی‌ها را پیدا کرده و نمایش دهد. بعد از ۱۱ گام (Hop)، به مقصدم رسیدم. ابزار `traceroute` برای عیب‌یابی مشکلات شبکه و مسیریابی یا بررسی وضعیت مسیرهای شبکه بسیار کاربردی است.

> **نکته:** در بعضی روترها ترافیک پینگ مسدود شده است؛ به همین دلیل در برخی گام‌ها علامت `* * *` می‌بینید، چون آن سرورها ترافیک ICMP را مسدود می‌کنند.

دستور دیگری به نام `tracepath` نیز وجود دارد که بسیار شبیه به `traceroute` است. در سطح آزمون LPIC-1، این دو ابزار عملاً کار یکسانی انجام می‌دهند!

#### دستورات `ss` و `netstat`

این دو دستور می‌توانند طیف گسترده‌ای از اطلاعات را درباره شبکه به ما نشان دهند. دستور `ss` نسخه جدیدتر و `netstat` نسخه قدیمی‌تر است. این دو دستور در بیشتر موارد جایگزین یکدیگر هستند، کارهای مشابهی انجام می‌دهند و حتی در اکثر کاربردها سوئیچ‌های مشابهی دارند. می‌توانید از `netstat` برای بررسی جدول مسیریابی استفاده کنید:

```text
jadi@debian:~$ netstat -nr
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.70.1    0.0.0.0         UG        0 0          0 enp0s1
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
192.168.70.0    0.0.0.0         255.255.255.0   U         0 0          0 enp0s1
```

یا از `ss` استفاده کنید تا ببینید کدام پورت‌ها در حالت `LISTENING` هستند:

```text
jadi@debian:~$ ss -na | grep LISTEN | grep tcp
tcp   LISTEN 0      128                                       127.0.0.1:631              0.0.0.0:*
tcp   LISTEN 0      100                                         0.0.0.0:25               0.0.0.0:*
tcp   LISTEN 0      128                                         0.0.0.0:22               0.0.0.0:*
tcp   LISTEN 0      100                                            [::]:25                  [::]:*
tcp   LISTEN 0      128                                            [::]:22                  [::]:*
tcp   LISTEN 0      128                                           [::1]:631                 [::]:*
```

سوئیچ `-na` تمام پورت‌های باز (از جمله سوکت‌ها) را نشان می‌دهد و اینجا من فقط پورت‌های TCP را که در وضعیت `LISTEN` هستند فیلتر کرده‌ام.

> **نکته:** در این سوئیچ‌ها، `-n` مخفف _numeric_ (عددی)، `-a` مخفف _all ports_ (همه پورت‌ها) و `-r` مخفف _routes_ (مسیرها) است.

یک ترکیب بسیار پرکاربرد، مجموعه گزینه‌های `-tulpn` است:

```text
jadi@debian:~$ ss -tulpn
Netid             State              Recv-Q             Send-Q                         Local Address:Port                          Peer Address:Port            Process
udp               UNCONN             0                  0                                    0.0.0.0:68                                 0.0.0.0:*
udp               UNCONN             0                  0                                    0.0.0.0:631                                0.0.0.0:*
udp               UNCONN             0                  0                                    0.0.0.0:58120                              0.0.0.0:*
udp               UNCONN             0                  0                                    0.0.0.0:5353                               0.0.0.0:*
udp               UNCONN             0                  0                                       [::]:39822                                 [::]:*
udp               UNCONN             0                  0                                       [::]:5353                                  [::]:*
tcp               LISTEN             0                  128                                127.0.0.1:631                                0.0.0.0:*
tcp               LISTEN             0                  100                                  0.0.0.0:25                                 0.0.0.0:*
tcp               LISTEN             0                  128                                  0.0.0.0:22                                 0.0.0.0:*
tcp               LISTEN             0                  100                                     [::]:25                                    [::]:*
tcp               LISTEN             0                  128                                     [::]:22                                    [::]:*
tcp               LISTEN             0                  128                                    [::1]:631                                   [::]:*
```

#### دستور `netcat`

ابزار `nc` (یا `netcat`) تقریباً برای هر کاری که به TCP، UDP یا سوکت‌های دامنه یونیکس (UNIX-domain sockets) مربوط باشد به کار می‌رود. این ابزار می‌تواند اتصالات TCP باز کند، بسته‌های UDP بفرستد، روی پورت‌های دلخواه TCP و UDP گوش بدهد (Listen)، پورت‌ها را اسکن کند و با هر دو پروتکل IPv4 و IPv6 کار کند. برخلاف `telnet`، از `nc` به‌راحتی می‌توان در اسکریپت‌ها استفاده کرد و پیام‌های خطا را به‌جای خروجی استاندارد (برخلاف برخی رفتارهای `telnet`) به خطای استاندارد (stderr) می‌فرستد. این دستور بسیار توانمند است و آشنایی با مفهوم کلی آن برای شما کافی خواهد بود.

اینجا من یک شنونده TCP روی پورت `1337` ایجاد می‌کنم:

```bash
jadi@debian:~$ nc -l 1337
```

و اینجا یک اتصال به همان پورت باز می‌کنم و کمی داده می‌فرستم:

```text
jadi@debian:~$ nc localhost 1337
Are you enjoying the LPIC?
```

و این پیام باید در `nc` که در حال گوش دادن است دیده شود.

#### دستور `dig`

دستور `dig` یک ابزار پرس‌وجوی DNS است. اگر با نام یک دامنه مشکل دارید، می‌توانید با آن بررسی کنید که این دامنه چگونه و توسط چه سروری به آدرس IP ترجمه می‌شود:

```text
[jadi@debian ~]$ dig google.com

; <<>> DiG 9.9.5-11ubuntu1.3-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 50032
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;google.com.            IN    A

;; ANSWER SECTION:
google.com.        293    IN    A    216.58.214.46

;; Query time: 120 msec
;; SERVER: 4.2.2.4#53(4.2.2.4)
;; WHEN: Fri Apr 01 22:00:05 IRDT 2016
;; MSG SIZE  rcvd: 44
```

می‌بینید که سرور `4.2.2.4` دامنه `google.com` را به آدرس `216.58.214.46` ترجمه کرده است.

---

<div class="callout callout-tip" style="background: rgba(147, 51, 234, 0.08); border-right: 4px solid #9333ea; padding: 16px 20px; border-radius: 8px; margin-top: 32px;">
  <strong>🔗 نسخه اصلی به زبان انگلیسی:</strong>
  این درسنامه بر اساس منبع انگلیسی جادی در مخزن <a href="https://github.com/jadijadi/lpic1book/blob/master/content/1093_basic_network_troubleshooting.md" target="_blank" rel="noopener noreferrer">jadijadi/lpic1book</a> تدوین و سازماندهی شده است.
</div>
{% endraw %}
