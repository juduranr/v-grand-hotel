import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import infinityGallery1 from "../assets/images/infinity-gallery-1.webp";
import infinityGallery2 from "../assets/images/infinity-gallery-2.webp";
import infinityGallery3 from "../assets/images/infinity-gallery-3.webp";
import discoverImage from "../assets/images/discover.webp";
import "./Discover.css";

const Discover: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const zoomAnimationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollSpeed = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      if (scrollDelta > 5) { // Umbral mínimo para considerar que hay scroll
        if (!isScrolling) {
          setIsScrolling(true);
          
          // Acelerar la animación GSAP sin reiniciar
          if (animationRef.current) {
            animationRef.current.timeScale(3.75); // 30/8 = 3.75 veces más rápido
          }
        }
        
        // Limpiar timeout anterior
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Resetear a velocidad lenta después de 500ms sin scroll
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          
          // Restaurar velocidad normal sin reiniciar
          if (animationRef.current) {
            animationRef.current.timeScale(1);
          }
        }, 500);
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollSpeed);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  // Inicializar la animación GSAP
  useEffect(() => {
    if (trackRef.current) {
      // Detener la animación CSS
      trackRef.current.style.animation = 'none';
      
      // Crear animación GSAP infinita
      animationRef.current = gsap.to(trackRef.current, {
        x: '-1800px', // -300px * 6
        duration: 30,
        ease: 'none',
        repeat: -1,
        onRepeat: () => {
          // Resetear posición para crear el efecto infinito
          gsap.set(trackRef.current, { x: 0 });
        }
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Efecto inicial para establecer el tamaño por defecto de la imagen
  useEffect(() => {
    if (imageRef.current) {
      gsap.set(imageRef.current, { scale: 1.1 });
    }
  }, []);

  // Efecto para el zoom de la imagen
  useEffect(() => {
    if (imageRef.current) {
      if (isHovering) {
        // Tamaño normal cuando el mouse está sobre la imagen
        zoomAnimationRef.current = gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
        // Imagen más grande por defecto cuando el mouse sale
        zoomAnimationRef.current = gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }

    return () => {
      if (zoomAnimationRef.current) {
        zoomAnimationRef.current.kill();
      }
    };
  }, [isHovering]);

  return (
    <section className="discover">
      <div className="discover__container">
        <div className="discover__infinity-gallery">
          <div 
            ref={trackRef}
            className="discover__infinity-gallery-track"
          >
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
          </div>
        </div>
        <div className="discover__background">
          <img
            ref={imageRef}
            src={discoverImage.src}
            alt="V Grand Hotel Discover"
            className="discover__image"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
          <div className="discover__background_title">
            <h2>Descubre lo que tenemos para tí</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
