import { CastleIcon } from 'lucide-react'
import { kingdomsFormFields } from '../../../Data/kingdoms'
import AddForm from './AddForm'
import kingdomSchema from '../../../validation/kingdomSchema'
import { useKingdoms } from '../../../hooks/useKingdoms'

function AddKingdom({ setKingdoms, setOnAdd, onCancel }) {
  const { handleAdd, errorMsg, setErrorMsg } = useKingdoms(
    setKingdoms,
    setOnAdd,
  )

  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-4">
      {errorMsg && (
        <div className="mb-4 w-full rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      <AddForm
        fields={kingdomsFormFields}
        onSave={handleAdd}
        onCancel={onCancel}
        formSchema={kingdomSchema}
        setMessage={setErrorMsg}
        icon={<CastleIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default AddKingdom
