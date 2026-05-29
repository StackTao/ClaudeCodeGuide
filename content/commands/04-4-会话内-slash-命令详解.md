## 4. 会话内 Slash 命令详解

### 4.1 `/help`

用途：查看当前版本可用命令。

示例：

```text
/help
```

使用技巧：

- 命令变化快，先看 `/help`。
- 不同平台、计划、版本可用命令不同。
- 只有出现在本机 `/help` 或官方 Commands 页中的命令，才应当当作“当前可用命令”；社区截图和二次整理只作为线索。

### 4.2 `/init`

用途：为项目初始化 `CLAUDE.md`。

示例：

```text
/init
```

推荐流程：

1. 在仓库根目录启动 Claude Code。
2. 运行 `/init`。
3. 再运行 `/memory` 精修。
4. 手动删掉空泛内容，保留项目命令、边界和安全规则。

案例：

```text
/init
请生成精简版 CLAUDE.md，只包含技术栈、测试命令、禁止事项和工作流规则。
```

### 4.3 `/memory`

用途：编辑和管理项目 memory，例如 `CLAUDE.md`。

示例：

```text
/memory
```

适合写入：

- 测试命令。
- 代码风格。
- 禁止目录。
- 安全规则。
- 模块边界。

不适合写入：

- 一次性任务状态。
- 长篇设计资料。
- 低频流程。低频流程更适合 skill。

### 4.4 `/permissions`

用途：管理工具权限 allow/ask/deny 规则。

示例：

```text
/permissions
```

推荐策略：

- 读文件、搜索文件可以宽松。
- 写文件保持 ask 或任务级授权。
- 删除、迁移、部署、推送默认 deny。

案例：

```text
请帮我配置权限：允许只读搜索和读取，编辑文件需要确认，禁止 rm、git push、生产部署命令。
```

### 4.5 `/config`

用途：调整配置，例如模型、主题、输出风格等。

示例：

```text
/config
```

适合场景：

- 设置默认模型。
- 配置 auto-compact。
- 调整输出风格。
- 检查项目/用户配置。

### 4.6 `/model`

用途：切换当前会话模型。

示例：

```text
/model sonnet
/model opus
```

建议：

- 日常实现用 Sonnet。
- 复杂架构判断、深度调试时临时切 Opus（当前最新为 Opus 4.8）。
- 切换模型会让后续响应重新读上下文，长会话可能有成本影响。
- **默认行为在 v2.1.153 反转**：`/model` 现在会把所选模型保存为后续新会话的默认值（与 IDE 行为一致）；在选择器里按 `s` 才表示“仅本次会话”。如果你早先自定义过 `modelPicker:setAsDefault` 键位，需要在 `keybindings.json` 里改名为 `modelPicker:thisSessionOnly`（旧的 `d` 动作已被 `s` 取代）。

### 4.7 `/effort`

用途：调整推理努力程度。Opus 4.8（v2.1.154）默认就是 high。

示例：

```text
/effort high
/effort xhigh
/effort auto
```

适合场景：

- 疑难 bug、架构分析、跨模块重构用 high；最难的任务用 `xhigh`（Opus 4.8 起支持，另有 `max`）。
- 简单文档、格式调整用低或默认。
- v2.1.154 把选择器滑块标签从 “Speed”/“Intelligence” 改为 “Faster”/“Smarter”。

### 4.8 `/plan`

用途：进入计划模式，先产计划再改代码。

示例：

```text
/plan fix the auth redirect loop
```

适合场景：

- 跨文件修改。
- 需求有歧义。
- 需要先确认验收标准。

案例：

```text
/plan migrate this API from callbacks to async/await
请计划时包含涉及文件、兼容风险、测试策略和最小分批方案。
```

### 4.9 `/goal`

用途：设置一个“完成条件”，Claude 会在多个 turn 之间持续工作，直到独立评估模型判断条件已经满足。官方 changelog 显示 `/goal` 在 Claude Code v2.1.139 加入。

基本语法：

```text
/goal [condition]
/goal
/goal clear
```

官方语义：

- `/goal <condition>`：设置或替换当前 session 的目标，并立刻开始一轮工作。
- `/goal`：查看当前 active goal，或最近达成的 goal。
- `/goal clear`：提前清除目标；`stop`、`off`、`reset`、`none`、`cancel` 也可作为 clear 的别名。
- 一个 session 同时只能有一个 active goal。
- 恢复 active session 时，目标条件会保留，但 turn 计数、计时和 token baseline 会重置。

