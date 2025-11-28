import React from "react";

export default function FilterBtns({ current, onChange }) {
  const items = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="filters" role="tablist" aria-label="Task filters">
      {items.map((it) => (
        <button
          key={it.key}
          className={`btn ghost ${current === it.key ? "active" : ""}`}
          onClick={() => onChange(it.key)}
          role="tab"
          aria-selected={current === it.key}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
