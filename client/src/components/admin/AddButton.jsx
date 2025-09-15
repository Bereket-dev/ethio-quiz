import { PlusCircle } from 'lucide-react'

function AddButton({ onAdd, message = 'Add Item' }) {
  return (
    <button
      onClick={() => onAdd()}
      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-white shadow-lg transition duration-300 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
    >
      <PlusCircle size={22} /> {message}
    </button>
  )
}

export default AddButton
