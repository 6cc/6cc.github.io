(async () => {
    // 1. 导入加载器模块
    // 注意：加载器脚本本身必须包含 export function loadResources...
    const module = await import('https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/loadResources.js');
    
    // 2. 这里的解构赋值更优雅
    const loadResources = module.loadResources || module.default || module;
    
    // 3. 执行资源加载
    // 这里不需要嵌套 async，直接使用刚才加载的函数
    await loadResources({
        'v': 'https://gcore.jsdelivr.net/gh/6cc/6cc.github.io/9/vectorSelection.js'
    });
    
    // 4. 此时 vectorSelection.js 已经加载完成，可以调用其中的初始化函数
    console.log("底座资源加载完毕，系统准备就绪。");
})();