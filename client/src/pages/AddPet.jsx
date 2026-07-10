import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const CLOUD_NAME = "qifjwya0";
const UPLOAD_PRESET = "b9sl8vea";

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.secure_url;
}

function AddPet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", species: "dog", breed: "", age: "", gender: "male",
    description: "", listingType: "adopt", location: "",
    vaccinated: false, neutered: false, healthNotes: "",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const submit = async () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    setLoading(true);
    try {
      let imageUrls = [];
      if (images.length > 0) {
        imageUrls = await Promise.all(images.map(uploadImage));
      }
      await API.post("/pets", { ...form, age: Number(form.age), images: imageUrls });
      navigate("/pets?type=" + form.listingType);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a pet listing</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        <div style={styles.field}>
          <label style={styles.label}>Pet name</label>
          <input name="name" value={form.name} onChange={handle} style={styles.input} placeholder="e.g. Mochi" />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Listing type</label>
          <select name="listingType" value={form.listingType} onChange={handle} style={styles.input}>
            <option value="adopt">Adopt</option>
            <option value="rehome">Rehome</option>
            <option value="mate">Find mate</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Species</label>
          <select name="species" value={form.species} onChange={handle} style={styles.input}>
            {["dog","cat","rabbit","bird","hamster","fish","reptile","other"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Breed (optional)</label>
          <input name="breed" value={form.breed} onChange={handle} style={styles.input} placeholder="e.g. Corgi" />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Age (months)</label>
          <input name="age" type="number" value={form.age} onChange={handle} style={styles.input} placeholder="e.g. 12" />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Gender</label>
          <select name="gender" value={form.gender} onChange={handle} style={styles.input}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Location</label>
          <input name="location" value={form.location} onChange={handle} style={styles.input} placeholder="e.g. Tampines" />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea name="description" value={form.description} onChange={handle} style={styles.textarea} placeholder="Tell us about this pet..." />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Health notes (optional)</label>
        <textarea name="healthNotes" value={form.healthNotes} onChange={handle} style={{ ...styles.textarea, height: "80px" }} placeholder="Any medical history, allergies, etc." />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Photos (up to 3)</label>
        <input type="file" accept="image/*" multiple onChange={handleImages} style={styles.fileInput} />
        {previews.length > 0 && (
          <div style={styles.previews}>
            {previews.map((p, i) => (
              <img key={i} src={p} alt="preview" style={styles.preview} />
            ))}
          </div>
        )}
      </div>

      <div style={styles.checkRow}>
        <label style={styles.checkLabel}>
          <input type="checkbox" name="vaccinated" checked={form.vaccinated} onChange={handle} />
          Vaccinated
        </label>
        <label style={styles.checkLabel}>
          <input type="checkbox" name="neutered" checked={form.neutered} onChange={handle} />
          Neutered / Spayed
        </label>
      </div>

      <button onClick={submit} disabled={loading} style={styles.btn}>
        {loading ? "Uploading & posting..." : "Post listing"}
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "0 auto", padding: "40px 32px", fontFamily: "sans-serif" },
  title: { fontSize: "26px", fontWeight: "700", marginBottom: "24px" },
  error: { background: "#fee2e2", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "16px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#374151" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" },
  textarea: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", height: "120px", resize: "vertical", outline: "none" },
  fileInput: { padding: "8px 0", fontSize: "14px" },
  previews: { display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" },
  preview: { width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e7eb" },
  checkRow: { display: "flex", gap: "24px", marginBottom: "24px" },
  checkLabel: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" },
  btn: { background: "#3CAB7E", color: "white", border: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", width: "100%" },
};

export default AddPet;