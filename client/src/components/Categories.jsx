import CategoryCard from './CategoryCard'

function Categories({ title, categoriesList }) {
  const cardSize = { cardWidth: '120px', imgWidth: '56px' }
  return (
    <div className="mx-auto mt-[100px] max-w-6xl px-14">
      <h2 className="mb-8 text-center text-2xl font-medium capitalize md:text-4xl md:tracking-wide">
        {title}
      </h2>
      <div className="grid w-fit grid-cols-2 justify-items-center gap-x-10 gap-y-12 justify-self-center sm:grid-cols-3 md:grid-cols-6">
        {categoriesList.map((item, index) => (
          <CategoryCard
            key={index}
            image={item.image}
            title={item.title}
            color={item.color.lighter}
            size={cardSize}
          />
        ))}
      </div>
    </div>
  )
}

export default Categories
