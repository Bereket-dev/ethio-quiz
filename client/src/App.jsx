import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import Quiz from './pages/user/Quiz'
import QuizKingdom from './pages/user/QuizKingdom'
import QuizFlow from './pages/user/QuizFlow'
import Leaderboard from './pages/user/Leaderboard'
import SignUpForm from './components/auth/SignUpForm'
import LogInPage from './pages/LogInPage'
import Logout from './components/auth/Logout'
import Dashboard from './pages/admin/Dashboard'
import KingdomsPage from './pages/admin/KingdomsPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import QuestionPage from './pages/admin/QuestionsPage'
import AddQuiz from './pages/admin/AddQuiz'
import AdminRoute from './components/auth/AdminRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import TokenChecker from './pages/TokenChecker'
import ResetPassword from './pages/ResetPassword'
import ResultPage from './pages/user/ResultDetail'
import ScorePage from './pages/user/ResultScore'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/reset-password/:token" element={<TokenChecker />} />
        <Route path="/change-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<TokenChecker />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/quizkingdom" element={<QuizKingdom />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizflow/:categoryId" element={<QuizFlow />} />
          <Route path="/result-detail" element={<ResultPage />} />
          <Route path="/result-score" element={<ScorePage />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kingdoms" element={<KingdomsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/categories/:categoryId/questions"
            element={<QuestionPage />}
          />
          <Route path="/add-quiz" element={<AddQuiz />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
