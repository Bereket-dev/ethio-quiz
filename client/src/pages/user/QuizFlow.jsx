import React, { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import QuizBriefCard from '../../components/user/quiz/QuizBriefCard'
import QuizQuestion from '../../components/user/quiz/QuizQuestion'
import ScoreResult from '../../components/user/score/ScoreResult'
import { useEffect } from 'react'
import { getQuestionsByCategory } from '../../services/questionServices'

function QuizFlow() {
  const { categoryId } = useParams()
  const location = useLocation()
  const receivedData = location.state
  const title = receivedData?.title || 'Quiz'
  const questionPoints = receivedData?.questionPoints || 1
  const timeString = receivedData?.questionTime || '15:00' // default time per question in seconds
  const [questions, setQuestions] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const [minutes, seconds] = timeString.split(':').map(Number)
  const questionTime = { minutes, seconds }

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      setErrorMsg('')
      try {
        const questionList = await getQuestionsByCategory(categoryId)
        setQuestions(questionList || [])
      } catch (error) {
        setErrorMsg(
          error.message || 'Failed to load questions. Please try again.',
        )
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [categoryId])

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
      {/* Error Display */}
      {errorMsg && (
        <div className="mx-auto mt-3 max-w-6xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <p className="mt-20 text-center text-gray-500 italic">
          Loading questions...
        </p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {/* Step 0 - Quiz Brief */}
          {step === 0 && (
            <QuizBriefCard
              questionNumber={totalSteps}
              questionPoints={questionPoints}
              questionTitle={title}
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
              <Link to="/quiz">
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
      )}
    </div>
  )
}

export default QuizFlow
