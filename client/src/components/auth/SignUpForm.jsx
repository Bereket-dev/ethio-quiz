import { Link, useNavigate } from 'react-router-dom'
import signUpImage from '../../assets/images/signup_card_img.png'
import { registerUser } from '../../services/authServices'
import { Formik, Field, ErrorMessage } from 'formik'
import { signUpSchema } from '../../validation/userSchema'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUpForm() {
  const navigate = useNavigate()
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <div className="mx-auto flex h-screen w-full max-w-6xl items-center justify-center px-4 md:px-14">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 hover:shadow-xl">
        {/* Form Section */}
        <div className="w-full px-6 py-10 md:w-1/2 md:px-10 md:py-12">
          {/* Header */}
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-semibold md:text-4xl">
              Create An Account
            </h1>
            <p className="text-md text-gray-500">
              Already have an account?{' '}
              <Link
                className="text-blue-500 hover:text-blue-600 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={signUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSuccessMsg('')
              setErrorMsg('')
              try {
                const data = await registerUser(values)
                navigate('/login')
                // setSuccessMsg(
                //   data.message ||
                //     'We have sent confirmation email! Check your spam folder!',
                // )
              } catch (error) {
                setErrorMsg(error.message || 'Failed to register user!')
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {({ isSubmitting, handleSubmit }) => {
              return (
                <form
                  className="mt-10 w-full max-w-md space-y-5"
                  onSubmit={handleSubmit}
                >
                  {/* Display API Error */}
                  {errorMsg && (
                    <div className="rounded-lg border-red-300 bg-red-50/70 px-4 py-2 text-center font-medium text-red-700 shadow-sm transition-all duration-200">
                      {errorMsg}
                    </div>
                  )}

                  {/* Display API success */}
                  {successMsg && (
                    <div className="rounded-lg border-green-300 bg-green-50/70 px-4 py-2 text-center font-medium text-green-700 shadow-sm transition-all duration-200">
                      {successMsg}
                    </div>
                  )}

                  {/* Username */}
                  <div>
                    <Field
                      type="text"
                      name="username"
                      required
                      placeholder="Username"
                      disabled={isSubmitting}
                      className="focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition outline-none focus:ring-1"
                    />
                    <ErrorMessage
                      name="username"
                      component={'div'}
                      className="text-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Field
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      disabled={isSubmitting}
                      className="focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition outline-none focus:ring-1"
                    />
                    <ErrorMessage
                      name="email"
                      component={'div'}
                      className="text-red-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Field
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      disabled={isSubmitting}
                      className="focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition outline-none focus:ring-1"
                    />
                    <ErrorMessage
                      name="password"
                      component={'div'}
                      className="text-red-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-dark mt-8 w-full rounded-xl px-6 py-3 text-lg text-white transition disabled:opacity-70"
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                  </button>
                </form>
              )
            }}
          </Formik>
        </div>

        {/* Image Section */}
        <div className="hidden w-1/2 md:block">
          <img
            src={signUpImage}
            alt="sign up"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
