# Vitepress 多环境配置

以下是 Vitepress 多环境配置的实现方案，基于 Vite 原生环境变量机制适配文档项目场景 35：

## 一、环境变量文件配置

### 创建环境变量文件 ‌

在项目根目录创建以下文件，区分不同环境：

```bash
.env                # 全局默认配置（所有环境共享）
.env.development    # 开发环境（本地运行）
.env.staging        # 测试环境（自定义模式）
.env.production     # 生产环境（构建发布）
```

### 定义环境变量规则 ‌

1. 变量必须以 VITE\_ 开头才能在客户端访问
2. 示例 .env.staging 内容：

```ini
VITE_BASE_PATH=/docs/         # 基础路径
VITE_API_BASE=https://test.api.com  # 接口地址
VITE_ANALYTICS=false          # 测试环境禁用统计
```

## 二、Vitepress 配置接入

1. ‌修改 .vitepress/config.mts‌
2. 动态读取环境变量：

```typescript
import { defineConfig, loadEnv } from "vitepress";

// VitePress 配置文件是SSR构建时运行的，需通过loadEnv手动加载环境变量：
const env = loadEnv('', process.cwd(), 'VITE_') // 显式加载
console.log("VITE_BASE_PATH:", env.VITE_BASE_PATH);

// import.meta.env.VITE_ANALYTICS  // 在此不行
export default defineConfig({
  base: env.VITE_BASE_PATH, // 优先使用环境变量
  head: [
    // 根据环境加载不同统计脚本
    env.VITE_ANALYTICS === "true" ? [["script", { src: "/analytics.js" }]] : [],
  ],
});
```

### TypeScript 类型支持 ‌

创建 env.d.ts 声明文件：

```typescript
interface ImportMetaEnv {
  VITE_BASE_PATH: string;
  VITE_API_BASE: string;
  VITE_ANALYTICS: "true" | "false";
}
```

## 三、多环境构建命令

### 1.配置 package.json 脚本 ‌

通过 `--mode` 参数指定环境模式：

```json
"scripts": {
  "dev": "vitepress dev docs --mode development",
  "build:staging": "vitepress build docs --mode staging",
  "build:prod": "vitepress build docs --mode production",
  "preview:staging": "vitepress preview docs --mode staging"
}
```

### 2.‌ 运行示例 ‌

```bash
# 开发环境（自动加载 .env.development）
npm run dev

# 测试环境构建（加载 .env.staging）
npm run build:staging

# 生产环境构建（加载 .env.production）
npm run build:prod
```

## 四、环境变量优先级说明

| 变量来源            | 优先级 | 适用场景               |
| :------------------ | :----- | :--------------------- |
| 命令行参数 `--mode` | 最高   | 显式指定环境类型       |
| `.env.[mode].local` | 高     | 本地覆盖配置（不提交） |
| `.env.[mode] `      | 中     | 团队共享环境配置       |
| `.env.local  `      | 低     | 全局本地覆盖           |
| `.env    `          | 最低   | 基础默认配置           |

## 五、部署验证技巧

### 查看当前生效变量 ‌

在文档组件中添加调试代码：

```html
<script setup>
  console.log('当前环境变量:', import.meta.env)
</script>
```

### ‌GitHub Actions 多环境部署 ‌

在工作流中通过环境参数触发构建：

```yaml
jobs:
  deploy:
    steps:
      - name: Build Staging
        if: github.ref == 'refs/heads/staging'
        run: npm run build:staging
```

> 该方案支持开发、测试、生产环境的无缝切换，通过环境变量隔离配置差异，符合 Vite 官方推荐实践 35。
