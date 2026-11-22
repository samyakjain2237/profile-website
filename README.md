# Samyak Jain — Profile Website

**Live demo:** [samyakjain2237.github.io/profile-website](https://samyakjain2237.github.io/profile-website/)  
**Repository:** [github.com/samyakjain2237/profile-website](https://github.com/samyakjain2237/profile-website)

A personal profile and portfolio website built with plain HTML, CSS and JavaScript. It has no frameworks, no libraries and no build step. I made it for the **AI & Prompt Engineering Lab, Module 3: AI for Web Development** in my 2nd year of B.Tech CSE (AI/ML) at JECRC University, Jaipur.

The site introduces me, lists my skills and projects, and includes a short web-development quiz. It is responsive and has a dark/light theme. I built it with AI tools and checked every generated part by hand.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Run Locally](#run-locally)
- [Deploy on GitHub Pages](#deploy-on-github-pages)
- [How It Works](#how-it-works)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Development Workflow](#development-workflow)
- [AI Tools Used](#ai-tools-used)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## Features

- **Hero section:** my name, a short intro line and quick links.
- **About:** my background as a 2nd-year CSE (AI/ML) student.
- **Skills grid:** skills laid out as cards using CSS Grid.
- **Projects:** 4 project cards. One is an expense tracker I built with Bolt.new.
- **Contact:** email and profile links.
- **Responsive layout:** CSS Grid plus a `600px` media query, so the page works on phones, tablets and desktops.
- **Dark/light mode toggle:**
  - The choice is saved in `localStorage`.
  - On the first visit the site follows the OS colour setting (`prefers-color-scheme`).
  - The page never flashes the wrong theme, because the theme script runs in `<head>` before the page draws.
- **Web-dev quiz:** 5 questions with green/red feedback, a Next button, a final score out of 5, and a Restart button.
- **Back-to-top button:**
  - The scroll listener is passive and throttled with `requestAnimationFrame`.
  - The button has an accessible label.
  - When you use it, keyboard focus moves back to the header.
- **Footer year:** JavaScript fills in the current year, so it never goes out of date.

---

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Structure  | HTML5 (semantic elements)                     |
| Styling    | CSS3 (custom properties, CSS Grid, Flexbox, media queries) |
| Behaviour  | Vanilla JavaScript (ES6+)                     |
| Storage    | Browser `localStorage` (theme preference)     |
| Hosting    | GitHub Pages                                  |
| Version control | Git and GitHub (branches, pull requests) |

No frameworks, no npm packages, no bundler.

---

## Folder Structure

```
profile-website/
├── index.html    # Page markup: hero, about, skills, projects, quiz, contact, footer
├── favicon.svg   # "SJ" browser-tab icon
├── style.css     # Layout, light/dark theme variables, responsive rules
├── script.js     # Theme toggle, quiz logic, back-to-top button, footer year
├── .gitignore    # Keeps local screenshots and old drafts out of the repo
├── LICENSE       # MIT license
└── README.md     # This file
```

---

## Run Locally

You don't need to install anything.

### Option 1: Open the file

1. Clone the repository:
   ```bash
   git clone https://github.com/samyakjain2237/profile-website.git
   cd profile-website
   ```
2. Double-click `index.html` to open it in your browser.

### Option 2: Use a local server (recommended)

A local server behaves more like the real hosted site.

```bash
cd profile-website
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. Press `Ctrl + C` to stop the server.

---

## Deploy on GitHub Pages

1. Push the code to the `main` branch on GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the branch **`main`** and the folder **`/ (root)`**, then click **Save**.
5. Wait a minute or two. The site will be live at:
   `https://samyakjain2237.github.io/profile-website/`
6. Every new push to `main` redeploys the site automatically.

> Tip: `index.html` must be in the root folder, because GitHub Pages serves it as the home page.

---

## How It Works

### Theme (dark/light mode)

- All colours are CSS custom properties (for example `--bg` and `--text`), with a light set and a dark set.
- A small script in `<head>` runs before the page draws:
  1. If `localStorage` already has a saved theme, it uses that.
  2. If not, it checks `prefers-color-scheme` and follows the OS setting.
  3. It sets the theme on the `<html>` element straight away, so the page never flashes the wrong theme.
- Clicking the toggle switches the theme and saves the new choice to `localStorage`.

### Quiz

- The questions are stored as an array of objects in `script.js` (question, options, correct answer).
- The script shows one question at a time and checks the answer when you pick an option:
  - The correct option turns **green**.
  - A wrong choice turns **red**, and the correct answer is shown.
  - Once you have answered, the options lock.
- **Next** moves to the next question. After question 5 the quiz shows your score out of 5.
- **Restart** resets the score and starts the quiz again from question 1.

---

## Accessibility

- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`) so screen readers can follow the page.
- The theme toggle and the back-to-top button have accessible labels (`aria-label`).
- When the back-to-top button is used, focus moves to the header, so keyboard users don't lose their place.
- All buttons and links can be reached and used with the keyboard.
- Quiz feedback uses text as well as colour, so it doesn't depend on colour alone.
- The layout works on small screens (tested at 390px wide).

---

## Browser Support

Tested in Google Chrome on macOS (desktop width and a 390px phone width).

The site only uses standard modern features (CSS Grid, custom properties, `localStorage`, `matchMedia`, `requestAnimationFrame`), which current versions of Firefox, Edge and Safari also support. Internet Explorer is not supported.

---

## Development Workflow

I built the site in stages, one lab assignment at a time:

| Assignment | Work done |
|------------|-----------|
| **Assignment 9**  | Generated the base HTML and CSS with Claude, then reviewed and adjusted it. |
| **Assignment 10** | Added the dark mode toggle and the 5-question quiz with Claude's help. |
| **Assignment 11** | Built the Student Expense Tracker with Bolt.new from a plain-English prompt (shown in Projects). |
| **Assignment 12** | Added a back-to-top button on a feature branch, opened **Pull Request #1**, and had Claude review the code. |
| **Assignment 13** | Deployed the site on GitHub Pages and wrote this documentation (drafted with Claude, then corrected by hand). |

### Branch, pull request and AI review (Assignment 12)

1. Created a feature branch from `main`:
   ```bash
   git checkout -b feature/back-to-top
   ```
2. Committed the changes and pushed the branch to GitHub.
3. Opened **Pull Request #1** from the feature branch into `main`.
4. Asked Claude to review the code in the pull request.
   - The review found a **High-severity bug**: the footer-year code ran before the `<body>` existed. Because the element wasn't in the page yet, the year never appeared.
   - **Fix:** the new code now runs inside a `DOMContentLoaded` listener, so it waits until the page has loaded.
   - The review also suggested adding `defer` to `script.js`. I did **not** apply this, because the theme code must run in `<head>` before the page draws; with `defer` the page would flash the wrong colours on every load.
5. Applied the fixes, tested them in the browser, and merged the pull request into `main`.

---

## AI Tools Used

| Tool | What it was used for |
|------|----------------------|
| **Claude** | Generating the HTML/CSS layout, adding the dark mode and quiz, reviewing the code in PR #1, and drafting this README. |
| **Bolt.new** | Building the expense tracker shown in the Projects section. |

### What I checked by hand

The AI-generated code was a starting point, not the final answer. I checked:

- That every section displays correctly at desktop width and at a 390px phone width.
- That the theme toggle switches the colours and keeps my choice after a reload (`localStorage`).
- That the quiz checks every question correctly, counts the score right, and resets fully on Restart.
- That the back-to-top button only appears after scrolling and moves focus to the header.
- That the footer year shows correctly after the High bug was fixed.
- Keyboard navigation and button labels.
- That the live GitHub Pages site behaves the same as the local copy.
- Personal details, links and project descriptions.

---

## Future Improvements

- Add more questions to the quiz and shuffle the question order.
- Add a working contact form (for example with Formspree).
- Add project screenshots and live links for each project card.
- Add a downloadable resume (PDF).
- Add simple animations when sections scroll into view, and respect `prefers-reduced-motion`.
- Run a Lighthouse audit and improve performance and accessibility scores.
- Add a custom domain.

---

## Author

**Samyak Jain**
2nd-year B.Tech CSE (AI/ML), JECRC University, Jaipur

- GitHub: [@samyakjain2237](https://github.com/samyakjain2237)
- Email: [jainsamyak2237@gmail.com](mailto:jainsamyak2237@gmail.com)

---

## License

This project is released under the **MIT License**. You may use, copy, modify and share it, as long as the original copyright notice is kept. See the [LICENSE](LICENSE) file for the full text.