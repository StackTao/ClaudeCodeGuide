# Claude Code 中文实践文档站

这是一个纯静态文档站，把当前目录中的 Markdown 文档渲染成类似官方文档的阅读体验。

GitHub 仓库：

```text
https://github.com/StackTao/ClaudeCodeGuide.git
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

修改这些 Markdown 文件：

- `claude-code-guide.md`
- `commands-and-cases.md`
- `skills-and-plugins.md`
- `examples.md`
- `sources.md`

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

## 反馈和修改请求

页面底部支持：

- 保存本地评论：评论只保存在当前浏览器。
- 复制修改请求：生成可粘贴到 GitHub Issue 的模板。
- 打开 Issue 草稿：默认提交到 `StackTao/ClaudeCodeGuide`。
- 顶部 GitHub 状态条会读取默认分支最新 commit，方便判断是否有远端更新。
