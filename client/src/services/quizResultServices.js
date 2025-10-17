const QUIZ_RESULT_BASE_URL = `${import.meta.env.VITE_API_URL}/api/quiz-result`

export const updateUserScore = async (userId, categoryId, score) => {
  try {
    const response = await fetch(
      `${QUIZ_RESULT_BASE_URL}/update-score/${userId}/${categoryId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: score }),
        credentials: 'include',
      },
    )
    const updatedQuizResult = await response.json()
    if (response.ok) {
      return updatedQuizResult
    } else {
      throw new Error(updatedQuizResult.error || 'Failed to update user score!')
    }
  } catch (err) {
    throw err
  }
}

export const getTopPlayers = async () => {
  try {
    const response = await fetch(`${QUIZ_RESULT_BASE_URL}/top-players`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.error || 'Failed to fetch top players!')
    }
  } catch (err) {
    throw err
  }
}

export const getRecentQuizResult = async (userId) => {
  try {
    const response = await fetch(
      `${QUIZ_RESULT_BASE_URL}/recent-activity/${userId}`,
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
      localStorage.setItem('recent-activity', JSON.stringify(data))
      return data
    } else
      throw new Error(data.error || 'Failed to get the recent quiz results')
  } catch (err) {
    throw err
  }
}

export const fetchMonthlyQuizStats = async () => {
  try {
    const response = await fetch(`${QUIZ_RESULT_BASE_URL}/monthly-stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok)
      throw new Error(data.error || 'Failed to get monthly user stats')

    return data
  } catch (err) {
    throw err
  }
}

export const fetchTopPlayersStats = async () => {
  try {
    const response = await fetch(`${QUIZ_RESULT_BASE_URL}/top-players-stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok)
      throw new Error(data.error || 'Failed to fetch top players stats')

    return data
  } catch (err) {
    throw err
  }
}
