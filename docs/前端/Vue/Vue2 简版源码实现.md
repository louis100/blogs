
#  Vue 2 核心实现

## 核心原理

Vue 2 的核心原理主要包括响应式系统、虚拟DOM和模板编译三大模块。以下是简化版的核心实现：

```javascript
// 简版Vue实现
class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data();
    
    // 1. 响应式处理
    new Observer(this._data);
    
    // 2. 模板编译
    new Compile(options.el, this);
  }
}

// 观察者（实现响应式）
class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        dep.notify();
      }
    });
  }
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

// 观察者
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this;
    this._value = vm._data[key]; // 触发getter
    Dep.target = null;
  }

  update() {
    const newValue = this.vm._data[this.key];
    if (newValue !== this._value) {
      this._value = newValue;
      this.cb(newValue);
    }
  }
}

// 模板编译器
class Compile {
  constructor(el, vm) {
    vm.$el = document.querySelector(el);
    const fragment = document.createDocumentFragment();
    let child;
    while (child = vm.$el.firstChild) {
      fragment.appendChild(child);
    }
    this.compile(fragment, vm);
    vm.$el.appendChild(fragment);
  }

  compile(node, vm) {
    if (node.nodeType === 1) {
      Array.from(node.attributes).forEach(attr => {
        if (attr.name.startsWith('v-')) {
          if (attr.name === 'v-model') {
            new Watcher(vm, attr.value, value => {
              node.value = value;
            });
            node.addEventListener('input', e => {
              vm._data[attr.value] = e.target.value;
            });
          }
        }
      });
    } else if (node.nodeType === 3) {
      const reg = /\{\{(.*?)\}\}/;
      if (reg.test(node.textContent)) {
        const key = RegExp.$1.trim();
        new Watcher(vm, key, value => {
          node.textContent = value;
        });
      }
    }

    if (node.childNodes) {
      node.childNodes.forEach(child => this.compile(child, vm));
    }
  }
}

// 使用示例
const app = new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello Lingma!',
      counter: 0
    }
  },
  methods: {
    reverseMessage() {
      this._data.message = this._data.message.split('').reverse().join('');
    }
  }
});
```
## 调用Demo HTML：

```html
<div id="app">
  <p>{{ message }}</p>
  <input type="text" v-model="message">
  <button onclick="app.reverseMessage()">Reverse</button>
  <p>Counter: {{ counter }}</p>
</div>
```
## 核心原理实现说明：

### 响应式系统（Observer模式）
* 通过 Object.defineProperty 实现数据劫持
* 每个属性对应一个 Dep 依赖收集器：使用 Dep 类管理依赖收集（观察者模式）
* 通过 Watcher 实现观察者模式：Watcher 作为观察者连接数据和视图

### 模板编译（Compiler）
* 解析DOM节点中的 {{}} 插值表达式：解析模板中的 {{}} 插值和 v- 指令
* 处理 v-model 等指令
* 创建对应的 Watcher 实现视图更新：为每个绑定创建对应的 Watcher
* 初始化时执行首次渲染

### 依赖追踪（更新机制）
* 在getter时收集依赖（Watcher）
* 在setter时通知更新
* 数据变化时触发 setter
* 通知 Dep 执行所有 Watcher 的更新
* 最终执行 DOM 更新操作

### 虚拟DOM简化版
* 实际DOM操作（真实Vue使用虚拟DOM优化）

## 该实现包含以下核心功能：
* 数据响应式绑定
* 双向数据绑定（v-model）
* 模板插值（{{}}）
* 方法调用

你可以通过修改输入框内容观察文本同步更新，点击按钮会反转文本内容。这展示了Vue的核心响应式机制，虽然省略了虚拟DOM等复杂实现，但保留了最核心的响应式原理。

> 典型数据流：
> 模板编译 → 创建 Watcher → 触发 getter → 依赖收集 → 数据修改 → 触发 setter → 通知更新 → 重新渲染

> 注意：真实Vue2还包含虚拟DOM Diff、组件系统、异步更新队列等复杂机制，以上实现仅保留最核心的响应式原理。