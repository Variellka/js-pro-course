import {Button} from "antd";
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";
import React from "react";
import "./Todo.css";

function Todo({todo, handleUpdate, handleDelete}) {
return (
        <div className={'todoBlock'}>
            <div key={todo} className={`todo ${(todo.active === true) ? 'checked' : ''}`}>
                <ul>
                    <li key={todo.name}>{todo.name}</li>
                </ul>
            </div>
            <div >
                <Button className={'button'} type="primary" shape="round" dashed onClick={(name) => {
                    todo.active = !todo.active;
                    handleUpdate(todo.name, todo.id, todo.active);
                }}><CheckOutlined /></Button>
                <Button className={'deleteButton'} type="primary" shape="round" danger onClick={() => handleDelete(todo.id)}><DeleteOutlined /></Button>
            </div>
        </div>
)
}
export default Todo;