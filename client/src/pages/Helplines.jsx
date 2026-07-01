function Helplines() {
  const helplines = [
    {
      name: "SPCA Singapore",
      number: "6287 5355",
      description: "Report animal abuse, surrender animals, adoption enquiries",
      hours: "Mon–Fri 9am–5pm",
      website: "https://www.spca.org.sg",
      icon: "🐾",
      color: "#E8F7F0",
    },
    {
      name: "Animal & Veterinary Service (AVS)",
      number: "1800 476 1600",
      description: "Government body for animal welfare, licensing, strays",
      hours: "Mon–Fri 8:30am–5:30pm",
      website: "https://www.nparks.gov.sg/avs",
      icon: "🏛️",
      color: "#E6F1FB",
    },
    {
      name: "ACRES Wildlife Rescue",
      number: "9783 7782",
      description: "24-hour wildlife rescue and animal cruelty reporting",
      hours: "24 hours",
      website: "https://www.acres.org.sg",
      icon: "🦮",
      color: "#FFF3E0",
    },
    {
      name: "House Rabbit Society Singapore",
      number: "Contact via website",
      description: "Rabbit rescue, rehoming, and care advice",
      hours: "By appointment",
      website: "https://hrss.org.sg",
      icon: "🐰",
      color: "#FBEAF0",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h2 style={styles.bannerTitle}>🆘 Helplines & Emergency Contacts</h2>
        <p style={styles.bannerSub}>Report abuse, get emergency help, or find support for your pet</p>
      </div>

      <div style={styles.grid}>
        {helplines.map((h) => (
          <div key={h.name} style={styles.card}>
            <div style={{ ...styles.iconBox, background: h.color }}>{h.icon}</div>
            <div style={styles.info}>
              <h3 style={styles.name}>{h.name}</h3>
              <p style={styles.desc}>{h.description}</p>
              <p style={styles.hours}>⏰ {h.hours}</p>
              <a href={`tel:${h.number}`} style={styles.number}>📞 {h.number}</a>
              <a href={h.website} target="_blank" rel="noreferrer" style={styles.website}>
                Visit website ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.abuseBanner}>
        <h3 style={styles.abuseTitle}>🚨 Witnessed animal abuse?</h3>
        <p style={styles.abuseDesc}>
          Call SPCA at <strong>6287 5355</strong> or ACRES at <strong>9783 7782</strong> immediately.
          You can also file a report online at spca.org.sg. Your report can save a life.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "40px 32px", fontFamily: "sans-serif" },
  banner: { background: "linear-gradient(135deg, #E53E3E, #C53030)", borderRadius: "16px", padding: "40px", textAlign: "center", marginBottom: "40px" },
  bannerTitle: { color: "white", fontSize: "28px", fontWeight: "700", margin: "0 0 8px" },
  bannerSub: { color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: 0 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "20px", marginBottom: "32px" },
  card: { background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", display: "flex", gap: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  iconBox: { width: "56px", height: "56px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 },
  info: { flex: 1 },
  name: { fontSize: "16px", fontWeight: "700", margin: "0 0 6px" },
  desc: { color: "#374151", fontSize: "13px", margin: "0 0 8px", lineHeight: "1.5" },
  hours: { color: "#6b7280", fontSize: "12px", margin: "0 0 10px" },
  number: { display: "block", color: "#3CAB7E", fontWeight: "700", fontSize: "15px", textDecoration: "none", marginBottom: "6px" },
website: { color: "#6b7280", fontSize: "12px", textDecoration: "none" },}

export default Helplines;