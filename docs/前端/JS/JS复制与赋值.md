在 JavaScript/TypeScript 中，**赋值（Assignment）** 和 **复制（Copying）** 是两种不同的操作，主要区别在于对 **原始数据类型（Primitive Types）** 和 **引用数据类型（Reference Types）** 的处理方式。  

---

## **1. 赋值（Assignment）**
**赋值** 是指将一个变量存储的值（原始值或引用地址）直接传递给另一个变量。  
- **原始数据类型（`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`）**：
  - 赋值时传递的是 **值的副本**，修改新变量不会影响原变量。
  ```js
  let a = 10;
  let b = a; // 赋值（b 是 a 的副本）
  b = 20;
  console.log(a); // 10（a 不受影响）
  ```
- **引用数据类型（`object`, `array`, `function`）**：
  - 赋值时传递的是 **内存地址的引用**，修改新变量会影响原变量。
  ```js
  let obj1 = { name: "Alice" };
  let obj2 = obj1; // 赋值（obj2 和 obj1 指向同一内存地址）
  obj2.name = "Bob";
  console.log(obj1.name); // "Bob"（obj1 也被修改）
  ```

**总结**：
- **原始类型赋值**：复制值，新旧变量独立。
- **引用类型赋值**：复制引用，新旧变量共享同一对象。

---

## **2. 复制（Copying）**
**复制** 是指创建一个新对象，并复制原对象的所有属性（可能涉及 **浅拷贝** 或 **深拷贝**）。  
### **(1) 浅拷贝（Shallow Copy）**
- 仅复制对象的第一层属性，嵌套对象仍然是引用共享。
- **方法**：
  - `Object.assign({}, obj)`
  - `{ ...obj }`（扩展运算符）
  - `arr.slice()`
  - `[...arr]`
  ```js
  const obj1 = { a: 1, b: { c: 2 } };
  const obj2 = { ...obj1 }; // 浅拷贝
  obj2.a = 99; // 不影响 obj1
  obj2.b.c = 99; // 会影响 obj1.b.c
  ```
  **影响**：
  - 修改 `obj2.a` 不影响 `obj1.a`（第一层独立）。
  - 修改 `obj2.b.c` 会影响 `obj1.b.c`（嵌套对象共享引用）。

### **(2) 深拷贝（Deep Copy）**
- 递归复制所有层级，新旧对象完全独立。
- **方法**：
  - `JSON.parse(JSON.stringify(obj))`（不支持 `function`、`Symbol`、循环引用）
  - `structuredClone()`（现代浏览器 API）
  - Lodash 的 `_.cloneDeep()`
  - 手动递归实现
  ```js
  const obj1 = { a: 1, b: { c: 2 } };
  const obj2 = JSON.parse(JSON.stringify(obj1)); // 深拷贝
  obj2.b.c = 99; // 不影响 obj1.b.c
  ```
  **影响**：
  - 修改 `obj2` 的任何属性都不会影响 `obj1`。

---

## **3. 赋值 vs 复制 对比**
| **操作** | **原始类型** | **引用类型** | **影响** |
|----------|------------|------------|---------|
| **赋值** | 复制值 | 复制引用 | 修改新变量会影响原对象 |
| **浅拷贝** | 不适用 | 仅复制第一层 | 修改嵌套对象会影响原对象 |
| **深拷贝** | 不适用 | 复制所有层级 | 新旧对象完全独立 |

---

## **4. 如何选择？**
- **赋值**：适用于简单变量传递，但引用类型会共享内存。
- **浅拷贝**：适用于单层对象，性能较好。
- **深拷贝**：适用于嵌套对象，确保数据隔离（但性能较低）。

---

## **5. 总结**
- **赋值**：直接传递值或引用，引用类型会共享内存。
- **复制**：
  - **浅拷贝**：仅复制第一层，嵌套对象仍共享。
  - **深拷贝**：完全独立复制所有层级。

**关键点**：
- **原始类型**：赋值即复制，新旧变量独立。
- **引用类型**：
  - 赋值 → 共享引用。
  - 浅拷贝 → 第一层独立，嵌套共享。
  - 深拷贝 → 完全独立。