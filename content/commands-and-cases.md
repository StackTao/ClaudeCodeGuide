# Claude Code 命令详解与实战案例手册

> 版本：2026-05-21  
> 说明：Claude Code 命令变化很快，本文按 2026-05-21 可检索到的官方文档和公开社区资料整理（覆盖到 v2.1.145 release notes）。实际使用时以 `claude --help`、`/help`、官方 CLI reference、Commands 页面为准。

## 1. 使用命令前的基本判断

Claude Code 的命令分两类：

- **终端 CLI 命令**：在 shell 里运行，例如 `claude -p "explain this project"`、`claude -c`、`claude mcp`。
- **会话内 slash 命令**：进入 Claude Code 后输入，例如 `/init`、`/memory`、`/permissions`、`/compact`、`/review`。

判断方法：

- 要启动、恢复、脚本化、接入 CI，用 CLI。
- 要在当前会话里调整模型、权限、上下文、工作流，用 slash 命令。
- 要把重复流程固化下来，用 skills/custom commands。
- 要把外部系统接进来，用 MCP。
- 要在工具调用前后自动检查，用 hooks。

## 2. CLI 命令详解

### 2.1 `claude`

用途：在当前目录启动交互式 Claude Code 会话。

适合场景：

- 第一次进入一个仓库。
- 需要 Claude Code 读写文件、运行命令、持续协作。
- 需要用 `/init`、`/permissions`、`/mcp` 等交互命令。

示例：

```bash
cd my-project
claude
```

推荐第一句话：

```text
请先只读分析这个项目，不要修改文件。总结技术栈、入口、测试命令、构建命令和你建议写入 CLAUDE.md 的规则。
```

注意：

- 在错误目录启动会导致上下文错位。
- 第一次进入仓库不要直接让它大改，先做项目地图。

### 2.2 `claude "query"`

用途：启动交互式会话，并把第一条提示词一并传入。

示例：

```bash
claude "explain this project and identify the test command"
```

适合场景：

- 快速让 Claude Code 带着明确任务启动。
- 给新项目做只读扫描。

不适合：

- 自动化脚本。脚本更适合 `claude -p`。

### 2.3 `claude -p "query"`

用途：print mode，执行一次查询后退出。官方 CLI reference 将它定位为适合 SDK/脚本化调用的模式。

示例：

```bash
claude -p "Summarize the purpose of this repository in 10 bullets"
```

适合场景：

- CI 中生成报告。
- 从脚本里调用 Claude Code。
- 批量分析文件或日志。
- 不需要交互式多轮会话。

配合输出格式：

```bash
claude -p "Return a JSON summary of changed files" --output-format json
```

风险：

- 一次性任务上下文有限，提示词必须更完整。
- 非交互模式下权限处理要提前设计，尤其是工具调用和 MCP。

### 2.4 `cat file | claude -p "query"`

用途：把文件内容通过管道送给 Claude Code。

示例：

```bash
cat error.log | claude -p "Find the first real error and suggest the likely fix"
```

适合场景：

- 分析日志。
- 总结生成文件。
- 从其他命令输出中提炼信息。

好提示：

```text
只找第一个根因错误。忽略后续级联报错。输出：错误摘要、证据行、可能原因、下一步验证命令。
```

注意：

- 不要把包含 secret 的日志直接管给 Claude。
- 大日志先用 `grep`、`tail`、`head` 缩小范围。

### 2.5 `claude -c` / `claude --continue`

用途：继续当前目录最近一次会话。

示例：

```bash
claude -c
```

适合场景：

- 前一天做了一半，今天继续。
- 命令中断后恢复上下文。

使用技巧：

```bash
claude -c -p "Summarize the current state and the next smallest step"
```

注意：

- 如果切换到无关任务，先 `/clear` 或开新会话。
- 长会话可能带来过期上下文，恢复后先要求它总结当前状态。

### 2.6 `claude -r "<session>" "query"`

用途：按 session ID 或名称恢复指定会话。

示例：

```bash
claude -r "auth-refactor" "Continue from the last verified step"
```

适合场景：

- 多个任务并行时恢复指定任务。
- 通过 `/rename` 给会话命名后再回到它。

### 2.7 `claude update` / `claude install stable`

