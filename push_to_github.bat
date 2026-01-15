@echo off
chcp 65001
echo === Push to GitHub ===

:: Initialize git if not already
git init

:: Add all files
git add .

:: Commit
git commit -m "Initial commit: INS3064 Ebook - PHP & MySQL Web Development"

:: Add remote (replace YOUR_USERNAME with your GitHub username)
echo.
echo Please create a new repository on GitHub named: INS3064-PHP-MySQL-Ebook
echo Then run:
echo   git remote add origin https://github.com/YOUR_USERNAME/INS3064-PHP-MySQL-Ebook.git
echo   git branch -M main
echo   git push -u origin main
echo.
pause
