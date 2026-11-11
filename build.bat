@echo off
echo Building BusinessManager.exe...
echo.

REM Check if output directory exists
if not exist "dist" mkdir dist

REM Install pkg if not already installed
where /q npx
if errorlevel 1 (
    echo Error: npm not found
    exit /b 1
)

REM Download and run pkg with Node 20 fallback
npx pkg@latest . --targets win-x64 --output dist/BusinessManager-final.exe --node-range 20

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✓ Build successful!
    echo ✓ File: dist\BusinessManager.exe
    echo.
    echo You can now share the .exe file with users
) else (
    echo.
    echo ✗ Build failed. Trying alternative method...
    REM Alternative: Create wrapper script
    echo @echo off > dist\BusinessManager.bat
    echo cd /d "%%~dp0" >> dist\BusinessManager.bat
    echo node server.js >> dist\BusinessManager.bat
    echo pause >> dist\BusinessManager.bat
    echo Alternative created: dist\BusinessManager.bat
)
