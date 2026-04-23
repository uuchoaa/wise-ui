<script setup lang="ts">
import {
  SidebarShell,
  NavGroup,
  SearchField,
  type NavItem,
  type NavGroupItem,
} from 'wise-ui'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'

type Status = 'Completed' | 'Error'

type ActivityItem = {
  user: { name: string; imageUrl: string }
  commit: string
  branch: string
  status: Status
  duration: string
  date: string
  dateTime: string
}

const nav: NavItem[] = [
  { label: 'Projects',    to: '#', icon: FolderIcon },
  { label: 'Deployments', to: '#', icon: ServerIcon, current: true },
  { label: 'Activity',    to: '#', icon: SignalIcon },
  { label: 'Domains',     to: '#', icon: GlobeAltIcon },
  { label: 'Usage',       to: '#', icon: ChartBarSquareIcon },
  { label: 'Settings',    to: '#', icon: Cog6ToothIcon },
]

const teams: NavGroupItem[] = [
  { label: 'Planetaria',    to: '#', initial: 'P' },
  { label: 'Protocol',      to: '#', initial: 'P' },
  { label: 'Tailwind Labs', to: '#', initial: 'T' },
]

const user = {
  name: 'Tom Cook',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const secondaryNavigation = [
  { name: 'Overview',      href: '#', current: true  },
  { name: 'Activity',      href: '#', current: false },
  { name: 'Settings',      href: '#', current: false },
  { name: 'Collaborators', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

const stats = [
  { name: 'Number of deploys',   value: '405'  },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers',   value: '3'    },
  { name: 'Success rate',        value: '98.5%' },
]

const statusPill: Record<Status, string> = {
  Completed: 'text-tone-positive-500 bg-tone-positive-500/10',
  Error:     'text-tone-negative-500 bg-tone-negative-500/10',
}

const activityItems: ActivityItem[] = [
  { user: { name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, commit: '2d89f0c8', branch: 'main', status: 'Completed', duration: '25s',    date: '45 minutes ago', dateTime: '2023-01-23T11:00' },
  { user: { name: 'Lindsay Walton', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, commit: '249df660', branch: 'main', status: 'Completed', duration: '1m 32s', date: '3 hours ago',    dateTime: '2023-01-23T09:00' },
  { user: { name: 'Courtney Henry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, commit: '11464223', branch: 'main', status: 'Error',     duration: '1m 4s',  date: '12 hours ago',   dateTime: '2023-01-23T00:00' },
  { user: { name: 'Courtney Henry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, commit: 'dad28e95', branch: 'main', status: 'Completed', duration: '2m 15s', date: '2 days ago',     dateTime: '2023-01-21T13:00' },
  { user: { name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, commit: '624bc94c', branch: 'main', status: 'Completed', duration: '1m 12s', date: '5 days ago',     dateTime: '2023-01-18T12:34' },
  { user: { name: 'Courtney Henry', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }, commit: 'e111f80e', branch: 'main', status: 'Completed', duration: '1m 56s', date: '1 week ago',     dateTime: '2023-01-16T15:54' },
]
</script>

<template>
  <SidebarShell :nav="nav" :user="user">
    <template #brand>
      <img
        class="h-8 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </template>

    <template #nav-extra>
      <NavGroup title="Your teams" :items="teams" variant="initials" />
    </template>

    <template #topbar>
      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <SearchField placeholder="Search" variant="bare" />
      </div>
    </template>

    <header>
      <nav class="flex overflow-x-auto border-b border-tone-neutral-500/15 py-4">
        <ul
          role="list"
          class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-tone-neutral-500 sm:px-6 lg:px-8"
        >
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a
              :href="item.href"
              :class="item.current ? 'text-tone-accent-700' : ''"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>

      <div
        class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-tone-neutral-50 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-x-3">
            <div
              class="flex-none rounded-full bg-tone-positive-500/10 p-1 text-tone-positive-500"
            >
              <div class="size-2 rounded-full bg-current" />
            </div>
            <h1 class="flex gap-x-3 text-base/7">
              <span class="font-semibold text-tone-neutral-700">Planetaria</span>
              <span class="text-tone-neutral-500">/</span>
              <span class="font-semibold text-tone-neutral-700">mobile-api</span>
            </h1>
          </div>
          <p class="mt-2 text-xs/6 text-tone-neutral-500">
            Deploys from GitHub via main branch
          </p>
        </div>
        <div
          class="order-first flex-none rounded-full bg-tone-accent-50 px-2 py-1 text-xs font-medium text-tone-accent-700 ring-1 ring-tone-accent-700/20 ring-inset sm:order-0"
        >
          Production
        </div>
      </div>

      <div class="grid grid-cols-1 bg-tone-neutral-50 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(stat, idx) in stats"
          :key="stat.name"
          :class="[
            idx % 2 === 1 ? 'sm:border-l' : idx === 2 ? 'lg:border-l' : '',
            'border-t border-tone-neutral-500/15 px-4 py-6 sm:px-6 lg:px-8',
          ]"
        >
          <p class="text-sm/6 font-medium text-tone-neutral-500">{{ stat.name }}</p>
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-tone-neutral-700">
              {{ stat.value }}
            </span>
            <span v-if="stat.unit" class="text-sm text-tone-neutral-500">
              {{ stat.unit }}
            </span>
          </p>
        </div>
      </div>
    </header>

    <div class="border-t border-tone-neutral-500/15 pt-11">
      <h2
        class="px-4 text-base/7 font-semibold text-tone-neutral-700 sm:px-6 lg:px-8"
      >
        Latest activity
      </h2>
      <table class="mt-6 w-full text-left whitespace-nowrap">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead
          class="border-b border-tone-neutral-500/15 text-sm/6 text-tone-neutral-700"
        >
          <tr>
            <th scope="col" class="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">User</th>
            <th scope="col" class="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell">
              Commit
            </th>
            <th
              scope="col"
              class="py-2 pr-4 pl-0 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
            >
              Status
            </th>
            <th
              scope="col"
              class="hidden py-2 pr-8 pl-0 font-semibold md:table-cell lg:pr-20"
            >
              Duration
            </th>
            <th
              scope="col"
              class="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
            >
              Deployed at
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-tone-neutral-500/10">
          <tr v-for="item in activityItems" :key="item.commit">
            <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <img
                  :src="item.user.imageUrl"
                  alt=""
                  class="size-8 rounded-full bg-tone-neutral-50 outline -outline-offset-1 outline-black/5"
                />
                <div class="truncate text-sm/6 font-medium text-tone-neutral-700">
                  {{ item.user.name }}
                </div>
              </div>
            </td>
            <td class="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="font-mono text-sm/6 text-tone-neutral-500">{{ item.commit }}</div>
                <span
                  class="inline-flex items-center rounded-md bg-tone-neutral-50 px-2 py-1 text-xs font-medium text-tone-neutral-500 ring-1 ring-tone-neutral-500/30 ring-inset"
                >
                  {{ item.branch }}
                </span>
              </div>
            </td>
            <td class="py-4 pr-4 pl-0 text-sm/6 sm:pr-8 lg:pr-20">
              <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                <time class="text-tone-neutral-500 sm:hidden" :datetime="item.dateTime">
                  {{ item.date }}
                </time>
                <div
                  :class="[statusPill[item.status], 'flex-none rounded-full p-1']"
                >
                  <div class="size-1.5 rounded-full bg-current" />
                </div>
                <div class="hidden text-tone-neutral-700 sm:block">{{ item.status }}</div>
              </div>
            </td>
            <td
              class="hidden py-4 pr-8 pl-0 text-sm/6 text-tone-neutral-500 md:table-cell lg:pr-20"
            >
              {{ item.duration }}
            </td>
            <td
              class="hidden py-4 pr-4 pl-0 text-right text-sm/6 text-tone-neutral-500 sm:table-cell sm:pr-6 lg:pr-8"
            >
              <time :datetime="item.dateTime">{{ item.date }}</time>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </SidebarShell>
</template>
