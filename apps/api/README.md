# API Service

A Next.js application that serves as the API backend for the Nexus platform.

## Running

```bash
pnpm dev
```

Runs on: http://localhost:3002

## API Endpoints

### Health Check

```
GET /api/health
```

Returns service health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "nexus-api"
}
```

### Todos

#### Get All Todos

```
GET /api/todos
```

**Response:**
```json
{
  "todos": [
    {
      "id": 1,
      "title": "Learn Next.js",
      "completed": true,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Todo

```
POST /api/todos
Content-Type: application/json

{
  "title": "New todo item"
}
```

**Response:**
```json
{
  "todo": {
    "id": 2,
    "title": "New todo item",
    "completed": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # API documentation page
└── api/
    ├── health/
    │   └── route.ts        # Health check endpoint
    └── todos/
        └── route.ts        # Todos CRUD endpoints
```

## Next.js API Routes

Next.js API routes use the App Router convention:

- Files in `app/api/` become API endpoints
- `route.ts` files export HTTP method handlers (GET, POST, PUT, DELETE)
- Return responses using `NextResponse.json()`

### Example Route Handler

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}

export async function POST(request: Request) {
  const body = await request.json();
  // Process request
  return NextResponse.json({ data: body }, { status: 201 });
}
```

## Database Integration

This API uses the shared `database` package:

```typescript
import { getAllTodos, createTodo } from "database";

const todos = getAllTodos();
const newTodo = createTodo("My new todo");
```

This keeps database logic separate from API logic.

## Error Handling

All endpoints include try-catch blocks for proper error handling:

```typescript
try {
  const todos = getAllTodos();
  return NextResponse.json({ todos });
} catch (error) {
  console.error("Error:", error);
  return NextResponse.json(
    { error: "Failed to fetch todos" },
    { status: 500 }
  );
}
```

## Testing

You can test the API using curl:

```bash
# Get todos
curl http://localhost:3002/api/todos

# Create a todo
curl -X POST http://localhost:3002/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo"}'

# Health check
curl http://localhost:3002/api/health
```
