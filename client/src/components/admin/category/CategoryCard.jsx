import { Edit, Trash2, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ category, onEdit, onDelete, index, kingdomTitle }) {
  const navigate = useNavigate()

  return (
    <div
      className={`mb-2 grid grid-cols-12 items-center gap-2 rounded-xl border px-5 py-4 text-sm shadow-sm transition duration-200 hover:scale-[1.01] hover:shadow-lg`}
      style={{
        borderBlockColor: category.color,
      }}
    >
      <div className="col-span-1 font-semibold">{index + 1}</div>
      <div className="col-span-2 font-medium">{category.title}</div>
      <div className="col-span-1">{category.points}</div>
      <div className="col-span-2">{category.timeAllowed}</div>
      <div className="col-span-4 italic">
        {`${category.description} (${kingdomTitle})`}
      </div>

      <div className="col-span-2 flex justify-end gap-2">
        <button
          onClick={() => navigate(`/categories/${category._id}/questions`)}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
          title="View Questions"
        >
          <Eye size={18} />
          <span className="font-medium">View Questions</span>
        </button>

        <div className="col-span-2 flex justify-end gap-2">
          <button
            onClick={() => onEdit()}
            className="rounded-full p-2 transition hover:bg-white/20"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(category)}
            className="rounded-full p-2 transition hover:bg-white/20"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
