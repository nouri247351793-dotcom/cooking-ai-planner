@echo off
title Nomnom Launcher
REM Nomnom one-click launcher.
REM Usage:
REM 1. Double-click this CMD file in Windows Explorer.
REM 2. Do not click the editor reference like "Nomnom.cmd:1"; that only opens the file.
REM 3. The PowerShell script contains the full Chinese usage notes.
REM 4. Close this window or press Ctrl+C to stop services started by this launcher.
REM 5. For a no-browser startup test, run: Nomnom.cmd --no-browser

set "SCRIPT_DIR=%~dp0"
set "PS_SCRIPT="

for %%F in ("%SCRIPT_DIR%*Nomnom.ps1") do (
  set "PS_SCRIPT=%%~fF"
)

if not exist "%PS_SCRIPT%" (
  echo [Nomnom] PowerShell script not found.
  echo Expected location: %SCRIPT_DIR%*Nomnom.ps1
  echo Keep the CMD and PS1 files in the same folder.
  pause
  exit /b 1
)

if /I "%~1"=="--no-browser" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%" -NoBrowser
) else (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%"
)

set "EXIT_CODE=%ERRORLEVEL%"
if not "%EXIT_CODE%"=="0" (
  echo.
  echo [Nomnom] Startup failed. Exit code: %EXIT_CODE%
  echo Send the error text above to Codex for debugging.
  pause
  exit /b %EXIT_CODE%
)
