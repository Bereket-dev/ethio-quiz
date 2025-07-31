function SuccessCard({ image, title, value, color }) {
  return (
    <div
      className="flex h-[69px] w-[174px] items-center gap-2 rounded-md p-2 shadow-lg shadow-white"
      style={{ backgroundColor: color }}
    >
      <img
        src={image.src}
        alt={image.label}
        className="h-[42px] w-[42px] rounded-full"
      />
      <div className="">
        <div className="text-lg font-medium tracking-wide">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
  )
}

export default SuccessCard
