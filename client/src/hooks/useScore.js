import { useNavigate, useLocation } from 'react-router-dom'
import { updateUserScore } from '../services/quizResultServices'
import { useState } from 'react'

export const useScoreUpdate = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [returnData, setReturnData] = useState(null)
  const navigate = useNavigate()

  const handleScoreUpdate = async (userId, categoryId, answers) => {
    setErrorMsg('')
    setSuccessMsg('')
    setIsLoading(true)
    try {
      const formattedAnswers = Object.values(answers)
      const updatedResult = await updateUserScore(
        userId,
        categoryId,
        formattedAnswers,
      )
      setReturnData(updatedResult)
      setSuccessMsg('Score updated successfully!')

      navigate('/result-detail', {
        state: { resultData: updatedResult },
      })
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
    returnData,
  }
}
