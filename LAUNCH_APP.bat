@echo off
title Lourice Gift Shop
color 0D
echo ========================================
echo    LOURICE GIFT SHOP
echo ========================================
echo.
echo Starting server...
start /min cmd /c "node server.js"
timeout /t 3 /nobreak > nul
echo.
echo Opening gift shop...
start http://localhost:3000
echo.
echo ========================================
echo   ✅ APP IS RUNNING!
echo   📍 Shop: http://localhost:3000
echo   🔐 Admin: http://localhost:3000/admin
echo   🔑 Password: @Rucylora.com
echo ========================================
echo.
echo Close this window to stop the app.
pause