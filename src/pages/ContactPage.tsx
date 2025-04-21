import { useEffect, useRef } from 'react';
import ContactForm from '../components/common/ContactForm';
import { animations } from '../utils/animations';
import '../styles/pages/ContactPage.scss';

const ContactPage: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  // Анімація елементів при завантаженні сторінки
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
    
    if (infoRef.current) {
      animations.fadeInUp(infoRef.current, 0.6, 0.8);
    }
  }, []);
  
  // Обробник відправки форми (для майбутньої інтеграції)
  const handleFormSubmit = (data: any) => {
    // Тут можна інтегрувати з API для відправки повідомлень
    console.log('Form submitted:', data);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 ref={headingRef}>Зв'яжіться зі мною</h1>
        <p ref={descRef}>
          Маєте запитання чи пропозицію? Надішліть мені повідомлення, і я відповім вам якомога швидше.
        </p>
      </div>
      
      <div className="contact-content">
        <div className="form-section" ref={formRef}>
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
        
        <div className="contact-info" ref={infoRef}>
          <div className="info-item">
            <div className="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="info-text">
              <h3>Email</h3>
              <p>your.email@example.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div className="info-text">
              <h3>GitHub</h3>
              <p>github.com/yourusername</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <div className="info-text">
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/yourusername</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;