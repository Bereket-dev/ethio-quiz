import { ListCheckIcon } from 'lucide-react'
import categoryFormFields from '../../../Data/fields/categoryForm'
import EditForm from '../forms/EditForm'
import { editCategorySchema } from '../../../validation/categorySchema'
import { useCategoriesEdit } from '../../../hooks/useCategories'

function EditCategory({
  setCategories,
  previousCategory,
  setOnEdit,
  onCancel,
  kingdoms,
}) {
  const { handleEdit, errorMsg, setErrorMsg } = useCategoriesEdit(
    setCategories,
    setOnEdit,
  )

  const kingdomOption = kingdoms.map((kingdom) => ({
    value: kingdom._id,
    title: kingdom.title,
  }))
  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-4">
      {errorMsg && (
        <div className="mb-4 w-full rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      <EditForm
        fields={categoryFormFields}
        onSave={handleEdit}
        onCancel={onCancel}
        formSchema={editCategorySchema}
        setMessage={setErrorMsg}
        initialValues={previousCategory}
        optionsValue={kingdomOption}
        icon={<ListCheckIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default EditCategory
