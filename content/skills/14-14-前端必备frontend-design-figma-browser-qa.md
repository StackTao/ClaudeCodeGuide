## 14. 前端必备：Frontend Design + Figma + Browser QA

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
