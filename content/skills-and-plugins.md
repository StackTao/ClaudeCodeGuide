# Claude Code 必备 Skills、插件与增强工作流指南

> 版本：2026-05-21  
> 核心修订：本版把 Superpowers、GSD、Codex plugin、last30days、Context7、Code Simplifier 等“增强型工作流插件”放到中心位置。官方 marketplace 插件仍重要，但不再只按官方分类罗列。同步纳入 v2.1.144 / v2.1.145 起 `/plugin` 的依赖强制、安装前能力预览、上下文成本估算等新特性。

## 1. 先给结论：最值得优先研究的 12 个

| 优先级 | 名称 | 类型 | 解决的问题 | 适合谁 |
|---|---|---|---|---|
| S | Superpowers | 方法论插件 / skills framework | 让 Claude 按 brainstorming、计划、TDD、subagent review、系统调试流程工作 | 严肃软件开发、复杂功能、团队工程 |
| S | 语言 LSP 插件 | 官方插件 | 跳转定义、查引用、类型诊断 | 所有代码项目 |
| S | GitHub 插件 | 官方集成 | issue、PR、CI、review 工作流 | GitHub 项目 |
| A | Code Simplifier | 官方/社区高频插件 | 反过度设计，简化最近改动 | AI 代码清理 |
| A | Code Review / PR Review Toolkit | 官方/社区插件 | 代码审查、PR 风险发现 | 团队合并前 |
| A | Context7 | MCP / 插件 | 拉取最新库文档，减少 API 幻觉 | 前端、后端、框架更新快的项目 |
| A | GSD / Get Shit Done | 工作流系统 | 上下文隔离、spec-driven、wave execution | 大任务、长会话、重自动化 |
| A | OpenAI Codex Plugin | 多 agent 插件 | 用 Codex 做 second pass、adversarial review、rescue | 重要改动复核 |
| A | last30days | 研究 skill | 搜索最近 30 天 Reddit/X/HN/YouTube/web 热点 | 调研、选型、市场/AI 生态跟踪 |
| B | document-skills | 官方/Anthropic skills | PDF、DOCX、PPTX、XLSX 等办公文档处理 | 文档、研究、运营 |
| B | Trail of Bits security skills | 安全 skills | 安全审计、漏洞研究、代码安全检查 | 安全敏感项目 |
| B | Figma / Frontend Design / Browser QA | 插件 + skills + MCP | 设计稿到实现、视觉验证 | 前端项目 |

我的建议：

- **只装 3 个起步**：Superpowers + 语言 LSP + GitHub。
- **做前端再加**：Context7 + Frontend Design + Browser/Playwright 验证。
- **做团队协作再加**：PR Review Toolkit + Code Simplifier。
- **做高风险改动再加**：Codex plugin + Trail of Bits security skills。
- **做趋势/资料调研再加**：last30days。

## 2. 为什么 Superpowers 必须单独讲

Superpowers 不是普通 prompt，也不是一个“多几个命令”的小插件。它是一个软件工程方法论插件，作者是 Jesse Vincent，官方 Claude 插件页对它的描述是：让 Claude 学会 brainstorming、subagent development with code review、debugging、TDD、skill authoring。

官方插件页给出的核心能力包括：

- TDD：强制 red-green-refactor，测试先失败再实现。
- 系统调试：先根因分析，再假设验证，再修复。
- Brainstorming：编码前用问题澄清需求、探索方案。
- Subagent-driven development：按任务派发子 agent，并做 review。
- Writing skills：教 Claude 编写和测试新的 skills。

安装：

```text
/plugin install superpowers@claude-plugins-official
/reload-plugins
```

备用 marketplace：

```text
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
/reload-plugins
```

官方/仓库来源：

- https://claude.com/plugins/superpowers
- https://github.com/obra/superpowers

## 3. Superpowers 的实际工作流

Superpowers 仓库 README 描述的基本流程是：

