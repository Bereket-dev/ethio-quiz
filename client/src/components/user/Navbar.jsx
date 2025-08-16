import { Link } from 'react-router-dom'
import { navList } from '../../Data/NavList'

function Navbar() {
  const headerNavList = navList.slice(0, 3)

  return (
    <nav className="hidden items-center gap-4 text-base font-medium tracking-wide text-gray-800 md:flex">
      {headerNavList.map((navItem, index) => (
        <div key={index} className="flex items-center gap-2">
          <Link
            to={navItem.to}
            className="hover:text-primary focus:text-primary relative transition-colors duration-200"
          >
            <span className="after:bg-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full">
              {navItem.name}
            </span>
          </Link>
          {index < headerNavList.length - 1 && (
            <span className="text-gray-400">{'>'}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Navbar
