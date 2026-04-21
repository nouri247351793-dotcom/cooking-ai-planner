Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Has-Command {
  param([Parameter(Mandatory = $true)][string]$Name)
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

if (!(Has-Command -Name "git")) {
  Write-Host "git not found in PATH. Skipping git checks."
  exit 0
}

if (!(Test-Path -LiteralPath ".git")) {
  Write-Host "No .git directory found. If you want version control, run:"
  Write-Host "  git init"
  exit 0
}

Write-Host "git status:"
git status --porcelain=v1

