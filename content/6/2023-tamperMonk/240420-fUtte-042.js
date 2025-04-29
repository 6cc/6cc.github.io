// ==UserScript==
// @name        f-Utte-042
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 2024/4/18 04:19:03
// ==/UserScript==

evalText();

function evalText() {

  sideVertialBar();
  topHorizonBar();
  pierceElem();
  let elementContent = '';
  let cpImageSource = '';

  document.addEventListener('mouseover', function(event) {
    const hoveredElement = event.target;
    elementContent = hoveredElement.innerText ||
    hoveredElement.href || hoveredElement.src ||
    hoveredElement.value;
    const topHorizonPara = document.querySelector('#topHorizonPara');
    topHorizonPara.innerText = '[Tag]' + hoveredElement.tagName + ' ' +
      elementContent + ' [class]' + hoveredElement.className;

    if (hoveredElement.localName == 'cp-article-image') {
      cpImageSource = hoveredElement._imageSource;
      const imgModeSwtchr = hoveredElement.shadowRoot.querySelector('a.image_switchModeLinkContainer');
      if (imgModeSwtchr.querySelector('input.shadowInput') == null) {
        iMpaleShadowN(imgModeSwtchr);
      }
    } else if (hoveredElement.localName == 'cp-article') {
      const cpArticle = hoveredElement.shadowRoot.querySelectorAll('p[data-t]');
      for (const item of cpArticle) {
        if (item.innerText !== '' && item.querySelector('input.shadowInput') == null) {
          iMpaleShadowN(item);
        }
      }
    }

    const enableHover = document.querySelector('#enableHover');
    if ( hoveredElement.tagName !== 'body' &&
        hoveredElement.className !== 'tooltiptext' &&
        enableHover.checked ) {
      const divFloat = document.querySelector('#divFloat');
      divFloat.style.top = hoveredElement.offsetTop - 1 -
      hoveredElement.offsetHeight + 'px';
      divFloat.style.left = hoveredElement.offsetLeft - 1 + 'px';
      const utterText = divFloat.querySelector('#utterText');
      utterText.value = elementContent;
    }
  });

  document.addEventListener('keydown', function(event) {
    switch (event.altKey && event.key) {
      case '[':
        console.log(typeof cpImageSource);
        break;
      case ']':
        ocrSpace(elementContent);
        break;
      case ',':
        if ( matchHref() === 'msnCn') {
          elementContent = cpImageSource;
        }
        navigator.clipboard.writeText(titleUrlSelecTime (elementContent));
        artIculate(document.title.slice(0, 10) + '共' + 0 + '张屠', 64);
        break;
      case '\\':
        const entityImg = matchHref();
        const imgCount = 0;
        const virtualClipboard = `6//?r=⭐\n${document.title}\n${window.location.href}\n|\n${entityImg}${imgCount}图
        `;
        const topHorizonPara = document.querySelector('#topHorizonPara');
        topHorizonPara.title = virtualClipboard;
        break
    }
  });

  function topHorizonBar() {
    const topBar = document.createElement('div');
    topBar.id = 'topBar';
    topBar.className = 'tooltiptext';
    topBar.style.position = 'fixed';
    topBar.style.overflow = 'auto';
    topBar.style.zIndex = 702;
    topBar.style.opacity = .9;
    topBar.style.backgroundColor = 'rgba(34,34,34,.9)';
    topBar.style.transition = 'height 0.3s';
    topBar.style.left = '40px';
    topBar.style.top = '0';
    topBar.style.width = '1024px';
    topBar.style.height = '40px';
    document.body.appendChild(topBar);

    let isHFixed = false;
    let isHExpanded = false;

    document.addEventListener('mousemove', (event) => {
      if (!isHFixed) {
        const distanceToEdge = event.clientY;
        if (distanceToEdge < 3 && !isHExpanded) {
          topBar.style.height = '40px';
          isHExpanded = true;
        } else if (distanceToEdge > 40 && isHExpanded) {
            topBar.style.height = '0px';
            isHExpanded = false;
          }
      }
    });

    const pinHorizon = document.createElement('input');
    pinHorizon.type = 'checkbox';
    pinHorizon.className = 'tooltiptext';
    pinHorizon.style.position = 'absolute';
    pinHorizon.style.left = '40px';
    pinHorizon.addEventListener('change', () => {
      isHFixed = pinHorizon.checked;
      if (isHFixed) {
        sidebar.style.width = '40px';
        isHExpanded = true;
      }
    });
    topBar.appendChild(pinHorizon);

    const topHorizonPara = document.createElement('p');
    topHorizonPara.id = 'topHorizonPara';
    topHorizonPara.style.color = '#ADFF2F';
    topBar.appendChild(topHorizonPara);
  }

  function sideVertialBar() {
    const sidebar = document.createElement('div');
    sidebar.style.position = 'fixed';
    sidebar.style.zIndex = 702;
    sidebar.style.overflow = 'auto';
    sidebar.style.opacity = .9;
    sidebar.style.backgroundColor = 'rgba(241,241,241,.9)';
    sidebar.style.transition = 'width 0.3s';
    sidebar.style.left = '0';
    sidebar.style.top = '40px';
    sidebar.style.width = '0px';
    sidebar.style.height = '768px';
    document.body.appendChild(sidebar);

    let isVFixed = false;
    let isVExpanded = false;

    document.addEventListener('mousemove', (event) => {
      if (!isVFixed) {
        const distanceToEdge = event.clientX;
        if (distanceToEdge < 3 && !isVExpanded) {
          sidebar.style.width = '40px';
          isVExpanded = true;
        } else if (distanceToEdge > 40 && isVExpanded) {
          sidebar.style.width = '0px';
          isVExpanded = false;
        }
      }
    });

  const sideVertialPara = document.createElement('p');
  sideVertialPara.className = 'tooltiptext';
  sideVertialPara.style.color = '#000';
  sideVertialPara.innerText = 'sidebar-装睡';
  sidebar.appendChild(sideVertialPara);

  const pinVertial = document.createElement('input');
  pinVertial.type = 'checkbox';
  pinVertial.style.position = 'absolute';
  pinVertial.style.top = '40px';
  pinVertial.className = 'tooltiptext';
  pinVertial.addEventListener('change', () => {
    isVFixed = pinVertial.checked;
    if (isVFixed) {
        sidebar.style.width = '40px';
        isVExpanded = true;
    }
  });
  sidebar.appendChild(pinVertial);

  const enableHover = document.createElement('input');
  enableHover.type = 'checkbox';
  enableHover.addEventListener('change', () => {
    const divFloat = document.querySelector('#divFloat');
    divFloat.style.display = enableHover.checked ? 'block' : 'none';
  });
  enableHover.style.position = 'absolute';
  enableHover.style.top = '80px';
  enableHover.id = 'enableHover';
  enableHover.className = 'tooltiptext';
  sidebar.appendChild(enableHover);
}

  function pierceElem() {
    const divFloat = document.createElement('div');
    divFloat.id = 'divFloat';
    divFloat.className = 'tooltiptext';
    divFloat.style.position = 'absolute';
    divFloat.style.overflow = 'auto';
    divFloat.style.zIndex = '1';
    divFloat.style.top = '100%';
    divFloat.style.left = '50%';
    divFloat.style.backgroundColor = 'rgba(241,241,241,.9)';
    divFloat.style.boxShadow = 'inset 0 -3em 3em rgba(0, 0, 0, 0.1),' +
    '0 0 0 2px rgb(255, 255, 255),' +
    '0.3em 0.3em 1em rgba(0, 0, 0, 0.3)';
    divFloat.style.display = 'none';
    document.body.appendChild(divFloat);

    const utterText = document.createElement('textarea');
    utterText.id = 'utterText';
    utterText.className = 'tooltiptext';
    divFloat.appendChild(utterText);

    const br = document.createElement('br');
    divFloat.appendChild(br);
    const bUtterance = document.createElement('button');
    bUtterance.className = 'tooltiptext';
    bUtterance.textContent = 'utterance';

    bUtterance.addEventListener('mouseover', function() {
      if (utterText.value.length <= 40) {
        artIculate(utterText.value, 68);
      }
    });
    bUtterance.addEventListener('mouseup', function() {
      artIculate(utterText.value);
    });

    divFloat.appendChild(bUtterance);
    const hr = document.createElement('hr');
    divFloat.appendChild(hr);
    const elemSpec = document.createElement('pre');
    elemSpec.id = 'elemSpec';
    divFloat.appendChild(elemSpec);
  }
}

