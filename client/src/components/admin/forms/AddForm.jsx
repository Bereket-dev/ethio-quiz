import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'

function AddForm({
  icon,
  fields,
  onCancel,
  onSave,
  formSchema,
  setMessage,
  optionsValue,
}) {
  const [previewImg, setPreviewImg] = useState(null)

  return (
    <Formik
      initialValues={fields.reduce(
        (acc, f) => ({ ...acc, [f.name]: f.type === 'color' ? '#000000' : '' }),
        {
          img_icon: null,
        },
      )}
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setMessage(null)
        try {
          const result = await onSave(values)
          if (result) {
            resetForm()
            setPreviewImg(null)
          }
        } catch (error) {
          setMessage(error.message || 'An error occurred during saving.')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form
          encType="multipart/form-data"
          className="w-full max-w-lg space-y-8 rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative h-[120px] w-[120px] rounded-full bg-gray-50 p-1 shadow-inner">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-400 text-4xl text-gray-700">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="preview"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  icon
                )}
              </div>
              <label
                htmlFor="imageInput"
                className="bg-primary absolute right-2 bottom-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg"
              >
                <PlusIcon className="h-5 w-5 focus:scale-90" />
              </label>
              <input
                id="imageInput"
                name="img_icon"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.currentTarget.files[0]
                  setFieldValue('img_icon', file)
                  if (file) setPreviewImg(URL.createObjectURL(file))
                }}
              />
            </div>
          </div>
          <ErrorMessage
            name="img_icon"
            component="div"
            className="text-center text-sm text-red-500"
          />

          {/* Dynamic Fields */}
          {fields?.map((field, index) => (
            <div
              key={index}
              className={fields.length <= 3 ? 'space-y-4' : 'space-y-2'}
            >
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {field.label || 'Field'}
              </label>
              {field.type === 'select' ? (
                optionsValue && (
                  <Field
                    as="select"
                    type={field.type || 'text'}
                    name={field.name}
                    placeholder={field.placeholder || ''}
                    className="focus:border-primary focus:ring-primary/30 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-200 outline-none focus:bg-white focus:ring-2"
                  >
                    {' '}
                    <option value="">Select {field.label}</option>
                    {optionsValue.map((option, optionIndex) => (
                      <option key={optionIndex} value={option.value}>
                        {option.title || `option ${optionIndex + 1}`}
                      </option>
                    ))}
                  </Field>
                )
              ) : (
                <Field
                  as={field.type === 'textarea' ? 'textarea' : 'input'}
                  type={field.type || 'text'}
                  name={field.name}
                  {...(field.step ? { step: field.step } : {})}
                  {...(field.min ? { min: field.min } : {})}
                  {...(field.max ? { max: field.max } : {})}
                  placeholder={field.placeholder || ''}
                  className="focus:border-primary focus:ring-primary/30 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 transition-all duration-200 outline-none focus:bg-white focus:ring-2"
                />
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-sm text-red-500"
              />
            </div>
          ))}

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
              {isSubmitting ? (
                <>
                  {' '}
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddForm
