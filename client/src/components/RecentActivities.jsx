import RecentActivityCard from './RecentActivityCard'

function RecentActivities({ kingdom }) {
  const exampleRecentList = [
    { kingdom: 'freshman', index: 0, score: { result: 23, outOf: 30 } },
    { kingdom: 'freshman', index: 1, score: { result: 3, outOf: 40 } },
    { kingdom: 'freshman', index: 2, score: { result: 13, outOf: 30 } },
    { kingdom: 'freshman', index: 3, score: { result: 29, outOf: 50 } },
    { kingdom: 'trivia', index: 0, score: { result: 23, outOf: 40 } },
    { kingdom: 'trivia', index: 1, score: { result: 3, outOf: 30 } },
    { kingdom: 'trivia', index: 2, score: { result: 13, outOf: 30 } },
    { kingdom: 'trivia', index: 3, score: { result: 29, outOf: 30 } },
  ]

  const activityList = exampleRecentList.filter(
    (activity) => activity.kingdom === kingdom,
  )

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 md:px-14">
      <h2 className="mb-10 text-center text-2xl font-semibold text-gray-800 capitalize md:text-4xl md:tracking-wide">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activityList.map((activity, index) => (
          <RecentActivityCard
            key={index}
            index={activity.index}
            kingdom={activity.kingdom}
            score={activity.score}
          />
        ))}
      </div>
    </section>
  )
}

export default RecentActivities
