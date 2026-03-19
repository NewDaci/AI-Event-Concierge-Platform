export default function HistoryList({ searches, onSelect }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="history" id="history-panel">
      <div className="history__header">
        <h3 className="history__title">
          🕐 Search History
        </h3>
        {searches.length > 0 && (
          <span className="history__count">{searches.length}</span>
        )}
      </div>

      {searches.length === 0 ? (
        <div className="history__empty">
          <div className="history__empty-icon">📭</div>
          <p>No searches yet. Try describing an event above!</p>
        </div>
      ) : (
        <div className="history__list">
          {searches.map((item) => (
            <div
              key={item.id}
              className="history__item"
              onClick={() => onSelect(item)}
            >
              <p className="history__item-query">{item.query}</p>
              <p className="history__item-venue">{item.proposal.venue_name}</p>
              <div className="history__item-meta">
                <span className="history__item-cost">{item.proposal.estimated_cost}</span>
                <span className="history__item-date">{formatDate(item.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
