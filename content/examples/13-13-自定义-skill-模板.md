## 13. 自定义 Skill 模板

目录：

```text
.claude/skills/[skill-name]/
└── SKILL.md
```

`SKILL.md`：

```markdown
---
name: [skill-name]
description: [什么时候应该使用这个 skill]
argument-hint: [可选参数提示]
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*)
---

# [Skill Name]

## Goal
[这个 skill 要完成什么]

## Workflow
1. [第一步]
2. [第二步]
3. [第三步]

## Output
- [输出项 1]
- [输出项 2]
- [输出项 3]
```

使用：

```text
/[skill-name] [arguments]
```
