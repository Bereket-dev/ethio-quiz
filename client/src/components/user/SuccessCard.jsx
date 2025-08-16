function SuccessCard({ image, title, value, color }) {
  return (
    <div
      className="flex h-[72px] w-[180px] items-center gap-3 rounded-xl p-3 shadow-md transition hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      <img
        src={image.src}
        alt={image.label}
        className="h-[44px] w-[44px] rounded-full object-cover shadow-sm"
      />
      <div className="flex flex-col justify-center">
        <div className="text-lg font-semibold text-black drop-shadow-sm">
          {value}
        </div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
  )
}

export default SuccessCard
