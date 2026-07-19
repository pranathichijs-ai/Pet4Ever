import { useState } from "react";

const places = {
  vets: [
    { name: "Mount Pleasant Animal Medical Centre", lat: 1.3200, lng: 103.8400, address: "310 East Coast Rd", phone: "6344 2277" },
    { name: "Animal Recovery Centre", lat: 1.3070, lng: 103.8320, address: "26 Jalan Pari Burong", phone: "6243 3282" },
    { name: "Amber Vet", lat: 1.3010, lng: 103.9050, address: "12 Jalan Kembangan", phone: "6636 1788" },
    { name: "The Animal Clinic", lat: 1.3600, lng: 103.8300, address: "19 Bright Hill Dr", phone: "6459 4436" },
    { name: "Veterinary Surgery Jurong", lat: 1.3330, lng: 103.7060, address: "Jurong West", phone: "6567 2552" },
    { name: "East Coast Vet Clinic", lat: 1.3150, lng: 103.9200, address: "Bedok", phone: "6448 8376" },
  ],
  petShops: [
    { name: "Pet Lovers Centre (Tampines)", lat: 1.3530, lng: 103.9450, address: "Tampines Mall", phone: "6783 0112" },
    { name: "Pet Lovers Centre (Jurong)", lat: 1.3330, lng: 103.7430, address: "Jurong Point", phone: "6792 1488" },
    { name: "Kohepets", lat: 1.3800, lng: 103.8450, address: "Ang Mo Kio", phone: "6456 1188" },
    { name: "The Pet Safari (Bugis)", lat: 1.2990, lng: 103.8550, address: "Bugis Junction", phone: "6338 0311" },
    { name: "Pet Station (Bedok)", lat: 1.3240, lng: 103.9300, address: "Bedok North", phone: "6449 2277" },
  ],
  adoption: [
    { name: "SPCA Singapore", lat: 1.3230, lng: 103.8120, address: "6 Sungei Tengah Rd", phone: "6287 5355" },
    { name: "Animal Welfare Society", lat: 1.3450, lng: 103.7800, address: "Bukit Timah", phone: "6763 0200" },
    { name: "Save Our Street Dogs (SOSD)", lat: 1.3600, lng: 103.8900, address: "Hougang", phone: "9111 7522" },
  ],
};

const categoryIcons = { vets: "🏥", petShops: "🛒", adoption: "🐾" };
const categoryColors = { vets: "#E6F1FB", petShops: "#E8F7F0", adoption: "#FBEAF0" };

function Nearby() {
  const [activeCategory, setActiveCategory] = useState("vets");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const currentPlaces = places[activeCategory];
  const center = selectedPlace
    ? `${selectedPlace.lat},${selectedPlace.lng}`
    : "1.3521,103.8198";
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    Number(center.split(",")[1]) - 0.05
  }%2C${Number(center.split(",")[0]) - 0.05}%2C${
    Number(center.split(",")[1]) + 0.05
  }%2C${Number(center.split(",")[0]) + 0.05}&layer=mapnik&marker=${center}`;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📍 Nearby</h2>
      <p style={styles.sub}>Find vets, pet shops, and adoption centres near you in Singapore</p>

      <div style={styles.tabs}>
        {Object.keys(places).map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedPlace(null); }}
            style={{ ...styles.tab, ...(activeCategory === cat ? styles.activeTab : {}) }}
          >
            {categoryIcons[cat]} {cat === "vets" ? "Vets" : cat === "petShops" ? "Pet Shops" : "Adoption"}
          </button>
        ))}
      </div>

      <div style={styles.layout}>
        <div style={styles.mapWrapper}>
          <iframe
            title="map"
            src={mapSrc}
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "16px" }}
          />
        </div>

        <div style={styles.list}>
          {currentPlaces.map((place) => (
            <div
              key={place.name}
              onClick={() => setSelectedPlace(place)}
              style={{
                ...styles.card,
                background: categoryColors[activeCategory],
                border: selectedPlace?.name === place.name ? "2px solid #3CAB7E" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <div style={styles.cardIcon}>{categoryIcons[activeCategory]}</div>
              <div>
                <h4 style={styles.cardName}>{place.name}</h4>
                <p style={styles.cardAddr}>📍 {place.address}</p>
                <a href={`tel:${place.phone}`} style={styles.cardPhone} onClick={e => e.stopPropagation()}>
                  📞 {place.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPlace && (
        <p style={styles.hint}>Showing location of <strong>{selectedPlace.name}</strong> — <span style={{ color: "#3CAB7E", cursor: "pointer" }} onClick={() => setSelectedPlace(null)}>show all</span></p>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "1200px", margin: "0 auto", padding: "40px 32px", fontFamily: "sans-serif" },
  title: { fontSize: "28px", fontWeight: "700", margin: "0 0 8px" },
  sub: { color: "#6b7280", fontSize: "15px", margin: "0 0 24px" },
  tabs: { display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" },
  tab: { padding: "10px 20px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500" },
  activeTab: { background: "#3CAB7E", color: "white", border: "1px solid #3CAB7E" },
  layout: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", height: "520px" },
  mapWrapper: { borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e7eb" },
  list: { overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" },
  card: { borderRadius: "12px", padding: "14px", display: "flex", gap: "12px", alignItems: "flex-start" },
  cardIcon: { fontSize: "24px", flexShrink: 0 },
  cardName: { margin: "0 0 4px", fontSize: "14px", fontWeight: "600" },
  cardAddr: { margin: "0 0 4px", fontSize: "12px", color: "#6b7280" },
  cardPhone: { fontSize: "12px", color: "#3CAB7E", fontWeight: "600", textDecoration: "none" },
  hint: { marginTop: "12px", fontSize: "13px", color: "#6b7280" },
};

export default Nearby;