# Claude Code 资料索引与统计

> 统计日期：2026-05-22  
> 用途：为 `claude-code-guide.md` 提供来源、可信度标注和主题覆盖说明。

## 1. 来源统计

| 来源类型 | 数量 | 可信度 | 用途 |
|---|---:|---|---|
| 官方文档 / 官方博客 / 官方仓库 | 30 | 高 | 功能事实、权限、安全、GitHub Action、MCP、CLI 行为、命令教程、插件市场 |
| GitHub 仓库 / 模板 / Issues / Discussions | 30 | 中高 | 工程实践、配置模板、自动化工作流、插件/skills 仓库 |
| 社区博客 / Reddit / HN / X/Twitter / LinuxDO 公开内容 | 82 | 中 | 使用技巧、失败经验、工作流模式、真实案例线索、插件推荐 |
| 二次整理 / 视频文字稿 / 课程文章 | 18 | 中低 | 补充案例，需交叉验证 |

合计候选资料：154 条。

## 2. 主题覆盖统计

| 主题 | 来源覆盖 | 主要结论 |
|---|---:|---|
| 安装与入门 | 8 | 先完成官方安装和认证，再进入项目目录工作 |
| 上下文 / Memory | 12 | 项目说明文件应短、具体、可验证 |
| 权限与安全 | 10 | 默认最小权限，高风险命令需要确认 |
| MCP / 外部工具 | 8 | 适合只读数据源和工具扩展，生产写权限要谨慎 |
| GitHub / CI | 9 | 适合 issue、PR review、CI 失败分析，但需人工 review |
| 测试与验证 | 14 | bug 修复应优先最小失败测试 |
| Prompt / 任务拆解 | 16 | 目标、范围、成功标准比长提示更重要 |
| 大型项目 | 9 | 缩小上下文、分阶段执行、保留状态摘要 |
| 社区实战技巧 | 18 | 计划模式、diff 解释、短反馈回路效果明显 |
| CLI / Slash 命令 | 16 | CLI 用于启动/脚本化，slash 命令用于会话内控制 |
| Skills / Commands | 9 | 重复流程应从 CLAUDE.md 移到按需加载的 skills |
| Hooks / 自动验证 | 8 | PreToolUse 阻止风险，PostToolUse 反馈验证结果 |
| Goal-driven 工作流 | 8 | `/goal` 适合有可验证完成条件的长任务 |
| Plugins / Marketplaces | 16 | 官方 marketplace 优先，第三方需安全审查 |
| LSP / Code Intelligence | 8 | 语言插件可显著提升定位、诊断和修复能力 |
| 安全 Skills | 6 | 安全类 skills 价值高，但必须检查权限和命令 |
| Superpowers / GSD | 14 | Superpowers 偏工程纪律，GSD 偏上下文工程和自动执行 |
| LinuxDO 社区实战 | 30 | 中文社区对 Superpowers、GSD、Codex plugin、MCP、everything-claude-code 的坑点反馈很集中 |

## 3. 官方来源