适合场景：

- 有清晰验收标准的长任务。
- 迁移模块直到编译和测试通过。
- 按设计文档实现所有 acceptance criteria。
- 处理 issue 队列直到队列为空。
- 拆分大文件直到每个文件低于指定行数。

不适合：

- 探索性 brainstorming。
- 不能一句话描述“完成”的开放任务。
- 需要频繁产品判断的任务。
- 高风险无人值守任务，例如删除、迁移、部署。

示例 1：测试驱动修复

```text
/goal all tests in test/auth pass, npm run lint exits 0, and no files outside src/auth and test/auth are modified
```

示例 2：文档补全

```text
/goal README.md contains installation, local development, test, build, and troubleshooting sections, and markdown lint passes
```

示例 3：非交互模式

```bash
claude -p "/goal CHANGELOG.md has an entry for every PR merged this week"
```

写好 goal 的公式：

```text
/goal [可验证结果] + [验证命令或证据] + [重要限制] + [停止边界]
```

更好的写法：

```text
/goal npm test exits 0 for the billing package, TypeScript compile passes, no public API names change, or stop after 12 turns and summarize blockers
```

不好的写法：

```text
/goal make the project better
```

和其他自动化方式的区别：

| 方式 | 下一轮何时开始 | 何时停止 | 适合 |
|---|---|---|---|
| `/goal` | 上一轮结束后立刻评估 | 独立模型确认条件满足 | 有完成条件的长任务 |
| `/loop` | 到达时间间隔或自节奏 | 人工停止或 Claude 判断完成 | 定期检查、轮询 |
| Stop hook | 上一轮结束后触发 | 脚本或 prompt 判断 | 团队级固定规则 |
| Auto mode | 同一 turn 内自动批准工具 | Claude 自己判断本轮完成 | 减少工具确认 |

实战建议：

- 与 auto mode 搭配时要更谨慎，因为它同时减少“每个工具调用确认”和“每轮继续确认”。
- 对高风险任务，把禁止项写进 condition。
- 给长任务加停止边界，例如“or stop after 20 turns”。
- 让 Claude 每轮输出测试结果或检查证据，因为 evaluator 不会自己运行命令，只能读 transcript 中已有证据。

X / Twitter 线索：

- 2026-05 中旬 X 上出现 `/goal` trend 摘要，提到 v2.1.139 引入、适合长任务、可用 `/goal clear` 停止。
- 这些 X 摘要本身需要验证；本手册以官方 `/goal` 文档和 changelog 作为事实来源，X 只作为“社区关注点和用法线索”。

### 4.10 `/clear`

用途：清空当前上下文，开始新任务。历史会话仍可恢复。

示例：

```text
/clear auth-bug-before-refactor
```

适合场景：

- 切换到无关任务。
- 上下文污染。
- 旧任务目标影响新任务。

### 4.11 `/compact`

用途：压缩长会话上下文，保留摘要继续工作。

示例：

```text
/compact Focus on decisions, changed files, failing tests, and next steps.
```

适合场景：

- 会话很长但仍是同一个任务。
- 上下文接近上限。
- 图片或日志太多导致上下文压力。

X 上有用户反馈图片维度/多图上下文问题时提示使用 `/compact` 或开新会话。这个案例说明：视觉或大量日志任务更要定期压缩，且不要把所有截图都塞进一个会话。

### 4.12 `/context`

用途：查看当前上下文占用。

示例：

```text
/context
/context all
```

适合场景：

- 不确定为什么成本高。
- 不确定哪些文件或工具定义占上下文。
- 想决定是 `/compact` 还是 `/clear`。

### 4.13 `/copy`

用途：复制最近一次 assistant 回复；有代码块时可选择复制整段回复或单个代码块。官方 Commands 页说明 `/copy [N]` 可复制第 N 个最近回复，在选择器里按 `w` 可写入文件，适合 SSH 环境。

示例：

```text
/copy
/copy 2
```

适合场景：

- 从长回答里复制代码块。
- 把远程终端中的结果写入文件而不是系统剪贴板。
- 复用上一轮总结、PR 描述或命令模板。

### 4.14 `/usage`、`/cost`、`/stats`

