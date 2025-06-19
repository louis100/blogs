# HTML DOM节点类型与nodeType值的对照表及示例说明：

以下是HTML DOM节点类型与`nodeType`值的对照表及示例说明：

### 1. **元素节点 (Element Node)**
- **nodeType**: 1  
- **内容**: HTML标签（如`<div>`、`<p>`）  
- **示例**:  
  ```html
  <div id="example">内容</div>
  ```
  ```javascript
  const div = document.getElementById("example");
  console.log(div.nodeType); // 输出: 1
  ```  
  **特性**: `nodeName`返回标签名（大写），`nodeValue`为`null`。

---

### 2. **属性节点 (Attribute Node)**
- **nodeType**: 2  
- **内容**: 元素的属性（如`id`、`class`）  
- **示例**:  
  ```html
  <a href="https://example.com">链接</a>
  ```
  ```javascript
  const link = document.querySelector("a");
  const attr = link.getAttributeNode("href");
  console.log(attr.nodeType); // 输出: 2
  ```  
  **注意**: 属性节点不属于DOM树的一部分，需通过`getAttributeNode`获取。

---

### 3. **文本节点 (Text Node)**
- **nodeType**: 3  
- **内容**: 元素内的文本（包括空格和换行）  
- **示例**:  
  ```html
  <p>Hello World</p>
  ```
  ```javascript
  const p = document.querySelector("p");
  const textNode = p.childNodes[0]; // 第一个子节点为文本节点
  console.log(textNode.nodeType); // 输出: 3
  ```  
  **特性**: `nodeName`为`#text`，`nodeValue`为文本内容。

---

### 4. **注释节点 (Comment Node)**
- **nodeType**: 8  
- **内容**: HTML注释（`<!-- 注释 -->`）  
- **示例**:  
  ```html
  <!-- 这是一条注释 -->
  ```
  ```javascript
  const comment = document.body.childNodes[0]; // 假设注释是第一个子节点
  console.log(comment.nodeType); // 输出: 8
  ```  
  **特性**: `nodeName`为`#comment`，`nodeValue`为注释内容。

---

### 5. **文档节点 (Document Node)**
- **nodeType**: 9  
- **内容**: 整个文档的根节点（`document`对象）  
- **示例**:  
  ```javascript
  console.log(document.nodeType); // 输出: 9
  ```  
  **特性**: `nodeName`为`#document`。

---

### 6. **文档类型节点 (Document Type Node)**
- **nodeType**: 10  
- **内容**: `<!DOCTYPE html>`声明  
- **示例**:  
  ```javascript
  console.log(document.doctype.nodeType); // 输出: 10
  ```  
  **特性**: `nodeName`为`html`（或其他文档类型）。

---

### 其他较少用到的节点类型：
- **CDATA节点 (CDATASection Node)**: `nodeType`为4，用于XML/CDATA片段。  
- **实体引用节点 (Entity Reference Node)**: `nodeType`为5，HTML中几乎不使用。  
- **处理指令节点 (Processing Instruction Node)**: `nodeType`为7，用于XML处理指令。  
- **文档片段节点 (Document Fragment Node)**: `nodeType`为11，虚拟容器节点。  

---

### 总结表格
| 节点类型          | nodeType | 示例内容               | 获取方式示例                     |
|-------------------|----------|------------------------|----------------------------------|
| 元素节点          | 1        | `<div>`                | `document.getElementById()`     |
| 属性节点          | 2        | `href="..."`           | `element.getAttributeNode()`    |
| 文本节点          | 3        | `"Hello"`              | `element.childNodes[0]`         |
| 注释节点          | 8        | `<!-- comment -->`     | `document.body.childNodes[0]`   |
| 文档节点          | 9        | `document`             | 直接访问`document`              |
| 文档类型节点      | 10       | `<!DOCTYPE html>`      | `document.doctype`              |

以上内容综合了W3School、菜鸟教程及技术博客的权威解释。

