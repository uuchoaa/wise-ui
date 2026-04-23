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
import { ChevronRightIcon, PlusSmallIcon } from '@heroicons/vue/20/solid'

type Environment = 'Preview' | 'Production'
type ProjectStatus = 'online' | 'offline' | 'error'
type Project = {
  id: string
  name: string
  team: string
  href: string
  status: ProjectStatus
  environment: Environment
  description: string
  statusText: string
}

const nav: NavItem[] = [
  { label: 'Projects',    to: '#', icon: FolderIcon, current: true },
  { label: 'Deployments', to: '#', icon: ServerIcon },
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

const statusPill: Record<ProjectStatus, string> = {
  offline: 'text-tone-neutral-500 bg-tone-neutral-500/10',
  online:  'text-tone-positive-500 bg-tone-positive-500/10',
  error:   'text-tone-negative-500 bg-tone-negative-500/10',
}

const envPill: Record<Environment, string> = {
  Preview:    'text-tone-neutral-500 bg-tone-neutral-50 ring-tone-neutral-500/15',
  Production: 'text-tone-accent-700 bg-tone-accent-50 ring-tone-accent-700/20',
}

const projects: Project[] = [
  { id: '1', name: 'mobile-api',      team: 'Planetaria',    href: '#', status: 'online',  environment: 'Production', description: 'Deploys from GitHub',          statusText: 'Last deploy 45 minutes ago by Michael Foster' },
  { id: '2', name: 'web-app',         team: 'Planetaria',    href: '#', status: 'online',  environment: 'Production', description: 'Deploys from GitHub',          statusText: 'Last deploy 3 hours ago by Lindsay Walton'    },
  { id: '3', name: 'docs',            team: 'Planetaria',    href: '#', status: 'online',  environment: 'Preview',    description: 'Deploys from GitHub',          statusText: 'Last deploy 1 day ago by Courtney Henry'      },
  { id: '4', name: 'design-system',   team: 'Tailwind Labs', href: '#', status: 'error',   environment: 'Preview',    description: 'Deploys from GitHub',          statusText: 'Failed 2 days ago by Tom Cook'                },
  { id: '5', name: 'marketing',       team: 'Protocol',      href: '#', status: 'offline', environment: 'Production', description: 'Deploys from GitHub',          statusText: 'Last deploy 5 days ago by Whitney Francis'    },
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

    <header
      class="flex items-center justify-between border-b border-tone-neutral-500/15 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
    >
      <h1 class="text-base/7 font-semibold text-tone-neutral-700">Projects</h1>
      <button
        type="button"
        class="inline-flex items-center gap-x-1 rounded-md bg-tone-accent-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-tone-accent-500"
      >
        <PlusSmallIcon class="-ml-1.5 size-5" aria-hidden="true" />
        New project
      </button>
    </header>

    <ul role="list" class="divide-y divide-tone-neutral-500/10">
      <li
        v-for="project in projects"
        :key="project.id"
        class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <div class="min-w-0 flex-auto">
          <div class="flex items-center gap-x-3">
            <div :class="[statusPill[project.status], 'flex-none rounded-full p-1']">
              <div class="size-2 rounded-full bg-current" />
            </div>
            <h2 class="min-w-0 text-sm/6 font-semibold text-tone-neutral-700">
              <a :href="project.href" class="flex gap-x-2">
                <span class="truncate">{{ project.team }}</span>
                <span class="text-tone-neutral-500">/</span>
                <span class="whitespace-nowrap">{{ project.name }}</span>
                <span class="absolute inset-0" />
              </a>
            </h2>
          </div>
          <div class="mt-3 flex items-center gap-x-2.5 text-xs/5 text-tone-neutral-500">
            <p class="truncate">{{ project.description }}</p>
            <svg viewBox="0 0 2 2" class="size-0.5 flex-none fill-tone-neutral-500">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <p class="whitespace-nowrap">{{ project.statusText }}</p>
          </div>
        </div>
        <div
          :class="[
            envPill[project.environment],
            'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
          ]"
        >
          {{ project.environment }}
        </div>
        <ChevronRightIcon class="size-5 flex-none text-tone-neutral-500" aria-hidden="true" />
      </li>
    </ul>

    <nav
      class="flex items-center justify-between border-t border-tone-neutral-500/15 px-4 py-4 text-sm/6 sm:px-6 lg:px-8"
      aria-label="Pagination"
    >
      <div class="text-tone-neutral-500">
        Showing <span class="font-medium text-tone-neutral-700">1</span> to
        <span class="font-medium text-tone-neutral-700">5</span> of
        <span class="font-medium text-tone-neutral-700">28</span> projects
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
  </SidebarShell>
</template>
