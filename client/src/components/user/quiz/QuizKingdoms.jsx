import QuizKingdomCard from './QuizKingdomCard'
import { getKingdomList } from '../../../services/kingdomServices'
import { useEffect, useState } from 'react'

function QuizKingdoms({ title }) {
  const [kingdomList, setKingdomList] = useState([])

  useEffect(() => {
    async function fetchKingdoms() {
      const result = await getKingdomList()
      setKingdomList(result || [])
    }
    fetchKingdoms()
  }, [])

  return (
    kingdomList.length > 0 && (
      <div className="mx-auto mt-[100px] max-w-6xl px-14">
        <h2 className="mb-8 text-center text-2xl font-medium md:text-4xl md:tracking-wide">
          {title}
        </h2>
        <div className="grid w-fit grid-cols-1 gap-x-10 gap-y-12 justify-self-center sm:grid-cols-2">
          {kingdomList.map((kingdom, index) => (
            <QuizKingdomCard
              key={index}
              image={kingdom.image}
              title={kingdom.title}
              description={kingdom.description}
              to={kingdom.link}
            />
          ))}
        </div>
      </div>
    )
  )
}

export default QuizKingdoms