| # | 来源 | 类型 | 主题 | 可信度 | 链接 |
|---:|---|---|---|---|---|
| 1 | Claude Code Overview | 官方文档 | 产品定位、基本能力 | 高 | https://docs.anthropic.com/en/docs/claude-code/overview |
| 2 | Claude Code Quickstart | 官方文档 | 安装、登录、入门 | 高 | https://docs.anthropic.com/en/docs/claude-code/quickstart |
| 3 | Claude Code CLI Reference | 官方文档 | 命令速查 | 高 | https://docs.anthropic.com/en/docs/claude-code/cli-reference |
| 4 | Claude Code Common Workflows | 官方文档 | 日常开发流 | 高 | https://docs.anthropic.com/en/docs/claude-code/common-workflows |
| 5 | Claude Code Memory | 官方文档 | CLAUDE.md、上下文 | 高 | https://docs.anthropic.com/en/docs/claude-code/memory |
| 6 | Claude Code Settings | 官方文档 | 配置 | 高 | https://docs.anthropic.com/en/docs/claude-code/settings |
| 7 | Claude Code Permissions | 官方文档 | 权限控制 | 高 | https://docs.anthropic.com/en/docs/claude-code/permissions |
| 8 | Claude Code Security | 官方文档 | 安全边界 | 高 | https://docs.anthropic.com/en/docs/claude-code/security |
| 9 | Claude Code MCP | 官方文档 | MCP 接入 | 高 | https://docs.anthropic.com/en/docs/claude-code/mcp |
| 10 | Claude Code GitHub Actions | 官方文档 | GitHub 自动化 | 高 | https://docs.anthropic.com/en/docs/claude-code/github-actions |
| 11 | Claude Code Hooks | 官方文档 | Hooks 自动化 | 高 | https://docs.anthropic.com/en/docs/claude-code/hooks |
| 12 | Claude Code Troubleshooting | 官方文档 | 排错 | 高 | https://docs.anthropic.com/en/docs/claude-code/troubleshooting |
| 13 | Claude Code Best Practices | Anthropic Engineering Blog | 实战建议 | 高 | https://www.anthropic.com/engineering/claude-code-best-practices |
| 14 | Claude Code SDK | 官方文档 | 程序化调用 | 高 | https://docs.anthropic.com/en/docs/claude-code/sdk |
| 15 | Claude Code GitHub Action | 官方 GitHub | GitHub 工作流 | 高 | https://github.com/anthropics/claude-code-action |
| 16 | Claude Code Commands | 官方文档 | slash 命令全集 | 高 | https://code.claude.com/docs/en/commands |
| 17 | Claude Code CLI Usage | 官方文档 | CLI 命令和 flags | 高 | https://code.claude.com/docs/en/cli-usage |
| 18 | Claude Code Skills | 官方文档 | custom commands / skills | 高 | https://code.claude.com/docs/en/slash-commands |
| 19 | Claude Code Hooks Reference | 官方文档 | hooks 事件和配置 | 高 | https://code.claude.com/docs/en/hooks |
| 20 | Claude Code Subagents | 官方文档 | subagents 和并行上下文 | 高 | https://code.claude.com/docs/en/sub-agents |
| 21 | Claude Code Costs | 官方文档 | 成本和上下文优化 | 高 | https://code.claude.com/docs/en/costs |
| 22 | Claude Code Output Styles | 官方文档 | 输出风格 | 高 | https://code.claude.com/docs/en/output-styles |
| 23 | Claude Code Goal | 官方文档 | `/goal` 完成条件和自动继续 | 高 | https://code.claude.com/docs/en/goal |
| 24 | Claude Code Changelog | 官方文档 | v2.1.139 `/goal`、agent view、`/scroll-speed` | 高 | https://code.claude.com/docs/en/changelog |
| 25 | Claude Code Agent View | 官方文档 | `claude agents` session 管理 | 高 | https://code.claude.com/docs/en/agent-view |
| 26 | Discover Plugins | 官方文档 | 插件安装、marketplace、官方插件分类 | 高 | https://code.claude.com/docs/en/discover-plugins |
| 27 | Create Plugins | 官方文档 | 插件结构和创建方式 | 高 | https://code.claude.com/docs/en/plugins |
| 28 | Plugins Reference | 官方文档 | plugin.json、single-skill plugin、manifest | 高 | https://code.claude.com/docs/en/plugins-reference |
| 29 | Plugin Marketplaces | 官方文档 | marketplace 分发 | 高 | https://code.claude.com/docs/en/plugin-marketplaces |
| 30 | Agent Skills User Guide | Anthropic 资料 | skills 设计和分发 | 高 | https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf |

## 4. GitHub 实践来源

| # | 来源 | 主题 | 可信度 | 链接 |
|---:|---|---|---|---|
| 1 | anthropics/claude-code-action | 官方 Action 示例 | 高 | https://github.com/anthropics/claude-code-action |
| 2 | anthropics/claude-code-base-action | 底层 GitHub Action | 高 | https://github.com/anthropics/claude-code-base-action |
| 3 | hesreallyhim/awesome-claude-code | 资源索引 | 中高 | https://github.com/hesreallyhim/awesome-claude-code |
| 4 | zhsama/claude-sub-agent | subagent 实践 | 中 | https://github.com/zhsama/claude-sub-agent |
| 5 | VoltAgent/awesome-claude-code-subagents | subagent 资源 | 中 | https://github.com/VoltAgent/awesome-claude-code-subagents |
| 6 | SuperClaude-Org/SuperClaude_Framework | 命令和工作流扩展 | 中 | https://github.com/SuperClaude-Org/SuperClaude_Framework |
| 7 | sudowrite/awesome-claude-code | 社区技巧聚合 | 中 | https://github.com/sudowrite/awesome-claude-code |
| 8 | zokugun/claude-code-docs | 文档镜像/整理 | 中 | https://github.com/zokugun/claude-code-docs |
| 9 | disler/claude-code-hooks-mastery | hooks 示例 | 中 | https://github.com/disler/claude-code-hooks-mastery |
| 10 | OneRedOak/claude-code-workflows | 工作流模板 | 中 | https://github.com/OneRedOak/claude-code-workflows |
| 11 | contains-studio/agents | agent 配置集合 | 中 | https://github.com/contains-studio/agents |
| 12 | marckrenn/claude-code-changelog | 命令变化追踪 | 中 | https://github.com/marckrenn/claude-code-changelog |
| 13 | apify/mcpc | MCP CLI 实战项目 | 中 | https://github.com/apify/mcpc |
| 14 | anthropics/claude-plugins-community | 社区 marketplace | 中高 | https://github.com/anthropics/claude-plugins-community |
| 15 | anthropics/claude-code | demo plugins marketplace | 高 | https://github.com/anthropics/claude-code |
| 16 | openai/codex-plugin-cc | Codex second-pass 插件 | 中高 | https://github.com/openai/codex-plugin-cc |
| 17 | anthropics/skills | 官方 Agent Skills | 高 | https://github.com/anthropics/skills |
| 18 | trailofbits/skills | 安全 skills marketplace | 中高 | https://github.com/trailofbits/skills |
| 19 | cblecker/claude-plugins | Claude Code skills collection | 中 | https://github.com/cblecker/claude-plugins |
| 20 | theSnackOverflow/claude-radar | 本地配置扫描/推荐插件 | 中 | https://github.com/theSnackOverflow/claude-radar |
| 21 | obra/superpowers | Superpowers 官方源码 | 高 | https://github.com/obra/superpowers |
| 22 | obra/superpowers-marketplace | Superpowers marketplace | 中高 | https://github.com/obra/superpowers-marketplace |
| 23 | obra/superpowers-chrome | Chrome DevTools 控制插件 | 中 | https://github.com/obra/superpowers-chrome |
| 24 | glittercowboy/get-shit-done | GSD 工作流系统 | 中 | https://github.com/glittercowboy/get-shit-done |
| 25 | mvanhorn/last30days-skill | last30days research skill | 中 | https://github.com/mvanhorn/last30days-skill |

