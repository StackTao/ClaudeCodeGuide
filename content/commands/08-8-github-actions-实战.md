## 8. GitHub Actions 实战

官方 Claude Code GitHub Actions 文档说明，Action 可用 `prompt`、`claude_args`、`anthropic_api_key`、`github_token`、`trigger_phrase` 等参数。

### 8.1 PR 自动审查

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "/review"
          claude_args: "--max-turns 5"
```

建议：

- review 只作为辅助，不自动合并。
- 对外部 fork PR 更谨慎。
- 限制 token、权限和回合数。

### 8.2 CI 失败修复

```yaml
name: Claude CI Triage
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  triage:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Analyze the failed CI logs, identify the first root-cause error, and propose the smallest fix. Do not skip tests."
          claude_args: "--max-turns 3"
```

注意：

- 给 Action 的 GitHub token 最小权限。
- 不允许它泄露 secrets。
- 自动修复 PR 必须人工 review。
