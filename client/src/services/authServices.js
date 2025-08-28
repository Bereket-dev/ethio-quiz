export const checkUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      throw new Error(data.error || 'Unknown Error!')
    }
  } catch (err) {
    throw err
  }
}

export const loggingOutUser = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.error || 'Unknown Error!')
    }
  } catch (error) {
    throw err
  }
}

export const registerUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Unknown Error!')

    return data
  } catch (err) {
    throw err
  }
}
