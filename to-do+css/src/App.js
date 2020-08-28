import React, { useState, useEffect } from 'react';
import "./App.css";
import { Button, Input, Divider } from 'antd';
import { DeleteOutlined, SendOutlined, EditOutlined } from '@ant-design/icons'

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

    const handleUpdate = async (name, id, active) => {
        await updateData(name, id, active)
        getTodos()
        setTodos(todos)
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

    const updateData = async (name, id, active) => {
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

    return (
        <div className={'entireTodo'}>
                <div className={'borderTodo'}>
                <Divider>TODO-List <EditOutlined /></Divider>
                <div className={'inputBlock'}>
                    <Input placeholder="enter some text.." value={currentTodo} onChange={e => {setCurrentTodo(e.target.value);}}/>
                    <Button type="primary" shape="round" onClick={handleClick}><SendOutlined />add new task</Button>
                </div>
                {todos.map((todo) => (
                    <div className={'todoBlock'}>
                        <div key={todo} className={`todo ${(todo.active === true) ? 'checked' : ''}`} onClick={(name) => {
                            todo.active = !todo.active;
                            handleUpdate(todo.name, todo.id, todo.active);
                        }}>
                            <ul>
                                <li key={todo.name}>{todo.name}</li>
                            </ul>
                        </div>
                        <Button className={'deleteButton'} type="primary" shape="round" danger onClick={() => handleDelete(todo.id)}>delete<DeleteOutlined /></Button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default App ;
