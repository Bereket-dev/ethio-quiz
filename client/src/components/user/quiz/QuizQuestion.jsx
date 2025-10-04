import React from 'react'
import { Link } from 'react-router-dom'
import Timer from './Timer'

function QuizQuestion({
  questions,
  questionNumber,
  step,
  questionTime,
  isPaused,
  isStarted,
  selectedAnswer,
  answer,
}) {
  const question = questions[step - 1]
  const options = question.options

  return (
    <div>
      <div className="mb-4 flex justify-end pr-2">
        <Timer
          questionTime={questionTime}
          isPoused={isPaused}
          isStarted={isStarted}
        />
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl">
        <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
          <div className="text-primary font-medium">
            {`Question ${step} of ${questionNumber}`}
          </div>
          <Link to="/quiz" className="text-red-500 hover:text-red-700">
            Quit
          </Link>
        </div>

        <h3 className="mb-6 text-lg leading-snug font-semibold text-gray-800">
          <span className="text-primary me-2 font-bold">{`${step}.`}</span>
          {question.questionText}
        </h3>

        <ul className="space-y-3 text-sm text-gray-800">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = question.correctAnswer === index

            let style = {}
            if (isSelected) {
              style = isCorrect
                ? { backgroundColor: '#d1fae5', borderColor: '#10b981' }
                : { backgroundColor: '#fee2e2', borderColor: '#ef4444' }
            }

            return (
              <li
                key={index}
                onClick={() => answer(index)}
                className="cursor-pointer rounded-lg border border-gray-200 px-4 py-3 shadow-sm transition hover:bg-gray-100 hover:shadow-md"
                style={style}
              >
                <span className="text-primary mr-2 font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default QuizQuestion
