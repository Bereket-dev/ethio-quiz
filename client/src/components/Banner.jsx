function Banner({ title, description, image }) {
  return (
    <div
      className="mx-auto mt-14 flex h-full max-w-6xl items-center justify-between px-14"
      style={
        image.direction === 'left'
          ? {
              flexDirection: 'row-reverse',
            }
          : undefined
      }
    >
      <div className="w-xl">
        <h1 className="pb-3 text-4xl font-bold tracking-wider">{title}</h1>
        <p className="text-xl font-normal text-gray-500">{description}</p>
      </div>
      <div className="w-1/3">
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  )
}

export default Banner
