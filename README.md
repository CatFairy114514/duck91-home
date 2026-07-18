# 91Duck先森の小窝

一个无需构建工具的纯静态个人项目主页。直接用浏览器打开 `index.html` 即可预览，也可以部署到任何静态托管服务。

## 常用修改位置

所有站点文案、项目与联系入口都集中在 [site.config.js](./site.config.js)：

- 修改 `site.name`、`site.tagline` 与 `site.intro` 可以更新站点名称和首屏文案；
- 在 `projects` 中新增一条对象即可增加项目卡片；将 `visible` 设为 `false` 可临时隐藏项目；
- 为项目填写 `url`，并按需设置 `linkType: "external"` 或 `linkType: "internal"`；可选的 `ctaLabel` 可修改主按钮文案，`secondaryAction` 可新增第二个跳转入口（例如 GitHub 源码）；留空链接时页面会显示“链接待补充”；
- 为项目填写 `coverImage` 与 `coverAlt` 可使用自定义封面；为项目添加 `details` 对象可启用桌面端悬停详情与移动端“查看详情”展开，标题、规则、标签和按钮文案都集中在该项目条目中；
- 在 `about` 中修改个人介绍、头像文字与相关链接；
- 在 `contacts` 中填写 GitHub、邮件或其他联系方式；空链接会显示“待补充”。

## 文件说明

- `index.html`：语义化页面结构；
- `style.css`：响应式布局、主题变量与轻量动效；
- `site.config.js`：可配置内容数据；
- `script.js`：项目渲染、主题切换和年份更新。
- `assets/og.png`：主站分享卡片；如需替换，需同步更新 `index.html` 中的 Open Graph 与 Twitter 图片地址、尺寸和替代文字。

## 缓存与发布

- `site.config.js` 是运行时配置：Pages 的 [`_headers`](./_headers) 将它设为 `Cache-Control: no-cache, must-revalidate`，并使用 `CDN-Cache-Control: no-store`，防止移动端长期读取固定文件名的旧配置。
- 首页的 `site-build` 元数据是构建版本号；`script.js` 会使用它以 `site.config.js?v=版本号` 的地址加载配置。每次发布涉及配置、样式、脚本或图片的更新时，将 `20260719-01` 统一替换为新的版本号（例如 `20260720-01`）。
- `style.css`、`script.js` 和 `assets/*` 使用一年期 `immutable` 缓存，但页面引用带有同一个 `v` 参数；更新版本号即可请求新资源，不会被旧缓存拦截。
- Cloudflare 控制台仍需将 **Caching → Configuration → Browser Cache TTL** 设为 **Respect Existing Headers**，并确认没有 Cache Rule 对 `/site.config.js`、`/site.config.json` 或 `/config/*` 设置“Cache Everything”或固定 Browser Cache TTL。该设置优先级高于仓库中的响应头。
- 本项目当前没有注册 Service Worker。以后若增加它，应对配置请求使用 Network First，缓存名包含构建版本号，并在 `activate` 中删除旧缓存。

## 主题行为

首次访问会自动跟随系统的浅色或深色模式。点击右上角主题按钮后会保存手动选择；如需恢复跟随系统模式，可在浏览器站点数据中清除 `duck-home-theme`。

## Cloudflare 部署结构

将本项目部署为主域名首页，例如 `example.com`。每个项目再使用同一主域名下的独立入口：

- 推荐使用子域名：`game.example.com` 与 `pikpak.example.com`；此时在项目配置中填写完整地址，并将 `linkType` 设为 `"external"`；
- 或使用同域名路径：`example.com/game/` 与 `example.com/pikpak/`；此时填写 `/game/`、`/pikpak/`，并将 `linkType` 设为 `"internal"`。

主站只负责导航；项目应作为各自独立的 Cloudflare Pages 或 Workers 部署目标。填写上述最终入口后，项目卡片会自动启用“立即访问”。
