## 1. 项目 AGENTS.md 模板

```markdown
# Agent Instructions

## Project
- Stack: [填写技术栈]
- Package manager: [npm/pnpm/yarn/maven/gradle/cargo/go 等]
- App entry: `[入口路径]`
- Tests: `[测试命令]`
- Typecheck/build: `[检查命令]`

## Core Rules
- Inspect existing code before editing.
- Keep changes scoped to the user's request.
- Match existing style and architecture.
- Do not refactor unrelated code.
- Do not edit generated files unless explicitly requested.
- Do not read, print, or modify `.env*`, private keys, tokens, or credential files.

## Workflow
1. State assumptions when the request is ambiguous.
2. Find existing tests before adding new ones.
3. For bug fixes, write or identify a minimal failing test first.
4. Make the smallest change that satisfies the request.
5. Run focused tests for touched behavior.
6. Summarize changed files, verification, and remaining risks.

## Forbidden Without Explicit Approval
- Deleting files or directories.
- Running database migrations.
- Pushing to remote branches.
- Deploying to production.
- Installing new dependencies.
- Printing secrets or credentials.
```
