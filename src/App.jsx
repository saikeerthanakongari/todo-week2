import React from "react";
import TodoApp from "./components/TodoApp";

export default function App() {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>Todo — Week 2 Assignment</h1>
        <p className="sub">Add / Edit / Delete • Complete / Undo • Filter • localStorage</p>
      </header>

      <main className="main">
        <TodoApp />
      </main>

      <footer className="footer">
        <small>Built with React • useState & useEffect • Persistent with localStorage</small>
      </footer>
    </div>
  );
}
