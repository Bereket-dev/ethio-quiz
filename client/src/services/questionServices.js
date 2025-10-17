const BASE_URL = 'http://localhost:5000'
const API_URL = `${BASE_URL}/api/questions`

export const getQuestionList = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('questions', JSON.stringify(data?.questions))
      return data.questions || []
    } else throw new Error(data.error || 'Failed to fetch questions list')
  } catch (err) {
    throw err
  }
}

export const getQuestionsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/questions/category/${categoryId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    const data = await response.json()

    if (response.ok) {
      return data || []
    } else
      throw new Error(data.error || 'Failed to fetch questions of a category')
  } catch (err) {
    throw err
  }
}

export const addOneQuestion = async (formData) => {
  const reponse = await fetch('http://localhost:5000/api/questions/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  const result = await reponse.json()

  if (!reponse.ok) {
    throw new Error(result.error || 'Failed to add question')
  }
  return result
}

export const editOneQuestion = async (formData) => {
  try {
    const id = formData._id //kingdom id
    const response = await fetch(
      `http://localhost:5000/api/questions/edit/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      },
    )

    const updatedQuestion = await response.json()
    if (response.ok) {
      return updatedQuestion
    } else {
      throw new Error(updatedQuestion.error || 'Failed to update question!')
    }
  } catch (err) {
    throw err
  }
}

export const removeOneQuestion = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/questions/remove/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    const result = await response.json()
    if (response.ok) {
      return result.message || `Question deleted successfully!`
    } else {
      throw new Error(result.error || 'Failed to delete question')
    }
  } catch (err) {
    throw err
  }
}

export const fetchQuestionStats = async () => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = response.json()
    if (!response.ok)
      throw new Error(data.error || 'Failed to fetch question stats')

    return data || []
  } catch (err) {
    throw err
  }
}
