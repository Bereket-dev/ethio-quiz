import CategoryCard from './CategoryCard'

function Categories({ title, categoriesList }) {
  const cardSize = { cardWidth: '120px', imgWidth: '56px' }

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 md:px-14">
      <h2 className="mb-10 text-center text-2xl font-semibold tracking-wide text-gray-800 capitalize md:text-4xl">
        {title}
      </h2>

      <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] place-items-center gap-8 sm:gap-10 md:gap-12">
        {categoriesList.map((item, index) => (
          <CategoryCard
            key={index}
            image={item.image}
            title={item.title}
            color={item.color?.lighter}
            size={cardSize}
          />
        ))}
      </div>
    </section>
  )
}

export default Categories
