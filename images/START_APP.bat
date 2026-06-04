@echo off
title Lourice Gift Shop Launcher
echo Starting Lourice Gift Shop Server...
start /min cmd /c "node server.js"
timeout /t 3 /nobreak > nul
start launcher.html
exit