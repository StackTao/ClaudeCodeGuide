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
