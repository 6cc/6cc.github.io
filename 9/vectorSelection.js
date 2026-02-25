/**
 * 实验项目：createElement 递归逻辑全修正版
 * 修复：多分支路径下的父级回溯失效问题
 */

const MenuConfig = {
    actions: {
        "功能A": () => alert("执行功能 A"),
        "default": (name) => console.log("执行功能:", name)
    }
};

function createDomMenu(text, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // --- 1. 数据解析 (Tree Structure) ---
    const lines = text.split('\n').filter(l => l.trim());
    // 统一 Root ID 命名
    const ROOT_ID = 'menu-panel-root';
    const tree = { id: ROOT_ID, name: 'Root', children: [], indent: -1, parentId: null };
    const stack = [tree];

    lines.forEach((line, index) => {
        const indent = line.search(/\S/);
        const name = line.trim().replace(/^[-*]\s*/, '');
        
        // 动态生成 ID，并确保它能通过 stack 找到真实的父节点 ID
        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
            stack.pop();
        }
        
        const parentNode = stack[stack.length - 1];
        const node = { 
            id: `menu-panel-${index}`, 
            name, 
            indent, 
            children: [], 
            parentId: parentNode.id // 关键：此处确保了 parentId 永远指向 stack 中的父级
        };
        
        parentNode.children.push(node);
        stack.push(node);
    });

    // --- 2. 界面外层 ---
    const flexDiv = document.createElement('div');
    flexDiv.className = 'flexDiv';

    const btn = document.createElement('div');
    btn.className = 'trigger-btn sec_btn';
    btn.textContent = '☰';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'selectWrapper';

    btn.onclick = (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('isOpen');
    };

    // --- 3. 递归生成面板 ---
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
                        panel.classList.replace('active', 'leftOut');
                        target.classList.add('active');
                    }
                };
            } else {
                item.className = 'iconDiv bottomBorder';
                item.textContent = child.name;
                item.onclick = (e) => {
                    e.stopPropagation();
                    (MenuConfig.actions[child.name] || MenuConfig.actions.default)(child.name);
                    wrapper.classList.remove('isOpen');
                };
            }
            panel.appendChild(item);
        });

        // 返回逻辑
        if (!isRoot) {
            const back = document.createElement('div');
            back.className = 'topBorder iconDiv noSpace';
            back.innerHTML = `<span class="nav-icon">«</span><span>⬅️Back</span>`;
            back.onclick = (e) => {
                e.stopPropagation();
                const parentPanel = document.getElementById(node.parentId);
                if (parentPanel) {
                    panel.classList.remove('active');
                    parentPanel.classList.remove('leftOut');
                    parentPanel.classList.add('active');
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

    injectStyles();
}

function injectStyles() {
    if (document.getElementById('pixel-style')) return;
    const style = document.createElement('style');
    style.id = 'pixel-style';
    style.textContent = `
        :root { --bgColor: #869cff; --sizeVar: 8px; --borderColor: #cccccc; --textPrimary: #4b4760; --textSecondary: #7f7989; }
        .flexDiv { position: fixed; right: 30px; bottom: 30px; display: flex; flex-direction: column-reverse; align-items: flex-end; font-family: 'Segoe UI', system-ui, sans-serif; }
        .trigger-btn { width: 50px; height: 50px; background: var(--bgColor); color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 4px; cursor: pointer; font-size: 24px; transition: 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.1); user-select: none; }
        .trigger-btn:hover { background: #6279e7; }
        .selectWrapper { width: 260px; height: 400px; position: relative; margin-bottom: 20px; opacity: 0; pointer-events: none; transition: 300ms cubic-bezier(0.4, 0, 0.2, 1); filter: drop-shadow(0 6px 26px rgba(0, 0, 0, 0.24)); }
        .selectWrapper.isOpen { opacity: 1; pointer-events: auto; }
        .multiSelect { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; background: #fff; border: 1px solid var(--borderColor); border-radius: 4px; transform: translateX(100%); clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); transition: transform 350ms ease-in-out, clip-path 350ms ease-in-out; display: flex; flex-direction: column; overflow: hidden; }
        .multiSelect.active { transform: translateX(0); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); z-index: 10; }
        .multiSelect.leftOut { transform: translateX(-100%); clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
        .iconDiv { display: flex; align-items: center; justify-content: space-between; padding: 16px; cursor: pointer; color: var(--textPrimary); font-size: 14px; }
        .iconDiv:hover { background-color: #f6f6f6; }
        .bottomBorder { border-bottom: 1px solid var(--borderColor); padding: 16px; }
        .topBorder { border-top: 1px solid var(--borderColor); margin-top: auto; }
        .titleDiv { font-weight: 700; color: var(--textPrimary); }
        .noSpace { justify-content: flex-start; gap: 8px; color: var(--textSecondary); }
        .nav-icon { font-weight: bold; font-size: 16px; line-height: 1; }
    `;
    document.head.appendChild(style);
}

(() => {
  const newDiv = document.createElement("div");
  newDiv.id = "menu-container";
  document.body.appendChild(newDiv);
})();

// 验证用文本
createDomMenu(`
- 菜单1
  - 子菜单1.1
    - 功能A
- 菜单2
  - 子菜单2.1
    - 功能B
`, 'menu-container');