function titleUrlSelecTime(elemContent) {
      const resultCombine = `
　6//?r=⭐　&d=${new Date().toLocaleString()}　&b=${(Date.now()).toString(36)}
${document.title}
${window.location.href}
|
${window.getSelection().toString()}
${elemContent}
`;
      return resultCombine;
    }

    function matchHref() {
      const msnCn = /\bhttps?:\/\/www\.msn\.cn\/zh-cn\/\w+\/\w+\/[%-\w]+\/[-\w]+/i;
      const youLiao = /\bhttps?:\/\/(pc\.yiyouliao|alphago\.sndo)\.com\/microsoft\/article\/rivers\/newsfeed\/\d+\/\w+\.html/i;
      switch (true) {
        case msnCn.test(window.location.href):
          return 'msnCn';
          break;
        case msnCn.test(window.location.href) && param == 'allImgS':
          const msnArticleImages = retrieveMsn();
          return msnArticleImages;
          break;
        default:
          return '';
          break;
      }
    }

    function retrieveMsn() {
      const msnCpArticle = document.querySelector('cp-article');
      const map1 = msnCpArticle._data.articleImages;
      let entityImg = '';
      let imgCount = 0;
      const iterator1 = map1[Symbol.iterator]();
      for (const item of iterator1) {
        entityImg += item[1].url + '\n';
        imgCount ++;
      }
      return entityImg;
    }

    async function ocrSpace(url) {
      const preFix = 'https://api.ocr.space/parse/imageurl?apikey=K88766003188957&url=';
      const param = '&language=chs&OCREngine=2';
      try {
        // 发送 API 请求
        const response = await fetch(preFix + url + param);
        const data = await response.json();
        // 获取 OCR 解析结果
        const parsedText = data.ParsedResults[0].ParsedText;
        console.table(data.ParsedResults[0]);
        artIculate(parsedText, 64);
      } catch (error) {
        console.error(error);
      }
    }

function iMpaleShadowN(hElem) {
    const shadowInput = document.createElement('input');
    shadowInput.type = 'checkbox';
    shadowInput.className = 'shadowInput';
    shadowInput.addEventListener('mouseover', () => {
      shadowInput.checked = ! shadowInput.checked;
      shadowInput.title = shadowInput.style.top + ' ' + shadowInput.style.top;
    });
    hElem.insertBefore(shadowInput, hElem.firstChild);
  }

function artIculate(text, voiceIndex) {
  //appreciate docta_faustus https://stackoverflow.com/questions/61016951/changing-the-speechsynthesis-voice-not-working
  if (voiceLoaded()) {
    speak();
  } else {
    speechSynthesis.addEventListener('voiceschanged', speak);
  }

  function speak() {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = getTtsVoice();
    speechSynthesis.speak(utterance);
  }

  function getTtsVoice() {
    voiceIndex = voiceIndex || 61;
    return speechSynthesis.getVoices()[voiceIndex];
  }

  function voiceLoaded() {
    return speechSynthesis.getVoices().length;
  }
}
