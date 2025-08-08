import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        if (!response.ok) {
          alert(data.message || 'Logout Error')
          return
        }

        localStorage.removeItem('user')
        navigate('/login')
      } catch (error) {
        console.error('Logout Failed!', error)
      }
    }

    performLogout()
  }, [navigate])
  return null
}

export default Logout
