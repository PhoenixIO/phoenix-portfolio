import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { projects, Project } from '../data/projects';
import { animations } from '../utils/animations';
import '../styles/pages/ProjectsPage.scss';

// Project modal component with image slider
const ProjectModal: React.FC<{
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (isOpen && modalRef.current && project) {
      // Modal appearance animation
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = '';
    }
    
    // Reset image index when opening a new project
    setCurrentImageIndex(0);
    
    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, project]);
  
  // Handle click outside modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Image slider navigation
  const nextImage = () => {
    if (project && project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };
  
  const prevImage = () => {
    if (project && project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };
  
  if (!project || !isOpen) return null;
  
  // Check if project has multiple images
  const hasMultipleImages = project.images && project.images.length > 1;
  
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="project-modal" ref={modalRef}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="modal-content">
          <div className="modal-header">
            <h2>{project.title}</h2>
          </div>
          
          <div className="modal-body">
            <div className="modal-image">
              {project.images && project.images.length > 0 ? (
                <div className="image-slider">
                  <div className="slider-image-container">
                    <img 
                      src={project.images[currentImageIndex]} 
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
                      className="slider-image"
                    />
                  </div>
                  
                  {hasMultipleImages && (
                    <div className="slider-controls">
                      <button onClick={prevImage} className="slider-btn prev-btn">
                        &lt;
                      </button>
                      <div className="slider-pagination">
                        {project.images.map((_, index) => (
                          <span 
                            key={index} 
                            className={`pagination-dot ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                      <button onClick={nextImage} className="slider-btn next-btn">
                        &gt;
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="image-placeholder large" style={{
                  background: `linear-gradient(135deg, hsl(${project.id * 60}, 70%, 40%), hsl(${project.id * 60 + 60}, 70%, 40%))`
                }}>
                  <span className="project-initial">{project.title.charAt(0)}</span>
                </div>
              )}
            </div>
            
            <div className="modal-description">
              <p>{project.description}</p>
              
              <h3>Technologies used:</h3>
              <div className="modal-tech">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              
              <div className="modal-links">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="demo-link"
                  >
                    Live Demo
                  </a>
                )}
                {project.codeUrl && (
                  <a 
                    href={project.codeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="code-link"
                  >
                    Project Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project card component
const ProjectCard: React.FC<{
  project: Project;
  onClick: (project: Project) => void;
}> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Hover animation
    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
        duration: 0.4,
        ease: 'sine.out'
      });
      
      gsap.to(card.querySelector('.project-overlay'), {
        opacity: 1,
        duration: 0.4,
        ease: 'sine.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.4,
        ease: 'sine.out'
      });
      
      gsap.to(card.querySelector('.project-overlay'), {
        opacity: 0,
        duration: 0.4,
        ease: 'sine.out'
      });
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`project-card ${project.featured ? 'featured' : ''}`}
      onClick={() => onClick(project)}
    >
      <div className="project-image">
        {project.images && project.images.length > 0 ? (
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="project-thumbnail" 
          />
        ) : (
          <div className="image-placeholder" style={{
            background: `linear-gradient(135deg, hsl(${project.id * 60}, 70%, 40%), hsl(${project.id * 60 + 60}, 70%, 40%))`
          }}>
            <span className="project-initial">{project.title.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description-short">
          {project.description.length > 100 
            ? `${project.description.substring(0, 100)}...` 
            : project.description}
        </p>
        
        <div className="project-tech">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-badge more">+{project.technologies.length - 3}</span>
          )}
        </div>
      </div>
      
      <div className="project-overlay">
        <span className="view-project">View Project</span>
      </div>
    </div>
  );
};

// Main Projects page component
const ProjectsPage: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const projectsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Animation for page elements on load
  useEffect(() => {
    if (headerRef.current) {
      animations.fadeInUp(headerRef.current, 0, 0.8);
    }
    
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out'
        }
      );
    }
    
    // Set all projects as filtered projects
    setFilteredProjects(projects);
  }, []);
  
  // Handle project card click
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  // Close project modal
  const closeModal = () => {
    if (selectedProject) {
      setIsModalOpen(false);
      
      // Delay before clearing selected project to complete animation
      setTimeout(() => {
        setSelectedProject(null);
      }, 500);
    }
  };

  return (
    <div className="projects-page">
      <div className="projects-header" ref={headerRef}>
        <h1>My Projects</h1>
        <p>Explore my best works and creative solutions</p>
      </div>
      
      <div className="projects-grid" ref={projectsRef}>
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id}
            project={project}
            onClick={handleProjectClick}
          />
        ))}
      </div>
      
      {/* Project details modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-btn home-btn">Home</Link>
        <Link to="/roadmap" className="nav-btn roadmap-btn">Technologies</Link>
      </div>
    </div>
  );
};

export default ProjectsPage;