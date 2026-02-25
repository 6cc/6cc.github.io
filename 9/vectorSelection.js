/**
 * 终极复刻版：实现紧贴的 1px 边界滑动
 * 策略：取消内部面板 clip-path，改用整体容器 overflow + 物理位移
 */

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
    if (!document.getElementById('ultimate-style')) {
        const style = document.createElement('style');
        style.id = 'ultimate-style';
        style.textContent = `
            :root { --bgColor: #869cff; --sizeVar: 8px; --borderColor: #cccccc; --textPrimary: #4b4760; }
            .flexDiv { position: fixed; right: 30px; bottom: 30px; display: flex; flex-direction: column-reverse; align-items: flex-end; font-family: system-ui, -apple-system, sans-serif; }
            .trigger-btn { width: 50px; height: 50px; background: var(--bgColor); color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 4px; cursor: pointer; font-size: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            
            /* 关键点 1：外层容器负责整体裁剪，不留阴影虚边 */
            .selectWrapper { 
                width: 260px; height: 400px; position: relative; margin-bottom: 15px;
                opacity: 0; pointer-events: none; transition: opacity 250ms;
                overflow: hidden; /* 这里是 1px 边界的关键 */
                border-radius: 4px;
                background: #fff;
                border: 1px solid var(--borderColor);
                box-shadow: 0 6px 26px rgba(0, 0, 0, 0.24);
            }
            .selectWrapper.isOpen { opacity: 1; pointer-events: auto; }

            /* 关键点 2：内部面板只做单纯的 X 轴位移 */
            .multiSelect { 
                position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                background: #fff;
                transform: translateX(100%); /* 默认在右侧 */
                transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
                display: flex; flex-direction: column;
                /* 关键修复：同时添加左右两侧的内阴影边框 */
                /* -1px 是左边框，1px 是右边框 */
                box-shadow: -1px 0 0 0 var(--borderColor), 
                1px 0 0 0 var(--borderColor);
            }
            
            /* 状态机逻辑 */
            .multiSelect.active { transform: translateX(0); z-index: 2; }
            .multiSelect.leftOut { transform: translateX(-100%); z-index: 1; }

            .iconDiv { display: flex; align-items: center; justify-content: space-between; padding: 15px; cursor: pointer; color: var(--textPrimary); font-size: 14px; border-bottom: 1px solid #f0f0f0; }
            .iconDiv:hover { background-color: #f6f6f6; }
            .titleDiv { font-weight: 700; padding: 15px; border-bottom: 1px solid var(--borderColor); }
            .topBorder { margin-top: auto; border-top: 1px solid var(--borderColor); }
            .noSpace { justify-content: flex-start; gap: 8px; color: #7f7989; }
            .nav-icon { font-size: 16px; line-height: 1; }
        `;
        document.head.appendChild(style);
    }
}

createUltimateMenu(`
- 核心引擎
  - 渲染器
    - 像素级复刻
    - 丝滑动效
  - 物理系统
- 资源管理
`, 'menu-container');