1. **brainstorming**：写代码前先澄清需求、探索方案、生成设计文档。
2. **using-git-worktrees**：设计确认后创建隔离 worktree 和分支。
3. **writing-plans**：把设计拆成 2-5 分钟一个的小任务，每个任务写清文件、代码、测试命令、期望结果。
4. **subagent-driven-development / executing-plans**：按计划执行，每个任务可由 fresh subagent 完成，并经过 review。
5. **test-driven-development**：先写失败测试，确认失败，写最小实现，确认通过，再提交。
6. **requesting-code-review / receiving-code-review**：按严重程度处理 review 发现。
7. **finishing-a-development-branch**：验证测试，决定 merge/PR/保留/丢弃 worktree。

典型使用方式：

```text
I want to build a new feature: users can export invoices as PDF.
Use Superpowers workflow. Start with brainstorming. Do not modify files until the design is approved.
```

或者直接调用技能：

```text
/brainstorming
/writing-plans
/execute-plan
```

注意：Superpowers 的强项是“流程纪律”。如果只是改一个 typo，它会显得重；如果是中大型功能，它能显著减少“Claude 直接冲进去写错方向”的问题。

## 4. Superpowers 适合什么，不适合什么

适合：

- 中大型功能开发。
- 需要测试覆盖的 bug 修复。
- 多文件重构。
- 需要设计确认的架构改造。
- 团队希望统一 AI 编程流程。
- 容易被 Claude 过度发挥的任务。

不适合：

- 小文案、注释、typo。
- 已经非常明确的一行修复。
- 环境问题、依赖安装、平台差异排查这类“边跑边发现”的任务。
- 需求本身错误但没人 review 的任务。Superpowers 会忠实执行错误 spec。

Builder.io 的实战文章对 Superpowers 的评价很典型：它通过 brainstorm、worktree、plan、execute/review 四道门，把“快但乱”的 AI 编程变成“先签蓝图再施工”。文章也提醒它有局限：环境调试不一定适合预先规划，错误 spec 会把错误传导到 plan。

## 5. Superpowers 的风险和使用建议

风险：

- 流程重，简单任务会慢。
- 自动触发不总是稳定，社区有反馈需要显式要求 Claude 使用相关 skill。
- 如果安装多个相似 workflow 插件，可能出现指令冲突。
- 子 agent 和 review 会增加 token 成本。
- fork 版本很多，安装前要确认来源。

推荐规则：

```text
小任务：原生 Claude Code。
中大型功能：Superpowers。
超长项目/多阶段自动化：GSD 或 Superpowers + 手动计划。
关键 PR：Superpowers + Code Review/Codex second pass。
```

建议写入 `CLAUDE.md`：

```markdown
## Workflow Rules
- For non-trivial feature work, use Superpowers brainstorming before editing.
- For bug fixes, use TDD: write or identify a failing test before implementation.
- For multi-file changes, produce a plan and get approval before editing.
- For trivial edits, avoid heavy workflow overhead.
```

## 6. GSD / Get Shit Done：更偏“上下文工程 + 自动执行”

GSD 是另一个社区高频提到的增强系统。和 Superpowers 相比，它更强调：

- context rot 管理。
- spec-driven development。
- fresh context / wave execution。
- backlog、roadmap、phase、todo、audit、review、release 等完整工程流。

社区资料常把它描述为 `Discuss → Plan → Execute → Verify` 的系统。部分插件索引显示它包含大量 commands 和 agents，适合把项目拆成 roadmap、milestone、phase 后自动推进。

安装线索会随仓库变化，常见方式包括：

```text
npx get-shit-done-cc@latest
```

或插件索引中的：

```text
npx claudepluginhub glittercowboy/get-shit-done --plugin get-shit-done
```

推荐判断：

| 任务 | Superpowers | GSD |
|---|---|---|
| 中型功能 | 更推荐 | 可用但可能重 |
| 大型、多阶段项目 | 可用 | 更适合 |
| TDD 强约束 | 更强 | 通常较轻 |
| 上下文隔离 | 有 worktree/subagent | 更强调 |
| 自动推进很多阶段 | 较保守 | 更激进 |
| 新手上手 | 更清晰 | 需要更多理解 |

注意：

