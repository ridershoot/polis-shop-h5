# Hybrid 桥：H5 侧契约摘要

与 `polis-shop` 共享 Hybrid 桥约定：H5 依赖壳注入的 `window.PolisShopBridge`（Promise：`getAppInfo` / `openPage` / `closePage` / `shareLink`），并声明宿主回调 `window.onTabShow`。In-App 判定为 UA 含 `PolisShop/` 且桥对象就绪。桥调试视图路径为 `/bridge-demo`。完整决策与取舍见壳仓 `docs/adr/0003-hybrid-bridge.md`；系统链接分享见 `docs/adr/0004-system-link-share.md`。

## Considered Options

- **调试入口**：嵌在首页 / 独立 `/bridge-demo` — 选择独立视图，避免污染业务页。
