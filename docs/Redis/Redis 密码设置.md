在 Redis 服务端设置密码可通过以下两种方式实现，分别对应临时生效和永久生效场景：

---

### 一、**命令行临时设置（重启失效）**
1. **连接 Redis 服务端**  
   ```bash
   redis-cli
   ```
2. **设置密码**  
   ```bash
   CONFIG SET requirepass your_password
   ```
   返回 `OK` 表示设置成功。  
3. **验证密码**  
   ```bash
   AUTH your_password  # 返回 OK 即验证通过
   CONFIG GET requirepass  # 查看当前密码（需先认证）
   ```

> ⚠️ 注意：此方式设置的密码在 Redis 服务重启后会失效。

---

### 二、**配置文件永久设置（推荐）**
1. **修改配置文件**  
   找到 Redis 配置文件（通常为 `redis.conf` 或 `redis.windows.conf`），取消 `requirepass` 行的注释并设置密码：  
   ```text
   requirepass your_password
   ```
   Windows 用户需注意配置文件路径，默认位于安装目录下。  
2. **重启 Redis 服务**  
   - Linux 系统：  
     ```bash
     sudo systemctl restart redis
     ```
   - Windows 系统：  
     需通过任务管理器结束进程后，重新执行以下命令启动：  
     ```cmd
     redis-server.exe redis.windows.conf
     ```  

---

### 三、**密码验证与连接**
- **带密码连接 Redis**  
  ```bash
  redis-cli -a your_password
  ```
  或先连接后认证：  
  ```bash
  redis-cli
  AUTH your_password
  ```  
- **取消密码**  
  命令行执行 `CONFIG SET requirepass ""` 或删除配置文件中的 `requirepass` 行。

---

### 注意事项
1. 密码需包含字母、数字及符号，建议长度 ≥16 位以增强安全性。  
2. 修改配置文件后，必须通过指定配置文件启动服务（如 `redis-server.exe redis.windows.conf`），否则可能加载默认配置。  
3. Redis 6.0+ 版本推荐使用 ACL 功能进行更精细的权限管理。

引用链接：
1.[redis设置密码 - 阿里云开发者社区](https://developer.aliyun.com/article/1498012)
2.[Redis 密码设置和查看密码-阿里云开发者社区 - 阿里云开发者社区](https://developer.aliyun.com/article/1573507)
3.[redis密码设置 - CSDN博客](https://blog.csdn.net/m0_74824002/article/details/145900139)
4.[redis添加密码 - 博客园](https://www.cnblogs.com/elfin/p/18731851)
5.[Redis密码设置方法:重启与无需重启两种选择 - 轻麦芽芽](https://baijiahao.baidu.com/s?id=1834291994184827322&wfr=spider&for=pc)
6.[设置redis密码 - CSDN博客](https://blog.csdn.net/weixin_36797191/article/details/143714716)
7.[墨韵文驿 - 墨韵文驿](http://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_5764935668097033933)
8.[redis设置密码并修改查看的几种方式 - 阿里云开发者社区](https://developer.aliyun.com/article/1131896)
9.[028-Redis密码配置 - 哔哩哔哩](http://www.bilibili.com/video/BV1vg411d7sw?p=27)
10.[2025年B站最强的Java面试场景题全套教程!一周学完帮你少走99%弯路!【Java八股文+Java高频大厂面试真题+Java面试热门场景题+PDF笔记】 - 哔哩哔哩](http://www.bilibili.com/video/BV1t1QHYVEnC?p=53)
11.[如何为Redis设置临时和永久密码以确保安全访问 - 智多多教程](https://baijiahao.baidu.com/s?id=1834291994702667792&wfr=spider&for=pc)
12.[Redis 设置密码(配置文件、docker容器、命令行3种场景) - CSDN博客](https://blog.csdn.net/m0_67392010/article/details/145899522)
13.[macos系统中redis如何设置密码 - 阿里云开发者社区](https://developer.aliyun.com/article/1567017)
14.[如何为 Redis 设置密码 - CSDN博客](https://blog.csdn.net/wenxuankeji/article/details/143607404)
15.[Redis如何设置密码及验证密码?  - bbs.itying.com](https://bbs.itying.com/topic/66d56e10bb648a00d0980818)
16.[redis如何设置密码 - 阿甘](http://zhuanlan.zhihu.com/p/591467453)
17.[【Redis】试玩02——win11设置密码以及启用远程连接 - Peanuts](http://zhuanlan.zhihu.com/p/685055402)
18.[redis如何设置密码 - 博客园](https://www.cnblogs.com/ForgetAllThings/p/14204161.html)
19.[【Redi技巧】Redis如何设置密码,快来看看吧 - 哔哩哔哩](http://www.bilibili.com/video/BV1DG411E7At)
20.[五. Redis 配置内容(详细配置说明) - RainbowSea](http://zhuanlan.zhihu.com/p/20811642709)
21.[哈利与金飞贼温暖了 - 哈利与金飞贼温暖了](http://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_4165685194763318191)
22.[零基础,安装配置 redis 服务 - 我叫武月](https://zhuanlan.zhihu.com/p/492869524)