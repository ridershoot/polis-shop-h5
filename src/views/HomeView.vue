<script setup lang="ts">
import { openPage, waitForBridge } from '@/bridge/client'
import { hasPolisShopUserAgent } from '@/bridge/detect'
import { subscribeTabShow } from '@/bridge/tab-show'
import type { TabShowPayload } from '@/bridge/types'

const router = useRouter()
const lastTabShow = ref<TabShowPayload | null>(null)
const opening = ref(false)
const hint = ref('')

onMounted(() => {
  return subscribeTabShow((payload) => {
    lastTabShow.value = payload
    // Returning from secondary: clear any stuck busy state from a dropped settle.
    if (payload.reason === 'back' || payload.reason === 'tab') {
      opening.value = false
    }
  })
})

async function openBridgeDemo() {
  if (opening.value) return
  opening.value = true
  hint.value = ''
  const url = `${window.location.origin}${import.meta.env.BASE_URL}bridge-demo`
  try {
    if (hasPolisShopUserAgent()) {
      await waitForBridge(8000)
      const result = await openPage(url)
      if (!result.ok) {
        hint.value = 'openPage 被壳拒绝'
      }
      return
    }
    await router.push('/bridge-demo')
  } catch (error) {
    const msg =
      error instanceof Error
        ? error.message
        : error && typeof error === 'object' && 'message' in error
          ? String((error as { message: unknown }).message)
          : String(error)
    hint.value =
      msg === 'bridge_timeout'
        ? '打开失败：壳回执超时（通常不是 uni.webview.js）'
        : `打开失败：${msg}`
  } finally {
    opening.value = false
  }
}
</script>

<template>
  <main class="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
    <h1 class="text-2xl font-semibold tracking-tight">首页</h1>
    <p class="text-sm text-neutral-500">polis-shop-h5 · 首页示例视图</p>

    <button
      type="button"
      class="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      :disabled="opening"
      @click="openBridgeDemo"
    >
      打开桥接调试
    </button>
    <p v-if="hint" class="text-xs text-red-600">{{ hint }}</p>

    <p class="text-xs text-neutral-500">
      最近 onTabShow：
      <span v-if="lastTabShow">{{ lastTabShow.tab }} / {{ lastTabShow.reason }}</span>
      <span v-else>—</span>
    </p>
  </main>
</template>