## 5. 社区与实战来源

| # | 来源 | 主题 | 可信度 | 链接 |
|---:|---|---|---|---|
| 1 | Boris Cherny / Anthropic 工程博客访谈与技巧 | 官方团队经验 | 高 | https://www.anthropic.com/engineering/claude-code-best-practices |
| 2 | Reddit r/ClaudeAI Claude Code 讨论 | 真实使用问题 | 中 | https://www.reddit.com/r/ClaudeAI/ |
| 3 | Hacker News Claude Code 讨论 | 开发者反馈 | 中 | https://news.ycombinator.com/ |
| 4 | Simon Willison blog Claude Code posts | 工具观察 | 中高 | https://simonwillison.net/ |
| 5 | Builder.io Claude Code workflow articles | 前端实践 | 中 | https://www.builder.io/blog |
| 6 | Sourcegraph / Amp 与 agentic coding 讨论 | Agent 编程经验 | 中 | https://sourcegraph.com/blog |
| 7 | The Pragmatic Engineer AI coding coverage | 团队落地观察 | 中 | https://newsletter.pragmaticengineer.com/ |
| 8 | Latent Space podcast / posts | AI 工具生态 | 中 | https://www.latent.space/ |
| 9 | YouTube Claude Code tutorials | 视频实战 | 中低 | https://www.youtube.com/results?search_query=Claude+Code+tutorial |
| 10 | X/Twitter 搜索：Claude Code tips | 公开短帖技巧 | 中低 | https://x.com/search?q=%22Claude%20Code%22%20tips |
| 11 | X/Twitter 搜索：Claude Code CLAUDE.md | 上下文技巧 | 中低 | https://x.com/search?q=%22Claude%20Code%22%20%22CLAUDE.md%22 |
| 12 | X/Twitter 搜索：Claude Code hooks | Hooks 使用 | 中低 | https://x.com/search?q=%22Claude%20Code%22%20hooks |
| 13 | X/Twitter 搜索：Claude Code MCP | MCP 使用 | 中低 | https://x.com/search?q=%22Claude%20Code%22%20MCP |
| 14 | Medium Claude Code articles | 个人实践 | 中低 | https://medium.com/search?q=Claude%20Code |
| 15 | Dev.to Claude Code posts | 个人实践 | 中低 | https://dev.to/search?q=Claude%20Code |
| 16 | Substack Claude Code posts | 长文经验 | 中低 | https://substack.com/search/Claude%20Code |
| 17 | LinkedIn Claude Code posts | 团队采用经验 | 中低 | https://www.linkedin.com/search/results/content/?keywords=Claude%20Code |
| 18 | GitHub Discussions 搜索 | 使用问题 | 中 | https://github.com/search?q=%22Claude+Code%22&type=discussions |
| 19 | Nainsi Dwivedi X 帖 | hooks、dispatch、worktrees、并行 agent 线索 | 中低 | https://x.com/NainsiDwiv50980/status/2039379859638821146 |
| 20 | Yann X 帖 | Plan Mode、slash commands、subagents、safe permissions 线索 | 中低 | https://x.com/yanndine/status/2026382902406123654 |
| 21 | Corey Ganim X 帖 | `.claude/` 目录组织经验 | 中低 | https://x.com/coreyganim/status/2036039746481246581 |
| 22 | ringo X 帖 | `/compact` 与图片上下文问题 | 中低 | https://x.com/ringo/status/2042814652359610427 |
| 23 | ClaudeCodeLog X 帖 | CLI surface 变化提醒 | 中低 | https://x.com/ClaudeCodeLog/status/2035133233449361661 |
| 24 | Oikon X 帖 | CLAUDE.md、permissions、hooks、skills、subagents、MCP 概念图 | 中低 | https://x.com/oikon48/status/2029950885292642698 |
| 25 | tut_ml X 帖 | separation of concerns 与 skills/hooks/subagents 结构 | 中低 | https://x.com/tut_ml/status/2028073256683794535 |
| 26 | Charly Wargnier X 帖 | Chrome MCP + skills 前端/网站克隆工作流线索 | 中低 | https://x.com/DataChaz/status/2037166381196861824 |
| 27 | X Trending: Claude Code `/goal` | `/goal` 社区传播线索 | 中低 | https://x.com/i/trending/2054072876853063714 |
| 28 | X Trending: `/goal` 与 CLAUDE.md 优化 | goal-driven 与上下文优化讨论线索 | 中低 | https://x.com/i/trending/2053778304667144523 |
| 29 | Build Great Products `/goal` Guide | `/goal` 教程和用法分析 | 中 | https://www.buildgreatproducts.com/guides/claude-code-goal |
| 30 | Claude Media v2.1.139 | `/goal`、agent view、hook 更新解读 | 中 | https://claude-media.com/articles/claude-code-v2-1-139 |
| 31 | Serverworks Claude Code 更新周报 | v2.1.139-v2.1.143 更新总结 | 中 | https://blog.serverworks.co.jp/2026/05/18/190000 |
| 32 | Oikon X 帖 | CLAUDE.md、Permissions、Hooks、Skills、Subagents、MCP、Plugins 概念 | 中低 | https://x.com/oikon48/status/2029950885292642698 |
| 33 | tut_ml X 帖 | skills/hooks/subagents/MCP/GitHub Actions/plugin separation of concerns | 中低 | https://x.com/tut_ml/status/2028073256683794535 |
| 34 | Lucas X 帖 | hooks、plugins、LSP、MCP、skills、custom agents、statusline、output styles | 中低 | https://x.com/lucas_flatwhite/status/2021732731894608126 |
| 35 | Chris Hough / Boris X 转帖 | code-simplifier 安装线索 | 中低 | https://x.com/chrishough/status/2010022334464438353 |
| 36 | Vaibhav Srivastav X 帖 | Codex Plugin for Claude Code 用法 | 中 | https://x.com/reach_vb/status/2039251986357338257 |
| 37 | AlphaSignal AI X 帖 | Codex plugin 安装和命令介绍 | 中低 | https://x.com/AlphaSignalAI/status/2041171552377725049 |
| 38 | Kくん X 帖 | document-skills、example-skills、skill-creator 社区用法 | 中低 | https://x.com/kkk_cun/status/2035926571299852412 |
| 39 | Reddit: Plugins take skills further | plugin = skills + MCP + hooks + agents 的社区解释 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1qrlgij/everyones_hyped_on_skills_but_claude_code_plugins/ |
| 40 | Reddit: What skills are you using | lean CLAUDE.md + custom skills 经验 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1rp02ln/what_skills_are_you_using/ |
| 41 | Reddit: Claude Radar | 自动发现 skills/agents/MCP/plugin 清单 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1s4eje8/i_kept_forgetting_which_mcp_servers_and_skills_i/ |
| 42 | arXiv Agent Skills Analysis | 大规模 skills 生态分析 | 中 | https://arxiv.org/abs/2602.08004 |
| 43 | arXiv Malicious Skill Classification | skills 安全分类研究 | 中 | https://arxiv.org/abs/2603.16572 |
| 44 | Superpowers Claude plugin official page | 官方插件页 | 高 | https://claude.com/plugins/superpowers |
| 45 | Builder.io Superpowers article | Superpowers 深度实战 | 中高 | https://www.builder.io/blog/claude-code-superpowers-plugin |
| 46 | Marc Nuri Superpowers article | Superpowers skills framework 解析 | 中 | https://blog.marcnuri.com/superpowers-claude-code-skills-framework |
| 47 | PluginMarketplace.ai Superpowers | Superpowers marketplace 镜像 | 中 | https://pluginmarketplace.ai/plugin/superpowers |
| 48 | ClaudeCodePlugins Superpowers | Superpowers 社区目录 | 中低 | https://claudecodeplugins.com/plugin/superpowers |
| 49 | Timewell Superpowers Guide | Superpowers 完整指南 | 中 | https://timewell.jp/en/columns/superpowers-claude-code-plugin |
| 50 | X: Rituraj Superpowers thread | Superpowers 社区传播线索 | 中低 | https://x.com/RituWithAI/status/2033895172237574571 |
| 51 | X: Srishti Superpowers thread | spec-first、2-5 minute tasks、subagent review 线索 | 中低 | https://x.com/NieceOfAnton/status/2035014556645564446 |
| 52 | X: Axel Claude Code ecosystem thread | Superpowers、GSD、last30days 等工具清单 | 中低 | https://x.com/Axel_bitblaze69/status/2037978621684621428 |
| 53 | X: nazha Superpowers critique | skills 自动激活问题反例 | 中低 | https://x.com/xiaokedada/status/1999130871505592344 |
| 54 | Reddit: Superpowers official marketplace | Superpowers 进入官方 marketplace 讨论 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1qgkupf/superpowers_is_now_on_the_official_claude/ |
| 55 | Reddit: Superpowers actually delivers | Superpowers 使用体验 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1r9y2ka/claude_codes_superpowers_plugin_actually_delivers/ |
| 56 | Reddit: Superpowers not interjecting | 自动触发不稳定反馈 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1qy04jd/is_anyone_noticing_the_superpowers_plugin_is_not/ |
| 57 | Reddit: Superpowers error | 安装/运行错误反馈 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1rwbq30/getting_a_weird_error_using_superpowers_plugin/ |
| 58 | Augment GSD article | GSD context rot / spec-driven 解读 | 中 | https://www.augmentcode.com/learn/gsd-58k-stars-claude-code |
| 59 | ClaudePluginHub GSD | GSD commands/agents 插件索引 | 中低 | https://www.claudepluginhub.com/plugins/glittercowboy-get-shit-done |
| 60 | Andrew Superpowers vs GSD | Superpowers/GSD 对比 | 中 | https://andrew.ooo/answers/superpowers-vs-gsd-claude-code-2026/ |
| 61 | Reddit: GSD vs Superpowers vs Speckit | 工作流工具适用边界讨论 | 中低 | https://www.reddit.com/r/ClaudeCode/comments/1qxfprh/gsd_vs_superpowers_vs_speckit_what_are_you_using/ |
| 62 | Cult of Claude last30days | last30days skill 目录 | 中 | https://cultofclaude.com/skills/last30days-skill |
| 63 | ClaudSkills last30days | last30days skill 说明 | 中 | https://claudskills.com/skills/mvanhorn-last30days-skill/ |
| 64 | LinuxDO: Superpowers 14 条铁律 | Superpowers 重度使用体验 | 中 | https://linux.do/t/topic/1796903 |
| 65 | LinuxDO: Superpowers 按需模式 | `--plugin-dir` / `--plugin-url` 按需加载 | 中 | https://linux.do/t/topic/2138859 |
| 66 | LinuxDO: GSD 上下文工程框架 | GSD 介绍和讨论 | 中 | https://linux.do/t/topic/1642374 |
| 67 | LinuxDO: Superpowers 进官方插件仓库 | Superpowers 工作流思路 | 中 | https://linux.do/t/topic/1485031 |
| 68 | LinuxDO: Superpowers-CCG | Claude + Codex + Gemini 多模型协作 | 中 | https://linux.do/t/topic/1477266 |
| 69 | LinuxDO: superpowers 和 cc-switch 问题 | provider 切换后插件状态问题 | 中 | https://linux.do/t/topic/2154030 |
| 70 | LinuxDO: codex 自动调用 superpowers | 跨工具 skill 触发差异 | 中低 | https://linux.do/t/topic/1812675 |
| 71 | LinuxDO: using-superpowers 过度调用解决 | 修改触发规则和 CLAUDE.md 限制 | 中 | https://linux.do/t/topic/1814451 |
| 72 | LinuxDO: opencode 自动使用 Claude Code 插件 | 跨工具读取 plugin 路径的坑 | 中 | https://linux.do/t/topic/2004725 |
| 73 | LinuxDO: Claude Code 复杂任务效率低 | Superpowers/TDD/确认机制的成本反馈 | 中低 | https://linux.do/t/topic/1942265 |
| 74 | LinuxDO: 好用 Skills 分享 | 社区推荐 Superpowers、自建 skills | 中 | https://linux.do/t/topic/2176194 |
| 75 | LinuxDO: 精选 Skills 10 个 | Superpowers、SuperClaude、skills framework 汇总 | 中 | https://linux.do/t/topic/1802808 |
| 76 | LinuxDO: Codex plugin for Claude Code | Codex plugin 安装和命令 | 中 | https://linux.do/t/topic/1855877 |
| 77 | LinuxDO: OpenAI 官方 Claude Code plugin | Codex plugin 使用讨论 | 中 | https://linux.do/t/topic/1856369 |
| 78 | LinuxDO: Codex plugin 使用问题 | Codex 线程/上下文问题 | 中低 | https://linux.do/t/topic/2083000 |
| 79 | LinuxDO: Opus 与 GPT 过招插件 | Codex plugin 多模型协作体验 | 中 | https://linux.do/t/topic/2085607 |
| 80 | LinuxDO: Context7 MCP 安装问题 | MCP 安装和 `/mcp list` 排错 | 中 | https://linux.do/t/topic/923117 |
| 81 | LinuxDO: Claude Code MCP 列表 | Context7、Serena、Chrome DevTools、Tavily 等 | 中 | https://linux.do/t/topic/1283818 |
| 82 | LinuxDO: WSL MCP 配置教程 | WSL 下 MCP 环境变量和项目配置 | 中 | https://linux.do/t/topic/777155 |
| 83 | LinuxDO: Windows MCP 全局配置 | Windows 10 MCP 一键配置脚本 | 中低 | https://linux.do/t/topic/784060 |
| 84 | LinuxDO: Skill 与 MCP 深度对比 | Skill/MCP 架构和适用场景 | 中 | https://linux.do/t/topic/1485159 |
| 85 | LinuxDO: 精简上下文 CLAUDE.md & MCP | Context7、Serena、Fetch、Sequential Thinking 触发规则 | 中 | https://linux.do/t/topic/1173647 |
| 86 | LinuxDO: SuperClaude 轻量级框架 | SuperClaude 定位 | 中 | https://linux.do/t/topic/748352 |
| 87 | LinuxDO: SuperClaude 入门手册 | SuperClaude personas 和 MCP 结合 | 中 | https://linux.do/t/topic/780580 |
| 88 | LinuxDO: gstack Claude Code setup | gstack 角色化工作流 | 中低 | https://linux.do/t/topic/1758754 |
| 89 | LinuxDO: everything-claude-code 讨论 | 大包配置集合定位 | 中 | https://linux.do/t/topic/1548764 |
| 90 | LinuxDO: everything hooks 锁定问题 | 大包 hooks 阻塞写入 | 中 | https://linux.do/t/topic/1612347 |
| 91 | LinuxDO: Fact-Forcing Gate 卡住 | everything-claude-code hooks 风险 | 中 | https://linux.do/t/topic/1964733 |
| 92 | LinuxDO: 小重构跑 1 小时 | 大包 + subagent/tool call 成本反馈 | 中低 | https://linux.do/t/topic/1668984 |
| 93 | LinuxDO: document-review 中文正式文件审核 skill | 中文业务 skill 示例 | 中 | https://linux.do/t/topic/2176164 |
| 94 | LinuxDO: advisor tool | Sonnet 执行 + Opus 顾问策略 | 中 | https://linux.do/t/topic/1935344 |
| 95 | LinuxDO: claude-mem 记忆方案 | 跨会话记忆 plugin/MCP 讨论 | 中低 | https://linux.do/t/topic/1368920 |

