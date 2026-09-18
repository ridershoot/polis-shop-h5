<script setup lang="ts">
import { subscribeTabShow } from '@/bridge/tab-show'
import type { TabShowPayload } from '@/bridge/types'

const lastTabShow = ref<TabShowPayload | null>(null)

onMounted(() => {
  return subscribeTabShow((payload) => {
    lastTabShow.value = payload
  })
})
</script>

<template>
  <main class="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
    <h1 class="text-2xl font-semibold tracking-tight">个人中心</h1>
    <p class="text-sm text-neutral-500">polis-shop-h5 · 个人中心示例视图</p>
    <p class="text-xs text-neutral-500">
      最近 onTabShow：
      <span v-if="lastTabShow">{{ lastTabShow.tab }} / {{ lastTabShow.reason }}</span>
      <span v-else>—</span>
    </p>
  </main>
</template>
