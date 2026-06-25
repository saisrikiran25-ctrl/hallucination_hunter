# Hallucination Hunter 🎮

A fast-paced, retro-futuristic **fact-checking arcade game** built with pure vanilla HTML, CSS, and JavaScript. Act as a Verification Detective in a chaotic digital war room and classify incoming content cards as **Safe**, **Fake Stat**, **Fake Quote**, **Fake Source**, or **Misleading Claim** — before the clock runs out!

---

## 🚀 Live Demo

Open `index.html` directly in any modern browser. **No build step. No server required.**

---

## 🎯 How to Play

1. Choose a game mode on the Start Screen
2. Read the incoming content card
3. Select the correct classification from the 5 answer buttons
4. Score points for speed + accuracy + streaks
5. Survive as long as possible!

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| `1` | SAFE |
| `2` | FAKE STAT |
| `3` | FAKE QUOTE |
| `4` | FAKE SOURCE |
| `5` | MISLEADING CLAIM |
| `Space` | Continue after feedback |

---

## 🕹️ Game Modes

| Mode | Description |
|------|-------------|
| **Classic** | 20 staged rounds with ramping difficulty. Maximize your score. |
| **Survival** | Infinite deck. 3 lives. Every mistake costs you one. |
| **Blitz** | 60-second race. Classify as many cards as possible. |

---

## 📁 File Structure

```
hallucination_hunter/
├── index.html       # App structure & screen templates
├── styles.css       # Dark war room aesthetics & animations
├── data.js          # 60 handcrafted scenarios + procedural generator
└── app.js           # Game engine, state machine, audio synth, scoring
```

---

## 🧠 Technical Highlights

- **Web Audio API Synthesizer** — All sound effects (chimes, buzzers, streaks) synthesized dynamically in-browser. Zero audio files needed.
- **60 Handcrafted Scenarios** — Spread across 5 categories (`Safe`, `Fake Stat`, `Fake Quote`, `Fake Source`, `Misleading Claim`) at 3 difficulty levels.
- **Dynamic Difficulty Ramp** — Classic mode stages Easy → Medium → Hard. Survival/Blitz escalate automatically.
- **Streak Multiplier System** — Build up to 4x score multiplier by chaining correct answers.
- **Procedural Fallback Generator** — Infinite Survival/Blitz gameplay via template-driven content recombination beyond the 60 base scenarios.
- **CRT Terminal Aesthetic** — Scanlines, vignette, glitch flicker, and neon glows built purely in CSS.

---

## 🏆 Score Grades

| Grade | Requirement |
|-------|-------------|
| 🧙 Verification Wizard | 95%+ accuracy AND high score |
| 🛡️ Trust Guardian | 85%+ accuracy |
| 🔍 Source Sleuth | 70%+ accuracy |
| 💥 Claim Crusher | 50%+ accuracy |
| 🚨 Hallucination Magnet | Below 50% |

---

## ⚡ Run Locally

```bash
# Option A: Double-click index.html in File Explorer

# Option B: Use a local server
npx live-server
# or
python -m http.server 8000
# Then open http://localhost:8000
```

---

## 🛠️ Built With

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Web Audio API
- Google Fonts (Orbitron, Share Tech Mono, Inter)

---

*Built as a complete, standalone browser game — no frameworks, no backend, no AI API.*
