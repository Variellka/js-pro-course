export const getTodos = async () => {
    const todosResp = await fetch('http://localhost:3004/todos')
    const todos = await todosResp.json()
    return todos
}

export const sendData = async (name) => {
    const url = 'http://localhost:3004/todos'
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({name, active: false}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

export const deleteData = async (id) => {
    const url = `http://localhost:3004/todos/${id}`
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Ошибка:', error)
    }
}

export const updateData = async (name, id, active) => {
    const url = `http://localhost:3004/todos/${id}`
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({name, active, id}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.error('Ошибка:', error)
    }
}
