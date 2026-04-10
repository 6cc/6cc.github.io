export async function referLibrary(inputs, { callback, forceTag = false } = {}) {
    // 1. 标准化输入
    let tasks = [];
    if (typeof inputs === 'string') {
        tasks = [{ name: null, url: inputs }];
    } else if (Array.isArray(inputs)) {
        tasks = inputs.filter(u => u && typeof u === 'string').map(u => ({ name: null, url: u }));
    } else {
        tasks = Object.entries(inputs).map(([name, url]) => ({ name, url }));
    }

    // 2. 并行执行任务
    const results = await Promise.all(tasks.map(async (task) => {
        const { name, url } = task;
        const isCSS = url.match(/\.(css|CSS)($|\?)/) || url.includes('_CSS.md');

        try {
            if (isCSS) {
                return await _loadCSS(url, name, forceTag);
            } else {
                return await _loadJS(url, name, forceTag);
            }
        } catch (err) {
            console.error(`[Loader] Failed to load: ${url}`, err);
            return null;
        }
    }));

    if (callback) callback(results);
    return results;
}

// --- 内部核心逻辑 ---

/**
 * 检测库的模块格式（ESM / UMD / Global）
 */
function _detectLibraryFormat(url) {
    // 通过 URL 特征推断格式
    if (url.includes('umd') || url.includes('.umd.')) {
        return 'umd';
    }
    if (url.includes('esm') || url.includes('.esm.')) {
        return 'esm';
    }
    // 默认尝试 ESM，失败则回退到 UMD
    return 'auto';
}

/**
 * 从全局命名空间中提取导出
 * UMD 库通常将导出挂载到 window 上
 */
function _extractFromGlobal(name, url) {
    if (!name) return null;

    // 尝试多种命名约定
    const candidates = [
        name,                                    // jsPanel
        name.charAt(0).toUpperCase() + name.slice(1), // JsPanel
        name.toUpperCase(),                      // JSPANEL
        name.toLowerCase(),                      // jspanel
        `$${name}`,                              // $jsPanel（jquery 风格）
    ];

    for (const candidate of candidates) {
        if (window[candidate] !== undefined) {
            return window[candidate];
        }
    }

    console.warn(`[Loader] Could not find global export for "${name}" in ${url}`);
    return null;
}

/**
 * 等待全局变量出现（用于异步挂载的 UMD 库）
 */
function _waitForGlobal(name, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkInterval = setInterval(() => {
            const value = _extractFromGlobal(name);
            if (value !== null) {
                clearInterval(checkInterval);
                resolve(value);
                return;
            }

            if (Date.now() - startTime > timeout) {
                clearInterval(checkInterval);
                reject(new Error(`[Loader] Timeout waiting for global "${name}" (${timeout}ms)`));
            }
        }, 50);
    });
}

async function _loadJS(url, name, forceTag) {
    // 检查是否已存在
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
        // 如果需要 name，从全局提取
        if (name) {
            return _extractFromGlobal(name) || window[name] || true;
        }
        return true;
    }

    const format = _detectLibraryFormat(url);

    // 策略 1：尝试 ESM import（仅在 format 不是 'umd' 时）
    if (!forceTag && format !== 'umd') {
        try {
            const module = await import(url);

            if (name) {
                let exportObj;
                if (module[name]) {
                    exportObj = module[name];
                } else if (module.default) {
                    exportObj = module.default;
                } else {
                    exportObj = module;
                }
                window[name] = exportObj;
            }

            return module;
        } catch (e) {
            if (format === 'esm') {
                // 如果明确指定是 ESM，则报错
                throw e;
            }
            // 否则继续尝试 UMD 加载
            console.warn(`[Loader] ESM import() failed for ${url}, trying UMD load...`);
        }
    }

    // 策略 2：通过 script 标签加载（UMD 或回退）
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('data-loader', 'referLibrary');

        script.onload = async () => {
            try {
                let result = true;

                if (name) {
                    // 尝试立即获取全局变量
                    let exported = _extractFromGlobal(name);

                    // 如果获取失败，等待（某些 UMD 库有延迟）
                    if (!exported) {
                        exported = await _waitForGlobal(name, 2000).catch(() => null);
                    }

                    result = exported || window[name] || true;
                }

                resolve(result);
            } catch (err) {
                reject(err);
            }
        };

        script.onerror = () => {
            reject(new Error(`[Loader] Failed to load script: ${url}`));
        };

        document.head.appendChild(script);
    });
}

async function _loadCSS(url, name, forceTag) {
    const styleId = name ? `style-${name}` : `style-css-${Math.random().toString(36).substr(2, 5)}`;

    // 检查 ID 或 URL 是否已存在
    if (document.getElementById(styleId) || document.querySelector(`link[href="${url}"]`)) {
        return true;
    }

    // 策略：优先使用 style + @import 模式
    const isStandard = url.match(/\.css($|\?)/);
    if (!forceTag && isStandard) {
        return new Promise((resolve) => {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `@import url("${url}");`;
            document.head.appendChild(style);

            requestAnimationFrame(() => resolve(style));
        });
    }

    // 回退到传统 link 标签
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => resolve(link);
        link.onerror = () => {
            reject(new Error(`[Loader] Failed to load CSS: ${url}`));
        };
        document.head.appendChild(link);
    });
}