引用链接：
1.[HTML DOM Element nodeType 属性 - www.w3school.com.cn](https://www.w3school.com.cn/jsref/prop_node_nodetype.asp)
2.[js【详解】DOM (含 12 种节点类型,NodeList 与 HTMLCollection 的区别,DOM 的增删改查、提升 DOM 的性能等) - CSDN博客](https://blog.csdn.net/weixin_41192489/article/details/136595371)
3.[HTML DOM基础知识及value、innerHTML、innerText属性的区别 - CSDN博客](https://blog.csdn.net/cnds123/article/details/125357033)
4.[HTML中Dom节点操作详解 - 动力节点Java培训](https://www.bjpowernode.com/hot/3330.html)
5.[简述HTML DOM及其节点分类 - 博客园](https://www.cnblogs.com/zhuwq585/p/6075119.html)
6.[HTML DOM nodeType 属性 - www.runoob.com](https://www.runoob.com/jsref.../prop-node-nodetype.html)
7.[HTML DOM 节点信息 - www.w3school.com.cn](https://www.w3school.com.cn/htmldom/dom_nodes_info.asp)
8.[DOM节点类型列举  - 掘金开发者社区](https://juejin.cn/post/7479468525985890367)
9.[【HTML DOM】认识DOM的三大节点:元素节点,文本节点,属性节点以及nodeName,nodeType,nodeValue的区别 - CSDN博客](https://blog.csdn.net/xiaozhen0610/article/details/106966004/)
10.[HTML DOM 节点介绍(nodeName,nodeValue,nodeType) - 博客园](https://www.cnblogs.com/oooweb/p/html-dom-nodetype.html)
11.[HTML DOM 节点操作详解-CSDN博客 - CSDN博客](https://blog.csdn.net/m0_53644435/article/details/121678088)
12.[html文档中怎么区分节点对象节点类型,DOM(文档对象模型)的12个节点类型 - CSDN博客](https://blog.csdn.net/weixin_42499004/article/details/117796083)
13.[HTML 入门教程 - 知乎 - 尹君旭](http://zhuanlan.zhihu.com/p/12675882096)
14.[DOM基本操作(一:对节点属性和内容的操作) - 博客园](https://www.cnblogs.com/cui-ting/p/9608005.html)
15.[实战,DOM节点属性介绍 - 我是丑九怪](https://baijiahao.baidu.com/s?id=1811456223118456474&wfr=spider&for=pc)
16.[📚DOM节点层级关系详解🔍 - 仁和里拾柒路过人间](http://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_5630274016551865464)
17.[CandyPeach - CandyPeach](http://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_5709753133732735477)
18.[HTML DOM 的nodeType属性 - 博客园](https://www.cnblogs.com/masanhe/p/8990949.html)
19.[HTML —— iframe、embed、object、progress和meter元素 - 走过路过](http://zhuanlan.zhihu.com/p/676457303)
20.[html中DOM的示例分析-创新互联 - www.xiwangwangguoyuan.com](http://www.xiwangwangguoyuan.com/article/edioo.html)
21.[JSѧϰ---(13) HTML DOM - 南岸](https://zhuanlan.zhihu.com/p/430664076)
22.[当数据与逻辑在HTML中相遇:我的数组与函数学习之旅 - 第四宇宙速度](http://zhuanlan.zhihu.com/p/1909534560468832781)
23.[JS DOM节点操作详解 - CSDN博客](https://blog.csdn.net/2401_84093780/article/details/137967965)
24.[html dom的nodetype值介绍,HTML DOM nodeType用法及代码示例 - CSDN博客](https://blog.csdn.net/weixin_34079825/article/details/117939746)
25.[html DOM 03 节点的属性 - 博客园](https://www.cnblogs.com/JasperZhao/p/13375393.html)
26.[HTML DOM的nodeType值[试验田] - 博客园](https://www.cnblogs.com/x116/articles/1083915.html)
27.[HTML node相关的一些资料整理 - 脚本之家](https://www.jb51.net/article/21701.htm)
28.[HTML 列表元素 - 良行](http://zhuanlan.zhihu.com/p/584197137)