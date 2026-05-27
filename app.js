// ===== AUTH =====
(function() {
  var u = JSON.parse(localStorage.getItem("hp_user") || "null");
  if (!u) { window.location.href = "login.html"; return; }
  var hr = new Date().getHours();
  var gr = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var now = new Date();
  document.getElementById("greeting-title").textContent = gr + ", " + u.name + " \uD83D\uDC4B";
  document.getElementById("greeting-sub").textContent = days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + " \u00B7 Keep the streak alive!";
  document.getElementById("user-name-display").textContent = u.name;
  document.getElementById("user-avatar").textContent = u.name[0].toUpperCase();
  document.getElementById("logout-link").onclick = function(e) {
    e.preventDefault();
    localStorage.removeItem("hp_user");
    window.location.href = "login.html";
  };
})();

// ===== DATA =====
const defaultHabits = [
  { id: 1, name: "Read 30 minutes", emoji: "📚", category: "study", freq: "daily", streak: 12, done: false },
  { id: 2, name: "Solve 5 LeetCode problems", emoji: "💻", category: "study", freq: "weekdays", streak: 7, done: false },
  { id: 3, name: "Review flashcards", emoji: "✏️", category: "study", freq: "daily", streak: 5, done: false },
  { id: 4, name: "Drink 8 glasses of water", emoji: "💧", category: "lifestyle", freq: "daily", streak: 20, done: false },
  { id: 5, name: "Morning workout", emoji: "🏋️", category: "lifestyle", freq: "daily", streak: 9, done: false },
  { id: 6, name: "Sleep by 11 PM", emoji: "🌙", category: "lifestyle", freq: "daily", streak: 4, done: false },
  { id: 7, name: "Meditate 10 minutes", emoji: "🍎", category: "lifestyle", freq: "daily", streak: 3, done: false },
];

const quotes = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "— Aristotle" },
  { text: "Small daily improvements over time lead to stunning results.", author: "— Robin Sharma" },
  { text: "Motivation gets you going, but habit keeps you growing.", author: "— John C. Maxwell" },
  { text: "You don't rise to the level of your goals, you fall to the level of your systems.", author: "— James Clear" },
  { text: "The secret of your future is hidden in your daily routine.", author: "— Mike Murdock" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "— Robert Collier" },
];

const achievements = [
  { icon: "🔥", name: "7-Day Streak", desc: "Complete habits 7 days in a row", unlocked: true },
  { icon: "📚", name: "Bookworm", desc: "Read for 30 days straight", unlocked: true },
  { icon: "💧", name: "Hydration Hero", desc: "Hit water goal 14 days", unlocked: true },
  { icon: "🏆", name: "Century Club", desc: "100 total completions", unlocked: false },
  { icon: "⚡", name: "Speed Learner", desc: "Complete all study habits in one day", unlocked: false },
  { icon: "🌙", name: "Night Owl Tamed", desc: "Sleep on time for 10 days", unlocked: false },
  { icon: "💪", name: "Iron Will", desc: "30-day streak on any habit", unlocked: false },
  { icon: "🎯", name: "Perfectionist", desc: "100% completion for a full week", unlocked: true },
];

