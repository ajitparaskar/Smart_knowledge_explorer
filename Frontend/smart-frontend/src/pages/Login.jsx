import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      // Backend expects { username, password }, we map email -> username.
      const res = await login(form.email, form.password);
      const token = res?.access_token;

      if (!token) {
        throw new Error("Login succeeded but token was missing.");
      }

      localStorage.setItem("token", token);
      navigate("/home", { replace: true });
    } catch (err) {
      const backendMessage = err?.response?.data?.message;
      setError(backendMessage || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ minHeight: "80vh", paddingTop: "2rem" }}>
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 className="gradient-text" style={{ marginBottom: "0.5rem" }}>
          Login
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
          Search knowledge with authenticated access.
        </p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <span style={{ display: "inline-flex", gap: "0.75rem", alignItems: "center", justifyContent: "center" }}>
                <span className="spinner" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          {error && <div className="error-text">{error}</div>}

          <p style={{ color: "var(--text-secondary)", marginTop: "1.25rem" }}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ fontWeight: 600 }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}