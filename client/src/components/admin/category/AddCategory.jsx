import { ListCheckIcon } from 'lucide-react'
import categoryFormFields from '../../../Data/fields/categoryForm'
import AddForm from '../forms/AddForm'
import { addCategorySchema } from '../../../validation/categorySchema'
import { useCategoriesAdd } from '../../../hooks/useCategories'
import { getKingdomList } from '../../../services/kingdomServices'
import { useState, useEffect } from 'react'

function AddCategory({ setCategories, setOnAdd, onCancel }) {
  const { handleAdd, errorMsg, setErrorMsg } = useCategoriesAdd(
    setCategories,
    setOnAdd,
  )

  const [kingdoms, setKingdoms] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchKingdoms = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const kingdomList = await getKingdomList()
        setKingdoms(kingdomList || [])
      } catch (error) {
        setErrorMsg('Failed to load kingdoms. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchKingdoms()
  }, [])

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

      <AddForm
        fields={categoryFormFields}
        onSave={handleAdd}
        onCancel={onCancel}
        formSchema={addCategorySchema}
        setMessage={setErrorMsg}
        optionsValue={kingdomOption}
        icon={<ListCheckIcon size={48} className="text-white" />}
      />
    </div>
  )
}

export default AddCategory
