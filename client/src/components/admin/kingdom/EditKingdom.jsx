import { CastleIcon } from 'lucide-react'
import kingdomFormFields from '../../../Data/fields/kingdomForm'
import EditForm from '../forms/EditForm'
import { editKingdomSchema } from '../../../validation/kingdomSchema'
import { useKingdomsEdit } from '../../../hooks/useKingdoms'

function EditKingdom({ setKingdoms, previousKingdom, setOnEdit, onCancel }) {
  const { handleEdit, errorMsg, setErrorMsg } = useKingdomsEdit(
    setKingdoms,
    setOnEdit,
  )

  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-4">
      {errorMsg && (
        <div className="mb-4 w-full rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      <EditForm
        fields={kingdomFormFields}
        onSave={handleEdit}
        onCancel={onCancel}
        formSchema={editKingdomSchema}
        setMessage={setErrorMsg}
        initialValues={previousKingdom}
        icon={<CastleIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default EditKingdom
