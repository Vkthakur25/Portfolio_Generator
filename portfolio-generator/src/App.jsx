import UserForm from './UserForm';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PreviewPage from './PreviewPage';

function MainApp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    profileImage: '',
    linkedin: '',
    github: '',
    projects: [],
    experience: [],
  });
  const navigate = useNavigate();
  const handleFormChange = (data) => setFormData(data);
  const handlePreviewNewPage = () => {
    window.scrollTo(0, 0);
    navigate('/preview', { state: { formData } });
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

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<MainApp />} />
      <Route path="/preview" element={<PreviewPage />} />
    </Routes>
  );
}

