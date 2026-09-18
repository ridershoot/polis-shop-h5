import type { TabShowPayload } from './types'

type TabShowListener = (payload: TabShowPayload) => void

const listeners = new Set<TabShowListener>()

/** Subscribe to shell Tab visibility notifications (host callback onTabShow). */
export function subscribeTabShow(listener: TabShowListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Install window.onTabShow once for the H5 app lifetime. */
export function installTabShowHostCallback(): void {
  window.onTabShow = (payload: TabShowPayload) => {
    listeners.forEach((listener) => {
      try {
        listener(payload)
      } catch (error) {
        console.warn('[bridge] onTabShow listener error', error)
      }
    })
  }
}
