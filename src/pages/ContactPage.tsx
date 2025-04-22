import { useEffect, useRef } from 'react';
import ContactForm from '../components/common/ContactForm';
import { animations } from '../utils/animations';
import { contacts } from '@/data/contacts';
import '../styles/pages/ContactPage.scss';

const ContactPage: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  
  // Animate elements on page load
  useEffect(() => {
    if (headingRef.current) {
      animations.fadeInUp(headingRef.current, 0, 0.8);
    }
    
    if (descRef.current) {
      animations.fadeInUp(descRef.current, 0.2, 0.8);
    }
    
    if (formRef.current) {
      animations.fadeInUp(formRef.current, 0.4, 0.8);
    }
    
    if (contactsRef.current) {
      animations.fadeInUp(contactsRef.current, 0.6, 0.8);
    }
  }, []);
  
  // Form submission handler (for future integration)
  const handleFormSubmit = (data: any) => {
    // Integration with API for sending messages
    console.log('Form submitted:', data);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 ref={headingRef}>Get in Touch</h1>
        <p ref={descRef}>
          Have a question or proposal? Send me a message, and I'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="contact-content">
        <div className="form-section" ref={formRef}>
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
        
        <div className="contact-cards" ref={contactsRef}>
          <a href={`mailto:${contacts.email}`} className="contact-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="card-content">
              <h3>Email</h3>
              <p>{contacts.email}</p>
            </div>
            <div className="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
          
          <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3>GitHub</h3>
              <p>{contacts.github.replace('https://github.com/', '')}</p>
            </div>
            <div className="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>

          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3>Telegram</h3>
              <p>{contacts.telegram.replace('https://t.me/', '@')}</p>
            </div>
            <div className="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>

          <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <div className="card-content">
              <h3>LinkedIn</h3>
              <p>{contacts.linkedin.replace('https://www.linkedin.com/in/', '').replace('/', '')}</p>
            </div>
            <div className="card-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </a>
        </div>
      </div>
      
      <div className="contact-background-shape shape-1"></div>
      <div className="contact-background-shape shape-2"></div>
    </div>
  );
};

export default ContactPage;