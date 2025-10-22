const TOKEN_BASE_URL = `${import.meta.env.VITE_API_URL}/api/token`

export const forgotPasswordAPI = async (email) => {
  try {
    const response = await fetch(`${TOKEN_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok)
      throw new Error(data.message || 'Failed to forgot password!')

    return data
  } catch (error) {
    throw error
  }
}

export const resetPasswordAPI = async (token, newPassword) => {
  try {
    const response = await fetch(`${TOKEN_BASE_URL}/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok)
      throw new Error(data.message || 'Failed to reset password!')

    return data
  } catch (error) {
    throw error
  }
}

export const checkTokenAPI = async (token) => {
  try {
    const response = await fetch(`${TOKEN_BASE_URL}/validate/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to check token!')

    return data
  } catch (error) {
    throw error
  }
}