- Reddit 上既有高度评价，也有人认为 GSD/Superpowers 对小任务是“训练轮”。
- GSD 类工具会带来大量命令、agents、hooks，安装前必须审查。
- 如果你还没有稳定测试和项目说明，先不要让它长时间自动执行。

## 7. OpenAI Codex Plugin：让第二个 agent 做复核

GitHub：`openai/codex-plugin-cc`

用途：

- 在 Claude Code 内调用 Codex。
- 对当前 diff 做 second pass。
- 做 adversarial review。
- Claude 卡住时让 Codex rescue。

安装线索：

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@codex-plugin-cc
/reload-plugins
/codex:setup
```

常用命令：

```text
/codex:review
/codex:adversarial-review
/codex:rescue
/codex:status
/codex:result
/codex:cancel
```

推荐用法：

```text
先让 Claude 完成实现和测试。
再运行 /codex:adversarial-review 审查当前 diff。
只接受有文件、行号、可复现证据的问题。
```

风险：

- 需要额外认证和 Codex CLI/Node 环境。
- 两个 agent 互相修可能无限循环。
- 不要让 Claude 和 Codex 同时高权限改同一批文件。

## 8. Code Simplifier：反 AI 味和反过度设计

官方 Superpowers 插件页的 related plugins 中列出 Code Simplifier，描述是简化和精炼最近修改的代码，同时保持功能和一致性。X 上也有围绕 Boris/Claude Code 团队的转帖提到它。

安装线索：

```text
/plugin marketplace update claude-plugins-official
/plugin install code-simplifier@claude-plugins-official
/reload-plugins
```

使用方式：

```text
Use Code Simplifier on the current diff.
Preserve behavior and tests.
Remove unnecessary abstractions, speculative flexibility, and AI-ish boilerplate.
Do not change public APIs.
```

适合：

- Claude 写出过度抽象。
- 一个简单改动膨胀成很多 helper。
- UI 文案、注释、错误处理太啰嗦。
- review 前压缩 diff。

## 9. Context7：框架文档实时注入

Context7 是社区和官方相关页里经常出现的 MCP/插件，用于拉取特定版本库文档和代码示例，减少模型凭旧知识写错 API。

适合：

- Next.js、React、Vue、Svelte、Supabase、Prisma 等版本变化快的项目。
- 写集成代码。
- 新库不熟时先查官方文档。

提示词：

```text
Before implementing, use Context7 to check the current docs for [library/framework].
Cite the exact API or option you rely on.
Do not use deprecated APIs.
```

注意：

- Context7 解决“库文档新旧”问题，不解决项目本地约定。
- 对关键行为仍要跑测试。

## 10. Code Review / PR Review Toolkit

用途：

- 本地审查当前 diff。
- PR review。
- 安全、兼容性、测试缺口检查。
- 让 review 输出按严重程度排序。

推荐搭配：

- Superpowers：执行前后做流程 gate。
- Codex plugin：第二模型 adversarial review。
- GitHub plugin：读取 PR、评论和 CI。

审查 prompt：

```text
Review the current diff.
Only report evidence-backed issues that can cause bugs, security problems, data loss, compatibility breaks, or missing tests.
Include file and line. Avoid style-only comments.
```

## 11. last30days：追踪最近 30 天社区情报

last30days 是社区高频传播的 research skill。它的定位是：围绕一个主题搜索最近 30 天 Reddit、X、YouTube、TikTok、HN、GitHub、web 等公开内容，整理社区正在讨论什么。

安装线索：

```text
/plugin marketplace add mvanhorn/last30days-skill
/plugin install last30days@last30days-skill
/reload-plugins
```

或：

```text
claude install-skill https://github.com/mvanhorn/last30days-skill
```

适合：

- 查 Claude Code 新命令、新插件。
- 查某个技术栈最近坑点。
- 查 AI 工具生态趋势。
- 做市场/内容研究。

注意：

- 它会访问大量外部内容，可能慢且消耗高。
- 结果应作为线索，核心事实还要回到官方文档/GitHub。

## 12. document-skills / Anthropic skills

Anthropic 官方 skills 仓库常被社区推荐，尤其是文档和办公类：

- PDF。
- DOCX / Word。
- PPTX。
- XLSX / spreadsheet。
- skill-creator / example-skills。

安装线索：

```text
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

