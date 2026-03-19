export default function ProposalCard({ data }) {
  if (!data) return null;

  const { query, proposal } = data;

  return (
    <div className="proposal-card" id="proposal-card">
      <span className="proposal-card__label">✦ AI Recommendation</span>
      <p className="proposal-card__query">{query}</p>

      <h2 className="proposal-card__venue-name">{proposal.venue_name}</h2>

      <div className="proposal-card__detail">
        <span className="proposal-card__detail-icon">📍</span>
        <span className="proposal-card__detail-label">Location</span>
        <span className="proposal-card__detail-value">{proposal.location}</span>
      </div>

      <div className="proposal-card__detail">
        <span className="proposal-card__detail-icon">💰</span>
        <span className="proposal-card__detail-label">Cost</span>
        <span className="proposal-card__detail-value">{proposal.estimated_cost}</span>
      </div>

      <div className="proposal-card__justification">
        <p className="proposal-card__justification-title">Why it fits</p>
        <p className="proposal-card__justification-text">{proposal.why_it_fits}</p>
      </div>
    </div>
  );
}
