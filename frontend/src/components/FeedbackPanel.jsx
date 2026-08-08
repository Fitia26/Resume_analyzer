const FeedbackPanel = ({feedback}) => {
    const strength = feedback.filter(item => item.type === 'strength')
    const improvements = feedback.filter(item => item.type === 'improvement')
    const critics = feedback.filter(item => item.type === 'critical')

  return (
    <div className="card">
      <h3 className="card-label">AI feedback</h3>
      <div className="feedback-section">
        <div className="feedback-section-head">
          <div className="feedback-section-ico strength">✓</div>
          <span className="feedback-section-title strength">What's working</span>
        </div>        
            {
                strength.map(
                    (item) => (
                        <span className="feedback-text" key={item.text}>{item.text}</span>
                    )
                )
            }       
      </div>

      <div className="feedback-section"> 
        <div className="feedback-section-head">
          <div className="feedback-section-ico improvement">⚠</div>
          <span className="feedback-section-title improvement">Improvements</span>
        </div>
            {
                improvements.map(
                    (item) => (
                        <span className="feedback-text" key={item.text}>{item.text}</span>
                    )
                )
            }
      </div>

      <div className="feedback-section">
        <div className="feedback-section-head">
          <div className="feedback-section-ico critical">✕</div>
          <span className="feedback-section-title critical">Critical</span>
        </div>
            {
                critics.map(
                    (item) => (
                        <span className="feedback-text" key={item.text}>{item.text}</span>
                    )
                )
            }
      </div>
    </div>
  )
}

export default FeedbackPanel
