import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const handleClick = (e) => {
        sendData(currentTodo);
        setCurrentTodo("");
    };

    const handleDelete = async (id) => {
        await deleteData(id)
        getTodos()
        setTodos(todos)
    }

    const toggleClass = (event) => {
        event.target.classList.toggle('checked')
    }

    const getTodos = async () => {
        const todosResp = await fetch('http://localhost:3004/todos')
        const todos = await todosResp.json()
        setTodos(todos)
    }

    const sendData = async (name) => {
        const url = 'http://localhost:3004/todos'
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({name}),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            setTodos([...todos, json])
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const deleteData = async (id) => {
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

    return (
        <div>
            <input value={currentTodo} onChange={e => {
                setCurrentTodo(e.target.value);
            }}/>
            <button onClick={handleClick}>Set</button>
            {todos.map((todo) => (
                <div className='todoBlock'>
                    <div key={todo} onClick={toggleClass}>{todo.name}</div>
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}


export default App ;
