# HabitPulz Mobile App — Setup Guide

## What's been done
- Added Capacitor config (`capacitor.config.json`)
- Added mobile viewport meta tags to all HTML files
- Added bottom navigation bar for mobile screens
- Added full responsive CSS for phones and tablets
- Added safe-area insets for notch/home bar support

## Quick Start (Android APK)

### Step 1 — Run the setup script
Double-click `setup-mobile.bat` or run in terminal:
```
cd HabitPulz
setup-mobile.bat
```

### Step 2 — Install Android Studio
Download from: https://developer.android.com/studio

### Step 3 — Open in Android Studio
```
npx cap open android
```

### Step 4 — Build APK
In Android Studio:
- `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
- APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 5 — Install on phone
Transfer the APK to your Android phone and install it.
(Enable "Install from unknown sources" in phone settings)

---

## Run on connected Android device
```
npx cap run android
```

## iOS (Mac only)
```
npm install @capacitor/ios@6.1.2
npx cap add ios
npx cap sync ios
npx cap open ios
```
Then build in Xcode.

---

## After any HTML/CSS/JS changes
```
npx cap sync
```
This copies your updated web files into the Android/iOS project.

---

## App Details
- App ID: `com.HabitPulz.app`
- App Name: `HabitPulz`
- Min Android: API 22 (Android 5.1+)
- Status bar: Dark theme, #0f0f1a background
