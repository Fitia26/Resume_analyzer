# Resume-AI

Application fullstack d'analyse de CV par intelligence artificielle.

## Structure
Resume-AI/
├── backend/ → API FastAPI (Python)
└── frontend/ → Interface React (à venir)

## Stack
- **Backend** : Python, FastAPI, pdfplumber, OpenAI
- **Frontend** : React, Vite (à venir)

## Lancer le backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API disponible sur
- http://localhost:8000
- http://localhost:8000/docs