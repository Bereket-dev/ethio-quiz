import Header from '../../components/user/Header'
import Banner from '../../components/user/Banner'
import Categories from '../../components/user/categories/Categories'
import Footer from '../../components/user/Footer'
import RecentActivities from '../../components/user/recentactivity/RecentActivities'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategoriesByKingdom } from '../../services/categoryServices'
import { ListCheckIcon } from 'lucide-react'

function QuizKingdom() {
  const location = useLocation()
  const receivedData = location.state

  const kingdomId = receivedData?.id;
 
  const bannerContent = {
    title: receivedData?.title,
    description: receivedData?.description,
    image: {
      src: receivedData?.image?.src,
      alt: receivedData?.image?.label,
      direction: 'right',
    },
  }

  const [categories, setCategories] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategoriesByKingdom = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const categoryList = await getCategoriesByKingdom(kingdomId)
        setCategories(categoryList || [])
      } catch (error) {
        setErrorMsg(error.message || 'Failed to load categories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategoriesByKingdom()
  }, [])

  return (
    <div>
      <Header />
      <Banner
        title={bannerContent.title}
        description={bannerContent.description}
        image={bannerContent.image}
      />

      {/* Error Display */}
      {errorMsg && (
        <div className="mx-auto mt-3 max-w-6xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <p className="mt-20 text-center text-gray-500 italic">
          Loading categories...
        </p>
      ) : (
        // Category
        <div>
          {categories?.length > 0 ? (
            <Categories title="categories" categoriesList={categories} />
          ) : (
            <div className="mt-20 flex flex-col items-center text-gray-500">
              <ListCheckIcon size={50} className="mb-3 opacity-60" />
              <p className="text-lg italic">No categories found</p>
            </div>
          )}
        </div>
      )}

      <RecentActivities kingdom={bannerContent.title} />
      <Footer />
    </div>
  )
}

export default QuizKingdom
