Param(
  [switch]$SkipNpm
)

$ErrorActionPreference = "Stop"

function Write-Info($msg) {
  Write-Host "[uninstall-p5-hero] $msg"
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$appRoot = Join-Path $repoRoot "1_project_files/cooking-ai-planner"

Write-Info "Repo: $repoRoot"
Write-Info "App : $appRoot"

if (-not (Test-Path $appRoot)) {
  throw "App directory not found: $appRoot"
}

if (-not $SkipNpm) {
  Write-Info "Running: npm.cmd uninstall p5"
  Push-Location $appRoot
  try {
    & npm.cmd uninstall p5
  } finally {
    Pop-Location
  }
} else {
  Write-Info "SkipNpm enabled; not uninstalling npm dependency."
}

$p5Dir = Join-Path $appRoot "src/components/p5"
if (Test-Path $p5Dir) {
  Write-Info "Removing: $p5Dir"
  Remove-Item -Recurse -Force $p5Dir
}

$p5Vendor = Join-Path $appRoot "public/vendor/p5.min.js"
if (Test-Path $p5Vendor) {
  Write-Info "Removing: $p5Vendor"
  Remove-Item -Force $p5Vendor
}

$home = Join-Path $appRoot "src/pages/HomePage.jsx"
if (Test-Path $home) {
  $text = Get-Content $home -Raw

  # Remove import line
  $text = $text -replace "(?m)^\s*import\s+P5HeroDecoration\s+from\s+'.*?';\s*\r?\n", ""

  # Remove useLocalStorage/STORAGE_KEYS imports if they become unused
  $text = $text -replace "(?m)^\s*import\s+useLocalStorage\s+from\s+'.*?';\s*\r?\n", ""
  $text = $text -replace "(?m)^\s*import\s+\{\s*STORAGE_KEYS\s*\}\s+from\s+'.*?';\s*\r?\n", ""

  # Remove decoration block markers
  $text = $text -replace "(?s)\s*\{\s*/\*\s*p5-hero-decoration:start\s*\*/\}\s*.*?\{\s*/\*\s*p5-hero-decoration:end\s*\*/\}\s*", "`n"

  # Remove p5Enabled state line if present
  $text = $text -replace "(?m)^\s*const\s+\[p5Enabled,\s*setP5Enabled\]\s*=\s*useLocalStorage\(.*?\);\s*\r?\n", ""

  Set-Content -Path $home -Value $text -Encoding UTF8
  Write-Info "Updated: $home"
}

$keys = Join-Path $appRoot "src/store/storageKeys.js"
if (Test-Path $keys) {
  $text = Get-Content $keys -Raw
  $text = $text -replace "(?m)^\s*p5HeroEnabled:\s*'cooking_ai_planner\.ui\.p5_hero\.enabled\.v1',\s*\r?\n", ""
  $text = $text -replace "(?m)^\s*p5HeroEnabled:\s*\[\],\s*\r?\n", ""
  Set-Content -Path $keys -Value $text -Encoding UTF8
  Write-Info "Updated: $keys"
}

Write-Info "Done. If dev server is running, restart it."
