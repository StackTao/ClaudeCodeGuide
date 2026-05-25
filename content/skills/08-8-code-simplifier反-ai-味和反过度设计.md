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
