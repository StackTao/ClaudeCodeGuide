## v1.x 系列（1.0.56 – 1.0.0，较旧）

### 1.0.56

**改进**
- Windows：在支持终端 VT 模式的 Node.js 版本上启用了 shift+tab 用于模式切换

**修复**
- 修复了 WSL IDE 检测的若干问题
- 修复了一个导致对 `.aws` 目录的 `awsRefreshHelper` 更改未被识别的问题

### 1.0.55

**新功能**
- SDK：新增了捕获错误日志的能力
- 新增 `--system-prompt-file` 选项，用于在 print 模式下覆盖系统提示词

**改进**
- 明确了 Opus 4 和 Sonnet 4 模型的知识截止日期

**修复**
- Windows：修复了 Ctrl+Z 崩溃问题

### 1.0.54

**新功能**
- Hooks：新增了 `UserPromptSubmit` hook，并将当前工作目录加入 hook 输入
- 自定义斜杠命令：在 frontmatter 中新增了 `argument-hint`

**改进**
- Shell：切换为内存中的 shell 快照，以修复与文件相关的错误

**修复**
- Windows：OAuth 现使用端口 45454，并正确构造浏览器 URL
- Windows：模式切换现使用 alt + m，且 plan 模式可正确渲染

### 1.0.53

**新功能**
- 新增 AWS 令牌刷新的辅助脚本设置：`awsAuthRefresh`（用于前台操作，如 `aws sso login`）和 `awsCredentialExport`（用于后台操作，返回类似 STS 的响应）。

**改进**
- 将 @-mention 文件截断从 100 行更新为 2000 行

### 1.0.52

**新功能**
- 新增了对 MCP server instructions 的支持

### 1.0.51

**新功能**
- 新增了对原生 Windows 的支持（需要 Git for Windows）
- 新增了通过环境变量 `AWS_BEARER_TOKEN_BEDROCK` 使用 Bedrock API 密钥的支持

**改进**
- 设置：`/doctor` 现在可以帮助你识别并修复无效的设置文件
- `--append-system-prompt` 现在可以在交互模式下使用，而不仅限于 `--print`/`-p`。
- 将 auto-compact 警告阈值从 60% 提高到 80%
- OTEL 资源现在包含 `os.type`、`os.version`、`host.arch` 和 `wsl.version`（如果运行在 Windows Subsystem for Linux 上）

**修复**
- 修复了处理含空格的用户目录在 shell 快照中的问题
- 自定义斜杠命令：修复了子目录中的用户级命令
- Plan 模式：修复了来自子任务的被拒绝 plan 会被丢弃的问题

### 1.0.48

**新功能**
- 新增了对 MCP server 配置中展开变量的支持
- Hooks：新增了 `PreCompact` hook
- Vim 模式：新增了 c、f/F、t/T

**改进**
- 基于命令输出的最后 5 行，为 Bash 工具新增了进度消息
- 将 shell 快照从 `/tmp` 移动到 `~/.claude`，以使 Bash 工具调用更可靠
- 改进了 Claude Code 在 WSL 中运行时的 IDE 扩展路径处理

**修复**
- 修复了 v1.0.45 中应用有时会在启动时冻结的 bug

### 1.0.45

**改进**
- 重新设计了搜索（Grep）工具，新增了工具输入参数和功能
- 将 prompt 输入撤销改为 Ctrl+\_，以避免破坏现有的 Ctrl+U 行为，与 zsh 的撤销快捷键保持一致
- 自定义斜杠命令：恢复了基于子目录的命令名命名空间。例如，`.claude/commands/frontend/component.md` 现在是 `/frontend:component`，而非 `/component`。

**修复**
- 禁用了 notebook 文件的 IDE diff，修复了 "Timeout waiting after 1000ms" 错误
- 通过强制原子写入，修复了配置文件损坏问题
- Stop Hooks：修复了 `/clear` 之后的 transcript 路径，并修复了循环以工具调用结束时的触发问题

### 1.0.44

