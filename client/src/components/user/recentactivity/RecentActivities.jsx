import RecentActivityCard from './RecentActivityCard'

function RecentActivities({ recentActivities }) {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 md:px-14">
      <h2 className="mb-10 text-center text-2xl font-semibold text-gray-800 capitalize md:text-4xl md:tracking-wide">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
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
