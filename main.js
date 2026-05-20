// 前端本地逻辑
let count = 0;
document.querySelector('#btn-local').addEventListener('click', () => {
  count++;
  document.querySelector('#counter').textContent = `你点了 ${count} 次`;
});

// 调用后端 API
document.querySelector('#btn-backend').addEventListener('click', async () => {
  const replyEl = document.querySelector('#backend-reply');
  replyEl.textContent = '请求中...';
  try {
    const res = await fetch('http://localhost:3000/api/hello');
    const data = await res.json();
    replyEl.textContent = `${data.reply}（第 ${data.count} 次被调用）`;
  } catch {
    replyEl.textContent = '请求失败，后端服务是不是没启动？';
  }
});
