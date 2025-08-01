function QuizKingdomCard({ image, title, description }) {
  return (
    <div className="w-[270px] rounded-xl bg-white px-6 py-[21px] text-black shadow-xl shadow-gray-200 md:w-[320px]">
      <div className="flex items-center pb-[19px]">
        <div className="me-[21px] flex h-[60px] w-[60px] items-center overflow-hidden rounded-full">
          <img
            src={image.src}
            alt={`${image.label} icon`}
            className="w-full object-cover object-center"
          />
        </div>

        <h3 className="text-xl font-medium tracking-wide">{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default QuizKingdomCard
