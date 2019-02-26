# 生命周期

## Mounting

1. constructor

- 初始化 local state
- binding 事件处理函数
- **不需要**调用 setState
- **避免**把 props 赋给 state
  - 直接使用 `this.props.xxx`
  - 会造成 `this.state.xxx` 和 `this.props.xxx` 不同步

2. static getDerivedStateFromProps

- 每次 render 前都会调用。
- 这是一个静态方法，无法访问 this
- 如果需要根据 props 重 render，**不需要**使用该方法

  ```jsx
  class Example extends PureComponent {
    // State only needs to hold the current filter text value:
    state = {
      filterText: ''
    };

    handleChange = event => {
      this.setState({ filterText: event.target.value });
    };

    render() {
      // The render method on this PureComponent is called only if
      // props.list or state.filterText has changed.
      const filteredList = this.props.list.filter(item =>
        item.text.includes(this.state.filterText)
      );

      return (
        <Fragment>
          <input onChange={this.handleChange} value={this.state.filterText} />
          <ul>
            {filteredList.map(item => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </Fragment>
      );
    }
  }
  ```

3. render

- 必须
- 返回内容
  - react elements
  - arrays and fragments
  ```jsx
  render(){
    return this.state.list.map(item => <li>{item}</li>);
  }
  ```
  - string and number
  - boolean or null

4. componentDidMount

- 此时调用数据接口
- 可以 setState，并引起重 render。两次 render 可能会合并，避免内容闪烁。

## Updating

1. static getDerivedStateFromProps
2. shouldComponentUpdate
   这是一个过滤器，返回 true/false。可以用来控制组件是否重 render。
   pureComponent 没有这个 hook，因为它自己实现了。如果输出的 props 和 states 没有变化，就不会 render。但是 pureComponent 的比较不适用用复杂的数据对象。

3. render
4. getSnapshotBeforeUpdate
   用于比较 DOM 和 render 之间的差别。返回 null/snapshot
5. componentDidUpdate
   如果此处调用 setState，一定要附加判断条件。否则会陷入 infinite loop。

## Unmounting

1. componentWillUnmount

## Errors

1. getDerivedStateFromError
2. componentDidCatch
