import { useState, useEffect } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import person from '../../assets/icons/person.svg'
import { emailSchema } from '../../validation/resetPasswordSchema'
import { forgotPasswordAPI } from '../../services/tokenServices'

function ForgotPasswordForm({ onSubmit, onBack }) {
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={emailSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setErrorMsg('')
        setSuccessMsg('')
        try {
          const data = await forgotPasswordAPI(values.email)
          setSuccessMsg(data.message || 'Email has been sent!')
        } catch (error) {
          setErrorMsg(error.message || 'An error occurred during reset.')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => {
        useEffect(() => {
          if (errorMsg || successMsg) {
            const timer = setTimeout(() => {
              setSuccessMsg('')
              setErrorMsg('')
            }, 5000)
            return () => clearTimeout(timer)
          }
        }, [successMsg, errorMsg])

        return (
          <form
            className="mx-auto w-full max-w-sm space-y-5"
            onSubmit={handleSubmit}
            method="POST"
          >
            {/* Display API Error */}
            {errorMsg && (
              <div className="rounded-lg border-red-300 bg-red-50/70 px-4 py-2 text-center font-medium text-red-700 shadow-sm transition-all duration-200">
                {errorMsg}
              </div>
            )}
            {/* Display API Success */}
            {successMsg && (
              <div className="rounded-lg border-green-300 bg-green-50/70 px-4 py-2 text-center font-medium text-green-700 shadow-sm transition-all duration-200">
                {successMsg}
              </div>
            )}
            <div>
              {' '}
              <div className="relative">
                <label htmlFor="emailInput" className="sr-only">
                  Email
                </label>
                <Field
                  type="email"
                  id="emailInput"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isSubmitting}
                  className="peer focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-10 py-3 text-lg transition outline-none focus:ring-1"
                />
                <img
                  src={person}
                  alt="person icon"
                  className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-60 peer-focus:opacity-100"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="button"
              onClick={onBack}
              className="flex w-full justify-end text-blue-600 hover:text-blue-700 hover:underline"
            >
              back?
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-dark mt-4 w-full rounded-xl px-6 py-3 text-lg text-white transition disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        )
      }}
    </Formik>
  )
}

export default ForgotPasswordForm
