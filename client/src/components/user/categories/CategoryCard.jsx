import { Link } from 'react-router-dom'

function CategoryCard({
  image,
  title,
  color,
  size = { cardWidth: '120px', imgWidth: '56px' },
  categoryId,
  questionPoints,
  questionTime,
}) {
  const dataToPass = { questionPoints, questionTime, title }
  return (
    <Link to={`/quizflow/${categoryId}`} state={dataToPass}>
      <div
        style={{ width: size.cardWidth }}
        className="group cursor-pointer space-y-2 text-center transition-transform duration-300 hover:scale-105"
      >
        <div
          className="flex items-center justify-center rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          style={{
            backgroundColor: color,
            height: size.cardWidth,
          }}
        >
          <img
            src={image?.src}
            alt={image?.alt || 'Category'}
            className="rounded-full object-cover"
            style={{
              width: size.imgWidth,
              height: size.imgWidth,
            }}
          />
        </div>

        {title && (
          <div className="text-sm font-medium text-gray-800 capitalize group-hover:text-black">
            {title}
          </div>
        )}
      </div>
    </Link>
  )
}

export default CategoryCard
