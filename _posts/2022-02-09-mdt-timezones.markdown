---
layout: post
title:  "MDT and time zones"
date:   2022-02-09 00:00:00 +0000
categories: mdt
tags: mdt timezone
image: /img/mdt-tz-hero.png
solution: 1
---

Almost every post/tutorial on setting default timezone in MDT says to use value from `tzutil /g`.

In addition to that, [MDT documentation on TimeZoneName](https://docs.microsoft.com/en-us/mem/configmgr/mdt/toolkit-reference#TimeZoneName) specifies to use value for Unattend.xml, [which references to `tzutil` yet again](https://docs.microsoft.com/en-us/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-timezone). So it should work, right? Right?
<!--more-->
<div class="tenor-gif-embed" data-postid="14085168" data-share-method="host" data-aspect-ratio="1.73" data-width="100%"></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

After trying it out for myself, I got the "Russian Standard Time", which didn't work in MDT and gave me PT instead:

![MDT displaying wrong time zone](/img/mdt-wrong-time.png)

Thinking that I am going insane I checked [Microsofts timezone list](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones) and it was correct! I decided to try Arab Standard Time which is same TZ as Moscow for laughs....... And it worked, so MDTs `TimeZoneName` key is not broken:

![MDT displaying Arab Standard Time correctly](/img/mdt-arab-standard-time.png)

After 2 hours of pointless Googling, I didn't find any proper solution for problem. So, I decided to dig into MDT wizard scripts.

# Solution

It turns out MDT uses its own list for timezones, which is as ancient as Windows Vista is!

After trying the "Russia TZ 2 Standard Time" from it, MDT finally shown me the proper timezone:

![MDT displaying correct timezone](/img/mdt-correct-timezone.png)

Here is the proper list of timezones from `Scripts\DeployWiz_LanguageUI.xml`:

```xml
<!--
The following is a static table of Time Zones supported by Windows XP/2003 and Windows Vista
TimeZone Format:
    <option value="TimeZoneNumber;TimeZoneName">TimeZoneDescription</option>
Where:
    TimeZoneNumber - The Time Zone number used in Windows XP/2003 (Whistler) Unattend.txt files. [GuiUnattended] TimeZone
    TimeZoneName - The Time Zone Name used in Windows Vista (Longhorn) unattend.xml files. <TimeZone> entries
    TimeZoneDescription - This is the value displayed in the dialog box.
-->

<option value="Morocco Standard Time">(UTC) Casablanca</option>
<option value="Coordinated Universal Time">(UTC) Coordinated Universal Time</option>
<option value="GMT Standard Time">(UTC) Dublin, Edinburgh, Lisbon, London</option>
<option value="Greenwich Standard Time">(UTC) Monrovia, Reykjavik</option>
<option value="W. Europe Standard Time">(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
<option value="Central Europe Standard Time">(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
<option value="Romance Standard Time">(UTC+01:00) Brussels, Copenhagen, Madrid, Paris</option>
<option value="Central European Standard Time">(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
<option value="W. Central Africa Standard Time">(UTC+01:00) West Central Africa</option>
<option value="Namibia Standard Time">(UTC+01:00) Windhoek</option>
<option value="Jordan Standard Time">(UTC+02:00) Amman</option>
<option value="GTB Standard Time">(UTC+02:00) Athens, Bucharest</option>
<option value="Middle East Standard Time">(UTC+02:00) Beirut</option>
<option value="Egypt Standard Time">(UTC+02:00) Cairo</option>
<option value="Syria Standard Time">(UTC+02:00) Damascus</option>
<option value="E. Europe Standard Time">(UTC+02:00) E. Europe</option>
<option value="South Africa Standard Time">(UTC+02:00) Harare, Pretoria</option>
<option value="FLE Standard Time">(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
<option value="Turkey Standard Time">(UTC+02:00) Istanbul</option>
<option value="Jerusalem Standard Time">(UTC+02:00) Jerusalem</option>
<option value="Russia TZ 1 Standard Time">(UTC+02:00) Kaliningrad (RTZ 1)</option>
<option value="Libya Standard Time">(UTC+02:00) Tripoli</option>
<option value="Arabic Standard Time">(UTC+03:00) Baghdad</option>
<option value="Arab Standard Time">(UTC+03:00) Kuwait, Riyadh</option>
<option value="Belarus Standard Time">(UTC+03:00) Minsk</option>
<option value="Russia TZ 2 Standard Time">(UTC+03:00) Moscow, St. Petersburg, Volgograd (RTZ 2)</option>
<option value="E. Africa Standard Time">(UTC+03:00) Nairobi</option>
<option value="Iran Standard Time">(UTC+03:30) Tehran</option>
<option value="Arabian Standard Time">(UTC+04:00) Abu Dhabi, Muscat</option>
<option value="Azerbaijan Standard Time">(UTC+04:00) Baku</option>
<option value="Russia TZ 3 Standard Time">(UTC+04:00) Izhevsk, Samara (RTZ 3)</option>
<option value="Mauritius Standard Time">(UTC+04:00) Port Louis</option>
<option value="Georgian Standard Time">(UTC+04:00) Tbilisi</option>
<option value="Caucasus Standard Time">(UTC+04:00) Yerevan</option>
<option value="Afghanistan Standard Time">(UTC+04:30) Kabul</option>
<option value="West Asia Standard Time">(UTC+05:00) Ashgabat, Tashkent</option>
<option value="Russia TZ 4 Standard Time">(UTC+05:00) Ekaterinburg (RTZ 4)</option>
<option value="Pakistan Standard Time">(UTC+05:00) Islamabad, Karachi</option>
<option value="India Standard Time">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
<option value="Sri Lanka Standard Time">(UTC+05:30) Sri Jayawardenepura</option>
<option value="Nepal Standard Time">(UTC+05:45) Kathmandu</option>
<option value="Central Asia Standard Time">(UTC+06:00) Astana</option>
<option value="Bangladesh Standard Time">(UTC+06:00) Dhaka</option>
<option value="Russia TZ 5 Standard Time">(UTC+06:00) Novosibirsk (RTZ 5)</option>
<option value="Myanmar Standard Time">(UTC+06:30) Yangon (Rangoon)</option>
<option value="SE Asia Standard Time">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
<option value="Russia TZ 6 Standard Time">(UTC+07:00) Krasnoyarsk (RTZ 6)</option>
<option value="China Standard Time">(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
<option value="Russia TZ 7 Standard Time">(UTC+08:00) Irkutsk (RTZ 7)</option>
<option value="Malay Peninsula Standard Time">(UTC+08:00) Kuala Lumpur, Singapore</option>
<option value="W. Australia Standard Time">(UTC+08:00) Perth</option>
<option value="Taipei Standard Time">(UTC+08:00) Taipei</option>
<option value="Ulaanbaatar Standard Time">(UTC+08:00) Ulaanbaatar</option>
<option value="Tokyo Standard Time">(UTC+09:00) Osaka, Sapporo, Tokyo</option>
<option value="Korea Standard Time">(UTC+09:00) Seoul</option>
<option value="Russia TZ 8 Standard Time">(UTC+09:00) Yakutsk (RTZ 8)</option>
<option value="Cen. Australia Standard Time">(UTC+09:30) Adelaide</option>
<option value="AUS Central Standard Time">(UTC+09:30) Darwin</option>
<option value="E. Australia Standard Time">(UTC+10:00) Brisbane</option>
<option value="AUS Eastern Standard Time">(UTC+10:00) Canberra, Melbourne, Sydney</option>
<option value="West Pacific Standard Time">(UTC+10:00) Guam, Port Moresby</option>
<option value="Tasmania Standard Time">(UTC+10:00) Hobart</option>
<option value="Magadan Standard Time">(UTC+10:00) Magadan</option>
<option value="Russia TZ 9 Standard Time">(UTC+10:00) Vladivostok, Magadan (RTZ 9)</option>
<option value="Russia TZ 10 Standard Time">(UTC+11:00) Chokurdakh (RTZ 10)</option>
<option value="Central Pacific Standard Time">(UTC+11:00) Solomon Is., New Caledonia</option>
<option value="Russia TZ 11 Standard Time">(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky (RTZ 11)</option>
<option value="New Zealand Standard Time">(UTC+12:00) Auckland, Wellington</option>
<option value="UTC+12">(UTC+12:00) Coordinated Universal Time+12</option>
<option value="Fiji Standard Time">(UTC+12:00) Fiji</option>
<option value="Kamchatka Standard Time">(UTC+12:00) Petropavlovsk-Kamchatsky - Old</option>
<option value="Tonga Standard Time">(UTC+13:00) Nuku'alofa</option>
<option value="Samoa Standard Time">(UTC+13:00) Samoa</option>
<option value="Line Islands Standard Time">(UTC+14:00) Kiritimati Island</option>			  
<option value="Dateline Standard Time">(UTC-12:00) International Date Line West</option>
<option value="UTC-11">(UTC-11:00) Coordinated Universal Time-11</option>
<option value="Hawaiian Standard Time">(UTC-10:00) Hawaii</option>
<option value="Alaskan Standard Time">(UTC-09:00) Alaska</option>
<option value="Pacific Standard Time (Mexico)">(UTC-08:00) Baja California</option>
<option value="Pacific Standard Time">(UTC-08:00) Pacific Time (US &amp; Canada)</option>
<option value="US Mountain Standard Time">(UTC-07:00) Arizona</option>
<option value="Mountain Standard Time (Mexico)">(UTC-07:00) Chihuahua, La Paz, Mazatlan</option>
<option value="Mountain Standard Time">(UTC-07:00) Mountain Time (US &amp; Canada)</option>
<option value="Central America Standard Time">(UTC-06:00) Central America</option>
<option value="Central Standard Time">(UTC-06:00) Central Time (US &amp; Canada)</option>
<option value="Central Standard Time (Mexico)">(UTC-06:00) Guadalajara, Mexico City, Monterrey</option>
<option value="Canada Central Standard Time">(UTC-06:00) Saskatchewan</option>
<option value="SA Pacific Standard Time">(UTC-05:00) Bogota, Lima, Quito, Rio Branco</option>
<option value="Eastern Standard Time (Mexico)">(UTC-05:00) Chetumal</option>
<option value="Eastern Standard Time">(UTC-05:00) Eastern Time (US &amp; Canada)</option>
<option value="US Eastern Standard Time">(UTC-05:00) Indiana (East)</option>
<option value="Venezuela Standard Time">(UTC-04:30) Caracas</option>
<option value="Paraguay Standard Time">(UTC-04:00) Asuncion</option>
<option value="Atlantic Standard Time">(UTC-04:00) Atlantic Time (Canada)</option>
<option value="Central Brazilian Standard Time">(UTC-04:00) Cuiaba</option>
<option value="SA Western Standard Time">(UTC-04:00) Georgetown, La Paz, Manaus, San Juan</option>
<option value="Newfoundland Standard Time">(UTC-03:30) Newfoundland</option>
<option value="E. South America Standard Time">(UTC-03:00) Brasilia</option>
<option value="SA Eastern Standard Time">(UTC-03:00) Cayenne, Fortaleza</option>
<option value="Argentina Standard Time">(UTC-03:00) City of Buenos Aires</option>
<option value="Greenland Standard Time">(UTC-03:00) Greenland</option>
<option value="Montevideo Standard Time">(UTC-03:00) Montevideo</option>
<option value="Bahia Standard Time">(UTC-03:00) Salvador</option>
<option value="Pacific SA Standard Time">(UTC-03:00) Santiago</option>
<option value="UTC-02">(UTC-02:00) Coordinated Universal Time-02</option>
<option value="Mid-Atlantic Standard Time">(UTC-02:00) Mid-Atlantic - Old</option>
<option value="Azores Standard Time">(UTC-01:00) Azores</option>
<option value="Cabo Verde Standard Time">(UTC-01:00) Cabo Verde Is.</option>
```
