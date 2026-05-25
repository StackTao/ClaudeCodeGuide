## 17. GitHub / Sentry / Slack / Notion / Linear / Figma

来源等级：官方/第三方集成。是否可用、权限范围和安装方式以 Claude Code 插件详情页及对应服务授权页为准。

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
- 对会写评论、建 issue、改 ticket、发 Slack 的插件，先在个人或测试项目确认写入范围。
- Sentry、Notion、Linear/Jira 里的客户信息和内部讨论默认按敏感数据处理。

验证方式：

- 授权后先执行只读查询，确认看到的是预期 workspace / org / repo。
- 写操作必须让 Claude 先输出计划和目标对象，再人工确认。
