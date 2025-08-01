import { Link } from 'react-router-dom'

function Navbar() {
  const navList = [
    { name: 'Home', to: '/' },
    { name: 'Quiz', to: '/quiz' },
    { name: 'Leader Board', to: '/leaderboard' },
  ]
  return (
    <nav className="hidden gap-1 text-lg font-medium tracking-wide md:flex">
      {navList.map((navItem, index) => (
        <Link key={index} to={navItem.to} className="group">
          <span className="group-active:text-primary group-hover:decoration-primary me-2 group-hover:underline last:me-0">
            {navItem.name}
          </span>
          {index !== navList.length - 1 && <span>{'>'}</span>}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
