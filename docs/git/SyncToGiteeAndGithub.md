如何实现本地项目同时关联 GitHub 和 Gitee 双平台？

# 🔑 核心配置方法
步骤 1：添加双远程仓库别名
```bash
# 添加 GitHub 远程仓库（建议用 github 作为别名）
git remote add github git@github.com:用户名/仓库名.git

# 添加 Gitee 远程仓库（建议用 gitee 作为别名）
git remote add gitee git@gitee.com:用户名/仓库名.git
```
步骤 2：验证远程关联状态
```bash
git remote -v
# 应显示两个远程仓库地址：
# github  git@github.com:xxx/xxx.git (fetch)
# github  git@github.com:xxx/xxx.git (push)
# gitee   git@gitee.com:xxx/xxx.git (fetch)
# gitee   git@gitee.com:xxx/xxx.git (push)
```
# 🚀 推送代码到双平台
## 方式一：分别推送
```bash
# 推送到 GitHub
git push github master

# 推送到 Gitee
git push gitee master
```
## 方式二：单命令同步推送（推荐）
```bash
# 同时推送两个平台
git push github master && git push gitee master

# 可创建快捷别名（添加到 .bashrc/zshrc）
alias gitpushall='git push github main && git push gitee main'
```
# ⚙️ 配置文件法（可选）
直接修改 .git/config 文件：

```ini
[remote "github"]
    url = git@github.com:用户名/仓库名.git
    fetch = +refs/heads/*:refs/remotes/github/*
[remote "gitee"]
    url = git@gitee.com:用户名/仓库名.git
    fetch = +refs/heads/*:refs/remotes/gitee/*
```

# 📌 注意事项
1. SSH 密钥配置：需在两个平台账户设置中添加同一 SSH 公钥
2. 分支一致性：建议保持双平台的分支名称一致（如都用 main）
3. 首次推送冲突：若远端仓库已初始化，使用 -f 参数强制推送（慎用）
4. 同步更新：拉取时需分别执行 git pull github main 和 git pull gitee main

# 💡 扩展技巧：镜像同步
若需自动同步双平台，可在 Gitee 仓库设置中开启「GitHub 镜像同步」功能（需 OAuth 授权）

>📌 通过以上配置，您可在享受 GitHub 国际生态的同时，利用 Gitee 的国内访问速度优势。