## 16. 官方 Prompt Library 中文对照版

> 来源：Claude Code Prompt Library（https://code.claude.com/docs/en/prompt-library）  
> 说明：本节逐条镜像官方 Prompt Library 的全部 51 条提示词，按官方的 SDLC 阶段（Discover / Design / Build / Ship / Operate）和分类组织。每条都保留英文原版（带官方示例填充值）+ 中文对照翻译，方便直接复制使用。变量值仅是官方给出的示例，使用时请替换为你自己的真实任务、文件、命令或目标。

### 16.1 使用方式

这个库适合在不知道如何开口、想快速启动常见 Claude Code 工作流时使用。复制英文 Prompt 后，把里面的示例值（如 `src/scheduler/queue.ts`、`#312`、`p95 latency` 等）替换成你的真实任务、文件、日志、命令或成功标准。

建议每次至少补齐四件事：

- **Outcome / 结果**：完成后应该产生什么行为或交付物。
- **Context / 上下文**：相关文件、错误日志、截图、Issue、PR 或设计稿在哪里。
- **Constraints / 约束**：哪些文件不能动，是否允许新增依赖，是否必须先只读。
- **Verification / 验证**：运行什么命令，或用什么方式确认结果正确。

官方页面还提供了"Start here"五条入门 Prompt，本文档按重要程度在标题旁标注 `★ Start 1` ~ `★ Start 5`。

---

### 16.2 Discover / 发现

#### Onboard / 入门

##### Get oriented in a new repository / 在新仓库里建立全局认识 ★ Start 1

```text
give me an overview of this codebase: architecture, key directories, and how the pieces connect
```

```text
给我这个代码库的总览：架构、关键目录，以及各部分之间的连接方式。
```

> **Why this works / 这样写为什么有效**：描述你想知道什么，而不是该读哪些文件。Claude 会自己探索项目，并返回各部分如何拼接的总结。  
> **Make it stick / 持久化**：运行 `/init` 生成 `CLAUDE.md`，让 Claude 每个会话都自动记住这些。

#### Understand / 理解

##### Explain unfamiliar code / 解释陌生代码

```text
explain what src/scheduler/queue.ts does and how data flows through it. write it up as an HTML page with a diagram, then open it in my browser
```

```text
解释 src/scheduler/queue.ts 做了什么以及数据如何在其中流动。把结果写成一个带图表的 HTML 页面，然后在浏览器中打开。
```

> **Why this works / 这样写为什么有效**：指明文件路径并说明你想要的答案形式。可以把 HTML 页面换成图、要点列表或任何最适合你学习方式的格式。  
> **Make it stick / 持久化**：设置 output style，让 Claude 始终用你偏好的格式解释。

##### Find where something happens / 找到某种行为发生的位置 ★ Start 2

```text
where do we validate uploaded file types?
```

```text
我们在哪里校验上传文件的类型？
```

> **Why this works / 这样写为什么有效**：按行为搜索，而不是按文件名。即使你不知道文件叫什么、放在哪个目录，这种搜索都能工作。

##### Check what breaks before you delete / 删除前确认会破坏什么

```text
what would break if I deleted the retryWithBackoff helper?
```

```text
如果我删掉 retryWithBackoff 这个 helper 会破坏什么？
```

> **Why this works / 这样写为什么有效**：在删除之前先问。调用方与下游影响清单会告诉你这只是一行清理，还是一次需要协调的改动。

##### Trace how code evolved / 追溯代码演进

```text
look through the commit history of internal/auth/session.go and summarize how it evolved and why
```

```text
查看 internal/auth/session.go 的提交历史，总结它是如何演进的，以及为什么。
```

> **Why this works / 这样写为什么有效**：当问题是"为什么"而不是"是什么"时，让 Claude 看提交历史。它会读取你用的版本控制工具的 log 与 blame，并解释当前实现背后的决策。

##### Scope a change before you start / 在动手前评估改动范围

```text
which files would I need to touch to add a dark mode toggle to settings?
```

```text
如果要在 settings 里加一个深色模式开关，我需要改哪些文件？
```

