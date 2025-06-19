# Vue 源码解读

## 原理

VUE2的双向绑定主要是通过【数据劫持】 + 【发布订阅模式】实现。
核心：Object.defineProperty() API

### 观察者模式 & 发布订阅

中心一对多 + 西宫端点间的灵活和拓展
调度中心 ===》将注册列表遍历发布给订阅者

### 如何实现双向绑定

MVVM ==》  M + V + VM

Observe ==》 Dep  ==》 Watcher ===> View
|
compiler()===>watcher


![双向绑定实现原理](<effectImgs/Vue 源码解读/image.png>)

## 源码




## 拓展

sass  软件即服务



------
Vue2 的双向绑定主要通过数据劫持 + 发布-订阅模式实现，核心是 Object.defineProperty API。以下是实现原理分步说明：

### 一、核心机制
1. 数据劫持（Observer）
Vue 遍历 data 对象的所有属性，通过 Object.defineProperty 将属性转换为 getter/setter：

```javascript
function defineReactive(obj, key) {
  let value = obj[key];
  const dep = new Dep();  // 每个属性对应一个依赖管理器
  
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {  // Watcher 触发 getter 时收集依赖
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      value = newVal;
      dep.notify();  // 数据变更时通知所有订阅者
    }
  });
}
```
2. 依赖收集（Dep）
每个被观察的属性对应一个 Dep 实例，管理所有 Watcher 订阅者：

```javascript
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}
```
3. 订阅者（Watcher）
在组件渲染时创建，负责更新视图：

```javascript
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;
    Dep.target = this;  // 暂存当前 Watcher
    this.vm[this.key];  // 触发 getter 以收集依赖
    Dep.target = null;
  }
  update() {
    this.updateFn.call(this.vm);
  }
}
```
### 二、双向绑定流程
1. 初始化阶段

	* 遍历 data 对象，递归调用 defineReactive 进行数据劫持。
	* 编译模板，解析 v-model 等指令，为表单元素绑定 input 事件。

2. 依赖收集阶段

	* 首次渲染时触发 Watcher 的 getter，将当前 Watcher 添加到 Dep 中。

3. 派发更新阶段

	* 当数据变化时触发 setter，通过 Dep.notify() 通知所有关联的 Watcher。
	* Watcher 执行 update() 更新视图或执行回调。
### 三、实现局限性
无法检测对象属性的新增/删除
需通过 Vue.set() 或 Vue.delete() 操作。
数组变异方法
Vue 重写了数组的 push/pop/shift/unshift/splice/sort/reverse 方法。
### 四、简单实现示例
```javascript
// 简易 Observer
function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach(key => defineReactive(data, key));
}

// 双向绑定 v-model
function compile(element, vm) {
  element.querySelectorAll('[v-model]').forEach(node => {
    const key = node.getAttribute('v-model');
    node.value = vm.data[key];
    node.addEventListener('input', e => {
      vm.data[key] = e.target.value;
    });
  });
}
```
// 完整示例需结合 Dep/Watcher 实现更新
通过这种机制，Vue2 实现了数据变化自动驱动视图更新，开发者无需手动操作 DOM。