Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$exports = Join-Path $root "2_coding_documentation\\07_exports"

Write-Host "Exports folder:"
Write-Host " - $exports"
Write-Host ""
Write-Host "This project keeps exports as placeholders by default."
Write-Host "If you have pandoc installed, you can export Markdown to PDF, e.g.:"
Write-Host "  pandoc .\\2_coding_documentation\\02_step_reports\\step-00-report.md -o .\\2_coding_documentation\\07_exports\\step-00-report.pdf"

