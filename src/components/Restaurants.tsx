import React, { useEffect, useRef, useState } from 'react';
import './Restaurants.css';
import galleryData from '../data/gallery.json';

declare global {
  interface Window {
    ScrollTrigger?: any;
  }
}

const Restaurants: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);
  const carouselRef3 = useRef<HTMLDivElement>(null);
  const flickityInstance1 = useRef<any>(null);
  const flickityInstance2 = useRef<any>(null);
  const flickityInstance3 = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const originalScrollPosition = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Función para bloquear el scroll
  const lockScroll = () => {
    if (isScrollLocked) return;
    
    originalScrollPosition.current = window.pageYOffset;
    
    // Aplicar estilos para bloquear el scroll de manera más suave
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    setIsScrollLocked(true);
  };

  // Función para desbloquear el scroll
  const unlockScroll = () => {
    if (!isScrollLocked) return;
    
    // Restaurar estilos del scroll
    document.body.style.overflow = '';
    document.body.style.height = '';
    
    // Restaurar posición del scroll
    window.scrollTo(0, originalScrollPosition.current);
    
    setIsScrollLocked(false);
  };

  // Detectar cuando el componente entra en el viewport
  useEffect(() => {
    if (!isClient) return;

    let isInView = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasInView = isInView;
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            isInView = true;
            if (!wasInView) {
              // Solo bloquear si no estaba bloqueado antes
              lockScroll();
            }
          } else if (entry.intersectionRatio < 0.2) {
            isInView = false;
            if (wasInView) {
              // Solo desbloquear si estaba bloqueado antes
              unlockScroll();
            }
          }
        });
      },
      {
        threshold: [0.2, 0.3, 0.5, 0.8], // Múltiples umbrales para mejor detección
        rootMargin: '0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      // Asegurar que el scroll se desbloquee al desmontar
      unlockScroll();
    };
  }, [isClient]);

  // Agregar listener para detectar cuando el usuario sale del componente
  useEffect(() => {
    if (!isClient || !isScrollLocked) return;

    const handleScroll = () => {
      // Si el usuario hace scroll manual, desbloquear
      if (Math.abs(window.pageYOffset - originalScrollPosition.current) > 100) {
        unlockScroll();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Si el usuario presiona teclas de navegación fuera del componente, desbloquear
      if (['PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
        unlockScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isClient, isScrollLocked]);

  // Limpiar Flickity al desmontar
  useEffect(() => {
    return () => {
      [flickityInstance1, flickityInstance2, flickityInstance3].forEach(instance => {
        if (instance.current && instance.current.destroy) {
          try {
            instance.current.destroy();
          } catch (error) {
            console.error('Error al destruir Flickity:', error);
          }
        }
      });
    };
  }, []);

  // Limpiar scroll al desmontar
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  const initFlickity = async (carouselRef: React.RefObject<HTMLDivElement | null>, flickityInstance: React.MutableRefObject<any>, options: any = {}) => {
    if (!carouselRef.current || galleryData.length === 0) return;

    try {
      const Flickity = (await import('flickity')).default;
      await import('flickity/css/flickity.css');
      
      const defaultOptions = {
        wrapAround: true,
        autoPlay: 3000,
        cellAlign: 'center',
        contain: false,
        pageDots: false,
        prevNextButtons: false,
        adaptiveHeight: true,
        draggable: false,
        selectedAttraction: 0.025,
        friction: 0.28,
        percentPosition: false,
        setGallerySize: true,
        ...options
      };
      
      flickityInstance.current = new Flickity(carouselRef.current!, defaultOptions);
    } catch (error) {
      console.error('Error al cargar Flickity:', error);
    }
  };

  // Inicializar sistema de navegación por pasos
  useEffect(() => {
    if (!isClient) return;

    // Inicializar los carousels directamente
    initFlickity(carouselRef1, flickityInstance1, { autoPlay: 4000 });
    initFlickity(carouselRef2, flickityInstance2, { autoPlay: 5000 });
    initFlickity(carouselRef3, flickityInstance3, { autoPlay: 6000 });

    // Sistema de navegación por teclado solo cuando el componente está enfocado
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning || !containerRef.current?.contains(event.target as Node)) return;
      
      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          event.preventDefault();
          goToNextSection();
          break;
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goToPreviousSection();
          break;
        case 'Home':
          event.preventDefault();
          goToSection(0);
          break;
        case 'End':
          event.preventDefault();
          goToSection(2);
          break;
        case 'Escape':
          // Permitir salir de la sección con Escape
          event.preventDefault();
          unlockScroll();
          break;
      }
    };

    // Sistema de navegación por rueda del mouse solo dentro del componente
    const handleWheel = (event: WheelEvent) => {
      if (isTransitioning || !containerRef.current?.contains(event.target as Node)) return;
      
      event.preventDefault();
      
      if (event.deltaY > 0) {
        goToNextSection();
      } else {
        goToPreviousSection();
      }
    };

    // Sistema de navegación por touch/swipe solo dentro del componente
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) return;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isTransitioning || !containerRef.current?.contains(event.target as Node)) return;
      
      touchEndY = event.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      if (Math.abs(touchDiff) > 50) { // Umbral mínimo para considerar swipe
        if (touchDiff > 0) {
          goToNextSection();
        } else {
          goToPreviousSection();
        }
      }
    };

    // Agregar event listeners solo al componente
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown);
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isClient, isTransitioning]);

  const restaurantData = [
    {
      title: "Restaurante Principal",
      description: "Nuestro restaurante principal ofrece una experiencia gastronómica excepcional con platos de autor y la mejor cocina internacional.",
      items: galleryData
    },
    {
      title: "Bar Lounge",
      description: "Disfruta de cócteles artesanales y tapas gourmet en nuestro elegante bar lounge con vistas panorámicas.",
      items: galleryData
    },
    {
      title: "Restaurante de Especialidades",
      description: "Descubre sabores únicos en nuestro restaurante de especialidades, donde la tradición se encuentra con la innovación.",
      items: galleryData
    }
  ];

  const goToSection = (sectionIndex: number) => {
    if (isTransitioning || sectionIndex === activeSection) return;
    
    setIsTransitioning(true);
    
    // Determinar dirección de la transición
    const direction = sectionIndex > activeSection ? 'down' : 'up';
    
    // Agregar clase de transición de salida a la sección actual
    const currentSection = document.querySelector(`.restaurants-section:nth-child(${activeSection + 1})`);
    if (currentSection) {
      currentSection.classList.add(direction === 'down' ? 'transitioning-out-down' : 'transitioning-out-up');
    }
    
    // Pequeño delay para la transición de salida
    setTimeout(() => {
      setActiveSection(sectionIndex);
      
      // Agregar clase de transición de entrada a la nueva sección
      const newSection = document.querySelector(`.restaurants-section:nth-child(${sectionIndex + 1})`);
      if (newSection) {
        newSection.classList.add(direction === 'down' ? 'transitioning-in-up' : 'transitioning-in-down');
      }
      
      // Remover clases de transición después de la animación
      setTimeout(() => {
        if (currentSection) {
          currentSection.classList.remove('transitioning-out-down', 'transitioning-out-up');
        }
        if (newSection) {
          newSection.classList.remove('transitioning-in-up', 'transitioning-in-down');
        }
        setIsTransitioning(false);
      }, 800);
    }, 200);
  };

  const goToNextSection = () => {
    const nextSection = Math.min(activeSection + 1, 2);
    goToSection(nextSection);
  };

  const goToPreviousSection = () => {
    const prevSection = Math.max(activeSection - 1, 0);
    goToSection(prevSection);
  };

  return (
    <div className="restaurants-container" ref={containerRef} tabIndex={0}>
      {/* Primera sección - Restaurante Principal */}
      <section className={`restaurants-section ${activeSection === 0 ? 'active' : ''}`}>
        <div className="restaurants-content">
          <h1 className="restaurants-title">{restaurantData[0].title}</h1>
          <div className="restaurants-carousel-container">
            <div ref={carouselRef1} className="restaurants-gallery js-flickity">
              {restaurantData[0].items.map((item, index) => (
                <div key={`carousel1-${index}`} className="restaurants-gallery-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <p className="restaurants-description">{restaurantData[0].description}</p>
        </div>
      </section>

      {/* Segunda sección - Bar Lounge */}
      <section className={`restaurants-section ${activeSection === 1 ? 'active' : ''}`}>
        <div className="restaurants-content">
          <h1 className="restaurants-title">{restaurantData[1].title}</h1>
          <div className="restaurants-carousel-container">
            <div ref={carouselRef2} className="restaurants-gallery js-flickity">
              {restaurantData[1].items.map((item, index) => (
                <div key={`carousel2-${index}`} className="restaurants-gallery-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <p className="restaurants-description">{restaurantData[1].description}</p>
        </div>
      </section>

      {/* Tercera sección - Restaurante de Especialidades */}
      <section className={`restaurants-section ${activeSection === 2 ? 'active' : ''}`}>
        <div className="restaurants-content">
          <h1 className="restaurants-title">{restaurantData[2].title}</h1>
          <div className="restaurants-carousel-container">
            <div ref={carouselRef3} className="restaurants-gallery js-flickity">
              {restaurantData[2].items.map((item, index) => (
                <div key={`carousel3-${index}`} className="restaurants-gallery-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <p className="restaurants-description">{restaurantData[2].description}</p>
        </div>
      </section>

      {/* Indicadores de navegación */}
      <div className="section-indicators">
        <div 
          className={`section-indicator ${activeSection === 0 ? 'active' : ''}`}
          onClick={() => goToSection(0)}
        />
        <div 
          className={`section-indicator ${activeSection === 1 ? 'active' : ''}`}
          onClick={() => goToSection(1)}
        />
        <div 
          className={`section-indicator ${activeSection === 2 ? 'active' : ''}`}
          onClick={() => goToSection(2)}
        />
      </div>

      {/* Indicador de scroll bloqueado */}
      {isScrollLocked && (
        <div className="scroll-lock-indicator">
          <span>Scroll bloqueado - Usa ↑↓ para navegar</span>
        </div>
      )}

      {/* Debug info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <div>Sección activa: {activeSection + 1}</div>
          <div>Scroll bloqueado: {isScrollLocked ? 'Sí' : 'No'}</div>
          <div>Transicionando: {isTransitioning ? 'Sí' : 'No'}</div>
          <div>Posición original: {originalScrollPosition.current}</div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