## 6. 资料筛选原则

- 官方来源用于确认事实：命令、能力、安全、权限、MCP、GitHub Action。
- GitHub 来源用于观察实践：模板、配置、hooks、subagents、CI 集成。
- 社区来源只提炼可验证的工作流经验，不直接采信夸张效果。
- X/Twitter 内容不作为唯一依据；只把重复出现、能被官方或开源实践印证的技巧写入主文档。
- X/Twitter 搜索结果以公开可访问片段为准；由于 X 页面登录和动态加载限制，短帖只作为实战线索，不作为命令事实的唯一依据。
- 所有涉及权限、安全、secret、生产操作的结论以官方文档和保守工程原则为准。

## 7. 文档中的可信度标注

- **高**：官方文档、官方博客、官方仓库。
- **中高**：活跃开源仓库、知名开发者长文、可复现示例。
- **中**：社区讨论中重复出现且符合工程常识的经验。
- **中低**：单人短帖、视频摘要、未经验证的技巧。

## 8. 本轮补充官方来源

| # | 来源 | 主题 | 可信度 | 链接 |
|---:|---|---|---|---|
| 96 | Claude Code permission modes | auto mode、permission mode、bypass 风险 | 高 | https://code.claude.com/docs/en/permission-modes |
| 97 | Configure auto mode | autoMode 配置、trusted infrastructure、deny/allow 规则 | 高 | https://code.claude.com/docs/en/auto-mode-config |
| 98 | Claude Code settings | `autoMode`、auto memory、updates channel 等设置项 | 高 | https://code.claude.com/docs/en/settings |
| 99 | Claude Code SDK overview | SDK、headless agents、programmatic parsing | 高 | https://docs.anthropic.com/en/docs/claude-code/sdk |
| 100 | Claude Code subagents | 独立上下文、专用工具权限、复用 | 高 | https://docs.anthropic.com/en/docs/claude-code/sub-agents |
| 101 | Claude Code output styles | default、explanatory、learning、自定义 output style | 高 | https://docs.anthropic.com/en/docs/claude-code/output-styles |
| 102 | Claude Code ultrareview | 云端多 agent 深度审查、成本和适用阶段 | 高 | https://code.claude.com/docs/en/ultrareview |
| 103 | How Claude Code works | auto compaction、auto mode、上下文机制 | 高 | https://code.claude.com/docs/en/how-claude-code-works |