用途：查看会话成本、token、使用情况。新版官方命令页中 `/cost` 和 `/stats` 是 `/usage` 的别名。

示例：

```text
/usage
/cost
/stats
```

适合场景：

- 长任务中检查消耗。
- 团队评估 Claude Code 使用成本。
- 判断是否应该拆任务或清上下文。

补充：自 v2.1.144 起 `/extra-usage` 被重命名为 `/usage-credits`（旧名仍兼容，但官方文档已切换）。它专门用于查看“额外用量 / 信用”相关账务，与单次会话 `/usage` 互补。
### 4.15 `/mcp`

用途：管理 MCP 连接和认证。

示例：

```text
/mcp
```

使用场景：

- 查看 MCP server 是否连上。
- 完成 OAuth。
- 查看 server 暴露的工具和 prompts。
- 清理认证。

MCP prompt 调用格式：

```text
/mcp__github__list_prs
/mcp__jira__create_issue "Bug title" high
```

### 4.16 `/agents`

用途：管理 subagents 和并行/后台工作。

示例：

```text
/agents
```

适合场景：

- 创建 code-reviewer、test-runner、debugger 等专用 agent。
- 让探索任务在独立上下文中完成。
- 降低主会话上下文污染。

示例调用：

```text
Use the code-reviewer subagent to review my recent changes.
Use the test-runner subagent to run focused tests and summarize failures.
```

### 4.17 `/code-review`、`/simplify`、`/review`、`/security-review`

用途：审查代码改动，但各自边界不同（`/code-review` 与 `/simplify` 关系几个版本反复调整，以下为 ≥ v2.1.154 最终态）。

| 命令 | 官方定位 | 适合场景 |
|---|---|---|
| `/code-review [low\|medium\|high\|xhigh\|max] [--fix] [--comment] [target]` | bundled skill，找当前 diff 或指定目标的 correctness bugs | 合并前找行为 bug；`--fix` 应用结论，`--comment` 发 GitHub inline comments |
| `/simplify` | 清理向审查：复用、简化、效率、抽象层级（altitude），并应用修复 | 反过度设计、去重、精简，而非找 bug |
| `/review [PR]` | 在当前本地 session 中审查 PR | 想在本地读取 PR 并做较深入只读审查 |
| `/security-review` | 审查当前分支 pending changes 的安全漏洞 | 登录、鉴权、输入处理、secret、文件上传等改动 |

示例：

```text
/code-review high
/code-review --comment
/simplify
/review
/review 123
/security-review
```

推荐追加约束：

```text
只报告会导致 bug、安全问题、数据损坏或测试缺口的发现。每条必须有文件和行号。
```

注意：

- `/simplify` 在 v2.1.147 曾被并入 `/code-review`，但 v2.1.154 起重新独立为“清理向”命令；现在两者是**不同命令**，不要当别名。
- `/review` 和 `/ultrareview` 都能审 PR；前者在本地 session，后者在云端多 agent sandbox。
- 安全敏感 PR 建议先 `/code-review high`，再 `/security-review`，最后由人类 review。

### 4.18 `/autofix-pr`

用途：启动 Claude Code on the web session 监控当前分支对应 PR，并在 CI 失败或 reviewer 留评论时尝试推送修复。

示例：

```text
/autofix-pr
/autofix-pr only fix lint and type errors
```

适合场景：

- 当前本地分支已有打开的 GitHub PR。
- 希望远程 session 持续处理 CI 失败和 review comments。
- 团队允许 Claude Code on the web 访问该仓库并推送分支更新。

前置条件和风险：

- 需要 `gh` CLI，且本地分支能通过 `gh pr view` 定位 PR。
- 默认会处理所有 CI failure 和 review comment；建议传入更窄 prompt。
- 高风险仓库应要求人工 review，不要把自动修复等同于自动合并。

### 4.19 `/diff`

用途：查看当前未提交改动和每轮改动 diff。

示例：

```text
/diff
```

实战用法：

```text
请基于 /diff 结果解释每个文件为什么被修改，并指出有没有无关改动。
```

### 4.20 `/rewind`

用途：回退会话或代码到某个 checkpoint。

示例：

```text
/rewind
```

适合场景：

- Claude Code 走错方向。
- diff 变得太大。
- 想回到某次修改前。

注意：

