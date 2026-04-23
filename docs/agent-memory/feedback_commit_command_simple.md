---
name: Use simple inline git commit commands
description: Commit with `git commit -m "title" -m "body"` inline; avoid heredoc (`cat <<'EOF'`) because it triggers a separate permission prompt for `cat`.
type: feedback
originSessionId: e8bd7202-48b7-4402-8f9e-e1167b54b6af
---
User directive (2026-04-23): "use um comando simples para eu autorizar um vez só… tá me pedindo toda vez agora!"

**Why:** the heredoc pattern `git commit -m "$(cat <<'EOF' … EOF)"` runs `cat` in a subshell. Even if `git commit:*` is allowlisted, the embedded `cat` call is a separate tool invocation that prompts every time. Inline `-m` flags don't trigger any subshell, so a single `Bash(git commit -m:*)` allow covers every commit.

**How to apply:**
- Default to `git commit -m "<title>"` for short messages.
- For multi-line: repeat `-m` — Git joins them with a blank line → `git commit -m "title" -m "line one of body" -m "line two of body"`.
- Never use `cat <<EOF` or `cat` in the commit command. Avoid `echo`/`printf` piping too.
- If a commit message genuinely needs literal newlines inside a paragraph, use `$'\n'` via shell C-quoting: `-m $'paragraph one\n\nparagraph two'` — still single tool call, no subshell.
