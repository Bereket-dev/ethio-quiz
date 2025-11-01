import Header from '../../components/user/Header'
import Banner from '../../components/user/Banner'
import QuizKingdoms from '../../components/user/quiz/QuizKingdoms'
import Footer from '../../components/user/Footer'
import kingdomImageBanner from '../../assets/images/kingdom_img.png'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { getKingdomList } from '../../services/kingdomServices'

function Quiz() {
  const bannerContent = {
    title: 'Freshman Course Practice Subjects',
    description:
      'Practice quizzes for all Ethiopian university freshman courses. Improve your grades in Mathematics, Physics, Chemistry, Biology, and more to qualify for competitive departments.',
    image: {
      src: kingdomImageBanner,
      alt: 'Ethiopian university freshman course subjects',
      direction: 'right',
    },
  }

  const [kingdomList, setKingdomList] = useState([])

  useEffect(() => {
    const storedKingdoms = JSON.parse(localStorage.getItem('kingdoms'))
    if (Array.isArray(storedKingdoms) && storedKingdoms.length > 0)
      setKingdomList(storedKingdoms)

    async function fetchKingdoms() {
      const result = await getKingdomList()
      if (Array.isArray(result) && result.length > 0) setKingdomList(result)
    }
    fetchKingdoms()
  }, [])

  // Create dynamic itemListElement
  const itemList = kingdomList.map((k, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: k.title,
    url: `https://ethioquiz.com.et/quiz-subjects/${k._id}`,
  }))
  return (
    <>
      <Helmet>
        <title>
          Ethiopian University Freshman Course Practice | Ethio-Quiz
        </title>

        <meta
          name="description"
          content="Practice quizzes for Ethiopian university freshman courses: Mathematics, Physics, Chemistry, Biology, English, and more. Improve your grades for department qualification."
        />
        <meta
          name="keywords"
          content="ethiopian university freshman courses, freshman mathematics practice, physics quiz Ethiopia, chemistry practice Ethiopia, biology quizzes, department qualification courses, Ethiopian university subjects"
        />
        <link rel="canonical" href="https://ethioquiz.com.et/quiz/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Ethiopian University Freshman Course Practice | Ethio-Quiz"
        />
        <meta
          property="og:description"
          content="Practice quizzes for all freshman courses to improve your grades and qualify for competitive departments."
        />
        <meta property="og:url" content="https://ethioquiz.com.et/quiz/" />

        {/* Structured Data for Course List */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Ethiopian University Freshman Course Practice',
            url: 'https://ethioquiz.com.et/quiz/',
            description:
              'Practice quizzes for Ethiopian university freshman courses to help students improve grades and qualify for desired departments',
            itemListElement: itemList,
            educationalLevel: 'Freshman',
            educationalRole: 'Student',
            country: 'Ethiopia',
          })}
        </script>
      </Helmet>
      <div>
        <Header />
        <Banner
          title={bannerContent.title}
          description={bannerContent.description}
          image={bannerContent.image}
        />
        <QuizKingdoms
          title="Choose Your Course Subject"
          kingdomList={kingdomList}
        />

        <Footer />
      </div>
    </>
  )
}

export default Quiz
