<<<<<<< HEAD
@echo off
REM Use script directory as working directory
cd /d "D:\KULIAH\SEMESTER\5\DTK\UBT TER\UBT-test"
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
=======
@echo off
cd /d "D:\PROJECT\UBT\New folder"
echo Starting Barcode Protocol Server...
echo Working directory: %CD%
node server.js
>>>>>>> 8b1d74ab4ddbaa865b57b56a91a92550b54fa6f4
pause