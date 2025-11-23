import { useState } from "react";

function CLass06() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);

  function handleAdd() {
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: newTodo } : todo
        )
      );
      setEditId(null);
      setNewTodo("");
    } else {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  }

  function handleDelete(id) {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id != id));
  }

  function handleEdit(id) {
    console.log(id);
    setEditId(id);

    let todo = todos.find((todo) => todo.id === id);
    console.log(todo);
    setNewTodo(todo.text);
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>

      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.text}</h3>
            <button onClick={() => handleEdit(todo.id)}>edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CLass06;
