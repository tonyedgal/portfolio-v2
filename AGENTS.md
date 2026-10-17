# Portfolio agent guide

Behavioural guidelines for coding agents working in portfolio-v2. Project and
domain knowledge lives in [CLAUDE.md](CLAUDE.md).

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks,
use judgment.

## 1. Think before coding

**Ask; do not assume. Do not hide confusion. Surface tradeoffs.**

Before implementing:

- State material assumptions explicitly.
- If intent, architecture, requirements, ownership, or scope is unclear, ask
  before writing code.
- Use decisions and authorization already given in the current session. Do not
  ask the human to repeat settled choices.
- If multiple reasonable interpretations exist, present them instead of choosing
  silently.
- When running unattended, use the safest reasonable interpretation, proceed only
  when the choice is reversible and within scope, and record the assumption.
- If a simpler approach exists, say so.
- Push back when the requested implementation creates avoidable security,
  evidential-integrity, or maintenance risk.
- Flag uncertainty explicitly. Confidence without evidence is not certainty.
- When useful, run a small, localized, low-risk experiment and report the
  hypothesis and result before committing to a larger direction.
- Suggest durable improvements when they materially outperform a tactical change,
  but do not implement the expanded scope without authorization.

## 2. Simplicity first

**Use the minimum design that fully solves the problem.**

- Do not add features beyond the request.
- Do not create abstractions for a single use unless they enforce a real
  boundary.
- Do not add speculative flexibility or configuration.
- Do not add handling for impossible states.
- Keep content in MDX, layout in React components, and design tokens in the
  shared stylesheet. Keep route navigation and theme ownership explicit.
- If an implementation is substantially larger than the problem requires,
  simplify it.

Ask: "Would a senior engineer consider this unnecessarily complicated?" If yes,
revise it.

## 3. Surgical changes

**Touch only what the task requires. Clean up only what your changes make
obsolete.**

- Do not reformat or refactor unrelated areas.
- Match existing repository style and patterns.
- Preserve user work and unrelated uncommitted changes.
- Remove imports, variables, functions, and files made unused by your own
  changes.
- Do not remove pre-existing dead code unless asked.
- Surface unrelated bugs, unsafe patterns, and design smells to the user as
  separate follow-up work. Do not silently fix them.

Every changed line should trace to the requested outcome or a necessary
supporting invariant.

## 4. Goal-driven execution

**Define success, implement, verify, and loop until the evidence matches the
goal.**

Translate requests into verifiable outcomes:

- "Add validation" means exercise invalid inputs and see them rejected.
- "Fix the bug" means reproduce it, fix the cause, and verify it no longer
  reproduces.
- "Refactor" means preserve observable behaviour and verify before and after.
- "Add a screen" means it renders in the running app with realistic data, not
  just that it compiles.
- "Change an animation" means inspect the running transition, including reduced
  motion and the relevant device conditions.
- "Change route themes" means verify direct loads, navigation, browser history,
  light/dark mode, and return to Experience.

For multi-step work, state a short plan:

```text
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Do not call work complete from static review when a realistic execution path can
be tested.

## 5. Testing

- **NEVER write unit tests after you write code.**
  - Tautological tests considered harmful.
  - Change-detector tests considered harmful.
  - Do not create regression tests for bug fixes without a genuine gap in
    behaviour testing.
- If you must test a system in isolation, **FIRST** write all the ways it could
  fail, **THEN** write the code. Every test must answer:
  - What observable behaviour, invariant, or independent contract does it
    protect?
  - What credible regression makes it fail?
- Highly prefer E2E tests as the sole testing mechanism. Use them to verify
  complex features work. At the end of E2E tests, produce a verifiable and
  repeatable artifact.
- Keep static checks separate from browser and physical-device verification.
  State any required check that could not run.

## 6. Human communication and commits

- Use the `/reply` skill when working with a human on this project. Read the
  skill and follow its plain-language rules. Keep file paths, commands, and
  identifiers exact.
- Use the `/auto-commit` skill for commits. Read the skill before staging work.
  Keep each change in a separate, coherent commit. Keep fixes, tests, and release
  notes separate as the skill requires.
- Stage explicit paths. Preserve unrelated changes and existing stashes.
- Do not push unless the human has authorized the push. Honor authorization
  already given for the current task and branch.
- Keep project facts in `CLAUDE.md`. Keep agent behaviour in `AGENTS.md`.
- Read the installed package and official docs before changing animation APIs.
- Do not restore historical workarounds without reproducing the current defect.

# 7. Comments

Default to no comment. Write one only where the code cannot say it itself: a decision whose obvious refactor reintroduces a bug, or a non-obvious constraint.

- One line, lowercase. Never a multi-line block.
- Never restate what the next line does. If the code reads fine, delete the comment.
- No JSDoc, no section banners, no `// handle X` above a function called `handleX`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