用途：更新或安装 Claude Code。

示例：

```bash
claude update
claude install stable
```

适合场景：

- 官方文档或社区提示某个命令不可用时，先确认版本。
- 团队希望统一到 stable 版本。

注意：

- Claude Code 命令表面变化频繁，升级后应检查 `/help` 和 release notes。
- 团队项目不要盲目追最新，先在个人环境验证。

### 2.8 `claude auth login/status/logout`

用途：登录、查看登录状态、退出账号。

示例：

```bash
claude auth login
claude auth status --text
claude auth logout
```

适合场景：

- 新机器初始化。
- CI 或远程环境排查认证问题。
- 切换 Claude.ai 订阅账号和 Console/API 计费账号。

安全建议：

- 不要把 API key 写进仓库。
- CI 中使用 secret store。
- 认证失败先用 `claude auth status` 判断，而不是反复重装。

### 2.9 `claude mcp`

用途：配置 MCP server，让 Claude Code 访问外部工具。

示例：

```bash
claude mcp
```

典型场景：

- 接入 GitHub、Sentry、Jira、Slack、数据库只读查询。
- 把内部文档、API schema、设计稿变成可访问上下文。

实践建议：

- 先只读，后写入。
- 先接一个 server，验证稳定后再扩展。
- 每次接入后用 `/mcp` 查看状态和认证。

### 2.10 `claude agents`、`claude attach`、`claude logs`

用途：管理和查看后台/并行会话。

示例：

```bash
claude agents --json
claude attach 7c5dcf5d
claude logs 7c5dcf5d
```

适合场景：

- 多任务并行。
- 后台 agent 继续跑测试或修复。
- 查看某个后台任务的输出。

风险：

- 并行 session 会放大 token 成本。
- 多个 agent 同时改同一片代码容易冲突。
- 建议配合 git worktree。

### 2.11 `claude project purge --dry-run`

用途：清理某个项目的 Claude Code 本地状态。官方命令支持 `--dry-run` 预览。

示例：

```bash
claude project purge . --dry-run
```

适合场景：

- 本地状态混乱。
- 需要清理旧 transcript、历史记录。

注意：

- 这是清理本地 Claude Code 状态，不是清理项目代码。
- 真正执行前先 dry-run。

## 3. 常用 CLI flags

### 3.1 `--permission-mode`

用途：指定会话启动权限模式。官方 CLI reference 提到可接受 `default`、`acceptEdits`、`plan`、`auto`、`dontAsk`、`bypassPermissions` 等模式。

示例：

```bash
claude --permission-mode plan
claude --permission-mode acceptEdits
```

推荐：

- 复杂需求：用 `plan`。
- 小范围编辑：用默认或 `acceptEdits`。
- 不建议日常使用 `bypassPermissions`。

### 3.2 `--max-turns`

用途：限制 print mode 或 GitHub Action 中的 agent 回合数。

示例：

```bash
claude -p "Review this diff" --max-turns 3
```

适合场景：

- CI 自动化。
- 防止任务无限探索。
- 控制成本。

### 3.3 `--model`

用途：指定模型。

示例：

```bash
claude --model sonnet
claude -p "Analyze this architecture" --model opus
```

建议：

- 日常编码优先 Sonnet。
- 架构、多阶段推理、疑难问题再用 Opus。
- 子任务可用更低成本模型。

### 3.4 `--output-format json` / `stream-json`

用途：结构化输出，适合脚本和 CI。

示例：

```bash
claude -p "Return changed modules and risk level" --output-format json
```

适合场景：

- 自动生成报告。
- 程序读取结果。
- Agent SDK 集成。

### 3.5 `--mcp-config`

用途：指定 MCP 配置。

示例：

```bash
claude --mcp-config ./mcp.json
```

适合场景：

- 项目级 MCP 配置。
- CI 或隔离环境中加载固定 MCP server。

### 3.6 `--add-dir`

用途：给当前会话增加额外工作目录访问权。

示例：

```bash
claude --add-dir ../shared-lib
```

适合场景：

- monorepo 外还有共享库。
- 需要同时阅读前端和后端两个目录。

注意：

