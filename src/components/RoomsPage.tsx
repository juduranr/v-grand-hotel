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
      const dots = section.querySelectorAll('.dot');
      
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
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        // Activar el dot correspondiente
        if (sectionIndex > 0) {
          const activeDot = targetSection.querySelector(`.dot[data-section="room-${sectionIndex - 1}"]`);
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

    // Función para crear efecto parallax
    const createParallaxEffect = () => {
      // Seleccionar todos los elementos con data-parallax
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element, index) => {
        // Crear timeline para cada elemento
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              // Efecto parallax basado en la posición del scroll
              const progress = self.progress;
              const yOffset = (progress - 0.5) * 100;
              
              gsap.to(element, {
                y: yOffset,
                duration: 0.1,
                ease: 'none'
              });
            }
          }
        });
      });

      // Efecto de fade in para los elementos cuando entran en viewport
      gsap.utils.toArray('[data-parallax]').forEach((element, index) => {
        const el = element as Element;
        gsap.fromTo(el, 
          {
            y: 50
          },
          {
            y: 0,
            duration: 1,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el.closest('section'),
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    };

    // Inicializar efectos
    createParallaxEffect();

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
    <div className="rooms-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" data-parallax>Habitaciones</h1>
        </div>
      </section>

      {/* Habitaciones Sections */}
      {roomsData.map((room, index) => (
        <section 
          key={room.title}
          className="room-section" 
          style={{ backgroundImage: `url(/images/${room.banner})` }}
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
          <div className="room-overlay"></div>
          <div className="room-content">
            <div className="room-info">
              <h2 className="room-title" data-parallax>{room.title}</h2>
            </div>
          </div>
          
                     {/* Navigation Dots para esta habitación */}
           <div className="navigation-dots">
             {roomsData.map((roomItem, roomIndex) => (
               <div 
                 key={roomItem.title}
                 className={`dot ${roomIndex === index ? 'active' : ''}`}
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
        className={`custom-cursor ${cursorVisible ? 'visible' : ''}`}
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
        aria-hidden="true"
      >
        <svg className="cursor-svg" viewBox="0 0 200 200">
          <defs>
            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
          </defs>
          <g className="rotate">
            <text className="cursor-text">
              <textPath href="#circlePath" startOffset="0%" method="align" spacing="auto">
                Visitar habitación · Visitar habitación · Visitar habitación
              </textPath>
            </text>
          </g>
          {/* Chevron centrado */}
          <g className="chevron">
            <path d="M95 87 L110 100 L95 113" fill="none" stroke="white" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="2" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RoomsPage;
