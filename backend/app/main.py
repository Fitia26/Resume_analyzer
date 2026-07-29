from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

# Global error handler — catches all unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Unexpected error: {str(exc)}"}
    )

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(analyze.router, prefix="/api", tags=["Analysis"])
app.include_router(match.router, prefix="/api", tags=["Matching"])

@app.get("/",tags=["General"])
def read_root():
    return {
        "message": "Bienvenue sur AI Resume Analyzer API 🚀",
        "status": "ok",
        "version": "1.0.0",
        "docs": "http://localhost:8000/docs"
    }

@app.get("/health", tags=["General"])
def health_check():
    openai_key = os.getenv("OPENAI_API_KEY")
    return {
        "status": "healthy",
        "openai_configured": openai_key is not None
    }