import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🐾 Pet4Ever</Link>
      <div style={styles.links}>
        <Link to="/pets" style={styles.link}>Adopt / Rehome</Link>
        <Link to="/sitters" style={styles.link}>Pet Sitters</Link>
        <Link to="/tips" style={styles.link}>Care Tips</Link>
        <Link to="/helplines" style={styles.link}>Helplines</Link>
        {token ? (
          <>
            <Link to="/add-pet" style={styles.link}>+ Add Pet</Link>
            <button onClick={logout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btnLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", background: "#3CAB7E", position: "sticky", top: 0, zIndex: 100 },
  logo: { color: "white", fontWeight: "700", fontSize: "22px", textDecoration: "none" },
  links: { display: "flex", alignItems: "center", gap: "20px" },
  link: { color: "white", textDecoration: "none", fontSize: "14px" },
  btn: { background: "white", color: "#3CAB7E", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  btnLink: { background: "white", color: "#3CAB7E", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "14px" },
};

export default Navbar;