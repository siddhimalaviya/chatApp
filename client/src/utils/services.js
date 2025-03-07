export const baseUrl = 'http://192.168.29.142:5000/api'

export const postRequest = async (url, body) => {
    const response = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    const data = await response.json()
    if (!response.ok) {
        let message
        if (data?.message) {
            message = data.message
        } else {
            message = data
        }
        return { error: true, message }
    }
    return data
}

export const getRequest = async (url) => {
    const response = await fetch(`${baseUrl}/${url}`)
    const data = await response.json()
    if (!response.ok) {
        let message = 'An error occurred'
        if (data?.message) {
            message = data.message
        }
        return { error: true, message }
    }
    return data
}


