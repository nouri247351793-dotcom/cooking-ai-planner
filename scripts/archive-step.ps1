param(
  [Parameter(Mandatory = $true)]
  [int]$Step
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$docsRoot = Join-Path $root "2_coding_documentation"

$stepStr = "{0:D2}" -f $Step

$promptDir = Join-Path $docsRoot "01_prompt_logs"
$reportDir = Join-Path $docsRoot "02_step_reports"
$issueLog = Join-Path $docsRoot "04_issue_reviews\\issue-log.md"
$macroFlow = Join-Path $docsRoot "05_flowcharts\\macro_flow.mmd"

$promptMatches = @(Get-ChildItem -LiteralPath $promptDir -Filter "step-$stepStr-*.md" -ErrorAction SilentlyContinue)
$reportPath = Join-Path $reportDir "step-$stepStr-report.md"

$missing = @()
if ($promptMatches.Count -eq 0) { $missing += "prompt log: $promptDir\\step-$stepStr-*.md" }
if (!(Test-Path -LiteralPath $reportPath)) { $missing += "step report: $reportPath" }
if (!(Test-Path -LiteralPath $issueLog)) { $missing += "issue log: $issueLog" }
if (!(Test-Path -LiteralPath $macroFlow)) { $missing += "flowchart: $macroFlow" }

if ($missing.Count -gt 0) {
  Write-Host "Archive check failed for step $stepStr. Missing:"
  $missing | ForEach-Object { Write-Host " - $_" }
  exit 1
}

Write-Host "Archive check OK for step $stepStr."
Write-Host "Reminders:"
Write-Host " - Add at least 2 screenshots under 2_coding_documentation/06_assets/screenshots/"
Write-Host " - Update issue-log.md and macro_flow.mmd if step status changed"
