import RecentActivityCard from './RecentActivityCard'

function RecentActivities() {
  const exampleRecentList = [
    { kingdom: 'freshman', index: 0, score: { result: 23, outOf: 30 } },
    { kingdom: 'freshman', index: 1, score: { result: 3, outOf: 30 } },
    { kingdom: 'freshman', index: 2, score: { result: 13, outOf: 30 } },
    { kingdom: 'freshman', index: 3, score: { result: 29, outOf: 30 } },
  ]
  return (
    <div className="mx-auto mt-[100px] max-w-6xl px-14">
      <h2 className="mb-8 text-center text-2xl font-medium capitalize md:text-4xl md:tracking-wide">
        Recent Activity
      </h2>
      <div className="space-y-2">
        {exampleRecentList.map((activity, index) => (
          <RecentActivityCard
            key={index}
            index={activity.index}
            kingdom={activity.kingdom}
            score={activity.score}
          />
        ))}
      </div>
    </div>
  )
}

export default RecentActivities
