import React, { useState} from 'react';
import './App.css';

import { MdDelete } from "react-icons/md";

const  App = () => {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState ('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const erase = () => {
        setValue("");
    };

    const submit = () =>{
        setTodos([
            ...todos,
            {
                id:new Date().getTime(), 
                title: value,
                checked: false
            }
        ]);
        erase();
    }
    const onKeyDown = (event) => {
        if (event.which === ENTER_KEY){
            submit();
        }
        else if (event.which === ESCAPE_KEY){
            erase();
        }
    };
    const ontoggle = (todo) => {
        setTodos(todos.map((obj) => (obj.id === todo.id ? {...obj,
        checked: !todo.checked} : obj))
        );
    };

    const onRemove = (todo) => {
        setTodos(todos.filter((obj) => obj.id !== todo.id));
    }

    return(
    <section className='container'>
        <header>
            <h1 className='title'>todo</h1>
        </header>
        <section className='main'>
            <input className='new-todo'
            placeholder='o que precisa ser feito?'
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown} />
        <ul className='todo-list'>
            {todos.map((todo) => (
                    <li key={todo.id.toString()}>
                       <span 
                        className={["todo", todo.checked ? 
                        "checked" : ""].join(" ")}
                        onClick={()=>ontoggle(todo)}
                        onKeyPress={()=>ontoggle(todo)}
                        role="button"
                        tabIndex={0}
                        >{todo.title}
                        </span>
                       <button
                        className='remove'
                        type='button'
                        onClick={() => onRemove(todo)}>
                        <MdDelete size={28}/>
                       </button>
                    </li>    
                ))}
        </ul>
        </section>
    </section>
);
}

export default App;
