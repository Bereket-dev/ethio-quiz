import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkTokenAPI } from '../services/tokenServices'

function TokenChecker() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState('loading') // 'loading' | 'valid' | 'invalid'
  const [message, setMessage] = useState('Checking token validity...')

  useEffect(() => {
    let isMounted = true

    const fetchTokenChecker = async () => {
      try {
        if (!token) {
          setStatus('invalid')
          setMessage('No token provided.')
          return
        }

        const result = await checkTokenAPI(token)

        if (!isMounted) return

        if (result?.isValid) {
          setStatus('valid')
          setMessage('Token verified successfully! Redirecting...')
          setTimeout(() => navigate(`/login/${token}`), 1000)
        } else {
          setStatus('invalid')
          setMessage('Invalid or expired token.')
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
  }, [token, navigate])

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
