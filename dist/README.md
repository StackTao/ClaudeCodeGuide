# Claude Code Guide｜中文技巧与工具共建知识库

这是一个面向中文开发者的 Claude Code 共建知识库。

我们希望把大家在真实项目里使用 Claude Code 的经验沉淀下来：好用的命令、稳定的工作流、Prompt 写法、插件与 Skills、MCP 工具、GitHub/CI 协作方式、踩坑记录和安全边界。它不是某个人的一次性教程，而是一个可以持续更新的社区手册。

欢迎提交你自己的：

- Claude Code 使用技巧和任务拆解方法。
- 命令、Slash command、Goal、Hooks、MCP 的真实案例。
- 好用的插件、Skills、Superpowers、工作流模板。
- GitHub PR、Review、CI、Issue 修复等团队协作经验。
- 失败案例、成本控制、权限安全和上下文管理建议。

站点是纯静态实现，方便部署、搜索、长期维护，也方便把 Markdown 后续转换为 GitBook、PDF 或其他文档形态。

GitHub 仓库：

```text
https://github.com/StackTao/ClaudeCodeGuide.git
```

线上站点：

```text
https://stacktao.github.io/ClaudeCodeGuide/
```

## 打开网站

安装依赖不是必须的；这个站点只依赖 Node.js 内置模块。

启动本地服务：

```bash
npm run dev
```

如果你在 Windows PowerShell 里遇到 `npm.ps1` 执行策略报错，用：

```powershell
npm.cmd run dev
```

然后访问：

```text
http://127.0.0.1:4173/
```

## 更新内容

内容已经按主题拆成多个章节文件。修改对应目录下的 Markdown：

- `content/guide/`：主指南
- `content/commands/`：命令、Hooks、MCP 和案例
- `content/skills/`：Skills、插件和增强工作流
- `content/examples/`：可复制模板
- `content/sources/`：来源索引和可信度说明

章节文件使用数字前缀排序，例如 `00-overview.md`、`01-intro.md`。新增章节时请沿用这种命名方式，并尽量保留已有标题，避免旧链接失效。

然后重新生成网站数据：

```bash
npm run build
```

PowerShell 执行策略报错时用：

```powershell
npm.cmd run build
```

刷新页面即可看到最新内容。

如果正在运行 `npm run dev`，服务启动时会自动执行一次构建。

## 项目结构

```text
content/                 Markdown 原始文档，按主题目录拆分
  guide/                 主指南章节
  commands/              命令和案例章节
  skills/                Skills、插件和工作流章节
  examples/              模板章节
  sources/               来源索引章节
src/                     静态站前端源码
scripts/                 构建脚本和本地服务
dist/                    构建输出，GitHub Pages 发布此目录
.github/workflows/       GitHub Pages 自动部署
```

一般只需要改 `content/` 和 `src/`。不要手动修改 `dist/` 或 `dist/docs-data.js`，它们由 `npm run build` 生成。

## 如何参与共建

最推荐的贡献方式是通过页面底部的 GitHub 在线反馈提交 Issue，说明你想补充或修正的章节。

如果你想直接改文档：

1. 修改 `content/` 对应主题目录里的 Markdown。
2. 运行 `npm.cmd run build`。
3. 运行 `npm.cmd run check`。
4. 提交 PR 或推送到仓库。

提交内容时请尽量带上来源、适用场景和限制条件。官方事实优先引用官方文档；社区技巧请标明来自 GitHub、X、LinuxDO、Reddit、博客或个人实践。

## GitHub 实时更新与部署

仓库内置了 GitHub Pages 自动部署工作流：

```text
.github/workflows/pages.yml
```

每次推送到 `main` 分支时，GitHub Actions 会执行：

```bash
npm run build
```

然后把当前静态站部署到 GitHub Pages。

第一次使用时，需要在 GitHub 仓库中打开：

```text
Settings > Pages > Build and deployment > Source > GitHub Actions
```

启用后可以在这里查看部署状态：

```text
https://github.com/StackTao/ClaudeCodeGuide/actions/workflows/pages.yml
```

站点底部的反馈入口会生成 GitHub Issue 草稿，并尝试读取当前章节相关 Issue。若 API 被限流或网络不可用，Issue 草稿链接仍然可用。

## 反馈和修改请求

页面底部支持：

- 复制修改请求：生成可粘贴到 GitHub Issue 的模板。
- 打开 Issue 草稿：默认提交到 `StackTao/ClaudeCodeGuide`。
- 查看相关反馈：跳转到当前章节的 GitHub Issue 搜索。
