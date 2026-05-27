// HabitPulz Service Worker — offline cache + background reminders
const CACHE = 'HabitPulz-v4';
const ASSETS = [
  '/login.html', '/index.html', '/admin.html',
  '/app.js', '/styles.css', '/manifest.json',
  '/icons/icon-192.png', '/icons/icon-512.png'
];

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch (offline support) ───────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// ── Background Sync — check reminders every minute ───────────────────────────
self.addEventListener('periodicsync', e => {
  if (e.tag === 'habit-reminders') {
    e.waitUntil(checkReminders());
  }
});

// ── Message from main thread — store habits & trigger check ──────────────────
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'STORE_HABITS') {
    // Store habits in SW cache for background access
    self.habits = e.data.habits || [];
  }
  if (e.data && e.data.type === 'CHECK_REMINDERS') {
    checkReminders();
  }
  if (e.data && e.data.type === 'SCHEDULE_REMINDER') {
    scheduleAlarm(e.data.habit);
  }
});

// ── Notification click ────────────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('index.html') && 'focus' in client) return client.focus();
      }
      return clients.openWindow('/index.html');
    })
  );
});

// ── Check which habits need a reminder right now ──────────────────────────────
async function checkReminders() {
  const habits = self.habits || [];
  const now    = new Date();
  const hh     = String(now.getHours()).padStart(2, '0');
  const mm     = String(now.getMinutes()).padStart(2, '0');
  const timeNow = hh + ':' + mm;

  for (const habit of habits) {
    if (!habit.reminder || habit.done) continue;
    if (habit.reminder === timeNow) {
      await self.registration.showNotification('HabitPulz Reminder 🔔', {
        body:    'Time to: ' + habit.emoji + ' ' + habit.name,
        icon:    '/icons/icon-192.png',
        badge:   '/icons/icon-192.png',
        tag:     'habit-' + habit.id,
        vibrate: [200, 100, 200],
        data:    { habitId: habit.id },
        actions: [
          { action: 'done',   title: '✅ Mark Done' },
          { action: 'snooze', title: '⏰ Snooze 10 min' }
        ]
      });
    }
  }
}

// ── Schedule a one-time alarm via setTimeout (fallback when tab is open) ──────
function scheduleAlarm(habit) {
  if (!habit.reminder) return;
  const [hh, mm] = habit.reminder.split(':').map(Number);
  const now    = new Date();
  const target = new Date();
  target.setHours(hh, mm, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const delay = target - now;
  setTimeout(() => {
    self.registration.showNotification('HabitPulz Reminder 🔔', {
      body:    'Time to: ' + habit.emoji + ' ' + habit.name,
      icon:    '/icons/icon-192.png',
      badge:   '/icons/icon-192.png',
      tag:     'habit-' + habit.id,
      vibrate: [200, 100, 200],
    });
  }, delay);
}
