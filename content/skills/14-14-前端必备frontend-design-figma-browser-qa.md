## 14. 前端必备：Frontend Design + Figma + Browser QA

来源等级：官方插件能力 + 社区实践。下面是前端项目的可选组合，不是所有项目的默认安装清单。

前端项目推荐组合：

- `typescript-lsp`。
- `figma` plugin。
- `frontend-design` / Frontend Design 插件。
- Browser/Playwright 验证。
- Context7。

工作流：

```text
Figma/design input
→ Superpowers brainstorming 先定需求和约束
→ Context7 查当前框架 API
→ Frontend Design 生成 UI
→ /run 启动项目
→ Browser/Playwright 截图验证
→ Code Simplifier 清理 diff
→ PR Review Toolkit 审查
```

注意：

- 不要用纯描述替代截图验证。
- 不要克隆无授权素材。
- 前端 UI 要真实跑起来再验收。
- Figma、Browser、Playwright、DevTools MCP 都可能接触页面内容或设计资产，团队项目先确认授权和数据边界。
- 视觉生成类插件适合出第一版，最终仍要按现有 design system、响应式断点和无障碍检查收口。

验证方式：

- 至少跑桌面和移动两个 viewport 截图。
- 检查交互状态、长文本、空态、错误态和加载态。
- 对照设计稿只比较授权范围内的素材和布局，不复制无权使用的图片。
