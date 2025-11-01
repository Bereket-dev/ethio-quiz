# 🧠 Ethio Quiz – Full Stack Trivia App

A full-stack trivia quiz game built with **React** (frontend), **Node.js + Express** (backend), and **MongoDB** (database).

---

## 📁 Project Structure

```
ethio-quiz/
├── client/                  # Frontend (React)
│   ├── public/              # Static files
│   ├── src/
│   │   ├── assets/          # Images, logos, icons, etc.
│   │   ├── components/      # Reusable UI components (e.g., Navbar, Button)
│   │   ├── pages/           # Main pages like Home, Login, Quiz, Leaderboard
│   │   ├── context/         # React Context (e.g., Auth, Quiz state)
│   │   ├── services/        # API calls (auth.js, quiz.js, etc.)
│   │   └── App.jsx          # Main app component
│   ├── .env                 # Frontend environment variables
│   └── package.json         # Frontend dependencies & scripts

├── server/                  # Backend (Node.js + Express)
│   ├── config/              # DB connection and config
│   │   └── db.js            # MongoDB connection logic
│   ├── controllers/         # API logic for routes
│   │   ├── authController.js
│   │   ├── quizController.js
│   │   └── leaderboardController.js
│   ├── models/              # Mongoose data models
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   └── Result.js
│   ├── routes/              # API route definitions
│   │   ├── authRoutes.js
│   │   ├── quizRoutes.js
│   │   └── leaderboardRoutes.js
│   ├── middleware/          # Auth checks, error handlers, etc.
│   ├── utils/               # Utility functions (e.g., token generator)
│   ├── .env                 # Backend environment variables
│   ├── server.js            # Backend entry point
│   └── package.json         # Backend dependencies & scripts

├── .gitignore               # Common ignore rules
├── README.md                # Project documentation
└── package.json             # Optional root config if monorepo-style
```

---

## 🛠 Tech Stack

| Layer    | Tech Used                           |
| -------- | ----------------------------------- |
| Frontend | React, Vite, Tailwind CSS           |
| Backend  | Node.js, Express                    |
| Database | MongoDB (Atlas)                     |
| Auth     | JWT                                 |
| Hosting  | Vercel (Frontend), Render (Backend) |

---

## 🚀 Features (MVP)

- 📝 User Registration & Login
- 🎯 Themed Trivia Quizzes
- 🏆 Leaderboard Tracking
- 🧠 Random & Daily Quiz Modes
- ✅ Multiple-Choice Answers
- 🔐 JWT-based Authentication

## 🧩 Core Features (v1.0.0)

### 👤 **User Features**

- **Account Authentication**

  - Secure user registration, login, logout, and password reset via email.
  - Email verification system for account activation.

- **Quiz Kingdoms**

  - Explore various quiz categories (“Kingdoms”) such as Science, Logic, Math, Psychology, Physics, and Chemistry.
  - Each category contains dynamic questions fetched from the backend.

- **Quiz Play**

  - Multiple-choice quiz format with point tracking.
  - Countdown timer and automatic submission when time expires.
  - Detailed score review with correct answers and explanations.

- **Leaderboard**

  - Displays top-performing players globally.
  - Real-time updates after each completed quiz.

- **Results and Score Tracking**
  - Users can view quiz history, score details, and result breakdowns.

---

### 🛠️ **Admin Features**

- **Admin Dashboard**
  - Secure access to manage kingdoms, categories, and questions.
- **CRUD Functionality**
  - Add, edit, and delete quiz categories and questions.
- **Question Management**
  - Includes question text, options, correct answers, and explanations.
- **Real-time Statistics**

  - Admins can monitor quiz activity and total results.

  _React version_

  - changed from 19 to 18 to support react-helmet-async

## v1.0.0 (Oct 25, 2025)
## v1.1.0 (Nov 1, 2025)
- fix: email verification
- feat: signin with google
- feat: legal docs
