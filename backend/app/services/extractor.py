import pdfplumber
import io
from docx import Document
from fastapi import HTTPException


def extract_text(contents: bytes, filename: str) -> str:
    
    texte = ""  # ← correction 1 : initialisation

    if filename.lower().endswith(".pdf"):
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            for page in pdf.pages:
                texte_page = page.extract_text()  # ← correction 2
                if texte_page:
                    texte += texte_page + "\n"

    elif filename.lower().endswith(".docx"):
        doc = Document(io.BytesIO(contents))
        for paragraphe in doc.paragraphs:
            if paragraphe.text.strip():
                texte += paragraphe.text + "\n"

    else:
        raise HTTPException(  # ← correction 3
            status_code=400,
            detail="Format non supporté. Utilise un fichier PDF ou DOCX."
        )

    return texte.strip()