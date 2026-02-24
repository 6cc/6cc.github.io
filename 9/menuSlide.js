/**
 * 像素级复刻 mdXPawB 风格的多级滑动菜单
 * 包含：Action 映射逻辑、CSS 像素级还原、层级自适应算法
 */
const MenuActions = {
    "功能a": () => alert("执行功能 A"),
    "功能b": () => console.log("执行功能 B"),
    "功能f": () => { document.body.style.background = "#2b3e50"; },
    "default": (name) => console.log(`点击了: ${name}，但未定义具体函数。`)
};

function createExpertMenu(text, containerId) {
    const lines = text.split('\n').filter(l => l.trim());
    const tree = { id: 'root', name: 'Menu', children: [], indent: -1 };
    const stack = [tree];

    // --- 1. 结构解析 (Tree Build) ---
    lines.forEach((line, index) => {
        const indent = line.search(/\S/);
        const name = line.trim().replace(/^[-*]\s*/, '');
        const node = { id: `m${index}`, name, indent, children: [], parentId: 'root' };

        while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
            stack.pop();
        }
        const parent = stack[stack.length - 1];
        node.parentId = parent.id;
        parent.children.push(node);
        stack.push(node);
    });

    // --- 2. HTML 构造 (带有 mdXPawB 类名适配) ---
    let controllers = '<input type="radio" name="nav" id="go-root" class="menu-state" checked>';
    let panels = '';
    let dynamicCss = '';

    function build(node) {
        if (node.children.length === 0) return;

        if (node.id !== 'root') {
            controllers += `<input type="radio" name="nav" id="go-${node.id}" class="menu-state">`;
            dynamicCss += `
                #go-${node.id}:checked ~ .mobile-menu #pane-${node.parentId} { transform: translateX(-100%); opacity: 0; pointer-events: none; }
                #go-${node.id}:checked ~ .mobile-menu #pane-${node.id} { transform: translateX(0); opacity: 1; pointer-events: auto; }
            `;
        }

        let html = `<div class="menu-pane" id="pane-${node.id}">`;
        
        // 头部：复刻原实例的样式
        const isRoot = node.id === 'root';
        html += `
            <div class="menu-header ${isRoot ? '' : 'has-back'}">
                ${isRoot ? `<span>${node.name}</span>` : 
                `<label for="go-${node.parentId}" class="back-link"><i class="fa fa-angle-left"></i> ${node.name}</label>`}
            </div>
            <ul class="menu-list">
        `;

        node.children.forEach(child => {
            const hasChild = child.children.length > 0;
            const actionAttr = hasChild ? '' : `data-action="${child.name}"`;
            
            html += `
                <li class="menu-item">
                    ${hasChild ? 
                        `<label for="go-${child.id}" class="item-link next-step">
                            ${child.name} <i class="fa fa-angle-right"></i>
                        </label>` : 
                        `<a href="javascript:void(0)" class="item-link action-trigger" ${actionAttr}>${child.name}</a>`
                    }
                </li>
            `;
        });
        
        html += `</ul></div>`;
        panels += html;
        node.children.forEach(build);
    }

    build(tree);

    // --- 3. 注入完整样式 (复刻原实例视觉变量) ---
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <style>
            /* 基础变量 */
            :root {
                --md-bg: #2b3e50;
                --md-item-bg: #2b3e50;
                --md-hover: #3b5062;
                --md-text: #ffffff;
                --md-border: rgba(255,255,255,0.05);
                --md-ease: cubic-bezier(0.7, 0, 0.3, 1);
            }

            .menu-state { display: none; }

            /* 容器主体 */
            .mobile-menu {
                position: fixed; right: 30px; bottom: 100px;
                width: 300px; height: 450px;
                background: var(--md-bg);
                border-radius: 4px; overflow: hidden;
                box-shadow: 0 15px 50px rgba(0,0,0,0.3);
                opacity: 0; visibility: hidden; transform: translateY(20px);
                transition: 0.4s var(--md-ease);
                z-index: 999;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            #toggle-menu:checked ~ .mobile-menu { opacity: 1; visibility: visible; transform: translateY(0); }

            /* 面板滑动系统 */
            .menu-pane {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: var(--md-bg); transition: 0.6s var(--md-ease);
                transform: translateX(100%); opacity: 0;
            }
            #pane-root { transform: translateX(0); opacity: 1; }

            /* UI 细节复刻 */
            .menu-header {
                background: rgba(0,0,0,0.2); color: var(--md-text);
                padding: 18px 20px; font-size: 14px; font-weight: bold;
                text-transform: uppercase; letter-spacing: 1px;
                border-bottom: 1px solid var(--md-border);
            }
            .back-link { cursor: pointer; display: block; width: 100%; }
            .back-link i { margin-right: 10px; }

            .menu-list { list-style: none; padding: 0; margin: 0; }
            .menu-item { border-bottom: 1px solid var(--md-border); }
            .item-link {
                display: flex; align-items: center; justify-content: space-between;
                padding: 15px 20px; color: rgba(255,255,255,0.8);
                text-decoration: none; font-size: 15px; transition: 0.2s;
                cursor: pointer;
            }
            .item-link:hover { background: var(--md-hover); color: #fff; }
            .item-link i { opacity: 0.3; font-size: 12px; }

            /* 触发按钮 */
            .menu-toggle-btn {
                position: fixed; right: 30px; bottom: 30px;
                width: 56px; height: 56px; background: var(--md-bg);
                border-radius: 50%; color: #fff; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2); z-index: 1000;
                font-size: 20px;
            }

            ${dynamicCss}
        </style>
        
        ${controllers}
        <input type="checkbox" id="toggle-menu" class="menu-state">
        <label for="toggle-menu" class="menu-toggle-btn"><i class="fa fa-bars"></i></label>
        <div class="mobile-menu">${panels}</div>
    `;

    // --- 4. 事件委托 (Action Mapping) ---
    container.addEventListener('click', (e) => {
        const trigger = e.target.closest('.action-trigger');
        if (trigger) {
            const actionName = trigger.getAttribute('data-action');
            if (MenuActions[actionName]) {
                MenuActions[actionName]();
            } else {
                MenuActions.default(actionName);
            }
        }
    });
}


const appendDiv = () => {
  const newDiv = document.createElement("div");
  newDiv.id = "menu-container";
  document.body.appendChild(newDiv);
};

// 调用示例
const myText = `
- Root
  - 菜单层级1
    - 菜单层级2
      - 菜单层级3
        - 功能f
      - 功能e
    - 菜单层级2
      - 功能d
    - 功能c
    - 功能b
  - 功能a
`;

appendDiv();
createExpertMenu(myText, 'menu-container');