param(
  [Parameter(Mandatory = $true)]
  [int]$Step,

  [Parameter(Mandatory = $true)]
  [string]$Title
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Convert-ToSlug {
  param([Parameter(Mandatory = $true)][string]$Text)
  $slug = $Text.Trim().ToLowerInvariant()
  $slug = $slug -replace "[^a-z0-9\u4e00-\u9fff]+", "-"
  $slug = $slug.Trim("-")
  if ([string]::IsNullOrWhiteSpace($slug)) { return "step" }
  return $slug
}

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$docsRoot = Join-Path $root "2_coding_documentation"
$templatesRoot = Join-Path $docsRoot "templates"

$stepStr = "{0:D2}" -f $Step
$slug = Convert-ToSlug -Text $Title

$promptTemplate = Join-Path $templatesRoot "prompt_log_template.md"
$reportTemplate = Join-Path $templatesRoot "step_report_template.md"

if (!(Test-Path -LiteralPath $promptTemplate)) { throw "Missing template: $promptTemplate" }
if (!(Test-Path -LiteralPath $reportTemplate)) { throw "Missing template: $reportTemplate" }

$promptDir = Join-Path $docsRoot "01_prompt_logs"
$reportDir = Join-Path $docsRoot "02_step_reports"
$assetsShotsDir = Join-Path $docsRoot "06_assets\\screenshots\\step-$stepStr-$slug"

New-Item -ItemType Directory -Force -Path $promptDir, $reportDir, $assetsShotsDir | Out-Null

$promptOut = Join-Path $promptDir "step-$stepStr-$slug.md"
$reportOut = Join-Path $reportDir "step-$stepStr-report.md"

$promptContent = Get-Content -Raw -Encoding utf8 $promptTemplate
$reportContent = Get-Content -Raw -Encoding utf8 $reportTemplate

$titleLine = "Step $stepStr - $Title"
$promptContent = $promptContent.Replace("Step XX - <Title>", $titleLine)
$reportContent = $reportContent.Replace("Step XX - <Title>", $titleLine)

if (!(Test-Path -LiteralPath $promptOut)) {
  Set-Content -Encoding utf8 -LiteralPath $promptOut -Value $promptContent
}

if (!(Test-Path -LiteralPath $reportOut)) {
  Set-Content -Encoding utf8 -LiteralPath $reportOut -Value $reportContent
}

Write-Host "Created/verified:"
Write-Host " - $promptOut"
Write-Host " - $reportOut"
Write-Host "Screenshot folder:"
Write-Host " - $assetsShotsDir"

