<script setup lang="ts">
import { closePage, getAppInfo, openPage, waitForBridge } from '@/bridge/client'
import { hasPolisShopUserAgent, isInApp } from '@/bridge/detect'
import type { AppInfo } from '@/bridge/types'

const log = ref('')
const inApp = ref(false)
const uaMark = ref(false)
const userAgent = ref('')
const appInfo = ref<AppInfo | null>(null)
const busy = ref(false)

function appendLog(line: string) {
  const time = new Date().toLocaleTimeString()
  log.value = `[${time}] ${line}\n${log.value}`
}

function refreshDetect() {
  userAgent.value = navigator.userAgent
  uaMark.value = hasPolisShopUserAgent()
  inApp.value = isInApp()
}

async function ensureBridge() {
  try {
    await waitForBridge(10000)
    appendLog('PolisShopBridge ready')
  } catch {
    appendLog(
      hasPolisShopUserAgent()
        ? 'PolisShopBridge unavailable（壳 UA 已有，但注入未成功）'
        : 'PolisShopBridge unavailable（非 App / 浏览器）',
    )
  }
  refreshDetect()
}

async function onGetAppInfo() {
  busy.value = true
  try {
    appInfo.value = await getAppInfo()
    appendLog(`getAppInfo → ${JSON.stringify(appInfo.value)}`)
  } catch (error) {
    appendLog(`getAppInfo failed: ${error instanceof Error ? error.message : String(error)}`)
  } finally {
    busy.value = false
    refreshDetect()
  }
}

async function onOpenSelfAgain() {
  busy.value = true
  try {
    const url = `${window.location.origin}/bridge-demo?from=openPage`
    const result = await openPage(url)
    appendLog(`openPage → ${JSON.stringify(result)} url=${url}`)
  } catch (error) {
    appendLog(`openPage failed: ${error instanceof Error ? error.message : String(error)}`)
  } finally {
    busy.value = false
  }
}

async function onBack() {
  busy.value = true
  try {
    const result = await closePage()
    appendLog(`closePage → ${JSON.stringify(result)}`)
    if (!result.ok) {
      // Browser / not secondary: fall back to history
      if (window.history.length > 1) window.history.back()
    }
  } catch (error) {
    appendLog(`closePage failed: ${error instanceof Error ? error.message : String(error)}`)
    if (window.history.length > 1) window.history.back()
  } finally {
    busy.value = false
  }
}

onMounted(() => {
  refreshDetect()
  void ensureBridge()
})
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-neutral-50 text-neutral-900">
    <header
      class="sticky top-0 z-10 flex items-center gap-3 border-b border-neutral-200 bg-white/95 px-3 py-3 backdrop-blur"
      style="padding-top: max(0.75rem, env(safe-area-inset-top))"
    >
      <button
        type="button"
        class="rounded-md px-2 py-1 text-sm font-medium text-neutral-700 active:bg-neutral-100"
        :disabled="busy"
        @click="onBack"
      >
        ← 返回
      </button>
      <h1 class="text-base font-semibold tracking-tight">桥接调试</h1>
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4">
      <section class="space-y-1 text-sm">
        <p>
          In-App（UA+桥）：
          <span :class="inApp ? 'text-emerald-600' : 'text-neutral-500'">{{ inApp }}</span>
        </p>
        <p>
          UA 含 PolisShop：
          <span :class="uaMark ? 'text-emerald-600' : 'text-neutral-500'">{{ uaMark }}</span>
        </p>
        <p class="text-xs break-all text-neutral-500">{{ userAgent }}</p>
      </section>

      <section class="flex flex-col gap-2">
        <button
          type="button"
          class="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          :disabled="busy"
          @click="onGetAppInfo"
        >
          getAppInfo
        </button>
        <button
          type="button"
          class="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium disabled:opacity-50"
          :disabled="busy"
          @click="onOpenSelfAgain"
        >
          openPage（再开一层调试页）
        </button>
        <pre
          v-if="appInfo"
          class="overflow-x-auto rounded-lg bg-neutral-900 p-3 text-xs text-neutral-100"
          >{{ JSON.stringify(appInfo, null, 2) }}</pre>
      </section>

      <section class="flex-1">
        <h2 class="mb-2 text-xs font-medium tracking-wide text-neutral-500 uppercase">日志</h2>
        <pre
          class="min-h-40 overflow-auto rounded-lg border border-neutral-200 bg-white p-3 text-xs leading-5 text-neutral-700"
          >{{ log || '尚无日志' }}</pre>
      </section>
    </main>
  </div>
</template>
