# 城邦小店 H5

城邦小店（polis-shop）产品中，承载主要业务界面的 H5 端上下文。与 uni-app 壳工程配合，构成 Hybrid 应用。

## Language

**城邦小店**:
面向购物/商城场景的产品名称；工程与仓库侧常写作 polis-shop。
_Avoid_: Polis Shop（无连字符的品牌写法若未统一则避免混用）

**polis-shop**:
uni-app 仓库：App 壳、原生能力，以及壳宿主页。
_Avoid_: H5 工程、业务主界面仓库

**polis-shop-h5**:
独立 Vue3 H5 仓库：主要业务 UI；由壳通过 web-view 嵌入。
_Avoid_: uni-app 工程、原生壳

**Hybrid**:
壳（polis-shop）通过 web-view 承载业务 H5（polis-shop-h5），原生能力留在壳侧的架构形态。
_Avoid_: 双端各写全套业务、纯 Web 包装分发

**视图**:
H5 侧由 Vue Router 挂载的页面级界面，源码位于 `src/views`。
_Avoid_: page、pages（保留给 uni-app 页面体系）

**壳宿主页**:
壳内仅用于承载 web-view 与系统 Tab 切换的 uni-app 页面；业务界面不在此实现。
_Avoid_: 业务页、H5 视图

**Hybrid 桥**:
壳与 H5 之间约定的双向调用契约：H5 请求壳能力，壳通知 H5 生命周期或结果。
_Avoid_: 临时拼字符串、仅 postMessage、仅 UA 探测

**二级壳宿主页**:
非 tabBar 的壳宿主页；无底部 Tab，用于承载需要独立栈层的 H5 视图；可由系统返回或 H5 经桥请求关闭。
_Avoid_: 新窗口、原生业务页、Tab 宿主页

**桥调试视图**:
专门用于验证 Hybrid 桥能力的视图（路径约定为 `/bridge-demo`），不承载正式业务。
_Avoid_: 在首页/个人中心视图内嵌调试块

**宿主回调**:
H5 挂到 `window` 上、供壳在特定时机（如 Tab 变为可见）调用的函数；壳可传入原因等参数，是否处理由 H5 决定。
_Avoid_: 全局方法（过宽）、页面生命周期（易与 Vue 生命周期混淆）

**In-App 判定**:
判断自身是否运行在壳内 web-view：须同时满足 UA 含约定标记，且存在 Hybrid 桥对象。
_Avoid_: 仅靠 UA、仅靠桥对象、User-Agent 嗅探（过宽）
