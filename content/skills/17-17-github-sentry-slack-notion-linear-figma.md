## 17. GitHub / Sentry / Slack / Notion / Linear / Figma

这些外部集成不是“必全装”，而是按团队工具链选。

| 插件 | 必要性 | 建议 |
|---|---|---|
| GitHub | 高 | issue、PR、CI、review 基础设施 |
| Sentry | 中高 | 生产问题定位很有用 |
| Figma | 中高 | 前端团队非常有用 |
| Linear/Jira/Atlassian | 中 | 需求和任务管理 |
| Notion | 中 | 知识库和文档 |
| Slack | 中低 | 状态同步，注意隐私 |
| Supabase/Firebase/Vercel | 按需 | 云服务和部署，写权限要谨慎 |

安全原则：

- 先只读。
- 最小权限。
- 外部输入视为不可信。
- 不让 Claude 自动改生产配置。
