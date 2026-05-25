## 5. 自定义 Skills / Commands

新版官方文档把 custom slash commands 并入 skills 体系：`.claude/commands/*.md` 仍可用，但推荐使用 `.claude/skills/<name>/SKILL.md`，因为 skills 支持 supporting files、frontmatter、按需加载和更丰富控制。

### 5.1 何时创建 skill

适合：

- 每天重复的 PR review。
- 固定格式的发布检查。
- 安全扫描流程。
- 项目专属运行/验证流程。
- 复杂但低频的迁移步骤。

不适合：

- 一次性任务。
- 项目长期事实。长期事实放 `CLAUDE.md`。
- 只需要一句话的简单提示。

### 5.2 最小 skill 示例：变更总结

目录：

```text
.claude/skills/summarize-changes/
└── SKILL.md
```

内容：

```markdown
---
name: summarize-changes
description: Summarize current git changes and flag risky edits.
allowed-tools: Bash(git diff:*), Bash(git status:*), Read, Grep, Glob
---

请总结当前工作区改动：
1. 修改文件
2. 行为变化
3. 风险
4. 建议测试

先读取 git status 和 git diff，再输出结论。
```

使用：

```text
/summarize-changes
```

### 5.3 带参数的 skill

```markdown
---
name: fix-issue
description: Fix a GitHub issue by number using project workflow.
argument-hint: [issue-number]
allowed-tools: Bash(gh issue view:*), Bash(git status:*), Read, Grep, Glob, Edit
---

Issue number: $ARGUMENTS

步骤：
1. 读取 issue。
2. 复述问题和验收标准。
3. 定位代码和测试。
4. 写最小失败测试。
5. 实现最小修复。
6. 总结验证。
```

使用：

```text
/fix-issue 123
```
