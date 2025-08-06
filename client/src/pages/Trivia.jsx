import Header from '../components/Header'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import RecentActivities from '../components/RecentActivities'

import triviaImgBanner from '../assets/images/trivia.png'

import { triviaCategories } from '../Data/quizCategories'

function Trivia() {
  const bannerContent = {
    title: 'Prove You’re the Smartest in the Room!',
    description:
      'Test your wits with wild facts, pop culture gems, and mind-bending questions. Can you outsmart the quiz?',
    image: {
      src: triviaImgBanner,
      alt: 'trivia image',
      direction: 'right',
    },
  }
  return (
    <div>
      <Header />
      <Banner
        title={bannerContent.title}
        description={bannerContent.description}
        image={bannerContent.image}
      />
      <Categories title="categories" categoriesList={triviaCategories} />
      <RecentActivities kingdom="trivia" />
      <Footer />
    </div>
  )
}

export default Trivia
