---
outline: deep
---

将本地项目上传到GitHub新仓库的详细步骤：

# 步骤 1：创建 GitHub 仓库
1. 登录 GitHub
2. 点击右上角 ➕ > New repository
3. 填写仓库名称（Repository name）
4. 选择公开/私有（Public/Private）
5. **不要勾选** "Initialize this repository with a README"


# 步骤 2：初始化本地仓库
```bash
# 进入项目根目录
cd your-project-path

# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交代码（建议使用明确描述）
git commit -m "Initial commit"
```
# 步骤 3：关联远程仓库
```bash
# 复制GitHub仓库的HTTPS/SSH地址（推荐使用SSH）
git remote add origin git@github.com:your-username/repo-name.git
```

# 步骤 4：推送代码
```bash
# 首次推送需指定上游分支
git push -u origin main

# 后续推送只需
git push
```

# 常用补充操作
```bash
# 查看远程仓库关联状态
git remote -v

# 查看本地分支状态
git status

# 忽略指定文件（需创建.gitignore）
echo "node_modules/" >> .gitignore
```
# 常见问题排查
1. 权限拒绝：检查SSH密钥是否已添加到GitHub账户
2. 文件冲突：先执行git pull origin main合并远程修改
3. 忽略文件失效：确保.gitignore文件在项目根目录
> 💡 提示：如果使用HTTPS方式首次推送需输入GitHub账号密码，建议配置[SSH密钥](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)提升安全性。