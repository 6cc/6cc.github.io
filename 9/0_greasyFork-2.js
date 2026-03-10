(async () => {
    // 1. 导入加载器
    const { referLibrary } = await import('https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/1_referLibrary.js');

    // 2. 资源加载：使用具有语义的 Key
    await referLibrary({
        'menuStyle': 'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/menuAT.css',     // ID将是 style-menuStyle
        'menuAT':    'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/2_menu-AT-IC.js',
        'panelStyle':'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.css',
        'jsPanel':   'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.js',
    });

    // 3. 直接调用！ 
    // 因为新版 referLibrary 已经帮你把这些模块挂载到了 window.menuAT 和 window.jsPanel
    
    // 生成容器 (假设 implantContainer 已经在 menuAT 中 export)
    menuAT.implantContainer(); 
    
    // 渲染菜单
    menuAT.renderMenu(`
- 核心引擎
  - 渲染器
- 资源管理
    `, 'menu-container');

    // 创建 jsPanel
    // 注意：如果是官方 ESM 版，jsPanel 可能是对象里的一个属性
    const panel = (jsPanel.jsPanel || jsPanel).create({
        headerTitle: '系统底座',
        content: '资源加载成功！'
    });

})();