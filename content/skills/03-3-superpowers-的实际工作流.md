## 3. Superpowers 的实际工作流

来源等级：GitHub README / 官方插件说明。下面是工作流摘要，不是 Claude Code 内置强制流程。

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

风险边界：

- Superpowers 的强项是“流程纪律”。如果只是改一个 typo，它会显得重。
- 如果是中大型功能，它能减少“Claude 直接冲进去写错方向”的概率，但不能替代需求 review、测试和人工验收。
- 如果自动触发不符合你的团队节奏，把它改成显式调用：只在提示词里写明“Use Superpowers workflow”时启用。