- 官方文档提醒，`--add-dir` 主要授予文件访问；并非所有 `.claude/` 配置都会从附加目录自动发现。
- 多目录上下文很容易膨胀，要明确只读哪些路径。

### 3.7 `--debug` / `--debug-file`

用途：排查 Claude Code 自身问题、MCP 问题、hooks 问题。

示例：

```bash
claude --debug "api,mcp"
claude --debug-file ./claude-debug.log
```

注意：

- debug 日志可能包含路径、命令、上下文片段。
- 不要直接公开上传日志。

### 3.8 `--max-budget-usd`

用途：在 print mode 中设置预算上限。

示例：

```bash
claude -p "Analyze this repository and output a risk report" --max-budget-usd 5.00
```

适合场景：

- 自动化大任务。
- 批处理。
- 防止 CI 中成本失控。

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
- 复杂架构判断、深度调试时临时切 Opus。
- 切换模型会让后续响应重新读上下文，长会话可能有成本影响。
- v2.1.144 起 `/model` 默认仅作用于当前会话；在模型选择器里按 `d` 才把所选模型设为后续新会话的默认值。这意味着临时切 Opus 不会污染团队成员或其他项目的默认。

### 4.7 `/effort`

用途：调整推理努力程度。

示例：

```text
/effort high
/effort auto
```

适合场景：

- 疑难 bug、架构分析、跨模块重构用 high。
- 简单文档、格式调整用低或默认。

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

### 4.13 `/usage`、`/cost`、`/stats`

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
### 4.14 `/mcp`

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

### 4.15 `/agents`

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

### 4.16 `/review`

用途：本地审查当前改动或 PR。

示例：

```text
/review
/review 123
```

推荐追加约束：

```text
只报告会导致 bug、安全问题、数据损坏或测试缺口的发现。每条必须有文件和行号。
```

### 4.17 `/security-review`

用途：审查当前分支 pending changes 的安全问题。

示例：

```text
/security-review
```

适合场景：

- 登录、鉴权、权限、输入处理、SQL、XSS、secret、文件上传等改动。
- 合并前做最后一道安全检查。

### 4.18 `/diff`

用途：查看当前未提交改动和每轮改动 diff。

示例：

```text
/diff
```

实战用法：

```text
请基于 /diff 结果解释每个文件为什么被修改，并指出有没有无关改动。
```

### 4.19 `/rewind`

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

### 4.20 `/run`、`/verify`、`/run-skill-generator`

用途：运行项目并验证改动是否在真实应用里生效。官方技能页说明 `/run` 和 `/verify` 会根据项目类型推断启动方式；复杂项目可用 `/run-skill-generator` 记录项目启动配方。

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

### 4.21 `/batch`

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

### 4.22 `/background`、`/tasks`

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

### 4.23 `/hooks`

用途：查看已配置 hooks。

示例：

```text
/hooks
```

适合场景：

- 排查为什么工具调用被拦截。
- 确认格式化、测试、安全扫描 hook 是否生效。
- 分辨 hook 来自 user/project/local/plugin/session/built-in 哪个层级。

### 4.24 `/output-style`

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

### 4.25 `/fast`

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

### 4.26 `/focus`

用途：切换 focus view，只显示最近提示、工具调用摘要和最终响应。官方 commands 页面说明它只在 fullscreen rendering 中可用。

示例：

```text
/focus
```

适合：

- 长会话里减少视觉噪音。
- 只关注最后一轮结果。
- 配合 `/context` 判断是否需要压缩。

### 4.27 `/loop`

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

### 4.28 `/schedule`

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

### 4.29 `/install-github-app`

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

### 4.30 `/ultraplan`

用途：在 ultraplan session 中起草计划，在浏览器中 review，然后远程执行或发回 terminal。

示例：

```text
/ultraplan redesign the billing retry system with migration and rollback plan
```

适合：

- 复杂设计。
- 需要先 review 计划再执行的任务。
- 跨终端和 Web 协作。

### 4.31 `/ultrareview`

用途：在云沙箱中运行更深的多 agent code review。官方 commands 页面说明 Pro/Max 有免费次数，之后需要 usage credits。

示例：

```text
/ultrareview 123
```

适合：

- 重要 PR 合并前。
- 安全敏感变更。
- 复杂跨模块 diff。

