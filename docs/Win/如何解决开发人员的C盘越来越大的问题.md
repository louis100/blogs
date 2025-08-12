
以下是解决开发人员前后端依赖包安装到C盘导致空间不足的完整方案，涵盖环境重定向、迁移清理和预防措施，全部免费且可自行操作：

---

###  ?? 一、环境变量重定向（永久解决方案）
#### 1. **Node.js 项目（npm/yarn/pnpm）**
```powershell
# 创建新缓存目录（在D盘）
mkdir D:\nodejs\npm_cache
mkdir D:\nodejs\npm_global

# 修改npm配置
npm config set prefix "D:\nodejs\npm_global" --global
npm config set cache "D:\nodejs\npm_cache" --global

# Yarn配置
yarn config set global-folder "D:\nodejs\yarn_global"
yarn config set cache-folder "D:\nodejs\yarn_cache"
```

#### 2. **Python 项目（pip）**
```powershell
# 新建目录
mkdir D:\python\pip_cache
mkdir D:\python\site-packages

# 修改pip配置
pip config set global.cache-dir "D:\python\pip_cache"
pip config set global.target "D:\python\site-packages"
```

#### 3. **Java/Maven 项目**
1. 复制现有仓库：
   ```powershell
   robocopy C:\Users\用户名\.m2\repository D:\maven-repo /MIR
   ```
2. 修改 `~/.m2/settings.xml`：
   ```xml
   <settings>
     <localRepository>D:\maven-repo</localRepository>
   </settings>
   ```

---

###  ?? 二、迁移现有依赖（立即释放C盘空间）
#### 1. **Node_modules 迁移工具**
```powershell
# 安装迁移工具
npm install -g move-node-modules

# 在项目根目录执行
move-node-modules --destination D:\projects\dependencies
```

#### 2. **Python虚拟环境迁移**
```powershell
# 1. 复制虚拟环境
robocopy C:\venv D:\new_venv /MIR

# 2. 修改激活脚本
(Get-Content D:\new_venv\Scripts\activate) -replace 'C:\\venv', 'D:\\new_venv' | Set-Content D:\new_venv\Scripts\activate
```

#### 3. **Windows符号链接（原地迁移）**
```powershell
# 示例：迁移npm缓存（保留原路径访问）
robocopy C:\Users\用户名\AppData\Roaming\npm-cache D:\npm-cache /MIR
rmdir C:\Users\用户名\AppData\Roaming\npm-cache
mklink /J C:\Users\用户名\AppData\Roaming\npm-cache D:\npm-cache
```

---

###  ??? 三、预防措施（避免未来占用）
#### 1. **系统级配置**
| 环境变量 | 推荐值 | 作用 |
|---------|--------|------|
| `NPM_CONFIG_PREFIX` | `D:\nodejs\npm_global` | 全局安装位置 |
| `PIP_TARGET` | `D:\python\site-packages` | Python包目录 |
| `YARN_GLOBAL_FOLDER` | `D:\nodejs\yarn_global` | Yarn全局目录 |

#### 2. **IDE配置覆盖**
- **VSCode**：在项目`.vscode/settings.json`添加：
  ```json
  {
    "npm.packageManager": "yarn",
    "terminal.integrated.env.windows": {
      "NPM_CONFIG_CACHE": "D:/nodejs/npm_cache"
    }
  }
  ```
- **IntelliJ IDEA**：`File > Build > Build Tools` 中重写Maven本地仓库路径

#### 3. **项目级锁定**
在项目根目录创建配置文件：
```bash
# .npmrc (Node项目)
cache=D:/nodejs/project_cache
prefix=D:/nodejs/project_global

# .mvn/jvm.config (Maven项目)
-Dmaven.repo.local=D:/maven-repo/projectA
```

---

###  ?? 四、清理工具（附加推荐）
1. **TreeSize Free**：可视化分析C盘大文件
2. **BleachBit**：安全清理临时文件
3. **Windows自带**：
   ```powershell
   cleanmgr /sageset:65535 & cleanmgr /sagerun:65535  # 深度清理工具
   ```

>  ?? **操作建议**：
> 1. 先执行环境变量重定向（永久生效）
> 2. 再迁移现有依赖（立即释放空间）
> 3. 最后配置IDE/项目锁定（预防未来问题）
> 4. 定期使用清理工具维护

通过此方案，可将依赖占用从C盘转移至其他分区，同时保持开发环境正常运行，无需重装任何工具。迁移后C盘可释放数十GB空间（视项目规模而定）。

引用链接：
1.[尚硅谷Node.js零基础视频教程,nodejs新手到高手 - 哔哩哔哩](http://www.bilibili.com/video/BV1gM411W7ex?p=85)
2.[30 分钟掌握 Webpack - 哔哩哔哩](http://www.bilibili.com/video/BV11g411y7Sd)
3.[两小时,带你深入前端性能优化方案 - 哔哩哔哩](http://www.bilibili.com/video/BV1GAWDe7E3k?p=14)
4.[【2025最新版】前端Webpack5基础应用篇+高级应用篇视频教程(全95集) - 哔哩哔哩](http://www.bilibili.com/video/BV1AywmeKE79?p=85)
5.[千锋教育web前端高频面试题视频教程,kerwin大话前端面试秘籍(附答案) - 哔哩哔哩](http://www.bilibili.com/video/BV1tL411k7VU)
6.[【2025最新版】前端工程化快速入门到精通(全231集) - 哔哩哔哩](http://www.bilibili.com/video/BV1byr5YeEMk?p=31)
7.[前端工程化都有哪些及优化方案 - 光影少年](http://zhuanlan.zhihu.com/p/1080645843)
8.[如何使用 Webpack 打包和优化前端项目? - CSDN博客](https://blog.csdn.net/m0_61505785/article/details/145436197)
9.[总结几个 webpack 打包优化的方法,前端项目必备-CSDN博客 - CSDN博客](https://blog.csdn.net/ch834301/article/details/113287010)
10.[Serein包子女士 - Serein包子女士](http://mbd.baidu.com/newspage/data/dtlandingsuper?nid=dt_5621145295450524803)
11.[前端性能优化 -- 全流程优化(千字干货) - Anita](http://zhuanlan.zhihu.com/p/554089198)
12.[前端性能优化(21种优化+7种定位方式) - www.cloud.tencent.com](https://www.cloud.tencent.com/developer/article/1733071)
13.[前端性能优化——包体积压缩82%、打包速度提升65% - 腾讯云](https://cloud.tencent.com/developer/article/2285316)