<script setup lang="ts">
import {
  StackedShell,
  HeroBlock,
  PageHeading,
  FilterLinks,
  SearchField,
  Button,
  type NavItem,
  type NavTabItem,
} from 'wise-ui'
import { PlusSmallIcon } from '@heroicons/vue/20/solid'

type StatusFilter = NavTabItem
type InvoiceStatus = 'paid' | 'open' | 'overdue'
type Invoice = {
  id: string
  ref: string
  href: string
  client: { name: string; logo: string }
  amount: string
  dueDate: { date: string; datetime: string }
  status: InvoiceStatus
}

const nav: NavItem[] = [
  { label: 'Home',     to: '#' },
  { label: 'Invoices', to: '#', current: true },
  { label: 'Clients',  to: '#' },
  { label: 'Expenses', to: '#' },
]

const user = {
  name: 'Tom Cook',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const statusFilters: StatusFilter[] = [
  { label: 'All',     value: 'all',     current: true },
  { label: 'Open',    value: 'open' },
  { label: 'Paid',    value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
]

const invoices: Invoice[] = [
  { id: '1', ref: '00012', href: '#', client: { name: 'Reform',     logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg'    }, amount: '$7,600.00',  dueDate: { date: 'April 30, 2026',    datetime: '2026-04-30' }, status: 'open'    },
  { id: '2', ref: '00011', href: '#', client: { name: 'Tuple, Inc', logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg'     }, amount: '$10,560.00', dueDate: { date: 'January 31, 2026',  datetime: '2026-01-31' }, status: 'paid'    },
  { id: '3', ref: '00010', href: '#', client: { name: 'SavvyCal',   logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg'  }, amount: '$14,000.00', dueDate: { date: 'January 22, 2026',  datetime: '2026-01-22' }, status: 'paid'    },
  { id: '4', ref: '00009', href: '#', client: { name: 'Tuple',      logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg'     }, amount: '$2,000.00',  dueDate: { date: 'December 13, 2025', datetime: '2025-12-13' }, status: 'overdue' },
  { id: '5', ref: '00008', href: '#', client: { name: 'Reform',     logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg'    }, amount: '$3,200.00',  dueDate: { date: 'May 5, 2026',       datetime: '2026-05-05' }, status: 'open'    },
  { id: '6', ref: '00007', href: '#', client: { name: 'SavvyCal',   logo: 'https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg'  }, amount: '$5,400.00',  dueDate: { date: 'December 8, 2025',  datetime: '2025-12-08' }, status: 'overdue' },
]

const statusLabel: Record<InvoiceStatus, string> = {
  paid:    'Paid',
  open:    'Open',
  overdue: 'Overdue',
}

const statusPill: Record<InvoiceStatus, string> = {
  paid:    'text-tone-positive-700 bg-tone-positive-50 ring-tone-positive-700/20',
  open:    'text-tone-neutral-500 bg-tone-neutral-50 ring-tone-neutral-500/15',
  overdue: 'text-tone-negative-700 bg-tone-negative-50 ring-tone-negative-700/15',
}
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <img
        class="h-8 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </template>

    <HeroBlock>
      <PageHeading title="Invoices">
        <template #nav>
          <FilterLinks :items="statusFilters" />
        </template>
        <template #actions>
          <Button variant="primary" :icon="PlusSmallIcon">New invoice</Button>
        </template>
      </PageHeading>
    </HeroBlock>

    <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div
        class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="sm:max-w-xs">
          <SearchField placeholder="Search invoices" />
        </div>
        <button
          type="button"
          class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-tone-neutral-700 shadow-xs inset-ring-1 inset-ring-tone-neutral-500/30 hover:bg-tone-neutral-50"
        >
          Export
        </button>
      </div>
    </div>

    <div class="mt-8 overflow-hidden border-t border-tone-neutral-500/15">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left text-sm/6 whitespace-nowrap">
          <thead class="border-b border-tone-neutral-500/15 text-tone-neutral-700">
            <tr>
              <th scope="col" class="py-3 pr-8 pl-0 font-semibold">Client</th>
              <th
                scope="col"
                class="hidden py-3 pr-8 pl-0 font-semibold sm:table-cell"
              >
                Amount
              </th>
              <th
                scope="col"
                class="hidden py-3 pr-8 pl-0 font-semibold md:table-cell"
              >
                Due date
              </th>
              <th scope="col" class="py-3 pr-8 pl-0 font-semibold">Status</th>
              <th scope="col" class="py-3 pr-0 pl-8 text-right font-semibold">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-tone-neutral-500/10">
            <tr v-for="inv in invoices" :key="inv.id">
              <td class="py-4 pr-8 pl-0">
                <div class="flex items-center gap-x-4">
                  <img
                    :src="inv.client.logo"
                    :alt="inv.client.name"
                    class="size-10 flex-none rounded-md bg-white object-cover ring-1 ring-tone-neutral-500/15"
                  />
                  <div>
                    <div class="text-sm/6 font-medium text-tone-neutral-700">
                      {{ inv.client.name }}
                    </div>
                    <div class="text-xs/5 text-tone-neutral-500">Invoice #{{ inv.ref }}</div>
                  </div>
                </div>
              </td>
              <td class="hidden py-4 pr-8 pl-0 sm:table-cell">
                <div class="text-sm/6 text-tone-neutral-700 tabular-nums">
                  {{ inv.amount }}
                </div>
              </td>
              <td class="hidden py-4 pr-8 pl-0 md:table-cell">
                <time :datetime="inv.dueDate.datetime" class="text-sm/6 text-tone-neutral-500">
                  {{ inv.dueDate.date }}
                </time>
              </td>
              <td class="py-4 pr-8 pl-0">
                <span
                  :class="[
                    statusPill[inv.status],
                    'inline-flex rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                  ]"
                >
                  {{ statusLabel[inv.status] }}
                </span>
              </td>
              <td class="py-4 pr-0 pl-8 text-right">
                <a
                  :href="inv.href"
                  class="text-sm/6 font-medium text-tone-accent-700 hover:text-tone-accent-500"
                >
                  View<span class="sr-only">, invoice #{{ inv.ref }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <nav
          class="flex items-center justify-between border-t border-tone-neutral-500/10 py-4 text-sm/6"
          aria-label="Pagination"
        >
          <div class="text-tone-neutral-500">
            Showing <span class="font-medium text-tone-neutral-700">1</span> to
            <span class="font-medium text-tone-neutral-700">6</span> of
            <span class="font-medium text-tone-neutral-700">42</span> invoices
          </div>
          <div class="flex gap-x-2">
            <button
              type="button"
              class="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-tone-neutral-500 shadow-xs inset-ring-1 inset-ring-tone-neutral-500/15 hover:bg-tone-neutral-50"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              class="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-tone-neutral-700 shadow-xs inset-ring-1 inset-ring-tone-neutral-500/30 hover:bg-tone-neutral-50"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  </StackedShell>
</template>
