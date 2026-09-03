# pink-review

A one-command code review skill that combines evidence-backed defect detection with high-value, behavior-preserving refactoring and simplification.

## Install

Copy the entire `pink-review` folder into a skills directory the host agent scans:

- Project: `<project>/.agents/skills/` or `<project>/.<agent>/skills/`
- User: `~/.agents/skills/` or `~/.<agent>/skills/`

`<agent>` is the host agent name. On Windows, `~` is `%USERPROFILE%`. The final path should end in `pink-review/SKILL.md`.

## Use

Invoke `/pink-review`.

No options, helper scripts, Python, Bash, Node.js, or platform-specific setup are required. The skill automatically reviews the current branch changes together with staged, unstaged, and untracked changes, selects a suitable comparison base, and runs two passes: defects and regression risks first, then concrete opportunities to remove branches, states, duplication, indirection, or unnecessary abstraction. It runs focused safe checks when available and reports coverage limitations.

The review is read-only and never edits or commits code. Refactoring opportunities are reported separately from defects and do not block approval by themselves.

## Package contents

- `SKILL.md`: the complete review workflow
- `README.md`: installation and usage
- `VERSION`: package version
