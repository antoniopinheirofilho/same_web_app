# Web App

The main web application for the Nexus platform. This is a Next.js application that provides the user-facing interface.

## Running

```bash
pnpm dev
```

Runs on: http://localhost:3000

## Features

- **Todo List**: Simple todo list that connects to the API
- **Server Components**: Main page uses Next.js server components
- **Client Components**: TodoList uses client-side interactivity

## Structure

```
app/
├── layout.tsx        # Root layout (server component)
├── page.tsx          # Home page (server component)
└── components/
    └── TodoList.tsx  # Todo list (client component)
```

## Key Concepts

### Server vs Client Components

- **Server Components** (default): Rendered on the server, no JavaScript sent to client
  - Example: `app/page.tsx`
  - Good for: Static content, data fetching, SEO

- **Client Components** (`"use client"`): Interactive components
  - Example: `app/components/TodoList.tsx`
  - Good for: Forms, event handlers, hooks (useState, useEffect)

### Fetching Data

The TodoList component fetches data from the API service:

```typescript
const response = await fetch("http://localhost:3002/api/todos");
```

This demonstrates a typical pattern of separating frontend and backend concerns.

## Dependencies

- `next`: Next.js framework
- `react` & `react-dom`: React library
- `database`: Shared database package (workspace dependency)
