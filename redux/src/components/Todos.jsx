import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';
import { TrashIcon } from '@heroicons/react/24/outline';


const Todos = () => {

    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();
    const removeTodoHandler = (id) => {
        dispatch(removeTodo(id));
    }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                <span className="text-gray-100">{todo.text}</span>
                <button
                  onClick={() => removeTodoHandler(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                    <span className="hidden sm:inline"></span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No todos available</p>
        )}
      </div>
    </div>
  )
}

export default Todos;
