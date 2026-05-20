// server-raw.js — 不用 Express，用 Node 原生 http 模块写同样的接口
const http = require('http');

const server = http.createServer((req, res) => {
  // 手动判断请求方法和路径
  if (req.method === 'GET' && req.url === '/api/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'hello from backend!', time: new Date().toISOString() }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('后端已启动：http://localhost:3000');
});
