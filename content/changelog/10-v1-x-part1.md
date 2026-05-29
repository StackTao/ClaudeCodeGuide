## v1.x 系列（1.0.57 – 1.0.126，较新）

### 1.0.126

**新功能**
- 为 Bedrock 和 Vertex 启用 `/context` 命令
- 为基于 HTTP 的 OpenTelemetry 导出器添加 mTLS 支持

### 1.0.124

**新功能**
- 将 `CLAUDE_BASH_NO_LOGIN` 环境变量设置为 1 或 true，可让 BashTool 跳过登录 shell

**修复**
- 修复 Bedrock 和 Vertex 环境变量将所有字符串都判定为真值的问题
- 修复 Bash 工具权限检查中的安全漏洞

**改进**
- 当权限被拒绝时，不再将允许的工具列表告知 Claude
- 改进了 VSCode 扩展处理大文件时的性能

### 1.0.123

**新功能**
- 添加了 SlashCommand 工具，使 Claude 能够调用你的斜杠命令。https://code.claude.com/docs/en/slash-commands#SlashCommand-tool

**修复**
- 修复了思考模式在 "don't think" 等否定短语上被触发的问题
- 修复了 token 流式传输期间渲染性能下降的问题
- 修复了在 headless 模式下恢复会话有时会不必要地启用思考的问题

**改进**
- Bash 权限规则现在在匹配时支持输出重定向（例如，`Bash(python:*)` 可匹配 `python script.py > output.txt`）
- 增强了 BashTool 环境快照日志记录
- 将 `--debug` 日志迁移到文件中，以便于追踪和过滤

### 1.0.120

**修复**
- 修复了输入时的延迟，尤其在大型提示词中较为明显
- 修复了通过移除 worktree 支持检查导致的 IDE 兼容性问题
- 修复了 Bash 工具权限检查可被前缀匹配绕过的安全漏洞

**改进**
- 改进了 VSCode 扩展的命令注册表和会话对话框的用户体验
- 增强了会话对话框的响应速度和视觉反馈

### 1.0.119

**新功能**
- 通过 headersHelper 配置支持 MCP 服务器的动态请求头

**修复**
- 修复了 Windows 上进入交互模式时进程在视觉上卡顿的问题
- 修复了思考模式在 headless 会话中不起作用的问题
- 修复了斜杠命令现在能正确更新允许的工具而非替换它们的问题

### 1.0.117

**新功能**
- 添加 Ctrl-R 历史搜索，可像 bash/zsh 一样调出之前的命令
- 在 acceptEdits 模式下将 `sed` 命令添加到自动允许的命令中
- 在 `/add-dir` 输出中添加权限管理提示

**修复**
- 修复了输入时的延迟，尤其在 Windows 上
- 修复了 Windows PATH 比较，使其对盘符不区分大小写

### 1.0.115

**新功能**
- 输入 `/t` 可在你的提示词中临时禁用思考模式

**修复**
- 修复了加载状态完成时的视觉反馈

**改进**
- 改进了思考模式的显示，增强了视觉效果
- 改进了 glob 和 grep 工具的路径校验
- 为工具后置（post-tool）钩子显示精简输出，以减少视觉杂乱
- 改进了权限请求对话框的 UI 一致性

### 1.0.113

**改进**
- 弃用了交互模式下的管道输入
- 将切换转写（transcript）的 Ctrl+R 快捷键移动到 Ctrl+O

### 1.0.112

**新功能**
- 转写模式（Ctrl+R）：添加了用于生成每条助手消息的模型信息
- Hooks：为 SessionEnd 钩子添加了 systemMessage 支持
- 添加了 `spinnerTipsEnabled` 设置以禁用 spinner 提示

**修复**
- 解决了部分 Claude Max 用户被错误识别为 Claude Pro 用户的问题

**其他**
- IDE：各项改进和缺陷修复

### 1.0.111

**修复**
- 修复了由格式错误的 shell 语法解析引起的 Bash 工具崩溃

**改进**
- `/model` 现在会校验提供的模型名称

### 1.0.110

**新功能**
- `/terminal-setup` 命令现在支持 WezTerm

**修复**
- 修复了后台 Bash 进程的可靠性问题

**改进**
- MCP：OAuth 令牌现在会在过期前主动刷新

### 1.0.109

