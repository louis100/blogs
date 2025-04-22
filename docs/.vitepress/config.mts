import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blogs/",
  title: "天池月下",
  description: "个人随笔",
  head: [
    ["meta", { name: "keywords", content: "技术博客,前、后端开发" }],
    //
    // ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "git", link: "/git/index" },
      { text: "vitepress", link: "/vitepress/index" },
    ],

    sidebar: {
      "/Examples/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
      "/git/": [
        {
          text: "git",
          items: [
            { text: "git项目初始化", link: "/git/ProjectInit" },
            {
              text: "本地项目同时关联 GitHub 和 Gitee 双平台",
              link: "/git/SyncToGiteeAndGithub",
            },
          ],
        },
      ],
      "/vitepress/": [
        {
          text: "vitepress",
          items: [
            { text: "vitepress", link: "/vitepress" },            
          ],
        },
      ],
    },

    // socialLinks: [
    //   { icon: "github", link: "https://louis100.github.io/blogs/" },
    // ],
  },
});
