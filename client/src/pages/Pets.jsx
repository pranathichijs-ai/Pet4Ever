import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api";

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
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
              <div style={styles.imgBox}>{pet.species === "dog" ? "🐶" : pet.species === "cat" ? "🐱" : pet.species === "rabbit" ? "🐰" : pet.species === "bird" ? "🐦" : "🐾"}</div>
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
              </div>
            </div>
          ))}
        </div>
      )}
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
  owner: { color: "#9ca3af", fontSize: "12px", margin: 0 },
  msg: { textAlign: "center", color: "#6b7280", marginTop: "60px", fontSize: "16px" },
};

export default Pets;