> **Why this works / 这样写为什么有效**：在把工作放进路线图之前先估量工作量。文件清单会告诉你这是单个组件的改动，还是跨模块的大改。

##### Ask the codebase a product question / 用代码库回答产品问题

```text
I am a PM. walk me through what happens when a user clicks Export to PDF, from the UI down to the result
```

```text
我是 PM。带我从 UI 一直到结果，走一遍用户点击"导出为 PDF"时发生的事情。
```

> **Why this works / 这样写为什么有效**：说明你的角色，答案就会用相应的深浅度来讲解。Claude 直接从源代码解释产品实际行为，你不需要自己去读代码。  
> **Make it stick / 持久化**：设置 output style，让 Claude 始终用这个层次回答。

---

### 16.3 Design / 设计

#### Plan / 计划

##### Plan a multi-file change before touching code / 多文件改动前先做计划

```text
plan how to refactor the payment module to support multiple currencies. list the files you would change, but don't edit anything yet
```

```text
为重构 payment 模块以支持多币种制定计划。列出你会修改的文件，但暂时不要编辑任何内容。
```

> **Why this works / 这样写为什么有效**："don't edit yet" 把探索和实际改动分开，让你先看到方案再让代码改动。想在每次 prompt 都默认进入计划优先模式，按 Shift+Tab 进入 plan mode。

##### Draft a spec by interview / 通过访谈起草规格说明

```text
I want to build per-workspace rate limits. interview me about implementation, UX, edge cases, and tradeoffs until we have covered everything, then write the spec to SPEC.md
```

```text
我想做"按 workspace 区分的限流"。请围绕实现、UX、边界情况和取舍来访谈我，直到我们覆盖所有方面，然后把规格写到 SPEC.md。
```

> **Why this works / 这样写为什么有效**：让 Claude 来访谈你，而不是你自己写 spec。它会用结构化问题问你直到需求完整，再把结果写入文件。  
> **Make it stick / 持久化**：把访谈问题保存为 `/spec` skill，让每份规格都从同样的方式开始。

##### Turn a meeting into tickets / 把会议转化为工单

```text
read @meeting-notes.md and write up the action items, then create a Linear ticket for each with acceptance criteria
```

```text
阅读 @meeting-notes.md，整理出 action items，然后在 Linear 中为每一条创建带验收标准的工单。
```

> **Why this works / 这样写为什么有效**：跳过转写步骤。Claude 从非结构化输入里抽取 action items，并通过 MCP 直接写进你的 tracker，让你审的是工单而不是会议纪要。  
> **Make it stick / 持久化**：把它保存为 `/tickets` skill。  
> **Needs / 依赖**：你的 issue tracker 作为 claude.ai connector 或 MCP server 接入。

##### Map edge cases before building / 实现前先梳理边界情况

```text
list the error states, empty states, and edge cases for the file upload flow that the design needs to cover
```

```text
列出文件上传流程里设计需要覆盖的错误状态、空状态和边界情况。
```

> **Why this works / 这样写为什么有效**：问的是"缺什么"而不是"有什么"。Claude 会列出 happy path 设计常常漏掉的错误态、空态与边界情况。

#### Prototype / 原型

##### Turn a mockup into a working prototype / 把设计稿变成可点击原型

```text
here is a mockup. build a working prototype I can click through, matching the layout and states shown
```

```text
这是一个设计稿。请构建一个我可以点击通过的可运行原型，与所示布局和状态匹配。
```

> **Why this works / 这样写为什么有效**：可点击原型回答静态设计稿回答不了的问题。把可运行代码交给工程，比在文档里描述交互更有效。  
> **使用方式**：粘贴、拖入或用 @ 引用你的设计稿图片，然后发送这条 prompt。

##### Implement from a screenshot and self-check / 从截图实现并自检

```text
implement this design, then take a screenshot of the result, compare it to the original, and fix any differences
```

```text
实现这个设计，然后对结果截图，与原图对比，并修复任何差异。
```

