import UserForm from './UserForm';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    about: '',
    linkedin: '',
    github: '',
    projects: [],
    experience: [],
  });

  const handleFormChange = (data) => {
    setFormData(data);
  };

  // Open preview page using react-router
  const handlePreviewNewPage = () => {
    window.history.pushState({ data: formData }, '', '/preview');
    window.location.assign('/preview');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold text-primary mb-2">Portfolio Website Generator</h1>
          <p className="lead text-secondary mb-4">Create a beautiful portfolio in seconds. Fill out your info, pick a template, and preview your site!</p>
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-12">
          <UserForm onChange={handleFormChange} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto d-flex gap-3">
          <button className="btn btn-primary" onClick={handlePreviewNewPage}>Preview</button>
        </div>
      </div>
    </div>
  );
}

export default App;

