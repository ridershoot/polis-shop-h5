# 系统链接分享：shareLink 走 OS 面板

H5 经 Hybrid 桥调用 `shareLink`，由壳使用 `uni.shareWithSystem` 调起系统分享面板（免三方 SDK）。内容为链接：`title` 与可选 `summary` 拼入系统 `summary`，并带 `href`。首版契约保留 `imageUrl` 但壳侧忽略（系统 API 要本地路径，且 Android 带图易挤掉链接）。取消等业务结果 resolve 为 `{ ok: false, reason }`，与 `closePage` 一致；注入侧对该方法单独 120s 超时。非 App 不降级 Web Share。

## Considered Options

- **能力形态**：系统面板 / 微信等 SDK `uni.share` — 选择系统面板，免开放平台配置，便于 BridgeDemo 验证。
- **远程图**：下载后分享 / 忽略 / 仅 iOS 带图 — 首版忽略，优先保证链接文案。
- **取消语义**：reject / resolve + reason — 选择 resolve + `cancelled`。