const studyGoals = [
  { text: "Finish Chapter 5 of CLRS", done: false },
  { text: "Complete React course module 3", done: true },
  { text: "Practice 2 mock interviews", done: false },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekDone  = [true, true, true, true, false, false, false];
const barData   = [80, 65, 90, 75, 100, 55, 70];

let habits = JSON.parse(localStorage.getItem("hp_habits")) || defaultHabits;
let waterCount = parseInt(localStorage.getItem("hp_water")) || 0;
let currentFilter = "all";
let selectedCat = "study";
let selectedIcon = "📚";
let quoteIndex = 0;

// ===== POMODORO =====
let pomoMinutes = 25, pomoSeconds = 0, pomoRunning = false, pomoInterval = null, pomoSession = 1;

function saveHabits() { localStorage.setItem("hp_habits", JSON.stringify(habits)); }
function saveWater()  { localStorage.setItem("hp_water", waterCount.toString()); }

// ===== RENDER HABITS =====
function renderHabits() {
  const list = document.getElementById("habits-list");
  const filtered = currentFilter === "all" ? habits : habits.filter(h => h.category === currentFilter);
  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:40px">
      No habits yet. Click "+ New Habit" to add one!
    </div>`;
    updateStats(); updateRing();
    return;
  }

  filtered.forEach(h => {
    const item = document.createElement("div");
    item.className = `habit-item ${h.done ? "completed" : ""}`;
    item.innerHTML = `
      <div class="habit-check">${h.done ? '<i class="fa-solid fa-check"></i>' : ""}</div>
      <span class="habit-emoji">${h.emoji}</span>
      <div class="habit-info">
        <div class="habit-name">${h.name}</div>
        <div class="habit-meta">${h.freq.charAt(0).toUpperCase() + h.freq.slice(1)}${h.reminder ? ' · ⏰ ' + h.reminder : ''}</div>
      </div>
      <span class="habit-tag tag-${h.category}">${h.category}</span>
      <span class="habit-streak"><i class="fa-solid fa-fire"></i> ${h.streak}</span>
      <button class="edit-btn" data-id="${h.id}" title="Edit habit"><i class="fa-solid fa-pen"></i></button>
      <button class="delete-btn" data-id="${h.id}" title="Delete habit"><i class="fa-solid fa-trash"></i></button>
    `;
    // tick to complete — only on the non-button area
    item.addEventListener("click", (e) => {
      if (e.target.closest(".delete-btn") || e.target.closest(".edit-btn")) return;
      toggleHabit(h.id);
    });
    item.querySelector(".edit-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openEditModal(h.id);
    });
    item.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHabit(h.id);
    });
    list.appendChild(item);
  });

  updateStats();
  updateRing();
}

function toggleHabit(id) {
  const h = habits.find(x => x.id === id);
  if (!h) return;
  h.done = !h.done;
  if (h.done) { h.streak++; showToast(`✅ "${h.name}" completed! +10 XP`); }
  else { h.streak = Math.max(0, h.streak - 1); }
  saveHabits();
  renderHabits();
}

function deleteHabit(id) {
  habits = habits.filter(x => x.id !== id);
  saveHabits();
  renderHabits();
  showToast("🗑️ Habit removed");
}

// ===== STATS =====
function updateStats() {
  const done  = habits.filter(h => h.done).length;
  const total = habits.length;
  document.getElementById("done-count").textContent  = done;
  document.getElementById("total-count").textContent = total;
}

// ===== RING =====
function updateRing() {
  const done  = habits.filter(h => h.done).length;
  const total = habits.length || 1;
  const pct   = Math.round((done / total) * 100);
  const circumference = 314;
  const offset = circumference - (circumference * pct / 100);
  document.getElementById("ring-fill").style.strokeDashoffset = offset;
  document.getElementById("ring-pct").textContent = pct + "%";
}

// ===== QUOTE =====
function renderQuote() {
  const q = quotes[quoteIndex % quotes.length];
  document.getElementById("quote-text").textContent   = q.text;
  document.getElementById("quote-author").textContent = q.author;
}

// ===== WATER =====
function renderWater() {
  const container = document.getElementById("water-glasses");
  container.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const g = document.createElement("div");
    g.className = `glass ${i < waterCount ? "filled" : ""}`;
    g.textContent = i < waterCount ? "💧" : "🫙";
    g.addEventListener("click", () => {
      waterCount = i < waterCount ? i : i + 1;
      saveWater();
      renderWater();
    });
    container.appendChild(g);
  }
  document.getElementById("water-count").textContent = waterCount;
}

// ===== SLEEP =====
function calcSleep() {
  const bed  = document.getElementById("sleep-bed").value;
  const wake = document.getElementById("sleep-wake").value;
  if (!bed || !wake) return;
  const [bh, bm] = bed.split(":").map(Number);
  const [wh, wm] = wake.split(":").map(Number);
  let mins = (wh * 60 + wm) - (bh * 60 + bm);
  if (mins < 0) mins += 1440;
  const h = Math.floor(mins / 60), m = mins % 60;
  const result = document.getElementById("sleep-result");
  result.textContent = `${h}h ${m}m sleep`;
  result.style.color = h >= 7 ? "var(--green)" : h >= 5 ? "var(--yellow)" : "var(--accent2)";
}

// ===== WEEK GRID =====
function renderWeekGrid() {
  const grid = document.getElementById("week-grid");
  grid.innerHTML = "";
  weekDays.forEach((day, i) => {
    const wrap = document.createElement("div");
    wrap.className = "week-day";
    wrap.innerHTML = `
      <span class="week-label">${day}</span>
      <div class="week-dot ${weekDone[i] ? "done" : ""} ${i === 1 ? "today" : ""}">${weekDone[i] ? "✓" : i + 1}</div>
    `;
    grid.appendChild(wrap);
  });
}

// ===== STUDY GOALS =====
function renderStudyGoals() {
  const list = document.getElementById("study-goals-list");
  list.innerHTML = "";
  studyGoals.forEach((g, i) => {
    const item = document.createElement("div");
    item.className = `goal-item ${g.done ? "done" : ""}`;
    item.innerHTML = `
      <div class="goal-check">${g.done ? '<i class="fa-solid fa-check"></i>' : ""}</div>
      <span>${g.text}</span>
    `;
    item.querySelector(".goal-check").addEventListener("click", () => {
      studyGoals[i].done = !studyGoals[i].done;
      renderStudyGoals();
    });
    list.appendChild(item);
  });
}

// ===== ACHIEVEMENTS =====
function renderAchievements() {
  const grid = document.getElementById("achievements-grid");
  grid.innerHTML = "";
  achievements.forEach(a => {
    const card = document.createElement("div");
    card.className = `achievement-card ${a.unlocked ? "" : "locked"}`;
    card.innerHTML = `
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-name">${a.name}</div>
      <div class="ach-desc">${a.desc}</div>
      ${a.unlocked ? '<span class="ach-badge">Unlocked</span>' : '<span class="ach-badge" style="opacity:0.5">Locked</span>'}
    `;
    grid.appendChild(card);
  });
}

// ===== BAR CHART =====
function renderBarChart() {
  const chart = document.getElementById("bar-chart");
  chart.innerHTML = "";
  const max = Math.max(...barData);
  const mockSdgData = [5, 0, 10, 2, 8, 1, 4];
  const maxSdg = Math.max(...mockSdgData, 1);
  barData.forEach((val, i) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";
    const height = Math.round((val / max) * 100);
    const sdgHeight = Math.round((mockSdgData[i] / maxSdg) * 100);
    wrap.innerHTML = `
      <div style="display:flex; align-items:flex-end; gap:2px; width:100%; height:100px;">
        <div class="bar" style="height:${height}%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,#7c6af7,#f76a8a);flex:1"></div>
        <div class="bar" style="height:${sdgHeight}%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,#4ade80,#16a34a);flex:1"></div>
      </div>
      <span class="bar-label">${weekDays[i]}</span>
    `;
    chart.appendChild(wrap);
  });
}

// ===== POMODORO =====
function updatePomoDisplay() {
  const m = String(pomoMinutes).padStart(2, "0");
  const s = String(pomoSeconds).padStart(2, "0");
  document.getElementById("pomo-display").textContent = `${m}:${s}`;
}

document.getElementById("pomo-start").addEventListener("click", () => {
  if (pomoRunning) {
    clearInterval(pomoInterval);
    pomoRunning = false;
    document.getElementById("pomo-start").innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    pomoRunning = true;
    document.getElementById("pomo-start").innerHTML = '<i class="fa-solid fa-pause"></i>';
    pomoInterval = setInterval(() => {
      if (pomoSeconds === 0) {
        if (pomoMinutes === 0) {
          clearInterval(pomoInterval);
          pomoRunning = false;
          document.getElementById("pomo-start").innerHTML = '<i class="fa-solid fa-play"></i>';
          pomoSession = pomoSession < 4 ? pomoSession + 1 : 1;
          document.getElementById("pomo-session").textContent = pomoSession;
          pomoMinutes = pomoSession % 4 === 0 ? 15 : 25;
          pomoSeconds = 0;
          updatePomoDisplay();
          showToast("🍅 Pomodoro complete! Take a break.");
          return;
        }
        pomoMinutes--;
        pomoSeconds = 59;
      } else {
        pomoSeconds--;
      }
      updatePomoDisplay();
    }, 1000);
  }
});

document.getElementById("pomo-reset").addEventListener("click", () => {
  clearInterval(pomoInterval);
  pomoRunning = false;
  pomoMinutes = 25; pomoSeconds = 0;
  document.getElementById("pomo-start").innerHTML = '<i class="fa-solid fa-play"></i>';
  updatePomoDisplay();
});

// ===== NAVIGATION =====
function switchSection(sec) {
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.querySelectorAll(".mob-nav-item").forEach(n => n.classList.remove("active"));
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(sec).classList.add("active");
  document.querySelectorAll(".nav-item[data-section='" + sec + "']").forEach(n => n.classList.add("active"));
  document.querySelectorAll(".mob-nav-item[data-section='" + sec + "']").forEach(n => n.classList.add("active"));
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    switchSection(item.dataset.section);
  });
});

document.querySelectorAll(".mob-nav-item").forEach(item => {
  item.addEventListener("click", () => switchSection(item.dataset.section));
});

// ===== FILTER TABS =====
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderHabits();
  });
});

// ===== MODAL OPEN/CLOSE =====
function openAddModal() {
  document.getElementById("edit-habit-id").value = "";
  document.getElementById("modal-title").textContent = "Add New Habit";
  document.getElementById("save-habit").textContent = "Add Habit";
  document.getElementById("habit-name").value = "";
  document.getElementById("habit-reminder").value = "";
  document.getElementById("habit-freq").value = "daily";
  // reset category
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(".cat-btn[data-cat='study']").classList.add("active");
  selectedCat = "study";
  // reset icon
  document.querySelectorAll(".icon-opt").forEach(o => o.classList.remove("active"));
  document.querySelector(".icon-opt").classList.add("active");
  selectedIcon = "📚";
  document.getElementById("modal-overlay").classList.add("open");
}

function openEditModal(id) {
  const h = habits.find(x => x.id === id);
  if (!h) return;
  document.getElementById("edit-habit-id").value = id;
  document.getElementById("modal-title").textContent = "Edit Habit";
  document.getElementById("save-habit").textContent = "Save Changes";
  document.getElementById("habit-name").value = h.name;
  document.getElementById("habit-reminder").value = h.reminder || "";
  document.getElementById("habit-freq").value = h.freq;
  // set category
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const catBtn = document.querySelector(`.cat-btn[data-cat='${h.category}']`);
  if (catBtn) catBtn.classList.add("active");
  selectedCat = h.category;
  // set icon
  selectedIcon = h.emoji;
  document.querySelectorAll(".icon-opt").forEach(o => {
    o.classList.toggle("active", o.textContent.trim() === h.emoji);
  });
  document.getElementById("modal-overlay").classList.add("open");
}

document.getElementById("openModal").addEventListener("click", openAddModal);
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal-overlay").classList.remove("open");
});
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal-overlay"))
    document.getElementById("modal-overlay").classList.remove("open");
});

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCat = btn.dataset.cat;
  });
});

const iconMap = { "📚":"📚","✏️":"✏️","🏋️":"🏋️","💧":"💧","🌙":"🌙","🍎":"🍎","🎵":"🎵","💻":"💻" };
document.querySelectorAll(".icon-opt").forEach(opt => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".icon-opt").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
    selectedIcon = opt.textContent;
  });
});

document.getElementById("save-habit").addEventListener("click", () => {
  const name = document.getElementById("habit-name").value.trim();
  if (!name) { showToast("⚠️ Please enter a habit name", "warn"); return; }
  const reminder = document.getElementById("habit-reminder").value;
  const editId = document.getElementById("edit-habit-id").value;

  if (editId) {
    // EDIT existing habit
    const h = habits.find(x => x.id === parseInt(editId));
    if (h) {
      h.name     = name;
      h.emoji    = selectedIcon;
      h.category = selectedCat;
      h.freq     = document.getElementById("habit-freq").value;
      h.reminder = reminder;
      saveHabits();
      if (reminder) scheduleReminder(h);
      renderHabits();
      showToast(`✏️ "${name}" updated!`);
    }
  } else {
    // ADD new habit
    const newHabit = {
      id: Date.now(),
      name,
      emoji: selectedIcon,
      category: selectedCat,
      freq: document.getElementById("habit-freq").value,
      reminder,
      streak: 0,
      done: false,
    };
    habits.push(newHabit);
    saveHabits();
    if (reminder) scheduleReminder(newHabit);
    renderHabits();
    showToast(`🎉 "${name}" added to your habits!`);
  }

  document.getElementById("habit-name").value = "";
  document.getElementById("edit-habit-id").value = "";
  document.getElementById("modal-overlay").classList.remove("open");
});

// ===== ADD STUDY GOAL =====
document.getElementById("add-study-goal").addEventListener("click", () => {
  const text = prompt("Enter study goal:");
  if (text && text.trim()) {
    studyGoals.push({ text: text.trim(), done: false });
    renderStudyGoals();
  }
});

// ===== QUOTE =====
document.getElementById("new-quote").addEventListener("click", () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  renderQuote();
});

// ===== SLEEP =====
document.getElementById("sleep-bed").addEventListener("change", calcSleep);
document.getElementById("sleep-wake").addEventListener("change", calcSleep);

// ===== TOAST =====
function showToast(msg, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.borderLeftColor = type === "warn" ? "var(--yellow)" : "var(--green)";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== SVG GRADIENT =====
function injectGradient() {
  const svg = document.querySelector(".ring");
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c6af7"/>
      <stop offset="100%" stop-color="#f76a8a"/>
    </linearGradient>`;
  svg.prepend(defs);
}

// ===== INIT =====
function init() {
  injectGradient();
  renderHabits();
  renderQuote();
  renderWater();
  renderWeekGrid();
  renderStudyGoals();
  renderAchievements();
  renderBarChart();
  calcSleep();
  updatePomoDisplay();
  renderExercise();
  initNotifications();
}

init();

// ===== Life on Land — TREE PLANTING =====
const treeEmojis = { oak:'🌳', pine:'🌲', mango:'🥭', neem:'🌿', bamboo:'🎋', fruit:'🍎' };
const weekLabels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

let plantLog = JSON.parse(localStorage.getItem('hp_plants') || '[]');
// seed some history if empty
if (plantLog.length === 0) {
  plantLog = [
    { date: '2026-04-07', type: 'oak',   count: 3, week: 'Week 14' },
    { date: '2026-04-14', type: 'pine',  count: 5, week: 'Week 15' },
    { date: '2026-04-15', type: 'neem',  count: 2, week: 'Week 16' },
  ];
  localStorage.setItem('hp_plants', JSON.stringify(plantLog));
}

let weekPlanted = JSON.parse(localStorage.getItem('hp_week_planted') || '[]'); // array of day indices planted this week

function savePlants() { localStorage.setItem('hp_plants', JSON.stringify(plantLog)); }
function saveWeekPlanted() { localStorage.setItem('hp_week_planted', JSON.stringify(weekPlanted)); }

function totalTrees() { return plantLog.reduce((s, e) => s + e.count, 0); }

function updateSDGStats() {
  const total = totalTrees();
  document.getElementById('total-trees').textContent = total;
  document.getElementById('co2-offset').textContent  = (total * 22) + ' kg';
  document.getElementById('plant-streak').textContent = plantLog.length;
  document.getElementById('forest-area').textContent  = (total * 4) + ' m²';
}

function renderForestVisual() {
  const el = document.getElementById('forest-visual');
  el.innerHTML = '';
  const total = Math.min(totalTrees(), 40);
  const types = plantLog.flatMap(e => Array(Math.min(e.count, 10)).fill(treeEmojis[e.type] || '🌳'));
  for (let i = 0; i < total; i++) {
    const t = document.createElement('span');
    t.className = 'hero-tree';
    t.textContent = types[i % types.length] || '🌳';
    el.appendChild(t);
  }
  if (total === 0) el.innerHTML = '<span style="color:var(--text-muted);font-size:13px;align-self:center">Your forest will grow here 🌱</span>';
}

function renderForestGrid() {
  const el = document.getElementById('forest-grid');
  const cap = document.getElementById('forest-caption');
  el.innerHTML = '';
  const total = totalTrees();
  if (total === 0) { cap.textContent = 'Plant your first tree to start your forest!'; return; }
  const show = Math.min(total, 50);
  const types = plantLog.flatMap(e => Array(e.count).fill(treeEmojis[e.type] || '🌳'));
  for (let i = 0; i < show; i++) {
    const t = document.createElement('span');
    t.className = 'forest-tree';
    t.textContent = types[i] || '🌳';
    el.appendChild(t);
  }
  cap.textContent = total + ' trees planted · ' + (total * 22) + ' kg CO₂ absorbed per year';
}

function renderWeekPlantGrid() {
  const el = document.getElementById('week-plant-grid');
  el.innerHTML = '';
  weekLabels.forEach((day, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'wpd';
    const planted = weekPlanted.includes(i);
    wrap.innerHTML = `
      <span class="wpd-label">${day}</span>
      <div class="wpd-dot ${planted ? 'planted' : ''}" data-day="${i}">${planted ? '🌱' : ''}</div>`;
    wrap.querySelector('.wpd-dot').addEventListener('click', () => {
      if (weekPlanted.includes(i)) weekPlanted = weekPlanted.filter(d => d !== i);
      else weekPlanted.push(i);
      saveWeekPlanted();
      renderWeekPlantGrid();
    });
    el.appendChild(wrap);
  });
}

function renderPlantHistory() {
  const el = document.getElementById('plant-history');
  el.innerHTML = '';
  if (plantLog.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:12px 0">No planting logs yet. Log your first trees above!</p>';
    return;
  }
  [...plantLog].reverse().forEach(e => {
    el.innerHTML += `
      <div class="plant-entry">
        <div class="plant-entry-icon">${treeEmojis[e.type] || '🌳'}</div>
        <div class="plant-entry-info">
          <div class="plant-entry-name">${e.type.charAt(0).toUpperCase() + e.type.slice(1)} Tree</div>
          <div class="plant-entry-meta">${e.date} · ${e.week}</div>
        </div>
        <div class="plant-entry-count">+${e.count}</div>
      </div>`;
  });
}

function renderSDGTargets() {
  const total = totalTrees();
  const targets = [
    { label: 'Personal goal: 52 trees/year (1/week)', current: Math.min(total, 52), goal: 52 },
    { label: 'Community goal: 200 trees', current: Math.min(total * 3, 200), goal: 200 },
    { label: 'CO₂ offset goal: 500 kg/year', current: Math.min(total * 22, 500), goal: 500 },
    { label: 'Biodiversity: 10 species planted', current: Math.min(new Set(plantLog.map(e => e.type)).size, 10), goal: 10 },
  ];
  const el = document.getElementById('sdg-targets');
  el.innerHTML = '';
  targets.forEach(t => {
    const pct = Math.round((t.current / t.goal) * 100);
    el.innerHTML += `
      <div class="sdg-target-item">
        <div class="sdg-target-header">
          <span class="sdg-target-label">${t.label}</span>
          <span class="sdg-target-pct">${pct}%</span>
        </div>
        <div class="sdg-progress-bar">
          <div class="sdg-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>`;
  });
}

function logPlant() {
  const count = parseInt(document.getElementById('plant-count').value);
  const type  = document.getElementById('plant-type').value;
  if (!count || count < 1) { showToast('⚠️ Enter number of trees', 'warn'); return; }
  const now = new Date();
  const weekNum = Math.ceil((now - new Date(now.getFullYear(), 0, 1)) / 604800000);
  plantLog.push({
    date: now.toISOString().split('T')[0],
    type,
    count,
    week: 'Week ' + weekNum,
  });
  savePlants();
  document.getElementById('plant-count').value = '';
  renderAllSDG();
  showToast('🌱 ' + count + ' ' + type + ' tree' + (count > 1 ? 's' : '') + ' logged! Great work for Life on Land!');
}

function renderAllSDG() {
  updateSDGStats();
  renderForestVisual();
  renderForestGrid();
  renderWeekPlantGrid();
  renderPlantHistory();
  renderSDGTargets();
}

document.getElementById('log-plant').addEventListener('click', logPlant);
document.getElementById('plant-count').addEventListener('keydown', e => { if (e.key === 'Enter') logPlant(); });

// init SDG on page load
renderAllSDG();

// ===== EXERCISE TRACKER (interactive tick marks) =====
const defaultExercises = [
  { id: 1, name: "Morning Walk — 30 min",  done: false },
  { id: 2, name: "Stretching — 15 min",    done: false },
  { id: 3, name: "Workout — 45 min",       done: false },
];
let exercises = JSON.parse(localStorage.getItem("hp_exercises") || "null") || defaultExercises;

function saveExercises() { localStorage.setItem("hp_exercises", JSON.stringify(exercises)); }

function renderExercise() {
  const list = document.getElementById("exercise-list");
  if (!list) return;
  list.innerHTML = "";
  exercises.forEach((ex, i) => {
    const item = document.createElement("div");
    item.className = "exercise-item" + (ex.done ? " done" : "");
    item.style.cssText = "display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;transition:all .2s;font-size:13px;";
    item.innerHTML = `
      <div style="width:24px;height:24px;border-radius:50%;border:2px solid ${ex.done ? 'var(--green)' : 'var(--border)'};
        background:${ex.done ? 'var(--green)' : 'transparent'};display:flex;align-items:center;justify-content:center;
        flex-shrink:0;transition:all .2s;">
        ${ex.done ? '<i class="fa-solid fa-check" style="color:#0f0f1a;font-size:11px"></i>' : ''}
      </div>
      <span style="${ex.done ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">${ex.name}</span>
    `;
    item.addEventListener("click", () => {
      exercises[i].done = !exercises[i].done;
      saveExercises();
      renderExercise();
      if (exercises[i].done) showToast("💪 " + ex.name + " done!");
    });
    list.appendChild(item);
  });
}

// ===== NOTIFICATIONS =====
let notifTimers = [];

function scheduleReminder(habit) {
  if (!habit.reminder || Notification.permission !== "granted") return;
  // Clear any existing timer for this habit
  notifTimers = notifTimers.filter(t => {
    if (t.id === habit.id) { clearTimeout(t.timer); return false; }
    return true;
  });
  const [hh, mm] = habit.reminder.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hh, mm, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1); // schedule for tomorrow if time passed
  const delay = target - now;
  const timer = setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("HabitPulz Reminder 🔔", {
        body: `Time to: ${habit.emoji} ${habit.name}`,
        icon: "icons/icon-192.png",
        badge: "icons/icon-192.png",
        tag: "habit-" + habit.id,
      });
    }
    // reschedule for next day
    scheduleReminder(habit);
  }, delay);
  notifTimers.push({ id: habit.id, timer });
}

