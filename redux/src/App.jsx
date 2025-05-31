import React from 'react';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gray-800 shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Redux Todos App
        </h1>

        {/* AddTodo component */}
        <AddTodo />

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Todos component */}
        <Todos />

        <p className="mt-6 text-sm text-gray-500 text-center">
          Built with React, Redux Toolkit & Tailwind CSS.
        </p>
      </div>
    </div>
  );
};

export default App;
