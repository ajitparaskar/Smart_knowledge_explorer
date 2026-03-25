import { useState } from "react";

function SearchBar({ initialValue = "", onSearch, disabled = false }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
      }}
    >
      <input
        className="input-field"
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Wikipedia..."
        style={{ flex: "1 1 280px", minWidth: 220 }}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={disabled}
        style={{ width: "auto", padding: "0.75rem 1.25rem" }}
      >
        {disabled ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;

