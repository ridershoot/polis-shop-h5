# H5 不实现底部 Tab；导航由壳原生 tabBar 负责

Hybrid 下底部「首页 / 个人中心」由 `polis-shop` 原生 tabBar 切换壳宿主页与对应 web-view URL。`polis-shop-h5` 只提供视图内容（如 `/`、`/user`），不实现底部导航，避免双层 Tab。浏览器单独打开 H5 时可通过地址栏或路由访问各视图。
