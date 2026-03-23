// claude-haiku-4.5
// 基于 JSProxy 思路的改进 Worker 代码
const GITHUB_HOST = 'github.com';
const RAW_HOST = 'raw.githubusercontent.com';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let { pathname, search, hash } = url;

    console.log('Request path:', pathname);

    // 1. 处理根路径和特殊路径
    if (pathname === '/' || pathname === '/favicon.ico') {
      return new Response('Redirect to GitHub', { 
        status: 302,
        headers: { 'Location': 'https://github.com' }
      });
    }

    // 2. 移除 /github/ 前缀
    if (!pathname.startsWith('/github/')) {
      return new Response('Invalid Path', { status: 400 });
    }

    // 移除前缀，得到实际的 GitHub 路径
    pathname = pathname.slice(7); // 去掉 '/github'

    // 3. 处理空路径
    if (!pathname || pathname === '/') {
      return proxyGitHub('/', search, hash);
    }

    // 4. 路由到不同的处理方式
    return proxyGitHub(pathname, search, hash);
  }
};

/**
 * 代理 GitHub 请求的核心函数
 * @param {string} pathname - GitHub 路径（不含 /github 前缀）
 * @param {string} search - 查询字符串
 * @param {string} hash - 哈希值
 */
async function proxyGitHub(pathname, search, hash) {
  try {
    // 判断是否请求原始文件内容
    const isRawRequest = pathname.match(/^\/([^/]+)\/([^/]+)\/(?:raw|blob|commits|pull|issues|search)/);
    
    let targetHost = GITHUB_HOST;
    let targetPath = pathname;

    // 如果是请求原始文件内容，用 raw.githubusercontent.com
    if (isRawRequest && pathname.includes('/raw/')) {
      targetHost = RAW_HOST;
      // 转换路径格式: /user/repo/raw/branch/path -> /user/repo/branch/path
      targetPath = pathname.replace('/raw/', '/');
    } else if (isRawRequest) {
      targetHost = RAW_HOST;
      targetPath = pathname.replace(/\/(blob|raw)\//, '/');
    }

    const targetUrl = new URL(`https://${targetHost}${targetPath}${search}`);

    console.log('Target URL:', targetUrl.toString());

    // 创建请求
    const newRequest = new Request(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    const response = await fetch(newRequest);

    // 如果是文本内容，需要重写链接
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html') || contentType.includes('text/plain') || contentType.includes('application/javascript')) {
      let body = await response.text();
      
      // 只有 HTML 页面才需要重写链接
      if (contentType.includes('text/html')) {
        body = rewriteHTMLLinks(body);
      }

      return new Response(body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          'Content-Type': contentType,
          // 添加安全头，避免被识别为钓鱼
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
        },
      });
    }

    // 非文本内容直接返回
    return response;

  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(`Error: ${error.message}`, { 
      status: 502,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * 重写 HTML 中的链接
 */
function rewriteHTMLLinks(html) {
  // 重写 href 属性
  html = html.replace(/href=["']([^"']+)["']/g, (match, href) => {
    const rewritten = rewriteLink(href);
    return `href="${rewritten}"`;
  });

  // 重写 src 属性（针对 iframe 等）
  html = html.replace(/src=["']([^"']+)["']/g, (match, src) => {
    const rewritten = rewriteLink(src);
    return `src="${rewritten}"`;
  });

  // 重写 data-url 等自定义属性
  html = html.replace(/data-url=["']([^"']+)["']/g, (match, url) => {
    const rewritten = rewriteLink(url);
    return `data-url="${rewritten}"`;
  });

  // 重写 JavaScript 中的跳转（简单处理）
  html = html.replace(/location\.href\s*=\s*["']([^"']+)["']/g, (match, url) => {
    const rewritten = rewriteLink(url);
    return `location.href = "${rewritten}"`;
  });

  return html;
}

/**
 * 重写单个链接
 */
function rewriteLink(link) {
  // 协议相对链接处理
  if (link.startsWith('//')) {
    link = 'https:' + link;
  }

  // 已经是完整 URL
  if (link.startsWith('http://') || link.startsWith('https://')) {
    // 如果是 GitHub URL，转换为代理 URL
    if (link.includes('github.com')) {
      link = link
        .replace('https://github.com', '/github')
        .replace('http://github.com', '/github')
        .replace('https://raw.githubusercontent.com', '/github')
        .replace('http://raw.githubusercontent.com', '/github');
      return link;
    }
    // 外部链接保持原样
    return link;
  }

  // 绝对路径
  if (link.startsWith('/')) {
    // 已经有 /github/ 前缀
    if (link.startsWith('/github/')) {
      return link;
    }
    // 添加 /github/ 前缀
    return '/github' + link;
  }

  // 相对路径（这种情况比较复杂，通常浏览器会自动解析）
  // 但为了安全起见，我们也可以不处理相对路径，让浏览器处理
  return link;
}
