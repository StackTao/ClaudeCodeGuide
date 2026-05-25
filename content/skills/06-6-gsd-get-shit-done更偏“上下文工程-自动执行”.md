## 6. GSD / Get Shit Done：更偏“上下文工程 + 自动执行”

GSD 是另一个社区高频提到的增强系统。和 Superpowers 相比，它更强调：

- context rot 管理。
- spec-driven development。
- fresh context / wave execution。
- backlog、roadmap、phase、todo、audit、review、release 等完整工程流。

社区资料常把它描述为 `Discuss → Plan → Execute → Verify` 的系统。部分插件索引显示它包含大量 commands 和 agents，适合把项目拆成 roadmap、milestone、phase 后自动推进。

安装线索会随仓库变化，常见方式包括：

```text
npx get-shit-done-cc@latest
```

或插件索引中的：

```text
npx claudepluginhub glittercowboy/get-shit-done --plugin get-shit-done
```

推荐判断：

| 任务 | Superpowers | GSD |
|---|---|---|
| 中型功能 | 更推荐 | 可用但可能重 |
| 大型、多阶段项目 | 可用 | 更适合 |
| TDD 强约束 | 更强 | 通常较轻 |
| 上下文隔离 | 有 worktree/subagent | 更强调 |
| 自动推进很多阶段 | 较保守 | 更激进 |
| 新手上手 | 更清晰 | 需要更多理解 |

注意：

- Reddit 上既有高度评价，也有人认为 GSD/Superpowers 对小任务是“训练轮”。
- GSD 类工具会带来大量命令、agents、hooks，安装前必须审查。
- 如果你还没有稳定测试和项目说明，先不要让它长时间自动执行。
