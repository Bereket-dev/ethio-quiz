import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ResultDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { resultData } = location.state || {}

  if (!resultData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          No result found. Please complete a quiz first.
        </p>
      </div>
    )
  }

  const { score, totalQuestions, scorePoints, resultDetails } = resultData
  const scoreData = {
    score: score ? score : 0,
    outOf: totalQuestions ? totalQuestions : 0,
    scorePoints: scorePoints ? scorePoints : 0,
  }

  useEffect(() => {})

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-green-50 to-green-100 p-6">
      {/* Result Summary Card */}
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-blue-700">
          🎯 Quiz Result
        </h1>
        <p className="mb-4 text-center text-gray-600">
          You scored{' '}
          <span className="font-semibold text-green-600">{score}</span> out of{' '}
          <span className="font-semibold">{totalQuestions}</span>
        </p>

        {/* Progress Bar */}
        <div className="mb-6 h-3 w-full rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${(score / totalQuestions) * 100}%` }}
          ></div>
        </div>

        {/* Review Section */}
        <h2 className="mb-3 border-b pb-2 text-lg font-semibold text-gray-800">
          🧠 Review Questions
        </h2>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
          {resultDetails?.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-sm"
            >
              <p className="font-medium text-gray-800">
                <span className="text-blue-600">Q{i + 1}:</span>{' '}
                {item.questionText}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-gray-700">
                  Your answer:
                </span>{' '}
                <span
                  className={
                    item.selectedAnswer === item.correctAnswer
                      ? 'font-medium text-green-600'
                      : 'font-medium text-red-500'
                  }
                >
                  {item.selectedAnswer !== null
                    ? item.selectedAnswer
                    : 'Not answered'}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Correct answer:
                </span>{' '}
                <span className="font-medium text-green-600">
                  {item.correctAnswer}
                </span>
              </p>
              {item.description && (
                <p className="mt-1 text-gray-500 italic">
                  💡 {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() =>
              navigate('/result-score', {
                state: {
                  score: scoreData.score,
                  outOf: scoreData.outOf,
                  scorePoints: scoreData.scorePoints,
                },
              })
            }
            className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultDetail
