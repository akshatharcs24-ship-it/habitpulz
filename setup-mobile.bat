@echo off
echo ============================================
echo  HabitPulz Mobile App Setup (Capacitor)
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] Installing Capacitor packages...
npm install --save @capacitor/core@6.1.2 @capacitor/android@6.1.2 --save-dev @capacitor/cli@6.1.2
if %errorlevel% neq 0 (
  echo ERROR: npm install failed. Make sure Node.js is installed.
  pause
  exit /b 1
)

echo.
echo [2/4] Initialising Capacitor...
npx cap init HabitPulz com.HabitPulz.app --web-dir .
if %errorlevel% neq 0 (
  echo ERROR: cap init failed.
  pause
  exit /b 1
)

echo.
echo [3/4] Adding Android platform...
npx cap add android
if %errorlevel% neq 0 (
  echo ERROR: cap add android failed.
  pause
  exit /b 1
)

echo.
echo [4/4] Syncing web files to Android...
npx cap sync android

echo.
echo ============================================
echo  SUCCESS! Android project is ready.
echo ============================================
echo.
echo Next steps:
echo  1. Install Android Studio: https://developer.android.com/studio
echo  2. Run:  npx cap open android
echo  3. In Android Studio: Build ^> Generate Signed APK
echo.
echo To run on a connected device:
echo  npx cap run android
echo.
pause
