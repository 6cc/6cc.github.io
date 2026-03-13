const createPanel = async () => {
  // 1. 在点击时才加载 jsPanel 相关资源
  // referLibrary 内部有唯一性检查，所以重复点击不会重复插入标签
  await referLibrary({
    'panelStyle': 'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.css',
    'jsPanel':    'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.js',
  });

  // 2. 资源加载完成后执行逻辑
  // 注意：由于 referLibrary 会挂载到 window，这里可以直接用
  jsPanel.jsPanel.create({
    headerTitle: '功能窗口',
    content: '这是按需加载的结果',
    theme: 'rebeccapurple',
  });
};

const menuActions = {
  "像素级复刻": () => createPanel (),
  "丝滑动效": () => console.log("执行功能 B"),
  "功能f": () => { document.body.style.background = "#2b3e50"; },
  "default": (name) => console.log(`点击了: ${name}，但未定义具体函数。`),
};

(async () => {
    // 1. 导入加载器
    const coreMod = await import('https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/1_referLibrary.js');
    // 2. 挂载到全局 window 对象
    window.referLibrary = coreMod.referLibrary;

    // 2. 资源加载：使用具有语义的 Key
    await referLibrary({
        'menuCss': 'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/menuAT.css',     // ID将是 style-menuStyle
        'menuAT':    'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/2_menu-AT.js',
    });

    // 3. 直接调用！ 
    // 因为新版 referLibrary 已经帮你把这些模块挂载到了 window.menuAT 和 window.jsPanel
    
    // 生成容器 (假设 implantContainer 已经在 menuAT 中 export)
    menuAT.implantContainer(); 
    
    // 渲染菜单
    menuAT.renderMenu(`
- 核心引擎
  - 渲染器
    - 像素级复刻
    - 丝滑动效
  - 物理系统
- 资源管理
- 功能f
    `, 'menu-container', menuActions);
})();