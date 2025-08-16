import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import QuizBriefCard from '../../components/user/QuizBriefCard'
import QuizQuestion from '../../components/user/QuizQuestion'
import ScoreResult from '../../components/user/ScoreResult'
import { useEffect } from 'react'

// import { totalQuestions } from '../Data/totalQuestions'

function QuizFlow() {
  const [totalQuestions, setTotalQuestions] = useState(null)
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = fetch('http://localhost:5000/api/quiz', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const data = await response.json()
        if (!response.ok) {
          alert(data.message || 'Failed to get all qustions!')
          return
        }

        setTotalQuestions(data)
      } catch (error) {
        console.error('Failed to get questions!')
      }
    }

    getAllQuestions()
  }, [totalQuestions])

  const { id } = useParams()
  const questionDetail = totalQuestions.find((q) => q.id === Number(id))

  const {
    questions,
    title: questionTitle,
    points: questionPoints,
    timeAllowed: questionTime,
  } = questionDetail

  const totalSteps = questions.length

  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps + 1))
  }

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const handleStart = () => {
    setIsStarted(true)
    setIsPaused(false)
    handleNext()
  }

  const handleSubmit = () => {
    setIsStarted(false)
    setIsPaused(false)
    handleNext()
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        {/* Step 0 - Quiz Brief */}
        {step === 0 && (
          <QuizBriefCard
            questionNumber={totalSteps}
            questionPoints={questionPoints}
            questionTitle={questionTitle}
            questionTime={questionTime}
          />
        )}

        {/* Step 1 to N - Quiz Questions */}
        {step > 0 && step <= totalSteps && (
          <QuizQuestion
            questions={questions}
            questionNumber={totalSteps}
            step={step}
            questionTime={questionTime}
            isStarted={isStarted}
            isPaused={isPaused}
          />
        )}

        {/* Step N+1 - Score Result */}
        {step === totalSteps + 1 && (
          <ScoreResult score={score} outOf={totalSteps} />
        )}

        {/* Navigation Buttons */}
        <div className="mt-4 flex flex-wrap justify-between gap-4">
          {step > 0 && step <= totalSteps && (
            <button
              onClick={handlePrev}
              className="rounded-xl bg-gray-200 px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-300"
            >
              Previous
            </button>
          )}

          {step === 0 && (
            <Link to="/freshman">
              <button className="rounded-xl bg-gray-200 px-5 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-gray-300">
                Quit
              </button>
            </Link>
          )}

          {step === 0 && (
            <button
              onClick={handleStart}
              className="bg-primary hover:bg-primary-dark rounded-xl px-5 py-2 text-sm font-medium text-white shadow-md transition"
            >
              Start
            </button>
          )}

          {step > 0 && step < totalSteps && (
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-primary-dark rounded-xl px-5 py-2 text-sm font-medium text-white shadow-md transition"
            >
              Next
            </button>
          )}

          {step === totalSteps && (
            <button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary-dark rounded-xl px-5 py-2 text-sm font-medium text-white shadow-md transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizFlow
