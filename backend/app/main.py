from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routes import upload, analyze, match
import os

load_dotenv()

app = FastAPI(
    title="AI Resume Analyzer API",
    description="Analyse des CVs avec l'IA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(match.router)

@app.get("/")
def read_root():
    return {
        "message": "Bienvenue sur AI Resume Analyzer API 🚀",
        "status": "ok",
        "version": "1.0.0",
        "docs": "http://localhost:8000/docs"
    }

@app.get("/health")
def health_check():
    openai_key = os.getenv("OPENAI_API_KEY")
    return {
        "status": "healthy",
        "openai_configured": openai_key is not None
    }