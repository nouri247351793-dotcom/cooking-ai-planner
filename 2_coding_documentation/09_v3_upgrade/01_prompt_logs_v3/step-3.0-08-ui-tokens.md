# Step 3.0-08 Prompt Log - UI Tokens And Component Spec

Date: 2026-05-23

## User Prompt

```text
执行 Step 3.0-08
```

## Manual Step Reference

Step 3.0-08：全站 UI token 与组件规范化。

## Expanded Execution Prompt

```text
请把 3.0 的 UI 升级整理成一套统一 token / 组件规范，并尽量落到代码里。

要求：
1. 统一页面外边距、卡片内边距、模块间距、圆角体系、深浅底色层级、按钮尺寸、标签 / badge 尺寸。
2. 形成 spacing tokens、radius tokens、color tokens、button styles、card variants。
3. 主操作卡（输入区、计时器）与浅底信息卡明确区分。
4. 全站按钮至少分为主按钮、次按钮、轻按钮。
5. 同步更新文档：ui-spec-v3.md、step report、flowchart。
6. 输出 before / after 截图。
```

## AI Execution Notes

- 本轮重点是 token 化和规范化，不重写业务逻辑。
- 优先补齐缺失 token 和通用组件类，避免继续扩散一次性样式。
- 截图能力在当前环境受浏览器 Crashpad 权限限制影响，结果写入报告。
