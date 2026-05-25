## 8. Code Simplifier：反 AI 味和反过度设计

来源等级：官方插件页 / 社区线索。能力事实以官方 marketplace 或插件详情页为准，X 转帖只作为发现线索。

官方 Superpowers 插件页的 related plugins 中列出 Code Simplifier，描述是简化和精炼最近修改的代码，同时保持功能和一致性。

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

不适合：

- 公开 API 还没有测试保护时直接大范围简化。
- 安全、权限、数据迁移代码里为了“看起来简洁”删除防御性检查。
- 团队还没定义代码风格时把它当成自动格式化器。

验证方式：运行原有测试，额外人工检查 public API、错误处理和边界条件是否被删弱。
