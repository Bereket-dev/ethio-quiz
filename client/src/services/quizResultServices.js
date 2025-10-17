export const updateUserScore = async (userId, categoryId, score) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/quiz-result/update-score/${userId}/${categoryId}`,
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
    const response = await fetch(
      `http://localhost:5000/api/quiz-result/top-players`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
    )
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
      `http://localhost:5000/api/quiz-result/recent-activity/${userId}`,
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
  const API_URL = 'http://localhost:5000/api'
  try {
    const response = await fetch(`${API_URL}/quiz-result/monthly-stats`, {
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
