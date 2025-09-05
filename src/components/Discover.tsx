import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Discover.css";
import { DISCOVER_IMAGES } from "../config/env";
import raddisonLogo from "../assets/images/raddison.svg";

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

gsap.registerPlugin(ScrollTrigger);

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

      if (scrollDelta > 5) {
        if (!isScrolling) {
          setIsScrolling(true);

          if (animationRef.current) {
            animationRef.current.timeScale(3.75);
          }
        }

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);

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
      trackRef.current.style.animation = 'none';

      animationRef.current = gsap.to(trackRef.current, {
        x: `-${300 * GALLERY_IMAGES.length}px`,
        duration: 30,
        ease: 'none',
        repeat: -1,
          onRepeat: () => {
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

  useEffect(() => {
    if (imageRef.current) {
      gsap.set(imageRef.current, { scale: 1.1 });
    }
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      if (isHovering) {
        zoomAnimationRef.current = gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      } else {
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

  const handleOpenLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
    document.documentElement.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
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

  useEffect(() => {
    if (!lightboxOpen) return;
    const overlay = dialogRef.current;
    const lightboxImg = lightboxImageRef.current;
    if (!overlay) return;
    gsap.set(overlay, { autoAlpha: 0 });
    if (lightboxImg) gsap.set(lightboxImg, { scale: 0.95 });
    lightboxOpenAnimRef.current?.kill();
    lightboxOpenAnimRef.current = gsap.timeline()
      .to(overlay, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0)
      .to(lightboxImg, { scale: 1, duration: 0.25, ease: 'power2.out' }, 0);
    return () => {
      lightboxOpenAnimRef.current?.kill();
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!titleRef.current) return;
    
    gsap.set(titleRef.current, { 
      clipPath: "inset(0 100% 0 0)",
      y: 20
    });
    
    gsap.to(titleRef.current, {
      clipPath: "inset(0 0% 0 0)",
      y: 0,
      ease: "power2.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: ".discover__background_title",
        start: "top bottom-=10%",
        end: "center bottom-=30%",
        scrub: 1
      }
    });
  }, []);

  return (
    <section className="discover">
      <div className="discover__container">
        <div className="discover__infinity-gallery">
          <div
            ref={trackRef}
            className="discover__infinity-gallery-track"
          >
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
          <div className="discover__radisson-logo">
            <img src={raddisonLogo.src} alt="Radisson Logo" />
          </div>
          <div ref={titleRef} className="discover__background_title">
            <h2>Descubre lo que<br />tenemos para ti</h2>
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
            {lightboxSrc && (
              <div className="discover__lightbox_image_container">
                <img ref={lightboxImageRef} className="discover__lightbox_image" src={lightboxSrc} alt="Imagen ampliada" />
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
