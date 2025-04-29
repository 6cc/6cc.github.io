// ==UserScript==
// @name         titleUrlSelecTime19
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {

})();

document.onmouseover = function (e) {
  let hoverElem = '';
  e = e || window.event;
  hoverElem = e.toElement;

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
      navigator.clipboard.writeText(stampTime());
      playAudio('https://dictionary.blob.core.chinacloudapi.cn/media/audio/tom/41/50/4150647E0F7070BD98FCF749849F00C3.mp3');
      break;

      case evt.keyCode == 186 && evt.altKey : //[Alt + ;][]
        navigator.clipboard.writeText(retrievTeXisT (hoverElem));
      break;

      case evt.keyCode == 222 && evt.altKey : //[Alt + '][]
        hoverElem.style.display = 'none';
      break;
    }
    console.log(evt.keyCode);
  }
  document.onscroll = function() {
    var appBanners = document.querySelector('div.yyl-weiruan-positon-video');
    if(appBanners !== null) {
      appBanners.style.display = 'none';
    }
  };
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
  switch (true && true) {
    case elemObj !== null && elemObj.src !== undefined :
    return elemObj.src;
    break;

    case elemObj !== null && (elemObj.innerText !== (undefined || '')):
    return elemObj.innerText;
    break;

    case elemObj !== null && elemObj.outerHTML !== undefined :
    return elemObj.outerHTML;
    break;
  }
}

const playAudio = (path) => {
  new Audio(path ?? 'defaultPath').play()
}

function stampTime(accurate) {
  let currentdate = new Date();
  let startedAt = currentdate.getFullYear() + "-" +
  (currentdate.getMonth() + 1).toString().padStart(2, '0') + "-" +
   currentdate.getDate().toString().padStart(2, '0');
  accurate = accurate == undefined ? '' : '_' +
    currentdate.getHours().toString().padStart(2, '0') + "-" +
    currentdate.getMinutes().toString().padStart(2, '0') + "-" +
    currentdate.getSeconds().toString().padStart(2, '0');

  return startedAt + accurate;
}