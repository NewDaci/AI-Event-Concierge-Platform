import { useState } from "react";

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length < 5 || isLoading) return;
    onSearch(query.trim());
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <div className="search-bar__input-wrapper">
          <span className="search-bar__icon">🔍</span>
          <input
            className="search-bar__input"
            type="text"
            placeholder="Describe your event… e.g. 'A 20-person team retreat in Bali for 4 days with a $8k budget'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            id="event-search-input"
          />
        </div>
        <button
          className="search-bar__btn"
          type="submit"
          disabled={isLoading || query.trim().length < 5}
          id="event-search-btn"
        >
          <span>✨</span>
          {isLoading ? "Planning…" : "Find Venue"}
        </button>
      </form>
    </div>
  );
}