### 4.32 `/terminal-setup`、`/scroll-speed`、`/tui`

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

### 4.33 `/theme`、`/statusline`、`/keybindings`

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

### 4.34 `/web-setup`、`/remote-control`、`/teleport`

用途：连接 Claude Code Web、远程控制和在 Web/terminal 之间迁移 session。

示例：

```text
/web-setup
/remote-control
/teleport
```

适合：

- 在浏览器和 terminal 间切换。
- 远程继续某个 session。
- 让 cloud routines 或 web sessions 访问 GitHub 账号。

### 4.35 `/insights`、`/team-onboarding`

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

### 4.36 `/doctor` 和 `/debug`

用途：诊断安装、登录、配置、运行时问题。

示例：

```text
/doctor
/debug MCP server fails to connect
```

建议：

- 安装或登录异常先 `/doctor`。
- 复现性问题再 `/debug`，注意日志隐私。

## 5. 自定义 Skills / Commands

新版官方文档把 custom slash commands 并入 skills 体系：`.claude/commands/*.md` 仍可用，但推荐使用 `.claude/skills/<name>/SKILL.md`，因为 skills 支持 supporting files、frontmatter、按需加载和更丰富控制。

### 5.1 何时创建 skill

适合：

- 每天重复的 PR review。
- 固定格式的发布检查。
- 安全扫描流程。
- 项目专属运行/验证流程。
- 复杂但低频的迁移步骤。

不适合：

- 一次性任务。
- 项目长期事实。长期事实放 `CLAUDE.md`。
- 只需要一句话的简单提示。

### 5.2 最小 skill 示例：变更总结

目录：

```text
.claude/skills/summarize-changes/
└── SKILL.md
```

内容：

```markdown
---
name: summarize-changes
description: Summarize current git changes and flag risky edits.
allowed-tools: Bash(git diff:*), Bash(git status:*), Read, Grep, Glob
---

请总结当前工作区改动：
1. 修改文件
2. 行为变化
3. 风险
4. 建议测试

先读取 git status 和 git diff，再输出结论。
```

使用：

```text
/summarize-changes
```

### 5.3 带参数的 skill

```markdown
---
name: fix-issue
description: Fix a GitHub issue by number using project workflow.
argument-hint: [issue-number]
allowed-tools: Bash(gh issue view:*), Bash(git status:*), Read, Grep, Glob, Edit
---

Issue number: $ARGUMENTS

步骤：
1. 读取 issue。
2. 复述问题和验收标准。
3. 定位代码和测试。
4. 写最小失败测试。
5. 实现最小修复。
6. 总结验证。
```

使用：

```text
/fix-issue 123
```

## 6. Hooks 实战

Hooks 让 Claude Code 在工具调用前后运行脚本、HTTP、MCP tool、prompt 或 agent。官方 hooks reference 强调：`PreToolUse` 可在工具执行前阻止或询问；`PostToolUse` 只能在工具执行后反馈，不能撤销已发生的副作用。

### 6.1 写文件后自动检查风格

`.claude/settings.json`：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/check-style.sh",
            "args": [],
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

适合：

- 格式检查。
- lint 提醒。
- 生成文件保护。

### 6.2 阻止危险命令

思路：用 `PreToolUse` 匹配 `Bash`，检查命令是否包含 `rm -rf`、`git push`、生产部署等。

项目规则：

```text
任何删除、推送、部署、迁移命令必须人工确认。Hook 应默认 deny。
```

注意：

- 阻止必须发生在 `PreToolUse`，因为 `PostToolUse` 已经执行完了。
- Windows 项目可以按官方 hooks 文档使用 PowerShell hook。

### 6.3 测试输出瘦身

官方成本文档建议用 hooks 或 skills 预处理大日志，避免 Claude 读完整 10000 行日志。示例思路：

```bash
pytest 2>&1 | grep -A 5 -E '(FAIL|ERROR|error:)' | head -100
```

适合：

- 大型测试套件。
- CI 日志。
- 高频失败排查。

## 7. MCP 实战

### 7.1 GitHub MCP / GitHub CLI

可做：

- 列 issue。
- 读 PR 评论。
- 查看 CI 状态。
- 生成 review。

更省上下文的替代：

