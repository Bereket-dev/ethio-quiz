function SideBar({ isOpen }) {
  return (
    <div
      className={`fixed inset-0 bottom-0 z-40 h-fit bg-gray-300/80 backdrop-blur transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="mt-16 flex flex-col gap-6 px-6 py-6 text-center text-lg">
        {/* your sidebar links */}
        <a href="/">Home</a>
        <a href="/quiz">Quiz</a>
        <a href="/trivia">Trivia</a>
      </nav>
    </div>
  )
}

export default SideBar
