# Step 3.0-10 Prompt Log - Final QA And Release Package

Date: 2026-05-23

## User Prompt

```text
执行 Step 3.0-10
```

## Manual Step Reference

Step 3.0-10：最终联调、发布与交付清单整理。

## Expanded Execution Prompt

```text
请对当前 3.0 项目做最终联调、自测、发布记录整理和交付清单检查。

要求：
1. 输出当前文件树。
2. 输出各一级页面功能清单。
3. 输出首页模块清单。
4. 检查：
   - npm run build 是否通过
   - 关键页面是否可进入
   - 关键弹窗是否可打开
   - 关键状态（任务经验、预算记录、计时器）是否可保存
5. 若有小问题，优先做最小修复。
6. 生成：
   - v3_final_checklist.md
   - v3_release_notes.md
   - demo_script_v3.md
7. 更新：
   - commit_index.md
   - issue-log-v3.md
   - macro_flow_v3.mmd
8. 检查最终目录是否符合：
   - 1_project_files
   - 2_coding_documentation
   - 3_presentation
   - 4_certs
9. 输出 git 建议：
   - commit message
   - tag 建议
   - release 建议
```

## AI Execution Notes

- 本轮执行最终 QA 与交付文档整理。
- 只做文档与验证，不主动 push。
- 本轮 build 通过；公开发布和 GitHub push 留给用户明确确认后执行。
