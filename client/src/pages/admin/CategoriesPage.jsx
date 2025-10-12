import { useState, useEffect } from 'react'
import { ListCheckIcon } from 'lucide-react'
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import SearchBar from '../../components/admin/SearchBar'
import AddCategory from '../../components/admin/category/AddCategory'
import { getCategoryList } from '../../services/categoryServices'
import EditCategory from '../../components/admin/category/EditCategory'
import CategoryCard from '../../components/admin/category/CategoryCard'
import { useCategoriesDelete } from '../../hooks/useCategories'
import { getKingdomList } from '../../services/kingdomServices'
import AddButton from '../../components/admin/AddButton'

// Function to find kingdom title by ID
const findKingdomTitle = (kingdoms, kingdomId) => {
  const kingdom = kingdoms.find((k) => k._id === kingdomId)
  return kingdom ? kingdom.title : 'Unknown Kingdom'
}

function CategoriesPage() {
  const [isShrink, setIsShrink] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  // State and effect for kingdoms
  const [kingdoms, setKingdoms] = useState([])

  useEffect(() => {
    const fetchKingdoms = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const kingdomList = await getKingdomList()
        setKingdoms(kingdomList || [])
      } catch (error) {
        setErrorMsg('Failed to load kingdom of category. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchKingdoms()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const categoryList = await getCategoryList()
        setCategories(categoryList || [])
      } catch (error) {
        setErrorMsg('Failed to load categories. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const {
    handleDelete,
    errorMsg: deleteError,
    setErrorMsg: setDeleteError,
  } = useCategoriesDelete(setCategories)

  const handleCancel = () => {
    setIsAdding(false)
    setIsEditing(false)
  }

  const showMainList = !isAdding && !isEditing
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SideBar isShrink={isShrink} setIsShrink={setIsShrink} />

      <main
        className={`flex flex-1 flex-col overflow-auto px-6 py-6 transition-all duration-300 ease-in-out ${
          isShrink ? 'ml-28' : 'ml-32 md:ml-64'
        }`}
      >
        <Header title="Categories" />

        {/* Error Display */}
        {errorMsg && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {errorMsg}
          </div>
        )}

        {/*Delete Error Display */}
        {deleteError && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {deleteError}
          </div>
        )}

        {/* Category Column List */}
        {showMainList && (
          <div>
            {/* Actions */}
            <div className="mt-6 flex items-end justify-between pt-4">
              <AddButton
                onAdd={() => {
                  setIsAdding(true)
                  setIsEditing(false)
                }}
                message="Add Category"
              />
              <SearchBar />
            </div>

            {/* Loading State */}
            {loading ? (
              <p className="mt-20 text-center text-gray-500 italic">
                Loading categories...
              </p>
            ) : (
              // Category List
              <div>
                {categories.length > 0 ? (
                  <div className="mt-6 w-full space-y-2 overflow-auto rounded-2xl">
                    {/* Header */}
                    <div className="sticky top-0 z-10 grid grid-cols-12 bg-gray-100/80 px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur">
                      <div className="col-span-1">#</div>
                      <div className="col-span-2">Title</div>
                      <div className="col-span-1">Points</div>
                      <div className="col-span-2">Time</div>
                      <div className="col-span-4">Description</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Rows */}
                    <div className="mx-4">
                      {categories.map((category, index) => {
                        const kingdomTitle = findKingdomTitle(
                          kingdoms,
                          category.kingdomId,
                        )
                        return (
                          <CategoryCard
                            key={category._id}
                            category={category}
                            onEdit={() => {
                              setSelectedCategory(category)
                              setIsEditing(true)
                              setIsAdding(false)
                            }}
                            onDelete={handleDelete}
                            index={index}
                            kingdomTitle={kingdomTitle}
                          />
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="mt-20 flex flex-col items-center text-gray-500">
                    <ListCheckIcon size={50} className="mb-3 opacity-60" />
                    <p className="text-lg italic">No categories found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Category Form */}
        {isAdding && (
          <AddCategory
            setCategories={setCategories}
            setOnAdd={setIsAdding}
            onCancel={handleCancel}
          />
        )}

        {/* Edit Category Form */}
        {isEditing && (
          <EditCategory
            setCategories={setCategories}
            previousCategory={selectedCategory}
            setOnEdit={setIsEditing}
            onCancel={handleCancel}
            kingdoms={kingdoms}
          />
        )}
      </main>
    </div>
  )
}

export default CategoriesPage
