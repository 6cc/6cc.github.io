/**
 * 像素级复刻：纯 CSS 驱动的多级滑动菜单生成器
 */
function createPixelPerfectMenu(text, containerId) {
    const lines = text.split('\n').filter(l => l.trim());
    const nodes = [];
    
    // --- 步骤 1: 转换为扁平数组并计算缩进 ---
    const rawData = lines.map((line, index) => {
        const indent = line.search(/\S/);
        const content = line.trim().replace(/^[-*]\s*/, '');
        return { id: `m${index}`, name: content, indent, children: [], parentId: 'root' };
    });

    // --- 步骤 2: 构建树形结构 (修复版) ---
    const tree = { id: 'root', name: 'Root', children: [] };
    const stack = [tree];

    rawData.forEach(node => {
        while (stack.length > 1 && node.indent <= stack[stack.length - 1].indent) {
            stack.pop();
        }
        const parent = stack[stack.length - 1];
        node.parentId = parent.id;
        parent.children.push(node);
        stack.push(node);
    });

    // --- 步骤 3: 递归生成 HTML 组件 ---
    let controllers = '<input type="radio" name="nav" id="go-root" class="nav-state" checked>';
    let panels = '';
    let dynamicCss = '';

    function build(node) {
        if (node.children.length === 0) return;

        // 如果不是 root，生成对应的 Radio 状态机
        if (node.id !== 'root') {
            controllers += `<input type="radio" name="nav" id="go-${node.id}" class="nav-state">`;
            // 核心动态 CSS：当前 Radio 选中时，控制父面板移出，子面板移入
            dynamicCss += `
                #go-${node.id}:checked ~ .menu-wrapper #pane-${node.parentId} { transform: translateX(-100%); opacity: 0; }
                #go-${node.id}:checked ~ .menu-wrapper #pane-${node.id} { transform: translateX(0); opacity: 1; }
            `;
        }

        // 生成当前层级的面板
        let html = `<div class="menu-pane" id="pane-${node.id}">`;
        
        // 头部标题（除 root 外显示返回按钮）
        const headerName = node.id === 'root' ? 'Menu' : node.name;
        const backAction = node.id === 'root' ? '' : `label for="go-${node.parentId}" class="back-btn"`;
        const backIcon = node.id === 'root' ? '' : `<i class="fa fa-angle-left"></i> `;
        
        html += `<div class="item back-header">
                    ${backAction ? `<${backAction}>${backIcon}${headerName}</label>` : headerName}
                 </div>`;

        html += `<ul>`;
        node.children.forEach(child => {
            html += `<li>`;
            if (child.children.length > 0) {
                // 是节点：显示箭头，点击进入下一级
                html += `<label for="go-${child.id}" class="item has-child">
                            ${child.name} <span class="arrow"></span>
                         </label>`;
            } else {
                // 是末端：普通功能链接
                html += `<a href="#" class="item no-child">${child.name}</a>`;
            }
            html += `</li>`;
        });
        html += `</ul></div>`;
        
        panels += html;
        node.children.forEach(build);
    }

    build(tree);

    // --- 步骤 4: 注入样式与 HTML ---
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <style>
            .nav-state { display: none; } /* 隐藏那些 Radio */
            .menu-wrapper { 
                position: fixed; right: 30px; bottom: 90px;
                width: 300px; height: 450px; background: #fff;
                border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                overflow: hidden; opacity: 0; visibility: hidden; 
                transform: translateY(20px); transition: 0.4s cubic-bezier(0.7, 0, 0.3, 1);
            }
            #toggle-main:checked ~ .menu-wrapper { opacity: 1; visibility: visible; transform: translateY(0); }
            
            .menu-pane { 
                position: absolute; width: 100%; height: 100%; top: 0; left: 0;
                background: #fff; transition: 0.5s cubic-bezier(0.7, 0, 0.3, 1);
                transform: translateX(100%); opacity: 0;
            }
            #pane-root { transform: translateX(0); opacity: 1; } /* 初始面板位置 */

            .item { display: flex; align-items: center; justify-content: space-between; padding: 15px 20px; color: #444; text-decoration: none; cursor: pointer; border-bottom: 1px solid #f2f2f2; font-size: 14px; }
            .item:hover { background: #fafafa; }
            .back-header { background: #fafafa; font-weight: bold; text-transform: uppercase; font-size: 12px; }
            .back-btn { width: 100%; display: block; }
            .arrow::before { content: "\\f105"; font-family: FontAwesome; color: #ccc; }
            ${dynamicCss}
        </style>
        
        ${controllers}
        <input type="checkbox" id="toggle-main" class="nav-state">
        <label for="toggle-main" style="position:fixed; right:30px; bottom:30px; width:50px; height:50px; background:#000; border-radius:50%; color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:1001;">
            <i class="fa fa-bars"></i>
        </label>
        <div class="menu-wrapper">${panels}</div>
    `;
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
createPixelPerfectMenu(myText, 'menu-container');