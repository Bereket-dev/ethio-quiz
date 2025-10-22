import logInImage from '../assets/images/login_card-img.png'
import personCircle from '../assets/icons/person-circle.svg'
import ResetPasswordForm from '../components/auth/ResetPasswordForm'
import { useParams } from 'react-router-dom'
import { resetPasswordAPI } from '../services/tokenServices'

function ResetPassword() {
  const { token } = useParams()

  const handleReset = async (newPassword) => {
    await resetPasswordAPI(token, newPassword)
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
          <ResetPasswordForm onSubmit={handleReset} />
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
