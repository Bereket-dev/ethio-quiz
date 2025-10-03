import { PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'

function QuestionForm({
  onSave,
  onCancel,
  formSchema,
  setMessage,
  categoryId,
  initialValues = null,
}) {
  const [options, setOptions] = useState(['', '', '', '']) // A, B, C, D minimum

  const addOption = () => setOptions([...options, ''])
  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index))

  return (
    <Formik
      initialValues={
        initialValues || {
          questionText: '',
          options: options,
          correctAnswer: '',
          categoryId: categoryId,
        }
      }
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setMessage(null)
        try {
          const result = await onSave(values)
          if (result) {
            resetForm()
            setOptions(['', '', '', ''])
          }
        } catch (error) {
          setMessage(error.message || 'An error occurred during saving.')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="w-full max-w-lg space-y-8 rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
          {/* Question Input */}
          <div>
            <label
              htmlFor="question"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Question
            </label>
            <Field
              as="textarea"
              id="questionText"
              name="questionText"
              placeholder="Enter your question"
              className="focus:border-primary focus:ring-primary/30 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-200 outline-none focus:bg-white focus:ring-2"
            />
            <ErrorMessage
              name="questionText"
              component="div"
              className="text-sm text-red-500"
            />
          </div>
          {/* Options */}
          <FieldArray name="options">
            {({ remove, push }) => (
              <div className="space-y-4">
                {values.options.map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Field
                      type="radio"
                      name="correctAnswer"
                      value={index.toString()}
                    />
                    <Field
                      type="text"
                      name={`options[${index}]`}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="focus:border-primary focus:ring-primary/30 flex-grow rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-200 outline-none focus:bg-white focus:ring-2"
                    />
                    {values.options.length > 2 && (
                      <button type="button" onClick={() => remove(index)}>
                        <XIcon className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow-md transition hover:scale-95"
                  onClick={() => push('')}
                >
                  <PlusIcon className="h-4 w-4" /> Add Option
                </button>
              </div>
            )}
          </FieldArray>
          <ErrorMessage
            name="options"
            component="div"
            className="text-sm text-red-500"
          />
          <ErrorMessage
            name="correctAnswer"
            component="div"
            className="text-sm text-red-500"
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCancel}
              type="button"
              className="rounded-xl border border-gray-300 px-5 py-2 text-gray-600 transition hover:bg-gray-100 hover:shadow-sm focus:scale-90"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary flex items-center gap-2 rounded-xl px-5 py-2 text-white shadow-md focus:scale-90 disabled:opacity-70 disabled:focus:scale-100"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default QuestionForm
