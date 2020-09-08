import React, { useState, useEffect } from 'react';
import "./App.css";
import { Button, Input, Divider } from 'antd';
import { SendOutlined, EditOutlined } from '@ant-design/icons'
import { Link, Route } from 'react-router-dom';
import Todo from './Components/Todo'


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
                    <div className={'filter'}>
                        <Link to='/tasks/all'><Button shape="round">all</Button></Link>
                        <Button className={'filter'} shape="round">
                            <Link to='/tasks/active'>active</Link>
                        </Button>
                        <Button className={'filter'} shape="round">
                            <Link to='/tasks/done'>done</Link>
                        </Button>
                    </div>

                <Route path='/tasks/done'>
                    {todos.filter(todo => todo.active===true || '').map(todo => (
                        <Todo
                            todo={todo}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </Route>

                <Route path='/tasks/active'>
                    {todos.filter(todo => todo.active===false).map(todo => (
                        <Todo
                            todo={todo}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </Route>

                <Route path='/tasks/all'>
                    {todos.map(todo => (
                        <Todo
                            todo={todo}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </Route>

            </div>
        </div>
    );
}


export default App ;