适合：

- 报告、合同、简历、课件、表格处理。
- 把办公文档转成结构化 Markdown。
- 学习 skill 写法。

注意：

- 处理敏感文档前要确认隐私和权限。
- 生成内容需人工核对事实。

## 13. Trail of Bits Security Skills

GitHub：`trailofbits/skills`

用途：

- 安全审计。
- 漏洞研究。
- fuzzing / static analysis workflow。
- 安全 checklist。

适合：

- 鉴权、权限、输入验证、SQL、XSS、文件上传、加密、依赖安全。
- 合并前安全检查。
- 安全团队构建内部审计流程。

安装前检查：

- 是否运行外部脚本。
- 是否读取本地 secret。
- 是否需要网络。
- 是否执行 fuzz/test 命令。
- 是否适合你的语言栈。

## 14. 前端必备：Frontend Design + Figma + Browser QA

前端项目推荐组合：

- `typescript-lsp`。
- `figma` plugin。
- `frontend-design` / Frontend Design 插件。
- Browser/Playwright 验证。
- Context7。

工作流：

```text
Figma/design input
→ Superpowers brainstorming 先定需求和约束
→ Context7 查当前框架 API
→ Frontend Design 生成 UI
→ /run 启动项目
→ Browser/Playwright 截图验证
→ Code Simplifier 清理 diff
→ PR Review Toolkit 审查
```

注意：

- 不要用纯描述替代截图验证。
- 不要克隆无授权素材。
- 前端 UI 要真实跑起来再验收。

## 15. Claude Radar / Quickref / Repomix

这类不是“写代码流程插件”，而是辅助你管理上下文和配置。

### Claude Radar / Quickref

用途：

- 扫描本地 Claude 配置。
- 列出 installed skills、agents、MCP servers、plugins。
- 生成 cheat sheet。

风险：

- 会读取本地配置路径。
- 可能暴露 MCP 名称、插件名、组织信息。
- 不要公开上传生成结果。

### Repomix / repo packing

用途：

- 把仓库打包成 AI 友好的上下文。
- 给审查模型或外部 agent 分析。
- 生成架构快照。

风险：

- 容易把 secret、客户数据、私有代码一并打包。
- 大仓库直接全量打包会浪费上下文。
- 优先打包相关模块。

## 16. 官方 LSP 插件：最稳的基础设施

如果项目是代码仓库，语言 LSP 插件几乎是第一优先级。

| 语言 | 插件 | 依赖 |
|---|---|---|
| TypeScript | `typescript-lsp` | `typescript-language-server` |
| Python | `pyright-lsp` | `pyright-langserver` |
| Go | `gopls-lsp` | `gopls` |
| Rust | `rust-analyzer-lsp` | `rust-analyzer` |
| Java | `jdtls-lsp` | `jdtls` |
| C/C++ | `clangd-lsp` | `clangd` |
| C# | `csharp-lsp` | `csharp-ls` |
| Kotlin | `kotlin-lsp` | `kotlin-language-server` |
| PHP | `php-lsp` | `intelephense` |
| Swift | `swift-lsp` | `sourcekit-lsp` |

安装：

```text
/plugin install typescript-lsp@claude-plugins-official
/reload-plugins
```

## 17. GitHub / Sentry / Slack / Notion / Linear / Figma

这些外部集成不是“必全装”，而是按团队工具链选。

| 插件 | 必要性 | 建议 |
|---|---|---|
| GitHub | 高 | issue、PR、CI、review 基础设施 |
| Sentry | 中高 | 生产问题定位很有用 |
| Figma | 中高 | 前端团队非常有用 |
| Linear/Jira/Atlassian | 中 | 需求和任务管理 |
| Notion | 中 | 知识库和文档 |
| Slack | 中低 | 状态同步，注意隐私 |
| Supabase/Firebase/Vercel | 按需 | 云服务和部署，写权限要谨慎 |

安全原则：

- 先只读。
- 最小权限。
- 外部输入视为不可信。
- 不让 Claude 自动改生产配置。