> **Why this works / 这样写为什么有效**：这给了 Claude 一个验证闭环：渲染 → 与原图对比 → 自行迭代，你不需要逐项指出差异。  
> **Make it stick / 持久化**：用 `/goal` 让 Claude 一直迭代直到截图匹配。  
> **Needs / 依赖**：让 Claude 能渲染并截图的方式（桌面版内置；终端版安装 Chrome 扩展或 Playwright MCP）。

---

### 16.4 Build / 构建

#### Implement / 实现

##### Follow an existing pattern / 复用现有模式

```text
look at how the GitHub webhook handler is implemented to understand the pattern, then build a Stripe webhook handler the same way
```

```text
先看 GitHub webhook handler 是怎么实现的，理解它的模式，然后用同样的方式构建一个 Stripe webhook handler。
```

> **Why this works / 这样写为什么有效**：指向你已经满意的代码。没有参考时，Claude 默认使用通用最佳实践；有参考时，它会匹配你代码库实际使用的约定。  
> **Make it stick / 持久化**：让 Claude 把它遵循的模式写进 `CLAUDE.md`，未来会话不靠参考也能保持一致。

##### Generate docs for undocumented code / 为无文档代码生成文档

```text
find the public functions in src/auth/ without JSDoc comments and add them, matching the style already used in the file
```

```text
找出 src/auth/ 中没有 JSDoc 注释的公共函数，为它们补上注释，风格与文件中已有的一致。
```

> **Why this works / 这样写为什么有效**：指明范围与格式。Claude 找出缺失的部分，并匹配文件已有的注释风格，让新增文档读起来和其他部分一致。

##### Add a small, well-defined feature / 添加小而明确的功能

```text
add a /health endpoint that returns the app version and uptime
```

```text
新增一个 /health 端点，返回应用版本和运行时长。
```

> **Why this works / 这样写为什么有效**：说明输入和输出，而不是怎么实现。Claude 会找到类似代码所在的位置，把你的实现放到旁边。

##### Build a small internal tool from scratch / 从零搭建小型内部工具

```text
create a drag-and-drop Kanban board with three columns using HTML, CSS, and vanilla JavaScript, then open it in my browser
```

```text
用 HTML、CSS 和原生 JavaScript 创建一个三列的拖放式看板，然后在浏览器中打开。
```

> **Why this works / 这样写为什么有效**：你不需要项目、框架或构建步骤。描述工具并让 Claude 打开它，你能立刻看到它在运行。

##### Work an issue end to end / 端到端处理一个 Issue

```text
read issue #312, implement the fix, and run the tests
```

```text
阅读 issue #312，实现修复，并运行测试。
```

> **Why this works / 这样写为什么有效**：给 issue 编号，而不是摘要。Claude 自己读完整的工单，你忘记提的需求也能被它带进来，并在回报前先验证改动。  
> **Needs / 依赖**：已认证的 gh CLI，或将 GitHub 作为 claude.ai connector 接入。

##### Find and update copy across the codebase / 跨代码库查找并更新文案

```text
find every place we say "Sign up free" or a close variant, show me each one in context, then update them all to "Start free trial". leave tests and the changelog alone
```

```text
找出所有出现"Sign up free"或近似变体的位置，把每一处都带上下文展示给我，然后全部更新为"Start free trial"。测试和 changelog 不要动。
```

> **Why this works / 这样写为什么有效**：要求查找变体并指明不动的部分。Claude 能发现纯字面搜索漏掉的措辞，同时不动测试 fixture 和历史记录，你只审用户真正看到的文案。

##### Draft a document from past examples / 从历史样本起草文档

```text
read the privacy impact assessments in legal/pia/ to learn the structure and voice, then draft a new one for the new analytics integration
```

```text
阅读 legal/pia/ 中的隐私影响评估，学习其结构和语气，然后为新的分析集成起草一份新的。
```

> **Why this works / 这样写为什么有效**：指向一个已经完成工作的文件夹，而不是描述你的风格。Claude 从你已发布的成品里学结构与语气，第一稿就像你自己写的。  
> **Make it stick / 持久化**：把这套语气保存为 skill，让每份草稿都从这里开始。

