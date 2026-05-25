## 2. 为什么 Superpowers 必须单独讲

来源等级：官方插件页 + GitHub 仓库 + 社区双源验证。能力事实以官方插件页和仓库 README 为准，体验判断来自社区文章和实测反馈。

核心结论：Superpowers 不是普通 prompt，也不是一个“多几个命令”的小插件。它更像软件工程方法论插件，作者是 Jesse Vincent，官方 Claude 插件页对它的描述是：让 Claude 学会 brainstorming、subagent development with code review、debugging、TDD、skill authoring。

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

验证方式：

- 安装前在 `/plugin` 详情页查看 context cost、last updated、Will install。
- 安装后运行 `/reload-plugins`，再用 `/skills` 或 `/plugin` 确认实际加载的 skills。
- 团队项目不要只看推荐文章，应 review 插件 manifest、hooks、MCP/LSP 和命令入口。
