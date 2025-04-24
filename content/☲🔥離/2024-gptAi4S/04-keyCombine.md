2024/4/12 11:20:05
https://ai4s.gpt-666.com/#/chat/1712892001827

js代码，同时按下t和u键时，输出网页标题和网址。

let keys = {};
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;

  if(keys['t'] && keys['u']) {
    console.log("网页标题：" + document.title);
    console.log("网页地址：" + window.location.href);

    // 可以根据需求进行进一步操作，比如将信息显示在页面上
  }
});

document.addEventListener('keyup', (event) => {
  delete keys[event.key];
});

2024/4/4 15:32:41
https://ai4s.gpt-666.com/#/chat/1712215701129

js代码，按下Alt+任意按键，显示该组合键的字码和所按下的字符

document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        console.log('Alt key is pressed');
        console.log('Key code: ' + event.keyCode);
        console.log('Character pressed: ' + String.fromCharCode(event.keyCode));
    }
});

那怎么才能判断按下的是a还是Alt+a

let altPressed = false;

document.addEventListener('keydown', function(event) {
    if (event.key === "Alt") {
        altPressed = true;
    } else if (altPressed && event.key === "a") {
        console.log("You pressed Alt+a");
    } else {
        altPressed = false;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === "Alt") {
        altPressed = false;
    }
});