#### Test / 测试

##### Write tests, run them, fix failures / 写测试、运行、修复失败 ★ Start 4

```text
write tests for app/parsers/feed.py, run them, and fix any failures
```

```text
为 app/parsers/feed.py 写测试，运行它们，并修复任何失败。
```

> **Why this works / 这样写为什么有效**：把"写、运行、修"放在一起，Claude 会自行迭代而不会停下来等指令。  
> **Make it stick / 持久化**：运行 `/init` 让 Claude 自动学会你的测试命令。

##### Drive implementation from tests / 用测试驱动实现

```text
write tests for the password reset flow first, then implement it until they pass
```

```text
先为密码重置流程写测试，然后实现功能直到全部通过。
```

> **Why this works / 这样写为什么有效**：测试驱动开发：测试定义了"完成"的标准，Claude 持续迭代实现直至全部通过。

##### Fill gaps from a coverage report / 根据覆盖率报告补缺口

```text
read coverage/coverage-summary.json and add tests for the lowest-covered files until each is above 80%
```

```text
读取 coverage/coverage-summary.json，为覆盖率最低的文件补测试，直到每个都超过 80%。
```

> **Why this works / 这样写为什么有效**：指向真实的覆盖率报告，而不是凭猜测。Claude 读实际数字，为最需要测试的文件写测试。  
> **Make it stick / 持久化**：把它设为 `/goal`，让 Claude 持续写测试直到达到目标。

#### Refactor / 重构

##### Migrate a pattern across the codebase / 跨代码库迁移模式

```text
migrate everything from the old logging API to the structured logger: identify every place that needs to change, then make the changes
```

```text
把所有使用旧 logging API 的地方迁移到 structured logger：先识别出每一处需要改的位置，再统一修改。
```

> **Why this works / 这样写为什么有效**：描述旧模式与新模式。让 Claude 先"识别每一处"，调用点就会出现在回复里，方便你检查没有漏掉。

##### Port code to another language / 把代码迁移到另一种语言

```text
port this Python module to Rust, keeping the same public API and test behavior
```

```text
把这个 Python 模块移植到 Rust，保持相同的公共 API 和测试行为。
```

> **Why this works / 这样写为什么有效**：说明要保留什么，而不仅仅是目标语言。指出必须保持不变的 API 或行为，给了 Claude 一个可以用于校对移植结果的契约。

##### Optimize against a measurable target / 朝可衡量目标优化

```text
optimize the search query to bring p95 latency from 2s down to under 500ms
```

```text
优化搜索查询，把 p95 延迟从 2s 降到 500ms 以下。
```

> **Why this works / 这样写为什么有效**：给出指标和目标，就给了 Claude 明确的"完成"定义。  
> **Make it stick / 持久化**：设为 `/goal`，让 Claude 持续测量并迭代直至命中目标。

##### Fix a precise visual bug / 修复精确的视觉 Bug

```text
the login button extends 20px beyond the card border on mobile. fix it.
```

```text
登录按钮在移动端上比卡片边框多出 20px。请修复。
```

> **Why this works / 这样写为什么有效**：精确的视觉反馈得到精确修复。明确写出元素、量度和视口。  
> **Make it stick / 持久化**：加上预览工具，让 Claude 自己截图并验证修复。

#### Review / 审查

##### Review your changes before you commit / 提交前先审自己的改动 ★ Start 5

```text
review my uncommitted changes and flag anything that looks risky before I commit
```

```text
审查我未提交的改动，在我提交前标出任何看起来有风险的地方。
```

> **Why this works / 这样写为什么有效**：在问题成本最低时就抓住它们。Claude 读的是完整改动文件，而不只是 diff 行，能发现快速自审会漏掉的问题。  
> **Make it stick / 持久化**：用 `/review` 一条命令完成同样检查。

##### Review a pull request / 审查 PR

```text
review PR #247 and summarize what changed, then list any concerns
```

