以下是 Vue 2 源码目录结构的详细解析，帮助开发者快速定位核心模块并理解框架设计：

---

### **1. 核心目录概览**
```text
src
├── compiler    # 模板编译相关
├── core        # 运行时核心代码
├── platforms   # 平台适配代码
├── server      # 服务端渲染逻辑
├── sfc         # 单文件组件(.vue)解析
└── shared      # 共享工具函数
```

---

### **2. 关键目录详解**
#### **(1) `compiler` - 模板编译**
- **功能**：将模板字符串转换为渲染函数。
  - `parser`：解析模板生成 AST（抽象语法树）。
  - `optimizer`：标记静态节点以优化 Diff 性能。
  - `codegen`：将 AST 转换为可执行的渲染代码。

#### **(2) `core` - 运行时核心**
- **子目录**：
  - `instance`：Vue 实例初始化逻辑（如 `_init` 方法）。
  - `observer`：响应式系统实现（`Object.defineProperty` 劫持）。
  - `vdom`：虚拟 DOM 的创建、Diff 和 Patch 算法。
  - `global-api`：全局 API（如 `Vue.component`、`Vue.use`）。

#### **(3) `platforms` - 平台适配**
- **web**：浏览器端 DOM 操作和事件处理。
- **weex**：移动端跨平台支持（已逐渐弃用）。

#### **(4) `shared` - 共享工具**
- 跨模块复用的常量（如 `emptyObject`）和工具函数（如 `isPlainObject`）。

#### **(5) `sfc` - 单文件组件解析**
- 处理 `.vue` 文件的解析，分离 `<template>`、`<script>`、`<style>`。

#### **(6) `server` - 服务端渲染**
- 生成服务端渲染的 Bundle 和客户端激活逻辑。

---

### **3. 辅助目录**
- **`benchmarks`**：性能测试用例（如大数据量渲染）。
- **`scripts`**：构建脚本（Rollup 配置）。
- **`dist`**：输出不同格式的构建产物（如 `vue.runtime.esm.js`）。

---

### **4. 源码调试建议**
1. **入口文件**：从 `src/core/instance/index.js` 开始追踪实例化流程。
2. **响应式系统**：重点分析 `core/observer` 下的 `Dep` 和 `Watcher` 类。
3. **模板编译**：通过 `compiler` 目录理解 `template` → `AST` → `render` 的转换过程。

---

### **5. 版本差异说明**
- **完整版 vs 运行时版**：  
  - 完整版包含 `compiler`（可编译模板），运行时版需预编译。
  - 构建产物位于 `dist` 目录，文件名带 `runtime` 的为运行时版。

通过此结构分析，可系统性地深入 Vue 2 的响应式、虚拟 DOM 和编译机制。

引用链接：
1.[Vue 2.0源码分析-目录设计 - CSDN博客](https://blog.csdn.net/weixin_40629244/article/details/134521135)
2.[【Vue.js 2.x源码解析】第1章 源码目录设计解析:从源码结构看框架架构 - CSDN下载](https://download.csdn.net/blog/column/12862440/144668017)
3.[vue - 优雅的vue2项目总体结构 - CSDN博客](https://blog.csdn.net/qq_43886365/article/details/131892487)
4.[vue项目目录结构分析 - 博客园](https://www.cnblogs.com/linda-liu/p/12305642.html)
5.[vue源码学习(一)——目录结构 - yy缇](https://zhuanlan.zhihu.com/p/166375306)
6.[Vue2源码解析-源码调试与核心流程梳理图解 - 会飞的一棵树 - 博客园 - 博客园](https://www.cnblogs.com/flytree/p/16448646.html)
7.[vue2源码解析(一) - 大前端驿站](https://zhuanlan.zhihu.com/p/395984169)
8.[Vue2.x 源码学习系列-目录结构介绍  - 掘金开发者社区](https://juejin.cn/post/7012417885624598564)
9.[Vue2语法和必备知识点,目录结构,环境搭建(二)  - 掘金开发者社区](https://juejin.cn/post/7475621800782282789)
10.[Vue进阶之Vue2源码解析 - CSDN博客](https://blog.csdn.net/qq_34306228/article/details/138256446)
11.[理解Vue2源码:目录结构、构建过程与核心机制-CSDN博客 - CSDN博客](https://blog.csdn.net/m0_56896206/article/details/123093022)
12.[Vue源码解析-源码目录及源码调试运行 - 博客园](https://www.cnblogs.com/mq0036/p/14784328.html)
13.[一个简单案例的Vue2.0源码 - 博客园](https://www.cnblogs.com/jann8/p/17840127.html)
14.[javascript - 内部分享篇:Vue2源码浅析 - 个人文章 - SegmentFault 思否 - 思否开发者社区](https://segmentfault.com/a/1190000041673669?utm_source=sf-similar-article)
15.[vue核心源码目录解读  - 掘金开发者社区](https://juejin.cn/post/7435584321865990180)
16.[Vue2-Vue项目的目录结构和.vue文件的构成 - CSDN技术社区](https://devpress.csdn.net/vue/66cd4a878f4f502e1cfe2f0d.html)
17.[vue.js - vue2源码解析(重构版)(1) - 记录大前端成长路线 - SegmentFault 思否 - 思否开发者社区](https://segmentfault.com/a/1190000040853698)
18.[我理解的Vue 2 源码第一级目录  - 掘金开发者社区](https://juejin.cn/post/7494870286645084211)
19.[📚 Vue2项目目录结构解析 - 星火柯技能燎原](https://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_3007240250434513783)