## 18. 大包插件：谨慎

Everything Claude Code、Oh My Claude Code、各种 “100 skills pack” 很诱人，但风险也最大。

优点：

- 一次装很多技能。
- 适合探索生态。
- 能快速发现好用 workflow。

风险：

- 指令冲突。
- 上下文成本增加。
- 很难审查每个 skill/hook/MCP。
- 可能包含过时或低质量 prompt。

建议：

- 在临时环境试用。
- 用 1-2 周后只保留真正高频的。
- 不要直接把大包提交到团队项目。

## 19. 安装前安全检查

安装任何第三方 plugin/skill 前检查：

- 来源是否是官方 marketplace、知名 GitHub、还是陌生仓库。
- 是否有 `.claude-plugin/plugin.json`。
- `Will install` 里包含哪些 skills、agents、hooks、MCP/LSP servers。
- 是否执行 shell 命令。
- 是否有 hooks，尤其是 `PreToolUse` 和 `PostToolUse`。
- 是否读取 `.env`、home、SSH key、token。
- 是否联网下载脚本。
- 是否混淆代码或 base64 大块。
- 是否近期维护。
- 是否有 issue 报告安装失败或自动触发不稳定。

安装范围：

| 范围 | 用途 | 建议 |
|---|---|---|
| User | 个人长期工具 | 最常用 |
| Local | 某项目个人实验 | 试用推荐 |
| Project | 团队共享 | 需要 review |
| Managed | 公司统一 | 管理员维护 |

## 20. 推荐组合配方

### 20.1 稳健工程默认组合

- Superpowers。
- 语言 LSP。
- GitHub。
- Code Simplifier。
- PR Review Toolkit。

适合：大多数严肃代码项目。

### 20.2 高风险 PR 组合

- Superpowers。
- Code Review / PR Review Toolkit。
- Codex plugin adversarial review。
- Trail of Bits security skills。
- GitHub + CI 日志。

适合：权限、支付、数据迁移、基础设施、安全敏感变更。

### 20.3 大型项目自动化组合

- GSD。
- Superpowers。
- Git worktrees。
- `/goal`。
- LSP。
- focused-test-runner skill。

适合：多阶段迁移、长期 roadmap、上下文容易腐烂的大项目。

### 20.4 前端交付组合

- Superpowers。
- TypeScript LSP。
- Context7。
- Figma。
- Frontend Design。
- Browser/Playwright。
- Code Simplifier。

适合：真实产品 UI，不只是 demo。

### 20.5 调研与内容组合

- last30days。
- document-skills。
- Notion/Atlassian。
- Context7。
- docs-sync skill。

适合：行业调研、文档写作、知识库维护。

## 20.6 安装优先级矩阵

| 场景 | 第一优先级 | 第二优先级 | 暂缓 |
|---|---|---|---|
| 新手个人项目 | 语言 LSP、GitHub | Superpowers、Code Simplifier | GSD、大包插件 |
| 团队工程项目 | Superpowers、PR Review Toolkit、GitHub | Context7、Sentry、security-gate | 自动写生产系统的 MCP |
| 前端产品 | TypeScript LSP、Figma、Browser/Playwright | Context7、Frontend Design、Code Simplifier | 未授权页面克隆工具 |
| 安全敏感项目 | Trail of Bits、security-gate、PR Review | Codex adversarial review | 高权限 auto mode |
| 研究/资料收集 | last30days、document-skills | Notion/Atlassian、Fetch | 未核验短帖结论 |
| 大型迁移 | Superpowers、GSD、worktrees | `/goal`、focused-test-runner | 无测试长时间自动执行 |

安装原则：

- 先装能降低错误率的：LSP、review、test runner。
- 再装能提高上下文质量的：Context7、Figma、Sentry。
- 最后装能提高自动化程度的：GSD、auto mode、routines。
- 大包插件只在隔离环境试用，保留真正高频的组件。

## 20.7 LinuxDO / X / Reddit 可信度判断

社区来源很有价值，但必须分级：

