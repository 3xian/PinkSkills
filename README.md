# PinkSkills

A collection of skills that can be installed directly in AI coding agents. Each skill is distributed in its own directory, with its core behavior defined in the corresponding `SKILL.md`.

## Skills

| Skill | Description | Output language | Invocation |
| --- | --- | --- | --- |
| [`parse-requirements`](./parse-requirements/) | Breaks down PRDs, requirement documents, screenshots, or wireframes into structured implementation requirements, then maps them to modules, implementation approaches, and verification steps in the current codebase | Chinese | `/parse-requirements` |
| [`pink-review`](./pink-review/) | Automatically determines the Git change scope and performs evidence-based defect review plus behavior-preserving simplification review | English | `/pink-review` |
| [`pink-review-cn`](./pink-review-cn/) | Chinese version of `pink-review` that reports review findings in Chinese | Chinese | `/pink-review-cn` |

## Installation

Choose a skill and copy its entire directory into the host tool's skills directory. Preserve the directory structure. For example:

```text
<skills-directory>/
└── pink-review/
    ├── SKILL.md
    ├── README.md
    └── VERSION
```

For Grok Build, install it in either of these locations:

- Project: `<project>/.grok/skills/`
- User: `~/.grok/skills/`
- Windows user: `%USERPROFILE%\.grok\skills\`

For other agents, use the skills directory specified by that agent. After installation, invoke the skill with the command shown in the table above.

## Usage

### Parse requirements

Run `/parse-requirements` and provide a path to a requirement document, paste the requirement text, or attach a file in chat. The skill will:

1. Read all text and images, prioritizing boxed, circled, highlighted, and arrow-marked content.
2. Break the document into atomic requirements that can be implemented independently.
3. Inspect the current codebase to identify the actual modules and current state for each requirement.
4. Write the parsed result in Chinese to `.requirements/<source-stem>-parsed.md` by default.

Each requirement includes a summary, the current state and rationale, affected modules, implementation steps, and verification steps.

### Review code

Run `/pink-review` or `/pink-review-cn`. No arguments are required. The skill will automatically:

1. Determine the current branch, comparison base, and committed, staged, unstaged, and untracked changes.
2. Review correctness, security, compatibility, error handling, performance, and maintainability risks.
3. Run a separate simplification pass to find opportunities to remove branches, state, duplicated flows, or unnecessary abstractions.
4. Run the smallest relevant checks supported by the environment and explicitly disclose any coverage gaps.

The code review skills are always read-only. They never modify code or create commits.

## Repository structure

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

Each directory contains an independent skill. When modifying a skill, update that directory's documentation and version information, if present, at the same time.
