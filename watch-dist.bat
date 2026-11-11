@echo off
setlocal enabledelayedexpansion

REM Business Manager - Bundle Updater
REM This batch file watches for changes and updates the dist folder

cls
echo.
echo ============================================
echo Business Manager - Auto-Update Bundle
echo ============================================
echo.
echo This script will:
echo   1. Watch for changes in your source files
echo   2. Automatically copy changes to dist/
echo   3. Keep your distribution up to date
echo.
echo Files being watched:
echo   - BusinessManager.html
echo   - server.js
echo   - package.json
echo.

REM Check if PowerShell is available
where powershell >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: PowerShell is required but not found!
    echo Please install PowerShell or run the watch script manually.
    pause
    exit /b 1
)

REM Get the script directory
cd /d "%~dp0"

REM Run the PowerShell watch script
powershell -NoProfile -ExecutionPolicy Bypass -File "watch-dist.ps1"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to run watch script
    echo.
    echo Alternative: Run in PowerShell directly
    echo   powershell -File "watch-dist.ps1"
    pause
    exit /b 1
)

pause
