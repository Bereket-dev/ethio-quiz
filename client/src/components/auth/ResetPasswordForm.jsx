import { useState, useEffect } from 'react'
import { passwordSchema } from '../../validation/resetPasswordSchema'

function ResetPasswordForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ newPassword: '', confirmPassword: '' }}
      validationSchema={passwordSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(null)
        try {
          await onSubmit(values.newPassword)
          navigate('login')
        } catch (error) {
          setStatus(error.message || 'An error occurred during reset.')
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, status, setStatus, handleSubmit }) => {
        useEffect(() => {
          if (status) {
            const timer = setTimeout(() => setStatus(null), 5000)
            return () => clearTimeout(timer)
          }
        }, [status, setStatus])

        return (
          <form
            className="mx-auto w-full max-w-sm space-y-5"
            onSubmit={handleSubmit}
            method="POST"
          >
            {/* Display API Error */}
            {status && (
              <div className="rounded-lg border-red-300 bg-red-50/70 px-4 py-2 text-center font-medium text-red-700 shadow-sm transition-all duration-200">
                {status}
              </div>
            )}

            <div>
              <div className="relative">
                <label htmlFor="newPasswordInput" className="sr-only">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPasswordInput"
                  name="newPassword"
                  placeholder="New Password"
                  required
                  disabled={false || isSubmitting}
                  className="peer focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-10 py-3 text-lg transition outline-none focus:ring-1"
                />
                <img
                  src={lockFill}
                  alt="lock icon"
                  className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-60 peer-focus:opacity-100"
                />
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <div className="relative">
                <label htmlFor="confirmPasswordInput" className="sr-only">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPasswordInput"
                  name="confirmPassword"
                  placeholder="confirm Password"
                  required
                  disabled={false || isSubmitting}
                  className="peer focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-10 py-3 text-lg transition outline-none focus:ring-1"
                />
                <img
                  src={lockFill}
                  alt="lock icon"
                  className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-60 peer-focus:opacity-100"
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-dark mt-4 w-full rounded-xl px-6 py-3 text-lg text-white transition disabled:opacity-70"
            >
              {isSubmitting ? 'Updating...' : 'Submit'}
            </button>
          </form>
        )
      }}
    </Formik>
  )
}

export default ResetPasswordForm
