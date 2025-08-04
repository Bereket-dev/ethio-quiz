import Header from '../components/Header'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import RecentActivities from '../components/RecentActivities'

import freshmanImgBanner from '../assets/images/freshman.png'

import { freshmanCategories } from '../Data/quizCategories'

function Freshman() {
  const bannerContent = {
    title: "Beginner's Sanctuary",
    description:
      'Start small, dream big! Easy quizzes, friendly competition, and quick wins to fuel your confidence.',
    image: {
      src: freshmanImgBanner,
      alt: 'freshman image',
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
      <Categories title="categories" categoriesList={freshmanCategories} />
      <RecentActivities />
      <Footer />
    </div>
  )
}

export default Freshman
