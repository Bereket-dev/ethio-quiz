import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import logo_black from '../../assets/icons/ethioquiz_logo.svg'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { checkAuth } from '../../services/authServices'

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [status, setStatus] = useState({ loading: true, isLoggedIn: false })

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  useEffect(() => {
    const fetchLogData = async () => {
      const logginData = await checkAuth()
      if (logginData && logginData.loggedIn && logginData.user) {
        localStorage.setItem('user', logginData.user)
        setStatus({ loading: false, isLoggedIn: true })
      } else setStatus({ loading: false, isLoggedIn: false })
    }
    fetchLogData()
  }, [])

  return (
    <header className="z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-14">
      <img
        src={logo_black}
        alt="Ethio Quiz logo"
        className="w-[120px] brightness-0 md:w-[150px]"
      />

      {/* Navbar visible only on medium and up */}
      <Navbar className="hidden md:flex" />

      {/* Signup or logout button hidden on small screens */}

      {status.isLoggedIn ? (
        <Link to={'/logout'}>
          {' '}
          <button className="border-primary hover:border-primary-dark text-primary hidden rounded-lg border bg-white px-4 py-2 text-sm font-medium transition-colors md:block">
            Logout
          </button>
        </Link>
      ) : (
        <Link to={'/login'}>
          {' '}
          <button className="bg-primary hover:bg-primary-dark hidden rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors md:block">
            Get Started
          </button>
        </Link>
      )}

      {/* Hamburger menu - visible only on small screens */}
      <button
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
        className="flex flex-col gap-1 md:hidden"
      >
        {isSidebarOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <>
            <span className="h-0.5 w-6 bg-black transition-all" />
            <span className="h-0.5 w-6 bg-black transition-all" />
            <span className="h-0.5 w-6 bg-black transition-all" />
          </>
        )}
      </button>

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} id="sidebar" />
    </header>
  )
}

export default Header
