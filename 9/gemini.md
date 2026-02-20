```js
// 更加现代且低干扰的方案
const trigger = document.createElement('div');
const style = {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#000',
    opacity: '0.2',
    zIndex: '999999',
    cursor: 'pointer',
    transition: 'opacity 0.2s, transform 0.2s',
    border: '1px solid rgba(255,255,255,0.5)'
};

Object.assign(trigger.style, style);

// 交互效果
trigger.addEventListener('mouseenter', () => {
    trigger.style.opacity = '0.8';
    trigger.style.transform = 'scale(1.5)';
});
trigger.addEventListener('mouseleave', () => {
    trigger.style.opacity = '0.2';
    trigger.style.transform = 'scale(1)';
});

document.body.appendChild(trigger);
```

```js
/**
 * 初始化菜单触发器
 * 采用单例模式，确保全局只存在一个实例
 */
const setupMenuTrigger = () => {
    const TRIGGER_ID = 'custom-menu-trigger';

    // 1. 定义生成触发器的核心逻辑
    const createTrigger = () => {
        // 再次检查防止竞态条件（尤其是在异步回调中）
        if (document.getElementById(TRIGGER_ID)) return;

        const dot = document.createElement('div');
        dot.id = TRIGGER_ID;
        
        // 结合上一步讨论的圆点样式
        Object.assign(dot.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 0 4px rgba(0,0,0,0.2)',
            zIndex: '2147483647',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.4)'
        });

        // 悬停反馈
        dot.onmouseenter = () => {
            dot.style.transform = 'scale(1.4)';
            dot.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        };
        dot.onmouseleave = () => {
            dot.style.transform = 'scale(1)';
            dot.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        };

        document.body.appendChild(dot);
        console.log("Menu trigger initialized.");
    };

    // 2. 检查环境并决定执行时机
    if (document.getElementById(TRIGGER_ID)) {
        // 如果已经存在，直接退出
        return;
    }

    // 检查 DOM 是否已经准备好操作 body
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        createTrigger();
    } else {
        // 针对 document-start 或加载中的情况
        document.addEventListener('DOMContentLoaded', createTrigger);
    }
};

// 执行初始化
setupMenuTrigger();
```

```js
const setupMenuSystem = () => {
    const TRIGGER_ID = 'custom-menu-trigger';
    const MENU_ID = 'custom-menu-panel';

    // 1. 创建菜单面板
    const createMenu = () => {
        if (document.getElementById(MENU_ID)) return document.getElementById(MENU_ID);

        const menu = document.createElement('div');
        menu.id = MENU_ID;
        
        // 菜单面板样式
        Object.assign(menu.style, {
            position: 'fixed',
            bottom: '45px', // 位于圆点上方
            right: '20px',
            width: '150px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '8px 0',
            zIndex: '2147483647',
            display: 'none', // 初始隐藏
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all 0.2s ease-out',
            transform: 'translateY(10px) scale(0.95)',
            opacity: '0',
            border: '1px solid #eee'
        });

        // 添加菜单项示例
        const menuItems = [
            { text: '🚀 功能一', action: () => alert('功能一被触发') },
            { text: '⚙️ 设置', action: () => console.log('打开设置') },
            { text: '❌ 关闭菜单', action: () => toggleMenu(false) }
        ];

        menuItems.forEach(item => {
            const btn = document.createElement('div');
            btn.innerText = item.text;
            Object.assign(btn.style, {
                padding: '10px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#333',
                transition: 'background 0.2s'
            });

            btn.onmouseenter = () => btn.style.backgroundColor = '#f5f5f5';
            btn.onmouseleave = () => btn.style.backgroundColor = 'transparent';
            btn.onclick = (e) => {
                e.stopPropagation();
                item.action();
                toggleMenu(false); // 点击后自动收起
            };
            menu.appendChild(btn);
        });

        document.body.appendChild(menu);
        return menu;
    };

    // 2. 控制菜单显隐的逻辑
    const toggleMenu = (show) => {
        const menu = document.getElementById(MENU_ID) || createMenu();
        if (show) {
            menu.style.display = 'flex';
            // 稍作延迟以触发 CSS 过渡动画
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.transform = 'translateY(0) scale(1)';
            }, 10);
        } else {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(10px) scale(0.95)';
            setTimeout(() => { menu.style.display = 'none'; }, 200);
        }
    };

    // 3. 初始化触发器（圆点）
    const init = () => {
        if (document.getElementById(TRIGGER_ID)) return;

        const dot = document.createElement('div');
        dot.id = TRIGGER_ID;
        // 复用你之前的圆点样式
        Object.assign(dot.style, {
            position: 'fixed', bottom: '20px', right: '20px',
            width: '12px', height: '12px', borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: '2147483647',
            cursor: 'pointer', transition: 'all 0.3s'
        });

        // 点击圆点切换菜单
        dot.onclick = (e) => {
            e.stopPropagation(); // 防止冒泡到 document
            const menu = document.getElementById(MENU_ID) || createMenu();
            const isVisible = menu.style.display === 'flex';
            toggleMenu(!isVisible);
        };

        document.body.appendChild(dot);
    };

    // 4. 点击页面其他地方关闭菜单
    document.addEventListener('click', () => toggleMenu(false));

    // 环境检查并启动
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
};

setupMenuSystem();
```