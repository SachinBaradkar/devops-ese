import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="contact">
      <div className="contact__inner">
        <div className="contact__header">
          <span className="contact__label">Get In Touch</span>
          <h1 className="contact__title">Contact Us</h1>
          <p className="contact__subtitle">
            Questions about the stack or the CI/CD setup? Drop us a message.
          </p>
        </div>

        {submitted ? (
          <div className="success-box">
            <div className="success-box__icon">✓</div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. We'll get back to you soon.</p>
            <button className="btn btn--ghost" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}>
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-input form-input--textarea"
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>
            <button type="submit" className="btn btn--primary btn--full">
              Send Message →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
