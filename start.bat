@echo off
title INDRAT - Indian Languages Learning App
echo ========================================================
echo   Starting INDRAT (Duolingo for Indian Languages)...
echo ========================================================
echo.
cd /d "%~dp0"
echo Starting Vite Development Server on http://localhost:3000 ...
start "" "http://localhost:3000"
npm run dev
pause
