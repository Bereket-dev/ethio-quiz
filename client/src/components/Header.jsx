import React, { useState } from 'react'
import Navbar from './Navbar'
import logo_black from '../assets/icons/ethioquiz_logo.svg'
import SideBar from './SideBar'

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <header className="z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-14">
      <img
        src={logo_black}
        alt="Ethio Quiz logo"
        className="w-[120px] brightness-0 md:w-[150px]"
      />

      {/* Navbar visible only on medium and up */}
      <Navbar className="hidden md:flex" />

      {/* Signup button hidden on small screens */}
      <button className="bg-primary hover:bg-primary-dark hidden rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors md:block">
        Sign Up
      </button>

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
