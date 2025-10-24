import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { checkTokenAPI } from '../services/tokenServices'
import { useEmail } from '../hooks/useEmail'

function TokenChecker() {
  const { token } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const isEmailVerification = location.pathname === '/verify-email'
  const isResetPassword = location.pathname === '/reset-password'

  const [status, setStatus] = useState('loading') // 'loading' | 'valid' | 'invalid'
  const [message, setMessage] = useState('Checking token validity...')

  const { handleEmailVerification } = useEmail()

  useEffect(() => {
    let isMounted = true

    const fetchTokenChecker = async () => {
      if (!token) {
        setStatus('invalid')
        setMessage('No token provided.')
        return
      }

      try {
        if (isEmailVerification) {
          setMessage('Verifying email...')
          const result = await handleEmailVerification(token)
          if (!isMounted) return

          if (result.success) {
            setStatus('valid')
            setMessage(result.message)
            // redirect after a short delay so user can see message
            setTimeout(() => navigate('/login'), 800)
          } else {
            setStatus('invalid')
            setMessage(result.message)
          }
        } else if (isResetPassword) {
          const result = await checkTokenAPI(token)
          if (!isMounted) return

          if (result?.isValid) {
            setStatus('valid')
            setMessage('Token valid! Redirecting to reset password...')
            navigate(`/change-password/${token}`)
          } else {
            setStatus('invalid')
            setMessage('Invalid or expired token.')
          }
        }
      } catch (error) {
        if (!isMounted) return
        console.error('Error checking token:', error)
        setStatus('invalid')
        setMessage('An error occurred while verifying your token.')
      }
    }

    fetchTokenChecker()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-md">
        {status === 'loading' && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'valid' && (
          <p className="font-semibold text-green-600">{message}</p>
        )}

        {status === 'invalid' && (
          <p className="font-semibold text-red-500">{message}</p>
        )}
      </div>
    </div>
  )
}

export default TokenChecker
