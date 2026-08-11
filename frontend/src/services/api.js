import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// Function 1 — upload the file and extract the text
export const uploadResume = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post(`${API_URL}/api/upload`, formData)
    return response.data
}

// Function 2 — analyze the text with AI
export const analyzeResume = async (text) => {
    const response = await axios.post(`${API_URL}/api/analyze`, { text })
    return response.data
}

// Function 3 — match against a job description
export const matchJob = async (cvText, jobDescription) => {
    const response = await axios.post(`${API_URL}/api/match`, {
        cv_text: cvText,
        job_description: jobDescription
    })
    return response.data
}
