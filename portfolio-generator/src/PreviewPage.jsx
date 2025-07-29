import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useLocation } from 'react-router-dom';

const PreviewPage = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const fullName = `${formData.firstName || 'Vivek'} ${formData.lastName || 'Kumar'}`.trim();
  const jobTitle = formData.title || 'Web Developer';
  const lead = formData.lead || 'I am a passionate web developer with experience in building modern, responsive websites and web applications. I love to create beautiful and functional user experiences.';
  const about = formData.about || lead;
  const profileImage = formData.profileImage || '/image.jpg';
  const yearsExperience = formData.yearsExperience || '1+';
  const numProjects = formData.numProjects || '10+';
  const numClients = formData.numClients || '3+';
  const skills = Array.isArray(formData.skills) && formData.skills.length > 0
    ? formData.skills
    : [
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'React', level: 70 },
      ];
  const fallbackImg = './assets/image.jpg';
  const projects = Array.isArray(formData.projects) && formData.projects.length > 0
    ? formData.projects
    : [
        { img: fallbackImg, title: 'Project One', desc: 'A modern web application built with React and Bootstrap.' },
        { img: fallbackImg, title: 'Project Two', desc: 'A mobile app designed for productivity and ease of use.' },
        { img: fallbackImg, title: 'Project Three', desc: 'A creative UI/UX project for a startup landing page.' },
      ];

  const handleDownload = async (e) => {
    e.preventDefault();
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Preview</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="root"></div>
  <script src="script.js"></script>
</body>
</html>`;
    const css = `body { background: linear-gradient(135deg, #f5f6fa 0%, #d1d3d6 100%); min-height: 100vh; }
.navbar { background: linear-gradient(90deg, #232526 0%, #414345 100%) !important; }
section#home { background: linear-gradient(120deg, #232526 0%, #414345 100%) !important; }
`;
    const js = `// Add your custom JS here if needed`;
    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("script.js", js);
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "portfolio-preview.zip");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top" style={{background: 'linear-gradient(90deg, #232526 0%, #414345 100%)'}}>
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 text-white" href="#home">{fullName}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item"><a className="nav-link active text-white" aria-current="page" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#skills">Skills</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#projects">Projects</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#download" onClick={handleDownload}>Download</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="main" style={{ marginTop: '64px', background: 'linear-gradient(135deg, #f5f6fa 0%, #d1d3d6 100%)', minHeight: '100vh' }}>
        <section id="home" className="py-5 min-vh-100 d-flex align-items-center" style={{background: 'linear-gradient(120deg, #232526 0%, #414345 100%)'}}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-4 text-center mb-4 mb-md-0 d-flex justify-content-center align-items-center" style={{paddingRight: '40px'}}>
                <div style={{width: 370, height: 370, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', position: 'relative', overflow: 'visible'}}>
                  <div style={{position: 'absolute', top: '50%', left: '50%', width: 370, height: 370, transform: 'translate(-55%, -50%)', background: 'radial-gradient(circle at 60% 30%, #fff 0%, #d1d3d6 60%, #232526 100%)', filter: 'blur(48px)', opacity: 0.9, zIndex: 0}} />
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="img-fluid"
                    style={{
                      width: 300,
                      height: 300,
                      objectFit: 'cover',
                      background: 'rgba(255,255,255,0.8)',
                      boxShadow: '0 12px 64px 0 #232526cc, 0 2px 24px 0 #fff8',
                      zIndex: 1,
                      border: 'none',
                      clipPath: 'ellipse(48% 44% at 50% 50%)',
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6 text-center text-md-start" style={{paddingLeft: '40px'}}>
                <h1 className="display-4 fw-bold mb-2" style={{color: '#fff'}}>Hi! <span role="img" aria-label="wave">👋</span> I'm {fullName}</h1>
                <h3 className="fw-semibold mb-3" style={{color: '#d1d3d6'}}>{jobTitle}</h3>
                <p className="lead mb-4" style={{color: '#f5f6fa'}}>{lead}</p>
                <a href="#contact" className="btn btn-light btn-lg shadow">Contact Me</a>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="py-5 border-bottom min-vh-100 d-flex align-items-center" style={{background: '#f5f6fa'}}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img src={profileImage} alt="About" className="img-fluid" style={{ width: 200, height: 200, objectFit: 'cover', background: '#f5f6fa', boxShadow: '0 4px 32px 0 #d1d3d6cc', border: 'none', clipPath: 'ellipse(48% 44% at 50% 50%)' }} />
              </div>
              <div className="col-md-7">
                <h2 className="fw-bold mb-3" style={{color: '#232526'}}>About Me</h2>
                <p className="mb-4 fs-5" style={{color: '#414345'}}>{about}</p>
                <div className="row text-center mb-4">
                  <div className="col">
                    <div className="rounded-3 py-3 shadow-sm" style={{background: 'linear-gradient(90deg, #f5f6fa 0%, #d1d3d6 100%)'}}>
                      <h5 className="fw-bold mb-0" style={{color: '#232526'}}>{yearsExperience}</h5>
                      <small className="text-muted">Years Experience</small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="rounded-3 py-3 shadow-sm" style={{background: 'linear-gradient(90deg, #f5f6fa 0%, #d1d3d6 100%)'}}>
                      <h5 className="fw-bold mb-0" style={{color: '#232526'}}>{numProjects}</h5>
                      <small className="text-muted">Projects</small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="rounded-3 py-3 shadow-sm" style={{background: 'linear-gradient(90deg, #f5f6fa 0%, #d1d3d6 100%)'}}>
                      <h5 className="fw-bold mb-0" style={{color: '#232526'}}>{numClients}</h5>
                      <small className="text-muted">Clients</small>
                    </div>
                  </div>
                </div>
                <a href="#projects" className="btn btn-gradient btn-lg shadow" style={{background: 'linear-gradient(90deg, #232526 0%, #414345 100%)', color: '#fff', border: 'none'}}>View Projects</a>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="py-5 border-bottom min-vh-100 d-flex align-items-center" style={{background: '#f5f6fa'}}>
          <div className="container">
            <h2 className="text-center mb-4" style={{color: '#232526'}}>Skills</h2>
            <div className="row justify-content-center">
              {skills.map((skill, idx) => (
                <div className="col-md-6 col-lg-4 mb-4" key={idx}>
                  <div className="card shadow-sm border-0 h-100" style={{background: 'linear-gradient(120deg, #f5f6fa 0%, #d1d3d6 100%)'}}>
                    <div className="card-body">
                      <h5 className="card-title mb-2" style={{color: '#232526'}}>{skill.name}</h5>
                      <div className="progress mb-2" style={{ height: '8px', background: '#fff' }}>
                        <div className="progress-bar" style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg, #232526 0%, #414345 100%)' }}></div>
                      </div>
                      <span className="badge" style={{background: '#232526', color: '#fff'}}>{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="py-5 border-bottom min-vh-100 d-flex align-items-center" style={{background: 'linear-gradient(120deg, #f5f6fa 0%, #d1d3d6 100%)'}}>
          <div className="container">
            <h2 className="text-center mb-5" style={{color: '#232526'}}>Projects</h2>
            <div className="row g-4">
              {projects.map((project, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div className="card h-100 shadow-sm border-0 project-card" style={{background: '#fff'}}>
                    <img src={project.img} className="card-img-top rounded-top" alt={project.title} style={{ height: 200, objectFit: 'cover', background: '#f5f6fa' }} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title" style={{color: '#232526'}}>{project.title}</h5>
                      <p className="card-text flex-grow-1" style={{color: '#414345'}}>{project.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="py-5 min-vh-100 d-flex align-items-center" style={{background: '#f5f6fa'}}>
          <div className="container">
            <h2 className="text-center mb-4" style={{color: '#232526'}}>Contact Me</h2>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Your Email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
                  </div>
                  <button type="submit" className="btn btn-gradient" style={{background: 'linear-gradient(90deg, #232526 0%, #414345 100%)', color: '#fff', border: 'none'}}>Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-4 mt-5 shadow-sm border-top" style={{background: 'linear-gradient(90deg, #232526 0%, #414345 100%)'}}>
        <div className="container">
          <p className="mb-0" style={{color: '#fff'}}>&copy; {new Date().getFullYear()} <span className="fw-bold">{fullName}</span>. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default PreviewPage;

