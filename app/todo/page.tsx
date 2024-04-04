'use client'

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../store/page';

const IndexPage = () => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      todoStore.addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-6xl m-10">To Do List</h1>
      <div className='flex flex-row mb-5'>
      <input
        className='text-black mr-10'
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What's next?"
        autoCapitalize='sentences'
      />
      <button  className='rounded p-2 bg-green-500' onClick={handleAddTodo}>Agregar</button>

      </div>
      
      <ul className='flex flex-col h-full items-center'>
        {todoStore.todos.map((todo) => (
          <li className='border border-sky-500' key={todo.id}>
            <span
            className=''
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => todoStore.toggleTodoCompletion(todo.id)}
            >
              {todo.text}
            </span>
            <button className='rounded p-2 bg-red-500 end-9' onClick={() => todoStore.removeTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(IndexPage);
