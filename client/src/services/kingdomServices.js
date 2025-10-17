const KINGDOM_BASE_URL = `${import.meta.env.VITE_API_URL}/api/kingdom`

export const getKingdomList = async () => {
  try {
    const response = await fetch(`${KINGDOM_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('kingdoms', JSON.stringify(data?.kingdoms))
      return data.kingdoms || []
    } else {
      throw new Error(data.error || 'Failed to fetch kingdoms')
    }
  } catch (err) {
    throw err
  }
}

export const addOneKingdom = async (formData) => {
  const data = new FormData()
  for (const key in formData) {
    data.append(key, formData[key])
  }

  const response = await fetch(`${KINGDOM_BASE_URL}/create`, {
    method: 'POST',
    body: data,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error || 'Failed to add kingdom')
  }

  return result
}

export const editOneKingdom = async (formData) => {
  try {
    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }

    const id = formData._id //kingdom id
    const response = await fetch(`${KINGDOM_BASE_URL}/edit/${id}`, {
      method: 'PUT',
      body: data,
    })

    const updatedKingdom = await response.json()
    if (response.ok) {
      return updatedKingdom
    } else {
      throw new Error(updatedKingdom.error || 'Failed to update kingdom!')
    }
  } catch (err) {
    throw err
  }
}

export const removeOneKingdom = async (id) => {
  try {
    const response = await fetch(`${KINGDOM_BASE_URL}/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const result = await response.json()
    if (response.ok) {
      return result.message || `kingdom deleted successfully!`
    } else {
      throw new Error(result.error || 'Failed to delete kingdom')
    }
  } catch (err) {
    throw err
  }
}
