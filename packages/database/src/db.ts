import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

/**
 * Find the monorepo root by looking for pnpm-workspace.yaml
 */
function findMonorepoRoot(): string {
  let currentDir = process.cwd();

  console.log("🔍 Starting directory:", currentDir);

  // Validate currentDir is defined
  if (!currentDir || typeof currentDir !== 'string') {
    console.error("❌ process.cwd() returned invalid value:", currentDir);
    throw new Error("Cannot determine current working directory");
  }

  // Maximum depth to prevent infinite loops
  let maxDepth = 10;

  while (maxDepth > 0) {
    console.log(`  Checking: ${currentDir}`);

    // Check if pnpm-workspace.yaml exists in current directory
    const workspaceFile = path.join(currentDir, "pnpm-workspace.yaml");

    try {
      if (fs.existsSync(workspaceFile)) {
        console.log("✅ Found monorepo root:", currentDir);
        return currentDir;
      }
    } catch (error) {
      console.error("Error checking workspace file:", error);
    }

    // Move up one directory
    const parentDir = path.dirname(currentDir);

    // If we've reached the root of the filesystem, stop
    if (parentDir === currentDir) {
      console.log("⚠️ Reached filesystem root");
      break;
    }

    currentDir = parentDir;
    maxDepth--;
  }

  // Fallback to current working directory
  console.log("⚠️ Using fallback path:", process.cwd());
  return process.cwd();
}

/**
 * Get the database file path
 * Priority:
 * 1. DATABASE_PATH environment variable (for production/custom setups)
 * 2. Find monorepo root and use nexus.db there (for development)
 */
function getDbPath(): string {
  try {
    console.log("=== Database Path Resolution ===");
    console.log("DATABASE_PATH env:", process.env.DATABASE_PATH);
    console.log("NODE_ENV:", process.env.NODE_ENV);

    // Option 1: Use environment variable if provided
    if (process.env.DATABASE_PATH) {
      console.log("📁 Using DATABASE_PATH from environment:", process.env.DATABASE_PATH);
      return process.env.DATABASE_PATH;
    }

    // Option 2: Find monorepo root dynamically
    console.log("📁 Finding monorepo root...");
    const monorepoRoot = findMonorepoRoot();

    if (!monorepoRoot || typeof monorepoRoot !== 'string') {
      throw new Error("Invalid monorepo root: " + monorepoRoot);
    }

    const dbPath = path.join(monorepoRoot, "nexus.db");
    console.log("📁 Resolved database path:", dbPath);
    console.log("=== End Path Resolution ===");

    return dbPath;
  } catch (error) {
    console.error("❌ Error in getDbPath:", error);
    throw error;
  }
}

const DB_PATH = getDbPath();

let db: Database.Database | null = null;

/**
 * Get or create the SQLite database connection
 */
export function getDatabase(): Database.Database {
  if (!db) {
    console.log(`📁 Opening database at: ${DB_PATH}`);
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initializeDatabase(db);
  }
  return db;
}

/**
 * Initialize database schema
 */
function initializeDatabase(database: Database.Database) {
  // Create todos table if it doesn't exist
  database.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create users table for demonstration
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed initial data if tables are empty
  seedDatabase(database);
}

/**
 * Seed the database with initial data (only if empty)
 */
function seedDatabase(database: Database.Database) {
  // Check if todos table is empty
  const todoCount = database.prepare("SELECT COUNT(*) as count FROM todos").get() as { count: number };

  if (todoCount.count === 0) {
    console.log("📦 Seeding database with initial data...");

    // Insert sample todos
    const insertTodo = database.prepare(
      "INSERT INTO todos (title, completed) VALUES (?, ?)"
    );

    const todos = [
      { title: "Learn Next.js", completed: 1 },
      { title: "Learn TypeScript", completed: 1 },
      { title: "Set up Turborepo", completed: 1 },
      { title: "Configure SQLite", completed: 1 },
      { title: "Build a todo app", completed: 0 },
      { title: "Deploy to production", completed: 0 },
    ];

    for (const todo of todos) {
      insertTodo.run(todo.title, todo.completed);
    }

    console.log(`✅ Seeded ${todos.length} todos`);
  }

  // Check if users table is empty
  const userCount = database.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };

  if (userCount.count === 0) {
    // Insert sample users
    const insertUser = database.prepare(
      "INSERT INTO users (name, email) VALUES (?, ?)"
    );

    const users = [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
      { name: "Bob Wilson", email: "bob@example.com" },
    ];

    for (const user of users) {
      insertUser.run(user.name, user.email);
    }

    console.log(`✅ Seeded ${users.length} users`);
  }
}

/**
 * Close the database connection
 */
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
