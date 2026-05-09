import QuizKingdomCard from './QuizKingdomCard'

function QuizKingdoms({ title, kingdomList = [] }) {
  return (
    kingdomList.length > 0 && (
      <div className="mx-auto mt-14 flex h-full flex-col items-center justify-center gap-8 px-6 md:max-w-6xl md:flex-row md:justify-between md:gap-14 md:px-14">
        <div className="animate-fade-up flex flex-col items-center text-center md:block md:w-[55%] md:text-start">
          <h2 className="pb-3 text-xl leading-snug font-semibold md:text-4xl md:tracking-wide">
            {title}
          </h2>
          <div className="grid w-fit grid-cols-1 gap-x-10 gap-y-12 justify-self-center sm:grid-cols-2">
            {kingdomList.map((kingdom, index) => (
              <QuizKingdomCard
                key={index}
                image={kingdom.image}
                title={kingdom.title}
                description={kingdom.description}
                id={kingdom._id}
              />
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default QuizKingdoms
