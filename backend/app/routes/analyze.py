from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.analyzer import analyze_resume
from app.models.schemas import AnalysisResult

router = APIRouter()


# Request body model — what the frontend sends
class AnalyzeRequest(BaseModel):
    text: str   


@router.post("/analyze", response_model=AnalysisResult)
async def analyze(request: AnalyzeRequest):
    """
    Receives CV text and returns the full AI analysis.
    """

    if not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="CV text is empty. Please upload a valid document first."
        )

    
    result = await analyze_resume(request.text)
    return result