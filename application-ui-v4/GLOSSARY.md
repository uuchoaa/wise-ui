# Reference apps

The `page-examples/` folder bundles two demo apps, each shown in three
states (home / detail / settings), sharing the same base components.
We name them after the branding the Tailwind team planted in the examples
themselves, so the dump reads like two real products instead of "App A /
App B".

## Planetaria (sidebar shell)

- **Domain:** deployments / DevOps
- **Shell:** sidebar (`application-shells/sidebar/`)
- **Top-level nav:** Dashboard, Team, Projects, Calendar, Documents, Reports
- **Teams switcher:** Planetaria, Protocol, Tailwind Labs
- **User:** Tom Cook
- **Screens:**
  - Home — `page-examples/home-screens/01-sidebar.html` — "Deployments" (activity feed)
  - Detail — `page-examples/detail-screens/01-sidebar.html` — deployment detail (Overview)
  - Settings — `page-examples/settings-screens/01-sidebar.html` — "Account Settings"

## Cashflow (stacked shell) — base for garage-sale

- **Domain:** invoicing / finance
- **Shell:** stacked (`application-shells/stacked/`)
- **Top-level nav:** Home, Invoices, Clients, Expenses
- **User:** Tom Cook
- **Screens:**
  - Home — `page-examples/home-screens/02-stacked.html` — "Cashflow" (recent activity + recent clients)
  - Detail — `page-examples/detail-screens/02-stacked.html` — "Invoice" (summary + activity)
  - Settings — `page-examples/settings-screens/02-stacked.html` — "General Settings" (Profile, Bank accounts, Integrations, Language and dates)

## Why garage-sale uses Cashflow (App B)

Three reasons, in order of weight:

1. **Single-user means no teams switcher.** The briefing is explicit
   (§2 — "One user: me. No accounts, no invites, no roles"). Planetaria's
   sidebar is built around a teams switcher (Planetaria / Protocol /
   Tailwind Labs) that would be dead weight and visually noisy.
2. **Transactional state machine, not a workspace.** Both apps track
   discrete objects moving through states: Cashflow invoices
   (draft → sent → paid), garage-sale items (draft → available → reserved
   → sold) and orders (agreed → paid → picked up / no-show). Planetaria is
   a deployments workspace — a different mental model.
3. **Density matches the brief.** The Cashflow home opens with a single
   large metric + recent activity, which maps almost 1:1 to the Dashboard
   described in §5.1 ("X days until the move · Y/Z items sold · R$
   received / R$ agreed" + urgent queue + today's pickups). Planetaria's
   home is a deploy feed — less numeric.

**Known tradeoff:** garage-sale has 7 top-level screens (Dashboard,
Inventory, Channels, Conversations, Follow-ups, Promotions, Sales) versus
Cashflow's 4. In pt-BR the labels are wordier ("Conversas", "Divulgação"),
so the stacked nav will be tighter than in the reference. If it overflows
at the target viewport, the fallback is to compress labels or promote
Sales/Follow-ups into the Dashboard rather than switch to a sidebar.
