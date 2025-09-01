import { useState, useEffect } from 'react'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import SearchBar from '../../components/admin/SearchBar'
import { freshmanCategories, triviaCategories } from '../../Data/quizCategories'

// import category services
// import {
//   getAllCategories,
//   addCategory,
//   updateCategory,
//   deleteCategory,
// } from '../../services/categoryServices'

function CategoriesPage() {
  const [isShrink, setIsShrink] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [categories, setCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    kingdomId: '',
    title: '',
    points: 0,
    timeAllowed: { min: 0, sec: 0 },
    image: { src: '', alt: '' },
    color: { light: '', bold: '' },
    description: '',
  })
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        setErrorMsg('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [])

  //temporary for ui
  useEffect(() => {
    const allCategories = [...freshmanCategories, ...triviaCategories]
    setCategories(allCategories)
  }, [])

  const handleAdd = async () => {
    if (!formData.title.trim())
      return setErrorMsg('Category title is required!')

    try {
      const newCategory = await addCategory(formData)
      setCategories([...categories, newCategory])
      resetForm()
    } catch (error) {
      setErrorMsg('Failed to add category')
    }
  }

  const handleEdit = async () => {
    if (!formData.title.trim())
      return setErrorMsg('Category title is required!')

    try {
      const updated = await updateCategory(selectedCategory._id, formData)
      setCategories(
        categories.map((cat) =>
          cat._id === selectedCategory._id ? updated : cat,
        ),
      )
      resetForm()
    } catch (error) {
      setErrorMsg('Failed to update category')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id)
      setCategories(categories.filter((cat) => cat._id !== id))
    } catch (error) {
      setErrorMsg('Failed to delete category')
    }
  }

  const resetForm = () => {
    setFormData({
      kingdomId: '',
      title: '',
      points: 0,
      timeAllowed: { min: 0, sec: 0 },
      image: { src: '', alt: '' },
      color: { light: '', bold: '' },
      description: '',
    })
    setSelectedCategory(null)
    setIsAdding(false)
    setIsEditing(false)
    setErrorMsg('')
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SideBar isShrink={isShrink} setIsShrink={setIsShrink} />

      <main
        className={`flex flex-1 flex-col overflow-auto px-6 py-6 transition-all duration-300 ease-in-out ${
          isShrink ? 'ml-28' : 'ml-32 md:ml-64'
        }`}
      >
        <Header title="Categories" />

        {errorMsg && (
          <div className="mx-auto mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {errorMsg}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-end justify-between pt-4">
          <button
            onClick={() => {
              setIsAdding(true)
              setIsEditing(false)
              resetForm()
            }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-white shadow-lg transition duration-300 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <PlusCircle size={22} /> Add Category
          </button>
          <SearchBar />
        </div>

        {/* Category Column List */}
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
          {categories.map((cat, index) => {
            // Helper function to pick text color based on bg brightness
            const getTextColor = (hex) => {
              if (!hex) return '#1f2937' // default gray-800
              const c = hex.substring(1) // strip #
              const rgb = parseInt(c, 16)
              const r = (rgb >> 16) & 0xff
              const g = (rgb >> 8) & 0xff
              const b = (rgb >> 0) & 0xff
              const brightness = (r * 299 + g * 587 + b * 114) / 1000
              return brightness > 150 ? '#1f2937' : '#fff' // dark text for light bg, white text for dark bg
            }

            const textColor = getTextColor(cat.color.light)

            return (
              <div
                key={index}
                className={`grid grid-cols-12 items-center gap-2 rounded-xl px-5 py-4 text-sm shadow-sm transition duration-200 hover:scale-[1.01] hover:shadow-lg`}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? cat.color.light : `${cat.color.light}CC`,
                  color: textColor,
                }}
              >
                <div className="col-span-1 font-semibold">{index + 1}</div>
                <div className="col-span-2 font-medium">{cat.title}</div>
                <div className="col-span-1">{cat.points}</div>
                <div className="col-span-2">
                  {cat.timeAllowed.min}m {cat.timeAllowed.sec}s
                </div>
                <div className="col-span-4 italic">
                  {`${cat.description} (${cat.kingdomId})`}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setSelectedCategory(cat)
                      setFormData(cat)
                    }}
                    className="rounded-full p-2 transition hover:bg-white/20"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="rounded-full p-2 transition hover:bg-white/20"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default CategoriesPage
