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
      name: "九头蛇游戏",
      description:
        "砍掉末端蛇头，面对会随次数复制分支的九头蛇。用递归规则破解无限再生的诅咒。",
      tags: ["逻辑游戏", "递归结构", "数学游戏", "Hydra"],
      status: "已上线",
      statusTone: "cool",
      url: "https://game.duck91.com",
      linkType: "external", // 外部/子域名用 "external"；同域名子路径用 "internal"
      ctaLabel: "进入游戏",
      coverImage: "./assets/game-cover.png",
      coverAlt: "雷雨中的九头蛇与持剑冒险者对峙的网页小游戏封面",
      visual: "game",
      visualLabel: "九头蛇游戏的封面图",
      // 配置 details 后，项目卡片会获得桌面端悬停详情与移动端手动展开能力。
      details: {
        title: "九头蛇游戏",
        subtitle: "THE HYDRA GAME",
        tagline: "每一次挥剑，都让它变得更强",
        helper: "挑战无限再生的古老诅咒",
        description:
          "一场基于树形结构与递归规则的逻辑小游戏。玩家每次只能砍掉末端蛇头，而九头蛇会根据当前砍头次数复制新的分支。看似不断增长的九头蛇，最终能否被完全消灭？",
        listLabel: "游戏规则摘要",
        rules: [
          "每次只能砍掉最末端的一颗头",
          "被砍蛇头的祖父节点会复制对应分支",
          "第几次砍头，就额外复制多少份",
          "直接连接身体的蛇头被砍后不会再生",
          "游戏目标是消灭全部蛇头",
        ],
        tags: ["逻辑游戏", "递归结构", "数学游戏", "Hydra"],
        expandLabel: "查看详情",
        collapseLabel: "收起详情",
      },
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
      ctaLabel: "打开分析器",
      visual: "analyzer",
      visualLabel: "PikPak 文件大小分析器的封面占位图",
      details: {
        title: "PikPak 文件大小分析器",
        subtitle: "PIKPAK SIZE ANALYZER",
        tagline: "让文件占用一目了然",
        helper: "从体积分布中定位整理方向",
        description:
          "一个用于整理与分析文件体积的实用工具演示，帮助更快识别占用空间较大的内容与分布情况，让清理与归档更有依据。",
        listLabel: "功能摘要",
        rules: [
          "快速定位占用空间较大的文件与目录",
          "从体积分布中理解当前空间使用情况",
          "结合文件类型辅助判断整理方向",
          "适合在归档或清理前进行一次快速盘点",
        ],
        tags: ["实用工具", "文件分析", "PikPak", "演示站"],
        expandLabel: "查看详情",
        collapseLabel: "收起详情",
      },
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
