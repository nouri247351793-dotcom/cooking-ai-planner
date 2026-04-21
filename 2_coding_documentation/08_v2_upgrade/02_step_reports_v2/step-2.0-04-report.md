# Step 2.0-04 Report（随机弹窗 + 成功提示音）

日期：2026-04-20  
范围：Step 2.0-04（体验增强，不接真实 AI / 不接后端）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-04-random-modal-sound.md`

## AI 输出方案摘要

- 首页右侧“随机一道菜”改为中心模态弹窗展示（overlay + card 动效复用既有样式）
- 弹窗支持：关闭 / 再摇一次（仅刷新内容）/ 查看详情（跳转详情页）
- 增加轻量“成功提示音”：
  - 弹窗成功弹出时播放一次
  - 首页“生成菜谱”成功跳转结果页时播放一次
  - 失败态（无可用菜谱 / empty / error）不播放
- 音效素材与配置集中管理：`public/sounds/*` + `src/utils/soundConstants.js`

## 文件级改动说明

| 类型 | 文件 | 说明 |
|---|---|---|
| 修改 | `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx` | 随机模块打开 modal；生成成功跳转 results 时播放提示音 |
| 修改 | `1_project_files/cooking-ai-planner/src/components/home/RandomRecipeModal.jsx` | 完整弹窗（说明文案、卡片、关闭/再摇一次/查看详情、ESC/点遮罩关闭、锁滚动） |
| 新增 | `1_project_files/cooking-ai-planner/src/services/sound/soundService.js` | 统一成功提示音播放（优先资源文件，失败 fallback beep） |
| 新增 | `1_project_files/cooking-ai-planner/src/utils/soundConstants.js` | 音效路径集中配置 |
| 新增 | `1_project_files/cooking-ai-planner/public/sounds/success-pop.wav` | 默认音效素材位（可替换） |
| 新增 | `1_project_files/cooking-ai-planner/public/sounds/README.md` | 音效替换说明 |

## 代码级改动说明

- `RandomRecipeModal`
  - `open + recipe` 才渲染；支持：
    - 点击遮罩关闭
    - `ESC` 关闭
    - 锁定 body 滚动（避免背景误滚）
  - “再摇一次”只触发 reroll，不离开首页
  - “查看详情”跳转 `/recipes/:id`，并带 `state.from='/'` 以便返回逻辑自然
- 成功提示音触发时机
  - 首页随机弹窗：拿到有效 recipe 并打开弹窗后触发一次
  - 首页生成跳转结果页：先在点击时 `primeSuccessSound()`，生成完成后 `generate()` 返回 `status==='success'` 时触发一次
  - 失败态不触发：无 recipe / empty / error 均不播放

## 素材替换方式

- 直接覆盖：`1_project_files/cooking-ai-planner/public/sounds/success-pop.wav`
- 或修改配置：`1_project_files/cooking-ai-planner/src/utils/soundConstants.js` 的 `SOUND_ASSETS.success`

## 为什么这属于体验增强而不是核心逻辑

- 弹窗与提示音不改变“生成/收藏/清单”等业务数据结构与规则，只增强交互反馈与课堂演示氛围
- 即使移除音效或弹窗，核心链路（首页输入 → 结果页 → 详情页）仍可正常运行

## 自测建议

1) 随机弹窗：
   - 首页右侧点“随机一道菜”→ 弹窗出现 + 播放一次音效
   - 点“再摇一次”→ 卡片内容刷新，不离开首页
   - 点“查看详情”→ 进入详情页
2) 生成跳转：
   - 首页点“生成菜谱”成功后跳转结果页 + 播放一次音效
   - 输入触发错误（例如包含 `error`）→ 不播放音效

补充：若你替换了音频文件但听起来还是旧音效，通常是浏览器缓存或播放策略导致：
- 先停止 dev server 再重新 `npm.cmd run dev`；浏览器用 `Ctrl+F5` 强制刷新
- 打开控制台看是否出现 `[sound] success audio play failed...`（出现则说明走了 fallback beep，而不是文件音效）
