# Vitepress 到 GitHub Pages 的详细步骤

## 一、项目配置

### 修改 config.mts 配置

```typescript
{
	// 保持现有 base 配置不变（需与仓库名匹配）
	base: "/blogs/", 
	// 启用构建输出目录（取消注释）
	outDir: '../dist',
}
```
 
### package.json 添加部署脚本

```json
{
  "scripts": {
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

## 二、GitHub 仓库准备

1. 创建名为 blogs 的公开仓库
2. 将代码推送到 main/master 分支

## 三、GitHub Pages 设置

1. 进入仓库 Settings -> Pages
2. 按以下配置：
	* Branch: gh-pages（需先创建）
	* Folder: / (root)
3. 点击 Save

## 四、自动化部署（GitHub Actions）

1. 创建 .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main, master]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 五、首次部署

1. 提交并推送代码

```bash
git add .
git commit -m "init"
git push origin main
```

## 验证部署

1. 访问 https://<你的GitHub用户名>.github.io/blogs/
2. 构建状态可在仓库 Actions 标签页查看

## 注意事项

1. 确保仓库名称与 base 配置匹配
2. 若使用自定义域名，需额外配置 CNAME 文件
3. 构建时间约 1-2 分钟，首次访问可能需要刷新缓存