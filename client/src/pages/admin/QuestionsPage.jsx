import React, { useState, useEffect } from 'react'
import { FileQuestionIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header'
import AddButton from '../../components/admin/AddButton'
import {
  getQuestionList,
  getQuestionsByCategory,
} from '../../services/questionServices'
import AddQuestion from '../../components/admin/question/AddQuestion'
import QuestionCard from '../../components/admin/question/QuestionCard'
import EditQuestion from '../../components/admin/question/EditQuestion'
import { useQuestionDelete } from '../../hooks/useQuestions'

function QuestionPage() {
  const [questions, setQuestions] = useState([])
  const [onAdd, setOnAdd] = useState(false)
  const [onEdit, setOnEdit] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [isShrink, setIsShrink] = useState(false)
  const [loading, setLoading] = useState(false)

  const { categoryId } = useParams()
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      setErrorMsg('')

      const timeoutId = setTimeout(() => {
        setLoading(false)
      }, 3000)

      let totalQuestions

      try {
        const storedQuestions = JSON.parse(localStorage.getItem('questions'))
        totalQuestions = storedQuestions || []

        if (totalQuestions.length === 0) {
          totalQuestions = await getQuestionList()
        }

        if (Array.isArray(totalQuestions) && totalQuestions.length > 0) {
          const filtered = totalQuestions.filter(
            (ques) => ques.categoryId === categoryId,
          )
          setQuestions(filtered)
        }

        const categoryQuestions = await getQuestionsByCategory(categoryId)
        if (categoryQuestions && categoryQuestions.length > 0)
          setQuestions(categoryQuestions)
      } catch (error) {
        setErrorMsg('Failed to load questions. Please try again.')

        const storedQuestions = JSON.parse(localStorage.getItem('questions'))
        if (Array.isArray(storedQuestions) && storedQuestions.length > 0) {
          const filtered = totalQuestions.filter(
            (ques) => ques.categoryId === categoryId,
          )
          setQuestions(filtered)
        }
      } finally {
        setLoading(false)
        clearTimeout(timeoutId)
      }
    }
    fetchQuestions()
  }, [categoryId])

  const handleCancel = () => {
    setOnAdd(false)
    setOnEdit(false)
  }

  const { handleDelete } = useQuestionDelete(setQuestions)

  const showMainList = !onAdd && !onEdit

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 backdrop-blur-sm">
      {/* Sidebar */}
      <SideBar isShrink={isShrink} setIsShrink={setIsShrink} />

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col overflow-auto px-6 py-6 transition-all duration-300 ease-in-out ${
          isShrink ? 'ml-28' : 'ml-32 md:ml-64'
        }`}
      >
        {/* Header */}
        <Header title="Questions" />

        {/* Error Display */}
        {errorMsg && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {errorMsg}
          </div>
        )}

        {/* Delete Error Display */}
        {deleteError && (
          <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
            {deleteError}
          </div>
        )}

        {/* Questions List */}
        {showMainList && (
          <div>
            {/* Add Button */}
            <div className="mt-6 flex items-center justify-end pt-4">
              <AddButton
                onAdd={() => {
                  setOnAdd(true)
                  setOnEdit(null)
                }}
                message="Add Question"
              />
            </div>
            {/* Loading State */}
            {loading ? (
              <p className="mt-20 text-center text-gray-500 italic">
                Loading questions...
              </p>
            ) : questions.length > 0 ? (
              <div
                className="mt-6 grid gap-8"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
              >
                {questions.map((question) => (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    onEdit={() => {
                      setSelectedQuestion(question)
                      setOnAdd(false) // closes the add form when editing
                      setOnEdit(true)
                    }}
                    onDelete={() => handleDelete(question._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-20 flex flex-col items-center text-gray-500">
                <FileQuestionIcon size={50} className="mb-3 opacity-60" />
                <p className="text-lg italic">No questions found</p>
              </div>
            )}
          </div>
        )}

        {/* Add New Question */}
        {onAdd && (
          <AddQuestion
            setQuestion={setQuestions}
            setOnAdd={setOnAdd}
            onCancel={handleCancel}
            categoryId={categoryId}
          />
        )}

        {/* Edit Existing Question */}
        {onEdit && selectedQuestion && (
          <EditQuestion
            previousQuestion={selectedQuestion}
            setQuestions={setQuestions}
            setOnEdit={setOnEdit}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  )
}

export default QuestionPage
