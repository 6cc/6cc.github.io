// claude-haiku-4.5
export default {
  async fetch(request, env) {
    const localized_date = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Etc/GMT+2' })
    );
    
    // 交替使用不同的反代源
    const targets = [
      'https://worker1.dev',
      'https://worker2.dev',
      'https://worker3.dev'
    ];
    
    const target = targets[localized_date.getDate() % targets.length];
    
    const url = new URL(request.url);
    url.hostname = new URL(target).hostname;
    
    return fetch(new Request(url, request));
  }
};
