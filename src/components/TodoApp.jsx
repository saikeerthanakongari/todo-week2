import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import FilterBtns from "./FilterBtns";

const STORAGE_KEY = "todo_week2_tasks";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      // localStorage may be full or disabled — fail silently
      console.error("Could not save tasks:", e);
    }
  }, [tasks]);

  // Add new task
  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = { id: Date.now(), text: trimmed, completed: false };
    setTasks((t) => [newTask, ...t]);
  };

  // Delete
  const deleteTask = (id) => {
    setTasks((t) => t.filter((x) => x.id !== id));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)));
  };

  // Update text (edit)
  const updateTask = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, text: trimmed } : x)));
  };

  // Filters
  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  const clearCompleted = () => {
    setTasks((t) => t.filter((x) => !x.completed));
  };

  return (
    <section className="card">
      <TodoForm onAdd={addTask} />
      <div className="controls">
        <FilterBtns current={filter} onChange={setFilter} />
        <div className="controls-right">
          <button className="btn ghost" onClick={() => setTasks([])} aria-label="Clear all tasks">
            Clear All
          </button>
          <button className="btn ghost" onClick={clearCompleted} aria-label="Clear completed tasks">
            Clear Completed
          </button>
        </div>
      </div>

      <TodoList
        tasks={filtered}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onUpdate={updateTask}
      />

      {tasks.length === 0 && (
        <div className="no-tasks" role="status" aria-live="polite">
          <p className="no-tasks-title">No Tasks</p>
          <p className="no-tasks-sub">Add your first task using the input above.</p>
        </div>
      )}
    </section>
  );
}
