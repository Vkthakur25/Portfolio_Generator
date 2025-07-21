import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TemplateOne from './TemplateOne';

function PreviewPage() {
  const previewData = window.history.state?.data;
  const defaultData = {
    firstName: 'Vivek',
    lastName: 'Kumar',
    title: 'Web Developer',
    about: 'This is a sample portfolio preview.',
    linkedin: '',
    github: '',
    projects: [],
    experience: [],
    profileImage: 'https://via.placeholder.com/200', // Example image
  };
  const data = previewData || defaultData;
  // Get section from route: /preview/:section
  const section = window.location.pathname.split('/')[2] || null;
  return (
    <div className="preview-bg min-vh-100 w-100" style={{
      background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      padding: 0,
      margin: 0,
      overflow: 'auto',
    }}>
      <TemplateOne data={data} initialSection={section} />
    </div>
  );
}

export default PreviewPage;
