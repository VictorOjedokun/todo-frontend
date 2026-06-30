import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import TodoItem from "./components/TodoItem";
import "./App.css";

export default function App() {
  const [todos, setTodos]   = useState([]);
  const [input, setInput]   = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError]   = useState(null);

  useEffect(() => {
    getTodos()
      .then(({ data }) => setTodos(data))
      .catch(() => setError("Cannot reach the backend."));
  }, []);

  const handleAdd = async () => {
    if (!input.trim()) return;
    const { data } = await createTodo(input);
    setTodos((prev) => [...prev, data]);
    setInput("");
  };

  const handleToggle = async (id, completed) => {
    const { data } = await updateTodo(id, { completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  const handleEdit = async (id, title) => {
    const { data } = await updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const visible = todos.filter((t) => {
    if (filter === "active")    return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app">
      <header>
        <h1>✅ Todo App</h1>
        <p>Deployed on Azure VMs</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="add-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filters">
        {["all", "active", "completed"].map((f) => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {visible.length === 0
          ? <p className="empty">No todos here.</p>
          : visible.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
        }
      </div>

      <footer>
        {todos.filter((t) => !t.completed).length} item(s) left
      </footer>
    </div>
  );
}
