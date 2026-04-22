# Migration Plan — Align DS with Tailwind Plus App UI

Execution plan for migrating the project's design system to the Tailwind Plus App UI visual language. Designed to be executed iteratively (Ralph loop-compatible).

---

## Goal

Produce a design system that:

1. Matches the Tailwind Plus App UI visual language verbatim (palette, density, refinement).
2. Exposes a **Blocks catalogue** covering the recurring App UI patterns (headings, stats, tables, feeds, empty states, cards, navs, description lists, status pills).
3. Lives behind an opinionated contract: pages compose only from DS blocks and Catalyst primitives — never raw Tailwind color classes, never Tailwind Plus JSX copied directly.
4. Ships with Storybook as visual documentation.

---

## Context files (read first, every iteration)

- `design-system/README.md` — vocabulary (Token, Primitive, Block, Page), layer rules, file organization
- `CLAUDE.md` — agent contract for page authoring
- `client/src/index.css` — all tokens
- `client/src/components/catalyst/` — interactive primitives (keep)
- `client/src/components/ds/` — structural primitives + blocks (rebuild)
- `DESIGN_GUIDE.md` — **obsolete; delete in Phase 8**

---

## Completion criteria

All must be true to emit `<promise>MIGRATION-COMPLETE</promise>`:

- [ ] Tokens in `index.css` match Tailwind Plus palette (indigo accent, saturated status colors, standard dark mode with `white/10` rings)
- [ ] Storybook installed and renders without errors (`pnpm storybook`)
- [ ] `ds/primitives/` contains only `Page` and `Grid`, each with `.stories.tsx`
- [ ] `ds/blocks/` contains at minimum: `PageHeading`, `StatsGrid`, `DataTable`, `StatusPill`, `SecondaryNav`, `CardWithHeader`, `DescriptionList`, `EmptyState` — each with `.stories.tsx`
- [ ] Obsolete primitives deleted: `ds/Card.tsx`, `ds/StatusBadge.tsx`, `ds/AlertBanner.tsx`
- [ ] All pages in `client/src/pages/` compose only from `@/components/ds` and `@/components/catalyst`; zero raw color classes
- [ ] `grep -rE "text-(green|red|white|zinc|gray|slate)-|bg-(white|green|red|zinc|gray|slate)-|dark:" client/src/pages/` returns nothing
- [ ] `pnpm check` passes
- [ ] `CLAUDE.md` updated to point at new DS structure
- [ ] `design-system/README.md` updated with Storybook convention
- [ ] `design-system/CATALOG.md` created listing all blocks and primitives
- [ ] `DESIGN_GUIDE.md` deleted

---

## Progress tracker

Update as each phase completes. Check boxes inline.

- [ ] Phase 1 — Tokens reset
- [ ] Phase 2 — Storybook setup
- [ ] Phase 3 — Primitive rewrite (`Page`, `Grid`)
- [ ] Phase 4 — Core block catalogue
- [ ] Phase 5 — Cashflow validation page
- [ ] Phase 6 — Migrate existing pages
- [ ] Phase 7 — Delete obsolete primitives
- [ ] Phase 8 — Documentation finalization

---

## Phase 1 — Reset tokens to App UI palette

Revert the contrast reductions applied in earlier sessions. Align tokens with App UI defaults.

**Files:** `client/src/index.css`

**Changes:**

- `--primary` / `--accent` → indigo (`oklch(0.54 0.24 264)` light / `oklch(0.65 0.22 264)` dark)
- `--status-success` → saturated green (match App UI `text-green-700 bg-green-50 ring-green-600/20` in light; `dark:bg-green-500/10 dark:text-green-500 dark:ring-green-500/10`)
- `--status-danger` → saturated red (match `text-red-700 bg-red-50 ring-red-600/10` / `dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/10`)
- Dark mode `--background` → `oklch(0.141 0.005 285.823)` (zinc-950 equivalent)
- Dark mode `--border` → `oklch(1 0 0 / 10%)` (white/10) — already present; verify
- Add `--ring-subtle` for the `ring-white/10` patterns used in cards/avatars

