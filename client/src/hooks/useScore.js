import { updateUserScore } from '../services/quizResultServices'
import { useState } from 'react'

export const useScoreUpdate = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const handleScoreUpdate = async (userId, categoryId, score) => {
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)
    try {
      const updatedUser = await updateUserScore(userId, categoryId, score)
      setSuccessMsg('Score updated successfully!')
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return {
    handleScoreUpdate,
    errorMsg,
    setErrorMsg,
    isLoading,
    successMsg,
    setSuccessMsg,
  }
}
