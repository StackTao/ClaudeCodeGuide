## 7. OpenAI Codex Plugin：让第二个 agent 做复核

来源等级：GitHub 仓库 / 社区双源验证。命令和安装方式以 `openai/codex-plugin-cc` 当前 README 与 marketplace manifest 为准。

GitHub：`openai/codex-plugin-cc`

用途：

- 在 Claude Code 内调用 Codex。
- 对当前 diff 做 second pass。
- 做 adversarial review。
- Claude 卡住时让 Codex rescue。

安装线索：

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@codex-plugin-cc
/reload-plugins
/codex:setup
```

常用命令：

```text
/codex:review
/codex:adversarial-review
/codex:rescue
/codex:status
/codex:result
/codex:cancel
```

推荐用法：

```text
先让 Claude 完成实现和测试。
再运行 /codex:adversarial-review 审查当前 diff。
只接受有文件、行号、可复现证据的问题。
```

风险：

- 需要额外认证和 Codex CLI/Node 环境。
- 两个 agent 互相修可能无限循环。
- 不要让 Claude 和 Codex 同时高权限改同一批文件。
- 只把 Codex 的输出当作 review 线索；没有文件、行号、复现路径的问题不要直接改。

验证方式：

- 安装前检查插件是否声明 hooks、MCP 或 shell 命令。
- 先用只读 review 命令跑当前 diff，再决定是否让主 agent 修改。
- 高风险改动保留人类 reviewer，避免“两个模型互相同意”被误当成验证。
