# Kakitori: Japanese Language Learning Web App

Welcome to the Kakitori project! This is a modern React web application for Japanese language learning, built with Vite and Material UI. Please follow the instructions below to get your development environment set up from scratch.

## Prerequisites

Before you begin, make sure you have the following software installed:

1. **Git**
   - Download and install from: https://git-scm.com/downloads
   - After installation, you can check by running `git --version` in your terminal.

2. **Node.js (includes npm and npx)**
   - Download and install from: https://nodejs.org/
   - Recommended version: Node.js 18.x or later
   - After installation, check by running `node -v` and `npm -v` in your terminal.

3. **A code editor (recommended: Visual Studio Code)**
   - Download from: https://code.visualstudio.com/

## Getting Started

1. **Clone the repository**
   ```sh
   git clone <REPO_URL>
   cd KakitoriAPP
   ```
   Replace `<REPO_URL>` with the actual repository URL.

2. **Install dependencies**
   ```sh
   npm install
   ```
   This will install all required packages, including React, Vite, Material UI, and icons.

3. **Start the development server**
   ```sh
   npm run dev
   ```
   The app will be available at the local address shown in your terminal (usually http://localhost:5173).

4. **Project Structure**
   - `src/` — Main source code
     - `assets/` — Images, logos, icons
     - `components/` — Reusable React components
     - `pages/` — Main app pages (Dashboard, Kanji, Vocab, etc.)
     - `features/` — Core feature modules
     - `hooks/` — Custom React hooks
     - `utils/` — Utility functions
     - `services/` — API calls and backend services
     - `contexts/` — React Context providers
     - `styles/` — Global styles and theme config
     - `App.jsx` — Root component

5. **Recommended VS Code Extensions**
   - ESLint
   - Prettier
   - Material Icon Theme
   - GitLens

6. **Environment Variables**
   - If you need to add environment variables, create a `.env` file in the project root. See `.env.example` if available.

## Useful Commands
- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build locally

## Troubleshooting
- If you encounter issues with missing packages, run `npm install` again.
- For Windows users: If you see errors about script execution policies, run PowerShell as Administrator and execute:
  ```sh
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
- If you have issues with ports, make sure nothing else is running on port 5173 or change the port in `vite.config.js`.

## Contributing
- Please use feature branches and submit pull requests for review.
- Follow the existing code style and structure.
- Add comments and documentation as needed.

---

For any questions, reach out to the project maintainer or check the issues section.