## 9. 2026-05-21 补充来源（v2.1.144 / v2.1.145、worktree、marketplace、中文社区）

| # | 来源 | 主题 | 可信度 | 链接 |
|---:|---|---|---|---|
| 104 | anthropics/claude-code CHANGELOG.md | 官方 changelog 源 | 高 | https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md |
| 105 | anthropics/claude-code releases | tag 列表 | 高 | https://github.com/anthropics/claude-code/releases |
| 106 | Claude Code Worktrees 官方页 | `--worktree`、`isolation: worktree`、PR worktree、baseRef、WorktreeCreate hook | 高 | https://code.claude.com/docs/en/worktrees |
| 107 | Claude Code commands 参考 | `/radio`、`/usage-credits`、`/plugin`、`/agents` 等 | 高 | https://code.claude.com/docs/en/commands |
| 108 | anthropics/claude-plugins-official | 官方 marketplace（启动自动加载） | 高 | https://github.com/anthropics/claude-plugins-official |
| 109 | claudemarketplaces.com directory | 74 marketplaces / 1182 plugins 社区目录（2026-05-19 数据） | 中高 | https://claudemarketplaces.com/ |
| 110 | Chat2AnyLLM/awesome-claude-plugins | marketplace 与插件清单（中文友好） | 中 | https://github.com/Chat2AnyLLM/awesome-claude-plugins |
| 111 | xiaolai/claude-plugin-marketplace | 自动镜像 Anthropic docs 的 8 个 skill | 中 | https://github.com/xiaolai/claude-plugin-marketplace |
| 112 | Releasebot Claude Code 更新汇总 | v2.1.144/145 中文化要点 | 中 | https://releasebot.io/updates/anthropic/claude-code |
| 113 | Pasquale Pillitteri Claude Code May 2026 release notes | `/radio` 出圈过程 + marketplace 演进 | 中 | https://pasqualepillitteri.it/en/news/2223/claude-code-may-2026-release-notes-radio-plugin-marketplace |
| 114 | Agensi Plugin Marketplace Guide (2026) | marketplace 安装、blockedMarketplaces、依赖强制 | 中 | https://www.agensi.io/learn/claude-code-plugin-marketplace-guide |
| 115 | Claude Directory Worktrees Guide (2026) | worktree + subagent 实战 | 中 | https://www.claudedirectory.org/blog/claude-code-worktrees-guide |
| 116 | Samanvya Tripathi: subagents + parallel | 多 subagent 提速 5x 案例 | 中 | https://samanvya.dev/blog/claude-code-subagents-parallel |
| 117 | Tembo.io: Claude Code Subagents 2026 | subagent 设计模式 | 中 | https://www.tembo.io/blog/claude-code-subagents |
| 118 | The Prompt Shelf Worktree Guide | 命名、清理、合并模板 | 中低 | https://thepromptshelf.dev/blog/claude-code-git-worktree-guide/ |
| 119 | QCode.cc Worktree 并行指南（中英） | 团队多 agent 隔离 | 中低 | https://qcode.cc/en/claude-code-worktree-parallel-guide |
| 120 | V2EX：tw93《你不知道的 Claude Code：架构、治理与工程实践》 | 半年深度使用经验、两账号 $40/月成本反馈 | 中 | https://v2ex.com/t/1199971 |
| 121 | V2EX：用 Claude Code 半年的瓶颈反思 | 提效 → 副业转化的实际工时分配 | 中低 | https://www.v2ex.com/t/1214170 |
| 122 | V2EX：高强度使用半年后的吐槽与替代品 | 失败模式与替代工具线索（信息含推广） | 中低 | https://v2ex.com/t/1211200 |
| 123 | V2EX：用 Codex 补全泄露代码 | Claude/Codex 协作对照 | 中低 | https://global.v2ex.com/t/1203231 |
| 124 | CSDN：Claude Code 封神指南（2026 必装十大 Skills） | Skills 推荐、中文平台博客自动化适配 | 中低 | https://blog.csdn.net/qq_73472828/article/details/160794286 |
| 125 | CSDN：Claude Code 完整使用教程（2026 最新版） | 入门、配置、模式 | 中低 | https://blog.csdn.net/sanchan/article/details/160063941 |
| 126 | CSDN：标准化前端 UI SKILL — Frontend Design | 前端 skill 复用模板 | 中低 | https://blog.csdn.net/qq_17859117/article/details/161060257 |
| 127 | cnblogs：Claude Code 进阶指南（Liuq-24） | 模式切换、上下文管理、提示词对比、git diff commit | 中低 | https://www.cnblogs.com/Liuq-24/p/19989949 |
| 128 | GitCode/CSDN：2026 Claude Code 全功能实战手册 | DataEyes 接入、工作流 | 中低 | https://gitcode.csdn.net/69d458af54b52172bc6769e9.html |
| 129 | GitCode/CSDN：Claude Code 2026 最新进阶玩法（含 Skills 详解） | Skills + 国产模型路径 | 中低 | https://gitcode.csdn.net/6a0174d5de083e055f42292c.html |
| 130 | Claude Code Router (CCR) | 路由 Claude Code 请求到智谱 / Kimi / ModelScope 等 OpenAI 兼容接口 | 中 | https://github.com/musistudio/claude-code-router |
| 131 | cc-switch / CCSwitch | 多 provider 配置切换 | 中 | https://github.com/farion1231/cc-switch |
| 132 | claudefa.st changelog 中文整理 | release notes 中英对照 | 中低 | https://claudefa.st/blog/guide/changelog |
| 133 | ClaudeLog Changelog | 第三方版本追踪 | 中低 | https://claudelog.com/claude-code-changelog/ |

