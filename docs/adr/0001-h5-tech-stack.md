# H5 技术栈：Vue3 + TS + Tailwind v4 + Pinia + Vue Router + ESLint/Prettier

本仓库是城邦小店 Hybrid 中的业务 H5。我们选用 Vite + Vue 3 + TypeScript、Vue Router（history）、Pinia、Tailwind CSS v4，以及与 `polis-shop` 对齐的 ESLint + Prettier（含 Husky / lint-staged），并用 `unplugin-auto-import` / `unplugin-vue-components` 做 API 与本地组件自动引入。暂不引入 UI 组件库（含 shadcn-vue）：商城场景的组件选型尚未确定，先保留纯 Tailwind 基座，避免过早锁定视觉与交互体系。未引入 Sass/SCSS，以贴合 Tailwind v4 的推荐用法。

## Considered Options

- **UI**：shadcn-vue / 移动端库（如 Vant）/ 暂不接入 — 选择暂不接入。
- **Lint/Format**：Oxlint+Oxfmt / ESLint+Prettier — 选择后者，与 `polis-shop` 工具链一致。
- **Router**：hash / history — 选择 history，假定 H5 以 https 形式嵌入 web-view。
