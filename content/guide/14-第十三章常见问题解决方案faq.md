## 第十三章：常见问题解决方案（FAQ）

> 本章按问题域组织，每条结论都标注来源等级：
> - **官方** = 来自 `docs.anthropic.com` 或 `code.claude.com` 的 troubleshooting / errors / setup 页面
> - **社区核验** = 多个独立社区帖子复现、且与官方文档逻辑一致
> - **社区线索** = 单一来源或未在官方文档出现，仅作排查方向，使用前自查
>
> 任何问题，先在会话里 `/doctor` 自诊断（约 80% 常见配置错误它能直接定位），再到 `/feedback` 提交 transcript。Bedrock / Vertex / Foundry 等第三方 provider 上的 `/feedback` 会本地存档 transcript，发给你的 Anthropic 客户代表即可。来源：官方 [troubleshooting](https://code.claude.com/docs/en/troubleshooting)。

### 13.1 安装报错

| 现象 | 解决 | 来源 |
|---|---|---|
| `bash: line 1: syntax error near unexpected token '<'` 或 `Invoke-Expression: Missing argument` | 安装 URL 返回了 HTML 而不是脚本；多半是地区限制（HTML 内含 “App unavailable in region”）或代理拦截 | 官方 troubleshoot-install |
| `App unavailable in region` | 当前国家不支持，需走 LLM Gateway 或第三方 provider；不要尝试绕过 | 官方 |
| `Killed`（Linux 安装时） | 内存不足。`sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile` 加 swap 后重装 | SegmentFault FAQ（社区核验） |
| `Error loading shared library libstdc++.so.6` / `libgcc_s.so.1` | 安装器误判 musl vs glibc。Alpine：`apk add libgcc libstdc++ ripgrep`；其他发行版安装系统 ripgrep 后再装 | 官方 + 社区核验 |
| macOS `Symbol not found ... libicucore` | macOS 版本低于 13.0，升级系统 | 官方 |
| WSL1 `cannot execute binary file: Exec format error` | WSL1 loader 不支持新版二进制 program header（issue #38788），必须升级到 WSL2 | 官方 |
| Windows `irm ... \| iex` 卡住 | 代理需开 TUN 全局模式；或改走 Node 路径：`npm install -g @anthropic-ai/claude-code` | LinuxDO 1693892（社区核验） |
| Windows PowerShell 安装报“此语言版本不支持 var” | 把安装拆两步：先 `irm https://claude.ai/install.ps1 -OutFile install.ps1`，再 `Set-ExecutionPolicy -Scope Process RemoteSigned`、最后 `.\install.ps1` | LinuxDO 1693892（社区核验） |
| 装完 `claude` 不识别 | `%USERPROFILE%\.local\bin` 没在 PATH。`[Environment]::SetEnvironmentVariable("Path", "$env:Path;$env:USERPROFILE\.local\bin", "User")` | LinuxDO 1693892 + SegmentFault（社区核验） |

### 13.2 认证与登录

| 现象 | 解决 | 来源 |
|---|---|---|
| `API Error: 400 ... "This organization has been disabled"`，但订阅正常 | 残留的 `ANTHROPIC_API_KEY` 覆盖了 OAuth。`unset ANTHROPIC_API_KEY`，并清掉 `~/.zshrc`/`~/.bashrc`/`$PROFILE` 里相关 export；再 `/status` 确认 | 官方 errors |
| `OAuth token does not meet scope requirement: user:profile` | 直接 `/login` 换新 token，不需要先 logout | 官方 |
| 同会话内再次 401 | 先 `/logout` 清掉旧 token，再 `/login` | 官方 |
| `invalid access token or token expired` 反复出现 | 删除 `~/.claude.json`（OAuth 状态）后重新登录；Windows 是 `%USERPROFILE%\.claude.json` | LinuxDO 1543471（社区核验） |
| 频繁 token 失效 | 系统时钟漂移会让 OAuth 校验失败，先校时再 `/login` | SegmentFault FAQ（社区线索） |
| `Not logged in, Please run /login` 但已登录 | 网络被墙，回包失败。需要全局代理或 `HTTPS_PROXY` | LinuxDO（社区核验） |

### 13.3 网络、代理与地区

| 现象 | 解决 | 来源 |
|---|---|---|
| 中国大陆 403 | macOS GUI 应用不继承 shell 的 `HTTPS_PROXY`，要在 `launchctl setenv HTTPS_PROXY ...` 设；远程 SSH 时记得目标机也要配；Clash 打开 “Allow LAN” | docularxu gist + LinuxDO（社区核验） |
| `TLS connect error` / `unable to get local issuer certificate` | 企业代理做了 TLS 中间人。`export NODE_EXTRA_CA_CERTS=/path/to/corporate-ca.pem` | SegmentFault FAQ（社区核验） |
| 启动握手卡 75 秒 | v2.1.144 起已改为 15 秒超时，升级即可 | 官方 changelog |
| SSL certificate verification failed（购买 Pro 后） | 优先排查企业 / 代理证书；公开渠道目前没有统一可复现的修复 | LinuxDO 1798725（社区线索） |
| `Failed to fetch version` | 测 `curl -sI https://storage.googleapis.com`；可改走 `brew install --cask claude-code` / `winget install Anthropic.ClaudeCode` | SegmentFault FAQ（社区核验） |

### 13.4 运行时：context 爆炸、`/compact` 卡死、上下文衰退

- 任何时刻 `/context` 查看占用拆解（system prompt / tools / memory / messages）。
- 不用的 MCP 用 `/mcp disable <name>` 卸掉，工具定义会立刻从上下文里消失。来源：官方 errors。
- v2.1.7 起 MCP 工具描述若占用超 10% 上下文会自动延迟加载，通过 MCPSearch 发现，不再预加载；可在设置里把 `MCPSearch` 加进 `disallowedTools` 关掉。来源：LinuxDO 1445542（社区核验） + 官方 settings。
- `/compact` 不是 `/clear`：它做的是带任务上下文的智能总结，会保留代码片段和当前任务状态。来源：官方 commands。
- **自动 compact 阈值与熔断器**（社区逆向，仅作排查方向）：~83.5% token 触发宏压缩，~88.5% 走 blocking 413；连续 3 次压缩失败后熔断器停止重试，需要手动 `/compact`。来源：knightli / 知乎压缩深度解读（社区线索）。
- 长会话卡死无响应：`Ctrl+C` 退出，重启 `claude`，必要时 `/resume <id>` 接回；超 2-3 小时主动重启可减少漂移。来源：SegmentFault FAQ（社区核验）。
- Read tool 超 token：v2.1.145 起返回 “PARTIAL view” 截断首页而不是硬错，警惕你只读到了文件前半段。来源：官方 changelog。

### 13.5 MCP 与 Hooks

- MCP 权限匹配：用 `mcp__<server>__*` 整体放行，`mcp__<server>__write*` 等精确禁掉写动作。来源：官方 permissions。
- Hooks 退出码：`exit 0` 放行（PreToolUse 仍走常规权限流）、`exit 2` 阻止并把 stderr 反馈给 Claude。SessionStart / Setup / Notification 等事件即使 `exit 2` 也只把 stderr 给用户看，**不会真正阻止执行**。来源：官方 hooks-guide。
- 多 hook 合并：所有匹配 hook 都跑到底，对 PreToolUse 的权限决定取“最严格”—— `deny` 覆盖 `ask`，`ask` 覆盖 `allow`。来源：官方。
- 超时：`command` / `http` / `mcp_tool` 10 分钟，`UserPromptSubmit` 降到 30 秒；`PermissionRequest` hook 在 `-p` 非交互模式不会触发，要做自动决策用 PreToolUse。来源：官方。
- 受保护目录：无论权限模式如何，`.git` / `.vscode` / `.idea` / `.husky` / `.claude` 的写入永远不会自动批准，例外是 `.claude/commands`、`.claude/agents`、`.claude/skills`。来源：官方 permissions。
- 大插件包（everything-claude-code、各类 100-skills pack）容易把 PostToolUse hook 链堆出 10+ 个，写文件会被反复校验最终卡死。LinuxDO 1612347、1964733 多次复现。建议在 `.claude/settings.json` 用 `disabledPlugins` 临时关掉。来源：LinuxDO（社区核验）。

### 13.6 IDE 集成

| 现象 | 解决 | 来源 |
|---|---|---|
| JetBrains IDE 检测不到 | 装 Claude Code 官方插件 → 重启 IDE → 终端 `claude` → 会话内 `/ide` | LinuxDO 1117174（社区核验） |
| JetBrains 终端 Esc 退到编辑器 | Settings → Tools → Terminal 关掉 “Move focus to the editor with Escape” | LinuxDO 1117174（社区核验） |
| VS Code Code tab 报 403 | 应用菜单 sign out 再 sign in；同一会话内的 token 卡住时这是最有效的复位 | 官方 desktop |
| “Failed to load session” | 选中的文件夹已不存在、或仓库依赖未装 Git LFS、或权限不足；换文件夹或重启 app | 官方 desktop |
| 工具找不到（npm/node 等） | 在普通终端能跑、Desktop 找不到 → PATH 没继承。修 shell profile 后重启 Desktop | 官方 desktop |
| `Branch doesn't exist locally`（远端会话开的新分支） | 点会话工具栏的分支名复制，然后 `git fetch origin <branch> && git checkout <branch>` | 官方 desktop |

### 13.7 Windows / WSL 特有

- Git Bash 报 `Claude Code on Windows requires git-bash`：`setx CLAUDE_CODE_GIT_BASH_PATH "C:\Program Files\Git\bin\bash.exe"`，然后**关掉当前终端**重开一个，`setx` 对当前窗口不生效。来源：CSDN 156245107（社区核验）。
- 选 PowerShell 作 Bash 工具：装了 Git for Windows 后设 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`（设 `0` 退出）。来源：官方 setup。
- Git Bash 中文乱码：`export PYTHONIOENCODING=utf-8`。来源：cnblogs 19048741（社区核验）。
- PowerShell 中文乱码：先 `chcp 65001`、终端字体换 Sarasa Gothic / Cascadia；`pwsh -Command "chcp; Write-Host '中文测试'"` 自检。来源：CSDN 160900712（社区核验）。
- WSL 里 `which node` 指到 `/mnt/c/`：因为 WSL 默认继承 Windows PATH。修正 `~/.bashrc` 里 nvm 的 `NVM_DIR` 与 `nvm.sh` 顺序，确认 node/npm 来自 `/usr/bin/` 或 `~/.nvm`。来源：SegmentFault FAQ（社区核验）。
- WSL2 + JetBrains 检测不到：管理员 PowerShell `New-NetFirewallRule` 放行 WSL2 IP；或在 `%USERPROFILE%\.wslconfig` 加 `[wsl2]\nnetworkingMode=mirrored`，再 `wsl --shutdown`。来源：SegmentFault FAQ（社区核验）。
- WSL2 OAuth 浏览器不弹：`export BROWSER="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"`；或登录提示时按 `c` 把 URL 复制出来手动打开。来源：SegmentFault FAQ（社区核验）。
- `Sandbox requires socat and bubblewrap`：`sudo apt-get install bubblewrap socat`（Debian 系）或 `sudo dnf install bubblewrap socat`（Fedora）。WSL1 不支持，升 WSL2。来源：SegmentFault FAQ（社区核验）。
- Windows `Error writing file`（v1.0.111+）：使用带盘符的完整绝对路径；如果短期内无法升级，降到 1.0.110 是社区报告的临时回路。来源：LinuxDO 1230531（社区线索，建议优先升级而不是降级）。

### 13.8 `/clear` vs `/compact` vs `/rewind` 选择

| 场景 | 用哪个 | 原因 |
|---|---|---|
| 任务做完、上下文沾染了很多探索路径 | `/clear` 或 `/compact` 后开新任务 | 干净起步避免上下文衰退 |
| Claude 走错方向 5 步内 | `/rewind`（连按两次 Esc） | 比文字“纠正它”更省 token 也更准 |
| 上下文超 70%、还有任务要继续 | `/compact` 带任务说明 | 总结保留当前任务状态 |
| Claude 开始前后矛盾、忘记前面决议 | 先 `/compact`，仍失效就 `/clear` 带要点重开 | 上下文衰退已发生 |
| 想跨会话接回 | `Ctrl+C` 退出后 `claude -c` 或 `claude -r <id>` | 不要 `/clear`，那会丢历史 |

来源：官方 [commands](https://code.claude.com/docs/en/commands) + Vincent Qiao / knightli compact 深度解读（社区核验综合）。

### 13.9 重置：何时清掉本地状态

谨慎使用，会清掉 MCP、会话历史、自定义命令等：

```bash
rm ~/.claude.json
rm -rf ~/.claude/
# 项目级（不会动用户级配置）
rm -rf .claude/
rm .mcp.json
```

适用：账号切换、provider 切换后状态错乱、`/doctor` 多项失败但找不到具体原因。来源：SegmentFault FAQ（社区核验）。建议先 `cp -r ~/.claude ~/.claude.bak` 留底。

本章要点：

- 任何报错先 `/doctor`、再查官方 errors 页、最后才上社区帖。
- 把社区结论按“官方 / 社区核验 / 社区线索”三档区分，不要直接复制陌生 PowerShell。
- 网络、代理、PATH、安装路径这四类问题贡献了绝大多数“装不上 / 用不了”工单。

实战清单：

- 安装新机第一次跑就把 `/doctor` 结果存档。
- 团队项目把 `ANTHROPIC_API_KEY` 列入“离职清退检查”。
- Windows 团队统一一种 shell 路线（PowerShell 或 Git Bash 二选一，别混）。
