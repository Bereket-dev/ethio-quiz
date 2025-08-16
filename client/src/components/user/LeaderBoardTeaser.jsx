import level_up from '../../assets/images/level_up.png'

function LeaderBoardTeaser() {
  return (
    <div className="mx-auto mt-[100px] max-w-6xl px-14">
      <h2 className="mb-8 text-center text-2xl font-medium md:text-4xl md:tracking-wide">
        Be the top on the list
      </h2>
      <p className="mx-auto max-w-3xl text-center text-gray-400">
        limb the ranks, outsmart rivals, and claim your spot as the ultimate
        quiz champion! Every correct answer brings you closer to glory—will your
        name shine at #1?
      </p>
      <div className="mt-8 flex justify-center">
        <img src={level_up} alt="leveling up image " className="md:w-[652px]" />
      </div>
    </div>
  )
}

export default LeaderBoardTeaser
