// ==UserScript==
// @name        floatUtterance-0.606-2
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 2024/6/03 06:01:00
// ==/UserScript==

const bottomHorizonBar = () => {
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
  topBar.style.bottom = '0';
  topBar.style.width = '960px';
  topBar.style.height = '1px';
  document.body.appendChild(topBar);

  let isHFixed = false;
  let isHExpanded = false;

  document.addEventListener('mouseover', (event) => {
    if (!isHFixed) {
      const distanceToEdge = event.clientY;
      if (distanceToEdge > window.innerHeight - 10 && !isHExpanded) {
        topBar.style.height = '200px';
        isHExpanded = true;
      } else if (distanceToEdge < window.innerHeight - 200 && isHExpanded) {
        topBar.style.height = '1px';
        isHExpanded = false;
      }
    }
  });

  const topHorizonPara = document.createElement('label');
  topHorizonPara.id = 'topHorizonPara';
  topHorizonPara.textContent = 'Pin';
  topHorizonPara.style.color = '#ADFF2F';
  topBar.appendChild(topHorizonPara);

  const pinHorizon = document.createElement('input');
  pinHorizon.type = 'checkbox';
  pinHorizon.className = 'tooltiptext';
  pinHorizon.style.left = '40px';
  pinHorizon.addEventListener('change', () => {
    isHFixed = pinHorizon.checked;
    if (isHFixed) {
      topBar.style.height = '200px';
      isHExpanded = true;
    }
  });
  topHorizonPara.appendChild(pinHorizon);

  const buttonInput = document.createElement('button');
  buttonInput.textContent = 'run';
  buttonInput.addEventListener('mouseup', function() {
    getFile(urlInput.value, textareaIde);
  });
  topHorizonPara.appendChild(buttonInput);

  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.size = '60';
  urlInput.value = 'https://6cc.github.io/2024/05-n.md';
  topHorizonPara.appendChild(urlInput);

  const textareaIde = document.createElement('textarea');
  textareaIde.id = 'textareaIde';
  textareaIde.className = 'textareaIde';
  textareaIde.cols = '125';
  textareaIde.rows = '10';
  textareaIde.style.border = '2px dashed #ADFF2F';
  textareaIde.style.margin = '0 0 0 1px';
  textareaIde.addEventListener('change', () => {
    console.log('textareaIde changed');
  });
  topBar.appendChild(textareaIde);

  const buttonGo = document.createElement('button');
  buttonGo.textContent = 'go';
  buttonGo.addEventListener('mouseup', function() {
    getFile(urlInput.value, textareaIde);
  });
  topHorizonPara.appendChild(buttonGo);

};

