import { TodoList } from "./components/TodoList";

export default function Home() {
  return (
    <main style={{
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1>Welcome to Nexus Web App</h1>
      <p>This is a simple Next.js application running on port 3000.</p>
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px"
      }}>
        <h2>Tech Stack:</h2>
        <ul>
          <li>Framework: Next.js 14</li>
          <li>Language: TypeScript</li>
          <li>Database: SQLite ✓</li>
          <li>Monorepo: Turborepo + PNPM</li>
          <li>Runtime: Node.js</li>
        </ul>
      </div>

      <TodoList />
    </main>
  );
}
