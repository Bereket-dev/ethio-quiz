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