const sideVertialBar = () => {
  const sidebar = document.createElement('div');
  sidebar.id = 'sidebar';
  sidebar.style.position = 'fixed';
  sidebar.style.zIndex = 702;
  sidebar.style.overflow = 'auto';
  sidebar.style.transition = 'width 0.3s';
  sidebar.style.opacity = .9;
  sidebar.style.backgroundColor = 'rgba(241,241,241,.9)';
  sidebar.style.borderWidth = '1px';
  sidebar.style.borderStyle = 'dashed';
  sidebar.style.borderColor = '#1E90FF';
  sidebar.style.right = '0';
  sidebar.style.top = '64px';
  sidebar.style.width = '0px';
  sidebar.style.height = '640px';
  document.body.appendChild(sidebar);

  let isVFixed = false;
  let isVExpanded = false;

  document.addEventListener('mouseover', (event) => {
    if (!isVFixed) {
      const distanceToEdge = event.clientX;
      if (distanceToEdge > window.innerWidth - 19 && !isVExpanded) {
        sidebar.style.width = '284px';
        isVExpanded = true;

        const windowLocation = matchHref();
        switch (windowLocation) {
            case 'msnCn':
            const imagesloadedExist = document.querySelector('script#imagesloadedPkgdMinJs');
            const msnImgS = new articleMsn().retrieveMsn();
            const imgExist = sidebar.querySelector('div.dynamic-container');
            if (imagesloadedExist !== null && imgExist === null) {
              const adjacentAccumulate = document.createElement('div');
              adjacentAccumulate.className = 'dynamic-container';
              adjacentAccumulate.style.padding = '4px';
              reloadBullet('', msnImgS, adjacentAccumulate);
              sidebar.appendChild(adjacentAccumulate);
            }
            break;
            default:
            console.log('general page except MSN');
            break;
        }

      } else if (distanceToEdge < window.innerWidth - 300 && isVExpanded) {
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
  pinVertial.style.top = '40px';
  pinVertial.className = 'tooltiptext';
  pinVertial.addEventListener('change', () => {
    isVFixed = pinVertial.checked;
    if (isVFixed) {
      sidebar.style.width = '284px';
      isVExpanded = true;
    }
  });
  sidebar.appendChild(pinVertial);

  const enableHover = document.createElement('input');
  enableHover.type = 'checkbox';
  enableHover.style.top = '80px';
  enableHover.id = 'enableHover';
  enableHover.className = 'tooltiptext';
  sidebar.appendChild(enableHover);
};

const pierceElem = (hoverElem) => {
  const divFloat = document.createElement('div');
  divFloat.id = 'divFloat';
  divFloat.className = 'tooltiptext';
  divFloat.style.position = 'absolute';
  divFloat.style.overflow = 'auto';
  divFloat.style.zIndex = '9999';
  divFloat.style.backgroundColor = 'rgba(241,241,241,.9)';
  divFloat.style.boxShadow = 'inset 0 -3em 3em rgba(0, 0, 0, 0.1),' +
    '0 0 0 2px rgb(255, 255, 255),' + '0.3em 0.3em 1em rgba(0, 0, 0, 0.3)';

  const utterText = document.createElement('textarea');
  utterText.id = 'utterText';
  utterText.className = 'tooltiptext';
  utterText.value = hoverElem.innerText;
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

  const buttJp = document.createElement('button');
  buttJp.className = 'tooltiptext';
  buttJp.textContent = 'buttJp';
  buttJp.addEventListener('mouseover', function() {
    if (utterText.value.length <= 40) {
      artIculate(utterText.value, 180);
    }
  });
  buttJp.addEventListener('mouseup', function() {
    artIculate(utterText.value, 180);
  });
  divFloat.appendChild(buttJp);

  const buttOcr = document.createElement('button');
  buttOcr.className = 'tooltiptext';
  buttOcr.textContent = 'ocrSpace';
  const conditImg = hoverElem.localName === 'img';
  const conditMsnArticle = matchHref() === 'msnCn' && hoverElem.localName === 'div'
  && hoverElem.className === 'article-image-container';
  let conditImgSrc = '';
  if (conditImg) {
    conditImgSrc = hoverElem.src;
  } else if (conditMsnArticle) {
    conditImgSrc = hoverElem.querySelector('img.article-image').src;
  }
  buttOcr.addEventListener('mouseover', function() {
    const srcTrim = filterUrl ('trim', conditImgSrc);
    ocrSpace(srcTrim, utterText);
  });
  buttOcr.addEventListener('mouseup', function() {
    buttOcr.title = filterUrl ('trim', conditImgSrc);
  });
  divFloat.appendChild(buttOcr);

  const hr = document.createElement('hr');
  divFloat.appendChild(hr);
  const elemSpec = document.createElement('pre');
  elemSpec.id = 'elemSpec';
  divFloat.appendChild(elemSpec);
  if (conditImg) {
    hoverElem.parentElement.insertBefore(divFloat, hoverElem);
  } else if (conditMsnArticle) {
    hoverElem.insertBefore(divFloat, hoverElem.firstChild);
  }
};

const getFile = (fileURL, targetElem) => {
  (async () => {
    const response = await fetch(fileURL);//Error gets thrown here, because the asset does not exist in the current code state.
    const docData = await response.text();
    const parsedObject = decomposeReconstruct(docData);
    console.log(parsedObject);
    targetElem.innerText = docData;
  })();
};

const decomposeReconstruct = (rawInput) => {
  const linesArray = rawInput.trim().split('>　　　　　　　　');
  const unitCellS = [];
  const usurpFrame = document.querySelector('float-window#usurpFrame');

  for (const item of linesArray) {
    const cellLineS = item.trim().split('\n');
    const mergedObject = adjacentAccumulate(cellLineS);
    const unitCard = document.createElement('div');
    unitCard.className = 'unitCard';
    usurpFrame.appendChild(unitCard);

    for (const element of mergedObject) {
      const unitSuit = assemblePackage(element[0], element[1]);
      unitCard.appendChild(unitSuit);
    }

    unitCellS.push(mergedObject);
  }
  return unitCellS;
};

const adjacentAccumulate = (arrayInput) => {
  const arrayOutput = [];
  let temp = [];

  arrayInput.forEach((item, index) => {
    if (filterUrl('', item) === 'img') {
      if (temp.length > 0) {
        temp.push(item);
      } else {
        temp = [item];
      }

      if (index === arrayInput.length - 1 || filterUrl('', arrayInput[index + 1]) !== 'img') {
        arrayOutput.push(["img", temp.length > 1 ? temp.slice() : temp[0]]);
        temp = [];
      }
    } else {
      arrayOutput.push(["", item]);
    }
  });
  return arrayOutput;
};

//appreciate txtfiddle https://txtfiddle.com/~i44veub/remove-empty-lines
//appreciate chatGpt 4o

const titleUrlSelecTime = (elemContent) => {
  const resultCombine = `
>　　　　　　　　6//?r=⭐　&d=${new Date().toLocaleString()}　&b=${(Date.now()).toString(36)}
## ${document.title}
${window.location.href}
|
${window.getSelection().toString()}
${elemContent}
`;
  return resultCombine;
};

const matchHref = () => {
  const msnCn = /\bhttps?:\/\/www\.msn\.cn\/zh-cn\/\w+\/\w+\/[%-\w]+\/[-\w]+/i;
  const youLiao = /\bhttps?:\/\/(pc\.yiyouliao|alphago\.sndo)\.com\/microsoft\/article\/rivers\/newsfeed\/\d+\/\w+\.html/i;
  switch (true) {
    case msnCn.test(window.location.href):
      return 'msnCn';
      break;
    default:
      return '';
      break;
  }
};

const iMpaleShadowN = (hoverElem) => {
  const shadowInput = document.createElement('input');
  shadowInput.type = 'checkbox';
  shadowInput.className = 'shadowInput';
  shadowInput.addEventListener('mouseover', () => {
    shadowInput.checked = ! shadowInput.checked;
    pierceElem(hoverElem);
    shadowInput.title = shadowInput.style.top + ' ' + shadowInput.style.top;
  });
  hoverElem.insertBefore(shadowInput, hoverElem.firstChild);
};

const ocrSpace = async (urlImg, destElem) => {
  const preFix = 'https://api.ocr.space/parse/imageurl?apikey=K88766003188957&url=';
  const param = '&language=chs&OCREngine=2';
  try {
    // 发送 API 请求
    const response = await fetch(preFix + urlImg + param);
    const data = await response.json();
    // 获取 OCR 解析结果
    const parsedText = data.ParsedResults[0].ParsedText;
    destElem.value = parsedText;
    artIculate(parsedText, 61);
  } catch (error) {
    console.error(error);
  }
}
//GPT3.5 Turbo

const filterUrl = (funcParam, queryUrl) => {
  const rankTag = /\b6\/\/.r=\d/i;
  const twImgR = /\bhttps?:\/\/pbs.twimg.com\/media\/([\w-]{15,})/i;
  const youtuBeR = /^https?:\/\/(?:(?:youtu\.be\/)|(?:(?:www\.)?youtube\.com\/(?:(?:watch\?(?:[^&]+&)?vi?=)|(?:vi?\/)|(?:shorts\/))))([a-zA-Z0-9_-]{11,})/i;
  const baiduR = /\bhttps?:\/\/pics\d\.baidu\.com\/feed\/[0-9A-z]+\.(?:jpe?g|gif|png).+/i;
  const bingR = /^https?:\/\/.*(cn|mm).bing.(net|com)\/th.id.(.*rik=\w+|.*ORMS.\w+|.*OIP-C.[-\w]+|.*OJ.\w+)/i;
  const gtimgR = /^https?:\/\/inews\.gtimg\.com\/\w+\/.+\/\d+/i;
  const imgRegEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\.(?:gif|img|jpe?g|png|mp4|svg|webp)+/i;
  const music163R = /^https?:\/\/music\.163\.com\/#?\/?\w+\?id\=\d+/i;
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;

  switch (true) {
      case rankTag.test(queryUrl):
      return 'rankTag';
      break;

      case twImgR.test(queryUrl):
      return 'twImgR';
      break;

      case youtuBeR.test(queryUrl):
      return 'youtuBeR';
      break;

      case baiduR.test(queryUrl):
      return 'imgHttp';
      break;

      case bingR.test(queryUrl):
      return funcParam !== 'trim' ?
        'img' : queryUrl.match(bingR)[0];
      break;

      case gtimgR.test(queryUrl):
      return funcParam !== 'trim' ? 'img' : queryUrl.match(gtimgR)[0];
      break;

      case imgRegEX.test(queryUrl):
      return funcParam !== 'trim' ?
        'img' : queryUrl.match(imgRegEX)[0];
      break;

      case music163R.test(queryUrl):
      return 'meting-js';
      break;

      case urlRegex.test(queryUrl):
      return funcParam !== 'trim' ?
        'a' : queryUrl;
      break;

      default:
      return funcParam !== 'trim' ?
        '' : queryUrl;
      break;
  }
}

const articuExpress = (text, vol) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'zh-CN-liaoning';
  msg.volume = vol || 1;
  window.speechSynthesis.speak(msg);
}

const getVoices = () => {
  return new Promise(resolve => {
    let voices = speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }
    const voiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
    }
    speechSynthesis.onvoiceschanged = voiceschanged;
  })
}

const artIculate = async (text, voiceIndex, vol) => {
  const ttsVoices = await getVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = ttsVoices[voiceIndex || 61];
  const currentOur = new Date().getHours();
  const decentVol = currentOur > 10 ? 1 : .2;
  utterance.volume = vol || decentVol;
  speechSynthesis.speak(utterance);
}
//appreciate koldobika https://stackoverflow.com/questions/66951019/async-await-promise-does-not-work-promiseresult-is-undefined
//appreciate docta_faustus https://stackoverflow.com/questions/61016951/changing-the-speechsynthesis-voice-not-working

class FloatWindow extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({mode: 'open'})
      this.shadowRoot.innerHTML = `
      <style>
        .window {
          position: absolute;
          background-color: white;
          border: 1px solid gray;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          display: none;
        }

        .titleBar {
          background-color: lightgray;
          padding: 5px;
          cursor: move;
        }

        .closeBtn {
          float: right;
          cursor: pointer;
        }

      </style>
      <div class="window">
        <div class="titleBar">
          <span class="title"><slot name="header"></slot></span>
          <span class="closeBtn">×</span>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <br>
        <p class="coordinate"></p>
        <p class="measure"></p>
      </div>
    `

      this.window = this.shadowRoot.querySelector('.window')
      this.window.style.width = this.getAttribute("width")
      this.window.style.height = this.getAttribute("height")
      this.titleBar = this.shadowRoot.querySelector('.titleBar')
      this.closeBtn = this.shadowRoot.querySelector('.closeBtn')
      this.content = this.shadowRoot.querySelector('.content')
      this.coordinate = this.shadowRoot.querySelector('.coordinate');
      this.measure = this.shadowRoot.querySelector('.measure');

      this.mouseDownX = 0
      this.mouseDownY = 0
      this.translateX = 0
      this.translateY = 0

      // for resize use
      this._width = 0
      this._height = 0

      this.titleBar.addEventListener('mousedown', this.dragStart.bind(this))
      this.closeBtn.addEventListener('click', this.close.bind(this))

      this.window.addEventListener('mousemove', this.updateCursor.bind(this))

      // resize
      this.window.addEventListener('mousedown', (e)=>{
        if (this.window.style.cursor.includes("resize")) {
          this.mouseDownX = e.clientX
          this.mouseDownY = e.clientY
          this._width = this.window.offsetWidth
          this._height = this.window.offsetHeight
          const handler = this.resizeHandler.bind(this)
          document.addEventListener('mousemove', handler)
          document.addEventListener('mouseup', () => {
            document.removeEventListener("mousemove", handler)
          }, {once: true})
        }
      })
    }

    open() {
      this.window.style.display = 'block'
    }

    close() {
      this.window.style.display = 'none'
    }

    toggle() {
      const display = this.window.style.display
      display === '' || display === 'none' ? this.open() : this.close()
    }

    dragStart(e) {
      const m = this.window.style.transform.match(/translate\((-?\d*\.?\d+)px, (-?\d*\.?\d+)px\)/)
      if (m) {
        this.translateX = Number(m[1])
        this.translateY = Number(m[2])
      }
      this.translateX = e.clientX - this.translateX
      this.translateY = e.clientY - this.translateY
      const handler = this.drag.bind(this)
      document.addEventListener('mousemove', handler)
      document.addEventListener('mouseup',
        () => document.removeEventListener("mousemove", handler),
        {once: true}
      )
    }

    drag(e) {
      const x = e.clientX - this.translateX
      const y = e.clientY - this.translateY
      this.window.style.transform = `translate(${x}px, ${y}px)`
      this.coordinate.textContent = 'xLeft:' + x + ' yTop' + y;
    }

    updateCursor(e) {
      const threshold = 10
      const isNearBottom = (this.window.offsetHeight - e.offsetY) < threshold
      const isNearLeft = e.offsetX < threshold
      const isNearRight = (this.window.offsetWidth - e.offsetX) < threshold
      if (isNearBottom && isNearLeft) {
        this.window.style.cursor = "ne-resize"
      } else if (isNearBottom && isNearRight) {
        this.window.style.cursor = "nw-resize"
      } else if (isNearLeft || isNearRight) {
        this.window.style.cursor = 'col-resize'
      } else if (isNearBottom) {
        this.window.style.cursor = 'row-resize'
      } else {
        this.window.style.cursor = 'initial'
      }
    }

    resizeHandler(e) {
      let [dx, dy] = [0, 0]
      switch (this.window.style.cursor) {
        case 'row-resize':
          dy = e.clientY - this.mouseDownY
          break
        case 'col-resize':
          dx = e.clientX - this.mouseDownX
          break
        default:
          dy = e.clientY - this.mouseDownY
          dx = e.clientX - this.mouseDownX
      }

      this.window.style.width = `${this._width + dx}px`
      this.window.style.height = `${this._height + dy}px`
      this.measure.textContent = 'Height:'
       + this.window.style.height + ' Width:' + this.window.style.width;
    }
  }