- 官方成本文档建议：有 CLI 时，`gh`、`aws`、`gcloud`、`sentry-cli` 这类 CLI 往往比 MCP server 更省上下文。

建议：

- 高频、结构化、需要 OAuth 的场景用 MCP。
- 简单查询优先 CLI。

### 7.2 Sentry / 日志 / 监控

用法：

```text
请通过 Sentry MCP 查询最近 24 小时 auth service 的 top error，按影响用户数排序，并为第一条错误定位代码路径。
```

安全边界：

- 不要暴露用户 PII。
- 不要让 Claude 自动改生产配置。
- 只把必要错误摘要送进上下文。

### 7.3 数据库

推荐：

- 只读账号。
- 只允许 schema 查询和 explain。
- 禁止写操作。

提示词：

```text
只查询 schema 和 explain plan，不执行 INSERT/UPDATE/DELETE/DDL。
```

## 8. GitHub Actions 实战

官方 Claude Code GitHub Actions 文档说明，Action 可用 `prompt`、`claude_args`、`anthropic_api_key`、`github_token`、`trigger_phrase` 等参数。

### 8.1 PR 自动审查

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "/review"
          claude_args: "--max-turns 5"
```

建议：

- review 只作为辅助，不自动合并。
- 对外部 fork PR 更谨慎。
- 限制 token、权限和回合数。

### 8.2 CI 失败修复

```yaml
name: Claude CI Triage
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  triage:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Analyze the failed CI logs, identify the first root-cause error, and propose the smallest fix. Do not skip tests."
          claude_args: "--max-turns 3"
