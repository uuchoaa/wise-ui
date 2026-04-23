# wise-ui

Vue-based design system based on Tailwind Plus Application UI bundle.

## Repo state

Currently pre-implementation. The tree is intentionally lean:

- `application-ui-v4/` — reference pattern library + `GLOSSARY.md`.

## Stack

- **Framework**: Vue 3 (`<script setup>` + Composition API), TypeScript.
- **Build**: Vite.
- **Styling**: Tailwind CSS v4.
- **Interactive primitives**: `@headlessui/vue` (Dialog, Menu, Disclosure, Combobox).
- **Icons**: `@heroicons/vue` (outline + solid 20), one family only.
- **Router/state/test runner**: deferred until a second screen forces the decision.

### Why Vue over React

1. **Form-heavy UX.** The briefing leans on controlled inputs (inventory edit drawer §5.2, composer + quick-reply chips §5.4, campaign builder §5.6, live-filter bars everywhere). `v-model` collapses the `value` / `onChange` pair into one directive — meaningfully less boilerplate at this scale.
2. **Live-preview reactivity.** Promotions (§5.6) updates preview and button labels as items and channels toggle. This is textbook `ref` / `computed`; the React equivalent would lean on `useEffect` dependency arrays that get fragile fast.
3. **Lower drift from the reference dump.** `application-ui-v4/vue/` templates are near-literal HTML with `v-for` / `:prop` / `@event`. Copy-paste from `02-stacked.vue` carries far less translation cost than the JSX equivalent (`class` → `className`, map expressions, `'use client'`).
4. **Single-user, throwaway tool.** React's ecosystem advantage (hireability, library breadth) is not load-bearing for a 12-day personal tool.

Trade-off accepted: smaller ecosystem, `.value` unwrapping in `<script setup>`. Neither blocks the pilot.

## Deferred to next session

Punted from the current Settings + Detail sweep to keep scope honest:

- **Storybook stories** for new primitives (Switch, Settings*, form primitives). API + screen first; stories later.
- **Unit specs** for new primitives. Same reason.
- **Mocks / fixtures** beyond what a single screen needs.
- **Refactoring `Home.vue` / `Home.yaml`** for Cashflow and Planetaria. Only touch if a new convention breaks them.
- **Second-target ports** (React, Rails). Tracked in `docs/targets.md`; Vue-only for now.

## Session decisions (2026-04-23)

Locked in to unblock the Settings + Detail sweep:

- **Form stack**: VeeValidate + **Zod** (not Yup). `.schema.ts` uses Zod; type inference is nicer and the ecosystem is the one we'd reuse in a React port.
- **Settings sub-nav**: slot `#sidenav` on `<Page>`, not a dedicated `<SettingsLayout>` component. Same shell, one slot.
- **`SettingsRow`**: three separate components (`SettingsFieldRow`, `SettingsItemRow`, `SettingsToggleRow`) instead of one polymorphic variant. Determinism for LLM > reuse.
- **Detail scope**: split into draft-first / schemas-second if the reference is heavy. Don't block the sweep on one tela.
