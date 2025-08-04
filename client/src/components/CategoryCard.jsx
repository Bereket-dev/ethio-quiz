function CategoryCard({
  image,
  title,
  color,
  size = { cardWidth: '120px', imgWidth: '56px' },
}) {
  return (
    <div style={{ width: size.cardWidth }}>
      <div
        className="flex w-full items-center justify-center rounded-lg shadow-lg"
        style={{ backgroundColor: color, height: size.cardWidth }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="rounded-full"
          style={{ width: size.imgWidth, height: size.imgWidth }}
        />
      </div>
      {title && <div className="text-md text-center capitalize">{title}</div>}
    </div>
  )
}

export default CategoryCard
