import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { projects, categories, Project } from '../data/projects';
import { animations } from '../utils/animations';
import '../styles/pages/ProjectsPage.scss';

// Компонент модального вікна проєкту
const ProjectModal: React.FC<{
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current && project) {
      // Анімація появи модального вікна
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isOpen, project]);
  
  // Обробник кліку поза модальним вікном
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!project || !isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="project-modal" ref={modalRef}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="modal-content">
          <div className="modal-header">
            <h2>{project.title}</h2>
            <div className="modal-category">{project.category}</div>
          </div>
          
          <div className="modal-body">
            <div className="modal-image">
              {/* Заповнювач для зображення */}
              <div className="image-placeholder large" style={{
                background: `linear-gradient(135deg, hsl(${project.id * 60}, 70%, 40%), hsl(${project.id * 60 + 60}, 70%, 40%))`
              }}>
                <span className="project-initial">{project.title.charAt(0)}</span>
              </div>
            </div>
            
            <div className="modal-description">
              <p>{project.description}</p>
              
              <h3>Використані технології:</h3>
              <div className="modal-tech">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
              
              <div className="modal-links">
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="demo-link"
                >
                  Живе демо
                </a>
                <a 
                  href={project.codeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="code-link"
                >
                  Код проєкту
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент картки проєкту
const ProjectCard: React.FC<{
  project: Project;
  onClick: (project: Project) => void;
}> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Анімація при наведенні
    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-overlay'), {
        opacity: 1,
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.project-overlay'), {
        opacity: 0,
        duration: 0.3
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
        {/* Кольоровий градієнт як заповнювач для демонстрації */}
        <div className="image-placeholder" style={{
          background: `linear-gradient(135deg, hsl(${project.id * 60}, 70%, 40%), hsl(${project.id * 60 + 60}, 70%, 40%))`
        }}>
          <span className="project-initial">{project.title.charAt(0)}</span>
        </div>
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
        <span className="view-project">Переглянути проєкт</span>
      </div>
    </div>
  );
};

// Головний компонент сторінки проєктів
const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Всі');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const projectsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Фільтрація проєктів за категорією
  useEffect(() => {
    if (selectedCategory === 'Всі') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
    
    // Анімація карток при фільтрації
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
          ease: 'power2.out'
        }
      );
    }
  }, [selectedCategory]);
  
  // Анімація елементів при завантаженні сторінки
  useEffect(() => {
    if (headerRef.current) {
      animations.fadeInUp(headerRef.current, 0, 0.8);
    }
    
    if (filterRef.current) {
      animations.fadeInUp(filterRef.current, 0.3, 0.8);
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
          delay: 0.5,
          ease: 'power2.out'
        }
      );
    }
  }, []);
  
  // Обробка кліку по картці проєкту
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  // Закриття модального вікна
  const closeModal = () => {
    if (selectedProject) {
      setIsModalOpen(false);
      
      // Затримка перед скиданням вибраного проєкту, щоб анімація завершилась
      setTimeout(() => {
        setSelectedProject(null);
      }, 500);
    }
  };

  return (
    <div className="projects-page">
      <div className="projects-header" ref={headerRef}>
        <h1>Мої проєкти</h1>
        <p>Перегляньте мої найкращі роботи та креативні рішення</p>
      </div>
      
      <div className="filter-container" ref={filterRef}>
        <div className="categories-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
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
      
      {/* Модальне вікно з деталями проєкту */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-btn home-btn">На головну</Link>
        <Link to="/roadmap" className="nav-btn roadmap-btn">Технології</Link>
      </div>
    </div>
  );
};

export default ProjectsPage;
