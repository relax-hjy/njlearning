# 知识点总结

## Node.js

### 开发环境搭建流程

```
安装版本管理器 → 通过管理器安装 Node.js → 开始开发
   (一次性)           (npm 自动捆绑)        (开写)
```

**第一步：安装版本管理器**

```bash
# Windows - nvm-windows
# 下载安装包：https://github.com/coreybutler/nvm-windows

# Windows - fnm
winget install Schniz.fnm

# macOS - fnm
brew install fnm
```

**第二步：用管理器安装 Node.js（npm 会自动捆绑安装）**

```bash
nvm install --lts    # 安装最新 LTS 版本，npm 随之装上
nvm use <版本号>      # 切换到该版本
```

**第三步：验证并开始开发**

```bash
node -v    # 确认 Node.js 版本
npm -v     # 确认 npm 版本

# 此时已经可以：
node app.js          # 直接运行 JS 文件
npm init             # 初始化项目
npm install <pkg>    # 安装第三方包
```

### 什么是 Node.js
Node.js 是一个基于 Chrome V8 引擎的 **JavaScript 运行时环境**，让 JavaScript 能够脱离浏览器在服务器端运行。

在 Node.js 出现之前，JavaScript 只能在浏览器里执行，用来做页面交互。Node.js 把它带到了服务端，使得前端开发者可以用同一种语言写后端。

### Node.js 能干什么
- **Web 服务端开发**：用 Express、Koa、Fastify 等框架搭建 HTTP 服务、RESTful API、GraphQL 接口
- **CLI 工具开发**：开发命令行工具，如 webpack、vite、eslint 等构建工具
- **前端工程化**：前端项目的构建、打包、编译、热更新等开发工具链
- **全栈开发**：Next.js、Nuxt 等全栈框架的服务端渲染 (SSR)
- **桌面应用**：通过 Electron 开发跨平台桌面应用（VS Code、Figma 等）
- **实时应用**：聊天室、在线协作、游戏服务端等 WebSocket 应用
- **脚本自动化**：文件处理、数据迁移、批量操作等自动化脚本
- **微服务**：轻量高效的微服务架构后端

### 版本管理
- 使用 `nvm` 或 `fnm` 管理多版本 Node.js，不同项目可以用不同版本
- 当前版本：Node.js v22.19.0, npm 10.9.3

### 常用命令
```bash
node --version      # 查看 Node 版本
node xxx.js         # 运行 JS 文件
```

