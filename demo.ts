// demo.ts — TypeScript 示例

// 1. 类型标注：变量后面加 :类型
let username: string = 'hello';
let age: number = 30;
let isDone: boolean = true;

// 如果不加类型，TS 会自动推断（类型推断）
let name2 = 'world'; // TS 自动知道这是 string

// 2. 定义参数和返回值类型
function greet(person: string): string {
  return '你好，' + person;
}

console.log(greet('小明'));
console.log(greet(username));
// console.log(greet(123));  // ❌ 编译就报错，不会等到运行才发现

// 3. 接口：定义对象的形状
interface User {
  id: number;
  name: string;
  email?: string; // ? 表示可选
}

const user: User = {
  id: 1,
  name: '张三',
};

// 4. 数组和泛型
const arr: number[] = [1, 2, 3];
const users: User[] = [user];
