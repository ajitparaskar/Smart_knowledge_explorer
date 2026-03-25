import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Backend expects { username, password } (we map email -> username).
      await register(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      const backendMessage = err?.response?.data?.message;
      setError(backendMessage || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ minHeight: "80vh", paddingTop: "2rem" }}>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 className="gradient-text" style={{ marginBottom: "0.5rem" }}>
          Register
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
          Create your account to search.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Name
            </label>
            <input
              className="input-field"
              id="name"
              type="text"
              name="name"
              value={form.name}
              placeholder="Your name"
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              className="input-field"
              id="email"
              type="email"
              name="email"
              value={form.email}
              placeholder="you@example.com"
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="input-field"
              id="password"
              type="password"
              name="password"
              value={form.password}
              placeholder="Create a password"
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <span style={{ display: "inline-flex", gap: "0.75rem", alignItems: "center", justifyContent: "center" }}>
                <span className="spinner" />
                Creating...
              </span>
            ) : (
              "Register"
            )}
          </button>

          {error && <div className="error-text">{error}</div>}

          <p style={{ color: "var(--text-secondary)", marginTop: "1.25rem" }}>
            Already have an account?{" "}
            <Link to="/" style={{ fontWeight: 600 }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

