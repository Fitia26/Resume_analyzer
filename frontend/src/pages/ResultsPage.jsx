import FeedbackPanel from "../components/FeedbackPanel"
import SkillsPanel from "../components/SkillsPanel"
import ScoreRing from "../components/ScoreRing"

function ResultsPage() {
  const fakeData = {
    overall_score: 74,
    score_label: "Good profile",
    axes: {
      clarity: 82,
      skills: 70,
      experience: 78,
      impact: 58
    },
    skills: {
      hard_skills: ["React", "FastAPI", "Python"],
      soft_skills: ["Leadership", "Communication"],
      languages: ["French — Native", "English — B2"]
    },
    feedback: [
      { text: "Strong technical stack", type: "strength" },
      { text: "Quantify your results", type: "improvement" },
      { text: "No Docker experience visible", type: "critical" }
    ],
    stats: {
      ats_score: "High",
      pages: 1,
      word_count: 487,
      reading_time: "~45 sec",
      skills_count: 20
    },
    match: {
      match_score: 72,
      job_title: "Full Stack Developer",
      missing_skills: ["Docker", "GraphQL"],
      matching_skills: ["React", "Python"]
    }
  }


  return (
    <div className="results-page">
      <div className="results-grid">
        <div className="results-col">  
          <div className="card">
            <div className="card-label">Overall score</div>
            <ScoreRing
              score={fakeData.overall_score}
              label={fakeData.score_label}
            />
            
            <div className="axes">
              <div className="axis">
                <span className="axis-name">Clarity</span>
                <div className="axis-track">
                  <div
                    className="axis-fill"
                    style={{ width: `${fakeData.axes.clarity}%` }}
                  />
                </div>
                <span className="axis-value">{fakeData.axes.clarity}</span>
              </div>
              
              <div className="axis">
                <span className="axis-name">skills</span>
                <div className="axis-track">
                  <div
                    className="axis-fill"
                    style={{ width: `${fakeData.axes.skills}%` }}
                  />
                </div>
                <span className="axis-value">{fakeData.axes.skills}</span>
              </div>

              <div className="axis">
                <span className="axis-name">Experience</span>
                <div className="axis-track">
                  <div
                    className="axis-fill"
                    style={{ width: `${fakeData.axes.experience}%` }}
                  />
                </div>
                <span className="axis-value">{fakeData.axes.experience}</span>
              </div>

              <div className="axis">
                <span className="axis-name">Impact</span>
                <div className="axis-track">
                  <div
                    className={`axis-fill ${fakeData.axes.impact < 65 ? 'warning' : ''}`}
                    style={{ width: `${fakeData.axes.impact}%` }}
                  />
                </div>
                <span className="axis-value">{fakeData.axes.impact}</span>
              </div>
              {/* impact < 65 → ajoute la classe "warning" sur axis-fill */}
            </div>
          </div>


          <div className="card">
            <div className="card-label">Job match</div>

            {/* Score en grand — ex: 72% */}
            <div className="match-score">{fakeData.match.match_score}%</div>

            {/* Titre du poste */}
            <div className="match-title">{fakeData.match.job_title}</div>

            {/* Barre de progression */}
            <div className="match-bar-track">
              <div
                className="match-bar-fill"
                style={{ width: `${fakeData.match.match_score}%` }}
              >
              </div>
            </div>

            {/* Label */}
            <div className="match-missing-label">Skills to add</div>

            {/* Missing skills chips */}
            <div className="match-missing-chips">
              {fakeData.match.missing_skills.map(skill => (
                <span key={skill} className="missing-chip">{skill}</span>
              ))}
            </div>

          </div>


          <div className="card">
            <div className="card-label">Resume stats</div>
            <div className="stat-rows">

              <div className="stat-row">
                <span className="stat-key">ATS score</span>
                <span className="stat-value green">{fakeData.stats.ats_score}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Pages</span>
                <span className="stat-value">{fakeData.stats.pages}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Word count</span>
                <span className="stat-value">{fakeData.stats.word_count}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Reading time</span>
                <span className="stat-value">{fakeData.stats.reading_time}</span>
              </div>

              <div className="stat-row">
                <span className="stat-key">Skills found</span>
                <span className="stat-value purple">{fakeData.stats.skills_count}</span>
              </div>

            </div>
          </div>


        </div>

        <div className="results-col">  {/* colonne droite */}
          <SkillsPanel skills={fakeData.skills}/>
          <FeedbackPanel feedback={fakeData.feedback}/>
        </div>
      </div>

    </div>
  )
}

export default ResultsPage