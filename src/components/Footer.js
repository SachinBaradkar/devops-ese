import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} ReactApp — Built with React &amp; deployed via Jenkins CI/CD
        </p>
        <p className="footer__version">
          <span className="footer__tag">v1.0.0</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
