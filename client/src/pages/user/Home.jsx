import Header from '../../components/user/Header'
import Banner from '../../components/user/Banner'
import Footer from '../../components/user/Footer'
import QuizKingdoms from '../../components/user/quiz/QuizKingdoms'
import LeaderBoardTeaser from '../../components/user/leaderboard/LeaderBoardTeaser'
import Successes from '../../components/user/score/Successes'

import cupImageBanner from '../../assets/images/cup.png'
import { Helmet } from 'react-helmet-async'

function Home() {
  const bannerContent = {
    title: 'Get Your Dream Department!',
    description:
      'Ace your freshman courses with practice quizzes. Score higher grades to qualify for competitive departments like Medicine, Engineering, and Law.',
    image: { src: cupImageBanner, alt: 'champion image', direction: 'right' },
  }
  return (
    <>
      <Helmet>
        <title>
          Ethio Quiz | Ethiopian University Freshman Course Practice &
          Department Preparation
        </title>
        <meta
          name="description"
          content="Practice quizzes for Ethiopian university freshman students. Improve your grades in freshman courses to qualify for competitive departments like Medicine, Engineering, IT, and Law."
        />
        <meta
          name="keywords"
          content="ethiopian university freshman, freshman courses Ethiopia, department qualification, university grades Ethiopia, freshman practice tests, Ethiopian university departments, competitive majors Ethiopia, academic preparation Ethiopia"
        />
        <link rel="canonical" href="https://ethioquiz.com.et/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Ethio Quiz | Ethiopian University Freshman Department Preparation"
        />
        <meta
          property="og:description"
          content="Ace your freshman courses and qualify for competitive departments. Practice quizzes for Ethiopian university students."
        />

        {/* Structured Data JSON-LD for Home */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ethio-Quiz - Ethiopian University Freshman Department Preparation",
        "url": "https://ethioquiz.com.et",
        "description": "Practice quizzes for Ethiopian university freshman students to improve grades and qualify for competitive departments",
        "inLanguage": "en",
        "keywords": "ethiopian university freshman, department qualification, freshman courses Ethiopia"
      }
    `}
        </script>
      </Helmet>
      <div>
        <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_400px_at_center_120%,_#30B2AD_0%,_#80AFFB_30%,_#BFD4FA_70%,_#FFFFFF_100%)] md:bg-[radial-gradient(circle_600px_at_center_120%,_#30B2AD_0%,_#80AFFB_30%,_#BFD4FA_70%,_#FFFFFF_100%)]">
          <Header />
          <Banner
            title={bannerContent.title}
            description={bannerContent.description}
            image={bannerContent.image}
            cta={{ to: '/quiz', text: 'Start Practicing Now ->' }}
          />
        </div>
        <QuizKingdoms title="Freshman Courses" />
        <LeaderBoardTeaser />
        <Successes />
        <Footer className="mt-6" />
      </div>
    </>
  )
}

export default Home