function scheduleAllReminders() {
  if (Notification.permission !== "granted") return;
  // Send habits to service worker for background reminders
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'STORE_HABITS',
      habits: habits
    });
    // Schedule each habit via SW
    habits.forEach(h => {
      if (h.reminder) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SCHEDULE_REMINDER',
          habit: h
        });
      }
    });
  }
  // Also schedule via setTimeout as fallback (works when tab is open)
  habits.forEach(h => { if (h.reminder) scheduleReminder(h); });
}

function initNotifications() {
  const banner     = document.getElementById("notif-banner");
  const enableBtn  = document.getElementById("enable-notif");
  const dismissBtn = document.getElementById("dismiss-notif");
  if (!banner) return;

  if (Notification.permission === "default" && !localStorage.getItem("hp_notif_dismissed")) {
    banner.style.display = "flex";
  } else if (Notification.permission === "granted") {
    scheduleAllReminders();
    startReminderClock(); // check every minute
  }

  if (enableBtn) {
    enableBtn.addEventListener("click", () => {
      Notification.requestPermission().then(perm => {
        if (perm === "granted") {
          banner.style.display = "none";
          scheduleAllReminders();
          startReminderClock();
          showToast("🔔 Notifications enabled! You'll get habit reminders.");
        } else {
          showToast("⚠️ Notifications blocked. Enable in browser settings.", "warn");
        }
      });
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      banner.style.display = "none";
      localStorage.setItem("hp_notif_dismissed", "1");
    });
  }
}

