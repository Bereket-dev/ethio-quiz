import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signUpImage from '../assets/images/signup_card_img.png'

function SignUpForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = response.json()
      if (!response.ok)
        return console.error(
          'Sign up failed!',
          data.message || 'Unknown Error!',
        )

      navigate('/login')
    } catch (err) {
      console.error('error during signup', err)
    }
  }

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
          <form
            className="mt-10 w-full max-w-md space-y-5"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition outline-none focus:ring-1"
            />

            {/* Username */}
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition outline-none focus:ring-1"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition outline-none focus:ring-1"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark mt-8 w-full rounded-xl px-6 py-3 text-lg text-white transition"
            >
              Sign Up
            </button>
          </form>
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
