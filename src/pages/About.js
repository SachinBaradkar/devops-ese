import React from 'react';
import './About.css';

const stack = [
  { label: 'React', version: '18.2', color: '#61dafb' },
  { label: 'React Router', version: '6.x', color: '#f44250' },
  { label: 'Node.js', version: '18+', color: '#68a063' },
  { label: 'Jenkins', version: 'LTS', color: '#d33833' },
  { label: 'GitHub', version: 'Actions/Webhook', color: '#e8ff4d' },
  { label: 'Nginx / Apache', version: 'Static Host', color: '#4dffc3' },
];

const steps = [
  { num: '01', title: 'Developer pushes code', desc: 'A git push to the main branch triggers a webhook to the Jenkins server.' },
  { num: '02', title: 'Jenkins pulls the repo', desc: 'Jenkins clones/pulls the latest code from GitHub into the workspace.' },
  { num: '03', title: 'Install dependencies', desc: 'npm ci installs all dependencies from package-lock.json cleanly.' },
  { num: '04', title: 'Run tests', desc: 'npm test validates the codebase against the Jest test suite.' },
  { num: '05', title: 'Build for production', desc: 'npm run build generates an optimized static bundle in /build.' },
  { num: '06', title: 'Deploy', desc: 'The /build folder is copied to the web server (Nginx/Apache) serving the app.' },
];

function About() {
  return (
    <div className="about">
      <div className="about__inner">
        <div className="about__header">
          <span className="about__label">Architecture</span>
          <h1 className="about__title">How It All Works</h1>
          <p className="about__subtitle">
            A walkthrough of the complete CI/CD pipeline — from a local code change
            to a live production deployment.
          </p>
        </div>

        <section className="pipeline-steps">
          {steps.map(({ num, title, desc }) => (
            <div className="pipeline-step" key={num}>
              <div className="pipeline-step__num">{num}</div>
              <div className="pipeline-step__content">
                <h3 className="pipeline-step__title">{title}</h3>
                <p className="pipeline-step__desc">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="tech-stack">
          <h2 className="section-title">Tech Stack</h2>
          <div className="stack-grid">
            {stack.map(({ label, version, color }) => (
              <div className="stack-pill" key={label} style={{ '--pill-color': color }}>
                <span className="stack-pill__dot" />
                <span className="stack-pill__label">{label}</span>
                <span className="stack-pill__version">{version}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
