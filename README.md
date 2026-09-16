# 城邦小店 H5（polis-shop-h5）

城邦小店的 **业务 H5** 端：Vue 3 + TypeScript + Vite + Tailwind CSS v4 + Pinia + Vue Router。

与 uni-app 壳工程 [`polis-shop`](../polis-shop) 配合，构成 Hybrid：壳通过 web-view 承载本仓库的页面。

领域用语见 [CONTEXT.md](./CONTEXT.md)。

## 开发

```bash
pnpm install
pnpm dev
```

常用脚本：

| 命令                        | 说明                          |
| --------------------------- | ----------------------------- |
| `pnpm dev`                  | 本地开发                      |
| `pnpm build`                | 类型检查 + 生产构建           |
| `pnpm check`                | lint + format 检查 + 类型检查 |
| `pnpm lint` / `pnpm format` | ESLint / Prettier             |

## 技术要点

- 自动引入：`unplugin-auto-import`（vue / vue-router / pinia）、`unplugin-vue-components`（`src/components`）
- 不引入 Sass/SCSS；样式以 Tailwind v4 为主
- 暂未接入 UI 组件库（见 `docs/adr/0001-h5-tech-stack.md`）
