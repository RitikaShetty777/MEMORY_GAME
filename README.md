# 🧠 Memory Card Matching Game (Case-Sensitive Alphabets)

An interactive **web-based Memory Card Matching Game** built using **HTML, CSS, and Vanilla JavaScript**.  
This game challenges players to match **case-sensitive English alphabet pairs**, where **uppercase and lowercase letters are treated as independent symbols**.

The project focuses on **clean game logic, dynamic grid generation, proper state management, and user-friendly gameplay**, without using any frameworks or external libraries.

---

## 🎮 Game Objective

The goal of the game is to **match all card pairs correctly before the score reaches zero**.

Each card displays a **single English alphabet character**:
- Lowercase pairs: `a = a`, `b = b`
- Uppercase pairs: `A = A`, `B = B`

⚠️ Cross-case matching is **not allowed**:
- `a ≠ A`
- `b ≠ B`

---

## ✨ Key Features

### 🔤 Case-Sensitive Alphabet Matching
- Uses **both uppercase (A–Z) and lowercase (a–z)** English alphabets
- Each character appears **exactly twice**
- Matching is **strictly case-sensitive**
- Lowercase and uppercase letters form **separate pairs**

---

### 🔢 Dynamic Grid Size
- Player inputs the **total number of cards** before starting the game
- Input validation ensures:
  - The number is **even**
  - The number is **greater than zero**
- Grid layout is calculated dynamically using a **near-square approach**
- No hardcoded grid sizes (fully responsive)

---

### 🧮 Scoring System
- Initial score: **100**
- Each wrong match deducts **4 points**
- Score updates in real time
- Game ends immediately when:
  - All cards are matched ✅
  - Score reaches 0 ❌

---

### 🧠 Hint System
- **3 hints per game**
- Each hint:
  - Reveals all cards for **2 seconds**
  - Deducts **5 points**
- Hints are **disabled automatically** when:
  - All hints are used
  - The game ends (win or game over)

---

### 🛑 Game State Control (Important Enhancement)
- After **Game Over** or **Win**:
  - Cards cannot be flipped
  - Hints cannot be used
  - Score cannot change
- **Restart** is the only action allowed
- Prevents unintended score manipulation and state corruption

---

### 🎨 UI / UX
- Clean and minimal design
- Smooth **3D card flip animation**
- Responsive grid layout
- Clear visual feedback for:
  - Flipped cards
  - Matched cards
  - Game result messages

---

## 🖥️ Tech Stack

- **HTML5** – Structure and layout
- **CSS3** – Styling, grid system, animations
- **JavaScript (ES6)** – Game logic, state management, validation

No frameworks. No libraries. Pure fundamentals.

---

## 📁 Project Structure

Memory-card-game/
│
├── index.html # Game layout and controls
├── style.css # Styling, grid, animations
└── script.js # Game logic and state handling