**新功能**
- 新增 `/export` 命令，可让你快速导出对话以供分享
- MCP：现支持 `resource_link` 工具结果
- MCP：工具注解和工具标题现在会显示在 `/mcp` 视图中

**改进**
- 将 Ctrl+Z 更改为挂起 Claude Code。通过运行 `fg` 恢复。prompt 输入撤销现在是 Ctrl+U。

### 1.0.43

**改进**
- Hooks：新增了 EPIPE 系统错误处理

**修复**
- 修复了主题选择器保存过于频繁的 bug

### 1.0.42

**新功能**
- 为 `/add-dir` 命令新增了波浪号（`~`）展开支持

### 1.0.41

**新功能**
- Hooks：为每个命令启用了可选的超时配置
- Hooks：在 hook 输入中新增了 `hook_event_name`
- 在 `tool_decision` 事件中新增了 Bash 工具的新工具参数 JSON

**改进**
- Hooks：将 Stop hook 的触发拆分为 Stop 和 SubagentStop

**修复**
- 修复了 MCP 工具在工具列表中显示两次的 bug

### 1.0.40

**修复**
- 修复了在设置了 `NODE_EXTRA_CA_CERTS` 时导致出现 `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` API 连接错误的 bug

### 1.0.39

**新功能**
- OpenTelemetry 日志中新增了 Active Time 指标

### 1.0.38

**新功能**
- 发布了 hooks。特别感谢社区在 https://github.com/anthropics/claude-code/issues/712 中提供的意见。文档：https://code.claude.com/docs/en/hooks

### 1.0.37

**改进**
- 移除了通过 `ANTHROPIC_AUTH_TOKEN` 或 `apiKeyHelper` 设置 `Proxy-Authorization` 头的能力

### 1.0.36

**改进**
- Web 搜索现在会将今天的日期纳入上下文

**修复**
- 修复了 stdio MCP server 在退出时未正确终止的 bug

### 1.0.35

**新功能**
- 新增了对 MCP OAuth Authorization Server discovery 的支持

### 1.0.34

**修复**
- 修复了导致出现 `MaxListenersExceededWarning` 消息的内存泄漏

### 1.0.33

**新功能**
- 新增了 prompt 输入撤销功能（Ctrl+Z 和 vim 的 'u' 命令）

**改进**
- 改进了带 session ID 支持的日志功能
- 对 plan 模式的改进

### 1.0.32

**新功能**
- 新增了 `forceLoginMethod` 设置，用于绕过登录选择界面

**改进**
- 更新了 litellm 的 loopback 配置

### 1.0.31

**修复**
- 修复了当文件包含无效 JSON 时 `~/.claude.json` 会被重置的 bug

### 1.0.30

**新功能**
- 自定义斜杠命令：运行 bash 输出、@-mention 文件、使用 thinking 关键字启用 thinking

**改进**
- 改进了文件路径自动补全的文件名匹配
- 在 Ctrl-r 模式中新增了时间戳，并修复了 Ctrl-c 处理
- 增强了 jq 对带管道和 select 的复杂过滤器的正则支持

### 1.0.29

**改进**
- 改进了光标导航和渲染中的 CJK 字符支持

### 1.0.28

**新功能**
- 在配置目录中新增了 `XDG_CONFIG_HOME` 支持
- OpenTelemetry 日志中新增了新属性（`terminal.type`、`language`）

**改进**
- 内存使用的性能优化
- 上传前调整图像大小，以防止 API 大小限制错误

**修复**
- 斜杠命令：修复了历史记录导航期间的选择器显示

### 1.0.27

**新功能**
- 现已支持 Streamable HTTP MCP server
- 远程 MCP server（SSE 和 HTTP）现在支持 OAuth
- MCP 资源现在可以被 @-mention
- 新增 `/resume` 斜杠命令，可在 Claude Code 内切换对话

### 1.0.25

**改进**
- 斜杠命令：将 "project" 和 "user" 前缀移至描述中
- 斜杠命令：改进了命令发现的可靠性
- 改进了对 Ghostty 的支持
- 改进了 web 搜索的可靠性

### 1.0.24

**改进**
- 改进了 `/mcp` 输出

