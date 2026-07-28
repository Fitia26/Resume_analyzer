from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.matcher import match_job
from app.models.schemas import MatchResult

router = APIRouter()

class MatchRequest(BaseModel):
    cv_text: str
    job_description: str


@router.post("/match", response_model=MatchResult)
async def match(request: MatchRequest):
    """
    Compares a CV with a job description and returns compatibility score.
    """
    if not request.cv_text.strip():
        raise HTTPException(
            status_code=400,
            detail="cv is empty"
        )
    if not request.job_description.strip():
            raise HTTPException(
                status_code=400,
                detail="job description is empty"
            )

    result = await match_job(request.cv_text, request.job_description)
    return result