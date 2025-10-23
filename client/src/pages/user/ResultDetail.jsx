import { useLocation } from 'react-router-dom'

const ResultDetail = () => {
  const location = useLocation()
  const { resultData } = location.state || {}

  if (!resultData) {
    return <p>No result found. Please complete a quiz first.</p>
  }

  const { score, totalQuestions, quizResult } = resultData

  return (
    <div className="p-6">
      <h1 className="mb-2 text-xl font-bold">Quiz Result</h1>
      <p>
        Score: <strong>{score}</strong> / {totalQuestions}
      </p>

      <h2 className="mt-4 font-semibold">Review:</h2>
      {quizResult?.details?.map((item, i) => (
        <div key={i} className="mt-3 border-b pb-2">
          <p>
            <strong>Q{i + 1}:</strong> {item.questionText}
          </p>
          <p>Your answer: {item.selectedOption}</p>
          <p>Correct answer: {item.correctAnswer}</p>
          <p className="text-gray-500 italic">
            Description: {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ResultDetail
