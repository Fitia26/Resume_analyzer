import json
import os
from openai import AsyncOpenAI, RateLimitError, AuthenticationError
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You are a senior recruiter with 10 years of experience.
Analyze the CV provided and return ONLY a valid JSON object.
Do not add any text before or after the JSON.

The JSON must follow this exact structure:
{
    "overall_score": <integer between 0 and 100>,
    "score_label": <"Excellent" | "Good profile" | "Average" | "Needs improvement">,
    "axes": {
        "clarity": <integer between 0 and 100>,
        "skills": <integer between 0 and 100>,
        "experience": <integer between 0 and 100>,
        "impact": <integer between 0 and 100>
    },
    "skills": {
        "hard_skills": [<list of technical skills found>],
        "soft_skills": [<list of soft skills found>],
        "languages": [<list of languages with level, ex: "French — Native">]
    },
    "feedback": [
        {"text": <feedback text>, "type": <"strength" | "improvement" | "critical">}
    ],
    "stats": {
        "ats_score": <"High" | "Medium" | "Low">,
        "pages": <estimated number of pages>,
        "word_count": <number of words>,
        "reading_time": <ex: "~45 sec">,
        "skills_count": <total number of skills found>
    }
}
"""

async def analyze_resume(text: str) -> dict:
    """
    Sends the CV text to GPT-4o-mini and returns the analysis as a dict.
    """

    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},  # instructions
                {"role": "user", "content": f"Here is the CV to analyze:\n\n{text}"} # the CV text
            ],
            temperature=0.3
        )
            
        result = response.choices[0].message.content
        data= json.loads(result)
        return data
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
    
