## 10. Code Review / PR Review Toolkit

来源等级：官方 Commands + 官方插件页。`/code-review`、`/review`、`/security-review` 是官方命令事实；PR Review Toolkit 是官方 marketplace 的 development workflow 插件。

用途：

- 本地审查当前 diff。
- PR review。
- 安全、兼容性、测试缺口检查。
- 让 review 输出按严重程度排序。

推荐搭配：

- Superpowers：执行前后做流程 gate。
- Codex plugin：第二模型 adversarial review。
- GitHub plugin：读取 PR、评论和 CI。

使用边界：

- 默认先用 `/code-review` 看当前 diff；需要 PR 上下文时再用 `/review [PR]` 或 GitHub 插件。
- 安全敏感改动额外跑 `/security-review`，但不要替代安全测试和人类审查。
- `--comment` 这类会写 PR 评论的能力，先确认 GitHub 权限和团队约定。

审查 prompt：

```text
Review the current diff.
Only report evidence-backed issues that can cause bugs, security problems, data loss, compatibility breaks, or missing tests.
Include file and line. Avoid style-only comments.
```
