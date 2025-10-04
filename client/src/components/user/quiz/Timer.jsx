import React, { useEffect, useState } from 'react'
import stopwatch from '../../../assets/icons/stopwatch.svg'

function Timer({ questionTime, isPoused, isStarted }) {
  const questionSeconds = questionTime.minutes * 60 + questionTime.seconds
  const [timeLeft, setTimeLeft] = useState(questionSeconds)

  useEffect(() => {
    let interval = null

    if (isStarted && !isPoused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isStarted, isPoused, timeLeft])

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (timeLeft % 60).toString().padStart(2, '0')

  return (
    <div className="border-primary flex gap-1 rounded-2xl border-4 px-2 py-1">
      <img src={stopwatch} alt="stopwatch icon" className="w-5" />
      <span className="text-primary text-md font-semibold tracking-wider">
        {`${minutes}:${seconds}`}
      </span>
    </div>
  )
}

export default Timer
