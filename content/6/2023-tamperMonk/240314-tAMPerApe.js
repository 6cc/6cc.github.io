// ==UserScript==
// @name         tAMPerApe
// @namespace    http://tampermonkey.net/
// @version      2024-03-03
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
document.addEventListener('mouseover', (event) => {
    let target = event.target;
    let hoverContent = target.textContent || target.href;

    if (hoverContent) {
        target.setAttribute('title', hoverContent);
    }
});

    // Your code here...
})();

// 创建侧边栏
const sidebar = document.createElement('div');
sidebar.style.opacity = .5;
sidebar.style.position = 'fixed';
sidebar.style.left = '0';
sidebar.style.top = '0';
sidebar.style.width = '100px';
sidebar.style.height = '100%';
sidebar.style.background = '#f1f1f1';
sidebar.style.transition = 'width 0.3s';
document.body.appendChild(sidebar);

let isFixed = false;
let isExpanded = false;

document.addEventListener('mousemove', (event) => {
    if (!isFixed) {
        const distanceToEdge = event.clientX;
        if (distanceToEdge < 20 && !isExpanded) {
            sidebar.style.width = '250px';
            isExpanded = true;
        } else if (distanceToEdge > 250 && isExpanded) {
            sidebar.style.width = '50px';
            isExpanded = false;
        }
    }
});

// 创建选择框
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.addEventListener('change', () => {
    isFixed = checkbox.checked;
    if (isFixed) {
        sidebar.style.width = '250px';
        isExpanded = true;
    }
});
sidebar.appendChild(checkbox);

// 手动展开和隐藏
document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === '1') {
        sidebar.style.width = '250px';
        isExpanded = true;
    } else if (event.altKey && event.key === '2') {
        sidebar.style.width = '50px';
        isExpanded = false;
    } else if (event.altKey && event.key === 'd') {
        const info = `Title: ${document.title}\nURL: ${window.location.href}\nTime: ${new Date().toLocaleString()}`;
        navigator.clipboard.writeText(info);
        // Use TTS API to read out the information in Chinese
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(info);
        utterance.lang = 'zh-CN';
        utterance.voiceURI = 'YunxiNeural';
        speechSynthesis.speak(utterance);
    }
});