- 回退前先看 diff。
- 如果仓库里有你自己的未保存改动，谨慎操作。

### 4.21 `/run`、`/verify`、`/run-skill-generator`

用途：运行项目并验证改动是否在真实应用里生效。官方 Commands 页说明 `/run`、`/verify`、`/run-skill-generator` 是 bundled skills，要求 Claude Code v2.1.145 或更新版本；复杂项目可用 `/run-skill-generator` 记录项目启动配方。

示例：

```text
/run
/verify
/run-skill-generator
```

适合场景：

- 前端页面改动。
- CLI/TUI 行为验证。
- 需要真实服务器和浏览器观察的变更。

推荐：

- 简单项目先直接 `/verify`。
- 需要数据库、env、多步骤启动时，用 `/run-skill-generator` 生成项目专属运行 skill。
- 如果本机 `/help` 没有这些命令，优先升级 Claude Code，而不是照旧文档硬跑。

### 4.22 `/batch`

用途：把大规模变更拆成多个独立单元并行执行。官方命令页说明它适合跨代码库的大变更，会拆分成多个 worktree 中的后台 subagent。

示例：

```text
/batch migrate src from old API client to new API client
```

适合场景：

- 大量重复迁移。
- 多模块并行改造。
- 测试覆盖较好的仓库。

不适合：

- 需求模糊。
- 测试薄弱。
- 模块之间强耦合。

### 4.23 `/background`、`/tasks`

用途：把当前任务放到后台，或查看后台任务。

示例：

```text
/background continue running the migration tests
/tasks
```

适合场景：

- 长测试。
- 长分析。
- 不想占用当前终端。

### 4.24 `/hooks`

用途：查看已配置 hooks。

示例：

```text
/hooks
```

适合场景：

- 排查为什么工具调用被拦截。
- 确认格式化、测试、安全扫描 hook 是否生效。
- 分辨 hook 来自 user/project/local/plugin/session/built-in 哪个层级。

### 4.25 `/output-style`

用途：切换输出风格。官方文档提到内置 default、explanatory、learning 等风格，也可以自定义。

示例：

```text
/output-style explanatory
/output-style learning
```

适合场景：

- 学习陌生代码库时用 explanatory。
- 想边学边写时用 learning。
- 日常高效开发保持 default。

### 4.26 `/fast`

用途：切换 fast mode。适合在同一 session 中把简单任务切到更快响应，把复杂任务切回默认/高推理设置。

示例：

```text
/fast on
/fast off
```

适合：

- 文档小改。
- 简单解释。
- 快速重复操作。

不适合：

- 跨模块架构判断。
- 复杂 bug root cause。
- 高风险迁移。

### 4.27 `/focus`

用途：切换 focus view，只显示最近提示、工具调用摘要和最终响应。官方 commands 页面说明它只在 fullscreen rendering 中可用。

示例：

```text
/focus
```

适合：

- 长会话里减少视觉噪音。
- 只关注最后一轮结果。
- 配合 `/context` 判断是否需要压缩。

### 4.28 `/loop`

用途：重复运行一个 prompt。与 `/goal` 不同，`/loop` 根据时间间隔或自节奏开始下一轮，而不是靠完成条件判断。

示例：

```text
/loop 5m check if the deploy finished
/loop run the maintenance check from .claude/loop.md
```

适合：

- 等待部署完成。
- 定期检查 CI。
- 定时维护任务。

不适合：

- 有明确完成条件的实现任务。那种更适合 `/goal`。

### 4.29 `/schedule`

用途：创建、更新、列出或运行 routines，让任务在 Anthropic 管理的云基础设施上执行。官方 commands 页面说明别名是 `/routines`。

示例：

```text
/schedule every weekday morning triage new GitHub issues and summarize blockers
```

适合：

- 每日 triage。
- 周期性报告。
- 定时检查。

注意：

- 需要明确权限和数据范围。
- 不适合无人审查地修改生产系统。

### 4.30 `/install-github-app`

用途：为仓库设置 Claude GitHub Actions app。官方 commands 页面说明它会引导选择 repo 并配置集成。

示例：

```text
/install-github-app
```

适合：

- 初次配置 Claude Code GitHub 集成。
- 让 Claude 能在 issue/PR 中响应。

上线前检查：

- GitHub token 权限最小化。
- 外部 PR 触发规则保守。
- 自动 PR 必须人工 review。