//appreciate Carson https://stackoverflow.com/questions/380244/dynamic-floating-window-by-javascript

const articleMsn = class retrieveShadowEtc  {
  constructor( hoverElem ) {
    this.hoverElem = hoverElem;
  }
  // getter 方法
  get imgSrc() {
    return this.hoverImgSrc();
  }
  // 方法
  hoverImgSrc = () => {
    const hoverLClass = this.hoverElem.localName;
    switch (hoverLClass) {
      case 'cp-article-image':
        const imgModeSwtchr = this.hoverElem.shadowRoot.querySelector(
        'div.article-image-container');
        if (imgModeSwtchr.querySelector('input.shadowInput') === null) {
          iMpaleShadowN(imgModeSwtchr);
        }
        const articleImgSrc = this.hoverElem._imageSource;
        return articleImgSrc;
        break;
      case 'cp-article':
        const cpArticle = this.hoverElem.shadowRoot.querySelectorAll('p[data-t]');
        for (const item of cpArticle) {
          if (item.innerText !== '' && item.querySelector('input.shadowInput') == null) {
            iMpaleShadowN(item);
          }
        }
        break;
      case 'img':
        return this.hoverElem.src;
        break;
      default:
        return this.hoverElem.textContent;
    }
  }

  retrieveMsn = () => {
    const cpArticle = document.querySelector('cp-article');
    const gallerySlideshow = document.querySelector('gallery-slideshow');
    if (cpArticle !== null) {
      const map1 = cpArticle._data.articleImages;
      let entityImg = [];
      let imgCount = 0;
      const iterator1 = map1[Symbol.iterator]();
      for (const item of iterator1) {
        const msnImg = filterUrl ('trim', item[1].url);
        entityImg.push(msnImg);
        imgCount ++;
      }
      return entityImg;
    } else if (gallerySlideshow !== null) {
      const gallerySlideComp = gallerySlideshow.shadowRoot.querySelectorAll('gallery-slide-component');
      const fakeImg = /nativeAd\d+_/;
      let gallerySlide = [];
      for (const item of gallerySlideComp) {
        if (fakeImg.test(item.id) === false) {
          gallerySlide.push('https://img-s-msn-com.akamaized.net/tenant/amp/entityid/' + item.id + '.img');
        }
      }
      return gallerySlide;
    }
  };

}