| 类型 | 可采信程度 | 处理方式 |
|---|---|---|
| 官方文档 / 官方插件页 | 高 | 可作为事实写入正文 |
| 官方 GitHub / 活跃仓库 README | 中高 | 可作为安装和能力说明 |
| LinuxDO 长帖 / Reddit 高质量复盘 | 中 | 作为经验和坑点，标注适用环境 |
| X 短帖 / trend 摘要 | 中低 | 作为发现线索，必须交叉验证 |
| 个人夸张效果帖 | 低 | 不写成结论，只保留为待验证 |

写进文档前问三件事：

- 是否有官方或 GitHub 链接支撑？
- 是否说明版本、系统、账号计划和安装方式？
- 是否提到失败模式、成本或权限风险？

## 21. X / Twitter 和社区观察

X / Twitter 和 LinuxDO 上关于插件的高频共识：

- Superpowers 是“让 Claude 像工程师一样工作”的代表性插件。
- GSD 更偏上下文工程和执行系统。
- Codex plugin 是近期热门的 second-pass / rescue 方案。
- last30days 用于追踪最近 30 天社区知识。
- `.claude/` 目录本身越来越像开发者的 AI 工作流资产。
- Skills、hooks、subagents、MCP、plugins 应该分层组织，不要都塞进 `CLAUDE.md`。
- LinuxDO 上多篇帖子把 Superpowers 列为重度 Claude Code 用户必装，但也反复提醒：它对小任务会显得重。
- LinuxDO 的使用反馈显示，cc-switch、opencode、Codex 等工具可能会读取或影响 Claude Code 的 plugin/skill 配置，跨工具共用时要特别检查路径和 enabledPlugins。

同时也有反对意见：

- Superpowers/GSD 对小任务有额外流程成本。
- Skills 自动触发不总是稳定，需要显式调用或改触发描述。
- 大包插件可能造成上下文污染。
- 没有任何插件能绕过 Claude 的额度限制；插件提升质量，不是免费增加 quota。
- everything-claude-code 这类大包可能因为 PreToolUse/quality gate hooks 卡住写入或显著放慢简单任务。
- superpowers 的 using-superpowers 规则在某些模型/工具组合下可能过度触发，简单任务也反复调用 workflow。

## 22. LinuxDO 社区补充：容易漏但很重要

### 22.1 Superpowers：强，但最好按需启用

LinuxDO 上有两类反馈同时成立：

- 正面：Superpowers 的 14 个核心 skills 能把 agent 拉回“先设计、再计划、TDD、debug、review、验证”的工程节奏。
- 负面：日常小任务里，brainstorming/TDD/review 流程可能太重，尤其是模型额度紧张或环境不稳定时。

社区提到的核心 skills 包括：

| 类别 | Skill | 作用 |
|---|---|---|
| 设计 | brainstorming | 先澄清需求、约束和方案 |
| 设计 | writing-plans | 拆成 2-5 分钟小任务 |
| 实现 | test-driven-development | 强制 TDD |
| 实现 | executing-plans | 按计划执行 |
| 实现 | subagent-driven-development | 子 agent 实现和 review |
| 实现 | using-git-worktrees | 隔离工作区 |
| 调试 | systematic-debugging | 根因分析 |
| 调试 | dispatching-parallel-agents | 并行排查 |
| 审查 | requesting-code-review | 发起 review |
| 审查 | receiving-code-review | 接收反馈并验证 |
| 收尾 | verification-before-completion | 完成前验证 |
| 收尾 | finishing-a-development-branch | merge/PR/保留/丢弃决策 |
| 元 | writing-skills | 写新 skill |
| 元 | using-superpowers | 框架入口 |

按需启用思路：

```text
日常 claude：不加载 Superpowers。
复杂任务 claude-sp：只在本次 session 加载 Superpowers。
```

LinuxDO 有用户基于 `--plugin-dir` / `--plugin-url` 写了 `claude-sp` wrapper，让 Superpowers 只在复杂任务里启用。这个思路很实用：减少简单任务的流程噪音，也避免所有会话都带着同一套强约束。

### 22.2 Superpowers 过度触发的处理

