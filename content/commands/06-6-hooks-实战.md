## 6. Hooks 实战

Hooks 让 Claude Code 在工具调用前后运行脚本、HTTP、MCP tool、prompt 或 agent。官方 hooks reference 强调：`PreToolUse` 可在工具执行前阻止或询问；`PostToolUse` 只能在工具执行后反馈，不能撤销已发生的副作用。

### 6.1 写文件后自动检查风格

`.claude/settings.json`：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/check-style.sh",
            "args": [],
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

适合：

- 格式检查。
- lint 提醒。
- 生成文件保护。

### 6.2 阻止危险命令

思路：用 `PreToolUse` 匹配 `Bash`，检查命令是否包含 `rm -rf`、`git push`、生产部署等。

项目规则：

```text
任何删除、推送、部署、迁移命令必须人工确认。Hook 应默认 deny。
```

注意：

- 阻止必须发生在 `PreToolUse`，因为 `PostToolUse` 已经执行完了。
- Windows 项目可以按官方 hooks 文档使用 PowerShell hook。

### 6.3 测试输出瘦身

官方成本文档建议用 hooks 或 skills 预处理大日志，避免 Claude 读完整 10000 行日志。示例思路：

```bash
pytest 2>&1 | grep -A 5 -E '(FAIL|ERROR|error:)' | head -100
```

适合：

- 大型测试套件。
- CI 日志。
- 高频失败排查。
