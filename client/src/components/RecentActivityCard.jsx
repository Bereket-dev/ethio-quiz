import CategoryCard from './CategoryCard'
import DoughnutChart from './DoughnutChart'

import { freshmanCategories, triviaCategories } from '../Data/quizCategories'

function RecentActivityCard({ index, kingdom, score }) {
  const recentImage =
    kingdom === 'freshman'
      ? freshmanCategories[index].image
      : triviaCategories[index].image
  const recentTitle =
    kingdom === 'freshman'
      ? freshmanCategories[index].title
      : triviaCategories[index].title
  const recentColor =
    kingdom === 'freshman'
      ? freshmanCategories[index].color
      : triviaCategories[index].color

  const cardSize = { cardWidth: '80px', imgWidth: '36px' }

  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between rounded-xl px-4 py-2 shadow-lg">
      <div className="flex gap-2">
        <CategoryCard
          image={recentImage}
          color={recentColor.lighter}
          size={cardSize}
        />
        <div className="flex flex-col justify-center">
          <h4 className="text-xl font-medium capitalize">{recentTitle}</h4>
          <p className="text-lg text-gray-500">30questions</p>
        </div>
      </div>
      <div
        className="relative h-[75px] w-[75px] rounded-full"
        style={{ backgroundColor: recentColor.lighter }}
      >
        <DoughnutChart score={score} color={recentColor} />
        <div className="text-md absolute top-0 left-0 flex h-[75px] w-[75px] items-center justify-center font-medium tracking-wide">
          {score.result}/{score.outOf}
        </div>
      </div>
    </div>
  )
}

export default RecentActivityCard
