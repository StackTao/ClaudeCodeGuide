## 第三章：上下文工程：AGENTS.md、CLAUDE.md、目录约定

### 3.1 上下文文件的作用

官方文档把 memory/context 视为 Claude Code 工作质量的重要基础。实践中，`CLAUDE.md`、`AGENTS.md` 这类文件相当于“项目里的长期交接文档”。它不该写成愿望清单，而应该写成可执行约束。

好的上下文文件有三个特点：

- **短**：只保留会影响代码行为的规则。
- **具体**：写命令、路径、约定，不写空泛价值观。
- **可验证**：能被执行或检查。

### 3.2 推荐结构

```markdown
# Agent Instructions

## Project
- Stack: Next.js, TypeScript, pnpm
- App entry: `src/app`
- Tests: `pnpm test`
- Typecheck: `pnpm typecheck`

## Rules
- Keep changes scoped to the request.
- Prefer existing components and utilities.
- Do not edit generated files.
- Do not read or print `.env*`.
- Run focused tests for touched code.

## Workflow
1. Inspect before editing.
2. State assumptions if unclear.
3. Add or update tests for behavior changes.
4. Summarize changed files and verification.
```

### 3.3 常见反模式

不要把上下文文件写成这样：

- “你是世界顶级工程师，请写完美代码。”
- “尽可能优化所有东西。”
- “自动修复你看到的任何问题。”
- “支持未来所有扩展。”

这些指令会诱导过度设计和无关重构。更好的写法是：

```text
只修改与当前任务直接相关的文件。发现无关问题时在最终回复中说明，不要顺手修改。
```

### 3.4 分层上下文

大型项目可以使用分层说明：

- 根目录：全局开发规则。
- 子模块目录：该模块特有约定。
- 测试目录：测试风格和命名约定。
- 运维目录：部署和安全约束。

注意不要让规则互相冲突。冲突规则越多，模型越容易表现不稳定。

本章要点：

- 上下文文件是项目级“工作协议”。
- 少写人格设定，多写工程约束。
- 规则要短、具体、可验证。

实战清单：

- 删除空泛赞美型提示。
- 加上测试命令和禁止范围。
- 为大型仓库建立模块级说明。
