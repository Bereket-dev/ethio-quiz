import { Navigate, Outlet } from 'react-router-dom'

function AdminRoute() {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token) return <Navigate to={'/login'} replace />
  if (!user || user.role != 'admin')
    return <Navigate to={'/unauthorized'} replace />

  return <Outlet />
}

export default AdminRoute
