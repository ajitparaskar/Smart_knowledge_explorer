import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border-color)",
        marginBottom: "1.5rem",
      }}
    >
      <div className="container" style={{ padding: "1rem 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              to="/home"
              style={{
                fontWeight: 700,
                letterSpacing: "0.2px",
                color: "var(--text-primary)",
              }}
            >
              Smart Knowledge Explorer
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              to="/home"
              style={{ color: "var(--text-secondary)", fontWeight: 600 }}
            >
              Home
            </Link>

            <button
              className="btn btn-danger"
              onClick={handleLogout}
              style={{ width: "auto", padding: "0.5rem 1rem" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;