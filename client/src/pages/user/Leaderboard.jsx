import React from 'react'
import Header from '../../components/user/Header'
import PlayerCard from '../../components/user/leaderboard/PlayerCard'
import Footer from '../../components/user/Footer'
import { users } from '../../Data/users'

function Leaderboard() {
  const sortedPlayers = [...users].sort((a, b) => b.score - a.score)
  const top3Players = sortedPlayers.slice(0, 3)
  const otherPlayers = sortedPlayers.slice(3)

  // Placeholder for "logged-in" user (change logic with auth context later)
  const currentUser = users.find((user) => user.username === 'BekiChamp')
  const userRank =
    sortedPlayers.findIndex((user) => user.username === currentUser?.username) +
    1
  return (
    <div>
      <Header />
      <h2 className="mt-10 text-center text-3xl font-semibold capitalize md:text-4xl md:tracking-wide">
        Leaderboard
      </h2>

      {/* Top 3 Players */}
      <section className="mt-12">
        <h3 className="mb-4 text-center text-xl font-medium capitalize md:text-2xl">
          🏆 Top 3 Players
        </h3>
        <ul className="mx-auto max-w-4xl space-y-2">
          {top3Players.map((player, index) => (
            <PlayerCard key={player.id} player={player} index={index} />
          ))}
        </ul>
      </section>

      {/* Other Players */}
      <section className="mt-10">
        <h3 className="mb-4 text-center text-xl font-medium capitalize md:text-2xl">
          Other Players
        </h3>
        <ul className="mx-auto max-h-[400px] max-w-[650px] space-y-2 overflow-y-auto scroll-smooth">
          {otherPlayers.map((player, index) => (
            <PlayerCard
              key={player.id}
              player={player}
              index={index + 3} // +3 since we're skipping top 3
            />
          ))}
        </ul>
      </section>

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