**修复**
- 修复了设置数组被覆盖而非合并的 bug

### 1.0.23

**新功能**
- 发布了 TypeScript SDK：导入 `@anthropic-ai/claude-code` 即可开始使用
- 发布了 Python SDK：`pip install claude-code-sdk` 即可开始使用

### 1.0.22

**改进**
- SDK：将 `total_cost` 重命名为 `total_cost_usd`

### 1.0.21

**修复**
- 改进了对使用 tab 缩进的文件的编辑
- 修复了 `tool_use` 无匹配 `tool_result` 的错误
- 修复了 stdio MCP server 进程在退出 Claude Code 后仍残留的 bug

### 1.0.18

**新功能**
- 新增了 `--add-dir` CLI 参数，用于指定额外的工作目录
- 新增了无需 `-p` 标志的流式输入支持
- 新增了 `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` 环境变量，用于为 bash 命令冻结工作目录
- 新增了详细的 MCP server 工具显示（`/mcp`）
- 为 MCP SSE 连接断开时新增了自动重连

**改进**
- 改进了启动性能和会话存储性能
- MCP 认证和权限改进

**修复**
- 修复了对话框出现时粘贴内容丢失的问题

### 1.0.17

**新功能**
- 我们现在会在 `-p` 模式下发出来自子任务的消息（查找 `parent_tool_use_id` 属性）

**改进**
- MCP server 列表 UI 改进
- 将 Claude Code 进程标题更新为显示 "claude" 而非 "node"

**修复**
- 修复了快速多次调用 VS Code diff 工具时的崩溃

### 1.0.11

**新功能**
- Claude Code 现在也可以与 Claude Pro 订阅一起使用
- 新增 `/upgrade`，以更顺畅地切换到 Claude Max 计划

**改进**
- 改进了从 API 密钥和 Bedrock/Vertex/外部认证令牌进行认证的 UI
- 改进了 shell 配置错误处理
- 改进了 compaction 期间的待办列表处理

### 1.0.10

**新功能**
- 新增了 markdown 表格支持

**改进**
- 改进了流式性能

### 1.0.8

**新功能**
- 新增了对以非英语语言触发 thinking 的支持

**改进**
- 将默认 otel 间隔从 1s 提高到 5s
- 改进了 compacting UI

**修复**
- 修复了使用 `CLOUD_ML_REGION` 时 Vertex AI 区域回退问题
- 修复了 `MCP_TIMEOUT` 和 `MCP_TOOL_TIMEOUT` 未被遵守的边缘情况
- 修复了搜索工具不必要地请求权限的回归问题

### 1.0.7

**改进**
- 将 `/allowed-tools` 重命名为 `/permissions`
- 将 `allowedTools` 和 `ignorePatterns` 从 `.claude.json` 迁移到 `settings.json`
- 弃用了 `claude config` 命令，改为编辑 `settings.json`
- 改进了 `/install-github-app` 的错误处理
- Bug 修复、UI 打磨和工具可靠性改进

**修复**
- 修复了 `--dangerously-skip-permissions` 有时在 `--print` 模式下不起作用的 bug

### 1.0.6

**新功能**
- 在 @file 输入提示中新增了对符号链接的支持

**改进**
- 改进了对 tab 缩进文件的编辑可靠性
- 在所有地方都遵守 `CLAUDE_CONFIG_DIR`
- 减少了不必要的工具权限提示
- Bug 修复、UI 打磨和工具可靠性改进

### 1.0.4

**修复**
- 修复了 MCP 工具错误未被正确解析的 bug

### 1.0.1

**新功能**
- 新增了 `DISABLE_INTERLEAVED_THINKING`，让用户可以选择不使用交错式 thinking。

**改进**
- 改进了模型引用，以显示特定提供商的名称（Bedrock 显示 Sonnet 3.7，Console 显示 Sonnet 4）
- 更新了文档链接和 OAuth 流程说明

### 1.0.0

**新功能**
- Claude Code 现已正式发布（generally available）
- 推出 Sonnet 4 和 Opus 4 模型
