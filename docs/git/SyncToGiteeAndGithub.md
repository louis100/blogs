# 🔄 GitHub 和 Gitee 双远程仓库同步操作流程

## 🔑 核心配置方法

### 步骤 1：添加双远程仓库别名

```bash
# 添加 GitHub 远程仓库（建议用 github 作为别名）
git remote add github git@github.com:用户名/仓库名.git

# 添加 Gitee 远程仓库（建议用 gitee 作为别名）
git remote add gitee git@gitee.com:用户名/仓库名.git
```

### 步骤 2：验证远程关联状态

```bash
git remote -v
# 应显示两个远程仓库地址：
# github  git@github.com:xxx/xxx.git (fetch)
# github  git@github.com:xxx/xxx.git (push)
# gitee   git@gitee.com:xxx/xxx.git (fetch)
# gitee   git@gitee.com:xxx/xxx.git (push)
```
## 🚀 推送代码到双平台

### 方式一：分别推送

```bash
# 推送到 GitHub
git push github master

# 推送到 Gitee
git push gitee master
```

### 方式二：单命令同步推送（推荐）

```bash
# 同时推送两个平台
git push github master && git push gitee master

todo
# 可创建快捷别名
alias gitpushall='git push github main && git push gitee main'
# 创建本地组合推送别名
git config --local alias.pushall '!git push github --all && git push gitee --all'
# 使用方法


# 创建全局组合推送别名
# 设置组合推送别名
git config --global alias.pushall '!git push github --all && git push gitee --all'
# 使用方法
git pushall  # 同时推送到所有配置的远程仓库
```

## ⚙️ 配置文件法（可选）

直接修改 .git/config 文件：

```yml
[remote "github"]
    url = git@github.com:用户名/仓库名.git
    fetch = +refs/heads/*:refs/remotes/github/*
[remote "gitee"]
    url = git@gitee.com:用户名/仓库名.git
    fetch = +refs/heads/*:refs/remotes/gitee/*
```

## ⚙️ 同步策略配置
### 方案 A：双向同步（推荐）
```bash
# 拉取时合并所有远程最新代码
git pull github main
git pull gitee main

#  推送前先合并差异
git pushall
```

### 方案 B：单向镜像（适合代码托管迁移）

```bash
# 强制同步仓库（慎用）
git push --mirror gitee  # 将 github 代码完全覆盖到 gitee
```

## 🛠️ 自动化同步配置（使用 GitHub Actions）

创建 .github/workflows/sync.yml：

```yaml
name: Sync to Gitee
on: [push]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Mirror to Gitee
        run: |
          git remote add gitee git@gitee.com:user/repo.git
          git push gitee HEAD:main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_SSH_KEY }}
```         

## 📝 同步冲突解决方案

当不同仓库出现差异时：

```bash
# 查看所有远程分支状态
git remote update --prune

# 对比差异
git diff github/main gitee/main

# 手动合并（示例保留 github 版本）
git checkout -b temp-merge
git merge github/main
git merge gitee/main
# 解决冲突后...
git pushall
```

## 🔧 配置建议表
| 配置项                | 推荐值  | 作用             |
| --------------------- | ------- | ---------------- |
| push.default          | current | 推送当前分支     |
| branch.autoSetupMerge | always  | 自动建立分支追踪 |
| pull.rebase           | true    | 拉取时使用变基   |

## ⚠️ 注意事项
1. SSH Key 配置：为每个平台配置不同的 SSH Key
2. 分支保护：主分支应禁用强制推送 (git push -f)
3. 定时同步：建议每天至少执行一次 git fetch --all
4. 分支一致性：建议保持双平台的分支名称一致（如都用 main）
5. 首次推送冲突：若远端仓库已初始化，使用 -f 参数强制推送（慎用）
6. 同步更新：拉取时需分别执行 git pull github main 和 git pull gitee main
7. 仓库差异处理：
```bash
# 列出所有仓库差异
git remote -v update
git diff github/main gitee/main
```


## 🌐 多平台同步架构图

```
本地仓库
├─ 推送 → GitHub
└─ 推送 → Gitee
     ↖ 定时自动同步（通过 CI/CD）
```

## 💡 扩展技巧：镜像同步

若需自动同步双平台，可在 Gitee 仓库设置中开启「GitHub 镜像同步」功能（需 OAuth 授权）

>📌 通过以上配置，您可在享受 GitHub 国际生态的同时，利用 Gitee 的国内访问速度优势。