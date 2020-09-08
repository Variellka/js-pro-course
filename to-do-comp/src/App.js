import React, { useState, useEffect, useReducer } from 'react';
import "./App.css";
import { Button, Input, Divider } from 'antd';
import { SendOutlined, EditOutlined } from '@ant-design/icons';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Todo from './Components/Todo'
import { getTodos, sendData, deleteData, updateData} from './Requests/requests'

function App() {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const handleClick = (e) => {
        sendData(currentTodo).then((todo)=>setTodos([...todos, todo]));
        setCurrentTodo("");
    }
    const handleDelete = async (id) => {
        await deleteData(id)
        getTodos().then((todos)=>setTodos(todos))
    }
    const handleUpdate = async (name, id, active) => {
        await updateData(name, id, active)
        getTodos().then((todos)=>setTodos(todos))
    }

    useEffect(() => {
        getTodos().then((todos)=>setTodos(todos))
    }, [])

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
            
                <Switch>
                    <Route path='/tasks/done'>
                        {todos.filter(todo => todo.active===true).map(todo => (
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
                    <Redirect to='/tasks/all'/>
                </Switch>
            </div>
        </div>
       
    );
}

export default App ;
