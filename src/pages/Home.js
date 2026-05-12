import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  {
    icon: '⚛',
    title: 'React 18',
    desc: 'Built with the latest React features including concurrent rendering and hooks.',
  },
  {
    icon: '🔀',
    title: 'React Router v6',
    desc: 'Client-side routing with nested routes, loaders, and modern navigation APIs.',
  },
  {
    icon: '🔧',
    title: 'Jenkins CI/CD',
    desc: 'Automated build, test, and deploy pipeline triggered on every GitHub push.',
  },
  {
    icon: '📦',
    title: 'Production Build',
    desc: 'Optimized, minified output via react-scripts build, ready for any host.',
  },
];

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="badge-dot" />
            CI/CD Pipeline Active
          </div>
          <h1 className="hero__title">
            React App
            <br />
            <span className="hero__accent">Meets DevOps</span>
          </h1>
          <p className="hero__subtitle">
            A production-ready React starter wired up with GitHub and Jenkins
            for a complete automated delivery pipeline.
          </p>
          <div className="hero__cta">
            <Link to="/about" className="btn btn--primary">Explore the Stack</Link>
            <Link to="/contact" className="btn btn--ghost">Get in Touch</Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="pipeline">
            {['Push', 'Build', 'Test', 'Deploy'].map((step, i) => (
              <React.Fragment key={step}>
                <div className="pipeline__step">
                  <div className="pipeline__dot" style={{ animationDelay: `${i * 0.4}s` }} />
                  <span>{step}</span>
                </div>
                {i < 3 && <div className="pipeline__line" style={{ animationDelay: `${i * 0.4 + 0.2}s` }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__inner">
          <h2 className="section-title">What's Inside</h2>
          <div className="features__grid">
            {features.map(({ icon, title, desc }) => (
              <div className="feature-card" key={title}>
                <div className="feature-card__icon">{icon}</div>
                <h3 className="feature-card__title">{title}</h3>
                <p className="feature-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
