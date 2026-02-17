# Nexus Monorepo

A simple learning project demonstrating a modern web development stack with Next.js, TypeScript, SQLite, Turborepo, and PNPM.

## 🎯 Purpose

This project is designed to help you understand how modern web technologies work together in a monorepo setup. It includes three separate applications and shared packages, all working together seamlessly.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (with App Router)
- **Language**: TypeScript
- **Database**: SQLite (via better-sqlite3)
- **Monorepo Tool**: Turborepo
- **Package Manager**: PNPM
- **Runtime**: Node.js 18+

## 📁 Project Structure

```
nexus-monorepo/
├── apps/
│   ├── web/          # Main web application (port 3000)
│   ├── admin/        # Admin dashboard (port 3001)
│   └── api/          # API service (port 3002)
├── packages/
│   ├── database/     # Shared SQLite database utilities
│   └── typescript-config/  # Shared TypeScript configurations
├── turbo.json        # Turborepo configuration
├── pnpm-workspace.yaml    # PNPM workspace definition
└── nexus.db          # SQLite database (created on first run)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PNPM 9.0 or higher

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start all applications in development mode:
   ```bash
   pnpm dev
   ```

   This will start:
   - Web app: http://localhost:3000
   - Admin app: http://localhost:3001
   - API service: http://localhost:3002

### Running Individual Apps

You can also run apps individually:

```bash
# Run only the web app
cd apps/web && pnpm dev

# Run only the admin app
cd apps/admin && pnpm dev

# Run only the API
cd apps/api && pnpm dev
```

## 📚 Understanding the Stack

### Turborepo

Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. It helps manage multiple projects in a single repository and optimizes build times through caching.

**Key concepts:**
- **Tasks**: Defined in `turbo.json`, these are operations like `dev`, `build`, `lint`
- **Pipeline**: Turborepo understands task dependencies (e.g., build must happen before deploy)
- **Caching**: Turborepo caches task results to speed up subsequent runs

**Files to explore:**
- `turbo.json` - Configuration for Turborepo tasks

### PNPM Workspaces

PNPM is a fast, disk-efficient package manager that uses a content-addressable filesystem to store packages. Workspaces allow multiple projects to share dependencies.

**Key concepts:**
- **Workspace packages**: Apps and packages are linked together
- **Shared dependencies**: Common packages are installed once
- **Workspace protocol**: `workspace:*` in package.json links to local packages

**Files to explore:**
- `pnpm-workspace.yaml` - Defines which directories are workspaces
- `package.json` files - Check for `workspace:*` dependencies

### Next.js

Next.js is a React framework with built-in routing, server-side rendering, and API routes.

**Key concepts in this project:**
- **App Router**: Uses the `app/` directory structure (Next.js 13+)
- **Server Components**: Components are server-rendered by default
- **Client Components**: Use `"use client"` directive for interactivity
- **API Routes**: `app/api/*/route.ts` files define API endpoints

**Files to explore:**
- `apps/web/app/page.tsx` - Server component
- `apps/web/app/components/TodoList.tsx` - Client component
- `apps/api/app/api/todos/route.ts` - API route handler

### TypeScript

TypeScript adds static typing to JavaScript, catching errors at compile time.

**Key concepts:**
- **Type safety**: Interfaces and types ensure data consistency
- **tsconfig.json**: Configures TypeScript compiler options
- **Type inference**: TypeScript often infers types automatically

**Files to explore:**
- `packages/database/src/todos.ts` - See TypeScript interfaces
- `tsconfig.json` files in each app

### SQLite

SQLite is a lightweight, file-based database. We use `better-sqlite3` for synchronous database operations.

**Key concepts:**
- **File-based**: Entire database is in `nexus.db` file
- **SQL operations**: CRUD operations using SQL queries
- **Schema**: Tables defined in `packages/database/src/db.ts`

**Files to explore:**
- `packages/database/src/db.ts` - Database initialization and schema
- `packages/database/src/todos.ts` - Todo CRUD operations

## 🏗 Architecture

### Monorepo Benefits

1. **Code Sharing**: The `database` package is used by all apps
2. **Consistent Configuration**: Shared TypeScript configs ensure consistency
3. **Atomic Changes**: Update shared code and all apps in one commit
4. **Simplified Dependencies**: Manage versions in one place

### App Communication

- **web** → **api**: Fetches todos via HTTP (http://localhost:3002/api/todos)
- **api** → **database**: Uses shared database package
- **admin** → **database**: Can directly import database utilities

### Database Flow

```
User interacts with Web App (port 3000)
    ↓
Web App calls API (port 3002)
    ↓
API uses Database Package
    ↓
Database Package interacts with SQLite (nexus.db)
```

## 🧪 Development Tips

### Hot Reload

All apps support hot reload. Changes to:
- App code: Auto-reload in browser
- Shared packages: Requires app restart

### Database Inspection

View your SQLite database:
```bash
# Install sqlite3 CLI tool (if not already installed)
brew install sqlite3  # macOS
apt-get install sqlite3  # Linux

# Open the database
sqlite3 nexus.db

# View tables
.tables

# Query todos
SELECT * FROM todos;
```

### Adding New Packages

```bash
# Add a package to a specific app
pnpm add <package-name> --filter web

# Add a dev dependency to the root
pnpm add -D <package-name> -w
```

## 📖 Learning Path

To fully understand this project, explore in this order:

1. **Start with the basics**:
   - Read `package.json` files to understand dependencies
   - Run `pnpm dev` and visit all three apps

2. **Understand the monorepo**:
   - Study `pnpm-workspace.yaml` and `turbo.json`
   - See how packages are linked with `workspace:*`

3. **Explore Next.js**:
   - Compare `apps/web/app/page.tsx` (server) vs `TodoList.tsx` (client)
   - Check API routes in `apps/api/app/api/`

4. **Dive into the database**:
   - Read `packages/database/src/db.ts` to see schema
   - Explore `todos.ts` to understand CRUD operations
   - Create some todos and inspect `nexus.db`

5. **Make changes**:
   - Add a new field to the todos table
   - Create a new API endpoint
   - Build a new feature in the admin app

## 🎓 Next Steps

Try these exercises to deepen your understanding:

1. Add a "completed" toggle to todos in the web app
2. Create a users list in the admin app
3. Add a new table to the database
4. Create a shared UI component package
5. Add proper error handling and loading states

## 📝 Common Commands

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Build all apps
pnpm build

# Lint all apps
pnpm lint

# Clean all build artifacts
pnpm clean

# Add a dependency to a specific app
pnpm add <package> --filter <app-name>
```

## 🤝 Contributing

This is a learning project! Feel free to experiment, break things, and learn from the experience.

## 📄 License

MIT - Feel free to use this project for learning!
