import { getDatabase } from "./db";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get all todos from the database
 */
export function getAllTodos(): Todo[] {
  const db = getDatabase();
  const stmt = db.prepare("SELECT * FROM todos ORDER BY created_at DESC");
  const rows = stmt.all() as Array<{
    id: number;
    title: string;
    completed: number;
    created_at: string;
    updated_at: string;
  }>;

  return rows.map((row) => ({
    ...row,
    completed: row.completed === 1,
  }));
}

/**
 * Create a new todo
 */
export function createTodo(title: string): Todo {
  const db = getDatabase();
  const stmt = db.prepare("INSERT INTO todos (title) VALUES (?)");
  const result = stmt.run(title);

  const newTodo = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(result.lastInsertRowid) as {
    id: number;
    title: string;
    completed: number;
    created_at: string;
    updated_at: string;
  };

  return {
    ...newTodo,
    completed: newTodo.completed === 1,
  };
}

/**
 * Update a todo's completed status
 */
export function updateTodo(id: number, completed: boolean): void {
  const db = getDatabase();
  const stmt = db.prepare(
    "UPDATE todos SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  );
  stmt.run(completed ? 1 : 0, id);
}

/**
 * Delete a todo
 */
export function deleteTodo(id: number): void {
  const db = getDatabase();
  const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
  stmt.run(id);
}
