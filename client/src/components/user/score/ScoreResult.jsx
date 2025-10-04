import { Link } from 'react-router-dom'

function ScoreResult({ score, outOf, points }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition hover:shadow-2xl">
      <div className="flex justify-center">
        <div className="bg-primary-light h-[250px] w-[250px] rounded-full p-4">
          <div className="bg-primary flex h-full w-full flex-col items-center justify-center gap-2 rounded-full text-3xl text-white">
            <span>Your Score</span>{' '}
            <span className="font-bold tracking-wide">{`${score}/${outOf}`}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <h3 className="text-primary text-center text-lg font-semibold tracking-wide">
          Congratulation!
        </h3>
        <p className="text-primary text-md text-center">
          Greate Job, Beki! You get{' '}
          <span className="font-bold">{score * points}</span> points!
        </p>
      </div>
      <div className="mt-4 px-6 text-white">
        <Link to={'/leaderboard'}>
          <button className="bg-primary hover:bg-primary-dark mx-auto flex w-full max-w-[400px] justify-center rounded-lg px-2 py-1">
            Leader Board
          </button>
        </Link>
        <Link to={'/quiz'}>
          <button className="bg-primary hover:bg-primary-dark mx-auto mt-2 flex w-full max-w-[400px] justify-center rounded-lg px-2 py-1">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ScoreResult
