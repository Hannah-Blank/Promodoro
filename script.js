// ====================
// NAVBAR / THEMES
// ====================
const toggleButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

toggleButton.addEventListener("click", () => {
  menu.classList.toggle("open");
});

const themeButtons = document.querySelectorAll(".menu button");
const themes = ["white", "dark", "darkblue", "bordeaux", "lilac"];

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    themes.forEach(theme => document.body.classList.remove(theme));
    document.body.classList.add(button.dataset.theme);
    menu.classList.remove("open");
  });
});

// ====================
// TIMER LOGIC
// ====================
const timeEl = document.getElementById("time");
const timeButtons = document.querySelectorAll(".tim-btn");

let totalSeconds = 0;
let timerInterval = null;
let isRunning = false;

// Format seconds → HH:MM:SS
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0")
  );
}

// Update display
function updateDisplay() {
  timeEl.textContent = formatTime(totalSeconds);
}

// Start / Pause timer
timeEl.addEventListener("click", () => {
  if (totalSeconds <= 0) return;

  if (!isRunning) {
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
  }

  isRunning = !isRunning;
});

// ====================
// ADD / REMOVE TIME
// ====================
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = parseInt(button.textContent);

    totalSeconds += value * 60;

    if (totalSeconds < 0) totalSeconds = 0;

    updateDisplay();
  });
});

// Initial render
updateDisplay();

document.addEventListener("keydown", (e) => {
  // prevent page from scrolling
  if (e.code === "Space") {
    e.preventDefault();
    timeEl.click(); // reuse existing click logic
  }
});
