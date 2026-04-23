# Reference apps

The `vue/page-examples/` folder bundles two demo apps, each shown in three
states (home / detail / settings), sharing the same base components.
We name them after the branding the Tailwind team planted in the examples
themselves, so the dump reads like two real products instead of "App A /
App B".

## Planetaria (sidebar shell)

- **Domain:** deployments / DevOps
- **Shell:** sidebar (`vue/application-shells/sidebar/`)
- **Top-level nav:** Dashboard, Team, Projects, Calendar, Documents, Reports
- **Teams switcher:** Planetaria, Protocol, Tailwind Labs
- **User:** Tom Cook
- **Screens:**
  - Home — `vue/page-examples/home-screens/01-sidebar.vue` — "Deployments" (activity feed)
  - Detail — `vue/page-examples/detail-screens/01-sidebar.vue` — deployment detail (Overview)
  - Settings — `vue/page-examples/settings-screens/01-sidebar.vue` — "Account Settings"

## Cashflow (stacked shell)

- **Domain:** invoicing / finance
- **Shell:** stacked (`vue/application-shells/stacked/`)
- **Top-level nav:** Home, Invoices, Clients, Expenses
- **User:** Tom Cook
- **Screens:**
  - Home — `vue/page-examples/home-screens/02-stacked.vue` — "Cashflow" (recent activity + recent clients)
  - Detail — `vue/page-examples/detail-screens/02-stacked.vue` — "Invoice" (summary + activity)
  - Settings — `vue/page-examples/settings-screens/02-stacked.vue` — "General Settings" (Profile, Bank accounts, Integrations, Language and dates)
