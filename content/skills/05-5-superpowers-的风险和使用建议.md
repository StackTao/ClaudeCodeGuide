## 5. Superpowers 的风险和使用建议

来源等级：官方插件能力 + 社区双源验证。风险项主要来自社区使用反馈和插件系统安全边界。

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

安装检查：

- 在 `/plugin` 详情页查看 Will install，确认是否包含 hooks、MCP/LSP 或额外 agents。
- 检查 context cost，避免简单任务每轮都带入大量流程说明。
- 如果团队共享，把启用规则写进项目文档，不把个人偏好直接提交为团队默认。

建议写入 `CLAUDE.md`：

```markdown
## Workflow Rules
- For non-trivial feature work, use Superpowers brainstorming before editing.
- For bug fixes, use TDD: write or identify a failing test before implementation.
- For multi-file changes, produce a plan and get approval before editing.
- For trivial edits, avoid heavy workflow overhead.
```
