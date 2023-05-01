---
layout: post
title: "Controlling Coolix-compatible AC using OpenBeken/OpenBK7231T-Compatible IR Blaster"
date: 2022-02-09 00:00:00 +0000
categories: mdt
tags: iot infrared ac homeassistant mqtt openbeken openbk7231t
---

A lot of new cheap chinese IoT-thingies come with custom Tuya ESP pin-compatible boards, which are incompatible with ESPHome or Tasmota, but compatible with [OpenBeken](https://github.com/openshwprojects/OpenBK7231T_App).

However, OpenBeken is still in kinda-early stages of development and IR support on official builds is a bit limited. So you would need to use a version from pull request that implements much more IR features, including the ability to send COOLIX commands, without friendly interface, sadly.

<!--more-->

So I made a appdaemon mqtt app that creates COOLIX codes and sends them to OpenBK7231T.

First you would need to install the fork. Just grab [latest build](https://github.com/openshwprojects/OpenBK7231T_App/pull/723) in action check section for your version of BK7231-thing and install it. After that, check if your AC issues actually uses COOLIX commands - go to your OpenBeken web interface, go to webapp and open log page. My AC remote for some reason didn't emit any IR other than poweroff, which was recognized as `Unknown` command. However, [Mi Remote](https://play.google.com/store/apps/details?id=com.duokan.phone.remotecontroller&hl=en&gl=US) app managed to control AC and issued COOLIX commands.

Here is an app script:

{% gist af1cc19c4c853b60884052d5d9fcb63e %}

Set the variables:

- `UID`: HomeAssistant UID for entity
- `MY_NS`: topic under which app will publish your AC
- `IR_BLASTER`: mqtt topic for your IR blaster commands
- `DEVICE_NAME`: name, under which your AC will appear

And after installing the appdaemon app, should automatically appear in your HomeAssistant through MQTT auto-discovery!

![](/img/ha-ac.png)
