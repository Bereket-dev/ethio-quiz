import { useState } from 'react'
import {
  addOneKingdom,
  editOneKingdom,
  removeOneKingdom,
} from '../services/kingdomServices'

export const useKingdomsAdd = (setKingdoms, setOnAdd) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleAdd = async (formData) => {
    setErrorMsg('')
    try {
      const newKingdom = await addOneKingdom(formData)
      setKingdoms((prev) => [...prev, newKingdom])
      setOnAdd(false)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleAdd, errorMsg, setErrorMsg }
}

export const useKingdomsEdit = (setKingdoms, setOnEdit) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async (formData) => {
    setErrorMsg('')
    setIsLoading(true)

    try {
      const updatedKingdom = await editOneKingdom(formData)

      setKingdoms((prev) =>
        prev.map((kingdom) =>
          kingdom._id === updatedKingdom._id ? updatedKingdom : kingdom,
        ),
      )

      setOnEdit(false)
      return updatedKingdom // Optional: return the updated kingdom
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

export const useKingdomsDelete = (setKingdoms) => {
  const [errorMsg, setErrorMsg] = useState('')

  const handleDelete = async (kingdom) => {
    setErrorMsg('')

    try {
      const id = kingdom._id
      await removeOneKingdom(id)
      setKingdoms((prev) => prev.filter((kin) => kin._id !== id))
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  return { handleDelete, errorMsg, setErrorMsg }
}