### 下载与更新
- **官网**：[nodejs.org](https://nodejs.org) 下载 LTS 安装包，覆盖安装即可更新
- **nvm / fnm**：`nvm install <版本>` → `nvm use <版本>`（推荐）
- **winget (Windows)**：`winget install OpenJS.NodeJS.LTS`
- **brew (macOS)**：`brew install node` / `brew upgrade node`

### 更新 npm
npm 随 Node 捆绑安装，但可独立升级：
```bash
npm install -g npm@latest
```

### 模块系统

Node.js 默认使用 CommonJS，浏览器生态使用 ESM：

| 系统 | 语法 | 哪里用 |
|------|------|------|
| **CommonJS** | `require` / `module.exports` | Node.js 后端（`server.js`），因为 `package.json` 里 `"type": "commonjs"` |
| **ESM** | `import` / `export` | Vite 前端（`main.js`），Vite 会自动处理，跟 Node.js 设置无关 |

> 如果想在 Node.js 里也用 `import`，把 `package.json` 的 `"type"` 改为 `"module"` 即可。

### 全局对象
- `__dirname`：当前文件所在目录的绝对路径（仅 CommonJS）
- `__filename`：当前文件的绝对路径（仅 CommonJS）
- `process`：进程相关信息（环境变量、命令行参数等）
- `Buffer`：处理二进制数据

---

## Express — Node.js 的 Web 框架

### 为什么需要 Express

Node.js 只能运行 JS 脚本，它内置的 `http` 模块只能处理最原始的 HTTP 请求——路由匹配、请求解析、响应格式化全要手写。Express 把这些重复劳动封装好了，让你专注于业务逻辑。

**不用 Express vs 用 Express：**

```js
// 原生 Node：手动判断路径、方法、设响应头、转 JSON
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'hello' }));
  }
});

// Express：一行搞定
app.get('/api/hello', (req, res) => {
  res.json({ message: 'hello' });
});
```

- **路由**：`app.get('/users/:id', ...)` ，Express 自动解析路径参数
- **中间件**：请求处理管道，可用于日志、鉴权、压缩等
- **响应助手**：`res.json()`、`res.send()`、`res.sendFile()` 等

```
请求 → 中间件1(日志) → 中间件2(鉴权) → 路由处理 → 响应
```

```bash
npm install express          # 安装
node server.js               # 运行，访问 http://localhost:3000
```

> Node.js 是运行环境，Express 是跑在 Node 上的框架。类比：Node.js 是地基，Express 是盖好的房子。

---

## npm

### 什么是 npm
npm（Node Package Manager）是 Node.js 自带的**包管理器**，也是世界上最大的开源软件注册中心。它由三部分组成：

- **npm 网站**（npmjs.com）：用于查找、发布和管理包的在线平台
- **npm CLI**：终端命令行工具，用于安装和管理依赖
- **npm Registry**：存储所有公开包的数据库

### npm 能干什么
- **安装依赖**：下载他人发布的开源包到项目中，如 `react`、`lodash`、`express` 等
- **管理版本**：锁定和升级项目依赖的版本，确保团队协作的一致性
- **发布包**：将自己写的模块发布到 npm 供全世界使用
- **执行脚本**：通过 `package.json` 的 `scripts` 定义开发工作流（构建、测试、部署等）
- **npx 工具**：无需安装即可执行一次性命令，如 `npx create-react-app my-app`

### npm init — 创建 package.json

`npm init` 的唯一作用就是**创建 `package.json` 文件**。不管是前端项目还是后端项目，只要想用 npm 装依赖，就必须先有这个文件。

**两个核心作用：**

1. **记录项目依赖**：装过什么包、什么版本，全记在 `package.json` 里。别人拿到项目只需 `npm install` 就能把所有依赖一键装齐
2. **定义开发脚本**：在 `scripts` 字段定义常用命令，之后用 `npm run` 执行

```bash
npm init          # 交互式填写，一步步回答问题
npm init -y       # 跳过提问，直接生成默认 package.json
```

### scripts — 开发脚本是什么

`package.json` 里的 `scripts` 字段，本质就是**给命令起个别名**，把复杂的终端命令缩写成简单的名字：

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "jest"
}
```

使用时直接用别名：

```bash
npm run dev      # 实际执行: vite
npm run build    # 实际执行: vite build
npm run test     # 实际执行: jest
```

**好处**：不用记 `vite build` 的参数、不用记 `jest --coverage` 的配置路径，全写在 scripts 里，团队所有人用同一套。还能把多个步骤串成一个命令：

```json
"scripts": {
  "deploy": "npm run build && npm run test && scp -r dist/ server:/var/www"
}
```

### npm install 怎么用

```bash
npm install <包名>        # 装到 dependencies（生产依赖）
npm install <包名> -D     # 装到 devDependencies（开发依赖，-D = --save-dev）
npm install               # 读取 package.json，一键装齐所有依赖
npm install -g <包名>     # 全局安装，命令行工具用
```

两类依赖的区别：

| 类型 | 安装方式 | 存储字段 | 含义 |
|------|----------|----------|------|
| 生产依赖 | 不加 `-D` | `dependencies` | 运行必须用到，如 React、Express |
| 开发依赖 | 加 `-D` | `devDependencies` | 仅在开发时用，如 Vite、ESLint |

### Vite — 前端开发服务器

Vite 是现代化的前端构建工具，两大核心作用：

1. **启动本地开发服务器**（`npm run dev`），浏览器实时预览页面
2. **热更新**：代码一改，浏览器自动刷新，不用手动 F5

**为什么需要它？** 直接双击 HTML 打开只是"看文件"。真正的项目开发中，浏览器不认识 `import` 语法、不认识 `.ts` 文件、不认识 `.vue` 文件。Vite 负责把这些"浏览器不认识的代码"翻译成浏览器能跑的 HTML+CSS+JS。

```bash
npm install vite -D    # 安装 Vite（开发依赖）
```

### 开发 vs 生产构建

| 阶段 | 命令 | 产出 | 特点 |
|------|------|------|------|
| 开发 | `npm run dev` | 无（内存中） | 热更新，文件分开，有注释 |
| 构建 | `npm run build` | `dist/` 目录 | 压缩合并，文件名带哈希，无冗余 |
| 预览 | `npm run preview` | 本地预览 `dist/` | 模拟生产环境 |

```bash
npm run build       # 构建：HTML+CSS+JS 压缩打包到 dist/
npm run preview     # 预览构建产物，确认没问题再上线
```

构建后 `dist/` 里是纯静态文件，丢到任意服务器（Vercel、Nginx、GitHub Pages）就上线了。

### npm 不只能管理 Node.js 包

虽然名字叫 "Node Package Manager"，但 npm 实际上是整个 **JavaScript / 前端生态**的包管理器，远不止 Node.js：

- **前端框架和库**：React、Vue、Angular、Svelte 等，这些代码最终运行在浏览器，不是 Node.js
- **CSS 框架**：Tailwind CSS、Bootstrap、Sass/SCSS 等样式库
- **构建工具**：Webpack、Vite、esbuild、Rollup 等，在开发阶段运行于 Node.js，但产物是给浏览器的
- **CLI / 脚手架**：`create-react-app`、`vue-cli`、`eslint`、`prettier` 等命令行工具
- **TypeScript 相关**：`typescript` 编译器、`@types/*` 类型定义
- **纯静态资源**：Font Awesome 图标库、第三方字体文件等
- **后端框架**：这才是经典 Node.js 用途，如 Express、Koa、NestJS

> 小知识：npm 官方曾在 2013 年说 "npm is not an acronym for Node Package Manager"（npm 不是 Node Package Manager 的缩写），它现在只是一个品牌名，代表的是整个 JavaScript 生态的包管理。

### package.json 核心字段
| 字段 | 说明 |
|------|------|
| `dependencies` | 生产环境依赖 |
| `devDependencies` | 开发环境依赖 |
| `peerDependencies` | 同伴依赖（插件常用） |
| `scripts` | 自定义脚本 |
| `main` | 入口文件（CommonJS） |
| `module` | 入口文件（ESM） |
| `exports` | 现代化入口定义，优先级最高 |

### semver 版本规则
- `^1.2.3`：兼容 1.x.x（允许次版本和补丁版本更新）
- `~1.2.3`：兼容 1.2.x（仅允许补丁版本更新）
- `1.2.3`：精确版本
- `*`：任意版本

### npx — npm 包执行器

`npx`（npm package executor），作用是**临时执行**某个包里的命令，不安装到项目。

| 命令 | 比喻 | 场景 |
|------|------|------|
| `npm install` | "买回家"，长期持有 | 装 React、Express 等项目依赖 |
| `npx` | "借用一下"，用完就走 | 脚手架、一次性命令 |

```bash
# 临时下载 create-react-app 并执行，不写入 package.json
npx create-react-app my-app

# 临时执行 vite，不安装
npx vite

# 临时跑 TypeScript 编译器
npx tsc --init
```

> 如果已经用 `npm install` 装过，`npx vite` 和 `npm run dev` 效果一样；没装过的话 npx 会临时下载执行。


---

## JavaScript

### 数据类型
- **基本类型**：`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- **引用类型**：`object`, `array`, `function`

### 异步编程
- **回调函数**：传统方式，容易产生回调地狱
- **Promise**：`then` / `catch` / `finally`
- **async/await**：基于 Promise 的语法糖，写法更同步

```js
// async/await 错误处理
const [err, data] = await fetchData().then(
  data => [null, data],
  err => [err, null]
);
```

### 闭包
函数能够访问其外部作用域中的变量，即使外部函数已执行完毕。

### 事件循环 (Event Loop)
- **微任务**（Microtask）：`Promise.then`, `queueMicrotask`, `MutationObserver` — 优先执行
- **宏任务**（Macrotask）：`setTimeout`, `setInterval`, `I/O` — 次优先

---

## TypeScript

### 什么是 TypeScript

TypeScript = JavaScript + **静态类型标注**。它让你在写代码时就发现类型错误，不用等到运行才报错。

**工作流**：写 `.ts` → `tsc` 编译成 `.js` → Node / 浏览器运行

```bash
npm install typescript -D     # 安装
npx tsc                       # 编译（根据 tsconfig.json 配置）
node dist/xxx.js              # 运行编译后的 JS
```

编译时所有类型标注会被删除，输出纯 JavaScript——类型只存在于开发阶段，不影响运行。

```ts
function greet(person: string): string {
  return '你好，' + person;
}
greet('小明');   // ✅
greet(123);      // ❌ 编译时就报错，不会等到运行才发现
```

### .ts vs .tsx

| 扩展名 | 含义 | 场景 |
|------|------|------|
| `.js` | 纯 JavaScript | 普通脚本 |
| `.ts` | TypeScript，加类型标注 | 纯逻辑代码 |
| `.jsx` | JavaScript + JSX（代码里写 HTML 标签） | React 组件 |
| `.tsx` | TypeScript + JSX | React 组件 + 类型安全，主流写法 |

JSX 就是在 JS/TS 里直接写类似 HTML 的标签：

```tsx
function UserCard({ name, age }: { name: string; age: number }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>年龄：{age}</p>
    </div>
  );
}
```

### .tsx 怎么编译

浏览器和 Node 都不认识 `.tsx`，需要编译：

```bash
# 开发时——Vite 内置的 esbuild 一步搞定，瞬时完成
npm run dev

# 检查类型——tsc 单独跑，只检查不编译
npx tsc --noEmit
```

Vite 用 esbuild 处理 `.tsx` 是瞬时的，开发体验跟写 `.js` 一样。真正耗时的类型校验由 `tsc` 后台另开一条线，不阻塞热更新。

### 核心类型
```typescript
// 基础类型
let str: string = 'hello';
let num: number = 42;
let bool: boolean = true;

// 联合类型
let id: string | number;

// 泛型
function identity<T>(arg: T): T { return arg; }

// 工具类型
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Record<K extends string, T> = { [P in K]: T };
```

### interface vs type
- `interface`：可被合并（declaration merging），更适合描述对象形状
- `type`：支持联合、交叉、元组，更灵活

### tsconfig 关键配置
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## Git

### 常用工作流
```bash
git status                    # 查看状态
git add <file>                # 暂存文件
git commit -m "message"       # 提交
git push origin <branch>      # 推送到远程
git pull origin <branch>      # 拉取远程更新
git branch <name>             # 创建分支
git checkout -b <name>        # 创建并切换分支
git merge <branch>            # 合并分支
git rebase <branch>           # 变基
```

### 撤销操作
```bash
git reset HEAD~1              # 撤销最近一次 commit（保留更改）
git reset --hard HEAD~1       # 撤销最近一次 commit（丢弃更改）
git checkout -- <file>        # 撤销工作区文件更改
git revert <commit>           # 创建一个新 commit 来撤销指定 commit
```

### 暂存与恢复
```bash
git stash                     # 暂存当前修改
git stash pop                 # 恢复最近一次暂存
git stash list                # 查看暂存列表
```

---

## 网络基础

### HTTP 状态码
- **2xx**：成功 (200 OK, 201 Created, 204 No Content)
- **3xx**：重定向 (301 永久, 302 临时, 304 未修改)
- **4xx**：客户端错误 (400 参数错误, 401 未认证, 403 禁止, 404 未找到)
- **5xx**：服务端错误 (500 服务器错误, 502 网关错误, 503 服务不可用)

### HTTP 方法
| 方法 | 用途 | 幂等 |
|------|------|------|
| GET | 获取资源 | 是 |
| POST | 创建资源 | 否 |
| PUT | 完整更新资源 | 是 |
| PATCH | 部分更新资源 | 否 |
| DELETE | 删除资源 | 是 |

### RESTful API 设计原则
- 使用名词而非动词命名端点（`/users` 而非 `/getUsers`）
- 使用 HTTP 方法表达操作
- 资源层级化（`/users/:id/posts`）
- 使用 HTTP 状态码表达结果

---

## 数据库

### SQL 基础
```sql
-- 查询
SELECT column1, column2 FROM table WHERE condition ORDER BY column DESC LIMIT 10;

-- 插入
INSERT INTO table (col1, col2) VALUES ('val1', 'val2');

-- 更新
UPDATE table SET col1 = 'val' WHERE id = 1;

-- 删除
DELETE FROM table WHERE id = 1;

-- 联表
SELECT * FROM users u INNER JOIN orders o ON u.id = o.user_id;
```

### JOIN 类型
- **INNER JOIN**：两表匹配的行
- **LEFT JOIN**：左表所有行 + 右表匹配的行（无匹配为 NULL）
- **RIGHT JOIN**：右表所有行 + 左表匹配的行
- **FULL JOIN**：两表所有行

### 索引
- 加速查询，但会降低写操作速度
- 常用字段、联表字段、排序字段应建索引
- 复合索引遵循最左匹配原则

### NoSQL vs SQL
- **SQL**（MySQL, PostgreSQL）：结构化数据，ACID，强一致性
- **NoSQL**：文档型（MongoDB）、键值型（Redis）、列族型、图数据库

---

## 设计模式（精简）

| 模式 | 用途 |
|------|------|
| 单例 | 全局唯一实例 |
| 工厂 | 封装对象创建逻辑 |
| 观察者 | 一对多依赖通知 |
| 策略 | 运行时切换算法 |
| 装饰器 | 动态添加功能 |
| 代理 | 控制对象访问 |

---

## Docker（速查）

```bash
# 镜像
docker images                           # 列出本地镜像
docker build -t name:tag .              # 构建镜像
docker rmi <image>                      # 删除镜像

# 容器
docker ps                               # 运行中的容器
docker ps -a                            # 所有容器
docker run -d -p 3000:80 name:tag       # 后台运行并映射端口
docker exec -it <container> bash        # 进入容器
docker logs -f <container>              # 查看日志
docker stop <container>                 # 停止容器
docker rm <container>                   # 删除容器

# Compose
docker compose up -d                    # 启动服务
docker compose down                     # 停止并删除服务
docker compose logs -f                  # 查看日志
```

---

## 前端语言生态

### 浏览器三件套

浏览器原生只能执行 **HTML + CSS + JavaScript**，其他前端语言本质上都是编译/转换成这三者之一才能运行。

### 编译到 JS 的语言

| 语言 | 说明 |
|------|------|
| **TypeScript** | JavaScript 的超集，加了静态类型检查，前端事实标准 |
| **Dart** | Google 出品，配合 Flutter Web 可编译到 JS |
| **Elm** | 纯函数式，承诺"没有运行时错误" |
| **ReScript** | OCaml 方言，类型系统强，编译极快 |
| **ClojureScript** | Clojure 的 JS 编译版，Lisp 风格函数式 |
| **PureScript** | 类似 Haskell 的强类型纯函数式语言 |

### 通过 WebAssembly 跑在浏览器

| 语言 | 说明 |
|------|------|
| **Rust** | 高性能，WebAssembly 生态最完善 |
| **C / C++** | 通过 Emscripten 编译成 WASM |
| **Go** | 1.21+ 支持编译到 WASM |

> 实际工作中，**TypeScript 是唯一需要学的**。WebAssembly 更多用于性能敏感模块（图像处理、加密、游戏引擎），不会整个项目用。

---

## 前端基础速查

### HTML + CSS + JavaScript — 浏览器三件套

浏览器原生只认这三种语言，各自负责不同层面：

| 层 | 语言 | 角色 | 比喻 |
|----|------|------|------|
| 结构 | **HTML** | 页面有什么（标题、段落、图片、按钮） | 房间的骨架和水电布线 |
| 样式 | **CSS** | 页面长什么样（颜色、大小、布局、动画） | 刷漆、铺地板、摆家具 |
| 行为 | **JavaScript** | 页面能干什么（点击反应、数据请求、交互） | 开关、遥控器，让一切动起来 |

```html
<!-- HTML：定义结构 -->
<h1>我是标题</h1>
<p>我是一段文字</p>
<button>点我</button>
```

```css
/* CSS：定义样式 */
h1 { color: #333; font-size: 24px; }
button { background: blue; color: white; }
```

```js
// JavaScript：定义交互
document.querySelector('button').addEventListener('click', () => {
  alert('按钮被点了！');
});
```

> 一句话总结：**HTML 搭骨架，CSS 做美化，JavaScript 管交互。** 任何网页最终都是这三样东西在浏览器里跑。

### CSS 布局
- **Flexbox**：一维布局，适合组件内部排列
- **Grid**：二维布局，适合页面整体结构
- `position`：`relative`（相对自身）、`absolute`（相对定位父级）、`fixed`（相对视口）、`sticky`（滚动粘滞）

### 盒模型
- `content-box`（默认）：宽高仅包含内容
- `border-box`：宽高包含内容 + padding + border

### React 核心概念
- **状态 (State)**：组件内部可变数据
- **属性 (Props)**：父组件传递的数据，只读
- **Effect**：处理副作用（数据请求、订阅、DOM 操作）
- **Ref**：引用 DOM 元素或保存不触发渲染的变量
- **Context**：跨层级传递数据，避免 props 逐层传递

### 性能优化
- `React.memo`：避免不必要的重渲染
- `useMemo` / `useCallback`：缓存计算结果和函数引用
- 代码分割：`React.lazy` + `Suspense`
- 虚拟列表：长列表只渲染可视区域

---

## 通用编程概念

### 时间复杂度（常见）
| 复杂度 | 示例 |
|--------|------|
| O(1) | 数组索引访问、哈希表查找 |
| O(log n) | 二分查找 |
| O(n) | 线性遍历 |
| O(n log n) | 归并排序、快速排序 |
| O(n²) | 冒泡排序、嵌套循环 |

### 数据结构应用场景
| 结构 | 场景 |
|------|------|
| 数组/列表 | 顺序存储，随机访问 |
| 链表 | 频繁插入/删除 |
| 哈希表 | 快速查找、去重 |
| 栈 | 括号匹配、撤销操作、DFS |
| 队列 | 任务调度、BFS |
| 树 | 层级数据、搜索排序 |

### SOLID 原则
- **S** 单一职责：一个类只负责一件事
- **O** 开闭原则：对扩展开放，对修改关闭
- **L** 里氏替换：子类应能替换父类
- **I** 接口隔离：接口应小而专注
- **D** 依赖倒置：依赖抽象而非具体实现

---

## 常用工具与软件速查

### 开发环境
| 工具 | 说明 |
|------|------|
| **nvm / nvm-windows** | Node.js 版本管理器，同时装多个版本自由切换 |
| **fnm** | 新一代版本管理器，Rust 编写，比 nvm 更快 |
| **VS Code** | 代码编辑器，前端开发标配 |
| **winget** | Windows 自带包管理器，装软件一条命令 |

### 前端框架和库
| 工具 | 类型 | 说明 |
|------|------|------|
| **React** | UI 框架 | 市场占有率最高 |
| **Vue** | UI 框架 | 上手友好，中文文档好 |
| **Angular** | UI 框架 | Google 出品，企业级重框架 |
| **Svelte** | UI 框架 | 编译时框架，代码量少 |
| **Next.js** | 全栈框架 | React 的全栈方案，支持 SSR |
| **Nuxt** | 全栈框架 | Vue 的全栈方案 |

### 构建工具
| 工具 | 说明 |
|------|------|
| **Vite** | 新一代开发服务器，启动快、热更新快 |
| **Webpack** | 老牌构建工具，生态最大 |
| **esbuild** | Go 写的极速打包器 |
| **Rollup** | 适合库的打包工具 |

### CSS
| 工具 | 说明 |
|------|------|
| **Tailwind CSS** | 原子化 CSS，直接用 class 写样式 |
| **Bootstrap** | 元老级 CSS 框架，开箱即用 |
| **Sass/SCSS** | CSS 预处理器，支持变量、嵌套 |

### 后端框架
| 工具 | 说明 |
|------|------|
| **Express** | 最主流的 Node.js 框架，轻量灵活 |
| **Koa** | Express 团队新作，更轻量 |
| **NestJS** | 企业级框架，TypeScript + 装饰器，类似 Java Spring |
| **Fastify** | 高性能框架，速度快 |

### 代码质量
| 工具 | 说明 |
|------|------|
| **ESLint** | 代码检查，发现语法和规范问题 |
| **Prettier** | 代码格式化，统一代码风格 |
| **TypeScript** | JavaScript + 静态类型，写代码时发现低级错误 |
| **Jest** | 测试框架，写单元测试 |

### 桌面 & 数据库 & 其他
| 工具 | 说明 |
|------|------|
| **Electron** | 用前端技术写桌面应用，VS Code 和 Figma 都用它 |
| **Docker** | 容器化部署，保证环境一致性 |
| **MySQL / PostgreSQL** | 关系型数据库 |
| **MongoDB** | 文档型 NoSQL 数据库 |
| **Redis** | 内存键值存储，常用于缓存 |

---

> 持续更新中，随时补充新知识点。
