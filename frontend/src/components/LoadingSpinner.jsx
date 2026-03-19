export default function LoadingSpinner() {
  return (
    <div className="loading" id="loading-state">
      <div className="loading__orb-container">
        <div className="loading__orb"></div>
        <div className="loading__orb"></div>
        <div className="loading__orb"></div>
        <div className="loading__orb"></div>
      </div>
      <p className="loading__text">AI is planning your event…</p>
      <p className="loading__subtext">Searching for the perfect venue</p>
    </div>
  );
}
