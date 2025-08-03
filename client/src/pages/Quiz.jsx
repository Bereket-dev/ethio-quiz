import Header from '../components/Header'
import Banner from '../components/Banner'
import QuizKingdoms from '../components/QuizKingdoms'
import Footer from '../components/Footer'

import kingdomImageBanner from '../assets/images/kingdom_img.png'

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
  return (
    <div>
      <Header />
      <Banner
        title={bannerContent.title}
        description={bannerContent.description}
        image={bannerContent.image}
      />
      <QuizKingdoms title="Choose Your Kingdom" />
      <Footer />
    </div>
  )
}

export default Quiz
