import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, onDelete, onToggle, onUpdate }) {
  return (
    <div className="todo-list" role="list">
      {tasks.length === 0 ? (
        <div className="empty-list" role="presentation" />
      ) : (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={() => onDelete(task.id)}
            onToggle={() => onToggle(task.id)}
            onUpdate={(newText) => onUpdate(task.id, newText)}
          />
        ))
      )}
    </div>
  );
}
