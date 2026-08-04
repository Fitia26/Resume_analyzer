import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import UploadZone from '../components/UploadZone'

function UploadPage() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const navigate = useNavigate()
  const handleAnalyze = () => {
    // Do nothing if no file
    if (!file) return
    // Navigate to results — we will call the API here
    navigate('/results')
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