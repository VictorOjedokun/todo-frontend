import React, { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const submit = () => {
    if (value.trim() && value !== todo.title) onEdit(todo.id, value.trim());
    setEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
      />

      {editing ? (
        <input
          className="edit-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={submit}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
        />
      ) : (
        <span className="title" onDoubleClick={() => setEditing(true)}>
          {todo.title}
        </span>
      )}

      <div className="actions">
        <button onClick={() => setEditing(true)}>✏️</button>
        <button onClick={() => onDelete(todo.id)}>🗑️</button>
      </div>
    </div>
  );
}
