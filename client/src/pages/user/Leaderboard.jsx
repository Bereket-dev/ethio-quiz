import { useState, useEffect } from 'react'
import Header from '../../components/user/Header'
import PlayerCard from '../../components/user/leaderboard/PlayerCard'
import Footer from '../../components/user/Footer'
import { getTopPlayers } from '../../services/userServices'

function Leaderboard() {
  const [players, setPlayers] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTopPlayers = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const cached = localStorage.getItem('topPlayers')
        if (cached) {
          setPlayers(JSON.parse(cached))
          setLoading(false)
        }

        const playersList = await getTopPlayers()
        if (playersList) {
          setPlayers(playersList)
          localStorage.setItem('topPlayers', players)
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
  return (
    <div>
      <Header />
      <h2 className="mt-10 text-center text-3xl font-semibold capitalize md:text-4xl md:tracking-wide">
        Leaderboard
      </h2>

      {errorMsg && (
        <div className="mx-auto mt-3 max-w-2xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm md:max-w-6xl">
          {errorMsg}
        </div>
      )}

      {/* Top 3 Players */}
      <section className="mt-12">
        <h3 className="mb-4 text-center text-xl font-medium capitalize md:text-2xl">
          🏆 Top 3 Players
        </h3>

        {/* Loading State */}
        {loading ? (
          <p className="mt-10 text-center text-gray-500 italic">
            Loading players...
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
            Other Players
          </h3>

          {/* Loading State */}
          {loading ? (
            <p className="mt-10 text-center text-gray-500 italic">
              Loading players...
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
            Your Position
          </h3>
          <ul className="mx-auto max-w-4xl">
            <PlayerCard player={currentUser} index={userRank - 1} />
          </ul>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Leaderboard