```

注意：

- 给 Action 的 GitHub token 最小权限。
- 不允许它泄露 secrets。
- 自动修复 PR 必须人工 review。

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

## 10. 端到端案例

### 10.1 新仓库接入 Claude Code

目标：让 Claude Code 理解项目并建立长期规则。

步骤：

```bash
cd my-project
claude
```

会话内：

```text
/init
请生成精简 CLAUDE.md，只包含项目事实、命令、边界和安全规则。
```

然后：

```text
/permissions
```

配置：

- 允许读文件和搜索。
- 编辑前确认。
- 禁止删除、推送、部署、迁移。

最后：

```text
/memory
```

精修 `CLAUDE.md`。

验收：

- `CLAUDE.md` 少于 200 行。
- 包含测试命令。
- 包含禁止事项。
- 没有空泛人格描述。

### 10.2 修复 bug

目标：修复登录 token 过期重复跳转。

```text
/plan fix token-expired redirect loop
请先计划，不修改代码。计划包含相关文件、最小失败测试、修复点和验证命令。
```

确认后：

```text
按计划执行。先写失败测试，再做最小实现。不要重构 auth 模块。
```

完成后：

```text
/diff
请解释 diff，并说明每个改动对应哪个验收点。
```

验收：

- 失败测试先失败后通过。
- 只改 auth redirect 相关代码。
- 总结运行的测试命令。

### 10.3 大型迁移

目标：把旧 API client 迁移到新 client。

```text
/batch migrate all usages of legacyApiClient to newApiClient
```

前置要求：

- 仓库测试可靠。
- 模块边界清楚。
- 工作区干净。
- 有 review 人员。

谨慎替代方案：

```text
/plan migrate legacyApiClient in the billing module only
```

建议先迁一个模块，确认模式稳定后再扩大。

### 10.4 PR Review

本地：

```text
/review
```

补充：

```text
只报告会导致 bug、安全问题、数据丢失、兼容性破坏或测试缺口的问题。每条必须有证据和文件位置。
```

CI：

```yaml
prompt: "/review"
claude_args: "--max-turns 5"
```

验收：

- 有严重问题时阻止合并。
- 无问题时说明剩余风险。
- 不输出泛泛风格建议。

### 10.5 前端真实验证

目标：修改设置页布局并验证浏览器表现。

```text
/run
```

如果启动失败：

```text
/run-skill-generator
```

改完后：

```text
/verify
```

验收：

- 应用真实启动。
- 页面可访问。
- 改动可见。
- 没有明显布局溢出。

## 11. 命令选择速查表

| 目标 | 首选命令 | 备注 |
|---|---|---|
| 第一次进入项目 | `claude` + `/init` | 先只读，再生成 memory |
| 看可用命令 | `/help` | 以当前版本为准 |
| 修复杂 bug | `/plan` | 先计划再执行 |
| 清理无关上下文 | `/clear` | 切换任务时用 |
| 设置可验证完成条件并自动继续 | `/goal` | 长任务用，条件要可验证 |
| 保留任务但压缩历史 | `/compact` | 长会话用 |
| 看上下文占用 | `/context` | 成本和上下文排查 |
| 看成本 | `/usage` | `/cost`、`/stats` 为别名 |
| 管权限 | `/permissions` | 默认最小权限 |
| 管模型 | `/model`、`/effort` | 按任务难度切换 |
| 管 MCP | `claude mcp`、`/mcp` | CLI 配置，会话内查看 |
| 管 subagents | `/agents`、`claude agents` | 会话内配置，CLI 查看后台 |
| 本地审查 | `/review`、`/security-review` | 合并前使用 |
| 看 diff | `/diff` | 检查是否改多 |
| 回退 | `/rewind` | 走错方向时用 |
| 真实运行验证 | `/run`、`/verify` | 前端/CLI/TUI 很有用 |
| 大规模并行 | `/batch` | 只在测试可靠时用 |
| 自动检查 | hooks | 用于格式、测试、安全 |
| 定期轮询 | `/loop` | 等待部署、CI、队列状态 |
| 云端定时任务 | `/schedule` | routines，注意权限 |
| 深度计划 | `/ultraplan` | 先在浏览器审计划再执行 |
| 深度审查 | `/ultrareview` | 重要 PR 合并前 |
| GitHub App 接入 | `/install-github-app` | 配置仓库集成 |
| 终端体验 | `/terminal-setup`、`/scroll-speed`、`/tui` | 快捷键、滚动、fullscreen |

## 12. 自动化、SDK 与云端能力补充案例

### 12.1 Auto mode：减少提示但不放弃边界

Auto mode 的官方定位是：通过后台安全分类器审查工具调用，减少人工权限提示。它适合方向明确、风险较低、工作区边界清楚的任务。

示例：

```bash
claude --permission-mode auto
```

适合：

- 批量补测试。
- 小范围重构。
- 文档同步。
- 低风险 lint/test 修复。

不适合：

- 数据库迁移。
- 生产部署。
- 删除文件。
- secret、权限、支付、鉴权改动。

配置思路：

```json
{
  "autoMode": {
    "environment": ["Trust this repository and its configured remotes"],
    "soft_deny": ["$defaults", "Ask before changing CI or deployment files"],
    "hard_deny": ["$defaults", "Never print secrets or run production migrations"]
  }
}
```

### 12.2 Routines / Schedule：定期任务

Routines 适合把“定期检查”变成云端自动任务，例如：

```text
/schedule every Monday morning summarize new GitHub issues and label likely bugs
```

建议用途：

- 每日 issue triage。
- 每周依赖更新报告。
- 每月文档过期链接检查。

风险：

- 不要让 routine 自动合并 PR。
- 不要让 routine 修改生产配置。
- 对需要组织数据的 routine 做权限最小化。

### 12.3 Claude Code SDK：做自己的 agent

Claude Code SDK 适合把 Claude Code 的 agent harness 用在程序化场景中。

适合构建：

- CI review bot。
- SRE incident assistant。
- 安全审计 bot。
- 文档同步 agent。
- Oncall triage 工具。

最小设计原则：

- 输入输出结构化，例如 JSON。
- 权限白名单化。
- 日志中不输出 secret。
- agent 的每次行动可审计。

### 12.4 Plugin Marketplace：团队分发能力

当一个 skill 从个人习惯变成团队流程，就应该考虑插件化。

适合打包进 plugin：

- `review-before-commit`
- `focused-test-runner`
- `release-checklist`
- `security-gate`
- 项目专属 hooks
- 项目专属 subagents

不适合打包：

- 一次性 prompt。
- 未验证的社区脚本。
- 依赖个人账号或私有路径的配置。

### 12.5 Ultrareview / Ultraplan：云端深度能力

`/review` 适合本地快速审查，`/ultrareview` 适合重要 PR 合并前的云端多 agent 深度审查。

推荐流程：

```text
本地实现 → /review 快速修正 → 测试通过 → /ultrareview 做合并前审查
```

`/ultraplan` 则适合在大改造前先做深度计划。它不是让 Claude 替你决定产品方向，而是把工程风险、分阶段策略、测试和回滚方案写清楚。

### 12.6 Worktree + Subagent：并行而不冲突

自 v2.1.50 起，Claude Code 把 git worktree 提升为一等公民，并与 subagent 隔离机制打通。最常见的三种用法：

**会话级 worktree。** 用 `--worktree`（或 `-w`）启动 Claude 时，会在 `.claude/worktrees/<name>/` 下新建一个 worktree 和同名分支，把这次会话彻底锁在那份独立工作树里：

```bash
claude --worktree fix-login
claude -w refactor-billing
```

默认基线是 `origin/HEAD`（要求 fetch 成功），保证从远端干净起点切出；如果希望基于本地未推送的工作 HEAD，设置 `worktree.baseRef: "head"`。还可以从 PR 直接开 worktree：

```bash
claude -w "#1234"
claude -w https://github.com/org/repo/pull/1234
```

Claude Code 会 fetch `pull/<n>/head` 并落到 `.claude/worktrees/pr-<n>/`。

**Subagent 级 worktree。** 在自定义 subagent frontmatter 里加 `isolation: worktree`：

```yaml
---
name: feature-builder
tools: [Read, Edit, Bash]
isolation: worktree
model: sonnet
---
```

每次调用这个 subagent 都会拿到独立 worktree，跑完无改动会自动清理，有改动则保留路径和分支让你 review/merge。两个 `feature-builder` 同时跑也不会互相覆盖。

**非 Git VCS。** Mercurial/Perforce/SVN 团队可以配置 `WorktreeCreate` / `WorktreeRemove` hooks 替换默认 git 逻辑，`--worktree` 和会话内的 worktree 请求会改走 hook。

实战要点：

- 多 agent 同时改文件就用 worktree，无例外，setup 成本几秒，撞车成本是数小时。
- 把 worktree 清理纳入日常流程：每周 `git worktree prune` 一次，配合 hook 提醒空闲目录。
- 启动并行前花 30 秒检查共享依赖（config、migration、shared util），避免“看起来独立其实串联”的任务。
- subagent 不能再起 subagent；多层编排用 Agent Teams（实验功能，需 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`）或回到主会话调度。

