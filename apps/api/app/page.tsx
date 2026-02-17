export default function ApiHome() {
  return (
    <main style={{
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1>Nexus API Service</h1>
      <p>This API service is running on port 3002.</p>

      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
      }}>
        <h2>Available Endpoints:</h2>
        <ul>
          <li>
            <code>GET /api/health</code> - Health check endpoint
          </li>
          <li>
            <code>GET /api/todos</code> - Get all todos (coming soon)
          </li>
          <li>
            <code>POST /api/todos</code> - Create a new todo (coming soon)
          </li>
        </ul>
      </div>
    </main>
  );
}
