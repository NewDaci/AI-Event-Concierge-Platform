# AI Event Concierge Platform

An AI-powered full-stack platform that helps users plan corporate offsites by generating venue proposals from natural language descriptions.

**Tech Stack:** FastAPI · React (Vite) · MongoDB · OpenAI GPT-4o-mini

---

## 📋 Prerequisites

- **Python 3.10+**
- **Node.js 18+** & npm
- **MongoDB** (local or Atlas)
- **OpenAI API Key** ([platform.openai.com](https://platform.openai.com))

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Louder
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate        # Linux/Mac
# .venv\Scripts\activate         # Windows

# Install dependencies
pip install -r backend/requirements.txt

# Configure environment variables
cp backend/.env.example backend/.env
# Edit backend/.env and add your OPENAI_API_KEY and MONGODB_URI
```

**Environment Variables (`backend/.env`):**

| Variable         | Description                     | Default                      |
|------------------|---------------------------------|------------------------------|
| `OPENAI_API_KEY` | Your OpenAI API key             | *(required)*                 |
| `MONGODB_URI`    | MongoDB connection string       | `mongodb://localhost:27017`  |
| `MONGODB_DB_NAME`| Database name                   | `event_concierge`            |
| `FRONTEND_URL`   | Frontend URL for CORS           | `http://localhost:5173`      |

**Start the backend:**

```bash
cd backend
source ../.venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000` and interactive docs at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🏗 Project Structure

```
Louder/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI app entry point
│   │   ├── config.py             # Environment config
│   │   ├── database.py           # MongoDB connection (motor)
│   │   ├── models.py             # Pydantic schemas
│   │   ├── routes/
│   │   │   └── search.py         # POST /api/search, GET /api/history
│   │   └── services/
│   │       └── openai_service.py # OpenAI LLM integration
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Root component
│   │   ├── api.js                # API client
│   │   ├── index.css             # Design system
│   │   ├── main.jsx              # React entry point
│   │   └── components/
│   │       ├── SearchBar.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── ProposalCard.jsx
│   │       └── HistoryList.jsx
│   └── index.html
└── README.md
```

---

## 📡 API Endpoints

### `POST /api/search`

Submit a natural language event description and receive an AI-generated venue proposal.

**Request:**
```json
{ "query": "A 10-person leadership retreat in the mountains for 3 days with a $4k budget" }
```

**Response:**
```json
{
  "id": "...",
  "query": "A 10-person leadership retreat...",
  "proposal": {
    "venue_name": "Sundance Mountain Resort",
    "location": "Sundance, Utah",
    "estimated_cost": "$3,500 - $4,000",
    "why_it_fits": "Nestled in the Wasatch Mountains, Sundance offers an intimate retreat setting..."
  },
  "created_at": "2026-03-18T10:45:00"
}
```

### `GET /api/history`

Returns all past searches, sorted newest first.

---

## ✨ Features

- 🤖 **AI-Powered** — GPT-4o-mini generates structured venue recommendations
- 💾 **Persistent History** — All searches stored in MongoDB, survives page refresh
- 🎨 **Modern UI** — Dark theme, glassmorphism, gradient accents, micro-animations
- ⚡ **Real-time Feedback** — Animated loading state while AI generates proposals
- 📱 **Responsive** — Works on desktop and mobile
