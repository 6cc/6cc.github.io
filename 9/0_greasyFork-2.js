// https://github.com/wy580477/PaaS-Related/blob/main/CF_Workers_Reverse_Proxy.md
const SingleDay = 'cloud1.herokuapp.com';
const DoubleDay = 'cloud2.herokuapp.com';
const timezone = 'Etc/GMT+2';

export default {
  async fetch(request, env, ctx) {
    let localized_date = new Date(
      new Date().toLocaleString('en-US', { timeZone: timezone })
    );
    
    let host = localized_date.getDate() % 2 ? SingleDay : DoubleDay;
    
    let url = new URL(request.url);
    url.hostname = host;
    
    let newRequest = new Request(url, request);
    
    return fetch(newRequest);
  }
};