// Check every minute if any habit reminder matches current time
function startReminderClock() {
  setInterval(() => {
    if (Notification.permission !== "granted") return;
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, "0");
    const mm  = String(now.getMinutes()).padStart(2, "0");
    const timeNow = hh + ":" + mm;
    habits.forEach(h => {
      if (h.reminder === timeNow && !h.done) {
        new Notification("HabitPulz Reminder 🔔", {
          body:  "Time to: " + h.emoji + " " + h.name,
          icon:  "icons/icon-192.png",
          badge: "icons/icon-192.png",
          tag:   "habit-" + h.id,
        });
        // Also tell SW to store updated habits
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: "STORE_HABITS", habits });
        }
      }
    });
  }, 60000); // every 60 seconds
}

// ===== NOTIFICATION SETTINGS SECTION =====
// Adds a Notifications tab to the sidebar and a settings panel
(function addNotifSection() {
  // Add nav item to sidebar
  const nav = document.querySelector(".nav");
  if (nav && !document.querySelector('.nav-item[data-section="notifications"]')) {
    const link = document.createElement("a");
    link.href = "#";
    link.className = "nav-item";
    link.dataset.section = "notifications";
    link.innerHTML = `<i class="fa-solid fa-bell"></i><span>Notifications</span>`;
    nav.appendChild(link);
    link.addEventListener("click", e => { e.preventDefault(); switchSection("notifications"); });
  }

  // Add mobile nav item
  const mobNav = document.querySelector(".mobile-nav-inner");
  if (mobNav && !document.querySelector('.mob-nav-item[data-section="notifications"]')) {
    const btn = document.createElement("button");
    btn.className = "mob-nav-item";
    btn.dataset.section = "notifications";
    btn.innerHTML = `<i class="fa-solid fa-bell"></i><span>Alerts</span>`;
    mobNav.appendChild(btn);
    btn.addEventListener("click", () => switchSection("notifications"));
  }

  // Add section HTML
  const main = document.querySelector(".main");
  if (main && !document.getElementById("notifications")) {
    const sec = document.createElement("section");
    sec.className = "section";
    sec.id = "notifications";
    sec.innerHTML = `
      <div class="section-header">
        <h2><i class="fa-solid fa-bell"></i> Notification Settings</h2>
        <span id="notif-status-badge" style="padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(124,106,247,.15);color:var(--accent)">Checking...</span>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px" class="notif-grid">
        <!-- Permission Card -->
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <div style="width:44px;height:44px;background:rgba(124,106,247,.15);color:var(--accent);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px"><i class="fa-solid fa-shield-halved"></i></div>
            <h4 style="font-size:15px;font-weight:700">Permission Status</h4>
          </div>
          <div id="notif-perm-info" style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Checking notification permission...</div>
          <button id="notif-req-btn" style="background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;width:100%">
            <i class="fa-solid fa-bell"></i> Enable Notifications
          </button>
        </div>

        <!-- Test Card -->
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <div style="width:44px;height:44px;background:rgba(74,222,128,.15);color:var(--green);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px"><i class="fa-solid fa-paper-plane"></i></div>
            <h4 style="font-size:15px;font-weight:700">Test Notification</h4>
          </div>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Send a test notification to make sure everything is working correctly.</p>
          <button id="notif-test-btn" style="background:rgba(74,222,128,.15);color:var(--green);border:1px solid rgba(74,222,128,.3);padding:10px 20px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;width:100%">
            <i class="fa-solid fa-bell"></i> Send Test
          </button>
        </div>
      </div>

      <!-- Habit Reminders List -->
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h4 style="font-size:15px;font-weight:700"><i class="fa-solid fa-clock" style="color:var(--accent);margin-right:8px"></i>Habit Reminders</h4>
          <span style="font-size:12px;color:var(--text-muted)">Set reminder times in each habit's edit menu</span>
        </div>
        <div id="notif-habits-list"></div>
      </div>

      <!-- How it works -->
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:24px;margin-top:16px">
        <h4 style="font-size:15px;font-weight:700;margin-bottom:16px"><i class="fa-solid fa-circle-info" style="color:var(--accent);margin-right:8px"></i>How Reminders Work</h4>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          <div style="background:var(--surface2);border-radius:12px;padding:16px;text-align:center">
            <div style="font-size:28px;margin-bottom:8px">✏️</div>
            <div style="font-size:13px;font-weight:600;margin-bottom:4px">1. Edit a Habit</div>
            <div style="font-size:12px;color:var(--text-muted)">Click the pen icon on any habit and set a reminder time</div>
          </div>
          <div style="background:var(--surface2);border-radius:12px;padding:16px;text-align:center">
            <div style="font-size:28px;margin-bottom:8px">🔔</div>
            <div style="font-size:13px;font-weight:600;margin-bottom:4px">2. Enable Notifications</div>
            <div style="font-size:12px;color:var(--text-muted)">Allow browser notifications when prompted</div>
          </div>
          <div style="background:var(--surface2);border-radius:12px;padding:16px;text-align:center">
            <div style="font-size:28px;margin-bottom:8px">⏰</div>
            <div style="font-size:13px;font-weight:600;margin-bottom:4px">3. Get Reminded</div>
            <div style="font-size:12px;color:var(--text-muted)">Receive a notification at your set time every day</div>
          </div>
        </div>
      </div>
    `;
    // Insert before the mobile nav
    const mobileNav = document.querySelector(".mobile-nav");
    if (mobileNav) main.insertBefore(sec, mobileNav);
    else main.appendChild(sec);

    // Wire up buttons
    updateNotifUI();
    document.getElementById("notif-req-btn").addEventListener("click", () => {
      Notification.requestPermission().then(perm => {
        updateNotifUI();
        if (perm === "granted") {
          scheduleAllReminders();
          showToast("🔔 Notifications enabled!");
          const banner = document.getElementById("notif-banner");
          if (banner) banner.style.display = "none";
        } else {
          showToast("⚠️ Blocked — enable in browser/phone settings", "warn");
        }
      });
    });
    document.getElementById("notif-test-btn").addEventListener("click", () => {
      if (Notification.permission !== "granted") {
        showToast("⚠️ Enable notifications first", "warn"); return;
      }
      new Notification("HabitPulz Test 🔔", {
        body: "Notifications are working! You'll get habit reminders on time.",
        icon: "icons/icon-192.png",
      });
      showToast("✅ Test notification sent!");
    });
  }
})();

