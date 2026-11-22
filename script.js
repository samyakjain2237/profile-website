/* =====================================================
   1. DARK / LIGHT THEME
   Runs immediately (script is in <head>) so there is
   no flash of the wrong theme while the page loads.
   ===================================================== */

const THEME_KEY = "theme";

// Read the saved theme safely (localStorage can throw in private mode)
function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* ignore: the theme just won't be remembered */
  }
}

// First visit: follow the operating system's light/dark setting
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const startTheme = getSavedTheme() || (prefersLight ? "light" : "dark");
document.documentElement.setAttribute("data-theme", startTheme);

// Updates the <html> attribute and the button icon/label
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  // Show the sun in dark mode (click for light) and the moon in light mode
  btn.textContent = theme === "dark" ? "☀️" : "🌙";
  btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

/* =====================================================
   2. QUIZ DATA
   Each question: text, 4 options, index of the right one
   ===================================================== */

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink and Text Management Language"
    ],
    answer: 1
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<head>", "<h6>", "<h1>", "<heading>"],
    answer: 2
  },
  {
    question: "Which CSS property changes the text colour?",
    options: ["font-color", "text-color", "color", "foreground"],
    answer: 2
  },
  {
    question: "Which CSS layout uses rows AND columns together?",
    options: ["Flexbox", "Grid", "Float", "Inline-block"],
    answer: 1
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned in JavaScript?",
    options: ["var", "let", "static", "const"],
    answer: 3
  }
];

/* =====================================================
   3. EVERYTHING THAT NEEDS THE PAGE ELEMENTS
   Waits until the HTML is fully loaded.
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Theme toggle button ---------- */
  const themeBtn = document.getElementById("theme-toggle");
  applyTheme(document.documentElement.getAttribute("data-theme"));

  themeBtn.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
  });

  /* ---------- Quiz elements ---------- */
  const questionView = document.getElementById("quiz-question-view");
  const resultView = document.getElementById("quiz-result-view");
  const progressEl = document.getElementById("quiz-progress");
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const feedbackEl = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("quiz-next");
  const scoreEl = document.getElementById("quiz-score");
  const messageEl = document.getElementById("quiz-message");
  const restartBtn = document.getElementById("quiz-restart");

  // Quiz state
  let current = 0;   // index of the question being shown
  let score = 0;     // number of correct answers

  // Draws the current question and its 4 option buttons
  function showQuestion() {
    const q = questions[current];
    progressEl.textContent = "Question " + (current + 1) + " of " + questions.length;
    questionEl.textContent = q.question;   // textContent keeps "<h1>" as plain text
    feedbackEl.textContent = "";
    nextBtn.disabled = true;
    nextBtn.textContent = current === questions.length - 1 ? "See Score" : "Next";

    optionsEl.innerHTML = "";   // clear old options
    q.options.forEach(function (optionText, index) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = optionText;
      btn.addEventListener("click", function () {
        checkAnswer(index);
      });
      optionsEl.appendChild(btn);
    });
  }

  // Colours the chosen option and locks all options
  function checkAnswer(chosen) {
    const q = questions[current];
    const buttons = optionsEl.querySelectorAll(".quiz-option");

    buttons.forEach(function (btn) {
      btn.disabled = true;   // only one answer per question
    });

    if (chosen === q.answer) {
      buttons[chosen].classList.add("correct");
      feedbackEl.textContent = "✅ Correct!";
      score++;
    } else {
      buttons[chosen].classList.add("wrong");
      buttons[q.answer].classList.add("correct");   // also reveal the right one
      feedbackEl.textContent = "❌ Wrong — the answer is: " + q.options[q.answer];
    }

    nextBtn.disabled = false;
    nextBtn.focus();   // handy for keyboard users
  }

  // Shows the final score screen
  function showResult() {
    questionView.hidden = true;
    resultView.hidden = false;
    scoreEl.textContent = score + " / " + questions.length;

    if (score === questions.length) {
      messageEl.textContent = "Perfect score! 🎉";
    } else if (score >= 3) {
      messageEl.textContent = "Nice work! Try again for full marks.";
    } else {
      messageEl.textContent = "Keep learning — give it another go!";
    }
    restartBtn.focus();
  }

  // Next button: go to next question or finish
  nextBtn.addEventListener("click", function () {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  // Restart button: reset state and start over
  restartBtn.addEventListener("click", function () {
    current = 0;
    score = 0;
    resultView.hidden = true;
    questionView.hidden = false;
    showQuestion();
  });

  // Start the quiz
  showQuestion();
});