@echo off
echo === STORYBOOK DIAGNOSTICS ===
echo.

echo 1. Checking current directory...
cd

echo.
echo 2. Checking package.json name...
findstr "name" package.json

echo.
echo 3. Checking if Storybook is running...
netstat -an | findstr ":6001"

echo.
echo 4. Checking node_modules...
if exist node_modules (
    echo ✅ node_modules exists
) else (
    echo ❌ node_modules missing - run: pnpm install
)

echo.
echo 5. Checking Storybook config...
if exist .storybook\main.ts (
    echo ✅ Storybook main.ts exists
) else (
    echo ❌ Storybook main.ts missing
)

echo.
echo 6. Checking stories...
dir /b src\stories\*.stories.svelte 2>nul
if %errorlevel% neq 0 (
    echo ❌ No story files found
) else (
    echo ✅ Story files found
)

echo.
echo 7. Checking assets...
if exist static\assets (
    echo ✅ Assets directory exists
) else (
    echo ❌ Assets directory missing
)

echo.
echo === RECOMMENDED ACTIONS ===
echo 1. Stop current Storybook (Ctrl+C in terminal)
echo 2. Run: clear-storybook-cache.bat
echo 3. Run: pnpm install
echo 4. Run: pnpm run storybook
echo.
pause