export default function AdminDashboard() {
  return (
    <main style={{
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <h1>Admin Dashboard</h1>
      <p>This is the admin interface running on port 3001.</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginTop: "2rem"
      }}>
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
          border: "1px solid #90caf9"
        }}>
          <h3>Users</h3>
          <p>Manage platform users</p>
        </div>
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f3e5f5",
          borderRadius: "8px",
          border: "1px solid #ce93d8"
        }}>
          <h3>Settings</h3>
          <p>Configure application settings</p>
        </div>
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
          border: "1px solid #81c784"
        }}>
          <h3>Analytics</h3>
          <p>View platform analytics</p>
        </div>
      </div>
    </main>
  );
}