const pierceRefer = () => {
  const treeMinJs = document.createElement('script');
  treeMinJs.id = 'treeMinJs';
  treeMinJs.setAttribute('type', 'text/javascript');
  treeMinJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/treejs/1.8.3/tree.min.js';
  document.documentElement.appendChild(treeMinJs);
  const imagesloadedPkgdMinJs = document.createElement('script');
  imagesloadedPkgdMinJs.id = 'imagesloadedPkgdMinJs';
  imagesloadedPkgdMinJs.setAttribute('type', 'text/javascript');
  imagesloadedPkgdMinJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/5.0.0/imagesloaded.pkgd.min.js';
  document.documentElement.appendChild(imagesloadedPkgdMinJs);
  const fancyboxMinCss = document.createElement('link');
  fancyboxMinCss.id = 'fancyboxMinCss';
  fancyboxMinCss.setAttribute('rel', 'stylesheet');
  fancyboxMinCss.setAttribute('type', 'text/css');
  fancyboxMinCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.31/fancybox/fancybox.min.css';
  document.documentElement.appendChild(fancyboxMinCss);
  const fancyboxUmdMinJs = document.createElement('script');
  fancyboxUmdMinJs.id = 'fancyboxUmdMinJs';
  fancyboxUmdMinJs.setAttribute('type', 'text/javascript');
  fancyboxUmdMinJs.src = 'https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.31/fancybox/fancybox.umd.min.js';
  fancyboxUmdMinJs.addEventListener('load', () => {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  });
  document.documentElement.appendChild(fancyboxUmdMinJs);
};