补充说明：

- 网上流传的“2026-05 Code w/ Claude 开发者大会新命令”（如 `/voice`、`/computer-use`、`/remote-control`、`/fork`、`/team create`）大多来自二次整理文，截至 2026-05-21 在官方 commands reference 中无对应条目，本指南不作为已发布功能写入。
- 中文社区文章请按第 7 节可信度分层使用：CSDN/GitCode 个人长文偏“中低”，仅作工作流灵感；事实层面回到官方 docs。

## 10. 第十三章 FAQ 引用来源

主指南第十三章「常见问题解决方案」的每条结论都标了来源等级，以下集中列出原始链接，避免在 FAQ 表格里塞过多 URL。

### 10.1 官方文档（高）

| # | 来源 | 用途 |
|---:|---|---|
| 135 | Claude Code Troubleshooting (en) | 总入口，desktop/web/CLI 通用 |
| 136 | Claude Code Troubleshooting (zh-CN) | 中文版总入口 |
| 137 | Claude Code Error reference | API/runtime 错误码逐条说明 |
| 138 | Claude Code Troubleshoot install | 安装/登录场景 |
| 139 | Claude Code Setup | Windows / WSL / Git Bash / PowerShell 工具 |
| 140 | Claude Code Permissions | 受保护目录、deny>ask>allow、`mcp__*` 匹配 |
| 141 | Claude Code Hooks Guide (zh-CN) | exit code 语义、合并策略、超时、PermissionRequest 在 -p 不触发 |
| 142 | Claude Code Commands | `/doctor`、`/feedback`、`/context`、`/compact`、`/clear`、`/rewind` |

