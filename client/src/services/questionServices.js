const QUESTION_BASE_URL = `${import.meta.env.VITE_API_URL}/api/questions`

export const getQuestionList = async () => {
  try {
    const response = await fetch(`${QUESTION_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (response.ok) {
      return data.questions || []
    } else throw new Error(data.error || 'Failed to fetch questions list')
  } catch (err) {
    throw err
  }
}

export const getQuestionsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${QUESTION_BASE_URL}/category/${categoryId}`,
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
  const reponse = await fetch(`${QUESTION_BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include',
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
    const response = await fetch(`${QUESTION_BASE_URL}/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    })

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
    const response = await fetch(`${QUESTION_BASE_URL}/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

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
    const response = await fetch(`${QUESTION_BASE_URL}/stats`, {
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
