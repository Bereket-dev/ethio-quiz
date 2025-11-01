import logInImage from '../assets/images/login_card-img.png'
import personCircle from '../assets/icons/person-circle.svg'
import LoginForm from '../components/auth/LogInForm'
import { useState } from 'react'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

function LoginPage() {
  const [view, setView] = useState('login')

  return (
    <div className="mx-auto flex h-screen w-full max-w-6xl items-center justify-center px-4 md:px-14">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 hover:shadow-xl">
        {/* Left Image */}
        <div className="hidden w-1/2 md:block">
          <img
            src={logInImage}
            alt="sign up visual"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full px-6 py-5 md:w-1/2 md:px-10 md:py-8">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={personCircle}
              alt="person avatar"
              className="h-[150px] w-[150px] rounded-full"
            />
          </div>
          {view == 'login' && <LoginForm onForgot={() => setView('forgot')} />}
          {view == 'forgot' && (
            <ForgotPasswordForm onBack={() => setView('login')} />
          )}
        </div>
      </div>
    </div>
  )
}
export default LoginPage
