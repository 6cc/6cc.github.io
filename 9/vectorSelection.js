/*
```js
*/

(() => {
    'use strict';

/**
 * 终极复刻版：实现紧贴的 1px 边界滑动
 * 策略：取消内部面板 clip-path，改用整体容器 overflow + 物理位移
 */

const visualizeContainer = () => {
  const newDiv = document.createElement("div");
  newDiv.id = "menu-container";
  document.body.appendChild(newDiv);
};

const MenuActions = {
    "像素级复刻": () => alert("执行功能 A"),
    "丝滑动效": () => console.log("执行功能 B"),
    "功能f": () => { document.body.style.background = "#2b3e50"; },
    "default": (name) => console.log(`点击了: ${name}，但未定义具体函数。`)
};

function createUltimateMenu(text, containerId) {
    const container = document.getElementById(containerId);
    const ROOT_ID = 'menu-panel-root';
    const lines = text.split('\n').filter(l => l.trim());
    const tree = { id: ROOT_ID, name: 'Root', children: [], indent: -1, parentId: null };
    const stack = [tree];

    lines.forEach((line, index) => {
        const indent = line.search(/\S/);
        const name = line.trim().replace(/^[-*]\s*/, '');
        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
        const parentNode = stack[stack.length - 1];
        const node = { id: `menu-panel-${index}`, name, indent, children: [], parentId: parentNode.id };
        parentNode.children.push(node);
        stack.push(node);
    });

    const flexDiv = document.createElement('div');
    flexDiv.className = 'flexDiv';
    const btn = document.createElement('div');
    btn.className = 'trigger-btn sec_btn';
    btn.textContent = '☰';
    const wrapper = document.createElement('div');
    wrapper.className = 'selectWrapper';

    btn.onclick = (e) => { e.stopPropagation(); wrapper.classList.toggle('isOpen'); };

    function renderNode(node, isRoot = false) {
        if (node.children.length === 0) return;
        const panel = document.createElement('div');
        panel.className = 'multiSelect' + (isRoot ? ' active' : '');
        panel.id = node.id;

        const header = document.createElement('div');
        header.className = 'bottomBorder titleDiv';
        header.textContent = node.name === 'Root' ? 'New feature vector' : node.name;
        panel.appendChild(header);

        node.children.forEach(child => {
            const item = document.createElement('div');
            const hasChild = child.children.length > 0;
            if (hasChild) {
                item.className = 'iconDiv justHover bottomBorder';
                item.innerHTML = `<span>${child.name}</span><span class="nav-icon">»</span>`;
                item.onclick = (e) => {
                    e.stopPropagation();
                    const target = document.getElementById(child.id);
                    if (target) {
                        panel.className = 'multiSelect leftOut'; // 物理左移
                        target.className = 'active multiSelect'; // 物理归位
                    }
                };
            } else {
                item.className = 'iconDiv bottomBorder';
                item.textContent = child.name;
                item.onclick = (e) => {
                    e.stopPropagation();
                    console.log("Action:", child.name);
                    wrapper.classList.remove('isOpen');
                };
            }
            // 在创建末端功能项时，增强扩展性
            if (!hasChild) {
                item.className = 'iconDiv bottomBorder action-item';
                item.dataset.action = child.name; // 将功能名存入 dataset
                item.onclick = (e) => {
                    e.stopPropagation();
                    const actionName = e.currentTarget.dataset.action;
                    // 调用底座注册的 Actions 模块
                    if (typeof MenuActions !== 'undefined' && MenuActions[actionName]) {
                        MenuActions[actionName]();
                    } else {
                        console.warn(`未定义的 Action: ${actionName}`);
                    }
                    wrapper.classList.remove('isOpen');
                };
            }
            panel.appendChild(item);
        });

        if (!isRoot) {
            const back = document.createElement('div');
            back.className = 'topBorder iconDiv noSpace';
            back.innerHTML = `<span class="nav-icon">«</span><span>Back</span>`;
            back.onclick = (e) => {
                e.stopPropagation();
                const parentPanel = document.getElementById(node.parentId);
                if (parentPanel) {
                    panel.className = 'multiSelect'; // 物理右移归位
                    parentPanel.className = 'multiSelect active'; // 物理中心归位
                }
            };
            panel.appendChild(back);
        }
        wrapper.appendChild(panel);
        node.children.forEach(child => renderNode(child, false));
    }

    renderNode(tree, true);
    flexDiv.appendChild(btn);
    flexDiv.appendChild(wrapper);
    container.appendChild(flexDiv);
    // 注入调整后的样式
}

visualizeContainer ();

createUltimateMenu(`
- 核心引擎
  - 渲染器
    - 像素级复刻
    - 丝滑动效
  - 物理系统
- 资源管理
- 功能f
`, 'menu-container');

    // Your code here...
})();

/*
```
*/