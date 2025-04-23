import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills';
import { contacts } from '../data/contacts';
import CertificateModal from '@/components/common/CertificateModal';
import { Certificate, certificates } from '@/data/certificates';
import '../styles/pages/RoadmapPage.scss';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Group skills by category
const skillsByCategory = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = [];
  }
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, typeof skills>);

// Category display names mapping
const categoryNames: Record<string, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  language: 'Programming Languages',
  tooling: 'Development Tools'
};

// Soft skills - these would typically come from a data file
const softSkills = [
  { id: 1, name: 'Problem Solving', level: 90, description: 'Analytical approach to resolving complex technical challenges' },
  { id: 2, name: 'Team Collaboration', level: 85, description: 'Experience working in agile development environments' },
  { id: 3, name: 'Communication', level: 80, description: 'Clear articulation of technical concepts to diverse audiences' },
  { id: 4, name: 'Time Management', level: 85, description: 'Efficient prioritization of tasks to meet project deadlines' },
  { id: 5, name: 'Adaptability', level: 90, description: 'Quick to learn and apply new technologies and methods' }
];

// Education data - these would typically come from a data file
const education = [
  {
    id: 1, 
    degree: 'Master of Computer Science',
    institution: 'Kyiv National University',
    period: '2018 - 2020',
    description: 'Specialized in Web Technologies and Interactive Systems'
  },
  {
    id: 2, 
    degree: 'Bachelor of Software Engineering',
    institution: 'Lviv Polytechnic National University',
    period: '2014 - 2018',
    description: 'Focus on application development and software architecture'
  }
];

const RoadmapPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    intro: null,
    technical: null,
    experience: null,
    soft: null,
    education: null,
    contact: null
  });
  
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const animationsInitializedRef = useRef(false);
  
  // Open certificate modal
  const openCertificateModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close certificate modal
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    // Re-enable body scrolling
    document.body.style.overflow = '';
  };
  
  // Setup animations and parallax effects
  useEffect(() => {
    if (!pageWrapperRef.current || animationsInitializedRef.current) return;
    
    // Mark animations as initialized to prevent double initialization
    animationsInitializedRef.current = true;
    
    // Animation context to store all animations for cleanup
    let ctx = gsap.context(() => {
      
      // Initialize the particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
          // Random initial positions
          const startX = Math.random() * window.innerWidth;
          const startY = Math.random() * window.innerHeight;
          
          gsap.set(particle, {
            x: startX,
            y: startY,
            opacity: 0
          });
          
          // Fade in with slight delay based on index
          gsap.to(particle, {
            opacity: Math.random() * 0.5 + 0.2,
            duration: 2,
            delay: index * 0.1
          });
        });
      }

      // Hero animation
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.roadmap-hero',
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });
      
      heroTimeline
        .from('.hero-title', { y: 50, opacity: 0, duration: 0.8 })
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-description', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.scroll-indicator', { y: -10, opacity: 0, duration: 0.8, repeat: -1, yoyo: true }, '-=0.4');
      
      // Section header animations
      document.querySelectorAll('.section-header').forEach((header) => {
        gsap.from(header, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });
      
      // Technical skills animations
      const skillCategories = document.querySelectorAll('.skill-category');
      
      // Animate each skill category 
      skillCategories.forEach((category, index) => {
        const categoryTitle = category.querySelector('.category-title');
        const cards = category.querySelectorAll('.skill-card');
        
        ScrollTrigger.create({
          trigger: category,
          start: 'top 80%',
          onEnter: () => {
            // Animate the category title
            gsap.fromTo(categoryTitle, 
              { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
              { opacity: 1, x: 0, duration: 0.8 }
            );
            
            // Animate the cards with stagger
            gsap.fromTo(cards,
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                stagger: 0.15, 
                duration: 0.6,
                onComplete: () => {
                  // After cards appear, animate their progress bars
                  cards.forEach(card => {
                    const progressFill = card.querySelector('.skill-progress-fill');
                    if (progressFill) {
                      const level = progressFill.getAttribute('data-level') || "0";
                      
                      gsap.fromTo(progressFill,
                        { width: "0%" },
                        { 
                          width: `${level}%`, 
                          duration: 1.2, 
                          ease: "power2.out" 
                        }
                      );
                    }
                  });
                }
              }
            );
          },
          once: true // Only trigger once
        });
      });
      
      // Soft skills progress bars animation
      const softSkillItems = document.querySelectorAll('.soft-skill-item');
      
      ScrollTrigger.create({
        trigger: '.soft-skills-container',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(softSkillItems,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.15, 
              duration: 0.6,
              onComplete: () => {
                // After items appear, animate their progress bars
                softSkillItems.forEach(item => {
                  const progressFill = item.querySelector('.progress-fill');
                  if (progressFill) {
                    const level = progressFill.getAttribute('data-level') || "0";
                    
                    gsap.fromTo(progressFill,
                      { width: "0%" },
                      { 
                        width: `${level}%`, 
                        duration: 1.2, 
                        ease: "power2.out" 
                      }
                    );
                  }
                });
              }
            }
          );
        },
        once: true
      });
      
      // Certification items
      const certificationItems = document.querySelectorAll('.certification-item');
      
      const certTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.certifications-container',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      
      // Add all certification items to the timeline with stagger
      certTimeline.from(certificationItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      });
      
      // Timeline animations
      const timelineItems = document.querySelectorAll('.timeline-item');
      const timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.experience-timeline',
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      
      timelineTl.from(timelineItems, {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8
      });
      
      // Education items
      const educationItems = document.querySelectorAll('.education-item');
      
      gsap.from(educationItems, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.education-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      
      // Contact section animation
      const contactItems = [
        '.contact-text', 
        '.contact-button', 
        '.social-links', 
        '.navigation-buttons'
      ];
      
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true
        }
      });
      
      contactTl.from(contactItems, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8
      });
      
    }, pageWrapperRef); // Scope to page wrapper
    
    // Update active section on scroll
    const updateActiveSection = () => {
      for (const key in sectionsRef.current) {
        const section = sectionsRef.current[key];
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const threshold = window.innerHeight * 0.3;
        
        if (rect.top <= threshold && rect.bottom >= threshold) {
          setActiveSection(key);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // Clean up animations when component unmounts
    return () => {
      ctx.revert(); // Clean up all GSAP animations created in this context
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);
  
  // Handle navigation dot click
  const handleNavDotClick = (sectionId: string) => {
    const section = sectionsRef.current[sectionId];
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const generateParticles = (count = 30) => {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      // Get random type (0-3)
      const type = Math.floor(Math.random() * 4);
      
      // Get random size variation (80%-120% of base size)
      const sizeVariation = 0.8 + Math.random() * 0.4;
      
      // Create particle with random properties
      particles.push(
        <div 
          key={i} 
          className={`particle particle-${type}`} 
          style={{ 
            transform: `scale(${sizeVariation})`,
            opacity: 0 // Start invisible, will animate in
          }}
        />
      );
    }
    
    return particles;
  };

  return (
    <div className="roadmap-page" ref={pageWrapperRef}>
      {/* Background elements */}
      <div className="parallax-bg bg-1"></div>
      <div className="parallax-bg bg-2"></div>
      
      {/* Floating particles for visual interest */}
      <div className="particles-container" ref={particlesRef}>
        {generateParticles(35)}
      </div>
      
      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          onClose={closeCertificateModal} 
        />
      )}
          
      {/* Vertical navigation */}
      <div className="vertical-nav">
        <div 
          className={`nav-dot ${activeSection === 'intro' ? 'active' : ''}`}
          onClick={() => handleNavDotClick('intro')}
          data-tooltip="Introduction"
        ></div>
        <div 
          className={`nav-dot ${activeSection === 'technical' ? 'active' : ''}`}
          onClick={() => handleNavDotClick('technical')}
          data-tooltip="Technical Skills"
        ></div>
        <div 
          className={`nav-dot ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={() => handleNavDotClick('experience')}
          data-tooltip="Experience"
        ></div>
        <div 
          className={`nav-dot ${activeSection === 'soft' ? 'active' : ''}`}
          onClick={() => handleNavDotClick('soft')}
          data-tooltip="Soft Skills"
        ></div>
        <div 
          className={`nav-dot ${activeSection === 'education' ? 'active' : ''}`}
          onClick={() => handleNavDotClick('education')}
          data-tooltip="Education"
        ></div>
        <div 
          className={`nav-dot ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => handleNavDotClick('contact')}
          data-tooltip="Contact"
        ></div>
      </div>
      
      {/* Hero Section */}
      <section 
        className="roadmap-section roadmap-hero" 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current.intro = el }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Kostiantyn Matviychuck</h1>
          <h2 className="hero-subtitle">Frontend Developer & Creative Technologist</h2>
          <p className="hero-description">
            Passionate about creating immersive web experiences using cutting-edge technologies.
            Specializing in interactive 3D graphics, animations, and modern web applications.
          </p>
          <div className="scroll-indicator">
            <span>Scroll to explore my journey</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </section>
      
      {/* Technical Skills Section */}
      <section 
        className="roadmap-section technical-skills-section" 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current.technical = el }}
      >
        <h2 className="section-header">Technical Skills</h2>
        
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="skill-category">
            <h3 className="category-title">{categoryNames[category] || category}</h3>
            <div className="skill-cards-container">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-card-header">
                    <div className="skill-icon">
                      <span>{skill.name.charAt(0)}</span>
                    </div>
                    <h4 className="skill-name">{skill.name}</h4>
                    <div className="skill-level">{skill.level}%</div>
                  </div>
                  <div className="skill-progress">
                    <div className="skill-progress-bar">
                      <div 
                        className="skill-progress-fill" 
                        data-level={skill.level}
                        style={{ width: '0%' }} // Initial width of 0 for animation
                      ></div>
                    </div>
                  </div>
                  <p className="skill-description">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      
      {/* Experience Timeline Section */}
      <section 
        className="roadmap-section experience-section" 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current.experience = el }}
      >
        <h2 className="section-header">Professional Experience</h2>
        
        <div className="experience-timeline">
          <div className="timeline-line"></div>
          
          <div className="timeline-item left">
            <div className="timeline-point"></div>
            <div className="timeline-content">
              <div className="timeline-date">2022 - Present</div>
              <h3 className="timeline-title">Senior Frontend Developer</h3>
              <h4 className="timeline-company">InnoTech Solutions</h4>
              <ul className="timeline-responsibilities">
                <li>Led development of interactive 3D product visualizations using Three.js</li>
                <li>Implemented complex animations and transitions with GSAP</li>
                <li>Optimized application performance for diverse devices</li>
                <li>Mentored junior developers in modern frontend practices</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-item right">
            <div className="timeline-point"></div>
            <div className="timeline-content">
              <div className="timeline-date">2020 - 2022</div>
              <h3 className="timeline-title">Frontend Developer</h3>
              <h4 className="timeline-company">WebCraft Studio</h4>
              <ul className="timeline-responsibilities">
                <li>Developed responsive web applications using React and TypeScript</li>
                <li>Created custom animations and interactive elements</li>
                <li>Worked closely with designers to implement pixel-perfect interfaces</li>
                <li>Integrated web applications with backend services via REST APIs</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-item left">
            <div className="timeline-point"></div>
            <div className="timeline-content">
              <div className="timeline-date">2018 - 2020</div>
              <h3 className="timeline-title">Junior Web Developer</h3>
              <h4 className="timeline-company">Digital Horizons</h4>
              <ul className="timeline-responsibilities">
                <li>Built and maintained client websites using modern web technologies</li>
                <li>Implemented responsive designs for optimal viewing across devices</li>
                <li>Created interactive UI components and animations</li>
                <li>Participated in code reviews and team knowledge sharing sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Soft Skills Section */}
      <section 
        className="roadmap-section soft-skills-section" 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current.soft = el }}
      >
        <h2 className="section-header">Soft Skills</h2>
        
        <div className="soft-skills-container">
          {softSkills.map((skill) => (
            <div key={skill.id} className="soft-skill-item">
              <div className="soft-skill-header">
                <h3 className="soft-skill-name">{skill.name}</h3>
                <span className="soft-skill-level">{skill.level}%</span>
              </div>
              <div className="soft-skill-progress">
                <div className="progress-bg"></div>
                <div 
                  className="progress-fill" 
                  data-level={skill.level}
                  style={{ width: '0%' }} // Initial width of 0 for animation
                ></div>
              </div>
              <p className="soft-skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Education Section */}
      <section 
        className="roadmap-section education-section" 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current.education = el }}
      >
        <h2 className="section-header">Education & Certifications</h2>
        
        <div className="education-container">
          <h3 className="subsection-title">Education</h3>
          {education.map((item) => (
            <div key={item.id} className="education-item">
              <div className="education-period">{item.period}</div>
              <div className="education-content">
                <h4 className="education-degree">{item.degree}</h4>
                <div className="education-institution">{item.institution}</div>
                <p className="education-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="certifications-container">
          <h3 className="subsection-title">Certifications</h3>
          <div className="certifications-grid">
            {certificates.map((cert: Certificate) => (
              <div 
                key={cert.id} 
                className="certification-item"
                onClick={() => openCertificateModal(cert)}
              >
                <div className="certification-year">{cert.year}</div>
                <h4 className="certification-name">{cert.name}</h4>
                <div className="certification-issuer">{cert.issuer}</div>
                <div className="view-certificate">
                  <span>View Certificate</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        className="roadmap-section contact-section" 
        ref={(el: HTMLDivElement | null) => { sectionsRef.current.contact = el }}
      >
        <h2 className="section-header">Let's Connect</h2>
        <p className="contact-text">
          Interested in working together or have a project in mind?
          Feel free to reach out - I'm always open to new opportunities and collaborations.
        </p>
        

        <Link to="/contact" className="contact-button">Get In Touch</Link>
        
        <div className="social-links">
          <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="social-link github">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="social-link telegram">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2.5L2.5 10.5 7.5 12.5M21.5 2.5L18.5 21.5 9.5 13.5M21.5 2.5L9.5 13.5 7.5 16.5 5.5 14.5 7.5 12.5"></path></svg>
          </a>
        </div>
        
        <div className="navigation-buttons">
          <Link to="/" className="nav-btn prev-btn">Home</Link>
          <Link to="/projects" className="nav-btn next-btn">Projects</Link>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;