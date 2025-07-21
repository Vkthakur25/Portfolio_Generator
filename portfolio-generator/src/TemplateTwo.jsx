import React from 'react';

function TemplateTwo({ data }) {
  return (
    <div className="portfolio-preview" style={{
      border: 'none',
      boxShadow: '0 8px 32px rgba(180,220,255,0.18)',
      padding: '2.8rem 2.2rem',
      borderRadius: '28px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 60%, #a7f3d0 100%)',
      color: '#232946',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      transition: 'box-shadow 0.3s',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative accent */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, #a7f3d0 0%, #f8fafc 80%, transparent 100%)',
        opacity: 0.18,
        borderRadius: '50%',
        zIndex: 0,
      }} />
      <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 0.2em 0', letterSpacing: '1.5px', color: '#232946', zIndex: 1 }}>{data.name}</h1>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1.1em 0', color: '#38bdf8', zIndex: 1 }}>{data.title}</h2>
      <p style={{ fontSize: '1.08rem', margin: '0 0 1.3em 0', textAlign: 'center', color: '#64748b', zIndex: 1 }}>{data.bio}</p>
      <h3 style={{ fontSize: '1.13rem', fontWeight: 700, margin: '0 0 0.6em 0', color: '#16a34a', letterSpacing: '0.5px', zIndex: 1 }}>Skills</h3>
      <ul style={{ textAlign: 'center', padding: 0, listStyle: 'none', margin: 0, zIndex: 1 }}>
        {data.skills && data.skills.split(',').map((skill, idx) => (
          <li key={idx} style={{
            display: 'inline-block',
            margin: '0 12px 10px 12px',
            padding: '0.45em 1.2em',
            background: 'linear-gradient(90deg, #bae6fd 10%, #bbf7d0 90%)',
            borderRadius: '12px',
            fontSize: '1.01rem',
            color: '#232946',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(180,220,255,0.10)',
            border: 'none',
            letterSpacing: '0.5px',
            transition: 'background 0.2s',
          }}>{skill.trim()}</li>
        ))}
      </ul>
    </div>
  );
}

export default TemplateTwo;
