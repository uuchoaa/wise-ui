<script setup lang="ts">
import { computed } from 'vue'

type BrandColor =
  | 'indigo'
  | 'rose'
  | 'amber'
  | 'emerald'
  | 'slate'
  | 'sky'
  | 'purple'
  | 'fuchsia'

type BrandSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    name: string
    color?: BrandColor
    size?: BrandSize
  }>(),
  { size: 'md' },
)

const palettes: Record<BrandColor, string> = {
  indigo:  'bg-indigo-500 text-white',
  rose:    'bg-rose-500 text-white',
  amber:   'bg-amber-500 text-white',
  emerald: 'bg-emerald-500 text-white',
  slate:   'bg-slate-700 text-white',
  sky:     'bg-sky-500 text-white',
  purple:  'bg-purple-600 text-white',
  fuchsia: 'bg-fuchsia-600 text-white',
}

const sizes: Record<BrandSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
}

const paletteKeys = Object.keys(palettes) as BrandColor[]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) >>> 0
  return h
}

const resolvedColor = computed<BrandColor>(
  () => props.color ?? paletteKeys[hash(props.name) % paletteKeys.length],
)
const initial = computed(() => props.name.trim().charAt(0).toUpperCase())
</script>

<template>
  <span
    :class="[
      'inline-flex shrink-0 items-center justify-center rounded-md font-semibold',
      palettes[resolvedColor],
      sizes[size],
    ]"
    :aria-label="name"
  >
    {{ initial }}
  </span>
</template>
