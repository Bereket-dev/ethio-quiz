import { useQuestionEdit } from '../../../hooks/useQuestions'
import { questionSchema } from '../../../validation/questionSchema'
import QuestionForm from './QuestionForm'

function EditQuestion({ setQuestions, previousQuestion, setOnEdit, onCancel }) {
  const { handleEdit, errorMsg, setErrorMsg } = useQuestionEdit(
    setQuestions,
    setOnEdit,
  )

  return (
    <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-4">
      {errorMsg && (
        <div className="mb-4 w-full rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}

      <QuestionForm
        onSave={handleEdit}
        onCancel={onCancel}
        formSchema={questionSchema}
        setMessage={setErrorMsg}
        categoryId={previousQuestion.categoryId}
        initialValues={previousQuestion}
      />
    </div>
  )
}

export default EditQuestion
