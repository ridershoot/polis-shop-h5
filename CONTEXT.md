# 城邦小店 H5

城邦小店（polis-shop）产品中，承载主要业务界面的 H5 端上下文。与 uni-app 壳工程配合，构成 Hybrid 应用。

## Language

**城邦小店**:
面向购物/商城场景的产品名称；工程与仓库侧常写作 polis-shop。
_Avoid_: Polis Shop（无连字符的品牌写法若未统一则避免混用）

**polis-shop**:
uni-app 仓库：App 壳、原生能力，以及少量原生页面。
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
