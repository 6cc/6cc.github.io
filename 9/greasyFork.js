(async () => {
    // 1. 导入加载器模块
    // 注意：加载器脚本本身必须包含 export function loadResources...
    const module = await import('https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/0_referLibrary.js');
    
    // 2. 这里的解构赋值更优雅
    const referLibrary = module.referLibrary || module.default || module;
    
    // 3. 执行资源加载
    // 这里不需要嵌套 async，直接使用刚才加载的函数
    await referLibrary({
        0: 'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/menuAT.css',
        'menuAT_js': 'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/menuAT.js',
        '': 'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.css',
        'jsPanel': 'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.js',
    });

    if (window.jsPanel) jsPanel.create({ headerTitle: 'Success' });
    
    // 4. 此时 vectorSelection.js 已经加载完成，可以调用其中的初始化函数
    console.log("底座资源加载完毕，系统准备就绪。");
})();