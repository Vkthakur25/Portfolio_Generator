import React, { useState, useEffect } from 'react';

function TemplateOne({ data, initialSection }) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setActiveSection(initialSection ?? null);
  }, [initialSection]);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="portfolio-preview" style={{
      boxShadow: '0 8px 32px rgba(60,60,120,0.10)',
      borderRadius: '32px',
      background: '#fff',
      color: '#23233a',
      width: '100%',
      maxWidth: '900px',
      margin: '2rem auto',
      minHeight: '500px',
      boxSizing: 'border-box',
      transition: 'box-shadow 0.3s, transform 0.2s',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
    }}>
      {/* Left: Profile Image & Name */}
      <div className="d-flex flex-column align-items-center justify-content-start" style={{ minWidth: 260, maxWidth: 280, background: 'transparent', padding: '2.5rem 1.2rem 2.5rem 2.2rem', borderRight: '1px solid #f3f4f6' }}>
        {data.profileImage && (
          <div style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'linear-gradient(120deg, #f8fafc 60%, #dbeafe 100%)',
            boxShadow: '0 2px 16px rgba(60,60,120,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem',
          }}>
            <img src={data.profileImage} alt="Profile" style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: '50%', border: '4px solid #fff' }} />
          </div>
        )}
        <div className="fw-bold text-center" style={{ fontSize: '1.35rem', color: '#23233a', letterSpacing: '1px', marginBottom: '0.5rem' }}>{data.firstName} {data.lastName}</div>
        <div style={{ fontSize: '1.1rem', color: '#6366f1', fontWeight: 600, marginBottom: '1.2rem', textAlign: 'center' }}>{data.title}</div>
        <div className="d-flex flex-row gap-3 justify-content-center" style={{ marginBottom: '1.2em', zIndex: 1 }}>
          <a href={data.linkedin || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#222', fontSize: '2rem' }} title="LinkedIn">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href={data.github || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#222', fontSize: '2rem' }} title="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href={data.instagram || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#222', fontSize: '2rem' }} title="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
      {/* Right: Content & Navigation */}
      <div className="d-flex flex-column flex-grow-1" style={{ padding: '2.5rem 2.2rem', minHeight: '100%', width: '100%' }}>
        {/* Navigation Bar - single, clean, modern */}
        <nav className="navbar navbar-expand-lg rounded w-100" style={{
          zIndex: 2,
          marginBottom: '2.2rem',
          background: '#fff',
          boxShadow: 'none',
          borderRadius: '24px',
          padding: '0.7rem 1.2rem',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ul className="navbar-nav flex-row gap-4" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <li className="nav-item">
              <button className={`nav-link fw-bold text-dark bg-transparent border-0 ${activeSection === 'about' ? 'text-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNavClick('about')}>About</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link fw-bold text-dark bg-transparent border-0 ${activeSection === 'experience' ? 'text-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNavClick('experience')}>Experience</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link fw-bold text-dark bg-transparent border-0 ${activeSection === 'projects' ? 'text-primary' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleNavClick('projects')}>Projects</button>
            </li>
          </ul>
        </nav>
        {/* No section content shown; only navbar remains */}
      </div>
    </div>
  );
}

export default TemplateOne;
