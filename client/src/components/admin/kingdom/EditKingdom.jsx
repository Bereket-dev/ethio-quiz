import { useState } from 'react'
import { editOneKingdom } from '../../../services/kingdomServices'
import { kingdomsFormFields } from '../../../Data/kingdoms'
import EditForm from './EditForm'

function EditKingdom({ setOnEdit, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleEdit = async (formData) => {
    setIsLoading(true)
    setErrorMsg('')

    try {
      const updatedKingdom = await editOneKingdom(formData)

      if (updatedKingdom) {
        setOnEdit(false)
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

      <EditForm
        fields={kingdomsFormFields}
        onSave={handleEdit}
        onCancel={onCancel}
        onLoading={isLoading}
        setOnLoading={setIsLoading}
        icon={<CastleIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default EditKingdom
