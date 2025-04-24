Error response from daemon: Get "https://registry-1.docker.io/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)

>　　　　　　　　6//?r=⭐　&d=2024/9/25 09:56:53　&b=m1h7sp7t
## 国内的 Docker Hub 镜像加速器，由国内教育机构与各大云服务商提供的镜像加速服务 | Dockerized 实践 https://github.com/y0ngb1n/dockerized
https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6
|
~~Docker 镜像代理　https://dockerproxy.com~~
~~科大镜像站　https://docker.mirrors.ustc.edu.cn　仅供内部访问~~
~~南京大学镜像站　https://docker.nju.edu.cn~~

DaoCloud 镜像站　https://docker.m.daocloud.io　白名单模式
~~Azure 中国镜像　https://dockerhub.azk8s.cn　仅供内部访问~~
~~百度云　https://mirror.baidubce.com~~
~~中科院软件所镜像站　https://mirror.iscas.ac.cn~~

　x：
每次拉取一次docker,都会诅咒这个该死的组织

>　　　　　　　　6//?r=⭐　&d=2024/9/20 14:19:43　&b=m1abzfpb
## Docker更换镜像源（附国内可用镜像源地址） | Patrick's Blog
https://patzer0.com/archives/configure-docker-registry-mirrors-with-mirrors-available-in-cn-mainland
|
https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6
https://docker.1panel.live
~~https://hub.rat.dev~~

NICE
推荐个github上的源，https://docker.zlzlme.cloudns.ph/

>　　　　　　　　6//?r=⭐　&d=2024/9/26 11:18:56　&b=m1iq62mm
## 无法拉取 Docker 镜像的另一种解决方案
https://blog.powersee.top/2023/09/docker-pull-save-load/
|

>　　　　　　　　6//?r=⭐　&d=2024/9/21 12:08:32　&b=m1bmql35
## TheTNB/proxy-conf: 一些树新蜂使用的反向代理配置
https://github.com/TheTNB/proxy-conf
|

一些树新蜂使用的反向代理配置

>　　　　　　　　6//?r=⭐　&d=2024/9/21 12:15:53　&b=m1bn01vp
## 国内无法拉取Docker镜像了？这些方法拯救你的Docker-腾讯云开发者社区-腾讯云
https://cloud.tencent.com/developer/article/2434428
|

Daocloud 镜像加速器地址：https://docker.m.daocloud.io

>　　　　　　　　6//?r=⭐　&d=2024/9/21 12:12:01　&b=m1bmv2d4
## 突发，Docker镜像仓库全线阵亡，无法拉取Docker镜像。教程已出！！！ - 哔哩哔哩
https://www.bilibili.com/read/cv35164497/?jump_opus=1
|

自主知识产权的国产Docker将会横空出世

>　　　　　　　　6//?r=⭐　&d=2024/9/20 13:50:01　&b=m1aax8vi
## 解决docker拉取镜像报错：Error response from daemon: Get “https://registry-1.docker.io/v2/“: dial tcp-CSDN博客
https://blog.csdn.net/weixin_47316183/article/details/131987609
|
vim /etc/docker/daemon.json

{
 "registry-mirrors": ["https://registry.docker-cn.com"]
}

# 重启Docker生效
systemctl restart docker

vim /etc/resolv.conf
新增DNS：nameserver 114.114.114.114

>　　　　　　　　6//?r=⭐　&d=2024/9/20 14:37:46　&b=m1acmnjq
## 从Docker拉取镜像一直失败超时？这些解决方案帮你解决烦恼_docker拉取镜像超时-CSDN博客
https://blog.csdn.net/weixin_50160384/article/details/139861337
|

从Docker拉取镜像一直失败超时？这些解决方案帮你解决烦恼

>　　　　　　　　6//?r=⭐　&d=2024/9/20 13:47:51　&b=m1aaugms
## docker pull 报错Get “https://registry-1.docker.io/v2/“: net/http: request canceled while waiting for c_docker request canceled while waiting for connecti-CSDN博客
https://blog.csdn.net/jhgj56/article/details/142209517
|

>　　　　　　　　6//?r=⭐　&d=2024/9/20 13:50:29　&b=m1aaxud7
## 解决Docker在pull的时候报错Get https://registry-1.docker.io/v2/: net/http: request canceled (Client.Timeout e_docker login request canceled (client.timeout exce-CSDN博客
https://blog.csdn.net/Piconjo/article/details/105037514
|

解决Docker在pull的时候报错Get https://registry-1.docker.io/v2/: net/http: request canceled (Client.Timeout e

>　　　　　　　　6//?r=⭐　&d=2024/9/20 14:40:18　&b=m1acpwry
## Docker Hub - USTC Mirror Help
https://mirrors.ustc.edu.cn/help/dockerhub.html
|

Docker Hub¶

>　　　　　　　　6//?r=⭐　&d=2024/9/19 14:01:36　&b=m18vwaet
## 彻底解决 iStoreOS Docker 问题！_网络存储_什么值得买
https://post.smzdm.com/p/al8dox2o/
|
iStroe增强
