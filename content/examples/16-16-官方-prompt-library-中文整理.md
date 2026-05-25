## 16. 官方 Prompt Library 中文对照版

> 来源：Claude Code Prompt Library（https://code.claude.com/docs/en/prompt-library）  
> 说明：本节按官方页面的用途和结构做中文知识库适配：保留英文可复制 Prompt，并在每条后面给中文对照。英文为面向本项目的改写模板，不是官方页面逐字镜像。

### 16.1 使用方式

这个库适合在不知道如何开口、想快速启动常见 Claude Code 工作流时使用。复制英文 Prompt 后，把尖括号里的内容替换成你的真实任务、文件、日志、命令或成功标准。

建议每次至少补齐四件事：

- **Outcome / 结果**：完成后应该产生什么行为或交付物。
- **Context / 上下文**：相关文件、错误日志、截图、Issue、PR 或设计稿在哪里。
- **Constraints / 约束**：哪些文件不能动，是否允许新增依赖，是否必须先只读。
- **Verification / 验证**：运行什么命令，或用什么方式确认结果正确。

### 16.2 Explore / 探索项目

#### Explore the codebase / 探索代码库

```text
Explore this repository before making changes. Identify the main entry points, core modules, build and test commands, and the files most likely related to <task>. Do not edit files yet. End with a short implementation plan and any questions that need my input.
```

```text
在修改前先探索这个仓库。找出主要入口、核心模块、构建和测试命令，以及最可能和 <任务> 相关的文件。暂时不要编辑文件。最后给出简短实现计划，并列出需要我确认的问题。
```

#### Explain a feature / 解释现有功能

```text
Explain how <feature> works in this codebase. Trace the flow from user input or API entry point to storage, side effects, and output. Include the important files and functions, but do not modify anything.
```

```text
解释这个代码库里的 <功能> 是如何工作的。从用户输入或 API 入口开始，追踪到存储、副作用和输出。列出重要文件和函数，但不要修改任何内容。
```

#### Find relevant files / 定位相关文件

```text
Find the files and tests related to <behavior>. Rank them by relevance and explain why each one matters. If the code path is unclear, show the evidence and the next file you would inspect.
```

```text
找出和 <行为> 相关的文件和测试，按相关性排序，并解释每个文件为什么重要。如果调用路径不清楚，请说明证据和下一步要看的文件。
```

#### Understand context usage / 理解上下文占用

```text
Review the current task context and tell me what information is essential, what is probably stale, and what should be moved into project documentation or a reusable command.
```

```text
检查当前任务上下文，告诉我哪些信息是必要的，哪些可能已经过时，哪些应该沉淀到项目文档或可复用命令里。
```

### 16.3 Plan / 计划

#### Plan before editing / 先计划再修改

```text
Create a plan for <task> before editing files. Include the files you expect to touch, the smallest safe implementation path, verification commands, and risks. Wait for my confirmation before making changes.
```

```text
在编辑文件前，为 <任务> 制定计划。说明预计会修改哪些文件、最小安全实现路径、验证命令和风险。等我确认后再开始修改。
```

#### Break down a large task / 拆解大型任务

```text
Break <large task> into small, verifiable steps. For each step, list the goal, files likely involved, validation method, and what should be reviewed before continuing.
```

```text
把 <大型任务> 拆成小的、可验证的步骤。每一步都列出目标、可能涉及的文件、验证方法，以及继续前需要检查的内容。
```

#### Compare approaches / 比较方案

```text
Compare two or three implementation approaches for <task>. For each approach, describe the tradeoffs, risk, amount of code touched, and how it would be tested. Recommend the simplest option that meets the goal.
```

```text
比较 <任务> 的两到三种实现方案。分别说明取舍、风险、改动范围和测试方式。推荐能满足目标的最简单方案。
```

#### Prepare a migration plan / 准备迁移计划

```text
Plan a migration from <old behavior> to <new behavior>. Include compatibility concerns, rollout order, tests, data or schema changes, and a rollback strategy.
```

```text
规划从 <旧行为> 到 <新行为> 的迁移。包括兼容性问题、上线顺序、测试、数据或 schema 变化，以及回滚策略。
```

### 16.4 Build / 实现

#### Implement a feature / 实现功能

```text
Implement <feature> with the smallest reasonable change. Follow existing patterns, avoid unrelated refactors, and add or update tests for the behavior. Run the relevant checks and summarize the changed files.
```

```text
用尽量小的合理改动实现 <功能>。遵循现有模式，避免无关重构，并为该行为新增或更新测试。运行相关检查并总结改动文件。
```

