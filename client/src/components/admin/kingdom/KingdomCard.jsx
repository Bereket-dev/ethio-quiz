import { Link } from 'react-router-dom'
import { Edit, Trash2 } from 'lucide-react'

function KingdomCard({ kingdom, onEdit, onDelete }) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-200 hover:shadow-lg">
      {/* Kingdom Title */}
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="text-lg font-semibold text-gray-800">{kingdom.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit()}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <Edit size={18} className="text-blue-500" />
          </button>
          <button
            onClick={() => onDelete(kingdom)}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">Categories</h3>
        {/* {categories?_id === kingdom?._id ? (
          <ul className="space-y-1 space-x-1">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/categories/edit/${cat._id}`}
                className="rounded-lg bg-gray-500 px-3 py-1 text-sm text-gray-700"
                style={{ backgroundColor: cat.lightColor }}
              >
                {cat}
              </Link>
            ))}
          </ul>
        ) : ( */}
        <p className="text-sm text-gray-400 italic">No categories</p>
      </div>
    </div>
  )
}

export default KingdomCard
