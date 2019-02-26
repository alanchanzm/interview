# component

## 构造 component 的方式

### Function

```jsx
function Foo(props) {
  return <h1>Hello, {props.foo}</h1>;
}
```

### Class

区别：

1. class 需要生成实例，props 在构造函数中被传入，引用 props 需要通过 `this.props.xxx`
2. class 需要显式声明 render 函数
3. class 拥有 local state

```jsx
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: 'bar' };
  }

  render() {
    return <h1>Hello, {this.props.foo}</h1>;
  }
}
```

#### 一定要显式声明 constructor 吗？

**不需要**

1. TC39 -- field declarations proposal -- Stage 3
2. babel 最终会加上 constructor

```jsx
class Foo extends React.Component {
  state = { bar: 'bar' };
  clickHandler1 = this.clickHandler1.bind(this); // 在 constructor 中的操作都可以保留

  clickHandler1() {}

  clickHandler2 = () => {}; // 利用箭头函数锁定 this

  render() {
    return (
      <div>
        Hello, {this.props.foo}
        <button onClick={this.clickHandler1}>click 1</button>
        <button onClick={this.clickHandler2}>click 2</button>
      </div>
    );
  }
}
```

#### 箭头函数跟 bind 有区别吗？

有区别。

箭头函数利用了两点：1.箭头函数本身没有 this，箭头函数内的 this 其实是声明时的闭包。2.利用函数表达式把箭头函数挂载到 class 的属性上。

所以箭头函数其实是 class 的实例属性，在每个实例上都会重新实现一次，占用更多内存。

而在 constructor 上用 bind 绑定 this，是在实例上保存了一份原型方法的拷贝。方法的实现在原型，this 绑定在实例，占用内存更少。

### 如何区分 Function 和 Class

class 由 React.Component / React.PureComponent 扩展而来。
检查实例的原型中是否存在 isReactComponent 属性。

```jsx
function shouldConstruct(Component: Function) {
  const prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}
```
