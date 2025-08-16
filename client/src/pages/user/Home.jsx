import Header from '../../components/user/Header'
import Banner from '../../components/user/Banner'
import Footer from '../../components/user/Footer'
import QuizKingdoms from '../../components/user/QuizKingdoms'
import LeaderBoardTeaser from '../../components/user/LeaderBoardTeaser'
import Successes from '../../components/user/Successes'

import cupImageBanner from '../../assets/images/cup.png'

function Home() {
  const bannerContent = {
    title: 'Daily Quiz, Daily Win!',
    description:
      'Challenge yourself with fun trivia, earn badges, and climb the leader board! Perfect for students, trivia lovers, and curious minds.',
    image: { src: cupImageBanner, alt: 'champion image', direction: 'right' },
  }
  return (
    <div>
      <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_400px_at_center_120%,_#30B2AD_0%,_#80AFFB_30%,_#BFD4FA_70%,_#FFFFFF_100%)] md:bg-[radial-gradient(circle_600px_at_center_120%,_#30B2AD_0%,_#80AFFB_30%,_#BFD4FA_70%,_#FFFFFF_100%)]">
        <Header />
        <Banner
          title={bannerContent.title}
          description={bannerContent.description}
          image={bannerContent.image}
          cta={{ to: '/quiz', text: 'Start Quiz Now ->' }}
        />
      </div>
      <QuizKingdoms title="The Quiz Kingdom" />
      <LeaderBoardTeaser />
      <Successes />
      <Footer className="mt-6" />
    </div>
  )
}

export default Home
