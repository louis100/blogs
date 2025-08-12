# bat 常用命令说明

以下是Windows批处理（.bat）文件中常用的命令及功能说明，按用途分类整理：

## 一、基础命令
1. **`@echo off`**  
   关闭命令回显，使脚本运行时只显示输出结果而不显示执行的命令。

2. **`echo`**  
   输出文本或变量内容，例如：  
   ```bat
   echo Hello World
   echo %PATH%
   ```
   支持重定向到文件（`>`追加，`>>`覆盖）。

3. **`pause`**  
   暂停脚本执行，等待用户按任意键继续。

4. **`rem` 或 `::`**  
   添加注释，例如：  
   ```bat
   rem 这是注释
   :: 这也是注释
   ```
   `::`性能略优于`rem`。



## 二、文件与目录操作
1. **`cd` 或 `chdir`**  
   切换当前目录，例如：  
   ```bat
   cd C:\Windows
   ```
   支持相对路径（`..`表示上级目录）。

2. **`md` 或 `mkdir`**  
   创建新目录：  
   ```bat
   md NewFolder
   ```
   支持同时创建多级目录。

3. **`del`**  
   删除文件，支持通配符：  
   ```bat
   del *.tmp  /s  # 递归删除所有.tmp文件
   ```
   注意：删除后无法从回收站恢复。

