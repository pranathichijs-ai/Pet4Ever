import { useEffect, useState } from "react";
import API from "../api";

function Sitters() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/sitters")
      .then((res) => setSitters(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🐕 Pet Sitters</h2>
      <p style={styles.sub}>Trusted community members who will look after your pet</p>

      {loading ? (
        <p style={styles.msg}>Loading...</p>
      ) : sitters.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.msg}>No sitters listed yet.</p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>Be the first to offer pet sitting in your area!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {sitters.map((s) => (
            <div key={s._id} style={styles.card}>
              <div style={styles.avatar}>{s.user?.name?.[0] || "?"}</div>
              <h3 style={styles.name}>{s.user?.name}</h3>
              <p style={styles.location}>📍 {s.location || "Singapore"}</p>
              <p style={styles.bio}>{s.bio}</p>
              <div style={styles.pets}>
                {s.petsAccepted?.map((p) => (
                  <span key={p} style={styles.tag}>{p}</span>
                ))}
              </div>
              <div style={styles.footer}>
                <span style={styles.price}>${s.pricePerDay}/day</span>
                <span style={styles.rating}>⭐ {s.rating > 0 ? s.rating.toFixed(1) : "New"}</span>
              </div>
              {s.user?.phone && (
                <a href={`tel:${s.user.phone}`} style={styles.btn}>Contact</a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 32px", fontFamily: "sans-serif" },
  title: { fontSize: "28px", fontWeight: "700", margin: "0 0 8px" },
  sub: { color: "#6b7280", fontSize: "15px", margin: "0 0 32px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" },
  avatar: { width: "60px", height: "60px", background: "#3CAB7E", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", margin: "0 auto 12px" },
  name: { fontSize: "18px", fontWeight: "600", margin: "0 0 4px" },
  location: { color: "#6b7280", fontSize: "13px", margin: "0 0 10px" },
  bio: { color: "#374151", fontSize: "13px", margin: "0 0 12px", lineHeight: "1.5" },
  pets: { display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "16px" },
  tag: { background: "#E8F7F0", color: "#1D9E75", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  price: { fontWeight: "700", color: "#3CAB7E", fontSize: "16px" },
  rating: { color: "#6b7280", fontSize: "14px" },
  btn: { display: "block", background: "#3CAB7E", color: "white", padding: "10px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" },
  msg: { textAlign: "center", color: "#6b7280", fontSize: "16px", marginTop: "60px" },
  empty: { textAlign: "center", marginTop: "60px" },
};

export default Sitters;