import profileIcon from '../../../assets/icons/profile-icon.svg'
import gold from '../../../assets/icons/gold-medal.svg'
import silver from '../../../assets/icons/silver-medal.svg'
import bronze from '../../../assets/icons/bronze-medal.svg'

function PlayerCard({ player, index }) {
  const medalImage = [
    { id: 1, src: gold, label: 'gold medal image' },
    { id: 2, src: silver, alt: 'silver medal image' },
    { id: 3, src: bronze, alt: 'bronze medal image' },
  ]

  return (
    <li className="flex w-full items-center justify-center gap-2 px-4">
      <span className="min-w-[30px] text-center font-bold">{`${index + 1}.`}</span>
      <div className="flex w-full max-w-full justify-between rounded-xl bg-white px-4 py-2 shadow-xl transition hover:shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={player?.profileImage || profileIcon}
            alt={`${player?.username} avatar`}
            className="h-[46px] w-[46px] rounded-full object-cover"
          />
          <span className="font-medium text-gray-800">{player?.username}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-primary text-sm font-semibold">
            {player?.totalScore} pts
          </span>
          {index + 1 <= 3 && (
            <div className="flex h-[30px] w-[50px] items-start">
              <img
                src={medalImage[index].src}
                alt={medalImage[index].alt}
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default PlayerCard
