import FeedbackPanel from "../components/FeedbackPanel"
import SkillsPanel from "../components/SkillsPanel"
import ScoreRing from "../components/ScoreRing"
import useResumeStore from "../store/resumeStore"

function ResultsPage() {
  const { result, isLoading, error } = useResumeStore()

  // If there is no result yet, redirect back to upload
  if (!result) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <p>No results yet.</p>
        <a href="/">Upload a resume first</a>
      </div>
    )
  }



  return (
    <div className="results-page">
      <div className="results-grid">
        <div className="results-col">  
          <div className="card">
            <div className="card-label">Overall score</div>
            <ScoreRing
              score={result.overall_score}
              label={result.score_label}
            />
            
            <div className="axes">
              <div className="axis">
                <span className="axis-name">Clarity</span>
                <div className="axis-track">
                  <div
                    className="axis-fill"
                    style={{ width: `${result.axes.clarity}%` }}
                  />
                </div>
                <span className="axis-value">{result.axes.clarity}</span>
              </div>
              
              <div className="axis">
                <span className="axis-name">skills</span>
                <div className="axis-track">
                  <div
                    className="axis-fill"
                    style={{ width: `${result.axes.skills}%` }}
                  />
                </div>
                <span className="axis-value">{result.axes.skills}</span>
              </div>

              <div className="axis">
                <span className="axis-name">Experience</span>
                <div className="axis-track">
                  <div
                    className="axis-fill"
                    style={{ width: `${result.axes.experience}%` }}
                  />
                </div>
                <span className="axis-value">{result.axes.experience}</span>
              </div>

              <div className="axis">
                <span className="axis-name">Impact</span>
                <div className="axis-track">
                  <div
                    className={`axis-fill ${result.axes.impact < 65 ? 'warning' : ''}`}
                    style={{ width: `${result.axes.impact}%` }}
                  />
                </div>
                <span className="axis-value">{result.axes.impact}</span>
              </div>
              {/* impact < 65 → add the "warning" class to axis-fill */}
            </div>
          </div>


          {result.match && <div className="card">
            <div className="card-label">Job match</div>

            {/* Large score — e.g. 72% */}
            <div className="match-score">{result.match.match_score}%</div>

            {/* Job title */}
            <div className="match-title">{result.match.job_title}</div>

            {/* Progress bar */}
            <div className="match-bar-track">
              <div
                className="match-bar-fill"
                style={{ width: `${result.match.match_score}%` }}
              >
              </div>
            </div>

            {/* Label */}
            <div className="match-missing-label">Skills to add</div>

            {/* Missing skills chips */}
            <div className="match-missing-chips">
              {result.match.missing_skills.map(skill => (
                <span key={skill} className="missing-chip">{skill}</span>
              ))}
            </div>

          </div>}


          <div className="card">
            <div className="card-label">Resume stats</div>
            <div className="stat-rows">

              <div className="stat-row">
                <span className="stat-key">ATS score</span>
                <span className="stat-value green">{result.stats.ats_score}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Pages</span>
                <span className="stat-value">{result.stats.pages}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Word count</span>
                <span className="stat-value">{result.stats.word_count}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Reading time</span>
                <span className="stat-value">{result.stats.reading_time}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Skills found</span>
                <span className="stat-value purple">{result.stats.skills_count}</span>
              </div>

            </div>
          </div>


        </div>

        <div className="results-col">  {/* right column */}
          <SkillsPanel skills={result.skills}/>
          <FeedbackPanel feedback={result.feedback}/>
        </div>
      </div>

    </div>
  )
}

export default ResultsPage