LinuxDO 上有人反馈，某些模型/工具组合会过度调用 `using-superpowers`，小改动也反复进入流程。常见处理：

```markdown
## Skill 调用限制

除非用户明确要求，否则不要主动调用 using-superpowers。

允许调用的情况：
1. 用户明确说“使用 Superpowers / using-superpowers”。
2. 用户要求配置 Claude Code、hooks、settings、plugins、skills。
3. 用户明确提到 slash command 或技能名称。
4. 当前任务是中大型功能、复杂 bug、跨文件重构或需要 TDD/review 的任务。
```

如果你愿意牺牲自动触发，可以把 Superpowers 改成显式调用模式。代价是：需要手动说“使用 Superpowers workflow”。

### 22.3 cc-switch / opencode / Codex 混用时的坑

LinuxDO 上多次出现这类问题：

- cc-switch 切 provider 后，Superpowers 看起来“不见了”。
- opencode 可能读取 Claude Code plugin 目录，导致明明删了 skill 仍能看到。
- Codex 或其他模型可能比 Claude 更积极调用 Superpowers。

建议：

- 把常用 plugin 写进 cc-switch 的 common config，而不是只写在某个 provider 下。
- 跨工具共用 `~/.claude`、`~/.agents`、`~/.config/opencode` 时，先确认各工具实际扫描哪些目录。
- 不要在所有工具里全局安装同一套强 workflow；优先按项目或按 session 加载。

示例思路：

```json
{
  "enabledPlugins": {
    "skill-creator@claude-plugins-official": true,
    "superpowers@superpowers-marketplace": true
  }
}
```

### 22.4 GSD、SuperClaude、gstack、everything-claude-code 怎么选

| 工具 | 更像什么 | 优点 | 风险 |
|---|---|---|---|
| Superpowers | 工程纪律框架 | TDD、debug、review、worktree 流程清楚 | 小任务偏重 |
| GSD | 上下文工程和 spec-driven 执行系统 | 适合长项目、wave execution | 命令/agent 多，需审查 |
| SuperClaude | persona/命令/配置框架 | 上手轻，角色和命令丰富 | 可能偏 prompt 配置，质量依赖规则 |
| gstack | 角色化团队工作流 | CEO/EM/QA/Release 等分工清晰 | 很 opinionated，不一定适合所有项目 |
| everything-claude-code | 大型整合包 | 功能全、可学习配置思路 | hooks 可能阻塞、上下文重、简单任务慢 |

LinuxDO 的反馈整体偏向：

- 重度工程任务：Superpowers 优先。
- 想做多阶段自动推进：看 GSD。
- 想用角色和命令轻量增强：看 SuperClaude。
- 想体验“虚拟团队”：看 gstack。
- 想学习完整配置体系：可以研究 everything-claude-code，但不要直接全局上生产项目。

### 22.5 Codex plugin 的社区用法

LinuxDO 上 Codex plugin 的讨论很多，常见玩法：

- Claude/Opus 写计划，Codex 执行或 review。
- Claude Code 中用 `/codex:review` 做只读复核。
- 用 `/codex:adversarial-review` 做挑战式审查。
- Claude 卡住时用 `/codex:rescue`。

