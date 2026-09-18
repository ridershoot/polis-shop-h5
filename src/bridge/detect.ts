const UA_MARKER = /PolisShop\//

/** UA contains the shell marker (weak signal; full In-App also needs the bridge). */
export function hasPolisShopUserAgent(ua = navigator.userAgent): boolean {
  return UA_MARKER.test(ua)
}

/** Dual-signal In-App: PolisShop UA marker + ready PolisShopBridge. */
export function isInApp(): boolean {
  return hasPolisShopUserAgent() && !!window.PolisShopBridge?.__ready
}
