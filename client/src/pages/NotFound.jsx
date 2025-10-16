import { useNavigate } from 'react-router-dom'
import { SearchX } from 'lucide-react' // optional icon

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <SearchX className="h-14 w-14 text-blue-500" />
        </div>
        <h1 className="mb-2 text-4xl font-bold text-gray-800">404</h1>
        <h2 className="mb-3 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mb-6 text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="rounded-xl bg-blue-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
