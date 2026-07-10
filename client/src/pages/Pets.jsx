import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import API from "../api";

function ContactModal({ pet, onClose }) {
  const [form, setForm] = useState({ from_name: "", from_email: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = async () => {
    setStatus("sending");
    try {
      await emailjs.send(
        "service_xsnpvt7",
        "template_z4abyxl",
        {
          from_name: form.from_name,
          from_email: form.from_email,
          message: form.message,
          pet_name: pet.name,
          to_name: pet.owner?.name,
        },
        "oUJTunoChEqYIWxuP"
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={modal.box} onClick={(e) => e.stopPropagation()}>
        <h3 style={modal.title}>Contact about {pet.name}</h3>
        <p style={modal.sub}>Send a message to {pet.owner?.name}</p>
        {status === "sent" ? (
          <p style={modal.success}>✅ Message sent! They'll reply to your email.</p>
        ) : (
          <>
            <input placeholder="Your name" value={form.from_name} onChange={e => setForm({...form, from_name: e.target.value})} style={modal.input} />
            <input placeholder="Your email" value={form.from_email} onChange={e => setForm({...form, from_email: e.target.value})} style={modal.input} />
            <textarea placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={modal.textarea} />
            {status === "error" && <p style={modal.error}>Something went wrong. Try again.</p>}
            <div style={modal.btnRow}>
              <button onClick={onClose} style={modal.cancelBtn}>Cancel</button>
              <button onClick={submit} disabled={status === "sending"} style={modal.sendBtn}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const listingType = searchParams.get("type") || "adopt";

  useEffect(() => {
    setLoading(true);
    API.get(`/pets?listingType=${listingType}`)
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [listingType]);

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {["adopt", "rehome", "mate"].map((t) => (
          <button
            key={t}
            onClick={() => setSearchParams({ type: t })}
            style={{ ...styles.tab, ...(listingType === t ? styles.activeTab : {}) }}
          >
            {t === "adopt" ? "🏠 Adopt" : t === "rehome" ? "💝 Rehome" : "💞 Find Mate"}
          </button>
        ))}
        <Link to="/add-pet" style={styles.addBtn}>+ Add listing</Link>
      </div>

      {loading ? (
        <p style={styles.msg}>Loading...</p>
      ) : pets.length === 0 ? (
        <p style={styles.msg}>No listings yet. Be the first to add one!</p>
      ) : (
        <div style={styles.grid}>
          {pets.map((pet) => (
            <div key={pet._id} style={styles.card}>
              <div style={styles.imgBox}>
                {pet.images && pet.images.length > 0
                  ? <img src={pet.images[0]} alt={pet.name} style={styles.petImg} />
                  : (pet.species === "dog" ? "🐶" : pet.species === "cat" ? "🐱" : pet.species === "rabbit" ? "🐰" : pet.species === "bird" ? "🐦" : "🐾")
                }
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{pet.name}</h3>
                <p style={styles.breed}>{pet.breed || pet.species} · {pet.age ? `${pet.age} months` : "Age unknown"}</p>
                <p style={styles.location}>📍 {pet.location || "Singapore"}</p>
                <p style={styles.desc}>{pet.description?.slice(0, 80)}...</p>
                <div style={styles.tags}>
                  {pet.vaccinated && <span style={styles.tag}>✅ Vaccinated</span>}
                  {pet.neutered && <span style={styles.tag}>✂️ Neutered</span>}
                </div>
                <p style={styles.owner}>Posted by {pet.owner?.name}</p>
                <button onClick={() => setSelectedPet(pet)} style={styles.contactBtn}>
                  💬 Contact Owner
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPet && <ContactModal pet={selectedPet} onClose={() => setSelectedPet(null)} />}
    </div>
  );
}

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "32px" },
  tabs: { display: "flex", gap: "12px", marginBottom: "32px", alignItems: "center", flexWrap: "wrap" },
  tab: { padding: "10px 20px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  activeTab: { background: "#3CAB7E", color: "white", border: "1px solid #3CAB7E" },
  addBtn: { marginLeft: "auto", background: "#3CAB7E", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  imgBox: { background: "#f3f4f6", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px" },
  info: { padding: "16px" },
  name: { margin: "0 0 4px", fontSize: "18px", fontWeight: "600" },
  breed: { color: "#6b7280", fontSize: "13px", margin: "0 0 6px" },
  location: { color: "#6b7280", fontSize: "13px", margin: "0 0 8px" },
  desc: { color: "#374151", fontSize: "13px", margin: "0 0 10px" },
  tags: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" },
  tag: { background: "#E8F7F0", color: "#1D9E75", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" },
  owner: { color: "#9ca3af", fontSize: "12px", margin: "0 0 10px" },
  contactBtn: { background: "#3CAB7E", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", width: "100%" },
  msg: { textAlign: "center", color: "#6b7280", marginTop: "60px", fontSize: "16px" },
  petImg: { width: "100%", height: "100%", objectFit: "cover" },
};

const modal = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  box: { background: "white", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "440px", margin: "16px" },
  title: { fontSize: "18px", fontWeight: "700", margin: "0 0 4px", color: "#111" },
  sub: { color: "#6b7280", fontSize: "14px", margin: "0 0 20px" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", outline: "none" },
  textarea: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", height: "120px", marginBottom: "12px", boxSizing: "border-box", resize: "vertical", outline: "none" },
  btnRow: { display: "flex", gap: "12px", justifyContent: "flex-end" },
  cancelBtn: { padding: "10px 20px", borderRadius: "8px", border: "1px solid #d1d5db", background: "white", cursor: "pointer", fontSize: "14px" },
  sendBtn: { padding: "10px 20px", borderRadius: "8px", border: "none", background: "#3CAB7E", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  success: { color: "#1D9E75", fontWeight: "600", textAlign: "center", padding: "20px 0" },
  error: { color: "#b91c1c", fontSize: "13px", marginBottom: "12px" },
};

export default Pets;