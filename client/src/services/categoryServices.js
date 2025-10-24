const CATEGORY_BASE_URL = `${import.meta.env.VITE_API_URL}/api/category`

export const getCategoryList = async () => {
  try {
    const response = await fetch(`${CATEGORY_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('categories', JSON.stringify(data?.categories))
      return data.categories || []
    } else {
      throw new Error(data.message || 'Failed to fetch categories')
    }
  } catch (err) {
    throw err
  }
}

export const getCategoriesByKingdom = async (kingdomId) => {
  try {
    const response = await fetch(`${CATEGORY_BASE_URL}/kingdom/${kingdomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (response.ok) {
      return data || []
    } else {
      throw new Error(data.message || 'Failed to fetch categories by kingdom')
    }
  } catch (err) {
    throw err
  }
}

export const addOneCategory = async (formData) => {
  const data = new FormData()
  for (const key in formData) {
    data.append(key, formData[key])
  }

  const response = await fetch(`${CATEGORY_BASE_URL}/create`, {
    method: 'POST',
    body: data,
    credentials:'include'
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create category')
  }

  return result
}

export const editOneCategory = async (formData) => {
  try {
    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }

    const id = formData._id //category id
    const response = await fetch(`${CATEGORY_BASE_URL}/edit/${id}`, {
      method: 'PUT',
      body: data,
      credentials:'include',
    })

    const updatedCategory = await response.json()
    if (response.ok) {
      return updatedCategory
    } else {
      throw new Error(updatedCategory.message || 'Failed to update category!')
    }
  } catch (err) {
    throw err
  }
}

export const removeOneCategory = async (id) => {
  try {
    const response = await fetch(`${CATEGORY_BASE_URL}/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const result = await response.json()
    if (response.ok) {
      return result.message || `Category deleted successfully!`
    } else {
      throw new Error(result.message || 'Failed to create category')
    }
  } catch (err) {
    throw err
  }
}
