## 15. Claude Radar / Quickref / Repomix

来源等级：社区工具 / 中。工具名称和命令以各自仓库 README 为准，本章只保留用途和风险判断。

这类不是“写代码流程插件”，而是辅助你管理上下文和配置。

### Claude Radar / Quickref

用途：

- 扫描本地 Claude 配置。
- 列出 installed skills、agents、MCP servers、plugins。
- 生成 cheat sheet。

风险：

- 会读取本地配置路径。
- 可能暴露 MCP 名称、插件名、组织信息。
- 不要公开上传生成结果。

### Repomix / repo packing

用途：

- 把仓库打包成 AI 友好的上下文。
- 给审查模型或外部 agent 分析。
- 生成架构快照。

风险：

- 容易把 secret、客户数据、私有代码一并打包。
- 大仓库直接全量打包会浪费上下文。
- 优先打包相关模块。

验证方式：

- 生成前先配置 ignore，排除 `.env`、密钥、客户数据、构建产物和大型二进制。
- 生成后用文本搜索抽查是否包含 token、私有 URL、账号、测试数据。
- 对外发送前只保留本轮任务需要的模块，避免“全仓库打包”变成默认动作。
