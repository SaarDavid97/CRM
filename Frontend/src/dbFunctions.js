export async function updateItem(id, object, collection) {
    const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(object)
        }
        const url = `http://localhost:8000/${collection}/${id}/`
        const response = await fetch(url, requestOptions)
        const item = await response.json()
        console.log('Item saved:', item)

    } catch (error) {
        console.error('Error:', error)
    }
}


export async function saveItem(object, collection) {
    const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(object)
        }
        const url = `http://localhost:8000/${collection}/`
        const response = await fetch(url, requestOptions)
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to save item');
        }
        const item = await response.json()
        console.log('Item saved:', item)

    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}


export async function getItem(id, collection) {
    const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        const url = `http://localhost:8000/${collection}/${id}/`
        const response = await fetch(url, requestOptions)
        const item = await response.json()
        console.log('Item received:', item)
        return item

    } catch (error) {
        console.error('Error:', error)
    }
}


export async function getCollection(collection) {
    const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        const url = `http://localhost:8000/${collection}/`
        const response = await fetch(url, requestOptions)
        const items = await response.json()
        console.log('Items received:', items)
        return items

    } catch (error) {
        console.error('Error:', error)
    }
}


export async function getPredictions(periods){
    const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({periods: periods})
        }
        const url = 'http://localhost:8000/tasks/prediction/'
        const response = await fetch(url, requestOptions)
        const items = await response.json()
        console.log('Items received:', items.predictions)
        return items.predictions

    } catch (error) {
        console.error('Error:', error)
    }
}


export async function deleteItem(id, collection) {
    const token = localStorage.getItem('token')
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        const url = `http://localhost:8000/${collection}/${id}/`
        const response = await fetch(url, requestOptions)
        const item = await response.json()
        console.log('Item deleted:', item)

    } catch (error) {
        console.error('Error:', error)
    }
}

