
>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:41:11　&b=m4l0fww0
## 科学上网：利用 Docker 搭建 v2raya 客户端 - LazyPool's Blog
https://lazypool-blog.netlify.app/2024/05/13/docker/
|

docker run -d \
  --restart=always \
  --privileged \
  --network=host \
  --name v2raya \
  -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
  -e V2RAYA_V2RAY_BIN=/usr/local/bin/v2ray \
  -e V2RAYA_NFTABLES_SUPPORT=off \
  -e IPTABLES_MODE=legacy \
  -v /lib/modules:/lib/modules:ro \
  -v /etc/resolv.conf:/etc/resolv.conf \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2raya

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:44:02　&b=m4l0jkrs
## 使用Docker部署V2Ray实现高效网络代理的详细教程 - 云原生实践
https://www.oryoy.com/news/shi-yong-docker-bu-shu-v2ray-shi-xian-gao-xiao-wang-luo-dai-li-de-xiang-xi-jiao-cheng.html
|

docker run -d --name v2ray \
  -v /etc/v2ray/config.json:/etc/v2ray/config.json \
  -p 1080:1080 \
  -p 443:443 \
  v2fly/v2ray-core run -config=/etc/v2ray/config.json

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:44:15　&b=m4l0juwy
## 使用Docker容器部署V2Ray：详解配置与运行步骤 - 云原生实践
https://www.oryoy.com/news/shi-yong-docker-rong-qi-bu-shu-v2ray-xiang-jie-pei-zhi-yu-yun-xing-bu-zhou.html
|

docker run -d --name v2ray -p 1080:1080 -v $(pwd)/config.json:/etc/v2ray/config.json v2ray

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:41:59　&b=m4l0gxlk
## v2ray docker 部署完整指南 | Clash中文教程网
https://clashv2ray.com/21982.html
|

docker run -d –name v2ray -v $(pwd)/config.json:/etc/v2ray/config.json -p 10086:10086 v2ray/official

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:50:08　&b=m4l0rfc0
## Docker 部署 V2Ray | 新 V2Ray 白话文指南
https://guide.v2fly.org/app/docker-deploy-v2ray.html#%E6%89%8B%E5%8A%A8%E6%9B%B4%E6%96%B0
|
https://github.com/v2fly/v2ray-examples
$ sudo docker run -d --name v2ray -e TZ=Asia/Shanghai -v /etc/v2ray:/etc/v2ray -p 8888:8888 --restart always v2fly/v2fly-core run -c /etc/v2ray/config.json
