import React, { useState, useRef, useEffect } from "react";

export default function TodoItem({ task, onDelete, onToggle, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  // Save edited value
  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      // If user clears text while editing, keep previous text
      setDraft(task.text);
      setEditing(false);
      return;
    }
    onUpdate(trimmed);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${task.completed ? "completed" : ""}`} role="listitem">
      <div className="left">
        <button
          className="round"
          onClick={onToggle}
          aria-label={task.completed ? "Undo task" : "Mark complete"}
          title={task.completed ? "Undo" : "Complete"}
        >
          {task.completed ? "↺" : "✓"}
        </button>
      </div>

      <div className="center">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setDraft(task.text);
                setEditing(false);
              }
            }}
            aria-label="Edit task"
            className="edit-input"
          />
        ) : (
          <span className="text" onDoubleClick={() => setEditing(true)}>
            {task.text}
          </span>
        )}
      </div>

      <div className="right">
        <button className="btn small" onClick={() => setEditing((s) => !s)} aria-label="Edit task">
          {editing ? "Saving" : "Edit"}
        </button>
        <button className="btn small danger" onClick={onDelete} aria-label="Delete task">
          Delete
        </button>
      </div>
    </div>
  );
}
