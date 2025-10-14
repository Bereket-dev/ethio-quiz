import { Navigate, Outlet } from 'react-router-dom'
import { checkAdmin } from '../../services/authServices'
import { useState, useEffect } from 'react'

function AdminRoute() {
  const [status, setStatus] = useState({
    loading: true,
    isAdmin: false,
  })

  useEffect(() => {
    const fetchLogData = async () => {
      const logginData = await checkAdmin()
      if (
        logginData &&
        logginData.loggedIn &&
        logginData.user.role === 'admin'
      ) {
        setStatus({ loading: false, isAdmin: true })
      } else setStatus({ loading: false, isAdmin: false })
    }
    fetchLogData()
  }, [])

  if (status.loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Checking admin access...
      </div>
    )
  }

  if (!status.loading && !status.isAdmin)
    return <Navigate to={'/unauthorized'} replace />

  return <Outlet />
}

export default AdminRoute
