import { useState, useEffect } from 'react'
import Header from '../../components/user/Header'
import PlayerCard from '../../components/user/leaderboard/PlayerCard'
import Footer from '../../components/user/Footer'
import { getTopPlayers } from '../../services/quizResultServices'
import { Helmet } from 'react-helmet-async'

function Leaderboard() {
  const [players, setPlayers] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTopPlayers = async () => {
      setLoading(true)
      setErrorMsg('')

      const storedTopPlayers = JSON.parse(localStorage.getItem('topPlayers'))
      if (Array.isArray(storedTopPlayers) && storedTopPlayers.length > 0) {
        setPlayers(storedTopPlayers)
        setLoading(false)
      }

      try {
        const playersList = await getTopPlayers()
        if (Array.isArray(playersList) && playersList.length > 0) {
          setPlayers(playersList)
          localStorage.setItem(
            'topPlayers',
            JSON.stringify(playersList.slice(0, 10)),
          )
        }
      } catch (error) {
        setErrorMsg(error.message || 'Failed to load players')
      } finally {
        setLoading(false)
      }
    }
    fetchTopPlayers()
  }, [])

  const top3Players = players.slice(0, 3)
  const otherPlayers = players.slice(3)

  // Placeholder for "logged-in" user (change logic with auth context later)
  const user = localStorage.getItem('user')
  const userId = user ? JSON.parse(user).id : null

  let currentUser = null
  let userRank = null

  if (players.length > 3 && userId) {
    currentUser = players.find((player) => player?.userId === userId)

    if (currentUser) {
      userRank =
        players.findIndex(
          (player) => player?.username === currentUser?.username,
        ) + 1
    }
  }

  // Dynamic structured data for top players
  const itemListElement = players.slice(0, 10).map((player, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: player.username || `Player ${index + 1}`,
    description: `Top Ethiopian university student with high quiz scores`,
    score: player.totalScore || 0,
  }))
  return (
    <>
      <Helmet>
        <title>
          Ethiopian University Freshman Leaderboard | Top Students Ranking -
          Ethio Quiz
        </title>
        <meta
          name="description"
          content="See the top Ethiopian university freshman students ranked by quiz performance. Track your academic ranking and compete with peers in course subject quizzes."
        />
        <meta
          name="keywords"
          content="Ethiopian university leaderboard, freshman ranking, top students Ethiopia, academic ranking, quiz scores Ethiopia, university student ranking, competitive students Ethiopia"
        />
        <link rel="canonical" href="https://ethioquiz.com.et/leaderboard/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Ethiopian University Freshman Leaderboard | Top Students Ranking"
        />
        <meta
          property="og:description"
          content="See top Ethiopian university freshman students ranked by quiz performance. Track your academic ranking and compete with peers."
        />
        <meta
          property="og:url"
          content="https://ethioquiz.com.et/leaderboard/"
        />
        <meta property="og:type" content="website" />

        {/* Structured Data JSON-LD for Leaderboard */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Ethiopian University Freshman Leaderboard',
            url: 'https://ethioquiz.com.et/leaderboard/',
            description:
              'Ranking of top Ethiopian university freshman students based on quiz performance in academic subjects',
            numberOfItems: players.length > 10 ? 10 : players.length,
            itemListElement: itemListElement,
            educationalLevel: 'Freshman',
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'Student',
            },
            location: {
              '@type': 'Country',
              name: 'Ethiopia',
            },
          })}
        </script>
      </Helmet>
      <div>
        <Header />
        <h2 className="mt-10 text-center text-3xl font-semibold capitalize md:text-4xl md:tracking-wide">
          Ethiopian University Freshman Leaderboard
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          See how you rank among Ethiopian university students in course subject
          quizzes
        </p>

        {errorMsg && (
          <div className="mx-auto mt-3 max-w-2xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm md:max-w-6xl">
            {errorMsg}
          </div>
        )}

        {/* Top 3 Players */}
        <section className="mt-12">
          <h3 className="mb-4 text-center text-xl font-medium capitalize md:text-2xl">
            🏆 Top 3 Students
          </h3>

          {/* Loading State */}
          {loading ? (
            <p className="mt-10 text-center text-gray-500 italic">
              Loading leaderboard...
            </p>
          ) : (
            <ul className="mx-auto max-w-4xl space-y-2">
              {top3Players.map((player, index) => (
                <PlayerCard key={player.userId} player={player} index={index} />
              ))}
            </ul>
          )}
        </section>

        {/* Other Players */}
        {players.length > 3 && (
          <section className="mt-10">
            <h3 className="mb-4 text-center text-xl font-medium capitalize md:text-2xl">
              Top Students Ranking
            </h3>

            {/* Loading State */}
            {loading ? (
              <p className="mt-10 text-center text-gray-500 italic">
                Loading leaderboard...
              </p>
            ) : (
              <ul className="mx-auto max-h-[400px] max-w-[650px] space-y-2 overflow-y-auto scroll-smooth">
                {otherPlayers.map((player, index) => (
                  <PlayerCard
                    key={player._id}
                    player={player}
                    index={index + 3} // +3 since we're skipping top 3
                  />
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Current User Position */}
        {currentUser && (
          <section className="mt-14">
            <h3 className="mb-4 text-center text-xl font-medium capitalize md:text-2xl">
              Your Ranking
            </h3>
            <ul className="mx-auto max-w-4xl">
              <PlayerCard player={currentUser} index={userRank - 1} />
            </ul>
          </section>
        )}
        <Footer />
      </div>
    </>
  )
}

export default Leaderboard
