ethio-quiz/
├── client/                 # Frontend (React or any UI framework)
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images, logos, icons, etc.
│   │   ├── components/     # Reusable UI components (e.g., Navbar, Button)
│   │   ├── pages/          # Pages like Home, Login, Quiz, Leaderboard
│   │   ├── context/        # React Context for Auth, Quiz State, etc.
│   │   ├── services/       # API calls (e.g., auth.js, quiz.js)
│   │   └── App.jsx
│   ├── .env
│   └── package.json

├── server/                 # Backend (Node.js + Express)
│   ├── config/             # DB connection, environment setup
│   ├── controllers/        # Logic for routes (quiz, auth, leaderboard)
│   ├── models/             # Mongoose models (User, Quiz, Result)
│   ├── routes/             # API route files (e.g., authRoutes.js, quizRoutes.js)
│   ├── middleware/         # Auth checks, error handling
│   ├── utils/              # Utility functions (e.g., token generator)
│   ├── .env
│   ├── server.js           # Entry point
│   └── package.json

├── README.md
├── .gitignore
└── package.json (optional root if monorepo-style setup)
