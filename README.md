# 🚀 Cypress Experimental Project

This project serves as a sandbox for exploring and testing various Cypress features and configurations.

## ✅ Features

- 🔍 Run targeted test suites based on needs  
- 🧪 Experiment with Cypress capabilities  
- 🌐 Cross-environment, cross-browser, and cross-resolution testing  
- 📁 Split test cases: `login.cy.js`, `reg.cy.js`, `api.cy.js`  
- 🔁 Retry logic implemented  
- 🧱 Basic Page Object Model (POM) structure  
- 💾 Use of `cy.session` for session persistence  
- 🗂️ Tag-based test execution  
- 🔌 API test examples

---

## ⚙️ Prerequisites

Make sure the following are installed **before setting up** this project:

- [Node.js](https://nodejs.org/)
- [Google Chrome](https://www.google.com/chrome/)
- [Mozilla Firefox](https://www.mozilla.org/firefox/)

---

## 🚦 Running Tests

### ▶️ Run Specific Test Folder in Headless Mode (Chrome)

```bash
npx cypress run --browser chrome --spec "cypress/e2e/regression-tests/login-area/accounts/*.cy.js"
```
🌐 Override the Default URL
```bash
npx cypress run --env defaultURL=http://example-url.example.com
```
🧪 Select Testing Environment (e.g., QA)
```bash
npx cypress run --env enviroment=qa --browser chrome
```
🖥️ Run with Small Screen Resolution
```bash
npm run cy:regression:smallScreen
```
🔥 Run Only Smoke Tests (Tagged "smoke")
```bash
npm run cy:smoke
```

✍️ Author Made by @tDm213