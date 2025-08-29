import { useState } from 'react'
import { addOneKingdom } from '../services/kingdomServices'

export const useKingdoms = (setKingdoms, setOnAdd) => {
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
