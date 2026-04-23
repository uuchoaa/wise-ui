---
name: Tailwind v4 source scanning
description: Vite root is dev/, so Tailwind v4 only auto-scans dev/ — src/styles.css must list @source for src/ and examples/ explicitly
type: project
originSessionId: e8bd7202-48b7-4402-8f9e-e1167b54b6af
---
`vite.config.ts` sets `root: ./dev`, so Tailwind v4's `@tailwindcss/vite` plugin auto-detects sources from `dev/` only. Without explicit directives, classes used in `src/` (DS components) and `examples/` (Cashflow/Planetaria screens) are stripped from the generated CSS — pages render unstyled while tone tokens still resolve, which is the misleading symptom.

Fix lives in `src/styles.css`:
```
@source "../src/**/*.{vue,ts}";
@source "../examples/**/*.vue";
@source "../dev/**/*.{vue,html,ts}";
```

**Why:** discovered 2026-04-23 — Cashflow Home rendered as a wall of unstyled text on first ferrum smoke test. Before the @source fix, Tailwind generated only ~24 utility rules (the harness nav classes); after, 56+ and growing as more screens load.

**How to apply:** if a screen looks unstyled but `text-tone-*` colors are correct, the @source list is the first place to check. Any new top-level folder that holds Vue/TS files with utility classes (e.g. a future `playground/` or `stories/`) needs its own `@source` entry.
