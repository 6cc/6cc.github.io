for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr "IPv4 Address"') do set "IP=%%f"
set "IP=%IP: =%"
msg * /TIME:0 "Current IP Address "%IP%

>　　　　　　　　6//?r=⭐　&d=2024/10/13 10:30:21　&b=m26yx289
## 在 Windows 批处理文件中弹出窗口的终极秘诀 - ByteZoneX社区
https://www.bytezonex.com/archives/LhEPP50c.html
|
msg * /TIME:0 "消息文本"
Write-Host "欢迎来到弹出窗口世界！" -ForegroundColor Red

>　　　　　　　　6//?r=⭐　&d=2024/10/31 10:15:14　&b=m2woayc5
## 使用cmd命令向局域网中的某台电脑发送消息_给局域网内的电脑发cmd-CSDN博客
https://blog.csdn.net/u010261322/article/details/51837619
|
Msg /server:192.168.1.154 * "你好，局域网用户！"

>　　　　　　　　6//?r=⭐　&d=2024/10/13 10:40:23　&b=m26z9yn3
## 如何在bat脚本中获取本机IP地址并保存到变量中供后续使用
https://www.link114.cn/article/32257.html
|
### ipconfig
for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr "IPv4 Address"') do set "IP=%%f"

set "IP=%IP: =%"

echo 本机IP地址为:%IP%

pause

### wmic
for /f "tokens=2 delims==" %%a in ('wmic nicconfig where IPEnabled^=TRUE get IPAddress /value') do set "IP=%%a"

### powershell
for /f "delims=" %%a in ('powershell -command "([System.Net.Dns]::GetHostEntry('').AddressList | Select-Object -First 1 -ExpandProperty IPAddressToString)"') do set "IP=%%a

>　　　　　　　　6//?r=⭐　&d=2024/10/13 11:12:32　&b=m270fbdl
## Windows通过命令行共享文件夹_win10命令行设置文件共享everyone-CSDN博客
https://blog.csdn.net/xiao503/article/details/108268356
|
net share
创建、配置和删除网络共享文件夹。

>　　　　　　　　6//?r=⭐　&d=2024/10/13 11:07:18　&b=m2708kqq
## bat命令中rem和双冒号的区别（转）_bat中冒号的作用-CSDN博客
https://blog.csdn.net/whorus1/article/details/19608463
|

rem和::都起到注释的作用，然而又有些不同。

>　　　　　　　　6//?r=⭐　&d=2024/10/13 10:36:59　&b=m26z5lt8
## 在Windows7/10/11上使用.bat批处理，一键切换/更改/修改IP地址，公司和家里/内网外网/内部外部网络，在固定IP和自动获取之间切换/改变 - 知乎
https://zhuanlan.zhihu.com/p/680931412
|

>　　　　　　　　6//?r=⭐　&d=2024/10/31 10:10:44　&b=m2wo56ju
## vbs、cmd或bat常用语句，如创建快捷方式、添加到用户环境变量Path、开机启动等 - 夕西行 - 博客园
https://www.cnblogs.com/xixixing/p/17625621.html
|
