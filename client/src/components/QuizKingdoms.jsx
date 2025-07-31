import QuizKingdomCard from '../components/QuizKingdomCard'
import freshmanIcon from '../assets/icons/freshman.svg'
import triviaIcon from '../assets/icons/trivia.svg'

function QuizKingdoms({ title }) {
  const kingdomList = [
    {
      image: { src: freshmanIcon, label: 'freshman' },
      title: 'Fresh Man',
      description:
        'Perfect for beginners! Test your basics with fun, easy questions across science, history, and pop culture. Start your quiz journey here!',
    },
    {
      image: { src: triviaIcon, label: 'trivia' },
      title: 'Trivia',
      description:
        "Random, surprising, and wildly fun! Test your knowledge of odd facts, pop culture, and 'did-you-know' moments. Perfect for casual players and fact-lovers!",
    },
  ]
  return (
    <div className="mx-auto mt-[100px] max-w-6xl px-14">
      <h2 className="mb-8 text-center text-3xl font-medium tracking-wide">
        {title}
      </h2>
      <div className="flex justify-center gap-12">
        {kingdomList.map((kingdom, index) => (
          <QuizKingdomCard
            key={index}
            image={kingdom.image}
            title={kingdom.title}
            description={kingdom.description}
          />
        ))}
      </div>
    </div>
  )
}

export default QuizKingdoms
