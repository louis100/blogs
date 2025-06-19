import { defineConfig, loadEnv } from "vitepress";

/**
 * Vite 的环境变量加载规则：
.env.[mode] 文件加载优先级：取决于 NODE_ENV + MODE
--mode 参数作用：仅设置 process.env.MODE，不会自动改变 NODE_ENV
构建命令默认行为：vitepress build 会强制设置 NODE_ENV=production
process.env.NODE_ENV === 'production'
 */
console.log("MODE:", process.env.MODE);
console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log('import: VITE_APP_TITLE', import.meta.env.VITE_APP_TITLE)

const env = loadEnv("", process?.cwd?.(), "VITE_"); // 显式加载
console.log("VITE_BASE_PATH:", env);

console.log("MODE:", process.env.MODE);
console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log('import: VITE_APP_TITLE', import.meta.env.VITE_APP_TITLE)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: env?.VITE_BASE_PATH, // 优先使用环境变量
  // 构建产物输出到根目录的 dist 文件夹
  outDir: env?.VITE_OUT_DIR, //"../dist",
  title: "天池月下",
  description: "个人随笔",
  lastUpdated: true,
  head: [
    ["meta", { name: "keywords", content: "技术博客,前、后端开发" }],
    //
    // ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    search: { provider: "local" },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "examples", link: "/examples/markdown-examples" },
      // { text: "git", link: "/git/" },
      {
        text: "git",
        items: [
          { text: "简介", link: "/git/" },
          { text: "git项目初始化", link: "/git/ProjectInit" },
          {
            text: "项目同时关联 GitHub 和 Gitee",
            link: "/git/SyncToGiteeAndGithub",
          },
          { text: "branch is behind", link: "/git/q_branch_is_behind" },
          { text: "vitepress 部署到 GitHub", link: "/git/vitepressToGithub" },
        ],
      },
      { text: "vitepress", link: "/vitepress/" },
      { text: "部署", link: "/部署/前后端 nginx 部署" },
      { text: "md", link: "/md/" },
    ],

    sidebar: {
      "/examples/": [
        {
          text: "examples",
          items: [
            { text: "Markdown Examples", link: "/examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/examples/api-examples" },
          ],
        },
      ],
      "/git/": [
        {
          text: "git",
          items: [
            { text: "简介", link: "/git/" },
            { text: "git项目初始化", link: "/git/ProjectInit" },
            {
              text: "项目同时关联 GitHub 和 Gitee",
              link: "/git/SyncToGiteeAndGithub",
            },
            { text: "branch is behind", link: "/git/q_branch_is_behind" },
            { text: "vitepress 部署到 GitHub", link: "/git/vitepressToGithub" },
          ],
        },
      ],
      "/vitepress/": [
        {
          text: "vitepress",
          items: [
            { text: "vitepress", link: "/vitepress/index" },
            { text: "env_set", link: "/vitepress/env_set" },
          ],
        },
      ],
      "/部署/": [
        {
          text: "部署",
          items: [{ text: "部署", link: "/部署/前后端 nginx 部署" }],
        },
      ],
      "/md/": [
        {
          text: "md",
          items: [{ text: "md", link: "/md/index" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://louis100.github.io/blogs/" },
    ],
  },
});
