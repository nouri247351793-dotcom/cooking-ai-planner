# 小饭桌 UI Spec v3

Date: 2026-05-23

## 设计目标

3.0 UI 的目标不是继续零散加样式，而是把页面外边距、卡片、按钮、标签、深浅层级整理成可维护的 token 与组件规则。

## Token 分层

### Spacing

- 页面级间距：`--page-gap`
- 模块间距：`--module-gap`
- 卡片内边距：`--card-pad-sm / --card-pad-md / --card-pad-lg`
- 基础间距：`--sp-4 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 28 / 32`

### Radius

- 小控件：`--r-xs / --r-sm / --r-md`
- 普通卡片：`--r-lg / --r-xl`
- 3.0 一级页卡片：`--r-2xl`
- Dashboard 外壳和 hero：`--r-shell`
- 胶囊按钮和标签：`--r-pill`

### Color

- 页面背景：`--c-bg`
- 浅底信息卡：`--c-surface-soft / --c-surface-raised`
- 深底主操作卡：`--c-surface-deep`
- 主文字：`--c-text / --c-ink`
- 边框：`--c-border-soft / --c-border / --c-border-strong`
- 强调色：`--c-primary / --c-primary-rgb`

### Buttons

- 主按钮：`primaryBtn`
  - 用于“生成菜谱”“记录开支”“我做了”等明确提交动作。
- 次按钮：`secondaryBtn`
  - 用于“随机一道菜”“拍照上传”等次级操作。
- 轻按钮：`ghostBtn`
  - 用于返回、关闭、辅助导航和低风险操作。
- 小按钮：`miniBtn`
  - 用于清空、局部编辑等局部轻操作。

## Card Variants

- `card`：默认浅底信息卡。
- `card--soft`：更轻的浅底辅助卡。
- `card--primary`：带橙色弱强调的重点信息卡。
- `card--deep`：深底主操作卡，用于输入区、计时器等高优先级模块。

## Page Pattern

- 一级页统一使用 `v3Page` + `v3PageHero`。
- 顶部 hero 统一包括：
  - eyebrow：页面角色
  - title：页面名
  - desc：页面用途说明
  - badge：数量或状态摘要
- 空状态统一使用 `v3EmptyState`，避免页面在无数据时显得未完成。

## Deep vs Light

- 深底主操作卡用于高频、强动作、需要用户立即处理的模块：
  - 首页输入区
  - 右侧计时器
- 浅底信息卡用于扫读、复盘、记录或辅助信息：
  - 推荐任务
  - 省钱计划摘要
  - 待购清单
  - 收藏 / 最近 / 贴士

## 维护规则

- 新增页面时优先复用 `v3PageHero` 和现有卡片变体。
- 新增按钮时先判断是主按钮、次按钮、轻按钮还是小按钮，不新增一次性按钮样式。
- 新增圆角、间距、颜色时优先使用 token；确实需要新值时先补 token，再落到页面样式。
- 不在业务组件里写大量 inline style；少量布局微调可以保留，但组件级样式应沉淀到 CSS。
