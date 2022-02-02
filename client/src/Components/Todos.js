import React, { useState, useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import Message from './Message';
import TodoService from '../Services/TodoService';
import AuthContext from '../Context/AuthContext';


// functional component
const Todos = prop => {
    const [todo, setTodo] = useState({ name: '' });
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        TodoService.getTodos().then(data => {
            setTodos(data.todos);
        });
    }, []);


    const onSubmit = e => {
        e.preventDefault();
        TodoService.postTodo(todo).then(data => {
            const { message } = data;
            resetForm();
            // if successfully created a todo
            if (!message.msgError) {
                TodoService.getTodos().then(getData => {
                    setTodos(getData.todos);
                    setMessage(message);
                });
            }
            // if JWT token expires
            else if (message.msgBody === "Unauthorized") {
                setMessage(message);
                authContext.setUser({ usernMe: '', role: '' });
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });
    }

    const onChange = e => {
        setTodo({ name: e.target.value });
    }

    const resetForm = () => {
        setTodo({ name: "" });
    }

    return (
        <div>
            <ul className="list-group">
                {
                    todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo} />
                    })
                }
            </ul>
            <br />
            <form onSubmit={onSubmit}>
                <label htmlFor="todo"> Enter Todo</label>
                <input type='text'
                    name='todo'
                    value={todo.name}
                    onChange={onChange}
                    className="form-control"
                    placeholder='Please enter todos' />
                <button className="btn btn-lg btn-primary btn-block" type='submit'>Submit</button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    );

};

export default Todos;