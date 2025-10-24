import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import QuizBriefCard from '../../components/user/quiz/QuizBriefCard'
import QuizQuestion from '../../components/user/quiz/QuizQuestion'
import ScoreResult from '../../components/user/score/ScoreResult'
import { getQuestionsByCategory } from '../../services/questionServices'
import { useScoreUpdate } from '../../hooks/useScore'

function QuizFlow() {
  const { categoryId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const receivedData = location.state
  const title = receivedData?.title || 'Quiz'
  const questionPoints = receivedData?.questionPoints || 1
  const timeString = receivedData?.questionTime || '15:00'

  const [questions, setQuestions] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const [minutes, seconds] = timeString.split(':').map(Number)
  const questionTime = { minutes, seconds }

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds)

  const totalSteps = questions.length

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      setErrorMsg('')

      try {
        const questionList = await getQuestionsByCategory(categoryId)
        setQuestions(questionList || [])
      } catch (error) {
        setErrorMsg(error.message || 'Failed to load questions.')
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [categoryId])

  // Timer effect
  useEffect(() => {
    let timer = null
    if (isStarted && !isPaused && timeLeft > 0 && step <= totalSteps) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0 && step < totalSteps) {
      handleNext() // Auto move to next when time ends
    }
    return () => clearInterval(timer)
  }, [isStarted, isPaused, timeLeft, step])

  const handleStart = () => {
    setIsStarted(true)
    setStep(1)
    setTimeLeft(minutes * 60 + seconds)
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      setTimeLeft(minutes * 60 + seconds)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleAnswer = (index) => {
    if (setAnswers[step] !== undefined) return
    const currentQuestion = questions[step - 1]

    setAnswers((prev) => ({
      ...prev,
      [step]: { questionId: currentQuestion._id, selectedAnswer: index },
    }))

    // Move to next after a short delay
    setTimeout(() => handleNext(), 80000)
  }

  const {
    handleScoreUpdate,
    isLoading: scoreUpdateLoading,
    errorMsg: scoreUpdateErrorMsg,
    returnData,
  } = useScoreUpdate()

  const handleSubmit = () => {
    const user = localStorage.getItem('user')
    const userId = user ? JSON.parse(user).id : navigate('/login')

    // Reset quiz state
    setIsStarted(false)
    setIsPaused(false)

    handleScoreUpdate(userId, categoryId, answers)
    setStep(0)
  }

  if (scoreUpdateLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="h-10 w-10 animate-spin text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-lg font-medium text-gray-700">
            Updating your score...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-center bg-gray-50 px-4 py-10">
      {errorMsg && (
        <div className="mx-auto mt-3 max-w-6xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      {scoreUpdateErrorMsg && (
        <div className="mx-auto mt-3 max-w-6xl rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {scoreUpdateErrorMsg}
        </div>
      )}

      {loading ? (
        <p className="mt-20 text-center text-gray-500 italic">
          Loading questions...
        </p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {step === 0 && (
            <QuizBriefCard
              questionNumber={totalSteps}
              questionPoints={questionPoints}
              questionTitle={title}
              questionTime={questionTime}
            />
          )}

          {step > 0 && step <= totalSteps && (
            <QuizQuestion
              questions={questions}
              questionNumber={totalSteps}
              step={step}
              questionTime={questionTime}
              isStarted={isStarted}
              isPaused={isPaused}
              selectedAnswer={answers[step]?.selectedAnswer}
              answer={handleAnswer}
            />
          )}

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
              <button
                onClick={() => navigate(-1)}
                className="rounded-xl bg-gray-200 px-5 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-gray-300"
              >
                Quit
              </button>
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
