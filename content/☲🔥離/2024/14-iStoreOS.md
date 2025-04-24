
KimMiDi SSD TB90
4982272
终止扇区
0 - 500118191 - 234 * 2 * 1024 * 1024 = 
新建 9384623
<del>uefi 9384590</del>

/root/etc/config/network
option proto 'dhcp'
	option ipaddr '192.168.1.162'

KimMiD234

qBittorrent v4.5.2 Web UI (64-bit)
默认用户名：admin
默认密码：adminadmin
>　　　　　　　　6//?r=⭐　&d=2024/12/5 14:35:44　&b=m4ay0ro3
## 关于新版本qBittorrent“无效的用户名和密码”，其实可以这么解决_NAS存储_什么值得买
https://post.smzdm.com/p/aklpv7x9/
|
4.6.1版本开始，
不在沿用之前默认的
初始密码。

>　　　　　　　　6//?r=⭐⭐　&d=2024/9/25 09:44:58　&b=m1h7ddjl
## Docker/DockerHub 国内镜像源/加速列表（0921更新） - 轩源的网络日志 - Xuanyuan's Blog
https://xuanyuan.me/blog/archives/1154
|
<del>
https://docker.linkedbus.com
</del>

https://docker.xuanyuan.me
https://docker.1ms.run
https://docker.rainbond.cc
https://docker.udayun.com
<del>
https://xdark.top
</del>

>　　　　　　　　6//?r=⭐　&d=2024/12/2 10:23:07　&b=m46eoch3
## Docker镜像加速
https://docker.udayun.com/
|
ghcr.io

docker pull docker.udayun.com/library/alpine:latest

docker run -d -p 5110:5000 --name sayhello powersee/sayhello
docker run -d -p 5010:5000 --name mihomo metacubex/mihomo
>m40wwq7i，前外端口，后内端口
docker build --tag 'sing-box' .
docker run -p 5000:5000 sing-box:latest

>　　　　　　　　6//?r=⭐　&d=2024/11/25 14:01:11　&b=m3wmdtm1
## 折腾路由QWRT_qwrt固件-CSDN博客
https://blog.csdn.net/weixin_43408641/article/details/142282535
|
g内可用docker镜像加速器
<del>
https://dockerproxy.cn/
</del>

https://docker.1panel.live/

<del>
https://dockerpul1.com/
</del><del>
https://docker.m.daocloud.io/
</del>

https://registry.linkease.net:5443/ 

>　　　　　　　　6//?r=⭐　&d=2024/12/6 10:17:51　&b=m4c4900v
## 渡渡鸟镜像同步站
https://docker.aityp.com/
|

全站镜像索引数量: 8293 同步:5957 GB

fix-istore.sh
```tip

#!/bin/bash

sed -i 's/istore.linkease.com/istore.istoreos.com/g' /bin/is-opkg
sed -i 's/istore.linkease.com/istore.istoreos.com/g' /etc/opkg/compatfeeds.conf
sed -i 's/istore.linkease.com/istore.istoreos.com/g' /www/luci-static/istore/index.js

is-opkg update
```
>　　　　　　　　6//?r=⭐　&d=2024/11/13 10:45:53　&b=m3fa4gbx
## iStore更新公告 · Issue #22 · linkease/istore · GitHub
https://github.com/linkease/istore/issues/22
|
sh -c "$(curl -sSL http://fw.koolcenter.com/iStoreOS/alpha/fix-istore.sh)"

通知: 2024-11-12 服务器故障，请切换的新服务器
sh -c "$(curl -sSL https://fw.koolcenter.com/iStoreOS/alpha/fix-istore.sh)"

/mnt/sata1-4
/mnt/sata1-4/6/d
/mnt/sata1-4/6/a

vi /etc/config/network
config interface 'lan'
	option ipaddr '192.168.1.162'

/mnt/sata1-4/9/dS
/mnt/sata1-4/9/dS/aD

qBittorrent
/mnt/sata1-4/6/q
/mnt/sata1-4/9/dS/qD
admin
adminadmin

# /root/overlay/upper/etc/docker
https://docker.1panel.live

/mnt/sata1-4

### Docker 根目录
/overlay/upper/opt/docker
/mnt/data_sda4

>　　　　　　　　6//?r=⭐　&d=2024/10/25 14:16:17　&b=m2oc9ukp
## 最强软路由系统iStoreOS_X86安装体验，极简化设置、一键旁路由、小白强烈推荐_NAS存储_什么值得买
https://post.smzdm.com/p/a0qrvdgw/
|
vi /etc/config/network

config interface 'lan'
	option device 'br-lan'
	option ipaddr '192.168.1.162'
	option netmask '255.255.255.0'
	option proto 'static'

