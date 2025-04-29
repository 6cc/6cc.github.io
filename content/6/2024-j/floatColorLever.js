const func1 = () => {
  // 创建颜色数组
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#800080"];

// 创建触发区域元素
const trigger = document.createElement('div');
trigger.style.position = 'fixed';
trigger.style.right = '0';
trigger.style.bottom = '0';
trigger.style.width = '40px';
trigger.style.height = '40px';
trigger.style.backgroundColor = 'lightgray';
trigger.style.zIndex = '10';
document.body.appendChild(trigger);

let bar;

// 鼠标悬停触发事件
trigger.addEventListener('mouseenter', () => {
    if (!document.querySelector('.bar')) {
        // 创建bar元素
        bar = document.createElement('div');
        bar.className = 'bar';
        bar.id = 'bar';
        bar.style.position = 'fixed';
        bar.style.bottom = '50px';
        bar.style.left = '50%';
        bar.style.transform = 'translateX(-50%)';
        bar.style.width = '870px';
        bar.style.height = '2px';
        bar.style.backgroundColor = 'black';
        bar.style.display = 'flex';
        bar.style.justifyContent = 'space-between';
        bar.style.transition = 'opacity 0.5s ease'; // 过渡效果
        bar.style.opacity = '1';

        // 创建span元素并附加到bar中
        for (let i = 0; i < 6; i++) {
            const span = document.createElement('span');
            span.className = 'span';
            span.style.width = '145px';
            span.style.height = '2px';
            span.style.display = 'inline-block';
            span.style.position = 'relative';
            span.style.backgroundColor = colors[i];
            span.dataset.index = i + 1;

            // span的鼠标悬停事件
            span.addEventListener('mouseenter', (e) => {
                const index = e.target.dataset.index;
                const spanColor = e.target.style.backgroundColor;

                // 创建div-d
                let divD = document.querySelector(`.div-d-${index}`);
                if (!divD) {
                    divD = document.createElement('div');
                    divD.className = `div-d div-d-${index}`;
                    divD.id = `d-${index}`;
                    divD.textContent = `d-${index}`;
                    divD.style.width = '144px';
                    divD.style.height = '20px';
                    divD.style.backgroundColor = shadeColor(colors[index - 1], 40); // 浅色
                    divD.style.color = 'white';
                    divD.style.fontSize = '12px';
                    divD.style.textAlign = 'center';
                    divD.style.lineHeight = '20px';
                    divD.style.position = 'absolute';
                    divD.style.top = '2px';
                    divD.style.border = '1px solid white'; // 白色边框
                    divD.style.transition = 'opacity 0.5s ease'; // 过渡效果
                    divD.style.opacity = '0';
                    span.appendChild(divD);

                    // div-d的鼠标悬停事件
                    divD.addEventListener('mouseenter', () => {
                        let divU = document.querySelector(`.div-u-${index}`);
                        if (!divU) {
                            divU = document.createElement('div');
                            divU.className = `div-u div-u-${index}`;
                            divU.id = `u-${index}`;
                            divU.textContent = `u-${index}`;
                            divU.style.width = '144px';
                            divU.style.height = '20px';
                            divU.style.backgroundColor = shadeColor(colors[index - 1], -40); // 深色
                            divU.style.color = 'white';
                            divU.style.fontSize = '12px';
                            divU.style.textAlign = 'center';
                            divU.style.lineHeight = '20px';
                            divU.style.position = 'absolute';
                            divU.style.bottom = '2px';
                            divU.style.border = '1px solid white'; // 白色边框
                            divU.style.transition = 'opacity 0.5s ease'; // 过渡效果
                            divU.style.opacity = '0';
                            span.appendChild(divU);

                            // div-u的鼠标离开事件
                            divU.addEventListener('mouseleave', () => {
                                divU.style.opacity = '0';
                            });
                        }
                        divU.style.opacity = '1';
                    });

                    // div-d的鼠标离开事件
                    divD.addEventListener('mouseleave', () => {
                        divD.style.opacity = '0';
                    });
                }
                divD.style.opacity = '1';
            });

            bar.appendChild(span);
        }

        document.body.appendChild(bar);

        // bar的鼠标离开事件
        bar.addEventListener('mouseleave', (e) => {
            if (!isMouseNearBar(e)) {
                bar.style.opacity = '0';
            }
        });
    } else {
        bar.style.opacity = '1';
    }
});
};
function isMouseNearBar(e) {
  const bar = document.querySelector('#bar');
            const barRect = bar.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const isNearBar = (
                mouseX >= barRect.left - 20 && mouseX <= barRect.right + 20 &&
                mouseY >= barRect.top - 20 && mouseY <= barRect.bottom + 20
            );

            const divDRects = Array.from(document.querySelectorAll('.div-d')).map(div => div.getBoundingClientRect());
            const divURects = Array.from(document.querySelectorAll('.div-u')).map(div => div.getBoundingClientRect());

            const isNearDivD = divDRects.some(rect => (
                mouseX >= rect.left && mouseX <= rect.right &&
                mouseY >= rect.top && mouseY <= rect.bottom
            ));

            const isNearDivU = divURects.some(rect => (
                mouseX >= rect.left && mouseX <= rect.right &&
                mouseY >= rect.top && mouseY <= rect.bottom
            ));

            return isNearBar || isNearDivD || isNearDivU;
        }

        // 辅助函数：生成比原色略浅或略深的颜色
        function shadeColor(color, percent) {
            const f = parseInt(color.slice(1), 16),
                  t = percent < 0 ? 0 : 255,
                  p = Math.abs(percent) / 100,
                  R = f >> 16,
                  G = f >> 8 & 0x00FF,
                  B = f & 0x0000FF;
            return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
        }
const func2 = (x, y) => {
  console.log(undefined);
};

(() => {
  func2();
})();

document.addEventListener('DOMContentLoaded', () => {
  func1();
});