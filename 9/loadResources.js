/**
 * 增强版动态加载器
 * @param {string|string[]} inputs 
 * @param {Object} options { callback: Function, name: '全局变量名' }
 */
async function loadResources(inputs, { callback, name } = {}) {
    const urls = Array.isArray(inputs) ? inputs : [inputs];
    
    const results = await Promise.all(urls.map(async (url) => {
        const type = url.match(/\.(css|CSS)($|\?)/) || url.includes('_CSS.md') ? 'css' : 'js';
        
        if (isAlreadyLoaded(url)) return null;

        if (type === 'css') {
            return loadCSS(url);
        } else {
            // JS 加载逻辑
            try {
                // 尝试 ESM 导入
                const module = await import(url);
                
                // 如果指定了全局变量名（如 'jsPanel'），手动挂载
                if (name) {
                    window[name] = module.default || module[name] || module;
                }
                return module;
            } catch (err) {
                // 回退到传统 script 标签
                return createScriptTag(url);
            }
        }
    }));

    // 加载完成后执行回调
    if (callback && typeof callback === 'function') {
        callback(results);
    }

    return results;
}

// 辅助函数：判断是否重复加载
function isAlreadyLoaded(url) {
    return !!document.querySelector(`link[href="${url}"], script[src="${url}"]`);
}

// 辅助函数：创建 script 标签
function createScriptTag(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve(window); // 传统脚本通常直接看 window
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadCSS(url) {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = resolve;
        document.head.appendChild(link);
    });
}

(async () => {
    await loadResources([
        'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.css',
        'https://gcore.jsdelivr.net/gh/Flyer53/jsPanel4/es6module/jspanel.min.js'
    ], { name: 'jsPanel' });

    // 此时 jsPanel 已经准备好在全局使用了
    jsPanel.create({
        headerTitle: 'My Panel',
        content: 'Done!'
    });
})();