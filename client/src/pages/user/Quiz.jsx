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
    title: 'Enter the Quiz Kingdoms!',
    description:
      'Conquer themed realms of knowledge—from Science Citadels to History Empires. Your quest for trivia glory starts here!',
    image: {
      src: kingdomImageBanner,
      alt: 'kingdoms image',
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
  }))
  return (
    <>
      <Helmet>
        <title>Ethio-Quiz | Explore Quiz Kingdoms</title>

        <meta
          name="description"
          content="Explore all quiz kingdoms on Ethio-Quiz. Choose your favorite category and challenge yourself in science, history, culture, and more!"
        />
        <link rel="canonical" href="https://ethioquiz.com.et/quiz/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Ethio-Quiz Kingdoms',
            url: 'https://ethioquiz.com.et/quiz/',
            description:
              'Explore all quiz kingdoms on Ethio-Quiz. Challenge yourself in science, history, culture, and more!',
            itemListElement: itemList,
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
        <QuizKingdoms title="Choose Your Kingdom" kingdomList={kingdomList} />

        <Footer />
      </div>
    </>
  )
}

export default Quiz
