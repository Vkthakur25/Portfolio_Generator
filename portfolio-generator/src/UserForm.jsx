
import React, { useState } from 'react';

function UserForm({ onChange }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    about: '',
    linkedin: '',
    github: '',
    projects: [], // projects will be array of objects
    experience: [], // experience will be array of objects
  });
  const [projectInput, setProjectInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('');

  // Generic handler for single-value fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["projects", "experience"].includes(name)) return;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange(updated);
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
    // ...existing code...
  };
  const removeField = (field, idx) => {
    const updated = formData[field].filter((_, i) => i !== idx);
    const newForm = { ...formData, [field]: updated };
    setFormData(newForm);
    onChange(newForm);
  };
  const handleBlur = (field, idx, e) => {
    if (field === 'experience') return; // don't auto-remove experience
    if (e.target.value.trim() === '' && formData[field].length > 1) {
      removeField(field, idx);
    }
  };
  const addFirstField = (field, value, setInput) => {
    if (field === 'projects') {
      // Add first project object
      const updated = [{ title: '', about: '', link: '' }];
      const newForm = { ...formData, [field]: updated };
      setFormData(newForm);
      onChange(newForm);
      return;
    }
    // ...existing code...
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
      </div>
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input type="url" className="form-control" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-2">
          <input type="url" className="form-control" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} />
        </div>
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" name="profileImage" placeholder="Profile Image URL" value={formData.profileImage || ''} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <textarea className="form-control" name="about" placeholder="About" value={formData.about} onChange={handleChange} rows={3} />
      </div>
      <div className="mb-3">
        <label className="form-label">Projects</label>
        {formData.projects.length > 0 ? (
          formData.projects.map((project, idx) => (
            <div className="border rounded p-3 mb-2" key={idx}>
              <div className="row g-2">
                <div className="col-md-4">
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
                    value={project.about}
                    onChange={e => updateList('projects', idx, { ...project, about: e.target.value })}
                    placeholder="About Project"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="url"
                    className="form-control"
                    value={project.link}
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