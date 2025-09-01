import { ListCheckIcon } from 'lucide-react'
import categoryFormFields from '../../../Data/fields/categoryForm'
import AddForm from '../forms/AddForm'
import categorySchema from '../../../validation/categorySchema'
import { useCategoriesAdd } from '../../../hooks/useCategories'

function AddCategory({ setCategories, setOnAdd, onCancel }) {
  const { handleAdd, errorMsg, setErrorMsg } = useCategoriesAdd(
    setCategories,
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
        fields={categoryFormFields}
        onSave={handleAdd}
        onCancel={onCancel}
        formSchema={categorySchema}
        setMessage={setErrorMsg}
        icon={<ListCheckIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default AddCategory
