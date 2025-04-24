
>　　　　　　　　6//?r=⭐　&d=2024/9/25 15:32:00　&b=m1hjrnj9
## Docker 搭建留言板 sayhello 进阶使用教程
https://powersee.github.io/2023/02/about-sayhello/
|
docker run -d -p 5000:5000 --name sayhello powersee/sayhello

docker exec -it sayhello /bin/sh

select * from message;

.quit

>　　　　　　　　6//?r=⭐　&d=2024/10/23 15:16:24　&b=m2ljjg7s
## 【docker常用命令系列】Docker容器挂载目录原理方法适用场景示例详解 - 知乎
https://zhuanlan.zhihu.com/p/667272282
|

docker run -v /path/to/data:/app/data docker-image

>　　　　　　　　6//?r=⭐　&d=2024/9/26 13:38:20　&b=m1iv5c0p
## docker 进入，退出容器命令_进入r后怎样退到docker里面-CSDN博客
    https://blog.csdn.net/weixin_38982591/article/details/103989153
    |
    exit
    Ctrl + p + q

docker cp sayhello:/sayhello/data.db /mnt/5/7

>　　　　　　　　6//?r=⭐　&d=2024/9/25 15:33:07　&b=m1hjt371
## powersee/sayhello: A simple message board application build with Flask.
https://github.com/powersee/sayhello
|
sayhello

>　　　　　　　　6//?r=⭐　&d=2024/9/25 20:17:49　&b=m1htz86b
## node.js+express留言板功能实现示例 - DEVMAX
https://www.devmax.cn/a/80069.html
|

基于nodejs express art-template的留言板功能。包含列表界面、添加界面和发送留言功能。

\\192.168.1.162\KimMiD234\docker\overlay2\87eb1e816ad1b5ce0f48a24ed0d68bf1d60f472b1d06d6b8d1bef656e3ffec1b\diff\sayhello\data
镜像

\\192.168.1.162\KimMiD234\docker\overlay2\7b5424494c479ea33b84b9d521f01c96efaede872d76c24d98ac80a254114d55\diff\sayhello\data
容器，停止后更新

\\192.168.1.162\KimMiD234\docker\overlay2\87eb1e816ad1b5ce0f48a24ed0d68bf1d60f472b1d06d6b8d1bef656e3ffec1b\merged\sayhello\data
实时，不可用
