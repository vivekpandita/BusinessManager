@echo off
cls
echo.
echo Syncing files to dist folder...
echo.

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File sync-dist-now.ps1

pause
