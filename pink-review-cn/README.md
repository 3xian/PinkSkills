# pink-review-cn

面向 Grok Build 的一键式中文代码审查 skill：同时提供证据驱动的缺陷审查，以及高价值、行为保持型的重构与精简建议。

## 安装

把整个 `pink-review-cn` 文件夹解压到项目的 `.grok/skills/` 目录，或用户目录下的 `~/.grok/skills/`。Windows 用户目录通常是 `%USERPROFILE%\.grok\skills\`。

最终路径应以 `pink-review-cn/SKILL.md` 结尾。

## 使用

调用 `/pink-review-cn` 即可。

不需要参数、辅助脚本、Python、Bash、Node.js 或任何平台专用配置。技能会自动审查当前分支提交，以及暂存、未暂存和未跟踪变更；自动选择合适的比较基准；先查缺陷与回归风险，再主动寻找能够删除分支、状态、重复流程、间接层或无效抽象的精简方案；在条件允许时运行聚焦且安全的检查，并披露覆盖限制。

审查始终只读，不会修改或提交代码。重构建议与缺陷分开输出，本身不会阻断合并。

## 包含内容

- `SKILL.md`：完整审查流程
- `README.md`：安装与使用说明
- `VERSION`：版本号
