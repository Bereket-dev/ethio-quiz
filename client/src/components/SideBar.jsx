import { Link } from 'react-router-dom'
import { navList } from '../Data/NavList'

function SideBar({ isOpen, onClose, id }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id={id}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="mt-16 flex flex-col gap-6 px-6 py-6">
          {navList.map((navItem, index) => (
            <Link
              key={index}
              to={navItem.to}
              className="rounded p-2 transition-colors hover:bg-gray-100"
              onClick={onClose}
            >
              {navItem.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default SideBar
