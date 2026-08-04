import {Link, useLocation} from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isResults = location.pathname === '/results'

  return (
    <nav className='navbar'>
      <div className="navbar-brand">
        <div className="navbar-logo">📄</div>
        <span className="navbar-name">
          Resume<span className="navbar-name-accent">AI</span>
        </span>
      </div>

      <div className="navbar-tabs">
        <Link
          to="/"
          className={`navbar-tab ${!isResults ? 'active' : ''}`}
        >
          Upload
        </Link>
        <Link
          to="/results"
          className={`navbar-tab ${isResults ? 'active' : ''}`}
        >
          Results
        </Link>
      </div>

      <Link to="/" className="navbar-btn">
        <span>+</span>
        <span>New analysis</span>
      </Link>
    </nav>
  )
}

export default Navbar