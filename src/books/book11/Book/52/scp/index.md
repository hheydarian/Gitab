---
layout: layout.njk
title: "فصل 52: ابزار scp (Linux scp Command)"
---
{% raw %}
# فصل 52: ابزار scp (Linux scp Command)

### مقدمه
اگر برای جابجایی فایل از ماشین به یک سرور یا ماشین دیگر که در شبکه شما است به دنبال چیزی می‌گردید scp راحت‌ترین و سریع‌ترین انتخاب ممکن در تریمنال شما است. با استفاده از این ابزار scp می‌توانید برای جابجایی فایل بین دو ماشین‌ که در یک شبکه (شبکه محلی یا اینترنت) هستند مورد استفاده قرار می‌گیرد.
ابزار scp از پروتکل ssh به همراه authentication و امنیتی که ssh فراهم می‌کند برای انتقال داده استفاده می‌کند. دقیقا مثل ssh زدن به یک ماشینی که در شبکه شما قرار دارد.


> SCP: OpenSSH secure file copy

> SSH: Secure Shell Protocol
---


### انتقال فایل به ریموت هاست

مسیر داخلی مبدا و مقصد در ریموت هاست باید به فرمت (۱) یا به صورت یک URI به فرمت (۲) مشخص شود. نام فایل‌ داخلی باید به صورت دقیق و کامل مشخص شود و داخل نام فایل نباید کاراکتر ```:``` وجود داشته باشد.

1: [user@]host:[path]

2: scp://[user@]host[:port][/path]


فرمت کلی دستور scp

```
scp [-346BCpqrTv] [-c cipher] [-F ssh_config] [-i identity_file] [-J destination] [-l limit] [-o ssh_option] [-P port] [-S program] source ... target
```

یک مثال ساده از انتقال یک فایل به ریموت هاست



```
scp {{path/to/local_file}} {{remote_username}}@{{remote_host}}:{{path/to/remote_directory}}

$ scp /home/m/index.html root@192.168.2.159:/var/www/blog
root@192.168.2.159's password:

# index.html                          100%   1.5KB  27.1MB/s   00:00
```


<div class="callout callout-info" style="background: rgba(59, 130, 246, 0.08); border-right: 4px solid #3b82f6; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">

**💡 نکته:**

در تمامی مثال‌های پایین با جابجایی فایل مبدا و مقصد، جابجایی فایل را برعکس کنید. (به صورت زیر)

</div>



انتقال فایل به ریموت هاست


```
scp {{path/to/local_file}} {{remote_username}}@{{remote_host}}:{{path/to/remote_directory}}
```

دریافت فایل از ریموت هاست


```
scp {{remote_username}}@{{remote_host}}:{{path/to/remote_directory}} {{path/to/local_file}}
```




---


### انتقال یک فایل بین دو ریموت هاست 

با استفاده از آپشن  3- می‌توانید بین دو ریموت هاست فایل را انتقال داد.



```
scp -3 {{host1}}:{{path/to/remote_file}} {{host2}}:{{path/to/remote_directory}}
```
---



### انتقال یک فایل با پورت مشخصی از ریموت هاست 

با استفاده از آپشن  P- می‌توان پورت مشخصی از ریموت هاست را انتخاب کرد و فایل را از ماشین خود انتقال داد.



```
scp -P {{port}} {{path/to/local_file}} {{remote_host}}:{{path/to/remote_file}}
```

---



### انتقال یک فایل از ریموت هاست به ماشین خود 

با استفاده از فرمت زیر می‌توان فایلی را از یک ریموت هاست به ماشین خود انتقال دهید.



```
scp {{remote_host}}:{{path/to/remote_file}} {{path/to/local_file}}
```

---




###  انتقال فایل با private key مشخص

انتقال فایل با private key مشخص برای احراز هویت در ریموت هاست با استفاده از i- این گزینه.



```
scp -i {{~/.ssh/private_key}} {{local_file}} {{remote_host}}:{{/path/remote_file}}
```

---



###  انتقال فایل‌های داخل یک مسیر به صورت پشت سر هم

با استفاده از آپشن r- می‌توانید تمامی فایل‌های داخل یک مسیر را با یک دستور انتقال دهید.

```
scp -r {{remote_host}}:{{path/to/remote_directory}} {{path/to/local_directory}}
```



---



###  حفظ اطلاعات جزئی فایل حین کپی به ریموت هاست

با استفاده از این گزینه میتوانید تمامی جزئیات فایل اصلی را در حین انتقال حفظ کنید. جزئیاتی مثل زمان تغییرات فایل (modification times)، زمان‌های دسترسی (access times)، و مدهای فایل (mdoes).



```
$ scp -p ...
```
---



###  رمزگذاری اتصال بین ریموت هاست

با استفاده از این آپشن می‌توان اتصال را encrypt کرد. برنامه مد نظر باید آپشن‌های ssh را متوجه شود.



```
$ scp -S program ...
```

---



###  محدود کردن سرعت پهنای باند

با استفاده از این آپشن می‌توانید روی پهنای باند محدودیت ایجاد کنید. (بر اساس Kbit/s)



```
$ scp -l 500KB
```

---



###  مجبور کردن اتصال scp به استفاده از IPv4 یا IPv6

با استفاده از آپشن 4- یا 6- می‌توان اتصال را مجبور به استفاده از IPv4 یا IPv6 کرد.



```
$ scp -4 ...

$ scp -6 ...
```

---



### استفاده کردن از آپشن‌های ssh در دستور scp برای اتصال

با استفاده از آپشن o- می‌توان از آپشن‌های ssh استفاده کرد. آپشن‌هایی مانند BindAddress, BatchMode, AddressFamily, ProxyCommand, SendEnv, ...

در مثال زیر مثل آپشن 4- فقط از IPv4 استفاده می‌کند.


```
scp -o AddressFamily=inet ...
```

---




### Author or Authors:

- *[Mehdi](https://github.com/mahdimmr)* | **<mahdi.rezayi76@gmail.com>**
{% endraw %}
