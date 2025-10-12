import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddQuizForm({ kingdoms, categories }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ categoryId: '', kingdomId: '' })
  const [errorMsg, setErrorMsg] = useState('')

  const [validCategories, setValidCategories] = useState(categories)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.categoryId)
      navigate(`/categories/${formData.categoryId}/questions`)
    else setErrorMsg('Category is not selected!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    if (formData.kingdomId) {
      setValidCategories(
        categories.filter((item) => item.kingdomId == formData.kingdomId),
      )
    } else setValidCategories(categories)
  }, [formData.kingdomId, categories])

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg bg-white px-6 py-4 shadow-lg hover:shadow-2xl"
    >
      <h2 className="text-center text-xl font-medium tracking-wide">
        Select the question category and kingdom
      </h2>
      <ul className="ms-4 space-y-2">
        <li className="flex">
          <label className="text-lg font-normal">Kingdom: </label>
          <select
            onChange={handleChange}
            className="bg-primary ms-2 rounded-md px-2 py-1 text-white outline-none"
            name="kingdomId"
          >
            <option value="">select the kingdom</option>
            {kingdoms.map((kingdom) => (
              <option key={kingdom._id} value={kingdom._id}>
                {kingdom.title}
              </option>
            ))}
          </select>
        </li>
        <li className="flex">
          <label className="text-lg font-normal">Category: </label>
          <select
            onChange={handleChange}
            className="bg-primary ms-2 rounded-md px-2 py-1 text-white outline-none"
            name="categoryId"
            required
          >
            <option value="">Select the category</option>
            {validCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark flex justify-self-center rounded-md px-2 py-1 text-white shadow-md hover:shadow-lg"
      >
        + Add Quiz
      </button>

      {errorMsg && (
        <div className="mx-auto rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700 shadow-sm">
          {errorMsg}
        </div>
      )}
    </form>
  )
}

export default AddQuizForm
