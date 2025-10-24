import { useState } from 'react'
import { verifyEmail } from '../services/tokenServices'

export const useEmail = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailVerification = async (token) => {
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)
    try {
      const data = await verifyEmail(token)
      setSuccessMsg(data.message || 'Email verified successfully!')
      return { success: true, message: data.message }
    } catch (error) {
      setErrorMsg(error.message)
      return { success: false, message: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleEmailVerification,
    errorMsg,
    successMsg,
    isLoading,
    setErrorMsg,
    setSuccessMsg,
  }
}
