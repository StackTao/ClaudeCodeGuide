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
