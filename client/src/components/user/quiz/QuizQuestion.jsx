import { Link } from 'react-router-dom'
import Timer from './Timer'

function QuizQuestion({
  questions,
  questionNumber,
  step,
  questionTime,
  isPoused,
  isStarted,
}) {
  const outOf = questionNumber
  const count = step - 1
  const question = questions[count].question
  const options = questions[count].options

  return (
    <div className="">
      {/* Timer */}
      <div className="mb-4 flex justify-end pr-2">
        <Timer
          questionTime={questionTime}
          isPoused={isPoused}
          isStarted={isStarted}
        />
      </div>

      {/* Question Card */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl">
        {/* Top Info Row */}
        <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
          <div className="text-primary font-medium">
            {`Question ${step} of ${outOf}`}
          </div>
          <Link to="/freshman">
            <button
              onClick={() => {
                isPoused === true
              }}
              className="text-red-500 transition hover:text-red-700"
            >
              Quit
            </button>
          </Link>
        </div>

        {/* Question Text */}
        <h3 className="mb-6 text-lg leading-snug font-semibold text-gray-800">
          <span className="text-primary me-2 font-bold">{`${step}.`}</span>
          {question}
        </h3>

        {/* Options */}
        <ul className="space-y-3 text-sm text-gray-800">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-lg border border-gray-200 px-4 py-3 shadow-sm transition hover:bg-gray-100 hover:shadow-md"
            >
              <span className="text-primary mr-2 font-semibold">
                {String.fromCharCode(65 + index)}.
              </span>
              {option.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default QuizQuestion
