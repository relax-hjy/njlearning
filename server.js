// server.js — Express 后端
const express = require('express');
const app = express();
const PORT = 3000;

// 允许前端跨域访问（前端 localhost:5173，后端 localhost:3000）
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const replies = [
  '你好呀！',
  '后端说：今天天气不错！',
  '后端说：你又点我了 😄',
  '后端说：吃饭了吗？',
  '后端说：写代码愉快！',
];
let callCount = 0;

app.get('/api/hello', (req, res) => {
  callCount++;
  const reply = replies[callCount % replies.length];
  res.json({ reply, count: callCount, time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`后端已启动：http://localhost:${PORT}`);
});