**新功能**
- SDK：通过 `--include-partial-messages` CLI 标志添加了部分消息流式传输支持

### 1.0.106

**修复**
- Windows：修复了路径权限匹配，使其一致地使用 POSIX 格式（例如，`Read(//c/Users/...)`）

### 1.0.97

**改进**
- Settings：`/doctor` 现在会校验权限规则语法并给出纠正建议

### 1.0.94

**新功能**
- Vertex：为受支持的模型添加全局端点支持
- SDK：将自定义工具添加为回调
- 添加了 `/todos` 命令以列出当前的待办项

**改进**
- `/memory` 命令现在允许直接编辑所有已导入的内存文件

### 1.0.93

**新功能**
- Windows：添加 alt + v 快捷键，用于从剪贴板粘贴图片
- 支持 NO_PROXY 环境变量，以对指定的主机名和 IP 绕过代理

### 1.0.90

**改进**
- 设置文件更改立即生效——无需重启

### 1.0.88

**新功能**
- 引入了 `ANTHROPIC_DEFAULT_SONNET_MODEL` 和 `ANTHROPIC_DEFAULT_OPUS_MODEL`，用于控制模型别名 opusplan、opus 和 sonnet

**修复**
- 修复了导致 "OAuth authentication is currently not supported" 的问题
- 修复了 `/cost` 中不正确的用量统计

**改进**
- 状态行输入现在包含 `exceeds_200k_tokens`
- Bedrock：将默认 Sonnet 模型更新为 Sonnet 4

### 1.0.86

**新功能**
- 添加了 `/context`，帮助用户自助排查上下文问题
- SDK：为所有 SDK 消息添加了 UUID 支持
- SDK：添加了 `--replay-user-messages`，用于将用户消息回放到 stdout

### 1.0.85

**新功能**
- Hooks：引入了 SessionEnd 钩子

**改进**
- 状态行输入现在包含会话成本信息

### 1.0.84

**新功能**
- @-mention：将 `~/.claude/*` 文件添加到建议中，以便更轻松地编辑 agent、输出样式和斜杠命令

**修复**
- 修复了网络不稳定时的 tool_use/tool_result id 不匹配错误
- 修复了 Claude 在收尾任务时有时会忽略实时引导（steering）的问题

**改进**
- 默认使用内置 ripgrep；要退出此行为，请设置 USE_BUILTIN_RIPGREP=0

### 1.0.83

**新功能**
- @-mention：支持路径中带空格的文件

**改进**
- 全新的微光（shimmering）spinner

### 1.0.82

**新功能**
- SDK：添加请求取消支持
- SDK：新增 additionalDirectories 选项以搜索自定义路径，并改进了斜杠命令处理

**修复**
- Bash：修复 Claude 尝试自动读取大文件时的崩溃

**改进**
- Settings：通过校验阻止 `.claude/settings.json` 文件中的无效字段
- MCP：改进工具名称一致性

### 1.0.81

**新功能**
- 发布了输出样式，包括新的内置教育性输出样式 "Explanatory" 和 "Learning"。文档：https://code.claude.com/docs/en/output-styles

**修复**
- Agents：修复 agent 文件无法解析时的自定义 agent 加载

### 1.0.80

**修复**
- UI 改进：修复自定义子 agent 颜色的文本对比度以及 spinner 渲染问题

### 1.0.77

**新功能**
- Opus Plan Mode：`/model` 中的新设置，仅在 plan 模式下运行 Opus，其余情况下运行 Sonnet
- SDK：添加会话支持和权限拒绝跟踪

**修复**
- Bash 工具：修复 heredoc 和多行字符串转义，改进 stderr 重定向处理
- 修复了会话摘要中的 token 上限错误

### 1.0.73

**新功能**
- MCP：通过 `--mcp-config file1.json file2.json` 支持多个配置文件
- Linux：添加对 Alpine 和基于 musl 的发行版的支持（需要单独安装 ripgrep）

**改进**
- MCP：按 Esc 可取消 OAuth 认证流程
- Bash：改进了命令校验并减少了误报的安全警告
- UI：增强了 spinner 动画和状态行的视觉层次

### 1.0.72

**新功能**
- 询问权限：可通过 `/permissions` 让 Claude Code 在使用特定工具时始终请求确认

### 1.0.71

