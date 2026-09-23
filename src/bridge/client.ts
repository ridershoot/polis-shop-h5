import type { PolisShopBridge, ShareLinkParams } from './types'

const READY_EVENT = 'PolisShopBridgeReady'

/** Wait until the shell injects window.PolisShopBridge. */
export function waitForBridge(timeoutMs = 10000): Promise<PolisShopBridge> {
  const existing = window.PolisShopBridge
  if (existing?.__ready) return Promise.resolve(existing)

  return new Promise((resolve, reject) => {
    let settled = false
    let pollTimer = 0

    const finish = (bridge: PolisShopBridge) => {
      if (settled) return
      settled = true
      cleanup()
      resolve(bridge)
    }

    const fail = () => {
      if (settled) return
      settled = true
      cleanup()
      reject(new Error('bridge_unavailable'))
    }

    const onReady = () => {
      const bridge = window.PolisShopBridge
      if (bridge?.__ready) finish(bridge)
    }

    const cleanup = () => {
      window.clearTimeout(timeoutTimer)
      window.clearInterval(pollTimer)
      window.removeEventListener(READY_EVENT, onReady)
    }

    const timeoutTimer = window.setTimeout(fail, timeoutMs)
    window.addEventListener(READY_EVENT, onReady)
    // Event may have fired before H5 subscribed; poll as well.
    pollTimer = window.setInterval(onReady, 200)
    onReady()
  })
}

export async function getAppInfo() {
  const bridge = await waitForBridge()
  return bridge.getAppInfo()
}

export async function openPage(url: string) {
  const bridge = await waitForBridge()
  return bridge.openPage(url)
}

export async function closePage() {
  const bridge = await waitForBridge()
  return bridge.closePage()
}

export async function shareLink(params: ShareLinkParams) {
  const bridge = await waitForBridge()
  return bridge.shareLink(params)
}
