/**
 * 极限实验版：严格注入目标 CSS 风格，并以纯 CSS 状态机驱动
 */
const MenuActions = {
    "功能a": () => alert("执行了：功能a"),
    "功能b": () => console.log("执行了：功能b"),
    "功能c": () => console.log("执行了：功能c"),
    "功能d": () => console.log("执行了：功能d"),
    "功能e": () => console.log("执行了：功能e"),
    "功能f": () => console.log("执行了：功能f"),
    "default": (name) => console.log(`未绑定 Action: ${name}`)
};

function createExperimentalMenu(text, containerId) {
    const lines = text.split('\n').filter(l => l.trim());
    const tree = { id: 'root', name: 'Menu', children: [], indent: -1 };
    const stack = [tree];

    // --- 1. 数据解析 ---
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

    // --- 2. HTML 骨架构造 (严格对齐你的 CSS 类名) ---
    let controllers = '<input type="checkbox" id="toggle-menu" class="nav-state"><input type="radio" name="nav" id="go-root" class="nav-state" checked>';
    let panels = '';
    let dynamicCss = '';

    function build(node) {
        if (node.children.length === 0) return;

        if (node.id !== 'root') {
            controllers += `<input type="radio" name="nav" id="go-${node.id}" class="nav-state">`;
            
            // 核心结合点：将 Radio 状态与你的 clip-path/transform 动效咬合
            dynamicCss += `
                #go-${node.id}:checked ~ .flexDiv .selectWrapper #pane-${node.parentId} { 
                    transform: translateX(-100%); 
                    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); 
                    pointer-events: none;
                }
                #go-${node.id}:checked ~ .flexDiv .selectWrapper #pane-${node.id} { 
                    transform: translateX(0); 
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); 
                    pointer-events: auto;
                }
            `;
        }

        // 使用你的 .multiSelect 作为面板
        panels += `<div class="multiSelect" id="pane-${node.id}">`;
        
        // 头部：如果是子菜单，添加返回上一级的触发器
        if (node.id !== 'root') {
            panels += `
                <label for="go-${node.parentId}" style="display:block;">
                    <div class="iconDiv bottomBorder titleDiv noSpace" style="pointer-events: auto; cursor: pointer; color: var(--textSecondary);">
                        <i class="fa fa-angle-left"></i> <span>${node.name}</span>
                    </div>
                </label>
            `;
        } else {
            panels += `<div class="iconDiv bottomBorder titleDiv"><span>${node.name}</span></div>`;
        }

        // 渲染子项，使用你的 div 布局
        node.children.forEach(child => {
            const hasChild = child.children.length > 0;
            const actionAttr = hasChild ? '' : `data-action="${child.name}"`;
            const labelWrapper = hasChild ? `<label for="go-${child.id}" style="display:block; width:100%;">` : '';
            const labelEnd = hasChild ? `</label>` : '';
            const baseClass = hasChild ? "iconDiv justHover" : "iconDiv action-trigger";

            panels += `
                ${labelWrapper}
                <div class="${baseClass} bottomBorder" ${actionAttr}>
                    <span>${child.name}</span>
                    ${hasChild ? '<i class="fa fa-angle-right"></i>' : ''}
                </div>
                ${labelEnd}
            `;
        });
        
        panels += `</div>`; // end .multiSelect
        node.children.forEach(build);
    }

    build(tree);

    // --- 3. 样式注入与 DOM 拼装 ---
    const container = document.getElementById(containerId);
    
    // 我们将你的 button 样式单独提取给 label 触发器，实现无需 js 的 checkbox 控制
    const triggerBtnStyle = `
        .nav-state { display: none; }
        
        .trigger-btn {
            font-family: "Roboto", sans-serif; font-size: calc(var(--sizeVar) * 1.75); font-weight: 500;
            border: none; outline: none; padding: var(--sizeVar) calc(var(--sizeVar) * 2);
            border-radius: calc(var(--sizeVar) / 2); cursor: pointer;
            background-color: var(--bgColor); color: var(--txtColor);
            box-shadow: 0 0 0 1px var(--borColor) inset; display: inline-block;
        }
        .trigger-btn:hover { --bgColor: #6279e7; }
        .trigger-btn:active { --bgColor: #5468c7; }
        
        /* Checkbox 控制下拉容器的显示 */
        #toggle-menu:checked ~ .flexDiv .selectWrapper {
            opacity: 1; pointer-events: auto;
        }

        /* 修复初始状态的重叠问题 */
        .multiSelect { pointer-events: none; }
        #pane-root { pointer-events: auto; }
        
        /* 引入外部图标库 (确保箭头可见) */
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    `;

    container.innerHTML = `
        <style>
            ${textToCSS()} /* 注入你提供的 CSS 原文 */
            ${triggerBtnStyle}
            ${dynamicCss}
        </style>
        
        ${controllers}
        
        <div class="flexDiv">
            <label for="toggle-menu" class="trigger-btn sec_btn">
                <i class="fa fa-bars"></i> Open Menu
            </label>
            
            <div class="selectWrapper" style="width: 250px;">
                ${panels}
            </div>
        </div>
    `;

    // --- 4. 挂载 Action 映射处理器 ---
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

// 辅助函数：存放你提供的 CSS 字符串
function textToCSS() {
    return `
        :root {
          --bgColor: #0fddaf; --txtColor: #ffffff; --borColor: rgba(0, 0, 0, 0);
          --sizeVar: 8px; --textPrimary: #4b4760; --textSecondary: #7f7989;
          --borderColor: #cccccc;
        }
        body { font-family: "Roboto", sans-serif; font-weight: 400; font-size: calc(var(--sizeVar) * 1.75); }
        .flexDiv { display: flex; flex-direction: column; align-items: flex-start; width: fit-content; margin: 32px; }
        .selectWrapper {
          width: 100%; position: relative; opacity: 0; pointer-events: none;
          transition: opacity 100ms linear 0s; filter: drop-shadow(0 6px 26px rgba(0, 0, 0, 0.24));
          padding-top: calc(var(--sizeVar) / 2);
        }
        .multiSelect {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          border: 1px solid var(--borderColor); box-sizing: border-box;
          border-radius: calc(var(--sizeVar) / 2); position: absolute;
          width: auto; left: 0; right: 0; overflow: hidden; background: #ffffff;
          transition: transform 300ms ease-in-out 0s, clip-path 300ms ease-in-out 0s;
        }
        .multiSelect div { color: var(--textPrimary); padding: 16px; width: auto; cursor: pointer; }
        .multiSelect div:hover { background-color: #f6f6f6; }
        .bottomBorder { border-bottom: 1px solid var(--borderColor); }
        .topBorder { border-top: 1px solid var(--borderColor); }
        .iconDiv { display: flex; align-items: center; justify-content: space-between; }
        .noSpace { justify-content: flex-start; gap: 6px; }
        .titleDiv { pointer-events: none; font-weight: 700; }
        .justHover i { opacity: 0; }
        .justHover:hover i { opacity: 1; }
        .multiSelect .placeholder { color: var(--textSecondary); font-style: italic; }
        .multiSelect .narrow { padding-top: 10px; padding-bottom: 10px; }
        .multiSelect i { color: var(--textSecondary); }
        .multiSelect { transform: translateX(100%); clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
        .multiSelect:nth-of-type(1) { transform: translateX(0); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
        .sec_btn { --bgColor: #869cff; }
    `;
}

(() => {
  const newDiv = document.createElement("div");
  newDiv.id = "menu-container";
  document.body.appendChild(newDiv);
})();

// 启动代码
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
createExperimentalMenu(myText, 'menu-container');