**新功能**
- 后台命令：（Ctrl-b）可在后台运行任意 Bash 命令，使 Claude 能继续工作（非常适合开发服务器、追踪日志等）
- 可自定义的状态行：通过 `/statusline` 将你的终端提示符添加到 Claude Code

### 1.0.70

**新功能**
- 添加了对斜杠命令参数中 @-mention 的支持

**修复**
- Windows：修复了原生文件搜索、ripgrep 和子 agent 功能

**改进**
- 性能：优化了消息渲染，在大型上下文下获得更好的性能

### 1.0.69

**改进**
- 将 Opus 升级到 4.1 版本

### 1.0.68

**新功能**
- 添加了 `disableAllHooks` 设置
- SDK：添加了用于工具确认的 canUseTool 回调支持

**修复**
- 修复了某些命令（如 `/pr-comments`）使用了不正确的模型名称
- Windows：改进了 allow / deny 工具和项目信任的权限检查。这可能会在 `.claude.json` 中创建新的项目条目——如有需要请手动合并 history 字段。
- Windows：改进了子进程派生，以消除运行 pnpm 等命令时出现的 "No such file or directory"

**改进**
- 增强了 `/doctor` 命令，加入 CLAUDE.md 和 MCP 工具上下文以支持自助调试
- 改进了大型仓库中的文件建议性能

### 1.0.65

**修复**
- IDE：修复了连接稳定性问题和诊断的错误处理
- Windows：修复了没有 .bashrc 文件的用户的 shell 环境设置

### 1.0.64

**新功能**
- Agents：添加了模型自定义支持——你现在可以指定 agent 应使用哪个模型
- Hooks：为钩子 JSON 输出添加了 systemMessage 字段，用于显示警告和上下文
- 将隐藏文件添加到文件搜索和 @-mention 建议中

**修复**
- Agents：修复了对递归 agent 工具的意外访问
- SDK：修复了多轮对话中的用户输入跟踪

### 1.0.63

**修复**
- Windows：修复了文件搜索、@agent 提及和自定义斜杠命令功能

### 1.0.62

**新功能**
- 添加了对自定义 agent 的 @-mention 支持，带预输入（typeahead）。`@<your-custom-agent>` 即可调用它
- Hooks：添加了用于新会话初始化的 SessionStart 钩子
- `/add-dir` 命令现在支持目录路径的预输入

**改进**
- 改进了网络连接检查的可靠性

### 1.0.61

**新功能**
- Settings：添加了 `--settings` 标志以从 JSON 文件加载设置
- IDE：添加了在 VSCode MacOS 上使用 ⌘+V 粘贴图片的支持
- IDE：添加了 `CLAUDE_CODE_AUTO_CONNECT_IDE=false` 以禁用 IDE 自动连接
- 添加了 `CLAUDE_CODE_SHELL_PREFIX`，用于包装 Claude Code 运行的 Claude 命令和用户提供的 shell 命令

**修复**
- Settings：修复了对作为符号链接的设置文件路径的解析
- OTEL：修复了认证更改后报告错误组织的问题
- Slash commands：修复了带 Bash 的 allowed-tools 的权限检查

**改进**
- 转写模式（Ctrl+R）：将 Esc 改为退出转写模式，而非中断

### 1.0.60

**新功能**
- 你现在可以为专门任务创建自定义子 agent！运行 `/agents` 即可开始

### 1.0.59

**新功能**
- SDK：通过 canUseTool 回调添加了工具确认支持
- SDK：允许为派生的进程指定 env
- Hooks：向钩子暴露了 PermissionDecision（包括 "ask"）
- Hooks：UserPromptSubmit 现在在高级 JSON 输出中支持 additionalContext

**修复**
- 修复了部分指定了 Opus 的 Max 用户仍会看到回退到 Sonnet 的问题

### 1.0.58

**新功能**
- 添加了对读取 PDF 的支持
- Hooks：为钩子命令添加了 CLAUDE_PROJECT_DIR 环境变量

**改进**
- MCP：改进了 'claude mcp list' 中的服务器健康状态显示

### 1.0.57

**新功能**
- 添加了在斜杠命令中指定模型的支持

**修复**
- 修复：移除 bash 输出中终端换行处的尾随换行符

**改进**
- 改进了权限消息，以帮助 Claude 理解允许的工具
