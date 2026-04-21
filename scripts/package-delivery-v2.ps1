$ErrorActionPreference = 'Stop'

Set-Location (Split-Path -Parent $PSScriptRoot)

$date = Get-Date -Format 'yyyy-MM-dd'
$outDir = Join-Path (Get-Location) '.tmp'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$zipName = "xiaofanzhuo_v2_delivery_$date.zip"
$zipPath = Join-Path $outDir $zipName

if (Test-Path $zipPath) {
  Remove-Item -Force $zipPath
}

# Package the submission bundle while excluding git metadata and heavy caches.
tar -a -c -f $zipPath `
  --exclude=".git" `
  --exclude="**/.git/**" `
  --exclude="**/node_modules" `
  --exclude="**/node_modules/**" `
  --exclude="**/dist" `
  --exclude="**/dist/**" `
  --exclude="**/.vite-cache" `
  --exclude="**/.vite-cache/**" `
  --exclude="**/.tmp" `
  --exclude="**/.tmp/**" `
  1_project_files `
  2_coding_documentation `
  3_presentation `
  4_certs `
  README.md `
  .gitignore `
  scripts

Write-Host "Created: $zipPath"
Get-Item $zipPath | Select-Object FullName, Length, LastWriteTime

