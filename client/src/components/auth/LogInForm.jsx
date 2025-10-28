import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import lockFill from '../../assets/icons/lock-fill.svg'
import person from '../../assets/icons/person.svg'
import { checkUser } from '../../services/authServices'
import { loginSchema } from '../../validation/userSchema'
import { Formik, Field, ErrorMessage } from 'formik'

function LoginForm({ onForgot }) {
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(null)
        try {
          const userData = await checkUser(values)

          if (userData?.role === 'admin') navigate('/dashboard')
          else navigate('/quiz')
        } catch (error) {
          setStatus(error.message || 'An error occurred during login.')
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
            <div>
              <div className="relative">
                <label htmlFor="passwordInput" className="sr-only">
                  Password
                </label>
                <Field
                  type="password"
                  id="passwordInput"
                  name="password"
                  placeholder="Password"
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
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="button"
              onClick={onForgot}
              className="flex w-full justify-end text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgotten password?
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-dark mt-4 w-full rounded-xl px-6 py-3 text-lg text-white transition disabled:opacity-70"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {/* Create Account Link */}
            <p className="mt-4 text-center text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-600 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
