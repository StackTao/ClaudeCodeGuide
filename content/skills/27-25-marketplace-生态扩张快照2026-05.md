## 25. Marketplace 生态扩张快照（2026-05）

截至 2026-05-19，社区目录可见 74 个 marketplace、约 1182 个插件，覆盖 Automation/DevOps、Code Quality/Testing、Data Analytics、Design/UX、Documentation、Git Workflow、Security/Compliance 等近 13 个类别。这个数字来自第三方目录，只说明生态规模，不代表官方背书、维护质量或安全性。

最近几次官方版本加上了与挑选直接相关的能力，建议把它们写进团队规范：

| 能力 | 出现版本 | 用途 |
|---|---|---|
| `/plugin` Discover/Browse 安装前预览 | v2.1.145 | 看 commands / agents / skills / hooks / MCP / LSP servers，配合预估 context 成本 |
| `claude plugin disable/enable` 依赖强制 | v2.1.144+ | 禁用时拒绝并提示完整禁用链；`enable` 会强制启用传递依赖 |
| `blockedMarketplaces` 设置 | v2.1.108+ | 企业策略禁掉非授权 marketplace |
| `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` | 2026-05 | marketplace add/update 强制走 HTTPS |
| `--plugin-url` / `--plugin-dir` | v2.1.108+ | CLI 直接接入第三方插件源 / 本地 zip |
| `/skills`、`/plugin` 实时过滤 | 2026-05 起 | 直接 type-to-filter 选择 |

值得跟踪的新 / 更新 marketplace 与插件：

| 名称 | 类型 | 价值点 |
|---|---|---|
| `anthropics/claude-plugins-official` | 官方 | 启动即可用，`/plugin install name@claude-plugins-official` |
| `anthropics/claude-plugins-community` | 社区（官方维护） | 通过 Anthropic 自动校验与安全筛查，每个插件 pin 到 commit SHA |
| `xiaolai/claude-plugin-marketplace` | 第三方文档型 | 8 个 skill 镜像 Anthropic 官方文档（claude-code、claude-agent-sdk、anthropic-api 等），每小时 GitHub Actions 同步 |
| `CC Suite` | 跨工具桥接插件 | 统一 AGENTS.md、skills、hooks、MCP，支持 Claude↔Codex 双向委派，取代旧的 `cc-bridge`、`codex-toolkit` |
| `claude-music` | 第三方娱乐 | `/play`、`/vibe` 在长任务播 lofi/jazz/ambient，注意它会在本机寻找 mpv/ffplay/afplay |

注意：

- 官方 marketplace 是默认可信起点；community marketplace 和第三方 marketplace 仍应先审查来源、manifest 和权限。
- 第三方目录里的“近期更新”≠ 维护良好。pin 一个版本，再周期复查 commit 历史。
- xiaolai 这类“自动镜像官方 docs”的 skill 包优点是低维护，但缺点是它就是文档本身，遇到真正稳定的事实仍要看原始 docs。
- CC Suite 把 Codex 当二级 agent 派发非常方便，但跨工具委派的失败模式（quota 不同、tool schema 差异）需要在 hooks 里加守护。

来源汇总见 `sources.md` 第 9 节。
