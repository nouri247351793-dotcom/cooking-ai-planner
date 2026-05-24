# Step 12 执行记录：完整容错检查

日期：2026-05-23

## 执行目标

为小饭桌 4.0 AI 接入做完整容错检查，确保 API 失败、超时、JSON 失败、字段不完整、本地存储异常、用户输入为空、网络异常、Vercel 环境变量未配置时，页面不白屏、不崩溃，并尽可能回退到 mock/demo 数据。

## 检查的异常类型

- AI API 请求失败
- API 请求超时
- AI 返回非 JSON 文本
- AI 返回字段不完整
- localStorage 读取失败
- localStorage 写入失败
- 用户输入为空
- 网络异常
- Vercel 环境变量未配置

## 修复内容

- `src/services/aiService.js`
  - 保留 http 错误、非 JSON、字段不完整、请求失败、超时的 mock fallback。
  - 补充从 API 响应中透传 `fallbackReason`，让前端能显示更具体的 demo 原因。
- `api/ai.js`
  - 给服务端 AI provider 请求增加 `AbortController` 超时控制。
  - provider 超时返回 `provider_timeout`。
  - provider 返回非 JSON 时返回 `invalid_provider_json`。
  - provider 返回字段不完整时返回 `invalid_response_shape`。
  - provider 异常仍统一回退 mock/demo，不向前端暴露密钥。
- `src/pages/HomePage.jsx`
  - 用户输入为空时自动使用默认新手做饭需求，并给 toast 提示。
  - demo 提示中增加 fallback 原因说明。
  - AI 待购清单原始结果写入失败时给用户友好提示，不阻断页面。
- `src/services/aiShoppingListService.js`
  - `persistAIShoppingList()` 增加 try/catch，localStorage 写入失败时返回 `false`，不抛错。

## 当前容错策略

| 异常 | 处理方式 |
|---|---|
| `/api/ai` 请求失败 | `askAI()` 回退 mock，并标记 `demoMode: true` |
| `/api/ai` 请求超时 | `askAI()` 回退 mock，`fallbackReason: timeout` |
| API 返回非 JSON | `askAI()` 回退 mock，`fallbackReason: invalid_json` |
| API 返回字段不完整 | `askAI()` 回退 mock，`fallbackReason: invalid_response_shape` |
| Provider 超时 | `api/ai.js` 回退 mock，`fallbackReason: provider_timeout` |
| Provider 非 JSON | `api/ai.js` 回退 mock，`fallbackReason: invalid_provider_json` |
| Provider 请求失败 | `api/ai.js` 回退 mock，`fallbackReason: provider_request_failed/provider_exception` |
| 未配置 `AI_API_KEY` | `api/ai.js` 回退 mock，`fallbackReason: missing_api_key` |
| 用户输入为空 | 首页使用默认新手需求并 toast 提示 |
| localStorage 读取失败 | 现有 `useLocalStorage()` 回退默认值 |
| localStorage 写入失败 | `useLocalStorage()` 静默兜底；AI shopping 原始写入失败时 toast 提示 |

## 验证命令

```bash
node --input-type=module -e "import { askAI } from './src/services/aiService.js'; globalThis.fetch=async()=>({ok:false,status:503,json:async()=>({})}); const http=await askAI('x'); console.log(http.demoMode, http.fallbackReason); globalThis.fetch=async()=>({ok:true,json:async()=>{throw new Error('bad json')}}); const badJson=await askAI('x'); console.log(badJson.demoMode, badJson.fallbackReason); globalThis.fetch=async()=>({ok:true,json:async()=>({answer:'partial',demoMode:true,fallbackReason:'missing_api_key'})}); const badShape=await askAI('x'); console.log(badShape.demoMode, badShape.fallbackReason); globalThis.fetch=async()=>({ok:true,json:async()=>({answer:'ok',recipes:[],shoppingList:[],cookingSteps:[],estimatedTime:'',tips:[],demoMode:true,fallbackReason:'missing_api_key'})}); const apiMock=await askAI('x'); console.log(apiMock.demoMode, apiMock.fallbackReason);"
npm.cmd run build
```

## 验证结果

- `askAI()` http 失败：`true http_503`
- `askAI()` 非 JSON：`true invalid_json`
- `askAI()` 字段不完整：`true invalid_response_shape`
- `askAI()` API demo 原因透传：`true missing_api_key`
- build：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-CB7RBL7r.css`
  - `dist/assets/index-CbaJnyou.js`
- 构建耗时：约 724ms

## 建议提交信息

```text
[step-4.0-12][chore] harden ai error handling fallbacks
```

## 下一步建议

执行 Step 13：进行 git 状态检查，确认 4.0 变更范围、未提交文件、敏感信息和可提交状态。