const pierceElement = () => {
  customElements.define('float-window', FloatWindow);
  let statusDiv = document.createElement('div');
  statusDiv.id = 'status';
  let progress = document.createElement('progress');
  progress.max = 7;
  progress.value = 0;
  statusDiv.appendChild(progress);
  document.body.appendChild(statusDiv);
  stackWindow('', 40, 200, 640, 480);
};

function assemblePackage(tagType, strURL){
  switch (tagType) {
    case 'seqTag':
      let seqAuto = document.createElement("div");
      seqAuto.className = 'dynamic-container';
      reloadBullet('sequence', strURL, seqAuto);
      return seqAuto;
    break;

    case 'rankTag':
      let iconRank = document.createElement('img');
      let randomColor = Math.floor(Math.random()*16777215).toString(16);
      iconRank.height = 24;
      iconRank.src = "https://img.shields.io/badge/"
       + ratingStar(QueryString('r', strURL.toString()))
       + '-推荐度-' + randomColor;
      return iconRank;
    break;

    case 'Tab':
      let imgTab = document.createElement('img');
      imgTab.src = strURL;
      imgTab.onclick = function(){reloadBullet('sequence', strURL
      .toString(), this.parentNode.parentNode.nextElementSibling);};
      let spanTab = document.createElement('li');
      spanTab.className = 'is-loading';
      spanTab.appendChild(imgTab);
      updateProgress( spanTab );
      return spanTab;
    break;

    case 'h3':
      let h3Text = document.createElement('h3');
      h3Text.innerText = strURL;
      return h3Text;
    break;

    case 'twImgR':
      let preFixT = document.getElementById('prefixKit').value;
      let urlIntegrity = preFixT + 'https://pbs.twimg.com/media/' + strURL +
       '?format=jpg&name=orig';
      return getImageItem( urlIntegrity );
    break;

    case 'img':
      let adjacentAccumulate = document.createElement('div');
      adjacentAccumulate.className = 'dynamic-container';
      reloadBullet('', strURL, adjacentAccumulate);
      return adjacentAccumulate;
    break;

    case 'youtuBeR':
      let HyperLinkY = document.createElement('a');
      HyperLinkY.href = 'https://youtu.be/' + strURL;
      HyperLinkY.innerText = 'https://youtu.be/' + strURL;
      let preFix = document.getElementById('prefixKit').value;
      let urlIntegrit = preFix + 'https://i.ytimg.com/vi/' + strURL + '/hqdefault.jpg';
      let FancySuite = getImageItem( urlIntegrit );
      let urlIntegri = preFix + 'https://i.ytimg.com/vi/' + strURL + '/maxresdefault.jpg';

      (async () => {
        if (await imageExists(urlIntegri)){
          FancySuite.querySelector('li img').src = urlIntegri;
          FancySuite.querySelector('a').href = urlIntegri;
        }
      })()

      let FancySuiteY = document.createElement("div");
      FancySuiteY.appendChild(HyperLinkY);
      FancySuiteY.appendChild(FancySuite);
      return FancySuiteY;
    break;

    case 'meting-js':
      let hyPlayERLink = document.createElement("a");
      hyPlayERLink.href = strURL;
      hyPlayERLink.innerText = strURL;
      let breakLine = document.createElement("br");
      let thumbSwitch = document.createElement('img');
      thumbSwitch.height = 64;
      
      fetch('https://api.i-meto.com/meting/api?type=song&id='
       + QueryString('id', strURL)).then(
        function(u){ return u.json();}
        ).then(
          function(json){
            thumbSwitch.src = json[0].pic;
        }
      )
      
      thumbSwitch.onclick = function(){switchMeting(this.parentNode, strURL);};
      let metingTag = document.createElement("div");
      metingTag.appendChild(hyPlayERLink);
      metingTag.appendChild(breakLine);
      metingTag.appendChild(thumbSwitch);
      return metingTag;
    break;

    case 'a':
      let hyperLink = document.createElement('a');
      hyperLink.href = strURL;
      hyperLink.innerText = strURL;
      let hoverLink = document.createElement('div');
      hoverLink.appendChild(hyperLink);
      hoverLink.className = 'urlCollapsing';
      return hoverLink;
    break;

    default:
      let PureText = document.createElement('div');
      let HoRizonDelimit = document.createElement('hr');
      PureText.append(strURL);
      PureText.appendChild(HoRizonDelimit);
      return PureText;
    break;
  }
}

