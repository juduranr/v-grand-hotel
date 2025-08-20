import React, { useEffect, useRef, useState } from 'react';
import './AutoCarousel.css';

interface GalleryItem {
  src: string;
  alt: string;
}

interface AutoCarouselProps {
  items?: GalleryItem[];
  className?: string;
  opacity?: number;
  zIndex?: number;
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({ 
  items = [], 
  className = '',
  opacity = 1,
  zIndex = 1
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const flickityInstance = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !carouselRef.current || items.length === 0) return;

    // Importar Flickity dinámicamente solo en el cliente
    const initFlickity = async () => {
      try {
        const Flickity = (await import('flickity')).default;
        await import('flickity/css/flickity.css');
        
        // Inicializar Flickity
        flickityInstance.current = new Flickity(carouselRef.current!, {
          wrapAround: true,
          autoPlay: 3000, // Cambiar imagen cada 3 segundos
          cellAlign: 'center', // Centrar la imagen actual
          contain: false, // Permitir que las imágenes se extiendan
          pageDots: false, // Sin indicadores de página
          prevNextButtons: false, // Sin botones de navegación
          adaptiveHeight: true,
          draggable: false,
          selectedAttraction: 0.025,
          friction: 0.28,
          percentPosition: false, // Usar posiciones absolutas
          setGallerySize: true
        });
      } catch (error) {
        console.error('Error al cargar Flickity:', error);
      }
    };

    initFlickity();

    // Cleanup al desmontar
    return () => {
      if (flickityInstance.current && flickityInstance.current.destroy) {
        try {
          flickityInstance.current.destroy();
        } catch (error) {
          console.error('Error al destruir Flickity:', error);
        }
      }
    };
  }, [isClient, items]);

  // Si no hay items, mostrar un mensaje o nada
  if (items.length === 0) {
    return null;
  }

  return (
    <div 
      className={`auto-carousel-container ${className}`}
      style={{ opacity, zIndex }}
    >
      <div 
        ref={carouselRef} 
        className="gallery js-flickity"
      >
        {items.map((item, index) => (
          <div key={index} className="gallery-cell">
            <img 
              src={item.src} 
              alt={item.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente contenedor para mostrar 2 carruseles superpuestos
interface DualAutoCarouselProps {
  frontItems?: GalleryItem[];
  backItems?: GalleryItem[];
  className?: string;
}

export const DualAutoCarousel: React.FC<DualAutoCarouselProps> = ({
  frontItems = [],
  backItems = [],
  className = ''
}) => {
  return (
    <div className={`dual-carousel-wrapper ${className}`}>
      {/* Carrusel más atrás con menor opacidad */}
      <AutoCarousel 
        items={backItems}
        opacity={0.6}
        zIndex={1}
        className="deep-back-carousel"
      />
      
      {/* Carrusel de fondo con opacidad media */}
      <AutoCarousel 
        items={backItems}
        opacity={0.8}
        zIndex={2}
        className="back-carousel"
      />
      
      {/* Carrusel delantero con opacidad completa */}
      <AutoCarousel 
        items={frontItems}
        opacity={1}
        zIndex={3}
        className="front-carousel"
      />
    </div>
  );
};

export default AutoCarousel;
