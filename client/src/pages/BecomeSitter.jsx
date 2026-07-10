import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function BecomeSitter() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bio: "",
    petsAccepted: [],
    pricePerDay: "",
    location: "",
    availability: { from: "", to: "" },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const petOptions = ["dog", "cat", "rabbit", "bird", "hamster", "fish", "reptile", "other"];

  const togglePet = (pet) => {
    setForm((prev) => ({
      ...prev,
      petsAccepted: prev.petsAccepted.includes(pet)
        ? prev.petsAccepted.filter((p) => p !== pet)
        : [...prev.petsAccepted, pet],
    }));
  };

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAvail = (e) =>
    setForm({ ...form, availability: { ...form.availability, [e.target.name]: e.target.value } });

  const submit = async () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    if (!form.bio || !form.pricePerDay || !form.location)
      return setError("Please fill in all required fields");
    if (form.petsAccepted.length === 0)
      return setError("Please select at least one pet type");

    setLoading(true);
    try {
      await API.post("/sitters", {
        ...form,
        pricePerDay: Number(form.pricePerDay),
      });
      navigate("/sitters");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🐕 Become a Pet Sitter</h2>
      <p style={styles.sub}>Offer pet sitting services to the Pet4Ever community</p>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.card}>
        <div style={styles.field}>
          <label style={styles.label}>About you *</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handle}
            style={styles.textarea}
            placeholder="Tell pet owners about yourself — your experience, home environment, daily routine..."
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Pets you can look after *</label>
          <div style={styles.petGrid}>
            {petOptions.map((pet) => (
              <button
                key={pet}
                onClick={() => togglePet(pet)}
                style={{
                  ...styles.petBtn,
                  ...(form.petsAccepted.includes(pet) ? styles.petBtnActive : {}),
                }}
              >
                {pet === "dog" ? "🐶" : pet === "cat" ? "🐱" : pet === "rabbit" ? "🐰" :
                 pet === "bird" ? "🐦" : pet === "hamster" ? "🐹" : pet === "fish" ? "🐠" :
                 pet === "reptile" ? "🦎" : "🐾"} {pet}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Price per day (SGD) *</label>
            <input
              name="pricePerDay"
              type="number"
              value={form.pricePerDay}
              onChange={handle}
              style={styles.input}
              placeholder="e.g. 30"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Your location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handle}
              style={styles.input}
              placeholder="e.g. Tampines"
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Available from</label>
            <input
              name="from"
              type="date"
              value={form.availability.from}
              onChange={handleAvail}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Available until</label>
            <input
              name="to"
              type="date"
              value={form.availability.to}
              onChange={handleAvail}
              style={styles.input}
            />
          </div>
        </div>

        <button onClick={submit} disabled={loading} style={styles.btn}>
          {loading ? "Submitting..." : "Register as sitter"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "0 auto", padding: "40px 32px", fontFamily: "sans-serif" },
  title: { fontSize: "28px", fontWeight: "700", margin: "0 0 8px" },
  sub: { color: "#6b7280", fontSize: "15px", margin: "0 0 32px" },
  error: { background: "#fee2e2", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "14px" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  field: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px", flex: 1 },
  label: { fontSize: "13px", fontWeight: "600", color: "#374151" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  textarea: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", height: "120px", resize: "vertical", outline: "none" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  petGrid: { display: "flex", flexWrap: "wrap", gap: "10px" },
  petBtn: { padding: "8px 16px", borderRadius: "20px", border: "1px solid #d1d5db", background: "white", cursor: "pointer", fontSize: "13px", textTransform: "capitalize" },
  petBtnActive: { background: "#3CAB7E", color: "white", border: "1px solid #3CAB7E" },
  btn: { background: "#3CAB7E", color: "white", border: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", width: "100%", marginTop: "8px" },
};

export default BecomeSitter;