function ResultCard({ title, snippet }) {
  return (
    <article
      className="card"
      style={{
        maxWidth: "none",
        padding: "1.5rem",
      }}
    >
      <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
        {title}
      </h3>

      <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {snippet}
      </p>
    </article>
  );
}

export default ResultCard;

