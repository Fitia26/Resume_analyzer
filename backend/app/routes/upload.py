from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.extractor import extract_text

router = APIRouter()

MAX_SIZE = 10 * 1024 * 1024

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()

    if len(contents) > MAX_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Fichier trop grand. Maximum 10 MB."
        )

    texte = extract_text(contents, file.filename)

    if not texte:
        raise HTTPException(
            status_code=422,
            detail="Impossible d'extraire le texte. Le fichier est peut-être scanné ou vide."
        )

    return {
        "filename": file.filename,
        "word_count": len(texte.split()),
        "text": texte
    }