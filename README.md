# blogs

## 介绍
个人随笔

[访问地址](https://louis100.github.io/blogs)


## 命令

```sh
# 本地启动
pnpm run docs:dev

# 本地启动
pnpm run docs:preview

# 打包
pnpm run deploy

# 推送到两个平台
git push github master && git push gitee master
# 等同于 git push <远程仓库名> <本地分支名>:<远程分支名>
git push github master:master && git push gitee master:master
```


## 工作流
<!-- docs\.vitepress\config.mts -->
```ts
export default defineConfig({
  base: "/blogs/",
  // 构建产物输出到根目录的 dist 文件夹
  outDir: '../dist', 
  // ....
});
```

<!-- .github/workflows/deploy.yml -->
```yaml
name: Deploy

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm ci
      - run: npm run docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist  # 或 ./dist（根据实际构建目录修改）
```

备份
```yml
name: Deploy

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Build Docs
        run: npm run docs:build

      - name: Deploy to GH Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist

```