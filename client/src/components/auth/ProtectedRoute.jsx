import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token || !user) return <Navigate to={'/login'} replace />

  return <Outlet />
}

export default ProtectedRoute