```text
审查 PR #247，总结改动内容，然后列出所有可能的问题。
```

> **Why this works / 这样写为什么有效**：Claude 是带着整个代码库上下文来审的，不只看 diff。它读改动代码以及它调用的东西，能发现纯 diff 审查会漏掉的问题。  
> **Make it stick / 持久化**：在 Code Review 中为每个 PR 打开此能力。  
> **Needs / 依赖**：已认证的 gh CLI 或将 GitHub 作为 claude.ai connector 接入。

##### Review infrastructure changes before applying / 应用前审查基础设施改动

```text
here is my Terraform plan output. what is this going to do, and is anything here going to cause problems?
```

```text
这是我的 Terraform plan 输出。这次执行会做什么？里面有什么可能造成问题的地方？
```

> **Why this works / 这样写为什么有效**：plan 输出密集且难扫读。把它粘进来，可以得到一份"实际会改变什么"的白话总结，在 apply 之前看清楚。  
> **使用方式**：先把 plan 输出粘进 prompt，再发送这条 prompt。

##### Run a security review with a subagent / 用 subagent 做安全审查

```text
use a subagent to review src/api/ for security issues and report what it finds
```

```text
用一个 subagent 审查 src/api/ 的安全问题，并报告它发现了什么。
```

> **Why this works / 这样写为什么有效**：subagent 在自己的上下文窗口里跑审查，最后把摘要带回主会话，这样一次长篇安全审查不会塞满你的主上下文。内置的 general-purpose subagent 即可胜任，无需额外配置。  
> **Make it stick / 持久化**：搭建一个团队共享的专用 security-review subagent。

##### Catch issues before formal review / 正式审查前先自查

```text
review launch-post.md for unsupported claims, missing attributions, and brand-guideline issues and list anything I should fix before it goes to legal
```

```text
审查 launch-post.md 中无依据的论断、缺失的署名以及违反品牌规范的地方，列出送给 legal 之前我应该修复的内容。
```

> **Why this works / 这样写为什么有效**：在人花时间之前先做一遍预审。指出你想检查的关切点，审查才会聚焦；修完之后再送出去，初稿就干净得多。  
> **Make it stick / 持久化**：把你的审查清单沉淀为团队共享的 skill。

#### Steer / 引导

##### Course-correct a wrong approach / 纠正错误方向

```text
that is not right: the function signature needs to stay backward-compatible. try a different approach
```

```text
方向不对：函数签名必须保持向后兼容。换一种方式重试。
```

> **Why this works / 这样写为什么有效**：明确告诉 Claude 它漏掉的约束，而不只是"错了"。具体原因等于在重试时给它一条明确约束，而不是再猜一次。  
> **Make it stick / 持久化**：按两次 `Esc` 打开回退菜单，把代码和对话一起恢复到干净起点再重试。

##### Narrow the scope of a change / 收窄改动范围

```text
that is too much. keep only the changes to the validation logic in src/forms/ and undo your other edits
```

```text
改得太多了。只保留 src/forms/ 中校验逻辑相关的改动，撤销其它编辑。
```

> **Why this works / 这样写为什么有效**：当方向对但改动太广时，让 Claude 只保留其中一部分，而不是全部回退。一个明确的边界能阻止一次小修变成一次重构。

##### Turn a correction into a rule / 把一次纠正变成规则

```text
you keep using default exports when this project uses named exports. add a rule to CLAUDE.md so this stops happening
```

```text
你一直用 default exports，但这个项目用 named exports。请在 CLAUDE.md 加一条规则，让这件事不再发生。
```

> **Why this works / 这样写为什么有效**：聊天里的纠正不会被团队共享。写进项目的 `CLAUDE.md` 后，一旦提交即对团队共享，并且 Claude 每个会话开始都会读它。  
> **Make it stick / 持久化**：打开 `/memory` 检查 Claude 写了什么。

---

### 16.5 Ship / 上线

#### Git

##### Resolve merge conflicts / 解决合并冲突

```text
resolve the merge conflicts in this branch and explain what you kept from each side
```

