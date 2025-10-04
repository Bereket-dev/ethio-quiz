export const updateUserScore = async (userId, score, quizzesTaken) => {
  const scoreData = { score, quizzesTaken }
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/update-score/${userId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreData),
      },
    )
    const updatedUserData = await response.json()
    if (response.ok) {
      return updatedUserData
    } else {
      throw new Error(updatedUserData.error || 'Failed to update user score!')
    }
  } catch (err) {
    throw err
  }
}
