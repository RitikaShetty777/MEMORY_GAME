const board = document.getElementById("gameBoard");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const cardInput = document.getElementById("cardCount");
const hintEl = document.getElementById("hints");

let score = 100;
let hints = 3;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let gameActive = false; // 🔑 MAIN FIX

const characters = [
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
];

// ================= START GAME =================
function startGame() {
  const totalCards = parseInt(cardInput.value);

  if (!totalCards || totalCards <= 0 || totalCards % 2 !== 0) {
    alert("Enter a valid EVEN number greater than 0");
    return;
  }

  if (totalCards / 2 > characters.length) {
    alert("Too many cards requested");
    return;
  }

  resetState();
  gameActive = true;
  generateBoard(totalCards);
}

// ================= RESET STATE =================
function resetState() {
  board.innerHTML = "";
  messageEl.textContent = "";
  score = 100;
  hints = 3;
  matchedPairs = 0;
  scoreEl.textContent = score;
  hintEl.textContent = hints;
  lockBoard = false;
  firstCard = secondCard = null;
  gameActive = false;
}

// ================= BOARD GENERATION =================
function generateBoard(totalCards) {
  const pairCount = totalCards / 2;

  const shuffledChars = [...characters].sort(() => Math.random() - 0.5);
  const selected = shuffledChars.slice(0, pairCount);

  const cards = [...selected, ...selected].sort(() => Math.random() - 0.5);

  const cols = Math.ceil(Math.sqrt(totalCards));
  board.style.gridTemplateColumns = `repeat(${cols}, 90px)`;

  cards.forEach(char => createCard(char));
}

// ================= CREATE CARD =================
function createCard(char) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = char;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-front">?</div>
      <div class="card-face card-back">${char}</div>
    </div>
  `;

  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
}

// ================= FLIP CARD =================
function flipCard(card) {
  if (!gameActive) return; // ❌ game ended
  if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

// ================= CHECK MATCH =================
function checkMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    resetTurn();

    if (matchedPairs * 2 === board.children.length) {
      endGame("🎉 You Win!");
    }
  } else {
    score -= 4;
    scoreEl.textContent = score;

    if (score <= 0) {
      endGame("❌ Game Over");
      return;
    }

    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 800);
  }
}

// ================= RESET TURN =================
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// ================= HINT SYSTEM =================
function useHint() {
  if (!gameActive) return; // ❌ game ended
  if (hints === 0 || lockBoard) return;

  hints--;
  hintEl.textContent = hints;

  score -= 5;
  scoreEl.textContent = score;

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.classList.add("flipped"));

  setTimeout(() => {
    cards.forEach(card => {
      if (!card.classList.contains("matched")) {
        card.classList.remove("flipped");
      }
    });
  }, 2000);

  if (score <= 0) {
    endGame("❌ Game Over");
  }
}

// ================= END GAME =================
function endGame(message) {
  gameActive = false;
  lockBoard = true;
  messageEl.textContent = message;
}

// ================= RESTART =================
function restartGame() {
  cardInput.value = "";
  resetState();
}
