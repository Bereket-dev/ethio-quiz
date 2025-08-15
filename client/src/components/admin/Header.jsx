function Header({ title }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold text-gray-700">{title}</div>
    </div>
  )
}

export default Header
