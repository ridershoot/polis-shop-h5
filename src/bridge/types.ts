export type AppPlatform = 'ios' | 'android' | string

export interface AppInfo {
  versionName: string
  versionCode: number
  platform: AppPlatform
}

export type TabId = 'home' | 'user'

export type TabShowReason = 'tab' | 'back' | 'foreground'

export interface TabShowPayload {
  tab: TabId
  reason: TabShowReason
}

export interface ClosePageResult {
  ok: boolean
  reason?: 'not_secondary'
}

export interface OpenPageResult {
  ok: boolean
}

export interface ShareLinkParams {
  title: string
  summary?: string
  href: string
  imageUrl?: string
}

export interface ShareLinkResult {
  ok: boolean
  reason?: 'cancelled' | 'failed' | 'invalid_params'
}

export interface PolisShopBridge {
  __ready: true
  getAppInfo: () => Promise<AppInfo>
  openPage: (url: string) => Promise<OpenPageResult>
  closePage: () => Promise<ClosePageResult>
  shareLink: (params: ShareLinkParams) => Promise<ShareLinkResult>
}

declare global {
  interface Window {
    PolisShopBridge?: PolisShopBridge
    onTabShow?: (payload: TabShowPayload) => void
    uni?: {
      postMessage?: (options: { data: unknown }) => void
      webView?: {
        postMessage?: (data: unknown) => void
      }
    }
  }
}

export {}
