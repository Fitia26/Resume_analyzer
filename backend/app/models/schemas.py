from pydantic import BaseModel
from typing import Optional

# Represents the skills extracted from a resume.
class SkillsResult(BaseModel):
    hard_skills: list[str]
    soft_skills: list[str]
    languages: list[str]

# Represents a single feedback message for the resume analysis.
class FeedbackItem(BaseModel):
    text: str
    type: str

# Represents the scoring dimensions used in the analysis.
class ScoreAxes(BaseModel):
    clarity: int
    skills: int
    experience: int
    impact: int

# Stores summary statistics about the resume.
class ResumeStats(BaseModel):
    ats_score: str
    pages: int
    word_count: int
    reading_time: str
    skills_count: int

# Represents how well the resume matches a specific job description.
class MatchResult(BaseModel):
    match_score: int
    job_title: str
    matching_skills: list[str]
    missing_skills: list[str]
    
# Main response model for the resume analysis output.
class AnalysisResult(BaseModel):
    overall_score: int
    score_label: str
    axes: ScoreAxes
    skills: SkillsResult
    feedback: list[FeedbackItem]
    stats: ResumeStats
    match: Optional[MatchResult] = None

