import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROOMS_IMAGES } from '../config/env';
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
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const normalizeRoomName = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  // Función para ajustar el tamaño del texto dinámicamente
  const adjustHeroTextSize = () => {
    const textElement = heroTitleRef.current;
    if (!textElement) return;

    const container = textElement.closest('.rp-hero-section');
    if (!container) return;

    const containerWidth = (container as HTMLElement).offsetWidth;
    
    // Empezar con un tamaño base
    textElement.style.fontSize = '1px';
    
    // Incrementar el tamaño hasta que ocupe todo el ancho
    let fontSize = 1;
    while (textElement.scrollWidth <= containerWidth && fontSize < 1000) {
      fontSize += 1;
      textElement.style.fontSize = fontSize + 'px';
    }
    
    // Si se pasó del ancho, reducir un poco
    if (textElement.scrollWidth > containerWidth) {
      fontSize -= 1;
      textElement.style.fontSize = fontSize + 'px';
    }
    
    // Aplicar escala horizontal para ocupar exactamente todo el ancho
    const scale = containerWidth / textElement.scrollWidth;
    textElement.style.transform = `scaleX(${scale})`;
  };

  // Función para actualizar indicadores de navegación
  const updateNavigationDots = () => {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.rp-dot');
    const dotsContainer = document.querySelector('.rp-navigation-dots');
    
    // Debug: verificar que tenemos dots
    console.log('Dots encontrados:', dots.length);
    
    // Encontrar qué sección está más visible en el viewport
    let currentSection = 0;
    let maxVisibility = 0;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calcular qué tan visible está la sección
      const visibleTop = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      const visibility = visibleTop / Math.min(rect.height, viewportHeight);
      
      console.log(`Sección ${index}: visibility = ${visibility.toFixed(2)}`);
      
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        currentSection = index;
      }
    });
    
    // Mostrar u ocultar los dots según la sección actual
    if (dotsContainer) {
      const container = dotsContainer as HTMLElement;
      if (currentSection === 0) {
        // Ocultar dots en la sección hero
        container.style.display = 'none';
      } else {
        // Mostrar dots en las secciones de habitaciones
        container.style.display = 'flex';
      }
    }
    
    // Remover clase active de todos los dots primero
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Activar el dot correspondiente a la sección actual
    if (currentSection > 0) {
      // Si estamos en una sección de habitación (no hero)
      const roomIndex = currentSection - 1;
      const activeDot = document.querySelector(`.rp-dot[data-section="room-${roomIndex}"]`);
      console.log(`Buscando dot con data-section="room-${roomIndex}"`, activeDot);
      if (activeDot) {
        activeDot.classList.add('active');
        console.log('Dot activado:', activeDot.textContent);
      }
    }
    
    // Debug: mostrar qué sección está activa
    console.log('Sección activa:', currentSection, 'Habitación:', currentSection > 0 ? currentSection - 1 : 'Hero', 'Max visibility:', maxVisibility.toFixed(2));
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
        updateNavigationDots();
      }, 500);
    }
  };

  useEffect(() => {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Ajustar el texto del hero al cargar
    adjustHeroTextSize();

    // Agregar event listener para scroll con throttling en el contenedor
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

    // Event listener para redimensionar ventana
    const handleResize = () => {
      adjustHeroTextSize();
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Llamar una vez para establecer el estado inicial
      updateNavigationDots();
    }

    // Agregar event listeners para el texto dinámico
    window.addEventListener('load', adjustHeroTextSize);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('load', adjustHeroTextSize);
      window.removeEventListener('resize', handleResize);
    };
  }, [roomsData]);

  return (
    <div className="rp-rooms-page" ref={containerRef}>
      {/* Hero Section */}
      <section 
        className="rp-hero-section"
        style={{ backgroundImage: `url(${ROOMS_IMAGES.HERO})` }}
      >
        <div className="rp-hero-content">
          <h1 className="rp-hero-title" ref={heroTitleRef}>Habitaciones</h1>
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
        </section>
      ))}

      {/* Navigation Dots - Un solo conjunto para todas las habitaciones */}
      <div className="rp-navigation-dots">
        {roomsData.map((roomItem, roomIndex) => (
          <div 
            key={roomItem.title}
            className="rp-dot"
            data-section={`room-${roomIndex}`}
            onClick={(e) => { e.stopPropagation(); scrollToSection(roomIndex + 1); }}
          >
            {roomItem.title}
          </div>
        ))}
      </div>

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
