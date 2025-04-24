
>　　　　　　　　6//?r=⭐　&d=2024/12/11 10:09:01　&b=m4j94wf3
## MetaCubeX/metacubexd: Mihomo Dashboard, The Official One, XD
https://github.com/MetaCubeX/metacubexd
|
docker run -d --restart always -p 9097:80 --name metacubexd ghcr.io/metacubex/metacubexd

>　　　　　　　　6//?r=⭐　&d=2024/12/11 21:42:39　&b=m4jxwwr0
## liheji/mihomo-yacd
https://github.com/liheji/mihomo-yacd
|

docker run -d \
  --name clash \
  -v /root/mihomo-config:/root/.config/mihomo \
  -p 7890:7890 \
  -p 9080:8080 \
  yilee01/mihomo-yacd:latest

>　　　　　　　　6//?r=⭐　&d=2024/12/11 10:22:06　&b=m4j9lpon
## 在 docker 中使用 mihomo - windowBR的博客
https://windowbr.top/2024/11/02/mihomo-docker/
|
docker run -d \
  --name mihomo \
  -v /root/mihomo:/root/.config/mihomo \
  -p 7890:7890 \
  -p 9080:8080 \
  metacubex/mihomo

sudo docker run -d \
  --name mihomo \
  -v <config.yaml所在目录>:/root/.config/mihomo \
  --network host \
  metacubex/mihomo

>　　　　　　　　6//?r=⭐　&d=2024/11/30 16:55:22　&b=m43xt369
## 手把手教你如何在飞牛 OS 中使用网络代理 - windowBR的博客
https://windowbr.top/2024/09/17/fnos-mihomo/
|
$ sudo docker run -d --restart always -p 9097:80 --name metacubexd ghcr.io/metacubex/metacubexd

>　　　　　　　　6//?r=⭐　&d=2024/11/30 16:50:19　&b=m43xmlk6
## RouterOS配置Container容器安装Sing-Box实现单路由器上网-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛
https://www.right.com.cn/forum/thread-8371517-1-1.html
|
导出docker镜像为文件
sudo  docker save gzxhwq/sing-box  >  ./sing-box-chr.tar

>　　　　　　　　6//?r=⭐　&d=2024/12/6 10:23:13　&b=m4c4fvrh
## 求docker安装clash详细教程 - 应用中心&Docker 飞牛私有云论坛 fnOS
https://club.fnnas.com/forum.php?mod=viewthread&tid=3800
|

在 docker 中的不同点主要就注意一下，首先 mihomo 官方镜像是 metacubex/mihomo，然后网络模式记得选 host，端口将代理端口和外部控制端**露出来，默认分别是 7890 和 9090，然后就是 docker 下的是没法使用TUN模式，你需要在对应程序中手动设置一下代理端口

>　　　　　　　　6//?r=⭐　&d=2024/11/30 16:55:56　&b=m43xtti0
## 群晖Docker 部署Clash Dashboard 摸鱼小站 摸鱼小站
https://blog.naspro.cc/?p=565
|

将订阅链接转换为Clash订阅链接
https://sub.170203.xyz/
https://sub.ccsub.site
https://bianyuan.xyz
将转换好的链接替换下面命令中的 https://xxxx

https://blog.naspro.cc/api/moyuapi.php?nd1X6W

https://p.tolan.link:2443/i/2024/10/22/ha80jy.jpg
https://p.tolan.link:2443/i/2024/10/22/ha7zmt.jpg

>　　　　　　　　6//?r=⭐　&d=2024/11/30 17:19:00　&b=m43ynhle
## Mihomo Docker 部署 - Lᴜᴄʏ's Tool
https://wiki.repcz.link/vps/mihomo/
|

>　　　　　　　　6//?r=⭐　&d=2024/12/1 10:30:33　&b=m44zi2m0
## selfproxy/Mihomo at main · yyhhyyyyyy/selfproxy · GitHub
https://github.com/yyhhyyyyyy/selfproxy/tree/main/Mihomo
|

Mihomo.yaml

一开始参考的:Rabbit-Spec

之后参考的：Sukka

现在沿用的是：Sukka的思路

>　　　　　　　　6//?r=⭐　&d=2024/12/1 10:32:58　&b=m44zl6kb
## Surge Ruleset Server | Sukka (@SukkaW)
https://ruleset.skk.moe/
|

>　　　　　　　　6//?r=⭐　&d=2024/12/11 10:59:04　&b=m4jax8u3
## Linux搭建mihomo(2024.8.11) - なのです!
https://nanodesu.net/archives/47/
|

external-controller: 0.0.0.0:9090

external-ui: /etc/mihomo/ui

>　　　　　　　　6//?r=⭐　&d=2024/12/11 16:36:28　&b=m4jmz5eo
## Mihomo/config.yaml at main · huLter/Mihomo
https://github.com/huLter/Mihomo/blob/main/config.yaml
|
proxy-providers:
# 机场订阅
# override 覆写节点内容；additional-prefix：为节点名称添加固定前缀；additional-suffix：为节点名称添加固定后缀

  🛫 miaona: {<<: *p, url: "https://miaona.org/#/register?code=C3J67GSL", path: ./机场/可乐云.yaml, override: {additional-prefix: "可乐云 | "}}
  🛫 魔戒: {<<: *p, url: "https://www.mojie.cyou/#/register?code=YjlCVXjA", path: ./机场/魔戒.yaml, override: {additional-prefix: "魔戒 | "}}
  🛫 极速云: {<<: *p, url: "https://512.jsy.lol/#/register?code=KmIpamty", path: ./机场/极速云.yaml, override: {additional-prefix: "极速云 | "}}
  🛫 顶级机场: {<<: *p, url: "https://xn--mes358a9urctx.com/#/register?code=wiPXjyYq", path: ./机场/顶级机场.yaml, override: {additional-prefix: "顶级机场 | "}}
  🛫 飞鸟云: {<<: *p, url: "https://www.feiniaoyun.xyz/#/register?code=1gZX21aI", path: ./机场/飞鸟云.yaml, override: {additional-prefix: "飞鸟云 | "}}
  🛫 淘气兔: {<<: *p, url: "https://vip.taoqitu.pro/index.html?register=rNh8X1zf", path: ./机场/淘气兔.yaml, override: {additional-prefix: "淘气兔 | "}}

>　　　　　　　　6//?r=⭐　&d=2024/11/30 17:24:45　&b=m43yuvps
## GitHub - coracoo/awesome_docker_cn: 上百款可docker部署的项目，包含项目地址、项目部署教程等。
https://github.com/coracoo/awesome_docker_cn
|
amprobe　docker可视化监控与管理工具
AutoCompose　一键转换现存docker
dockge　docker-compose可视化管理
docu　docker存储空间使用量分析和管理工具
yacht　docker可视化管理
