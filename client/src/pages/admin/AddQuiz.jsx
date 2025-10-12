import { useState, useEffect } from 'react'
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import AddQuizForm from '../../components/admin/forms/AddQuizForm'
import { getKingdomList } from '../../services/kingdomServices'
import { getCategoryList } from '../../services/categoryServices'

function AddQuiz() {
  const [isShrink, setIsShrink] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [categories, setCategories] = useState([])
  const [kingdoms, setKingdoms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKingdoms = async () => {
      setLoading(true)
      try {
        const kingdomList = await getKingdomList()
        setKingdoms(kingdomList || [])
      } catch (error) {
        setErrorMsg('Failed to load kingdom of category. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    const fetchCategories = async () => {
      setLoading(true)
      try {
        const categoryList = await getCategoryList()
        setCategories(categoryList || [])
      } catch (error) {
        setErrorMsg('Failed to load categories. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchKingdoms()
    fetchCategories()
  }, [])

  const chooseItems = [
    { label: 'kingdoms', options: kingdoms },
    { label: 'categories', options: categories },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SideBar isShrink={isShrink} setIsShrink={setIsShrink} />

      <main
        className={`flex flex-1 flex-col overflow-auto px-6 py-6 transition-all duration-300 ease-in-out ${
          isShrink ? 'ml-28' : 'ml-32 md:ml-64'
        }`}
      >
        <Header title="Add Quiz" />

        {/* Error Display */}
        {errorMsg && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {errorMsg}
          </div>
        )}

        {/* Choose form */}
        <div className="flex h-full w-full items-center justify-center">
          <AddQuizForm kingdoms={kingdoms} categories={categories} />
        </div>
      </main>
    </div>
  )
}

export default AddQuiz
