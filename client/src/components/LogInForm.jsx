import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logInImage from '../assets/images/login_card-img.png'
import personCircle from '../assets/icons/person-circle.svg'
import lockFill from '../assets/icons/lock-fill.svg'
import person from '../assets/icons/person.svg'

function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Login Failed!')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/quiz')
    } catch (error) {
      console.error('Login Error!', error)
    }
  }
  return (
    <div className="mx-auto flex h-screen w-full max-w-6xl items-center justify-center px-4 md:px-14">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 hover:shadow-xl">
        {/* Left Image */}
        <div className="hidden w-1/2 md:block">
          <img
            src={logInImage}
            alt="sign up visual"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full px-6 py-10 md:w-1/2 md:px-10 md:py-12">
          {/* Avatar */}
          <div className="my-6 flex justify-center">
            <img
              src={personCircle}
              alt="person avatar"
              className="h-[180px] w-[180px] rounded-full"
            />
          </div>

          {/* Form */}
          <form
            className="mx-auto w-full max-w-sm space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="relative">
              <label htmlFor="emailInput" className="sr-only">
                Email
              </label>
              <input
                type="text"
                id="emailInput"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                placeholder="Email"
                className="peer focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-10 py-3 text-lg transition outline-none focus:ring-1"
              />
              <img
                src={person}
                alt="person icon"
                className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-60 peer-focus:opacity-100"
              />
            </div>

            <div className="relative">
              <label htmlFor="passwordInput" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="passwordInput"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="peer focus:border-primary focus:ring-primary w-full rounded-xl border-2 border-gray-300 px-10 py-3 text-lg transition outline-none focus:ring-1"
              />
              <img
                src={lockFill}
                alt="lock icon"
                className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 opacity-60 peer-focus:opacity-100"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark mt-6 w-full rounded-xl px-6 py-3 text-lg text-white transition"
            >
              Login
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
        </div>
      </div>
    </div>
  )
}

export default LoginForm
