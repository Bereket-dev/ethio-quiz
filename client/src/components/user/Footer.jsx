import { Link } from 'react-router-dom'
import logo_white from '../../assets/icons/ethioquiz_logo_white.svg'
import telegramIcon from '../../assets/icons/telegram.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import facebookIcon from '../../assets/icons/facebook.svg'
import { navList } from '../../Data/NavList'

function Footer() {
  const socialMediaList = [
    { image: telegramIcon, label: 'Telegram' },
    { image: linkedinIcon, label: 'LinkedIn' },
    { image: facebookIcon, label: 'Facebook' },
  ]

  const quickLinkList = navList

  return (
    <footer className="bg-primary mt-24 w-full text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Logo and Description */}
          <div>
            <img className="mb-4 h-10" src={logo_white} alt="Ethio Quiz Logo" />
            <h3 className="text-lg font-semibold">
              Learn Smarter, Play Harder!
            </h3>
            <p className="mt-2 max-w-xs text-sm text-gray-100">
              Free daily quizzes to sharpen your mind and climb the ranks. Join
              the fun!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">Quick Links</h2>
            <nav className="flex flex-col space-y-2 text-sm">
              {quickLinkList.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="w-fit transition hover:underline hover:opacity-90"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="mb-3 text-xl font-semibold">Follow Us</h2>
            <div className="mb-3 h-0.5 w-24 bg-white/30" />
            <div className="flex items-center gap-4">
              {socialMediaList.map((media, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={media.label}
                  className="transition hover:scale-110"
                >
                  <img
                    src={media.image}
                    alt={`${media.label} icon`}
                    className="w-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-white/20" />

        {/* Footer Bottom Text */}
        <p className="mt-4 text-center text-xs text-gray-300">
          &copy; {new Date().getFullYear()} Ethio Quiz. All rights reserved. |
          Built for trivia addicts.
        </p>
      </div>
    </footer>
  )
}

export default Footer
