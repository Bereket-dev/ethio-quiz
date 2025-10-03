import QuestionForm from './QuestionForm'
import { questionSchema } from '../../../validation/questionSchema'
import { useQuestionAdd } from '../../../hooks/useQuestions'

function AddQuestion({ setQuestion, setOnAdd, onCancel, categoryId }) {
  const { handleAdd, errorMsg, setErrorMsg } = useQuestionAdd(
    setQuestion,
    setOnAdd,
  )
  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-4">
      {errorMsg && (
        <div className="mb-4 w-full rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      <QuestionForm
        onSave={handleAdd}
        onCancel={onCancel}
        formSchema={questionSchema}
        setMessage={setErrorMsg}
        categoryId={categoryId}
      />
    </div>
  )
}

export default AddQuestion
