import { Edit, Trash2 } from 'lucide-react'

function CategoryCard({ category, onEdit, onDelete, index, kingdomTitle }) {
  return (
    <div
      className={`border- grid grid-cols-12 items-center gap-2 rounded-xl border px-5 py-4 text-sm shadow-sm transition duration-200 hover:scale-[1.01] hover:shadow-lg`}
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
  )
}

export default CategoryCard
