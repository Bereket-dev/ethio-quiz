import React, { useState } from 'react'
import Navbar from './Navbar'
import logo_black from '../assets/icons/ethioquiz_logo.svg'
import SideBar from './SideBar'

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-14">
      <img src={logo_black} alt="ethio quiz logo" className="w-[151.9px]" />

      {/* Navbar visible only on medium and up */}
      <Navbar className="hidden md:flex" />

      {/* Signup button hidden on small screens */}
      <div className="bg-primary hidden rounded-lg px-4 py-2 text-sm font-medium text-white md:block">
        Sign Up
      </div>

      {/* Hamburger menu - visible only on small screens */}
      {isSidebarOpen ? (
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-xl font-bold"
        >
          ✕
        </button>
      ) : (
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="flex flex-col gap-1 md:hidden"
        >
          <span className="h-0.5 w-6 bg-black transition-all" />
          <span className="h-0.5 w-6 bg-black transition-all" />
          <span className="h-0.5 w-6 bg-black transition-all" />
        </button>
      )}

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} />
    </div>
  )
}

export default Header
