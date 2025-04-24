2024/3/8 10:59:07
https://ai4s.gpt-666.com/#/chat/1709866745597

我需要一段js代码：
测试下列网址的可用性，并在网址末尾用绿色文字注明响应时间。
https://cn.bing.com
https://www.bilibili.com
https://www.douyin.com
https://www.sohu.com
https://music.163.com

const urls = [
  "https://cn.bing.com",
  "https://www.bilibili.com",
  "https://www.douyin.com",
  "https://www.sohu.com",
  "https://music.163.com"
];

async function testUrlAvailability() {
  for (let url of urls) {
    let startTime = Date.now();
    try {
      let response = await fetch(url, { mode: 'no-cors' });
      let endTime = Date.now();
      console.log(`%c${url} is available. Response time: ${(endTime - startTime)} ms`, "color: green;");
    } catch (error) {
      console.log(`%c${url} is not available.`, "color: red;");
    }
  }
}

testUrlAvailability();

2024/3/10 16:42:07
https://ai4s.gpt-666.com/#/chat/1710060120288

请提供一个基于js的可折叠树状目录模板

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>可折叠树状目录</title>
<style>
    .tree {
        list-style-type: none;
        padding-left: 20px;
    }
    .tree li {
        cursor: pointer;
    }
    .tree ul {
        display: none;
        margin-left: 20px;
        padding-left: 0;
    }
</style>
</head>
<body>

<ul class="tree">
    <li>Root
        <ul>
            <li>Folder 1
                <ul>
                    <li>File 1</li>
                    <li>File 2</li>
                </ul>
            </li>
            <li>Folder 2
                <ul>
                    <li>File 3</li>
                    <li>File 4</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<script>
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('active');
            const ul = event.target.querySelector('ul');
            if (ul) {
                ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
</script>

</body>
</html>
