const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const GEMINI_KEY   = process.env.GEMINI_API_KEY  || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL    || 'gemini-1.5-flash';
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_PROMPT = `You are Pulse AI, a friendly and knowledgeable habit coach inside HabitPulz app.
Help users with study habits, lifestyle habits, motivation, sleep, hydration, exercise, and SDG 15 tree planting.
Keep replies concise (2-4 sentences). Be warm, practical, and vary responses. Use emojis naturally.`;

// ── Chat endpoint ───────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, history = [], userName = 'there', habits = [] } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });

  const habitContext = habits.length
    ? `\nUser's habits: ${habits.map(h => `${h.name} (streak:${h.streak})`).join(', ')}.`
    : '';

  const systemText = SYSTEM_PROMPT + `\nUser's name: ${userName}.` + habitContext;

  // Build Gemini contents array
  const contents = [
    ...history.slice(-10).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ];

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemText }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.85, topP: 0.95 }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error((err.error?.message) || `Gemini error ${response.status}`);
    }

    const data  = await response.json();
    const reply = data.candidates[0].content.parts[0].text.trim();
    res.json({ reply, model: GEMINI_MODEL });

  } catch (err) {
    console.error('Gemini error:', err.message);
    res.json({ reply: getFallbackReply(message), fallback: true });
  }
});

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasKey: !!GEMINI_KEY,
    model:  GEMINI_MODEL,
    version: '2.0.0'
  });
});

// ── Fallback replies ─────────────────────────────────────────────────────────
function getFallbackReply(msg) {
  const m = msg.toLowerCase();
  if (m.match(/streak|consistent|miss/))         return "Streaks are powerful! Never miss twice — one missed day is an accident, two is a new bad habit. 💪";
  if (m.match(/study|learn|focus|pomodoro/))     return "Try the Pomodoro technique: 25 min focus → 5 min break. Your brain retains far more in shorter bursts. 📚";
  if (m.match(/sleep|tired|rest|bed/))           return "Aim for 7-9 hours with a consistent schedule. Sleep is when your brain consolidates memories. 🌙";
  if (m.match(/water|hydrat|drink/))             return "Drink a full glass of water right when you wake up. Dehydration causes fatigue and brain fog. 💧";
  if (m.match(/exercise|workout|gym|run|walk/))  return "Even 20 minutes of walking boosts focus and mood for hours. Consistency beats intensity every time. 🏃";
  if (m.match(/motivat|lazy|procrastinat/))      return "Motivation follows action. Start with just 2 minutes — momentum builds from there. 🚀";
  if (m.match(/tree|plant|sdg|environment/))     return "Planting one tree per week = 52 trees/year absorbing 1,100+ kg of CO₂! 🌳";
  return "The key to any habit is consistency over perfection. Start small, track daily, celebrate every win. 🌱";
}

app.listen(PORT, () => {
  console.log(`\n🚀 HabitPulz backend running at http://localhost:${PORT}`);
  console.log(`   Gemini key: ${GEMINI_KEY ? '✅ configured' : '⚠️  not set — using fallback'}`);
  console.log(`   Model: ${GEMINI_MODEL}\n`);
});
