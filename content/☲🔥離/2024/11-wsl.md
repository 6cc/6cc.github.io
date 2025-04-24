
>　　　　　　　　6//?r=⭐　&d=2024/11/26 11:38:28　&b=m3xwq4vj
## 如何在 Windows 10 上安装 WSL 2（已更新）
https://cn.linux-console.net/?p=20304
|
(2004) 上启用虚拟机平台，
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

（1903、1909）上启用虚拟机平台，
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -NoRestart

>　　　　　　　　6//?r=⭐　&d=2024/11/19 11:14:23　&b=m3nvs7jd
## 关于windows安装wsl，出现WslRegisterDistribution failed with error: 0x8007019e The Windows Subsystem错误的解决方案-CSDN博客
https://blog.csdn.net/qq_37109456/article/details/109669455
|

Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

>　　　　　　　　6//?r=⭐　&d=2024/11/19 13:36:05　&b=m3o0ug1n
## Window10安装linux子系统及子系统安装1Panel面板 - Stars-one - 博客园
https://www.cnblogs.com/stars-one/p/17764763.html
|
wsl_update_x64.msi文件下载: 
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

https://github.com/microsoft/WSL/releases

wsl.2.0.4.0.x64.msi

需要用到systemd命令,需要更新环境

3.Linux系统使用国内仓库源
由于账号需要使用到ifconfig来查看IP地址信息,所以要先设置下使用国内的Linux软件仓库源

1、将系统源文件复制一份备用

sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

2、用vi编辑器打开源文件

sudo vi /etc/apt/sources.list

3、找到国内源复制粘贴

阿里源地址https://developer.aliyun.com/mirror/?spm=a2c6h.12883283.1364563.38.6c69201cmnp0oi

输入49dd清除全部内容,如果你的是22.04版本,可以直接复制下面内容

deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse 

>　　　　　　　　6//?r=⭐　&d=2024/11/19 11:10:25　&b=m3nvn3nd
## 旧版 WSL 的手动安装步骤 | Microsoft Learn
https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-2---check-requirements-for-running-wsl-2
|

对于 x64 系统：版本 1903 或更高版本，内部版本为 18362.1049 或更高版本。

>　　　　　　　　6//?r=⭐　&d=2024/11/25 15:19:42　&b=m3wp6t7n
## 原版软件
https://next.itellyou.cn/Original/#cbp=Product?ID=f905b2d9-11e7-4ee3-8b52-407a8befe8d1
|

Windows 10 (consumer editions), version 1903 (x64) - DVD (Chinese-Simplified)
ed2k://|file|cn_windows_10_consumer_editions_version_1903_x64_dvd_8f05241d.iso|4905476096|F28FDC23DA34D55BA466BFD6E91DD311|/

>　　　　　　　　6//?r=⭐　&d=2024/11/19 10:54:44　&b=m3nv2y4q
## 解决wsl 安装出现Installing, this may take a few minutes… 时间长。且重新打开进入root用户问题 - 子の雨 - 博客园
https://www.cnblogs.com/ziyulab/p/18446092
|
https://images.cnblogs.com/cnblogs_com/blogs/631168/galleries/2413030/o_240729160024_699058.webp

>　　　　　　　　6//?r=⭐　&d=2024/11/19 10:56:46　&b=m3nv5jo8
## Win10 安装 Docker Desktop ( 基于WSL2，WSL vs Hyper-V) - 个人文章 - SegmentFault 思否
https://segmentfault.com/a/1190000041078669
|

>　　　　　　　　6//?r=⭐　&d=2024/11/19 10:57:08　&b=m3nv61d4
## Linux查看系统基本信息，版本信息（最全版）_查看linux系统版本-CSDN博客
https://blog.csdn.net/qq_31278903/article/details/83146031
|

>　　　　　　　　6//?r=⭐　&d=2024/11/19 10:59:16　&b=m3nv8rnl
## Windows开启（WSL）Linux子系统并远程连接SSH_wsl ssh-CSDN博客
https://blog.csdn.net/tzsm11/article/details/137093575
|

Windows开启（WSL）Linux子系统并远程连接SSH

>　　　　　　　　6//?r=⭐　&d=2024/11/19 11:06:23　&b=m3nvhxah
## 如何查看wsl是wsl1还是wsl2_查看wsl版本-CSDN博客
https://blog.csdn.net/dghcs18/article/details/134244426
|

wsl --list --verbose

>　　　　　　　　6//?r=⭐　&d=2024/11/19 11:12:17　&b=m3nvpi8x
## 旧版 WSL 的手动安装步骤 | Microsoft Learn
https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
|

旧版 WSL 的手动安装步骤