链接：

- https://code.claude.com/docs/en/troubleshooting
- https://code.claude.com/docs/zh-CN/troubleshooting
- https://code.claude.com/docs/en/errors
- https://code.claude.com/docs/en/troubleshoot-install
- https://code.claude.com/docs/zh-CN/setup
- https://code.claude.com/docs/en/permissions
- https://code.claude.com/docs/zh-CN/hooks-guide
- https://code.claude.com/docs/en/commands

### 10.2 社区核验来源（中-中高）

| # | 来源 | 主题 | 链接 |
|---:|---|---|---|
| 143 | SegmentFault：Claude Code 常见问题解决手册 2026 | 安装/认证/网络/性能/IDE 全覆盖 FAQ | https://segmentfault.com/a/1190000047676028 |
| 144 | LinuxDO 1693892：安装两个问题与解决 | Windows install hangs / PATH / PowerShell var | https://linux.do/t/topic/1693892 |
| 145 | LinuxDO 1543471：Claude Code 安装问题 | 401 / token / `~/.claude.json` 重置 | https://linux.do/t/topic/1543471 |
| 146 | LinuxDO 1230531：Error writing file | Windows v1.0.111+ 路径 bug | https://linux.do/t/topic/1230531 |
| 147 | LinuxDO 1117174：JetBrains 检测不到 IDE | `/ide` + Settings → Terminal Esc | https://linux.do/t/topic/1117174 |
| 148 | LinuxDO 1798725：SSL 证书错误 | 购买 Pro 后 SSL verify fail，未完全解决 | https://linux.do/t/topic/1798725 |
| 149 | LinuxDO 1858909：装 claude code 报错 | 不同错误信息排查 | https://linux.do/t/topic/1858909 |
| 150 | LinuxDO 1445542：CLI 2.1.7 MCP 默认开启 | MCP 自动延迟加载 / MCPSearch 关闭方法 | https://linux.do/t/topic/1445542 |
| 151 | LinuxDO 1774231：2.1.78 No available accounts | 降级思路（仅作历史线索） | https://linux.do/t/topic/1774231 |
| 152 | LinuxDO 1612347：everything hooks 锁定问题 | 大插件包 PostToolUse 链卡死（与第 5 节交叉引用） | https://linux.do/t/topic/1612347 |
| 153 | LinuxDO 1964733：Fact-Forcing Gate 卡住 | 同类 hooks 链问题 | https://linux.do/t/topic/1964733 |
| 154 | gist docularxu/db0053008b9f4… | 中国大陆 403 完整指南：HTTPS_PROXY、Clash Allow LAN、SSH 远程也要配 | https://gist.github.com/docularxu/db0053008b9f41328f29d39ffcf7c2b2 |
| 155 | CSDN 156245107：Git Bash 依赖修复 | `CLAUDE_CODE_GIT_BASH_PATH` 与 setx 注意事项 | https://blog.csdn.net/qq2474842866/article/details/156245107 |
| 156 | CSDN 160900712：彻底解决 Codex/Claude 中文乱码 | PowerShell UTF-8 wrapper、chcp 65001 | https://blog.csdn.net/KaminZzz/article/details/160900712 |
| 157 | 博客园 19048741：Claude Code Windows 设置 | Git Bash `PYTHONIOENCODING=utf-8` | https://www.cnblogs.com/meetrice/p/19048741 |
| 158 | 鲲鹏 AI：Windows/PowerShell 6 个坑 | PATH/Shell/代理/WSL/npm prefix 综合 | https://kunpeng-ai.com/blog/claude-code-windows-powershell-pitfalls/ |
| 159 | knightli：Quota / Models / Context / Caching / compact | 量化的 token 使用与 compact 行为 | https://www.knightli.com/en/2026/04/19/claude-code-usage-context-compact-notes/ |
| 160 | Vincent Qiao：/context 都被什么吃了 | system / memory / tools / messages 分布 | https://blog.vincentqiao.com/claude-code-context/ |
| 161 | 知乎 2024233458：compact 设计深度解读 | Phase 0-3、83.5%/88.5% 阈值、熔断器（社区逆向） | https://zhuanlan.zhihu.com/p/2024233458180833574 |
| 162 | 知乎 2004602569：/compact 全链路剖析 | compact 的智能总结实现 | https://zhuanlan.zhihu.com/p/2004602569171935364 |
| 163 | easyclaude：Claude Code 降智完整诊断 | 上下文累积、定时重启策略 | https://easyclaude.com/post/claude-code-jiangzhi |

### 10.3 标注规则

- 出现在 `13.x` 表格“来源”列的“**官方**”严格只指 §10.1。
- “**社区核验**”指至少能在 §10.2 找到一处帖子且其结论与官方文档机制不冲突。
- “**社区线索**”指仅有单一社区帖子支撑，未与官方文档对齐；当作排查方向，操作前请自查影响。