const getImageItem = (imgUrl) => {
  let img = new Image();
  let start_time = Date.now();
  img.style.maxHeight = '72px';
  img.style.maxWidth = '144px';
  img.style.borderRadius = '5px';
  img.src = imgUrl;
  let anchorTag = document.createElement('a');

  let check = function(){
    let diff = Date.now() - start_time;
    let voidBoolean = '';
    if(img.naturalWidth>0 || img.naturalHeight>0){
    }
    else{
      voidBoolean = '❌';
      img.alt = imgUrl;
    }
    clearInterval(set);
    let imgResp = voidBoolean + '🏳‍🌈' + img.naturalWidth
     + '📶' + img.naturalHeight + '⌛' + diff;
     anchorTag.setAttribute('data-caption', imgResp);
  };
  let set = setInterval(check,40);

  let liTag = document.createElement('li');
  liTag.className = 'is-loading';
  liTag.style.float = 'left';
  liTag.style.listStyle = 'none';
  liTag.style.margin = '0 4px 0px 0';
  liTag.style.backgroundPosition = 'center center';
  liTag.style.backgroundRepeat = 'no-repeat';
  liTag.style.backgroundColor = 'rgba(241,241,241,.9)';
  liTag.style.backgroundImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/loading.gif';
  liTag.appendChild(img);
  anchorTag.setAttribute('data-fancybox', 'gallery');
  anchorTag.href = imgUrl;
  anchorTag.appendChild(liTag);
  return anchorTag;
};

