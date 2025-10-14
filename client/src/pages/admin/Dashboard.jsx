import { useState, useEffect } from 'react'
import { PlusCircle, Settings } from 'lucide-react'

import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import LineChart from '../../components/admin/charts/LineChart'
import PieChart from '../../components/admin/charts/PieChart'
import BarChart from '../../components/admin/charts/BarChart'
import QuickActions from '../../components/admin/dashboard/QuickActions'
import { getTopPlayers } from '../../services/quizResultServices'
import { lineData } from '../../Data/users'

function Dashboard() {
  const [isShrink, setIsShrink] = useState(false)
  const [players, setPlayers] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTopPlayers = async () => {
      setLoading(true)
      setErrorMsg('')

      const storedTopPlayers = JSON.parse(localStorage.getItem('topPlayers'))
      if (Array.isArray(storedTopPlayers) && storedTopPlayers.length > 0) {
        setPlayers(storedTopPlayers)
        setLoading(false)
      }

      try {
        const playersList = await getTopPlayers()
        if (Array.isArray(playersList) && playersList.length > 0) {
          setPlayers(playersList)
          localStorage.setItem(
            'topPlayers',
            JSON.stringify(playersList.slice(0, 10)),
          )
        }
      } catch (error) {
        setErrorMsg(error.message || 'Failed to load players')
      } finally {
        setLoading(false)
      }
    }
    fetchTopPlayers()
  }, [])

  const topPlayers = players.slice(0, 4)

  const quickActions = [
    {
      label: 'Add Quiz',
      icon: <PlusCircle className="h-5 w-5 text-blue-400" />,
      to: '/add-quiz',
    },
    {
      label: 'Manage Categories',
      icon: <Settings className="h-5 w-5 text-blue-400" />,
      to: '/categories',
    },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 backdrop-blur-sm">
      {/* Sidebar */}
      <SideBar isShrink={isShrink} setIsShrink={setIsShrink} />

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col overflow-auto px-6 py-6 transition-all duration-300 ease-in-out ${
          isShrink ? 'ml-28' : 'ml-32 md:ml-64'
        }`}
      >
        {/* Header */}
        <Header title="Admin Dashboard" />

        <div>
          {/* Charts Section */}
          <div className="mt-6 flex flex-col gap-5 md:flex-row">
            {/* Line Chart Card */}
            <div className="flex-1 rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  User Engagement
                </h2>
                <span className="text-sm text-gray-400">Last 30 Days</span>
              </div>
              <div className="h-52">
                <LineChart data={lineData} />
              </div>
            </div>

            {/* Pie Chart Card */}
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Question Status
                </h2>
                <span className="text-sm text-gray-400">This Week</span>
              </div>
              <div className="h-52">
                {/* <PieChart pieData={questionStatus} /> */}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Bar Chart Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700 p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <div className="h-full rounded-xl bg-white/10 p-4 text-white backdrop-blur-md">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Top Players</h2>
                  <span className="text-sm text-gray-200">Last 30 Days</span>
                </div>
                <div className="h-52">
                  <BarChart data={topPlayers} />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <QuickActions className="h-full" actions={quickActions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
