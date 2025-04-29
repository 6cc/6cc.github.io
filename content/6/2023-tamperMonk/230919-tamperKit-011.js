// ==UserScript==
// @name         tamperKit-011
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();


pierceElement();
pierceRefer();

document.onmouseover = function (e) {
  let hoverElem = '';
  e = e || window.event;
  hoverElem = e.toElement;
  let interactBar = document.querySelector('div#interact-bar');
  interactBar.innerText = hoverElem.localName + ' ' + retrievTeXisT(hoverElem) + ' ' + hoverElem.className;

  document.onkeyup = function (e) {
    let evt = window.event || e;
    switch (evt.keyCode && true) {
      case evt.keyCode == 188 && evt.altKey : //[Alt + ,comma][identify]
      titleUrlSelecTime ();
      playAudio('https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/32/b6/32B69C7F583FA54FC0F9325C2BA5FB11.mp3');
      break;

      case evt.keyCode == 190 && evt.altKey : //[Alt + .period][behaviour]
      titleUrlSelecTime (hoverElem);
      playAudio('https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/89/9e/899E39E167FD289B63D3A5EA7EF9247E.mp3');
      break;

      case evt.keyCode == 191 && evt.altKey : //[Alt + /forward slash][individual]
      console.log(evt.keyCode);
      playAudio('https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/41/50/4150647E0F7070BD98FCF749849F00C3.mp3');
      break;

      case evt.keyCode == 186 && evt.altKey : //[Alt + ;][]
        navigator.clipboard.writeText(retrievTeXisT (hoverElem));
      break;

      case evt.keyCode == 222 && evt.altKey : //[Alt + '][]
        hoverElem.style.display = 'none';
      break;
    }
  }
  document.onscroll = function() {
    let appBanners = document.querySelector('div.yyl-weiruan-positon-video');
    if(appBanners !== null) {
      appBanners.style.display = 'none';
    }
  };
}

function pierceElement() {
  let div = document.createElement('div');
  div.id = 'interact-bar';
  div.style.bottom = '30px';
  div.style.right = '10px';
  div.style.color = '#fff';
  div.style.backgroundColor = 'rgba(0,0,0,.5)';
  div.style.opacity = .5;
  div.style.height = '25px';
  div.style.width = '850px';
  div.style.position = 'fixed';
  div.style.zIndex = 101;
  document.body.appendChild(div);
}

function pierceRefer() {
  let styleSheet = document.createElement('link');
  styleSheet.setAttribute('rel', 'stylesheet');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.href = "https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.min.css";
  document.documentElement.appendChild(styleSheet);

  let javasSript = document.createElement('script');
  javasSript.setAttribute('type', 'text/javascript');
  javasSript.src = "https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.umd.min.js";
  document.documentElement.appendChild(javasSript);
}

function titleUrlSelecTime (elem) {
  let resultCombine = '\n　6//sp1it=1　6//?⭐=3　&when=' + new Date().toLocaleString() + '　&!=🛑　&visible=1\n'
   + (retrievExist ('div.yyl-article-detail-title,div.yyl-weiruan-article-detail-title') ||
     document.title) + '\n' + location.href + (elem == undefined ? '' :
    (window.getSelection().toString() == '' ? '\n\n' : '\n\n' + window.getSelection().toString() + '\n')
   + retrievTeXisT(elem)) + '\n';

  navigator.clipboard.writeText(resultCombine);
}

function retrievExist (pickElem) {
  let fIcktUrtle = document.querySelector(pickElem);
    if(fIcktUrtle !== null) {
      return fIcktUrtle.innerText;
    }
}

function retrievTeXisT (elemObj) {
  switch ( true ) {
    case elemObj.src !== undefined
     && elemObj.parentNode.parentNode.parentNode.dataset.testid === 'article' :
      if( elemObj.previousElementSibling === null ) {
        elemObj.parentNode.insertBefore(pierceFancy(elemObj.src), elemObj);
        Fancybox.bind("[data-fancybox]", {
        });
      }
    return elemObj.src;
    break;

    case elemObj.src !== undefined :
    return elemObj.src;
    break;

    case elemObj.localName === 'msn-article-image' :
      if( elemObj.previousElementSibling === null ) {
        elemObj.parentNode.insertBefore(pierceFancy(elemObj._imageSource), elemObj);
        Fancybox.bind("[data-fancybox]", {
        });
      }
    return elemObj._imageSource;
    break;

    case elemObj.localName === 'div' && elemObj.className === 'vjs-poster'
     && elemObj.style.backgroundImage !== undefined :
    return elemObj.style.backgroundImage.match(
     /\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]\.(?:gif|img|jpe?g|png|mp4|svg|webp)/i);
    break;

    case elemObj.innerText !== (undefined || ''):
    return elemObj.innerText;
    break;

    case elemObj.outerHTML !== undefined :
    return elemObj.outerHTML;
    break;
  }
}

function pierceFancy(imgUrl) {
  let imgFiddle = /\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]\.(?:gif|img|jpe?g|png|mp4|svg|webp)/i;
  let img = new Image();
  img.style.maxHeight = '140px';
  img.src = imgUrl.match(imgFiddle);
  let anchorTag = document.createElement('a');
  anchorTag.setAttribute('data-fancybox', 'gallery');
  anchorTag.href = imgUrl.match(imgFiddle);
  anchorTag.appendChild(img);
  return anchorTag;
}

const playAudio = (path) => {
  new Audio(path ?? 'defaultPath').play()
}