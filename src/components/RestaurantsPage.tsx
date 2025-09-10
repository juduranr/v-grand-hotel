import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RestaurantsPage.css';

interface Restaurant {
  title: string;
  description: string;
  banner: string;
  gallery: string[];
  cuisine: string;
  hours: string;
  location: string;
}

interface RestaurantsPageProps {
  restaurantsData: Restaurant[];
}

const RestaurantsPage: React.FC<RestaurantsPageProps> = ({ restaurantsData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const normalizeRestaurantName = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
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
        // Mostrar dots en las secciones de restaurantes
        container.style.display = 'flex';
      }
    }
    
    // Remover clase active de todos los dots primero
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Activar el dot correspondiente a la sección actual
    if (currentSection > 0) {
      // Si estamos en una sección de restaurante (no hero)
      const restaurantIndex = currentSection - 1;
      const activeDot = document.querySelector(`.rp-dot[data-section="restaurant-${restaurantIndex}"]`);
      console.log(`Buscando dot con data-section="restaurant-${restaurantIndex}"`, activeDot);
      if (activeDot) {
        activeDot.classList.add('active');
        console.log('Dot activado:', activeDot.textContent);
      }
    }
    
    // Debug: mostrar qué sección está activa
    console.log('Sección activa:', currentSection, 'Restaurante:', currentSection > 0 ? currentSection - 1 : 'Hero', 'Max visibility:', maxVisibility.toFixed(2));
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
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Llamar una vez para establecer el estado inicial
      updateNavigationDots();
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [restaurantsData]);

  return (
    <div className="rp-rooms-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="rp-hero-section">
        <div className="rp-hero-content">
          <h1 className="rp-hero-title">Restaurantes</h1>
        </div>
      </section>

      {/* Restaurantes Sections */}
      {restaurantsData.map((restaurant, index) => (
        <section 
          key={restaurant.title}
          className="rp-room-section" 
          style={{ backgroundImage: `url(${restaurant.banner.startsWith('http') ? restaurant.banner : `/images/${restaurant.banner}`})` }}
          role="link"
          tabIndex={0}
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
          onClick={() => {
            window.location.href = `/gastro/${normalizeRestaurantName(restaurant.title)}`;
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.location.href = `/gastro/${normalizeRestaurantName(restaurant.title)}`;
            }
          }}
        >
          <div className="rp-room-overlay"></div>
          <div className="rp-room-content">
            <div className="rp-room-info">
              <h2 className="rp-room-title">{restaurant.title}</h2>
            </div>
          </div>
        </section>
      ))}

      {/* Navigation Dots - Un solo conjunto para todos los restaurantes */}
      <div className="rp-navigation-dots">
        {restaurantsData.map((restaurantItem, restaurantIndex) => (
          <div 
            key={restaurantItem.title}
            className="rp-dot"
            data-section={`restaurant-${restaurantIndex}`}
            onClick={(e) => { e.stopPropagation(); scrollToSection(restaurantIndex + 1); }}
          >
            {restaurantItem.title}
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
                Visitar restaurante · Visitar restaurante · Visitar restaurante
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

export default RestaurantsPage;
