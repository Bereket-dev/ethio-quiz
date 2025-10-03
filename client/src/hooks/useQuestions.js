import { useState } from 'react'
import {
  addOneQuestion,
  editOneQuestion,
  removeOneQuestion,
} from '../services/questionServices'

export const useQuestionAdd = (setQuestions, setOnAdd) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleAdd = async (formData) => {
    setErrorMsg('')
    try {
      const newQuestion = await addOneQuestion(formData)
      setQuestions((prev) => [...prev, newQuestion])
      setOnAdd(false)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleAdd, errorMsg, setErrorMsg }
}

export const useQuestionEdit = (setQuestions, setOnEdit) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async (formData) => {
    setErrorMsg('')
    setIsLoading(true)

    try {
      const updatedQuestion = await editOneQuestion(formData)

      setQuestions((prev) =>
        prev.map((question) =>
          question._id === updatedQuestion._id ? updatedQuestion : question,
        ),
      )

      setOnEdit(false)
      return updatedQuestion // Optional: return the updated question
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || 'Update failed'
      setErrorMsg(message)
      throw error // Re-throw if you want to handle it in the component too
    } finally {
      setIsLoading(false)
    }
  }

  return { handleEdit, errorMsg, setErrorMsg, isLoading }
}

export const useQuestionDelete = (setQuestions) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleDelete = async (questionId) => {
    setErrorMsg('')

    try {
      await removeOneQuestion(questionId)
      setQuestions((prev) => prev.filter((ques) => ques._id !== questionId))
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleDelete, errorMsg, setErrorMsg }
}
