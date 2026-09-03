# PinkSkills

一组可直接安装到 AI 编程 Agent 中的技能。每个技能都以独立目录发布，核心行为定义在对应的 `SKILL.md` 中。

## 技能

| 技能 | 说明 | 输出语言 | 调用方式 |
| --- | --- | --- | --- |
| [`parse-requirements`](./parse-requirements/) | 将 PRD、需求文档、截图或线框图拆解为结构化的实现需求，并结合当前项目代码给出模块、方案与验证方法 | 中文 | `/parse-requirements` |
| [`pink-review`](./pink-review/) | 自动确定 Git 变更范围，执行证据驱动的缺陷审查与行为保持型精简审查 | English | `/pink-review` |
| [`pink-review-cn`](./pink-review-cn/) | `pink-review` 的中文版，输出中文审查结论 | 中文 | `/pink-review-cn` |

## 安装

选择需要的技能，将整个技能目录复制到宿主工具的 skills 目录。目录结构必须保留，例如：

```text
<skills-directory>/
└── pink-review/
    ├── SKILL.md
    ├── README.md
    └── VERSION
```

对于 Grok Build，可安装到以下任一位置：

- 项目级：`<project>/.grok/skills/`
- 用户级：`~/.grok/skills/`
- Windows 用户级：`%USERPROFILE%\.grok\skills\`

其他 Agent 的 skills 目录以其自身配置为准。安装完成后，使用上表中的命令调用技能。

## 使用

### 解析需求

运行 `/parse-requirements`，并提供需求文档路径、粘贴的需求文本或聊天附件。技能会：

1. 完整读取文本与图片，优先识别框选、圈选、高亮和箭头指向的内容；
2. 将文档拆分为可独立实现的原子需求；
3. 检查当前项目代码，为每项需求定位真实模块与现状；
4. 默认在 `.requirements/<source-stem>-parsed.md` 生成中文解析结果。

每项需求包含需求概括、现状及原因、涉及模块、实现方法和验证方法。

### 审查代码

运行 `/pink-review` 或 `/pink-review-cn`。技能无需参数，会自动：

1. 确定当前分支、比较基准以及已提交、暂存、未暂存和未跟踪的变更；
2. 检查正确性、安全性、兼容性、错误处理、性能和可维护性风险；
3. 单独执行结构精简审查，寻找可以删除分支、状态、重复流程或无效抽象的机会；
4. 运行环境允许的最小相关检查，并明确披露未覆盖范围。

代码审查技能始终只读，不会修改代码或创建提交。

## 仓库结构

```text
.
├── parse-requirements/
│   └── SKILL.md
├── pink-review/
│   ├── SKILL.md
│   ├── README.md
│   └── VERSION
├── pink-review-cn/
│   ├── SKILL.md
│   ├── README.md
│   └── VERSION
└── README.md
```

每个目录都是独立技能。修改技能时，应同步更新该目录中的说明与版本信息（如存在）。
