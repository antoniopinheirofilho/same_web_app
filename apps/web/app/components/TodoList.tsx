"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data.todos);
      setError(null);
    } catch (err) {
      setError("Failed to load todos. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      const data = await response.json();
      setTodos([data.todo, ...todos]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    }
  };

  const deleteTodoHandler = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      // Update state by filtering out the deleted todo
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  const toggleTodoHandler = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      // Update state by mapping over todos and updating the one that matches
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !currentStatus } : todo
      ));
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ padding: "1rem" }}>Loading todos...</div>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Todo List</h2>

      {error && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={addTodo} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          style={{
            padding: "0.5rem",
            width: "70%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            marginLeft: "0.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "0.75rem",
              marginBottom: "0.5rem",
              backgroundColor: todo.completed ? "#e8f5e9" : "#f5f5f5",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>

            <div style={{ float: "right" }}>
              <button
                onClick={() => toggleTodoHandler(todo.id, todo.completed)}
                style={{
                  padding: "0.25rem 0.5rem",
                  marginLeft: "0.5rem",
                  backgroundColor: todo.completed ? "#ff9800" : "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {todo.completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteTodoHandler(todo.id)}
                style={{
                  padding: "0.25rem 0.5rem",
                  marginLeft: "0.5rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>

          </li>
        ))}
      </ul>

      {todos.length === 0 && !error && (
        <p style={{ color: "#666" }}>No todos yet. Add one above!</p>
      )}
    </div>
  );
}
