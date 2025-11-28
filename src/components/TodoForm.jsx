import React, { useState, useRef, useEffect } from "react";

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="taskInput">New task</label>
      <input
        id="taskInput"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task and press Enter"
        aria-label="Add new task"
      />
      <button type="submit" className="btn primary" aria-label="Add task">Add</button>
    </form>
  );
}
