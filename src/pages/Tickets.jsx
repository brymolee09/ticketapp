import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(stored);
  }, []);

  const saveTickets = (updated) => {
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!["open", "in_progress", "closed"].includes(form.status)) {
      toast.error("Invalid status value");
      return;
    }

    let updated;
    if (editingIndex !== null) {
      updated = [...tickets];
      updated[editingIndex] = form;
      toast.success("Ticket updated!");
      setEditingIndex(null);
    } else {
      updated = [...tickets, form];
      toast.success("Ticket created!");
    }

    saveTickets(updated);
    setForm({ title: "", description: "", status: "open" });
  };

  const handleEdit = (index) => {
    setForm(tickets[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((_, i) => i !== index);
      saveTickets(updated);
      toast.success("Ticket deleted!");
    }
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Ticket Management</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={styles.textarea}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={styles.select}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit" style={styles.button}>
          {editingIndex !== null ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>

      <section style={styles.ticketList}>
        {tickets.length === 0 ? (
          <p style={styles.noTickets}>No tickets yet.</p>
        ) : (
          tickets.map((ticket, index) => (
            <div key={index} style={styles.card}>
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <span style={{ ...styles.badge, ...getBadgeStyle(ticket.status) }}>
                {ticket.status}
              </span>
              <div style={styles.actions}>
                <button onClick={() => handleEdit(index)} style={styles.editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

const getBadgeStyle = (status) => {
  if (status === "open") return { backgroundColor: "#22c55e" };
  if (status === "in_progress") return { backgroundColor: "#facc15" };
  if (status === "closed") return { backgroundColor: "#9ca3af" };
  return {};
};

const styles = {
  main: { maxWidth: "1000px", margin: "40px auto", padding: "20px" },
  title: { fontSize: "1.8rem", marginBottom: "1.5rem" },
  form: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
  textarea: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px", height: "80px" },
  select: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
  button: { backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer" },
  ticketList: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  card: { backgroundColor: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  badge: { color: "white", padding: "5px 10px", borderRadius: "20px", fontSize: "0.8rem" },
  actions: { marginTop: "10px", display: "flex", gap: "10px" },
  editBtn: { backgroundColor: "#3b82f6", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "5px" },
  deleteBtn: { backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "5px" },
  noTickets: { textAlign: "center", color: "#6b7280" },
};
