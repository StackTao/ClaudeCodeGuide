## 10. Code Review / PR Review Toolkit

用途：

- 本地审查当前 diff。
- PR review。
- 安全、兼容性、测试缺口检查。
- 让 review 输出按严重程度排序。

推荐搭配：

- Superpowers：执行前后做流程 gate。
- Codex plugin：第二模型 adversarial review。
- GitHub plugin：读取 PR、评论和 CI。

审查 prompt：

```text
Review the current diff.
Only report evidence-backed issues that can cause bugs, security problems, data loss, compatibility breaks, or missing tests.
Include file and line. Avoid style-only comments.
```
