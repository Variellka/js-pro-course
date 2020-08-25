import React, { useState } from 'react';
import "./App.css";

function App() {
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const handleClick = (e) => {
        createNewTodo(currentTodo);
        setCurrentTodo("");
    };
    const createNewTodo = (currentTodo) => {
        let todosArray = [...todos, {todo: currentTodo}];
        setTodos(todosArray);
    }
    const toggleClass = (event) => {
        event.target.classList.toggle('checked')
    }
    const deleteTodo = (index) => {
        let todosArray = [...todos];
        todosArray.splice(index, 1);
        setTodos(todosArray);
    }
    return (
        <div>
            <input value={currentTodo} onChange={e => {setCurrentTodo(e.target.value);}}/>
            <button onClick={handleClick}>Set</button>
            {todos.map((todo, index) => (
                <div className = 'todoBlock'>
                    <div key={todo} onClick={toggleClass}>{todo.todo}</div>
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
export default App;
