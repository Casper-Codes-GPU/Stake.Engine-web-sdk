@echo off
echo Clearing Storybook cache...

REM Kill any running Storybook processes
taskkill /f /im node.exe 2>nul

REM Clear node_modules cache
if exist node_modules\.cache (
    echo Removing node_modules cache...
    rmdir /s /q node_modules\.cache
)

REM Clear Storybook cache
if exist .storybook-cache (
    echo Removing Storybook cache...
    rmdir /s /q .storybook-cache
)

REM Clear temp files
if exist %TEMP%\storybook* (
    echo Removing temp Storybook files...
    del /q %TEMP%\storybook*
)

echo Cache cleared! Now restart Storybook with: pnpm run storybook
pause