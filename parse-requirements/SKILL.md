---
name: parse-requirements
description: "Parses a requirements document (including images, especially boxed or arrow-focused regions) into a structured markdown file with: one-sentence summary, current state and causes, involved modules, implementation approach, and verification. Use when the user runs /parse-requirements, or asks to parse/analyze a PRD, requirements doc, 需求文档, 解析需求, or break requirements into that five-section structure. If intent cannot be inferred from existing project docs or code, ask clarifying questions immediately."
---

# Parse Requirements

Turn an input requirements document into a structured markdown file. Write the output in Chinese unless the user specifies another language. Ask clarifying questions in the user's language.

## Inputs

Accept any of:

- File path(s): markdown, Word, PDF, images, screenshots, wireframes
- Pasted text in the conversation
- Chat attachments, including images

If nothing is provided, ask for a file path or a paste. Do not invent requirements.

## Step 1: Read the source fully

1. Read every text page/section.
2. Read every image with the image reader (`read_file` on image paths, or the attached image). Do not skip figures, screenshots, or slides.
3. Treat **boxed, circled, highlighted, numbered, or arrow-pointed objects as the intended focus**. Surrounding UI is context only.
4. Transcribe visible labels, error copy, values, and annotations from images.
5. If a figure is a flow, wireframe, or before/after, state the implied change, not just what is drawn.

When an image is ambiguous (unclear target of an arrow/box, unreadable text, missing before/after), ask immediately — do not guess product intent.

## Step 2: Split into atomic requirements

Each independently implementable change is one requirement. Keep source IDs when present (`R1`, `需求1`, ticket keys). If the doc mixes several changes in one paragraph, split them.

Skip pure background that does not imply a change, unless it is needed to explain 现状及原因.

## Step 3: Ground each requirement in this project

Check the related code and docs before filling 现状 / 模块 / 实现 / 验证. Ask **as soon as** a blocker appears (do not batch questions at the end) when any of these is true:

Whenever you ask a clarifying question, **first state which requirement it is about** — reference the requirement by its `<id>`/short title (e.g. `R1`, `需求1`) or, if the requirement has no ID yet, quote its descriptive title. Never ask a bare question that leaves it unclear which requirement it refers to.

- The marked image object is ambiguous
- The request conflicts with existing behavior or architecture
- Several implementation paths would change architecture or data model equally
- Acceptance criteria are missing and cannot be inferred
- Named modules, APIs, or pages do not exist in the repo

Do not invent product intent, module owners, or acceptance criteria. Ask until the blocker is resolved — do not deliver a file with open questions.

## Step 4: Write the markdown file

Default output path: `<cwd>/.requirements/<source-stem>-parsed.md`. If the user gave a path, use that. Create the `.requirements/` directory if needed.

Use this structure (section titles must stay exactly as written):

```markdown
# 需求解析：<title>

来源：<source path or “conversation”>
日期：<YYYY-MM-DD>

## <id> <short title>

### 1、需求概括
<exactly one sentence, outcome-focused>

### 2、现状及原因
<what exists today, with file/symbol citations, and why it must change>

### 3、涉及模块
- `<module or path>` — <why it is involved>

### 4、实现方法
<concrete steps that fit the current architecture>

### 5、验证方法
<concrete checks: tests, UI steps, APIs, edge cases>
```

Repeat `## <id> <short title>` plus the five subsections for every requirement.

### Field rules

| Field | Rule |
| --- | --- |
| 需求概括 | One sentence. What the user/system will be able to do after the change. No implementation detail. |
| 现状及原因 | Grounded in code or docs. If greenfield, say so and cite the gap. Separate “as-is” from “why”. |
| 涉及模块 | Real packages/files/services/pages, not vague “backend/frontend”. |
| 实现方法 | Ordered, implementable steps. Match existing patterns. Call out API/schema/UI touch points. |
| 验证方法 | Observable pass/fail checks, including the image-marked case and at least one negative/edge case. |

## Done when

- Every atomic requirement is in the file with all five sections
- Image-focused objects are reflected in 需求概括 and 验证方法
- The output file path is reported to the user
