import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import Quiz from './pages/user/Quiz'
import Freshman from './pages/user/Freshman'
import Trivia from './pages/user/Trivia'
import QuizFlow from './pages/user/QuizFlow'
import Leaderboard from './pages/user/Leaderboard'
import SignUpForm from './components/auth/SignUpForm'
import LogInForm from './components/auth/LogInForm'
import Logout from './components/auth/Logout'
import Dashboard from './pages/admin/Dashboard'
import KingdomsPage from './pages/admin/KingdomsPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import AdminRoute from './components/auth/AdminRoute'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/logout" element={<Logout />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/freshman" element={<Freshman />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizflow/:id" element={<QuizFlow />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kingdoms" element={<KingdomsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