function updateNotifUI() {
  const badge    = document.getElementById("notif-status-badge");
  const permInfo = document.getElementById("notif-perm-info");
  const reqBtn   = document.getElementById("notif-req-btn");
  const habitsList = document.getElementById("notif-habits-list");
  if (!badge) return;

  const perm = Notification.permission;
  if (perm === "granted") {
    badge.textContent = "✅ Enabled";
    badge.style.background = "rgba(74,222,128,.15)";
    badge.style.color = "var(--green)";
    if (permInfo) permInfo.innerHTML = '<span style="color:var(--green)">✅ Notifications are enabled.</span> You will receive reminders at your set times.';
    if (reqBtn) { reqBtn.textContent = "✅ Notifications Active"; reqBtn.style.opacity = ".6"; reqBtn.disabled = true; }
  } else if (perm === "denied") {
    badge.textContent = "❌ Blocked";
    badge.style.background = "rgba(247,106,138,.15)";
    badge.style.color = "var(--accent2)";
    if (permInfo) permInfo.innerHTML = '<span style="color:var(--accent2)">❌ Notifications are blocked.</span> Go to your browser/phone Settings → Site Settings → Notifications and allow HabitPulz.';
    if (reqBtn) { reqBtn.textContent = "Open Browser Settings"; reqBtn.disabled = false; reqBtn.onclick = () => showToast("Go to browser Settings → Notifications → Allow this site", "warn"); }
  } else {
    badge.textContent = "⏳ Not Set";
    if (permInfo) permInfo.textContent = "You haven't enabled notifications yet. Click the button below to allow reminders.";
    if (reqBtn) { reqBtn.textContent = "🔔 Enable Notifications"; reqBtn.disabled = false; }
  }

  // Render habits with reminders
  if (habitsList) {
    const withReminders = habits.filter(h => h.reminder);
    if (withReminders.length === 0) {
      habitsList.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:8px 0">No reminders set yet. Edit a habit and add a reminder time.</p>';
    } else {
      habitsList.innerHTML = withReminders.map(h => `
        <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:22px">${h.emoji}</span>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:600">${h.name}</div>
            <div style="font-size:12px;color:var(--text-muted)">${h.category} · ${h.freq}</div>
          </div>
          <div style="background:rgba(124,106,247,.15);color:var(--accent);padding:6px 12px;border-radius:20px;font-size:13px;font-weight:700">
            ⏰ ${h.reminder}
          </div>
        </div>`).join("");
    }
  }
}
