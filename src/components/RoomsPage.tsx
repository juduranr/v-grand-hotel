import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RoomsPage.css';

interface Room {
  title: string;
  capacity: number;
  area: number;
  description: string;
  banner: string;
  beds: number;
  bathrooms: number;
  terrace: boolean;
  breakfast: boolean;
  gallery: string[];
}

interface RoomsPageProps {
  roomsData: Room[];
}

const RoomsPage: React.FC<RoomsPageProps> = ({ roomsData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const normalizeRoomName = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  // Función para actualizar indicadores de navegación
  const updateNavigationDots = () => {
    const sections = document.querySelectorAll('section');
    
    // Encontrar qué sección está más visible en el viewport
    let currentSection = 0;
    let maxVisibility = 0;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calcular qué tan visible está la sección
      const visibleTop = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      const visibility = visibleTop / Math.min(rect.height, viewportHeight);
      
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        currentSection = index;
      }
    });
    
    // Actualizar todos los dots en todas las secciones
    sections.forEach((section, sectionIndex) => {
      const dots = section.querySelectorAll('.rp-dot');
      
      dots.forEach((dot, dotIndex) => {
        // Remover clase active de todos los dots
        dot.classList.remove('active');
        
        // Si estamos en una sección de habitación (no hero) y es la sección actual
        if (sectionIndex > 0 && sectionIndex === currentSection) {
          // Activar el dot que corresponde a esta habitación
          if (dotIndex === sectionIndex - 1) {
            dot.classList.add('active');
          }
        }
      });
    });
    
    // Debug: mostrar qué sección está activa
    console.log('Sección activa:', currentSection);
  };

  // Función para navegar a una sección específica
  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Actualizar el estado activo después de la navegación
      setTimeout(() => {
        // Forzar la actualización del estado activo
        const targetSection = sections[sectionIndex];
        const dots = targetSection.querySelectorAll('.dot');
        
        // Remover active de todos los dots
        document.querySelectorAll('.rp-dot').forEach(dot => dot.classList.remove('active'));
        
        // Activar el dot correspondiente
        if (sectionIndex > 0) {
          const activeDot = targetSection.querySelector(`.rp-dot[data-section="room-${sectionIndex - 1}"]`);
          if (activeDot) {
            activeDot.classList.add('active');
          }
        }
      }, 300);
    }
  };

  useEffect(() => {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);


    // Agregar event listener para scroll con throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateNavigationDots();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Llamar una vez para establecer el estado inicial
    updateNavigationDots();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [roomsData]);

  return (
    <div className="rp-rooms-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="rp-hero-section">
        <div className="rp-hero-content">
          <h1 className="rp-hero-title">Habitaciones</h1>
        </div>
      </section>

      {/* Habitaciones Sections */}
      {roomsData.map((room, index) => (
        <section 
          key={room.title}
          className="rp-room-section" 
          style={{ backgroundImage: `url(${room.banner.startsWith('http') ? room.banner : `/images/${room.banner}`})` }}
          role="link"
          tabIndex={0}
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
          onClick={() => {
            window.location.href = `/rooms/${normalizeRoomName(room.title)}`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.location.href = `/rooms/${normalizeRoomName(room.title)}`;
            }
          }}
        >
          <div className="rp-room-overlay"></div>
          <div className="rp-room-content">
            <div className="rp-room-info">
              <h2 className="rp-room-title">{room.title}</h2>
            </div>
          </div>
          
                     {/* Navigation Dots para esta habitación */}
           <div className="rp-navigation-dots">
             {roomsData.map((roomItem, roomIndex) => (
               <div 
                 key={roomItem.title}
                 className={`rp-dot ${roomIndex === index ? 'active' : ''}`}
                 data-section={`room-${roomIndex}`}
                 onClick={(e) => { e.stopPropagation(); scrollToSection(roomIndex + 1); }}
               >
                 {roomItem.title}
               </div>
             ))}
           </div>
        </section>
      ))}

      {/* Cursor personalizado circular con texto rotando */}
      <div
        className={`rp-custom-cursor ${cursorVisible ? 'visible' : ''}`}
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
        aria-hidden="true"
      >
        <svg className="rp-cursor-svg" viewBox="0 0 200 200">
          <defs>
            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
          </defs>
          <g className="rp-rotate">
            <text className="rp-cursor-text">
              <textPath href="#circlePath" startOffset="0%" method="align" spacing="auto">
                Visitar habitación · Visitar habitación · Visitar habitación
              </textPath>
            </text>
          </g>
          {/* Chevron centrado */}
          <g className="rp-chevron">
            <path d="M95 87 L110 100 L95 113" fill="none" stroke="white" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="2" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RoomsPage;
