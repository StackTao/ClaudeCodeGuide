## 第六章：GitHub 实战：PR、Review、CI、Issue 修复

### 6.1 Claude Code 与 GitHub

官方提供 Claude Code GitHub Actions，用于在 GitHub 工作流中响应 issue、PR 评论或自动化开发任务。适合团队把一部分重复维护工作交给 Claude Code，例如：

- 根据 issue 创建修复 PR。
- 对 PR 做代码审查。
- 分析 CI 失败日志。
- 根据评论更新代码。

### 6.2 GitHub 任务的安全边界

在 CI 或 GitHub Actions 中使用 Claude Code 时，要特别注意：

- 权限最小化。
- 不把 secret 输出到日志。
- 限制能触发自动化的用户。
- 对外部 PR 保守处理。
- 生成的代码必须经过测试和人工 review。

### 6.3 Issue 修复模板

```text
请根据 issue 描述修复问题。
步骤：
1. 先复述问题和预期行为。
2. 找到相关代码和测试。
3. 写一个最小失败测试。
4. 实现最小修复。
5. 运行相关测试。
6. 总结改动和验证结果。

限制：
- 不做无关重构。
- 不改公共 API，除非 issue 明确要求。
```

### 6.4 PR Review 模板

```text
请以代码审查者身份检查当前 diff。
优先级：
1. 行为 bug
2. 安全问题
3. 并发/边界条件
4. 测试缺口
5. 可维护性

请只列有证据的问题，附文件和行号。
不要输出泛泛而谈的建议。
```

本章要点：

- GitHub 集成适合重复性维护，不适合无人值守合并。
- CI 日志、issue、PR diff 都是高价值上下文。
- 自动化权限要最小化。

实战清单：

- 限制触发者。
- 检查 secret 暴露风险。
- 要求所有自动 PR 通过测试和人工 review。