安装命令在不同帖子中 marketplace 名称略有差异，应以 GitHub README 为准。常见形态：

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
```

或者：

```text
/plugin install codex@codex-plugin-cc
```

建议：

- 把 Codex 作为第二视角，而不是让两个 agent 同时改代码。
- 对同一任务保留一个主 agent，一个 reviewer。
- 关注线程/上下文是否复用，避免以为 Codex 记住了项目但实际上每次是新上下文。

### 22.6 MCP：Context7、Serena、Chrome DevTools、Tavily

LinuxDO 的 MCP 帖子给了很实用的组合：

- Context7：查框架/SDK 文档。
- Serena：基于 LSP 的符号级搜索和编辑，适合大型代码库。
- Chrome DevTools MCP：浏览器错误调试。
- Tavily：结构化网页搜索。
- Sequential Thinking：复杂问题拆解。
- Fetch：网页转 Markdown。
- Memory / claude-mem：跨会话记忆。

Context7 常见安装线索：

```text
claude mcp add context7 --scope user npx @upstash/context7-mcp
```

或远程/SSE：

```text
claude mcp add --transport sse context7 https://mcp.context7.com/sse --header "CONTEXT7_API_KEY: YOUR_API_KEY"
```

排错建议：

```text
/mcp list
/doctor
claude mcp
```

注意：

- MCP 不是越多越好。每个 MCP 都会增加工具面、上下文和失败概率。
- 公司代码使用远程 MCP 前，要确认代码和查询内容是否会离开本地。
- Context7 解决“官方文档新旧”问题，不解决项目内部约定。

### 22.7 Skills vs MCP 的选择

LinuxDO 上关于 Skill 与 MCP 的对比很值得采纳：

- Skill 更适合“流程和方法”：review、TDD、文档审核、发布检查。
- MCP 更适合“实时外部数据和工具”：浏览器、GitHub、Sentry、数据库 schema、框架文档。

判断：

```text
如果内容可以静态写成流程说明，用 Skill。
如果必须实时查询或操作外部系统，用 MCP。
如果每次工具调用都要检查风险，用 Hook。
如果要独立上下文执行任务，用 Subagent。
```

### 22.8 中文文档类 Skill 值得单独做

LinuxDO 上有中文正式文件审核 skill 的例子，用来审合同、方案、投标文件、测试报告、验收报告。它说明一个重要原则：最好的 skill 往往不是“大而全”，而是针对你的真实业务场景。

适合自建中文 skill 的场景：

- 合同/投标/验收文件审核。
- 政企项目文档一致性检查。
- 中文技术方案风险表达检查。
- 内部知识库清洗。

不要只依赖通用 document-skills。通用 skill 解决格式，业务 skill 解决行业判断。

## 23. 完整性复查结论

这份指南现在覆盖了四层：

1. **官方基础设施**：LSP、GitHub、Sentry、Figma、MCP、plugin marketplace。
2. **强工作流插件**：Superpowers、GSD、SuperClaude、gstack、everything-claude-code。
3. **多模型协作**：Codex plugin、Superpowers-CCG、advisor strategy。
4. **社区实践与坑点**：LinuxDO、X、Reddit 中的安装、触发、性能、hooks、cc-switch/opencode 混用问题。

仍然需要动态更新的地方：

- Claude Code 官方命令和 marketplace 名称变化很快。
- LinuxDO/X 上的安装命令可能来自某个版本，必须以当前 `/plugin` 和 GitHub README 验证。
- 插件星标数和可用性变化快，不应写死为长期事实。
- 第三方插件安全性不能只看热度，必须审查 hooks、MCP、shell 命令和读取路径。

## 24. 最终推荐路径

第一周：

```text
Superpowers + 语言 LSP + GitHub
```

第二周：

```text
Code Simplifier + PR Review Toolkit + Context7
```

第三周：

```text
Codex plugin + last30days + document-skills
```

大型项目再评估：

```text
GSD + Trail of Bits + 团队私有 plugin marketplace
```

不要一次装满。插件生态的正确用法不是“越多越强”，而是让每个插件都有明确职责、明确触发条件、明确安全边界。

## 25. Marketplace 生态扩张快照（2026-05）

截至 2026-05-19，社区目录可见 74 个 marketplace、约 1182 个插件，覆盖 Automation/DevOps、Code Quality/Testing、Data Analytics、Design/UX、Documentation、Git Workflow、Security/Compliance 等近 13 个类别。生态本身已经过了“几个仓库即可看全”的阶段，挑选策略比逐个浏览更重要。

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

- 第三方目录里的“近期更新”≠ 维护良好。pin 一个版本，再周期复查 commit 历史。
- xiaolai 这类“自动镜像官方 docs”的 skill 包优点是低维护，但缺点是它就是文档本身，遇到真正稳定的事实仍要看原始 docs。
- CC Suite 把 Codex 当二级 agent 派发非常方便，但跨工具委派的失败模式（quota 不同、tool schema 差异）需要在 hooks 里加守护。

来源汇总见 `sources.md` 第 9 节。