来源：官方 [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees)、Claude Directory worktree 指南、social-thread 实战观察。

### 12.7 `/radio`：长会话背景声

2026-05-08 起 `/radio` 成为内置命令，会在浏览器打开 Anthropic 自家的 Claude FM lo-fi 频道，用于陪伴长任务。社区里另有一个 `claude-music` 插件（Kenneth Leung），通过第三方 marketplace 安装，命令 `/play`、`/vibe`，支持 lofi/jazz/ambient/synthwave，自动在 mpv、ffplay、afplay 间选播放器，依赖 SomaFM 与 YouTube live 流。

注意区分：

- `/radio` 是官方命令，无需安装。
- `/play`、`/vibe` 来自第三方插件，需自行 vet 来源与依赖。

### 12.8 国产模型与多 Provider 切换

中文社区的常见诉求是用 Claude Code 的 harness 接智谱、Kimi、ModelScope 等模型，主要走两条路：

| 工具 | 角色 | 链接 |
|---|---|---|
| Claude Code Router (CCR) | 中间层 proxy，把 Claude Code 的请求路由到 OpenAI 兼容接口的国产模型 | 见 LinuxDO / V2EX 相关讨论 |
| CCSwitch / cc-switch | 多 provider/账号配置切换器，支持快速换 `ANTHROPIC_BASE_URL` 与凭据 | 见 LinuxDO `cc-switch` 主题 |

注意事项：

- 国产模型不一定支持 Claude 的 tool use schema、prompt cache、thinking、computer use 等特性，CCR 通常只能覆盖最基础的对话和工具调用。
- 切换 provider 后 plugin、skills 的触发表现会变（参考 LinuxDO `superpowers 和 cc-switch` 主题）。
- 公司项目仍建议优先用官方 API；本地实验可用 CCR + 国产模型节省成本。