option proto 'dhcp'
option defaultroute '0'

　6//sp1it=1　6//?r=⭐　&d=2024/1/28 17:10:38　&💻=0　&b=lrxa67kh　&!=🌸
OpenWrt 安装 OpenClash 插件并配置节点 - 彧繎博客
https://opclash.com/article/80.html

　6//sp1it=1　6//?r=⭐　&d=2024/2/10 17:16:27　&💻=0　&b=lsfv3rfu　&!=🌸
求助：openwrt的samba可以访问，不过不能写入-OPENWRT专版-恩山无线论坛
https://www.right.com.cn/FORUM/thread-4041214-1-1.html

SSH进去，设置目录权限 777

chmod -R 777 /mnt/sata1-4/smb

>　　　　　　　　6//?r=⭐　&d=2024/10/23 14:49:07　&b=m2likd8t
## Linux chmod 命令 | 菜鸟教程
https://www.runoob.com/linux/linux-comm-chmod.html
|
-R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递归的方式逐个变更)

>　　　　　　　　6//?r=⭐　&d=2024/10/16 16:23:59　&b=m2blve82
## 【求帮助】openwrt，aria2，发生错误(16) 文件创建或删除已有文件失败-OPENWRT专版-恩山无线论坛
https://www.right.com.cn/forum/thread-4019560-1-1.html
|
也可能是权限问题，登录到设备console界面，看看是不是读写权限不足，如果是，chmod 777 (下载文件夹)，打开读写权限

chmod 777 /mnt/kimm231/9/ariaDown

　6//sp1it=1　6//?r=⭐　&d=2024/1/28 17:32:00　&💻=0　&b=lrxaxo62　&!=🌸
OpenWrt 正确编译安装 OpenClash 的方法 - 彧繎博客
https://opclash.com/article/241.html

cd /etc/openclash/core/ 

wget https://hub.gitmirror.com/https://github.com/vernesong/OpenClash/releases/download/Clash/clash-linux-amd64.tar.gz

tar -zxvf clash-linux-amd64.tar.gz

chmod 777 clash

　6//sp1it=1　6//?r=⭐　&d=2024/1/29 10:47:23　&💻=0　&b=lrybx6u8　&!=🌸
OPENCLASH 内核更新失败解决方法-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛
https://www.right.com.cn/forum/thread-8272767-1-1.html

Dev 内核下载: https://github.com/vernesong/OpenClash/releases/tag/Clash
Tun 内核下载: https://github.com/vernesong/OpenClash/releases/tag/TUN-Premium
Tun 游戏内核: https://github.com/vernesong/OpenClash/releases/tag/TUN

　6//sp1it=1　6//?r=⭐　&d=2024/1/29 11:20:59　&💻=0　&b=lryd4egq　&!=🌸
Clash内核及各客户端版本镜像整理 | clash | clash镜像 | clash for windows | cfw | clash for android
https://www.clash.la/archives/755/

　6//sp1it=1　6//?r=⭐　&d=2024/1/29 14:02:50　&💻=0　&b=lryiwjq6　&!=🌸
简介 | Clash 知识库
https://clash.wiki/premium/introduction.html

其源代码的安全性通过多个可信的开发人员相互审查以保证.

　6//sp1it=1　6//?r=⭐　&d=2024/1/29 15:16:21　&💻=0　&b=lrylj3dt　&!=🌸
终端使用代理加速的正确方式（Clash） | Ln's Blog
https://weilining.github.io/294.html

https://cdn.jsdelivr.net/gh/weilining/img@main/img/valinebg.webp

https://kkgithub.com/williamleecn/tpclash2
https://kkgithub.com/LaoYutang/clash-and-dashboard

　6//sp1it=1　6//?r=⭐　&d=2024/2/7 13:58:30　&💻=0　&b=lsbdpn7s　&!=🌸
配置iStoreOS虚拟机 | 渊澄
https://miaoyang.win/2024/01/06/33%E9%85%8D%E7%BD%AEiStoreOS%E8%99%9A%E6%8B%9F%E6%9C%BA/

vi /etc/config/network
config interface ‘lan’
option ipaddr ‘192.168.1.1’

修改完毕后，按下 Esc，输入 “:wq”(保存并退出)，退出 vi 编辑器。

>　　　　　　　　6//?r=⭐　&d=2024/11/25 13:58:10　&b=m3wm9yhu
## KoolCenter 固件下载服务器
https://fw.koolcenter.com/iStoreOS/
|<del>
"$(curl -sSL http://fw.koolcenter.com/iStoreOS/alpha/fix-istore.sh)"
</del>