#### Add an API endpoint / 增加 API 端点

```text
Add an API endpoint for <operation>. Match the style of existing endpoints, validate inputs, return consistent errors, and add tests for success and failure cases.
```

```text
为 <操作> 增加一个 API 端点。匹配现有端点风格，校验输入，返回一致的错误格式，并为成功和失败场景补测试。
```

#### Build a UI flow / 构建 UI 流程

```text
Build the UI flow for <user action>. Reuse existing components and layout patterns. Handle loading, empty, error, and success states. Verify it works on desktop and mobile.
```

```text
构建 <用户动作> 的 UI 流程。复用现有组件和布局模式。处理加载、空状态、错误和成功状态。验证桌面端和移动端都可用。
```

#### Add rate limiting / 增加限流

```text
Add rate limiting to <public surface>. Use the project’s existing middleware or infrastructure if available. Make the limit observable in tests or logs, and ensure existing tests still pass.
```

```text
为 <公开入口> 增加限流。优先使用项目已有中间件或基础设施。让限流能通过测试或日志观察到，并确保现有测试仍然通过。
```

#### Match an existing pattern / 复用现有模式

```text
Add <new feature> by following the same structure and style as <reference file or feature>. Keep names, error handling, and tests consistent with that reference.
```

```text
参考 <参考文件或功能> 的结构和风格新增 <新功能>。命名、错误处理和测试都要与参考实现保持一致。
```

### 16.5 Debug / 调试

#### Fix a bug / 修复 Bug

```text
Fix <bug>. First reproduce or locate the cause, then make the smallest change that addresses it. Add a regression test if the project has a suitable test setup. Run the relevant verification command.
```

```text
修复 <Bug>。先复现或定位原因，再做能解决问题的最小改动。如果项目有合适的测试体系，请补回归测试。运行相关验证命令。
```

#### Explain a failing test / 解释测试失败

```text
Explain why this test is failing, using the output below. Identify the real failure, separate it from noise, and propose the smallest fix. Do not change code until you have explained the cause.
```

```text
根据下面的输出解释这个测试为什么失败。找出真正的失败点，把它和无关噪声区分开，并提出最小修复方案。在解释原因前不要改代码。
```

#### Debug a build failure / 排查构建失败

```text
Debug this build failure. Read the error output, inspect only the relevant files, and fix the root cause without weakening the build, skipping checks, or deleting assertions.
```

```text
排查这个构建失败。阅读错误输出，只检查相关文件，修复根因。不要通过降低构建标准、跳过检查或删除断言来解决。
```

#### Investigate a production issue / 排查生产问题

```text
Investigate <production symptom> using the logs and code available here. Do not touch secrets or production data. Identify likely causes, safe checks, and a low-risk fix or mitigation.
```

```text
根据这里可用的日志和代码排查 <生产现象>。不要接触密钥或生产数据。找出可能原因、安全检查方法，以及低风险修复或缓解方案。
```

### 16.6 Test / 测试

#### Add missing tests / 补缺失测试

```text
Add tests for <behavior>. Use the existing test framework and style. Focus on observable behavior, not implementation details. Include edge cases and run the smallest relevant test command.
```

```text
为 <行为> 补测试。使用现有测试框架和风格。关注用户可观察行为，而不是实现细节。覆盖边界情况，并运行最小相关测试命令。
```

#### Write a regression test / 写回归测试

```text
Write a regression test for <bug> before changing the implementation. Confirm the test fails for the current behavior, then make the smallest fix and rerun it.
```

```text
在修改实现前，为 <Bug> 写一个回归测试。先确认测试能在当前行为下失败，再做最小修复并重新运行。
```

#### Improve test reliability / 提升测试稳定性

```text
Make <test or test suite> reliable without hiding real failures. Identify flaky assumptions, timing issues, shared state, or missing mocks, then fix the test in the project’s existing style.
```

```text
让 <测试或测试套件> 更稳定，但不要掩盖真实失败。找出不稳定假设、时序问题、共享状态或缺失 mock，然后按项目现有风格修复测试。
```

#### Add coverage for edge cases / 覆盖边界情况

```text
Review <feature> for important edge cases and add focused tests for the gaps. Explain why each added test matters and avoid broad snapshot tests unless the project already uses them.
```

```text
检查 <功能> 的重要边界情况，并为缺口补聚焦测试。解释每个新增测试为什么重要，除非项目已有惯例，否则避免宽泛快照测试。
```

### 16.7 Refactor / 重构

#### Refactor safely / 安全重构

