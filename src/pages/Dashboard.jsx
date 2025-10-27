import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const resolvedTickets = tickets.filter((t) => t.status === "closed").length;

  return (
    <main style={styles.main}>
      <section style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </section>

      <section style={styles.statsContainer}>
        <div style={{ ...styles.card, borderTop: "4px solid #22c55e" }}>
          <h3>Total Tickets</h3>
          <p style={styles.number}>{totalTickets}</p>
        </div>
        <div style={{ ...styles.card, borderTop: "4px solid #3b82f6" }}>
          <h3>Open Tickets</h3>
          <p style={styles.number}>{openTickets}</p>
        </div>
        <div style={{ ...styles.card, borderTop: "4px solid #a855f7" }}>
          <h3>Resolved Tickets</h3>
          <p style={styles.number}>{resolvedTickets}</p>
        </div>
      </section>

      <section style={styles.actions}>
        <Link to="/tickets" style={styles.linkBtn}>
          Manage Tickets
        </Link>
      </section>
    </main>
  );
}

const styles = {
  main: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.8rem",
    color: "#1e293b",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  number: {
    fontSize: "2rem",
    color: "#0f172a",
    marginTop: "10px",
  },
  actions: {
    textAlign: "center",
  },
  linkBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 18px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
};
