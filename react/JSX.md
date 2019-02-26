# JSX

## 什么是 JSX

JSX 只是一种方便书写的语法标记。

`<div>foo</div>` 会被 Babel 或者其他工具转译为`React.creatElement('div', null, 'foo')`

## 为什么需要引入 React

因为 JSX 最终会被转译成 React.xxx 语法。

## JSX 自定义组件名需要大写

react 内部有三种组件类型：

1. ReactDOMComponent -- HTML 标签
2. ReactDOMTextComponent -- 文本节点
3. ReactCompositeComponent -- 自定义组件

小写名会让 react 认为这是一个 html 标签。

### JSX 组件可以用点标记

`<Foo.Bar />`

### 一定要大写吗？

不一定。大写只是为了让 react 识别不同类型的组件。只要能识别，就可以不大写。

```jsx
import Foo from './foo';
const obj = { Foo };

return <obj.Foo />;
```

## JSX 能防范 XSS 攻击

ReactDOM 会转译放入 JSX 中的内容。
