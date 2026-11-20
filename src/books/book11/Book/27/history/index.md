---
layout: layout.njk
title: "فصل 27: ابزار history (Linux history Command)"
---
{% raw %}
# فصل 27: ابزار history (Linux history Command)

### مقدمه
اگر از ترمینال لینوکس استفاده میکنید ممکن است برایتان پیش آمده باشد که دستوری را در ترمینال اجرا کرده باشید و آن دستور رافراموش کرده باشید. با استفاده از دستور history میتوانید سابقه دستورات خود را مشاهده کنید. به جز مباحث فراموشی از این دستور برای گرفتن بکاپ از دستورات نیز استفاده میشود. یعنی شما میتوانید از دستور یا دستورات یا حتی فایل history بکاپ تهیه کنید


---


### نمایش ده دستور اول و آخر
با استفاده از خود دستور history میتوانید تمامی سوابق دستورات خود را مشاهده کنید. اما در اکثر اوقات ما به آخرین دستورات نیاز داریم. پس از ابزار tail در کنار دستور خود استفاده میکنیم.
اگر هم میخواستید که ده دستور اول خود را بببینید از ابزار head استفاده کنید.


      $ history | tail
      # 155  sudo apt-get update
        156  sudo apt-get install telegram-desktop
        157  sudo apt-get install figma-linux
        158  sudo apt-get remove telegram-desktop
        159  watch free
        160  watch free -h
        161  ping google.com
        162  sudo su
        163  man tail
        164  history | tail

    $ history | head 
    # 1  man apt-get
      3  man pm
      4  sudo apt-get install pm
      7  sudo apt upgrade
      11  sudo dpkg -i        'google-chrome-stable_current_amd6      4 (1).deb'\n
      13  which chrome
      14  whereis chrome
      15  مس
      17  sensors -v
      18  git --version

---


### جداکردن دستور خاص از سابقه
شما میتوانید با استفاده از ابزار grep دستور خاص مد نظر را از سایر دستورات جدا کنید.


    $ history | grep 'apt-get'
    # 1  man apt-get
      4  sudo apt-get install pm
      23  $ sudo apt-get install simplescreenrecorder\n
      24  $ sudo apt-get install simplescreenrecorder
      341  sudo apt-get install kget
      429  apt-get install tor
      430  sudo apt-get install tor
      513  sudo apt-get upgrade bzr
      701  sudo apt-get libwxgtk2.8-dev
      717  sudo apt-get install woeusb
      719  sudo apt-get install woeusb-frontend-wxgtk
      724  sudo apt-get intall aptitude
      1169  sudo apt-get update
      1991  sudo apt-get upgrade locate
---


### گرفتن نسخه پشتیبان از سابقه دستورات
شما میتوانید با استفاده از اوپراتور خروجی از سابقه دستورات خود پشتیبان تهیه کنید.


    $ history > backup.txt

---


### ذخیره نشدن دستور با ترفند فاصله
شما میتوانید دستورات مهم خود را که شامل پسورد ها هم هستند را با استفاده از قرار دادن فاصله قبل از تایپ دستور از حالت ذخیره سازی خارج کنید. برای مثال شما میخواهید که دستور apt-get در سابقه دستورات ذخیره نشود، برای رفع این مشکل قبل از تایپ دستور یک فاصله قرار دهید و بدین ترتیب مشکل رفع میشود.در مثال زیر ستاره نماد فاصله است.


    $ *apt-get
                                                    
---


### گرفتن نسخه پشتیبان از دستور خاص
شما میتوانید با استفاده از ابزار grep دستورات را فیلتر کنید و خروجی را به فایل بکاپ اضافه کنید.


    $ history | grep 'apt-get' >> backup.txt
                     
---
### Author or Authors

- *[Amirhosein](https://github.com/amirhoseinsb)* | **<amirhoseinsohrabi.official@gmail.com>**
{% endraw %}