### 4.31 `/claude-api`

用途：加载 Claude API 参考材料，帮助维护使用 Anthropic SDK 的项目。官方 Commands 页说明它覆盖 Python、TypeScript、Java、Go、Ruby、C#、PHP、cURL，并可用于迁移模型或创建 Managed Agent。

示例：

```text
/claude-api
/claude-api migrate
/claude-api managed-agents-onboard
```

适合场景：

- 项目直接使用 `anthropic` 或 `@anthropic-ai/sdk`。
- 需要升级模型 ID、thinking 配置或新版 API 参数。
- 想把 Claude API / Managed Agents 的官方参考注入当前任务。

风险：

- 它是 API 迁移辅助，不等同于业务逻辑迁移；改模型和参数后仍要跑集成测试。
- 多语言仓库要先限定扫描范围，避免跨服务误改。

### 4.32 `/ultraplan`

用途：在 ultraplan session 中起草计划，在浏览器中 review，然后远程执行或发回 terminal。

示例：

```text
/ultraplan redesign the billing retry system with migration and rollback plan
```

适合：

- 复杂设计。
- 需要先 review 计划再执行的任务。
- 跨终端和 Web 协作。

### 4.33 `/ultrareview`

用途：在云沙箱中运行更深的多 agent code review。官方 commands 页面说明 Pro/Max 有免费次数，之后需要 usage credits。

示例：

```text
/ultrareview 123
```

适合：

- 重要 PR 合并前。
- 安全敏感变更。
- 复杂跨模块 diff。

### 4.34 `/terminal-setup`、`/scroll-speed`、`/tui`

用途：改善终端交互体验。

示例：

```text
/terminal-setup
/scroll-speed
/tui fullscreen
```

适合：

- VS Code、Cursor、Windsurf、Alacritty、Zed 等终端快捷键配置。
- 调整鼠标滚轮速度。
- 切换 fullscreen renderer。

### 4.35 `/theme`、`/statusline`、`/keybindings`

用途：定制显示和快捷键。

示例：

```text
/theme
/statusline
/keybindings
```

适合：

- 长时间使用 Claude Code。
- 希望状态栏显示模型、目录、git 分支、上下文等信息。
- 自定义快捷键，例如 Ctrl+T 显示任务列表。

### 4.36 `/voice`、`/web-setup`、`/remote-control`、`/teleport`

用途：语音输入、连接 Claude Code Web、远程控制和在 Web/terminal 之间迁移 session。

示例：

```text
/voice tap
/voice hold
/voice off
/web-setup
/remote-control
/teleport
```

适合：

- 用语音输入长 prompt 或临时说明；需要 Claude.ai 账号。
- 在浏览器和 terminal 间切换。
- 远程继续某个 session。
- 让 cloud routines 或 web sessions 访问 GitHub 账号。

### 4.37 `/insights`、`/team-onboarding`

用途：分析过去 session、命令和 MCP 使用，生成报告或团队 onboarding 指南。

示例：

```text
/insights
/team-onboarding
```

适合：

- 团队推广 Claude Code。
- 总结摩擦点。
- 根据真实使用记录生成 onboarding 文档。

### 4.38 `/doctor` 和 `/debug`

用途：诊断安装、登录、配置、运行时问题。

示例：

```text
/doctor
/debug MCP server fails to connect
```

建议：

- 安装或登录异常先 `/doctor`。
- 复现性问题再 `/debug`，注意日志隐私。

### 4.39 `/workflows`、`/reload-skills`（v2.1.152 / v2.1.154）

用途：编排后台多 agent 工作流，以及不重启即重扫 skill 目录。

示例：

```text
/workflows
/reload-skills
```

`/workflows`：

- v2.1.154 起，可让 Claude 自行创建工作流，在后台跨数十到上百个 agent 推进，`/workflows` 查看运行状态。
- 适合大规模审查、迁移、情报搜集这类一个上下文装不下的任务。
- 代价是 token 消耗可能很大，属于需要用户明确选择的能力，不要默认开。

`/reload-skills`：

- v2.1.152 起，新增或改完 skill 后无需重启会话即可重新扫描 skill 目录。
- 也可让 `SessionStart` hook 返回 `reloadSkills: true` 自动触发。
- 配合自建 skills 迭代时省去反复重开会话。

