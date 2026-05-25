## 9. X / Twitter 实战线索整理

> X 内容容易夸张、缺上下文、随版本变化。这里把它们作为“实践线索”，并尽量用官方文档或 GitHub 项目交叉验证。

### 9.1 `.claude/` 是控制中心

X 上 Corey Ganim 的公开帖把 `.claude/` 拆为 `CLAUDE.md`、rules、commands、skills、settings.json，并建议用 `.local` 做个人覆盖、用 `~/.claude/` 做全局设置。

可验证结论：

- 官方 settings 文档确实区分 user settings、project settings、local project settings。
- 官方 skills 文档确实推荐把重复流程放入 skills。
- 官方成本文档建议把低频长流程从 `CLAUDE.md` 移到 skills，减少基础上下文。

落地建议：

```text
.claude/
├── settings.json          # 团队共享权限和 hooks
├── settings.local.json    # 个人配置，不提交
├── skills/                # 可复用工作流
├── agents/                # 专用 subagents
└── hooks/                 # 本项目 hook 脚本
CLAUDE.md                  # 只放长期项目事实和硬约束
```

### 9.2 Plan Mode 先行

X 上多条实战帖强调“多数人把 Claude Code 当聊天窗口，高手先让它计划”。这与官方 `/plan` 命令和 Anthropic 工程博客的“先探索、计划、再执行”思路一致。

可执行模板：

```text
/plan implement role-based access checks for admin routes
计划必须包含：涉及文件、公共接口变化、测试策略、风险、最小分批。
不要修改代码，直到计划明确。
```

### 9.3 Hooks + Subagents + MCP 组合

X 上有帖子把 hooks、MCP、subagents、worktrees、并行会话称为“power stack”。其中部分命令可能依赖版本或实验功能，但核心组合是可验证的：

- 官方 hooks 文档支持工具前后执行自动化。
- 官方 subagents 文档支持独立上下文和工具权限。
- 官方 MCP 文档支持外部工具和 MCP prompts。
- 官方 commands 文档支持 `/batch`、`/agents`、`/background` 等并行工作流。

谨慎落地：

- 先用一个 subagent 做 review。
- 再加一个 PostToolUse hook 做格式检查。
- 最后再接一个只读 MCP。
- 不要第一天就开 10 个并行 agent。

### 9.4 `/compact` 解决长上下文和图片问题

X 上有用户贴出多图上下文过大后提示使用 `/compact` 或新会话的情况。这个经验与官方成本文档中的上下文管理建议一致。

操作建议：

```text
/compact Preserve: original goal, changed files, failed tests, passing tests, key decisions, next step.
```

如果是视觉任务：

- 每轮只保留关键截图。
- 用文字记录观察结论。
- 完成一个页面后 `/compact`。
- 新页面开新会话。

### 9.5 MCP 成本和复杂度

Apify/Jan Curn 的 X 帖提到围绕 MCP 开发 CLI 客户端时遇到 auth、session、tool call 等复杂度，并花费了数周和一定 Claude Code 成本。这类案例提醒：

- MCP 不是“免费上下文”。
- server 越多，认证和工具失败越多。
- 复杂 MCP 工作流应先做最小可用验证。

落地建议：

- 一个 MCP server 一个验收清单。
- 记录常见失败和认证步骤。
- 对高频任务考虑 CLI 替代 MCP。

### 9.6 网站克隆/前端验证案例

X 上有关于用 Claude Code、Chrome MCP、skills 克隆网站的实战帖子。它的可借鉴点不是“一句话克隆任何网站”，而是工作流：

1. 浏览器打开真实页面。
2. 提取字体、颜色、布局、截图。
3. 分模块实现。
4. 并行 agent 处理独立区域。
5. 最后合并和视觉检查。

保守落地：

- 只克隆你有权使用的页面或内部设计稿。
- 使用浏览器截图做视觉 QA。
- 不抓取受版权保护的资产用于发布。
