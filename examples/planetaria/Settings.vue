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
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const nav: NavItem[] = [
  { label: 'Projects',    to: '#', icon: FolderIcon },
  { label: 'Deployments', to: '#', icon: ServerIcon },
  { label: 'Activity',    to: '#', icon: SignalIcon },
  { label: 'Domains',     to: '#', icon: GlobeAltIcon },
  { label: 'Usage',       to: '#', icon: ChartBarSquareIcon },
  { label: 'Settings',    to: '#', icon: Cog6ToothIcon, current: true },
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
  { name: 'Account',       href: '#', current: true  },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Billing',       href: '#', current: false },
  { name: 'Teams',         href: '#', current: false },
  { name: 'Integrations',  href: '#', current: false },
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

    <h1 class="sr-only">Account Settings</h1>

    <header class="border-b border-tone-neutral-500/15">
      <nav class="flex overflow-x-auto py-4">
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
    </header>

    <div class="divide-y divide-tone-neutral-500/15">
      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold text-tone-neutral-700">
            Personal Information
          </h2>
          <p class="mt-1 text-sm/6 text-tone-neutral-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full flex items-center gap-x-8">
              <img
                :src="user.avatar"
                alt=""
                class="size-24 flex-none rounded-lg bg-tone-neutral-50 object-cover outline -outline-offset-1 outline-black/5"
              />
              <div>
                <button
                  type="button"
                  class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-tone-neutral-700 shadow-xs inset-ring-1 inset-ring-tone-neutral-500/30 hover:bg-tone-neutral-50"
                >
                  Change avatar
                </button>
                <p class="mt-2 text-xs/5 text-tone-neutral-500">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                First name
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Last name
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="email"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autocomplete="email"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="username"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Username
              </label>
              <div class="mt-2">
                <div
                  class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-tone-neutral-500/30 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-tone-accent-700 sm:text-sm/6"
                >
                  <div
                    class="shrink-0 text-base text-tone-neutral-500 select-none sm:text-sm/6"
                  >
                    example.com/
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="janesmith"
                    class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-tone-neutral-700 placeholder:text-tone-neutral-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="timezone"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Timezone
              </label>
              <div class="mt-2 grid grid-cols-1">
                <select
                  id="timezone"
                  name="timezone"
                  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                >
                  <option>Pacific Standard Time</option>
                  <option>Eastern Standard Time</option>
                  <option>Greenwich Mean Time</option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-tone-neutral-500 sm:size-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button
              type="submit"
              class="rounded-md bg-tone-accent-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-tone-accent-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold text-tone-neutral-700">Change password</h2>
          <p class="mt-1 text-sm/6 text-tone-neutral-500">
            Update your password associated with your account.
          </p>
        </div>

        <form class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full">
              <label
                for="current-password"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Current password
              </label>
              <div class="mt-2">
                <input
                  type="password"
                  id="current-password"
                  name="current_password"
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="new-password"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                New password
              </label>
              <div class="mt-2">
                <input
                  type="password"
                  id="new-password"
                  name="new_password"
                  autocomplete="new-password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="confirm-password"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Confirm password
              </label>
              <div class="mt-2">
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm_password"
                  autocomplete="new-password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button
              type="submit"
              class="rounded-md bg-tone-accent-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-tone-accent-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold text-tone-neutral-700">
            Log out other sessions
          </h2>
          <p class="mt-1 text-sm/6 text-tone-neutral-500">
            Please enter your password to confirm you would like to log out of your other
            sessions across all of your devices.
          </p>
        </div>

        <form class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full">
              <label
                for="logout-password"
                class="block text-sm/6 font-medium text-tone-neutral-700"
              >
                Your password
              </label>
              <div class="mt-2">
                <input
                  type="password"
                  id="logout-password"
                  name="password"
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-tone-neutral-700 outline-1 -outline-offset-1 outline-tone-neutral-500/30 placeholder:text-tone-neutral-500 focus:outline-2 focus:-outline-offset-2 focus:outline-tone-accent-700 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <button
              type="submit"
              class="rounded-md bg-tone-accent-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-tone-accent-500"
            >
              Log out other sessions
            </button>
          </div>
        </form>
      </div>

      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold text-tone-neutral-700">Delete account</h2>
          <p class="mt-1 text-sm/6 text-tone-neutral-500">
            No longer want to use our service? You can delete your account here. This
            action is not reversible. All information related to this account will be
            deleted permanently.
          </p>
        </div>

        <form class="flex items-start md:col-span-2">
          <button
            type="submit"
            class="rounded-md bg-tone-negative-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-tone-negative-700"
          >
            Yes, delete my account
          </button>
        </form>
      </div>
    </div>
  </SidebarShell>
</template>
