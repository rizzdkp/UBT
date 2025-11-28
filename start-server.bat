@echo off
REM Use script directory as working directory
cd /d "%~dp0"
echo Starting Barcode Protocol Server...
echo Working directory: %CD%
echo Node version:
node -v
echo.
echo If the server exits immediately, check error.log.
node server.js
echo.
echo Server stopped (exit code %errorlevel%).
echo Press any key to close.
pause