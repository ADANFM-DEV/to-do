'use client';
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
      <div className="flex flex-row items-center mb-5">
        <input
          className="text-black mr-10 height-10 border border-sky-500 rounded p-2"
          type="text"
          maxLength={50}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What's next?"
          autoCapitalize="sentences"
        />
        <button className="rounded p-2 bg-green-500" onClick={handleAddTodo}>
          Agregar
        </button>
      </div>
      <div className="flex flex-col items-center w-4/5">
        <ul className='flex flex-col w-full '>
          {todoStore.todos.map((todo) => (
            <li className="border border-sky-500 flex justify-between my-2 items-center w-full" key={todo.id}>
              <span
                className=" ml-5"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "gray" : "white",
                }}
                onClick={() => todoStore.toggleTodoCompletion(todo.id)}
              >
                {todo.text}
              </span>
              <div>
              <button
                  className={`rounded p-2 m-1 mr-10 ${todo.completed ? 'bg-gray-300' : 'bg-blue-500'}`}
                  onClick={() => todoStore.toggleTodoCompletion(todo.id)}
                  style={{ width: '120px' }}
                >
                  {todo.completed ? 'Completado' : 'Completar'}
                </button>
              <button
                className="rounded p-2 w-30 mr-10 bg-red-500"
                onClick={() => todoStore.removeTodo(todo.id)}
                style={{ width: '120px' }}
              >
                Eliminar
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(IndexPage);
