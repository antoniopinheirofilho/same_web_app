# Database Package

Shared database utilities for accessing SQLite across all Nexus applications.

## Purpose

This package provides a centralized way to interact with the SQLite database. All apps can import and use these utilities, ensuring:

- **Consistency**: Same database logic everywhere
- **Type Safety**: TypeScript interfaces for database models
- **Maintainability**: Update database logic in one place

## Structure

```
src/
├── index.ts       # Main exports
├── db.ts          # Database connection and schema
└── todos.ts       # Todo CRUD operations
```

## Usage

Import the functions you need:

```typescript
import { getAllTodos, createTodo, updateTodo, deleteTodo } from "database";

// Get all todos
const todos = getAllTodos();

// Create a new todo
const newTodo = createTodo("Learn TypeScript");

// Update a todo
updateTodo(1, true);

// Delete a todo
deleteTodo(1);
```

## Database Schema

### Todos Table

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## How It Works

### Connection Management

```typescript
import { getDatabase } from "database";

const db = getDatabase();
```

The `getDatabase()` function:
1. Creates a connection if one doesn't exist
2. Initializes the schema (creates tables)
3. Enables WAL mode for better concurrency
4. Returns a reusable connection

### CRUD Operations

All CRUD operations use prepared statements for security and performance:

```typescript
export function createTodo(title: string): Todo {
  const db = getDatabase();
  const stmt = db.prepare("INSERT INTO todos (title) VALUES (?)");
  const result = stmt.run(title);
  // ... fetch and return the new todo
}
```

### Type Safety

TypeScript interfaces ensure type safety:

```typescript
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}
```

## SQLite with better-sqlite3

We use `better-sqlite3` instead of the official `sqlite3` package because:

- **Synchronous**: No callbacks or promises, simpler code
- **Faster**: Generally better performance
- **Type-safe**: Works well with TypeScript
- **Reliable**: More predictable in server environments

### Synchronous vs Asynchronous

```typescript
// better-sqlite3 (synchronous)
const todos = db.prepare("SELECT * FROM todos").all();

// vs sqlite3 (asynchronous)
db.all("SELECT * FROM todos", (err, todos) => {
  // handle result
});
```

## Extending the Database

### Adding a New Table

1. Add schema in `src/db.ts`:
```typescript
database.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT
  )
`);
```

2. Create CRUD functions in a new file (e.g., `src/posts.ts`):
```typescript
export function getAllPosts() {
  const db = getDatabase();
  return db.prepare("SELECT * FROM posts").all();
}
```

3. Export from `src/index.ts`:
```typescript
export { getAllPosts, createPost } from "./posts";
```

## Database File Location

The SQLite database file is stored at the root of the monorepo:
- Path: `../../nexus.db` (relative to this package)
- Absolute: `/path/to/nexus/nexus.db`

This allows all apps to share the same database.

## Best Practices

1. **Always use prepared statements**: Prevents SQL injection
   ```typescript
   // Good
   db.prepare("SELECT * FROM todos WHERE id = ?").get(id);

   // Bad
   db.prepare(`SELECT * FROM todos WHERE id = ${id}`).get();
   ```

2. **Handle errors**: Wrap database calls in try-catch
   ```typescript
   try {
     const todos = getAllTodos();
   } catch (error) {
     console.error("Database error:", error);
   }
   ```

3. **Use transactions for multiple operations**: Ensures atomicity
   ```typescript
   const db = getDatabase();
   const transaction = db.transaction(() => {
     createTodo("First");
     createTodo("Second");
   });
   transaction();
   ```

## Dependencies

- `better-sqlite3`: SQLite library
- `@types/better-sqlite3`: TypeScript types
