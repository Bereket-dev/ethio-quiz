import { Link, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CrownIcon,
  LayoutIcon,
  SettingsIcon,
} from 'lucide-react'
import userIcon from '../../assets/icons/profile-icon.svg'

function SideBar({ isShrink, setIsShrink }) {
  const handleToggle = () => {
    setIsShrink((prev) => !prev)
  }

  const location = useLocation()
  const navList = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutIcon size={24} /> },
    { name: 'Kingdoms', to: '/kingdoms', icon: <CrownIcon size={24} /> },
    { name: 'Settings', to: '/settings', icon: <SettingsIcon size={24} /> },
  ]

  return (
    <aside
      className={`bg-primary-dark/95 fixed top-0 left-0 z-10 h-full transition-all duration-300 ease-in-out ${isShrink ? 'w-fit' : 'w-32 md:w-64'} text-white`}
    >
      <button
        onClick={handleToggle}
        className="text-primary absolute top-0 right-0 mt-6 rounded-l-xl bg-gray-50 px-4 py-2 transition-all duration-300 ease-in-out"
      >
        {isShrink ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
      </button>

      <div className="mt-20 space-y-5 px-5">
        {/* User */}
        <div className="flex flex-col items-center gap-3 rounded-full px-3 py-2">
          <img
            src={userIcon}
            alt="user icon"
            className={`${isShrink ? 'w-[50px]' : 'w-[120px]'} rounded-full`}
          />
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 text-white">
              Admin
            </div>
            {!isShrink && (
              <div className="text-md text-gray-200">example@gmail.com</div>
            )}
          </div>
        </div>

        {/*nav lists*/}
        <nav className="flex flex-col gap-3">
          {navList.map((navItem, index) => {
            const active = location.pathname === navItem.to
            return (
              <Link key={index} to={navItem.to}>
                <div
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-300 ${
                    active
                      ? 'bg-blue-500 shadow-md'
                      : 'hover:bg-blue-400 hover:shadow-md'
                  } ${isShrink ? 'justify-center' : 'justify-start'}`}
                >
                  {navItem.icon}
                  {!isShrink && (
                    <div className="text-lg font-medium tracking-wide">
                      {navItem.name}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default SideBar
