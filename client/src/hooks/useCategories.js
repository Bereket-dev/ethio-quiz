import { useState } from 'react'
import {
  addOneCategory,
  editOneCategory,
  removeOneCategory,
} from '../services/categoryServices'

export const useCategoriesAdd = (setCategories, setOnAdd) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleAdd = async (formData) => {
    setErrorMsg('')
    try {
      const newCategory = await addOneCategory(formData)
      setCategories((prev) => [...prev, newCategory])
      setOnAdd(false)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleAdd, errorMsg, setErrorMsg }
}

export const useCategoriesEdit = (setCategories, setOnEdit) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async (formData) => {
    setErrorMsg('')
    setIsLoading(true)

    try {
      const updatedCategory = await editOneCategory(formData)

      setCategories((prev) =>
        prev.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category,
        ),
      )

      setOnEdit(false)
      return updatedCategory // Optional: return the updated kingdom
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

export const useCategoriesDelete = (setCategories) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleDelete = async (category) => {
    setErrorMsg('')

    try {
      const id = category._id
      await removeOneCategory(id)
      setCategories((prev) => prev.filter((cat) => cat._id !== id))
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleDelete, errorMsg, setErrorMsg }
}