```text
解决这个分支上的合并冲突，并解释你在每一侧分别保留了什么。
```

> **Why this works / 这样写为什么有效**：说明你想要的最终状态，而不是要保留哪个 marker。让 Claude 解释决策让合并可被审，而不是一个黑盒。

##### Commit with a generated message / 用自动生成的信息提交

```text
commit these changes with a message that summarizes what I did
```

```text
提交这些改动，用一条总结我做了什么的提交信息。
```

> **Why this works / 这样写为什么有效**：让 Claude 从 diff 推导信息。它会匹配你仓库现有的 commit 风格。

##### Open a pull request from a ticket / 从工单开 PR

```text
find the Linear ticket about the login timeout and open a PR that implements it
```

```text
找到与登录超时相关的 Linear 工单，并开一个实现它的 PR。
```

> **Why this works / 这样写为什么有效**：省去在 tracker、编辑器、GitHub 之间来回切换。一条 prompt 就能读规格、做改动、开 PR。  
> **Needs / 依赖**：你的 issue tracker 作为 claude.ai connector 或 MCP server 接入。

#### Release / 发布

##### Draft release notes from git history / 从 Git 历史起草 release notes

```text
compare v2.3.0 to v2.4.0 and draft release notes grouped by feature, fix, and breaking change
```

```text
对比 v2.3.0 和 v2.4.0，按 feature、fix、breaking change 三类起草 release notes。
```

> **Why this works / 这样写为什么有效**：给两个参照点和你想要的结构。Claude 读两者之间的 commit log 并起草一份可继续编辑的 changelog。  
> **Make it stick / 持久化**：把它保存为 `/changelog` skill。

##### Write a CI workflow / 编写 CI 工作流

```text
write a GitHub Actions workflow that runs the tests and deploys to staging on every push to main
```

```text
写一个 GitHub Actions workflow：每次推送到 main 时跑测试并部署到 staging。
```

> **Why this works / 这样写为什么有效**：描述触发时机和要做的事；YAML 会按你项目的构建与测试命令自动生成。

---

### 16.6 Operate / 运行

#### Debug / 调试

##### Find and fix a failing test / 定位并修复失败测试 ★ Start 3

```text
the UserAuth test is failing, find out why and fix it
```

```text
UserAuth 这个测试在失败，找出原因并修复它。
```

> **Why this works / 这样写为什么有效**：描述症状即可，不需要知道是哪个文件出错。Claude 自己运行测试看失败，再追踪到源代码并修复。

##### Investigate a reported error / 排查上报的错误

```text
users are seeing 500 errors on /api/settings. investigate and tell me what is going on
```

```text
用户在 /api/settings 上看到 500 错误。请排查并告诉我发生了什么。
```

> **Why this works / 这样写为什么有效**：描述症状和位置；Claude 会读相关代码路径并追溯可能原因。如果有 stack trace 或日志就一起粘进来。  
> **Make it stick / 持久化**：在 runbook 里放一个 deeplink，直接用这条 prompt 打开 Claude。

##### Fix a build error at the root / 从根因修复构建错误

```text
here is a build error. fix the root cause and verify the build succeeds
```

```text
这是一个构建错误。请修复根因并验证构建成功。
```

> **Why this works / 这样写为什么有效**：要求修复根因并验证，可以避免那种只是把错误压下去的表层补丁。  
> **使用方式**：先把错误输出粘进 prompt，再发送这条 prompt。

#### Incident / 事故

##### Investigate a production incident / 排查生产事故

```text
the checkout endpoint started returning 500s an hour ago. check the logs, recent deploys, and config changes, then tell me the most likely cause
```

```text
一小时前 checkout 端点开始返回 500。请检查日志、最近的发布以及配置变化，然后告诉我最可能的原因。
```

> **Why this works / 这样写为什么有效**：列出需要相互印证的证据源，而不是规定步骤。Claude 同时读日志、git 历史和配置来缩小原因范围。  
> **Make it stick / 持久化**：通过 MCP 接入 Sentry 或你的日志存储。

