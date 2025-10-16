import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react' // optional icon

function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <Lock className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">
          Unauthorized
        </h1>
        <p className="mb-6 text-gray-600">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl bg-red-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-red-600"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Unauthorized
