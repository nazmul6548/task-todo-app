"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  };

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodoss = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodoss);
  };
  return (
    <main className="min-h-lvh">
      
      {/* <h1>hello world</h1> */}
      <div className="max-w-md mx-auto h-96 mt-10 p-4 bg-white dark:bg-gray-800 text-black dark:text-white  shadow-md rounded-md">
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do <span className="text-cyan-800">App</span></h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Add a new text"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 border rounded-md ${
              todo.completed ? 'bg-gray-100 line-through' : 'bg-gray-100'
            }`}
          >
            <span onClick={() => handleToggleComplete(index)}>{todo.text}</span>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </main>
  );
}
