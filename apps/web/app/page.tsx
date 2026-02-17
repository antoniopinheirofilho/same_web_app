// import { TodoList } from "./components/TodoList";

export default function Home() {
  return (
    <main style={{
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1>Welcome to Nexus Web App</h1>
      <p>This is a simple Next.js application deployed on Databricks Apps!</p>
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
          <li>Monorepo: npm workspaces</li>
          <li>Runtime: Node.js</li>
          <li>Platform: Databricks Apps ✓</li>
        </ul>
      </div>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#e8f5e9",
        borderRadius: "8px",
        border: "2px solid #4caf50"
      }}>
        <h2>✓ Deployment Successful!</h2>
        <p>Your application is running correctly on Databricks.</p>
        <p><small>Timestamp: {new Date().toISOString()}</small></p>
      </div>

      {/* <TodoList /> */}
    </main>
  );
}
