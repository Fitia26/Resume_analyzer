import json
import os
import re
from openai import AsyncOpenAI, RateLimitError, AuthenticationError
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MATCH_PROMPT = """
You are a senior recruiter comparing a CV with a job description.
Return ONLY a valid JSON object.
Do not add any text before or after the JSON.
Do not wrap the JSON in markdown code blocks.

The JSON must follow this exact structure:
{
    "match_score": <integer between 0 and 100>,
    "job_title": <job title extracted from the job description>,
    "matching_skills": [<list of skills present in both the CV and the job description>],
    "missing_skills": [<list of skills required by the job but missing from the CV>]
}
"""

async def match_job(cv_text: str, job_description: str) -> dict:
    """
    Compares CV text with a job description and returns a match score.
    """
    # Step 1 : call OpenAI with both texts
    # Use MATCH_PROMPT as system message
    # Send cv_text and job_description as user message
    # To complete
    try:
        user_message = f"""
            Here is the CV:
            {cv_text}
            Here is the job description:
            {job_description}
        """
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": MATCH_PROMPT},  
                {"role": "user", "content": user_message}
            ],
            temperature=0.3
        )
        
        raw = response.choices[0].message.content
        raw = re.sub(r"```json\s*", "", raw)
        raw = re.sub(r"```\s*", "", raw)
        raw = raw.strip()
        
        return json.loads(raw)
    except RateLimitError:
        raise HTTPException(
            status_code=402,
            detail="OpenAI quota exceeded. Please add credits at platform.openai.com."
        )
    except AuthenticationError:
        raise HTTPException(
            status_code=401,
            detail="Invalid OpenAI API key. Please check your .env file."
        )
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI returned invalid JSON: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI service error: {str(e)}"
        )
        