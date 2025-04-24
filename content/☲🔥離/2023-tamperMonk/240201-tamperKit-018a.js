// ==UserScript==
// @name         tamperKit-018a
// @namespace    http://tampermonkey.net/
// @version      0.18a
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

matchHref();
pierceElement();

document.onmouseover = function (e) {
  let hoverElem = '';
  e = e || window.event;
  hoverElem = e.toElement;
  let debugBar = document.querySelector('div#debug-bar');
  debugBar.innerText = hoverElem.localName + ' ' + retrievTeXisT(hoverElem) + ' ' + hoverElem.className;

  document.onkeyup = function (e) {
    let evt = window.event || e;
    let linesArray = '';
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
        for (const element of copyChecked()) {
          const checkCart = document.querySelectorAll('input.check-cart');
          const checkedSrc = element.previousElementSibling.querySelector('a>img').src;
          linesArray += element.checked ? checkedSrc + '\n' : '';
        }
        navigator.clipboard.writeText(linesArray);
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
    selImgAll();
    banBanner();
  };
}

function matchHref() {
  const msnCn = /\bhttps?:\/\/www\.msn\.cn\/zh-cn\/\w+\/\w+\/[%-\w]+\/[-\w]+/i;
  const youLiao = /\bhttps?:\/\/(pc\.yiyouliao|alphago\.sndo)\.com\/microsoft\/article\/rivers\/newsfeed\/\d+\/\w+\.html/i;
  switch (true) {
  case msnCn.test(location.href):
    pierceRefer();
    setTimeout(() => {
    selImgAll();
    }, 340);
    break;

  case youLiao.test(location.href):
    pierceRefer();
    setTimeout(() => {
    selImgAll();
    banBanner();
    }, 50);
    break;

  default:
  }
}

function selImgAll() {
  let cssSelectorS = [
    'cp-article-image',
    'msn-article-image',
    'div.yyl-weiruan-article-detail-content img[class~=_1g4Ex]',
    'div.yyl-weiruan-article-detail-content img[src^="https://img-nos.yiyouliao.com/"]'
  ];
  let imageArray = [];

  switch (true) {
  case document.querySelectorAll(cssSelectorS[0]).length > 0:
    for (const element of document.querySelectorAll(cssSelectorS[0])) {
      if( element.previousElementSibling === null ) {
        element.parentNode.insertBefore(pierceFancy(element._imageSource), element);
      }
      imageArray.push(element._imageSource);
    }
    break;

  case document.querySelectorAll(cssSelectorS[1]).length > 0:
    for (const element of document.querySelectorAll(cssSelectorS[1])) {
      if( element.previousElementSibling === null ) {
        element.parentNode.insertBefore(pierceFancy(element.src), element);
      }
      imageArray.push(element.src);
    }
    break;

  case document.querySelectorAll(cssSelectorS[2]).length > 0:

    for (const element of document.querySelectorAll(cssSelectorS[2])) {
      if( element.previousElementSibling !== null
       && element.previousElementSibling.className !== 'fancy-cart'
       && element.previousElementSibling.tagName !== 'IMG') {
        element.parentNode.insertBefore(pierceFancy(element.src), element);
      } else if ( element.previousElementSibling === null
         && element.parentElement.className === 'pgc-img') {
        element.parentNode.insertBefore(pierceFancy(element.src), element);
      } else if ( element.previousElementSibling === null
         && element.parentElement.className === 'ql-align-center') {
        element.parentNode.insertBefore(pierceFancy(element.src), element);
      }
      imageArray.push(element.src);
    }
    break;

  default:
  }
  return imageArray;
}

function pierceElement() {
  let div = document.createElement('div');
  div.id = 'debug-bar';
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
  styleSheet.id = 'style-sheet';
  styleSheet.setAttribute('rel', 'stylesheet');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/4.0.31/fancybox.min.css';
  document.documentElement.appendChild(styleSheet);
  let javasSript = document.createElement('script');
  javasSript.id = 'java-sript';
  javasSript.setAttribute('type', 'text/javascript');
  javasSript.src = 'https://cdnjs.cloudflare.com/ajax/libs/fancyapps-ui/4.0.31/fancybox.umd.min.js';
  document.documentElement.appendChild(javasSript);
}

function titleUrlSelecTime (elem) {
  let resultCombine = '\n　6//sp1it=1　6//?r=⭐　&d=' + new Date().toLocaleString() + '　&💻=0　&b='
   + (Date.now()).toString(36) + '　&!=🌸\n'
   + (retrievExist ('div.yyl-article-detail-title, div.yyl-weiruan-article-detail-title') ||
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
    return elemObj.src;
    break;

    case elemObj.src !== undefined :
    return elemObj.src;
    break;

    case elemObj.localName === 'cp-article-image' :
    return elemObj._imageSource;
    break;

    case elemObj.localName === 'msn-article-image' :
    return elemObj._imageSource;
    break;

    case elemObj.localName === 'div' && elemObj.style.backgroundImage !== undefined :
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
  img.style.maxHeight = '48px';
  img.style.maxWidth = '96px';
  img.src = imgUrl.match(imgFiddle);
  img.addEventListener('mouseover', (event) => {
    img.click();
  });
  let anchorTag = document.createElement('a');
  anchorTag.setAttribute('data-fancybox', 'gallery');
  anchorTag.href = imgUrl.match(imgFiddle);
  anchorTag.appendChild(img);
  let checkCart = document.createElement('input');
  checkCart.style.zoom = '150%';
  checkCart.className = 'check-cart';
  checkCart.type = 'checkbox';
  checkCart.checked = true;
  let fancyCart = document.createElement('div');
  fancyCart.className = 'fancy-cart';
  fancyCart.appendChild(anchorTag);
  fancyCart.appendChild(checkCart);
  return fancyCart;
}

const playAudio = (path) => {
  new Audio(path ?? 'defaultPath').play()
}

function copyChecked() {
  const checkCart = document.querySelectorAll('input.check-cart');
  return checkCart;
}

function banBanner() {
  let appBanners = document.querySelector('div.yyl-weiruan-ads-main');
    if(appBanners !== null) {
      appBanners.style.display = 'none';
    }
}