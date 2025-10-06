export const updateUserScore = async (userId, categoryId, score) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/update-score/${userId}/${categoryId}`,
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
