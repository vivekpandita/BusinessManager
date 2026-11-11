@echo off
setlocal enabledelayedexpansion

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Get the script directory
cd /d "%~dp0"

REM Start the server
echo.
echo Starting Business Manager...
echo Opening at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Start the server
call node server.js
