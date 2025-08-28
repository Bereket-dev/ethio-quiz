export const getKingdomList = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/kingdom', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(data.message || 'Failed to fetch kingdoms')
      return []
    }

    return data.kingdoms || []
  } catch (error) {
    console.error('Failed to fetch kingdoms!', error)
    return []
  }
}

export const addOneKingdom = async (formData) => {
  try {
    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }

    const response = await fetch('http://localhost:5000/api/kingdom/create', {
      method: 'POST',
      body: data,
    })

    const newKingdom = await response.json()
    if (response.ok) {
      return newKingdom
    } else {
      throw new Error(newKingdom.error || 'Unknown error')
    }
  } catch (err) {
    throw err
  }
}

export const editOneKingdom = async (formData) => {
  try {
    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }

    const response = await fetch('http://localhost:5000/api/kingdom/edit', {
      method: 'PUT',
      body: data,
    })

    const updatedKingdom = await response.json()
    return response.ok ? updatedKingdom : null
  } catch (error) {
    console.error('Failed to edit kingdom!', error)
    return null
  }
}
