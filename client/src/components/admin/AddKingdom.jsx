import { useState } from 'react'
import { addOneKingdom } from '../../services/kingdomServices'
import { kingdomsAddFormFields } from '../../Data/kingdoms'
import AddForm from '../../components/admin/AddForm'
import { CastleIcon } from 'lucide-react'

function AddKingdom({ setKingdoms, setOnAdd, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleAdd = async (formData) => {
    setIsLoading(true)
    setErrorMsg('')

    try {
      const newKingdom = await addOneKingdom(formData)

      if (newKingdom) {
        setKingdoms((prev) => [...prev, newKingdom])
        setOnAdd(false)
      } else {
        setIsLoading(false)
        setErrorMsg('Failed to add kingdom. Please try again.')
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error adding kingdom:', error)
      setErrorMsg('An unexpected error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-4">
      {/* Optional Error Display */}
      {errorMsg && (
        <div className="mb-4 w-full rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      <AddForm
        fields={kingdomsAddFormFields}
        onSave={handleAdd}
        onCancel={onCancel}
        onLoading={isLoading}
        setOnLoading={setIsLoading}
        icon={<CastleIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default AddKingdom
