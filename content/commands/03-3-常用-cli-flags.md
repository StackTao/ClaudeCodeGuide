## 3. 常用 CLI flags

### 3.1 `--permission-mode`

用途：指定会话启动权限模式。官方 CLI reference 提到可接受 `default`、`acceptEdits`、`plan`、`auto`、`dontAsk`、`bypassPermissions` 等模式。

示例：

```bash
claude --permission-mode plan
claude --permission-mode acceptEdits
```

推荐：

- 复杂需求：用 `plan`。
- 小范围编辑：用默认或 `acceptEdits`。
- 不建议日常使用 `bypassPermissions`。

### 3.2 `--max-turns`

用途：限制 print mode 或 GitHub Action 中的 agent 回合数。

示例：

```bash
claude -p "Review this diff" --max-turns 3
```

适合场景：

- CI 自动化。
- 防止任务无限探索。
- 控制成本。

### 3.3 `--model`

用途：指定模型。

示例：

```bash
claude --model sonnet
claude -p "Analyze this architecture" --model opus
```

建议：

- 日常编码优先 Sonnet。
- 架构、多阶段推理、疑难问题再用 Opus。
- 子任务可用更低成本模型。

### 3.4 `--output-format json` / `stream-json`

用途：结构化输出，适合脚本和 CI。

示例：

```bash
claude -p "Return changed modules and risk level" --output-format json
```

适合场景：

- 自动生成报告。
- 程序读取结果。
- Agent SDK 集成。

### 3.5 `--mcp-config`

用途：指定 MCP 配置。

示例：

```bash
claude --mcp-config ./mcp.json
```

适合场景：

- 项目级 MCP 配置。
- CI 或隔离环境中加载固定 MCP server。

### 3.6 `--add-dir`

用途：给当前会话增加额外工作目录访问权。

示例：

```bash
claude --add-dir ../shared-lib
```

适合场景：

- monorepo 外还有共享库。
- 需要同时阅读前端和后端两个目录。

注意：

- 官方文档提醒，`--add-dir` 主要授予文件访问；并非所有 `.claude/` 配置都会从附加目录自动发现。
- 多目录上下文很容易膨胀，要明确只读哪些路径。

### 3.7 `--debug` / `--debug-file`

用途：排查 Claude Code 自身问题、MCP 问题、hooks 问题。

示例：

```bash
claude --debug "api,mcp"
claude --debug-file ./claude-debug.log
```

注意：

- debug 日志可能包含路径、命令、上下文片段。
- 不要直接公开上传日志。

### 3.8 `--max-budget-usd`

用途：在 print mode 中设置预算上限。

示例：

```bash
claude -p "Analyze this repository and output a risk report" --max-budget-usd 5.00
```

适合场景：

- 自动化大任务。
- 批处理。
- 防止 CI 中成本失控。
