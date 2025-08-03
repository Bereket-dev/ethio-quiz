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
          <a
            href="/"
            className="rounded p-2 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            Home
          </a>
          <a
            href="/quiz"
            className="rounded p-2 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            Quiz
          </a>
          <a
            href="/trivia"
            className="rounded p-2 transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            Trivia
          </a>
        </nav>
      </div>
    </>
  )
}

export default SideBar
