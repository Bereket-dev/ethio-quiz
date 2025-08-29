import CategoryCard from './CategoryCard'
import DoughnutChart from './DoughnutChart'
import {
  freshmanCategories,
  triviaCategories,
} from '../../../Data/quizCategories'

function RecentActivityCard({ index, kingdom, score }) {
  const isFreshman = kingdom === 'freshman'
  const category = isFreshman
    ? freshmanCategories[index]
    : triviaCategories[index]

  const cardSize = { cardWidth: '80px', imgWidth: '36px' }

  return (
    <div className="mx-auto flex max-w-2xl items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-xl transition hover:shadow-2xl">
      {/* Left section: Category info */}
      <div className="flex items-center gap-4">
        <CategoryCard
          image={category.image}
          color={category.color.lighter}
          size={cardSize}
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-gray-800 capitalize">
            {category.title}
          </h4>
          <p className="text-sm text-gray-500">{score.outOf} questions</p>
        </div>
      </div>

      {/* Right section: Doughnut chart */}
      <div
        className="relative h-[75px] w-[75px] flex-shrink-0 rounded-full"
        style={{ backgroundColor: category.color.lighter }}
      >
        <DoughnutChart score={score} color={category.color} />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
          {score.result}/{score.outOf}
        </div>
      </div>
    </div>
  )
}

export default RecentActivityCard
