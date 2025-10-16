import CategoryCard from '../categories/CategoryCard'
import DoughnutChart from '../charts/DoughnutChart'
import { Link } from 'react-router-dom'

function RecentActivityCard({ recentActivity, categories = [], score }) {
  const recentCategory = categories?.find(
    (cat) => cat._id === recentActivity.categoryId,
  )

  const questions = JSON.parse(localStorage.getItem('questions'))
  const categoryQuestions = questions
    ? questions.filter((que) => que?.categoryId === recentCategory?._id)
    : null
  const outOf = categoryQuestions ? categoryQuestions?.length : 0
  const cardSize = { cardWidth: '80px', imgWidth: '36px' }

  const dataToPass = {
    questionPoints: recentCategory?.points,
    questionTime: recentCategory?.timeAllowed,
    title: recentCategory?.title,
  }
  return (
    <Link to={`/quizflow/${recentCategory?._id}`} state={dataToPass}>
      {' '}
      <div className="mx-auto flex max-w-2xl items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-xl transition hover:shadow-2xl">
        {/* Left section: Category info */}
        <div className="flex items-center gap-4">
          <CategoryCard
            image={recentCategory?.image}
            color={recentCategory?.color}
            size={cardSize}
          />
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-800 capitalize">
              {recentCategory?.title}
            </h4>
            <p className="text-sm text-gray-500">{score} Points</p>
          </div>
        </div>

        {/* Right section: Doughnut chart */}
        <div
          className="relative h-[75px] w-[75px] flex-shrink-0 rounded-full"
          style={{ backgroundColor: recentCategory?.color }}
        >
          <DoughnutChart score={score} boldColor={recentCategory?.color} />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
            <div className="rounded-full bg-white/90 p-3">
              {outOf && `${score / recentCategory?.points} / ${outOf}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecentActivityCard
