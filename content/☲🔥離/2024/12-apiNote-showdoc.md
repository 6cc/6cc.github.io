
>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:22:51　&b=m4kzsbu5
## 发布Notion到GitHub Pages | 听风
https://blog.febug.com/article/257a005e-9441-47b1-bfe0-f73585a7e9d3
|

等待一天，自动更新，细心的你可能已经发现，在main.yaml配置有一个定时器配置，每天23点自动更新。

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:23:32　&b=m4kzt7xb
## 整合 Slack
https://craigary.notion.site/Slack-df7bf63d33cb4aa3bfa44fae8943241c
|

将 Slack 消息发送到 Notion 数据库

>　　　　　　　　6//?r=⭐　&d=2024/12/15 21:03:25　&b=m4pm9v0l
## 使用 notion 作为静态博客的编辑器 | YouXam's Blog
https://youxam.one/posts/notion/using-the-notion-as-static-blog-editor.html
|

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:11:14　&b=m4kzde6u
## rainyear/HackVisionPro: 使用 NextJS + Notion API 实现的，支持多种部署方案的静态博客，无需服务器、零门槛搭建网站，为Notion和所有创作者设计。 (A static blog built with NextJS and Notion API, supporting multiple deployment options. No server required, zero threshold to set up a website. Designed for Notion and all creators.)
https://github.com/rainyear/HackVisionPro
|

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:06:55　&b=m4kz7ujk
## iOS 快捷指令搭配 Notion API，更快速地编辑内容 - 少数派
https://sspai.com/post/73645
|

讲道理，方法虽然可行，但是实际操作要把这么冗长数据结构转换为捷径，且只能通过图形化拖拽 UI 来实现（不好 debug），且偏偏 Notion API 的数据是偏向 bare structure 的（大量连续嵌套），实在是非常麻烦且枯燥。

我的实践中有两个 trick

1. 使用 Cloudflare Worker 作为代理，将 Notion API 的调用放入 Worker 的运行逻辑中，传递参数也可以自定义。

2. 在 Shortcuts App 中使用 Show Web Page 和 Get Contents of Web Page 这两个 actions，在网页变量（html 字符串）中用 Javascript 调用 Notion API ，传递到这两个 actions 即可。

上述的两个 tricks 都可以用 mac 的捷径 app 或其它的编辑器本地开发调试。

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:08:18　&b=m4kz9m3q
## Key033/RSS2Notion
https://github.com/Key033/RSS2Notion
|

>　　　　　　　　6//?r=⭐　&d=2024/12/12 15:08:31　&b=m4kz9wd3
## rainyear/dailybot: Daily Bot - Parse RSS and ChatGPT it.
https://github.com/rainyear/dailybot
|

>　　　　　　　　6//?r=⭐　&d=2024/12/11 14:54:31　&b=m4jjc19h
## RunApi介绍--ShowDoc
https://www.showdoc.com.cn/runapi/30291
|

http://runapi.showdoc.cc

>　　　　　　　　6//?r=⭐　&d=2024/12/11 14:56:59　&b=m4jjf7ud
## 开放API
https://www.showdoc.com.cn/page/102098
|
page_content
POST

>　　　　　　　　6//?r=⭐　&d=2024/12/11 14:59:12　&b=m4jji2ql
## ShowDoc 搭建及使用 - 一个非常适合IT团队的 API文档、技术文档工具_技术文档doc搭建-CSDN博客
https://blog.csdn.net/rrttyyui/article/details/119248548
|
日常备份数据：

创建sh文件 sh_backup_showdoc_db.sh 执行后按时间创建备份数据

cp /data/showDocData/Sqlite/showdoc.db.php /data/backupFile/showdoc$(date +%Y%m%d%H%M%S).db.php

配置定时任务contable

如果有需要可直接替换备份数据(名称要改成一致)
/data/showDocData/Sqlite/showdoc.db.php

>　　　　　　　　6//?r=⭐　&d=2024/12/11 14:29:27　&b=m4jifstm
## 开放API
https://www.showdoc.com.cn/page/102098
|

https://www.showdoc.cc/server/api/item/updateByApi

如果大家对IT类的文档管理工具感兴趣的话，还可以试试showdoc这款工具，这是一款针对IT人打造的数据文档、API文档整理工具，

api_key：
c9987addd5b351e9b2faf0df7fc988601772236552
api_token
38a17b30ae62772ff83a38bc1c6a6537470725699

>　　　　　　　　6//?r=⭐　&d=2024/12/11 14:41:48　&b=m4jivojn
## 开源文档协作工具：2024年10款评测 • Worktile社区
https://worktile.com/kb/p/3125818
|

6、ShowDoc

>　　　　　　　　6//?r=⭐　&d=2024/12/11 14:59:46　&b=m4jjisgq
## Docker方式安装--ShowDoc
https://www.showdoc.com.cn/help/65610
|
docker run -d --name showdoc --user=root  --restart=always --privileged=true -p 4999:80 \
-v /showdoc_data/html:/var/www/html/ star7th/showdoc

>　　　　　　　　6//?r=⭐　&d=2024/12/11 15:05:52　&b=m4jjqn14
## 使用Docker部署一个简洁易用的ShowDoc文档系统 - 小z博客 - SegmentFault 思否
https://segmentfault.com/a/1190000043791161
|

Docker部署后默认使用http://IP:4999进行访问，如果需要使用域名访问，可通过Nginx反向代理来完成。下方是一个nginx反向代理的配置实例：

showdoc/123456

>　　　　　　　　6//?r=⭐　&d=2024/12/14 14:42:27　&b=m4nt836r
## 开放API
https://www.showdoc.com.cn/page/102098
|

参数：
api_key
api_token
page_title
page_content
