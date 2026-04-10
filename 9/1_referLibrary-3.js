/**
 * 智能库加载模块（支持 ESM、UMD、全局脚本）
 */
const ReferLibrary = {
  // 缓存已加载的库
  cache: new Map(),

  /**
   * 检测库的类型
   */
  async detectLibraryType(url) {
    try {
      const response = await fetch(url);
      const content = await response.text();
      
      // 检测 ESM
      if (content.includes('export ') || content.includes('export default')) {
        return 'esm';
      }
      
      // 检测 UMD（标志性特征）
      if (content.includes('(function (global, factory)') || 
          content.includes('typeof exports === \'object\'')) {
        return 'umd';
      }
      
      // 默认当作全局脚本
      return 'global';
    } catch (error) {
      console.warn('类型检测失败，默认为全局脚本:', error);
      return 'global';
    }
  },

  /**
   * 加载 ESM 模块
   */
  async loadESM(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }
    const module = await import(url);
    this.cache.set(url, module);
    return module;
  },

  /**
   * 加载 UMD 模块
   */
  loadUMD(url, exportName = null) {
    return new Promise((resolve, reject) => {
      if (this.cache.has(url)) {
        resolve(this.cache.get(url));
        return;
      }

      // 记录加载前的全局变量
      const globalKeysBefore = new Set(Object.keys(window));

      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';

      script.onload = () => {
        try {
          // 方案 1：使用指定的导出名称
          if (exportName && window[exportName]) {
            const lib = window[exportName];
            this.cache.set(url, lib);
            resolve(lib);
            return;
          }

          // 方案 2：自动检测新增的全局变量（最常见的 UMD 模式）
          const globalKeysAfter = Object.keys(window);
          const newKeys = globalKeysAfter.filter(
            key => !globalKeysBefore.has(key) && 
                    !key.startsWith('webkit') &&
                    !key.startsWith('chrome')
          );

          if (newKeys.length > 0) {
            // 优先选择最可能是库名的变量
            const libName = newKeys.find(key => 
              !key.startsWith('_') && 
              key.charAt(0) === key.charAt(0).toUpperCase()
            ) || newKeys[0];

            const lib = window[libName];
            this.cache.set(url, { [libName]: lib, default: lib });
            resolve(lib);
            return;
          }

          // 方案 3：常见的库名映射
          const commonNames = ['Fancybox', 'FancyBox', 'fancybox', 'Fancyapps'];
          for (const name of commonNames) {
            if (window[name]) {
              const lib = window[name];
              this.cache.set(url, lib);
              resolve(lib);
              return;
            }
          }

          reject(new Error('UMD 库加载成功但无法找到导出对象'));
        } catch (error) {
          reject(error);
        }
      };

      script.onerror = () => {
        reject(new Error(`Failed to load UMD script: ${url}`));
      };

      document.head.appendChild(script);
    });
  },

  /**
   * 加载全局脚本
   */
  loadGlobal(url, callback) {
    return new Promise((resolve, reject) => {
      if (this.cache.has(url)) {
        resolve(this.cache.get(url));
        return;
      }

      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        const result = callback ? callback() : true;
        this.cache.set(url, result);
        resolve(result);
      };

      script.onerror = () => {
        reject(new Error(`Failed to load script: ${url}`));
      };

      document.head.appendChild(script);
    });
  },

  /**
   * 统一加载接口
   */
  async load(url, options = {}) {
    const {
      type = 'auto',      // 'auto', 'esm', 'umd', 'global'
      exportName = null,  // UMD 的导出名称
      callback = null     // 全局脚本的回调
    } = options;

    try {
      let libraryType = type;

      // 自动检测类型
      if (type === 'auto') {
        libraryType = await this.detectLibraryType(url);
      }

      // 根据类型加载
      switch (libraryType) {
        case 'esm':
          return await this.loadESM(url);
        
        case 'umd':
          return await this.loadUMD(url, exportName);
        
        case 'global':
        default:
          return await this.loadGlobal(url, callback);
      }
    } catch (error) {
      console.error(`库加载失败: ${url}`, error);
      throw error;
    }
  }
};
