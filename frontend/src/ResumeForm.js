
import React, { useState } from 'react';
import axios from 'axios';

function ResumeForm() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/generate-resume', {
      name, skills, experience,
    });
    setResume(res.data.resume);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Skills" onChange={(e) => setSkills(e.target.value)} />
        <textarea placeholder="Experience" onChange={(e) => setExperience(e.target.value)} />
        <button type="submit">Generate Resume</button>
      </form>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{resume}</pre>
    </div>
  );
}

export default ResumeForm;
