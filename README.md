# garage-sale

A personal command-center for running a one-time moving sale across WhatsApp, OLX, Instagram, Mercado Livre, and Facebook Marketplace. Single user, local-only, intended to stop existing once the move is done.

## Status

Pre-implementation. The product spec is fixed; the scaffold is not yet in place.

- Product spec (7 screens, domain model, visual principles): [`docs/briefing.md`](docs/briefing.md)
- Working conventions and stack rationale: [`CLAUDE.md`](CLAUDE.md)
- Reference UI dump (read-only Tailwind Plus App UI): [`application-ui-v4/`](application-ui-v4/GLOSSARY.md)

## Stack

- Vue 3 (`<script setup>` + Composition API), TypeScript
- Vite
- Tailwind CSS v4
- `@headlessui/vue` for interactive primitives (Dialog, Menu, Disclosure, Combobox)
- `@heroicons/vue` for icons

Router, state library, and test runner are deferred until a second screen forces the decision. See [`CLAUDE.md`](CLAUDE.md#stack) for the rationale behind Vue over React.

## Getting started

Scaffold not yet created — this section will fill in once `package.json` lands. Expected shape:

```sh
pnpm install
pnpm dev
```

## Conventions

- Code, comments, filenames, docs: **English**.
- UI copy (rendered strings): **pt-BR** (seller is in Pinheiros, São Paulo).
- Money: BRL, formatted `R$ 1.234,56`, no cents when whole.
- Time: relative (`agora`, `há 2h`, `ontem`); fall back to `DD/MM` beyond a week. Timezone: `America/São_Paulo`.
- Visual palette: zinc only. No brand color, no gradients, no decorative emojis. Full list in [`docs/briefing.md`](docs/briefing.md#9-visual-principles-non-negotiable).

## Non-goals for the pilot

No real channel integrations, no auth, no mobile-first redesign, no automated tests, no payment processing. Everything external is a fixture. See [`docs/briefing.md` §8](docs/briefing.md#8-non-goals-for-this-pilot).
