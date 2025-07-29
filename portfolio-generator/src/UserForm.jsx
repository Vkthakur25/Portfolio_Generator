import React, { useState } from 'react';

function UserForm({ onChange }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    lead: '', // new: lead/intro
    about: '',
    // Removed linkedin, github, twitter
    profileImage: '',
    yearsExperience: '', // new: stats
    numProjects: '',
    numClients: '',
    skills: [], // new: skills list
    projects: [], // updated: now expects img, title, desc
    experience: [],
  });
  // Removed unused projectInput, setProjectInput, experienceInput, setExperienceInput
  const [skillInput, setSkillInput] = useState({ name: '', level: '' });

  // Generic handler for single-value fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["projects", "experience", "skills"].includes(name)) return;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange(updated);
  };
  // --- Skills dynamic list helpers ---
  const addSkill = () => {
    if (!skillInput.name || !skillInput.level) return;
    const updated = [...formData.skills, { name: skillInput.name, level: Number(skillInput.level) }];
    const newForm = { ...formData, skills: updated };
    setFormData(newForm);
    setSkillInput({ name: '', level: '' });
    onChange(newForm);
  };
  const removeSkill = (idx) => {
    const updated = formData.skills.filter((_, i) => i !== idx);
    const newForm = { ...formData, skills: updated };
    setFormData(newForm);
    onChange(newForm);
  };
  // --- Generic dynamic list helpers ---
  // For projects (object array) and experience (object array)
  const updateList = (field, idx, value) => {
    const updated = [...formData[field]];
    updated[idx] = value;
    const newForm = { ...formData, [field]: updated };
    setFormData(newForm);
    onChange(newForm);
  };
  const addField = (field) => {
    const arr = formData[field];
    if (field === 'experience') {
      // Add empty experience object
      const updated = [...arr, { title: '', company: '', from: '', to: '' }];
      const newForm = { ...formData, [field]: updated };
      setFormData(newForm);
      onChange(newForm);
      return;
    }
    if (field === 'projects') {
      // Add empty project object
      const updated = [...arr, { title: '', about: '', link: '' }];
      const newForm = { ...formData, [field]: updated };
      setFormData(newForm);
      onChange(newForm);
      return;
    }
  };
  const removeField = (field, idx) => {
    const updated = formData[field].filter((_, i) => i !== idx);
    const newForm = { ...formData, [field]: updated };
    setFormData(newForm);
    onChange(newForm);
  };

  return (
    <form className="bg-light p-4 rounded shadow-sm">
      <h2 className="mb-4">Enter Portfolio Info</h2>
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" name="lead" placeholder="Intro/Lead (e.g. I am a passionate web developer...)" value={formData.lead} onChange={handleChange} />
        </div>
      </div>
      <div className="row mb-3">
        {/* Removed LinkedIn and GitHub fields */}
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" name="profileImage" placeholder="Profile Image URL" value={formData.profileImage || ''} onChange={handleChange} />
        </div>
        {/* Removed Twitter field */}
      </div>
      <div className="mb-3">
        <textarea className="form-control" name="about" placeholder="About Me (detailed)" value={formData.about} onChange={handleChange} rows={3} />
      </div>
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input type="number" className="form-control" name="yearsExperience" placeholder="Years Experience" value={formData.yearsExperience} onChange={handleChange} min="0" />
        </div>
        <div className="col-md-4 mb-2">
          <input type="number" className="form-control" name="numProjects" placeholder="Number of Projects" value={formData.numProjects} onChange={handleChange} min="0" />
        </div>
        <div className="col-md-4 mb-2">
          <input type="number" className="form-control" name="numClients" placeholder="Number of Clients" value={formData.numClients} onChange={handleChange} min="0" />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Skills</label>
        <div className="row g-2 mb-2">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Skill Name" value={skillInput.name} onChange={e => setSkillInput({ ...skillInput, name: e.target.value })} />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Level (%)" value={skillInput.level} onChange={e => setSkillInput({ ...skillInput, level: e.target.value })} min="0" max="100" />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-success w-100" onClick={addSkill}>Add</button>
          </div>
        </div>
        {formData.skills.length > 0 && (
          <ul className="list-group">
            {formData.skills.map((skill, idx) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                {skill.name} <span className="badge bg-primary rounded-pill">{skill.level}%</span>
                <button type="button" className="btn btn-sm btn-danger ms-2" onClick={() => removeSkill(idx)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Projects</label>
        {formData.projects.length > 0 ? (
          formData.projects.map((project, idx) => (
            <div className="border rounded p-3 mb-2" key={idx}>
              <div className="row g-2">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    value={project.title}
                    onChange={e => updateList('projects', idx, { ...project, title: e.target.value })}
                    placeholder="Project Title"
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    className="form-control"
                    value={project.desc || ''}
                    onChange={e => updateList('projects', idx, { ...project, desc: e.target.value })}
                    placeholder="Project Description"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="url"
                    className="form-control"
                    value={project.img || ''}
                    onChange={e => updateList('projects', idx, { ...project, img: e.target.value })}
                    placeholder="Image URL"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="url"
                    className="form-control"
                    value={project.link || ''}
                    onChange={e => updateList('projects', idx, { ...project, link: e.target.value })}
                    placeholder="Project Link"
                  />
                </div>
              </div>
              <div className="mt-2 d-flex gap-2">
                {formData.projects.length > 1 && (
                  <button type="button" className="btn btn-danger" onClick={() => removeField('projects', idx)} title="Remove">×</button>
                )}
                {idx === formData.projects.length - 1 && (
                  <button type="button" className="btn btn-success" onClick={() => addField('projects')} title="Add">+</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="input-group mb-2">
            <button type="button" className="btn btn-success" onClick={() => addField('projects')} title="Add Project">+ Add Project</button>
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Experience</label>
        {formData.experience.length > 0 ? (
          formData.experience.map((exp, idx) => (
            <div className="border rounded p-3 mb-2" key={idx}>
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={exp.title}
                    onChange={e => updateList('experience', idx, { ...exp, title: e.target.value })}
                    placeholder="Title (e.g. Software Engineer)"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    value={exp.company}
                    onChange={e => updateList('experience', idx, { ...exp, company: e.target.value })}
                    placeholder="Company"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    value={exp.from}
                    onChange={e => updateList('experience', idx, { ...exp, from: e.target.value })}
                    placeholder="From (Year)"
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    value={exp.to}
                    onChange={e => updateList('experience', idx, { ...exp, to: e.target.value })}
                    placeholder="To (Year)"
                  />
                </div>
              </div>
              <div className="mt-2 d-flex gap-2">
                {formData.experience.length > 1 && (
                  <button type="button" className="btn btn-danger" onClick={() => removeField('experience', idx)} title="Remove">×</button>
                )}
                {idx === formData.experience.length - 1 && (
                  <button type="button" className="btn btn-success" onClick={() => addField('experience')} title="Add">+</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="input-group mb-2">
            <button type="button" className="btn btn-success" onClick={() => addField('experience')} title="Add Experience">+ Add Experience</button>
          </div>
        )}
      </div>
    </form>
  );
}

export default UserForm;