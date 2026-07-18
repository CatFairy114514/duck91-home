# 91Duck先森の小窝

一个无需构建工具的纯静态个人项目主页。直接用浏览器打开 `index.html` 即可预览，也可以部署到任何静态托管服务。

## 常用修改位置

所有站点文案、项目与联系入口都集中在 [site.config.js](./site.config.js)：

- 修改 `site.name`、`site.tagline` 与 `site.intro` 可以更新站点名称和首屏文案；
- 在 `projects` 中新增一条对象即可增加项目卡片；将 `visible` 设为 `false` 可临时隐藏项目；
- 为项目填写 `url`，并按需设置 `linkType: "external"` 或 `linkType: "internal"`；可选的 `ctaLabel` 可修改主按钮文案，`secondaryAction` 可新增第二个跳转入口（例如 GitHub 源码）；留空链接时页面会显示“链接待补充”；
- 为项目填写 `coverImage` 与 `coverAlt` 可使用自定义封面；为项目添加 `details` 对象可启用桌面端悬停详情与移动端“查看详情”展开，标题、规则、标签和按钮文案都集中在该项目条目中；
- 修改 `about` 内的头像字母、介绍与链接占位；
- 在 `contacts` 中填写 `url` 后，对应社交入口会自动变为可点击链接；空链接会显示“待补充”。

## 文件说明

- `index.html`：语义化页面结构；
- `style.css`：响应式布局、主题变量与轻量动效；
- `site.config.js`：可配置内容数据；
- `script.js`：项目渲染、主题切换和年份更新。

## 主题行为

首次访问会自动跟随系统的浅色或深色模式。点击右上角主题按钮后会保存手动选择；如需恢复跟随系统模式，可在浏览器站点数据中清除 `duck-home-theme`。

## Cloudflare 部署结构

将本项目部署为主域名首页，例如 `example.com`。每个项目再使用同一主域名下的独立入口：

- 推荐使用子域名：`game.example.com` 与 `pikpak.example.com`；此时在项目配置中填写完整地址，并将 `linkType` 设为 `"external"`；
- 或使用同域名路径：`example.com/game/` 与 `example.com/pikpak/`；此时填写 `/game/`、`/pikpak/`，并将 `linkType` 设为 `"internal"`。

主站只负责导航；项目应作为各自独立的 Cloudflare Pages 或 Workers 部署目标。填写上述最终入口后，项目卡片会自动启用“立即访问”。