function switchMeting(currentNode, url) {
  let ElementE = document.querySelector('div.onePlayer');
  ElementE.remove();
  let metingJs = document.createElement('meting-js');
  metingJs.setAttribute('autoplay', true);
  metingJs.setAttribute('auto', url);
  metingJs.setAttribute('loop', 'none');
  let divc = document.createElement('div');
  divc.className = 'onePlayer';
  divc.appendChild(metingJs);
  currentNode.appendChild(divc);
}

function QueryString(item, text){
  let foundString = text.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
  return foundString ? foundString[1] : foundString;
}

const reloadBullet = (triggerType, urlData, currentContainer) => {
  let fragment = triggerType !== 'sequence' ?
   getItemsFragment(urlData) : sequenceGenerate(urlData);
  currentContainer.insertBefore( fragment, currentContainer.firstChild );
  updateProgress( currentContainer );
};

const updateProgress = (currentContainer) => {
  let imgLoad = imagesLoaded( currentContainer );
  imgLoad.on( 'progress', onProgress );
  imgLoad.on( 'always', onAlways );
  imageCount = imgLoad.images.length;
  resetProgress();
  progressElem.setAttribute( 'value', 0 );
};

const resetProgress = () => {
  statusElem.style.opacity = 1;
  loadedImageCount = 0;
  progressElem.setAttribute( 'max', imageCount );
};

const onProgress = (imgLoad, image) => {
  image.img.parentNode.className = image.isLoaded ? '' : 'is-broken';
  loadedImageCount++;
  progressElem.setAttribute( 'value', loadedImageCount );
};

const onAlways = () => {
  statusElem.style.opacity = 0;
};

const getItemsFragment = (arrayIn) => {
  let parseStr = Array.isArray(arrayIn) ? arrayIn : [arrayIn];
  let fragment = document.createDocumentFragment();
  let arrayLength = parseStr.length;
  for ( let i = 0; i < arrayLength; i++ ) {
    let item = getImageItem(parseStr[i]);
    fragment.appendChild( item );
  }
  return fragment;
};

const sequenceGenerate = (urlFinal) => {
  let fileName = urlFinal.match(/[^\/=\D]+(?=\.[^\/.]*$)/)[0].
  match(/[]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?/)[0];
  let urlRazor = urlFinal.split(/[^\/=\D]+(?=\.[^\/.]*$)/);
  let fragment = document.createDocumentFragment();
  for ( let i = 0; i < fileName; i++ ) {
    let item = getImageItem(urlRazor[0] + i + urlRazor[1]);
    fragment.appendChild( item );
  }
  return fragment;
};