```text
Refactor <area> without changing external behavior. Keep the diff small, preserve public APIs, and run tests before and after if practical. Stop if you discover behavior that needs a product decision.
```

```text
在不改变外部行为的前提下重构 <范围>。保持 diff 小，保留公共 API；如果可行，重构前后都运行测试。发现需要产品判断的行为时停止。
```

#### Reduce duplication / 减少重复

```text
Reduce duplication in <area>. Only introduce an abstraction if it removes real repeated logic and matches existing project patterns. Do not create configurability that is not needed now.
```

```text
减少 <范围> 中的重复。只有在确实能消除重复逻辑并符合项目现有模式时，才引入抽象。不要创建当前不需要的可配置性。
```

#### Simplify complex code / 简化复杂代码

```text
Simplify <function or module>. Preserve behavior, improve names or structure where it makes the code easier to read, and avoid changing adjacent code that is unrelated.
```

```text
简化 <函数或模块>。保持行为不变，在能提升可读性的地方改进命名或结构，避免修改无关相邻代码。
```

#### Improve performance / 优化性能

```text
Improve performance for <operation> with a measurable target of <metric>. Measure or reason from evidence first, make the smallest change, and show the before/after result.
```

```text
优化 <操作> 的性能，目标指标是 <指标>。先测量或基于证据分析，再做最小改动，并展示前后结果。
```

### 16.8 Review / 审查

#### Review a diff / 审查当前 diff

```text
Review the current diff like a code reviewer. Prioritize bugs, regressions, security issues, missing tests, and project convention violations. List findings first with file and line references.
```

```text
像代码审查者一样审查当前 diff。优先关注 Bug、回归、安全问题、缺失测试和项目约定违背。先列问题，并给出文件和行号。
```

#### Review for security / 安全审查

```text
Review <change or area> for security risks. Look for secret exposure, injection, unsafe permissions, data leaks, weak validation, and risky external inputs. Suggest minimal fixes.
```

```text
审查 <改动或范围> 的安全风险。关注密钥暴露、注入、不安全权限、数据泄露、弱校验和危险外部输入。提出最小修复方案。
```

#### Review a pull request / 审查 PR

```text
Review this pull request. Summarize the intent, then list blocking issues, non-blocking suggestions, and missing verification. Avoid style comments unless they affect maintainability or project consistency.
```

```text
审查这个 PR。先总结意图，再列出阻塞问题、非阻塞建议和缺失验证。除非影响可维护性或项目一致性，否则不要提纯风格意见。
```

#### Check release readiness / 检查发布准备度

```text
Check whether <change> is ready to release. Review tests, migrations, configuration, rollback, documentation, monitoring, and user-visible behavior. Produce a go/no-go checklist.
```

```text
检查 <改动> 是否可以发布。审查测试、迁移、配置、回滚、文档、监控和用户可见行为。输出 go/no-go 清单。
```

### 16.9 Document / 文档

#### Update documentation / 更新文档

```text
Update the documentation for <feature or change>. Read the actual implementation first, keep the existing documentation style, and do not describe features that are not implemented.
```

```text
更新 <功能或改动> 的文档。先阅读真实实现，保持现有文档风格，不要描述尚未实现的功能。
```

#### Create onboarding notes / 创建入门说明

```text
Create onboarding notes for a new developer joining this project. Include setup, common commands, key directories, testing, deployment, and the most important project conventions.
```

```text
为新加入项目的开发者创建入门说明。包括安装配置、常用命令、关键目录、测试、部署和最重要的项目约定。
```

#### Explain architecture / 解释架构

```text
Explain the architecture of <system or module> for a technical teammate. Include responsibilities, data flow, dependencies, extension points, and known limitations.
```

```text
面向技术同事解释 <系统或模块> 的架构。包括职责、数据流、依赖、扩展点和已知限制。
```

#### Generate a changelog entry / 生成变更说明

```text
Write a changelog entry for the current changes. Separate user-visible changes, internal changes, fixes, and migration notes. Keep it concise and factual.
```

```text
为当前改动写一条变更说明。区分用户可见变化、内部变化、修复和迁移说明。保持简洁、事实准确。
```

### 16.10 Git and Team Workflows / Git 与团队工作流

#### Summarize changes / 总结改动

```text
Summarize the current working tree changes. Group them by purpose, mention tests or checks already run, and call out untracked files or changes that should not be committed.
```

```text
总结当前工作区改动。按目的分组，说明已经运行的测试或检查，并指出未跟踪文件或不应提交的改动。
```

#### Prepare a commit / 准备提交

```text
Prepare a commit message for the current changes. Inspect the diff, choose the clearest scope, and provide one concise subject plus a short body explaining why the change was made.
```

