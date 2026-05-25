## 12. document-skills / Anthropic skills

来源等级：官方仓库 / 官方技能生态。能力事实以 Anthropic skills 仓库和 Claude Code skills 文档为准。

Anthropic 官方 skills 仓库常被社区推荐，尤其是文档和办公类：

- PDF。
- DOCX / Word。
- PPTX。
- XLSX / spreadsheet。
- skill-creator / example-skills。

安装线索：

```text
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

适合：

- 报告、合同、简历、课件、表格处理。
- 把办公文档转成结构化 Markdown。
- 学习 skill 写法。

注意：

- 处理敏感文档前要确认隐私和权限。
- 生成内容需人工核对事实。
- Office/PDF 渲染结果要打开成品检查，不只看 Markdown 摘要。
- 自建业务 skill 时，把行业判断、格式规范和验收样例写进 skill，而不是依赖通用文档处理能力。

验证方式：

- 对 Word/PPT/PDF/XLSX 任务保留原文件、生成文件和截图/导出结果。
- 涉及合同、标书、财务表格时必须人工复核数字、日期、主体和条款。
