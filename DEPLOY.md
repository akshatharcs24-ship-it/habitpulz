# Deploy HabitPulz as a Mobile App (PWA)

## Method 1 — GitHub Pages (Free, Recommended)

### Step 1 — Create GitHub repo
1. Go to https://github.com/new
2. Name it `HabitPulz`
3. Set to Public, click Create

### Step 2 — Push your code
Open terminal in the `HabitPulz` folder and run:

```bash
git init
git add .
git commit -m "HabitPulz PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/HabitPulz.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → Settings → Pages
2. Source: Deploy from branch → main → / (root)
3. Click Save
4. Your app is live at: https://YOUR_USERNAME.github.io/HabitPulz/login.html

### Step 4 — Install on Android phone
1. Open Chrome on your Android phone
2. Go to: https://YOUR_USERNAME.github.io/HabitPulz/login.html
3. Tap the 3-dot menu → "Add to Home screen"
4. Tap "Install" → App icon appears on your home screen!

### Step 5 — Install on iPhone
1. Open Safari on iPhone
2. Go to the URL above
3. Tap Share button → "Add to Home Screen"
4. Tap "Add" → App icon appears!

---

## Method 2 — Netlify (Even easier, drag & drop)

1. Go to https://netlify.com → Sign up free
2. Drag the entire `HabitPulz` folder onto the Netlify dashboard
3. Get instant URL like: https://HabitPulz-abc123.netlify.app
4. Open on phone → Install as above

---

## Method 3 — Vercel

```bash
npm install -g vercel
vercel --cwd HabitPulz
```
Follow prompts → get live URL → install on phone.

---

## What the PWA gives you
- Home screen icon (looks like a real app)
- Full screen (no browser bar)
- Works offline (cached by service worker)
- Fast loading
- No app store needed
- Works on Android AND iPhone

## To build a real APK (Android only)
See `MOBILE_SETUP.md` — requires Android Studio.
