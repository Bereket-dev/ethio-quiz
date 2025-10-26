import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function ResultScore() {
  const location = useLocation()
  const navigate = useNavigate()
  const { score, outOf, scorePoints } = location.state || {}
  const resultScore = score ? score : 0
  const resultOutOF = outOf ? outOf : 0
  const resultScorePoints = scorePoints ? scorePoints : 0
  const user = JSON.parse(localStorage.getItem('user'))?.username || ''

  return (
    <>
      <Helmet>
        <title>Ethio Quiz | Score</title>
      </Helmet>
      <div className="mt-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition hover:shadow-2xl">
          <div className="flex justify-center">
            <div className="bg-primary-light h-[250px] w-[250px] rounded-full p-4">
              <div className="bg-primary flex h-full w-full flex-col items-center justify-center gap-2 rounded-full text-3xl text-white">
                <span>Your Score</span>{' '}
                <span className="font-bold tracking-wide">{`${resultScore}/${resultOutOF}`}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            <h3 className="text-primary text-center text-lg font-semibold tracking-wide">
              Congratulation!
            </h3>
            <p className="text-primary text-md text-center">
              Greate Job{user && `, ${user}`}! You get{' '}
              <span className="font-bold">{resultScorePoints}</span> points!
            </p>
          </div>
          <div className="mt-4 px-6 text-white">
            <button
              onClick={() => navigate('/leaderboard')}
              className="bg-primary hover:bg-primary-dark mx-auto flex w-full max-w-[400px] justify-center rounded-lg px-2 py-1"
            >
              Leader Board
            </button>
            <button
              onClick={() => navigate(-3)}
              className="bg-primary hover:bg-primary-dark mx-auto mt-2 flex w-full max-w-[400px] justify-center rounded-lg px-2 py-1"
            >
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultScore
