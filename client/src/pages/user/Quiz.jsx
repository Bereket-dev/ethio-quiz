import Header from '../../components/user/Header'
import Banner from '../../components/user/Banner'
import QuizKingdoms from '../../components/user/quiz/QuizKingdoms'
import Footer from '../../components/user/Footer'
import kingdomImageBanner from '../../assets/images/kingdom_img.png'

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
