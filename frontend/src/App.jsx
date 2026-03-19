import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ProposalCard from "./components/ProposalCard";
import HistoryList from "./components/HistoryList";
import { searchVenue, getHistory } from "./api";

export default function App() {
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data.searches);
    } catch {
      // Silent fail on history load — not critical
      console.warn("Could not load search history");
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setCurrentResult(null);

    try {
      const result = await searchVenue(query);
      setCurrentResult(result);
      // Refresh history
      await loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item) => {
    setCurrentResult(item);
    setError(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__badge">
          <span className="header__badge-dot"></span>
          AI-Powered Event Planning
        </div>
        <h1 className="header__title">Event Concierge</h1>
        <p className="header__subtitle">
          Describe your corporate event in plain English and get an instant, AI-curated venue recommendation.
        </p>
      </header>

      {/* Search */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Content */}
      <div className="content">
        <main>
          {isLoading && <LoadingSpinner />}

          {error && (
            <div className="error" id="error-message">
              <span className="error__icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !error && currentResult && (
            <ProposalCard data={currentResult} />
          )}

          {!isLoading && !error && !currentResult && (
            <div className="empty-state">
              <div className="empty-state__icon">🏨</div>
              <h3 className="empty-state__title">Ready to plan your next event?</h3>
              <p className="empty-state__text">
                Tell us about your corporate offsite — team size, location preference, budget, and duration — and our AI will find the perfect venue.
              </p>
            </div>
          )}
        </main>

        <aside>
          <HistoryList searches={history} onSelect={handleHistorySelect} />
        </aside>
      </div>
    </div>
  );
}
