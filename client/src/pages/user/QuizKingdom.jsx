import Header from '../../components/user/Header'
import KingdomBanner from '../../components/user/KingdomBanner'
import Categories from '../../components/user/categories/Categories'
import Footer from '../../components/user/Footer'
import RecentActivities from '../../components/user/recentactivity/RecentActivities'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCategoriesByKingdom } from '../../services/categoryServices'
import { ListCheckIcon } from 'lucide-react'
import { getRecentQuizResult } from '../../services/quizResultServices'
import { Helmet } from 'react-helmet-async'

function QuizKingdom() {
  const [kingdom, setKingdom] = useState(null)
  const location = useLocation()
  const receivedData = location.state || null

  useEffect(() => {
    if (receivedData) setKingdom(receivedData)
  }, [receivedData])

  const { kingdomId } = useParams()

  useEffect(() => {
    if (!kingdomId) return

    if (localStorage.getItem('kingdoms')) {
      const storedKingdoms = JSON.parse(localStorage.getItem('kingdoms'))
      if (Array.isArray(storedKingdoms) && storedKingdoms.length > 0) {
        const localKingdom = storedKingdoms.find((kin) => kin._id == kingdomId)
        setKingdom(localKingdom)
        return
      }
    }

    async function fetchKingdoms() {
      const result = await getKingdomList()
      if (Array.isArray(result) && result.length > 0) {
        const fetchedKingdom = result.find((kin) => kin._id == kingdomId)
        setKingdom(fetchedKingdom)
      }
    }
    fetchKingdoms()
  }, [kingdomId])

  const bannerContent = {
    title: kingdom?.title,
    description: kingdom?.description,
    image: {
      src: kingdom?.image?.src,
      alt: kingdom?.image?.label,
      direction: 'right',
    },
  }

  const [categories, setCategories] = useState([])
  const [recentactivities, setRecentActivities] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategoriesByKingdom = async () => {
      setLoading(true)
      setErrorMsg('')

      const storedAllCategories = JSON.parse(localStorage.getItem('categories'))
      if (
        Array.isArray(storedAllCategories) &&
        storedAllCategories.length > 0
      ) {
        const filtered = storedAllCategories.filter(
          (cat) => cat.kingdomId === kingdomId,
        )
        setCategories(filtered)
        setLoading(false)
      }

      try {
        const categoryList = await getCategoriesByKingdom(kingdomId)
        if (Array.isArray(categoryList) && categoryList.length > 0)
          setCategories(categoryList)
      } catch (error) {
        setErrorMsg(error.message || 'Failed to load categories')
      } finally {
        setLoading(false)
      }
    }
    fetchCategoriesByKingdom()
  }, [kingdomId])

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        setLoading(true)
        setErrorMsg('')

        // Safely parse localStorage
        const stored = localStorage.getItem('recent-activities')
        const storedActivities = stored ? JSON.parse(stored) : []

        if (Array.isArray(storedActivities) && storedActivities.length > 0) {
          const filtered = storedActivities.filter((act) => {
            const result = categories.find((cat) => cat._id === act.categoryId)
            return result?.kingdomId === kingdomId
          })
          setRecentActivities(filtered)
        }

        const user = localStorage.getItem('user')
        const userId = user ? JSON.parse(user)?.id : null

        if (!userId) throw new Error('User not found')

        const recentActivities = await getRecentQuizResult(userId)
        if (Array.isArray(recentActivities) && recentActivities.length > 0) {
          const filtered = recentActivities.filter((act) => {
            const result = categories.find((cat) => cat._id === act.categoryId)
            return result?.kingdomId === kingdomId
          })
          setRecentActivities(filtered)
        }
      } catch (error) {
        setErrorMsg(error.message || 'Failed to load recent activities')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentActivities()
  }, [categories, kingdomId])

  // Create dynamic chapter list for structured data
  const itemList = categories.map((c, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: c.title,
    description: c.description || `Practice questions for ${c.title} chapter`,
    url: `https://ethioquiz.com.et/quizflow/${c._id}`,
  }))

  return (
    <>
      <Helmet>
        <title>
          {bannerContent.title
            ? `${bannerContent.title} Chapters & Practice Questions | Ethio Quiz`
            : 'Course Chapters | Ethio Quiz'}
        </title>
        <meta
          name="description"
          content={`Practice ${bannerContent.title} chapters with quizzes. ${bannerContent.description || 'Master each chapter to improve your grades and qualify for competitive departments.'}`}
        />
        <meta
          name="keywords"
          content={`${bannerContent.title} chapters, ${bannerContent.title} practice questions, Ethiopian university ${bannerContent.title}, freshman ${bannerContent.title} quizzes, chapter by chapter practice`}
        />
        <link
          rel="canonical"
          href={`https://ethioquiz.com.et/quiz-subjects/${kingdomId}`}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${bannerContent.title} Chapters & Practice Questions | Ethio Quiz`}
        />
        <meta
          property="og:description"
          content={`Practice ${bannerContent.title} chapters with quizzes for Ethiopian university freshman students`}
        />
        <meta
          property="og:url"
          content={`https://ethioquiz.com.et/quiz-subjects/${kingdomId}`}
        />
        {/* Structured Data for Course Chapters */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: bannerContent.title,
            description:
              bannerContent.description ||
              `Practice chapters for ${bannerContent.title} course`,
            courseCode: bannerContent.title,
            educationalLevel: 'Freshman',
            provider: {
              '@type': 'Organization',
              name: 'Ethio Quiz',
              url: 'https://ethioquiz.com.et',
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'self-paced',
              location: {
                '@type': 'Country',
                name: 'Ethiopia',
              },
            },
            about: {
              '@type': 'ItemList',
              name: `${bannerContent.title} Chapters`,
              numberOfItems: categories.length,
              itemListElement: itemList,
            },
          })}
        </script>
      </Helmet>
      <div>
        <Header />
        <KingdomBanner
          title={bannerContent.title}
          description={bannerContent.description}
          image={bannerContent.image}
        />

        {/* Error Display */}
        {errorMsg && categories.length != 0 && (
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

        {recentactivities &&
          categories &&
          categories.length > 0 &&
          recentactivities.length > 0 && (
            <RecentActivities
              recentActivities={recentactivities}
              categories={categories}
            />
          )}
        <Footer />
      </div>
    </>
  )
}

export default QuizKingdom
