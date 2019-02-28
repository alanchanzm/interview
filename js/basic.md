# Basic

## 类型

### 原始类型

1. undefined
2. null
3. boolean
4. number
5. string
6. symbol

### 引用类型

1. Object
2. Array
3. Fucntion

### 判断类型

#### `typeof`

null、Array 有问题。

typeof 不再安全

```js
typeof undeclaredVariable === 'undefined';
typeof newLetVariable;
let newLetVariable; // ReferenceError
typeof newConstVariable;
const newConstVariable = 'hello'; // ReferenceError
```

#### `instanceof`

只能对引用类型生效，利用原型链。原型链是可修改的。

`obj instanceof constructor` 检测 constructor.prototype 是否在 obj 的原型链上。

```js
function _instanceof(instance, constructor) {
  while ((instance = Object.getPrototypeOf(instance))) {
    if (instance === constructor.prototype) return true;
  }
  return false;
}
```

```js
// Function.__proto__ => Function.prototype
Function instanceof Function; // true
// Object.__proto__ => Function.prototype.__proto__ => Object.prototype
Object instanceof Object; // true
// Foo.__proto__ => Function.prototype.__proto__ => Object.prototype.__proto__ => null
Foo instanceof Foo; // false
Number instanceof Number; // false
String instanceof String; // false
Boolean instanceof Boolean; // false
Symbol instanceof Symbol; // false
```

#### `Object.prototype.toString.call`

用 `Object.prototype.toString.call(xxx)` 而不是 `xxx.toString()`。

1. xxx.toString 方法可能被改写，Object.prototype.toString 被改写的可能性较小
2. `undefined` 和 `null` 无法被包装，TypeError: Cannot read property 'toString' of undefined/null

### 类型转换

|            | 转成布尔值 | 转成数字           | 转成字符串               |
| ---------- | ---------- | ------------------ | ------------------------ |
| undefined  | false      | NaN                | 'undefined'              |
| null       | false      | 0                  | 'null'                   |
| 0, -0      | false      |                    | '0'                      |
| NaN        | false      |                    | 'NaN'                    |
| number     | true       |                    | 42=>'42'                 |
| ''         | false      | 0                  |                          |
| string     | true       | '42'=>42, 'a'=>NaN |                          |
| true       |            | 1                  | 'true'                   |
| false      |            | 0                  | 'false'                  |
| symbol     | true       | TypeError          | Symbol('f')=>'Symbol(f)' |
| []         | true       | 0                  | ''                       |
| [1], ['2'] | true       | [1]=>1, ['2']=>2   | [1]=>'1', ['2']=>'2'     |
| [1,2,3]    | true       | NaN                | '1,2,3'                  |
| Object     | true       | NaN                | '[object Object]'        |
| Function   | true       | NaN                | ()=>{} => '()=>{}'       |

#### 换转原理

非原始类型转成原始类型时，会调用`[[ToPrimitive]]`函数：先调用`valueOf`，再调用`toString()`，如果未返回原始类型就报错。

```js
// 引用类型(对象)之间相互比较，比较的是内存地址
// 地址指向不同，所以是 false
[] == []; // false
[] == {}; // false

// 不同类型的数据之间比较，全部转成数字再比较
// 左侧：[] => [].valueOf() => [] => [].toString() => '' => 0
// 右侧：false => 0
[] == false; // true
[] == true; // false

// ! 取反优先级最高，要求把右侧的值取反，先把值转成 boolean 类型
// 左侧：[] => [].valueOf() => [] => [].toString() => '' => 0
// 右侧：![] => !true => false => 0
[] == ![]; // true
```