##### Diagnose from a console screenshot / 从控制台截图诊断

```text
here is a screenshot of the GCP Kubernetes dashboard. walk me through why this pod is failing and give me the exact commands to fix it
```

```text
这是一张 GCP Kubernetes 控制台的截图。请带我看清这个 pod 为什么失败，并给出我可以直接执行的修复命令。
```

> **Why this works / 这样写为什么有效**：云控制台告诉你问题，但不给修复命令。Claude 读截图，把仪表盘翻译成可以直接运行的 kubectl / gcloud / aws 命令。  
> **使用方式**：粘贴、拖入或用 @ 引用你的截图，然后发送这条 prompt。

##### Query logs in plain English / 用自然语言查询日志

```text
show me all failed logins for the auth service over the past 24 hours. write the query, run it, and tell me what stands out
```

```text
查出过去 24 小时 auth 服务所有失败的登录。写出查询、运行它，并告诉我有什么值得关注。
```

> **Why this works / 这样写为什么有效**：直接提问，而不是自己写 SQL。Claude 会构造查询、对接入的日志源运行，并把查询和结果一并展示，方便你核对实际跑了什么。  
> **Needs / 依赖**：你的数据仓库或日志存储作为 claude.ai connector 或 MCP server 接入。

#### Data / 数据

##### Analyze a data file / 分析数据文件

```text
read @reports/q1-signups.csv, summarize the key patterns, and write the results to an HTML page with charts, then open it in my browser
```

```text
读取 @reports/q1-signups.csv，总结关键模式，把结果写成一个带图表的 HTML 页面，然后在浏览器中打开。
```

> **Why this works / 这样写为什么有效**：一次性的问题不需要一次性脚本。指向项目目录里的文件，Claude 会直接读取、找出模式，并把输出写到你指定的位置。  
> **Make it stick / 持久化**：通过 MCP 接入数据源，而不是导出文件。  
> **使用方式**：把文件拖进 prompt，或把路径替换成你自己的 @ 引用。

##### Generate variations from performance data / 基于绩效数据生成变体

```text
read @ads-performance.csv, find the underperforming headlines, and generate 20 new variations that stay under 90 characters
```

```text
读取 @ads-performance.csv，找出表现不佳的标题，并生成 20 个新的变体，每个都不超过 90 个字符。
```

> **Why this works / 这样写为什么有效**：在最前面就声明约束，生成过程才会自始至终都在限制内。Claude 读取指标、选择要替换的对象，并产出符合约束的备选项。  
> **Make it stick / 持久化**：通过 MCP 接入广告平台，而不是导出文件。

#### Automate / 自动化

##### Turn a recurring task into a skill / 把重复任务变成 skill

```text
create a /ship skill for this project that runs the linter and tests, then drafts a commit message
```

```text
为本项目创建一个 /ship skill：先跑 linter 和测试，再起草一条 commit 信息。
```

> **Why this works / 这样写为什么有效**：步骤只说一次，作为命令可重复使用。Claude 会写出一个团队任何人都能运行的 skill。

##### Add a hook for repeat behavior / 用 hook 让行为自动化

```text
write a hook that runs prettier after every edit to a .ts or .tsx file
```

```text
写一个 hook：在每次编辑 .ts 或 .tsx 文件之后自动运行 prettier。
```

> **Why this works / 这样写为什么有效**：hook 让行为自动发生，而不是每次都要记得去要求。描述触发和动作，Claude 会写出 hook 配置。

##### Connect a tool with MCP / 用 MCP 连接工具

```text
set up the Sentry MCP server so you can read my error reports directly
```

```text
配置 Sentry 的 MCP server，让你可以直接读取我的错误报告。
```

> **Why this works / 这样写为什么有效**：把数据源连一次，而不是每个会话都粘贴一次数据。MCP 配置好之后，再问相关问题时 Claude 直接从工具读取。

##### Capture what to remember for next time / 记下下次需要记得的事

```text
summarize what we did this session and suggest what to add to CLAUDE.md
```

```text
总结我们这次会话做了什么，并建议哪些内容应该加到 CLAUDE.md。
```

