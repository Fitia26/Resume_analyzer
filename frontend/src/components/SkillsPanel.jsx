import { useState } from 'react'

const SkillsPanel = ({skills}) => {
    const [activeTab, setActiveTab] = useState('hard')
    function handleChange(title){
        setActiveTab(title)
    }
  return (
    <div className='card'>
      <h3 className='card-label'>Detected skills</h3>
      <div className='skills-tab'>
        <button className={`skills-tab ${activeTab === 'hard' ? 'active' : ''}`} onClick={() =>handleChange('hard')}>
             Hard skills (<span> {skills.hard_skills.length} </span>) 
        </button>
        <button className={`skills-tab ${activeTab === 'soft' ? 'active' : ''}`} onClick={() =>handleChange('soft')}> 
            Soft skills (<span> {skills.soft_skills.length} </span>) 
        </button>
        <button className={`skills-tab ${activeTab === 'lang' ? 'active' : ''}`} onClick={() =>handleChange('lang')}>
             Languages (<span> {skills.languages.length} </span>) 
        </button>
      </div>

      <div className='skills-list'>
        {activeTab === 'hard' && skills.hard_skills.map(
            (skill) => (
                <span key={skill} className="skill-chip"> {skill} </span>
            )
        )}

        {activeTab === 'soft' && skills.soft_skills.map(
            (skill) => (
                <span key={skill} className="skill-chip soft"> {skill} </span>
            )
        )}

        {activeTab === 'lang' && skills.languages.map(
            (skill) => (
                <span key={skill} className="skill-chip lang"> {skill} </span>
            )
        )}
      </div>
    </div>
  )
}

export default SkillsPanel
