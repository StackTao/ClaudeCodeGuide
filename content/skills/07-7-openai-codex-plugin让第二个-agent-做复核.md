## 7. OpenAI Codex Plugin：让第二个 agent 做复核

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