Keep token names stable — only values change.

**Verify:**

```bash
pnpm check
```

**Mark complete:** check the Phase 1 box in the progress tracker above.

---

## Phase 2 — Storybook setup

**Install:**

```bash
pnpm dlx storybook@latest init --yes --package-manager=pnpm
```

**Configure `.storybook/preview.ts`:**

- Import `@/index.css`
- Default story background: `bg-background`
- Set `parameters.backgrounds.default` to match dark token
- Add a decorator that forces `.dark` class on `<html>`

**Configure `.storybook/main.ts`:**

- `stories: ['../client/src/**/*.stories.@(ts|tsx|mdx)']`
- Framework: `@storybook/react-vite`
- Addons: essentials, interactions

**Clean up:**

- Delete any generated example stories (look in `client/src/stories/` or wherever init dropped them)
- Add `"storybook": "storybook dev -p 6006"` and `"build-storybook": "storybook build"` to `package.json` scripts (init usually does this — verify)

**Verify:**

```bash
pnpm storybook
```

Should start without errors on port 6006. Smoke-check: open http://localhost:6006 and confirm the shell renders.

**Fallback if Tailwind v4 doesn't activate in Storybook:**

- Explicitly import `../client/src/index.css` in `preview.ts`
- If Vite config isolation is required, create `.storybook/vite.config.ts` mirroring the root `vite.config.ts` minimally (react plugin + tailwindcss plugin)

---

## Phase 3 — Primitive rewrite

**Move:** `client/src/components/ds/Page.tsx` → `client/src/components/ds/primitives/Page.tsx`
**Move:** `client/src/components/ds/Grid.tsx` → `client/src/components/ds/primitives/Grid.tsx`

**Revise `Page`:**

- Keep `Page` and `Page.Header` API
- Add optional `Page.Header` props: `tabs?: Array<{label, current, onClick}>`, `secondary?: ReactNode` (for sibling nav)
- Remove anything that conflicts with App UI layout spacing

**Revise `Grid`:**

- Keep `cols`, `gap`
- Add `divide?: "x" | "y"` for stats-grid patterns (adds `divide-x divide-border` / `divide-y`)
- Add `border?: boolean` for the top/bottom border pattern seen in App UI stats

**Stories required:**

- `Page.stories.tsx` — default, with tabs, with actions
- `Grid.stories.tsx` — 2/3/4 cols, gap variants, divide variant

**Update barrel:** `client/src/components/ds/index.ts` re-exports from `primitives/`.

**Verify:**

```bash
pnpm check
pnpm storybook
```

Stories for Page and Grid must render.

---

## Phase 4 — Core block catalogue

Build the following blocks in `client/src/components/ds/blocks/`. Each requires a `.stories.tsx` in the same folder.

### Blocks to build

- **`PageHeading`** — title + optional description + optional actions slot
  - Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/headings/page-headings

- **`SecondaryNav`** — horizontal filter tabs with optional leading title and trailing action
  - Pattern seen in Cashflow: "Cashflow | Last 7 days | Last 30 days | All-time | [+ New invoice]"

- **`StatsGrid`** + **`Stat`** — 2/3/4-column stat grid with dividers, change-type coloring
  - Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/data-display/stats

- **`DataTable`** — sortable table with optional row grouping (by date)
  - Starts minimal: accepts `columns`, `groups: [{ label, rows }]`, `emptyMessage`
  - Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/lists/tables

- **`StatusPill`** — rectangular pill with background + ring (different from our previous inline icon badge)
  - Variants: `success | danger | warning | neutral`
  - Pattern: `bg-status-*-subtle text-status-* ring-1 ring-inset ring-status-*-border`

- **`CardWithHeader`** — card with colored header band + body
  - Reference pattern from Cashflow "Recent clients" cards

- **`DescriptionList`** — `<dl>` with `divide-y` rows
  - Can wrap Catalyst's `description-list` if it fits; otherwise own implementation
  - Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/data-display/description-lists

