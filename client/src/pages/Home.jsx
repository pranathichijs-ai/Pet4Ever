import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Find your perfect pet companion 🐾</h1>
        <p style={styles.subtitle}>Adopt, rehome, find pet sitters, and connect with Singapore's pet community</p>
        <div style={styles.btnRow}>
          <Link to="/pets?type=adopt" style={styles.btnPrimary}>Adopt a pet</Link>
          <Link to="/pets?type=rehome" style={styles.btnOutline}>Rehome a pet</Link>
        </div>
      </div>

      <div style={styles.grid}>
        {features.map((f) => (
          <Link to={f.link} key={f.title} style={styles.card}>
            <div style={styles.icon}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const features = [
  { icon: "🏠", title: "Adopt", desc: "Find pets looking for a forever home", link: "/pets?type=adopt" },
  { icon: "💝", title: "Rehome", desc: "Find a loving new home for your pet", link: "/pets?type=rehome" },
  { icon: "💞", title: "Find a Mate", desc: "Find a breeding partner for your pet", link: "/pets?type=mate" },
  { icon: "🐕", title: "Pet Sitters", desc: "Trusted sitters to look after your pet", link: "/sitters" },
  { icon: "📖", title: "Care Tips", desc: "Guides on food, health and grooming", link: "/tips" },
  { icon: "🆘", title: "Helplines", desc: "Report abuse or get emergency help", link: "/helplines" },
];

const styles = {
  container: { fontFamily: "sans-serif" },
  hero: { background: "linear-gradient(135deg, #3CAB7E, #2d8f6a)", padding: "80px 32px", textAlign: "center" },
  title: { color: "white", fontSize: "42px", fontWeight: "700", margin: "0 0 16px" },
  subtitle: { color: "rgba(255,255,255,0.85)", fontSize: "18px", margin: "0 0 32px" },
  btnRow: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { background: "white", color: "#3CAB7E", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px" },
  btnOutline: { background: "transparent", color: "white", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px", border: "2px solid white" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", padding: "48px 32px", maxWidth: "1100px", margin: "0 auto" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "28px", textDecoration: "none", transition: "box-shadow 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  icon: { fontSize: "36px", marginBottom: "12px" },
  cardTitle: { color: "#111", fontSize: "18px", fontWeight: "600", margin: "0 0 8px" },
  cardDesc: { color: "#6b7280", fontSize: "14px", margin: 0 },
};

export default Home;