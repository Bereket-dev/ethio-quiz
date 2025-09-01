import { useState } from 'react'
// import { addOneCategory, editOneCategory } from '../services/CategoryServices'

export const useCategoriesAdd = (setCategories, setOnAdd) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleAdd = async (formData) => {
    setErrorMsg('')
    try {
      const newKingdom = await addOneCategory(formData)
      setCategories((prev) => [...prev, newKingdom])
      setOnAdd(false)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleAdd, errorMsg, setErrorMsg }
}

export const useCategoriesEdit = (setCategories, setOnEdit) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleEdit = async (formData) => {
    setErrorMsg('')
    try {
      const updatedCategory = await editOneCategory(formData)
      setCategories((prev) => [...prev, updatedCategory])
      setOnEdit(false)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleEdit, errorMsg, setErrorMsg }
}

export const useCategoriesDelete = (setCategories) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleDelete = async (title) => {
    setErrorMsg('')

    try {
      await removeOneCategory(title)
      setCategories((prev) => prev.filter((cat) => cat.title === title))
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleDelete, errorMsg, setErrorMsg }
}
