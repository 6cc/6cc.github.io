// Pages 或 Workers 都用这个格式
const SingleDay = 'cloud1.herokuapp.com';
const DoubleDay = 'cloud2.herokuapp.com';
const timezone = 'Etc/GMT+2';

export default {
  async fetch(request, env, ctx) {
    const localized_date = new Date(
      new Date().toLocaleString('en-US', { timeZone: timezone })
    );
    
    const host = localized_date.getDate() % 2 ? SingleDay : DoubleDay;
    
    const url = new URL(request.url);
    url.hostname = host;
    
    return fetch(new Request(url, request));
  }
};
