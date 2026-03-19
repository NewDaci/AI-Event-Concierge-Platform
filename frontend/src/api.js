// const API_BASE = "http://localhost:8000/api";
const API_BASE = "https://believable-renewal-production.up.railway.app/api";

export async function searchVenue(query) {
  const response = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Something went wrong. Please try again.");
  }

  return response.json();
}

export async function getHistory() {
  const response = await fetch(`${API_BASE}/history`);

  if (!response.ok) {
    throw new Error("Failed to load search history.");
  }

  return response.json();
}
