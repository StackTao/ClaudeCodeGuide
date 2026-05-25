## 9. Context7：框架文档实时注入

Context7 是社区和官方相关页里经常出现的 MCP/插件，用于拉取特定版本库文档和代码示例，减少模型凭旧知识写错 API。

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
