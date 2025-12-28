/**
 * DEMONSTRATION: Todo App with State Management
 * 
 * This demonstrates:
 * - CRUD operations with local state
 * - Array manipulation (add, update, delete)
 * - Conditional rendering
 * - Form handling
 */

import { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);

  // ADD or UPDATE todo
  function handleAdd() {
    if (!newTodo.trim()) {
      alert("Please enter a todo");
      return;
    }

    if (editId) {
      // UPDATE existing todo
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: newTodo } : todo
        )
      );
      setEditId(null);
      setNewTodo("");
    } else {
      // ADD new todo
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  }

  // DELETE todo
  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // EDIT todo (load into input)
  function handleEdit(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditId(id);
      setNewTodo(todo.text);
    }
  }

  // TOGGLE completion status
  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">Todo App</h1>

      {/* Form */}
      <section className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter a new todo..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold"
          >
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setNewTodo("");
              }}
              className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* Todos List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Todos ({todos.length})
        </h2>
        {todos.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No todos yet. Add one above!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 bg-white border rounded-lg flex items-center justify-between ${
                  todo.completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="h-5 w-5"
                  />
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Key Concepts:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Array Spread:</strong> [...todos, newItem] adds to array
          </li>
          <li>
            <strong>Array Filter:</strong> todos.filter() removes items
          </li>
          <li>
            <strong>Array Map:</strong> todos.map() updates items
          </li>
          <li>
            <strong>Conditional Rendering:</strong> Show/hide based on state
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;

