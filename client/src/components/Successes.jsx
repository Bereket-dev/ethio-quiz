import SuccessCard from './SuccessCard'

import quizIcon from '../assets/icons/quiz.svg'
import gradient_levelIcon from '../assets/icons/gradient_level.svg'
import engagementIcon from '../assets/icons/engagement.svg'
import scoreIcon from '../assets/icons/score.svg'

function Successes() {
  const successList = [
    {
      image: { src: quizIcon, label: 'quiz' },
      title: 'Quiz',
      value: '400+',
      color: 'rgba(206, 221, 242, 0.7)',
    },
    {
      image: { src: gradient_levelIcon, label: 'gradient level' },
      title: 'Online Players',
      value: '50+',
      color: 'rgba(255, 171, 170, 0.53)',
    },
    {
      image: { src: engagementIcon, label: 'engagement' },
      title: 'Engagement',
      value: '60%',
      color: 'rgba(241, 215, 168, 0.4)',
    },
    {
      image: { src: scoreIcon, label: 'score' },
      title: 'Global Score',
      value: '#300',
      color: 'rgba(104, 31, 123, 0.2)',
    },
  ]
  return (
    <div className="mx-auto mt-[100px] max-w-6xl px-14">
      <h2 className="mb-8 text-center text-2xl font-medium md:text-4xl md:tracking-wide">
        Progress and Success
      </h2>
      <div className="grid w-fit grid-cols-1 gap-3 justify-self-center sm:grid-cols-2 md:grid-cols-4">
        {successList.map((success, index) => (
          <SuccessCard
            key={index}
            image={success.image}
            title={success.title}
            value={success.value}
            color={success.color}
          />
        ))}
      </div>
    </div>
  )
}

export default Successes
