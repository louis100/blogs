# 基础 this
在 JavaScript 中，this 的指向是动态绑定的，其具体值取决于函数的调用方式。以下是理解 this 的关键点：

## 一、核心规则
1. 默认绑定
当独立调用函数时（非对象方法/构造函数），this 指向全局对象：

```javascript
'use strict'
function show() {
  console.log(this); // 浏览器中指向 window（严格模式下为 undefined）
}
show();
```
2. 对象方法调用，隐式绑定
当函数作为对象方法调用时，this 指向调用该方法的对象：

```javascript
const obj = {
  name: 'Lingma',
  greet() {
    console.log(this.name); // 输出 "Lingma"
  }
};
obj.greet();
```
3. 显式绑定
使用 call/apply/bind 强制指定 this：

```javascript
function log() {
  console.log(this.id);
}
const elem = { id: 'btn' };
log.call(elem); // 输出 "btn"
```
4. new 绑定
构造函数中的 this 指向新创建的实例：

```javascript
function Person(name) {
  this.name = name; // this 指向新对象
}
const p = new Person('Alice');
```
5. 箭头函数
箭头函数没有自己的 this，继承外层作用域的 this：

```javascript
const timer = {
  data: 'Hello',
  start() {
    setTimeout(() => {
       console.log(this.data); // 继承外层 this → obj
    }, 100);
  }
};
timer.start();

// 箭头函数 this 指向外层 this
const outerThis = this;
const arrowFn = () => {
  console.log(this === outerThis); // true（继承外层 this）
};
arrowFn();
```

6. DOM 事件处理   
```javascript
button.addEventListener('click', function() {
  console.log(this); // → 触发事件的 DOM 元素
});
```

7. 严格模式影响   
```javascript
'use strict';
function test() {
  console.log(this); // undefined（默认绑定失效）
}
test();
```

## 二、特殊场景处理

### 场景 1：回调函数丢失 this
```javascript
const data = {
  value: 10,
  fetch() {
    setTimeout(function() {
      console.log(this.value); // this → window（非严格模式）
    }, 100);
  }
};
data.fetch(); // 输出 undefined

// 修复方案：箭头函数
const dataFixed = {
  value: 10,
  fetch() {
    setTimeout(() => {
      console.log(this.value); // ✅ 输出 10
    }, 100);
  }
};
dataFixed.fetch();
```
### 场景 2：多层对象方法调用（this →指向【.】前面的对象）

```javascript
const company = {
  name: 'TechCorp',
  department: {
    printName() {
      console.log(this.name); // this → department 对象
    }
  }
};
company.department.printName(); // undefined（无 name 属性）
```
### 场景 3：DOM 事件处理

```javascript
document.querySelector('button').addEventListener('click', function() {
  console.log(this); // → 被点击的 button 元素
});
```
### 场景 4：方法赋值后调用

```javascript
const obj = {
  prop: 'value',
  method() {
    console.log(this.prop);
  }
};
const fn = obj.method;
fn(); // this → window/undefined（独立调用）
```

### 场景 5：严格模式影响

```javascript
'use strict';
function test() {
  console.log(this); // undefined（默认绑定失效）
}
test();
```
--------------------------
### 方法赋值丢失绑定

```javascript
const counter = {
  count: 0,
  increment() {
    console.log(this.count);
  }
};

const fn = counter.increment;
fn(); // this → window/undefined（独立调用）
```
### 回调函数中的 this
```javascript
const data = {
  value: 42,
  fetch() {
    fetchData(function(result) { // 普通函数回调
      console.log(this.value); // this → window/undefined
    });
  },
  fetchFixed() {
    fetchData(() => { // 箭头函数回调
      console.log(this.value); // → 42
    });
  }
};
data.fetch();
data.fetchFixed();
```

## 二、判断 this 指向的步骤
1. 检查是否通过 new 调用 → 指向新对象/实例
2. 检查是否使用 call/apply/bind → 指向第一个参数
3. 检查是否是箭头函数 → 继承外层 this
4. 检查是否作为对象方法调用 → 指向调用对象
5. 以上都不满足 → 默认绑定（全局对象/undefined）
--------
1. 是否使用 new → 指向新实例
2. 是否使用 call/apply/bind → 指向第一个参数
3. 是否为箭头函数 → 继承外层 this
4. 是否为对象方法调用 → 指向调用对象
5. 是否在严格模式 → 影响默认绑定
6. 是否为 DOM 事件处理 → 指向触发元素
7. 是否作为回调传递 → 可能丢失绑定

   
## 三、常见场景示例

### 场景 1：回调函数丢失 this，修复方案：使用箭头函数
```javascript
// 场景 1：回调函数丢失 this
const counter = {
  count: 0,
  increment() {
	console.log("外层：=》",this); 
    setInterval(function() {
      console.log(this.count); // 错误！this 指向 window
    }, 1000);
  }
};
counter.increment();

// 修复方案：使用箭头函数
const counterFixed = {
  count: 0,
  increment() {
    setInterval(() => {
      console.log(this.count); // ✅ 正确指向 counterFixed
    }, 1000);
  }
};
counterFixed.increment();
```

### 场景 2：DOM 事件处理

```javascript
// 场景 2：DOM 事件处理
button.addEventListener('click', function() {
  console.log(this); // 指向被点击的 button 元素
});
```

## 四、常见陷阱解决方案
### 绑定丢失修复
```javascript
// 方案 1：使用 bind
const boundFn = counter.increment.bind(counter);

// 方案 2：箭头函数包裹
setTimeout(() => {
  counter.increment();
}, 100);
```
### 多层对象访问
```javascript
const school = {
  name: 'MIT',
  classes: {
    showName() {
      console.log(this.name); // this → classes 对象
    }
  }
};
school.classes.showName(); // undefined（this → 指向直接调用者）
```
## 五、调试技巧
```javascript
// 在函数内部添加调试语句
function debugThis() {
  console.log('Current this:', this); 
  debugger; // 使用开发者工具查看
}
```

## 总结关键点
1. 箭头函数没有自己的 this，继承外层作用域，普通函数有动态 this
2. 显式绑定（call/apply/bind）优先级最高
3. 显式绑定优先级最高，new 次之
4. 对象方法调用关注调用点（. 前的对象）
5. 严格模式会改变默认绑定行为，严格模式下默认绑定为 undefined
6. 回调函数中优先使用箭头函数或 bind 锁定 this，使用 bind 或箭头函数可锁定 this 指向


通过结合调用方式分析，结合开发者工具断点调试（查看实时 this 值），可以更准确地判断 this 指向。