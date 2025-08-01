import { Link } from 'react-router-dom'
import logo_white from '../assets/icons/ethioquiz_logo_white.svg'
import telegramIcon from '../assets/icons/telegram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import facebookIcon from '../assets/icons/facebook.svg'

function Footer() {
  const socialMediaList = [
    { image: telegramIcon, label: 'telegram' },
    { image: linkedinIcon, label: 'linkedin' },
    { image: facebookIcon, label: 'facebook' },
  ]

  const quickLinkList = [
    { name: 'Home', to: '/' },
    { name: 'Quiz', to: '/quiz' },
    { name: 'Leader Board', to: '/leaderboard' },
    { name: 'Trivia', to: '/trivia' },
    { name: 'Freshman', to: '/freshman' },
  ]
  return (
    <div className="bg-primary mt-[100px] w-full text-white">
      <div className="mx-auto max-w-6xl px-14 py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="">
            <img
              className="mb-6 h-8 md:h-10"
              src={logo_white}
              alt="ethio quiz white icon"
            />
            <h3 className="text-md pb-1 font-medium md:pb-2 md:text-xl">
              Learn Smarter, Play Harder!
            </h3>
            <p className="text-md w-[250px] font-light text-white">
              Free daily quizzes to sharpen your mind and climb the ranks. Join
              the fun!
            </p>
          </div>
          <div className="">
            <h2 className="pb-1 text-lg font-medium md:pb-2 md:text-3xl md:tracking-wide">
              Quick Links
            </h2>
            <nav className="text-md flex flex-col text-gray-100">
              {quickLinkList.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="w-fit decoration-white hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="">
            <h2 className="text-lg font-medium md:pb-2 md:text-3xl md:tracking-wide">
              Follow
            </h2>
            <div className="mb-2 h-0.5 w-24 bg-white" />
            <div className="flex gap-2">
              {socialMediaList.map((media, index) => (
                <img
                  key={index}
                  src={media.image}
                  alt={`${media.label} icon`}
                  className="w-4 md:w-6"
                />
              ))}
            </div>
          </div>
        </div>
        {/* horizontal line */}
        <div className="mt-4 h-0.5 w-full bg-white" />
        <div className="md:text-md mt-2 text-xs text-gray-100">
          &copy;copy right reserved. 2024 | Proudly built for trivia addicts
        </div>
      </div>
    </div>
  )
}

export default Footer
