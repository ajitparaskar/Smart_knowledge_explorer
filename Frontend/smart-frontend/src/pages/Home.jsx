import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import { searchKnowledge } from "../services/api";

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'empty'|'error', text: string }

  const handleSearch = async (query) => {
    const q = (query || "").trim();
    if (!q) {
      setResults([]);
      setMessage({ type: "error", text: "Please enter a search query." });
      return;
    }

    setLoading(true);
    setMessage(null);
    setResults([]);

    try {
      const data = await searchKnowledge(q);

      // Backend returns a single object with { title, summary }.
      const title = data?.title;
      const summary = data?.summary;

      if (title) {
        setResults([{ title, snippet: summary || "No description available." }]);
        setMessage(null);
      } else {
        setResults([]);
        setMessage({
          type: "empty",
          text: "No results found.",
        });
      }
    } catch (err) {
      const status = err?.response?.status;
      const backendMessage = err?.response?.data?.message;
      const text = backendMessage || "Search failed. Please try again.";

      // Backend uses 404 for "No results found".
      if (status === 404 || (backendMessage || "").toLowerCase().includes("no results")) {
        setResults([]);
        setMessage({ type: "empty", text });
      } else {
        setResults([]);
        setMessage({ type: "error", text });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingBottom: "2rem" }}>
        <h1 className="gradient-text" style={{ marginBottom: "1rem" }}>
          Search
        </h1>

        <SearchBar onSearch={handleSearch} disabled={loading} />

        {loading && (
          <div className="loading-container">
            <div className="spinner spinner-large" />
            <div className="loading-text">Searching...</div>
          </div>
        )}

        {!loading && message?.type === "error" && (
          <div className="error-text">{message.text}</div>
        )}

        {!loading && message?.type === "empty" && (
          <div className="no-results">{message.text}</div>
        )}

        {!loading && !message && results.length > 0 && (
          <div style={{ display: "grid", gap: "1rem" }}>
            {results.map((r, idx) => (
              <ResultCard key={idx} title={r.title} snippet={r.snippet} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
