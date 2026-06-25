// ==========================================================================
// HALLUCINATION HUNTER - CORE GAME ENGINE
// ==========================================================================

// Web Audio API Synthesizer Module
// Synthesizes high-quality sound effects dynamically to keep the game self-contained
const AudioSynth = {
  ctx: null,
  muted: true,

  init() {
    // Audio Context is initialized on first user interaction to bypass browser policies
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  toggleMute() {
    this.muted = !this.muted;
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.muted;
  },

  playTone(freq, type, duration, slideToFreq = 0) {
    if (this.muted) return;
    this.init();
    if (this.ctx.state === 'suspended') {
      try { this.ctx.resume(); } catch(e) {}
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      if (slideToFreq > 0) {
        osc.frequency.exponentialRampToValueAtTime(slideToFreq, this.ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play failed: ", e);
    }
  },

  playClick() {
    this.playTone(600, 'sine', 0.05, 300);
  },

  playCorrect() {
    // Upward double-chime
    this.playTone(523.25, 'sine', 0.15); // C5
    setTimeout(() => {
      this.playTone(659.25, 'sine', 0.25); // E5
    }, 80);
  },

  playIncorrect() {
    // Low sliding buzzer drop
    this.playTone(180, 'sawtooth', 0.35, 70);
  },

  playStreak(streakCount) {
    // Pitches increase with streak size
    const baseFreq = 440;
    const factor = 1 + (Math.min(streakCount, 15) * 0.08);
    this.playTone(baseFreq * factor, 'triangle', 0.15);
    setTimeout(() => {
      this.playTone(baseFreq * factor * 1.25, 'triangle', 0.25);
    }, 80);
  },

  playGameOver(isVictory) {
    if (isVictory) {
      // Arpeggio up
      const tones = [523.25, 659.25, 783.99, 1046.50]; // C Major
      tones.forEach((t, i) => {
        setTimeout(() => this.playTone(t, 'sine', 0.3), i * 120);
      });
    } else {
      // Descending tone slide
      this.playTone(220, 'square', 0.8, 55);
    }
  },

  playTick() {
    // Soft high warning click
    this.playTone(1200, 'sine', 0.03, 800);
  }
};

// Global Game State
const Game = {
  screen: 'start', // start | playing | feedback | gameover
  mode: 'classic', // classic | survival | blitz
  
  // Game metrics
  score: 0,
  streak: 0,
  bestStreak: 0,
  multiplier: 1.0,
  trust: 100, // Starts at 100 in Classic/Blitz, or 3 lives in Survival
  lives: 3,

  // Deck counters
  deck: [],
  currentRoundIndex: 0,
  currentRound: null,
  totalRoundsAnswered: 0,
  totalCorrect: 0,

  // Timer intervals
  timerVal: 0,
  timerIntervalId: null,
  
  // Blitz exclusive clock variables
  blitzGlobalTimer: 60,
  blitzIntervalId: null,

  // Performance category trackers
  stats: {
    "Safe": { encountered: 0, correct: 0 },
    "Fake Stat": { encountered: 0, correct: 0 },
    "Fake Quote": { encountered: 0, correct: 0 },
    "Fake Source": { encountered: 0, correct: 0 },
    "Misleading Claim": { encountered: 0, correct: 0 }
  },

  init() {
    this.bindEvents();
    this.setupUI();
  },

  bindEvents() {
    // Start Game
    document.getElementById('start-game-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      this.initGame();
    });

    // Start Screen Mode selectors
    const modeCards = document.querySelectorAll('.mode-select-card');
    modeCards.forEach(card => {
      card.addEventListener('click', () => {
        AudioSynth.playClick();
        modeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.mode = card.getAttribute('data-mode');
      });
    });

    // Rules Handbooks
    document.getElementById('open-rules-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      document.getElementById('rules-overlay').classList.add('active');
    });

    document.getElementById('close-rules-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      document.getElementById('rules-overlay').classList.remove('active');
    });

    document.getElementById('rules-close-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      document.getElementById('rules-overlay').classList.remove('active');
    });

    // Instructions Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        AudioSynth.playClick();
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const targetTab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
      });
    });

    // Sound toggle button
    document.getElementById('audio-toggle-btn').addEventListener('click', () => {
      const isMuted = AudioSynth.toggleMute();
      const btn = document.getElementById('audio-toggle-btn');
      const soundOff = document.getElementById('sound-off-icon');
      const soundOn = document.getElementById('sound-on-icon');
      
      if (isMuted) {
        btn.classList.add('muted');
        soundOff.style.display = 'block';
        soundOn.style.display = 'none';
      } else {
        btn.classList.remove('muted');
        soundOff.style.display = 'none';
        soundOn.style.display = 'block';
        AudioSynth.playClick();
      }
    });

    // Answer selection button clicks
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.screen !== 'playing') return;
        const answer = btn.getAttribute('data-answer');
        this.evaluateAnswer(answer);
      });
    });

    // Feedback drawer continue trigger
    document.getElementById('next-round-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      this.advanceRound();
    });

    // End screen action buttons
    document.getElementById('retry-game-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      this.initGame();
    });

    document.getElementById('back-to-menu-btn').addEventListener('click', () => {
      AudioSynth.playClick();
      this.showScreen('start');
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      const key = e.key;

      if (this.screen === 'playing') {
        if (key === '1') this.evaluateAnswer('Safe');
        else if (key === '2') this.evaluateAnswer('Fake Stat');
        else if (key === '3') this.evaluateAnswer('Fake Quote');
        else if (key === '4') this.evaluateAnswer('Fake Source');
        else if (key === '5') this.evaluateAnswer('Misleading Claim');
      } else if (this.screen === 'feedback') {
        if (key === ' ' || key === 'Enter') {
          e.preventDefault(); // Stop page scrolling
          AudioSynth.playClick();
          this.advanceRound();
        }
      }
    });
  },

  setupUI() {
    this.showScreen('start');
  },

  showScreen(screenName) {
    this.screen = screenName;
    
    // Toggle active screen views
    document.querySelectorAll('.screen-view').forEach(view => {
      view.classList.remove('active');
    });
    
    // Close the drawer by default
    document.getElementById('feedback-drawer').classList.remove('active');

    if (screenName === 'start') {
      document.getElementById('start-screen').classList.add('active');
    } else if (screenName === 'playing') {
      document.getElementById('game-screen').classList.add('active');
    } else if (screenName === 'feedback') {
      document.getElementById('game-screen').classList.add('active');
      document.getElementById('feedback-drawer').classList.add('active');
    } else if (screenName === 'gameover') {
      document.getElementById('end-screen').classList.add('active');
    }
  },

  // Fisher-Yates shuffle helper
  shuffle(array) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  },

  initGame() {
    // Reset global state metrics
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.multiplier = 1.0;
    this.totalRoundsAnswered = 0;
    this.totalCorrect = 0;
    this.currentRoundIndex = 0;

    // Reset categories tracking
    const categories = ["Safe", "Fake Stat", "Fake Quote", "Fake Source", "Misleading Claim"];
    categories.forEach(cat => {
      this.stats[cat].encountered = 0;
      this.stats[cat].correct = 0;
    });

    // Clear active clocks
    clearInterval(this.timerIntervalId);
    clearInterval(this.blitzIntervalId);

    // Setup deck structure depending on game modes
    if (this.mode === 'classic') {
      this.trust = 100;
      document.getElementById('trust-label-text').innerText = 'PUBLIC_TRUST';
      document.getElementById('trust-bar-fill').style.display = 'block';
      document.getElementById('lives-container').style.display = 'none';
      document.getElementById('trust-percentage-text').style.display = 'block';
      
      // Filter out balanced rounds: 5 Easy, 7 Medium, 8 Hard
      const easyPool = this.shuffle(window.SCENARIOS.filter(s => s.difficulty === 'easy'));
      const mediumPool = this.shuffle(window.SCENARIOS.filter(s => s.difficulty === 'medium'));
      const hardPool = this.shuffle(window.SCENARIOS.filter(s => s.difficulty === 'hard'));
      
      // Gather rounds into staged array
      this.deck = [
        ...easyPool.slice(0, 5),
        ...mediumPool.slice(0, 7),
        ...hardPool.slice(0, 8)
      ];
    } 
    else if (this.mode === 'survival') {
      this.lives = 3;
      document.getElementById('trust-label-text').innerText = 'CRITICAL_LIVES';
      document.getElementById('trust-bar-fill').style.display = 'none';
      document.getElementById('lives-container').style.display = 'flex';
      document.getElementById('trust-percentage-text').style.display = 'none';
      
      // Infinite pool starting from shuffled basic list
      this.deck = this.shuffle([...window.SCENARIOS]);
      this.updateLivesHUD();
    } 
    else if (this.mode === 'blitz') {
      this.trust = 100; // Trust isn't depleted in Blitz, only score deductions
      document.getElementById('trust-label-text').innerText = 'WAR_ROOM_LIMIT';
      document.getElementById('trust-bar-fill').style.display = 'block';
      document.getElementById('lives-container').style.display = 'none';
      document.getElementById('trust-percentage-text').style.display = 'block';
      
      this.deck = this.shuffle([...window.SCENARIOS]);
      this.blitzGlobalTimer = 60;
      
      // Start global clock
      this.blitzIntervalId = setInterval(() => {
        this.blitzGlobalTimer--;
        this.updateBlitzHUD();
        
        if (this.blitzGlobalTimer <= 0) {
          clearInterval(this.blitzIntervalId);
          this.endGame();
        }
      }, 1000);
    }

    // Refresh display
    this.updateHUD();
    this.showScreen('playing');
    this.loadRound(0);
  },

  updateLivesHUD() {
    const containers = document.getElementById('lives-container');
    containers.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const block = document.createElement('span');
      block.className = 'life-block';
      if (i < this.lives) {
        block.classList.add('active');
      }
      containers.appendChild(block);
    }
  },

  updateBlitzHUD() {
    // Flash warning if global clock runs low
    const prgWrapper = document.querySelector('.progress-wrapper');
    if (this.blitzGlobalTimer <= 10) {
      prgWrapper.classList.add('critical');
      if (this.blitzGlobalTimer % 2 === 0) {
        AudioSynth.playTick();
      }
    } else {
      prgWrapper.classList.remove('critical');
    }
    document.getElementById('hud-progress-text').innerText = `CLOCK: ${this.blitzGlobalTimer}s`;
    
    // Fill the trust bar to represent remaining time
    const ratio = (this.blitzGlobalTimer / 60) * 100;
    document.getElementById('trust-bar-fill').style.width = `${ratio}%`;
    document.getElementById('trust-percentage-text').innerText = `${this.blitzGlobalTimer}s`;
  },

  loadRound(index) {
    this.currentRoundIndex = index;
    
    // Infinite deck logic for Survival/Blitz
    if (index >= this.deck.length) {
      if (this.mode === 'survival' || this.mode === 'blitz') {
        // Ramping difficulty based on index
        let genDiff = 'easy';
        if (index > 15) genDiff = 'hard';
        else if (index > 7) genDiff = 'medium';

        // Select a random category
        const categories = ["Safe", "Fake Stat", "Fake Quote", "Fake Source", "Misleading Claim"];
        const randCat = categories[Math.floor(Math.random() * categories.length)];
        
        // Generate new round object and push to deck
        const generated = window.FALLBACK_GENERATOR.generate(randCat, genDiff);
        this.deck.push(generated);
      } else {
        this.endGame();
        return;
      }
    }

    this.currentRound = this.deck[index];
    this.stats[this.currentRound.correctAnswer].encountered++;

    // Reset card UI states & stamp
    const stamp = document.getElementById('card-stamp');
    stamp.className = 'status-stamp';
    stamp.innerText = '';

    const card = document.getElementById('content-card');
    card.classList.remove('warning-flash');
    card.className = 'content-card-body'; // Reset potential animated classes
    
    // Trigger slide-in animation on card load
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    // Update Content Card text
    document.getElementById('card-text-content').innerText = this.currentRound.text;
    document.getElementById('card-id-badge').innerText = `ID: INTAKE_${this.currentRound.id.toUpperCase()}`;
    document.getElementById('card-type-badge').innerText = this.currentRound.type.toUpperCase();
    
    // Set Difficulty Badge style
    const diffBadge = document.getElementById('card-difficulty-badge');
    diffBadge.innerText = this.currentRound.difficulty.toUpperCase();
    diffBadge.className = `diff-badge ${this.currentRound.difficulty}`;

    // Enable answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('selected', 'dimmed');
    });

    this.showScreen('playing');
    this.startRoundTimer();
  },

  startRoundTimer() {
    clearInterval(this.timerIntervalId);
    
    this.timerVal = this.currentRound.timeLimit;
    this.updateRoundTimerUI();

    const hudTimer = document.querySelector('.timer-wrapper');
    hudTimer.classList.remove('critical');

    this.timerIntervalId = setInterval(() => {
      this.timerVal -= 0.1;
      
      if (this.timerVal <= 3.0) {
        hudTimer.classList.add('critical');
        document.getElementById('content-card').classList.add('warning-flash');
        
        // Heartbeat alert click every half second
        if (Math.round(this.timerVal * 10) % 5 === 0) {
          AudioSynth.playTick();
        }
      }

      if (this.timerVal <= 0) {
        clearInterval(this.timerIntervalId);
        this.evaluateAnswer(null); // Timeout counts as incorrect/null
      } else {
        this.updateRoundTimerUI();
      }
    }, 100);
  },

  updateRoundTimerUI() {
    const displayVal = Math.ceil(this.timerVal);
    document.getElementById('hud-timer-text').innerText = displayVal;

    // Calculate circular dash offset
    const progress = (this.timerVal / this.currentRound.timeLimit) * 100;
    const strokeDash = `${progress}, 100`;
    document.getElementById('timer-bar').setAttribute('stroke-dasharray', strokeDash);
  },

  evaluateAnswer(selectedAnswer) {
    // Immediately stop timers and disable buttons
    clearInterval(this.timerIntervalId);
    
    this.totalRoundsAnswered++;
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.disabled = true;
      const answerVal = btn.getAttribute('data-answer');
      if (answerVal === this.currentRound.correctAnswer) {
        btn.classList.add('selected');
      } else {
        btn.classList.add('dimmed');
      }
    });

    const isCorrect = (selectedAnswer === this.currentRound.correctAnswer);
    const stamp = document.getElementById('card-stamp');
    const drawer = document.getElementById('feedback-drawer');
    const title = document.getElementById('feedback-result-title');
    const pointsSpan = document.getElementById('feedback-points-val');

    stamp.className = 'status-stamp';
    drawer.className = 'drawer-view';

    if (isCorrect) {
      this.totalCorrect++;
      this.stats[this.currentRound.correctAnswer].correct++;
      this.streak++;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
      }

      // Dynamic Streak Multiplier logic (every 3 consecutive updates the scale)
      if (this.streak >= 12) this.multiplier = 4.0;
      else if (this.streak >= 9) this.multiplier = 3.0;
      else if (this.streak >= 6) this.multiplier = 2.0;
      else if (this.streak >= 3) this.multiplier = 1.5;
      else this.multiplier = 1.0;

      // Speed bonus calculation (percentage of time remaining)
      const speedFactor = 0.5 + 0.5 * (Math.max(this.timerVal, 0) / this.currentRound.timeLimit);
      const pointsEarned = Math.round(this.currentRound.points * this.multiplier * speedFactor);
      this.score += pointsEarned;

      // Correct UI settings
      stamp.innerText = "CORRECT";
      stamp.classList.add('correct');
      
      title.innerText = "VERIFICATION VERDICT: SECURED";
      title.className = "feedback-title glow-green";
      
      pointsSpan.innerText = `+${pointsEarned}`;
      pointsSpan.className = "highlight-green";
      
      drawer.classList.add('correct-state');

      // Audio feedback
      if (this.streak > 0 && this.streak % 3 === 0) {
        AudioSynth.playStreak(this.streak);
      } else {
        AudioSynth.playCorrect();
      }
    } 
    else {
      // Mistake penalty logic
      this.streak = 0;
      this.multiplier = 1.0;

      stamp.innerText = selectedAnswer === null ? "TIMEOUT" : "FAILED";
      stamp.classList.add('failed');

      title.innerText = selectedAnswer === null 
        ? "VERIFICATION VERDICT: SCANNER TIMEOUT" 
        : "VERIFICATION VERDICT: LEAK DETECTED";
      title.className = "feedback-title glow-red";

      drawer.classList.add('failed-state');
      AudioSynth.playIncorrect();

      // Mode trust adjustments
      if (this.mode === 'classic') {
        const penalty = selectedAnswer === null ? 25 : 20; // Harder penalty for running out of time
        this.trust = Math.max(0, this.trust - penalty);
        pointsSpan.innerText = "PENALTY: TRUST DECREASED";
        pointsSpan.className = "highlight-red";
      } 
      else if (this.mode === 'survival') {
        this.lives--;
        this.updateLivesHUD();
        pointsSpan.innerText = "PENALTY: LIFE TERMINATED";
        pointsSpan.className = "highlight-red";
      } 
      else if (this.mode === 'blitz') {
        // In blitz, wrong answers subtract score instead of ending runs
        const penalty = -150;
        this.score = Math.max(0, this.score + penalty);
        pointsSpan.innerText = `${penalty} POINTS`;
        pointsSpan.className = "highlight-red";
      }
    }

    // Populate feedback drawer
    document.getElementById('feedback-explanation-text').innerText = this.currentRound.explanation;
    
    // Populate Red flags
    const redFlagsList = document.getElementById('feedback-red-flags-list');
    redFlagsList.innerHTML = '';
    if (this.currentRound.redFlags && this.currentRound.redFlags.length > 0 && this.currentRound.redFlags[0] !== "None") {
      document.getElementById('red-flags-container').style.display = 'block';
      this.currentRound.redFlags.forEach(flag => {
        const li = document.createElement('li');
        li.innerText = flag;
        redFlagsList.appendChild(li);
      });
    } else {
      document.getElementById('red-flags-container').style.display = 'none';
    }

    this.updateHUD();
    this.showScreen('feedback');
  },

  advanceRound() {
    // Check end conditions before drawing next round
    if (this.mode === 'classic') {
      if (this.trust <= 0) {
        this.endGame();
        return;
      }
      if (this.currentRoundIndex >= this.deck.length - 1) {
        this.endGame();
        return;
      }
    } 
    else if (this.mode === 'survival') {
      if (this.lives <= 0) {
        this.endGame();
        return;
      }
    } 
    else if (this.mode === 'blitz') {
      if (this.blitzGlobalTimer <= 0) {
        this.endGame();
        return;
      }
    }

    // Load next round card
    this.loadRound(this.currentRoundIndex + 1);
  },

  updateHUD() {
    // Mode
    document.getElementById('hud-mode-text').innerText = this.mode.toUpperCase();
    
    // Progress
    if (this.mode !== 'blitz') {
      const idx = String(this.currentRoundIndex + 1).padStart(2, '0');
      const total = String(this.deck.length).padStart(2, '0');
      document.getElementById('hud-progress-text').innerText = `${idx} / ${this.mode === 'survival' ? '∞' : total}`;
    } else {
      this.updateBlitzHUD();
    }

    // Trust/Lives
    if (this.mode !== 'survival') {
      document.getElementById('trust-bar-fill').style.width = `${this.trust}%`;
      document.getElementById('trust-percentage-text').innerText = `${this.trust}%`;
      
      // Trust bar status colors
      const fill = document.getElementById('trust-bar-fill');
      if (this.trust <= 30) {
        fill.style.backgroundColor = 'var(--claim-color)';
        fill.style.boxShadow = '0 0 8px var(--claim-glow)';
      } else if (this.trust <= 60) {
        fill.style.backgroundColor = 'var(--source-color)';
        fill.style.boxShadow = '0 0 8px var(--source-glow)';
      } else {
        fill.style.backgroundColor = 'var(--safe-color)';
        fill.style.boxShadow = '0 0 8px var(--safe-glow)';
      }
    }

    // Streak / Multiplier
    const multVal = document.getElementById('hud-multiplier-text');
    multVal.innerText = `${this.multiplier.toFixed(1)}x`;
    document.getElementById('hud-streak-text').innerText = `STREAK: ${this.streak}`;
    
    // Dynamic pop animation on high multiplier
    if (this.multiplier > 1.0) {
      multVal.style.transform = 'scale(1.2)';
    } else {
      multVal.style.transform = 'scale(1.0)';
    }

    // Score
    const formattedScore = String(this.score).padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('hud-score-text').innerText = formattedScore;
  },

  endGame() {
    // Clear all clocks
    clearInterval(this.timerIntervalId);
    clearInterval(this.blitzIntervalId);

    // Compute accuracy percentage
    const accuracy = this.totalRoundsAnswered > 0 
      ? Math.round((this.totalCorrect / this.totalRoundsAnswered) * 100) 
      : 0;

    // Determine ranking grade title
    let grade = "HALLUCINATION MAGNET";
    if (accuracy >= 95 && this.score >= 4500) {
      grade = "VERIFICATION WIZARD";
    } else if (accuracy >= 85) {
      grade = "TRUST GUARDIAN";
    } else if (accuracy >= 70) {
      grade = "SOURCE SLEUTH";
    } else if (accuracy >= 50) {
      grade = "CLAIM CRUSHER";
    } else if (accuracy > 0) {
      grade = "CLICKBAIT CASUALTY";
    }

    // Update End Screen values
    const formattedScore = String(this.score).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('end-score-val').innerText = formattedScore;
    document.getElementById('end-accuracy-val').innerText = `${accuracy}%`;
    document.getElementById('end-streak-val').innerText = this.bestStreak;
    
    const gradeBadge = document.getElementById('end-grade-badge');
    gradeBadge.innerText = grade;

    // Apply color class to grade badge
    gradeBadge.className = 'badge-grade-text'; // reset
    if (grade === "VERIFICATION WIZARD" || grade === "TRUST GUARDIAN") {
      gradeBadge.style.color = 'var(--safe-color)';
      gradeBadge.style.textShadow = '0 0 10px var(--safe-glow)';
    } else if (grade === "SOURCE SLEUTH" || grade === "CLAIM CRUSHER") {
      gradeBadge.style.color = 'var(--stat-color)';
      gradeBadge.style.textShadow = '0 0 10px var(--stat-glow)';
    } else {
      gradeBadge.style.color = 'var(--claim-color)';
      gradeBadge.style.textShadow = '0 0 10px var(--claim-glow)';
    }

    // Render Category Breakdown Bars
    const categories = ["Safe", "Fake Stat", "Fake Quote", "Fake Source", "Misleading Claim"];
    const idMapping = {
      "Safe": "safe",
      "Fake Stat": "stat",
      "Fake Quote": "quote",
      "Fake Source": "source",
      "Misleading Claim": "claim"
    };

    categories.forEach(cat => {
      const stats = this.stats[cat];
      const ratioStr = `${stats.correct} / ${stats.encountered}`;
      const ratioPercent = stats.encountered > 0 ? (stats.correct / stats.encountered) * 100 : 0;
      
      const mappedId = idMapping[cat];
      document.getElementById(`chart-val-${mappedId}`).innerText = ratioStr;
      document.getElementById(`chart-bar-${mappedId}`).style.width = `${ratioPercent}%`;
    });

    // Play victory/defeat game-over theme
    const isVictory = (this.mode === 'classic' && this.trust > 0) || (this.mode === 'blitz' && this.score > 2000) || (this.mode === 'survival' && this.totalRoundsAnswered > 15);
    AudioSynth.playGameOver(isVictory);

    this.showScreen('gameover');
  }
};

// Start initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
