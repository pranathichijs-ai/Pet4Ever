import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", location: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🐾 Join Pet4Ever</h2>
        <p style={styles.sub}>Create your free account</p>
        {error && <p style={styles.error}>{error}</p>}
        {[
          { name: "name", label: "Full name", placeholder: "Pranathi", type: "text" },
          { name: "email", label: "Email", placeholder: "you@email.com", type: "email" },
          { name: "password", label: "Password", placeholder: "••••••••", type: "password" },
          { name: "phone", label: "Phone (optional)", placeholder: "+65 9123 4567", type: "text" },
          { name: "location", label: "Location (optional)", placeholder: "e.g. Tampines, Singapore", type: "text" },
        ].map((f) => (
          <div key={f.name} style={styles.field}>
            <label style={styles.label}>{f.label}</label>
            <input name={f.name} type={f.type} value={form[f.name]} onChange={handle} style={styles.input} placeholder={f.placeholder} />
          </div>
        ))}
        <button onClick={submit} disabled={loading} style={styles.btn}>
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p style={styles.footer}>Already have an account? <Link to="/login" style={styles.link}>Log in</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", fontFamily: "sans-serif" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "420px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  title: { fontSize: "24px", fontWeight: "700", margin: "0 0 6px" },
  sub: { color: "#6b7280", fontSize: "14px", margin: "0 0 24px" },
  error: { background: "#fee2e2", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" },
  field: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#374151" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  btn: { background: "#3CAB7E", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer", width: "100%", marginTop: "8px" },
  footer: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#6b7280" },
  link: { color: "#3CAB7E", fontWeight: "600", textDecoration: "none" },
};

export default Register;