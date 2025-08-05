import React from 'react'
import questionmark from '../assets/icons/questionmark.svg'

function QuizBriefCard({
  questionNumber,
  questionTitle,
  questionPoints,
  questionTime,
}) {
  if (!questionNumber || !questionTitle || !questionPoints || !questionTime) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-2xl text-red-500">
        Quiz data is not available.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition hover:shadow-2xl">
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">
        {questionTitle} Quiz Overview
      </h2>

      <div className="space-y-4">
        {/* Questions and Points */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">
            <img src={questionmark} alt="question icon" className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {questionNumber} Questions
            </p>
            <p className="text-sm text-gray-500">
              {questionPoints} point for each correct answer
            </p>
          </div>
        </div>

        {/* Time Allowed */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
            <img src={questionmark} alt="timer icon" className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              {questionTime.min} min {questionTime.sec} sec
            </p>
            <p className="text-sm text-gray-500">Total duration of the quiz</p>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mt-10">
        <h3 className="mb-3 text-xl font-semibold text-gray-800">
          Before You Begin
        </h3>
        <ul className="list-disc space-y-2 pl-5 text-base text-gray-600">
          <li>
            You’ll earn{' '}
            <span className="font-medium text-green-600">
              {questionPoints} points
            </span>{' '}
            for each correct answer.
          </li>
          <li>Tap on an option to select your answer.</li>
          <li>
            Click <span className="font-medium text-blue-600">Submit</span> when
            you’ve completed all questions.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default QuizBriefCard
