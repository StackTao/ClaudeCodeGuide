## 22. LinuxDO 社区补充：容易漏但很重要

来源等级：社区线索 / 社区核验混合。本章保留 LinuxDO 等中文社区的实战反馈，用于发现坑点和工作流设计思路；安装命令、能力事实、安全边界必须回到官方文档、插件详情页或对应 GitHub README 核对。

### 22.1 Superpowers：强，但最好按需启用

LinuxDO 上有两类反馈同时成立：

- 正面：Superpowers 的 14 个核心 skills 能把 agent 拉回“先设计、再计划、TDD、debug、review、验证”的工程节奏。
- 负面：日常小任务里，brainstorming/TDD/review 流程可能太重，尤其是模型额度紧张或环境不稳定时。

社区提到的核心 skills 包括；实际列表以 Superpowers 官方插件页和仓库 README 为准：

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

LinuxDO 有用户基于 `--plugin-dir` / `--plugin-url` 写了 `claude-sp` wrapper，让 Superpowers 只在复杂任务里启用。这个思路可以借鉴：减少简单任务的流程噪音，也避免所有会话都带着同一套强约束。

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

如果你愿意牺牲自动触发，可以把 Superpowers 改成显式调用模式。代价是：需要手动说“使用 Superpowers workflow”。团队项目先在个人配置验证，不要直接把触发限制写成全员默认。

### 22.3 cc-switch / opencode / Codex 混用时的坑

LinuxDO 上多次出现这类问题：

- cc-switch 切 provider 后，Superpowers 看起来“不见了”。
- opencode 可能读取 Claude Code plugin 目录，导致明明删了 skill 仍能看到。
- Codex 或其他模型可能比 Claude 更积极调用 Superpowers。

建议：

- 把常用 plugin 写进 cc-switch 的 common config，而不是只写在某个 provider 下。
- 跨工具共用 `~/.claude`、`~/.agents`、`~/.config/opencode` 时，先确认各工具实际扫描哪些目录。
- 不要在所有工具里全局安装同一套强 workflow；优先按项目或按 session 加载。
- 如果不同工具看到的插件列表不一致，先查各自配置目录和 enabledPlugins，不要直接删除共享目录。

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

处理规则：这些是社区选型经验，不是官方排名。任何第三方框架进入项目默认配置前，都要检查 manifest、hooks、MCP/LSP、shell 命令、维护频率和卸载路径。

### 22.5 Codex plugin 的社区用法

LinuxDO 上 Codex plugin 的讨论很多，常见玩法：

- Claude/Opus 写计划，Codex 执行或 review。
- Claude Code 中用 `/codex:review` 做只读复核。
- 用 `/codex:adversarial-review` 做挑战式审查。
- Claude 卡住时用 `/codex:rescue`。

安装命令在不同帖子中 marketplace 名称略有差异，应以 GitHub README 和当前 plugin manifest 为准。常见形态：

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
- 接受 Codex 发现前，要求它给出文件、行号、复现步骤或明确推理链。

### 22.6 MCP：Context7、Serena、Chrome DevTools、Tavily

LinuxDO 的 MCP 帖子给出了一些常见组合；是否可用取决于当前 MCP server 维护状态和公司网络策略：

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
- 远程搜索、浏览器、数据库、Sentry、Slack 类 MCP 都按高权限工具处理，先只读再写入。

### 22.7 Skills vs MCP 的选择

LinuxDO 上关于 Skill 与 MCP 的对比可以作为设计参考：

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

全章验证清单：

- 先找官方文档、插件页或 GitHub README。
- 再找第二个独立社区来源或长文复盘。
- 最后在隔离项目复现安装、触发、卸载和失败模式。
