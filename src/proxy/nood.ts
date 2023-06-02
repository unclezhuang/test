const http = require('http');
const https = require('https');
const url = require('url');

http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const options = {
    hostname: 'example.com', // 目标服务器的域名
    port: 443, // 目标服务器的端口
    path: reqUrl.pathname + reqUrl.search, // 请求路径
    method: req.method, // 请求方法
    headers: req.headers // 请求头
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxyReq);

  proxyReq.on('error', (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end('Proxy request failed');
  });
}).listen(8080);
