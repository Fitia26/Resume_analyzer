const ScoreRing = ({ score, label }) => {
  const radius = 53
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / 100)

  return (
    <div className="score-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130">

        {/* Background circle */}
        <circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke="#EDE9FE"
          strokeWidth="10"
        />

        {/* Progress arc */}
        <circle
          cx="65" cy="65" r={radius}
          fill="none"
          stroke="#6D28D9"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />

        {/* Score number */}
        <text
          x="65" y="60"
          textAnchor="middle"
          fontSize="30"
          fontWeight="800"
          fill="#1E1B4B"
          fontFamily="Inter, sans-serif"
        >
          {score}
        </text>

        {/* out of 100 */}
        <text
          x="65" y="78"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#7C3AED"
          fontFamily="Inter, sans-serif"
        >
          out of 100
        </text>

      </svg>

      {/* Label pill */}
      <span className="score-label-pill">{label}</span>
    </div>
  )
}

export default ScoreRing