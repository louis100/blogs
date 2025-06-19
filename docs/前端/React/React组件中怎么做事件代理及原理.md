# React组件中怎么做事件代理及原理

在 React 组件中实现事件代理主要通过合成事件（SyntheticEvent）系统完成，其原理和实现方式如下：

## 一、如何实现事件代理
1. 父元素监听
```jsx
function List() {
  const handleClick = (e) => {
    // 通过 e.target 识别被点击的子元素
    if (e.target.tagName === 'LI') {
      console.log('点击了子元素:', e.target.textContent);
    }
  };

  return (
    <ul onClick={handleClick}> 
	{/* 事件绑定在父级 */}
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
}
```
2. 动态子元素标识
```jsx
// 通过 dataset 存储标识
<button data-id={item.id} onClick={handleClick}>
  {item.text}
</button>
```
## 二、核心原理
1. 事件池机制
* React 使用单个 SyntheticEvent 对象池复用事件对象
* 通过 event.persist() 可保留事件引用（异步场景需要）
2. 委托层级变化
* React 16：委托到 document
* React 17+：委托到 React 树根 DOM 节点
3. 自动绑定管理
```js
// React 自动处理真实的事件绑定
element.addEventListener(eventType, dispatchEvent);
```
4. 性能优化
* 仅在最外层绑定少量事件监听器
* 根据事件类型自动选择捕获/冒泡阶段
## 三、原生 vs React 事件代理
| 特性         | 原生 DOM              | React               |
| :----------- | :-------------------- | :------------------ |
| 绑定方式     | 手动 addEventListener | 自动处理            |
| 事件对象     | 原生 Event            | SyntheticEvent      |
| 冒泡控制     | stopPropagation       | e.stopPropagation() |
| 默认行为阻止 | preventDefault        | e.preventDefault()  |
| 事件移除     | 需手动移除            | 自动解绑            |
## 四、注意事项
1. 事件传播差异
```js
// 原生事件会先于 React 事件触发
document.addEventListener('click', () => {
  console.log('原生事件先触发');
});
```
2. 混用场景处理
```js
e.nativeEvent.stopImmediatePropagation(); // 阻止其他原生监听器
```
3. Portal 组件事件
* 仍可通过 React 事件系统冒泡
* 与 DOM 树位置无关

通过这种设计，React 实现了：

* 跨浏览器一致性
* 自动内存管理
* 高效的事件处理
* 更简洁的组件写法