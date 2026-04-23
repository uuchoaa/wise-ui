<script setup lang="ts">
import {
  StackedShell,
  PageHeading,
  PageSection,
  NavTabs,
  Button,
  StatGrid,
  StatusBadge,
  ActivityTable,
  Card,
  DescriptionList,
  DescriptionListItem,
  Menu,
  MenuItem,
} from 'wise-ui'
import { EllipsisHorizontalIcon, PlusSmallIcon } from '@heroicons/vue/20/solid'

type NavItem = { label: string; to: string; current?: boolean }
type RangeTab = { label: string; value: string; current?: boolean }

type Tone = 'positive' | 'negative' | 'neutral' | 'accent'
type Stat = { label: string; value: string; delta: string; tone: Tone }

type ActivityStatus = 'paid' | 'overdue' | 'withdraw'
type ActivityKind = 'income' | 'outgoing' | 'recurring'
type ActivityEntry = {
  id: string
  kind: ActivityKind
  amount: string
  tax?: string
  status: ActivityStatus
  counterparty: string
  description: string
  ref: string
  href: string
}
type ActivityGroup = { label: string; datetime: string; entries: ActivityEntry[] }

type Client = {
  id: string
  name: string
  logo: string
  lastInvoice: { date: string; datetime: string; amount: string; status: ActivityStatus }
}

const nav: NavItem[] = [
  { label: 'Home', to: '/', current: true },
  { label: 'Faturas', to: '/invoices' },
  { label: 'Clientes', to: '/clients' },
  { label: 'Despesas', to: '/expenses' },
]

const user = { name: 'Tom Cook', avatar: '/avatars/tom.jpg' }

const ranges: RangeTab[] = [
  { label: 'Últimos 7 dias', value: '7d', current: true },
  { label: 'Últimos 30 dias', value: '30d' },
  { label: 'Todo o período', value: 'all' },
]

const stats: Stat[] = [
  { label: 'Receita',            value: 'R$ 405.091', delta: '+4,75%',  tone: 'positive' },
  { label: 'Faturas em atraso',  value: 'R$ 12.787',  delta: '+54,02%', tone: 'negative' },
  { label: 'Faturas em aberto',  value: 'R$ 245.988', delta: '-1,39%',  tone: 'positive' },
  { label: 'Despesas',           value: 'R$ 30.156',  delta: '+10,18%', tone: 'negative' },
]

const activity: ActivityGroup[] = [
  {
    label: 'Hoje',
    datetime: '2026-04-23',
    entries: [
      { id: '1', kind: 'income',    amount: 'R$ 7.600',  tax: 'R$ 500',  status: 'paid',     counterparty: 'Reform',   description: 'Redesign do site', ref: '00012', href: '/invoices/00012' },
      { id: '2', kind: 'outgoing',  amount: 'R$ 10.000',                 status: 'withdraw', counterparty: 'Tom Cook', description: 'Salário',          ref: '00011', href: '/invoices/00011' },
    ],
  },
  {
    label: 'Ontem',
    datetime: '2026-04-22',
    entries: [
      { id: '3', kind: 'recurring', amount: 'R$ 2.000',  tax: 'R$ 130',  status: 'overdue',  counterparty: 'Tuple',    description: 'Design de logo',   ref: '00009', href: '/invoices/00009' },
    ],
  },
]

const clients: Client[] = [
  { id: '1', name: 'Tuple',    logo: '/logos/tuple.svg',    lastInvoice: { date: '13/12/2025', datetime: '2025-12-13', amount: 'R$ 2.000',  status: 'overdue' } },
  { id: '2', name: 'SavvyCal', logo: '/logos/savvycal.svg', lastInvoice: { date: '22/01/2026', datetime: '2026-01-22', amount: 'R$ 14.000', status: 'paid'    } },
  { id: '3', name: 'Reform',   logo: '/logos/reform.svg',   lastInvoice: { date: '23/01/2026', datetime: '2026-01-23', amount: 'R$ 7.600',  status: 'paid'    } },
]

const statusLabel: Record<ActivityStatus, string> = {
  paid:     'Pago',
  overdue:  'Em atraso',
  withdraw: 'Saída',
}

const statusTone: Record<ActivityStatus, Tone> = {
  paid:     'positive',
  overdue:  'negative',
  withdraw: 'neutral',
}
</script>

<template>
  <StackedShell :nav="nav" :user="user">
    <template #brand>
      <img src="/logo.svg" alt="Cashflow" class="h-8" />
    </template>

    <PageHeading title="Cashflow">
      <template #nav>
        <NavTabs :items="ranges" />
      </template>
      <template #actions>
        <Button variant="primary" :icon="PlusSmallIcon">Nova fatura</Button>
      </template>
    </PageHeading>

    <StatGrid :items="stats" />

    <PageSection title="Atividade recente">
      <ActivityTable :groups="activity">
        <template #amount="{ entry }">
          <span>{{ entry.amount }}</span>
          <StatusBadge :tone="statusTone[entry.status]" :label="statusLabel[entry.status]" />
        </template>

        <template #meta="{ entry }">
          <div>{{ entry.counterparty }}</div>
          <div>{{ entry.description }}</div>
        </template>

        <template #action="{ entry }">
          <a :href="entry.href">Ver<span class="sr-only"> transação</span></a>
          <div>Fatura #{{ entry.ref }}</div>
        </template>
      </ActivityTable>
    </PageSection>

    <PageSection title="Clientes recentes" action-label="Ver todos" action-href="/clients">
      <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        <Card v-for="client in clients" :key="client.id" tag="li">
          <template #header>
            <img :src="client.logo" :alt="client.name" class="size-12 rounded-lg" />
            <span>{{ client.name }}</span>
            <Menu class="ml-auto">
              <template #trigger>
                <EllipsisHorizontalIcon class="size-5" aria-hidden="true" />
              </template>
              <MenuItem :to="`/clients/${client.id}`">Ver</MenuItem>
              <MenuItem :to="`/clients/${client.id}/edit`">Editar</MenuItem>
            </Menu>
          </template>

          <DescriptionList>
            <DescriptionListItem label="Última fatura">
              <time :datetime="client.lastInvoice.datetime">{{ client.lastInvoice.date }}</time>
            </DescriptionListItem>
            <DescriptionListItem label="Valor">
              <span>{{ client.lastInvoice.amount }}</span>
              <StatusBadge :tone="statusTone[client.lastInvoice.status]" :label="statusLabel[client.lastInvoice.status]" />
            </DescriptionListItem>
          </DescriptionList>
        </Card>
      </ul>
    </PageSection>
  </StackedShell>
</template>
