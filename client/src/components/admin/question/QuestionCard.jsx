import { Pencil, Trash2, CheckCircle2 } from 'lucide-react'

export default function QuestionCard({ question, onEdit, onDelete }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border bg-white p-4 shadow transition duration-300 hover:shadow-md">
      {/* Question Text */}
      <h3 className="mb-3 text-lg font-semibold text-gray-800">
        {question.questionText}
      </h3>

      {/* Options */}
      <ul className="space-y-2">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctAnswer
          return (
            <li
              key={index}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                isCorrect
                  ? 'border border-green-300 bg-green-50 text-green-700'
                  : 'border border-gray-200 bg-gray-50 text-gray-700'
              }`}
            >
              <span>{option}</span>
              {isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            </li>
          )
        })}
      </ul>

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm transition hover:bg-gray-100"
        >
          <Pencil className="h-4 w-4" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 rounded-lg border border-red-500 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" /> Delete
        </button>
      </div>
    </div>
  )
}
