
　6//?r=⭐　&d=2024/5/2 11:59:19　&b=lvopvs7x
Speech synthesiser
https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/
|
[61]'Microsoft Yunxi Online (Natural) - Chinese (Mainland)'
[64]'Microsoft Xiaobei Online (Natural) - Chinese (Northeastern Mandarin)'
[68]'Microsoft Xiaoni Online (Natural) - Chinese (Zhongyuan Mandarin Shaanxi)'
[180]'Microsoft Keita Online (Natural) - Japanese (Japan)'
[181]'Microsoft Nanami Online (Natural) - Japanese (Japan)'
https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/script.js

　6//?r=⭐　&d=2024/4/29 14:28:23　&b=lvkkvwve
javascript - Async Await Promise does not work : promiseresult is undefined - Stack Overflow
https://stackoverflow.com/questions/66951019/async-await-promise-does-not-work-promiseresult-is-undefined
|

　6//?r=⭐　&d=2024/4/29 14:32:02　&b=lvkl0lpn
javascript - Web speech API: Consistently get the supported speech synthesis voices on iOS safari - Stack Overflow
https://stackoverflow.com/questions/28948562/web-speech-api-consistently-get-the-supported-speech-synthesis-voices-on-ios-sa
|
speechSynthesis.cancel();
stopSpeechJob();
startSpeechJob();
|
Detecting a mobile browser
https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

　6//sp1it=1　6//?r=⭐　&d=2024/3/29 13:50:42　&💻=0　&b=luc8w1j8　&!=🌸
javascript - Changing the SpeechSynthesis voice not working - Stack Overflow
https://stackoverflow.com/questions/61016951/changing-the-speechsynthesis-voice-not-working

utterThis.voice=synth.getVoices()[61];

61云溪
64辽宁
68陕西

lang:
zh-CN-liaoning
zh-CN-shaanxi

name:
voiceURI:
Microsoft Xiaobei Online (Natural) - Chinese (Northeastern Mandarin)

Microsoft Yunxi Online (Natural) - Chinese (Mainland)

　6//sp1it=1　6//?r=⭐　&d=2024/2/2 14:50:38　&💻=0　&b=ls4adffw　&!=🌸
使用 JavaScript 原生 API 开发文本转语音（tts）开发 · excing/blog · Discussion #17
https://github.com/excing/blog/discussions/17

const { franc } = await import("https://cdn.jsdelivr.net/npm/franc@6.1.0/+esm");
  const lang = franc(text);

const voices = await new Promise(resolve => {
    const voices = synth.getVoices();
    resolve(voices);
  });

utterance.volume = options.volume || 1.0;

utterance.addEventListener('boundary', (event) => {
  const { charIndex, elapsedTime } = event;
  const progress = charIndex / utterance.text.length;
  console.log(`当前朗读进度：${progress * 100}%`);
});

<button onclick="textToSpeech('当鼠标在页面上移动时', 'zh-CN-liaoning', 'Microsoft Xiaobei Online (Natural) - Chinese (Northeastern Mandarin) (zh-CN-liaoning)')">Xiaobei</button>

textToSpeech('三观相近之人的互相吸引。', 'zh-CN-liaoning', 'Microsoft Yunxi Online (Natural) - Chinese (Mainland)');

function textToSpeech(text, lang, voiceURI) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  const voices = synth.getVoices();
  const voice = voices.find(v => v.voiceURI === voiceURI);
  utterance.voice = voice;
  utterance.rate = 1;
  synth.speak(utterance);
}

　6//sp1it=1　6//?r=⭐　&d=2024/3/3 16:09:34　&💻=0　&b=ltb8ehv9　&!=🌸
Text To Speech - 在线文本转语音
https://www.text-to-speech.cn/

上海河南山东

　6//sp1it=1　6//?r=⭐⭐　&d=2024/2/2 14:20:54　&💻=0　&b=ls49b6qn　&!=🌸
Zhongyuan Shaanxi Text to Speech Service by SpeechGen (zh-CN-shaanxi)
https://speechgen.io/en/tts-chinese-zhongyuan-mandarin-shaanxi-simplified/

　6//sp1it=1　6//?r=⭐　&d=2024/3/3 11:13:06　&💻=0　&b=ltaxt81p　&!=🌸
微软-文字转语音.语音合成--逆向爬虫实战 - 知乎
https://zhuanlan.zhihu.com/p/611561836

　6//sp1it=1　6//?r=⭐　&d=2024/3/3 17:45:34　&💻=0　&b=ltbbtxuf　&!=🌸
带有播放、暂停、停止按钮以及选择语言和语音的SpeechSynthesisUtterance脚本-腾讯云开发者社区-腾讯云
https://cloud.tencent.com/developer/ask/sof/1429716/answer/1961304

　6//sp1it=1　6//?r=⭐　&d=2024/3/3 17:46:01　&💻=0　&b=ltbbuizr　&!=🌸
Text to speech player with buttons Play, Pause, Stop and voice choice | <alebal web Blog>
https://www.alebalweb-blog.com/85-text-to-speech-player-with-buttons-play-pause-stop-and-voice-choice.html

if(synth.speaking){ /* stop narration */
                /* for safari */
                flag = false;
                synth.cancel();
            }

utterance.onend = function(){
                    flag = false;
                };

https://jsfiddle.net/sb5wfomk/2/

　6//sp1it=1　6//?r=⭐　&d=2024/3/4 10:11:13　&💻=0　&b=ltcb1ia7　&!=🌸
Text to speech demo
https://www.alebalweb-blog.com/text-to-speech-demo/

　6//sp1it=1　6//?r=⭐　&d=2024/2/2 10:27:23　&💻=0　&b=ls40yw16　&!=🌸
歴代演目：SAMURAI SPIRITS OFFICIAL WEBSITE
https://samuraianiv.snk-corp.co.jp/title/samurai-spirits4/index.php

https://samuraianiv.snk-corp.co.jp/title/samurai-spirits4/img/title.jpg

sennanahyaku hachijuu kyuu
一七八九年
kansei no kaikaku ga hitoodoriji wa appaku se shi koro
寛政の改革が人々を圧迫せし頃
hitotsu no mashou no tamashii ga
一つの魔性の魂が
rinka wa age te yomigaetsu ta .
燐火を上げて甦った。
daichi wa yurugashi shutsugen shi ta shiro wa
大地を揺るがし 出現した城は
shimabara no hitoodoriji wa wazawai ni some te itsu ta .
島原の人々を 災いに染めていった。
soreni koou suru ga gotoku
それに呼応するが如く
ko ga mi wa shura ni kae
己が身を修羅に変え
sadame ni ikiru mono tachi ga araware ta .
定めに生きる者達が現れた。

　6//sp1it=1　6//?r=⭐　&d=2024/2/2 11:02:42　&💻=0　&b=ls428awg　&!=🌸
JavaScript speech synthesis cheatsheet
https://devhints.io/js-speech

function speak (message) {
  var msg = new SpeechSynthesisUtterance(message)
  var voices = window.speechSynthesis.getVoices()
  msg.lang = 'zh-CN-liaoning';
  window.speechSynthesis.speak(msg)
}

speak('只能保证玛修能像正常人一样活到七老八十。');

　6//sp1it=1　6//?r=⭐　&d=2024/2/2 14:13:38　&💻=0　&b=ls491tu8　&!=🌸
edge-tts微软文本转语音库，来看看这些语音你是不是很熟悉 - 知乎
https://zhuanlan.zhihu.com/p/619612276
