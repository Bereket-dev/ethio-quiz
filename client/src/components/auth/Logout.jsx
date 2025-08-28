import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loggingOutUser } from '../../services/authServices'

function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      try {
        loggingOutUser()
        localStorage.removeItem('user')
        navigate('/login')
      } catch (error) {
        console.log('Failed to logging out the user!')
      }
    }

    performLogout()
  }, [navigate])
  return null
}

export default Logout
