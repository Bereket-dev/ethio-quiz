import React from 'react'
import Navbar from './Navbar'
import logo_black from '../assets/icons/ethioquiz_logo.svg'

function Header() {
  return (
    <div className="z-10 mx-auto flex max-w-6xl items-center justify-between px-14 py-10">
      <img src={logo_black} alt="ethio quiz logo" className="" />
      <Navbar className="" />
      <div className="bg-primary rounded-lg px-3 py-2 text-[16px] font-medium tracking-wide text-white">
        SignUp
      </div>
    </div>
  )
}

export default Header
