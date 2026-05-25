## 9. Context7：框架文档实时注入

来源等级：社区双源验证 / MCP 生态。能力事实以 Context7 官方仓库、服务文档或 Claude Code 插件详情页为准。

核心结论：Context7 用于拉取特定版本库文档和代码示例，减少模型凭旧知识写错 API。

适合：

- Next.js、React、Vue、Svelte、Supabase、Prisma 等版本变化快的项目。
- 写集成代码。
- 新库不熟时先查官方文档。

提示词：

```text
Before implementing, use Context7 to check the current docs for [library/framework].
Cite the exact API or option you rely on.
Do not use deprecated APIs.
```

注意：

- Context7 解决“库文档新旧”问题，不解决项目本地约定。
- 对关键行为仍要跑测试。
- 远程 MCP 可能接收查询内容；公司代码使用前要确认数据边界。
- 对安全、计费、迁移类 API，不只看示例，还要打开官方文档原文核对。
