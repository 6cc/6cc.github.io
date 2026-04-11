```js
/**
 * 获取分页页码
 */
function getPageCount(html) {
    const pageMatch = html.match(/共\s*(\d+)\s*页/);
    if (pageMatch) {
        return parseInt(pageMatch[1]);
    }
    return 1;
}

/**
 * 从HTML中提取图片地址数组
 */
function extractImageUrls(html) {
    const jsonMatch = html.match(/let\s+urls\s*=\s*(\[.*?\]);/s);
    if (jsonMatch) {
        try {
            return JSON.parse(jsonMatch[1]);
        } catch (e) {
            console.error('JSON解析失败:', e);
            return [];
        }
    }
    return [];
}

/**
 * 主函数：获取所有页面的图片
 */
async function getAllImages(baseUrl) {
    const allImages = [];
    let pageCount = 1;
    
    try {
        // 第一步：获取初始页面，确定总页数
        console.log('📖 正在获取初始页面...');
        let html = await fetch(baseUrl).then(r => r.text());
        pageCount = getPageCount(html);
        console.log(`✅ 共找到 ${pageCount} 页`);
        
        // 第二步：逐页获取
        for (let page = 1; page <= pageCount; page++) {
            // 首页不需要添加 page 参数
            const url = page === 1 
                ? baseUrl 
                : `${baseUrl}&page=${page}`;
            
            console.log(`📄 正在获取第 ${page}/${pageCount} 页: ${url}`);
            
            try {
                html = await fetch(url).then(r => r.text());
                const images = extractImageUrls(html);
                allImages.push(...images);
                console.log(`   ✓ 此页获得 ${images.length} 张图片，总计 ${allImages.length} 张`);
                
                // 延迟，避免请求过快
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`   ✗ 第 ${page} 页获取失败:`, error);
            }
        }
        
        console.log(`\n✨ 完成！共获得 ${allImages.length} 张图片`);
        return allImages;
        
    } catch (error) {
        console.error('❌ 获取初始页面失败:', error);
        return [];
    }
}

// 使用示例
const baseUrl = 'https://www.antbyw.com/plugin.php?id=jameson_manhua&a=read&kuid=140724&zjid=756430';
getAllImages(baseUrl).then(images => {
    console.log('所有图片地址:', images);
    // 你可以在这里对图片进行进一步处理
});

```

```js
/**
 * 带重试机制的版本
 */
async function getAllImagesWithRetry(baseUrl, maxRetries = 3) {
    const allImages = [];
    let pageCount = 1;
    
    async function fetchWithRetry(url, retries = 0) {
        try {
            return await fetch(url).then(r => r.text());
        } catch (error) {
            if (retries < maxRetries) {
                console.log(`   ⚠️ 重试第 ${retries + 1} 次...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)));
                return fetchWithRetry(url, retries + 1);
            }
            throw error;
        }
    }
    
    try {
        // 获取初始页面
        console.log('📖 正在获取初始页面...');
        let html = await fetchWithRetry(baseUrl);
        pageCount = getPageCount(html);
        console.log(`✅ 共找到 ${pageCount} 页`);
        
        // 逐页获取
        for (let page = 1; page <= pageCount; page++) {
            const url = page === 1 
                ? baseUrl 
                : `${baseUrl}&page=${page}`;
            
            console.log(`📄 正在获取第 ${page}/${pageCount} 页...`);
            
            try {
                html = await fetchWithRetry(url);
                const images = extractImageUrls(html);
                allImages.push(...images);
                console.log(`   ✓ ${images.length} 张图片 (总计: ${allImages.length})`);
                
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`   ✗ 第 ${page} 页获取失败:`, error.message);
            }
        }
        
        console.log(`\n✨ 完成！共 ${allImages.length} 张图片`);
        return allImages;
    } catch (error) {
        console.error('❌ 失败:', error);
        return [];
    }
}

```