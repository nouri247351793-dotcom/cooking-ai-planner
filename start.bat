@echo off
title Start Nomnom
REM One-click launcher for XiaoFanZhuo / Nomnom.
REM Usage:
REM 1. Double-click this start.bat in Windows Explorer.
REM 2. It will start frontend + backend and open the default browser.
REM 3. Close this window or press Ctrl+C to stop services started by this script.
REM 4. For a startup test without opening browser, run: start.bat --no-browser

set "SCRIPT_DIR=%~dp0"
set "PS_SCRIPT="

for %%F in ("%SCRIPT_DIR%*Nomnom.ps1") do (
  set "PS_SCRIPT=%%~fF"
)

if not exist "%PS_SCRIPT%" (
  echo [Nomnom] Could not find the PowerShell launcher.
  echo Expected: %SCRIPT_DIR%*Nomnom.ps1
  echo Please keep start.bat and the Nomnom PowerShell script in the same folder.
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