4. **`copy`**  
   复制文件或合并文件内容：  
   ```bat
   copy file1.txt + file2.txt merged.txt
   ```
   支持批量操作（如`copy *.txt backup\`）。

## 三、流程控制
1. **`if`**  
   条件判断，支持字符串、数值比较及文件存在性检查：  
   ```bat
   if exist "C:\file.txt" (
       echo 文件存在
   ) else (
       echo 文件不存在
   )
   ```
   参数`/i`可忽略大小写。

2. **`for`**  
   循环处理文件或文本内容，例如遍历文件：  
   ```bat
   for %%i in (*.txt) do echo %%i
   ```
   支持分隔符（`delims=`）和定点提取（`tokens=`）。

3. **`goto`**  
   跳转到指定标签：  
   ```bat
   goto :label
   :label
   ```
   常用于循环或条件分支。



## 四、系统与高级功能
1. **`set`**  
   定义或修改变量：  
   ```bat
   set name=Alice
   echo %name%
   ```
   支持用户输入（`set /p var=提示文本`）。

2. **`start`**  
   启动程序或打开文件：  
   ```bat
   start notepad.exe
   start "" "C:\Program Files\App\app.exe"
   ```
   参数`/wait`可等待程序结束。

3. **`taskkill`**  
   结束进程：  
   ```bat
   taskkill /im notepad.exe /f
   ```
   `/f`强制终止。

4. **`shutdown`**  
   关机或重启：  
   ```bat
   shutdown /s /t 60  # 60秒后关机
   shutdown /a        # 取消计划
   ```
   支持远程操作。

## 五、实用技巧示例
- **批量重命名文件**：  
  ```bat
  @echo off
  setlocal enabledelayedexpansion
  for %%f in (*.jpg) do (
      ren "%%f" "new_%%~nf.png"
  )
  ```
  将`.jpg`改为`.png`并添加前缀。

- **定时任务**：  
  ```bat
  ping -n 60 127.0.0.1 >nul && start backup.bat
  ```
  延迟60秒后执行脚本。



**注意事项**：  
- 路径含空格时需用引号包裹（如`"C:\Program Files"`）。  
- 建议以管理员身份运行涉及系统操作的脚本。  
- 调试时可添加`pause`或`echo`检查中间结果。

引用链接：
1.[程序员编程入门bat批处理: 命令管道符 - 哔哩哔哩](http://m.bilibili.com/video/BV1j3411a7uS)
2.[程序员编程入门必学知识:bat批处理介绍 - 哔哩哔哩](http://m.bilibili.com/video/BV1gq4y1y7Bf)
3.[使用BAT命令快速清理C盘垃圾,告别弹窗广告 - 小萌仓仓](http://haokan.baidu.com/v?pd=wisenatural&vid=11194055596287333161)
4.[bat命令 - 鼎力智造](http://haokan.baidu.com/v?pd=wisenatural&vid=12340338118852606462)
5.[学会这招,让你在同学同事中成为电脑高手! - 程序员阿卓](http://haokan.baidu.com/v?pd=wisenatural&vid=1316497858798307200)
6.[Bat常用命令:双开软件、删除文件、合并文件、更改文件类型 - 哔哩哔哩](http://www.bilibili.com/video/BV1tv4y1h79p)
7.[Excel技巧:必学的2个bat命令,批量合并工作簿和建立文件夹 - Excel自学成才](http://haokan.baidu.com/v?pd=wisenatural&vid=5336201634962140555)
8.[简单bat编程代码 - 沐沐宅言](http://haokan.baidu.com/v?pd=wisenatural&vid=9200804089039995948)
9.[电脑超神截图技巧,99%人不知道的BAT命令 - 度小视](http://quanmin.baidu.com/sv?source=share-h5&pd=qm_share_search&vid=11318483409298682809)
10.[windows命令行与批处理基础 - 哔哩哔哩](http://www.bilibili.com/video/BV12T411Z716)
11.[批处理入门:For命令详解 - 独行侠的背包](http://haokan.baidu.com/v?pd=wisenatural&vid=7776913160863573494)
12.[DOS命令全解析,轻松掌握批处理脚本。 - 臭屁小阿龟](http://haokan.baidu.com/v?pd=wisenatural&vid=13704921149412090358)
13.[批处理FOR命令详解:参数与分隔符的使用。 - 这把结束退游](http://haokan.baidu.com/v?pd=wisenatural&vid=8954084421244720186)
14.[黑马程序员Redis入门到实战教程,深度透析redis底层原理+redis分布式锁+企业解决方案+黑马点评实战项目 - 哔哩哔哩](http://www.bilibili.com/video/BV1cr4y1671t?p=138)
15.[【网络安全】冒死上传!(过于敏感)从来没有人把windows操作系统讲的这么细致!从入门到精通只需3天! - 哔哩哔哩](http://www.bilibili.com/video/BV1tV2MYFEQn?p=19)
16.[40个windows批处理命令,掌握它们让你在电脑上随心所欲 - 哔哩哔哩](http://www.bilibili.com/video/BV1Zm4y1t7bs)
17.[DOS命令详解,批处理脚本注释与用法。 - 实诚还刻苦丶好汉s](http://haokan.baidu.com/v?pd=wisenatural&vid=5156933655051613245)
18.[DOS批处理判断语句详解 - 度小视](http://quanmin.baidu.com/sv?source=share-h5&pd=qm_share_search&vid=7609414002624557402)
19.[Windows命令行批处理脚本视频 - 哔哩哔哩](http://www.bilibili.com/video/BV1Vs4y1B7jD?p=9)
20.[运维必备 | Win批处理(Batch)编程常用DOS命令汇总收藏备查 - 腾讯云](https://cloud.tencent.com/developer/article/2353410)
21.[仔仔的笔记丶 - www.flywb.com](http://www.flywb.com/)
22.[工作流调度必看!2025年这四大核心趋势你不能不懂 - CSDN博客](https://blog.csdn.net/DolphinScheduler/article/details/146023565)
23.[你的大模型还在慢吞吞?2025SGLang框架,架构原理大公开! - CSDN博客](https://blog.csdn.net/2401_85375151/article/details/149222734)
24.[2025年如何使用CMD轻松清理磁盘(已解决) - CSDN编程社区](http://yebd1h.smartapps.cn/pages/blog/index?blogId=148142011)
25.[一个视频教会你用最简单的方法做bat批处理 - 哔哩哔哩](http://www.bilibili.com/video/BV1VUJLzeEho)
26.[bat命令大全_bat暂停命令 - 腾讯云](https://cloud.tencent.com/developer/article/2157464)
27.[bat语法 - 腾讯云](https://cloud.tencent.com/developer/article/1594410)
28.[批处理脚本(bat脚本)用法总结 - CSDN博客](https://blog.csdn.net/hfy1237/article/details/130123285)
29.[【bat脚本】一文带你玩转bat脚本命令到自动化应用-CSDN博客 - CSDN博客](https://blog.csdn.net/weixin_51360020/article/details/143727541)
30.[什么是bat命令?常用 Bat 命令介绍及编写教程! - 搞机子](https://baijiahao.baidu.com/s?id=1815320084975830964&wfr=spider&for=pc)
31.[bat - 百度百科](https://baike.baidu.com/item/bat/365230)
32.[.bat批处理命令常用操作大全 - Qt编程绝顶哥](http://zhuanlan.zhihu.com/p/446337414)
33.[bat命令大全完整版 - 博客园](https://www.cnblogs.com/hwrex/p/18663235)
34.[bat脚本及相关命令 - New travel](http://zhuanlan.zhihu.com/p/722017353)
35.[Bat批处理脚本中常用命令汇总 - 腾讯云](https://cloud.tencent.com/developer/news/1061811)
36.[Bat批处理基础知识(中) - 腾讯云](https://cloud.tencent.com/developer/news/1053864)
37.[Bat批处理脚本for命令基础知识 - 腾讯云](https://cloud.tencent.com/developer/news/1058833)
38.[batch常用命令 - 腾讯云](https://cloud.tencent.com/developer/news/148038)
39.[如何使用bat在命令提示符中执行2命令目录行。文件 - 腾讯云开发者社区 - 腾讯云 - 腾讯云](https://cloud.tencent.com/developer/information/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8bat%E5%9C%A8%E5%91%BD%E4%BB%A4%E6%8F%90%E7%A4%BA%E7%AC%A6%E4%B8%AD%E6%89%A7%E8%A1%8C2%E5%91%BD%E4%BB%A4%E7%9B%AE%E5%BD%95%E8%A1%8C%E3%80%82%E6%96%87%E4%BB%B6)