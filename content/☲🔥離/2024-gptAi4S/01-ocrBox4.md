
　6//?r=⭐　&d=2024/4/18 18:09:50　&b=lv52yc5b
AiChat ai.gptyylx.com
https://ai4s.gpt-666.com/#/chat/1712892001827

// 创建四个文本框
const input1 = document.createElement('input');
input1.type = 'text';
input1.value = 'https://api.ocr.space/parse/imageurl?apikey=K88766003188957&url=';
document.body.appendChild(input1);

const input2 = document.createElement('input');
input2.type = 'text';
input2.placeholder = '粘贴图片 URL 这里';
document.body.appendChild(input2);

const input3 = document.createElement('input');
input3.type = 'text';
input3.value = '&language=chs&OCREngine=2';
document.body.appendChild(input3);

const input4 = document.createElement('input');
input4.type = 'text';
input4.placeholder = 'OCR 解析结果将显示在这里';
document.body.appendChild(input4);

// 监听第二个文本框输入事件
input2.addEventListener('input', async () => {
    // 合并成 API 请求链接
    const apiUrl = input1.value + input2.value + input3.value;

    try {
        // 发送 API 请求
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 获取 OCR 解析结果
        const parsedText = data.ParsedResults[0].ParsedText;

        // 输出到第四个文本框
        input4.value = parsedText;

        // 使用 TTS 云服务朗读
        const speech = new SpeechSynthesisUtterance(parsedText);
        speech.lang = 'zh-CN';
        speechSynthesis.speak(speech);

        // 写入剪贴板
        navigator.clipboard.writeText(parsedText);
    } catch (error) {
        console.error(error);
    }
});

2024/1/26 14:57:53
gpt-3.5-turbo
https://ai4s.gpt-666.com/#/chat/1706077145915

请帮我编写一段js代码，实现下面的功能：
在网页上创建四个文本框，
第一个文本框的内容是
https://api.ocr.space/parse/imageurl?apikey=K88766003188957&url=
第二个文本框用于粘贴图片Url，内容是
https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1hdbg9.img
第三个文本框的内容是
&language=chs&OCREngine=2
当第二个文本框获得内容时，执行一二三号文本框合并成的Api，
返回Json中的.ParsedResults[0].ParsedText键值的内容输出到第四个文本框，
同时用TTS云溪朗读，并写入剪切板。

// 创建四个文本框元素
var textBox1 = document.createElement('input');
textBox1.type = 'text';
var textBox2 = document.createElement('input');
textBox2.type = 'text';
var textBox3 = document.createElement('input');
textBox3.type = 'text';
var textBox4 = document.createElement('input');
textBox4.type = 'text';

// 将文本框添加到页面中合适的位置
document.body.appendChild(textBox1);
document.body.appendChild(textBox2);
document.body.appendChild(textBox3);
document.body.appendChild(textBox4);

// 监听第二个文本框的内容变化事件
textBox2.addEventListener('input', function() {
  // 获取第二个文本框的值
  var imageUrl = textBox2.value;
  
  // 合并三个文本框的内容为API URL
  var apiUrl = textBox1.value + imageUrl + textBox3.value;
  
  // 发起API请求
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // 提取返回JSON中的.ParsedResults[0].ParsedText键值
      var parsedText = data.ParsedResults[0].ParsedText;
      
      // 输出到第四个文本框
      textBox4.value = parsedText;
      
      // 使用TTS云服务朗读
      var speech = new SpeechSynthesisUtterance(parsedText);
      speechSynthesis.speak(speech);
      
      // 将结果写入剪贴板
      navigator.clipboard.writeText(parsedText)
        .then(() => console.log('已复制到剪贴板'))
        .catch(err => console.error('无法复制到剪贴板：', err));
    })
    .catch(error => console.error('API请求失败：', error));
});