const stackWindow = (idString, wLeft, wTop, wWidth, wHeight) => {
  const floatLayer = document.createElement('float-window');
  floatLayer.id = idString === '' ? 'reignSupreme' : idString;
  floatLayer.style.opacity = .9;
  floatLayer.window.style.overflow = 'auto';
  floatLayer.window.style.left = wLeft + 'px';
  floatLayer.window.style.top = wTop + 'px';
  floatLayer.window.style.width = wWidth + 'px';
  floatLayer.window.style.height = wHeight + 'px';
  floatLayer.style.backgroundColor = 'rgba(34,34,34,.9)';

  const headerSlot = document.createElement('span');
  headerSlot.setAttribute('slot', 'header');
  headerSlot.textContent = idString;
  floatLayer.appendChild(headerSlot);
  document.body.appendChild(floatLayer);
  floatLayer.open();
};

const createTree = (container) => {
  const treeContainer = document.createElement('div');
  treeContainer.id = 'treeContainer';
  const floatLayer = document.querySelector('float-window#floatTree');
  floatLayer.appendChild(treeContainer);

  const treeData = [
  {
    id: '0',
    text: 'node-0',
    children: [
      {
        id: '0-0',
        text: 'node-0-0',
        children: [
          {id: '0-0-0', text: 'node-0-0-0'},
          {id: '0-0-1', text: 'node-0-0-1'},
          {id: '0-0-2', text: 'node-0-0-2'},
        ],
      },
      {id: '0-1', text: 'node-0-1'},
    ],
  },
  {
    id: '1',
    text: 'node-1',
    children: [{id: '1-0', text: 'node-1-0'}, {id: '1-1', text: 'node-1-1'}],
  },
];

const myTree = new Tree('#' + container, {
  data: treeData,
});
};

const func2 = (x, y) => {
  console.log(undefined);
};

sideVertialBar();
bottomHorizonBar();
let elementContent = '';
let cpImageSource = '';
pierceRefer();
pierceElement();
let statusElem = document.querySelector('#status');
let progressElem = document.querySelector('progress');
let loadedImageCount, imageCount;

document.addEventListener('mouseover', function(event) {
  const hoverElem = event.target;
  elementContent = hoverElem.innerText ||
    hoverElem.href || hoverElem.src ||
    hoverElem.value;
  const topHorizonPara = document.querySelector('#topHorizonPara');
  topHorizonPara.title = '[Tag]' + hoverElem.tagName + ' [class]' + hoverElem.className;
  const enableHover = document.querySelector('#enableHover');
  const divFloat = document.querySelector('#divFloat');
  if (divFloat !== null && hoverElem.className !== 'tooltiptext') {
    divFloat.remove();
  } else if ( hoverElem.tagName !== 'body' &&
             hoverElem.className !== 'tooltiptext' &&
             hoverElem.querySelector('div.tooltiptext') == null &&
             enableHover.checked ) {
    pierceElem( hoverElem );
  }

  if ( matchHref() === 'msnCn') {
    cpImageSource = new articleMsn(hoverElem).imgSrc;
  }

});

document.addEventListener('keydown', function(event) {
  switch (event.altKey && event.key) {
    case '[':
      console.log(undefined);
      break;
    case ']':
      console.log(undefined);
      break;
    case '0':
      stackWindow('fiddle', 400, 500, 640, 480);
      break;
    case '1':
      stackWindow('#' + event.key + ' charCodeAt:'
       + event.key.charCodeAt(), 40, 40, 200, 250);
      break;
    case '2':
      stackWindow('#' + event.key + ' charCodeAt:'
       + event.key.charCodeAt(), 400, 400, 200, 250);
      break;
    case '3':
      stackWindow('floatTree', 200, 200, 320, 240);
      createTree('treeContainer');
      break;
    case '4':
      stackWindow('', 40, 200, 640, 480);
      break;
      case ',':
        if ( matchHref() === 'msnCn') {
          elementContent = cpImageSource;
        }
        const currentOur = new Date().getHours();
        const decentVol = currentOur > 10 ? NaN : .2;
        navigator.clipboard.writeText(titleUrlSelecTime (elementContent));
        articuExpress(document.title.slice(0, 10) + '共' + 0 + '张屠', decentVol);
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
