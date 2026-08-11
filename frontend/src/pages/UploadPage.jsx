import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import UploadZone from '../components/UploadZone'
import useResumeStore from "../store/resumeStore"
import { uploadResume, analyzeResume, matchJob } from "../services/api"

function UploadPage() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const { setResult, setLoading, setError } = useResumeStore()

  const navigate = useNavigate()

  const handleAnalyze = async () => {
    // Do nothing if no file
    if (!file) return
    // Navigate to results — we will call the API here
    setLoading(true)
    setError(null)
    try {
      // Step 1 — upload the file
      const uploadData = await uploadResume(file)

      // Step 2 — analyze the text
      const analysisData = await analyzeResume(uploadData.text)

      // Step 3 — match if job description is present
      let matchData = null
      if (jobDescription.trim()) {
        matchData = await matchJob(uploadData.text, jobDescription)
      }
       // Step 4 — store the results
      setResult({
        ...analysisData,
        match: matchData
      })

      // Step 5 — navigate to results
      navigate('/results')

    } catch (err) {
        setError(err.response?.data?.detail || 'An error occurred')
      } finally {
        setLoading(false)
      }
  }
  return (
   <div className="upload-page">
      <div className="upload-center">

        {/* Hero */}
        <div className="upload-hero">
          <div className="upload-badge">✨ AI-powered · Instant results</div>
          <h1 className="upload-title">
            Analyze your resume<br />
            with <span className="upload-title-accent">AI</span>
          </h1>
          <p className="upload-subtitle">
            Score, skills, recruiter feedback and job match — in 10 seconds.
          </p>
        </div>

        {/* Dropzone — passe file et setFile */}
        <UploadZone file={file} setFile={setFile} />

        {/* Separator */}
        <div className="upload-sep">
          optional — paste a job description
        </div>

        {/* Job description */}
        <div className="jd-panel">
          <label className="jd-label">📋 Job description</label>
          <textarea
            className="jd-textarea"
            rows={3}
            placeholder="We're looking for a Full Stack Developer..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Analyze button */}
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={!file}
        >
          ✨ Analyze resume now
        </button>

      </div>
    </div>
  )
}

export default UploadPage