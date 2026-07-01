import { useEffect, useState } from "react";
import API from "../api";

function Tips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    API.get("/tips")
      .then((res) => setTips(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", "food", "health", "grooming", "training", "vaccination", "general"];
  const filtered = filter === "all" ? tips : tips.filter((t) => t.category === filter);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📖 Pet Care Tips</h2>
      <p style={styles.sub}>Guides on food, health, grooming and more</p>

      <div style={styles.filters}>
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            style={{ ...styles.filter, ...(filter === c ? styles.activeFilter : {}) }}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={styles.msg}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={styles.msg}>No tips yet — check back soon!</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map((tip) => (
            <div key={tip._id} style={styles.card}>
              <div style={styles.catBadge}>{tip.category}</div>
              <h3 style={styles.tipTitle}>{tip.title}</h3>
              <p style={styles.content}>{tip.content}</p>
              <div style={styles.species}>
                {tip.species?.map((s) => (
                  <span key={s} style={styles.tag}>{s}</span>
                ))}
              </div>
              {tip.source && <p style={styles.source}>Source: {tip.source}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Static tips shown when DB is empty */}
      {!loading && tips.length === 0 && (
        <div style={styles.grid}>
          {staticTips.map((tip, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.catBadge}>{tip.category}</div>
              <h3 style={styles.tipTitle}>{tip.title}</h3>
              <p style={styles.content}>{tip.content}</p>
              <div style={styles.species}>
                {tip.species.map((s) => <span key={s} style={styles.tag}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const staticTips = [
  { title: "Core vaccines for dogs in Singapore", category: "vaccination", species: ["dog"], content: "Dogs in Singapore require Distemper, Parvovirus, and Adenovirus (DAP) vaccines. Rabies vaccination is also required by AVS. Consult your vet for a booster schedule." },
  { title: "What to feed your cat", category: "food", species: ["cat"], content: "Cats are obligate carnivores. Feed a balanced diet of wet and dry food. Avoid onions, garlic, grapes, and chocolate which are toxic to cats." },
  { title: "Rabbit housing essentials", category: "general", species: ["rabbit"], content: "Rabbits need at least 3x their body length in space. Provide hay 24/7, fresh water, and leafy greens daily. Avoid iceberg lettuce." },
  { title: "Grooming your dog", category: "grooming", species: ["dog"], content: "Brush your dog 2-3 times a week. Bathe every 4-6 weeks. Trim nails monthly and clean ears weekly to prevent infections." },
  { title: "Signs your pet needs a vet", category: "health", species: ["dog", "cat", "rabbit"], content: "Watch for: loss of appetite for 24+ hours, lethargy, vomiting, diarrhoea, difficulty breathing, or unusual lumps. When in doubt, visit a vet." },
  { title: "Basic obedience training", category: "training", species: ["dog"], content: "Start with sit, stay, and come. Use positive reinforcement with treats. Keep sessions to 5-10 minutes. Be consistent and patient." },
];

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 32px", fontFamily: "sans-serif" },
  title: { fontSize: "28px", fontWeight: "700", margin: "0 0 8px" },
  sub: { color: "#6b7280", fontSize: "15px", margin: "0 0 24px" },
  filters: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" },
  filter: { padding: "8px 16px", borderRadius: "20px", border: "1px solid #6b7280", background: "transparent", cursor: "pointer", fontSize: "13px", color: "inherit" },
activeFilter: { background: "#3CAB7E", color: "white", border: "1px solid #3CAB7E" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  catBadge: { display: "inline-block", background: "#E8F7F0", color: "#1D9E75", fontSize: "11px", padding: "3px 10px", borderRadius: "20px", marginBottom: "12px", textTransform: "capitalize" },
  tipTitle: { fontSize: "16px", fontWeight: "600", margin: "0 0 10px" },
  content: { color: "#374151", fontSize: "14px", lineHeight: "1.6", margin: "0 0 12px" },
  species: { display: "flex", gap: "8px", flexWrap: "wrap" },
  tag: { background: "#f3f4f6", color: "#6b7280", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" },
  source: { color: "#9ca3af", fontSize: "12px", marginTop: "10px" },
  msg: { textAlign: "center", color: "#6b7280", fontSize: "16px", marginTop: "60px" },
};

export default Tips;