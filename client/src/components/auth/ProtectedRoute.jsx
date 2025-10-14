import { Navigate, Outlet } from 'react-router-dom'
import { checkAuth } from '../../services/authServices'
import { useEffect, useState } from 'react'

function ProtectedRoute() {
  const [status, setStatus] = useState({ loading: true, isLoggedIn: false })

  useEffect(() => {
    const fetchLogData = async () => {
      const logginData = await checkAuth()
      if (logginData && logginData.loggedIn && logginData.user) {
        localStorage.setItem('user', logginData.user)
        setStatus({ loading: false, isLoggedIn: true })
      } else setStatus({ loading: false, isLoggedIn: false })
    }
    fetchLogData()
  }, [])

  if (status.loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Checking login...
      </div>
    )
  }

  if (!status.loading && !status.isLoggedIn)
    return <Navigate to={'/login'} replace />

  return <Outlet />
}

export default ProtectedRoute
