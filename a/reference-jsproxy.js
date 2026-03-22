// claude-haiku-4.5
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 只处理特定的路由
    if (!url.pathname.startsWith('/github/')) {
      return env.ASSETS.fetch(request);  // 返回静态资源
    }
    
    // 将 /github/* 映射为真实路径
    const targetPath = url.pathname.replace('/github/', '/');
    
    // 构建目标 URL（延迟+转换）
    const targetUrl = new URL(`https://github.com${targetPath}`);
    targetUrl.search = url.search;
    
    // 修改请求头，伪装来源
    const headers = new Headers(request.headers);
    headers.set('Referer', 'https://github.com/');
    headers.set('User-Agent', request.headers.get('User-Agent') || '');
    
    return fetch(new Request(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: 'follow'
    }));
  }
};
