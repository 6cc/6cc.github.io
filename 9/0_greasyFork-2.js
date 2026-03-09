(async () => {
    // 1. 导入加载器模块
    // 注意：加载器脚本本身必须包含 export function loadResources...
    const module = await import('https://gcore.jsdelivr.net/gh/qqvvv/qqvvv.github.io/content/6/0_referLibrary.js');
    
    // 3. 执行资源加载
    // 这里不需要嵌套 async，直接使用刚才加载的函数
    // 1. 加载资源并拿到返回的模块对象
    const lib = await module.referLibrary({
        0: 'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/menuAT.css',
        'menuAT': 'https://qqvvv.github.io/6/2_menu-AT.js',
        1: 'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.css',
        'jsPanel': 'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.js',
    });

    // 2. 从返回的对象中解构函数 (不管你在 2_menu-AT.js 里 export 了多少个)
    const { implantContainer, renderMenu } = lib.menuAT;
    const { jsPanel } = lib.jsPanel;

    // 3. 执行逻辑
    if (lib.menuAT) {
        const container = implantContainer(); 
        renderMenu(`- 菜单数据...`, container);
    }
    if (lib.jsPanel) {
        jsPanel.create({ headerTitle: 'Success' });
    }
    
    console.log("底座已完美解析 ESM 模块内容");
})();