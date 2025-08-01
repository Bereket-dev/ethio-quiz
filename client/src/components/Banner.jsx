function Banner({ title, description, image, cta = null }) {
  return (
    <div
      className="mx-auto mt-14 flex h-full flex-col items-center justify-center gap-10 px-14 md:max-w-6xl md:flex-row md:justify-between"
      style={
        image.direction === 'left'
          ? {
              flexDirection: 'row-reverse',
            }
          : undefined
      }
    >
      <div className="flex flex-col items-center text-center md:block md:w-xl md:text-start">
        <h1 className="pb-3 text-[18px] font-bold md:text-4xl md:tracking-wider">
          {title}
        </h1>
        <p className="text-[16px] font-normal text-gray-500 md:text-xl">
          {description}
        </p>
        {cta && (
          <button className="bg-primary mt-2 rounded-lg px-3 py-2 text-[12px] font-medium tracking-wide text-white md:text-[16px]">
            {cta}
          </button>
        )}
      </div>
      <div className="">
        <img src={image.src} alt={image.alt} className="w-[316px]" />
      </div>
    </div>
  )
}

export default Banner
