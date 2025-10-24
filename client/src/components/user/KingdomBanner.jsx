import { Link } from 'react-router-dom'
import { Trophy, Crown, HelpCircle, Star } from 'lucide-react'

function KingdomBanner({ title, description, image, cta }) {
  return (
    <section className="relative mx-auto flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50 to-white px-6 py-10 shadow-md md:max-w-6xl md:flex-row md:justify-between md:gap-14 md:px-14 md:py-14">
      {/* Floating icons background */}
      <div className="pointer-events-none absolute inset-0">
        <Crown className="animate-float-slow absolute top-6 left-10 h-6 w-6 text-yellow-400 opacity-40" />
        <Trophy className="animate-float absolute bottom-8 left-16 h-6 w-6 text-amber-500 opacity-30" />
        <HelpCircle className="animate-float-delay absolute top-12 right-10 h-5 w-5 text-blue-400 opacity-30" />
        <Star className="animate-float-slow absolute right-16 bottom-10 h-5 w-5 text-indigo-400 opacity-40" />
      </div>

      {/* Text section */}
      <div
        className="z-10 flex flex-col items-center text-center md:block md:w-[55%] md:text-start"
        style={image?.direction === 'left' ? { order: 2 } : undefined}
      >
        <h1 className="pb-3 text-2xl leading-snug font-bold text-gray-800 md:text-4xl md:tracking-wide">
          {title}
        </h1>
        <p className="text-base font-normal text-gray-600 md:text-lg">
          {description}
        </p>

        {cta?.to && cta?.text && (
          <Link to={cta.to}>
            <button className="mt-5 rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow transition hover:scale-105 hover:bg-blue-700 md:text-base">
              {cta.text} ✨
            </button>
          </Link>
        )}
      </div>

      {/* Image section */}
      <div
        className={`z-10 mt-8 md:mt-0 ${image?.direction === 'left' ? 'md:order-1' : ''}`}
      >
        <div className="relative">
          <img
            src={image?.src}
            alt={image?.alt || 'Quiz kingdom banner'}
            className="w-[160px] object-contain drop-shadow-md md:h-[280px] md:w-auto"
          />
          {/* Floating crown overlay */}
          <Crown className="animate-bounce-slow absolute -top-6 -right-4 h-8 w-8 text-yellow-400" />
        </div>
      </div>
    </section>
  )
}

export default KingdomBanner