```text
为当前改动准备提交信息。检查 diff，选择最清晰的范围，给出一句简洁标题，并用简短正文说明为什么做这个改动。
```

#### Draft a PR description / 起草 PR 描述

```text
Draft a pull request description for the current changes. Include summary, motivation, testing, screenshots if relevant, rollout notes, and risks reviewers should focus on.
```

```text
为当前改动起草 PR 描述。包括摘要、动机、测试、必要截图、发布说明，以及审查者应重点关注的风险。
```

#### Respond to review comments / 回应审查意见

```text
Address these review comments. For each comment, determine whether it requires a code change, a test, a clarification, or a respectful explanation. Keep changes scoped to the review.
```

```text
处理这些审查意见。逐条判断是需要改代码、补测试、澄清，还是给出合理解释。改动范围只限本次审查相关内容。
```

### 16.11 Data, Security, and Operations / 数据、安全与运维

#### Analyze logs / 分析日志

```text
Analyze these logs for <problem>. Identify the timeline, likely root cause, affected components, and safe next checks. Do not expose secrets; redact anything sensitive in your summary.
```

```text
分析这些日志来排查 <问题>。识别时间线、可能根因、受影响组件和安全的下一步检查。不要暴露密钥；总结时遮盖敏感信息。
```

#### Review database changes / 审查数据库变更

```text
Review this database or schema change. Check compatibility, migration order, indexes, rollback, data backfill, and whether application code handles old and new states safely.
```

```text
审查这个数据库或 schema 变更。检查兼容性、迁移顺序、索引、回滚、数据回填，以及应用代码是否安全处理新旧状态。
```

#### Create an operational runbook / 创建运维手册

```text
Create a runbook for <incident or operation>. Include symptoms, dashboards or logs to inspect, safe commands, escalation criteria, rollback steps, and what not to do.
```

```text
为 <故障或操作> 创建运维手册。包括现象、要检查的仪表盘或日志、安全命令、升级条件、回滚步骤，以及禁止事项。
```

#### Check privacy risk / 检查隐私风险

```text
Check <feature or flow> for privacy risks. Identify personal data collected, stored, logged, transmitted, or exposed in UI. Recommend minimal changes to reduce risk.
```

```text
检查 <功能或流程> 的隐私风险。识别被收集、存储、记录、传输或暴露在 UI 中的个人数据。推荐降低风险的最小改动。
```

### 16.12 What Makes These Prompts Work / 这些 Prompt 为什么有效

#### Describe the outcome, not the steps / 描述结果，而不是规定步骤

```text
add rate limiting to the public API and make sure existing tests still pass
```

```text
给公开 API 增加限流，并确保现有测试仍然通过。
```

#### Give it a way to check its own work / 给它自检方式

```text
write the migration, run it against the dev database, and confirm the schema matches
```

```text
编写迁移，在开发数据库上运行，并确认 schema 匹配。
```

#### Point at a reference / 指向参考实现

```text
add a settings page that follows the same layout as the profile page
```

```text
新增设置页，布局与个人资料页保持一致。
```

#### State the measurable target / 给出可衡量目标

```text
get the bundle size under 200KB and show me what you removed
```

```text
把 bundle size 降到 200KB 以下，并告诉我删除了什么。
```

#### Give it the artifact / 提供真实材料

```text
why is the build failing? @build.log
```

```text
为什么构建失败？请查看 @build.log。
```

#### Say how you want the answer / 指定回答形式

```text
explain how the payment retry logic works as an HTML page with a diagram, then open it in my browser
```

```text
把支付重试逻辑解释成一个带图表的 HTML 页面，然后在浏览器中打开。
```

### 16.13 Sources and Related Resources / 来源与延伸资源

官方页面提示这些 Prompt 来自 Anthropic 已发布资源中的模式。使用时可以继续参考：

- Claude Code Common workflows: https://code.claude.com/docs/en/common-workflows
- Claude Code Best practices: https://code.claude.com/docs/en/best-practices
- How Anthropic teams use Claude Code: https://claude.com/blog/how-anthropic-teams-use-claude-code
- Scaling agentic coding across your organization: https://resources.anthropic.com/hubfs/Scaling%20agentic%20coding%20across%20your%20organization.pdf
- Claude Code in Action: https://anthropic.skilljar.com/claude-code-in-action

当某条 Prompt 在你的项目里效果稳定后，下一步不是反复复制，而是把它沉淀成团队可复用的 `/command`、skill 或项目级 `CLAUDE.md` / `AGENTS.md` 规则。