- **`EmptyState`** — centered icon + title + description + optional action
  - Reference: https://tailwindcss.com/plus/ui-blocks/application-ui/feedback/empty-states

### Contract for each block

- TypeScript props interface with JSDoc on each prop
- Header JSDoc: what it is, when to use, when NOT to use
- Zero raw color classes (only tokens)
- Co-located `.stories.tsx` with at least: default state + every variant

### Barrel

Export each block from `ds/index.ts`.

**Verify:**

```bash
pnpm check
pnpm storybook
```

All block stories render. No TypeScript errors.

---

## Phase 5 — Cashflow validation page

Create `client/src/pages/Cashflow.tsx` as a proof that the block catalogue covers the App UI patterns.

Source to replicate: the Cashflow block shared in the conversation history — stats grid, recent activity table with date grouping, recent clients card grid.

**Acceptance:**

- Zero `className` with raw color/bg classes
- Composes only from `@/components/ds` and `@/components/catalyst`
- Visual output closely matches the Tailwind Plus Cashflow reference

Add route to `App.tsx` under `/cashflow`.

**Verify:**

```bash
pnpm check
pnpm dev
```

Smoke-check route in browser. If anything requires raw classes, the missing block is a gap — add to Phase 4 and loop.

---

## Phase 6 — Migrate existing pages

Rewrite each page using the new DS:

- `Dashboard.tsx`
- `Inventory.tsx`
- `Channels.tsx`
- `Messages.tsx`
- `Settings.tsx`

Per page: replace any remaining raw color classes, custom card markup, custom status badges, custom alert banners with blocks from the catalogue.

**Verify per page:**

```bash
grep -nE "text-(green|red|white|zinc|gray|slate)-|bg-(white|green|red|zinc|gray|slate)-|dark:" client/src/pages/<Page>.tsx
# Must return nothing.
```

Final:

```bash
pnpm check
```

---

## Phase 7 — Delete obsolete primitives

After all pages use the new blocks, the old primitives have no remaining imports.

**Delete:**

- `client/src/components/ds/Card.tsx`
- `client/src/components/ds/StatusBadge.tsx`
- `client/src/components/ds/AlertBanner.tsx`

Clean up `ds/index.ts` barrel.

**Verify:**

```bash
pnpm check
grep -r "from \"@/components/ds/Card\"" client/src/
grep -r "from \"@/components/ds/StatusBadge\"" client/src/
grep -r "from \"@/components/ds/AlertBanner\"" client/src/
# All must return nothing.
```

---

## Phase 8 — Documentation finalization

**Update `CLAUDE.md`:**

- Primitives section reflects `Page`/`Grid` only
- Blocks section lists the current catalogue with one-line purpose each
- Add: "Every primitive and block has a `.stories.tsx`. Consult Storybook (`pnpm storybook`) for visuals."
- Remove references to `StatusBadge`, `AlertBanner`, old `Card`

**Update `design-system/README.md`:**

- Add a "Visual documentation" section pointing at Storybook
- Add the Storybook convention: every primitive and block ships with stories

**Create `design-system/CATALOG.md`:**

- Table: Name | Kind (Primitive / Block) | Purpose | Source path
- Must include every entry in `ds/primitives/` and `ds/blocks/`

**Delete `DESIGN_GUIDE.md`** — obsolete; replaced by `design-system/README.md` + Storybook.

**Verify:**

```bash
ls DESIGN_GUIDE.md 2>&1 | grep -q "No such file"
test -f design-system/CATALOG.md
```

---

## Blocker protocol

If blocked on a decision that requires human judgment (e.g., visual calibration a token can't express, API shape ambiguity):

1. Append the blocker to `design-system/BLOCKERS.md` — context, what was tried, what decision is needed.
2. Leave other phases untouched.
3. Emit `<promise>BLOCKED</promise>`.

Never make destructive decisions when blocked. Prefer leaving a TODO marker in code with `// TODO(migration-plan):` prefix.

---

## Completion

When all completion criteria are satisfied and the progress tracker is fully checked:

Emit `<promise>MIGRATION-COMPLETE</promise>`.
