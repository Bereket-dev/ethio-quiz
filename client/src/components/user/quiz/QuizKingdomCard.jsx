import { Link } from 'react-router-dom'

function QuizKingdomCard({ image, title, description, id }) {
  const dataToPass = { image, title, description, id }
  return (
    <Link
      to={`/quizkingdom`}
      state={dataToPass}
      className="block transition-transform duration-300 hover:scale-[1.03]"
    >
      <div className="w-[270px] rounded-2xl bg-white px-6 py-6 text-black shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-300 md:w-[320px]">
        <div className="flex items-center gap-4 pb-4">
          <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <img
              src={image?.src}
              alt={image?.label || 'Quiz icon'}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
        </div>

        <p className="line-clamp-3 text-sm text-gray-700">{description}</p>
      </div>
    </Link>
  )
}

export default QuizKingdomCard
