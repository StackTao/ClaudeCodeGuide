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
