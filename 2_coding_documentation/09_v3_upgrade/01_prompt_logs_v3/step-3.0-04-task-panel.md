# Step 3.0-04 Prompt Log - Recommended Task Panel

Date: 2026-05-22

## User Prompt

```text
执行 Step 3.0-04
```

## Manual Step Reference

Step 3.0-04：推荐任务面板框架 + 等级/阶段头部。

## Expanded Execution Prompt

```text
请将首页下方原有推荐菜谱区域替换为推荐任务面板，对齐 PRD 3.0。

要求：
1）删除或替换原“今日灵感/菜谱推荐卡片”区
2）新增“推荐任务”面板，至少包含：
   - 标题（图标位 + 推荐任务）
   - 难度切换：易 / 中 / 难
   - 当前等级显示
   - 当前阶段名称显示
   - 当前经验进度条
3）阶段映射固定为：
   - Lv.1–Lv.10：小试灶台
   - Lv.11–Lv.20：渐入佳境
   - Lv.21 以上：熟能生巧
4）推荐任务区整体使用浅底主内容卡
5）任务列表区域先放占位任务卡，下一步再接完整任务逻辑
6）同步更新文档，说明：
   - 推荐任务区和原推荐菜谱区的区别
   - 阶段与难度的区别
```

## AI Execution Notes

- Replaced the old recipe recommendation grid only on the homepage.
- Kept generated results, favorites, recent, recipe detail, random recipe, and right-side tools intact.
- Used static task framework data for this step; full task detail and XP completion flow are reserved for Step 3.0-05.

