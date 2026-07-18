/**
 * 站点内容配置
 * 新增项目：在 projects 数组中添加一条对象即可。
 * 隐藏项目：将 visible 设为 false。
 */
export const siteConfig = {
  site: {
    name: "91Duck先森の小窝",
    eyebrow: "PERSONAL PROJECT HUB",
    tagline: "收录一些实用工具、实验性作品与小游戏。",
    intro:
      "一个持续生长的个人项目主站。每个独立作品都拥有清晰入口，也在这里留下简洁、可靠的第一印象。",
  },

  projects: [
    {
      visible: true,
      name: "网页小游戏",
      description:
        "面向浏览器的轻量小游戏合集。规则直观、打开即玩，适合把零碎时间变成一点小小的乐趣。",
      tags: ["小游戏", "Web", "实验作品"],
      status: "已上线",
      statusTone: "cool",
      url: "https://game.duck91.com",
      linkType: "external", // 外部/子域名用 "external"；同域名子路径用 "internal"
      coverImage: "./assets/game-cover.png",
      coverAlt: "雷雨中的九头蛇与持剑冒险者对峙的网页小游戏封面",
      visual: "game",
      visualLabel: "网页小游戏的封面占位图",
    },
    {
      visible: true,
      name: "PikPak 文件大小分析器",
      description:
        "用于整理与分析文件体积的实用工具演示，帮助更快识别占用空间较大的内容与分布情况。",
      tags: ["实用工具", "文件分析", "PikPak"],
      status: "已上线",
      statusTone: "cool",
      url: "https://pikpak.duck91.com",
      linkType: "external", // 外部/子域名用 "external"；同域名子路径用 "internal"
      visual: "analyzer",
      visualLabel: "PikPak 文件大小分析器的封面占位图",
    },
  ],

  about: {
    avatarText: "D",
    title: "关于这里",
    description:
      "这里预留给一段简短的个人介绍：可以写下你关注的方向、正在探索的领域，或这个项目站存在的原因。",
    links: [
      { label: "个人主页", url: "" },
      { label: "作品归档", url: "" },
    ],
  },

  contacts: [
    {
      label: "GitHub",
      hint: "代码与项目记录",
      url: "https://github.com/CatFairy114514",
    },
    {
      label: "邮箱",
      hint: "合作与交流",
      url: "", // 例如 "mailto:hello@example.com"
    },
    {
      label: "其他平台",
      hint: "待补充",
      url: "",
    },
  ],
};
