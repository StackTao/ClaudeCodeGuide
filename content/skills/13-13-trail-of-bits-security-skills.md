## 13. Trail of Bits Security Skills

来源等级：高质量安全仓库 / 社区验证。具体 skill 名称、安装方式和适用语言以 `trailofbits/skills` 当前 README 为准。

GitHub：`trailofbits/skills`

用途：

- 安全审计。
- 漏洞研究。
- fuzzing / static analysis workflow。
- 安全 checklist。

适合：

- 鉴权、权限、输入验证、SQL、XSS、文件上传、加密、依赖安全。
- 合并前安全检查。
- 安全团队构建内部审计流程。

安装前检查：

- 是否运行外部脚本。
- 是否读取本地 secret。
- 是否需要网络。
- 是否执行 fuzz/test 命令。
- 是否适合你的语言栈。

风险边界：

- 安全 skill 能补 checklist 和 workflow，不能替代 SAST/DAST、依赖扫描、fuzzing、威胁建模和人工审计。
- 不要把未验证的安全结论写成“无漏洞”；只能写“本轮检查未发现证据”。
- 会运行测试、fuzz 或外部工具的 skill，先在隔离环境确认资源消耗和副作用。

验证方式：每个安全发现必须包含文件位置、攻击路径、影响、复现或反例，以及建议测试。
