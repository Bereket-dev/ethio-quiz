const AUTH_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`

export const checkUser = async (formData) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data.user))
      return data.user
    } else {
      throw new Error(data.message || 'Unknown Error!')
    }
  } catch (err) {
    throw err
  }
}

export const loggingOutUser = async () => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include'
    })

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      throw new Error(data.message || 'Unknown Error!')
    }
  } catch (error) {
    throw err
  }
}

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Unknown Error!')

    return data
  } catch (err) {
    throw err
  }
}

export const checkAuth = async () => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Error checking auth')
    return data
  } catch (error) {
    return { loggedIn: false }
  }
}

export const checkAdmin = async () => {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = response.json()
    if (!response.ok) throw new Error(data.message || 'Error checking admin')
    return data
  } catch (error) {
    return { loggedIn: false }
  }
}
