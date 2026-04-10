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
    if (url.includes('umd') || url.includes('.umd.')) {
        return 'umd';
    }
    if (url.includes('esm') || url.includes('.esm.')) {
        return 'esm';
    }
    return 'auto';
}

/**
 * 智能推断导出名称（当未显式指定时）
 */
function _inferExportName(url) {
    // 从 URL 中提取可能的库名
    // fancybox.esm.min.js -> fancybox -> Fancybox
    const match = url.match(/\/([a-zA-Z0-9\-_]+)(?:\.(?:esm|umd))?(?:\.min)?\.js/);
    if (!match) return null;

    const name = match[1];
    
    // 常见的大小写转换规则
    const pascalCase = name
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');

    return pascalCase;
}

/**
 * 从全局命名空间中提取导出
 */
function _extractFromGlobal(name, url) {
    if (!name) return null;

    // 尝试多种命名约定
    const candidates = [
        name,
        name.charAt(0).toUpperCase() + name.slice(1),
        name.toUpperCase(),
        name.toLowerCase(),
        `$${name}`,
    ];

    for (const candidate of candidates) {
        if (window[candidate] !== undefined) {
            return window[candidate];
        }
    }

    return null;
}

/**
 * 等待全局变量出现
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
        if (name) {
            return _extractFromGlobal(name) || window[name] || true;
        }
        return true;
    }

    const format = _detectLibraryFormat(url);
    
    // 如果未指定 name，尝试从 URL 推断
    let inferredName = name;
    if (!name && format === 'esm') {
        inferredName = _inferExportName(url);
    }

    // 策略 1：尝试 ESM import
    if (!forceTag && format !== 'umd') {
        try {
            const module = await import(url);

            if (inferredName || name) {
                const targetName = inferredName || name;
                let exportObj;

                // 优先级：同名导出 > default 导出 > 整个 module
                if (module[targetName]) {
                    exportObj = module[targetName];
                } else if (module.default) {
                    exportObj = module.default;
                } else {
                    exportObj = module;
                }

                // 挂载到全局
                window[targetName] = exportObj;
            }

            return module;
        } catch (e) {
            if (format === 'esm') {
                throw e;
            }
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

                if (inferredName || name) {
                    const targetName = inferredName || name;
                    let exported = _extractFromGlobal(targetName);

                    if (!exported) {
                        exported = await _waitForGlobal(targetName, 2000).catch(() => null);
                    }

                    result = exported || window[targetName] || true;
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

    if (document.getElementById(styleId) || document.querySelector(`link[href="${url}"]`)) {
        return true;
    }

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
