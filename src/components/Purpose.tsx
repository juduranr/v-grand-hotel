import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vHotelLogo from "../assets/images/v-hotel.svg";
import grandHotelLogo from "../assets/images/grand-hotel.svg";
import LogosCarousel from "./LogosCarousel";
import "./Purpose.css";
import { PURPOSE_IMAGES } from "../config/env";

gsap.registerPlugin(ScrollTrigger);

const Purpose: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const purposeDescriptionRef = useRef<HTMLDivElement>(null);
  const pillarsDescriptionRef = useRef<HTMLDivElement>(null);
  const galleryTitleRef = useRef<HTMLDivElement>(null);
  const galleryItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState({
    title: 0,
    presentationDescription: 0,
    purposeDescription: 0,
    pillarsDescription: 0
  });

  useEffect(() => {
    const createTitleReveal = (element: HTMLElement) => {
      const textContent = element.textContent || '';
      element.innerHTML = '';
      
      element.classList.add('text-reveal-container');
      
      const words = textContent.split(' ');
      const wordSpans: HTMLElement[] = [];
      
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'text-word';
        
        const chars = word.split('').map(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'text-char-title';
          return charSpan;
        });
        
        chars.forEach(charSpan => wordSpan.appendChild(charSpan));
        wordSpans.push(wordSpan);
        
        element.appendChild(wordSpan);
        
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = '\u00A0';
          spaceSpan.className = 'text-space';
          element.appendChild(spaceSpan);
        }
      });
      
      const allChars = Array.from(element.querySelectorAll('.text-char-title'));
      
      gsap.set(allChars, {
        opacity: 0,
        x: -20
      });
      
      gsap.to(allChars, {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: element,
          scrub: 0,
          start: "top-=10% bottom",
          end: "bottom center+=20%"
        }
      });
    };

    const createDescriptionReveal = (element: HTMLElement) => {
      const textContent = element.textContent || '';
      element.innerHTML = '';
      
      element.classList.add('text-reveal-container');
      
      const words = textContent.split(' ');
      const wordSpans: HTMLElement[] = [];
      
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'text-word';
        
        const chars = word.split('').map(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'text-char-description';
          return charSpan;
        });
        
        chars.forEach(charSpan => wordSpan.appendChild(charSpan));
        wordSpans.push(wordSpan);
        
        element.appendChild(wordSpan);
        
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = '\u00A0';
          spaceSpan.className = 'text-space';
          element.appendChild(spaceSpan);
        }
      });
      
      const allChars = Array.from(element.querySelectorAll('.text-char-description'));
      
      gsap.set(allChars, {
        opacity: 0
      });
      
      gsap.to(allChars, {
        opacity: 1,
        ease: "power2.out",
        stagger: 0.01,
        scrollTrigger: {
          trigger: element,
          scrub: 0,
          start: "top 80%",
          end: "bottom 20%"
        }
      });
    };

    const titleElements = document.querySelectorAll('.purpose__content-title');
    titleElements.forEach((title) => {
      createTitleReveal(title as HTMLElement);
    });
    
    if (purposeDescriptionRef.current) {
      createDescriptionReveal(purposeDescriptionRef.current);
    }
    
    if (pillarsDescriptionRef.current) {
      createDescriptionReveal(pillarsDescriptionRef.current);
    }

    // Configurar movimiento escalonado de las imágenes de la galería
    const setupGalleryScrollAnimation = () => {
      const galleryItems = galleryItemRefs.current.filter(Boolean);
      
      if (galleryItems.length === 0) return;

      galleryItems.forEach((item, index) => {
        if (!item) return;

        // Posición inicial escalonada - la primera imagen (índice 0) más arriba
        const initialYOffset = -index * 80; // Cada imagen 80px más abajo que la anterior
        
        // Establecer posición inicial
        gsap.set(item, {
          y: initialYOffset,
          transformOrigin: "center center"
        });

        // Crear ScrollTrigger para intercambio de posiciones durante el scroll
        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Calcular la posición objetivo basada en el progreso
            const totalImages = galleryItems.length;
            const reverseIndex = (totalImages - 1) - index; // Índice invertido
            const targetYOffset = -reverseIndex * 80; // Posición objetivo (invertida)
            
            // Crear una curva de animación que pase por el punto de alineación
            // En progress = 0.5, todas las imágenes estarán en y = 0
            let currentYOffset;
            
            if (progress <= 0.5) {
              // Primera mitad: mover hacia el centro (y = 0)
              const firstHalfProgress = progress * 2; // 0 a 1
              currentYOffset = initialYOffset + (0 - initialYOffset) * firstHalfProgress;
            } else {
              // Segunda mitad: mover desde el centro hacia la posición final
              const secondHalfProgress = (progress - 0.5) * 2; // 0 a 1
              currentYOffset = 0 + (targetYOffset - 0) * secondHalfProgress;
            }
            
            gsap.set(item, {
              y: currentYOffset,
              transformOrigin: "center center"
            });
          }
        });
      });
    };

    // Ejecutar la configuración de la galería después de un pequeño delay
    setTimeout(setupGalleryScrollAnimation, 100);

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const purposeRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const titleProgress = Math.max(0, Math.min(1, (windowHeight - purposeRect.top) / windowHeight));

      setScrollProgress(prev => ({
        ...prev,
        title: titleProgress
      }));

      if (galleryTitleRef.current) {
        galleryTitleRef.current.style.transform = 'translate(-50%, -50%)';
      }

      if (titleRef.current) {
        const translateY = -50 + titleProgress * 50;
        const opacity = titleProgress;

        titleRef.current.style.transform = `translateY(${translateY}%)`;
        titleRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);   
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="purpose">
      <div className="purpose__container">
        <div className="purpose__logo-container">
          <div className="purpose__logo-item">
            <img src={vHotelLogo.src} alt="V Grand" />
            <h3 className="purpose__logo-title">Más de 30 mil personas al año hacen parte de la historia de V Grand.</h3>
          </div>
          <div className="purpose__logo-line">
            <hr />
            <img src={grandHotelLogo.src} alt="V Grand" />
            <hr />
          </div>
        </div>
        <LogosCarousel />
        <div className="content-container">
          <div className="purpose__content">
            <p className="purpose__content-subtitle">Propósito</p>
            <h3 className="purpose__content-title">
              V Grand Hotel Medellín: Bienestar urbano con alma colombiana
            </h3>
            <div ref={purposeDescriptionRef} className="purpose__content-description">
              Descubre en V Grand Hotel una experiencia de lujo consciente en el corazón de Medellín. Un refugio contemporáneo donde el bienestar, el diseño y la cultura se encuentran para reconectar cuerpo, mente y espíritu. Bienvenido a una nueva forma de hospedarte: más humana, más consciente, más tú.
            </div>
          </div>
          <div className="purpose__gallery">
            <div className="purpose__gallery-wrapper">
              <div 
                ref={(el) => { galleryItemRefs.current[0] = el; }}
                className="purpose__gallery-item"
              >
                <img 
                  src={PURPOSE_IMAGES.GALLERY_2} 
                  alt="Purpose" 
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
              <div 
                ref={(el) => { galleryItemRefs.current[1] = el; }}
                className="purpose__gallery-item"
              >
                <img 
                  src={PURPOSE_IMAGES.GALLERY_1} 
                  alt="Purpose" 
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
              <div 
                ref={(el) => { galleryItemRefs.current[2] = el; }}
                className="purpose__gallery-item"
              >
                <img 
                  src={PURPOSE_IMAGES.GALLERY_2} 
                  alt="Purpose" 
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
              <div 
                ref={(el) => { galleryItemRefs.current[3] = el; }}
                className="purpose__gallery-item"
              >
                <img 
                  src={PURPOSE_IMAGES.GALLERY_3} 
                  alt="Purpose" 
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
            <div ref={galleryTitleRef} className="purpose__gallery-title">
              El lugar donde bien se está
            </div>
          </div>
          <div className="pillars__content">
            <p className="purpose__content-subtitle">Pilares V-Grand</p>
            <h3 className="purpose__content-title">
              Combinamos comodidad y sofisticación con servicios modernos de
              calidad y bienestar.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Purpose;
