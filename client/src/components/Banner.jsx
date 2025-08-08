import { Link } from 'react-router-dom'

function Banner({ title, description, image, cta }) {
  return (
    <div
      className="mx-auto mt-14 flex h-full flex-col items-center justify-center gap-8 px-6 md:max-w-6xl md:flex-row md:justify-between md:gap-14 md:px-14"
      style={
        image?.direction === 'left'
          ? { flexDirection: 'row-reverse' }
          : undefined
      }
    >
      <div className="animate-fade-up flex flex-col items-center text-center md:block md:w-[55%] md:text-start">
        <h1 className="pb-3 text-xl leading-snug font-semibold md:text-4xl md:tracking-wide">
          {title}
        </h1>
        <p className="text-base font-normal text-gray-600 md:text-lg">
          {description}
        </p>
        {cta?.to && cta?.text && (
          <Link to={cta.to}>
            {' '}
            <button className="bg-primary hover:bg-primary-dark mt-4 rounded-lg px-5 py-2 text-sm font-medium text-white transition md:text-base">
              {cta.text}
            </button>
          </Link>
        )}
      </div>
      <div className="animate-fade-up delay-100">
        <img
          src={image?.src}
          alt={image?.alt || 'Banner image'}
          className="w-[250px] object-contain md:h-[400px] md:w-auto"
        />
      </div>
    </div>
  )
}

export default Banner
