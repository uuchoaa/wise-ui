---
name: One command per Bash invocation
description: Run each shell operation as its own Bash call; never chain with `&&` or `;`, even for closely related steps like `git add` then `git commit`.
type: feedback
originSessionId: e8bd7202-48b7-4402-8f9e-e1167b54b6af
---
User directive (2026-04-23, follow-up to the "simple commit" feedback): "use comandos distintos para cada operacao."

**Why:** chained commands (`git add X && git commit -m …`) require the allowlist to match the whole string, so each new combination prompts again. Each command as its own Bash tool call matches granular allowlist rules (`Bash(git add:*)`, `Bash(git commit:*)`) and authorizes in one shot.

**How to apply:**
- One command per Bash tool call. No `&&`, `||`, `;`, or pipes that chain unrelated operations.
- Parallelizing via multiple Bash calls in the same message is still fine — that's independent invocations, not a chain.
- Exceptions: pipes/chains that are genuinely one logical operation (`grep … | head`, `find … -exec`) are OK — but anything that would make sense as two separate lines in a script should be two Bash calls.
- Combined with the simple-commit rule: each commit is now `git add …` (one call) + `git commit -m "…"` (another call).
