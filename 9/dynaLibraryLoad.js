/**
 * 智能动态库加载器
 * 特点：CORS 友好、错误处理、缓存机制、自动容错
 */
class DynamicLibraryLoader {
  // 模块缓存，避免重复加载
  static moduleCache = new Map();

  // 推荐的 CDN 列表（优先级从高到低）
  static CDN_PRIORITY = [
    'https://esm.sh/{name}@{version}',      // 最佳：官方支持
    'https://cdn.jsdelivr.net/npm/{name}@{version}/+esm',  // 次优
    'https://unpkg.com/{name}@{version}?module',  // 可备选
  ];

  /**
   * 加载库
   * @param {string} name - 库名（如 'imagesloaded'）
   * @param {string} version - 版本（如 '5.0.0'）
   * @returns {Promise<any>} 导出的模块
   */
  static async load(name, version = 'latest') {
    const cacheKey = `${name}@${version}`;

    // 1️⃣ 检查缓存（避免重复加载）
    if (this.moduleCache.has(cacheKey)) {
      console.info(`📦 使用缓存: ${cacheKey}`);
      return this.moduleCache.get(cacheKey);
    }

    // 2️⃣ 逐个尝试 CDN（自动容错）
    for (const cdnTemplate of this.CDN_PRIORITY) {
      const url = cdnTemplate
        .replace('{name}', name)
        .replace('{version}', version);

      try {
        console.info(`🔄 正在加载: ${url}`);
        const module = await import(url);
        
        // 3️⃣ 提取正确的导出
        const exported = this.extractExport(module, name);
        
        // 4️⃣ 缓存结果
        this.moduleCache.set(cacheKey, exported);
        
        console.info(`✅ 加载成功: ${url}`);
        return exported;
      } catch (error) {
        console.warn(`⚠️ CDN 加载失败: ${url}`, error.message);
        continue; // 尝试下一个 CDN
      }
    }

    // 5️⃣ 所有 CDN 都失败，抛出错误
    throw new Error(
      `❌ 无法加载库 ${name}@${version}，已尝试所有 CDN\n` +
      `已尝试的 CDN: ${this.CDN_PRIORITY.join(', ')}`
    );
  }

  /**
   * 智能提取模块导出
   * 处理各种导出方式
   */
  static extractExport(module, name) {
    // 优先级顺序，从最可能到最不可能
    return (
      module.default ||                    // export default
      module[name] ||                      // export { imagesLoaded }
      module[this.toCamelCase(name)] ||    // export { ImagesLoaded }
      module[this.toPascalCase(name)] ||   // 帕斯卡命名
      module.ImagesLoaded ||               // 大写开头
      module.imagesloaded ||               // 小写
      module                               // 整个模块对象
    );
  }

  static toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  static toPascalCase(str) {
    const camel = this.toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }

  /**
   * 将库挂载到全局（可选）
   */
  static async loadGlobal(name, version = 'latest', globalName = null) {
    const module = await this.load(name, version);
    const assignName = globalName || this.toCamelCase(name);
    window[assignName] = module;
    console.info(`🌍 全局注册: window.${assignName}`);
    return module;
  }
}

// ✅ 使用示例
(async () => {
  try {
    // 方式 1: 直接加载
    const imagesLoaded = await DynamicLibraryLoader.load('imagesloaded', '5.0.0');
    window.imagesLoaded = imagesLoaded;

    // 方式 2: 加载并自动挂载全局
    // await DynamicLibraryLoader.loadGlobal('imagesloaded', '5.0.0');

    // 现在可以使用库了
    const imageUrls = [
      'https://picsum.photos/200/140/?1',
      'https://picsum.photos/210/140/?2',
      'https://picsum.photos/220/140/?3',
    ];

    const container = ImageLoader.create(imageUrls);
    document.body.appendChild(container);

  } catch (error) {
    console.error('❌ 加载失败:', error.message);
    // 降级处理：比如显示错误提示、禁用功能等
    document.body.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
})();
