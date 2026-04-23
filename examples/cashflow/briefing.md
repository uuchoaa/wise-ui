# Cashflow — briefing

Cashflow is the sample app we use to exercise the **stacked dialect** of wise-ui. It's a small-business invoicing product — the user is a freelancer or small agency who logs in a few times a day to check what got paid, send an invoice, or review a client.

See `docs/archetypes.md` for the archetype system overall. This file is about *why Cashflow looks the way it does* — the choices that define the dialect.

## Domain

Cashflow covers:

- **Home** — dashboard: KPIs (revenue, overdue, outstanding, expenses), recent transactions, recent clients
- **Index** — `Invoices`: filterable table of invoices (by status)
- **Detail** — a single invoice: summary + full document + activity with comments
- **Settings** — profile, bank accounts, integrations, locale

Fictional, modeled on a generic North-American SMB: USD, English copy, `January 31, 2023`-style dates.

## Dialect choices

### Top bar + tabs (StackedShell)

The user logs in, scans the home dashboard, maybe opens one invoice, then leaves. A persistent sidebar is overkill for a product with ~4 top-level sections that the user visits sequentially rather than pivoting between.

`StackedShell` puts the nav in a top bar with horizontal tabs (Home / Invoices / Clients / Expenses). The primary action ("New invoice") lives in `PageHeading.actions`, not in the shell — because creating an invoice is scoped to the Invoices context.

No search field in the shell. Cashflow has few enough resources that per-page search (on Invoices) is sufficient.

### Breathable layout, less operational chrome

On **Home**, the page stacks full-width sections top to bottom: stats → activity → clients grid. No rail. The mental model is "daily check" — read through once, done. A rail would imply there's secondary content worth glancing at; here, the content *is* the scan.

### Detail = **Document** subtype

An invoice is a transactional document. The user cares:

1. What is it? (`DetailHeading` — client logo + `Invoice #00011` eyebrow + client name + actions: Copy URL / Edit / Send)
2. What are the key facts I might act on now? (`SummaryCard` as a right-column rail: Amount + status badge, Client, Due date, Payment + link to download receipt)
3. What does the document itself say? (`InvoiceDocument` — From/To, line items, Subtotal / Tax / Total)
4. Who did what, and can I add a note? (`Timeline` with heterogeneous events + a `form` with `Textarea` composer)

The composer distinguishes Cashflow's Detail from Planetaria's: invoices are collaborative artifacts (freelancer ↔ client ↔ accountant), deploys aren't.

### Settings = **Field-list** subtype

Most visits to Settings read a value without changing it (check which bank is connected, check the current locale). Making the whole thing an always-visible form would be noisy. So:

- Local left rail (`Page.sidenav` slot with a `NavGroup`) — vertical because the shell's nav is horizontal. Perpendicular is the rule.
- `SettingsSection` wrapper per group (Profile, Bank accounts, Integrations, Language and dates).
- `SettingsFieldRow` shows `label + value + Update` action. Update opens a dialog or slide-over.
- Multi-value sections (bank accounts, integrations) use `SettingsItemRow` in a list with an "Add another" button in the section's `actions` slot.
- `SettingsToggleRow` for booleans ("Automatic timezone").

No form schema file. Updates are per-field dialogs, not section-wide form submissions.

## Composition conventions

- **Copy** is English throughout.
- **Money** is USD with `$10,560.00` formatting. Whole values typically still show `.00` in invoice contexts (totals, line items) for alignment; elsewhere they can drop cents.
- **Time** is relative (`Today`, `Yesterday`, `2 days ago`) with an ISO `datetime` attribute on the `<time>` element. Dates fall back to `Jan 31, 2023` beyond a week.
- **Status tones**: `paid → positive`, `overdue → negative`, `open → neutral`, `withdraw → neutral`.
- **Icons** from `@heroicons/vue/24/outline`. Used sparingly: settings sub-nav (`UserCircle`, `FingerPrint`, `Bell`, etc.), row icons (`BuildingLibrary`, `PuzzlePiece`), SummaryCard row markers (`UserCircle`, `CalendarDays`, `CreditCard`).

## Composites

`examples/cashflow/components/InvoiceDocument.vue` is the only app-specific composite right now. It wraps the structural part of the invoice (From/To + line items + totals) because no other archetype needs that shape. It composes DS primitives only — no Tailwind at the consumer.

## What Cashflow does NOT use

- No `SidebarShell` (wrong dialect).
- No `StatGrid` on Detail (that's the Overview subtype).
- No `SettingsFormSection` with always-visible inputs (wrong Settings subtype).
- No `ResourceList` with rail-based activity feed on Home (that's Planetaria's Home shape).

If a future Cashflow screen reaches for one of these, pause — either we misidentified the archetype, or the dialect is drifting.
