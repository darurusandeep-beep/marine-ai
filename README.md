# INDRAT (इन्द्रत / இந்திரத்) — The Duolingo of Indian Languages 🦚

**INDRAT** is a gamified, interactive Indian language learning platform inspired by **Duolingo**. It empowers users to learn Indian languages from another Indian language or English (e.g., Learn Tamil from Hindi, Telugu from English, Bengali from Tamil, etc.) with personalized daily time commitments.

---

## 🌟 Key Features

1. **Iconic Duolingo Look & Feel**:
   - 3D bouncy pressable buttons (`duo-btn-green`, `duo-btn-blue`, `duo-btn-orange`).
   - Winding serpentine learning path with Units, Stepping Stones, Stars, and Reward Chests.
   - **Indra the Mascot 🦚**: Animated national bird mascot providing cheerful hints, reactions, and celebration.
   - Built-in Web Audio API sound synthesis (chimes, buzzer, pop, fanfare) with **zero external MP3 dependencies**!
   - Celebration screen with confetti bursts (`canvas-confetti`).

2. **Learn Based on Your Available Time ("Time to Learn")**:
   - 🟢 **Casual**: 3 Mins / Day (1 quick bite)
   - 🔵 **Regular**: 5 Mins / Day (2 lessons - Recommended)
   - 🟠 **Serious**: 10 Mins / Day (Conversational fluency)
   - 🔴 **Intense**: 15 Mins / Day (Deep mastery)
   - **2-Minute Timed Blitz**: Speed-run quiz mode for rapid learning on the go.
   - Live daily study timer that tracks active minutes practiced today.

3. **Multi-Modal Interactive Quiz System**:
   - **Multiple Choice**: With native script, English meaning, and Romanized phonetic pronunciation guide.
   - **Word Bank / Sentence Builder**: Tap scattered word chips in sequence to translate sentences.
   - **Tap-to-Match Pairs**: Match Indian script/phonetic words with their meanings in real-time.
   - **Fill in the Blanks**: Complete sentences with grammatically accurate vocabulary.
   - **Native Audio Speech Synthesis**: Click the speaker icon on any word to hear natural Indian pronunciation via browser SpeechSynthesis.

4. **Gamification & Engagement**:
   - ❤️ **Hearts / Lives**: 5 lives; mistakes cost 1 life. Refill in the shop or wait.
   - 🔥 **Daily Streak**: Tracks consecutive daily study habit with animated flame.
   - 💎 **Ratnas (Gems)**: Earned on completing lessons, spent in the *Ratna Bazaar* for Streak Freezes & Heart Refills.
   - 🏆 **Chola Gold League (Leaderboards)**: Compete with learners across Mumbai, Chennai, Bengaluru, Kolkata, etc.
   - 🏅 **Badges & Honors**: "Namaste India", "Chai Lover", "Auto Navigator", and more.

5. **Indian Languages Supported**:
   - 🪷 Tamil (தமிழ்)
   - 🇮🇳 Hindi (हिन्दी)
   - 🌾 Telugu (తెలుగు)
   - 🐯 Bengali (বাংলা)
   - 🐘 Kannada (ಕನ್ನಡ)
   - 🌴 Malayalam (മലയാളം)
   - 🚩 Marathi (मराठी)
   - 🦁 Gujarati (ગુજરાતી)
   - 🪕 Punjabi (ਪੰਜਾਬੀ)

---

## 🚀 How to Open and Run in VS Code

### Step 1: Open Folder in VS Code
1. Open **VS Code**.
2. Click **File > Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select this folder:
   ```
   C:\Users\D.SANDEEP\.gemini\antigravity\scratch\indrat-language-app
   ```

### Step 2: Open Integrated Terminal
1. Press `` Ctrl + ` `` (Backtick) in VS Code to open the integrated terminal.

### Step 3: Run the Development Server
```bash
npm run dev
```

### Step 4: Open in Your Browser
The app will immediately start at:
👉 **http://localhost:3000** (or `http://localhost:5173`)

*(Alternatively, you can just double-click `start.bat` on Windows!)*

---

## 📁 Project Structure

```
indrat-language-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Top Duolingo bar (streak, gems, hearts, timer, language switch)
│   │   ├── Mascot.jsx           # Indra the Peacock SVG animated mascot
│   │   ├── PathView.jsx         # Stepping stone units tree & time goal widgets
│   │   ├── QuizModal.jsx        # Core quiz engine (word bank, match pairs, speech, feedback drawer)
│   │   ├── TimeGoalModal.jsx    # Daily study goal selector (3m, 5m, 10m, 15m)
│   │   ├── ShopModal.jsx        # Ratna Bazaar (hearts refill, streak freeze, boosters)
│   │   ├── LeaderboardModal.jsx # Chola Gold League standings
│   │   └── ProfileModal.jsx     # Badges, statistics & words mastered
│   ├── data/
│   │   └── languages.js         # Indian languages curriculum, units & questions
│   ├── utils/
│   │   ├── soundEffects.js      # Web Audio API synthesized chimes & fanfares
│   │   └── speech.js            # Browser Text-to-Speech (hi-IN, ta-IN, te-IN, etc.)
│   ├── App.jsx                  # Main application orchestrator & LocalStorage sync
│   ├── index.css                # Tailwind CSS + Duolingo 3D button animations
│   └── main.jsx                 # React root mount
├── index.html                   # HTML entrypoint with Indian language typography
├── vite.config.js               # Vite config
├── tailwind.config.js           # Duolingo color palette & custom shadows
├── package.json                 # Dependencies & scripts
└── start.bat                    # One-click Windows runner
```
