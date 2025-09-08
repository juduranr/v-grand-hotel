import React, { useState, useEffect, useRef } from "react";
import "./Discover.css";
import { DISCOVER_IMAGES } from "../config/env";
import raddisonLogo from "../assets/images/raddison.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GALLERY_IMAGES = [
  DISCOVER_IMAGES.GALLERY_1,
  DISCOVER_IMAGES.GALLERY_2,
  DISCOVER_IMAGES.GALLERY_3,
  DISCOVER_IMAGES.GALLERY_4,
  DISCOVER_IMAGES.GALLERY_5,
  DISCOVER_IMAGES.GALLERY_6,
  DISCOVER_IMAGES.GALLERY_7,
  DISCOVER_IMAGES.GALLERY_8,
  DISCOVER_IMAGES.GALLERY_9,
  DISCOVER_IMAGES.GALLERY_10,
  DISCOVER_IMAGES.GALLERY_11,
];

const Discover: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    if (galleryTrackRef.current) {
      // Crear la animación del carousel
      const t = gsap.to(galleryTrackRef.current, {
        duration: 60,
        ease: "none",
        x: `-50%`,
        repeat: -1,
      });

      animationRef.current = t;

      // Crear ScrollTrigger para controlar la velocidad según el scroll
      ScrollTrigger.create({
        trigger: galleryTrackRef.current,
        start: "top 80%",
        end: "bottom top",
        onUpdate(self) {
          const velocity = self.getVelocity();
          // Usar valor absoluto para que funcione en ambas direcciones
          const absVelocity = Math.abs(velocity);
          const timeScale = 3 + (absVelocity / 800);
          gsap.timeline()
            .to(t, { duration: 0.1, timeScale })
            .to(t, { duration: 2, timeScale: 1 });
        }
      });
    }

    // Animación del título con efecto de escritura progresivo
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.typewriter-char');
      
      // Configurar estado inicial del título
      gsap.set(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1
      });

      gsap.set(chars, {
        opacity: 0,
        x: -15,
        scale: 0.9,
        filter: "blur(2px)"
      });

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 90%",
        end: "bottom 90%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalChars = chars.length;
          
          // Calcular cuántas letras deben estar visibles según el progreso
          const visibleChars = Math.floor(progress * totalChars);
          
          // Animar cada letra según su posición en el progreso
          chars.forEach((char, index) => {
            if (index <= visibleChars) {
              // Calcular el progreso individual de cada letra
              const charProgress = Math.min(1, (progress * totalChars - index) * 2);
              
              gsap.to(char, {
                opacity: charProgress,
                x: -15 * (1 - charProgress),
                scale: 0.9 + (0.1 * charProgress),
                filter: `blur(${2 * (1 - charProgress)}px)`,
                duration: 0.1,
                ease: "power2.out"
              });
            } else {
              // Mantener letras no visibles en estado inicial
              gsap.set(char, {
                opacity: 0,
                x: -15,
                scale: 0.9,
                filter: "blur(2px)"
              });
            }
          });
        }
      });
    }

    // Animación de parallax y zoom out para la imagen de fondo
    if (backgroundImageRef.current) {
      ScrollTrigger.create({
        trigger: backgroundImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Efecto de parallax más sutil para reducir espacio en blanco
          const parallaxY = -progress * 80; // Movimiento hacia arriba más moderado
          // Efecto de zoom out más conservador para mantener cobertura
          const scale = 1.6 - (progress * 0.3); // Empieza en 1.6x y termina en 1.3x
          
          gsap.set(backgroundImageRef.current, {
            y: parallaxY,
            scale: scale,
            transformOrigin: "center top"
          });
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const handleOpenLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
    document.documentElement.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc(null);
    document.documentElement.style.overflow = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseLightbox();
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseLightbox();
    }
  };

  return (
    <section className="discover">
      <div className="discover__container">
        <div className="discover__infinity-gallery">
          <div ref={galleryTrackRef} className="discover__infinity-gallery-track">
            {GALLERY_IMAGES.map((imageSrc, index) => (
              <div key={`first-${index}`} className="discover__infinity-gallery-item">
                <img
                  src={imageSrc}
                  alt={`Infinity Gallery ${index + 1}`}
                  onClick={() => handleOpenLightbox(imageSrc)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                    (e.target as HTMLImageElement).style.display = 'flex';
                    (e.target as HTMLImageElement).style.alignItems = 'center';
                    (e.target as HTMLImageElement).style.justifyContent = 'center';
                    (e.target as HTMLImageElement).style.color = '#fff';
                    (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                  }}
                />
              </div>
            ))}
            {GALLERY_IMAGES.map((imageSrc, index) => (
              <div key={`second-${index}`} className="discover__infinity-gallery-item">
                <img
                  src={imageSrc}
                  alt={`Infinity Gallery ${index + 1}`}
                  onClick={() => handleOpenLightbox(imageSrc)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                    (e.target as HTMLImageElement).style.display = 'flex';
                    (e.target as HTMLImageElement).style.alignItems = 'center';
                    (e.target as HTMLImageElement).style.justifyContent = 'center';
                    (e.target as HTMLImageElement).style.color = '#fff';
                    (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="discover__background">
          <img
            ref={backgroundImageRef}
            src={`${DISCOVER_IMAGES.HERO}`}
            alt="V Grand Hotel Discover"
            className="discover__image"
            onError={(e) => {
              (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
              (e.target as HTMLImageElement).style.display = 'flex';
              (e.target as HTMLImageElement).style.alignItems = 'center';
              (e.target as HTMLImageElement).style.justifyContent = 'center';
              (e.target as HTMLImageElement).style.color = '#fff';
              (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
            }}
          />
          <div className="discover__radisson-logo">
            <img src={raddisonLogo.src} alt="Radisson Logo" />
          </div>
          <div ref={titleRef} className="discover__background_title">
            <h2>
              <span className="typewriter-line">
                {Array.from("Descubre lo que").map((char, index) => (
                  <span key={index} className="typewriter-char">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <br />
              <span className="typewriter-line">
                {Array.from("tenemos para ti").map((char, index) => (
                  <span key={index} className="typewriter-char">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </div>
        {lightboxOpen && (
          <div
            className="discover__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
            onKeyDown={handleKeyDown}
            onClick={handleClickOutside}
          >
            {lightboxSrc && (
              <div className="discover__lightbox_image_container">
                <img className="discover__lightbox_image" src={lightboxSrc} alt="Imagen ampliada" />
                <button className="discover__lightbox_close" onClick={handleCloseLightbox} aria-label="Cerrar imagen">✕</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Discover;
