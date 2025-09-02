import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "./Discover.css";
import { DISCOVER_IMAGES } from "../config/env";

const Discover: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const zoomAnimationRef = useRef<gsap.core.Tween | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lightboxImageRef = useRef<HTMLImageElement | null>(null);
  const lightboxOpenAnimRef = useRef<gsap.core.Timeline | null>(null);
  const lightboxCloseAnimRef = useRef<gsap.core.Timeline | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

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

  // Abrir lightbox
  const handleOpenLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
    document.documentElement.style.overflow = 'hidden';
  };

  // Cerrar lightbox
  const handleCloseLightbox = () => {
    // Animación de salida antes de desmontar
    if (dialogRef.current) {
      const elements: Array<HTMLElement | null> = [dialogRef.current, lightboxImageRef.current];
      lightboxCloseAnimRef.current?.kill();
      lightboxCloseAnimRef.current = gsap.timeline({
        onComplete: () => {
          setLightboxOpen(false);
          setLightboxSrc(null);
          document.documentElement.style.overflow = '';
        }
      })
      .to(elements[1], { scale: 0.95, duration: 0.2, ease: 'power2.inOut' }, 0)
      .to(elements[0], { autoAlpha: 0, duration: 0.2, ease: 'power2.inOut' }, 0);
    } else {
      setLightboxOpen(false);
      setLightboxSrc(null);
      document.documentElement.style.overflow = '';
    }
  };

  // Cerrar con Escape y click fuera
  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        handleCloseLightbox();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClickOutside);
    };
  }, [lightboxOpen]);

  // Animación de entrada cuando el lightbox abre
  useEffect(() => {
    if (!lightboxOpen) return;
    const overlay = dialogRef.current;
    const lightboxImg = lightboxImageRef.current;
    if (!overlay) return;
    // Estado inicial
    gsap.set(overlay, { autoAlpha: 0 });
    if (lightboxImg) gsap.set(lightboxImg, { scale: 0.95 });
    // Animar
    lightboxOpenAnimRef.current?.kill();
    lightboxOpenAnimRef.current = gsap.timeline()
      .to(overlay, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0)
      .to(lightboxImg, { scale: 1, duration: 0.25, ease: 'power2.out' }, 0);
    return () => {
      lightboxOpenAnimRef.current?.kill();
    };
  }, [lightboxOpen]);

  // Animación del título al entrar al componente
  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current, { autoAlpha: 0, y: 40 });
    gsap.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
  }, []);

  return (
    <section className="discover">
      <div className="discover__container">
        <div className="discover__infinity-gallery">
          <div 
            ref={trackRef}
            className="discover__infinity-gallery-track"
          >
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_1} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_1)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_2} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_2)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_3} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_3)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_1} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_1)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_2} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_2)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_3} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_3)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_1} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_1)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_2} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_2)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_3} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_3)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_1} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_1)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_2} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_2)}
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
            <div className="discover__infinity-gallery-item">
              <img 
                src={DISCOVER_IMAGES.GALLERY_3} 
                alt="Infinity Gallery" 
                onClick={() => handleOpenLightbox(DISCOVER_IMAGES.GALLERY_3)}
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
          </div>
        </div>
        <div className="discover__background">
          <img
            ref={imageRef}
            src={`${DISCOVER_IMAGES.HERO}`}
            alt="V Grand Hotel Discover"
            className="discover__image"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => handleOpenLightbox(DISCOVER_IMAGES.HERO)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
              (e.target as HTMLImageElement).style.display = 'flex';
              (e.target as HTMLImageElement).style.alignItems = 'center';
              (e.target as HTMLImageElement).style.justifyContent = 'center';
              (e.target as HTMLImageElement).style.color = '#fff';
              (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
            }}
          />
          <div ref={titleRef} className="discover__background_title">
            <h2>Descubre lo que tenemos para tí</h2>
          </div>
        </div>
        {lightboxOpen && (
          <div
            ref={dialogRef}
            className="discover__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <button className="discover__lightbox_close" onClick={handleCloseLightbox} aria-label="Cerrar imagen">✕</button>
            {lightboxSrc && (
              <img ref={lightboxImageRef} className="discover__lightbox_image" src={lightboxSrc} alt="Imagen ampliada" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Discover;