> **Why this works / 这样写为什么有效**：趁还没忘之前先问。Claude 知道这一轮里它"摸索出来"的东西，会建议写进 `CLAUDE.md`，让下一个会话从这些上下文开始而不是从零再学。

---

### 16.7 What Makes These Prompts Work / 这些 Prompt 为什么有效

以上 prompt 共享几种模式。识别它们，可以让你把任何一条改写成自己的任务。

#### Describe the outcome, not the steps / 描述结果，而不是规定步骤

说明你想要什么，让 Claude 自己找文件。下面这条不点名任何文件路径也能用。

```text
add rate limiting to the public API and make sure existing tests still pass
```

```text
给公开 API 增加限流，并确保现有测试仍然通过。
```

#### Give it a way to check its own work / 给它自检方式

把"运行 / 测试 / 对比 / 验证"放在同一条 prompt 里，Claude 会持续迭代，而不是做完一次就停下。

```text
write the migration, run it against the dev database, and confirm the schema matches
```

```text
编写迁移，在开发数据库上运行，并确认 schema 匹配。
```

#### Point at a reference / 指向参考

指明一个已经存在的文件、测试或模式，让新代码和你已有的东西保持一致。

```text
add a settings page that follows the same layout as the profile page
```

```text
新增设置页，布局与个人资料页保持一致。
```

#### State the measurable target / 给出可衡量目标

当目标是性能或覆盖率时，给出指标和阈值，让"完成"没有歧义。

```text
get the bundle size under 200KB and show me what you removed
```

```text
把 bundle size 降到 200KB 以下，并告诉我删除了什么。
```

#### Give it the artifact / 提供真实材料

把错误、日志、截图、plan 输出直接粘到 prompt 里，或用 `@` 引用文件。Claude 读原始材料，而不是读你对它的描述。

```text
why is the build failing? @build.log
```

```text
为什么构建失败？请查看 @build.log。
```

#### Say how you want the answer / 指定回答形式

指出格式、长度或受众，让解释贴合你接下来要怎么用它。想让某种格式成为默认，设置 output style。

```text
explain how the payment retry logic works as an HTML page with a diagram, then open it in my browser
```

```text
把支付重试逻辑解释成一个带图表的 HTML 页面，然后在浏览器中打开。
```

---

### 16.8 Sources and Related Resources / 来源与延伸资源

官方页面说明这些 Prompt 来自 Anthropic 已发布资源中的模式。每张卡片都会链回它的来源：

- **Common workflows / 常见工作流**：https://code.claude.com/docs/en/common-workflows — 核心任务的分步指南
- **Best practices / 最佳实践**：https://code.claude.com/docs/en/best-practices — 提示模式与项目配置
- **How Anthropic teams use Claude Code**：https://claude.com/blog/how-anthropic-teams-use-claude-code — 工程、产品、设计、数据团队的真实工作流，并有 [legal](https://claude.com/blog/how-anthropic-uses-claude-legal)、[marketing](https://claude.com/blog/how-anthropic-uses-claude-marketing) 和 [cybersecurity](https://claude.com/blog/how-anthropic-uses-claude-cybersecurity) 的专项深入
- **Scaling agentic coding guide / 规模化 agentic coding 指南**：https://resources.anthropic.com/hubfs/Scaling%20agentic%20coding%20across%20your%20organization.pdf — 企业落地指南
- **Claude Code in Action / 实战课**：https://anthropic.skilljar.com/claude-code-in-action — Anthropic Academy 免费视频课，演示这些模式

当某条 Prompt 在你的项目里效果稳定后，下一步不是反复复制，而是把它沉淀成团队可复用的 [`/command`](https://code.claude.com/docs/en/commands) 或 [skill](https://code.claude.com/docs/en/skills)，并把 Claude 学到的约定记入项目级 [`CLAUDE.md`](https://code.claude.com/docs/en/memory) / `AGENTS.md`。需要更稳的大改动时，先用 [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) 让 Claude 先列文件清单再动手。
